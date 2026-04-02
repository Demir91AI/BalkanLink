import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "integrationskurs-muster-data";
const PDF_URL = "https://www.bamf.de";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "",
  deutschkenntnisse: "", muttersprache: "", weiteresprachen: "",
  kursart: "",
  berechtigung: "", bescheidVorhanden: "",
  kursort: "", zeit: "",
  sigOrt: "", sigDatum: "",
});

export default function IntegrationskursMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ik-root" title="Antrag auf Zulassung zum Integrationskurs" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Mehr Infos beim BAMF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim BAMF einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel: Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Sprachkenntnisse" />
        <div><div style={S.lbl}>Deutschkenntnisse</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>{["Keine", "Grundkenntnisse", "Mittelstufe"].map(d => (<label key={d} style={S.chk}><input type="radio" name="deutschkenntnisse" checked={f.deutschkenntnisse === d} onChange={() => set("deutschkenntnisse", d)} />{d}</label>))}</div></div>
        <div style={S.row}><Field label="Muttersprache" value={f.muttersprache} onChange={v => set("muttersprache", v)} /><Field label="Weitere Sprachen" value={f.weiteresprachen} onChange={v => set("weiteresprachen", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Kursart" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Allgemeiner Integrationskurs", "Eltern- und Frauenintegrationskurs", "Jugendintegrationskurs", "Alphabetisierungskurs", "Förderkurs Deutsch"].map(k => (
            <label key={k} style={S.chk}><input type="radio" name="kursart" checked={f.kursart === k} onChange={() => set("kursart", k)} />{k}</label>
          ))}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Berechtigung" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          {["Zur Teilnahme verpflichtet (Jobcenter / Ausländerbehörde)", "Freiwillige Teilnahme", "Antrag auf Kostenbefreiung (Bürgergeld / Grundsicherung)"].map(b => (
            <label key={b} style={S.chk}><input type="radio" name="berechtigung" checked={f.berechtigung === b} onChange={() => set("berechtigung", b)} />{b}</label>
          ))}
        </div>
        <div><div style={S.lbl}>Bescheid vorhanden</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="bescheidVorhanden" checked={f.bescheidVorhanden === o} onChange={() => set("bescheidVorhanden", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Präferenz" />
        <div style={S.row}><Field label="Bevorzugter Kursort / Stadtteil" value={f.kursort} onChange={v => set("kursort", v)} /></div>
        <div><div style={S.lbl}>Präferierte Zeit</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{["Vormittag", "Nachmittag", "Abend"].map(z => (<label key={z} style={S.chk}><input type="radio" name="zeit" checked={f.zeit === z} onChange={() => set("zeit", z)} />{z}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
      </div>

    </MusterFormBase>
  );
}
