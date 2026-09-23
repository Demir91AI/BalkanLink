import { Check, X, Crown, Building2, FileSearch, Settings, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, openCustomerPortal } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

const INCLUDES = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6"] as const;
const FREE = ["free1", "free2", "free3", "free4"] as const;
const FAQ = [1, 2, 3, 4] as const;

export default function Pricing() {
  const { t } = useTranslation("plus");
  const { user, subscriptionTier } = useAuth();
  const navigate = useNavigate();
  const ownsPlus = subscriptionTier === "lifetime";
  const legacySub = subscriptionTier === "premium" || subscriptionTier === "premium_yearly";

  const buy = (product: "plus" | "doc_check") => {
    if (!user) { navigate("/login"); return; }
    initiateCheckout(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("seoTitle")} description={t("seoDesc")} path="/paketi" />
      <PageNav />
      <div className="container max-w-5xl py-10 px-4 space-y-14">
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
          {legacySub && (
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
              {t("legacyNote")}
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={openCustomerPortal}>
                <Settings className="mr-1 h-3 w-3" />
                {t("legacyManage")}
              </Button>
            </div>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("freeTitle")}</p>
            <p className="mt-2 text-3xl font-black">{t("freePrice")}</p>
            <ul className="mt-6 space-y-2.5 flex-1">
              {FREE.map((k) => (
                <li key={k} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[hsl(var(--success))] mt-0.5" />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>
            {!user && (
              <Button variant="outline" className="mt-6 rounded-full" onClick={() => navigate("/register")}>
                {t("freeCta")}
              </Button>
            )}
          </div>

          {/* Plus */}
          <div className="relative rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[hsl(var(--gold))] px-3 py-0.5 text-xs font-bold text-primary">
              {t("badge")}
            </span>
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">{t("name")}</p>
            </div>
            <p className="mt-2 text-3xl font-black">{t("price")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("priceNote")}</p>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("includesTitle")}</p>
            <ul className="mt-2 space-y-2.5">
              {INCLUDES.map((k) => (
                <li key={k} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[hsl(var(--gold))] mt-0.5" />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("notIncludedTitle")}</p>
            <ul className="mt-2 space-y-2 flex-1">
              {(["notInc1", "notInc2"] as const).map((k) => (
                <li key={k} className="flex gap-2 text-sm text-muted-foreground">
                  <X className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">{t("scopeNote")}</p>

            {ownsPlus ? (
              <div className="mt-6 rounded-xl bg-[hsl(var(--gold))]/10 px-4 py-3 text-center text-sm font-semibold text-[hsl(var(--gold))]">
                <Sparkles className="inline mr-1.5 h-4 w-4" />
                {t("owned")}
              </div>
            ) : (
              <Button className="mt-6 rounded-full btn-gold-gradient font-bold" onClick={() => buy("plus")}>
                {user ? t("cta") : t("ctaLogin")}
              </Button>
            )}
            <p className="mt-2 text-center text-[10px] text-muted-foreground">{t("secure")}</p>
          </div>
        </div>

        {/* Document Check */}
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-[hsl(var(--gold))]" />
            <h2 className="text-lg font-bold">{t("docTitle")}</h2>
          </div>
          <p className="mt-3 text-2xl font-black">
            {t("docPrice")} <span className="text-sm font-normal text-muted-foreground">{t("docPer")}</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{t("docDesc")}</p>
          <Button variant="outline" className="mt-4 rounded-full" onClick={() => buy("doc_check")}>
            {t("docCta")}
          </Button>
        </div>

        {/* Business — handled individually, no self-serve checkout */}
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[hsl(var(--gold))]" />
            <h2 className="text-lg font-bold">{t("businessTitle")}</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t("businessDesc")}</p>
          <Button variant="outline" className="mt-4 rounded-full" asChild>
            <a href="mailto:kontakt@balkanlink.de">{t("businessCta")}</a>
          </Button>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-2xl">
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
