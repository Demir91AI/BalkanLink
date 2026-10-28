export interface RefreshResult { data: unknown; error: unknown }
export function refreshComplete(results: RefreshResult[]): boolean {
  return results.length > 0 && results.every(result => !result.error && result.data !== null && result.data !== undefined);
}