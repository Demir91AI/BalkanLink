import { useState, useCallback } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "antrag-generic-muster-data";

const initial = () => ({
  steuerId1: "", familienname: "", titel: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geschlecht: "", staatsangehoerigkeit: "", strasse: "", plz: "", wohnort: "", staat: "Deutschland", familienstand: "", seit: "",
  steuerId2: "", eFamilienname: "", eVorname: "", eTitel: "", eGeburtsdatum: "", eStaatsangehoerigkeit: "", eGeschlecht: "", eGeburtsname: "", eAnschrift: "",
  iban: "", bic: "", bank: "", kontoinhaber: "self" as string, khName: "", khVorname: "",
  bFamilienname: "", bVorname: "", bAnschrift: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", referenz: "" })),
  kinder2: Array.from({ length: 4 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", empfaenger: "", referenz: "" })),
  ort: "", datum: "",
});

const fsList = [
  { value: "ledig", label: "ledig" },
  { value: "verheiratet", label: "verheiratet" },
  { value: "lebenspartnerschaft", label: "in eingetragener Lebenspartnerschaft lebend" },
  { value: "geschieden", label: "geschieden" },
  { value: "verwitwet", label: "verwitwet" },
  { value: "getrennt", label: "dauernd getrennt lebend" },
];

/**
 * Generički "Antrag — Musterformular".
 * Struktura prati layout iz uploaded PDF generatora (sekcije 1-6, IBAN/BIC, tabele djece).
 * Bez ikakvih državnih oznaka, oficijelnog naziva ili broja formulara.
 * Isključivo Übungszweck — jasan disclaimer u headeru i footeru.
 */
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
      rootId="antrag-generic-root"
      title="Antrag — Musterformular"
      subtitle="Übungsdokument BalkanLink — kein amtliches Formular"
      footerNote="Übungszweck • Nicht zur Einreichung bei Behörden geeignet • BalkanLink ist keine staatliche Stelle"
      lsKey={LS_KEY}
      formularId="antrag-generic-muster"
      data={f}
      onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))}
      onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}
    >
      {/* Disclaimer banner */}
      <div style={{
        marginBottom: 16, padding: "10px 12px", border: "1px dashed #d1d5db",
        background: "#fffbeb", color: "#92400e", fontSize: 11, borderRadius: 4,
      }}>
        ⚠ Übungsdokument — kein amtliches Formular. Nicht zur Einreichung bei Behörden geeignet.
      </div>

      {/* SEKCIJA 1 */}
      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur antragstellenden Person" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>Persönliche Identifikationsnummer (soweit vergeben)</div>
          <IdBoxes count={11} value={f.steuerId1} onChange={v => set("steuerId1", v)} />
        </div>
        <div style={S.row}>
          <Field label="Familienname" flex={3} value={f.familienname} onChange={v => set("familienname", v)} />
          <Field label="Titel" flex={1} value={f.titel} onChange={v => set("titel", v)} />
        </div>
        <div style={S.row}>
          <Field label="Vorname" flex={3} value={f.vorname} onChange={v => set("vorname", v)} />
          <Field label="ggf. Geburtsname und früherer Familienname" flex={3} value={f.geburtsname} onChange={v => set("geburtsname", v)} />
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
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
            <Field label="seit" type="date" width={160} value={f.seit} onChange={v => set("seit", v)} />
          </div>
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
        <SecHeader num={2} title="Angaben zur weiteren Person im gemeinsamen Haushalt" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>Persönliche Identifikationsnummer (soweit vergeben)</div>
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
          <Field label="ggf. Geburtsname" value={f.eGeburtsname} onChange={v => set("eGeburtsname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anschrift, falls abweichend" flex={1} value={f.eAnschrift} onChange={v => set("eAnschrift", v)} />
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
          <Field label="Bank / Finanzinstitut (ggf. Zweigstelle)" flex={2} value={f.bank} onChange={v => set("bank", v)} />
        </div>
        <div>
          <div style={S.lbl}>Kontoinhaber/in</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <label style={S.chk}><input type="radio" name="kh" checked={f.kontoinhaber === "self"} onChange={() => set("kontoinhaber", "self")} /> antragstellende Person</label>
            <label style={S.chk}><input type="radio" name="kh" checked={f.kontoinhaber === "other"} onChange={() => set("kontoinhaber", "other")} /> andere Person, nämlich:</label>
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
        <SecHeader num={4} title="Bescheid soll an folgende Person zugesandt werden (z. B. Berater, Anwalt)" />
        <div style={S.row}>
          <Field label="Familienname" value={f.bFamilienname} onChange={v => set("bFamilienname", v)} />
          <Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anschrift, falls abweichend" flex={1} value={f.bAnschrift} onChange={v => set("bAnschrift", v)} />
        </div>
      </div>

      {/* SEKCIJA 5 */}
      <div style={S.sec}>
        <SecHeader num={5} title="Angaben zu Kindern — bestehende Leistungen" />
        <p style={{ fontSize: 10, color: "#6b7280", margin: "0 0 6px" }}>
          Für jedes Kind bitte eine separate Zeile. Auch in Fällen abweichender Kontoverbindung.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              {["Vorname des Kindes", "Geburtsdatum", "Geschlecht", "Bei welcher Stelle (Referenznummer)?"].map(h => (
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
                    <option value="">—</option><option value="m">m</option><option value="w">w</option><option value="d">d</option>
                  </select>
                </td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.referenz} onChange={e => setKind(i, "referenz", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEKCIJA 6 */}
      <div style={S.sec}>
        <SecHeader num={6} title="Weitere eigene Kinder, für die eine andere Person Leistungen erhält" />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              {["Vorname des Kindes", "Geburtsdatum", "Geschlecht", "Wer erhält Leistungen", "Bei welcher Stelle"].map(h => (
                <th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.kinder2.map((k, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.vorname} onChange={e => setKind2(i, "vorname", e.target.value)} /></td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={k.geburtsdatum} onChange={e => setKind2(i, "geburtsdatum", e.target.value)} /></td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                  <select style={{ ...S.inp, border: "none" }} value={k.geschlecht} onChange={e => setKind2(i, "geschlecht", e.target.value)}>
                    <option value="">—</option><option value="m">m</option><option value="w">w</option><option value="d">d</option>
                  </select>
                </td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.empfaenger} onChange={e => setKind2(i, "empfaenger", e.target.value)} /></td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.referenz} onChange={e => setKind2(i, "referenz", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Datum / Unterschrift */}
      <div style={S.sec}>
        <SecHeader num={7} title="Datum und Unterschrift" />
        <div style={S.row}>
          <Field label="Ort" value={f.ort} onChange={v => set("ort", v)} />
          <Field label="Datum" type="date" value={f.datum} onChange={v => set("datum", v)} />
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <Signature label="Unterschrift der antragstellenden Person" />
        </div>
      </div>
    </MusterFormBase>
  );
}
