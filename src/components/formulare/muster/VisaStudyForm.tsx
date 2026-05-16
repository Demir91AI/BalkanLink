import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import { buildVisaDatenblatt } from "@/lib/visa-datenblatt-pdf";
import { VISA_DATENBLATT_META } from "@/lib/visa-datenblatt-config";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile, loadVisaProfile } from "@/lib/visa-shared-profile";
import VisaTerminBar from "@/components/visaNavigator/VisaTerminBar";
import { makeMappeBuilder, getMappeFileName } from "@/lib/visa-mappe-builder";

const LS_KEY = "visa-study-extras";
const PDF_URL = "https://service.berlin.de/dienstleistung/305249/";

const DEFAULTS = {
  hochschule: "", studiengang: "", abschlussZiel: "",
  zulassungsbescheidNr: "", zulassungsbescheidDatum: "", semesterStart: "",
  studienkolleg: "",
  sperrkontoBank: "", sperrkontoIban: "", sperrkontoBetrag: "",
  stipendium: "", verpflichtungserklaerung: "",
  sprachzertifikat: "", sprachnivo: "", sprachDatum: "",
  vorbildung: "",
  krankenversicherung: "",
  bemerkungen: "",
};

export default function VisaStudyForm() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-study-root"
      title="Antrag auf Aufenthaltserlaubnis — Studium (§ 16b AufenthG)"
      subtitle="Musterformular — auto-fill iz visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (BAMF) →"
      footerNote="Sperrkonto 2026: ~11.904 €/god (992 €/mj) • Studienkolleg moguć ako diploma nije H+ • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <MusterIntroBlock
        formKey="visastudy"
        paperId="visa-study-root-paper"
        datenblatt={{
          fileName: VISA_DATENBLATT_META.visaStudy.fileName,
          reasonNote: VISA_DATENBLATT_META.visaStudy.reasonNote,
          build: async () => {
            const meta = VISA_DATENBLATT_META.visaStudy;
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
        <SecHeader num={4} title="D. Hochschule & Studium" />
        <Field label="Hochschule (Name)" value={f.hochschule} onChange={(v) => set("hochschule", v)} />
        <div style={S.row}>
          <Field label="Studiengang" value={f.studiengang} onChange={(v) => set("studiengang", v)} />
          <Field label="Abschluss (Bachelor / Master / PhD)" value={f.abschlussZiel} onChange={(v) => set("abschlussZiel", v)} />
        </div>
        <div style={S.row}>
          <Field label="Zulassungsbescheid-Nr." value={f.zulassungsbescheidNr} onChange={(v) => set("zulassungsbescheidNr", v)} />
          <Field label="Zulassung am" type="date" value={f.zulassungsbescheidDatum} onChange={(v) => set("zulassungsbescheidDatum", v)} />
        </div>
        <div style={S.row}>
          <Field label="Semesterbeginn" type="date" value={f.semesterStart} onChange={(v) => set("semesterStart", v)} />
          <Field label="Studienkolleg (ja/nein, welcher Kurs)" value={f.studienkolleg} onChange={(v) => set("studienkolleg", v)} />
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Finanzierung" />
        <div style={S.row}>
          <Field label="Sperrkonto — Bank (z.B. Expatrio, Fintiba, Coracle)" value={f.sperrkontoBank} onChange={(v) => set("sperrkontoBank", v)} />
          <Field label="IBAN" value={f.sperrkontoIban} onChange={(v) => set("sperrkontoIban", v)} />
        </div>
        <div style={S.row}>
          <Field label="Sperrkonto-Betrag (EUR)" value={f.sperrkontoBetrag} onChange={(v) => set("sperrkontoBetrag", v)} />
          <Field label="Stipendium (Name, Betrag)" value={f.stipendium} onChange={(v) => set("stipendium", v)} />
        </div>
        <Field label="Verpflichtungserklärung — Garant (Name, Adresse)" value={f.verpflichtungserklaerung} onChange={(v) => set("verpflichtungserklaerung", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Sprachnachweis & Vorbildung" />
        <div style={S.row}>
          <Field label="Sprachzertifikat (TestDaF / DSH / IELTS / TOEFL)" value={f.sprachzertifikat} onChange={(v) => set("sprachzertifikat", v)} />
          <Field label="Niveau (B2 / C1)" value={f.sprachnivo} onChange={(v) => set("sprachnivo", v)} />
        </div>
        <Field label="Prüfungsdatum" type="date" value={f.sprachDatum} onChange={(v) => set("sprachDatum", v)} />
        <Field label="Vorbildung (Schulzeugnisse, Abitur)" value={f.vorbildung} onChange={(v) => set("vorbildung", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Krankenversicherung" />
        <Field label="Krankenkasse (TK / AOK / Barmer / Mawista / ...)" value={f.krankenversicherung} onChange={(v) => set("krankenversicherung", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="H. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={(v) => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
