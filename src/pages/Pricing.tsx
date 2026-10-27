import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { openCustomerPortal } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";
import MembershipOffer from "@/components/membership/MembershipOffer";

const FAQ = [1, 2, 3, 4] as const;

/** Central membership info page (/paketi; /premium and /pricing redirect here). */
export default function Pricing() {
  const { t } = useTranslation("plus");
  const { subscriptionTier } = useAuth();
  const canManage = ["premium", "premium_yearly", "annual"].includes(subscriptionTier);

  return (
    <div className="dark min-h-screen bg-background pb-28">
      <SEO title={t("seoTitle")} description={t("seoDesc")} path="/paketi" />
      <PageNav />
      <div className="container max-w-3xl space-y-10 px-4 py-10">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-[#F8FAFC] md:text-3xl">{t("title")}</h1>
          <p className="mt-2 text-[#CBD5E1]">{t("subtitle")}</p>
        </header>
        <MembershipOffer variant="full" />
        <p className="text-center text-sm text-[#CBD5E1]">{t("freeNote")}</p>
        {canManage && (
          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-xs text-[#CBD5E1]" onClick={openCustomerPortal}>
              <Settings className="mr-1 h-3 w-3" />{t("legacyManage")}
            </Button>
          </div>
        )}
        <div>
          <h2 className="mb-4 text-center text-xl font-bold text-[#F8FAFC]">{t("faqTitle")}</h2>
          <Accordion type="single" collapsible>
            {FAQ.map((n) => (
              <AccordionItem key={n} value={`q${n}`}>
                <AccordionTrigger className="text-left text-[#F8FAFC]">{t(`q${n}`)}</AccordionTrigger>
                <AccordionContent className="text-[#CBD5E1]">{t(`a${n}`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
