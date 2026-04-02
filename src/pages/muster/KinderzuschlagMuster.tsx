import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "kinderzuschlag-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", steuerId: "",
  strasse: "", plz: "", ort: "", iban: "", bic: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", nachname: "", geburtsdatum: "", steuerId: "", kindergeld: "", imHaushalt: "" })),
  brutto1: "", brutto2: "", sonstige: "", unterhalt: "",
  kaltmiete: "", heizkosten: "", wohnflaeche: "",
  sigOrt: "", sigDatum: "",
});

export default function KinderzuschlagMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setKind = (i: number, k: string, v: string) => setF(p => { const kinder = [...p.kinder]; kinder[i] = { ...kinder[i], [k]: v }; return { ...p, kinder }; });

  return (
    <MusterFormBase rootId="kiz-root" title="Antrag auf Kinderzuschlag (KiZ)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Mehr Infos bei der Familienkasse →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der Familienkasse einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Antragstellende Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zu den Kindern" />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead><tr>{["Vorname", "Nachname", "Geburtsdatum", "Steuer-ID", "Kindergeld?", "Im Haushalt?"].map(h => (<th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>))}</tr></thead>
          <tbody>{f.kinder.map((k, i) => (<tr key={i}>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.vorname} onChange={e => setKind(i, "vorname", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.nachname} onChange={e => setKind(i, "nachname", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={k.geburtsdatum} onChange={e => setKind(i, "geburtsdatum", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.steuerId} onChange={e => setKind(i, "steuerId", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><select style={{ ...S.inp, border: "none" }} value={k.kindergeld} onChange={e => setKind(i, "kindergeld", e.target.value)}><option value="">—</option><option value="Ja">Ja</option><option value="Nein">Nein</option></select></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><select style={{ ...S.inp, border: "none" }} value={k.imHaushalt} onChange={e => setKind(i, "imHaushalt", e.target.value)}><option value="">—</option><option value="Ja">Ja</option><option value="Nein">Nein</option></select></td>
          </tr>))}</tbody>
        </table>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Einkommen der Eltern" />
        <div style={S.row}><Field label="Bruttoeinkommen Elternteil 1 (€/Monat)" value={f.brutto1} onChange={v => set("brutto1", v)} /><Field label="Bruttoeinkommen Elternteil 2 (€/Monat)" value={f.brutto2} onChange={v => set("brutto2", v)} /></div>
        <div style={S.row}><Field label="Sonstige Einnahmen (€)" value={f.sonstige} onChange={v => set("sonstige", v)} /><Field label="Unterhalt (€)" value={f.unterhalt} onChange={v => set("unterhalt", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Wohnsituation" />
        <div style={S.row}><Field label="Kaltmiete (€/Monat)" value={f.kaltmiete} onChange={v => set("kaltmiete", v)} /><Field label="Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
      </div>

    </MusterFormBase>
  );
}
