import PageNavBar from "@/components/navigation/PageNavBar";
import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import FieldTooltip from "@/components/muster/FieldTooltip";
import FormularLock from "@/components/paywall/FormularLock";
import { useSubscription } from "@/hooks/useSubscription";
import AuthGate from "@/components/AuthGate";
import { isFormFree } from "@/lib/form-catalog";

export const S = {
  page: { minHeight: "100vh", background: "#F5F0E8", fontFamily: "Arial, sans-serif", fontSize: 11, color: "#111" } as React.CSSProperties,
  nav: { background: "#FFFFFF", borderBottom: "1px solid #F0EAD8", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" } as React.CSSProperties,
  navBtn: { background: "transparent", border: "none", cursor: "pointer", color: "#6B6B6B", fontSize: 13, fontWeight: 500 } as React.CSSProperties,
  disc: { background: "hsl(48,96%,89%)", border: "2px solid #EAB308", borderRadius: 6, padding: 12, margin: "12px auto", maxWidth: 794 } as React.CSSProperties,
  paper: { maxWidth: 794, margin: "0 auto 40px", background: "#fff", padding: "clamp(16px, 4vw, 40px)", boxShadow: "0 0 30px rgba(0,0,0,0.5)", color: "#111" } as React.CSSProperties,
  secHead: { background: "#e5e7eb", padding: "5px 8px", display: "flex", alignItems: "center", gap: 8, marginBottom: 8, textTransform: "uppercase" as const, fontWeight: 700, fontSize: 11, letterSpacing: 0.5 },
  secNum: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, border: "2px solid #374151", fontWeight: 700, fontSize: 12 } as React.CSSProperties,
  sec: { border: "1px solid #d1d5db", padding: 10, marginBottom: 14 } as React.CSSProperties,
  row: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" as const } as React.CSSProperties,
  lbl: { fontSize: 9, color: "#6b7280", marginBottom: 2 } as React.CSSProperties,
  inp: { border: "1px solid #9ca3af", background: "#fff", fontSize: 11, padding: "2px 4px", outline: "none", width: "100%", boxSizing: "border-box" as const } as React.CSSProperties,
  idBox: { width: 24, height: 28, border: "1px solid #374151", textAlign: "center" as const, fontSize: 14, fontWeight: 600, padding: 0, outline: "none", background: "#fff" } as React.CSSProperties,
  ibanBox: { width: 18, height: 26, border: "1px solid #374151", textAlign: "center" as const, fontSize: 12, fontWeight: 600, padding: 0, outline: "none", background: "#fff" } as React.CSSProperties,
  chk: { display: "flex", alignItems: "center", gap: 4, fontSize: 10, cursor: "pointer", marginRight: 10 } as React.CSSProperties,
  footer: { fontSize: 8, color: "#6b7280", textAlign: "center" as const, borderTop: "1px solid #d1d5db", paddingTop: 8, marginTop: 16 },
  sigLine: { borderBottom: "1px solid #374151", height: 50, marginBottom: 4 } as React.CSSProperties,
};

export const Field = ({ label, flex, width, type, value, onChange, disabled }: { label: string; flex?: number; width?: string | number; type?: string; value?: string; onChange?: (v: string) => void; disabled?: boolean }) => (
  <div style={{ flex: flex ?? 1, minWidth: width ?? 0 }}>
    <div style={S.lbl} className="flex items-center">
      {label}
      <FieldTooltip label={label} />
    </div>
    <input style={{ ...S.inp, width: width ?? "100%" }} type={type ?? "text"} value={value ?? ""} onChange={e => onChange?.(e.target.value)} disabled={disabled} />
  </div>
);

export const IdBoxes = ({ count, value, onChange }: { count: number; value: string; onChange: (v: string) => void }) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = value.padEnd(count, "").split("").slice(0, count);
  const handleKey = useCallback((i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) refs.current[i - 1]?.focus();
  }, [chars]);
  const handleChange = useCallback((i: number, v: string) => {
    const c = v.slice(-1).toUpperCase();
    const arr = [...chars]; arr[i] = c;
    onChange(arr.join("").trimEnd());
    if (c && i < count - 1) refs.current[i + 1]?.focus();
  }, [chars, count, onChange]);
  return (
    <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {Array.from({ length: count }).map((_, i) => (
        <input key={i} ref={el => { refs.current[i] = el; }} style={count > 15 ? S.ibanBox : S.idBox} maxLength={2} value={chars[i]?.trim() ?? ""} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)} />
      ))}
    </div>
  );
};

export const SecHeader = ({ num, title }: { num: number; title: string }) => (
  <div style={S.secHead}><span style={S.secNum}>{num}</span>{title}</div>
);

export const Signature = ({ label }: { label: string }) => (
  <div style={{ flex: 1 }}>
    <div style={S.sigLine} />
    <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>{label}</div>
  </div>
);

interface MusterFormBaseProps {
  rootId: string;
  title: string;
  subtitle: string;
  pdfUrl: string;
  pdfLabel: string;
  footerNote: string;
  lsKey: string;
  formularId?: string;
  data: Record<string, any>;
  onSave: () => void;
  onReset: () => void;
  children: ReactNode;
}

type AutosaveStatus = "idle" | "saving" | "saved";

export default function MusterFormBase({ rootId, title, subtitle, pdfUrl, pdfLabel, footerNote, lsKey, formularId, data, onSave, onReset, children }: MusterFormBaseProps) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [autoStatus, setAutoStatus] = useState<AutosaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const isFirstRun = useRef(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSaveRef = useRef(onSave);
  const { hasSingleAccess, isPremium } = useSubscription();
  const fId = formularId || lsKey;
  const isFree = isFormFree(fId);
  const locked = !isFree && !isPremium && !hasSingleAccess(fId);

  // Keep latest onSave reference without retriggering autosave
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  // Debounced autosave on every data change (skip first render)
  useEffect(() => {
    if (locked) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setAutoStatus("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        onSaveRef.current();
        setLastSavedAt(new Date());
        setAutoStatus("saved");
      } catch {
        setAutoStatus("idle");
      }
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [data, locked]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setLastSavedAt(new Date());
    setAutoStatus("saved");
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  const handleResetClick = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    setConfirmReset(false);
    onReset();
    setLastSavedAt(new Date());
    setAutoStatus("saved");
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit" });

  const statusLabel =
    autoStatus === "saving"
      ? "💾 Spremanje…"
      : autoStatus === "saved" && lastSavedAt
        ? `✅ Automatski spremljeno u ${formatTime(lastSavedAt)}`
        : "Promjene se automatski spremaju u ovaj uređaj";
  const statusColor = autoStatus === "saving" ? "#92400e" : autoStatus === "saved" ? "#15803d" : "#6b7280";

  return (
    <div id={rootId} style={S.page}>
      <div style={{ background: '#F5F0E8', borderBottom: '1px solid #F0EAD8' }} className="flex items-center gap-4 px-4 md:px-8 py-2.5 overflow-x-auto whitespace-nowrap">
        <div style={{ display: 'contents' }}><PageNavBar inline /></div>
        <span style={{ color: '#E8D9B0', margin: '0 4px' }}>|</span>
        <span style={{ fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }} onClick={() => navigate('/formulari')}>Formulari</span>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>›</span>
        <span style={{ fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }} onClick={() => navigate('/formulari')}>Musterformulari</span>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>›</span>
        <span style={{ fontSize: 12, color: '#2D2D2D', fontWeight: 500 }}>{title}</span>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={S.disc}>
          <p style={{ fontWeight: 700, color: "#92400e", fontSize: 12, margin: 0 }}>
            ⚠️ Musterformular — nur zur Orientierung. BalkanLink ist eine edukative Plattform. Kein offizielles Dokument.
          </p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontSize: 12 }}>
            🔗 {pdfLabel}
          </a>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div id={`${rootId}-paper`} style={S.paper}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{title}</div>
              <div style={{ fontSize: 9, color: "#6b7280" }}>{subtitle}</div>
            </div>
          </div>

          <AuthGate>
            <FormularLock locked={locked} formularId={fId}>
              {children}
            </FormularLock>
          </AuthGate>

          <div style={S.footer}>
            {footerNote}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px 40px", maxWidth: 794, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          aria-live="polite"
          style={{
            textAlign: "center",
            fontSize: 12,
            fontWeight: 600,
            color: statusColor,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "8px 12px",
          }}
        >
          {statusLabel}
        </div>
        <button onClick={handleSave} style={{ display: "block", background: "#EAB308", color: "#111", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
          💾 Sačuvaj odmah
        </button>
        {saved && <div style={{ textAlign: "center", color: "#22c55e", fontWeight: 600, fontSize: 14 }}>✅ Podaci sačuvani!</div>}
        <button
          onClick={handleResetClick}
          style={{
            display: "block",
            background: confirmReset ? "#FEE2E2" : "transparent",
            color: confirmReset ? "#991B1B" : "#6b7280",
            border: `2px solid ${confirmReset ? "#DC2626" : "#9CA3AF"}`,
            padding: "12px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {confirmReset ? "⚠️ Klikni ponovo za potvrdu — vraća primjer i briše tvoje izmjene" : "🔄 Vrati primjer (reset)"}
        </button>
        <p style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", margin: 0 }}>
          Tvoji unosi se čuvaju lokalno na ovom uređaju i pretraživaču. Brisanjem cookies/podataka pretraživača nestaju.
        </p>
      </div>
    </div>
  );
}
