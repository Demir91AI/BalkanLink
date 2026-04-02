import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "rundfunkbeitrag-muster-data";
const PDF_URL = "https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/formulare/";

const initial = () => ({
  beitragsnummer: "", familienname: "", vorname: "", geburtsdatum: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "",
  grund: "",
  bescheidVorhanden: "", ausstellendeBehoerde: "", bewilligungVon: "", bewilligungBis: "", nachweisBeigefuegt: "",
  iban: "",
  sigOrt: "", sigDatum: "",
});

export default function RundfunkbeitragMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  const gruende = [
    "Bürgergeld (SGB II)",
    "Grundsicherung im Alter oder bei Erwerbsminderung (SGB XII)",
    "Sozialhilfe / Hilfe zum Lebensunterhalt (SGB XII)",
    "Hilfe zur Pflege (SGB XII / SGB XI)",
    "Ausbildungsförderung BAföG / Berufsausbildungsbeihilfe",
    "Blindenhilfe (§ 72 SGB XII)",
    "Taubblindheit",
    "Schwerbehinderung (GdB mind. 80 + Merkzeichen RF)",
  ];

  return (
    <MusterFormBase rootId="rf-root" title="Antrag auf Befreiung vom Rundfunkbeitrag" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Beitragsservice einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Beitragsnummer (falls vorhanden)" value={f.beitragsnummer} onChange={v => set("beitragsnummer", v)} /></div>
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Grund der Befreiung" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {gruende.map(g => (
            <label key={g} style={S.chk}><input type="radio" name="grund" checked={f.grund === g} onChange={() => set("grund", g)} />{g}</label>
          ))}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Nachweise" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Bescheid vorhanden?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="bescheidVorhanden" checked={f.bescheidVorhanden === o} onChange={() => set("bescheidVorhanden", o)} />{o}</label>))}</div>
        </div>
        <div style={S.row}><Field label="Ausstellende Behörde" value={f.ausstellendeBehoerde} onChange={v => set("ausstellendeBehoerde", v)} /></div>
        <div style={S.row}><Field label="Bewilligungszeitraum von" type="date" value={f.bewilligungVon} onChange={v => set("bewilligungVon", v)} /><Field label="bis" type="date" value={f.bewilligungBis} onChange={v => set("bewilligungBis", v)} /></div>
        <div><div style={S.lbl}>Nachweis wird beigefügt</div>
          <label style={S.chk}><input type="checkbox" checked={f.nachweisBeigefuegt === "Ja"} onChange={e => set("nachweisBeigefuegt", e.target.checked ? "Ja" : "")} />Ja</label>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Bankverbindung (für Rückerstattung)" />
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
      </div>

    </MusterFormBase>
  );
}
