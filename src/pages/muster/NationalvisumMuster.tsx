import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "nationalvisum-muster-data";
const PDF_URL = "https://videx-national.diplo.de/videx/visum-erfassung/";

const initial = () => ({
  familienname: "", geburtsname: "", vornamen: "", geburtsdatum: "", geburtsort: "", geburtsland: "",
  staatsangehoerigkeit: "", staatsangehoerigkeitGeburt: "", geschlecht: "", familienstand: "",
  passArt: "", passNr: "", passAusgestellt: "", passGueltigBis: "", passBehoerde: "",
  heimAdresse: "", heimTelefon: "", heimEmail: "",
  beruf: "", arbeitgeberAktuell: "",
  zweck: "", aufenthaltsdauer: "", erstesEinreiseDatum: "",
  zielAdresse: "", zielKontakt: "",
  finanzierung: "", krankenversicherung: "",
  bemerkungen: "",
});

export default function NationalvisumMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="nv-root" title="Antrag auf Erteilung eines nationalen Visums (D-Visum)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original online: VIDEX (Auswärtiges Amt) →" footerNote="Originalantrag se popunjava online preko VIDEX portala (videx-national.diplo.de) i predaje na njemačkoj ambasadi • BalkanLink nije državna institucija" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterIntroBlock formKey="nationalvisum" paperId="nv-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Geburtsname" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <Field label="Vornamen" value={f.vornamen} onChange={v => set("vornamen", v)} />
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geschlecht (m/w/d)" value={f.geschlecht} onChange={v => set("geschlecht", v)} /></div>
        <div style={S.row}><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={S.row}><Field label="Aktuelle Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /><Field label="Staatsangehörigkeit bei Geburt" value={f.staatsangehoerigkeitGeburt} onChange={v => set("staatsangehoerigkeitGeburt", v)} /></div>
        <Field label="Familienstand" value={f.familienstand} onChange={v => set("familienstand", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="B. Reisepass" />
        <div style={S.row}><Field label="Passart (gewöhnlich / Diplomat. / Dienst)" value={f.passArt} onChange={v => set("passArt", v)} /><Field label="Pass-Nr." value={f.passNr} onChange={v => set("passNr", v)} /></div>
        <div style={S.row}><Field label="Ausgestellt am" type="date" value={f.passAusgestellt} onChange={v => set("passAusgestellt", v)} /><Field label="Gültig bis" type="date" value={f.passGueltigBis} onChange={v => set("passGueltigBis", v)} /></div>
        <Field label="Ausstellende Behörde" value={f.passBehoerde} onChange={v => set("passBehoerde", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="C. Wohnsitz im Heimatland" />
        <Field label="Anschrift" value={f.heimAdresse} onChange={v => set("heimAdresse", v)} />
        <div style={S.row}><Field label="Telefon" value={f.heimTelefon} onChange={v => set("heimTelefon", v)} /><Field label="E-Mail" value={f.heimEmail} onChange={v => set("heimEmail", v)} /></div>
        <div style={S.row}><Field label="Beruf" value={f.beruf} onChange={v => set("beruf", v)} /><Field label="Aktueller Arbeitgeber" value={f.arbeitgeberAktuell} onChange={v => set("arbeitgeberAktuell", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="D. Reisezweck & Aufenthalt in Deutschland" />
        <Field label="Hauptzweck (Arbeit / Studium / Familienzusammenführung / Ausbildung)" value={f.zweck} onChange={v => set("zweck", v)} />
        <div style={S.row}><Field label="Geplante Aufenthaltsdauer" value={f.aufenthaltsdauer} onChange={v => set("aufenthaltsdauer", v)} /><Field label="Geplantes Einreisedatum" type="date" value={f.erstesEinreiseDatum} onChange={v => set("erstesEinreiseDatum", v)} /></div>
        <Field label="Anschrift in Deutschland" value={f.zielAdresse} onChange={v => set("zielAdresse", v)} />
        <Field label="Kontaktperson in Deutschland" value={f.zielKontakt} onChange={v => set("zielKontakt", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Finanzierung & Versicherung" />
        <Field label="Finanzierung des Aufenthalts (Sperrkonto / Verpflichtungserklärung / Arbeitgeber)" value={f.finanzierung} onChange={v => set("finanzierung", v)} />
        <Field label="Krankenversicherung" value={f.krankenversicherung} onChange={v => set("krankenversicherung", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
