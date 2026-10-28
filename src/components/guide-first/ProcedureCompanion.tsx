import { useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmartGuide from "./SmartGuide";
import { getGuideSource } from "@/lib/guide-first/official-sources";
import type { ArrivalProcedure, ArrivalSlug } from "@/lib/guide-first/arrival-model";
import { isFamilySlug, type FamilySlug } from "@/lib/guide-first/family-model";
import type { CareerSlug } from "@/lib/guide-first/career-model";
import type { EducationSlug } from "@/lib/guide-first/education-model";
import type { DocumentsSlug } from "@/lib/guide-first/documents-model";
import { isGrundsicherungSlug, type GrundsicherungSlug } from "@/lib/guide-first/grundsicherung-model";

/** Portable procedure + vocabulary companion. No answers, field mapping or storage. */
interface CompanionOverrides {
  /** Pre-resolved localized content (e.g. Wohngeld variants); default reads by slug. */
  content?: ArrivalProcedure;
  /** Links that exactly match the user's selection; replaces the slug source links. */
  links?: { url: string; label: string }[];
  verifiedOn?: string;
  variant?: string;
}
export default function ProcedureCompanion({ slug, content, links, verifiedOn, variant }: { slug: ArrivalSlug | FamilySlug | GrundsicherungSlug | "wohngeld" | CareerSlug | EducationSlug | DocumentsSlug } & CompanionOverrides) {
  const { t } = useTranslation("pages");
  const family = isFamilySlug(slug);
  const grundsicherung = isGrundsicherungSlug(slug);
  const data = content ?? t(`${grundsicherung ? "grundsicherungCompanions" : family ? "familyCompanions" : "arrivalCompanions"}.guides.${slug}`, { returnObjects: true }) as ArrivalProcedure;
  const fui = (key: string) => t(`${grundsicherung ? "grundsicherungCompanions" : "familyCompanions"}.ui.${key}`);
  const [gateChoice, setGateChoice] = useState<string | null>(null);
  const ui = (key: string, values?: Record<string, string | number>) => t(`arrivalCompanions.ui.${key}`, values);
  const [termIndex, setTermIndex] = useState(0);
  const [mode, setMode] = useState<"paper" | "online">("paper");
  const termHeading = useRef<HTMLHeadingElement>(null);
  const navId = useId();
  const baseSource = getGuideSource(slug);
  const source = verifiedOn ? { ...baseSource, verifiedOn } : baseSource;
  const term = data.terms[termIndex];
  const jumpTerm = (index: number) => {
    setTermIndex(index);
    requestAnimationFrame(() => termHeading.current?.focus({ preventScroll: true }));
  };
  if (!term) return null;
  const sourceLinks = links ?? [source.url ? { url: source.url, label: source.label ?? ui("official") } : null, ...(source.extraLinks ?? [])].filter((link) => link !== null);
  return <section data-testid="arrival-companion" data-slug={slug} data-variant={variant} data-family={family || undefined} className="smartguide-standard min-w-0 space-y-6 text-foreground">
    <header className="space-y-3">
      <h2 className="break-words text-xl font-bold">{data.title}</h2>
      <p className="text-sm leading-6">{data.introduction}</p>
      <p className="guide-block-neutral border-l-4 p-4 text-sm leading-6">{data.variation}</p>
      <p className="text-sm">{source.verifiedOn ? t("smartGuideStandard.verified", { date: source.verifiedOn }) : t("smartGuideStandard.verify")}</p>
      <div className="flex flex-wrap gap-2">{sourceLinks.map((link) => <Button key={link.url} asChild variant="outline" className="h-auto min-h-11 max-w-full whitespace-normal py-3 text-left"><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="sr-only">{t("smartGuideStandard.newTab")}</span></a></Button>)}</div>
    </header>
    {data.gate && <section data-testid="companion-gate" className="guide-block-mistake space-y-3 rounded-md border border-border border-l-4 p-4" aria-label={data.gate.title}>
      <h3 className="text-lg font-bold">{data.gate.title}</h3>
      <p className="text-sm leading-6">{data.gate.question}</p>
      <div role="group" aria-label={data.gate.question} className="flex flex-wrap gap-2">{data.gate.options.map((option) => <Button key={option.id} variant={gateChoice === option.id ? "default" : "outline"} className="h-auto min-h-11 max-w-full whitespace-normal text-left" aria-pressed={gateChoice === option.id} onClick={() => setGateChoice(option.id)}>{option.label}</Button>)}</div>
      <p className="whitespace-pre-line text-sm font-semibold leading-6" aria-live="polite" data-testid="companion-gate-result">{data.gate.options.find((option) => option.id === gateChoice)?.result ?? fui("gatePrompt")}</p>
    </section>}
    <div className="space-y-3 border-y border-border py-4">
      <div role="group" aria-label={ui("mode")} className="flex flex-wrap gap-2">{(["paper", "online"] as const).map((value) => <Button key={value} variant={mode === value ? "default" : "outline"} className="h-auto min-h-11 whitespace-normal" aria-pressed={mode === value} onClick={() => setMode(value)}>{ui(value)}</Button>)}</div>
      <p className="text-sm leading-6" data-testid="arrival-mode-note">{data.modes[mode]}</p>
    </div>
    <section className="space-y-4" aria-label={ui("vocabulary")}>
      <h3 className="text-lg font-bold">{ui("vocabulary")}</h3>
      <p className="text-sm leading-6">{data.vocabularyNote ?? ui("vocabularyNote")}</p>
      <label htmlFor={navId} className="block text-sm font-semibold">{ui("jumpTerm")}</label>
      <select id={navId} data-nav="arrival-terms" className="min-h-11 w-full min-w-0 max-w-full rounded-md border border-border bg-background p-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring" value={termIndex} onChange={(event) => jumpTerm(Number(event.target.value))}>
        {data.terms.map((item, index) => <option key={item.id} value={index}>{item.german} — {item.meaning}</option>)}
      </select>
      <h4 ref={termHeading} tabIndex={-1} className="break-words text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{term.german} — {term.meaning}</h4>
      {term.reference && <p data-testid="term-reference" className="guide-block-where rounded-md border border-border border-l-4 p-3 text-sm font-semibold leading-6">{fui("reference")}: {term.reference}</p>}
      {term.options && <ul className="space-y-3 border-l-4 border-primary pl-4">{term.options.map((option) => <li key={option.german} className="text-sm leading-6"><strong>{option.german}</strong><p>{option.meaning}</p></li>)}</ul>}
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">{([
        ["instruction", term.instruction, "guide-block-action"], ["where", term.where, "guide-block-where"], ["example", term.example, "guide-block-neutral"], ["mistake", term.mistake, "guide-block-mistake"],
      ] as const).map(([key, text, tone]) => <section key={key} className={`${tone} min-w-0 rounded-md border border-border border-l-4 p-4`}><h5 className="mb-2 text-sm font-bold">{ui(key)}</h5><p className="whitespace-pre-line break-words text-sm leading-6">{text}</p></section>)}</div>
      <div className="flex flex-wrap justify-between gap-3"><Button variant="outline" disabled={termIndex === 0} onClick={() => jumpTerm(termIndex - 1)}><ArrowLeft aria-hidden="true" className="h-4 w-4" />{ui("previousTerm")}</Button><Button variant="outline" disabled={termIndex === data.terms.length - 1} onClick={() => jumpTerm(termIndex + 1)}>{ui("nextTerm")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Button></div>
    </section>
    <SmartGuide key={slug} title={ui("procedure")} subtitle={ui("privacy")} steps={data.steps} reviewFlow={{
      advance: ui("advance"), finish: ui("finish"), reviewed: ui("reviewed"), unmark: ui("unmark"),
      count: (count, total) => ui("count", { count, total }), announcement: (title) => ui("announcement", { title }),
      completionTitle: ui("completionTitle"), completionBody: ui("completionBody"), reopen: ui("reopen"),
      actions: <p className="text-sm leading-6">{ui("privacy")}</p>,
    }} />
  </section>;
}