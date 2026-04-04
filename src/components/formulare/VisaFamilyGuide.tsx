import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExternalLink, AlertTriangle, MapPin, Clock, FileText, CheckCircle2,
  Users, BookOpen, ListOrdered, Link as LinkIcon, FileCheck, AlertCircle, Info,
} from "lucide-react";
import VisaFamilyForm from "./muster/VisaFamilyForm";

export default function VisaFamilyGuide() {
  const { t } = useTranslation("formulare");
  const [showForm, setShowForm] = useState(false);

  const whoKeys = Array.from({ length: 5 }, (_, i) => `visa_family_who${i + 1}`);
  const docKeys = Array.from({ length: 12 }, (_, i) => `visa_family_doc${i + 1}`);
  const stepKeys = Array.from({ length: 8 }, (_, i) => `visa_family_step${i + 1}`);
  const costKeys = Array.from({ length: 8 }, (_, i) => `visa_family_cost${i + 1}`);
  const specialKeys = Array.from({ length: 5 }, (_, i) => `visa_family_special${i + 1}`);
  const errKeys = Array.from({ length: 8 }, (_, i) => `visa_family_err${i + 1}`);

  const splitDash = (text: string) => {
    const idx = text.indexOf(" — ");
    if (idx > 0) return { bold: text.substring(0, idx), rest: text.substring(idx) };
    return { bold: text, rest: "" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">👨‍👩‍👧 {t("visa_family_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("visa_family_subtitle")}</p>
      </div>

      {/* S1 — Who */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Users className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s1")}
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

      {/* S2 — A1 Language Requirement */}
      <section className="rounded-xl p-5 space-y-4" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#92400E" }}>
          <BookOpen className="h-4 w-4" style={{ color: "#C9A84C" }} /> {t("visa_family_s2")}
        </h2>
        <h3 className="font-bold text-sm" style={{ color: "#92400E" }}>{t("visa_family_lang_title")}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{t("visa_family_lang_body")}</p>
        <a
          href={t("visa_family_lang_url")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
          style={{ color: "#C9A84C" }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Goethe-Institut A1 Prüfung
        </a>
      </section>

      {/* S3 — Documents */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileText className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s3")}
        </h2>
        <ol className="space-y-2">
          {docKeys.map((key, i) => {
            const text = t(key);
            const isPhoto = key === "visa_family_doc2";
            const isApostille = key === "visa_family_doc4" || key === "visa_family_doc5";
            const isA1 = key === "visa_family_doc7";
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
                  {isApostille && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← Apostille prüfen!
                    </span>
                  )}
                  {isA1 && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← Muss vor Einreise vorliegen!
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
          <ListOrdered className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s4")}
        </h2>
        <ol className="space-y-2.5">
          {stepKeys.map((key, i) => {
            const { bold, rest } = splitDash(t(key));
            const isStep1 = key === "visa_family_step1";
            const isStep7 = key === "visa_family_step7";
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{bold}</strong>{rest}
                  {isStep1 && (
                    <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold text-destructive">
                      <AlertCircle className="h-3 w-3" /> Frühzeitig anmelden!
                    </span>
                  )}
                  {isStep7 && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← Immer VOR Ablauf des Visums!
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* S5 — Where */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s5")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("visa_family_where")}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a href="https://digital.diplo.de/visa" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent">
            <ExternalLink className="h-3.5 w-3.5" /> Termin buchen (digital.diplo.de)
          </a>
          <a href="https://www.goethe.de" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent">
            <ExternalLink className="h-3.5 w-3.5" /> Goethe-Institut Kurse finden
          </a>
        </div>
      </section>

      {/* S6 — Costs */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s6")}
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

      {/* S7 — Special Rules */}
      <section className="rounded-xl p-5 space-y-3" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#1E40AF" }}>
          <Info className="h-4 w-4" style={{ color: "#1E40AF" }} /> {t("visa_family_s7")}
        </h2>
        <ul className="space-y-2">
          {specialKeys.map((key) => {
            const { bold, rest } = splitDash(t(key));
            return (
              <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#1E40AF" }} />
                <span><strong className="text-foreground">{bold}</strong>{rest}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* S8 — Errors */}
      <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-destructive">
          <AlertTriangle className="h-4 w-4" /> {t("visa_family_s8")}
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

      {/* S9 — Sources */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <LinkIcon className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s9")}
        </h2>
        <div className="flex flex-col gap-2">
          {[
            { label: "BAMF – Familiennachzug", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html" },
            { label: "Make it in Germany – Familiennachzug", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/familiennachzug" },
            { label: "Auswärtiges Amt – Visa", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt/buergerservice/faq/-/606848" },
            { label: "Termin buchen (digital.diplo.de)", url: "https://digital.diplo.de/visa" },
            { label: "Goethe-Institut A1 Prüfung", url: "https://www.goethe.de/de/spr/kup/prf/prf/sd1.html" },
            { label: "Apostille Informationen", url: "https://www.auswaertiges-amt.de/de/service/konsularinfo/apostille" },
          ].map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-[hsl(var(--gold))] hover:underline">
              <ExternalLink className="h-3.5 w-3.5 text-[hsl(var(--gold))]" /> {s.label}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/70 pt-1">Stand 2025. Offizielle staatliche Quellen.</p>
      </section>

      {/* S10 — Musterformular */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileCheck className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_family_s10")}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "white",
            border: showForm ? "2px solid #C9A84C" : "1.5px solid #E8D9B0",
            boxShadow: showForm ? "0 0 0 3px rgba(201,168,76,0.15)" : "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          <FileText className="h-8 w-8 mb-3" style={{ color: "#C9A84C" }} />
          <h3 className="font-bold text-sm">{t("visa_family_form_title")}</h3>
          <p className="text-xs text-muted-foreground mt-1">{t("visa_family_form_sub")}</p>
          <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>
            {showForm ? t("visa_family_form_close") : t("visa_family_form_open")} →
          </span>
        </button>
        <p className="text-[11px] text-muted-foreground/70">{t("visa_family_form_hint")}</p>
        <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
          style={{ color: "#C9A84C" }}>
          <ExternalLink className="h-3.5 w-3.5" /> BAMF – Familiennachzug
        </a>
      </section>

      {/* Inline Form */}
      {showForm && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <VisaFamilyForm />
        </div>
      )}
    </div>
  );
}
