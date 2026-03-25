import { useState, useMemo, useCallback } from "react";
import { Copy, Download, Check, Shield, FileCheck, Award, UserCheck, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  type VorlagenTemplate,
  renderTemplate,
  formatDateValue,
  todayFormatted,
} from "@/lib/vorlagen-templates";

interface Props {
  template: VorlagenTemplate;
}

export default function VorlagenGenerator({ template }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    template.fields.forEach((f) => {
      init[f.key] = f.type === "date" ? "" : "";
    });
    return init;
  });

  const [variantId, setVariantId] = useState<"standard" | "kurz">(
    template.variants[0]?.id ?? "standard"
  );
  const [copied, setCopied] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(true);

  const hasKurz = template.variants.some((v) => v.id === "kurz");
  const activeVariant =
    template.variants.find((v) => v.id === variantId) ?? template.variants[0];

  /* ── Build display values (format dates) ── */
  const displayValues = useMemo(() => {
    const dv: Record<string, string> = {};
    for (const f of template.fields) {
      dv[f.key] =
        f.type === "date" ? formatDateValue(values[f.key]) : values[f.key];
    }
    // Auto-fill ORT if not a field but template uses it
    if (!dv.ORT && !template.fields.find((f) => f.key === "ORT")) {
      dv.ORT = todayFormatted();
    }
    return dv;
  }, [values, template.fields]);

  const renderedText = useMemo(
    () => renderTemplate(activeVariant.body, displayValues),
    [activeVariant.body, displayValues]
  );

  const handleChange = useCallback((key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  /* ── Copy ── */
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(renderedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [renderedText]);

  /* ── PDF download ── */
  const handlePdf = useCallback(() => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${template.titleDe}</title>
<style>
@page{size:A4;margin:25mm 20mm}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:12pt;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;max-width:700px;margin:0 auto;padding:40px 20px}
</style></head><body>${renderedText.replace(/\n/g, "\n")}</body></html>`);
    w.document.close();
    setTimeout(() => {
      w.print();
    }, 300);
  }, [renderedText, template.titleDe]);

  return (
    <div className="space-y-6">
      {/* ── DSGVO Notice ── */}
      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-3.5">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Datenschutzhinweis:</span>{" "}
          Alle eingegebenen Daten werden ausschließlich lokal in Ihrem Browser
          verarbeitet. Es erfolgt keine Speicherung oder Übertragung an Server.
        </p>
      </div>

      {/* ── Variant Toggle ── */}
      {hasKurz && (
        <div className="flex items-center gap-3">
          <Label htmlFor="variant-toggle" className="text-sm">
            Standard (professionell)
          </Label>
          <Switch
            id="variant-toggle"
            checked={variantId === "kurz"}
            onCheckedChange={(v) => setVariantId(v ? "kurz" : "standard")}
          />
          <Label htmlFor="variant-toggle" className="text-sm">
            Kurz &amp; kompakt
          </Label>
        </div>
      )}

      {/* ── Input Fields ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        {template.fields.map((field) => (
          <div
            key={field.key}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <Label className="mb-1.5 block text-xs font-medium">
              {field.label}{" "}
              <span className="text-muted-foreground">({field.labelBs})</span>
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                rows={field.rows ?? 3}
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            ) : field.type === "date" ? (
              <Input
                type="date"
                value={values[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Live Preview (DIN 5008 style) ── */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Vorschau / Pregled
        </p>
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 font-[Segoe_UI,Arial,sans-serif] text-sm leading-relaxed whitespace-pre-wrap shadow-sm min-h-[320px]">
          {renderedText}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} variant="outline" className="gap-2">
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Kopiert!" : "Text kopieren"}
        </Button>
        <Button onClick={handlePdf} className="gap-2">
          <Download className="h-4 w-4" />
          PDF herunterladen
        </Button>
      </div>

      {/* ── Trust Badges ── */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-primary" /> Professionell formuliert
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FileCheck className="h-3.5 w-3.5 text-primary" /> Nach deutschem Standard
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserCheck className="h-3.5 w-3.5 text-primary" /> Ohne Registrierung
        </span>
      </div>

      {/* ── Hints / Checklist ── */}
      {(template.hints.length > 0 || template.checklist.length > 0) && (
        <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
          <button
            onClick={() => setHintsOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> Wichtige Hinweise &amp; Checkliste
            </span>
            {hintsOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {hintsOpen && (
            <div className="border-t border-border px-4 py-4 space-y-4">
              {template.hints.map((hint, i) => (
                <div key={i}>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {hint.title}
                  </p>
                  <ul className="space-y-1">
                    {hint.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <span className="mt-0.5 text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {template.checklist.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Checkliste
                  </p>
                  <ul className="space-y-1">
                    {template.checklist.map((item, j) => (
                      <li
                        key={j}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <Check className="h-3 w-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
