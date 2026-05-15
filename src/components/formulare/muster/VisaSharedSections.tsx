import { S, Field, SecHeader } from "@/components/muster/MusterFormBase";
import type { VisaSharedProfile } from "@/lib/visa-shared-profile";

interface Props {
  f: VisaSharedProfile;
  set: (k: keyof VisaSharedProfile, v: string) => void;
  startNum?: number;
}

/**
 * Tri zajedničke sekcije (Person, Pass, Adresa) za sve visa Musterformulare.
 * Auto-fill iz shared profila preko `loadFormState`.
 */
export default function VisaSharedSections({ f, set, startNum = 1 }: Props) {
  return (
    <>
      <div style={S.sec}>
        <SecHeader num={startNum} title="A. Persönliche Daten" />
        <div style={S.row}>
          <Field label="Familienname" value={f.familienname} onChange={(v) => set("familienname", v)} />
          <Field label="Geburtsname (falls abweichend)" value={f.geburtsname} onChange={(v) => set("geburtsname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Vornamen" value={f.vornamen} onChange={(v) => set("vornamen", v)} />
          <Field label="Geschlecht (m/w/d)" value={f.geschlecht} onChange={(v) => set("geschlecht", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={(v) => set("geburtsdatum", v)} />
          <Field label="Familienstand" value={f.familienstand} onChange={(v) => set("familienstand", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsort" value={f.geburtsort} onChange={(v) => set("geburtsort", v)} />
          <Field label="Geburtsland" value={f.geburtsland} onChange={(v) => set("geburtsland", v)} />
        </div>
        <Field label="Staatsangehörigkeit (Državljanstvo)" value={f.staatsangehoerigkeit} onChange={(v) => set("staatsangehoerigkeit", v)} />
      </div>

      <div style={S.sec}>
        <SecHeader num={startNum + 1} title="B. Reisepass" />
        <div style={S.row}>
          <Field label="Pass-Nr." value={f.passNr} onChange={(v) => set("passNr", v)} />
          <Field label="Ausstellende Behörde" value={f.passBehoerde} onChange={(v) => set("passBehoerde", v)} />
        </div>
        <div style={S.row}>
          <Field label="Ausgestellt am" type="date" value={f.passAusgestellt} onChange={(v) => set("passAusgestellt", v)} />
          <Field label="Gültig bis" type="date" value={f.passGueltigBis} onChange={(v) => set("passGueltigBis", v)} />
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={startNum + 2} title="C. Anschrift in Deutschland" />
        <Field label="Straße / Hausnummer" value={f.strasse} onChange={(v) => set("strasse", v)} />
        <div style={S.row}>
          <Field label="PLZ" value={f.plz} onChange={(v) => set("plz", v)} />
          <Field label="Ort" value={f.ort} onChange={(v) => set("ort", v)} />
        </div>
        <div style={S.row}>
          <Field label="Telefon" value={f.telefon} onChange={(v) => set("telefon", v)} />
          <Field label="E-Mail" value={f.email} onChange={(v) => set("email", v)} />
        </div>
      </div>
    </>
  );
}
