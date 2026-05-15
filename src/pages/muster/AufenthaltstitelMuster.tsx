import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "aufenthaltstitel-muster-data";
const PDF_URL = "https://service.berlin.de/dienstleistung/305249/";

const initial = () => ({
  familienname: "", geburtsname: "", vornamen: "", geburtsdatum: "", geburtsort: "", geburtsland: "",
  staatsangehoerigkeit: "", geschlecht: "", familienstand: "",
  passNr: "", passBehoerde: "", passAusgestellt: "", passGueltigBis: "",
  strasse: "", plz: "", ort: "",
  einreiseDatum: "", einreiseGrund: "",
  zweck: "", arbeitgeber: "", schule: "",
  krankenversicherung: "", krankenversicherungNr: "",
  bemerkungen: "",
});

export default function AufenthaltstitelMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="at-root" title="Antrag auf Erteilung eines Aufenthaltstitels" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original (Ausländerbehörde) →" footerNote="Musterformular zur Orientierung • Originalantrag se predaje na Ausländerbehörde • BalkanLink nije državna institucija" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterIntroBlock formKey="aufenthaltstitel" paperId="at-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Geburtsname" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Vornamen" value={f.vornamen} onChange={v => set("vornamen", v)} /><Field label="Geschlecht (m/w/d)" value={f.geschlecht} onChange={v => set("geschlecht", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Familienstand" value={f.familienstand} onChange={v => set("familienstand", v)} /></div>
        <div style={S.row}><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <Field label="Staatsangehörigkeit (Državljanstvo)" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="B. Pass / Reisedokument" />
        <div style={S.row}><Field label="Pass-Nr." value={f.passNr} onChange={v => set("passNr", v)} /><Field label="Ausstellende Behörde" value={f.passBehoerde} onChange={v => set("passBehoerde", v)} /></div>
        <div style={S.row}><Field label="Ausgestellt am" type="date" value={f.passAusgestellt} onChange={v => set("passAusgestellt", v)} /><Field label="Gültig bis" type="date" value={f.passGueltigBis} onChange={v => set("passGueltigBis", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="C. Anschrift in Deutschland" />
        <Field label="Straße / Hausnummer" value={f.strasse} onChange={v => set("strasse", v)} />
        <div style={S.row}><Field label="PLZ" value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="D. Einreise & Aufenthaltszweck" />
        <div style={S.row}><Field label="Einreisedatum" type="date" value={f.einreiseDatum} onChange={v => set("einreiseDatum", v)} /><Field label="Einreisegrund" value={f.einreiseGrund} onChange={v => set("einreiseGrund", v)} /></div>
        <Field label="Zweck des Aufenthalts (Arbeit / Studium / Familie / ...)" value={f.zweck} onChange={v => set("zweck", v)} />
        <div style={S.row}><Field label="Arbeitgeber (falls Arbeit)" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /><Field label="Hochschule / Schule (falls Studium)" value={f.schule} onChange={v => set("schule", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Krankenversicherung" />
        <div style={S.row}><Field label="Krankenkasse" value={f.krankenversicherung} onChange={v => set("krankenversicherung", v)} /><Field label="Versicherten-Nr." value={f.krankenversicherungNr} onChange={v => set("krankenversicherungNr", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
