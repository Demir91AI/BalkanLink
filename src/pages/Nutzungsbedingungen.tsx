import PageNav from "@/components/navigation/PageNav";

export default function Nutzungsbedingungen() {
  return (
    <>
    <SubpageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Allgemeine Nutzungsbedingungen</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 1 Geltungsbereich und Anbieter</h2>
          <p>
            Diese Allgemeinen Nutzungsbedingungen (nachfolgend „AGB") gelten für die Nutzung der Plattform
            „BalkanLink" (nachfolgend „Plattform"), betrieben von:
          </p>
          <p className="mt-2">
            <strong>RealCore Digital</strong><br />
            Inhaber: Demir Sinanovic<br />
            Münchener Straße 78<br />
            83395 Freilassing<br />
            Deutschland<br />
            E-Mail: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a>
          </p>
          <p className="mt-2">
            Mit der Nutzung der Plattform erklärt sich der Nutzer mit diesen AGB einverstanden. Abweichende Bedingungen
            des Nutzers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 2 Leistungsbeschreibung</h2>
          <p>Die Plattform bietet folgende Leistungen:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Strukturierte Informationsinhalte zu behördlichen Vorgängen und Alltagsthemen in Deutschland</li>
            <li>Digitale Formularhilfen und Ausfüllhilfen (keine Rechtsberatung)</li>
            <li>Werkzeuge und Rechner (z. B. Brutto-Netto-Rechner)</li>
            <li>KI-gestützter Informationsassistent</li>
            <li>Dokumenten-Check (allgemeine Erklärung hochgeladener Dokumente)</li>
            <li>Nutzergenerierte Inhalte (Anzeigen, Einträge, Verzeichnisse)</li>
            <li>Verzeichnisse und Karten</li>
          </ul>
          <p className="mt-2">
            Der Anbieter behält sich das Recht vor, den Umfang der Leistungen jederzeit zu ändern, zu erweitern
            oder einzuschränken, ohne dass hieraus Ansprüche des Nutzers entstehen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 3 Kein Beratungsvertrag</h2>
          <p>
            Die Nutzung der Plattform begründet <strong>kein Mandatsverhältnis, keinen Beratungsvertrag und
            kein sonstiges Vertragsverhältnis</strong>, das eine individuelle Rechts-, Steuer-, Finanz- oder
            sonstige professionelle Beratung beinhaltet.
          </p>
          <p className="mt-2">
            Sämtliche Inhalte dienen ausschließlich der allgemeinen Information und Orientierung. Für verbindliche
            Auskünfte sind die jeweils zuständigen Behörden, Rechtsanwälte, Steuerberater oder sonstige
            qualifizierte Fachpersonen zu konsultieren.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 4 Keine Gewähr für Inhalte</h2>
          <p>
            Alle Angaben auf der Plattform erfolgen nach bestem Wissen und Gewissen, jedoch ohne jegliche Gewähr
            auf Richtigkeit, Vollständigkeit, Aktualität oder Eignung für einen bestimmten Zweck. Gesetze,
            Verordnungen und behördliche Regelungen können sich jederzeit ändern. Der Anbieter übernimmt keine
            Haftung für Schäden, die aus der Nutzung oder dem Vertrauen auf die bereitgestellten Inhalte entstehen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 5 Nutzerpflichten</h2>
          <p>Der Nutzer verpflichtet sich:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>die Plattform nur für rechtmäßige Zwecke zu nutzen;</li>
            <li>keine falschen, irreführenden oder rechtswidrigen Inhalte zu veröffentlichen;</li>
            <li>keine Rechte Dritter (insbesondere Urheberrechte, Markenrechte, Persönlichkeitsrechte) zu verletzen;</li>
            <li>keine Schadsoftware, Spam oder automatisierte Zugriffe einzusetzen;</li>
            <li>seine Zugangsdaten vertraulich zu behandeln und nicht an Dritte weiterzugeben;</li>
            <li>die Plattform nicht zu manipulieren oder deren Funktionalität zu beeinträchtigen;</li>
            <li>keine Inhalte zu veröffentlichen, die gegen geltendes Recht, die guten Sitten oder die Rechte Dritter verstoßen;</li>
            <li>wahrheitsgemäße Angaben bei der Registrierung und der Veröffentlichung von Inhalten zu machen.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 6 Nutzergenerierte Inhalte</h2>
          <p>
            Nutzer können auf der Plattform eigene Inhalte veröffentlichen (z. B. Anzeigen, Einträge, Bewertungen).
            Der Nutzer ist für seine veröffentlichten Inhalte allein verantwortlich.
          </p>
          <p className="mt-2">
            Mit der Veröffentlichung von Inhalten auf der Plattform räumt der Nutzer dem Anbieter ein einfaches,
            zeitlich und räumlich unbeschränktes, unentgeltliches Nutzungsrecht ein, die Inhalte im Rahmen der
            Plattform öffentlich zugänglich zu machen, zu speichern, zu vervielfältigen und technisch zu verarbeiten.
          </p>
          <p className="mt-2">
            Der Anbieter ist nicht verpflichtet, nutzergenerierte Inhalte vor der Veröffentlichung zu prüfen.
            Der Anbieter behält sich jedoch das Recht vor, Inhalte jederzeit und ohne Angabe von Gründen zu prüfen,
            zu bearbeiten, zu verschieben oder zu entfernen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 7 Verbotene Inhalte</h2>
          <p>Es ist untersagt, auf der Plattform folgende Inhalte zu veröffentlichen oder zu verbreiten:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Inhalte, die gegen geltendes Recht verstoßen (insbesondere Strafrecht)</li>
            <li>Volksverhetzende, rassistische, diskriminierende oder menschenverachtende Inhalte</li>
            <li>Gewaltverherrlichende oder terroristische Inhalte</li>
            <li>Pornografische oder jugendgefährdende Inhalte</li>
            <li>Urheberrechtlich geschützte Inhalte ohne Berechtigung</li>
            <li>Persönliche Daten Dritter ohne deren Einwilligung</li>
            <li>Spam, Werbung oder kommerzielle Inhalte ohne Genehmigung</li>
            <li>Betrugsversuche, Phishing oder sonstige betrügerische Aktivitäten</li>
            <li>Inhalte, die geeignet sind, den Ruf der Plattform zu schädigen</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 8 Moderation, Sperrung und Löschung</h2>
          <p>
            Der Anbieter ist berechtigt, bei Verstößen gegen diese AGB oder bei Vorliegen konkreter Anhaltspunkte
            für rechtswidrige Inhalte folgende Maßnahmen zu ergreifen:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Verwarnung des Nutzers</li>
            <li>Bearbeitung oder Entfernung einzelner Inhalte</li>
            <li>Vorübergehende oder dauerhafte Sperrung des Benutzerkontos</li>
            <li>Löschung des Benutzerkontos</li>
          </ul>
          <p className="mt-2">
            Der Nutzer wird über die Maßnahme und deren Begründung informiert, sofern dem keine rechtlichen
            Hindernisse entgegenstehen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 9 Plattform als Vermittler</h2>
          <p>
            Die Plattform stellt lediglich die technische Infrastruktur für den Austausch von Informationen bereit.
            Der Anbieter ist nicht Vertragspartei von Vereinbarungen, die zwischen Nutzern der Plattform geschlossen
            werden (z. B. bei Kontaktaufnahme über Anzeigen). Der Anbieter übernimmt keinerlei Haftung für Verträge,
            Absprachen oder sonstige Rechtsbeziehungen zwischen Nutzern.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 10 Haftungsbeschränkung</h2>
          <p>
            Der Anbieter haftet unbeschränkt nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung
            wesentlicher Vertragspflichten (Kardinalpflichten). Bei leichter Fahrlässigkeit ist die Haftung
            auf den vorhersehbaren, vertragstypischen Schaden begrenzt.
          </p>
          <p className="mt-2">
            Die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit bleibt unberührt.
            Ebenso bleiben Ansprüche nach dem Produkthaftungsgesetz unberührt.
          </p>
          <p className="mt-2">
            Der Anbieter haftet nicht für Schäden, die durch die Nutzung oder das Vertrauen auf die
            bereitgestellten Informationen, Werkzeuge oder nutzergenerierten Inhalte entstehen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 11 Freistellung</h2>
          <p>
            Der Nutzer stellt den Anbieter von sämtlichen Ansprüchen Dritter frei, die aufgrund rechtswidriger
            Nutzung der Plattform durch den Nutzer oder aufgrund von Inhalten, die der Nutzer auf der Plattform
            veröffentlicht hat, geltend gemacht werden. Der Nutzer übernimmt die Kosten der notwendigen
            Rechtsverteidigung einschließlich sämtlicher Gerichts- und Anwaltskosten in gesetzlicher Höhe.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 12 Verfügbarkeit der Plattform</h2>
          <p>
            Der Anbieter bemüht sich um eine möglichst unterbrechungsfreie Verfügbarkeit der Plattform.
            Es besteht jedoch kein Anspruch auf ständige Verfügbarkeit. Der Anbieter behält sich das Recht vor,
            die Plattform jederzeit für Wartungsarbeiten, Updates oder aus sonstigen Gründen vorübergehend
            einzuschränken oder einzustellen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 13 Änderungen der Plattform und der AGB</h2>
          <p>
            Der Anbieter behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden auf der
            Plattform veröffentlicht. Die weitere Nutzung der Plattform nach Veröffentlichung geänderter AGB
            gilt als Zustimmung zu den Änderungen.
          </p>
          <p className="mt-2">
            Der Anbieter behält sich ferner das Recht vor, die Plattform, ihre Funktionen, ihr Design und
            ihre Inhalte jederzeit zu ändern, zu erweitern oder einzustellen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 14 Anwendbares Recht und Gerichtsstand</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            Sofern der Nutzer Kaufmann, eine juristische Person des öffentlichen Rechts oder ein
            öffentlich-rechtliches Sondervermögen ist, ist der Gerichtsstand für alle Streitigkeiten
            aus oder im Zusammenhang mit diesen AGB der Sitz des Anbieters.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">§ 15 Salvatorische Klausel</h2>
          <p>
            Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder werden,
            so bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen
            oder undurchführbaren Bestimmung tritt diejenige wirksame und durchführbare Bestimmung,
            deren Wirkungen der wirtschaftlichen Zielsetzung am nächsten kommen.
          </p>
          <p className="mt-2">Stand: März 2026</p>
        </section>
      </div>
    </div>
    </>
  );
}
