export function emailEnqueueAccepted(response: { data: unknown; error: unknown }): boolean {
  if (response.error || !response.data || typeof response.data !== 'object') return false;
  const data = response.data as Record<string, unknown>;
  return data.success === true && data.queued === true;
}