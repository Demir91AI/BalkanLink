import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Row = { de: string; what: string; where: string; example: string; mistake: string };

/**
 * Read-only, field-by-field explanation of KG1 + Anlage Kind.
 * No inputs, no storage, no PDF — the user fills the official form themselves.
 */
export default function KindergeldFieldGuide() {
  const { t } = useTranslation("pages");
  const k = (s: string) => `guideFirst.kindergeld.fields.${s}`;
  const kg1 = t(k("kg1"), { returnObjects: true }) as Row[];
  const ank = t(k("ank"), { returnObjects: true }) as Row[];
  const online = t(k("online"), { returnObjects: true }) as string[];
  const lbl = (s: keyof Omit<Row, "de">) => t(k(`lbl.${s}`));

  const renderRows = (rows: Row[], prefix: string) =>
    (Array.isArray(rows) ? rows : []).map((r, i) => (
      <AccordionItem key={`${prefix}-${i}`} value={`${prefix}-${i}`} className="border-border">
        <AccordionTrigger className="py-3 text-left text-sm font-semibold text-foreground hover:no-underline">
          <span><span className="mr-2 text-[hsl(var(--gold))]">{i + 1}.</span>{r.de}</span>
        </AccordionTrigger>
        <AccordionContent>
          <dl className="space-y-2 text-sm leading-relaxed">
            {(["what", "where", "example", "mistake"] as const).map((f) => (
              <div key={f} className={f === "mistake" ? "rounded-lg border border-amber-400/40 bg-amber-950 p-2" : ""}>
                <dt className={f === "mistake" ? "font-semibold text-amber-200" : "font-semibold text-[hsl(var(--gold))]"}>{lbl(f)}</dt>
                <dd className={f === "example" ? "font-mono text-foreground" : "text-muted-foreground"}>{r[f]}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
    ));

  return (
    <section data-testid="kg-field-guide" aria-labelledby="kg-field-guide-title" className="rounded-2xl border border-[hsl(var(--gold))] bg-card p-5">
      <h2 id="kg-field-guide-title" className="text-lg font-bold text-foreground">{t(k("title"))}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(k("intro"))}</p>
      <p className="mt-2 text-xs text-muted-foreground">{t(k("dummy"))}</p>

      <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[hsl(var(--gold))]">{t(k("kg1Title"))}</h3>
      <Accordion type="multiple" data-testid="kg-field-kg1">{renderRows(kg1, "kg1")}</Accordion>

      <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-[hsl(var(--gold))]">{t(k("ankTitle"))}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t(k("ankNote"))}</p>
      <Accordion type="multiple" data-testid="kg-field-ank">{renderRows(ank, "ank")}</Accordion>

      <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-[hsl(var(--gold))]">{t(k("onlineTitle"))}</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {(Array.isArray(online) ? online : []).map((s) => (
          <li key={s} className="flex gap-2"><span className="text-[hsl(var(--gold))]">•</span><span>{s}</span></li>
        ))}
      </ul>
    </section>
  );
}
