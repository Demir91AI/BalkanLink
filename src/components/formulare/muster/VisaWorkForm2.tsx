import { useTranslation } from "react-i18next";
import { Info, ExternalLink } from "lucide-react";

const gold = "#C9A84C";
const labelCls = "block text-[11px] uppercase tracking-wide text-muted-foreground mb-1";
const inputCls = "w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm placeholder:italic placeholder:text-[#C9A84C]/70 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]";
const exampleCls = "text-[13px] italic mt-0.5";
const sectionTitle = "font-bold text-[15px] border-b-2 pb-1 mb-4 mt-8";
const tipCls = "flex items-start gap-2 rounded-lg p-3 text-xs leading-relaxed";

function GoldTip({ children }: { children: React.ReactNode }) {
  return (
    <div className={tipCls} style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: gold }} />
      <span>{children}</span>
    </div>
  );
}

function BlueTip({ children }: { children: React.ReactNode }) {
  return (
    <div className={tipCls} style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E40AF" }}>
      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#3B82F6" }} />
      <span>{children}</span>
    </div>
  );
}

function FormField({ label, example, placeholder }: { label: string; example: string; placeholder?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input className={inputCls} placeholder={placeholder || example} defaultValue="" />
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

export default function VisaWorkForm2() {
  const { t } = useTranslation("formulare");

  return (
    <div className="mx-auto max-w-[800px] rounded-lg bg-white p-8 space-y-4" style={{ border: "1px solid #D0C8B0" }}>
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold">Erklärung zum Beschäftigungsverhältnis (EzB)</h2>
        <p className="text-sm text-muted-foreground">EzB - 02/2024</p>
      </div>

      <BlueTip>{t("visa_work_ezb_hint")}</BlueTip>

      {/* ABSCHNITT A */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt A — Erklärung und Anlass</h3>

      <div className="space-y-2 text-sm">
        <label className="flex items-start gap-2">
          <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C] mt-0.5" />
          zur Erteilung eines Aufenthaltstitels zum Zweck der Beschäftigung
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" className="h-3.5 w-3.5 accent-[#C9A84C] mt-0.5" />
          zur Zustimmung der Aufnahme einer Beschäftigung von Personen mit Duldung
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" className="h-3.5 w-3.5 accent-[#C9A84C] mt-0.5" />
          zur Erteilung einer Vorabzustimmung
        </label>
      </div>

      <div className="mt-3">
        <label className={labelCls}>Anlass der Vorlage</label>
        <CheckRow options={["Ersterteilung", "Verlängerung", "Arbeitgeberwechsel"]} selected={0} />
      </div>

      {/* ABSCHNITT B */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt B — Arbeitnehmer/in</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Feld 3: Vorname(n)" example="Max" />
        <FormField label="Feld 4: Nachname" example="Mustermann" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <FormField label="Feld 5: Geburtsdatum" example="01.01.1990" />
        <div>
          <label className={labelCls}>Feld 6: Geschlecht</label>
          <CheckRow options={["männlich", "weiblich"]} selected={0} />
        </div>
        <FormField label="Feld 7: Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Feld 8: Wohnsitz" example="Musterstraße 1, 71234 Sarajevo, Bosnien" />
        <FormField label="Feld 9: Seit wann Wohnsitz?" example="01.01.2020" />
      </div>

      {/* ABSCHNITT C */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt C — Arbeitgeber</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Feld 10: Firma" example="TechGmbH" />
        <FormField label="Feld 11–12: Straße, Hausnummer" example="Innovationsweg 42" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <FormField label="Feld 13: PLZ" example="80331" />
        <FormField label="Feld 14: Ort" example="München" />
        <FormField label="Feld 15: Kontaktperson" example="Frau Anna Schmidt (HR)" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <FormField label="Feld 16: Telefon" example="+49 89 123456" />
        <FormField label="Feld 17: E-Mail" example="hr@techgmbh.de" />
        <FormField label="Feld 18: Telefax" example="+49 89 123457" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <FormField label="Feld 19: Betriebsnummer" example="12345678" />
          <GoldTip>Ihre Betriebsnummer finden Sie auf der Lohnsteuerbescheinigung</GoldTip>
        </div>
        <div>
          <label className={labelCls}>Feld 20: Unternehmen gegründet in letzten 24 Monaten?</label>
          <CheckRow options={["Nein", "Ja"]} selected={0} />
        </div>
      </div>

      {/* ABSCHNITT D */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt D — Beschäftigung</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Feld 21: Beschäftigung beginnt am" example="01.06.2025" />
        <div>
          <label className={labelCls}>Feld 22: Befristung</label>
          <CheckRow options={["unbefristet", "befristet bis:"]} selected={1} />
          <input className={inputCls + " mt-2"} placeholder="31.05.2027" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className={labelCls}>Feld 23: Arbeitnehmerüberlassung?</label>
          <CheckRow options={["Nein", "Ja"]} selected={0} />
        </div>
        <div>
          <label className={labelCls}>Feld 24: Arbeitsort</label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
            entspricht Arbeitgeber-Sitz
          </label>
        </div>
      </div>
      <div className="mt-4">
        <FormField label="Feld 25: Berufsbezeichnung" example="Softwareentwickler (Full-Stack Developer)" />
        <GoldTip>Bitte genaue Tätigkeitsbeschreibung angeben!</GoldTip>
      </div>

      {/* ABSCHNITT E */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt E — Qualifikation</h3>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#C9A84C]" />
        Die Arbeitnehmerin/Der Arbeitnehmer hat einen Hochschulabschluss.
      </label>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <FormField label="Feld 26: Bezeichnung Studiengang" example="Informatik (Bachelor of Science)" />
        <FormField label="Feld 27: Wo erworben?" example="Universität Sarajevo, Bosnien und Herzegowina" />
      </div>
      <div className="mt-3">
        <label className={labelCls}>Feld 28: Anerkannt?</label>
        <CheckRow options={["Ja (Nachweis vorlegen)", "Nein"]} selected={0} />
        <GoldTip>Prüfen Sie die Anerkennung auf anabin.kmk.org vor Antragstellung!</GoldTip>
      </div>

      <div className="mt-3">
        <GoldTip>
          Bei der Westbalkan-Regelung (§ 26 Abs. 2 BeschV) ist kein Qualifikationsnachweis erforderlich. Trotzdem Abschnitt E vollständig ausfüllen.
        </GoldTip>
      </div>

      {/* ABSCHNITT F */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt F — Berufsausübungserlaubnis</h3>
      <label className={labelCls}>Feld 35: Berufsausübung an Qualifikation gebunden?</label>
      <CheckRow options={["Nein", "Ja"]} selected={0} />

      {/* ABSCHNITT G */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt G — Arbeitszeit</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Feld 37: Arbeitszeit</label>
          <CheckRow options={["Vollzeit", "Teilzeit"]} selected={0} />
        </div>
        <FormField label="Stunden pro Woche" example="40" />
      </div>

      {/* ABSCHNITT H */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt H — Überstunden</h3>
      <label className={labelCls}>Feld 38: Regelmäßig Überstunden?</label>
      <CheckRow options={["Nein", "Ja"]} selected={0} />

      {/* ABSCHNITT I */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt I — Urlaub</h3>
      <FormField label="Feld 41: Urlaubstage pro Jahr" example="30 Arbeitstage pro Urlaubsjahr" />

      {/* ABSCHNITT J */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt J — Arbeitsentgelt</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Feld 42: Tarifgebunden?</label>
          <CheckRow options={["Nein", "Ja"]} selected={0} />
        </div>
        <div>
          <FormField label="Feld 46: Pro Monat (brutto)" example="4.500 €" />
          <GoldTip>Mindestlohn 2025: 12,82 €/h. Für Blue Card: mind. 45.300 €/Jahr!</GoldTip>
        </div>
      </div>

      {/* ABSCHNITT K */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt K — Sozialversicherung</h3>
      <label className={labelCls}>Feld 52: Sozialversicherungspflicht?</label>
      <CheckRow options={["Ja", "Nein"]} selected={0} />

      {/* ABSCHNITT L */}
      <h3 className={sectionTitle} style={{ borderColor: "#E0D0B0" }}>Abschnitt L — Unterschrift Arbeitgeber</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Feld 57: Ort" example="München" />
        <FormField label="Feld 58: Datum" example="[Datum des Arbeitgebers]" />
      </div>
      <div className="mt-3">
        <label className={labelCls}>Feld 59: Unterschrift Arbeitgeber</label>
        <div className="h-12 border border-dashed border-border rounded flex items-center justify-center text-xs text-muted-foreground">
          [Rechtsverbindliche Unterschrift]
        </div>
      </div>
      <BlueTip>Rechtsverbindliche Unterschrift des Arbeitgebers oder Bevollmächtigten erforderlich!</BlueTip>

      {/* Important notices */}
      <details className="mt-4 rounded-lg border p-3">
        <summary className="text-xs font-semibold cursor-pointer text-muted-foreground">Wichtige Hinweise</summary>
        <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
          <li>• Der Arbeitgeber versichert, dass die Beschäftigung tatsächlich ausgeübt werden soll (§ 18 Abs. 2 Nr. 4a AufenthG)</li>
          <li>• Bei vorzeitiger Beendigung muss die Ausländerbehörde innerhalb von 4 Wochen informiert werden (§ 4a Abs. 5 Satz 3 Nr. 3 AufenthG)</li>
          <li>• Datenschutzhinweis: www.arbeitsagentur.de/datenerhebung</li>
        </ul>
      </details>

      {/* Download hint */}
      <div className="rounded-lg p-4 text-xs leading-relaxed" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#4A4A4A" }}>
        {t("visa_work_ezb_download_hint")}
        <a
          href="https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-flex items-center gap-1 font-semibold hover:underline"
          style={{ color: gold }}
        >
          <ExternalLink className="h-3 w-3" />
          {t("visa_work_ezb_download")}
        </a>
      </div>
    </div>
  );
}
