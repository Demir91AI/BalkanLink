import { Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Briefcase, Receipt, Home, Heart, Users, HandCoins, ArrowRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import LegalDisclaimer from "@/components/LegalDisclaimer";
import { navigateBackOrHome } from "@/lib/navigation";

const categories = [
  {
    icon: Briefcase,
    title: "Arbeit & Kündigungsschutz",
    description: "Radna prava, ugovori, otkaz, zaštita na radu.",
    content: [
      "Radni ugovor mora biti u pisanoj formi prema Nachweisgesetz.",
      "Otkazni rok zavisi od dužine radnog odnosa (min. 4 sedmice).",
      "Probni rok (Probezeit) traje maksimalno 6 mjeseci.",
      "Zaštita od otkaza (Kündigungsschutz) važi u firmama sa 10+ zaposlenih.",
    ],
    law: "KSchG, BGB §§ 611-630",
    source: "https://www.gesetze-im-internet.de/kschg/",
  },
  {
    icon: Receipt,
    title: "Steuern & Finanzen",
    description: "Porezne klase, porezna prijava, financijska pitanja.",
    content: [
      "Steuerklasse I-VI: klasa zavisi od bračnog statusa i broja poslova.",
      "Steuererklärung (porezna prijava) se podnosi do 31. jula naredne godine.",
      "ELSTER je besplatni online portal za poreznu prijavu.",
      "Werbungskosten (troškovi vezani za posao) mogu smanjiti poreznu obavezu.",
    ],
    law: "EStG — Einkommensteuergesetz",
    source: "https://www.gesetze-im-internet.de/estg/",
    source2: "https://www.bundesfinanzministerium.de/",
  },
  {
    icon: Home,
    title: "Wohnen & Mietrecht",
    description: "Pravo najma, ugovor o najmu, prava stanara.",
    content: [
      "Ugovor o najmu mora jasno definisati cijenu, površinu i uslove.",
      "Kaution (depozit) smije iznositi maksimalno 3 hladne stanarine.",
      "Mietpreisbremse ograničava povećanje stanarine u mnogim gradovima.",
      "Nebenkostenabrechnung (obračun režijskih troškova) mora stići u roku od 12 mjeseci.",
    ],
    law: "BGB §§ 535-580a",
    source: "https://www.gesetze-im-internet.de/bgb/",
  },
  {
    icon: Heart,
    title: "Gesundheit & Krankenversicherung",
    description: "Zdravstveno osiguranje, liječnik, bolovanje.",
    content: [
      "Zdravstveno osiguranje je obavezno za sve stanovnike Njemačke.",
      "Bolovanje (Krankschreibung): od prvog dana bolesti, obavijesti poslodavca odmah.",
      "Krankengeld: nakon 6 sedmica bolovanja, blagajna plaća 70% bruto plate.",
      "Zuzahlung: participacija za lijekove iznosi 5-10€ po receptu.",
    ],
    law: "SGB V",
    source: "https://www.gesetze-im-internet.de/sgb_5/",
    source2: "https://www.bundesgesundheitsministerium.de/",
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

function CategoryCard({ cat, idx }: { cat: typeof categories[number]; idx: number }) {
  if (cat.to) {
    return (
      <Link
        to={cat.to}
        className="group flex items-start gap-4 rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <cat.icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold">{cat.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
        </div>
        <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <cat.icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold">{cat.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
        </div>
      </div>

      {cat.content && (
        <div className="mt-4 space-y-2 pl-14">
          {cat.content.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed text-foreground/80">{line}</p>
          ))}
        </div>
      )}

      {cat.law && (
        <div className="mt-4 border-t pt-3 pl-14">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Gesetzliche Grundlage:</span> {cat.law}
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <a href={cat.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Offizielle Quelle <ArrowRight className="h-3 w-3" />
            </a>
            {cat.source2 && (
              <a href={cat.source2} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                Weitere Quelle <ArrowRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ZivotSavjeti() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Život u Njemačkoj — Savjeti i Prava" description="Radna prava, porezi, stanovanje, zdravstvo i sve što trebaš znati za svakodnevni život u Njemačkoj." path="/zivot" />
      <section className="border-b bg-primary py-12">
        <div className="container">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
            <ChevronLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.daily.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Sve o životu u Njemačkoj — posao, stan, porezi, zdravstvo.
          </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} cat={cat} idx={idx} />
            ))}
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
