import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import { buildAufenthaltstitelPdf } from "@/lib/pdf-recon/forms/aufenthaltstitel";
import { buildVisaDatenblatt } from "@/lib/visa-datenblatt-pdf";
import { VISA_DATENBLATT_META } from "@/lib/visa-datenblatt-config";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import VisaSharedSections from "./VisaSharedSections";
import { loadFormState, saveFormState, resetVisaProfile, loadVisaProfile } from "@/lib/visa-shared-profile";

const LS_KEY = "visa-bluecard-extras";
const PDF_URL = "https://www.bamf.de/SharedDocs/Anlagen/DE/AufenthaltAsyl/Aufenthaltstitel/antrag-blaue-karte-eu.pdf";

const DEFAULTS = {
  hochschulabschluss: "", studienfach: "", abschlussJahr: "", hochschuleName: "",
  anabinId: "", anerkennungArt: "", zabBescheinigung: "",
  arbeitgeber: "", arbeitgeberAdresse: "", taetigkeit: "",
  jahresgehalt: "", monatsgehalt: "", mangelberuf: "",
  vertragsbeginn: "", vertragsdauer: "",
  itBerufErfahrungJahre: "",
  krankenversicherung: "",
  bemerkungen: "",
};

export default function VisaBluecardForm() {
  const [f, setF] = useState(() => loadFormState(LS_KEY, DEFAULTS));
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <MusterFormBase
      rootId="visa-bluecard-root"
      title="Antrag auf Blaue Karte EU (§ 18g AufenthG)"
      subtitle="Musterformular — auto-fill iz visa profila"
      pdfUrl={PDF_URL}
      pdfLabel="Original (BAMF / Ausländerbehörde) →"
      footerNote="Min. 2026: 45.300 €/god (standard) ili 41.041,80 €/god (Mangelberufe: IT, MINT, medicina, njega) • IT bez diplome: 3+ god. iskustva • BalkanLink nije državna institucija"
      lsKey={LS_KEY}
      data={f}
      onSave={() => saveFormState(LS_KEY, f)}
      onReset={() => { localStorage.removeItem(LS_KEY); resetVisaProfile(); setF(loadFormState(LS_KEY, DEFAULTS)); }}
    >
      <MusterIntroBlock
        formKey="visabluecard"
        paperId="visa-bluecard-root-paper"
        datenblatt={{
          fileName: VISA_DATENBLATT_META.visaBluecard.fileName,
          reasonNote: VISA_DATENBLATT_META.visaBluecard.reasonNote,
          build: async () => {
            const meta = VISA_DATENBLATT_META.visaBluecard;
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
        originalRecon={{
          fileName: "BalkanLink-BlaueKarteEU-1zu1.pdf",
          build: async () => buildAufenthaltstitelPdf({
            profile: loadVisaProfile(),
            zweck: "Blaue Karte EU (§ 18g AufenthG)",
            arbeitgeber: f.arbeitgeber,
            krankenversicherung: f.krankenversicherung,
            bemerkungen: [f.taetigkeit, f.mangelberuf ? `Mangelberuf: ${f.mangelberuf}` : "", f.bemerkungen].filter(Boolean).join(" · "),
          }),
        }}
      />
      <VisaSharedSections f={f} set={set as never} />

      <div style={S.sec}>
        <SecHeader num={4} title="D. Hochschulabschluss / IT-Erfahrung" />
        <div style={S.row}>
          <Field label="Hochschulabschluss (Bachelor/Master/PhD)" value={f.hochschulabschluss} onChange={(v) => set("hochschulabschluss", v)} />
          <Field label="Studienfach" value={f.studienfach} onChange={(v) => set("studienfach", v)} />
        </div>
        <div style={S.row}>
          <Field label="Abschlussjahr" value={f.abschlussJahr} onChange={(v) => set("abschlussJahr", v)} />
          <Field label="Hochschule (Name, Land)" value={f.hochschuleName} onChange={(v) => set("hochschuleName", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anabin-ID / H+" value={f.anabinId} onChange={(v) => set("anabinId", v)} />
          <Field label="Anerkennungsart (Anabin / ZAB)" value={f.anerkennungArt} onChange={(v) => set("anerkennungArt", v)} />
        </div>
        <Field label="ZAB-Bescheinigung Nr. (falls vorhanden)" value={f.zabBescheinigung} onChange={(v) => set("zabBescheinigung", v)} />
        <Field label="IT-Berufserfahrung — Jahre (nur ohne Diplom)" value={f.itBerufErfahrungJahre} onChange={(v) => set("itBerufErfahrungJahre", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="E. Arbeitgeber & Vertrag" />
        <Field label="Arbeitgeber" value={f.arbeitgeber} onChange={(v) => set("arbeitgeber", v)} />
        <Field label="Arbeitgeber-Adresse" value={f.arbeitgeberAdresse} onChange={(v) => set("arbeitgeberAdresse", v)} />
        <Field label="Tätigkeit (Position)" value={f.taetigkeit} onChange={(v) => set("taetigkeit", v)} />
        <div style={S.row}>
          <Field label="Brutto-Jahresgehalt (EUR)" value={f.jahresgehalt} onChange={(v) => set("jahresgehalt", v)} />
          <Field label="Brutto-Monatsgehalt (EUR)" value={f.monatsgehalt} onChange={(v) => set("monatsgehalt", v)} />
        </div>
        <Field label="Mangelberuf? (ja/nein — IT, MINT, Medizin, Pflege)" value={f.mangelberuf} onChange={(v) => set("mangelberuf", v)} />
        <div style={S.row}>
          <Field label="Vertragsbeginn" type="date" value={f.vertragsbeginn} onChange={(v) => set("vertragsbeginn", v)} />
          <Field label="Vertragsdauer (Monate)" value={f.vertragsdauer} onChange={(v) => set("vertragsdauer", v)} />
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="F. Krankenversicherung" />
        <Field label="Krankenkasse" value={f.krankenversicherung} onChange={(v) => set("krankenversicherung", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="G. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={(v) => set("bemerkungen", v)} />
        <Signature label="Unterschrift Antragsteller/in" />
      </div>
    </MusterFormBase>
  );
}
