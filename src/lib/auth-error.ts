/** UI-only classification. Never return service text or change auth policy. */
export function authErrorKey(error: unknown): string {
  const value = error && typeof error === 'object' ? error as { code?: unknown; message?: unknown; status?: unknown; name?: unknown } : {};
  const code = typeof value.code === 'string' ? value.code : '';
  const codes: Record<string, string> = {
    weak_password: 'auth.errors.weakPassword',
    invalid_credentials: 'auth.login.wrongCredentials',
    email_not_confirmed: 'auth.errors.emailNotConfirmed',
    user_already_exists: 'auth.register.emailAlreadyExists',
    email_exists: 'auth.register.emailAlreadyExists',
    email_address_invalid: 'auth.errors.invalidEmail',
    email_address_not_authorized: 'auth.errors.emailUnavailable',
    over_request_rate_limit: 'auth.errors.rateLimit',
    over_email_send_rate_limit: 'auth.errors.rateLimit',
    signup_disabled: 'auth.errors.signupUnavailable',
    email_provider_disabled: 'auth.errors.signinUnavailable',
    user_banned: 'auth.errors.signinUnavailable',
  };
  if (Object.prototype.hasOwnProperty.call(codes, code)) return codes[code];
  if (value.status === 429) return 'auth.errors.rateLimit';
  if (value.name === 'AuthRetryableFetchError' || value.status === 0) return 'auth.errors.network';
  if (typeof value.status === 'number' && value.status >= 500) return 'auth.errors.unavailable';
  // Compatibility with older auth responses without machine-readable codes.
  // Unknown explicit codes deliberately use the safe fallback, not message guessing.
  if (code) return 'auth.errors.generic';
  const message = typeof value.message === 'string' ? value.message.toLowerCase().trim() : '';
  if (/password.*(weak|easy to guess|at least|should contain)/.test(message)) return 'auth.errors.weakPassword';
  if (message === 'invalid login credentials') return 'auth.login.wrongCredentials';
  if (message === 'email not confirmed') return 'auth.errors.emailNotConfirmed';
  if (/^(user already registered|user already exists|email already exists)\.?$/.test(message)) return 'auth.register.emailAlreadyExists';
  if (/^(failed to fetch|fetch failed|network request failed)$/.test(message)) return 'auth.errors.network';
  return 'auth.errors.generic';
}