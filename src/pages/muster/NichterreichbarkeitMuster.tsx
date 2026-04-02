import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "nichterreichbarkeit-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anfrage-nichterreichbarkeit_ba015340.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "",
  kundennummer: "", bgNummer: "",
  von: "", bis: "",
  grund: "urlaub",
  kontakt: "",
  sigDatum: "",
});

export default function NichterreichbarkeitMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ane-root" title="Anfrage zur Nichterreichbarkeit (ANE)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Kundennummer" value={f.kundennummer} onChange={v => set("kundennummer", v)} /></div>
        <Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Zeitraum & Grund" />
        <div style={S.row}><Field label="Von" value={f.von} onChange={v => set("von", v)} /><Field label="Bis" value={f.bis} onChange={v => set("bis", v)} /></div>
        <div style={{ marginTop: 8 }}>
          <div style={S.lbl}>Grund</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["urlaub", "kur/reha", "ausbildungssuche", "sonstiges"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="grund" checked={f.grund === o} onChange={() => set("grund", o)} /> {o.charAt(0).toUpperCase() + o.slice(1)}</label>
            ))}
          </div>
        </div>
        {f.grund !== "urlaub" && <Field label="Kontaktmöglichkeit während Abwesenheit" value={f.kontakt} onChange={v => set("kontakt", v)} />}
      </div>
      <div style={S.sec} className="rounded-lg border border-red-300 bg-red-50 p-3">
        <p style={{ fontSize: 11, color: "#991b1b", margin: 0 }}>
          🚨 <strong>3-Wochen-Regel:</strong> Max. 3 Wochen/Kalenderjahr ohne Leistungsunterbrechung. Ab der 4. Woche: Bürgergeld + Krankenversicherung werden eingestellt!
        </p>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="Einreichung" />
        <p style={{ fontSize: 11, color: "#6b7280" }}>Formular per Online-Postfach, persönlich oder per Post einreichen — mindestens 5 Werktage vor Abreise!</p>
        <Signature label="Datum" />
      </div>
    </MusterFormBase>
  );
}
