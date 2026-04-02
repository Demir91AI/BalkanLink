import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-ki-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-ki_ba015338.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  kVorname: "", kNachname: "", kGeburtsdatum: "", kGeburtsort: "", kGeburtsland: "",
  kStaatsangehoerigkeit: "", kGeschlecht: "", kSteuerIdNr: "",
  beziehung: "leibliches Kind", elternteilAusserhalb: "nein",
  schule: "nein", schulname: "",
  kindergeldJa: true, kindergeldBetrag: "", unterhaltJa: false, unterhaltBetrag: "",
  gkvJa: true, krankenkasse: "",
  sigDatum: "",
});

export default function AnlageKIMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ki-root" title="Anlage KI — Kind unter 15 Jahren" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Daten des Kindes" />
        <div style={S.row}><Field label="Vorname" value={f.kVorname} onChange={v => set("kVorname", v)} /><Field label="Nachname" value={f.kNachname} onChange={v => set("kNachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.kGeburtsdatum} onChange={v => set("kGeburtsdatum", v)} /><Field label="Geburtsort" value={f.kGeburtsort} onChange={v => set("kGeburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.kStaatsangehoerigkeit} onChange={v => set("kStaatsangehoerigkeit", v)} /><Field label="Steuer-ID" value={f.kSteuerIdNr} onChange={v => set("kSteuerIdNr", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="D. Lebenssituation" />
        <Field label="Beziehung zum Kind" value={f.beziehung} onChange={v => set("beziehung", v)} />
        <div><div style={S.lbl}>Elternteil außerhalb BG?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="elternteil" checked={f.elternteilAusserhalb === o} onChange={() => set("elternteilAusserhalb", o)} /> {o === "ja" ? "Ja → Anlage UH3!" : "Nein"}</label>))}</div></div>
        <div><div style={S.lbl}>In der Schule?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="schule" checked={f.schule === o} onChange={() => set("schule", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
        {f.schule === "ja" && <Field label="Schulname" value={f.schulname} onChange={v => set("schulname", v)} />}
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="Einnahmen des Kindes" />
        <label style={S.chk}><input type="checkbox" checked={f.kindergeldJa} onChange={() => set("kindergeldJa", !f.kindergeldJa)} /> Kindergeld</label>
        {f.kindergeldJa && <Field label="Kindergeld (€/Monat)" value={f.kindergeldBetrag} onChange={v => set("kindergeldBetrag", v)} />}
        <label style={S.chk}><input type="checkbox" checked={f.unterhaltJa} onChange={() => set("unterhaltJa", !f.unterhaltJa)} /> Unterhalt</label>
        {f.unterhaltJa && <Field label="Unterhalt (€/Monat)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} />}
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="F. Krankenversicherung" />
        <Field label="Krankenkasse (familienversichert)" value={f.krankenkasse} onChange={v => set("krankenkasse", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="Unterschrift" />
        <Signature label="Datum, Unterschrift Erziehungsberechtigte/r" />
      </div>
    </MusterFormBase>
  );
}
