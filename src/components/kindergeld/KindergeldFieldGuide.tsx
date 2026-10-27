import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Row = { form: string; page: number; sec: string; de: string; only?: boolean; what: string; where: string; example: string; mistake: string };

/**
 * Read-only, field-by-field explanation of KG1 + Anlage Kind.
 * No inputs, no storage, no PDF — the user fills the official form themselves.
 */
export default function KindergeldFieldGuide({ onlineUrl }: { onlineUrl: string }) {
  const { t } = useTranslation("pages");
  const [open, setOpen] = useState("");
  const k = (s: string) => `guideFirst.kindergeld.fields.${s}`;
  const kg1 = t(k("kg1"), { returnObjects: true }) as Row[];
  const ank = t(k("ank"), { returnObjects: true }) as Row[];
  const online = t(k("onlineGroups"), { returnObjects: true }) as { title: string; body: string; tip: string }[];
  const lbl = (s: string) => t(k(`lbl.${s}`));
  /** e.g. "KG1 · str. 1 · tačka 3: Zahlungsweg – IBAN …" */
  const location = (r: Row) =>
    `${r.form} · ${lbl("page")} ${r.page} · ${/^\d+$/.test(r.sec) ? `${lbl("sec")} ${r.sec}` : lbl(r.sec)}`;

  const renderRow = (prefix: "kg1" | "ank", i: number) => {
    const r = (prefix === "kg1" ? kg1 : ank)[i];
    if (!r) return null;
    return (
      <AccordionItem key={`${prefix}-${i}`} value={`${prefix}-${i}`} className="border-border">
        <AccordionTrigger className="items-start py-3 text-left text-sm font-semibold text-foreground hover:no-underline">
          <span className="flex min-w-0 flex-col gap-1.5 pr-2">
            <span>{t(k(`short.${prefix}.${i}`))}</span>
            <span className="break-words text-xs font-normal leading-relaxed text-primary">{r.de} · {location(r)}</span>
            {r.only && (
              <span className="text-xs font-normal text-muted-foreground">{lbl("only")}</span>
            )}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <h4 className="mb-2 text-sm font-bold text-foreground">{t("smartGuideStandard.block.field")}</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{r.what}</p>
          <dl className="mt-3 space-y-2 text-xs leading-relaxed">
            {(["where", "example", "mistake"] as const).map((f) => (
              <div key={f}>
                <dt className="inline font-semibold text-primary">{lbl(f)}: </dt>
                <dd className="inline break-words text-muted-foreground">{r[f]}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
    );
  };
  // Original record indices: all 10 + 10 remain available, headers near the end,
  // adult-only information last. One Accordion root controls all four groups.
  const groups: ["kg1" | "ank", number][][] = [
    [["kg1", 1], ["kg1", 2], ["kg1", 3], ["kg1", 4]],
    [["ank", 1], ["ank", 2], ["ank", 3]],
    [["kg1", 5], ["kg1", 9], ["ank", 9]],
    [["kg1", 7], ["kg1", 8], ["ank", 5], ["ank", 6], ["ank", 7], ["ank", 8], ["kg1", 6], ["kg1", 0], ["ank", 0], ["ank", 4]],
  ];

  return (
    <section data-testid="kg-field-guide" aria-labelledby="kg-field-guide-title" className="min-w-0 border-y border-border py-5">
      <h2 id="kg-field-guide-title" className="text-lg font-bold text-foreground">{t(k("title"))}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(k("intro"))}</p>
      <Tabs defaultValue="online" onValueChange={() => setOpen("")} className="mt-4">
        <TabsList aria-label={t(k("title"))} className="grid h-auto w-full grid-cols-1 gap-1 bg-popover sm:grid-cols-2">
          {(["online", "paper"] as const).map((mode) => (
            <TabsTrigger key={mode} value={mode} className="min-h-11 whitespace-normal px-3 py-2 text-sm text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t(k(`mode.${mode}`))}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="online" className="mt-4">
          <ol className="divide-y divide-border">
            {online.map((group, i) => (
              <li key={group.title} className="flex gap-3 py-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-popover text-xs font-bold text-primary">{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                  {i === 3 && <p className="mt-1 text-xs text-primary">{lbl("only")}</p>}
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{group.body}</p>
                  <details className="mt-2 text-xs leading-relaxed text-muted-foreground" data-testid="kg-online-helper">
                    <summary className="cursor-pointer py-1 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{t(k("findData"))}</summary>
                    <p className="mt-1">{group.tip}</p>
                  </details>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(k("onlineOrder"))}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(k("onlineRoute"))}</p>
          <Button asChild className="mt-4 h-auto min-h-11 w-full whitespace-normal py-3 text-center">
            <a href={onlineUrl} target="_blank" rel="noopener noreferrer">{t("guideFirst.kindergeld.ctaOnline")}<ExternalLink aria-hidden="true" /></a>
          </Button>
        </TabsContent>
        <TabsContent value="paper" className="mt-4">
          <p className="text-xs leading-relaxed text-muted-foreground">{t(k("ankNote"))}</p>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} data-testid="kg-paper-details">
            {groups.map((rows, i) => (
              <div key={i} className="mt-5">
                <h3 className="mb-1 text-sm font-bold text-foreground">{t(k(`paperGroups.${i}`))}</h3>
                {rows.map(([form, index]) => renderRow(form, index))}
              </div>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
      <details className="mt-5 text-xs text-muted-foreground">
        <summary className="cursor-pointer py-2 font-semibold text-primary">{t(k("important"))}</summary>
        <p className="mt-2 leading-relaxed">{t(k("notice"))}</p>
        <p className="mt-2 leading-relaxed">{t(k("dummy"))}</p>
      </details>
    </section>
  );
}
