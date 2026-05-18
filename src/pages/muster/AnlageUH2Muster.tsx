import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uh2-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  schwanger: false, entbindungstermin: "",
  vaterVorname: "", vaterNachname: "", vaterGeburtsdatum: "",
  vaterStrasse: "", vaterPLZ: "", vaterOrt: "",
  vaterschaftAnerkannt: false,
  unterhaltBetrag: "", unterhaltSeit: "",
  bemerkungen: "",
});

export default function AnlageUH2Muster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="uh2-root" title="Anlage UH2 — Unterhalt für Schwangere/Mütter" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-uh2" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-uh2"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage UH2 možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <MusterIntroBlock formKey="anlageuh2" paperId="uh2-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Schwangerschaft" />
        <label style={S.chk}><input type="checkbox" checked={f.schwanger} onChange={e => set("schwanger", e.target.checked)} /> Aktuell schwanger</label>
        <Field label="Voraussichtlicher Entbindungstermin" type="date" value={f.entbindungstermin} onChange={v => set("entbindungstermin", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Vater des Kindes" />
        <div style={S.row}><Field label="Vorname" value={f.vaterVorname} onChange={v => set("vaterVorname", v)} /><Field label="Nachname" value={f.vaterNachname} onChange={v => set("vaterNachname", v)} /></div>
        <Field label="Geburtsdatum" type="date" value={f.vaterGeburtsdatum} onChange={v => set("vaterGeburtsdatum", v)} />
        <Field label="Straße" value={f.vaterStrasse} onChange={v => set("vaterStrasse", v)} />
        <div style={S.row}><Field label="PLZ" width={80} value={f.vaterPLZ} onChange={v => set("vaterPLZ", v)} /><Field label="Ort" value={f.vaterOrt} onChange={v => set("vaterOrt", v)} /></div>
        <label style={S.chk}><input type="checkbox" checked={f.vaterschaftAnerkannt} onChange={e => set("vaterschaftAnerkannt", e.target.checked)} /> Vaterschaft anerkannt</label>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Unterhalt" />
        <div style={S.row}><Field label="Monatlicher Unterhalt (EUR)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} /><Field label="Gezahlt seit" type="date" value={f.unterhaltSeit} onChange={v => set("unterhaltSeit", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
  );
}
