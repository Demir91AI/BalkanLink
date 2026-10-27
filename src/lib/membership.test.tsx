import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { membershipCta, MEMBERSHIP } from "./membership";
import bs from "@/i18n/locales/bs/plus.json";
import hr from "@/i18n/locales/hr/plus.json";
import sr from "@/i18n/locales/sr/plus.json";
import de from "@/i18n/locales/de/plus.json";

const state = { cta: "disabled" as string, loading: false };
vi.mock("@/hooks/useMembership", () => ({
  useMembership: () => state,
  startAnnualCheckout: vi.fn(),
}));
import MembershipOffer from "@/components/membership/MembershipOffer";

beforeAll(async () => {
  await i18n.init({ lng: "bs", resources: { bs: { plus: bs } }, interpolation: { escapeValue: false } });
});

describe("membership CTA per role", () => {
  it("legacy lifetime/sub/admin/trial/yearly with full access see 'owned', never a buy button", () => {
    expect(membershipCta({ signedIn: true, fullAccess: true, checkoutEnabled: true })).toBe("owned");
    expect(membershipCta({ signedIn: true, fullAccess: true, checkoutEnabled: false })).toBe("owned");
  });
  it("signed-out visitors are asked to register (7-day trial)", () => {
    expect(membershipCta({ signedIn: false, fullAccess: false, checkoutEnabled: true })).toBe("register");
  });
  it("free/expired-trial users get checkout only when the server switch is on", () => {
    expect(membershipCta({ signedIn: true, fullAccess: false, checkoutEnabled: false })).toBe("disabled");
    expect(membershipCta({ signedIn: true, fullAccess: false, checkoutEnabled: true })).toBe("checkout");
  });
  it("central constants match the approved offer", () => {
    expect(MEMBERSHIP.yearlyPriceCents).toBe(1999);
    expect(MEMBERSHIP.trialDays).toBe(7);
    expect([MEMBERSHIP.trial.document_analyses, MEMBERSHIP.trial.assistant_replies]).toEqual([2, 10]);
    expect([MEMBERSHIP.yearly.document_analyses, MEMBERSHIP.yearly.assistant_replies]).toEqual([5, 40]);
    expect(MEMBERSHIP.path).toBe("/paketi");
  });
});

describe("MembershipOffer render", () => {
  const show = (cta: string, variant: "full" | "compact" = "full") => {
    state.cta = cta;
    cleanup();
    return render(<I18nextProvider i18n={i18n}><MemoryRouter><MembershipOffer variant={variant} /></MemoryRouter></I18nextProvider>);
  };
  it("switch OFF: one disabled CTA, clearly not activated", () => {
    const { container } = show("disabled");
    const btns = container.querySelectorAll('[data-testid="membership-cta"]');
    expect(btns.length).toBe(1);
    expect((btns[0] as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByText(bs.ctaDisabledNote)).toBeTruthy();
  });
  it("full offer explains trial, yearly renewal, cancellation and fair use", () => {
    const { container } = show("checkout");
    const txt = container.textContent!;
    for (const k of ["trialDesc", "trialQuota", "priceNote", "fairUse", "cancelDesc"] as const) expect(txt).toContain(bs[k]);
    expect(txt).not.toMatch(/19,90|9,99 €\/|1,99/);
  });
  it("owners see no purchase button", () => {
    const { container } = show("owned", "compact");
    expect(container.querySelector('[data-testid="membership-cta"]')).toBeNull();
  });
  it("loading shows a neutral placeholder, not a CTA (no flicker)", () => {
    state.loading = true;
    const { container } = show("disabled");
    expect(container.querySelector('[data-testid="membership-cta"]')).toBeNull();
    state.loading = false;
  });
});

describe("i18n and leftover audit", () => {
  it("plus namespace has identical keys in bs/hr/sr/de", () => {
    const ref = Object.keys(bs).sort();
    for (const l of [hr, sr, de]) expect(Object.keys(l).sort()).toEqual(ref);
  });
  it("no locale text still sells €19.90 one-time or per-check €1.99 (legal + classifieds ads excluded)", () => {
    for (const l of ["bs", "hr", "sr", "de"]) {
      const dir = `src/i18n/locales/${l}`;
      for (const f of readdirSync(dir)) {
        if (f === "legal.json") continue;
        const j = JSON.parse(readFileSync(join(dir, f), "utf8"));
        if (j.classifieds) delete j.classifieds.proModal;
        const s = JSON.stringify(j);
        expect(s, `${l}/${f}`).not.toMatch(/19,90/);
        expect(s, `${l}/${f}`).not.toMatch(/1,99 ?€ (po|pro)/);
      }
    }
  });
  it("no client code starts the old one-time checkout", () => {
    const walk = (d: string): string[] => readdirSync(d).flatMap((f) => {
      const p = join(d, f);
      return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(f) && !/\.test\./.test(f) ? [p] : [];
    });
    for (const f of walk("src")) expect(readFileSync(f, "utf8"), f).not.toMatch(/initiateCheckout\(\s*["']plus["']/);
  });
});
