import PageNav from "@/components/navigation/PageNav";

export default function Impressum() {
  return (
    <>
    <PageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Impressum</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Angaben gemäß § 5 DDG</h2>
          <p>
            <strong>RealCore Digital</strong><br />
            Inhaber: Demir Sinanovic<br />
            Münchener Straße 78<br />
            83395 Freilassing<br />
            Deutschland
          </p>
          <p className="mt-3">
            <strong>Rechtsform:</strong> Einzelunternehmen<br />
            <strong>Handelsregister:</strong> Keine Eintragung (nicht eingetragen)
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a><br />
            Telefon: auf Anfrage
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Umsatzsteuer</h2>
          <p>
            Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.<br />
            Eine Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG liegt nicht vor.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            Demir Sinanovic<br />
            Münchener Straße 78<br />
            83395 Freilassing<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Beschreibung der Plattform</h2>
          <p>
            BalkanLink ist eine digitale Informationsplattform, die Werkzeuge, Formularhilfen, strukturierte Informationsinhalte
            und nutzergenerierte Inhalte bereitstellt. Die Plattform richtet sich an Personen aus dem Balkan-Raum,
            die in Deutschland leben oder eine Zuwanderung planen. BalkanLink ist eine <strong>unabhängige, private Plattform</strong>.
            Es besteht keinerlei Verbindung zu staatlichen Behörden, Botschaften, Konsulaten oder sonstigen offiziellen Stellen
            der Bundesrepublik Deutschland oder anderer Staaten.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieser Plattform wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
            und Aktualität der bereitgestellten Inhalte wird jedoch keine Gewähr übernommen. Gemäß §§ 7, 8 DDG sind wir als
            Diensteanbieter für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Eine Verpflichtung
            zur Überwachung übermittelter oder gespeicherter fremder Informationen besteht nach §§ 8 bis 10 DDG nicht.
          </p>
          <p className="mt-2">
            Die auf dieser Plattform bereitgestellten Informationen stellen <strong>keine Rechtsberatung, Steuerberatung,
            Finanzberatung oder sonstige professionelle Beratung</strong> dar. Sie dienen ausschließlich der allgemeinen
            Information und Orientierung. Für verbindliche Auskünfte sind die jeweils zuständigen Behörden, Rechtsanwälte
            oder Steuerberater zu konsultieren.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Haftung für Links</h2>
          <p>
            Diese Plattform enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
            Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
            Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Urheberrecht</h2>
          <p>
            Die durch den Betreiber dieser Plattform erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht.
            Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
            Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
            Gebrauch gestattet.
          </p>
          <p className="mt-2">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
            Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
            aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Inhalte umgehend entfernen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Keine Rechtsberatung</h2>
          <p>
            Sämtliche auf dieser Plattform bereitgestellten Inhalte – einschließlich der Formularhilfen, Werkzeuge,
            Informationstexte und KI-gestützten Assistenzfunktionen – stellen keine Rechtsberatung im Sinne des
            Rechtsdienstleistungsgesetzes (RDG) dar. Die Nutzung der Plattform begründet kein Mandatsverhältnis
            und keinen Beratungsvertrag.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mt-2">
            Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
