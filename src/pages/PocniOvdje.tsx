import { Link } from "react-router-dom";
import { ArrowRight, FileText, Home, CreditCard, Heart, Landmark, ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    icon: Home,
    title: "Anmeldung & Wohnsitz",
    description: "Prijavi svoje prebivalište u Njemačkoj — prvi i najvažniji korak.",
    to: "/qa?filter=dolazak",
  },
  {
    icon: FileText,
    title: "Aufenthalt & Visum",
    description: "Boravišna dozvola, viza, plava karta — koji tip ti treba?",
    to: "/qa?filter=dolazak",
  },
  {
    icon: CreditCard,
    title: "Steuer-ID & Steuerklasse",
    description: "Poreski identifikacioni broj i porezna klasa — kako ih dobiti.",
    to: "/qa?filter=porezi",
  },
  {
    icon: Heart,
    title: "Krankenversicherung wählen",
    description: "Javno ili privatno osiguranje — šta je bolje za tebe.",
    to: "/qa?filter=zdravstvo",
  },
  {
    icon: Landmark,
    title: "Bankkonto eröffnen",
    description: "Otvori bankovni račun — bez njega ništa ne funkcioniše.",
    to: "/qa?filter=dolazak",
  },
  {
    icon: ClipboardList,
    title: "Erste Schritte nach Ankunft",
    description: "Kompletna lista koraka za prve sedmice u Njemačkoj.",
    to: "/qa?filter=dolazak",
  },
];

export default function PocniOvdje() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.new.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Korak po korak vodič za tvoj početak u Njemačkoj.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <Link
                key={idx}
                to={step.to}
                className="group flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{step.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
