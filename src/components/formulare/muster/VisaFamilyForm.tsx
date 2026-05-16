import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import { buildVisaDatenblatt } from "@/lib/visa-datenblatt-pdf";
import { VISA_DATENBLATT_META } from "@/lib/visa-datenblatt-config";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile, loadVisaProfile } from "@/lib/visa-shared-profile";

const LS_KEY = "visa-family-extras";
const PDF_URL = "https://service.berlin.de/dienstleistung/305249/";

const DEFAULTS = {
  bezugspersonName: "", bezugspersonGeburtsdatum: "", bezugspersonStaat: "",
  bezugspersonAufenthaltsart: "", bezugspersonAufenthaltGueltigBis: "",
  bezugspersonAdresseDE: "",
  verwandtschaft: "", heiratsdatum: "", heiratsort: "",
  a1Zertifikat: "", a1Datum: "", a1Institut: "",
  kinder: "",
  wohnraumQm: "", anzahlPersonen: "",
  lebensunterhaltNachweis: "",
  bemerkungen: "",
};

export default function VisaFamilyForm() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-family-root"
      title="Antrag auf Aufenthaltserlaubnis — Familiennachzug (§§ 27–36 AufenthG)"
      subtitle="Musterformular — auto-fill iz visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (BAMF) →"
      footerNote="A1 njemački OBAVEZAN za supružnike (izuzetak: Blue Card, djeca <16) • Wohnraum min. 12 m² po osobi • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <MusterIntroBlock
        formKey="visafamily"
        paperId="visa-family-root-paper"
        datenblatt={{
          fileName: VISA_DATENBLATT_META.visaFamily.fileName,
          reasonNote: VISA_DATENBLATT_META.visaFamily.reasonNote,
          build: async () => {
            const meta = VISA_DATENBLATT_META.visaFamily;
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
        <SecHeader num={4} title="D. Bezugsperson in Deutschland (osoba kojoj se priključujete)" />
        <Field label="Familienname & Vornamen" value={f.bezugspersonName} onChange={(v) => set("bezugspersonName", v)} />
        <div style={S.row}>
          <Field label="Geburtsdatum" type="date" value={f.bezugspersonGeburtsdatum} onChange={(v) => set("bezugspersonGeburtsdatum", v)} />
          <Field label="Staatsangehörigkeit" value={f.bezugspersonStaat} onChange={(v) => set("bezugspersonStaat", v)} />
        </div>
        <div style={S.row}>
          <Field label="Aufenthaltstitel (Art)" value={f.bezugspersonAufenthaltsart} onChange={(v) => set("bezugspersonAufenthaltsart", v)} />
          <Field label="Gültig bis" type="date" value={f.bezugspersonAufenthaltGueltigBis} onChange={(v) => set("bezugspersonAufenthaltGueltigBis", v)} />
        </div>
        <Field label="Anschrift in Deutschland" value={f.bezugspersonAdresseDE} onChange={(v) => set("bezugspersonAdresseDE", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Verwandtschaft & Ehe" />
        <Field label="Verwandtschaftsverhältnis (Ehepartner / Kind / Elternteil)" value={f.verwandtschaft} onChange={(v) => set("verwandtschaft", v)} />
        <div style={S.row}>
          <Field label="Heiratsdatum" type="date" value={f.heiratsdatum} onChange={(v) => set("heiratsdatum", v)} />
          <Field label="Heiratsort" value={f.heiratsort} onChange={(v) => set("heiratsort", v)} />
        </div>
        <Field label="Kinder (Namen, Geburtsdaten)" value={f.kinder} onChange={(v) => set("kinder", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Sprachnachweis A1 (§ 30 AufenthG)" />
        <div style={S.row}>
          <Field label="A1-Zertifikat (Goethe / telc / ÖSD)" value={f.a1Zertifikat} onChange={(v) => set("a1Zertifikat", v)} />
          <Field label="Prüfungsdatum" type="date" value={f.a1Datum} onChange={(v) => set("a1Datum", v)} />
        </div>
        <Field label="Prüfungsinstitut (Goethe Sarajevo / Mostar / ...)" value={f.a1Institut} onChange={(v) => set("a1Institut", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Wohnraum & Lebensunterhalt" />
        <div style={S.row}>
          <Field label="Wohnungsgröße (m²)" value={f.wohnraumQm} onChange={(v) => set("wohnraumQm", v)} />
          <Field label="Anzahl Personen im Haushalt" value={f.anzahlPersonen} onChange={(v) => set("anzahlPersonen", v)} />
        </div>
        <Field label="Nachweis Lebensunterhalt (Gehalt / Verpflichtungserklärung)" value={f.lebensunterhaltNachweis} onChange={(v) => set("lebensunterhaltNachweis", v)} />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>Min. 12 m² po odrasloj osobi, 10 m² po djetetu.</p>
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="H. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={(v) => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
