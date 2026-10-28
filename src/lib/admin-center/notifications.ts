export interface AdminNotification {
  id: string; type: string; severity: string; title: string; body: string | null;
  metadata: Record<string, unknown> | null; read_at: string | null; created_at: string;
  source?: string; occurred_at?: string; status?: string; dedupe_key?: string;
}
export function mergeNotifications(rows: AdminNotification[]): AdminNotification[] {
  return [...new Map(rows.map(row => [row.id,row])).values()].sort((a,b) => b.created_at.localeCompare(a.created_at)).slice(0,100);
}
export function confirmedRows(data: unknown, error: unknown, expected: number): boolean {
  return !error && Array.isArray(data) && data.length === expected;
}
export function canReview(row: AdminNotification, capabilities: boolean): boolean {
  return capabilities && row.status === 'pending' && ['pdf_version_changed','legal_change'].includes(row.type);
}