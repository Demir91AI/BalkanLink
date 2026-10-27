import { describe, expect, it } from 'vitest';
import { isLetterReplyVisible } from './visibility';

describe('LetterReplyTask preview-only visibility', () => {
  it('allows Vite DEV locally', () => {
    expect(isLetterReplyVisible(true, 'localhost')).toBe(true);
  });
  it('allows only the exact project preview in production builds', () => {
    expect(isLetterReplyVisible(false, 'id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app')).toBe(true);
  });
  it.each([
    'balkanlink.de',
    'www.balkanlink.de',
    'staro.lovable.app',
    'example.com',
    'localhost',
    'id-preview--00000000-0000-4000-8000-000000000000.lovable.app',
    'id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app.evil.example',
    'evil.id-preview--42558ae9-0b5a-4abf-bab6-f6cb6cf85927.lovable.app',
  ])('denies production host %s', hostname => {
    expect(isLetterReplyVisible(false, hostname)).toBe(false);
  });
});