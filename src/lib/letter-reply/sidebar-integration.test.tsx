import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { AppSidebar } from '@/components/layout/AppSidebar';
import Vorlagen from '@/pages/Vorlagen';
import bs from '@/i18n/locales/bs/common.json';
import hr from '@/i18n/locales/hr/common.json';
import sr from '@/i18n/locales/sr/common.json';
import de from '@/i18n/locales/de/common.json';
import bsReply from '@/i18n/locales/bs/reply.json';
import hrReply from '@/i18n/locales/hr/reply.json';
import srReply from '@/i18n/locales/sr/reply.json';
import deReply from '@/i18n/locales/de/reply.json';

const state = vi.hoisted(() => ({ access: true, loading: false }));
vi.mock('@/contexts/AuthContext', () => ({ useAuth: () => ({ user: null, displayName: '', isAdmin: false, loading: false }) }));
vi.mock('@/hooks/usePremiumAccess', () => ({ usePremiumAccess: () => ({ isPremium: false }) }));
vi.mock('@/hooks/useRecentPages', () => ({ useRecentPages: () => [] }));
vi.mock('@/hooks/useSubscription', () => ({ useSubscription: () => ({ isPremium: state.access, loading: state.loading }) }));
vi.mock('@/components/LanguageSwitcher', () => ({ LanguageSwitcher: () => null }));
vi.mock('@/components/SEO', () => ({ SEO: () => null }));
vi.mock('@/components/navigation/PageNavBar', () => ({ default: () => null }));
vi.mock('@/components/vorlagen/VorlagenGenerator', () => ({ default: () => null }));

const locales = { bs, hr, sr, de };
const replies = { bs: bsReply, hr: hrReply, sr: srReply, de: deReply };
type Lang = keyof typeof locales;
function LocationProbe() {
  const location = useLocation();
  const navigate = useNavigate();
  return <><output data-testid="location">{location.pathname}{location.search}{location.hash}</output><button onClick={() => navigate(-1)}>history-back</button><button onClick={() => navigate(1)}>history-forward</button></>;
}
async function mount(lang: Lang = 'bs', initial?: string) {
  const i18n = createInstance();
  await i18n.init({ lng: lang, fallbackLng: false, resources: Object.fromEntries(Object.keys(locales).map(k => [k, { common: locales[k as Lang], reply: replies[k as Lang] }])), interpolation: { escapeValue: false } });
  const prefix = lang === 'bs' ? '' : `/${lang}`;
  const view = render(<I18nextProvider i18n={i18n}><MemoryRouter initialEntries={[initial ?? (prefix || '/')]}><AppSidebar /><LocationProbe /><Routes><Route path={`${prefix}/vorlagen`} element={<Vorlagen />} /></Routes></MemoryRouter></I18nextProvider>);
  return { ...view, prefix };
}
beforeEach(() => { vi.stubEnv('DEV', false); state.access = true; state.loading = false; });
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });

describe('production-mode sidebar → existing letter reply wizard (real visibility policy)', () => {
  it.each([
    ['bs', 'Odgovor na pismo', 'NOVO'], ['hr', 'Odgovor na dopis', 'NOVO'],
    ['sr', 'Odgovor na pismo', 'NOVO'], ['de', 'Behördenbrief beantworten', 'NEU'],
  ] as const)('opens directly and closes without a stale query in %s', async (lang, title, badge) => {
    const { prefix } = await mount(lang);
    act(() => { window.dispatchEvent(new Event('toggle-sidebar')); });
    const item = screen.getByRole('button', { name: `${title} ${badge}` });
    expect(item.previousElementSibling?.textContent).toBe(locales[lang].sidebar.items.dokumentenCheck);
    // Both existing NEW categories use the same language key.
    expect(screen.getByRole('button', { name: `${locales[lang].sidebar.items.obnovaPasosa} ${badge}` })).toBeInTheDocument();
    fireEvent.click(item);
    expect(screen.getByTestId('location')).toHaveTextContent(`${prefix}/vorlagen?task=reply`);
    expect(await screen.findByRole('dialog', { name: replies[lang].title })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: replies[lang].close }));
    await waitFor(() => expect(screen.queryByRole('dialog', { name: replies[lang].title })).not.toBeInTheDocument());
    expect(screen.getByTestId('location').textContent).toBe(`${prefix}/vorlagen`);
    fireEvent.click(screen.getByRole('button', { name: 'history-back' }));
    fireEvent.click(screen.getByRole('button', { name: 'history-forward' }));
    expect(screen.queryByRole('dialog', { name: replies[lang].title })).not.toBeInTheDocument();
  });
  it('Back leaves an open task and Forward reopens the intentional task URL', async () => {
    await mount();
    fireEvent.click(screen.getByRole('button', { name: 'Odgovor na pismo NOVO' }));
    expect(await screen.findByRole('dialog', { name: bsReply.title })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'history-back', hidden: true }));
    await waitFor(() => expect(screen.queryByRole('dialog', { name: bsReply.title })).not.toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'history-forward' }));
    expect(await screen.findByRole('dialog', { name: bsReply.title })).toBeInTheDocument();
  });
  it('closing retains other query parameters and fragment', async () => {
    await mount('de', '/de/vorlagen?keep=yes&task=reply#section');
    fireEvent.click(await screen.findByRole('button', { name: deReply.close }));
    expect(screen.getByTestId('location').textContent).toBe('/de/vorlagen?keep=yes#section');
  });
  it.each(['bs', 'hr', 'sr', 'de'] as const)('denied access redirects to localized packages in %s', async lang => {
    state.access = false;
    const prefix = lang === 'bs' ? '' : `/${lang}`;
    await mount(lang, `${prefix}/vorlagen?task=reply`);
    await waitFor(() => expect(screen.getByTestId('location').textContent).toBe(`${prefix}/paketi`));
    expect(screen.queryByRole('dialog', { name: replies[lang].title })).not.toBeInTheDocument();
  });
  it('does not redirect or open while subscription access is loading', async () => {
    state.loading = true; state.access = false;
    await mount('bs', '/vorlagen?task=reply');
    expect(screen.getByTestId('location').textContent).toBe('/vorlagen?task=reply');
    expect(screen.queryByRole('dialog', { name: bsReply.title })).not.toBeInTheDocument();
  });
  it('visible production entry still denies access through the existing gate', async () => {
    state.access = false;
    await mount('bs', '/vorlagen?task=reply');
    expect(screen.getByRole('button', { name: 'Odgovor na pismo NOVO' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: bsReply.title })).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/paketi'));
  });
});