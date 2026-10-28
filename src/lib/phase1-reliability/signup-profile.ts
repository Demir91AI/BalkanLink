/** The signup trigger owns creation. Without a session, metadata is retained for confirmation/login. */
export async function persistSignupProfile(hasSession: boolean, upsert: () => PromiseLike<{ error: unknown }>): Promise<'saved' | 'deferred'> {
  if (!hasSession) return 'deferred';
  const { error } = await upsert();
  if (error) throw error;
  return 'saved';
}