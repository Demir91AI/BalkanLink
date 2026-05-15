import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import { buildVisaDatenblatt } from "@/lib/visa-datenblatt-pdf";
import { VISA_DATENBLATT_META } from "@/lib/visa-datenblatt-config";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile, loadVisaProfile } from "@/lib/visa-shared-profile";

const LS_KEY = "visa-work-form2-extras";
const PDF_URL = "https://www.arbeitsagentur.de/datei/erklaerung-zum-beschaeftigungsverhaeltnis_ba017345.pdf";

const DEFAULTS = {
  agName: "", agAdresse: "", agAnsprechpartner: "", agTelefon: "", agEmail: "",
  branche: "", betriebsgroesse: "",
  taetigkeit: "", arbeitsort: "",
  vertragsbeginn: "", vertragsende: "", befristet: "",
  wochenstunden: "", schichtarbeit: "",
  bruttoMonat: "", bruttoStunde: "", urlaubstage: "",
  tarifvertrag: "",
  ortDatum: "",
};

export default function VisaWorkForm2() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-work-2-root"
      title="Erklärung zum Beschäftigungsverhältnis (EzB) — § 39 AufenthG"
      subtitle="Musterformular — popunjava POSLODAVAC u Njemačkoj — auto-fill iz visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (Bundesagentur für Arbeit) →"
      footerNote="Ovaj formular popunjava i potpisuje POSLODAVAC, ne podnosilac vize • EzB se predaje uz zahtjev za vizu • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <MusterIntroBlock
        formKey="visawork2"
        paperId="visa-work-2-root-paper"
        datenblatt={{
          fileName: VISA_DATENBLATT_META.visaWork2.fileName,
          reasonNote: VISA_DATENBLATT_META.visaWork2.reasonNote,
          build: async () => {
            const meta = VISA_DATENBLATT_META.visaWork2;
            return buildVisaDatenblatt({
              formTitle: meta.formTitle,
              formSubtitle: meta.formSubtitle,
              reasonNote: meta.reasonNote,
              usageNote: meta.usageNote,
              officialPdfUrl: meta.officialPdfUrl,
              officialPdfLabel: meta.officialPdfLabel,
              profile: loadVisaProfile(),
              sections: meta.mapExtras(f as Record<string, string>),
            });
          },
        }}
      />
      <VisaSharedSections f={f} set={set as never} />

      <div style={S.sec}>
        <SecHeader num={4} title="D. Arbeitgeber (popunjava poslodavac)" />
        <Field label="Firma / Arbeitgeber-Name" value={f.agName} onChange={(v) => set("agName", v)} />
        <Field label="Anschrift Arbeitgeber" value={f.agAdresse} onChange={(v) => set("agAdresse", v)} />
        <div style={S.row}>
          <Field label="Ansprechpartner" value={f.agAnsprechpartner} onChange={(v) => set("agAnsprechpartner", v)} />
          <Field label="Telefon" value={f.agTelefon} onChange={(v) => set("agTelefon", v)} />
        </div>
        <Field label="E-Mail" value={f.agEmail} onChange={(v) => set("agEmail", v)} />
        <div style={S.row}>
          <Field label="Branche" value={f.branche} onChange={(v) => set("branche", v)} />
          <Field label="Betriebsgröße (Mitarbeiter)" value={f.betriebsgroesse} onChange={(v) => set("betriebsgroesse", v)} />
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Tätigkeit & Arbeitsort" />
        <Field label="Bezeichnung der Tätigkeit" value={f.taetigkeit} onChange={(v) => set("taetigkeit", v)} />
        <Field label="Arbeitsort (Ort, ggf. Adresse)" value={f.arbeitsort} onChange={(v) => set("arbeitsort", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Arbeitsverhältnis" />
        <div style={S.row}>
          <Field label="Vertragsbeginn" type="date" value={f.vertragsbeginn} onChange={(v) => set("vertragsbeginn", v)} />
          <Field label="Vertragsende (falls befristet)" type="date" value={f.vertragsende} onChange={(v) => set("vertragsende", v)} />
        </div>
        <div style={S.row}>
          <Field label="Befristet (ja/nein)" value={f.befristet} onChange={(v) => set("befristet", v)} />
          <Field label="Wochenstunden" value={f.wochenstunden} onChange={(v) => set("wochenstunden", v)} />
        </div>
        <Field label="Schichtarbeit (ja/nein)" value={f.schichtarbeit} onChange={(v) => set("schichtarbeit", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Vergütung" />
        <div style={S.row}>
          <Field label="Brutto-Monatsgehalt (EUR)" value={f.bruttoMonat} onChange={(v) => set("bruttoMonat", v)} />
          <Field label="Brutto-Stundenlohn (EUR)" value={f.bruttoStunde} onChange={(v) => set("bruttoStunde", v)} />
        </div>
        <div style={S.row}>
          <Field label="Urlaubstage / Jahr" value={f.urlaubstage} onChange={(v) => set("urlaubstage", v)} />
          <Field label="Tarifvertrag (Name oder 'kein')" value={f.tarifvertrag} onChange={(v) => set("tarifvertrag", v)} />
        </div>
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>Mindestlohn 2026: 12,82 €/h. Ispod toga BA odbija vorabzustimmung.</p>
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="H. Ort, Datum & Unterschrift Arbeitgeber" />
        <Field label="Ort, Datum" value={f.ortDatum} onChange={(v) => set("ortDatum", v)} />
        <Signature label="Unterschrift & Stempel Arbeitgeber" />
      </div>
    </MusterFormBase>
  );
}
