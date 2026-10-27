import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FieldWalkthrough from "./FieldWalkthrough";
import { paperGroups, KINDERGELD_PDFS, FORMS_URL, BZST_ID_URL, type PaperField, type PilotDetail, type FieldExpansion, type FieldGroup, type FieldTerm } from "./pilot-model";

/** Read-only companion: originals stay at BA; no applicant answers or PDF processing. */
export default function KindergeldFieldGuide({ onlineUrl }: { onlineUrl: string }) {
  const { t } = useTranslation("pages");
  const [mode, setMode] = useState("online");
  const k = (s: string) => `guideFirst.kindergeld.fields.${s}`;
  const p = (s: string) => `guideFirst.kindergeld.pilot.${s}`;
  const kg1 = t(k("kg1"), { returnObjects: true }) as PaperField[];
  const ank = t(k("ank"), { returnObjects: true }) as PaperField[];
  const details = t(p("details"), { returnObjects: true }) as Record<string, PilotDetail>;
  const extras = t(p("extras"), { returnObjects: true }) as FieldExpansion[];
  const terms = t(p("terms"), { returnObjects: true }) as Record<string, FieldTerm[]>;
  const online = t(k("onlineGroups"), { returnObjects: true }) as { title: string; body: string; tip: string }[];
  const onlineDetails = t(p("onlineDetails"), { returnObjects: true }) as { meaning: string; example: string; mistake: string; help: string }[];
  const paper = paperGroups(kg1, ank, details, extras, terms);
  const onlineFields: FieldGroup[] = online.map((g, i) => ({ id: `online-${i}`, title: g.title, form: "BA eServices", page: 0, sec: "", de: "", what: g.body, where: g.tip, ...onlineDetails[i] }));
  return <section data-testid="kg-field-guide" aria-labelledby="kg-field-guide-title" className="min-w-0 border-y border-border py-5">
    <h2 id="kg-field-guide-title" className="text-lg font-bold text-foreground">{t(k("title"))}</h2>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(k("intro"))}</p>
    <p className="mt-2 text-xs leading-6 text-muted-foreground">{t(p("imaginary"))}</p>
    <Tabs value={mode} onValueChange={setMode} className="mt-4">
      <TabsList aria-label={t(k("title"))} className="grid h-auto w-full grid-cols-2 gap-1 bg-popover">
        {(["online", "paper"] as const).map((m) => <TabsTrigger key={m} value={m} className="min-h-11 whitespace-normal px-3 py-2 text-sm text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t(k(`mode.${m}`))}</TabsTrigger>)}
      </TabsList>
      <TabsContent value="online" className="mt-4 space-y-4">
        <p className="guide-block-neutral rounded-md border border-border p-4 text-sm leading-6 text-muted-foreground">{t(p("onlineUnverified"))}</p>
        <FieldWalkthrough key="online" mode="online" groups={onlineFields} sourceUrl={() => onlineUrl} />
        <div className="space-y-2">{online.map((g) => <details key={g.title} data-testid="kg-online-helper" className="text-sm text-muted-foreground"><summary className="min-h-11 cursor-pointer py-3 font-semibold text-primary">{g.title} — {t(k("findData"))}</summary><p className="leading-6">{g.tip}</p></details>)}</div>
        <p className="text-sm leading-6 text-muted-foreground">{t(k("onlineRoute"))}</p>
      </TabsContent>
      <TabsContent value="paper" className="mt-4 space-y-4">
        <p className="guide-block-neutral rounded-md border border-border p-4 text-sm leading-6 text-muted-foreground">{t(p("pageConvention"))}</p>
        <p className="text-sm leading-6 text-muted-foreground">{t(k("ankNote"))}</p>
        <FieldWalkthrough key="paper" mode="paper" groups={paper} sourceUrl={(g) => g.form === "KG1" ? KINDERGELD_PDFS.KG1 : KINDERGELD_PDFS["Anlage Kind"]} />
        <Button asChild variant="outline" className="h-auto min-h-11 w-full whitespace-normal py-3"><a href={FORMS_URL} target="_blank" rel="noopener noreferrer">{t(p("formsLink"))}<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /></a></Button>
      </TabsContent>
    </Tabs>
    <Button asChild variant="link" className="mt-3 h-auto min-h-11 whitespace-normal"><a href={BZST_ID_URL} target="_blank" rel="noopener noreferrer">{t(p("idLink"))}<ExternalLink aria-hidden="true" className="h-4 w-4" /></a></Button>
    <details className="mt-3 text-sm text-muted-foreground"><summary className="min-h-11 cursor-pointer py-3 font-semibold text-primary">{t(k("important"))}</summary><p className="leading-6">{t(k("notice"))}</p><p className="mt-2 leading-6">{t(k("dummy"))}</p></details>
  </section>;
}
