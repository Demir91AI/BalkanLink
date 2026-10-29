import { describe, expect, it } from 'vitest';
import { authErrorKey } from './auth-error';

describe('authentication error classification', () => {
  it.each([
    ['weak_password', 'auth.errors.weakPassword'],
    ['invalid_credentials', 'auth.login.wrongCredentials'],
    ['email_not_confirmed', 'auth.errors.emailNotConfirmed'],
    ['user_already_exists', 'auth.register.emailAlreadyExists'],
    ['email_exists', 'auth.register.emailAlreadyExists'],
    ['email_address_invalid', 'auth.errors.invalidEmail'],
    ['email_address_not_authorized', 'auth.errors.emailUnavailable'],
    ['over_request_rate_limit', 'auth.errors.rateLimit'],
    ['over_email_send_rate_limit', 'auth.errors.rateLimit'],
    ['signup_disabled', 'auth.errors.signupUnavailable'],
    ['email_provider_disabled', 'auth.errors.signinUnavailable'],
    ['user_banned', 'auth.errors.signinUnavailable'],
  ])('maps %s without revealing service details', (code, key) => {
    expect(authErrorKey({ code, message: 'private internal detail' })).toBe(key);
  });
  it('recognizes the reported legacy weak-password error', () => {
    expect(authErrorKey({ message: 'Password is known to be weak and easy to guess, please choose a different one.' })).toBe('auth.errors.weakPassword');
  });
  it.each([
    ['Invalid login credentials', 'auth.login.wrongCredentials'],
    ['Email not confirmed', 'auth.errors.emailNotConfirmed'],
    ['User already registered', 'auth.register.emailAlreadyExists'],
    ['Failed to fetch', 'auth.errors.network'],
  ])('supports legacy response %s', (message, key) => {
    expect(authErrorKey({ message })).toBe(key);
  });
  it.each([null, undefined, 'raw text', { message: 'unexpected database error' }, { code: 'toString' }, { code: 'unknown', message: 'Password is weak' }])('uses a safe fallback for %j', error => {
    expect(authErrorKey(error)).toBe('auth.errors.generic');
  });
  it('handles HTTP throttling', () => expect(authErrorKey({ status: 429 })).toBe('auth.errors.rateLimit'));
  it('handles service failure', () => expect(authErrorKey({ status: 503 })).toBe('auth.errors.unavailable'));
  it('handles thrown network failures', () => expect(authErrorKey({ name: 'AuthRetryableFetchError' })).toBe('auth.errors.network'));
});