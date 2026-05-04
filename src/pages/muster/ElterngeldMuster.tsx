import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import MusterFormBase from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import { initialData, type ElterngeldFormData } from "@/lib/elterngeld-bayern-fields";
import { fillElterngeldPdf, downloadBlob } from "@/lib/pdf-fill-elterngeld";
import { ZBFS_AUSSENSTELLEN, ZBFS_ZUSTAENDIGKEIT_URL, getAussenstelle } from "@/lib/elterngeld-bayern-versand";

const LS_KEY = "elterngeld-bayern-wizard-v1";
const ORIGINAL_INFO = "https://www.zbfs.bayern.de/familienleistungen/elterngeld/";

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4, display: "block" };
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px", fontSize: 14,
  border: "1px solid #D1D5DB", borderRadius: 6, background: "#fff", color: "#111",
};
const rowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 };
const sectionStyle: React.CSSProperties = { background: "#F9FAFB", padding: 16, borderRadius: 8, marginBottom: 16, border: "1px solid #E5E7EB" };
const h3: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #EAB308" };
const hintStyle: React.CSSProperties = { fontSize: 11, color: "#6B7280", marginTop: 2, fontStyle: "italic" };

function Field({
  label, hint, value, onChange, type = "text", placeholder,
}: { label: string; hint?: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
      {hint && <div style={hintStyle}>{hint}</div>}
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select style={inputStyle} value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function ElterngeldMuster() {
  const { t } = useTranslation("forms");

  const [data, setData] = useState<ElterngeldFormData>(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initialData(), ...JSON.parse(s) }; } catch { /* ignore */ }
    return initialData();
  });
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback((patch: Partial<ElterngeldFormData>) => {
    setData(prev => {
      const next = { ...prev, ...patch };
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const handleDownload = async () => {
    setError(null);
    setGenerating(true);
    try {
      const blob = await fillElterngeldPdf(data);
      const fname = `Elterngeld-Bayern-${data.e1_nachname || "antrag"}.pdf`.replace(/\s+/g, "_");
      downloadBlob(blob, fname);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setGenerating(false);
    }
  };

  const reset = () => {
    if (!confirm(t("musterFlow.elterngeld.confirmReset"))) return;
    setData(initialData());
    try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
  };

  return (
    <MusterFormBase
      rootId="elterngeld-bayern"
      title="Elterngeld Bayern — Antragsassistent"
      subtitle={t("musterFlow.elterngeld.subtitle")}
      pdfUrl="/muster/elterngeld-bayern-2025.pdf"
      pdfLabel={t("musterFlow.elterngeld.originalLink")}
      footerNote={t("musterFlow.elterngeld.footerNote")}
      lsKey={LS_KEY}
      formularId="elterngeld-bayern"
      data={data}
      onSave={() => { /* auto-saved via update() */ }}
      onReset={reset}
    >
      <MusterDisclaimer formKey="elterngeld-bayern"><></></MusterDisclaimer>

      <div style={{ marginBottom: 16, padding: 14, background: "#FEF3C7", border: "2px solid #EAB308", borderRadius: 8, fontSize: 13, color: "#78350F", lineHeight: 1.5 }}>
        <strong>{t("musterFlow.elterngeld.officialBadgeTitle")}</strong><br />
        {t("musterFlow.elterngeld.officialBadgeBody")}{" "}
        <a href={ORIGINAL_INFO} target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontWeight: 600 }}>
          ZBFS Bayern →
        </a>
      </div>

      {/* Sekcija 1 — Kind */}
      <div style={sectionStyle}>
        <h3 style={h3}>1. {t("musterFlow.elterngeld.s1.title")}</h3>
        <div style={{ marginBottom: 10 }}>
          <Field
            label={t("musterFlow.elterngeld.s1.kindName")}
            hint={t("musterFlow.elterngeld.s1.kindNameHint")}
            value={data.kind_nachname_vorname}
            onChange={v => update({ kind_nachname_vorname: v })}
          />
        </div>
        <div style={rowStyle}>
          <Field
            label={t("musterFlow.elterngeld.s1.kindGeb")}
            hint={t("musterFlow.elterngeld.s1.kindGebHint")}
            value={data.kind_geburtsdatum_ort}
            onChange={v => update({ kind_geburtsdatum_ort: v })}
          />
          <Field
            label={t("musterFlow.elterngeld.s1.entbindung")}
            hint={t("musterFlow.elterngeld.s1.entbindungHint")}
            type="date"
            value={data.kind_voraussichtl_entbindung}
            onChange={v => update({ kind_voraussichtl_entbindung: v })}
          />
        </div>
      </div>

      {/* Sekcija 2A — Elternteil 1 */}
      <div style={sectionStyle}>
        <h3 style={h3}>2. {t("musterFlow.elterngeld.s2.title1")}</h3>
        <div style={rowStyle}>
          <Field label={t("musterFlow.elterngeld.s2.nachname")} value={data.e1_nachname} onChange={v => update({ e1_nachname: v })} />
          <Field label={t("musterFlow.elterngeld.s2.vorname")} value={data.e1_vorname} onChange={v => update({ e1_vorname: v })} />
        </div>
        <div style={rowStyle}>
          <Field label={t("musterFlow.elterngeld.s2.geburtsname")} value={data.e1_geburtsname} onChange={v => update({ e1_geburtsname: v })} />
          <Field label={t("musterFlow.elterngeld.s2.geburtsdatum")} type="date" value={data.e1_geburtsdatum} onChange={v => update({ e1_geburtsdatum: v })} />
        </div>
        <div style={rowStyle}>
          <Select label={t("musterFlow.elterngeld.s2.geschlecht")} value={data.e1_geschlecht} onChange={v => update({ e1_geschlecht: v as ElterngeldFormData["e1_geschlecht"] })}
            options={[
              { value: "w", label: t("musterFlow.elterngeld.s2.gw") },
              { value: "m", label: t("musterFlow.elterngeld.s2.gm") },
              { value: "d", label: t("musterFlow.elterngeld.s2.gd") },
              { value: "o", label: t("musterFlow.elterngeld.s2.go") },
            ]} />
          <Field label={t("musterFlow.elterngeld.s2.beruf")} value={data.e1_beruf} onChange={v => update({ e1_beruf: v })} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Field label={t("musterFlow.elterngeld.s2.strasse")} value={data.e1_strasse} onChange={v => update({ e1_strasse: v })} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Field label={t("musterFlow.elterngeld.s2.plzOrt")} placeholder="80331 München" value={data.e1_plz_ort} onChange={v => update({ e1_plz_ort: v })} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Field
            label={t("musterFlow.elterngeld.s2.steuerId")}
            hint={t("musterFlow.elterngeld.s2.steuerIdHint")}
            placeholder="11 Ziffern"
            value={data.e1_steuer_id}
            onChange={v => update({ e1_steuer_id: v })}
          />
        </div>
        <div style={rowStyle}>
          <Field label={t("musterFlow.elterngeld.s2.telefon")} value={data.e1_telefon} onChange={v => update({ e1_telefon: v })} />
          <Field label={t("musterFlow.elterngeld.s2.email")} type="email" value={data.e1_email} onChange={v => update({ e1_email: v })} />
        </div>
        <div style={rowStyle}>
          <Select label={t("musterFlow.elterngeld.s2.familienstand")} value={data.e1_familienstand} onChange={v => update({ e1_familienstand: v as ElterngeldFormData["e1_familienstand"] })}
            options={[
              { value: "verheiratet", label: t("musterFlow.elterngeld.s2.fsVerheiratet") },
              { value: "ledig", label: t("musterFlow.elterngeld.s2.fsLedig") },
              { value: "unverheiratet", label: t("musterFlow.elterngeld.s2.fsUnverheiratet") },
              { value: "allein", label: t("musterFlow.elterngeld.s2.fsAllein") },
            ]} />
          {data.e1_familienstand === "verheiratet" && (
            <Field label={t("musterFlow.elterngeld.s2.fsSeit")} type="date" value={data.e1_familienstand_seit} onChange={v => update({ e1_familienstand_seit: v })} />
          )}
        </div>
        <div style={rowStyle}>
          <Field label={t("musterFlow.elterngeld.s2.kinderHaushalt")} value={data.e1_kinder_haushalt} onChange={v => update({ e1_kinder_haushalt: v })} />
          <Select label={t("musterFlow.elterngeld.s2.staat")} value={data.e1_staat} onChange={v => update({ e1_staat: v as ElterngeldFormData["e1_staat"] })}
            options={[
              { value: "deutsch", label: t("musterFlow.elterngeld.s2.staatDe") },
              { value: "eu", label: t("musterFlow.elterngeld.s2.staatEu") },
              { value: "andere", label: t("musterFlow.elterngeld.s2.staatAndere") },
            ]} />
        </div>
        {data.e1_staat !== "deutsch" && (
          <div style={{ marginBottom: 10 }}>
            <Field label={t("musterFlow.elterngeld.s2.staatLand")} value={data.e1_staat_land} onChange={v => update({ e1_staat_land: v })} />
          </div>
        )}
      </div>

      {/* Sekcija 2B — Elternteil 2 */}
      <div style={sectionStyle}>
        <h3 style={h3}>2b. {t("musterFlow.elterngeld.s2b.title")}</h3>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13 }}>
          <input type="checkbox" checked={data.e2_aktiv} onChange={e => update({ e2_aktiv: e.target.checked })} />
          {t("musterFlow.elterngeld.s2b.hasPartner")}
        </label>
        {data.e2_aktiv && (
          <>
            <div style={rowStyle}>
              <Field label={t("musterFlow.elterngeld.s2.nachname")} value={data.e2_nachname} onChange={v => update({ e2_nachname: v })} />
              <Field label={t("musterFlow.elterngeld.s2.vorname")} value={data.e2_vorname} onChange={v => update({ e2_vorname: v })} />
            </div>
            <div style={rowStyle}>
              <Field label={t("musterFlow.elterngeld.s2.geburtsdatum")} type="date" value={data.e2_geburtsdatum} onChange={v => update({ e2_geburtsdatum: v })} />
              <Select label={t("musterFlow.elterngeld.s2.geschlecht")} value={data.e2_geschlecht} onChange={v => update({ e2_geschlecht: v as ElterngeldFormData["e2_geschlecht"] })}
                options={[
                  { value: "w", label: t("musterFlow.elterngeld.s2.gw") },
                  { value: "m", label: t("musterFlow.elterngeld.s2.gm") },
                  { value: "d", label: t("musterFlow.elterngeld.s2.gd") },
                  { value: "o", label: t("musterFlow.elterngeld.s2.go") },
                ]} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <Field label={t("musterFlow.elterngeld.s2.strasse")} value={data.e2_strasse} onChange={v => update({ e2_strasse: v })} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <Field label={t("musterFlow.elterngeld.s2.plzOrt")} value={data.e2_plz_ort} onChange={v => update({ e2_plz_ort: v })} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <Field label={t("musterFlow.elterngeld.s2.steuerId")} placeholder="11 Ziffern" value={data.e2_steuer_id} onChange={v => update({ e2_steuer_id: v })} />
            </div>
            <div style={rowStyle}>
              <Field label={t("musterFlow.elterngeld.s2.telefon")} value={data.e2_telefon} onChange={v => update({ e2_telefon: v })} />
              <Field label={t("musterFlow.elterngeld.s2.email")} type="email" value={data.e2_email} onChange={v => update({ e2_email: v })} />
            </div>
            <div style={rowStyle}>
              <Select label={t("musterFlow.elterngeld.s2.staat")} value={data.e2_staat} onChange={v => update({ e2_staat: v as ElterngeldFormData["e2_staat"] })}
                options={[
                  { value: "deutsch", label: t("musterFlow.elterngeld.s2.staatDe") },
                  { value: "eu", label: t("musterFlow.elterngeld.s2.staatEu") },
                  { value: "andere", label: t("musterFlow.elterngeld.s2.staatAndere") },
                ]} />
              {data.e2_staat !== "deutsch" && (
                <Field label={t("musterFlow.elterngeld.s2.staatLand")} value={data.e2_staat_land} onChange={v => update({ e2_staat_land: v })} />
              )}
            </div>
          </>
        )}
      </div>

      {/* Sekcija 5 — Varijanta */}
      <div style={sectionStyle}>
        <h3 style={h3}>5. {t("musterFlow.elterngeld.s5.title")}</h3>
        <div style={{ marginBottom: 10, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
          {t("musterFlow.elterngeld.s5.help")}
        </div>
        <div style={rowStyle}>
          <Select label={t("musterFlow.elterngeld.s5.e1Variante")} value={data.e1_variante} onChange={v => update({ e1_variante: v as ElterngeldFormData["e1_variante"] })}
            options={[
              { value: "basis", label: t("musterFlow.elterngeld.s5.vBasis") },
              { value: "egplus", label: t("musterFlow.elterngeld.s5.vPlus") },
              { value: "kombi", label: t("musterFlow.elterngeld.s5.vKombi") },
            ]} />
          <div />
        </div>
        <div style={rowStyle}>
          <Field label={t("musterFlow.elterngeld.s5.lmVon")} value={data.e1_lm_von} onChange={v => update({ e1_lm_von: v })} />
          <Field label={t("musterFlow.elterngeld.s5.lmBis")} value={data.e1_lm_bis} onChange={v => update({ e1_lm_bis: v })} />
        </div>
        {data.e2_aktiv && (
          <>
            <div style={{ height: 1, background: "#E5E7EB", margin: "12px 0" }} />
            <div style={rowStyle}>
              <Select label={t("musterFlow.elterngeld.s5.e2Variante")} value={data.e2_variante} onChange={v => update({ e2_variante: v as ElterngeldFormData["e2_variante"] })}
                options={[
                  { value: "none", label: t("musterFlow.elterngeld.s5.vNone") },
                  { value: "basis", label: t("musterFlow.elterngeld.s5.vBasis") },
                  { value: "egplus", label: t("musterFlow.elterngeld.s5.vPlus") },
                  { value: "kombi", label: t("musterFlow.elterngeld.s5.vKombi") },
                ]} />
              <div />
            </div>
            {data.e2_variante !== "none" && (
              <div style={rowStyle}>
                <Field label={t("musterFlow.elterngeld.s5.lmVon")} value={data.e2_lm_von} onChange={v => update({ e2_lm_von: v })} />
                <Field label={t("musterFlow.elterngeld.s5.lmBis")} value={data.e2_lm_bis} onChange={v => update({ e2_lm_bis: v })} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Sekcija 15 — Bank */}
      <div style={sectionStyle}>
        <h3 style={h3}>15. {t("musterFlow.elterngeld.s15.title")}</h3>
        <div style={{ marginBottom: 10 }}>
          <Field label="IBAN" placeholder="DE12 3456 …" value={data.iban} onChange={v => update({ iban: v })} />
        </div>
        <div style={rowStyle}>
          <Field label="BIC" value={data.bic} onChange={v => update({ bic: v })} />
          <Field label={t("musterFlow.elterngeld.s15.bank")} value={data.geldinstitut} onChange={v => update({ geldinstitut: v })} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Field
            label={t("musterFlow.elterngeld.s15.kontoinhaber")}
            hint={t("musterFlow.elterngeld.s15.kontoinhaberHint")}
            value={data.kontoinhaber}
            onChange={v => update({ kontoinhaber: v })}
          />
        </div>
      </div>

      {/* Potpis */}
      <div style={sectionStyle}>
        <h3 style={h3}>17. {t("musterFlow.elterngeld.sig.title")}</h3>
        <div style={rowStyle}>
          <Field label={t("musterFlow.elterngeld.sig.ort")} value={data.ort} onChange={v => update({ ort: v })} />
          <Field label={t("musterFlow.elterngeld.sig.datum")} type="date" value={data.datum} onChange={v => update({ datum: v })} />
        </div>
        <div style={hintStyle}>{t("musterFlow.elterngeld.sig.hint")}</div>
      </div>

      {/* Akcija */}
      <div style={{ position: "sticky", bottom: 0, background: "#fff", padding: "16px 0", borderTop: "1px solid #E5E7EB", marginTop: 16 }} className="no-print">
        {error && (
          <div style={{ marginBottom: 12, padding: 12, background: "#FEE2E2", border: "1px solid #DC2626", borderRadius: 6, fontSize: 13, color: "#991B1B" }}>
            ⚠️ {error}
          </div>
        )}
        <button
          onClick={handleDownload}
          disabled={generating}
          style={{
            width: "100%", background: generating ? "#9CA3AF" : "#15803D", color: "#fff",
            border: "none", padding: "16px", borderRadius: 8, fontWeight: 700, fontSize: 16,
            cursor: generating ? "wait" : "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.3)",
          }}
        >
          {generating ? t("musterFlow.elterngeld.generating") : t("musterFlow.elterngeld.download")}
        </button>
        <p style={{ fontSize: 11, color: "#6B7280", textAlign: "center", marginTop: 8 }}>
          {t("musterFlow.elterngeld.downloadHint")}
        </p>
      </div>
    </MusterFormBase>
  );
}
