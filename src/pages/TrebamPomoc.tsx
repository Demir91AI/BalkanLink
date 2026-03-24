import { ArrowRight, AlertTriangle, FileX, Mail, Wallet, HomeIcon, Briefcase, HeartPulse, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { navigateBackOrHome } from "@/lib/navigation";

const problems = [
  {
    icon: Briefcase, title: "Kündigung erhalten", description: "Dobio/la si otkaz — šta sada?",
    content: ["Provjeri da li je otkaz u pisanoj formi i potpisan — usmeni otkaz nije važeći.", "Rok za tužbu (Kündigungsschutzklage) je 3 sedmice od prijema otkaza.", "Prijavi se odmah kod Arbeitsagentur — najkasnije 3 dana nakon saznanja.", "Ako si član sindikata, odmah se obrati njima za pravnu pomoć."],
    law: "KSchG — Kündigungsschutzgesetz", source: "https://www.gesetze-im-internet.de/kschg/", source2: "https://www.arbeitsagentur.de/",
  },
  {
    icon: FileX, title: "Antrag abgelehnt", description: "Tvoj zahtjev je odbijen — kako uložiti prigovor.",
    content: ["Pročitaj rješenje pažljivo — rok za prigovor (Widerspruch) je obično 1 mjesec.", "Prigovor mora biti u pisanoj formi i poslan preporučenom poštom.", "Navedi zašto smatraš da je odluka pogrešna i priloži dokaze.", "Ako prigovor bude odbijen, možeš pokrenuti tužbu pred socijalnim sudom."],
    law: "VwVfG — Verwaltungsverfahrensgesetz", source: "https://www.gesetze-im-internet.de/vwvfg/",
  },
  {
    icon: Mail, title: "Brief vom Amt bekommen", description: "Pismo od institucije — kako ga razumjeti i reagovati.",
    content: ["Provjeri pošiljaoca i datum — rokovi se računaju od dana dostave.", "Žuti koverat (Zustellungsurkunde) znači da rok teče odmah.", "Ako ne razumiješ sadržaj, potraži pomoć u Beratungsstelle ili kod advokata.", "Nikada ne ignoriši pisma od institucija — čak i ako ne razumiješ jezik."],
    law: "VwZG — Verwaltungszustellungsgesetz", source: "https://www.gesetze-im-internet.de/vwzg/",
  },
  {
    icon: Wallet, title: "Finanzielle Probleme", description: "Financijske poteškoće — koja pomoć ti pripada.",
    content: ["Bürgergeld: osnovna naknada za tražitelje posla (Jobcenter).", "Wohngeld: stambeni dodatak za osobe s niskim primanjima.", "Kinderzuschlag: dodatak za porodice s niskim primanjima.", "Schuldnerberatung: besplatno savjetovanje o dugovima."],
    law: "SGB II, WoGG", source: "https://www.gesetze-im-internet.de/sgb_2/", source2: "https://www.arbeitsagentur.de/",
  },
  {
    icon: HomeIcon, title: "Streit mit Vermieter", description: "Problem sa stanodavcem — tvoja prava kao stanar.",
    content: ["Otkaz stana od strane stanodavca mora biti u pisanoj formi s obrazloženjem.", "Zakonski otkazni rok zavisi od trajanja najma (min. 3 mjeseca).", "Povećanje stanarine mora ispunjavati zakonske uslove (Mietpreisbremse).", "Za pravnu pomoć obrati se Mieterverein (udruženje stanara)."],
    law: "BGB §§ 535-580a — Mietrecht", source: "https://www.gesetze-im-internet.de/bgb/",
  },
  {
    icon: AlertTriangle, title: "Probleme mit Arbeitgeber", description: "Problemi na poslu — zaštita, prigovori, savjeti.",
    content: ["Dokumentiraj sve incidente pisanim putem (email, pismo).", "Obrati se Betriebsrat (radničko vijeće) ako postoji u firmi.", "Za diskriminaciju ili mobbing postoji Allgemeines Gleichbehandlungsgesetz (AGG).", "Besplatnu pravnu pomoć možeš dobiti kod Arbeitsgericht (radni sud)."],
    law: "ArbSchG, AGG", source: "https://www.gesetze-im-internet.de/arbschg/",
  },
  {
    icon: HeartPulse, title: "Pflegefall in der Familie", description: "Član porodice treba njegu — Pflegegrad, podrška, prava.",
    content: ["Zatraži procjenu stepena njege (Pflegegrad) kod zdravstvene blagajne.", "Pflegegrad 1-5: svaki stepen donosi različite naknade i usluge.", "Imaš pravo na 10 dana plaćenog odsustva za hitnu njegu (Pflegeunterstützungsgeld).", "Pflegestützpunkte nude besplatno savjetovanje u tvom gradu."],
    law: "SGB XI — Soziale Pflegeversicherung", source: "https://www.gesetze-im-internet.de/sgb_11/", source2: "https://www.bundesgesundheitsministerium.de/",
  },
];

function ProblemCard({ item }: { item: typeof problems[number] }) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
          <item.icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold">{item.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 pl-14">
        {item.content.map((line, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground/80">{line}</p>
        ))}
      </div>
      <div className="mt-4 border-t pt-3 pl-14">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Gesetzliche Grundlage:</span> {item.law}
        </p>
        <div className="mt-1 flex flex-wrap gap-3">
          <a href={item.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
            Offizielle Quelle <ArrowRight className="h-3 w-3" />
          </a>
          {item.source2 && (
            <a href={item.source2} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Weitere Quelle <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrebamPomoc() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container">
          <button onClick={() => navigateBackOrHome(navigate)} className="mb-4 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> Nazad
          </button>
          <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.help.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Imaš problem? Pronađi rješenje korak po korak.
          </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            {problems.map((item, idx) => (
              <ProblemCard key={idx} item={item} />
            ))}
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
