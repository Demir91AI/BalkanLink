import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MusterDisclaimer from "./MusterDisclaimer";
import PrivacyGuarantee from "./PrivacyGuarantee";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";

export interface DatenblattConfig {
  /** Async builder returning PDF bytes */
  build: () => Promise<Uint8Array>;
  fileName: string;
  /** Razlog zašto se generiše Datenblatt umjesto 1:1 popunjenog službenog PDF-a */
  reasonNote: string;
  /** Title for the purple datenblatt CTA box */
  title?: string;
  /** Button label */
  buttonLabel?: string;
}

/** 1:1 auto-fill konfiguracija za SAVEZNE AcroForm PDF-ove (npr. EzB). */
export interface OriginalAutofillConfig {
  /** Async builder returning Blob popunjenog originalnog PDF-a */
  build: () => Promise<Blob>;
  fileName: string;
  /** Naslov plave kutije */
  title?: string;
  /** Tijelo objašnjenja */
  body?: string;
  /** Label dugmeta */
  buttonLabel?: string;
}

/** Premium Bewerbungs-Mappe (kompletan paket: cover + Anschreiben + Checkliste + Datenblatt). */
export interface BewerbungsMappeConfig {
  /** Async builder returning PDF bytes */
  build: () => Promise<Uint8Array>;
  fileName: string;
  /** Title for the gold premium CTA box */
  title?: string;
  /** Tijelo objašnjenja */
  body?: string;
  /** Button label */
  buttonLabel?: string;
}

interface Props {
  formKey: string;
  paperId?: string;
  downloadTitle?: string;
  downloadBody?: string;
  downloadLabel?: string;
  originalPdfUrl?: string;
  originalPdfLabel?: string;
  /** When provided, renders extra purple "Preuzmi Datenblatt PDF" CTA + amber explainer note. */
  datenblatt?: DatenblattConfig;
  /** When provided, renders blue "1:1 auto-fill" CTA above Datenblatt. */
  originalAutofill?: OriginalAutofillConfig;
  /** When provided, renders gold Premium "Bewerbungs-Mappe" CTA at the top. */
  bewerbungsMappe?: BewerbungsMappeConfig;
}

/**
 * Drop-in intro block for Musterformulare.
 *
 *  1. Legal disclaimer gate (RDG/StBerG)
 *  2. Privacy Guarantee box
 *  3. Optional amber "zašto Datenblatt" objašnjenje
 *  4. Optional purple Datenblatt PDF CTA (pdf-lib generated)
 *  5. Green "Popuni online → preuzmi PDF" box (window.print fallback, hidden when Datenblatt exists)
 *  6. Optional link to the official empty PDF
 */
export default function MusterIntroBlock({
  formKey,
  paperId,
  downloadTitle = "✅ Popuni online → preuzmi popunjeni formular kao PDF",
  downloadBody = "Tvoji podaci se popunjavaju lokalno u tvom browseru — ništa ne ide na server. Klikom na dugme otvara se dijalog za štampu — odaberi „Sačuvaj kao PDF“ i preuzmi popunjeni Musterformular.",
  downloadLabel = "📄 Preuzmi popunjeni Musterformular (PDF)",
  originalPdfUrl,
  originalPdfLabel = "Original (službeni PDF) →",
  datenblatt,
  originalAutofill,
  bewerbungsMappe,
}: Props) {
  const { t } = useTranslation("forms");
  const { isPremium } = usePremiumAccess();
  const [busy, setBusy] = useState(false);
  const [autofillBusy, setAutofillBusy] = useState(false);
  const [mappeBusy, setMappeBusy] = useState(false);

  const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

  const handleMappe = async () => {
    if (!bewerbungsMappe || mappeBusy || !isPremium) return;
    setMappeBusy(true);
    try {
      const bytes = await bewerbungsMappe.build();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = bewerbungsMappe.fileName;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Bewerbungs-Mappe error", err);
      alert(t("muster.errors.mappe", { error: errMsg(err) }));
    } finally {
      setMappeBusy(false);
    }
  };

  const handleAutofill = async () => {
    if (!originalAutofill || autofillBusy) return;
    setAutofillBusy(true);
    try {
      const blob = await originalAutofill.build();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalAutofill.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Original auto-fill error", err);
      alert(t("muster.errors.autofill", { error: errMsg(err) }));
    } finally {
      setAutofillBusy(false);
    }
  };

  const handlePrint = () => {
    if (paperId) {
      const el = document.getElementById(paperId);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setTimeout(() => window.print(), 100);
  };

  const handleDatenblatt = async () => {
    if (!datenblatt || busy) return;
    setBusy(true);
    try {
      const bytes = await datenblatt.build();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = datenblatt.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error("Datenblatt PDF error", e);
      alert(t("muster.errors.datenblatt", { error: errMsg(e) }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <MusterDisclaimer formKey={formKey}><></></MusterDisclaimer>
      <PrivacyGuarantee />

      {bewerbungsMappe && (
        <div
          className="no-print"
          style={{
            marginBottom: 14, padding: 18,
            background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
            border: "2px solid #D97706", borderRadius: 12,
            boxShadow: "0 6px 20px rgba(217, 119, 6, 0.18)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute", top: -10, right: 16,
              background: "#D97706", color: "#fff",
              padding: "3px 10px", borderRadius: 999,
              fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
            }}
          >
            ⭐ {t("muster.bewerbungsMappe.badge")}
          </div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#78350F", marginBottom: 6 }}>
            {bewerbungsMappe.title ?? t("muster.bewerbungsMappe.title")}
          </div>
          <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.55, marginBottom: 12 }}>
            {bewerbungsMappe.body ?? t("muster.bewerbungsMappe.body")}
          </div>
          {isPremium ? (
            <button
              onClick={handleMappe}
              disabled={mappeBusy}
              style={{
                background: mappeBusy
                  ? "#D97706"
                  : "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                color: "#fff", border: "none", padding: "13px 20px", borderRadius: 8,
                fontWeight: 800, fontSize: 14, cursor: mappeBusy ? "default" : "pointer",
                boxShadow: "0 6px 16px rgba(180, 83, 9, 0.35)",
              }}
            >
              {mappeBusy ? t("muster.bewerbungsMappe.busy") : (bewerbungsMappe.buttonLabel ?? t("muster.bewerbungsMappe.button"))}
            </button>
          ) : (
            <Link
              to="/premium"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                color: "#fff", textDecoration: "none",
                padding: "13px 20px", borderRadius: 8,
                fontWeight: 800, fontSize: 14,
                boxShadow: "0 6px 16px rgba(180, 83, 9, 0.35)",
              }}
            >
              {t("muster.bewerbungsMappe.premiumCta")}
            </Link>
          )}
        </div>
      )}

      {originalAutofill && (
        <div
          className="no-print"
          style={{
            marginBottom: 14, padding: 16,
            background: "#EFF6FF", border: "2px solid #2563EB", borderRadius: 10,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1E3A8A", marginBottom: 6 }}>
            {originalAutofill.title ?? "✅ 1:1 popunjen ORIGINALNI službeni PDF"}
          </div>
          <div style={{ fontSize: 12, color: "#1E3A8A", lineHeight: 1.55, marginBottom: 12 }}>
            {originalAutofill.body ?? "Popunjavamo zvanični obrazac Bundesagentur für Arbeit (EzB) tvojim podacima iz wizarda. Isti onaj koji prima ambasada / Ausländerbehörde / poslodavac u Njemačkoj. Polja ostaju editabilna — poslodavac dodaje ono što samo on zna (Betriebsnummer, Tarifvertrag, potpis)."}
          </div>
          <button
            onClick={handleAutofill}
            disabled={autofillBusy}
            style={{
              background: autofillBusy ? "#60A5FA" : "#2563EB",
              color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8,
              fontWeight: 700, fontSize: 14, cursor: autofillBusy ? "default" : "pointer",
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
            }}
          >
            {autofillBusy ? "Popunjavam PDF…" : (originalAutofill.buttonLabel ?? "📥 Preuzmi popunjen originalni PDF")}
          </button>
        </div>
      )}

      {datenblatt && (
        <>
          <div
            className="no-print"
            style={{
              marginBottom: 14, padding: 14,
              background: "#FFFBEB", border: "1.5px solid #D97706", borderRadius: 10,
              fontSize: 12, lineHeight: 1.55, color: "#78350F",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>ℹ Zašto Datenblatt, a ne popunjen službeni PDF?</div>
            {datenblatt.reasonNote}
          </div>

          <div
            className="no-print"
            style={{
              marginBottom: 18, padding: 16,
              background: "#F5F3FF", border: "2px solid #7C3AED", borderRadius: 10,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: "#4C1D95", marginBottom: 6 }}>
              {datenblatt.title ?? "📋 Preuzmi BalkanLink Datenblatt (PDF)"}
            </div>
            <div style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.55, marginBottom: 12 }}>
              Strukturirani sažetak svih podataka po sekcijama službenog obrasca, sa BHS i DE labelama.
              Ponesi ga na šalter ili koristi kao predložak kad popunjavaš službeni PDF / online portal.
            </div>
            <button
              onClick={handleDatenblatt}
              disabled={busy}
              style={{
                background: busy ? "#A78BFA" : "#7C3AED",
                color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8,
                fontWeight: 700, fontSize: 14, cursor: busy ? "default" : "pointer",
                boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
              }}
            >
              {busy ? "Generišem PDF…" : (datenblatt.buttonLabel ?? "📥 Preuzmi Datenblatt PDF")}
            </button>
            {datenblatt && originalPdfUrl && (
              <div style={{ marginTop: 10, fontSize: 12 }}>
                <a href={originalPdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#4C1D95", textDecoration: "underline", fontWeight: 600 }}>
                  {originalPdfLabel}
                </a>
              </div>
            )}
          </div>
        </>
      )}

      {!datenblatt && (
        <div className="no-print" style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>
            {downloadTitle}
          </div>
          <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>
            {downloadBody}
          </div>
          <button
            onClick={handlePrint}
            style={{ background: "#15803d", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}
          >
            {downloadLabel}
          </button>
          {originalPdfUrl && (
            <div style={{ marginTop: 10, fontSize: 12 }}>
              <a href={originalPdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#065F46", textDecoration: "underline", fontWeight: 600 }}>
                {originalPdfLabel}
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
