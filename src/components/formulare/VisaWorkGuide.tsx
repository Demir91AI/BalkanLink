import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExternalLink, AlertTriangle, MapPin, Clock, FileText, CheckCircle2,
  Users, Zap, ListOrdered, Link as LinkIcon, FileCheck, Building2, AlertCircle,
} from "lucide-react";
import VisaWorkForm1 from "./muster/VisaWorkForm1";
import VisaWorkForm2 from "./muster/VisaWorkForm2";

export default function VisaWorkGuide() {
  const { t } = useTranslation("formulare");
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);

  const whoKeys = ["visa_work_who1", "visa_work_who2", "visa_work_who3", "visa_work_who4"];
  const docKeys = Array.from({ length: 10 }, (_, i) => `visa_work_doc${i + 1}`);
  const stepKeys = Array.from({ length: 9 }, (_, i) => `visa_work_step${i + 1}`);
  const costKeys = Array.from({ length: 5 }, (_, i) => `visa_work_cost${i + 1}`);
  const errKeys = Array.from({ length: 6 }, (_, i) => `visa_work_err${i + 1}`);

  const splitDash = (text: string) => {
    const idx = text.indexOf(" — ");
    if (idx > 0) return { bold: text.substring(0, idx), rest: text.substring(idx) };
    return { bold: text, rest: "" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">🛂 {t("visa_work_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("visa_work_subtitle")}</p>
      </div>

      {/* S1 — Who */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Users className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s1")}
        </h2>
        <ul className="space-y-2">
          {whoKeys.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--gold))]" />
              <span className="text-muted-foreground">{t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* S2 — Westbalkan Highlight */}
      <section className="rounded-xl p-5 space-y-3" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#92400E" }}>
          <Zap className="h-4 w-4" style={{ color: "#C9A84C" }} /> {t("visa_work_s2")}
        </h2>
        <h3 className="font-bold text-sm" style={{ color: "#92400E" }}>{t("visa_work_wb_title")}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{t("visa_work_wb_body")}</p>
        <a
          href={t("visa_work_wb_url")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
          style={{ color: "#C9A84C" }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Westbalkan-Regelung – Make it in Germany
        </a>
      </section>

      {/* S3 — Documents */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileText className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s3")}
        </h2>
        <ol className="space-y-2">
          {docKeys.map((key, i) => {
            const text = t(key);
            const isPhoto = key === "visa_work_doc2";
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 text-[10px] font-bold text-[hsl(var(--gold))]">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  {text}
                  {isPhoto && (
                    <span className="ml-2 inline-flex items-center gap-1 text-destructive">
                      <AlertCircle className="h-3 w-3" />
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* S4 — Steps */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <ListOrdered className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s4")}
        </h2>
        <ol className="space-y-2.5">
          {stepKeys.map((key, i) => {
            const { bold, rest } = splitDash(t(key));
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{bold}</strong>{rest}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* S5 — Where */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s5")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("visa_work_where")}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="https://digital.diplo.de/visa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Termin online buchen
          </a>
          <a
            href="https://www.bamf.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ausländerbehörde finden
          </a>
        </div>
      </section>

      {/* S6 — Costs */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s6")}
        </h2>
        <ul className="space-y-1.5">
          {costKeys.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]" />
              {t(key)}
            </li>
          ))}
        </ul>
      </section>

      {/* S7 — Errors */}
      <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-destructive">
          <AlertTriangle className="h-4 w-4" /> {t("visa_work_s7")}
        </h2>
        <ul className="space-y-1.5">
          {errKeys.map((key) => {
            const { bold, rest } = splitDash(t(key));
            return (
              <li key={key} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-destructive" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{bold}</strong>{rest}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* S8 — Sources */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <LinkIcon className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s8")}
        </h2>
        <div className="flex flex-col gap-2">
          {[
            { label: "BAMF – Arbeit", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html" },
            { label: "Make it in Germany – Arbeitsvisa", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit" },
            { label: "Westbalkan-Regelung", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung" },
            { label: "Auswärtiges Amt – Visa", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt/buergerservice/faq/-/606848" },
            { label: "Online Visumantrag (digital.diplo.de)", url: "https://digital.diplo.de/visa" },
          ].map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-[hsl(var(--gold))] hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/70 pt-1">
          Alle Quellenangaben Stand 2025. Offizielle staatliche Quellen.
        </p>
      </section>

      {/* S9 — Musterformulare */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileCheck className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_work_s9")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Form 1 CTA */}
          <button
            onClick={() => { setShowForm1(!showForm1); setShowForm2(false); }}
            className="rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "white",
              border: showForm1 ? "2px solid #C9A84C" : "1.5px solid #E8D9B0",
              boxShadow: showForm1 ? "0 0 0 3px rgba(201,168,76,0.15)" : "0 2px 12px rgba(0,0,0,0.07)",
            }}
          >
            <FileText className="h-8 w-8 mb-3" style={{ color: "#C9A84C" }} />
            <h3 className="font-bold text-sm">{t("visa_work_form1_title")}</h3>
            <p className="text-xs text-muted-foreground mt-1">{t("visa_work_form1_sub")}</p>
            <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>
              {showForm1 ? t("visa_work_form_close") : t("visa_work_form_open")} →
            </span>
          </button>

          {/* Form 2 CTA */}
          <button
            onClick={() => { setShowForm2(!showForm2); setShowForm1(false); }}
            className="rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "white",
              border: showForm2 ? "2px solid #C9A84C" : "1.5px solid #E8D9B0",
              boxShadow: showForm2 ? "0 0 0 3px rgba(201,168,76,0.15)" : "0 2px 12px rgba(0,0,0,0.07)",
            }}
          >
            <Building2 className="h-8 w-8 mb-3" style={{ color: "#C9A84C" }} />
            <h3 className="font-bold text-sm">{t("visa_work_form2_title")}</h3>
            <p className="text-xs text-muted-foreground mt-1">{t("visa_work_form2_sub")}</p>
            <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>
              {showForm2 ? t("visa_work_form_close") : t("visa_work_form_open")} →
            </span>
          </button>
        </div>
      </section>

      {/* Inline Form Rendering */}
      {showForm1 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <VisaWorkForm1 />
        </div>
      )}
      {showForm2 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <VisaWorkForm2 />
        </div>
      )}
    </div>
  );
}
