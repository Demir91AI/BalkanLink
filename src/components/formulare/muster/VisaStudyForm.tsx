import {
  SectionTitle,
  GoldNote,
  RedNote,
  Label,
  FieldRow,
  Field,
  CB,
  PageBreak,
} from "./VisaFormPrimitives";

export default function VisaStudyForm() {
  return (
    <div className="rounded-lg border p-8 max-w-[800px] mx-auto space-y-6" style={{ borderColor: "#D0C8B0", background: "white" }}>
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-extrabold">Antrag auf Erteilung einer Aufenthaltserlaubnis</h2>
        <p className="text-xs text-muted-foreground">gem. § 81 Abs. 1 Aufenthaltsgesetz (AufenthG)</p>
        <p className="text-xs text-muted-foreground">AUFENTHG-009-DE-FL – 10-2025</p>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mt-2 text-xs font-bold" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
          Ausgefüllt für: Studium §16b AufenthG
        </div>
      </div>
      <RedNote>📸 Seit dem 01.05.2025 sind ausschließlich digitale biometrische Lichtbilder zulässig!</RedNote>
      <GoldNote>
        Dieser Antrag wird nach der Einreise bei der Ausländerbehörde am Studienort gestellt.
        Das D-Visum „Studium" wird vorher bei der deutschen Botschaft im Heimatland beantragt.
      </GoldNote>

      {/* ── SEITE 1 ── */}
      <PageBreak n={1} />
      <SectionTitle>Antragsteller/in</SectionTitle>

      <FieldRow>
        <Field label="Familienname, ggf. frühere(r) Name(n)" example="Mustermann" />
        <Field label="Vorname(n) (Rufname in Großbuchstaben)" example="MAX" />
      </FieldRow>
      <FieldRow cols={3}>
        <Field label="Geburtsdatum" example="15.03.2000" />
        <Field label="Geburtsort" example="Sarajevo, Bosnien und Herzegowina" />
        <Field label="Geburtsland" example="Bosnien und Herzegowina" />
      </FieldRow>
      <FieldRow>
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
        <Field label="Frühere Staatsangehörigkeit(en)" example="keine" />
      </FieldRow>
      <div className="flex flex-wrap gap-4 mb-3">
        <CB checked label="männlich" />
        <CB label="weiblich" />
      </div>
      <div className="flex flex-wrap gap-3 mb-3">
        <CB checked label="ledig" />
        <CB label="verheiratet" />
        <CB label="geschieden" />
        <CB label="verwitwet" />
      </div>
      <FieldRow>
        <div>
          <Field label="Derzeitiger Wohnsitz in Deutschland" example="Studentenwohnheim, Universitätsstraße 5, Zimmer 214, 80333 München" />
          <GoldNote>Studentenwohnheim oder WG-Zimmer — beides ist gültig als Wohnsitz.</GoldNote>
        </div>
        <Field label="Ersteinreise am" example="01.09.2025" />
      </FieldRow>
      <FieldRow>
        <Field label="Telefon" example="+49 176 12345678" />
        <Field label="E-Mail" example="max.mustermann@student.uni-muenchen.de" />
      </FieldRow>
      <FieldRow>
        <Field label="Größe (cm)" example="180 cm" />
        <Field label="Augenfarbe" example="braun" />
      </FieldRow>

      <SectionTitle>Aufenthalt im Ausland</SectionTitle>
      <CB checked label="nein — Kein längerer Auslandsaufenthalt seit Einreise." />

      <SectionTitle>Familienangehörige</SectionTitle>
      <GoldNote>Wenn Familienangehörige nachkommen sollen, werden separate Anträge gestellt.</GoldNote>
      <p className="text-xs text-muted-foreground italic">— leer (Student kommt allein) —</p>

      {/* ── SEITE 2 ── */}
      <PageBreak n={2} />
      <SectionTitle>Lebensunterhalt</SectionTitle>

      <CB checked label="Sonstige — Sperrkonto / Blocked Account" />
      <FieldRow>
        <Field label="Monatlicher Betrag" example="934 €" />
        <Field label="Bezeichnung" example="Sperrkonto bei Fintiba — Bestätigung liegt bei" />
      </FieldRow>
      <GoldNote>
        Das Sperrkonto wird monatlich in Höhe von 934 € (Stand 2026) freigegeben.
        Gesamtbetrag auf Sperrkonto: 11.208 €. Bescheinigung des Sperrkonto-Anbieters beifügen!
      </GoldNote>
      <GoldNote>
        Alternativ: Stipendienbescheid des DAAD, Erasmus+ oder andere anerkannte Stipendien.
      </GoldNote>

      <div className="mt-3">
        <p className="text-sm font-medium mb-1">Beziehen Sie Leistungen nach SGB II/XII?</p>
        <CB checked label="nein" />
      </div>

      <SectionTitle>Aufenthaltsrechtlicher Status</SectionTitle>
      <CB checked label="Aufenthaltserlaubnis" />
      <FieldRow>
        <Field label="Bezeichnung" example="§ 16b AufenthG — Studium" />
        <Field label="Gültig bis" example="30.09.2026" />
      </FieldRow>
      <GoldNote>Aufenthaltserlaubnis wird für die Dauer des Studiums + 3 Monate ausgestellt, meist 1 Jahr und dann verlängert.</GoldNote>

      <SectionTitle>Krankenversicherung</SectionTitle>
      <CB checked label="ja" />
      <FieldRow>
        <Field label="bei" example="TK – Techniker Krankenkasse (Studenten-Tarif)" />
        <Field label="Gültig bis" example="30.09.2026" />
      </FieldRow>
      <GoldNote>Studenten-Krankenversicherung bei gesetzlicher Kasse: ca. 120 €/Monat. Bis 30 Jahre oder 14. Hochschulsemester.</GoldNote>

      <SectionTitle>Kinder</SectionTitle>
      <GoldNote>Studierende ohne Kinder lassen diesen Abschnitt frei.</GoldNote>
      <p className="text-xs text-muted-foreground italic">— leer —</p>

      {/* ── SEITE 3 ── */}
      <PageBreak n={3} />
      <SectionTitle>Wohnraum der Familie</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Wohnfläche" example="18 m²" />
        <Field label="Für Personen" example="1" />
        <div><CB checked label="Mietvertrag liegt bei." /></div>
      </FieldRow>
      <GoldNote>
        Studentenwohnheimzimmer mit 18 m² ist ausreichend für 1 Person (min. 12 m²/Person). Mietvertrag des Studentenwohnheims beifügen.
      </GoldNote>

      <SectionTitle>Rentenversicherung</SectionTitle>
      <GoldNote>Für das Studiumsvisum ist die Rentenversicherung NICHT relevant — diesen Abschnitt überspringen.</GoldNote>
      <p className="text-xs text-muted-foreground italic">— nicht zutreffend —</p>

      <SectionTitle>Integration — Sprachkenntnisse</SectionTitle>
      <CB checked label="Ich habe ausreichende Kenntnisse der deutschen Sprache." />
      <Field label="Zeugnis liegt bei" example="TestDaF, Gesamtergebnis TDN 4, abgelegt am 15.05.2025" />
      <GoldNote>
        Für das Studium an deutschen Hochschulen wird meist B2 oder C1 verlangt.
        Das TestDaF-Zeugnis oder DSH-Bescheinigung muss beigefügt werden.
        Für englischsprachige Masterstudiengänge reicht IELTS/TOEFL.
      </GoldNote>

      <SectionTitle>Unterhaltspflichten</SectionTitle>
      <CB checked label="nein" />

      {/* ── SEITE 4 ── */}
      <PageBreak n={4} />
      <SectionTitle>Rechtsverstöße</SectionTitle>
      <div className="space-y-2">
        <CB checked label="nein — Wurden Sie wegen Rechtsverstößen verurteilt?" />
        <CB checked label="nein — Wurden Sie ausgewiesen oder abgeschoben?" />
        <CB checked label="nein — Wurde ein Einreiseantrag abgelehnt?" />
        <CB checked label="nein — Wird gegen Sie ermittelt?" />
      </div>

      <GoldNote>
        Als Student darfst du in Deutschland 140 volle Tage oder 280 halbe Tage pro Jahr arbeiten.
        Studentenjobs, Werkstudentenstellen und Pflichtpraktika sind erlaubt.
        Bei mehr Arbeitstagen muss die Ausländerbehörde informiert werden.
      </GoldNote>

      <SectionTitle>Unterschrift</SectionTitle>
      <FieldRow>
        <Field label="Ort, Datum" example="München, [aktuelles Datum]" />
        <div>
          <Label>Eigenhändige Unterschrift</Label>
          <div className="h-12 rounded border border-dashed flex items-center justify-center text-xs text-muted-foreground" style={{ borderColor: "#C0C0C0" }}>
            [Unterschrift]
          </div>
        </div>
      </FieldRow>
      <GoldNote>Eigenhändige Unterschrift erforderlich.</GoldNote>

      <details className="text-xs text-muted-foreground mt-4">
        <summary className="cursor-pointer font-semibold">Hinweise gem. § 54, § 82, § 86 AufenthG</summary>
        <p className="mt-2 leading-relaxed">
          Ich versichere, vorstehende Angaben nach bestem Wissen und Gewissen gemacht zu haben.
          Mir ist bekannt, dass falsche oder unvollständige Angaben strafrechtliche Folgen haben können (§ 95 AufenthG).
        </p>
      </details>

      {/* Checklist */}
      <div className="rounded-lg p-4 mt-4 space-y-2" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h4 className="text-sm font-bold" style={{ color: "#92400E" }}>Folgende Unterlagen müssen dem Antrag beigefügt werden:</h4>
        <div className="space-y-1.5 text-[12px]" style={{ color: "#92400E" }}>
          <CB checked label="Immatrikulationsbescheinigung der Hochschule" />
          <CB checked label="Sperrkonto-Bestätigung (min. 11.208 €)" />
          <CB checked label="Krankenversicherungsnachweis (TK, AOK, etc.)" />
          <CB checked label="Mietvertrag / Wohnheimvertrag" />
          <CB checked label="Reisepass (Original + Kopie)" />
          <CB checked label="TestDaF / DSH / IELTS-Zeugnis" />
          <CB checked label="2 digitale biometrische Lichtbilder" />
        </div>
      </div>

      {/* Download Hint */}
      <div className="rounded-lg p-4 mt-4 space-y-2" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <p className="text-[12px]" style={{ color: "#92400E" }}>
          Das offizielle Formular erhältst du bei deiner zuständigen Ausländerbehörde am Studienort.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#C9A84C" }}>
            🔗 BAMF – Studiumsvisa
          </a>
          <a href="https://digital.diplo.de/visa" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#C9A84C" }}>
            🔗 Termin buchen (digital.diplo.de)
          </a>
        </div>
      </div>
    </div>
  );
}
