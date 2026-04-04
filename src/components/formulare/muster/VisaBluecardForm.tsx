import { AlertCircle, Info } from "lucide-react";

/* ── helpers ── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-bold text-[15px] border-b-2 mb-3 pb-1" style={{ borderColor: "#E0D0B0" }}>{children}</h3>
);
const GoldNote = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#C9A84C" }} /> <span>{children}</span>
  </div>
);
const RedNote = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed" style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>
    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{children}</span>
  </div>
);
const BlueNote = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E40AF" }}>
    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{children}</span>
  </div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[11px] uppercase text-[#6B6B6B] mb-1 font-medium">{children}</label>
);
const Example = ({ children }: { children: React.ReactNode }) => (
  <span className="italic text-[13px]" style={{ color: "#C9A84C" }}>{children}</span>
);
const FieldRow = ({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) => (
  <div className={`grid gap-4 mb-3`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>{children}</div>
);
const Field = ({ label, example, type = "text" }: { label: string; example: string; type?: string }) => (
  <div>
    <Label>{label}</Label>
    <input type={type} defaultValue={example} className="w-full rounded border px-2.5 py-1.5 text-sm" style={{ borderColor: "#C0C0C0" }} />
    <Example>z.B. {example}</Example>
  </div>
);
const CB = ({ checked = false, label }: { checked?: boolean; label: string }) => (
  <label className="flex items-center gap-2 text-sm cursor-pointer">
    <input type="checkbox" defaultChecked={checked} className="accent-[#C9A84C] h-4 w-4" /> {label}
  </label>
);
const PageBreak = ({ n, total = 5 }: { n: number; total?: number }) => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 border-t" style={{ borderColor: "#E0D0B0" }} />
    <span className="text-xs font-semibold text-muted-foreground">Seite {n} von {total}</span>
    <div className="flex-1 border-t" style={{ borderColor: "#E0D0B0" }} />
  </div>
);
const GreySection = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="rounded-lg p-4 mb-3" style={{ background: "#F5F0F0", border: "1px solid #D0D0D0", opacity: 0.7 }}>
    <h4 className="text-[12px] font-bold uppercase text-[#999] mb-1">{title} — Amtsbereich</h4>
    {children}
  </div>
);

export default function VisaBluecardForm() {
  return (
    <div className="rounded-lg border p-8 max-w-[800px] mx-auto space-y-6" style={{ borderColor: "#D0C8B0", background: "white" }}>
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-extrabold">Blaue Karte EU nach § 18g des Aufenthaltsgesetzes (AufenthG)</h2>
        <p className="text-xs text-muted-foreground">AUFENTHG-034-DE-FL – 10-2025</p>
        <div className="flex justify-center gap-6 mt-3">
          <CB checked label="Erstantrag" />
          <CB label="Antrag auf Verlängerung" />
        </div>
      </div>
      <RedNote>📸 Seit dem 01.05.2025 sind ausschließlich digitale biometrische Lichtbilder zulässig!</RedNote>

      {/* Zeitraum */}
      <div className="rounded-lg border p-4" style={{ borderColor: "#E0D0B0" }}>
        <p className="text-sm font-semibold mb-2">Ich beantrage die Blaue Karte EU für den Zeitraum</p>
        <FieldRow>
          <Field label="von" example="01.06.2025" type="date" />
          <Field label="bis" example="31.05.2029" type="date" />
        </FieldRow>
        <GoldNote>Maximal 4 Jahre bei unbefristetem Vertrag. Bei befristetem Vertrag: Vertragslaufzeit + 3 Monate.</GoldNote>
      </div>

      {/* SEITE 1 */}
      <PageBreak n={1} />
      <SectionTitle>1. Persönliche Angaben des Antragstellers / der Antragstellerin</SectionTitle>
      <FieldRow><Field label="Familienname, ggf. Geburtsname" example="Mustermann" /><Field label="Vorname(n)" example="Max" /></FieldRow>
      <FieldRow cols={3}><Field label="Geburtsdatum" example="01.01.1990" /><Field label="Geburtsort" example="Sarajevo" /><Field label="Geburtsstaat" example="Bosnien und Herzegowina" /></FieldRow>
      <FieldRow><Field label="Staatsangehörigkeit(en)" example="bosnisch-herzegowinisch" /><div><Label>Familienstand</Label><div className="flex flex-wrap gap-3 mt-1"><CB checked label="verheiratet" /><CB label="ledig" /><CB label="Lebenspartnerschaft" /><CB label="geschieden" /></div></div></FieldRow>
      <FieldRow><Field label="Augenfarbe" example="braun" /><Field label="Größe (cm)" example="180" /></FieldRow>

      <SectionTitle>Vorgesehener Aufenthaltsort im Bundesgebiet</SectionTitle>
      <FieldRow><Field label="Straße, Haus-Nr., PLZ, Ort" example="Musterstraße 1, 80331 München" /><Field label="zugezogen am" example="20.05.2025" /></FieldRow>

      <SectionTitle>Gegenwärtige Anschrift</SectionTitle>
      <Field label="Straße, Haus-Nr., PLZ, Ort, Staat" example="Musterstraße 22, 71101 Sarajevo, Bosnien und Herzegowina" />

      <SectionTitle>Ausweispapier</SectionTitle>
      <FieldRow><Field label="Genaue Bezeichnung" example="Reisepass" /><Field label="Ausstellender Staat" example="Bosnien und Herzegowina" /></FieldRow>
      <FieldRow cols={3}><Field label="Seriennummer" example="AA1234567" /><Field label="Ausstellungsdatum" example="01.03.2022" /><Field label="Gültigkeitsdauer" example="01.03.2032" /></FieldRow>

      <SectionTitle>Erreichbarkeit</SectionTitle>
      <FieldRow><Field label="Telefon" example="+49 89 123456" /><Field label="E-Mail" example="max.mustermann@email.de" /></FieldRow>

      <SectionTitle>Einreise</SectionTitle>
      <FieldRow cols={3}><Field label="Einreise am" example="20.05.2025" /><Field label="Visum der Auslandsvertretung" example="Deutsche Botschaft Sarajevo" /><Field label="am (Datum)" example="15.04.2025" /></FieldRow>

      {/* SEITE 2 */}
      <PageBreak n={2} />
      <SectionTitle>2. Ehegatte / Lebenspartner</SectionTitle>
      <FieldRow><Field label="Familienname" example="Musterfrau" /><Field label="Vorname" example="Maria" /></FieldRow>
      <FieldRow cols={3}><Field label="Geburtsdatum" example="15.05.1992" /><Field label="Geburtsort" example="Sarajevo" /><Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" /></FieldRow>
      <FieldRow><Field label="Größe (cm)" example="168" /><Field label="Augenfarbe" example="braun" /></FieldRow>
      <GoldNote>Ehegatte erhält sofort Arbeitserlaubnis ohne Einschränkungen — großer Vorteil der Blauen Karte EU!</GoldNote>

      <SectionTitle>Kinder</SectionTitle>
      <FieldRow><Field label="Familienname" example="Mustermann" /><Field label="Vorname" example="Lena" /></FieldRow>
      <FieldRow cols={3}>
        <div><Label>Geschlecht</Label><div className="flex gap-3 mt-1"><CB label="männl." /><CB checked label="weibl." /></div></div>
        <Field label="Geburtsdatum" example="10.10.2018" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>
      <GoldNote>Kinder unter 18 Jahren erhalten Aufenthaltserlaubnis ohne eigenes Visum.</GoldNote>

      <SectionTitle>3. Hochschulqualifikation</SectionTitle>
      <FieldRow><Field label="Berufsrichtung" example="Informatik / Softwareentwicklung" /><Field label="Höchster qualifizierter Abschluss" example="Master of Science (MSc)" /></FieldRow>
      <Field label="Hochschule" example="Universität Sarajevo, Bosnien und Herzegowina" />
      <div className="mt-2"><CB checked={false} label="Verfügen Sie über eine Blaue Karte EU eines anderen Mitgliedstaates?" /><div className="ml-6 mt-1"><CB checked label="nein" /></div></div>

      <SectionTitle>4. Einreise und Aufenthalt</SectionTitle>
      <FieldRow cols={3}><Field label="Aufenthaltstitel" example="Visum" /><Field label="Ausstellungsdatum" example="15.04.2025" /><Field label="Gültigkeitsdauer" example="15.10.2025" /></FieldRow>
      <Field label="Aufenthaltszweck" example="Erwerbstätigkeit (Blaue Karte EU)" />

      {/* SEITE 3 */}
      <PageBreak n={3} />
      <SectionTitle>7. Berufstätigkeit</SectionTitle>
      <FieldRow><Field label="Berufstätigkeit als" example="Softwareentwickler (Full-Stack Developer)" /><Field label="von" example="01.06.2025" /></FieldRow>
      <Field label="Arbeitgeber" example="TechGmbH, Innovationsweg 42, 80331 München" />

      <SectionTitle>8. Wohnung</SectionTitle>
      <FieldRow cols={3}><Field label="Anzahl Zimmer" example="3" /><Field label="Größe (m²)" example="75" /><div><Label>erworben durch</Label><CB checked label="Mietvertrag" /></div></FieldRow>

      <SectionTitle>9. Arbeitgeber (Beschäftigung)</SectionTitle>
      <FieldRow><Field label="Name" example="TechGmbH" /><Field label="Anschrift" example="Innovationsweg 42, 80331 München" /></FieldRow>
      <FieldRow><Field label="Höhe des Jahresgehalts brutto" example="58.000 €" /><Field label="Netto (ca.)" example="38.000 €" /></FieldRow>
      <GoldNote>Mindestgehalt 2025: 45.300 € (Standard) / 41.041,80 € (Mangelberufe). Ihr Gehalt liegt darüber ✓</GoldNote>
      <FieldRow><Field label="Arbeitsvertrag vom" example="01.04.2025" /><Field label="Laufzeit" example="unbefristet" /></FieldRow>

      <GreySection title="10. BZR-Auskunft und Behördenangaben">
        <GoldNote>Diese Abschnitte werden von der Ausländerbehörde ausgefüllt.</GoldNote>
      </GreySection>

      <SectionTitle>11. Sprachkenntnisse</SectionTitle>
      <CB checked label="Einfache deutsche Sprachkenntnisse? — ja, erworben durch Sprachkurs A2" />
      <div className="mt-2"><CB checked label="Grundkenntnisse der Rechts- und Gesellschaftsordnung? — ja" /></div>

      <SectionTitle>12–14. Wohnung, Familie, Krankenversicherung</SectionTitle>
      <CB checked label="Wohnung geplant: ja — Angaben wie oben" />
      <div className="mt-2"><CB checked label="Familienangehörige einreisen: ja — Ehegattin und 1 Kind" /></div>
      <div className="mt-2"><CB checked label="Krankenversicherungsschutz: ja — TK (Techniker Krankenkasse)" /></div>

      <SectionTitle>15–17. Vorstrafen, Ermittlungsverfahren, Ausweisung</SectionTitle>
      <div className="space-y-2">
        <CB checked label="Vorbestraft? — nein" />
        <CB checked label="Laufende Ermittlungsverfahren? — nein" />
        <CB checked label="Ausgewiesen / abgeschoben? — nein" />
      </div>

      <SectionTitle>18. Erklärungen</SectionTitle>
      <div className="space-y-2">
        <CB checked label="Ich versichere, dass die vorstehenden Angaben der Wahrheit entsprechen." />
        <CB checked label="Ich bin darüber belehrt worden, dass unrichtige Angaben strafrechtliche Folgen haben können." />
        <CB checked label="Mir ist bekannt, dass ich Änderungen unverzüglich mitzuteilen habe." />
        <CB checked label="Ich bin mit der Erhebung und Verarbeitung meiner Daten einverstanden." />
      </div>
      <GoldNote>Alle Erklärungen müssen wahrheitsgemäß beantwortet werden. Falsche Angaben sind strafbar (§ 95 AufenthG).</GoldNote>

      {/* SEITE 4 */}
      <PageBreak n={4} />
      <SectionTitle>Hinweise & Unterschrift</SectionTitle>
      <BlueNote>
        § 54 Abs. 2 Nr. 8, 10 und § 82 AufenthG — Hinweise zu Ausweisungsinteresse und Mitwirkungspflichten.
        § 86 AufenthG — Datenschutzhinweis.
      </BlueNote>
      <FieldRow><Field label="Ort" example="München" /><Field label="Datum" example={new Date().toLocaleDateString("de-DE")} /></FieldRow>
      <div className="border-b-2 border-dashed mt-4 mb-1" style={{ borderColor: "#C0C0C0" }} />
      <p className="text-[11px] text-muted-foreground text-center">Eigenhändige Unterschrift des Antragstellers / der Antragstellerin</p>
      <GoldNote>Unterschrift muss eigenhändig und im Original geleistet werden.</GoldNote>

      {/* SEITE 5 */}
      <PageBreak n={5} />
      <GreySection title="Bearbeitungsverfügung">
        <GoldNote>Diese Seite wird ausschließlich von der Ausländerbehörde ausgefüllt. Nicht vom Antragsteller ausfüllen!</GoldNote>
        <div className="space-y-1.5 mt-3 opacity-60">
          {[
            "1. Antrag ist vollständig ausgefüllt",
            "2. Übereinstimmung mit Ausweispapier",
            "3. Gültigkeit des Ausweispapiers bis",
            "4. Einreise mit Visum",
            "5. Lebensunterhalt gesichert",
            "6. Krankenversicherungsschutz liegt vor",
            "7. Zustimmung der Agentur für Arbeit",
            "8. Wohnraum ausreichend",
            "9. Ehegatte im Besitz einer Aufenthaltserlaubnis",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px] text-[#999]">
              <input type="checkbox" disabled className="h-3 w-3" /> {item}
              {i === 6 && (
                <span className="ml-1 text-[10px] font-bold rounded-full px-2 py-0.5" style={{ background: "#DCFCE7", color: "#166534" }}>
                  Nicht erforderlich bei Blauer Karte EU!
                </span>
              )}
            </div>
          ))}
        </div>
      </GreySection>

      {/* Download hint */}
      <div className="rounded-lg p-4 mt-4" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <p className="text-xs" style={{ color: "#92400E" }}>
          Das offizielle Formular AUFENTHG-034 erhältst du bei deiner zuständigen Ausländerbehörde oder kannst es online herunterladen.
        </p>
        <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 hover:underline" style={{ color: "#C9A84C" }}>
          🔗 Mehr Infos (BAMF)
        </a>
      </div>
    </div>
  );
}
