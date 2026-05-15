import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import { buildVisaDatenblatt } from "@/lib/visa-datenblatt-pdf";
import { VISA_DATENBLATT_META } from "@/lib/visa-datenblatt-config";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile, loadVisaProfile } from "@/lib/visa-shared-profile";

const LS_KEY = "visa-permanent-1-extras";
const PDF_URL = "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwAndererStaaten/Aufenthaltstitel/aufenthaltstitel-node.html";

const DEFAULTS = {
  aktBoravisnaDozvola: "", aktDozvolaGueltigBis: "",
  einreiseDatum: "", boravakOd: "",
  arbeitgeber: "", beruf: "", monatsbruttoEinkommen: "",
  rentenversicherungMonate: "",
  sprachzertifikat: "", sprachnivo: "",
  integrationskurs: "", einbuergerungstest: "",
  wohnraumQm: "",
  ehepartnerName: "", kinder: "",
  bemerkungen: "",
};

export default function VisaPermanentForm1() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-perm-1-root"
      title="Antrag auf Niederlassungserlaubnis (§ 9 AufenthG)"
      subtitle="Musterformular — auto-fill iz visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (Ausländerbehörde) →"
      footerNote="Standard: 5 god. boravka, B1 njemački, 60 mj. penz. osig., dovoljan stambeni prostor • Blue Card: skraćeno na 21/33 mj. • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <MusterIntroBlock
        formKey="visapermanent1"
        paperId="visa-perm-1-root-paper"
        datenblatt={{
          fileName: VISA_DATENBLATT_META.visaPermanent1.fileName,
          reasonNote: VISA_DATENBLATT_META.visaPermanent1.reasonNote,
          build: async () => {
            const meta = VISA_DATENBLATT_META.visaPermanent1;
            return buildVisaDatenblatt({
              formTitle: meta.formTitle,
              formSubtitle: meta.formSubtitle,
              reasonNote: meta.reasonNote,
              usageNote: meta.usageNote,
              officialPdfUrl: meta.officialPdfUrl,
              officialPdfLabel: meta.officialPdfLabel,
              profile: loadVisaProfile(),
              sections: meta.mapExtras(f as unknown as Record<string, string>),
            });
          },
        }}
      />
      <VisaSharedSections f={f} set={set as never} />

      <div style={S.sec}>
        <SecHeader num={4} title="D. Aktuelle Aufenthaltserlaubnis" />
        <div style={S.row}>
          <Field label="Aktueller Titel (Art)" value={f.aktBoravisnaDozvola} onChange={(v) => set("aktBoravisnaDozvola", v)} />
          <Field label="Gültig bis" type="date" value={f.aktDozvolaGueltigBis} onChange={(v) => set("aktDozvolaGueltigBis", v)} />
        </div>
        <div style={S.row}>
          <Field label="Erste Einreise nach DE" type="date" value={f.einreiseDatum} onChange={(v) => set("einreiseDatum", v)} />
          <Field label="Ununterbrochener Aufenthalt seit" type="date" value={f.boravakOd} onChange={(v) => set("boravakOd", v)} />
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Beschäftigung & Lebensunterhalt" />
        <div style={S.row}>
          <Field label="Arbeitgeber" value={f.arbeitgeber} onChange={(v) => set("arbeitgeber", v)} />
          <Field label="Beruf / Position" value={f.beruf} onChange={(v) => set("beruf", v)} />
        </div>
        <Field label="Monatliches Brutto-Einkommen (EUR)" value={f.monatsbruttoEinkommen} onChange={(v) => set("monatsbruttoEinkommen", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Voraussetzungen (§ 9)" />
        <Field label="Beiträge zur Rentenversicherung — Monate (min. 60)" value={f.rentenversicherungMonate} onChange={(v) => set("rentenversicherungMonate", v)} />
        <div style={S.row}>
          <Field label="Sprachzertifikat (Goethe / telc / ÖSD)" value={f.sprachzertifikat} onChange={(v) => set("sprachzertifikat", v)} />
          <Field label="Niveau (min. B1)" value={f.sprachnivo} onChange={(v) => set("sprachnivo", v)} />
        </div>
        <div style={S.row}>
          <Field label="Integrationskurs absolviert?" value={f.integrationskurs} onChange={(v) => set("integrationskurs", v)} />
          <Field label="Einbürgerungstest bestanden?" value={f.einbuergerungstest} onChange={(v) => set("einbuergerungstest", v)} />
        </div>
        <Field label="Wohnungsgröße (m²)" value={f.wohnraumQm} onChange={(v) => set("wohnraumQm", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Familie" />
        <Field label="Ehepartner/in (Name)" value={f.ehepartnerName} onChange={(v) => set("ehepartnerName", v)} />
        <Field label="Kinder (Namen, Geburtsdaten)" value={f.kinder} onChange={(v) => set("kinder", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="H. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={(v) => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
