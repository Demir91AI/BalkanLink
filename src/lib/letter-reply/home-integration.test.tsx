import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Index from '@/pages/Index';

const mocks = vi.hoisted(() => ({
  subscription: vi.fn(), entry: vi.fn((_props: { canAccess: boolean }) => null),
}));
vi.mock('@/hooks/useSubscription', () => ({ useSubscription: mocks.subscription }));
vi.mock('@/components/letter-reply/LetterReplyTask', () => ({ default: mocks.entry }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('@/components/SEO', () => ({ SEO: () => null }));
vi.mock('@/components/membership/MembershipOffer', () => ({ default: () => null }));
vi.mock('@/components/home/HeroSection', () => ({ default: () => null }));
vi.mock('@/components/home/FeatureCards', () => ({ default: () => null }));
vi.mock('@/components/home/BeforeAfterSection', () => ({ default: () => null }));
vi.mock('@/components/home/ProcessSection', () => ({ default: () => null }));
vi.mock('@/components/home/TrustSection', () => ({ default: () => null }));
vi.mock('@/components/home/PricingWarning', () => ({ default: () => null }));
vi.mock('@/components/home/WhatIsWhat', () => ({ default: () => null }));
vi.mock('@/components/home/FlowBanner', () => ({ default: () => null }));
vi.mock('@/components/home/CollapsibleSection', () => ({ default: () => null }));
vi.mock('@/components/home/CommunityHighlights', () => ({ default: () => null }));
vi.mock('@/components/share/ShareButton', () => ({ default: () => null }));
vi.mock('@/components/home/premium-showcase-data', () => ({ premiumShowcaseFirms: [] }));
vi.mock('@/hooks/useInfiniteScroll', () => ({ useInfiniteScroll: () => ({}) }));

beforeEach(() => {
  vi.stubEnv('DEV', false);
  vi.stubGlobal('IntersectionObserver', class {
    observe() {} unobserve() {} disconnect() {}
  });
});
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
describe('homepage LetterReplyTask access integration', () => {
  it.each([true, false])('shows the production entry and passes existing subscription access %s unchanged', isPremium => {
    mocks.subscription.mockReturnValue({ isPremium });
    render(<MemoryRouter><Index /></MemoryRouter>);
    expect(mocks.subscription).toHaveBeenCalled();
    expect(mocks.entry.mock.calls[0]?.[0]).toEqual({ canAccess: isPremium });
  });
});