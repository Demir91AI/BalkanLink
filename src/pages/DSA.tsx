import PageNav from "@/components/navigation/PageNav";

export default function DSA() {
  return (
    <>
    <PageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Meldung rechtswidriger Inhalte &amp; Beschwerdeverfahren</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Gemäß der Verordnung (EU) 2022/2065 über einen Binnenmarkt für digitale Dienste (Digital Services Act – DSA)
        sowie den Bestimmungen des Digitale-Dienste-Gesetzes (DDG) stellen wir Ihnen nachfolgend Informationen
        zur Meldung rechtswidriger Inhalte und zu unserem internen Beschwerdeverfahren bereit.
      </p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Meldung rechtswidriger Inhalte</h2>
          <p>
            Nutzer und Dritte haben die Möglichkeit, Inhalte auf der Plattform zu melden, die sie für rechtswidrig halten.
            Wir nehmen solche Meldungen ernst und bearbeiten sie zeitnah.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">1.1 Wie können Sie Inhalte melden?</h3>
          <p className="mt-1">
            Bitte senden Sie Ihre Meldung per E-Mail an:{" "}
            <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a>
          </p>
          <p className="mt-1">Betreff: <strong>„Meldung rechtswidriger Inhalte"</strong></p>

          <h3 className="mt-4 font-semibold text-foreground">1.2 Erforderliche Angaben</h3>
          <p className="mt-1">Damit wir Ihre Meldung prüfen können, benötigen wir folgende Informationen:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Genaue URL oder Beschreibung des betreffenden Inhalts</li>
            <li>Begründung, warum der Inhalt als rechtswidrig angesehen wird</li>
            <li>Gegebenenfalls relevante rechtliche Bestimmungen</li>
            <li>Kontaktdaten des Meldenden (Name, E-Mail-Adresse)</li>
            <li>Versicherung, dass die Angaben nach bestem Wissen und Gewissen wahrheitsgemäß und vollständig sind</li>
          </ul>

          <h3 className="mt-4 font-semibold text-foreground">1.3 Prüfung und Maßnahmen</h3>
          <p className="mt-1">Nach Eingang Ihrer Meldung werden wir:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Den Eingang Ihrer Meldung zeitnah bestätigen</li>
            <li>Den gemeldeten Inhalt sorgfältig und objektiv prüfen</li>
            <li>Bei festgestellter Rechtswidrigkeit den Inhalt entfernen oder den Zugang dazu sperren</li>
            <li>Den Meldenden über die getroffene Entscheidung und deren Begründung informieren</li>
            <li>Den betroffenen Nutzer (Inhalteanbieter) über die Maßnahme und die Möglichkeit der Beschwerde informieren, sofern dem keine rechtlichen Hindernisse entgegenstehen</li>
          </ul>
          <p className="mt-2">
            Die Bearbeitung erfolgt in der Regel innerhalb von 7 Werktagen nach Eingang einer vollständigen Meldung.
            Bei offensichtlich rechtswidrigen Inhalten (z. B. Volksverhetzung, Kindesmissbrauch) erfolgt die Entfernung unverzüglich.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Internes Beschwerdeverfahren</h2>
          <p>
            Gemäß Art. 20 der Verordnung (EU) 2022/2065 stellen wir ein internes Beschwerdeverfahren bereit,
            das folgenden Personen offensteht:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Nutzern, deren Inhalte entfernt oder deren Zugang gesperrt wurde</li>
            <li>Meldenden, deren Meldung abgelehnt wurde</li>
          </ul>

          <h3 className="mt-4 font-semibold text-foreground">2.1 Einreichung einer Beschwerde</h3>
          <p className="mt-1">
            Beschwerden können innerhalb von <strong>6 Monaten</strong> nach der betreffenden Entscheidung
            per E-Mail an <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a> eingereicht werden.
          </p>
          <p className="mt-1">Betreff: <strong>„Beschwerde – [kurze Beschreibung]"</strong></p>

          <h3 className="mt-4 font-semibold text-foreground">2.2 Inhalt der Beschwerde</h3>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Bezugnahme auf die betreffende Entscheidung (inkl. Datum und ggf. Referenznummer)</li>
            <li>Begründung der Beschwerde</li>
            <li>Kontaktdaten des Beschwerdeführers</li>
          </ul>

          <h3 className="mt-4 font-semibold text-foreground">2.3 Bearbeitung</h3>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Die Beschwerde wird zeitnah, fair und objektiv geprüft.</li>
            <li>Die Entscheidung erfolgt nicht ausschließlich automatisiert.</li>
            <li>Der Beschwerdeführer wird über das Ergebnis und die Begründung informiert.</li>
            <li>Sofern die Beschwerde begründet ist, wird die ursprüngliche Entscheidung rückgängig gemacht.</li>
          </ul>

          <h3 className="mt-4 font-semibold text-foreground">2.4 Außergerichtliche Streitbeilegung</h3>
          <p className="mt-1">
            Unabhängig von diesem internen Beschwerdeverfahren haben Sie das Recht, eine zertifizierte
            außergerichtliche Streitbeilegungsstelle gemäß Art. 21 der Verordnung (EU) 2022/2065 anzurufen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Kontaktstelle</h2>
          <p>
            Die zentrale Kontaktstelle für Behörden der Mitgliedstaaten, die Kommission und das Gremium
            für digitale Dienste gemäß Art. 11 der Verordnung (EU) 2022/2065 ist:
          </p>
          <p className="mt-2">
            <strong>RealCore Digital</strong><br />
            E-Mail: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a><br />
            Sprache: Deutsch, Englisch
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
