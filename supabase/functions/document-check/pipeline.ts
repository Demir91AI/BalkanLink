import { CheckError, parseAnalysis, reservationFailure, type DocumentAnalysis, type Language } from './contract.ts';
import type { Reservation } from '../_shared/usage.ts';
export async function runAnalysis(deps: {
  reserve: () => Promise<Reservation>; commit: (r: Reservation) => Promise<void>; release: (r: Reservation) => Promise<void>;
  generate: () => Promise<unknown>; language: Language; pageCounts: number[];
}): Promise<{ analysis: DocumentAnalysis; status: { fullAccess: boolean; used: number | null; limit: number | null } }> {
  const r = await deps.reserve();
  const denied = reservationFailure(r);
  if (denied) throw Object.assign(new CheckError(denied.errorCode, denied.status), denied);
  let completed = false;
  try {
    const analysis = parseAnalysis(await deps.generate(), deps.language, deps.pageCounts);
    if (!analysis.readable) throw new CheckError('UNREADABLE', 422);
    await deps.commit(r); completed = true;
    return { analysis, status: { fullAccess: true, used: r.used ?? null, limit: r.limit ?? null } };
  } finally { if (!completed) await deps.release(r); }
}
export async function consumeCompletion(response: Response): Promise<string> {
  if (!response.body) throw new CheckError('PARSING_FAILED', 502);
  const reader = response.body.getReader();
  const decoder = new TextDecoder(); let pending = ''; let text = ''; let ended = false;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      pending += decoder.decode(value, { stream: !done });
      const lines = pending.split('\n'); pending = lines.pop() ?? '';
      if (done && pending) { lines.push(pending); pending = ''; }
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') { ended = true; continue; }
        if (!data) continue;
        let event;
        try { event = JSON.parse(data); } catch { throw new CheckError('PARSING_FAILED', 502); }
        if (event.error) throw new CheckError('SERVER_ERROR', 502);
        const choice = event.choices?.[0];
        if (choice?.delta?.refusal || choice?.finish_reason === 'content_filter') throw new CheckError('PROVIDER_DENIED', 403);
        if (choice?.finish_reason === 'length') throw new CheckError('PARSING_FAILED', 502);
        if (typeof choice?.delta?.content === 'string') text += choice.delta.content;
        if (text.length > 200000) throw new CheckError('PARSING_FAILED', 502);
      }
      if (done) break;
    }
  } finally { reader.releaseLock(); }
  if (!ended || !text.trim()) throw new CheckError('PARSING_FAILED', 502);
  return text;
}
