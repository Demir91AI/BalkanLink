import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-ve-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-ve_ba015209.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  mVorname: "", mNachname: "", mGeburtsdatum: "",
  partner: "nein", zusammenJahr: "nein", gemeinsamKind: "nein", versorgung: "nein", zugriffEinkommen: "nein",
  begruendung: "",
  sigDatum: "",
});

export default function AnlageVEMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));
  const Radio = ({ name, value }: { name: string; value: string }) => (
    <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={name} checked={value === o.toLowerCase()} onChange={() => set(name, o.toLowerCase())} />{o}</label>))}</div>
  );

  return (
    <MusterFormBase rootId="ve-root" title="Anlage VE — Einstehensgemeinschaft" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Angaben zur Mitperson" />
        <div style={S.row}><Field label="Vorname" value={f.mVorname} onChange={v => set("mVorname", v)} /><Field label="Nachname" value={f.mNachname} onChange={v => set("mNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.mGeburtsdatum} onChange={v => set("mGeburtsdatum", v)} /></div>
        <div style={{ marginTop: 8 }}>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>8. Ist die Person Ihr/e Partner/in?</div><Radio name="partner" value={f.partner} /></div>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>9. Zusammen seit mehr als 1 Jahr?</div><Radio name="zusammenJahr" value={f.zusammenJahr} /></div>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>10. Gemeinsames Kind im Haushalt?</div><Radio name="gemeinsamKind" value={f.gemeinsamKind} /></div>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>11. Gemeinsame Versorgung eines Kindes/Angehörigen?</div><Radio name="versorgung" value={f.versorgung} /></div>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>12. Zugriff auf Einkommen/Vermögen der Person?</div><Radio name="zugriffEinkommen" value={f.zugriffEinkommen} /></div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Gründe gegen eine VE" />
        <Field label="13. Begründung" value={f.begruendung} onChange={v => set("begruendung", v)} multiline />
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Unterschrift" />
        <Signature datum={f.sigDatum} onDatum={v => set("sigDatum", v)} />
      </div>
    </MusterFormBase>
  );
}
