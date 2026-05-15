import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uh1-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  exVorname: "", exNachname: "", exGeburtsdatum: "", exStrasse: "", exPLZ: "", exOrt: "",
  trennungsdatum: "", scheidungsdatum: "",
  unterhaltBetrag: "", unterhaltSeit: "", titulierung: "",
  bemerkungen: "",
});

export default function AnlageUH1Muster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="uh1-root" title="Anlage UH1 — Unterhalt nach Trennung/Scheidung" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Unterhaltspflichtige Person (Ex-Partner)" />
        <div style={S.row}><Field label="Vorname" value={f.exVorname} onChange={v => set("exVorname", v)} /><Field label="Nachname" value={f.exNachname} onChange={v => set("exNachname", v)} /></div>
        <Field label="Geburtsdatum" type="date" value={f.exGeburtsdatum} onChange={v => set("exGeburtsdatum", v)} />
        <Field label="Straße" value={f.exStrasse} onChange={v => set("exStrasse", v)} />
        <div style={S.row}><Field label="PLZ" width={80} value={f.exPLZ} onChange={v => set("exPLZ", v)} /><Field label="Ort" value={f.exOrt} onChange={v => set("exOrt", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Trennung / Scheidung" />
        <div style={S.row}><Field label="Trennungsdatum" type="date" value={f.trennungsdatum} onChange={v => set("trennungsdatum", v)} /><Field label="Scheidungsdatum" type="date" value={f.scheidungsdatum} onChange={v => set("scheidungsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Unterhalt" />
        <div style={S.row}><Field label="Monatlicher Unterhalt (EUR)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} /><Field label="Gezahlt seit" type="date" value={f.unterhaltSeit} onChange={v => set("unterhaltSeit", v)} /></div>
        <Field label="Titulierung (Urteil/Vergleich)" value={f.titulierung} onChange={v => set("titulierung", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
  );
}
