export default function Datenschutz() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-8 text-3xl font-bold">Datenschutzerklärung</h1>
      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
          <p>[Name]<br />[Adresse]<br />E-Mail: [E-Mail-Adresse]</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Server-Logfiles</h2>
          <p>Beim Besuch dieser Website werden folgende Daten erfasst:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit</li>
            <li>Browsertyp</li>
            <li>Betriebssystem</li>
            <li>Referrer-URL</li>
          </ul>
          <p className="mt-2">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Registrierung & Benutzerkonto</h2>
          <p>Bei Registrierung werden verarbeitet:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Passwort (verschlüsselt)</li>
          </ul>
          <p className="mt-2">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Zahlungsabwicklung</h2>
          <p>
            Zur Abwicklung von Mitgliedschaften nutzen wir externe Zahlungsanbieter (z.B. Stripe, PayPal).
            Zahlungsdaten werden direkt beim Anbieter verarbeitet.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. KI-Assistent</h2>
          <p>
            Eingegebene Texte werden zur Beantwortung der Anfrage verarbeitet.
            Bitte keine sensiblen personenbezogenen Daten eingeben.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">6. Analyse-Tools</h2>
          <p>
            Google Analytics mit IP-Anonymisierung (nur falls verwendet).
            Rechtsgrundlage: Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">7. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">8. Speicherdauer</h2>
          <p>Daten werden nur so lange gespeichert, wie gesetzlich erforderlich.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">9. SSL-Verschlüsselung</h2>
          <p>Diese Website nutzt SSL-Verschlüsselung zum Schutz der Datenübertragung.</p>
        </section>

        <p className="text-xs text-muted-foreground/60">
          Hinweis: Diese Datenschutzerklärung ist ein Entwurf und muss vor der Veröffentlichung von einem Rechtsanwalt geprüft werden.
        </p>
      </div>
    </div>
  );
}
