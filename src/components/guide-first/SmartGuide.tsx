import { useId, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Check, ExternalLink, RotateCcw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { normalizeProgress, progressKey } from "@/lib/guide-first/progress";
import type { GuideSource } from "@/lib/guide-first/official-sources";

export type GuideBlockKind = "meaning" | "action" | "field" | "where" | "format" | "mistake" | "empty" | "example" | "note" | "next";
export interface GuideStepSections {
  meaning?: string;
  action?: string;
  where?: string;
  example?: string;
  mistake?: string;
  next?: string;
  /** Only for a source-verified native form field, never an eligibility step. */
  verifiedField?: { instruction: string; reference: string; format?: string };
}
export function sectionBlocks(sections: GuideStepSections): { kind: GuideBlockKind; text: string }[] {
  const kinds = ["meaning", "action", "where", "example", "mistake", "next"] as const;
  const blocks: { kind: GuideBlockKind; text: string }[] = kinds.flatMap((kind) => sections[kind]?.trim() ? [{ kind, text: sections[kind] ?? "" }] : []);
  if (sections.verifiedField?.instruction.trim() && sections.verifiedField.reference.trim()) {
    blocks.push({ kind: "field", text: `${sections.verifiedField.reference}\n${sections.verifiedField.instruction}` });
    if (sections.verifiedField.format) blocks.push({ kind: "format", text: sections.verifiedField.format });
  }
  return blocks;
}
export interface SmartGuideStep {
  id: string;
  title: string;
  reference?: string;
  subtitle?: string;
  sections?: GuideStepSections;
  blocks?: { kind: GuideBlockKind; text: string }[];
  content?: ReactNode;
  checklist?: string[];
}
interface Props {
  id?: string;
  steps: SmartGuideStep[];
  source?: GuideSource;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  isLocked?: (step: number) => boolean;
  lockedContent?: ReactNode;
  onFinish?: () => void;
  finishLabel?: string;
  title?: string;
  subtitle?: string;
  summary?: string[];
  /** Opt-in review flow; other hosts keep their existing toggle and access behavior. */
  reviewFlow?: {
    advance: string; finish: string; reviewed: string; unmark: string;
    count: (count: number, total: number) => string;
    announcement: (title: string) => string;
    completionTitle: string; completionBody: string; reopen: string;
    actions: ReactNode;
  };
}
const tones: Record<GuideBlockKind, string> = {
  meaning: "guide-block-neutral", next: "guide-block-action",
  action: "guide-block-action", field: "guide-block-action", where: "guide-block-where",
  format: "guide-block-neutral", mistake: "guide-block-mistake", empty: "guide-block-neutral",
  example: "guide-block-where", note: "guide-block-neutral",
};

/** Presentation/navigation only. Hosts own branching, access and factual content. */
export default function SmartGuide({ id, steps, source, currentStep, onStepChange, isLocked, lockedContent, onFinish, finishLabel, title, subtitle, summary, reviewFlow }: Props) {
  const { t } = useTranslation("pages");
  const uid = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const [localStep, setLocalStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState("");
  const [finished, setFinished] = useState(false);
  const completionHeading = useRef<HTMLHeadingElement>(null);
  const index = Math.min(Math.max(currentStep ?? localStep, 0), Math.max(steps.length - 1, 0));
  const step = steps[index];
  if (!step) return null;
  const key = id ? progressKey(id) : null;
  const go = (n: number) => {
    const next = Math.min(Math.max(n, 0), steps.length - 1);
    if (onStepChange) onStepChange(next); else setLocalStep(next);
    setFinished(false);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      if (reviewFlow) heading.current?.scrollIntoView?.({ block: "start", behavior: "auto" });
    });
  };
  const reviewAndContinue = () => {
    if (isLocked?.(index)) return;
    setCompleted((old) => old.includes(index) ? old : [...old, index]);
    if (index < steps.length - 1) {
      go(index + 1);
      setNotice(reviewFlow?.announcement(steps[index + 1].title) ?? "");
    } else {
      setFinished(true);
      setNotice(reviewFlow?.completionTitle ?? "");
      requestAnimationFrame(() => {
        completionHeading.current?.focus({ preventScroll: true });
        completionHeading.current?.scrollIntoView?.({ block: "start", behavior: "auto" });
      });
    }
  };
  const save = () => {
    if (!key) return;
    try {
      // Explicit opt-in click only. Step completion is not an eligibility answer.
      window.localStorage.setItem(key, JSON.stringify({ version: 1, step: index, completed }));
      setNotice(t("smartGuideStandard.saved"));
    } catch { setNotice(t("smartGuideStandard.storageError")); }
  };
  const restore = () => {
    if (!key) return;
    try {
      const raw = window.localStorage.getItem(key);
      const state = raw ? normalizeProgress(JSON.parse(raw), steps.length) : null;
      if (!state) { setNotice(t("smartGuideStandard.noSaved")); return; }
      setCompleted(state.completed); go(state.step); setNotice(t("smartGuideStandard.restored"));
    } catch { setNotice(t("smartGuideStandard.storageError")); }
  };
  const forget = () => {
    if (!key) return;
    try { window.localStorage.removeItem(key); setNotice(t("smartGuideStandard.forgotten")); }
    catch { setNotice(t("smartGuideStandard.storageError")); }
  };
  const locked = isLocked?.(index) === true;
  return (
    <section data-testid="smartguide-template" data-workflow={id} aria-label={title} className="smartguide-standard min-w-0 space-y-5 rounded-lg border border-border bg-card p-4 text-foreground sm:p-6">
      {title && <header className="space-y-2 border-b border-border pb-4"><h2 className="break-words text-xl font-bold text-foreground">{title}</h2>{subtitle && <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>}</header>}
      <nav aria-label={t("smartGuideStandard.steps")} className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <Button key={s.id} variant="outline" size="icon" data-reviewed={completed.includes(i)} className={cn("h-11 w-11 shrink-0 rounded-full", i === index && "border-primary bg-primary text-primary-foreground", reviewFlow && completed.includes(i) && i !== index && "border-primary text-primary")} aria-current={i === index ? "step" : undefined} aria-label={`${t("smartGuideStandard.jump", { number: i + 1, title: s.title })}${reviewFlow && completed.includes(i) ? ` — ${reviewFlow.reviewed}` : ""}`} onClick={() => go(i)}>
            {completed.includes(i) && (reviewFlow || i !== index) ? <Check aria-hidden="true" className="h-4 w-4" /> : i + 1}
          </Button>
        ))}
      </nav>
      <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">{t("smartGuideStandard.position", { current: index + 1, total: steps.length })}</p>
      {reviewFlow && <p data-testid="guide-reviewed-count" className="flex items-center gap-2 text-sm font-semibold text-primary" aria-live="polite"><Check aria-hidden="true" className="h-4 w-4" />{reviewFlow.count(completed.length, steps.length)}</p>}
      <div role="progressbar" aria-label={t("smartGuideStandard.steps")} aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={index + 1} className="grid h-2 gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, i) => <span key={s.id} className={cn("rounded-full", i <= index ? "bg-primary" : "bg-muted")} />)}
      </div>
      <h3 id={uid} ref={heading} tabIndex={-1} className="break-words text-lg font-bold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{step.title}</h3>
      {step.subtitle && <p className="text-sm leading-6 text-muted-foreground">{step.subtitle}</p>}
      {step.reference && <p className="text-sm text-muted-foreground">{step.reference}</p>}
      {locked ? lockedContent : <>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          {[...(step.sections ? sectionBlocks(step.sections) : []), ...(step.blocks ?? [])].filter((b) => b.text.trim()).map((b, i) => (
            <section key={i} className={cn("min-w-0 rounded-md border border-border border-l-4 p-4", tones[b.kind])}>
              <h4 className="mb-2 text-sm font-bold text-foreground">{t(`smartGuideStandard.block.${b.kind}`)}</h4>
              <p className="whitespace-pre-line break-words text-sm leading-6 text-muted-foreground">{b.text}</p>
            </section>
          ))}
        </div>
        {step.content}
        {index === steps.length - 1 && summary && <section className="space-y-2 border-t border-border pt-4"><h4 className="font-bold text-foreground">{t("smartGuideStandard.summary")}</h4><ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{summary.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        {step.checklist && step.checklist.length > 0 && <fieldset className="space-y-3 border-t border-border pt-4">
          <legend className="text-sm font-semibold text-foreground">{t("smartGuideStandard.checklist")}</legend>
          {step.checklist.map((label, i) => {
            const checkId = `${uid}-${step.id}-${i}`;
            return <label key={checkId} htmlFor={checkId} className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-foreground">
              <Checkbox id={checkId} className="mt-1" checked={!!checks[checkId]} onCheckedChange={(v) => setChecks((old) => ({ ...old, [checkId]: v === true }))} />{label}
            </label>;
          })}
        </fieldset>}
        {reviewFlow ? <div className="flex flex-wrap items-center gap-3">
          <Button className="h-auto min-h-11 w-full whitespace-normal py-3 sm:w-auto" onClick={reviewAndContinue}><Check aria-hidden="true" className="h-4 w-4" />{index === steps.length - 1 ? reviewFlow.finish : reviewFlow.advance}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Button>
          {completed.includes(index) && <Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => { setCompleted((old) => old.filter((i) => i !== index)); setFinished(false); setNotice(reviewFlow.unmark); }}><RotateCcw aria-hidden="true" className="h-4 w-4" />{reviewFlow.unmark}</Button>}
        </div> : <Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => setCompleted((old) => old.includes(index) ? old.filter((i) => i !== index) : [...old, index])} aria-pressed={completed.includes(index)}>
          <Check aria-hidden="true" className="h-4 w-4" />{t("smartGuideStandard.reviewed")}
        </Button>}
        {finished && reviewFlow && <section data-testid="guide-completion" className="guide-block-action space-y-4 rounded-md border border-primary p-4">
          <h3 ref={completionHeading} tabIndex={-1} className="text-lg font-bold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{reviewFlow.completionTitle}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{reviewFlow.completionBody}</p>
          <p className="font-semibold text-primary">{reviewFlow.count(completed.length, steps.length)}</p>
          <ul className="space-y-2">{steps.map((s, i) => <li key={s.id}><Button variant="link" className="h-auto min-h-11 whitespace-normal text-left" onClick={() => go(i)}>{completed.includes(i) && <Check aria-hidden="true" className="h-4 w-4" />}{i + 1}. {s.title}</Button></li>)}</ul>
          {reviewFlow.actions}
          <Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => go(0)}><RotateCcw aria-hidden="true" className="h-4 w-4" />{reviewFlow.reopen}</Button>
        </section>}
      </>}
      <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4">
        <Button variant="outline" className="min-h-11" disabled={index === 0} onClick={() => go(index - 1)}><ArrowLeft aria-hidden="true" className="h-4 w-4" />{t("smartGuideStandard.previous")}</Button>
        {!locked && (index < steps.length - 1 ? <Button className="min-h-11" onClick={() => go(index + 1)}>{t("smartGuideStandard.next")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Button> : onFinish && <Button className="min-h-11" onClick={onFinish}>{finishLabel ?? t("smartGuideStandard.finish")}</Button>)}
      </div>
      {source && <aside className="border-t border-border pt-4 text-sm text-muted-foreground">
        <p>{source.verifiedOn ? t("smartGuideStandard.verified", { date: source.verifiedOn }) : t("smartGuideStandard.verify")}</p>
        {source.url && <Button asChild variant="outline" className="mt-3 h-auto min-h-11 w-full whitespace-normal py-3"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label ?? t("smartGuideStandard.source")}<ExternalLink aria-hidden="true" className="h-4 w-4" /><span className="sr-only">{t("smartGuideStandard.newTab")}</span></a></Button>}
        {source.extraLinks && <ul className="mt-3 space-y-2">{source.extraLinks.map((link) => <li key={link.url}><a className="inline-flex min-h-11 items-center gap-2 text-foreground underline underline-offset-4" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="sr-only">{t("smartGuideStandard.newTab")}</span></a></li>)}</ul>}
      </aside>}
      {key && <details className="border-t border-border pt-3 text-sm text-muted-foreground">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-foreground">{t("smartGuideStandard.progress")}</summary>
        <p className="my-3 leading-6">{t("smartGuideStandard.privacy")}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="min-h-11" onClick={save}><Save aria-hidden="true" className="h-4 w-4" />{t("smartGuideStandard.save")}</Button>
          <Button variant="outline" className="min-h-11" onClick={restore}><RotateCcw aria-hidden="true" className="h-4 w-4" />{t("smartGuideStandard.restore")}</Button>
          <Button variant="outline" className="min-h-11" onClick={forget}><Trash2 aria-hidden="true" className="h-4 w-4" />{t("smartGuideStandard.forget")}</Button>
        </div>
      </details>}
      <p role="status" className="text-sm text-muted-foreground">{notice}</p>
    </section>
  );
}