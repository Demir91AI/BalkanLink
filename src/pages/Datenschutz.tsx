export default function Datenschutz() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-8 text-3xl font-bold">Datenschutzerklärung</h1>
      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
          <p>[Name]<br />[Adresse]<br />[PLZ Ort]<br />E-Mail: [E-Mail-Adresse]</p>
          <p className="mt-2">
            Für Fragen zum Datenschutz wenden Sie sich bitte an die oben genannte E-Mail-Adresse.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Server-Logfiles</h2>
          <p>Beim Besuch dieser Website werden automatisch folgende Daten erfasst (Zweck: Sicherheit und Betrieb):</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>IP-Adresse (anonymisiert)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Browsertyp und Betriebssystem</li>
            <li>Referrer-URL</li>
          </ul>
          <p className="mt-2">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit).</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Registrierung & Benutzerkonto</h2>
          <p>Bei einer optionalen Registrierung werden verarbeitet:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>E-Mail-Adresse</li>
            <li>Passwort (verschlüsselt gespeichert)</li>
          </ul>
          <p className="mt-2">Es werden keine weiteren personenbezogenen Daten erhoben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Dokumenten-Check (Preview)</h2>
          <p>Die Funktion „Dokumenten-Check" ermöglicht das Hochladen von Dokumenten oder die Texteingabe zur allgemeinen Erklärung.</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>Standard:</strong> Die Verarbeitung erfolgt lokal im Browser. Es werden keine Dateien an Server übertragen.</li>
            <li><strong>Falls technisch erforderlich:</strong> Texte oder Bilder werden ausschließlich temporär im Arbeitsspeicher verarbeitet (RAM). Eine dauerhafte Speicherung erfolgt nicht.</li>
            <li>Nach Ausgabe der Analyse werden alle übermittelten Daten sofort und vollständig gelöscht.</li>
            <li>Es erfolgt keine Speicherung in Datenbanken, Dateisystemen oder Protokollen.</li>
            <li>Es werden keine Inhalte der Dokumente protokolliert (Retention = 0).</li>
          </ul>
          <p className="mt-2">
            <strong>Empfehlung:</strong> Schwärzen Sie personenbezogene Daten (Namen, Adressen, Aktenzeichen) vor dem Hochladen.
          </p>
          <p className="mt-1">Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Nutzung) sowie Art. 6 Abs. 1 lit. f DSGVO.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Assistent (Formular-Hilfe)</h2>
          <p>
            Der Assistent verarbeitet eingegebene Texte zur Beantwortung allgemeiner Fragen.
            Es handelt sich nicht um Rechtsberatung.
            Bitte geben Sie keine sensiblen personenbezogenen Daten ein (Ausweisnummer, Steuer-ID, IBAN, Gesundheitsdaten).
          </p>
          <p className="mt-1">Eingegebene Texte werden nicht dauerhaft gespeichert.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">6. Externe Links</h2>
          <p>
            Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für die Inhalte verlinkter Seiten ist stets der jeweilige Anbieter verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">7. Cookies & Tracking</h2>
          <p>
            Diese Website verwendet <strong>keine Marketing-Cookies</strong> und <strong>kein Tracking</strong>.
            Es werden nur technisch notwendige Daten (z.B. Spracheinstellungen) im lokalen Speicher (localStorage) abgelegt.
          </p>
          <p className="mt-1">
            Sollte zukünftig ein Analyse-Tool eingesetzt werden, erfolgt dies nur mit ausdrücklicher Einwilligung und mit IP-Anonymisierung.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">8. Speicherdauer</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist
            oder gesetzliche Aufbewahrungspflichten bestehen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">9. Ihre Rechte nach DSGVO</h2>
          <p>Sie haben folgende Rechte:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>Auskunft</strong> (Art. 15 DSGVO)</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO)</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO)</li>
            <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO)</li>
            <li><strong>Beschwerde bei einer Aufsichtsbehörde</strong> (Art. 77 DSGVO)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">10. SSL-Verschlüsselung</h2>
          <p>
            Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
            Eine verschlüsselte Verbindung erkennen Sie an „https://" in der Adresszeile Ihres Browsers.
          </p>
        </section>

        <p className="text-xs text-muted-foreground/60">
          Hinweis: Diese Datenschutzerklärung ist ein Entwurf und muss vor der Veröffentlichung von einem Rechtsanwalt geprüft werden.
        </p>
      </div>
    </div>
  );
}
