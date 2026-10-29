import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import bs from '@/i18n/locales/bs/common.json';
import hr from '@/i18n/locales/hr/common.json';
import sr from '@/i18n/locales/sr/common.json';
import de from '@/i18n/locales/de/common.json';
import Register from './Register';
import Login from './Login';

const mocks = vi.hoisted(() => ({ signUp: vi.fn(), signInWithPassword: vi.fn(), toast: vi.fn(), navigate: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { signUp: mocks.signUp, signInWithPassword: mocks.signInWithPassword } } }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: mocks.toast }) }));
vi.mock('react-router-dom', async importOriginal => ({ ...await importOriginal<typeof import('react-router-dom')>(), useNavigate: () => mocks.navigate }));
vi.mock('@/components/SEO', () => ({ SEO: () => null }));
vi.mock('@/components/BrandLogo', () => ({ default: () => null }));
vi.mock('@/components/navigation/PageNav', () => ({ default: () => null }));

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
async function mount(language: string, page: 'register' | 'login') {
  const i18n = createInstance();
  await i18n.init({ lng: language, fallbackLng: 'bs', resources: { bs: { common: bs }, hr: { common: hr }, sr: { common: sr }, de: { common: de } }, defaultNS: 'common', interpolation: { escapeValue: false } });
  render(<I18nextProvider i18n={i18n}><MemoryRouter>{page === 'register' ? <Register /> : <Login />}</MemoryRouter></I18nextProvider>);
  return i18n;
}

describe.each(['bs', 'hr', 'sr', 'de'])('auth failure flow: %s', language => {
  it('keeps weak-password rejection on registration and allows retry without account side effects', async () => {
    mocks.signUp.mockResolvedValue({ data: { user: null, session: null }, error: { code: 'weak_password', message: 'Password is known to be weak and easy to guess, please choose a different one.' } });
    const i18n = await mount(language, 'register');
    fireEvent.change(screen.getByLabelText(i18n.t('auth.register.labelFirstName')), { target: { value: 'Maja' } });
    fireEvent.change(screen.getByLabelText(i18n.t('auth.register.labelEmail')), { target: { value: 'fictional@example.invalid' } });
    fireEvent.change(screen.getByLabelText(i18n.t('auth.register.labelPassword')), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(i18n.t('auth.register.labelConfirmPassword')), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('checkbox'));
    const submit = screen.getByRole('button', { name: i18n.t('auth.register.submit') });
    fireEvent.click(submit);
    await waitFor(() => expect(mocks.toast).toHaveBeenCalled());
    expect(mocks.signUp).toHaveBeenCalledTimes(1);
    expect(mocks.signUp.mock.calls[0][0].password).toBe('Password123!');
    expect(mocks.toast.mock.calls[0][0].variant).toBe('destructive');
    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(submit).not.toBeDisabled();
  });
  it('rejects invalid sign-in without navigation', async () => {
    mocks.signInWithPassword.mockResolvedValue({ error: { code: 'invalid_credentials', message: 'Invalid login credentials' } });
    const i18n = await mount(language, 'login');
    fireEvent.change(screen.getByPlaceholderText(i18n.t('auth.login.emailPlaceholder')), { target: { value: 'fictional@example.invalid' } });
    fireEvent.change(screen.getByPlaceholderText(i18n.t('auth.login.passwordPlaceholder')), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('checkbox'));
    const submit = screen.getByRole('button', { name: i18n.t('auth.login.submit') });
    fireEvent.click(submit);
    await waitFor(() => expect(mocks.toast).toHaveBeenCalled());
    expect(mocks.signInWithPassword).toHaveBeenCalledTimes(1);
    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(submit).not.toBeDisabled();
  });
});