// Edge: check-pdf-versions
// Mjesečno (preko pg_cron) HEAD-checka eksterne PDF formulare i upisuje
// promjene u public.external_pdf_versions. Ako se ETag ili Last-Modified
// promijeni, šalje email obavještenje admin-u.
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ADMIN_EMAIL = 'kontakt@balkanlink.de';

interface VersionRow {
  id: string;
  form_key: string;
  source_url: string;
  etag: string | null;
  last_modified: string | null;
  content_length: number | null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: rows, error } = await supabase
    .from('external_pdf_versions')
    .select('id, form_key, source_url, etag, last_modified, content_length')
    .returns<VersionRow[]>();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const changes: { form_key: string; old: Partial<VersionRow>; new: Partial<VersionRow>; source_url: string }[] = [];

  for (const row of rows ?? []) {
    try {
      // Try HEAD first; fall back to GET range if HEAD blocked
      let res = await fetch(row.source_url, { method: 'HEAD', redirect: 'follow' });
      if (!res.ok) {
        res = await fetch(row.source_url, { method: 'GET', headers: { Range: 'bytes=0-0' }, redirect: 'follow' });
      }

      const etag = res.headers.get('etag');
      const lastModified = res.headers.get('last-modified');
      const contentLengthHeader = res.headers.get('content-length');
      const contentLength = contentLengthHeader ? Number(contentLengthHeader) : null;

      const changed =
        (etag && row.etag && etag !== row.etag) ||
        (lastModified && row.last_modified && lastModified !== row.last_modified) ||
        (contentLength && row.content_length && contentLength !== row.content_length);

      const update: Record<string, unknown> = {
        last_checked_at: new Date().toISOString(),
        etag, last_modified: lastModified, content_length: contentLength,
      };
      if (changed) {
        update.last_changed_at = new Date().toISOString();
        changes.push({
          form_key: row.form_key,
          source_url: row.source_url,
          old: { etag: row.etag, last_modified: row.last_modified, content_length: row.content_length },
          new: { etag, last_modified: lastModified, content_length: contentLength },
        });
      }

      await supabase.from('external_pdf_versions').update(update).eq('id', row.id);
    } catch (e) {
      console.error(`Check failed for ${row.form_key}:`, e);
    }
  }

  // Send email via Lovable Emails (send-transactional-email) if any change detected
  if (changes.length > 0) {
    try {
      const { error: invokeErr } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'admin-pdf-version-changed',
          recipientEmail: ADMIN_EMAIL,
          idempotencyKey: `pdf-version-${new Date().toISOString().slice(0, 10)}-${changes.map(c => c.form_key).join('-')}`,
          templateData: { changes },
        },
      });
      if (invokeErr) {
        console.error('send-transactional-email invoke error:', invokeErr);
      } else {
        for (const c of changes) {
          await supabase.from('external_pdf_versions')
            .update({ notified_at: new Date().toISOString() })
            .eq('form_key', c.form_key);
        }
      }
    } catch (e) {
      console.error('Email send failed:', e);
    }
  }

  return new Response(JSON.stringify({ checked: rows?.length ?? 0, changes: changes.length, details: changes }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
