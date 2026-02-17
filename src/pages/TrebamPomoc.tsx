import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, FileX, Mail, Wallet, HomeIcon, Briefcase, HeartPulse } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const problems = [
  {
    icon: Briefcase,
    title: "Kündigung erhalten",
    description: "Dobio/la si otkaz — šta sada? Rokovi, prava, koraci.",
    to: "/qa?filter=posao",
  },
  {
    icon: FileX,
    title: "Antrag abgelehnt",
    description: "Tvoj zahtjev je odbijen — kako uložiti prigovor.",
    to: "/formulare",
  },
  {
    icon: Mail,
    title: "Brief vom Amt bekommen",
    description: "Pismo od institucije — kako ga razumjeti i reagovati.",
    to: "/qa?filter=dokumenti",
  },
  {
    icon: Wallet,
    title: "Finanzielle Probleme",
    description: "Financijske poteškoće — koja pomoć ti pripada.",
    to: "/foerderungen",
  },
  {
    icon: HomeIcon,
    title: "Streit mit Vermieter",
    description: "Problem sa stanodavcem — tvoja prava kao stanar.",
    to: "/qa?filter=stan",
  },
  {
    icon: AlertTriangle,
    title: "Probleme mit Arbeitgeber",
    description: "Problemi na poslu — zaštita, prigovori, savjeti.",
    to: "/qa?filter=posao",
  },
  {
    icon: HeartPulse,
    title: "Pflegefall in der Familie",
    description: "Član porodice treba njegu — Pflegegrad, podrška, prava.",
    to: "/qa?filter=zdravstvo",
  },
];

export default function TrebamPomoc() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.help.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Imaš problem? Pronađi rješenje korak po korak.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {problems.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="group flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
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
