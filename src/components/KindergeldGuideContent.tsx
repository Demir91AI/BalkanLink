import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import KindergeldFieldGuide from "@/components/kindergeld/KindergeldFieldGuide";

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
const STAGES = ["orient", "prepare", "access", "apply", "after"] as const;

const linkCls = "inline-flex items-center gap-1.5 text-[hsl(var(--gold))] underline-offset-2 hover:underline";

export default function KindergeldGuideContent() {
  const { t } = useTranslation("pages");
  const [c, setC] = useState<Case>("newborn");
  const k = (s: string) => `guideFirst.kindergeld.${s}`;

  return (
    <div className="space-y-6" data-testid="kindergeld-smartguide">
      <header className="rounded-2xl border border-[hsl(var(--gold))]/50 bg-card p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--gold))]">SmartGuide · Kindergeld</p>
        <h2 className="mt-1 text-xl font-bold text-foreground">{t(k("title"))}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(k("lead"))}</p>
      </header>

      <section aria-labelledby="kg-case">
        <p id="kg-case" className="mb-2 text-sm font-semibold text-foreground">{t(k("caseQ"))}</p>
        <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
          {CASES.map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={c === id}
              onClick={() => setC(id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                c === id
                  ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))] font-semibold text-[hsl(var(--background))]"
                  : "border-border bg-popover text-foreground hover:border-[hsl(var(--gold))]",
              )}
            >
              {t(k(`case.${id}`))}
            </button>
          ))}
        </div>
      </section>

      {c === "newborn" && <KindergeldFieldGuide onlineUrl={ONLINE_URL} />}

      {c !== "newborn" && (
        <section data-testid={`kg-special-${c}`} className="rounded-2xl border border-amber-500/30 bg-amber-950 p-5 text-sm text-foreground">
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
            <button type="button" onClick={() => setC("newborn")} className="mt-1 self-start text-sm font-semibold text-[hsl(var(--gold))] underline-offset-2 hover:underline">
              {t(k("special.back"))}
            </button>
          </div>
        </section>
      )}

      {c === "newborn" && (
      <details className="border-b border-border pb-4">
      <summary className="cursor-pointer py-2 text-sm font-semibold text-foreground">{t(k("processTitle"))}</summary>
      <ol className="mt-3 space-y-3">
        {STAGES.map((s, i) => (
          <li key={s} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/15 text-sm font-bold text-[hsl(var(--gold))]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">{t(k(`stage.${s}.title`))}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(k(`stage.${s}.body`))}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      </details>
      )}


      <section className="rounded-2xl border border-border bg-card p-4">
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
