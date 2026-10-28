export type Period = 7 | 30 | 90;
export type SourceKey = 'stats' | 'extra' | 'users' | 'usage';
export interface SourceState { data: unknown; fetchedAt: string | null; error: boolean; loading: boolean }
export const emptySource = (): SourceState => ({ data: null, fetchedAt: null, error: false, loading: false });
export function settleSource(previous: SourceState, result: PromiseSettledResult<{ data: unknown; error: unknown }>, now: string): SourceState {
  if (result.status === 'rejected' || result.value.error || result.value.data == null)
    return { ...previous, loading: false, error: true };
  return { data: result.value.data, fetchedAt: now, loading: false, error: false };
}
export function sourceStale(state: SourceState, now: number): boolean {
  return state.error || !state.fetchedAt || now - Date.parse(state.fetchedAt) >= 120000;
}
export interface ProfileRow { id: string; email: string; first_name?: string | null; subscription_tier: string; is_premium: boolean; subscription_expires_at: string | null; created_at: string; last_login_at?: string | null }
export function profilePlan(row: ProfileRow, now: number): string {
  const tier = row.subscription_tier;
  const active = row.subscription_expires_at != null && Date.parse(row.subscription_expires_at) > now;
  if (tier === 'lifetime') return 'lifetime';
  if (row.is_premium && ['premium','premium_yearly'].includes(tier) && (!row.subscription_expires_at || active)) return 'legacy';
  if (tier === 'annual' && active) return 'annual';
  if (['trial','launch_trial','influencer_trial'].includes(tier) && active) return 'trial';
  return tier === 'free' || !tier ? 'free' : 'expired';
}
export function periodMetric(data: Record<string, unknown> | null, prefix: string, period: Period): number | null {
  const value = data?.[`${prefix}${period}d`];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
export function safeCsv(rows: unknown[][]): string {
  return '\uFEFF' + rows.map(row => row.map(value => {
    let text = String(value ?? '');
    if (/^[\s]*[=+@\-\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }).join(',')).join('\r\n');
}
export function downloadCsv(rows: unknown[][], name: string) {
  const url = URL.createObjectURL(new Blob([safeCsv(rows)], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url);
}
export function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
export function records(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(v => record(v) != null) : [];
}