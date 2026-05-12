import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import { fillKindergeldPdf, downloadBlob } from "@/lib/pdf-fill-kindergeld";
import type { KindergeldFormData, Geschlecht, Familienstand } from "@/lib/kindergeld-fields";

const LS_KEY = "kg1-muster-data";
const PDF_URL = "/muster/kg1-antrag-kindergeld-2026.pdf";

const initial = () => ({
  steuerId1: "", familienname: "", titel: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geschlecht: "", staatsangehoerigkeit: "", strasse: "", plz: "", wohnort: "", staat: "Deutschland", familienstand: "", familienstandSeit: "",
  steuerId2: "", eFamilienname: "", eVorname: "", eTitel: "", eGeburtsdatum: "", eStaatsangehoerigkeit: "", eGeschlecht: "", eGeburtsname: "", eAnschrift: "",
  iban: "", bic: "", bank: "", kontoinhaber: "self" as string, khName: "", khVorname: "",
  bFamilienname: "", bVorname: "", bAnschrift: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", familienkasse: "" })),
  ort: "", datum: "",
});

function toPdfData(f: ReturnType<typeof initial>): KindergeldFormData {
  const anschrift = [f.strasse, [f.plz, f.wohnort].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const fs = (f.familienstand || "") as Familienstand;
  return {
    steuerId1: f.steuerId1, titel: f.titel, familienname: f.familienname, vorname: f.vorname,
    geburtsname: f.geburtsname, geburtsdatum: f.geburtsdatum, geburtsort: f.geburtsort,
    geschlecht: (f.geschlecht || "") as Geschlecht,
    staatsangehoerigkeit: f.staatsangehoerigkeit, anschrift,
    familienstand: fs, familienstandSeit: f.familienstandSeit,
    hasPartner: !!(f.eFamilienname || f.eVorname || f.steuerId2),
    steuerId2: f.steuerId2, pTitel: f.eTitel, pFamilienname: f.eFamilienname,
    pVorname: f.eVorname, pGeburtsname: f.eGeburtsname, pGeburtsdatum: f.eGeburtsdatum,
    pStaatsangehoerigkeit: f.eStaatsangehoerigkeit, pGeschlecht: (f.eGeschlecht || "") as Geschlecht,
    pAnschrift: f.eAnschrift,
    iban: f.iban, bic: f.bic, bank: f.bank,
    kontoinhaber: (f.kontoinhaber === "other" ? "other" : "self"),
    khName: [f.khName, f.khVorname].filter(Boolean).join(", "),
    hasOther: !!(f.bFamilienname || f.bVorname || f.bAnschrift),
    bName: f.bFamilienname, bVorname: f.bVorname, bAnschrift: f.bAnschrift,
    kinder: f.kinder.map(k => ({
      vorname: k.vorname, geburtsdatum: k.geburtsdatum,
      geschlecht: k.geschlecht === "m" ? "männlich" : k.geschlecht === "w" ? "weiblich" : k.geschlecht === "d" ? "divers" : "",
      familienkasse: k.familienkasse,
    })),
    ort: f.ort, datum: f.datum,
  };
}

const fsList = [
  { value: "ledig", label: "ledig" },
  { value: "verheiratet", label: "verheiratet" },
  { value: "lebenspartnerschaft", label: "in eingetragener Lebenspartnerschaft lebend" },
  { value: "geschieden", label: "geschieden" },
  { value: "verwitwet", label: "verwitwet" },
  { value: "getrennt", label: "dauernd getrennt lebend" },
];

export default function KindergeldMuster() {
  const { t } = useTranslation("forms");
  const [f, setF] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {}
    return initial();
  });
  const [generating, setGenerating] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const set = useCallback((key: string, val: string) => setF(p => ({ ...p, [key]: val })), []);
  const setKind = useCallback((i: number, key: string, val: string) => setF(p => {
    const k = [...p.kinder]; k[i] = { ...k[i], [key]: val }; return { ...p, kinder: k };
  }), []);

  const handleAutoFill = async () => {
    setPdfError(null); setGenerating(true);
    try {
      const blob = await fillKindergeldPdf(toPdfData(f));
      const fname = `Kindergeld-KG1-${f.familienname || "antrag"}.pdf`.replace(/\s+/g, "_");
      downloadBlob(blob, fname);
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : String(e));
    } finally { setGenerating(false); }
  };

  return (
    <>
    <MusterFormBase
      rootId="kg1-root"
      title="Antrag auf Kindergeld"
      subtitle={t("musterFlow.kindergeld.subtitle", "Musterformular KG 1 — BalkanLink — nur zur Orientierung")}
      pdfUrl={PDF_URL}
      pdfLabel={t("musterFlow.kindergeld.originalLink", "Preuzmi prazan originalni KG1 PDF →")}
      footerNote={t("musterFlow.kindergeld.footerNote", "Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei Familienkasse einreichen • BalkanLink ist keine staatliche Stelle")}
      lsKey={LS_KEY}
      formularId="kindergeld"
      data={f}
      onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))}
      onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}
    >
      {/* AUTO-FILL PDF + 3-koraka dostave */}
      <div style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>
          ✅ {t("musterFlow.kindergeld.autofillTitle", "Popuni online → preuzmi 1:1 originalni Familienkasse PDF")}
        </div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>
          {t("musterFlow.kindergeld.autofillBody", "Tvoji podaci se popunjavaju u zvanični KG1 PDF lokalno u tvom browseru — ništa ne ide na server. Preuzmi, potpiši i pošalji nadležnoj Familienkasse.")}
        </div>
        <button
          onClick={handleAutoFill}
          disabled={generating}
          style={{ background: generating ? "#9CA3AF" : "#15803d", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: generating ? "wait" : "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}
        >
          {generating ? t("musterFlow.kindergeld.generating", "Generiram PDF…") : `📄 ${t("musterFlow.kindergeld.downloadFilled", "Preuzmi popunjeni KG1 PDF")}`}
        </button>
        {pdfError && <div style={{ marginTop: 8, color: "#DC2626", fontSize: 12 }}>⚠ {pdfError}</div>}
      </div>

      <div style={{ marginBottom: 18, padding: 14, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, fontSize: 12, color: "#1E3A8A", lineHeight: 1.55 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>📬 {t("musterFlow.kindergeld.delivery.title", "3 načina dostave zahtjeva")}</div>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          <li><strong>{t("musterFlow.kindergeld.delivery.online", "Online (BundID)")}</strong> — <a href="https://www.familienkasse.de" target="_blank" rel="noopener noreferrer" style={{ color: "#1E40AF", textDecoration: "underline" }}>familienkasse.de</a> — bez ispisa i potpisa.</li>
          <li><strong>{t("musterFlow.kindergeld.delivery.pdf", "Popunjeni PDF")}</strong> — preuzmi gore, ispiši, potpiši, pošalji poštom.</li>
          <li><strong>{t("musterFlow.kindergeld.delivery.post", "Pošta / lično")}</strong> — nadležna Familienkasse: <a href="https://www.arbeitsagentur.de/familienkasse-finden" target="_blank" rel="noopener noreferrer" style={{ color: "#1E40AF", textDecoration: "underline" }}>familienkasse-finden →</a></li>
        </ol>
      </div>

      {/* HEADER right side */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <div style={{ textAlign: "right" }}>
          <div style={S.lbl}>Kindergeld-Nr.</div>
          <input style={{ ...S.inp, width: 140, background: "#f3f4f6" }} disabled />
        </div>
      </div>

      {/* SEKCIJA 1 */}
      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur antragstellenden Person" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>Steuerliche Identifikationsnummer (zwingend auszufüllen)</div>
          <IdBoxes count={11} value={f.steuerId1} onChange={v => set("steuerId1", v)} />
        </div>
        <div style={S.row}>
          <Field label="Familienname" flex={3} value={f.familienname} onChange={v => set("familienname", v)} />
          <Field label="Titel" flex={1} value={f.titel} onChange={v => set("titel", v)} />
          <Field label="Vorname" flex={3} value={f.vorname} onChange={v => set("vorname", v)} />
          <Field label="Geburtsname" flex={3} value={f.geburtsname} onChange={v => set("geburtsname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} />
          <Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} />
          <div style={{ flex: 1 }}>
            <div style={S.lbl}>Geschlecht</div>
            <select style={{ ...S.inp }} value={f.geschlecht} onChange={e => set("geschlecht", e.target.value)}>
              <option value="">—</option>
              <option value="männlich">männlich</option>
              <option value="weiblich">weiblich</option>
              <option value="divers">divers</option>
            </select>
          </div>
          <Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anschrift (Straße, Hausnummer)" flex={1} value={f.strasse} onChange={v => set("strasse", v)} />
        </div>
        <div style={S.row}>
          <Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} />
          <Field label="Wohnort" flex={1} value={f.wohnort} onChange={v => set("wohnort", v)} />
          <Field label="Staat" width={120} value={f.staat} onChange={v => set("staat", v)} />
        </div>
        <div>
          <div style={S.lbl}>Familienstand</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {fsList.map(fs => (
              <label key={fs.value} style={S.chk}>
                <input type="checkbox" checked={f.familienstand === fs.value} onChange={() => set("familienstand", f.familienstand === fs.value ? "" : fs.value)} />
                <TOpt value={fs.label} />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* SEKCIJA 2 */}
      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zum Ehepartner/Lebenspartner" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>Steuerliche Identifikationsnummer</div>
          <IdBoxes count={11} value={f.steuerId2} onChange={v => set("steuerId2", v)} />
        </div>
        <div style={S.row}>
          <Field label="Familienname" flex={3} value={f.eFamilienname} onChange={v => set("eFamilienname", v)} />
          <Field label="Vorname" flex={3} value={f.eVorname} onChange={v => set("eVorname", v)} />
          <Field label="Titel" flex={1} value={f.eTitel} onChange={v => set("eTitel", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsdatum" type="date" value={f.eGeburtsdatum} onChange={v => set("eGeburtsdatum", v)} />
          <Field label="Staatsangehörigkeit" value={f.eStaatsangehoerigkeit} onChange={v => set("eStaatsangehoerigkeit", v)} />
          <div style={{ flex: 1 }}>
            <div style={S.lbl}>Geschlecht</div>
            <select style={{ ...S.inp }} value={f.eGeschlecht} onChange={e => set("eGeschlecht", e.target.value)}>
              <option value="">—</option>
              <option value="männlich">männlich</option>
              <option value="weiblich">weiblich</option>
              <option value="divers">divers</option>
            </select>
          </div>
          <Field label="Geburtsname" value={f.eGeburtsname} onChange={v => set("eGeburtsname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anschrift" flex={1} value={f.eAnschrift} onChange={v => set("eAnschrift", v)} />
        </div>
      </div>

      {/* SEKCIJA 3 */}
      <div style={S.sec}>
        <SecHeader num={3} title="Angaben zum Zahlungsweg" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>IBAN</div>
          <IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} />
        </div>
        <div style={S.row}>
          <Field label="BIC" flex={1} value={f.bic} onChange={v => set("bic", v)} />
          <Field label="Bank / Finanzinstitut" flex={2} value={f.bank} onChange={v => set("bank", v)} />
        </div>
        <div>
          <div style={S.lbl}>Kontoinhaber/in</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <label style={S.chk}><input type="radio" name="kh" checked={f.kontoinhaber === "self"} onChange={() => set("kontoinhaber", "self")} /> antragstellende Person</label>
            <label style={S.chk}><input type="radio" name="kh" checked={f.kontoinhaber === "other"} onChange={() => set("kontoinhaber", "other")} /> nicht antragstellende Person</label>
            {f.kontoinhaber === "other" && (
              <div style={{ display: "flex", gap: 8, flex: 1 }}>
                <Field label="Familienname" value={f.khName} onChange={v => set("khName", v)} />
                <Field label="Vorname" value={f.khVorname} onChange={v => set("khVorname", v)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEKCIJA 4 */}
      <div style={S.sec}>
        <SecHeader num={4} title="Der Bescheid soll nicht mir, sondern folgender Person zugesandt werden" />
        <div style={S.row}>
          <Field label="Familienname" value={f.bFamilienname} onChange={v => set("bFamilienname", v)} />
          <Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anschrift" flex={1} value={f.bAnschrift} onChange={v => set("bAnschrift", v)} />
        </div>
      </div>

      {/* SEKCIJA 5 */}
      <div style={S.sec}>
        <SecHeader num={5} title="Angaben zu Kindern" />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              {["Vorname des Kindes", "Geburtsdatum", "Geschlecht", "Bei welcher Familienkasse"].map(h => (
                <th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.kinder.map((k, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.vorname} onChange={e => setKind(i, "vorname", e.target.value)} /></td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={k.geburtsdatum} onChange={e => setKind(i, "geburtsdatum", e.target.value)} /></td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                  <select style={{ ...S.inp, border: "none" }} value={k.geschlecht} onChange={e => setKind(i, "geschlecht", e.target.value)}>
                    <option value="">—</option>
                    <option value="m">m</option>
                    <option value="w">w</option>
                    <option value="d">d</option>
                  </select>
                </td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.familienkasse} onChange={e => setKind(i, "familienkasse", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEKCIJA 6 */}
      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind.</p>
        <div style={S.row}>
          <Field label="Ort" value={f.ort} onChange={v => set("ort", v)} />
          <Field label="Datum" type="date" value={f.datum} onChange={v => set("datum", v)} />
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <Signature label="Unterschrift antragstellende Person" />
          <Signature label="Unterschrift Ehepartner/Lebenspartner" />
        </div>
      </div>
    </MusterFormBase>
    <div style={{ maxWidth: 800, margin: "0 auto 60px", padding: "0 16px" }}>
      <KindergeldGuideContent />
    </div>
    </>
  );
}

