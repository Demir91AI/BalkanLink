import { Store, AlertCircle, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BIZNIS_CATEGORIES } from "@/lib/biznis-data";
import { getLocalizedBiznisGuides } from "@/lib/biznis-i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { CheckCircle, AlertTriangle, Lightbulb, BookOpen, Info } from "lucide-react";

const BORDER_COLORS: Record<string, string> = {
  osnove: "border-l-blue-500",
  "eu-vs-trecezemlje": "border-l-emerald-500",
  pokretanje: "border-l-orange-500",
  porezi: "border-l-green-500",
  fakturisanje: "border-l-teal-500",
  obaveze: "border-l-indigo-500",
  "posebne-situacije": "border-l-amber-500",
  "greske-zatvaranje": "border-l-red-500",
  faq: "border-l-gray-500",
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function BiznisNjemacka() {
  const { t, i18n } = useTranslation("pages");

  const localizedGuides = useMemo(
    () => getLocalizedBiznisGuides(i18n.language),
    [i18n.language]
  );

  const allGuides = BIZNIS_CATEGORIES.flatMap((cat) =>
    localizedGuides
      .filter((g) => g.categoryId === cat.id)
      .map((g) => ({ ...g, catId: cat.id, catIcon: cat.icon, catLabel: cat.label }))
  );

  // i18n labels for category pills (fallback to original BS if not present)
  const pillLabel = (catId: string, fallback: string) =>
    t(`biznis.categories.${catId}`, { defaultValue: fallback });

  return (
    <>
      <SEO
        title={t("biznis.seoTitle", { defaultValue: "Biznis u Njemačkoj — Gewerbe vodič | BalkanLink" })}
        description={t("biznis.seoDescription", { defaultValue: "Sve o pokretanju i vođenju biznisa u Njemačkoj: Gewerbe, porezi, dokumenti, obaveze. Aktuelno za 2025/2026." })}
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        {/* Hero */}
        <div className="rounded-2xl bg-[#F5F0E8] p-6 sm:p-8 mb-6 text-center">
          <Store className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("biznis.heroTitle", { defaultValue: "Biznis u Njemačkoj" })}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto mb-3">
            {t("biznis.heroSubtitle", { defaultValue: "Gewerbe, samozaposlenje i poslovanje — vodič za početnike · Stand 2026" })}
          </p>
          <Badge variant="outline" className="text-xs">
            {t("biznis.heroBadge", { defaultValue: "📌 Informativnog karaktera — ne predstavlja pravni, porezni niti poslovni savjet" })}
          </Badge>
        </div>

        {/* Pills */}
        <div className="sticky top-14 z-20 -mx-4 px-4 py-2 bg-background/95 backdrop-blur mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {BIZNIS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className="whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
              >
                {pillLabel(cat.id, cat.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <Accordion type="multiple" className="space-y-3">
          {allGuides.map((guide) => {
            const borderColor = BORDER_COLORS[guide.catId] || "border-l-gray-400";
            const Icon = guide.catIcon;
            return (
              <AccordionItem
                key={guide.slug}
                value={guide.slug}
                id={guide.catId}
                className={`scroll-mt-28 border-l-4 ${borderColor} rounded-xl border bg-card`}
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-bold text-sm sm:text-base">{guide.title}</p>
                      <p className="text-xs text-muted-foreground">{guide.germanTerm}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-4 text-sm leading-relaxed">
                    {/* Explanation */}
                    <div className="rounded-xl border border-border bg-card p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                        {t("biznis.sections.explanation", { defaultValue: "Šta je to / Objašnjenje" })}
                      </h3>
                      {guide.explanation.split("\n\n").map((p, i) => (
                        <p key={i} className="text-muted-foreground mb-2 last:mb-0 whitespace-pre-line">{p}</p>
                      ))}
                    </div>

                    {/* Rules */}
                    <div className="rounded-xl border border-border bg-card p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                        <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                        {t("biznis.sections.rules", { defaultValue: "Najvažnija pravila" })}
                      </h3>
                      <ul className="space-y-1.5">
                        {guide.rules.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="h-3 w-3 mt-1 shrink-0 text-green-500" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />{" "}
                        {t("biznis.sections.examples", { defaultValue: "Praktični primjeri" })}
                      </h3>
                      <ul className="space-y-1.5">
                        {guide.examples.map((e, i) => (
                          <li key={i} className="flex items-start gap-2 text-amber-800">
                            <span className="font-bold text-amber-500 shrink-0 mt-0.5">→</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Warnings */}
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-500" />{" "}
                        {t("biznis.sections.warnings", { defaultValue: "Na šta posebno paziti" })}
                      </h3>
                      <ul className="space-y-1.5">
                        {guide.warnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-red-700">
                            <AlertTriangle className="h-3 w-3 mt-1 shrink-0 text-red-400" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Myths */}
                    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                        <Info className="h-3.5 w-3.5 text-purple-500" />{" "}
                        {t("biznis.sections.myths", { defaultValue: "Česte greške / Mitovi" })}
                      </h3>
                      <ul className="space-y-2">
                        {guide.myths.map((m, i) => (
                          <li key={i} className="text-purple-800 border-l-2 border-purple-300 pl-3">{m}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Sources */}
                    <div className="text-xs text-muted-foreground">
                      <strong>{t("biznis.sections.sources", { defaultValue: "Izvori" })}:</strong> {guide.sources.join(" · ")}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Footer — Korisni linkovi */}
        <Card className="bg-blue-50 border-blue-200 mt-6">
          <CardContent className="p-5 sm:p-6">
            <h3 className="font-bold mb-4">
              {t("biznis.officialSourcesTitle", { defaultValue: "Službeni izvori i pomoć" })}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "IHK Deutschland", url: "https://www.ihk.de", descKey: "biznis.links.ihkDesc", descFallback: "Registracija biznisa, savjeti za poduzetnike" },
                { label: "Unternehmensregister", url: "https://www.unternehmensregister.de", descKey: "biznis.links.unternehmensregisterDesc", descFallback: "Prijava obrta i provjera registra" },
                { label: "Finanzamt ELSTER", url: "https://www.elster.de", descKey: "biznis.links.elsterDesc", descFallback: "Online prijava poreza i Steuernummer" },
                { label: "Minijob-Zentrale", url: "https://www.minijob-zentrale.de", descKey: "biznis.links.minijobDesc", descFallback: "Sve o Minijob zaposlenju" },
              ].map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-lg border bg-background p-3 hover:bg-accent transition-colors">
                  <ExternalLink className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" />
                  <div>
                    <span className="font-medium text-sm">{l.label}</span>
                    <p className="text-xs text-muted-foreground">
                      {t(l.descKey, { defaultValue: l.descFallback })}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-yellow-50 border-yellow-300 mt-3">
          <CardContent className="p-5 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">
                {t("biznis.disclaimerTitle", { defaultValue: "Napomena" })}
              </p>
              <p className="text-sm text-yellow-900">
                {t("biznis.disclaimerBody", { defaultValue: "Informacije na ovoj stranici su opće prirode i ne zamjenjuju pravni, porezni niti poslovni savjet. Za konkretne slučajeve konsultiraj Steuerberater, advokata ili nadležne institucije." })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
