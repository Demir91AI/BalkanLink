import PageNav from "@/components/navigation/PageNav";

export default function Disclaimer() {
  return (
    <>
    <SubpageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Haftungsausschluss – Formulare, Tools &amp; Informationsinhalte</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Allgemeiner Hinweis</h2>
          <p>
            Die auf der Plattform „BalkanLink" bereitgestellten Inhalte – einschließlich Informationstexte,
            Formularhilfen, Werkzeuge, Rechner, Verzeichnisse, KI-gestützte Assistenten und den Dokumenten-Check –
            dienen ausschließlich der <strong>allgemeinen Information und Orientierung</strong>. Sie stellen
            keine Rechtsberatung, Steuerberatung, Finanzberatung oder sonstige professionelle Beratung dar
            und ersetzen diese nicht.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Keine rechtliche Verbindlichkeit</h2>
          <p>
            Keiner der auf dieser Plattform veröffentlichten Inhalte begründet einen Anspruch, ein Recht oder
            eine Pflicht. Die bereitgestellten Informationen haben <strong>keine rechtliche Bindungswirkung</strong>.
            Verbindliche Auskünfte erteilen ausschließlich die zuständigen Behörden, Gerichte, Rechtsanwälte
            oder Steuerberater.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Keine Garantie auf Richtigkeit</h2>
          <p>
            Alle Angaben erfolgen nach bestem Wissen und Gewissen. Es wird jedoch <strong>keinerlei Gewähr</strong>
            {" "}für die Richtigkeit, Vollständigkeit, Aktualität, Zuverlässigkeit oder Eignung der bereitgestellten
            Informationen für einen bestimmten Zweck übernommen. Gesetzliche Regelungen, behördliche Vorschriften
            und Verwaltungspraxis können sich jederzeit ändern.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Offizielle Stellen sind maßgeblich</h2>
          <p>
            Für alle behördlichen Vorgänge, Anträge, Fristen und rechtlichen Fragen sind ausschließlich die
            offiziellen Stellen, Behörden und gesetzlichen Bestimmungen maßgeblich. Die auf der Plattform
            bereitgestellten Informationen ersetzen in keinem Fall den Gang zur zuständigen Behörde oder
            die Konsultation eines qualifizierten Beraters.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Formularhilfen und Ausfüllhilfen</h2>
          <p>
            Die auf der Plattform angebotenen Formularhilfen bieten allgemeine Hinweise zum Ausfüllen amtlicher
            Formulare. Sie ersetzen nicht die offizielle Anleitung der jeweiligen Behörde. Der Nutzer ist selbst
            dafür verantwortlich, die Richtigkeit und Vollständigkeit seiner Angaben in amtlichen Formularen
            sicherzustellen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. KI-gestützter Assistent</h2>
          <p>
            Der auf der Plattform integrierte Assistent nutzt künstliche Intelligenz zur Generierung von Antworten.
            Die Ausgaben des Assistenten stellen <strong>keine verbindlichen Aussagen</strong> dar und können
            Ungenauigkeiten oder Fehler enthalten. Der Assistent gibt keine Zusagen, Garantien oder
            Rechtsauslegungen. Die Nutzung erfolgt auf eigene Verantwortung des Nutzers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">7. Dokumenten-Check</h2>
          <p>
            Die Funktion „Dokumenten-Check" bietet eine allgemeine Erklärung zu hochgeladenen Dokumenten.
            Die Ausgabe stellt <strong>keine verbindliche Interpretation</strong>, keine Rechtsberatung
            und keinen behördlichen Bescheid dar. Hochgeladene Dateien werden nicht dauerhaft gespeichert.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">8. Nutzung auf eigene Verantwortung</h2>
          <p>
            Die Nutzung sämtlicher Inhalte und Funktionen der Plattform erfolgt auf eigene Verantwortung
            und eigenes Risiko des Nutzers. Der Anbieter übernimmt keine Haftung für Entscheidungen, Handlungen
            oder Unterlassungen, die auf Grundlage der bereitgestellten Informationen getroffen werden.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">9. Externe Links</h2>
          <p>
            Diese Plattform enthält Links zu externen Websites Dritter. Für deren Inhalte, Datenschutzpraktiken
            und Verfügbarkeit übernimmt der Anbieter keine Verantwortung. Die Verlinkung erfolgt ausschließlich
            zu Informationszwecken und begründet keine Empfehlung oder Billigung der verlinkten Inhalte.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
