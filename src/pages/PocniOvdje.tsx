import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { ArrowRight, Home, FileText, CreditCard, Heart, Landmark, ClipboardList, Shield, Radio, Car, KeyRound, MessageSquare } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

const cards = [
  { icon: ClipboardList, titleKey: "schritte", descKey: "schritteDesc", to: "/dolazak/prvi-koraci", featured: true },
  { icon: Home, titleKey: "anmeldung", descKey: "anmeldungDesc", to: "/dolazak/prijava-prebivalista" },
  { icon: FileText, titleKey: "aufenthalt", descKey: "aufenthaltDesc", to: "/dolazak/boravisna-dozvola" },
  { icon: CreditCard, titleKey: "steuer", descKey: "steuerDesc", to: "/dolazak/steuer-id-i-porezna-klasa" },
  { icon: Heart, titleKey: "kranken", descKey: "krankenDesc", to: "/dolazak/zdravstveno-osiguranje" },
  { icon: Landmark, titleKey: "bank", descKey: "bankDesc", to: "/dolazak/bankovni-racun" },
  { icon: Shield, titleKey: "sozial", descKey: "sozialDesc", to: "/dolazak/sozialversicherung" },
  { icon: Radio, titleKey: "gez", descKey: "gezDesc", to: "/dolazak/rundfunkbeitrag" },
  { icon: KeyRound, titleKey: "fuehrerschein", descKey: "fuehrerscheinDesc", to: "/dolazak/fuehrerschein" },
  { icon: Car, titleKey: "auto", descKey: "autoDesc", to: "/dolazak/auto-anmelden" },
  { icon: MessageSquare, titleKey: "simulator", descKey: "simulatorDesc", to: "/anmeldung-simulator" },
];

export default function PocniOvdje() {
  const { t } = useTranslation("pages");
  const href = useLocalizedHref();

  return (
    <>
      <SEO title={t("dolazakStart.seoTitle")} description={t("dolazakStart.seoDescription")} path="/dolazak" />
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <Breadcrumbs variant="dark" />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl text-center">
            {t("dolazakStart.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base text-center">
            {t("dolazakStart.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.titleKey}
                to={href(card.to)}
                className={`group flex items-start gap-4 rounded-xl border p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md ${card.featured ? "bg-primary/10 border-primary/30 sm:col-span-2" : "bg-card"}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{t(`dolazakStart.cards.${card.titleKey}`)}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(`dolazakStart.cards.${card.descKey}`)}
                  </p>
                </div>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
