import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

const gold = "#C9A84C";
const labelCls = "block text-[11px] uppercase tracking-wide text-muted-foreground mb-1";
const inputCls = "w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm placeholder:italic placeholder:text-[#C9A84C]/70 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]";
const exampleCls = "text-[13px] italic mt-0.5";
const sectionTitle = "font-bold text-[15px] border-b-2 pb-1 mb-4";
const pageSep = "flex items-center gap-3 my-6";
const tipCls = "flex items-start gap-2 rounded-lg p-3 text-xs leading-relaxed";

function GoldTip({ children }: { children: React.ReactNode }) {
  return (
    <div className={tipCls} style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: gold }} />
      <span>{children}</span>
    </div>
  );
}

function FormField({ label, example, placeholder, type = "text" }: { label: string; example: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input className={inputCls} type={type} placeholder={placeholder || example} defaultValue="" />
      <p className={exampleCls} style={{ color: gold }}>z.B. {example}</p>
    </div>
  );
}

function CheckRow({ options, selected }: { options: string[]; selected: number }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {options.map((opt, i) => (
        <label key={i} className="inline-flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" defaultChecked={i === selected} className="h-3.5 w-3.5 accent-[#C9A84C]" />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function VisaWorkForm1() {
  const { t } = useTranslation("formulare");

  return (
    <div className="mx-auto max-w-[800px] rounded-lg bg-white p-8 space-y-6" style={{ border: "1px solid #D0C8B0" }}>
      {/* Form Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold">Antrag auf Erteilung einer Aufenthaltserlaubnis</h2>
        <p className="text-sm text-muted-foreground">gem. § 81 Abs. 1 Aufenthaltsgesetz (AufenthG)</p>
        <p className="text-xs text-muted-foreground">AUFENTHG-009-DE-FL – 10-2025</p>
      </div>

      <GoldTip>📸 Seit dem 01.05.2025 sind ausschließlich digitale biometrische Lichtbilder zulässig!</GoldTip>

      {/* SEITE 1 */}
      <div>
        <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Seite 1 — Antragsteller/in</h3>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Familienname, ggf. frühere(r) Name(n)" example="Mustermann" />
          <FormField label="Vorname(n) (Rufname in Großbuchstaben)" example="MAX" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormField label="Geburtsdatum" example="01.01.1990" type="text" />
          <FormField label="Geburtsort" example="Sarajevo, Bosnien" />
          <FormField label="Geburtsland" example="Bosnien und Herzegowina" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
          <FormField label="Eventuell frühere Staatsangehörigkeit(en)" example="keine" />
        </div>

        <div className="mt-4">
          <label className={labelCls}>Geschlecht</label>
          <CheckRow options={["männlich", "weiblich"]} selected={0} />
          <p className={exampleCls} style={{ color: gold }}>Zutreffendes ankreuzen</p>
        </div>

        <div className="mt-4">
          <label className={labelCls}>Familienstand</label>
          <CheckRow options={["ledig", "verheiratet", "eingetr. Lebenspartnerschaft", "geschieden", "verwitwet", "getrennt lebend"]} selected={1} />
          <p className={exampleCls} style={{ color: gold }}>z.B. verheiratet seit 2015</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Derzeitiger Wohnsitz in Deutschland (Straße, Hausnr., PLZ, Ort)" example="Musterstraße 1, 99001 Erfurt" />
          <FormField label="Ersteinreise am" example="15.03.2025" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Telefon" example="+49 123 456789" />
          <FormField label="E-Mail" example="max.mustermann@email.de" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Größe (cm)" example="180 cm" />
          <FormField label="Augenfarbe" example="braun" />
        </div>

        {/* Spouse */}
        <h4 className="font-semibold text-sm mt-6 mb-3">Familienangehörige — Ehegatte/in</h4>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Familienname" example="Mustermann geb. Hodžić" />
          <FormField label="Vorname(n)" example="MARIA" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Geburtsdatum" example="15.06.1992" />
          <FormField label="Geburtsort" example="Sarajevo" />
        </div>

        {/* Aufenthalt im Ausland */}
        <h4 className="font-semibold text-sm mt-6 mb-3">Aufenthalt im Ausland (länger als 6 Monate)</h4>
        <CheckRow options={["nein", "ja"]} selected={0} />
      </div>

      {/* Page Break */}
      <div className={pageSep}>
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground">Seite 2 von 4</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* SEITE 2 */}
      <div>
        <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Seite 2 — Lebensunterhalt</h3>

        <div className="space-y-3">
          <label className={labelCls}>Lebensunterhalt gesichert durch:</label>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
              Einkommen aus eigener Erwerbstätigkeit
            </label>
            <div className="ml-6 grid grid-cols-2 gap-4">
              <FormField label="Monatlicher Netto-Verdienst" example="2.800 €" />
              <FormField label="Bei / Als" example="TechGmbH München / Softwareentwickler" />
            </div>
          </div>

          <div className="mt-3">
            <label className={labelCls}>Beziehen Sie Leistungen nach SGB II/XII?</label>
            <CheckRow options={["nein", "ja"]} selected={0} />
          </div>
        </div>

        <h4 className="font-semibold text-sm mt-6 mb-3">Aufenthaltsrechtlicher Status</h4>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
          Aufenthaltserlaubnis
        </label>
        <div className="ml-6 grid grid-cols-2 gap-4 mt-2">
          <FormField label="Bezeichnung" example="§ 18 AufenthG — Arbeitsvisa" />
          <FormField label="Gültig bis" example="31.12.2025" />
        </div>
        <GoldTip>ℹ️ Tragen Sie hier §18 AufenthG ein für Arbeitsvisa</GoldTip>

        <h4 className="font-semibold text-sm mt-6 mb-3">Krankenversicherung</h4>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
          ja, bei:
        </label>
        <div className="ml-6 grid grid-cols-2 gap-4 mt-2">
          <FormField label="Versicherung" example="TK – Techniker Krankenkasse" />
          <FormField label="Gültig bis" example="unbefristet" />
        </div>
      </div>

      {/* Page Break */}
      <div className={pageSep}>
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground">Seite 3 von 4</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* SEITE 3 */}
      <div>
        <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Seite 3 — Wohnraum & Integration</h3>

        <h4 className="font-semibold text-sm mb-3">Wohnraum der Familie</h4>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Wohnfläche" example="65 m²" />
          <FormField label="Für Personen" example="3" />
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
              Mietvertrag liegt bei
            </label>
          </div>
        </div>

        <h4 className="font-semibold text-sm mt-6 mb-3">Rentenversicherung</h4>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C] mt-0.5" />
          Ich habe mindestens 60 Monate Pflichtbeiträge zur Rentenversicherung geleistet.
        </label>
        <GoldTip>ℹ️ Wichtig für spätere Niederlassungserlaubnis (60 Monate erforderlich)</GoldTip>

        <h4 className="font-semibold text-sm mt-6 mb-3">Integration — Sprachkenntnisse</h4>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
            Ich habe ausreichende Kenntnisse der deutschen Sprache.
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
            Ja, ich habe in Deutschland die Schule besucht.
          </label>
        </div>
        <p className={exampleCls} style={{ color: gold }}>Oder: Integrationskurszeugnis / B1-Zertifikat beifügen</p>
      </div>

      {/* Page Break */}
      <div className={pageSep}>
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground">Seite 4 von 4</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* SEITE 4 */}
      <div>
        <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Seite 4 — Rechtsverstöße & Unterschrift</h3>

        <h4 className="font-semibold text-sm mb-3">Rechtsverstöße</h4>
        <div className="space-y-2 text-sm">
          {[
            "Wurden Sie wegen Rechtsverstößen verurteilt?",
            "Wurden Sie ausgewiesen oder abgeschoben?",
            "Wurde ein Einreiseantrag abgelehnt?",
            "Wird gegen Sie ermittelt?",
          ].map((q) => (
            <div key={q}>
              <p className="text-muted-foreground mb-1">{q}</p>
              <CheckRow options={["nein", "ja"]} selected={0} />
            </div>
          ))}
        </div>

        <h4 className="font-semibold text-sm mt-6 mb-3">Unterschrift</h4>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Ort, Datum" example="Erfurt, [aktuelles Datum]" />
          <div>
            <label className={labelCls}>Unterschrift</label>
            <div className="h-12 border border-dashed border-border rounded flex items-center justify-center text-xs text-muted-foreground">
              [Unterschrift]
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground leading-relaxed">
          Ich versichere, vorstehende Angaben nach bestem Wissen und Gewissen richtig und vollständig gemacht zu haben. Mir ist bekannt, dass falsche oder unvollständige Angaben strafrechtlich verfolgt werden können.
        </div>
      </div>

      {/* Download hint */}
      <div className="rounded-lg p-4 text-xs leading-relaxed" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#4A4A4A" }}>
        {t("visa_work_form_hint")}
      </div>
    </div>
  );
}
