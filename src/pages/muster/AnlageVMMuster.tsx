import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-vm-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-vm_ba012912.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  eigenheimJa: false, immobilieJa: false, grundstueckJa: false,
  kfzJa: false, kfzEigentuemer: "", kfzFabrikat: "", kfzBaujahr: "", kfzKm: "", kfzWert: "",
  schenkungJa: false,
  bargeldJa: false, bargeldBetrag: "",
  kontoJa: false, kontoIban: "", kontoStand: "",
  sparJa: false, wertpapiereJa: false, bausparJa: false, riesterJa: false,
  selbstaendigJa: false, selbstaendigName: "", selbstaendigDauer: "",
  sigDatum: "",
});

export default function AnlageVMMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="vm-root" title="Anlage VM — Vermögen" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Immobilien" />
        <label style={S.chk}><input type="checkbox" checked={f.eigenheimJa} onChange={() => set("eigenheimJa", !f.eigenheimJa)} /> Selbstbewohntes Eigentum</label>
        <label style={S.chk}><input type="checkbox" checked={f.immobilieJa} onChange={() => set("immobilieJa", !f.immobilieJa)} /> Nicht selbstbewohntes Eigentum</label>
        <label style={S.chk}><input type="checkbox" checked={f.grundstueckJa} onChange={() => set("grundstueckJa", !f.grundstueckJa)} /> Unbebaute Grundstücke</label>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Kraftfahrzeuge" />
        <label style={S.chk}><input type="checkbox" checked={f.kfzJa} onChange={() => set("kfzJa", !f.kfzJa)} /> KFZ vorhanden</label>
        {f.kfzJa && (<>
          <div style={S.row}><Field label="Eigentümer" value={f.kfzEigentuemer} onChange={v => set("kfzEigentuemer", v)} /><Field label="Fabrikat" value={f.kfzFabrikat} onChange={v => set("kfzFabrikat", v)} /></div>
          <div style={S.row}><Field label="Baujahr" value={f.kfzBaujahr} onChange={v => set("kfzBaujahr", v)} /><Field label="KM-Stand" value={f.kfzKm} onChange={v => set("kfzKm", v)} /><Field label="Wert (€)" value={f.kfzWert} onChange={v => set("kfzWert", v)} /></div>
        </>)}
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Schenkungen (letzte 10 Jahre)" />
        <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="schenk" checked={f.schenkungJa === (o === "Ja")} onChange={() => set("schenkungJa", o === "Ja")} /> {o}</label>))}</div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Konten & Geldanlagen" />
        <label style={S.chk}><input type="checkbox" checked={f.bargeldJa} onChange={() => set("bargeldJa", !f.bargeldJa)} /> Bargeld</label>
        {f.bargeldJa && <Field label="Bargeld gesamt (€)" value={f.bargeldBetrag} onChange={v => set("bargeldBetrag", v)} />}
        <label style={S.chk}><input type="checkbox" checked={f.kontoJa} onChange={() => set("kontoJa", !f.kontoJa)} /> Girokonten</label>
        {f.kontoJa && (<div style={S.row}><Field label="IBAN" value={f.kontoIban} onChange={v => set("kontoIban", v)} /><Field label="Kontostand (€)" value={f.kontoStand} onChange={v => set("kontoStand", v)} /></div>)}
        <label style={S.chk}><input type="checkbox" checked={f.sparJa} onChange={() => set("sparJa", !f.sparJa)} /> Spareinlagen</label>
        <label style={S.chk}><input type="checkbox" checked={f.wertpapiereJa} onChange={() => set("wertpapiereJa", !f.wertpapiereJa)} /> Wertpapiere / Kryptowährungen</label>
        <label style={S.chk}><input type="checkbox" checked={f.bausparJa} onChange={() => set("bausparJa", !f.bausparJa)} /> Bausparvertrag</label>
        <label style={S.chk}><input type="checkbox" checked={f.riesterJa} onChange={() => set("riesterJa", !f.riesterJa)} /> Altersvorsorge (Riester)</label>
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="F. Selbständigkeit" />
        <label style={S.chk}><input type="checkbox" checked={f.selbstaendigJa} onChange={() => set("selbstaendigJa", !f.selbstaendigJa)} /> Person in BG ist selbständig</label>
        {f.selbstaendigJa && (<div style={S.row}><Field label="Name" value={f.selbstaendigName} onChange={v => set("selbstaendigName", v)} /><Field label="Seit (Jahre)" value={f.selbstaendigDauer} onChange={v => set("selbstaendigDauer", v)} /></div>)}
      </div>
      <div style={S.sec}>
        <SecHeader num={7} title="G. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
