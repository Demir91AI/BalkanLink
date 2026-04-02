import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uh1-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-uh1_ba015345.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  famSituation: "getrennt", verheiratet_seit: "", getrennt_seit: "",
  exVorname: "", exNachname: "", exGeb: "",
  exStrasse: "", exNr: "", exPlz: "", exOrt: "",
  unterhaltJa: "nein", unterhaltBetrag: "", unterhaltstitelJa: "nein",
  sigDatum: "",
});

export default function AnlageUH1Muster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="uh1-root" title="Anlage UH1 — Trennungsunterhalt" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="C. Familiäre Situation" />
        <div style={S.row}><Field label="Verheiratet/Verpartnert seit" value={f.verheiratet_seit} onChange={v => set("verheiratet_seit", v)} /><Field label="Getrennt seit" value={f.getrennt_seit} onChange={v => set("getrennt_seit", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="D. Ex-Partner/in" />
        <div style={S.row}><Field label="Vorname" value={f.exVorname} onChange={v => set("exVorname", v)} /><Field label="Nachname" value={f.exNachname} onChange={v => set("exNachname", v)} /><Field label="Geburtsdatum" value={f.exGeb} onChange={v => set("exGeb", v)} /></div>
        <div style={S.row}><Field label="Straße" value={f.exStrasse} onChange={v => set("exStrasse", v)} /><Field label="Nr." value={f.exNr} onChange={v => set("exNr", v)} /></div>
        <div style={S.row}><Field label="PLZ" value={f.exPlz} onChange={v => set("exPlz", v)} /><Field label="Ort" value={f.exOrt} onChange={v => set("exOrt", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="E. Unterhaltszahlungen" />
        <div><div style={S.lbl}>Wird Unterhalt gezahlt?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="unterhalt" checked={f.unterhaltJa === o} onChange={() => set("unterhaltJa", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
        {f.unterhaltJa === "ja" && <Field label="Monatliche Höhe (€)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} />}
        <div><div style={S.lbl}>Unterhaltstitel vorhanden?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="titel" checked={f.unterhaltstitelJa === o} onChange={() => set("unterhaltstitelJa", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
