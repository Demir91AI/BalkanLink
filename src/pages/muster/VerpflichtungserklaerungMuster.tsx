import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "verpflichtungserklaerung-muster-data";
const PDF_URL = "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/verpflichtungserklaerung.pdf";

const initial = () => ({
  vFamilienname: "", vVornamen: "", vGeburtsdatum: "", vGeburtsort: "", vStaatsangehoerigkeit: "",
  vStrasse: "", vPlz: "", vOrt: "", vBeruf: "", vNettoEinkommen: "",
  vAusweisArt: "", vAusweisNr: "", vAusweisBehoerde: "",
  eFamilienname: "", eVornamen: "", eGeburtsdatum: "", eGeburtsort: "", eStaatsangehoerigkeit: "",
  eStrasse: "", eOrt: "", eVerwandtschaft: "",
  zweck: "", zeitraumVon: "", zeitraumBis: "",
  ortDatum: "",
});

export default function VerpflichtungserklaerungMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ve-root" title="Verpflichtungserklärung — § 68 AufenthG" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original (BAMF) →" footerNote="Originalformular se popunjava i potpisuje pred službenikom Ausländerbehörde-a • BalkanLink nije državna institucija" lsKey={LS_KEY} formularId="verpflichtungserklaerung" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="verpflichtungserklaerung"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#FFFBEB", border: "2px solid #F59E0B", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>🏛️ Verpflichtungserklärung se podnosi LIČNO u Ausländerbehörde</div>
        <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.55 }}>Garantno pismo (Verpflichtungserklärung po § 68 AufenthG) podnosi se lično u nadležnoj Ausländerbehörde uz vlastitu ličnu kartu/pasoš, dokaz o prihodu i Meldebescheinigung. Svaki grad ima vlastiti formular — preuzmi ga sa sajta tvoje Ausländerbehörde. Ovaj vodič objašnjava sva polja i financijsku odgovornost.</div>
      </div>
      <MusterIntroBlock formKey="verpflichtungserklaerung" paperId="ve-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Verpflichtungsgeber (osoba koja garantuje)" />
        <div style={S.row}><Field label="Familienname" value={f.vFamilienname} onChange={v => set("vFamilienname", v)} /><Field label="Vornamen" value={f.vVornamen} onChange={v => set("vVornamen", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.vGeburtsdatum} onChange={v => set("vGeburtsdatum", v)} /><Field label="Geburtsort" value={f.vGeburtsort} onChange={v => set("vGeburtsort", v)} /></div>
        <Field label="Staatsangehörigkeit" value={f.vStaatsangehoerigkeit} onChange={v => set("vStaatsangehoerigkeit", v)} />
        <Field label="Straße / Hausnummer" value={f.vStrasse} onChange={v => set("vStrasse", v)} />
        <div style={S.row}><Field label="PLZ" value={f.vPlz} onChange={v => set("vPlz", v)} /><Field label="Ort" value={f.vOrt} onChange={v => set("vOrt", v)} /></div>
        <div style={S.row}><Field label="Beruf" value={f.vBeruf} onChange={v => set("vBeruf", v)} /><Field label="Netto-Einkommen pro Monat (EUR)" value={f.vNettoEinkommen} onChange={v => set("vNettoEinkommen", v)} /></div>
        <div style={S.row}><Field label="Ausweisart (Personalausweis / Pass)" value={f.vAusweisArt} onChange={v => set("vAusweisArt", v)} /><Field label="Ausweis-Nr." value={f.vAusweisNr} onChange={v => set("vAusweisNr", v)} /></div>
        <Field label="Ausstellende Behörde" value={f.vAusweisBehoerde} onChange={v => set("vAusweisBehoerde", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="B. Eingeladene Person (osoba kojoj se izdaje garancija)" />
        <div style={S.row}><Field label="Familienname" value={f.eFamilienname} onChange={v => set("eFamilienname", v)} /><Field label="Vornamen" value={f.eVornamen} onChange={v => set("eVornamen", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.eGeburtsdatum} onChange={v => set("eGeburtsdatum", v)} /><Field label="Geburtsort" value={f.eGeburtsort} onChange={v => set("eGeburtsort", v)} /></div>
        <Field label="Staatsangehörigkeit" value={f.eStaatsangehoerigkeit} onChange={v => set("eStaatsangehoerigkeit", v)} />
        <Field label="Anschrift im Heimatland" value={f.eStrasse} onChange={v => set("eStrasse", v)} />
        <Field label="Ort / Land" value={f.eOrt} onChange={v => set("eOrt", v)} />
        <Field label="Verwandtschaftsverhältnis (z.B. Ehepartner, Bruder, Freund)" value={f.eVerwandtschaft} onChange={v => set("eVerwandtschaft", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="C. Zweck und Zeitraum" />
        <Field label="Zweck (Besuch / Familiennachzug / Geschäft / Studium)" value={f.zweck} onChange={v => set("zweck", v)} />
        <div style={S.row}><Field label="Von" type="date" value={f.zeitraumVon} onChange={v => set("zeitraumVon", v)} /><Field label="Bis" type="date" value={f.zeitraumBis} onChange={v => set("zeitraumBis", v)} /></div>
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>§ 68 AufenthG: Verpflichtungsgeber snosi sve troškove (Lebensunterhalt, Krankheit, Ausreise) eingeladene Person.</p>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="D. Ort, Datum & Unterschrift" />
        <Field label="Ort, Datum" value={f.ortDatum} onChange={v => set("ortDatum", v)} />
        <Signature label="Unterschrift Verpflichtungsgeber/in (vor der Behörde)" />
      </div>
    </MusterFormBase>
  );
}
