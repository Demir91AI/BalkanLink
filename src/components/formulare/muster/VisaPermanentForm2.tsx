import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile } from "@/lib/visa-shared-profile";

const LS_KEY = "visa-permanent-2-extras";
const PDF_URL = "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html";

const DEFAULTS = {
  aktBoravisnaDozvola: "", aktDozvolaGueltigBis: "",
  einreiseDatum: "", boravakOd: "", langfristigeBeschaeftigung: "",
  arbeitgeber: "", beruf: "", monatsbruttoEinkommen: "",
  rentenversicherungMonate: "",
  sprachzertifikat: "", sprachnivo: "",
  euBlaueKarte: "", abwesenheitenEU: "",
  krankenversicherungArt: "",
  bemerkungen: "",
};

export default function VisaPermanentForm2() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-perm-2-root"
      title="Erlaubnis zum Daueraufenthalt-EU (§ 9a AufenthG)"
      subtitle="Musterformular — auto-fill iz visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (BAMF / Ausländerbehörde) →"
      footerNote="Daueraufenthalt-EU: 5 god. legalnog boravka u EU, B1 njemački, dovoljan prihod, krankenversicherung • Mobilnost u drugim EU državama • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <VisaSharedSections f={f} set={set as never} />

      <div style={S.sec}>
        <SecHeader num={4} title="D. Aktuelle Aufenthaltserlaubnis" />
        <div style={S.row}>
          <Field label="Aktueller Titel (Art)" value={f.aktBoravisnaDozvola} onChange={(v) => set("aktBoravisnaDozvola", v)} />
          <Field label="Gültig bis" type="date" value={f.aktDozvolaGueltigBis} onChange={(v) => set("aktDozvolaGueltigBis", v)} />
        </div>
        <div style={S.row}>
          <Field label="Erste Einreise nach DE/EU" type="date" value={f.einreiseDatum} onChange={(v) => set("einreiseDatum", v)} />
          <Field label="Ununterbrochener Aufenthalt seit" type="date" value={f.boravakOd} onChange={(v) => set("boravakOd", v)} />
        </div>
        <Field label="Langfristige Beschäftigung (Art, Jahre)" value={f.langfristigeBeschaeftigung} onChange={(v) => set("langfristigeBeschaeftigung", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Beschäftigung & Lebensunterhalt" />
        <div style={S.row}>
          <Field label="Arbeitgeber" value={f.arbeitgeber} onChange={(v) => set("arbeitgeber", v)} />
          <Field label="Beruf / Position" value={f.beruf} onChange={(v) => set("beruf", v)} />
        </div>
        <Field label="Monatliches Brutto-Einkommen (EUR)" value={f.monatsbruttoEinkommen} onChange={(v) => set("monatsbruttoEinkommen", v)} />
        <Field label="Beiträge zur Rentenversicherung — Monate (min. 60)" value={f.rentenversicherungMonate} onChange={(v) => set("rentenversicherungMonate", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Sprache & EU-Mobilität" />
        <div style={S.row}>
          <Field label="Sprachzertifikat" value={f.sprachzertifikat} onChange={(v) => set("sprachzertifikat", v)} />
          <Field label="Niveau (min. B1)" value={f.sprachnivo} onChange={(v) => set("sprachnivo", v)} />
        </div>
        <Field label="EU Blue Card vorher? (ja/nein, Land)" value={f.euBlaueKarte} onChange={(v) => set("euBlaueKarte", v)} />
        <Field label="Abwesenheiten aus EU > 6 Monate (Daten)" value={f.abwesenheitenEU} onChange={(v) => set("abwesenheitenEU", v)} />
        <Field label="Krankenversicherung — Art (GKV/PKV, Name)" value={f.krankenversicherungArt} onChange={(v) => set("krankenversicherungArt", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={(v) => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
