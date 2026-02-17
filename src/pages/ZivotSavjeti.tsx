import { Link } from "react-router-dom";
import { Briefcase, Receipt, Home, Heart, Users, HandCoins, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  {
    icon: Briefcase,
    title: "Arbeit & Kündigungsschutz",
    description: "Radna prava, ugovori, otkaz, zaštita na radu.",
    to: "/qa?filter=posao",
  },
  {
    icon: Receipt,
    title: "Steuern & Finanzen",
    description: "Porezne klase, porezna prijava, financijska pitanja.",
    to: "/qa?filter=porezi",
  },
  {
    icon: Home,
    title: "Wohnen & Mietrecht",
    description: "Pravo najma, ugovor o najmu, prava stanara.",
    to: "/qa?filter=stan",
  },
  {
    icon: Heart,
    title: "Gesundheit & Krankenversicherung",
    description: "Zdravstveno osiguranje, liječnik, bolovanje.",
    to: "/qa?filter=zdravstvo",
  },
  {
    icon: Users,
    title: "Familie & Kinder",
    description: "Kindergeld, Elterngeld, vrtić, škola.",
    to: "/familie",
  },
  {
    icon: HandCoins,
    title: "Sozialleistungen",
    description: "Wohngeld, Bürgergeld, socijalna pomoć.",
    to: "/foerderungen",
  },
];

export default function ZivotSavjeti() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.daily.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Sve o životu u Njemačkoj — posao, stan, porezi, zdravstvo.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.to}
                className="group flex flex-col gap-3 rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <cat.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 className="text-sm font-semibold">{cat.title}</h2>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                <ArrowRight className="mt-auto h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
