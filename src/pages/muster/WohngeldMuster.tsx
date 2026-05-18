import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import WohngeldGuideContent from "@/components/guides/WohngeldGuideContent";

const LS_KEY = "wohngeld-muster-data";
const PDF_URL = "https://www.stmb.bayern.de/assets/stmi/wohnen/wohngeld/35_mz_antrag.pdf";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "",
  anzahlPersonen: "",
  mitglieder: Array.from({ length: 5 }, () => ({ name: "", vorname: "", geburtsdatum: "", verwandtschaft: "", getrennt: "" })),
  einzugsdatum: "", gesamtmiete: "", heizkosten: "", warmwasser: "", garage: "", wohnflaeche: "", zimmer: "", oeffentlich: "",
  vermieterName: "", vermieterStrasse: "", vermieterPlz: "", vermieterOrt: "",
  einnahmen: Array.from({ length: 5 }, () => ({ netto: "", rente: "", kindergeld: "", unterhalt: "", bafoeg: "", sonstigeArt: "", sonstigeBetrag: "", transfer: "" })),
  wohngeldbehörde: "", sigOrt: "", sigDatum: "",
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
        <div style={S.row}><Field label="Anzahl der Personen im Haushalt gesamt" width={60} value={f.anzahlPersonen} onChange={v => set("anzahlPersonen", v)} /></div>
        {f.mitglieder.map((m, i) => (
          <div key={i} style={{ marginBottom: 8, paddingBottom: 6, borderBottom: i < 4 ? "1px dashed #e5e7eb" : "none" }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>Person {i + 1}</div>
            <div style={S.row}><Field label="Familienname" value={m.name} onChange={v => setM(i, "name", v)} /><Field label="Vorname" value={m.vorname} onChange={v => setM(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={m.geburtsdatum} onChange={v => setM(i, "geburtsdatum", v)} /></div>
            <div style={S.row}>
              <Field label="Verwandtschaftsverhältnis zum Antragsteller" value={m.verwandtschaft} onChange={v => setM(i, "verwandtschaft", v)} />
              <div style={{ flex: 1 }}><div style={S.lbl}>Getrennt lebend?</div><div style={{ display: "flex", gap: 12 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={`getrennt${i}`} checked={m.getrennt === o} onChange={() => setM(i, "getrennt", o)} />{o}</label>))}</div></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Angaben zur Wohnung" />
        <div style={S.row}><Field label="Einzugsdatum" type="date" value={f.einzugsdatum} onChange={v => set("einzugsdatum", v)} /></div>
        <div style={S.row}><Field label="Gesamtmiete inkl. NK (€/Monat)" value={f.gesamtmiete} onChange={v => set("gesamtmiete", v)} /><Field label="davon Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
        <div style={S.row}><Field label="davon Warmwasserkosten (€/Monat)" value={f.warmwasser} onChange={v => set("warmwasser", v)} /><Field label="davon Garagenmiete (€/Monat)" value={f.garage} onChange={v => set("garage", v)} /></div>
        <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /><Field label="Anzahl der Zimmer" value={f.zimmer} onChange={v => set("zimmer", v)} /></div>
        <div><div style={S.lbl}>Öffentlich geförderte Wohnung (Sozialwohnung)?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="oeffentlich" checked={f.oeffentlich === o} onChange={() => set("oeffentlich", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Angaben zum Vermieter" />
        <div style={S.row}><Field label="Name / Firma des Vermieters" value={f.vermieterName} onChange={v => set("vermieterName", v)} /></div>
        <div style={S.row}><Field label="Anschrift: Straße, Hausnr." flex={2} value={f.vermieterStrasse} onChange={v => set("vermieterStrasse", v)} /><Field label="PLZ" width={80} value={f.vermieterPlz} onChange={v => set("vermieterPlz", v)} /><Field label="Ort" flex={1} value={f.vermieterOrt} onChange={v => set("vermieterOrt", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Einnahmen aller Haushaltsmitglieder" />
        {f.einnahmen.map((e, i) => (
          <div key={i} style={{ marginBottom: 8, paddingBottom: 6, borderBottom: i < 4 ? "1px dashed #e5e7eb" : "none" }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>Person {i + 1}</div>
            <div style={S.row}><Field label="Netto Arbeit (€/Mon.)" value={e.netto} onChange={v => setE(i, "netto", v)} /><Field label="Rente (€/Mon.)" value={e.rente} onChange={v => setE(i, "rente", v)} /><Field label="Kindergeld (€/Mon.)" value={e.kindergeld} onChange={v => setE(i, "kindergeld", v)} /></div>
            <div style={S.row}><Field label="Unterhalt (€/Mon.)" value={e.unterhalt} onChange={v => setE(i, "unterhalt", v)} /><Field label="BAföG / Beihilfe (€/Mon.)" value={e.bafoeg} onChange={v => setE(i, "bafoeg", v)} /></div>
            <div style={S.row}><Field label="Sonstige Einnahmen: Art" value={e.sonstigeArt} onChange={v => setE(i, "sonstigeArt", v)} /><Field label="Betrag (€/Mon.)" value={e.sonstigeBetrag} onChange={v => setE(i, "sonstigeBetrag", v)} /></div>
            <div><div style={S.lbl}>Transferleistungen (Bürgergeld, Grundsicherung)?</div><div style={{ display: "flex", gap: 12 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={`transfer${i}`} checked={e.transfer === o} onChange={() => setE(i, "transfer", o)} />{o}</label>))}</div></div>
          </div>
        ))}
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständige Wohngeldbehörde" value={f.wohngeldbehörde} onChange={v => set("wohngeldbehörde", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
