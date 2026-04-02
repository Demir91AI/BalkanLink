import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uh2-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-uh2_ba015346.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  entbindungstermin: "",
  vaterBekannt: "ja",
  vVorname: "", vNachname: "", vGeb: "",
  vStrasse: "", vNr: "", vPlz: "", vOrt: "",
  vaterschaftAnerkannt: "nein",
  unterhaltJa: "nein", unterhaltBetrag: "",
  sigDatum: "",
});

export default function AnlageUH2Muster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="uh2-root" title="Anlage UH2 — Unterhalt bei Schwangerschaft" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="C. Entbindungstermin" />
        <Field label="Voraussichtlicher Entbindungstermin" value={f.entbindungstermin} onChange={v => set("entbindungstermin", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="D. Kindsvater" />
        <div><div style={S.lbl}>Kindsvater bekannt?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein", "verstorben"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vaterB" checked={f.vaterBekannt === o} onChange={() => set("vaterBekannt", o)} /> {o.charAt(0).toUpperCase() + o.slice(1)}</label>))}</div></div>
        {f.vaterBekannt === "ja" && (<>
          <div style={S.row}><Field label="Vorname" value={f.vVorname} onChange={v => set("vVorname", v)} /><Field label="Nachname" value={f.vNachname} onChange={v => set("vNachname", v)} /><Field label="Geburtsdatum" value={f.vGeb} onChange={v => set("vGeb", v)} /></div>
          <div style={S.row}><Field label="Straße" value={f.vStrasse} onChange={v => set("vStrasse", v)} /><Field label="Nr." value={f.vNr} onChange={v => set("vNr", v)} /></div>
          <div style={S.row}><Field label="PLZ" value={f.vPlz} onChange={v => set("vPlz", v)} /><Field label="Ort" value={f.vOrt} onChange={v => set("vOrt", v)} /></div>
        </>)}
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="E. Vaterschaft" />
        <div><div style={S.lbl}>Vaterschaft anerkannt?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vater" checked={f.vaterschaftAnerkannt === o} onChange={() => set("vaterschaftAnerkannt", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="F. Unterhalt" />
        <div><div style={S.lbl}>Wird Unterhalt gezahlt?</div><div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="unt" checked={f.unterhaltJa === o} onChange={() => set("unterhaltJa", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div></div>
        {f.unterhaltJa === "ja" && <Field label="Betrag (€/Monat)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} />}
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
