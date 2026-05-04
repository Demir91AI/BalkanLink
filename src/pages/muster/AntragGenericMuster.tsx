import { useState, useCallback, type CSSProperties, type ReactNode } from "react";
import MusterFormBase, { IdBoxes, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "kg1-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf";

const initial = () => ({
  beilagenAnzahl: "",
  steuerId1: "", familienname: "", titel: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geschlecht: "", staatsangehoerigkeit: "", anschrift1: "", familienstand: "", seit: "",
  steuerId2: "", eFamilienname: "", eVorname: "", eTitel: "", eGeburtsdatum: "", eStaatsangehoerigkeit: "", eGeschlecht: "", eGeburtsname: "", eAnschrift: "",
  iban: "", bic: "", bank: "", kontoinhaber: "self", khName: "",
  bFamilienname: "", bVorname: "", bAnschrift: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", referenz: "" })),
  kinder2: Array.from({ length: 4 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", empfaenger: "", referenz: "" })),
  ortDatum: "",
});

const fsList = [
  { value: "ledig", label: "ledig" },
  { value: "verheiratet", label: "verheiratet" },
  { value: "lebenspartnerschaft", label: "in eingetragener Lebenspartnerschaft" },
  { value: "geschieden", label: "geschieden" },
  { value: "aufgehoben", label: "aufgehobene Lebenspartnerschaft" },
  { value: "verwitwet", label: "verwitwet" },
  { value: "getrennt", label: "dauernd getrennt lebend" },
];

/* ───────────── PDF-like styles ───────────── */
const C = {
  border: "1px solid #1f2937",
  thin: "1px solid #374151",
  font: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
};

const page: CSSProperties = {
  background: "#fff",
  color: "#111",
  fontFamily: C.font,
  width: "100%",
  maxWidth: 794,        // ~A4 @96dpi
  margin: "0 auto 24px",
  padding: "32px 36px 24px",
  border: "1px solid #d1d5db",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  fontSize: 11,
  lineHeight: 1.25,
  position: "relative",
  boxSizing: "border-box",
};

const titleStyle: CSSProperties = { fontSize: 22, fontWeight: 700, letterSpacing: 0.3, margin: "0 0 4px" };
const introRow: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 18, fontSize: 11, color: "#111", flexWrap: "wrap" };

const secHead: CSSProperties = { display: "flex", alignItems: "stretch", marginTop: 16, marginBottom: 6 };
const secNum: CSSProperties = { background: "#fff", border: C.border, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 };
const secTitle: CSSProperties = { display: "flex", alignItems: "center", marginLeft: 8, fontWeight: 700, fontSize: 13, letterSpacing: 0.2 };

const captionAbove: CSSProperties = { fontSize: 9.5, color: "#374151", margin: "6px 0 4px", lineHeight: 1.2 };

/* Bordered field with label in top-left, input below */
const fieldBox = (extra?: CSSProperties): CSSProperties => ({
  border: C.border,
  borderRadius: 0,
  padding: "3px 6px 4px",
  minHeight: 36,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  background: "#fff",
  boxSizing: "border-box",
  ...(extra ?? {}),
});

const fieldLbl: CSSProperties = { fontSize: 9, color: "#374151", lineHeight: 1.15, marginBottom: 2 };

const inpBare: CSSProperties = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  fontSize: 12,
  fontFamily: C.font,
  color: "#111",
  padding: 0,
  minHeight: 18,
};

const Field = ({
  label, value, onChange, type = "text", flex = 1, minWidth = 90,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; flex?: number; minWidth?: number }) => (
  <div style={{ ...fieldBox(), flex, minWidth }}>
    <div style={fieldLbl}>{label}</div>
    <input style={inpBare} type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const Select = ({ label, value, onChange, options, flex = 1, minWidth = 90 }: { label: string; value: string; onChange: (v: string) => void; options: string[]; flex?: number; minWidth?: number }) => (
  <div style={{ ...fieldBox(), flex, minWidth }}>
    <div style={fieldLbl}>{label}</div>
    <select style={{ ...inpBare, height: 18 }} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Row = ({ children, mb = -1 }: { children: ReactNode; mb?: number }) => (
  <div style={{ display: "flex", gap: 0, marginTop: mb >= 0 ? mb : -1 }}>{children}</div>
);
/* mb -1 makes adjacent boxes share the border (collapsed) — like in the PDF */

const SecHeader = ({ num, title }: { num: number; title: string }) => (
  <div style={secHead}>
    <div style={secNum}>{num}</div>
    <div style={secTitle}>{title}</div>
  </div>
);

const FooterBar = ({ page: p }: { page: string }) => (
  <div style={{ marginTop: 32, paddingTop: 8, borderTop: C.thin, fontSize: 10, fontStyle: "italic", color: "#6b7280", textAlign: "center" }}>
    Musterformular — Seite {p} · Generisano kao primjer (BalkanLink)
  </div>
);

const th: CSSProperties = { border: C.border, background: "#fff", padding: "5px 6px", fontSize: 9.5, color: "#374151", textAlign: "left", fontWeight: 600, lineHeight: 1.2, verticalAlign: "top" };
const td: CSSProperties = { border: C.border, padding: 0, height: 30, verticalAlign: "top" };
const tdInp: CSSProperties = { ...inpBare, padding: "6px 7px", minHeight: 30, fontSize: 12 };

export default function AntragGenericMuster() {
  const [f, setF] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch { /* ignore */ }
    return initial();
  });

  const set = useCallback((key: string, val: string) => setF((p) => ({ ...p, [key]: val })), []);
  const setKind = useCallback((i: number, key: string, val: string) => setF((p) => {
    const k = [...p.kinder]; k[i] = { ...k[i], [key]: val }; return { ...p, kinder: k };
  }), []);
  const setKind2 = useCallback((i: number, key: string, val: string) => setF((p) => {
    const k = [...p.kinder2]; k[i] = { ...k[i], [key]: val }; return { ...p, kinder2: k };
  }), []);

  return (
    <MusterFormBase
      rootId="kg1-root"
      title="Antrag — Musterformular"
      subtitle="KG1-Übungsvorlage BalkanLink — ohne staatliche Kennzeichen"
      pdfUrl={PDF_URL}
      pdfLabel="Preuzmi originalni Kindergeld PDF →"
      footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Stelle einreichen • BalkanLink ist keine staatliche Stelle"
      lsKey={LS_KEY}
      formularId="kg1-muster"
      data={f}
      onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))}
      onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}
    >
      {/* ───────────── PAGE 1 ───────────── */}
      <div style={page}>
        <h1 style={titleStyle}>Antrag — Musterformular</h1>
        <div style={introRow}>
          <span>Bitte für jede Person ein eigenes Blatt ausfüllen.</span>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
            Anzahl der Beilagen:
            <input style={{ ...inpBare, borderBottom: "1px dotted #6b7280", width: 90, fontSize: 12 }} value={f.beilagenAnzahl} onChange={(e) => set("beilagenAnzahl", e.target.value)} />
          </span>
        </div>

        {/* SECTION 1 */}
        <SecHeader num={1} title="Angaben zur antragstellenden Person" />
        <div style={captionAbove}>Persönliche Identifikationsnummer<br />(soweit vergeben, zwingend auszufüllen)</div>
        <div style={{ marginBottom: 10, maxWidth: 360 }}>
          <IdBoxes count={11} value={f.steuerId1} onChange={(v) => set("steuerId1", v)} />
        </div>

        <Row mb={0}>
          <Field label="Familienname" flex={3} value={f.familienname} onChange={(v) => set("familienname", v)} />
          <Field label="Titel" flex={1} minWidth={70} value={f.titel} onChange={(v) => set("titel", v)} />
        </Row>
        <Row>
          <Field label="Vorname" flex={3} value={f.vorname} onChange={(v) => set("vorname", v)} />
          <Field label="ggf. Geburtsname und früherer Familienname" flex={3} value={f.geburtsname} onChange={(v) => set("geburtsname", v)} />
        </Row>
        <Row>
          <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={(v) => set("geburtsdatum", v)} />
          <Field label="Geburtsort" flex={2} value={f.geburtsort} onChange={(v) => set("geburtsort", v)} />
          <Select label="Geschlecht" value={f.geschlecht} onChange={(v) => set("geschlecht", v)} options={["männlich", "weiblich", "divers"]} />
          <Field label="Staatsangehörigkeit" flex={2} value={f.staatsangehoerigkeit} onChange={(v) => set("staatsangehoerigkeit", v)} />
        </Row>
        <Row>
          <Field label="Anschrift (Straße/Platz, Hausnummer, Postleitzahl, Wohnort, Staat)" flex={1} value={f.anschrift1} onChange={(v) => set("anschrift1", v)} />
        </Row>

        {/* Familienstand box */}
        <div style={{ ...fieldBox({ marginTop: -1, padding: "6px 8px 8px" }) }}>
          <div style={{ ...fieldLbl, fontWeight: 700, color: "#111", fontSize: 10, marginBottom: 6 }}>Familienstand</div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,1fr) minmax(160px,1.2fr) minmax(180px,1.6fr) minmax(200px,1.8fr)", gap: 6, alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
              <input type="checkbox" checked={f.familienstand === "ledig"} onChange={() => set("familienstand", f.familienstand === "ledig" ? "" : "ledig")} />
              <TOpt value="ledig" />
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
              <span style={{ color: "#374151" }}>seit:</span>
              <input type="date" value={f.seit} onChange={(e) => set("seit", e.target.value)} style={{ ...inpBare, borderBottom: "1px dotted #6b7280", fontSize: 12, flex: 1, minWidth: 110 }} />
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[{ v: "verheiratet", l: "verheiratet" }, { v: "geschieden", l: "geschieden" }, { v: "verwitwet", l: "verwitwet" }].map((o) => (
                <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                  <input type="checkbox" checked={f.familienstand === o.v} onChange={() => set("familienstand", f.familienstand === o.v ? "" : o.v)} />
                  <TOpt value={o.l} />
                </label>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                { v: "lebenspartnerschaft", l: "in eingetragener Lebenspartnerschaft" },
                { v: "aufgehoben", l: "aufgehobene Lebenspartnerschaft" },
                { v: "getrennt", l: "dauernd getrennt lebend" },
              ].map((o) => (
                <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                  <input type="checkbox" checked={f.familienstand === o.v} onChange={() => set("familienstand", f.familienstand === o.v ? "" : o.v)} />
                  <TOpt value={o.l} />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <SecHeader num={2} title="Angaben zur weiteren Person im gemeinsamen Haushalt" />
        <div style={captionAbove}>Persönliche Identifikationsnummer<br />(soweit vergeben, bitte ausfüllen)</div>
        <div style={{ marginBottom: 10, maxWidth: 360 }}>
          <IdBoxes count={11} value={f.steuerId2} onChange={(v) => set("steuerId2", v)} />
        </div>
        <Row mb={0}>
          <Field label="Familienname" flex={3} value={f.eFamilienname} onChange={(v) => set("eFamilienname", v)} />
          <Field label="Vorname" flex={3} value={f.eVorname} onChange={(v) => set("eVorname", v)} />
          <Field label="Titel" flex={1} minWidth={70} value={f.eTitel} onChange={(v) => set("eTitel", v)} />
        </Row>
        <Row>
          <Field label="Geburtsdatum" type="date" value={f.eGeburtsdatum} onChange={(v) => set("eGeburtsdatum", v)} />
          <Field label="Staatsangehörigkeit" flex={2} value={f.eStaatsangehoerigkeit} onChange={(v) => set("eStaatsangehoerigkeit", v)} />
          <Select label="Geschlecht" value={f.eGeschlecht} onChange={(v) => set("eGeschlecht", v)} options={["männlich", "weiblich", "divers"]} />
          <Field label="ggf. Geburtsname" flex={2} value={f.eGeburtsname} onChange={(v) => set("eGeburtsname", v)} />
        </Row>
        <Row>
          <Field label="Anschrift, falls abweichend (Straße/Platz, Hausnr., PLZ, Wohnort, Staat)" flex={1} value={f.eAnschrift} onChange={(v) => set("eAnschrift", v)} />
        </Row>

        {/* SECTION 3 */}
        <SecHeader num={3} title="Angaben zum Zahlungsweg" />
        <div style={{ ...captionAbove, fontSize: 10, color: "#111", margin: "4px 0" }}>IBAN</div>
        <div style={{ marginBottom: 10 }}>
          <IdBoxes count={22} value={f.iban} onChange={(v) => set("iban", v)} />
        </div>
        <Row mb={0}>
          <Field label="BIC" flex={1} minWidth={120} value={f.bic} onChange={(v) => set("bic", v)} />
          <Field label="Bank, Finanzinstitut (ggf. Zweigstelle)" flex={3} value={f.bank} onChange={(v) => set("bank", v)} />
        </Row>

        <div style={{ marginTop: 10, fontWeight: 700, fontSize: 11 }}>Kontoinhaber(in) ist</div>
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
            <input type="radio" name="antrag-kh" checked={f.kontoinhaber === "self"} onChange={() => set("kontoinhaber", "self")} />
            antragstellende Person wie unter Nr. 1
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
            <input type="radio" name="antrag-kh" checked={f.kontoinhaber === "other"} onChange={() => set("kontoinhaber", "other")} />
            andere Person, nämlich:
            <span style={{ flex: 1, borderBottom: "1px dotted #6b7280", marginLeft: 8 }}>
              {f.kontoinhaber === "other" ? (
                <input style={{ ...inpBare, fontSize: 12 }} value={f.khName} onChange={(e) => set("khName", e.target.value)} />
              ) : null}
            </span>
          </label>
        </div>

        <FooterBar page="1/2" />
      </div>

      {/* ───────────── PAGE 2 ───────────── */}
      <div style={page}>
        {/* SECTION 4 */}
        <SecHeader num={4} title="Bescheid soll an folgende Person zugesandt werden (z. B. Berater, Anwalt)" />
        <Row mb={0}>
          <Field label="Familienname" flex={1} value={f.bFamilienname} onChange={(v) => set("bFamilienname", v)} />
          <Field label="Vorname" flex={1} value={f.bVorname} onChange={(v) => set("bVorname", v)} />
        </Row>
        <Row>
          <Field label="Anschrift, falls abweichend (Straße/Platz, Hausnr., PLZ, Wohnort, Staat)" flex={1} value={f.bAnschrift} onChange={(v) => set("bAnschrift", v)} />
        </Row>

        {/* SECTION 5 */}
        <SecHeader num={5} title="Angaben zu Kindern" />
        <p style={{ margin: "2px 0", fontSize: 10.5 }}>Für jedes Kind ist eine separate Anlage einzureichen.</p>
        <p style={{ margin: "2px 0", fontSize: 10.5 }}><b>Für folgende Kinder bestehen bereits Leistungen</b><br />(auch in Fällen abweichender Kontoverbindung, Abzweigung und Erstattung):</p>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
          <thead>
            <tr>
              <th style={{ ...th, width: "32%" }}>Vorname des Kindes<br />ggf. abweichender Familienname</th>
              <th style={{ ...th, width: "18%" }}>Geburtsdatum</th>
              <th style={{ ...th, width: "16%" }}>Geschlecht</th>
              <th style={{ ...th, width: "34%" }}>Bei welcher Stelle (Referenznummer)?</th>
            </tr>
          </thead>
          <tbody>
            {f.kinder.map((k, i) => (
              <tr key={i}>
                <td style={td}><input style={tdInp} value={k.vorname} onChange={(e) => setKind(i, "vorname", e.target.value)} /></td>
                <td style={td}><input style={tdInp} type="date" value={k.geburtsdatum} onChange={(e) => setKind(i, "geburtsdatum", e.target.value)} /></td>
                <td style={td}>
                  <select style={tdInp} value={k.geschlecht} onChange={(e) => setKind(i, "geschlecht", e.target.value)}>
                    <option value="">—</option><option value="m">m</option><option value="w">w</option><option value="d">d</option>
                  </select>
                </td>
                <td style={td}><input style={tdInp} value={k.referenz} onChange={(e) => setKind(i, "referenz", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SECTION 6 */}
        <SecHeader num={6} title="Weitere eigene Kinder, für die eine andere Person Leistungen erhält" />
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
          <thead>
            <tr>
              <th style={{ ...th, width: "26%" }}>Vorname des Kindes<br />ggf. abweichender Familienname</th>
              <th style={{ ...th, width: "16%" }}>Geburtsdatum</th>
              <th style={{ ...th, width: "12%" }}>Geschlecht</th>
              <th style={{ ...th, width: "23%" }}>Wer erhält Leistungen<br />(Familienname, Vorname)?</th>
              <th style={{ ...th, width: "23%" }}>Bei welcher Stelle<br />(Referenznummer)?</th>
            </tr>
          </thead>
          <tbody>
            {f.kinder2.map((k, i) => (
              <tr key={i}>
                <td style={td}><input style={tdInp} value={k.vorname} onChange={(e) => setKind2(i, "vorname", e.target.value)} /></td>
                <td style={td}><input style={tdInp} type="date" value={k.geburtsdatum} onChange={(e) => setKind2(i, "geburtsdatum", e.target.value)} /></td>
                <td style={td}>
                  <select style={tdInp} value={k.geschlecht} onChange={(e) => setKind2(i, "geschlecht", e.target.value)}>
                    <option value="">—</option><option value="m">m</option><option value="w">w</option><option value="d">d</option>
                  </select>
                </td>
                <td style={td}><input style={tdInp} value={k.empfaenger} onChange={(e) => setKind2(i, "empfaenger", e.target.value)} /></td>
                <td style={td}><input style={tdInp} value={k.referenz} onChange={(e) => setKind2(i, "referenz", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signature row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 36 }}>
          <div>
            <input style={{ ...inpBare, borderBottom: "1px solid #111", fontSize: 12, padding: "4px 0" }} value={f.ortDatum} onChange={(e) => set("ortDatum", e.target.value)} />
            <div style={{ fontSize: 10, color: "#374151", marginTop: 2 }}>Ort, Datum</div>
          </div>
          <div>
            <div style={{ borderBottom: "1px solid #111", height: 22 }} />
            <div style={{ fontSize: 10, color: "#374151", marginTop: 2 }}>Unterschrift der antragstellenden Person</div>
          </div>
        </div>

        <FooterBar page="2/2" />
      </div>
    </MusterFormBase>
  );
}
