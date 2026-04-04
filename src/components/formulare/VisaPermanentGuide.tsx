import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ExternalLink, AlertTriangle, MapPin, Clock, FileText, CheckCircle2,
  Shield, ListOrdered, Link as LinkIcon, FileCheck, AlertCircle,
  Star, Rocket, GitCompareArrows,
} from "lucide-react";
import VisaPermanentForm1 from "./muster/VisaPermanentForm1";
import VisaPermanentForm2 from "./muster/VisaPermanentForm2";

export default function VisaPermanentGuide() {
  const { t } = useTranslation("formulare");
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);

  const reqKeys = Array.from({ length: 8 }, (_, i) => `visa_permanent_req${i + 1}`);
  const docKeys = Array.from({ length: 15 }, (_, i) => `visa_permanent_doc${i + 1}`);
  const stepKeys = Array.from({ length: 8 }, (_, i) => `visa_permanent_step${i + 1}`);
  const costKeys = Array.from({ length: 7 }, (_, i) => `visa_permanent_cost${i + 1}`);
  const fastKeys = Array.from({ length: 5 }, (_, i) => `visa_permanent_fast${i + 1}`);
  const errKeys = Array.from({ length: 8 }, (_, i) => `visa_permanent_err${i + 1}`);

  const splitDash = (text: string) => {
    const idx = text.indexOf(" — ");
    if (idx > 0) return { bold: text.substring(0, idx), rest: text.substring(idx) };
    return { bold: text, rest: "" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">🛡️ {t("visa_permanent_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("visa_permanent_subtitle")}</p>
      </div>

      {/* S1 — Comparison NE vs EU */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <GitCompareArrows className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s1")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl p-4 space-y-2" style={{ background: "#FFF8EC", border: "2px solid #E8D9B0" }}>
            <h3 className="font-bold text-sm" style={{ color: "#92400E" }}>{t("visa_permanent_diff_ne")}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#4A4A4A" }}>{t("visa_permanent_diff_ne_body")}</p>
          </div>
          <div className="rounded-xl p-4 space-y-2" style={{ background: "#EFF6FF", border: "2px solid #BFDBFE" }}>
            <h3 className="font-bold text-sm" style={{ color: "#1E40AF" }}>{t("visa_permanent_diff_eu")}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#4A4A4A" }}>{t("visa_permanent_diff_eu_body")}</p>
          </div>
        </div>
        <div className="rounded-lg p-3 text-center text-xs font-bold" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
          💡 Empfehlung: Beantrage BEIDE gleichzeitig!
        </div>
      </section>

      {/* S2 — Requirements */}
      <section className="rounded-xl p-5 space-y-4" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#92400E" }}>
          <CheckCircle2 className="h-4 w-4" style={{ color: "#C9A84C" }} /> {t("visa_permanent_s2")}
        </h2>
        <ol className="space-y-2">
          {reqKeys.map((key, i) => (
            <li key={key} className="flex items-start gap-3 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "#C9A84C" }}>
                {i + 1}
              </span>
              <span style={{ color: "#4A4A4A" }} className="leading-relaxed">{t(key)}</span>
            </li>
          ))}
        </ol>
        {/* Blue Card special */}
        <div className="rounded-xl p-4 space-y-1" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
          <h4 className="text-xs font-bold" style={{ color: "#1E40AF" }}>⭐ Blue Card Sonderregel</h4>
          <p className="text-xs leading-relaxed font-semibold" style={{ color: "#1E40AF" }}>{t("visa_permanent_req_bluecard")}</p>
        </div>
      </section>

      {/* S3 — Documents */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileText className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s3")}
        </h2>
        <ol className="space-y-2">
          {docKeys.map((key, i) => {
            const text = t(key);
            const isPhoto = key === "visa_permanent_doc2";
            const isBoth = key === "visa_permanent_doc3" || key === "visa_permanent_doc4";
            const isDRV = key === "visa_permanent_doc6";
            const isB1 = key === "visa_permanent_doc8";
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 text-[10px] font-bold text-[hsl(var(--gold))]">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  {text}
                  {isPhoto && <span className="ml-2 inline-flex items-center gap-1 text-destructive"><AlertCircle className="h-3 w-3" /></span>}
                  {isBoth && <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>← Beide gleichzeitig einreichen!</span>}
                  {isDRV && <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>← kostenlos auf drv.de</span>}
                  {isB1 && <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>← B1 PFLICHT!</span>}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* S4 — Steps */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <ListOrdered className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s4")}
        </h2>
        <ol className="space-y-2.5">
          {stepKeys.map((key, i) => {
            const { bold, rest } = splitDash(t(key));
            const isStep4 = key === "visa_permanent_step4";
            const isStep5 = key === "visa_permanent_step5";
            const isStep8 = key === "visa_permanent_step8";
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{bold}</strong>{rest}
                  {isStep4 && <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold text-destructive"><AlertCircle className="h-3 w-3" /> 6 Monate Wartezeit möglich!</span>}
                  {isStep5 && <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>← BEIDE Anträge gleichzeitig!</span>}
                  {isStep8 && <span className="ml-2 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>← Bei Auslandsreisen &gt;6 Mon. vorher klären!</span>}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* S5 — Where */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s5")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("visa_permanent_where")}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { label: "Deutsche Rentenversicherung (drv.de)", url: "https://www.drv.de" },
            { label: "Integrationskurse finden (BAMF)", url: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/integrationskurse-node.html" },
            { label: "Ausländerbehörde finden", url: "https://www.bamf.de" },
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
          <Clock className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s6")}
        </h2>
        <ul className="space-y-1.5">
          {costKeys.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]" />
              {t(key)}
              {key === "visa_permanent_cost3" && (
                <span className="ml-1 text-[11px] font-semibold" style={{ color: "#C9A84C" }}>
                  ← 113 € für beide zusammen!
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* S7 — Fast tracks */}
      <section className="rounded-xl p-5 space-y-3" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#92400E" }}>
          <Rocket className="h-4 w-4" style={{ color: "#C9A84C" }} /> {t("visa_permanent_s7")}
        </h2>
        <ul className="space-y-2">
          {fastKeys.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
              <Star className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#C9A84C" }} />
              <span>{key === "visa_permanent_fast1" ? <strong>{t(key)}</strong> : t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* S8 — Errors */}
      <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-destructive">
          <AlertTriangle className="h-4 w-4" /> {t("visa_permanent_s8")}
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
        <div className="flex items-start gap-2 rounded-lg p-3 text-[11px] font-semibold" style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>60 Monate = 5 Jahre Pflichtbeiträge — Beitragszeiten genau prüfen! Auch kurze Auslandsaufenthalte dokumentieren!</span>
        </div>
      </section>

      {/* S9 — Sources */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <LinkIcon className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s9")}
        </h2>
        <div className="flex flex-col gap-2">
          {[
            { label: "BAMF – Niederlassungserlaubnis", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html" },
            { label: "Make it in Germany – NE", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/niederlassungserlaubnis" },
            { label: "BAMF – Daueraufenthalt-EU", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html" },
            { label: "Deutsche Rentenversicherung", url: "https://www.drv.de" },
            { label: "BAMF Integrationskurse", url: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/integrationskurse-node.html" },
            { label: "Auswärtiges Amt – Aufenthalt", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt" },
          ].map((s) => (
            <a key={s.url + s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-[hsl(var(--gold))] hover:underline">
              <ExternalLink className="h-3.5 w-3.5 text-[hsl(var(--gold))]" /> {s.label}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/70 pt-1">Stand 2025. Offizielle staatliche Quellen.</p>
      </section>

      {/* S10 — Musterformulare */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileCheck className="h-4 w-4 text-[hsl(var(--gold))]" /> {t("visa_permanent_s10")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Form 1 — NE */}
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
            <h3 className="font-bold text-sm">{t("visa_permanent_form1_title")}</h3>
            <p className="text-xs text-muted-foreground mt-1">{t("visa_permanent_form1_sub")}</p>
            <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>
              {showForm1 ? "Zatvori" : "📋 Otvori Musterformular 1"} →
            </span>
          </button>
          {/* Form 2 — EU */}
          <button
            onClick={() => { setShowForm2(!showForm2); setShowForm1(false); }}
            className="rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "white",
              border: showForm2 ? "2px solid #C9A84C" : "1.5px solid #E8D9B0",
              boxShadow: showForm2 ? "0 0 0 3px rgba(201,168,76,0.15)" : "0 2px 12px rgba(0,0,0,0.07)",
            }}
          >
            <FileText className="h-8 w-8 mb-3" style={{ color: "#1E40AF" }} />
            <h3 className="font-bold text-sm">{t("visa_permanent_form2_title")}</h3>
            <p className="text-xs text-muted-foreground mt-1">{t("visa_permanent_form2_sub")}</p>
            <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>
              {showForm2 ? "Zatvori" : "📋 Otvori Musterformular 2"} →
            </span>
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline" style={{ color: "#C9A84C" }}>
            <ExternalLink className="h-3.5 w-3.5" /> BAMF – Niederlassungserlaubnis
          </a>
          <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline" style={{ color: "#C9A84C" }}>
            <ExternalLink className="h-3.5 w-3.5" /> BAMF – Daueraufenthalt-EU
          </a>
        </div>
      </section>

      {/* Inline Forms */}
      {showForm1 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <VisaPermanentForm1 />
        </div>
      )}
      {showForm2 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <VisaPermanentForm2 />
        </div>
      )}
    </div>
  );
}
