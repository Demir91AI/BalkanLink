import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-meb-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  erstmalig: true,
  patVorname: "", patNachname: "", patGeburtsdatum: "",
  arztTitel: "", arztVorname: "", arztNachname: "", arztStrasse: "", arztPLZ: "", arztOrt: "",
  krankheitsbild: "", kostform: "", zeitraumVon: "", zeitraumBis: "",
  sigDatum: "", patSigDatum: "",
});

export default function AnlageMEBMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="meb-root" title="Anlage MEB — Mehrbedarf Ernährung" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-meb" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-meb"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage MEB možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Betroffene Person" />
        <div style={S.row}><Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} /><Field label="Nachname" value={f.bNachname} onChange={v => set("bNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.bGeburtsdatum} onChange={v => set("bGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Mehrbedarf" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>8. Erstmalig oder erneut?</div>
          <div style={{ display: "flex", gap: 16 }}>
            {["Erstmalig", "Erneut"].map(o => (<label key={o} style={S.chk}><input type="radio" name="erstmalig" checked={f.erstmalig === (o === "Erstmalig")} onChange={() => set("erstmalig", o === "Erstmalig")} />{o}</label>))}
          </div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Unterschrift Antragsteller" />
        <Signature label="Datum, Unterschrift" />
      </div>
      <div style={{ ...S.sec, background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8 }}>
        <SecHeader num={5} title="Ärztliche Bescheinigung (vom Arzt)" />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#92400e", margin: "0 0 8px" }}>⚠️ Im verschlossenen Umschlag einreichen!</p>
        <div style={S.row}><Field label="Patient Vorname" value={f.patVorname} onChange={v => set("patVorname", v)} /><Field label="Patient Nachname" value={f.patNachname} onChange={v => set("patNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.patGeburtsdatum} onChange={v => set("patGeburtsdatum", v)} /></div>
        <div style={S.row}><Field label="Arzt Titel" value={f.arztTitel} onChange={v => set("arztTitel", v)} /><Field label="Arzt Vorname" value={f.arztVorname} onChange={v => set("arztVorname", v)} /><Field label="Arzt Nachname" value={f.arztNachname} onChange={v => set("arztNachname", v)} /></div>
        <div style={S.row}><Field label="Straße" value={f.arztStrasse} onChange={v => set("arztStrasse", v)} /><Field label="PLZ" width={80} value={f.arztPLZ} onChange={v => set("arztPLZ", v)} /><Field label="Ort" value={f.arztOrt} onChange={v => set("arztOrt", v)} /></div>
        <Field label="13. Krankheitsbild" value={f.krankheitsbild} onChange={v => set("krankheitsbild", v)} />
        <Field label="Erforderliche Kostform" value={f.kostform} onChange={v => set("kostform", v)} />
        <div style={S.row}><Field label="16. Zeitraum von" type="date" value={f.zeitraumVon} onChange={v => set("zeitraumVon", v)} /><Field label="bis" type="date" value={f.zeitraumBis} onChange={v => set("zeitraumBis", v)} /></div>
        <Signature label="Unterschrift Patient" />
      </div>
    </MusterFormBase>
  );
}
