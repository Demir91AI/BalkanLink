import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "wohngeld-muster-data";
const PDF_URL = "https://www.stmb.bayern.de/assets/stmi/wohnen/wohngeld/35_mz_antrag.pdf";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "",
  anzahlPersonen: "",
  mitglieder: Array.from({ length: 5 }, () => ({ name: "", vorname: "", geburtsdatum: "", verwandtschaft: "" })),
  einzugsdatum: "", gesamtmiete: "", heizkosten: "", warmwasser: "", garage: "", wohnflaeche: "", zimmer: "", oeffentlich: "",
  vermieterName: "", vermieterAnschrift: "",
  einnahmen: Array.from({ length: 5 }, () => ({ netto: "", rente: "", kindergeld: "", unterhalt: "", transfer: "" })),
  sigOrt: "", sigDatum: "",
});

export default function WohngeldMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setM = (i: number, k: string, v: string) => setF(p => { const m = [...p.mitglieder]; m[i] = { ...m[i], [k]: v }; return { ...p, mitglieder: m }; });
  const setE = (i: number, k: string, v: string) => setF(p => { const e = [...p.einnahmen]; e[i] = { ...e[i], [k]: v }; return { ...p, einnahmen: e }; });

  return (
    <MusterFormBase rootId="wg-root" title="Antrag auf Wohngeld — Mietzuschuss" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der Wohngeldstelle einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Antragstellende Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Anschrift der Mietwohnung: Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Haushaltsmitglieder" />
        <div style={S.row}><Field label="Anzahl der Personen im Haushalt" width={60} value={f.anzahlPersonen} onChange={v => set("anzahlPersonen", v)} /></div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead><tr>{["Name", "Vorname", "Geburtsdatum", "Verwandtschaftsverhältnis"].map(h => (<th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>))}</tr></thead>
          <tbody>{f.mitglieder.map((m, i) => (<tr key={i}>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={m.name} onChange={e => setM(i, "name", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={m.vorname} onChange={e => setM(i, "vorname", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={m.geburtsdatum} onChange={e => setM(i, "geburtsdatum", e.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={m.verwandtschaft} onChange={e => setM(i, "verwandtschaft", e.target.value)} /></td>
          </tr>))}</tbody>
        </table>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Angaben zur Wohnung" />
        <div style={S.row}><Field label="Einzugsdatum" type="date" value={f.einzugsdatum} onChange={v => set("einzugsdatum", v)} /></div>
        <div style={S.row}><Field label="Gesamtmiete inkl. NK (€/Monat)" value={f.gesamtmiete} onChange={v => set("gesamtmiete", v)} /><Field label="davon Heizkosten" value={f.heizkosten} onChange={v => set("heizkosten", v)} /><Field label="Warmwasser" value={f.warmwasser} onChange={v => set("warmwasser", v)} /><Field label="Garage" value={f.garage} onChange={v => set("garage", v)} /></div>
        <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /><Field label="Anzahl Zimmer" value={f.zimmer} onChange={v => set("zimmer", v)} /></div>
        <div><div style={S.lbl}>Öffentlich gefördert?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="oeffentlich" checked={f.oeffentlich === o} onChange={() => set("oeffentlich", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Vermieter" />
        <div style={S.row}><Field label="Name / Firma" value={f.vermieterName} onChange={v => set("vermieterName", v)} /></div>
        <div style={S.row}><Field label="Anschrift" value={f.vermieterAnschrift} onChange={v => set("vermieterAnschrift", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Einnahmen aller Haushaltsmitglieder" />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead><tr>{["Person", "Netto Arbeit (€)", "Rente (€)", "Kindergeld (€)", "Unterhalt (€)", "Transfer?"].map(h => (<th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>))}</tr></thead>
          <tbody>{f.einnahmen.map((e, i) => (<tr key={i}>
            <td style={{ border: "1px solid #9ca3af", padding: 2, fontSize: 9, color: "#6b7280" }}>Person {i + 1}</td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={e.netto} onChange={ev => setE(i, "netto", ev.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={e.rente} onChange={ev => setE(i, "rente", ev.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={e.kindergeld} onChange={ev => setE(i, "kindergeld", ev.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={e.unterhalt} onChange={ev => setE(i, "unterhalt", ev.target.value)} /></td>
            <td style={{ border: "1px solid #9ca3af", padding: 2 }}><select style={{ ...S.inp, border: "none" }} value={e.transfer} onChange={ev => setE(i, "transfer", ev.target.value)}><option value="">—</option><option value="Ja">Ja</option><option value="Nein">Nein</option></select></td>
          </tr>))}</tbody>
        </table>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
      </div>

    </MusterFormBase>
  );
}
