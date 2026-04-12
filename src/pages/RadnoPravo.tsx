import { Briefcase, AlertCircle, ExternalLink } from "lucide-react";
import { RADNO_PRAVO_CATEGORIES, getGuidesByCategory } from "@/lib/radno-pravo-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { CheckCircle, AlertTriangle, Lightbulb, BookOpen, Info } from "lucide-react";

const BORDER_COLORS: Record<string, string> = {
  ugovor: "border-l-blue-500",
  plata: "border-l-green-500",
  "radno-vrijeme": "border-l-orange-500",
  "odmor-bolovanje": "border-l-teal-500",
  porodica: "border-l-pink-500",
  otkaz: "border-l-red-500",
  "posebni-oblici": "border-l-indigo-500",
  zastita: "border-l-purple-500",
};

const pills = RADNO_PRAVO_CATEGORIES.map((cat) => ({ id: cat.id, label: cat.label }));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function RadnoPravo() {
  const allGuides = RADNO_PRAVO_CATEGORIES.flatMap((cat) =>
    getGuidesByCategory(cat.id).map((g) => ({ ...g, catId: cat.id, catIcon: cat.icon }))
  );

  return (
    <>
      <SEO
        title="Radno pravo u Njemačkoj | BalkanLink"
        description="Sve o radnom pravu u Njemačkoj: ugovor, plata, odmor, otkaz, Minijob i više. Aktuelno za 2026. godinu."
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        {/* Hero */}
        <div className="rounded-2xl bg-[#F5F0E8] p-6 sm:p-8 mb-6 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Radno pravo</h1>
          <p className="text-muted-foreground max-w-lg mx-auto mb-3">
            Prava i obaveze na radnom mjestu u Njemačkoj · Stand 2026
          </p>
          <Badge variant="outline" className="text-xs">
            📌 Informativnog karaktera — ne predstavlja pravni savjet
          </Badge>
        </div>

        {/* Pills */}
        <div className="sticky top-14 z-20 -mx-4 px-4 py-2 bg-background/95 backdrop-blur mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {pills.map((p) => (
              <button key={p.id} onClick={() => scrollTo(p.id)} className="whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors">
                {p.label}
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
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Šta je to / Objašnjenje
                      </h3>
                      <p className="text-muted-foreground">{guide.explanation}</p>
                    </div>

                    {/* Rules */}
                    <div className="rounded-xl border border-border bg-card p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                        <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" /> Najvažnija pravila
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
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Praktični primjeri
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
                        <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> Na šta posebno paziti
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
                        <Info className="h-3.5 w-3.5 text-purple-500" /> Česte greške / Mitovi
                      </h3>
                      <ul className="space-y-2">
                        {guide.myths.map((m, i) => (
                          <li key={i} className="text-purple-800 border-l-2 border-purple-300 pl-3">{m}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Sources */}
                    <div className="text-xs text-muted-foreground">
                      <strong>Izvori:</strong> {guide.sources.join(" · ")}
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
            <h3 className="font-bold mb-4">Službeni izvori i pomoć</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Bundesagentur für Arbeit", url: "https://www.arbeitsagentur.de", desc: "Naknada za nezaposlenost, poslovi, savjetovanje" },
                { label: "Bundesministerium für Arbeit", url: "https://www.bmas.de", desc: "Zakoni i propisi radnog prava" },
                { label: "Deutscher Gewerkschaftsbund", url: "https://www.dgb.de", desc: "Najveći sindikat — savjeti i zaštita radnika" },
                { label: "Mindestlohn-Kommission", url: "https://www.mindestlohn-kommission.de", desc: "Aktualna minimalna plaća i izmjene" },
              ].map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-lg border bg-background p-3 hover:bg-accent transition-colors">
                  <ExternalLink className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" />
                  <div>
                    <span className="font-medium text-sm">{l.label}</span>
                    <p className="text-xs text-muted-foreground">{l.desc}</p>
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
              <p className="font-semibold text-sm mb-1">Napomena</p>
              <p className="text-sm text-yellow-900">
                Informacije na ovoj stranici su opće prirode i ne zamjenjuju pravni savjet. Za konkretne situacije obratite se Arbeitsamt-u, sindikatu (Gewerkschaft) ili pravnom savjetniku.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
