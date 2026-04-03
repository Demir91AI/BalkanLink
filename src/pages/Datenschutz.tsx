import PageNav from "@/components/navigation/PageNav";

export default function Datenschutz() {
  return (
    <>
    <PageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Datenschutzerklärung</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler
            Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p className="mt-2">
            <strong>RealCore Digital</strong><br />
            Inhaber: Demir Sinanovic<br />
            Münchener Straße 78<br />
            83395 Freilassing<br />
            Deutschland<br />
            E-Mail: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a>
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Übersicht der Verarbeitungen</h2>
          <p>Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen:</p>
          <h3 className="mt-3 font-semibold text-foreground">Kategorien betroffener Personen</h3>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Besucher und Nutzer der Plattform</li>
            <li>Registrierte Nutzer (Benutzerkonten)</li>
            <li>Personen, die über Kontaktformulare oder E-Mail kommunizieren</li>
          </ul>
          <h3 className="mt-3 font-semibold text-foreground">Kategorien personenbezogener Daten</h3>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Bestandsdaten (z. B. E-Mail-Adresse)</li>
            <li>Nutzungsdaten (z. B. aufgerufene Seiten, Zugriffszeiten)</li>
            <li>Meta-/Kommunikationsdaten (z. B. IP-Adressen, Browsertyp)</li>
            <li>Inhaltsdaten (z. B. eingegebene Texte in Formularen und Tools)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Rechtsgrundlagen der Verarbeitung</h2>
          <p>Wir verarbeiten personenbezogene Daten auf Grundlage folgender Rechtsgrundlagen:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Die betroffene Person hat ihre Einwilligung in die Verarbeitung erteilt.</li>
            <li><strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Die Verarbeitung ist für die Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich.</li>
            <li><strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO):</strong> Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich.</li>
            <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Die Verarbeitung ist zur Wahrung berechtigter Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die Interessen oder Grundrechte der betroffenen Person überwiegen.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Server-Logfiles</h2>
          <p>
            Der Hosting-Provider dieser Plattform erhebt und speichert automatisch Informationen in sogenannten
            Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>IP-Adresse des anfragenden Rechners (ggf. anonymisiert)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Übertragene Datenmenge</li>
            <li>Meldung, ob der Abruf erfolgreich war</li>
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer-URL (die zuvor besuchte Seite)</li>
            <li>Hostname des zugreifenden Rechners</li>
          </ul>
          <p className="mt-2">
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Verarbeitung erfolgt auf Grundlage
            von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Gewährleistung eines störungsfreien
            Betriebs und der Sicherheit unserer Plattform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Kontaktaufnahme</h2>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen mitgeteilten Daten (E-Mail-Adresse, ggf. Name, Inhalt der Anfrage)
            von uns zum Zweck der Bearbeitung Ihrer Anfrage gespeichert. Die Verarbeitung erfolgt auf Grundlage von
            Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
            an der Beantwortung). Die Daten werden gelöscht, sobald der Zweck der Speicherung entfällt.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. Registrierung und Benutzerkonto</h2>
          <p>
            Nutzer können auf der Plattform ein Benutzerkonto anlegen. Bei der Registrierung werden folgende Daten erhoben:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>E-Mail-Adresse</li>
            <li>Passwort (verschlüsselt gespeichert, bcrypt/argon2)</li>
          </ul>
          <p className="mt-2">
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            Es werden keine weiteren personenbezogenen Daten zwingend erhoben. Das Konto kann jederzeit gelöscht werden.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">7. Plattformnutzung – Formulare, Tools und Assistenten</h2>
          <p>
            Die Plattform bietet verschiedene digitale Werkzeuge, darunter Formularhilfen, Informationsassistenten
            und einen Dokumenten-Check. Bei der Nutzung dieser Funktionen können Inhaltsdaten (eingegebene Texte,
            hochgeladene Dokumente) verarbeitet werden.
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Eingegebene Texte werden ausschließlich zur Erbringung der jeweiligen Funktion verarbeitet.</li>
            <li>Hochgeladene Dokumente werden nur temporär im Arbeitsspeicher verarbeitet (keine dauerhafte Speicherung).</li>
            <li>Es erfolgt keine Protokollierung, Speicherung oder Weitergabe der Inhalte.</li>
            <li>Nach Ausgabe des Ergebnisses werden alle übermittelten Daten sofort und vollständig gelöscht.</li>
          </ul>
          <p className="mt-2">
            <strong>Empfehlung:</strong> Schwärzen Sie personenbezogene Daten (Namen, Adressen, Aktenzeichen, Steuer-IDs)
            vor der Nutzung der Dokumenten-Check-Funktion.
          </p>
          <p className="mt-1">Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Nutzung) sowie Art. 6 Abs. 1 lit. f DSGVO.</p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">8. Nutzergenerierte Inhalte</h2>
          <p>
            Nutzer können auf der Plattform Inhalte veröffentlichen (z. B. Anzeigen, Einträge, Kommentare).
            Diese Inhalte werden gespeichert und sind für andere Nutzer sichtbar. Bei der Veröffentlichung werden
            die mit dem Beitrag verbundenen Metadaten (Zeitstempel, ggf. Nutzername) gespeichert.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">9. Cookies und Einwilligung</h2>
          <p>
            Diese Plattform verwendet <strong>keine Marketing-Cookies</strong> und <strong>kein Tracking durch Drittanbieter</strong>.
            Es werden ausschließlich technisch notwendige Daten im lokalen Speicher des Browsers (localStorage, sessionStorage) abgelegt,
            insbesondere:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Spracheinstellungen</li>
            <li>Authentifizierungstoken (bei angemeldeten Nutzern)</li>
            <li>Cookie-Consent-Einstellungen</li>
          </ul>
          <p className="mt-2">
            Sollte zukünftig ein Analyse-Tool eingesetzt werden, erfolgt dies nur mit ausdrücklicher, vorheriger Einwilligung
            des Nutzers (Opt-in) und mit IP-Anonymisierung. Die Einwilligung kann jederzeit widerrufen werden.
          </p>
          <p className="mt-1">Rechtsgrundlage: § 25 TDDDG i.V.m. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) bzw. § 25 Abs. 2 TDDDG (technische Notwendigkeit).</p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">10. Speicherdauer und Löschung</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist
            oder gesetzliche Aufbewahrungspflichten bestehen. Nach Ablauf der Speicherfrist oder bei Wegfall des Zwecks
            werden die Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gelöscht oder gesperrt.
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Server-Logfiles: maximal 30 Tage</li>
            <li>Kontaktanfragen: nach abschließender Bearbeitung, spätestens 6 Monate</li>
            <li>Benutzerkonten: bis zur Löschung durch den Nutzer</li>
            <li>Inhaltsdaten (Tools): sofortige Löschung nach Verarbeitung</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">11. Empfänger der Daten</h2>
          <p>
            Personenbezogene Daten werden grundsätzlich nicht an Dritte weitergegeben, es sei denn, dies ist zur Erfüllung
            vertraglicher Pflichten erforderlich, eine gesetzliche Verpflichtung besteht oder der Nutzer eingewilligt hat.
          </p>
          <p className="mt-2">Folgende Kategorien von Empfängern können betroffen sein:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Hosting-Provider (Auftragsverarbeitung gemäß Art. 28 DSGVO)</li>
            <li>Zahlungsdienstleister (bei kostenpflichtigen Leistungen)</li>
            <li>E-Mail-Dienstleister (für transaktionale E-Mails)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">12. Auftragsverarbeitung</h2>
          <p>
            Soweit wir Dritte mit der Verarbeitung personenbezogener Daten beauftragen (z. B. Hosting),
            geschieht dies ausschließlich auf Grundlage eines Vertrages zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
            Unsere Auftragsverarbeiter sind sorgfältig ausgewählt und vertraglich zur Einhaltung der DSGVO verpflichtet.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">13. Datensicherheit</h2>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen gemäß Art. 32 DSGVO ein, um Ihre Daten
            gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder den Zugriff unberechtigter Personen
            zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
            Die Datenübertragung erfolgt über SSL/TLS-Verschlüsselung.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">14. Rechte der betroffenen Personen</h2>
          <p>Als betroffene Person haben Sie folgende Rechte:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden, und auf Auskunft über diese Daten sowie weitere Informationen.</li>
            <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, die Vervollständigung oder Berichtigung unrichtiger Daten zu verlangen.</li>
            <li><strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht, die Löschung betreffender Daten zu verlangen, sofern die Voraussetzungen erfüllt sind.</li>
            <li><strong>Recht auf Einschränkung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen.</li>
            <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
            <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Widerspruch einzulegen.</li>
            <li><strong>Recht auf Widerruf (Art. 7 Abs. 3 DSGVO):</strong> Eine erteilte Einwilligung kann jederzeit widerrufen werden. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</li>
            <li><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, eine Beschwerde bei einer Aufsichtsbehörde einzureichen. Die zuständige Aufsichtsbehörde ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA).</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">15. Widerspruchsrecht</h2>
          <p>
            Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO
            verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung einzulegen,
            sofern dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben.
            Richten Sie Ihren Widerspruch bitte an: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">16. Keine automatisierte Entscheidungsfindung</h2>
          <p>
            Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO statt,
            die Ihnen gegenüber eine rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">17. SSL-/TLS-Verschlüsselung</h2>
          <p>
            Diese Plattform nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten
            eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://" in der
            Adresszeile Ihres Browsers und dem Schloss-Symbol.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">18. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
            Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen. Für Ihren erneuten Besuch
            gilt dann die neue Datenschutzerklärung.
          </p>
          <p className="mt-2">Stand: März 2026</p>
        </section>
      </div>
    </div>
    </>
  );
}
