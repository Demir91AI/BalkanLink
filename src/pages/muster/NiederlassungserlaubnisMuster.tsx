import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "niederlassungserlaubnis-muster-data";
const PDF_URL = "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwAndererStaaten/Aufenthaltstitel/aufenthaltstitel-node.html";

const initial = () => ({
  familienname: "", vornamen: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  passNr: "", passGueltigBis: "", aktBoravisnaDozvola: "", aktDozvolaGueltigBis: "",
  strasse: "", plz: "", ort: "",
  einreiseDatum: "", boravakOd: "",
  arbeitgeber: "", beruf: "", monatsbruttoEinkommen: "",
  rentenversicherungMonate: "", sprachzertifikat: "", integrationskurs: "",
  ehepartnerName: "", kinder: "",
  bemerkungen: "",
});

export default function NiederlassungserlaubnisMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="nl-root" title="Antrag auf Niederlassungserlaubnis (§ 9 AufenthG)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Originalantrag (Ausländerbehörde) →" footerNote="Originalformular ovisi o Bundeslandu i predaje se na Ausländerbehörde • BalkanLink nije državna institucija" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterIntroBlock formKey="niederlassungserlaubnis" paperId="nl-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vornamen" value={f.vornamen} onChange={v => set("vornamen", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="B. Pass & aktuelle Aufenthaltserlaubnis" />
        <div style={S.row}><Field label="Pass-Nr." value={f.passNr} onChange={v => set("passNr", v)} /><Field label="Pass gültig bis" type="date" value={f.passGueltigBis} onChange={v => set("passGueltigBis", v)} /></div>
        <div style={S.row}><Field label="Aktuelle Aufenthaltserlaubnis (Art)" value={f.aktBoravisnaDozvola} onChange={v => set("aktBoravisnaDozvola", v)} /><Field label="Gültig bis" type="date" value={f.aktDozvolaGueltigBis} onChange={v => set("aktDozvolaGueltigBis", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="C. Anschrift" />
        <Field label="Straße / Hausnummer" value={f.strasse} onChange={v => set("strasse", v)} />
        <div style={S.row}><Field label="PLZ" value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Erste Einreise nach DE" type="date" value={f.einreiseDatum} onChange={v => set("einreiseDatum", v)} /><Field label="Ununterbrochener Aufenthalt seit" type="date" value={f.boravakOd} onChange={v => set("boravakOd", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="D. Beschäftigung & Lebensunterhalt" />
        <div style={S.row}><Field label="Arbeitgeber" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /><Field label="Beruf / Position" value={f.beruf} onChange={v => set("beruf", v)} /></div>
        <Field label="Monatliches Brutto-Einkommen (EUR)" value={f.monatsbruttoEinkommen} onChange={v => set("monatsbruttoEinkommen", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Voraussetzungen (§ 9 AufenthG)" />
        <Field label="Beiträge zur Rentenversicherung — Anzahl Monate (min. 60)" value={f.rentenversicherungMonate} onChange={v => set("rentenversicherungMonate", v)} />
        <Field label="Sprachzertifikat (B1 / höher)" value={f.sprachzertifikat} onChange={v => set("sprachzertifikat", v)} />
        <Field label="Integrationskurs / Einbürgerungstest absolviert?" value={f.integrationskurs} onChange={v => set("integrationskurs", v)} />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>Standard: 5 godina boravka, B1 njemački, 60 mj. penzijskog osiguranja, dovoljan stambeni prostor, bez kaznene evidencije.</p>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Familie" />
        <Field label="Ehepartner/in (Name)" value={f.ehepartnerName} onChange={v => set("ehepartnerName", v)} />
        <Field label="Kinder (Namen, Geburtsdaten)" value={f.kinder} onChange={v => set("kinder", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
