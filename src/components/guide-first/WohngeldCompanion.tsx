import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ProcedureCompanion from "./ProcedureCompanion";
import type { ArrivalProcedure } from "@/lib/guide-first/arrival-model";
import { WOHNGELD_LINKS, WOHNGELD_VERIFIED_ON, wohngeldLinks, wohngeldResultKey, wohngeldVariant, type WgAnswers } from "@/lib/guide-first/wohngeld-model";

const QUESTIONS = [
  { key: "state", label: "qState", options: ["bayern", "other", "unsure"] },
  { key: "housing", label: "qHousing", options: ["rent", "own", "unsure"] },
  { key: "kind", label: "qKind", options: ["first", "renewal", "unsure"] },
] as const;
const EMPTY: WgAnswers = { state: null, housing: null, kind: null };

/** Memory-only 3-question Wohngeld decision guide followed by the matching companion. */
export default function WohngeldCompanion() {
  const { t } = useTranslation("pages");
  const ui = (key: string) => t(`wohngeldCompanion.ui.${key}`);
  const [answers, setAnswers] = useState<WgAnswers>(EMPTY);
  const variant = wohngeldVariant(answers);
  const content = t(`wohngeldCompanion.guides.${variant}`, { returnObjects: true }) as ArrivalProcedure;
  const links = wohngeldLinks(variant).map((key) => ({ url: WOHNGELD_LINKS[key], label: ui(`l.${key}`) }));
  const kindKey = answers.kind === "first" ? "kindFirst" : answers.kind === "renewal" ? "kindRenewal" : answers.kind === "unsure" ? "kindUnsure" : null;
  return <div className="space-y-6">
    <section data-testid="wohngeld-decision" className="guide-block-neutral space-y-4 rounded-md border border-border border-l-4 p-4 text-foreground" aria-label={ui("title")}>
      <h2 className="text-xl font-bold">{ui("title")}</h2>
      <p className="text-sm leading-6">{ui("intro")}</p>
      {QUESTIONS.map((q) => <fieldset key={q.key} className="space-y-2">
        <legend className="text-sm font-semibold">{ui(q.label)}</legend>
        <div className="flex flex-wrap gap-2">{q.options.map((option) => {
          const active = answers[q.key] === option;
          return <Button key={option} type="button" variant={active ? "default" : "outline"} aria-pressed={active} className="h-auto min-h-11 max-w-full whitespace-normal text-left" onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: option }))}>{ui(`opt.${option}`)}</Button>;
        })}</div>
      </fieldset>)}
      <div aria-live="polite" className="space-y-2 text-sm font-semibold leading-6">
        <p data-testid="wohngeld-result">{ui(wohngeldResultKey(answers))}</p>
        {kindKey && <p data-testid="wohngeld-kind">{ui(kindKey)}</p>}
      </div>
      <p className="text-sm leading-6">{ui("noIndex")}</p>
      <Button type="button" variant="outline" className="min-h-11" onClick={() => setAnswers(EMPTY)}>{ui("reset")}</Button>
    </section>
    <ProcedureCompanion key={variant} slug="wohngeld" content={content} links={links} verifiedOn={WOHNGELD_VERIFIED_ON} variant={variant} />
  </div>;
}
