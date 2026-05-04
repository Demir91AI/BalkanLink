import { useState, useCallback, type CSSProperties } from "react";
import MusterFormBase, { S, IdBoxes, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "kg1-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf";

const initial = () => ({
  beilagenAnzahl: "",
  steuerId1: "", familienname: "", titel: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geschlecht: "", staatsangehoerigkeit: "", strasse: "", plz: "", wohnort: "", staat: "Deutschland", familienstand: "", seit: "",
  steuerId2: "", eFamilienname: "", eVorname: "", eTitel: "", eGeburtsdatum: "", eStaatsangehoerigkeit: "", eGeschlecht: "", eGeburtsname: "", eAnschrift: "",
  iban: "", bic: "", bank: "", kontoinhaber: "self" as string, khName: "", khVorname: "",
  bFamilienname: "", bVorname: "", bAnschrift: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", familienkasse: "" })),
  kinder2: Array.from({ length: 4 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", empfaenger: "", referenz: "" })),
  ort: "", datum: "",
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

const compactLabel: CSSProperties = {
  fontSize: 9,
  color: "#4b5563",
  lineHeight: 1.2,
  marginBottom: 3,
  fontWeight: 600,
};

const compactInput: CSSProperties = {
  ...S.inp,
  minHeight: 28,
  borderRadius: 0,
  padding: "5px 7px",
  fontSize: 12,
};

const lineBox: CSSProperties = {
  border: "1px solid #9ca3af",
  padding: 8,
  marginBottom: 8,
};

const row: CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 8,
};

const th: CSSProperties = {
  border: "1px solid #9ca3af",
  padding: "5px 6px",
  background: "#f3f4f6",
  color: "#374151",
  fontSize: 9,
  lineHeight: 1.2,
  textAlign: "left",
  fontWeight: 700,
};

const td: CSSProperties = {
  border: "1px solid #9ca3af",
  padding: 2,
  verticalAlign: "top",
};

const tableInput: CSSProperties = {
  ...compactInput,
  border: "none",
  minHeight: 30,
  padding: "4px 5px",
};

const Section = ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 14, breakInside: "avoid" }}>
    <div style={{ display: "grid", gridTemplateColumns: "30px 1fr", alignItems: "stretch", marginBottom: 8 }}>
      <div style={{ background: "#e5e7eb", border: "1px solid #9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{num}</div>
      <div style={{ border: "1px solid #9ca3af", borderLeft: 0, padding: "6px 8px", fontWeight: 700, fontSize: 13 }}>{title}</div>
    </div>
    {children}
  </section>
);

const CompactField = ({ label, value, onChange, type = "text", flex = 1, width, disabled }: { label: string; value: string; onChange: (v: string) => void; type?: string; flex?: number; width?: number; disabled?: boolean }) => (
  <div style={{ flex, minWidth: width ?? 120 }}>
    <div style={compactLabel}>{label}</div>
    <input style={compactInput} type={type} value={value ?? ""} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const SelectField = ({ label, value, onChange, options, flex = 1 }: { label: string; value: string; onChange: (v: string) => void; options: string[]; flex?: number }) => (
  <div style={{ flex, minWidth: 110 }}>
    <div style={compactLabel}>{label}</div>
    <select style={compactInput} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

const PageFooter = ({ page }: { page: string }) => (
  <div style={{ borderTop: "1px solid #d1d5db", color: "#6b7280", fontSize: 10, margin: "16px 0", paddingTop: 6, textAlign: "center" }}>
    Musterformular — Seite {page} · Generisano kao primjer (BalkanLink)
  </div>
);

export default function AntragGenericMuster() {
  const [f, setF] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {}
    return initial();
  });

  const set = useCallback((key: string, val: string) => setF(p => ({ ...p, [key]: val })), []);
  const setKind = useCallback((i: number, key: string, val: string) => setF(p => {
    const k = [...p.kinder]; k[i] = { ...k[i], [key]: val }; return { ...p, kinder: k };
  }), []);
  const setKind2 = useCallback((i: number, key: string, val: string) => setF(p => {
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
      <div style={{ border: "1px solid #9ca3af", padding: 10, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <p style={{ margin: 0, color: "#374151", fontSize: 11 }}>Bitte für jede Person ein eigenes Blatt ausfüllen.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...compactLabel, margin: 0 }}>Anzahl der Beilagen:</span>
            <input style={{ ...compactInput, width: 72 }} value={f.beilagenAnzahl} onChange={(e) => set("beilagenAnzahl", e.target.value)} />
          </div>
        </div>
      </div>

      <Section num={1} title="Angaben zur antragstellenden Person">
        <div style={lineBox}>
          <div style={compactLabel}>Persönliche Identifikationsnummer (soweit vergeben, zwingend auszufüllen)</div>
          <IdBoxes count={11} value={f.steuerId1} onChange={(v) => set("steuerId1", v)} />
        </div>
        <div style={row}>
          <CompactField label="Familienname" flex={2} value={f.familienname} onChange={(v) => set("familienname", v)} />
          <CompactField label="Titel" width={70} value={f.titel} onChange={(v) => set("titel", v)} />
          <CompactField label="Vorname" flex={2} value={f.vorname} onChange={(v) => set("vorname", v)} />
          <CompactField label="ggf. Geburtsname und früherer Familienname" flex={2} value={f.geburtsname} onChange={(v) => set("geburtsname", v)} />
        </div>
        <div style={row}>
          <CompactField label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={(v) => set("geburtsdatum", v)} />
          <CompactField label="Geburtsort" value={f.geburtsort} onChange={(v) => set("geburtsort", v)} />
          <SelectField label="Geschlecht" value={f.geschlecht} onChange={(v) => set("geschlecht", v)} options={["männlich", "weiblich", "divers"]} />
          <CompactField label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={(v) => set("staatsangehoerigkeit", v)} />
        </div>
        <div style={row}>
          <CompactField label="Anschrift (Straße/Platz, Hausnummer)" flex={2} value={f.strasse} onChange={(v) => set("strasse", v)} />
          <CompactField label="Postleitzahl" width={90} value={f.plz} onChange={(v) => set("plz", v)} />
          <CompactField label="Wohnort" value={f.wohnort} onChange={(v) => set("wohnort", v)} />
          <CompactField label="Staat" value={f.staat} onChange={(v) => set("staat", v)} />
        </div>
        <div style={{ ...lineBox, marginBottom: 0 }}>
          <div style={compactLabel}>Familienstand</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            {fsList.map((fs) => (
              <label key={fs.value} style={{ ...S.chk, fontSize: 11, marginRight: 0 }}>
                <input type="checkbox" checked={f.familienstand === fs.value} onChange={() => set("familienstand", f.familienstand === fs.value ? "" : fs.value)} />
                <TOpt value={fs.label} />
              </label>
            ))}
            <div style={{ minWidth: 140 }}>
              <CompactField label="seit" type="date" value={f.seit} onChange={(v) => set("seit", v)} />
            </div>
          </div>
        </div>
      </Section>

      <Section num={2} title="Angaben zur weiteren Person im gemeinsamen Haushalt">
        <div style={lineBox}>
          <div style={compactLabel}>Persönliche Identifikationsnummer (soweit vergeben, bitte ausfüllen)</div>
          <IdBoxes count={11} value={f.steuerId2} onChange={(v) => set("steuerId2", v)} />
        </div>
        <div style={row}>
          <CompactField label="Familienname" flex={2} value={f.eFamilienname} onChange={(v) => set("eFamilienname", v)} />
          <CompactField label="Vorname" flex={2} value={f.eVorname} onChange={(v) => set("eVorname", v)} />
          <CompactField label="Titel" width={70} value={f.eTitel} onChange={(v) => set("eTitel", v)} />
        </div>
        <div style={row}>
          <CompactField label="Geburtsdatum" type="date" value={f.eGeburtsdatum} onChange={(v) => set("eGeburtsdatum", v)} />
          <CompactField label="Staatsangehörigkeit" value={f.eStaatsangehoerigkeit} onChange={(v) => set("eStaatsangehoerigkeit", v)} />
          <SelectField label="Geschlecht" value={f.eGeschlecht} onChange={(v) => set("eGeschlecht", v)} options={["männlich", "weiblich", "divers"]} />
          <CompactField label="ggf. Geburtsname" value={f.eGeburtsname} onChange={(v) => set("eGeburtsname", v)} />
        </div>
        <CompactField label="Anschrift, falls abweichend (Straße/Platz, Hausnr., PLZ, Wohnort, Staat)" value={f.eAnschrift} onChange={(v) => set("eAnschrift", v)} />
      </Section>

      <Section num={3} title="Angaben zum Zahlungsweg">
        <div style={lineBox}>
          <div style={compactLabel}>IBAN</div>
          <IdBoxes count={22} value={f.iban} onChange={(v) => set("iban", v)} />
        </div>
        <div style={row}>
          <CompactField label="BIC" value={f.bic} onChange={(v) => set("bic", v)} />
          <CompactField label="Bank, Finanzinstitut (ggf. Zweigstelle)" flex={2} value={f.bank} onChange={(v) => set("bank", v)} />
        </div>
        <div style={lineBox}>
          <div style={compactLabel}>Kontoinhaber(in) ist</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <label style={{ ...S.chk, fontSize: 11 }}><input type="radio" name="antrag-kh" checked={f.kontoinhaber === "self"} onChange={() => set("kontoinhaber", "self")} /> antragstellende Person wie unter Nr. 1</label>
            <label style={{ ...S.chk, fontSize: 11 }}><input type="radio" name="antrag-kh" checked={f.kontoinhaber === "other"} onChange={() => set("kontoinhaber", "other")} /> andere Person, nämlich:</label>
          </div>
          {f.kontoinhaber === "other" && (
            <div style={{ ...row, marginTop: 8, marginBottom: 0 }}>
              <CompactField label="Familienname" value={f.khName} onChange={(v) => set("khName", v)} />
              <CompactField label="Vorname" value={f.khVorname} onChange={(v) => set("khVorname", v)} />
            </div>
          )}
        </div>
      </Section>

      <PageFooter page="1/2" />

      <Section num={4} title="Bescheid soll an folgende Person zugesandt werden (z. B. Berater, Anwalt)">
        <div style={row}>
          <CompactField label="Familienname" value={f.bFamilienname} onChange={(v) => set("bFamilienname", v)} />
          <CompactField label="Vorname" value={f.bVorname} onChange={(v) => set("bVorname", v)} />
        </div>
        <CompactField label="Anschrift, falls abweichend (Straße/Platz, Hausnr., PLZ, Wohnort, Staat)" value={f.bAnschrift} onChange={(v) => set("bAnschrift", v)} />
      </Section>

      <Section num={5} title="Angaben zu Kindern">
        <p style={{ color: "#374151", fontSize: 10, margin: "0 0 7px" }}>Für jedes Kind ist eine separate Anlage einzureichen.</p>
        <p style={{ color: "#374151", fontSize: 10, margin: "0 0 7px" }}>Für folgende Kinder bestehen bereits Leistungen (auch in Fällen abweichender Kontoverbindung, Abzweigung und Erstattung):</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, marginBottom: 6 }}>
          <thead>
            <tr>
              {[
                "Vorname des Kindes / ggf. abweichender Familienname",
                "Geburtsdatum",
                "Geschlecht",
                "Bei welcher Stelle (Referenznummer)?",
              ].map((h) => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {f.kinder.map((k, i) => (
              <tr key={i}>
                <td style={td}><input style={tableInput} value={k.vorname} onChange={(e) => setKind(i, "vorname", e.target.value)} /></td>
                <td style={td}><input style={tableInput} type="date" value={k.geburtsdatum} onChange={(e) => setKind(i, "geburtsdatum", e.target.value)} /></td>
                <td style={td}>
                  <select style={tableInput} value={k.geschlecht} onChange={(e) => setKind(i, "geschlecht", e.target.value)}>
                    <option value="">—</option><option value="m">m</option><option value="w">w</option><option value="d">d</option>
                  </select>
                </td>
                <td style={td}><input style={tableInput} value={k.familienkasse || (k as { referenz?: string }).referenz || ""} onChange={(e) => setKind(i, "familienkasse", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section num={6} title="Weitere eigene Kinder, für die eine andere Person Leistungen erhält">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              {[
                "Vorname des Kindes / ggf. abweichender Familienname",
                "Geburtsdatum",
                "Geschlecht",
                "Wer erhält Leistungen (Familienname, Vorname)?",
                "Bei welcher Stelle (Referenznummer)?",
              ].map((h) => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {f.kinder2.map((k, i) => (
              <tr key={i}>
                <td style={td}><input style={tableInput} value={k.vorname} onChange={(e) => setKind2(i, "vorname", e.target.value)} /></td>
                <td style={td}><input style={tableInput} type="date" value={k.geburtsdatum} onChange={(e) => setKind2(i, "geburtsdatum", e.target.value)} /></td>
                <td style={td}>
                  <select style={tableInput} value={k.geschlecht} onChange={(e) => setKind2(i, "geschlecht", e.target.value)}>
                    <option value="">—</option><option value="m">m</option><option value="w">w</option><option value="d">d</option>
                  </select>
                </td>
                <td style={td}><input style={tableInput} value={k.empfaenger} onChange={(e) => setKind2(i, "empfaenger", e.target.value)} /></td>
                <td style={td}><input style={tableInput} value={k.referenz} onChange={(e) => setKind2(i, "referenz", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(180px, 1fr)", gap: 20, marginTop: 18, alignItems: "end" }}>
          <div style={row}>
            <CompactField label="Ort" value={f.ort} onChange={(v) => set("ort", v)} />
            <CompactField label="Datum" type="date" value={f.datum} onChange={(v) => set("datum", v)} />
          </div>
          <Signature label="Unterschrift der antragstellenden Person" />
        </div>
      </Section>

      <PageFooter page="2/2" />
    </MusterFormBase>
  );
}
