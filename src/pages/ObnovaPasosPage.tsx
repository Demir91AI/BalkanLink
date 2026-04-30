import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ExternalLink, MapPin, AlertTriangle, Info, CheckCircle2, FileText, Globe } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { obnovaPassportContent, type ObnovaDrzava } from "@/data/obnovaPassportContent";

type Lang = "BA" | "HR" | "SR" | "DE";

const LANG_MAP: Record<string, Lang> = {
  bs: "BA",
  hr: "HR",
  sr: "SR",
  de: "DE",
};

const T = {
  title: {
    BA: "Obnova Pasoša i Lične Karte u Njemačkoj",
    HR: "Obnova Putovnice i Osobne Iskaznice u Njemačkoj",
    SR: "Obnova Pasoša i Lične Karte u Nemačkoj",
    DE: "Reisepass & Personalausweis erneuern in Deutschland",
  },
  subtitle: {
    BA: "Sve što trebaš znati — gdje, šta i kako za svakog Balkanca u Dijaspori",
    HR: "Sve što trebaš znati — gdje, što i kako za svakog Balkanca u Dijaspori",
    SR: "Sve što treba znati — gde, šta i kako za svakog Balkanca u Dijaspori",
    DE: "Alles, was du wissen musst — wo, was und wie für jeden Balkanbürger in der Diaspora",
  },
  infoBanner: {
    BA: "Svi zahtjevi za obnovu pasoša ili lične karte podnose se isključivo LIČNO u konzulatu/ambasadi. Obnova nije moguća online niti poštom. Svaki podnosilac — uključujući djecu — mora biti fizički prisutan.",
    HR: "Svi zahtjevi za obnovu putovnice ili osobne iskaznice podnose se isključivo OSOBNO u konzulatu/ambasadi. Obnova nije moguća online niti poštom. Svaki podnositelj — uključujući djecu — mora biti fizički prisutan.",
    SR: "Svi zahtevi za obnovu pasoša ili lične karte podnose se isključivo LIČNO u konzulatu/ambasadi. Obnova nije moguća online niti poštom. Svaki podnosilac — uključujući decu — mora biti fizički prisutan.",
    DE: "Alle Anträge auf Erneuerung von Reisepass oder Personalausweis müssen PERSÖNLICH im Konsulat/in der Botschaft gestellt werden. Eine Online- oder Postbeantragung ist nicht möglich. Jeder Antragsteller — einschließlich Kinder — muss persönlich erscheinen.",
  },
  konzulati: {
    BA: "Konzulati i ambasade",
    HR: "Konzulati i veleposlanstva",
    SR: "Konzulati i ambasade",
    DE: "Konsulate und Botschaften",
  },
  konzularnoPodrucje: {
    BA: "Konzularno područje:",
    HR: "Konzularno područje:",
    SR: "Konzularno područje:",
    DE: "Konsularischer Amtsbezirk:",
  },
  pasos: {
    BA: "Pasoš",
    HR: "Putovnica",
    SR: "Pasoš",
    DE: "Reisepass",
  },
  licna: {
    BA: "Lična karta",
    HR: "Osobna iskaznica",
    SR: "Lična karta",
    DE: "Personalausweis",
  },
  rokVazenja: {
    BA: "Rok važenja",
    HR: "Rok važenja",
    SR: "Rok važenja",
    DE: "Gültigkeitsdauer",
  },
  kadPodnjeti: {
    BA: "Kada podnijeti zahtjev",
    HR: "Kada podnijeti zahtjev",
    SR: "Kada podneti zahtev",
    DE: "Wann den Antrag stellen",
  },
  dokumenti: {
    BA: "Potrebni dokumenti",
    HR: "Potrebni dokumenti",
    SR: "Potrebni dokumenti",
    DE: "Erforderliche Unterlagen",
  },
  obrada: {
    BA: "Vrijeme obrade",
    HR: "Vrijeme obrade",
    SR: "Vreme obrade",
    DE: "Bearbeitungszeit",
  },
  cijena: {
    BA: "Cijena",
    HR: "Cijena",
    SR: "Cena",
    DE: "Gebühren",
  },
  napomena: {
    BA: "Napomena",
    HR: "Napomena",
    SR: "Napomena",
    DE: "Hinweis",
  },
  opstaNapomena: {
    BA: "Opšta napomena i radno vrijeme",
    HR: "Opća napomena i radno vrijeme",
    SR: "Opšta napomena i radno vreme",
    DE: "Allgemeiner Hinweis & Öffnungszeiten",
  },
  disclaimer: {
    BA: "Informacije na ovoj stranici su općeg karaktera. Konzularne naknade, rokovi i dokumentacija mogu se mijenjati bez prethodne najave. Uvijek provjeri aktuelne informacije direktno na web stranici nadležnog konzulata prije odlaska.",
    HR: "Informacije na ovoj stranici su općeg karaktera. Konzularne pristojbe, rokovi i dokumentacija mogu se mijenjati bez prethodne najave. Uvijek provjeri aktualne informacije izravno na web stranici nadležnog konzulata prije odlaska.",
    SR: "Informacije na ovoj stranici su opšteg karaktera. Konzularne naknade, rokovi i dokumentacija mogu se menjati bez prethodne najave. Uvek proveri aktuelne informacije direktno na web stranici nadležnog konzulata pre odlaska.",
    DE: "Die Informationen auf dieser Seite sind allgemeiner Natur. Konsulargebühren, Bearbeitungszeiten und Dokumentenanforderungen können sich ohne Vorankündigung ändern. Bitte aktuelle Informationen immer direkt auf der Webseite des zuständigen Konsulats prüfen.",
  },
  visitWebsite: {
    BA: "Web stranica",
    HR: "Web stranica",
    SR: "Web stranica",
    DE: "Webseite",
  },
};

function CountryPanel({ drzava, lang }: { drzava: ObnovaDrzava; lang: Lang }) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Konzulati */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-[hsl(var(--gold))]" />
            {T.konzulati[lang]}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {drzava.konzulati.map((k, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border bg-muted/30 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{k.grad}</h3>
                <a
                  href={k.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--gold))] hover:underline shrink-0"
                  aria-label={T.visitWebsite[lang]}
                >
                  <Globe className="h-3.5 w-3.5" />
                  {T.visitWebsite[lang]}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-1 text-sm text-foreground/80">{k.adresa}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">{T.konzularnoPodrucje[lang]} </span>
                {k.konzularnoPodrucje}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pasoš + Lična karta accordion */}
      <Card>
        <CardContent className="p-2 sm:p-4">
          <Accordion type="multiple" defaultValue={["pasos"]} className="w-full">
            {/* PASOŠ */}
            <AccordionItem value="pasos" className="border-b border-border">
              <AccordionTrigger className="text-base font-semibold hover:no-underline px-2">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[hsl(var(--gold))]" />
                  {T.pasos[lang]}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                <div className="space-y-4">
                  <Row label={T.rokVazenja[lang]} value={drzava.pasos.rokVazenja[lang]} />
                  <Row label={T.kadPodnjeti[lang]} value={drzava.pasos.kadPodnjeti[lang]} />
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      {T.dokumenti[lang]}
                    </p>
                    <ul className="space-y-1.5 pl-1">
                      {drzava.pasos.dokumenti[lang].map((d, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Row label={T.obrada[lang]} value={drzava.pasos.obrada[lang]} />
                  <div>
                    <p className="mb-1.5 text-sm font-semibold text-foreground">
                      {T.cijena[lang]}
                    </p>
                    <div className="rounded-md border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 px-3 py-2 text-sm text-foreground">
                      {drzava.pasos.cijena[lang]}
                    </div>
                  </div>
                  {drzava.pasos.napomena && (
                    <div className="flex gap-2 rounded-md border border-amber-300/50 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-100">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>
                        <span className="font-semibold">{T.napomena[lang]}: </span>
                        {drzava.pasos.napomena[lang]}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* LIČNA KARTA */}
            <AccordionItem value="licna" className="border-b-0">
              <AccordionTrigger className="text-base font-semibold hover:no-underline px-2">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[hsl(var(--gold))]" />
                  {T.licna[lang]}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                {drzava.licna.moguce ? (
                  <div className="space-y-3">
                    <div className="flex gap-2 rounded-md border border-emerald-300/50 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-100">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>{drzava.licna.info[lang]}</p>
                    </div>
                    {drzava.licna.dokumenti && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-foreground">
                          {T.dokumenti[lang]}
                        </p>
                        <ul className="space-y-1.5 pl-1">
                          {drzava.licna.dokumenti[lang].map((d, i) => (
                            <li key={i} className="flex gap-2 text-sm text-foreground/85">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {drzava.licna.obrada && (
                      <Row label={T.obrada[lang]} value={drzava.licna.obrada[lang]} />
                    )}
                    {drzava.licna.cijena && (
                      <Row label={T.cijena[lang]} value={drzava.licna.cijena[lang]} />
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2 rounded-md border border-red-300/50 bg-red-50 px-3 py-2.5 text-sm text-red-900 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{drzava.licna.info[lang]}</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Opšta napomena */}
      <Card className="bg-muted/40">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Info className="h-4 w-4" />
            {T.opstaNapomena[lang]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {drzava.opstaNapomena[lang]}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
      <p className="text-sm text-foreground/80 leading-relaxed">{value}</p>
    </div>
  );
}

export default function ObnovaPasosPage() {
  const { i18n } = useTranslation();
  const lang: Lang = LANG_MAP[i18n.language?.slice(0, 2) ?? "bs"] ?? "BA";
  const [activeId, setActiveId] = useState<string>("bih");

  const active = useMemo(
    () => obnovaPassportContent.find((d) => d.id === activeId) ?? obnovaPassportContent[0],
    [activeId]
  );

  return (
    <div className="container mx-auto max-w-5xl px-3 sm:px-4 py-4 sm:py-6">
      <Helmet>
        <title>{T.title[lang]} | BalkanLink</title>
        <meta name="description" content={T.subtitle[lang]} />
      </Helmet>

      <Breadcrumbs />

      {/* Hero */}
      <header className="mt-2 mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          {T.title[lang]}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          {T.subtitle[lang]}
        </p>
      </header>

      {/* Info banner */}
      <div className="mb-5 flex gap-3 rounded-xl border border-blue-300/40 bg-blue-50 px-4 py-3 text-sm text-blue-950 dark:border-blue-500/30 dark:bg-blue-950/30 dark:text-blue-100">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />
        <p className="leading-relaxed">{T.infoBanner[lang]}</p>
      </div>

      {/* Country tabs */}
      <div
        className="mb-5 -mx-3 sm:mx-0 overflow-x-auto"
        role="tablist"
        aria-label="Države"
      >
        <div className="flex gap-2 px-3 sm:px-0 pb-1 min-w-max">
          {obnovaPassportContent.map((d) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(d.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-[hsl(var(--gold))]/50 hover:text-foreground"
                }`}
              >
                <span className="text-base leading-none">{d.zastavica}</span>
                <span>{d.naziv[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Country content */}
      <CountryPanel drzava={active} lang={lang} />

      {/* Bottom disclaimer */}
      <div className="mt-6 flex gap-3 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-100">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" />
        <p className="leading-relaxed">{T.disclaimer[lang]}</p>
      </div>
    </div>
  );
}
