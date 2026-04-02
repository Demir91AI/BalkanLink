import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "kirchenaustritt-muster-data";

const initial = () => ({
  familienname: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  strasse: "", plz: "", ort: "", telefon: "",
  religionsgemeinschaft: "", andereReligion: "",
  standesamt: "", sigOrt: "", sigDatum: "",
});

export default function KirchenaustrittMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ka-root" title="Erklärung zum Kirchenaustritt" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl="https://www.kirchenaustritt.de" pdfLabel="Mehr Infos zu Kirchenaustritt →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim zuständigen Standesamt / Amtsgericht einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Geburtsname" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Religionsgemeinschaft" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich erkläre meinen Austritt aus:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Römisch-Katholische Kirche", "Evangelische Kirche"].map(r => (
            <label key={r} style={S.chk}><input type="radio" name="religion" checked={f.religionsgemeinschaft === r} onChange={() => set("religionsgemeinschaft", r)} />{r}</label>
          ))}
          <label style={S.chk}><input type="radio" name="religion" checked={f.religionsgemeinschaft === "Andere"} onChange={() => set("religionsgemeinschaft", "Andere")} />Andere:</label>
          {f.religionsgemeinschaft === "Andere" && <input style={{ ...S.inp, width: "100%" }} value={f.andereReligion} onChange={e => set("andereReligion", e.target.value)} />}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Hinweis" />
        <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 4, padding: 8, fontSize: 10, color: "#1e40af" }}>
          Der Austritt wird wirksam mit Ablauf des Kalendermonats, in dem die Erklärung abgegeben wird. Gebühr je nach Bundesland: 0–30 €
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Standesamt / Amtsgericht" value={f.standesamt} onChange={v => set("standesamt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
