import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-kdu-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-kdu_ba012910.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  strasse: "", nr: "", plz: "", ort: "",
  personenAnzahl: "", baujahr: "", raeume: "", flaeche: "",
  wohnart: "miete",
  grundmiete: "", nebenkosten: "", heizkosten: "",
  brennstoff: "gas", heizungsart: "zentral",
  direktzahlung: "nein",
  vermieterName: "", vermieterStrasse: "", vermieterNr: "", vermieterPlz: "", vermieterOrt: "", vermieterIban: "",
});

export default function AnlageKDUMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="kdu-root" title="Anlage KDU — Kosten der Unterkunft" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Unterkunft" />
        <div style={S.row}><Field label="Straße" value={f.strasse} onChange={v => set("strasse", v)} /><Field label="Nr." value={f.nr} onChange={v => set("nr", v)} /></div>
        <div style={S.row}><Field label="PLZ" value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Personen" value={f.personenAnzahl} onChange={v => set("personenAnzahl", v)} /><Field label="Baujahr" value={f.baujahr} onChange={v => set("baujahr", v)} /></div>
        <div style={S.row}><Field label="Räume" value={f.raeume} onChange={v => set("raeume", v)} /><Field label="Gesamtfläche (m²)" value={f.flaeche} onChange={v => set("flaeche", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Mietkosten" />
        <div style={S.row}><Field label="Grundmiete (€)" value={f.grundmiete} onChange={v => set("grundmiete", v)} /><Field label="Nebenkosten (€)" value={f.nebenkosten} onChange={v => set("nebenkosten", v)} /><Field label="Heizkosten (€)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="E. Energiequellen" />
        <div style={S.row}>
          <div><div style={S.lbl}>Brennstoff</div><div style={{ display: "flex", gap: 8 }}>{["Gas", "Öl", "Strom", "Fernwärme"].map(o => (<label key={o} style={S.chk}><input type="radio" name="brennstoff" checked={f.brennstoff === o.toLowerCase()} onChange={() => set("brennstoff", o.toLowerCase())} /> {o}</label>))}</div></div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="F. Direktzahlung an Vermieter" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Direktüberweisung an Vermieter?</div>
          <div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="direkt" checked={f.direktzahlung === o} onChange={() => set("direktzahlung", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div>
        </div>
        {f.direktzahlung === "ja" && (<>
          <Field label="Name Vermieter" value={f.vermieterName} onChange={v => set("vermieterName", v)} />
          <div style={S.row}><Field label="Straße" value={f.vermieterStrasse} onChange={v => set("vermieterStrasse", v)} /><Field label="Nr." value={f.vermieterNr} onChange={v => set("vermieterNr", v)} /></div>
          <div style={S.row}><Field label="PLZ" value={f.vermieterPlz} onChange={v => set("vermieterPlz", v)} /><Field label="Ort" value={f.vermieterOrt} onChange={v => set("vermieterOrt", v)} /></div>
          <Field label="IBAN Vermieter" value={f.vermieterIban} onChange={v => set("vermieterIban", v)} />
        </>)}
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="G. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
