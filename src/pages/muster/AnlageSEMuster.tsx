import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-se-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  gVorname: "", gNachname: "", gGeburtsdatum: "",
  arzt1Name: "", arzt1Strasse: "", arzt1PLZ: "", arzt1Ort: "",
  arzt2Name: "", arzt2Strasse: "", arzt2PLZ: "", arzt2Ort: "",
  arzt3Name: "", arzt3Strasse: "", arzt3PLZ: "", arzt3Ort: "",
  versicherungName: "", versicherungStrasse: "", versicherungPLZ: "", versicherungOrt: "",
  abschnittC: true, abschnittD: true, abschnittE: true,
  sigDatumG: "", sigDatumA: "",
});

export default function AnlageSEMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="se-root" title="Anlage SE — Schweigepflichtentbindung" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-se" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-se"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage SE možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Geschädigte Person" />
        <div style={S.row}><Field label="Vorname" value={f.gVorname} onChange={v => set("gVorname", v)} /><Field label="Nachname" value={f.gNachname} onChange={v => set("gNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.gGeburtsdatum} onChange={v => set("gGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Ärzte / Kliniken" />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280", margin: "0 0 8px" }}>Bis zu 3 Einrichtungen. Bei mehr → weitere Anlage SE ausfüllen.</p>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>1. Behandelnde Einrichtung</p>
          <Field label="Name" value={f.arzt1Name} onChange={v => set("arzt1Name", v)} />
          <div style={S.row}><Field label="Straße" value={f.arzt1Strasse} onChange={v => set("arzt1Strasse", v)} /><Field label="PLZ" width={80} value={f.arzt1PLZ} onChange={v => set("arzt1PLZ", v)} /><Field label="Ort" value={f.arzt1Ort} onChange={v => set("arzt1Ort", v)} /></div>
        </div>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>2. Behandelnde Einrichtung</p>
          <Field label="Name" value={f.arzt2Name} onChange={v => set("arzt2Name", v)} />
          <div style={S.row}><Field label="Straße" value={f.arzt2Strasse} onChange={v => set("arzt2Strasse", v)} /><Field label="PLZ" width={80} value={f.arzt2PLZ} onChange={v => set("arzt2PLZ", v)} /><Field label="Ort" value={f.arzt2Ort} onChange={v => set("arzt2Ort", v)} /></div>
        </div>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 10 }}>
          <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>3. Behandelnde Einrichtung</p>
          <Field label="Name" value={f.arzt3Name} onChange={v => set("arzt3Name", v)} />
          <div style={S.row}><Field label="Straße" value={f.arzt3Strasse} onChange={v => set("arzt3Strasse", v)} /><Field label="PLZ" width={80} value={f.arzt3PLZ} onChange={v => set("arzt3PLZ", v)} /><Field label="Ort" value={f.arzt3Ort} onChange={v => set("arzt3Ort", v)} /></div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Gegnerische Versicherung" />
        <Field label="Name der Versicherung" value={f.versicherungName} onChange={v => set("versicherungName", v)} />
        <div style={S.row}><Field label="Straße" value={f.versicherungStrasse} onChange={v => set("versicherungStrasse", v)} /><Field label="PLZ" width={80} value={f.versicherungPLZ} onChange={v => set("versicherungPLZ", v)} /><Field label="Ort" value={f.versicherungOrt} onChange={v => set("versicherungOrt", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="F. Einverständnis & Unterschrift" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>28. Einverständnis für:</div>
          <label style={S.chk}><input type="checkbox" checked={f.abschnittC} onChange={e => set("abschnittC", e.target.checked)} /> Abschnitt C — Schweigepflichtentbindung Ärzte</label>
          <label style={S.chk}><input type="checkbox" checked={f.abschnittD} onChange={e => set("abschnittD", e.target.checked)} /> Abschnitt D — Einsichtnahme bei Versicherung</label>
          <label style={S.chk}><input type="checkbox" checked={f.abschnittE} onChange={e => set("abschnittE", e.target.checked)} /> Abschnitt E — Übersendung an Versicherung</label>
        </div>
        <Signature label="Unterschrift geschädigte Person" />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
  );
}
