import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { readCompleteHistory, clearConfirmedHistory } from './history';
import { refreshComplete } from './admin-refresh';
import { persistSignupProfile } from './signup-profile';
import { unsubscribeState } from './unsubscribe-response';
import { completeUnsubscribe, tokenValidation } from '../../../supabase/functions/handle-email-unsubscribe/recovery';
import { emailEnqueueAccepted } from '../../../supabase/functions/_shared/email-enqueue';

describe('complete chronological history', () => {
  it('restores 1207 records, including equal timestamps, beyond 500', async () => {
    const rows = Array.from({ length: 1207 }, (_, i) => ({ id: String(i).padStart(6, '0'), created_at: '2026-10-28T20:00:00Z' }));
    const page = vi.fn(async (cursor, size) => rows.filter(r => !cursor || r.id > cursor.id).slice(0, size));
    expect(await readCompleteHistory(page)).toEqual(rows);
    expect(page).toHaveBeenCalledTimes(4);
  });
  it('continues when the server returns fewer than 500 per page', async () => {
    const rows = Array.from({ length: 503 }, (_, i) => ({ id: String(i).padStart(6, '0'), created_at: '2026-10-28' }));
    expect(await readCompleteHistory(async cursor => rows.filter(r => !cursor || r.id > cursor.id).slice(0, 100))).toEqual(rows);
  });
  it('rejects a second-page failure instead of returning partial or empty history', async () => {
    let calls = 0;
    await expect(readCompleteHistory(async () => { if (++calls === 2) throw new Error('offline'); return [{ id: '1', created_at: '2026-10-28' }]; })).rejects.toThrow('offline');
  });
  it('rejects a stalled cursor', async () => {
    await expect(readCompleteHistory(async () => [{ id: '1', created_at: '2026-10-28' }])).rejects.toThrow('HISTORY_CURSOR_STALLED');
  });
});
describe('confirmed manual deletion', () => {
  it('keeps local history while cloud deletion is pending and on failure', async () => {
    const clear = vi.fn(); let finish: (value: { error: unknown }) => void = () => {};
    const pending = clearConfirmedHistory(() => new Promise(resolve => { finish = resolve; }), clear);
    expect(clear).not.toHaveBeenCalled(); finish({ error: new Error('offline') });
    await expect(pending).rejects.toThrow('offline'); expect(clear).not.toHaveBeenCalled();
  });
  it('clears local history only after cloud success', async () => {
    const clear = vi.fn(); await clearConfirmedHistory(async () => ({ error: null }), clear); expect(clear).toHaveBeenCalledTimes(1);
  });
});
describe('admin refresh confirmation', () => {
  it('does not confirm partial RPC errors or missing data', () => {
    expect(refreshComplete([{ data: {}, error: null }, { data: null, error: 'offline' }])).toBe(false);
    expect(refreshComplete([{ data: null, error: null }])).toBe(false);
  });
  it('confirms all four successful responses, including empty lists', () => {
    expect(refreshComplete([{}, [], {}, []].map(data => ({ data, error: null })))).toBe(true);
  });
});
describe('signup trigger compatibility', () => {
  it('does not attempt an unauthenticated profile write or another registration', async () => {
    const write = vi.fn(async () => ({ error: null })); expect(await persistSignupProfile(false, write)).toBe('deferred'); expect(write).not.toHaveBeenCalled();
  });
  it('checks authenticated upsert failure', async () => {
    await expect(persistSignupProfile(true, async () => ({ error: new Error('profile') }))).rejects.toThrow('profile');
  });
  it('accepts an authenticated update of the trigger-owned profile', async () => {
    expect(await persistSignupProfile(true, async () => ({ error: null }))).toBe('saved');
  });
});
describe('unsubscribe recovery', () => {
  it('does not consume a token when suppression fails and allows retry', async () => {
    const markUsed = vi.fn(async () => {}); const suppress = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined);
    await expect(completeUnsubscribe({ suppress, markUsed })).rejects.toThrow('offline'); expect(markUsed).not.toHaveBeenCalled();
    expect(await completeUnsubscribe({ suppress, markUsed })).toEqual({ success: true }); expect(markUsed).toHaveBeenCalledTimes(1);
  });
  it('retries after token-update failure with suppression already present', async () => {
    const suppress = vi.fn(async () => {}); const markUsed = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined);
    await expect(completeUnsubscribe({ suppress, markUsed })).rejects.toThrow('offline');
    expect(await completeUnsubscribe({ suppress, markUsed })).toEqual({ success: true }); expect(suppress).toHaveBeenCalledTimes(2);
  });
  it('repairs old used tokens and permits concurrent idempotent requests', async () => {
    let suppressed = false; const deps = { suppress: async () => { suppressed = true; }, markUsed: async () => {} };
    expect(tokenValidation(true, false)).toEqual({ valid: true });
    expect(await Promise.all([completeUnsubscribe(deps), completeUnsubscribe(deps)])).toEqual([{ success: true }, { success: true }]);
    expect(tokenValidation(true, suppressed)).toMatchObject({ reason: 'already_unsubscribed' });
  });
  it('requires success:true for POST, not HTTP 200 alone', () => {
    expect(unsubscribeState(true, { success: false, reason: 'already_unsubscribed' }, 'POST')).toBe('error');
    expect(unsubscribeState(true, { success: true }, 'POST')).toBe('success');
    expect(unsubscribeState(true, { reason: 'already_unsubscribed' }, 'GET')).toBe('already');
  });
});
describe('email enqueue contract', () => {
  it('accepts queued success but never treats failure or HTTP-only success as accepted', () => {
    expect(emailEnqueueAccepted({ data: { success: true, queued: true }, error: null })).toBe(true);
    for (const data of [{ success: false }, { success: true }, null]) expect(emailEnqueueAccepted({ data, error: null })).toBe(false);
    expect(emailEnqueueAccepted({ data: { success: true, queued: true }, error: 'offline' })).toBe(false);
  });
});
describe('legacy recording hold', () => {
  it('retains the existing five-count hook because deployed reports still consume chat_usage', () => {
    const hook = readFileSync('src/hooks/usePremiumAccess.ts', 'utf8');
    expect(hook).toContain('const FREE_DAILY_LIMIT = 5');
    expect(hook).toContain('.insert({ user_id: user.id })');
    expect(readFileSync('supabase/migrations/20260611205914_fb280782-5af0-42c6-99df-8fa8fd02afdc.sql', 'utf8')).toContain('FROM chat_usage');
  });
});