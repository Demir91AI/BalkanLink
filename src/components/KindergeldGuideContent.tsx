import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Info, ShieldCheck } from "lucide-react";
import KindergeldFieldGuide from "@/components/kindergeld/KindergeldFieldGuide";
import SmartGuide, { type SmartGuideStep } from "@/components/guide-first/SmartGuide";
import { getGuideSource } from "@/lib/guide-first/official-sources";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

/**
 * Kindergeld newborn SmartGuide (guide-first cutover, 2026-10-27).
 * No personal data is collected; the user completes the application on the
 * official BA / Familienkasse portal. Facts checked against the BA pages listed
 * in SOURCES on 27.10.2026.
 */
const ONLINE_URL = "https://www.arbeitsagentur.de/familie-und-kinder/eservices-fuer-familien";
const SOURCES = [
  { key: "anspruch", url: "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-anspruch-hoehe-dauer" },
  { key: "nachweise", url: "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/nachweise-einreichen" },
  { key: "eservices", url: ONLINE_URL },
  { key: "formulare", url: "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld" },
] as const;

type Case = "newborn" | "adult" | "cross";
const SPECIAL_URL: Record<Exclude<Case, "newborn">, string> = {
  adult: "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-ab-18-jahren",
  cross: "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld/kindergeld-ausland",
};
const CASES: Case[] = ["newborn", "adult", "cross"];

const linkCls = "inline-flex items-center gap-1.5 text-[hsl(var(--gold))] underline-offset-2 hover:underline";

export default function KindergeldGuideContent() {
  const { t } = useTranslation("pages");
  const [c, setC] = useState<Case>("newborn");
  const k = (s: string) => `guideFirst.kindergeld.${s}`;
  const steps = t(k("workflow.steps"), { returnObjects: true }) as SmartGuideStep[];
  const summary = t(k("workflow.summary"), { returnObjects: true }) as string[];
  const newbornSteps = steps.map((step) => ({ ...step,
    content: step.id === "fields" ? <KindergeldFieldGuide onlineUrl={ONLINE_URL} /> :
      step.id === "portal" || step.id === "submit" ? <Button asChild className="h-auto min-h-11 w-full whitespace-normal py-3"><a href={ONLINE_URL} target="_blank" rel="noopener noreferrer">{t(k("ctaOnline"))}<ExternalLink aria-hidden="true" className="h-4 w-4" /></a></Button> : undefined,
  }));

  return (
    <div className="space-y-6" data-testid="kindergeld-smartguide">
      <section aria-labelledby="kg-case">
        <p id="kg-case" className="mb-2 text-sm font-semibold text-foreground">{t(k("caseQ"))}</p>
        <Tabs value={c} onValueChange={(v) => { if (v === "newborn" || v === "adult" || v === "cross") setC(v); }}>
        <TabsList aria-labelledby="kg-case" className="grid h-auto w-full grid-cols-1 gap-2 bg-popover sm:grid-cols-3">
          {CASES.map((id) => (
            <TabsTrigger
              key={id}
              value={id}
              onClick={() => setC(id)}
              className="min-h-11 whitespace-normal rounded-md px-3 py-3 text-sm text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t(k(`case.${id}`))}
            </TabsTrigger>
          ))}
        </TabsList>
        </Tabs>
      </section>

      {c === "newborn" && <SmartGuide id="kindergeld-newborn" title={t(k("title"))} subtitle={t(k("lead"))}
        source={getGuideSource("kindergeld")} steps={newbornSteps} summary={summary} />}

      {c !== "newborn" && (
        <section data-testid={`kg-special-${c}`} className="rounded-lg border border-border bg-card p-5 text-sm text-foreground">
          <h3 className="font-semibold text-foreground">{t(k(`special.${c}.title`))}</h3>
          <p className="mt-2 leading-relaxed">{t(k(`special.${c}.body`))}</p>
          <p className="mt-2 leading-relaxed">{t(k("special.depends"))}</p>
          <div className="mt-4 flex flex-col gap-2">
            <a href={SPECIAL_URL[c]} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--gold))] px-4 py-3 font-bold text-[hsl(var(--background))]">
              {t(k(`special.${c}.cta`))} <ExternalLink className="h-4 w-4" />
            </a>
            <a href={SOURCES[3].url} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {t(k("src.formulare"))} <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button variant="link" onClick={() => setC("newborn")} className="mt-1 min-h-11 self-start text-sm font-semibold text-primary">
              {t(k("special.back"))}
            </Button>
          </div>
        </section>
      )}


      <section className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-[hsl(var(--gold))]">
          <ShieldCheck className="h-4 w-4" />
          <h3 className="text-sm font-bold uppercase tracking-wide">{t(k("sourcesTitle"))}</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          {SOURCES.map((s) => (
            <li key={s.key}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {t(k(`src.${s.key}`))} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">{t(k("verified"))}</p>
        <p className="mt-2 flex gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{t(k("disclaimer"))}</span>
        </p>
      </section>
    </div>
  );
}
