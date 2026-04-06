import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uh3-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-uh3_ba015347.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  kVorname: "", kNachname: "", kGeburtsdatum: "",
  eltern1Status: "bekannt", eltern1Vorname: "", eltern1Nachname: "",
  eltern2Status: "bekannt", eltern2Vorname: "", eltern2Nachname: "", eltern2Geb: "",
  eltern2Strasse: "", eltern2Nr: "", eltern2Plz: "", eltern2Ort: "",
  verheiratet: "ja",
  unterhaltJa: "nein", unterhaltBetrag: "", unterhaltstitelJa: "nein",
  unterhaltsvorschussJa: "nein",
  inSchule: "nein", schulname: "", schulEnde: "",
  sigDatum: "",
});

export default function AnlageUH3Muster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="uh3-root" title="Anlage UH3 — Kindesunterhalt" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Unterhaltsberechtigte Person (Kind)" />
        <div style={S.row}><Field label="Vorname" value={f.kVorname} onChange={v => set("kVorname", v)} /><Field label="Nachname" value={f.kNachname} onChange={v => set("kNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.kGeburtsdatum} onChange={v => set("kGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Abwesender Elternteil" />
        <div style={S.row}><Field label="Vorname" value={f.eltern2Vorname} onChange={v => set("eltern2Vorname", v)} /><Field label="Nachname" value={f.eltern2Nachname} onChange={v => set("eltern2Nachname", v)} /><Field label="Geburtsdatum" value={f.eltern2Geb} onChange={v => set("eltern2Geb", v)} /></div>
        <div style={S.row}><Field label="Straße" value={f.eltern2Strasse} onChange={v => set("eltern2Strasse", v)} /><Field label="Nr." value={f.eltern2Nr} onChange={v => set("eltern2Nr", v)} /></div>
        <div style={S.row}><Field label="PLZ" value={f.eltern2Plz} onChange={v => set("eltern2Plz", v)} /><Field label="Ort" value={f.eltern2Ort} onChange={v => set("eltern2Ort", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Ehe & Vaterschaft" />
        <div><div style={S.lbl}>Eltern bei Geburt verheiratet?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="verh" checked={f.verheiratet === o} onChange={() => set("verheiratet", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="F. Unterhaltszahlungen" />
        <div><div style={S.lbl}>Wird Unterhalt gezahlt?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="unt" checked={f.unterhaltJa === o} onChange={() => set("unterhaltJa", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
        {f.unterhaltJa === "ja" && <Field label="Monatliche Höhe (€)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} />}
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="G. Unterhaltsvorschuss (Jugendamt)" />
        <div><div style={S.lbl}>Unterhaltsvorschuss?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vorschuss" checked={f.unterhaltsvorschussJa === o} onChange={() => set("unterhaltsvorschussJa", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={7} title="I. Schule/Ausbildung" />
        <div><div style={S.lbl}>In Schule/Ausbildung?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="schule" checked={f.inSchule === o} onChange={() => set("inSchule", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
        {f.inSchule === "ja" && (<div style={S.row}><Field label="Schulname" value={f.schulname} onChange={v => set("schulname", v)} /><Field label="Voraussichtliches Ende" value={f.schulEnde} onChange={v => set("schulEnde", v)} /></div>)}
      </div>
      <div style={S.sec}>
        <SecHeader num={8} title="Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
