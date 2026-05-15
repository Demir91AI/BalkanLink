import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile } from "@/lib/visa-shared-profile";

const LS_KEY = "visa-work-form1-extras";
const PDF_URL = "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-aufenthaltstitel.pdf";

const DEFAULTS = {
  arbeitgeber: "", arbeitgeberAdresse: "", position: "", taetigkeit: "",
  jahresgehalt: "", monatsgehalt: "", wochenstunden: "",
  vorabzustimmungAA: "", vorabzustimmungDatum: "", anerkennung: "",
  einreiseDatum: "", erstesEinreiseDatum: "",
  westbalkanRegelung: "",
  krankenversicherung: "", krankenversicherungNr: "",
  bemerkungen: "",
};

export default function VisaWorkForm1() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-work-1-root"
      title="Antrag auf Aufenthaltserlaubnis — Beschäftigung (§ 18 AufenthG)"
      subtitle="Musterformular — BalkanLink — auto-fill iz zajedničkog visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (BAMF) →"
      footerNote="Musterformular zur Orientierung • Westbalkan-Regelung (BiH/SR/ME/MK/XK/AL): rad bez priznavanja kvalifikacija (50.000 viza/god). • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <MusterIntroBlock formKey="visawork1" paperId="visa-work-1-root-paper" />
      <VisaSharedSections f={f} set={set as never} />

      <div style={S.sec}>
        <SecHeader num={4} title="D. Beschäftigung" />
        <Field label="Arbeitgeber (Name)" value={f.arbeitgeber} onChange={(v) => set("arbeitgeber", v)} />
        <Field label="Arbeitgeber — Anschrift" value={f.arbeitgeberAdresse} onChange={(v) => set("arbeitgeberAdresse", v)} />
        <div style={S.row}>
          <Field label="Position / Job-Titel" value={f.position} onChange={(v) => set("position", v)} />
          <Field label="Tätigkeit (Beschreibung)" value={f.taetigkeit} onChange={(v) => set("taetigkeit", v)} />
        </div>
        <div style={S.row}>
          <Field label="Brutto-Jahresgehalt (EUR)" value={f.jahresgehalt} onChange={(v) => set("jahresgehalt", v)} />
          <Field label="Brutto-Monatsgehalt (EUR)" value={f.monatsgehalt} onChange={(v) => set("monatsgehalt", v)} />
        </div>
        <Field label="Wochenstunden" value={f.wochenstunden} onChange={(v) => set("wochenstunden", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Vorabzustimmung BA & Anerkennung" />
        <div style={S.row}>
          <Field label="Vorabzustimmung BA — Kundennummer" value={f.vorabzustimmungAA} onChange={(v) => set("vorabzustimmungAA", v)} />
          <Field label="Datum Vorabzustimmung" type="date" value={f.vorabzustimmungDatum} onChange={(v) => set("vorabzustimmungDatum", v)} />
        </div>
        <Field label="Anerkennung der Berufsqualifikation (Status / Anabin-ID)" value={f.anerkennung} onChange={(v) => set("anerkennung", v)} />
        <Field label="Westbalkan-Regelung (§ 26 Abs. 2 BeschV — ja/nein)" value={f.westbalkanRegelung} onChange={(v) => set("westbalkanRegelung", v)} />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>
          Westbalkan: BiH/SR/ME/MK/XK/AL — bez priznavanja kvalifikacija, kontingent 50.000 viza/god, EzB obavezna.
        </p>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Einreise & Versicherung" />
        <div style={S.row}>
          <Field label="Erste Einreise nach DE" type="date" value={f.erstesEinreiseDatum} onChange={(v) => set("erstesEinreiseDatum", v)} />
          <Field label="Geplanter Arbeitsbeginn" type="date" value={f.einreiseDatum} onChange={(v) => set("einreiseDatum", v)} />
        </div>
        <div style={S.row}>
          <Field label="Krankenkasse" value={f.krankenversicherung} onChange={(v) => set("krankenversicherung", v)} />
          <Field label="Versicherten-Nr." value={f.krankenversicherungNr} onChange={(v) => set("krankenversicherungNr", v)} />
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={(v) => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
