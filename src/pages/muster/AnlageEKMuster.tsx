import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-ek-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-ek_ba012911.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  erwerbJa: false, selbstaendigJa: false,
  kindergeldJa: false, kindergeldBetrag: "",
  fahrtkosten: false, entfernung: "", tageProWoche: "",
  sigDatum: "",
});

export default function AnlageEKMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ek-root" title="Anlage EK — Einkommen" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Person für die EK gilt" />
        <div style={S.row}><Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} /><Field label="Nachname" value={f.bNachname} onChange={v => set("bNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.bGeburtsdatum} onChange={v => set("bGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Einkommensarten" />
        <label style={S.chk}><input type="checkbox" checked={f.erwerbJa} onChange={() => set("erwerbJa", !f.erwerbJa)} /> Einkommen aus Erwerbstätigkeit</label>
        <label style={S.chk}><input type="checkbox" checked={f.selbstaendigJa} onChange={() => set("selbstaendigJa", !f.selbstaendigJa)} /> Selbständige Tätigkeit</label>
        <label style={S.chk}><input type="checkbox" checked={f.kindergeldJa} onChange={() => set("kindergeldJa", !f.kindergeldJa)} /> Kindergeld</label>
        {f.kindergeldJa && <Field label="Kindergeld Betrag (€/Monat)" value={f.kindergeldBetrag} onChange={v => set("kindergeldBetrag", v)} />}
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Werbungskosten / Fahrtkosten" />
        <label style={S.chk}><input type="checkbox" checked={f.fahrtkosten} onChange={() => set("fahrtkosten", !f.fahrtkosten)} /> Fahrtkosten zur Arbeit</label>
        {f.fahrtkosten && (<div style={S.row}><Field label="Entfernung (km)" value={f.entfernung} onChange={v => set("entfernung", v)} /><Field label="Tage/Woche" value={f.tageProWoche} onChange={v => set("tageProWoche", v)} /></div>)}
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
