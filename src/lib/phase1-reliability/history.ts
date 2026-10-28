export interface HistoryCursor { created_at: string; id: string }
export async function readCompleteHistory<T extends HistoryCursor>(
  page: (cursor: HistoryCursor | null, size: number) => Promise<T[]>,
): Promise<T[]> {
  const rows: T[] = [];
  const seen = new Set<string>();
  let cursor: HistoryCursor | null = null;
  for (;;) {
    const batch = await page(cursor, 500);
    if (!batch.length) return rows;
    for (const row of batch) if (!seen.has(row.id)) { seen.add(row.id); rows.push(row); }
    const last = batch[batch.length - 1];
    if (!last || (cursor?.id === last.id && cursor.created_at === last.created_at)) throw new Error('HISTORY_CURSOR_STALLED');
    cursor = { id: last.id, created_at: last.created_at };
    // Fetch until an empty page; do not assume a provider's page cap equals our request.
  }
}
export async function clearConfirmedHistory(remove: () => Promise<{ error: unknown }>, clearLocal: () => void) {
  const { error } = await remove();
  if (error) throw error;
  clearLocal();
}