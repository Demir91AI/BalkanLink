export default function Impressum() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-8 text-3xl font-bold">Impressum</h1>
      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>Betreiber:</strong><br />
            [Vorname Nachname]<br />
            [Straße Hausnummer]<br />
            [PLZ Ort]<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Kontakt</h2>
          <p>E-Mail: [E-Mail-Adresse]</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Umsatzsteuer</h2>
          <p>
            Kleinunternehmer gemäß § 19 UStG (sofern zutreffend)<br />
            USt-IdNr.: [falls vorhanden]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            [Vorname Nachname]<br />
            [Adresse]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Hinweis zur Plattform</h2>
          <p>
            BalkanLink ist eine <strong>unabhängige Informationsplattform</strong>.
            Es besteht keine Verbindung zu staatlichen Behörden, Botschaften oder offiziellen Stellen.
          </p>
          <p className="mt-2">
            Die Plattform bietet allgemeine Informationen zur Orientierung und stellt keine Rechtsberatung,
            Steuerberatung oder verbindliche behördliche Auskunft dar.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"
              className="ml-1 text-primary hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mt-1">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <p className="text-xs text-muted-foreground/60">
          Hinweis: Die Kontaktdaten auf dieser Seite sind Platzhalter und müssen vor der Veröffentlichung mit echten Daten ersetzt werden.
        </p>
      </div>
    </div>
  );
}
