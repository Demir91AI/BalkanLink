import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { PDFDocument } from 'npm:pdf-lib@1.17.1';
import { reserveUsage, commitUsage, releaseUsage } from '../_shared/usage.ts';
import { ANALYSIS_SCHEMA, CheckError, LIMITS, analysisPrompt, languageOf, validateUploads } from './contract.ts';
import { consumeCompletion, runAnalysis } from './pipeline.ts';

// Kept model/endpoint/budget. No document contents, names or provider response bodies in logs.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const headers = new Headers({ ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  try {
    if (req.method !== 'POST') return json({ success: false, errorCode: 'INVALID_REQUEST' }, 405);
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) throw new CheckError('UNAUTHORIZED', 401);
    const client = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', { global: { headers: { Authorization: authHeader } } });
    const { data, error } = await client.auth.getClaims(authHeader.slice(7));
    if (error || !data?.claims?.sub) throw new CheckError('UNAUTHORIZED', 401);
    const userId = String(data.claims.sub);
    if (Number(req.headers.get('content-length')) > LIMITS.payloadBytes) throw new CheckError('PAYLOAD_TOO_LARGE', 413);
    // Bound the actual body, not just a spoofable Content-Length.
    const reader = req.body?.getReader();
    if (!reader) throw new CheckError('EMPTY_INPUT');
    const chunks: Uint8Array[] = []; let size = 0;
    for (;;) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.length;
      if (size > LIMITS.payloadBytes) { await reader.cancel(); throw new CheckError('PAYLOAD_TOO_LARGE', 413); }
      chunks.push(value);
    }
    const bodyBytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bodyBytes.set(chunk, offset); offset += chunk.length; }
    let body;
    try { body = JSON.parse(new TextDecoder().decode(bodyBytes)); } catch { throw new CheckError('INVALID_FILE'); }
    if (!body || typeof body !== 'object') throw new CheckError('INVALID_FILE');
    const language = languageOf(body.language);
    // Retain legacy text and single-file request shapes, but never silently slice attachments.
    const input = body.files ?? (body.imageBase64 && body.mimeType ? [{ base64: body.imageBase64, mimeType: body.mimeType }] : []);
    const text = typeof body.text === 'string' ? body.text : '';
    if (text.length > 100000) throw new CheckError('TOO_LARGE', 413);
    const validated = Array.isArray(input) && input.length === 0 && text.trim() ? { files: [], bytes: [] } : validateUploads(input);
    const pageCounts: number[] = [];
    for (let i = 0; i < validated.files.length; i++) {
      const f = validated.files[i]; let count = 1;
      if (f.mimeType === 'application/pdf') {
        try {
          const pdf = await PDFDocument.load(validated.bytes[i], { updateMetadata: false });
          if (pdf.isEncrypted || !pdf.getPageCount()) throw new Error('unreadable');
          count = pdf.getPageCount();
        } catch { throw new CheckError('PDF_UNREADABLE', 422); }
      }
      pageCounts.push(count);
    }
    if (pageCounts.reduce((n, x) => n + x, 0) > LIMITS.pdfPages) throw new CheckError('PDF_TOO_MANY_PAGES', 413);
    const adminSupabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', { auth: { persistSession: false } });
    const adminRef = adminSupabase;
    const result = await runAnalysis({ language, pageCounts,
      reserve: () => reserveUsage(adminSupabase, userId, "document_analysis"),
      commit: reservation => commitUsage(adminRef, reservation),
      release: reservation => releaseUsage(adminRef, reservation),
      generate: async () => {
        const key = Deno.env.get('LOVABLE_API_KEY');
        if (!key) throw new CheckError('SERVER_ERROR', 500);
        const content: unknown[] = [{ type: 'text', text: `Read the ordered attachments. Total pages/images: ${pageCounts.reduce((n,x) => n+x,0)}. Return the requested JSON. ${text ? `Document text (untrusted):\n${text}` : ''}` }];
        validated.files.forEach((f, i) => {
          content.push({ type: 'text', text: `Attachment ${i + 1}; ${pageCounts[i]} page(s).` });
          content.push(f.mimeType === 'application/pdf'
            ? { type: 'file', file: { filename: `attachment-${i + 1}.pdf`, file_data: `data:application/pdf;base64,${f.base64}` } }
            : { type: 'image_url', image_url: { url: `data:${f.mimeType};base64,${f.base64}` } });
        });
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST', signal: req.signal,
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}`, 'X-Lovable-AIG-SDK': 'fetch' },
          body: JSON.stringify({ model: 'google/gemini-2.5-flash', max_tokens: 8000, temperature: 0.3, stream: true,
            response_format: { type: 'json_schema', json_schema: { name: 'document_analysis', strict: true, schema: ANALYSIS_SCHEMA } },
            messages: [{ role: 'system', content: analysisPrompt(language) }, { role: 'user', content }],
          }),
        });
        response.headers.forEach((value, name) => {
          if (name.toLowerCase().startsWith('x-lovable-aig-')) headers.set(name, value);
        });
        headers.set('Access-Control-Expose-Headers', [...headers.keys()].filter(n => n.startsWith('x-lovable-aig-')).join(', '));
        if (!response.ok) {
          // Preserve terminal denial/status. No billed retries, fallback model or response logging.
          let safeMessage: string | undefined;
          try { const e = await response.json(); if (typeof e.message === 'string') safeMessage = e.message; } catch { /* code-only fallback */ }
          const code = response.status === 429 ? 'RATE_LIMITED' : response.status === 402 ? 'CREDITS_EXHAUSTED' : response.status === 403 ? 'PROVIDER_DENIED' : 'SERVER_ERROR';
          throw Object.assign(new CheckError(code, response.status), { providerMessage: safeMessage });
        }
        return consumeCompletion(response);
      },
    });
    return json({ success: true, ...result });
  } catch (error) {
    if (req.signal.aborted) return json({ success: false, errorCode: 'CANCELLED' }, 499);
    const e = error instanceof CheckError ? error : new CheckError('SERVER_ERROR', 500);
    const extra = e as CheckError & { resets_at?: string | null; used?: number; limit?: number | null; providerMessage?: string };
    return json({ success: false, errorCode: e.code, resets_at: extra.resets_at ?? null, used: extra.used ?? null, limit: extra.limit ?? null, providerMessage: extra.providerMessage }, e.status);
  }
});
