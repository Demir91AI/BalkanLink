export async function completeUnsubscribe(deps: {
  suppress: () => Promise<void>;
  markUsed: () => Promise<void>;
}): Promise<{ success: true }> {
  // Suppression first: a failed second step remains safely retryable with an unused token.
  // Always suppress again on POST, including tokens consumed by the previous implementation.
  await deps.suppress();
  await deps.markUsed();
  return { success: true };
}
export function tokenValidation(used: boolean, suppressed: boolean): Record<string, unknown> {
  return used && suppressed
    ? { valid: false, reason: 'already_unsubscribed', already_unsubscribed: true }
    : { valid: true };
}