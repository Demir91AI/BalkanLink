import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Check, ExternalLink, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FieldGroup } from "./pilot-model";

/** Navigation and review markers only: no applicant answers or persistence. */
export default function FieldWalkthrough({ groups, mode, sourceUrl }: { groups: FieldGroup[]; mode: "online" | "paper"; sourceUrl: (group: FieldGroup) => string }) {
  const { t } = useTranslation("pages");
  const k = (s: string) => `guideFirst.kindergeld.pilot.${s}`;
  const [index, setIndex] = useState(0);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const group = groups[index];
  if (!group) return null;
  const go = (n: number) => {
    setIndex(Math.max(0, Math.min(n, groups.length - 1)));
    requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView?.({ block: "start" }); });
  };
  const mark = () => {
    setReviewed((old) => old.includes(group.id) ? old : [...old, group.id]);
    if (index < groups.length - 1) go(index + 1);
  };
  return <div data-testid={`kg-${mode}-details`} className="min-w-0 space-y-4">
    <details className="border-b border-border pb-2">
      <summary className="min-h-11 cursor-pointer py-3 font-semibold text-primary">{t(k("fieldIndex"), { total: groups.length })}</summary>
      <nav aria-label={t(k("fieldIndex"), { total: groups.length })} className="grid gap-2 py-3 sm:grid-cols-2">
        {groups.map((g, i) => <Button key={g.id} variant="outline" aria-current={i === index ? "step" : undefined} data-field-id={g.id} className={cn("h-auto min-h-11 justify-start whitespace-normal px-3 py-3 text-left", i === index && "border-primary text-primary")} onClick={() => go(i)}>{reviewed.includes(g.id) && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}<span>{i + 1}. {g.title}<span className="mt-1 block text-xs font-normal">{mode === "paper" ? `${g.form} · ${g.page} · ${g.sec}` : g.de}</span></span></Button>)}
      </nav>
    </details>
    <p role="status" className="text-sm font-semibold text-primary">{t(k("fieldPosition"), { current: index + 1, total: groups.length, reviewed: reviewed.length })}</p>
    <div role="progressbar" aria-label={t(k("fieldProgress"))} aria-valuemin={0} aria-valuemax={groups.length} aria-valuenow={reviewed.length} className="flex h-2 gap-px overflow-hidden rounded-full bg-muted">{groups.map((g) => <span key={g.id} className={cn("flex-1", reviewed.includes(g.id) && "bg-primary")} />)}</div>
    <header className="space-y-2">
      <h3 ref={heading} tabIndex={-1} className="scroll-mt-28 break-words text-lg font-bold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{index + 1}. {group.title}</h3>
      <p className="break-words text-sm font-semibold leading-6 text-primary">{group.de}</p>
      {mode === "paper" && <p className="text-xs text-muted-foreground">{group.form} · {t("guideFirst.kindergeld.fields.lbl.page")} {group.page} · {t("guideFirst.kindergeld.fields.lbl.sec")} {group.sec}</p>}
      {group.only && <p className="text-sm font-semibold text-primary">{t("guideFirst.kindergeld.fields.lbl.only")}</p>}
    </header>
    <div data-testid="kg-field-card" data-field-id={group.id} className="grid min-w-0 gap-3 sm:grid-cols-2">
      {(["meaning", "what", "where", "example", "mistake"] as const).map((key) => <section key={key} className={cn("min-w-0 rounded-md border border-border border-l-4 p-4", key === "mistake" ? "guide-block-mistake" : key === "where" || key === "example" ? "guide-block-where" : key === "what" ? "guide-block-action" : "guide-block-neutral")}>
        <h4 className="mb-2 text-sm font-bold text-foreground">{key === "meaning" ? t(k("meaning")) : key === "what" ? t("smartGuideStandard.block.field") : t(`guideFirst.kindergeld.fields.lbl.${key}`)}</h4>
        <p className="whitespace-pre-line break-words text-sm leading-6 text-muted-foreground">{group[key]}</p>
      </section>)}
      <section className="guide-block-neutral min-w-0 rounded-md border border-border p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground"><HelpCircle aria-hidden="true" className="h-4 w-4 shrink-0" />{t(k("help"))}</h4>
        <p className="break-words text-sm leading-6 text-muted-foreground">{group.help}</p>
      </section>
    </div>
    <Button asChild variant="outline" className="h-auto min-h-11 w-full whitespace-normal py-3"><a href={sourceUrl(group)} target="_blank" rel="noopener noreferrer">{t(k(mode === "paper" ? "originalPdf" : "officialOnline"), { form: group.form })}<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /></a></Button>
    <div className="flex flex-wrap justify-between gap-2">
      <Button variant="outline" className="min-h-11" disabled={index === 0} onClick={() => go(index - 1)}><ArrowLeft aria-hidden="true" className="h-4 w-4" />{t("smartGuideStandard.previous")}</Button>
      <Button className="h-auto min-h-11 whitespace-normal" onClick={mark}><Check aria-hidden="true" className="h-4 w-4" />{t(k(index === groups.length - 1 ? "fieldFinish" : "fieldNext"))}</Button>
      <Button variant="outline" className="min-h-11" disabled={index === groups.length - 1} onClick={() => go(index + 1)}>{t("smartGuideStandard.next")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Button>
    </div>
    {reviewed.includes(group.id) && <Button variant="link" className="h-auto min-h-11 whitespace-normal" onClick={() => setReviewed((old) => old.filter((id) => id !== group.id))}>{t(k("unmark"))}</Button>}
    {reviewed.length === groups.length && <p role="status" className="guide-block-action rounded-md border border-primary p-4 text-sm font-semibold text-foreground">{t(k("fieldsDone"))}</p>}
  </div>;
}