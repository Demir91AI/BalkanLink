import { Check, KeyRound, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMembership, startAnnualCheckout } from "@/hooks/useMembership";
import { MEMBERSHIP } from "@/lib/membership";
import { cn } from "@/lib/utils";

const INCLUDES = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6", "inc7"] as const;

/**
 * The ONE membership offer used platform-wide (modal, locks, cards, /paketi).
 * compact = short lock prompt that links to the full offer; full = complete terms.
 */
export default function MembershipOffer({ variant = "compact", title, className, onNavigate }: {
  variant?: "compact" | "full";
  title?: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation("plus");
  const navigate = useNavigate();
  const { cta, loading } = useMembership();
  const go = (p: string) => { onNavigate?.(); navigate(p); };

  const button = loading ? (
    <div className="h-12 w-full rounded-full bg-white/10 animate-pulse" aria-hidden />
  ) : cta === "owned" ? (
    <div className="rounded-xl bg-[hsl(var(--gold))]/10 px-4 py-3 text-center text-sm font-semibold text-[hsl(var(--gold))]" data-testid="membership-owned">
      <Sparkles className="mr-1.5 inline h-4 w-4" />{t("owned")}
      <p className="mt-1 text-xs font-normal text-[#CBD5E1]">{t("ownedLegacy")}</p>
    </div>
  ) : cta === "register" ? (
    <>
      <button onClick={() => go("/register")} className="h-12 w-full rounded-full bg-[hsl(var(--gold))] text-sm font-bold text-[#0B1220]" data-testid="membership-cta" data-cta="register">
        {t("ctaLogin")}
      </button>
      <button onClick={() => go("/login")} className="w-full text-xs text-[#CBD5E1] underline">{t("login")}</button>
    </>
  ) : cta === "checkout" ? (
    <button onClick={() => startAnnualCheckout()} className="h-12 w-full rounded-full bg-[hsl(var(--gold))] text-sm font-bold text-[#0B1220]" data-testid="membership-cta" data-cta="checkout">
      {t("cta")}
    </button>
  ) : (
    <>
      <button disabled aria-disabled className="h-12 w-full cursor-not-allowed rounded-full border border-[hsl(var(--gold))]/50 bg-transparent text-sm font-bold text-[#F8FAFC]" data-testid="membership-cta" data-cta="disabled">
        {t("ctaDisabled")}
      </button>
      <p className="text-center text-xs text-[#CBD5E1]">{t("ctaDisabledNote")}</p>
    </>
  );

  if (variant === "compact") {
    return (
      <div data-testid="membership-offer" data-variant="compact" className={cn("mx-auto w-full max-w-md rounded-2xl border border-[hsl(var(--gold))]/30 bg-[#111B2D] p-5 text-left", className)}>
        <div className="flex items-center gap-2 text-[hsl(var(--gold))]"><KeyRound className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-wide">{t("name")}</p></div>
        <h3 className="mt-2 text-base font-bold text-[#F8FAFC]">{title ?? t("lockedTitle")}</h3>
        <p className="mt-2 text-sm text-[#CBD5E1]">{t("unlockNote")}</p>
        <div className="mt-4 space-y-2">{button}</div>
        {cta !== "owned" && (
          <button onClick={() => go(MEMBERSHIP.path)} className="mt-3 w-full text-center text-xs font-semibold text-[hsl(var(--gold))] underline">{t("unlockCta")}</button>
        )}
      </div>
    );
  }

  return (
    <div data-testid="membership-offer" data-variant="full" className={cn("mx-auto w-full max-w-md rounded-2xl border-2 border-[hsl(var(--gold))] bg-[#111B2D] p-6", className)}>
      <div className="flex items-center gap-2 text-[hsl(var(--gold))]"><KeyRound className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-wider">{t("name")}</p></div>
      <section className="mt-4 rounded-xl bg-[#18253A] p-4">
        <h2 className="text-lg font-bold text-[#F8FAFC]">{t("trialTitle")}</h2>
        <p className="mt-1 text-sm text-[#CBD5E1]">{t("trialDesc")}</p>
        <p className="mt-2 text-xs text-[#CBD5E1]">{t("trialQuota")}</p>
      </section>
      <section className="mt-3 rounded-xl bg-[#18253A] p-4">
        <h2 className="text-lg font-bold text-[#F8FAFC]">{t("yearTitle")}</h2>
        <p className="mt-1 text-3xl font-black text-[#F8FAFC]">{t("price")}</p>
        <p className="mt-1 text-sm text-[#CBD5E1]">{t("yearDesc")}</p>
        <p className="mt-2 text-sm font-semibold text-[#F8FAFC]">{t("priceNote")}</p>
      </section>
      <ul className="mt-4 space-y-2">
        {INCLUDES.map((k) => (
          <li key={k} className="flex gap-2 text-sm text-[#CBD5E1]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />{t(k)}</li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-white/10 p-3">
        <p className="text-sm font-bold text-[#F8FAFC]">{t("fairUseTitle")}</p>
        <p className="mt-1 text-xs text-[#CBD5E1]">{t("fairUse")}</p>
      </div>
      <div className="mt-3 rounded-xl border border-white/10 p-3">
        <p className="text-sm font-bold text-[#F8FAFC]">{t("cancelTitle")}</p>
        <p className="mt-1 text-xs text-[#CBD5E1]">{t("cancelDesc")}</p>
      </div>
      <div className="mt-5 space-y-2">{button}</div>
      <p className="mt-3 text-center text-[11px] text-[#CBD5E1]">{t("secure")}</p>
    </div>
  );
}
