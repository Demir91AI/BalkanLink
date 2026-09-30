import { Check, KeyRound, Sparkles, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, openCustomerPortal } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

const INCLUDES = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6", "inc7"] as const;
const FAQ = [1, 2, 3, 4] as const;

export default function Pricing() {
  const { t } = useTranslation("plus");
  const { user, isPremium, isAdmin, subscriptionTier } = useAuth();
  const navigate = useNavigate();
  const hasAccess = isPremium || isAdmin;

  const buy = () => {
    if (!user) { navigate("/login"); return; }
    initiateCheckout("plus");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("seoTitle")} description={t("seoDesc")} path="/paketi" />
      <PageNav />
      <div className="container max-w-3xl py-10 px-4 space-y-12">
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </header>

        <div className="mx-auto max-w-md rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[hsl(var(--gold))]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">{t("name")}</p>
          </div>
          <p className="mt-3 text-4xl font-black">{t("price")}</p>
          <p className="mt-2 text-base font-semibold">{t("tagline")}</p>
          <p className="text-sm text-muted-foreground">{t("priceNote")}</p>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("includesTitle")}</p>
          <ul className="mt-2 space-y-2.5">
            {INCLUDES.map((k) => (
              <li key={k} className="flex gap-2 text-sm">
                <Check className="h-4 w-4 shrink-0 text-[hsl(var(--gold))] mt-0.5" />
                <span>{t(k)}</span>
              </li>
            ))}
          </ul>

          {hasAccess ? (
            <div className="mt-6 rounded-xl bg-[hsl(var(--gold))]/10 px-4 py-3 text-center text-sm font-semibold text-[hsl(var(--gold))]">
              <Sparkles className="inline mr-1.5 h-4 w-4" />
              {t("owned")}
            </div>
          ) : (
            <Button className="mt-6 h-12 rounded-full btn-gold-gradient font-bold" onClick={buy}>
              {user ? t("cta") : t("ctaLogin")}
            </Button>
          )}
          <p className="mt-3 text-center text-[11px] text-muted-foreground">{t("secure")}</p>
        </div>

        <p className="text-center text-sm text-muted-foreground">{t("freeNote")}</p>

        {(subscriptionTier === "premium" || subscriptionTier === "premium_yearly") && (
          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-xs" onClick={openCustomerPortal}>
              <Settings className="mr-1 h-3 w-3" />
              {t("legacyManage")}
            </Button>
          </div>
        )}

        <div>
          <h2 className="mb-4 text-center text-xl font-bold">{t("faqTitle")}</h2>
          <Accordion type="single" collapsible>
            {FAQ.map((n) => (
              <AccordionItem key={n} value={`q${n}`}>
                <AccordionTrigger className="text-left">{t(`q${n}`)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{t(`a${n}`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
