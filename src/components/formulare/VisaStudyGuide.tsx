import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExternalLink, AlertTriangle, MapPin, Clock, FileText, CheckCircle2,
  GraduationCap, ListOrdered, Link as LinkIcon, FileCheck, AlertCircle,
  Briefcase, TrendingUp, Star,
} from "lucide-react";
import VisaStudyForm from "./muster/VisaStudyForm";

export default function VisaStudyGuide() {
  const { t } = useTranslation("formulare");
  const [showForm, setShowForm] = useState(false);

  const whoKeys = Array.from({ length: 5 }, (_, i) => `visa_study_who${i + 1}`);
  const docKeys = Array.from({ length: 11 }, (_, i) => `visa_study_doc${i + 1}`);
  const stepKeys = Array.from({ length: 9 }, (_, i) => `visa_study_step${i + 1}`);
  const costKeys = Array.from({ length: 9 }, (_, i) => `visa_study_cost${i + 1}`);
  const workKeys = Array.from({ length: 5 }, (_, i) => `visa_study_work${i + 1}`);
  const afterKeys = Array.from({ length: 4 }, (_, i) => `visa_study_after${i + 1}`);
  const errKeys = Array.from({ length: 8 }, (_, i) => `visa_study_err${i + 1}`);

  const splitDash = (text: string) => {
    const idx = text.indexOf(" — ");
    if (idx > 0) return { bold: text.substring(0, idx), rest: text.substring(idx) };
    return { bold: text, rest: "" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">🎓 {t("visa_study_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("visa_study_subtitle")}</p>
      </div>

      {/* S1 — Who */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <GraduationCap className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s1")}
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

      {/* S2 — Sperrkonto */}
      <section className="rounded-xl p-5 space-y-4" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#92400E" }}>
          <GraduationCap className="h-4 w-4" style={{ color: "#C9A84C" }} /> {t("visa_study_s2")}
        </h2>
        <h3 className="font-bold text-sm" style={{ color: "#92400E" }}>{t("visa_study_finance_title")}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{t("visa_study_finance_body")}</p>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-lg p-3 text-center" style={{ background: "rgba(201,168,76,0.15)", border: "1px solid #E8D9B0" }}>
            <span className="block text-lg font-extrabold" style={{ color: "#92400E" }}>11.208 €/Jahr</span>
            <span className="text-[11px] font-medium" style={{ color: "#92400E" }}>Sperrkonto 2025</span>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
            <span className="block text-lg font-extrabold" style={{ color: "#1E40AF" }}>934 €/Monat</span>
            <span className="text-[11px] font-medium" style={{ color: "#1E40AF" }}>Monatliche Freigabe</span>
          </div>
        </div>
        <p className="text-[11px] font-medium pt-1" style={{ color: "#92400E" }}>
          Fintiba · Expatrio · Coracle · Deutsche Bank
        </p>
        <a href={t("visa_study_finance_url")} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline" style={{ color: "#C9A84C" }}>
          <ExternalLink className="h-3.5 w-3.5" /> DAAD Stipendien
        </a>
      </section>

      {/* S3 — Documents */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileText className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s3")}
        </h2>
        <ol className="space-y-2">
          {docKeys.map((key, i) => {
            const text = t(key);
            const isPhoto = key === "visa_study_doc2";
            const isZulassung = key === "visa_study_doc4";
            const isSperrkonto = key === "visa_study_doc6";
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
                  {isZulassung && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← Ohne Zulassung kein Visum!
                    </span>
                  )}
                  {isSperrkonto && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← MUSS vor Visumantrag vorliegen!
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
          <ListOrdered className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s4")}
        </h2>
        <ol className="space-y-2.5">
          {stepKeys.map((key, i) => {
            const { bold, rest } = splitDash(t(key));
            const isStep1 = key === "visa_study_step1";
            const isStep3 = key === "visa_study_step3";
            const isStep9 = key === "visa_study_step9";
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{bold}</strong>{rest}
                  {isStep1 && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← uni-assist.de
                    </span>
                  )}
                  {isStep3 && (
                    <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold text-destructive">
                      <AlertCircle className="h-3 w-3" /> Frühzeitig — dauert 2–4 Wochen!
                    </span>
                  )}
                  {isStep9 && (
                    <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                      ← Immatrikulationsbescheinigung + Sperrkonto mitbringen!
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
          <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s5")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("visa_study_where")}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { label: "Termin buchen (digital.diplo.de)", url: "https://digital.diplo.de/visa" },
            { label: "uni-assist.de", url: "https://www.uni-assist.de" },
            { label: "Fintiba Sperrkonto", url: "https://www.fintiba.com" },
            { label: "DAAD Stipendien", url: "https://www.daad.de" },
          ].map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent">
              <ExternalLink className="h-3.5 w-3.5" /> {l.label}
            </a>
          ))}
        </div>
      </section>

      {/* S6 — Costs */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s6")}
        </h2>
        <ul className="space-y-1.5">
          {costKeys.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]" />
              {t(key)}
              {key === "visa_study_cost7" && (
                <span className="ml-1 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                  ← Keine Studiengebühren!
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* S7 — Work during studies */}
      <section className="rounded-xl p-5 space-y-3" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#166534" }}>
          <Briefcase className="h-4 w-4" style={{ color: "#166534" }} /> {t("visa_study_s7")}
        </h2>
        <ul className="space-y-2">
          {workKeys.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#16A34A" }} />
              <span>{key === "visa_study_work1" ? <strong>{t(key)}</strong> : t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* S8 — After studies */}
      <section className="rounded-xl p-5 space-y-3" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#92400E" }}>
          <TrendingUp className="h-4 w-4" style={{ color: "#C9A84C" }} /> {t("visa_study_s8")}
        </h2>
        <ul className="space-y-2">
          {afterKeys.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
              <Star className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#C9A84C" }} />
              <span>{key === "visa_study_after1" ? <strong>{t(key)}</strong> : t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* S9 — Errors */}
      <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-destructive">
          <AlertTriangle className="h-4 w-4" /> {t("visa_study_s9")}
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

      {/* S10 — Sources */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <LinkIcon className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s10")}
        </h2>
        <div className="flex flex-col gap-2">
          {[
            { label: "BAMF – Studium §16b", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html" },
            { label: "Make it in Germany – Studiumsvisa", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/studium" },
            { label: "Auswärtiges Amt – Visa", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt/buergerservice/faq/-/606848" },
            { label: "digital.diplo.de – Termin", url: "https://digital.diplo.de/visa" },
            { label: "uni-assist.de – Bewerbung", url: "https://www.uni-assist.de" },
            { label: "DAAD – Stipendien", url: "https://www.daad.de/de/studieren-und-forschen-in-deutschland/stipendien/daad-stipendien/" },
            { label: "Fintiba – Sperrkonto", url: "https://www.fintiba.com" },
            { label: "TestDaF – Sprachprüfung", url: "https://www.testdaf.de" },
          ].map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-[hsl(var(--gold))] hover:underline">
              <ExternalLink className="h-3.5 w-3.5 text-[hsl(var(--gold))]" /> {s.label}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/70 pt-1">Stand 2025. Offizielle staatliche Quellen.</p>
      </section>

      {/* S11 — Musterformular */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileCheck className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_study_s11")}
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
          <h3 className="font-bold text-sm">{t("visa_study_form_title")}</h3>
          <p className="text-xs text-muted-foreground mt-1">{t("visa_study_form_sub")}</p>
          <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>
            {showForm ? t("visa_study_form_close") : t("visa_study_form_open")} →
          </span>
        </button>
        <p className="text-[11px] text-muted-foreground/70">{t("visa_study_form_hint")}</p>
        <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
          style={{ color: "#C9A84C" }}>
          <ExternalLink className="h-3.5 w-3.5" /> BAMF – Studium
        </a>
      </section>

      {/* Inline Form */}
      {showForm && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <VisaStudyForm />
        </div>
      )}
    </div>
  );
}
