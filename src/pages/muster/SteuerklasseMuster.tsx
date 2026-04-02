import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "steuerklasse-muster-data";

const initial = () => ({
  p1Familienname: "", p1Vorname: "", p1Geburtsdatum: "", p1SteuerId: "", p1Strasse: "", p1Plz: "", p1Ort: "", p1Arbeitgeber: "", p1Bisherige: "", p1Gewuenschte: "", p1Kinderfreibetrag: "",
  p2Familienname: "", p2Vorname: "", p2Geburtsdatum: "", p2SteuerId: "", p2Arbeitgeber: "", p2Bisherige: "", p2Gewuenschte: "", p2Kinderfreibetrag: "",
  grund: "",
  sonstigerGrund: "",
  finanzamt: "",
  sigOrt: "", sigDatum: "",
});

const steuerklassen = ["I", "II", "III", "IV", "V", "VI"];
const kinderfreibetraege = ["0,0", "0,5", "1,0", "1,5", "2,0", "2,5"];

export default function SteuerklasseMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  const PartnerSection = ({ num, prefix, label }: { num: number; prefix: string; label: string }) => (
    <div style={S.sec}>
      <SecHeader num={num} title={label} />
      <div style={S.row}><Field label="Familienname" value={(f as any)[prefix + "Familienname"]} onChange={v => set(prefix + "Familienname", v)} /><Field label="Vorname" value={(f as any)[prefix + "Vorname"]} onChange={v => set(prefix + "Vorname", v)} /></div>
      <div style={S.row}><Field label="Geburtsdatum" type="date" value={(f as any)[prefix + "Geburtsdatum"]} onChange={v => set(prefix + "Geburtsdatum", v)} /></div>
      <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={(f as any)[prefix + "SteuerId"]} onChange={v => set(prefix + "SteuerId", v)} /></div>
      {prefix === "p1" && (
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.p1Strasse} onChange={v => set("p1Strasse", v)} /><Field label="PLZ" width={80} value={f.p1Plz} onChange={v => set("p1Plz", v)} /><Field label="Ort" flex={1} value={f.p1Ort} onChange={v => set("p1Ort", v)} /></div>
      )}
      <div style={S.row}><Field label="Arbeitgeber" value={(f as any)[prefix + "Arbeitgeber"]} onChange={v => set(prefix + "Arbeitgeber", v)} /></div>
      <div style={S.row}>
        <div style={{ flex: 1 }}><div style={S.lbl}>Bisherige Steuerklasse</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{steuerklassen.map(sk => (<label key={sk} style={S.chk}><input type="radio" name={prefix + "Bisherige"} checked={(f as any)[prefix + "Bisherige"] === sk} onChange={() => set(prefix + "Bisherige", sk)} />{sk}</label>))}</div></div>
        <div style={{ flex: 1 }}><div style={S.lbl}>Gewünschte Steuerklasse</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{steuerklassen.map(sk => (<label key={sk} style={S.chk}><input type="radio" name={prefix + "Gewuenschte"} checked={(f as any)[prefix + "Gewuenschte"] === sk} onChange={() => set(prefix + "Gewuenschte", sk)} />{sk}</label>))}</div></div>
      </div>
      <div><div style={S.lbl}>Kinderfreibetragsanteil</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{kinderfreibetraege.map(kb => (<label key={kb} style={S.chk}><input type="radio" name={prefix + "Kinderfreibetrag"} checked={(f as any)[prefix + "Kinderfreibetrag"] === kb} onChange={() => set(prefix + "Kinderfreibetrag", kb)} />{kb}</label>))}</div></div>
    </div>
  );

  return (
    <MusterFormBase rootId="sk-root" title="Antrag auf Steuerklassenwechsel bei Ehegatten / Lebenspartnern" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl="https://www.formulare-bfinv.de" pdfLabel="Formulare der Finanzverwaltung →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim zuständigen Finanzamt einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <PartnerSection num={1} prefix="p1" label="Ehegatte / Lebenspartner 1" />
      <PartnerSection num={2} prefix="p2" label="Ehegatte / Lebenspartner 2" />

      <div style={S.sec}>
        <SecHeader num={3} title="Grund" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Heirat / Eintragung Lebenspartnerschaft", "Änderung der Einkommensverhältnisse", "Aufnahme / Aufgabe Erwerbstätigkeit"].map(g => (
            <label key={g} style={S.chk}><input type="radio" name="grund" checked={f.grund === g} onChange={() => set("grund", g)} />{g}</label>
          ))}
          <label style={S.chk}><input type="radio" name="grund" checked={f.grund === "Sonstiges"} onChange={() => set("grund", "Sonstiges")} />Sonstiger Grund:</label>
          {f.grund === "Sonstiges" && <input style={{ ...S.inp, width: "100%" }} value={f.sonstigerGrund} onChange={e => set("sonstigerGrund", e.target.value)} />}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}><Signature label="Unterschrift Partner 1" /><Signature label="Unterschrift Partner 2" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Finanzamt" value={f.finanzamt} onChange={v => set("finanzamt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
