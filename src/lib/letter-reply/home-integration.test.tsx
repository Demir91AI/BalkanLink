import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Index from '@/pages/Index';

const mocks = vi.hoisted(() => ({
  visible: vi.fn(), subscription: vi.fn(), entry: vi.fn(() => null),
}));
vi.mock('./visibility', () => ({ isLetterReplyVisible: mocks.visible }));
vi.mock('@/hooks/useSubscription', () => ({ useSubscription: mocks.subscription }));
vi.mock('@/components/letter-reply/LetterReplyTask', () => ({ default: mocks.entry }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('@/components/SEO', () => ({ SEO: () => null }));
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

afterEach(() => { cleanup(); vi.clearAllMocks(); });
describe('homepage LetterReplyTask access integration', () => {
  it('does not mount the task or read subscriptions when visibility is denied', () => {
    mocks.visible.mockReturnValue(false);
    render(<MemoryRouter><Index /></MemoryRouter>);
    expect(mocks.entry).not.toHaveBeenCalled();
    expect(mocks.subscription).not.toHaveBeenCalled();
    expect(mocks.visible).toHaveBeenCalledWith(import.meta.env.DEV, window.location.hostname);
  });
  it.each([true, false])('passes existing subscription access %s unchanged', isPremium => {
    mocks.visible.mockReturnValue(true);
    mocks.subscription.mockReturnValue({ isPremium });
    render(<MemoryRouter><Index /></MemoryRouter>);
    expect(mocks.subscription).toHaveBeenCalled();
    expect(mocks.entry.mock.calls[0]?.[0]).toEqual({ canAccess: isPremium });
  });
});