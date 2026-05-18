import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uh3-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  kindVorname: "", kindNachname: "", kindGeburtsdatum: "",
  elternteilVorname: "", elternteilNachname: "", elternteilGeburtsdatum: "",
  elternteilStrasse: "", elternteilPLZ: "", elternteilOrt: "",
  unterhaltBetrag: "", unterhaltSeit: "", titulierung: "",
  unterhaltsvorschuss: false,
  bemerkungen: "",
});

export default function AnlageUH3Muster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="uh3-root" title="Anlage UH3 — Kindesunterhalt" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-uh3" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-uh3"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage UH3 možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <MusterIntroBlock formKey="anlageuh3" paperId="uh3-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Kind" />
        <div style={S.row}><Field label="Vorname" value={f.kindVorname} onChange={v => set("kindVorname", v)} /><Field label="Nachname" value={f.kindNachname} onChange={v => set("kindNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.kindGeburtsdatum} onChange={v => set("kindGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Anderer Elternteil (unterhaltspflichtig)" />
        <div style={S.row}><Field label="Vorname" value={f.elternteilVorname} onChange={v => set("elternteilVorname", v)} /><Field label="Nachname" value={f.elternteilNachname} onChange={v => set("elternteilNachname", v)} /></div>
        <Field label="Geburtsdatum" type="date" value={f.elternteilGeburtsdatum} onChange={v => set("elternteilGeburtsdatum", v)} />
        <Field label="Straße" value={f.elternteilStrasse} onChange={v => set("elternteilStrasse", v)} />
        <div style={S.row}><Field label="PLZ" width={80} value={f.elternteilPLZ} onChange={v => set("elternteilPLZ", v)} /><Field label="Ort" value={f.elternteilOrt} onChange={v => set("elternteilOrt", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Unterhalt" />
        <div style={S.row}><Field label="Monatlicher Kindesunterhalt (EUR)" value={f.unterhaltBetrag} onChange={v => set("unterhaltBetrag", v)} /><Field label="Gezahlt seit" type="date" value={f.unterhaltSeit} onChange={v => set("unterhaltSeit", v)} /></div>
        <Field label="Titulierung (Urteil/Jugendamt-Beistandschaft)" value={f.titulierung} onChange={v => set("titulierung", v)} />
        <label style={S.chk}><input type="checkbox" checked={f.unterhaltsvorschuss} onChange={e => set("unterhaltsvorschuss", e.target.checked)} /> Unterhaltsvorschuss vom Jugendamt erhalten</label>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
  );
}
