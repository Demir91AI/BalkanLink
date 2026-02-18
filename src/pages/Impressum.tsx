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
            [Adresse]<br />
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
          <h2 className="mb-2 text-lg font-semibold text-foreground">Hinweis</h2>
          <p>
            BalkanDE ist eine unabhängige Informationsplattform.
            Es besteht keine Verbindung zu staatlichen Behörden.
          </p>
        </section>

        <p className="text-xs text-muted-foreground/60">
          Hinweis: Die Kontaktdaten auf dieser Seite sind Platzhalter und müssen vor der Veröffentlichung mit echten Daten ersetzt werden.
        </p>
      </div>
    </div>
  );
}
