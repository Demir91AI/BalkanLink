import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-wep-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-wep_ba012909.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "", bGeburtsort: "", bGeburtsland: "",
  bStaatsangehoerigkeit: "", bGeschlecht: "", beziehung: "",
  bRentenversNr: "", bSteuerIdNr: "",
  familienstand: "", erwerbsfaehig: "ja", schwanger: "nein", schueler: "nein",
  gkvJa: true, krankenkasse: "",
  sigDatum: "",
});

export default function AnlageWEPMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="wep-root" title="Anlage WEP — Weitere Person" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Weitere Person (ab 15 J.)" />
        <div style={S.row}><Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} /><Field label="Nachname" value={f.bNachname} onChange={v => set("bNachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.bGeburtsdatum} onChange={v => set("bGeburtsdatum", v)} /><Field label="Geburtsort" value={f.bGeburtsort} onChange={v => set("bGeburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.bStaatsangehoerigkeit} onChange={v => set("bStaatsangehoerigkeit", v)} /><Field label="Geschlecht" value={f.bGeschlecht} onChange={v => set("bGeschlecht", v)} /></div>
        <Field label="Beziehung (Ehegatte, Partner, Kind...)" value={f.beziehung} onChange={v => set("beziehung", v)} />
        <div style={S.row}><Field label="Rentenvers.-Nr." value={f.bRentenversNr} onChange={v => set("bRentenversNr", v)} /><Field label="Steuer-ID" value={f.bSteuerIdNr} onChange={v => set("bSteuerIdNr", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="D. Lebenssituation" />
        <Field label="Familienstand" value={f.familienstand} onChange={v => set("familienstand", v)} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
          {[["Erwerbsfähig", "erwerbsfaehig"], ["Schwanger", "schwanger"], ["Schüler/Student", "schueler"]].map(([l, k]) => (
            <div key={k}><div style={S.lbl}>{l}</div><div style={{ display: "flex", gap: 8 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={k} checked={f[k as keyof typeof f] === o} onChange={() => set(k, o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
          ))}
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="F. Krankenversicherung" />
        <Field label="Krankenkasse" value={f.krankenkasse} onChange={v => set("krankenkasse", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="Unterschriften" />
        <Signature label="Unterschrift Antragsteller" />
        <Signature label="Unterschrift Weitere Person" />
      </div>
    </MusterFormBase>
  );
}
