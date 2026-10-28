import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BA_FORMS_INDEX, NAVIGATOR_QUESTIONS, suggestForms, type NavigatorAnswers } from "@/lib/guide-first/grundsicherung-model";

const empty: NavigatorAnswers = { kind: "unsure", partner: "unsure", childrenUnder15: "unsure", children15plus: "unsure", housing: "unsure", employed: "unsure", selfEmployed: "unsure", assets: "unsure", specialNeeds: "unsure" };
/** Orientation only. No submission, API, financial amounts or persistence. */
export default function GrundsicherungNavigator() {
  const { t, i18n } = useTranslation("pages");
  const [answers, setAnswers] = useState<NavigatorAnswers>({ ...empty });
  const id = useId();
  const tr = (key: string) => t(`grundsicherungCompanions.ui.navigator.${key}`);
  const language = i18n.language.split("-")[0];
  const prefix = ["hr", "sr", "de"].includes(language) ? `/${language}` : "";
  return <section data-testid="grundsicherung-navigator" className="smartguide-standard min-w-0 space-y-5 border-b border-border pb-6 text-foreground">
    <h2 className="text-xl font-bold">{tr("title")}</h2>
    <p className="guide-block-neutral border-l-4 p-4 text-sm leading-6">{tr("intro")}</p>
    <div className="grid min-w-0 gap-4 sm:grid-cols-2">{NAVIGATOR_QUESTIONS.map((q) => <fieldset key={q.id} className="min-w-0 space-y-2 border-b border-border pb-4">
      <legend className="mb-2 text-sm font-bold">{tr(`questions.${q.id}`)}</legend>
      <div role="group" aria-label={tr(`questions.${q.id}`)} className="flex flex-wrap gap-2">{q.options.map((option) => <Button key={option} id={`${id}-${q.id}-${option}`} variant={answers[q.id] === option ? "default" : "outline"} aria-pressed={answers[q.id] === option} className="h-auto min-h-11 max-w-full whitespace-normal text-left" onClick={() => setAnswers((old) => ({ ...old, [q.id]: option }))}>{tr(`options.${option}`)}</Button>)}</div>
    </fieldset>)}</div>
    <Button variant="outline" onClick={() => setAnswers({ ...empty })}><RotateCcw aria-hidden="true" className="h-4 w-4" />{tr("reset")}</Button>
    <section aria-live="polite" className="space-y-3">
      <h3 className="text-lg font-bold">{tr("results")}</h3>
      <ul className="space-y-4">{suggestForms(answers).map((s) => <li key={`${s.form}-${s.reason}`} className="guide-block-where min-w-0 border-l-4 p-4 text-sm leading-6">
        <strong>{s.form}</strong><span> — {tr(s.level)}</span>
        <p>{tr(`reasons.${s.reason}`)}</p>
        {s.slug && <Button variant="link" asChild className="h-auto max-w-full whitespace-normal p-0"><a href={`${prefix}/formulari/${s.slug}`}>{tr("open")} — {s.form}</a></Button>}
      </li>)}</ul>
      <Button variant="outline" asChild className="h-auto min-h-11 max-w-full whitespace-normal"><a href={BA_FORMS_INDEX} target="_blank" rel="noopener noreferrer">{tr("official")}<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="sr-only">{t("smartGuideStandard.newTab")}</span></a></Button>
    </section>
  </section>;
}