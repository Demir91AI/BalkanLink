import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "wba-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/antrag-weiterbewilligung_ba012908.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  endeBewilligung: "",
  strasse: "", nr: "", plz: "", ort: "",
  alleinWohnend: "nein",
  grundmiete: "", nebenkosten: "", heizkosten: "",
  einkommenErwerb: "nein", selbstaendig: "nein",
  sozialleistung: "", sozialBetrag: "",
  aenderungen: "nein",
  sigDatum: "",
});

export default function WeiterbewilligungMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="wba-root" title="Weiterbewilligungsantrag (WBA)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="Ende Bewilligungszeitraum" />
        <Field label="Bewilligungszeitraum endet" value={f.endeBewilligung} onChange={v => set("endeBewilligung", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="B. Adresse" />
        <div style={S.row}><Field label="Straße" value={f.strasse} onChange={v => set("strasse", v)} /><Field label="Nr." value={f.nr} onChange={v => set("nr", v)} /></div>
        <div style={S.row}><Field label="PLZ" value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="C. Unterkunftskosten" />
        <div style={S.row}><Field label="Grundmiete (€)" value={f.grundmiete} onChange={v => set("grundmiete", v)} /><Field label="Nebenkosten (€)" value={f.nebenkosten} onChange={v => set("nebenkosten", v)} /><Field label="Heizkosten (€)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Einkommen" />
        <div style={S.row}>
          <div><div style={S.lbl}>Erwerbseinkommen?</div><div style={{ display: "flex", gap: 8 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="erwerb" checked={f.einkommenErwerb === o} onChange={() => set("einkommenErwerb", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
          <div><div style={S.lbl}>Selbständig?</div><div style={{ display: "flex", gap: 8 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="selbst" checked={f.selbstaendig === o} onChange={() => set("selbstaendig", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
        </div>
        <div style={S.row}><Field label="Sozialleistung (Art)" value={f.sozialleistung} onChange={v => set("sozialleistung", v)} /><Field label="Betrag (€/Monat)" value={f.sozialBetrag} onChange={v => set("sozialBetrag", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="H. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
