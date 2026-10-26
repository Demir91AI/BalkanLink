import { useState, useMemo, useCallback } from "react";
import { Copy, Download, Check, Shield, FileCheck, Award, UserCheck, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import LetterPreview from "./LetterPreview";

interface Props {
  template: VorlagenTemplate;
}

export default function VorlagenGenerator({ template }: Props) {
  const { t } = useTranslation("pages");

  /** Localized field label (falls back to BS) */
  const fieldLabel = (key: string, fallback: string): string => {
    const k = `vorlagen.templates.${template.slug}.fields.${key}`;
    const v = t(k);
    return v === k ? fallback : v;
  };
  /** Localized variant label */
  const variantLabel = (id: string, fallback: string): string => {
    const k = `vorlagen.templates.${template.slug}.variants.${id}`;
    const v = t(k);
    return v === k ? fallback : v;
  };
  /** Localized hints array */
  const localizedHints = (): { title: string; items: string[] }[] => {
    const k = `vorlagen.templates.${template.slug}.hints`;
    const v = t(k, { returnObjects: true }) as unknown;
    return Array.isArray(v) ? (v as { title: string; items: string[] }[]) : template.hints;
  };
  /** Localized checklist */
  const localizedChecklist = (): string[] => {
    const k = `vorlagen.templates.${template.slug}.checklist`;
    const v = t(k, { returnObjects: true }) as unknown;
    return Array.isArray(v) ? (v as string[]) : template.checklist;
  };


  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    template.fields.forEach((f) => {
      init[f.key] = "";
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
${LOCAL_INTER_FONT_FACES}
@page{size:A4;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:'Source Serif 4','Georgia','Times New Roman',serif;
  font-size:11.5pt;
  line-height:1.65;
  color:#1a1a1a;
  background:#fff;
  -webkit-font-smoothing:antialiased;
}
.page{
  width:210mm;
  min-height:297mm;
  padding:28mm 25mm 30mm 25mm;
  margin:0 auto;
  background:#fff;
}
.sender-block{
  font-size:10.5pt;
  line-height:1.5;
  color:#2a2a2a;
}
.fold-mark{
  height:24pt;
}
.recipient-block{
  font-size:11pt;
  line-height:1.5;
  color:#1a1a1a;
}
.date-line{
  margin-top:22pt;
  font-size:10.5pt;
  color:#3a3a3a;
  text-align:right;
}
.reference-line{
  margin-top:6pt;
  font-size:10pt;
  color:#555;
}
.subject-line{
  margin-top:26pt;
  margin-bottom:18pt;
  font-weight:700;
  font-size:12.5pt;
  letter-spacing:-0.01em;
  color:#111;
}
.salutation{
  margin-bottom:12pt;
}
.body-paragraph{
  margin-bottom:10pt;
  text-align:left;
}
.closing{
  margin-top:18pt;
}
.signature-space{
  height:52pt;
}
.signer-name{
  font-weight:500;
}
.cv-heading{
  font-family:'Inter','Helvetica Neue',sans-serif;
  font-weight:600;
  font-size:13pt;
  letter-spacing:0.04em;
  text-transform:uppercase;
  color:#222;
  border-bottom:1.5px solid #ccc;
  padding-bottom:4pt;
  margin-top:20pt;
  margin-bottom:10pt;
}
.cv-title{
  font-family:'Inter','Helvetica Neue',sans-serif;
  font-weight:700;
  font-size:16pt;
  letter-spacing:0.06em;
  text-transform:uppercase;
  color:#111;
  margin-bottom:16pt;
}
.cv-field{
  margin-bottom:4pt;
}
.cv-field-label{
  font-weight:600;
  color:#333;
}
@media print{
  body{background:#fff}
  .page{padding:28mm 25mm 30mm 25mm;width:auto;min-height:auto}
}
@media screen{
  body{background:#e8e8e8;padding:20px 0}
  .page{box-shadow:0 2px 20px rgba(0,0,0,0.12)}
}
</style></head><body>${generatePdfHtml(renderedText, template.slug)}</body></html>`);
    w.document.close();
    setTimeout(() => {
      w.print();
    }, 400);
  }, [renderedText, template.titleDe, template.slug]);

  const hints = localizedHints();
  const checklist = localizedChecklist();

  return (
    <div className="space-y-6">
      {/* ── DSGVO Notice ── */}
      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-3.5">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">{t("vorlagen.ui.dsgvoTitle")}</span>{" "}
          {t("vorlagen.ui.dsgvoBody")}
        </p>
      </div>

      {/* ── Variant Toggle ── */}
      {hasKurz && (
        <div className="flex items-center gap-3">
          <Label htmlFor="variant-toggle" className="text-sm">
            {variantLabel("standard", t("vorlagen.ui.variantStandardLabel"))}
          </Label>
          <Switch
            id="variant-toggle"
            checked={variantId === "kurz"}
            onCheckedChange={(v) => setVariantId(v ? "kurz" : "standard")}
          />
          <Label htmlFor="variant-toggle" className="text-sm">
            {variantLabel("kurz", t("vorlagen.ui.variantKurzLabel"))}
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
              <span className="text-muted-foreground">({fieldLabel(field.key, field.labelBs)})</span>
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

      {/* ── Live Preview (DIN 5008 Letter) ── */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("vorlagen.ui.previewLabel")}
        </p>
        <LetterPreview text={renderedText} slug={template.slug} />
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} variant="outline" className="gap-2">
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? t("vorlagen.ui.copied") : t("vorlagen.ui.copy")}
        </Button>
        <Button onClick={handlePdf} className="gap-2">
          <Download className="h-4 w-4" />
          {t("vorlagen.ui.downloadPdf")}
        </Button>
      </div>

      {/* ── Trust Badges ── */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-primary" /> {t("vorlagen.ui.trustProfessional")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FileCheck className="h-3.5 w-3.5 text-primary" /> {t("vorlagen.ui.trustGermanStandard")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserCheck className="h-3.5 w-3.5 text-primary" /> {t("vorlagen.ui.trustNoRegistration")}
        </span>
      </div>

      {/* ── Hints / Checklist ── */}
      {(hints.length > 0 || checklist.length > 0) && (
        <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
          <button
            onClick={() => setHintsOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> {t("vorlagen.ui.hintsTitle")}
            </span>
            {hintsOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {hintsOpen && (
            <div className="border-t border-border px-4 py-4 space-y-4">
              {hints.map((hint, i) => (
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

              {checklist.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t("vorlagen.ui.checklistLabel")}
                  </p>
                  <ul className="space-y-1">
                    {checklist.map((item, j) => (
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

/* ── Parse rendered text into semantic letter blocks ── */
interface LetterBlocks {
  senderLines: string[];
  recipientLines: string[];
  dateLine: string;
  referenceLine?: string;
  subjectLine: string;
  salutation: string;
  bodyParagraphs: string[];
  closing: string;
  signerName: string;
}

function isCV(slug: string) {
  return slug === "lebenslauf";
}

export function parseLetterBlocks(text: string, slug: string): LetterBlocks | null {
  if (isCV(slug)) return null;

  const lines = text.split("\n");
  const blocks: LetterBlocks = {
    senderLines: [],
    recipientLines: [],
    dateLine: "",
    subjectLine: "",
    salutation: "",
    bodyParagraphs: [],
    closing: "",
    signerName: "",
  };

  let phase: "sender" | "recipient" | "meta" | "body" | "done" = "sender";
  let emptyCount = 0;
  const bodyLines: string[] = [];
  let foundSalutation = false;
  let foundClosing = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (phase === "sender") {
      if (trimmed === "") {
        if (blocks.senderLines.length > 0) {
          phase = "recipient";
          emptyCount = 0;
        }
      } else {
        blocks.senderLines.push(trimmed);
      }
      continue;
    }

    if (phase === "recipient") {
      if (trimmed === "") {
        if (blocks.recipientLines.length > 0) {
          phase = "meta";
          emptyCount = 0;
        }
      } else {
        blocks.recipientLines.push(trimmed);
      }
      continue;
    }

    if (phase === "meta") {
      if (trimmed === "") continue;
      // Date line detection
      if (trimmed.match(/,\s*den\s/) || trimmed.match(/\d{2}\.\d{2}\.\d{4}/)) {
        if (!blocks.dateLine) {
          blocks.dateLine = trimmed;
          continue;
        }
      }
      // Reference line (e.g. Kundennummer)
      if (trimmed.match(/^(Kundennummer|Vertragsnummer|Aktenzeichen)/i)) {
        blocks.referenceLine = trimmed;
        continue;
      }
      // Subject line
      if (trimmed.startsWith("Betreff:")) {
        blocks.subjectLine = trimmed.replace(/^Betreff:\s*/, "");
        phase = "body";
        continue;
      }
      // If we hit salutation without subject
      if (trimmed.startsWith("Sehr geehrte")) {
        blocks.salutation = trimmed;
        foundSalutation = true;
        phase = "body";
        continue;
      }
      // Fallback: if line doesn't match known patterns, treat as date
      if (!blocks.dateLine) {
        blocks.dateLine = trimmed;
      }
      continue;
    }

    if (phase === "body") {
      // Pick up salutation
      if (!foundSalutation && trimmed.startsWith("Sehr geehrte")) {
        blocks.salutation = trimmed;
        foundSalutation = true;
        continue;
      }

      // Detect closing
      if (trimmed.startsWith("Mit freundlichen Grüßen") || trimmed.startsWith("Mit freundlichen Grüssen")) {
        blocks.closing = trimmed;
        foundClosing = true;
        continue;
      }

      if (foundClosing) {
        if (trimmed !== "") {
          blocks.signerName = trimmed;
          phase = "done";
        }
        continue;
      }

      bodyLines.push(line);
    }
  }

  // Split body lines into paragraphs
  let currentParagraph: string[] = [];
  for (const line of bodyLines) {
    if (line.trim() === "") {
      if (currentParagraph.length > 0) {
        blocks.bodyParagraphs.push(currentParagraph.join(" "));
        currentParagraph = [];
      }
    } else {
      currentParagraph.push(line.trim());
    }
  }
  if (currentParagraph.length > 0) {
    blocks.bodyParagraphs.push(currentParagraph.join(" "));
  }

  return blocks;
}

/* ── Generate PDF HTML with DIN 5008 structure ── */
function generatePdfHtml(text: string, slug: string): string {
  if (isCV(slug)) {
    return generateCvHtml(text);
  }

  const blocks = parseLetterBlocks(text, slug);
  if (!blocks) return `<div class="page" style="white-space:pre-wrap">${text}</div>`;

  const sender = blocks.senderLines.map((l) => `<div>${esc(l)}</div>`).join("");
  const recipient = blocks.recipientLines.map((l) => `<div>${esc(l)}</div>`).join("");
  const bodyParas = blocks.bodyParagraphs
    .map((p) => `<div class="body-paragraph">${esc(p)}</div>`)
    .join("");

  return `<div class="page">
  <div class="sender-block">${sender}</div>
  <div class="fold-mark"></div>
  <div class="recipient-block">${recipient}</div>
  ${blocks.dateLine ? `<div class="date-line">${esc(blocks.dateLine)}</div>` : ""}
  ${blocks.referenceLine ? `<div class="reference-line">${esc(blocks.referenceLine)}</div>` : ""}
  ${blocks.subjectLine ? `<div class="subject-line">${esc(blocks.subjectLine)}</div>` : ""}
  ${blocks.salutation ? `<div class="salutation">${esc(blocks.salutation)}</div>` : ""}
  ${bodyParas}
  ${blocks.closing ? `<div class="closing">${esc(blocks.closing)}</div>` : ""}
  <div class="signature-space"></div>
  ${blocks.signerName ? `<div class="signer-name">${esc(blocks.signerName)}</div>` : ""}
</div>`;
}

function generateCvHtml(text: string): string {
  const lines = text.split("\n");
  let html = '<div class="page">';
  let inSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      if (inSection) html += "<br/>";
      continue;
    }
    if (trimmed === "LEBENSLAUF") {
      html += `<div class="cv-title">${esc(trimmed)}</div>`;
      continue;
    }
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes(":")) {
      html += `<div class="cv-heading">${esc(trimmed)}</div>`;
      inSection = true;
      continue;
    }
    if (trimmed.includes(":") && trimmed.indexOf(":") < 20) {
      const [label, ...rest] = trimmed.split(":");
      html += `<div class="cv-field"><span class="cv-field-label">${esc(label)}:</span> ${esc(rest.join(":").trim())}</div>`;
    } else {
      html += `<div class="cv-field">${esc(trimmed)}</div>`;
    }
  }

  html += "</div>";
  return html;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
