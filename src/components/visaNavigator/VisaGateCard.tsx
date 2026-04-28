import { Lock, UserPlus, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";

const BENEFIT_KEYS = [
  "docDetails",
  "allSteps",
  "addresses",
  "tips",
  "ifRejected",
  "muster",
] as const;

/**
 * Inline gate card shown after free preview content.
 * - Not logged in → auth gate (register/login)
 * - Logged in, not premium → premium upsell
 * - Premium → nothing rendered
 */
export default function VisaGateCard() {
  const { t } = useTranslation("pages");
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  if (isPremium) return null;

  const benefits = BENEFIT_KEYS.map((k) => t(`visa.gateCard.benefits.${k}`));

  // ── Premium upsell for logged-in users ──
  if (user) {
    return (
      <div className="my-6 rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-white px-6 py-8 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--gold))]/10">
            <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E]">{t("visa.gateCard.premiumTitle")}</h3>
        </div>

        <ul className="space-y-2 mb-6">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
              <CheckCircle className="h-4 w-4 text-[hsl(var(--gold))] shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/paketi")}
          className="w-full rounded-xl py-3.5 text-sm font-bold transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
            color: "hsl(var(--gold-foreground))",
          }}
        >
          {t("visa.gateCard.premiumCta")}
        </button>
      </div>
    );
  }

  // ── Auth gate for anonymous users ──
  return (
    <>
      <div className="my-6 rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-white px-6 py-8 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--gold))]/10">
            <UserPlus className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E]">{t("visa.gateCard.anonTitle")}</h3>
        </div>

        <ul className="space-y-2 mb-6">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
              <CheckCircle className="h-4 w-4 text-[hsl(var(--gold))] shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setAuthOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
            color: "hsl(var(--gold-foreground))",
          }}
        >
          <UserPlus className="h-4 w-4" />
          {t("visa.gateCard.registerCta")}
        </button>
        <button
          onClick={() => setAuthOpen(true)}
          className="mt-2 w-full text-xs text-[#9CA3AF] hover:text-[#6B6B6B] transition-colors"
        >
          {t("visa.gateCard.haveAccount")} <span className="underline">{t("visa.gateCard.signIn")}</span>
        </button>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
