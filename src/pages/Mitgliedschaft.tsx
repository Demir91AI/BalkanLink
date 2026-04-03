import PageNav from "@/components/navigation/PageNav";

export default function Mitgliedschaft() {
  return (
    <>
    <PageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Premium – Zahlungsbedingungen &amp; Widerrufsbelehrung</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Leistungsbeschreibung</h2>
          <p>
            Die Plattform „BalkanLink" bietet kostenpflichtige digitale Inhalte und Funktionen an
            (nachfolgend „Premium-Leistungen"). Diese umfassen insbesondere:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Digitale Formularhilfen und erweiterte Ausfüllhilfen</li>
            <li>Zugang zu Premium-Informationsinhalten</li>
            <li>Erweiterte Werkzeuge und Funktionen</li>
          </ul>
          <p className="mt-2">
            Die Premium-Leistungen sind <strong>digitale Inhalte</strong>, die nicht auf einem körperlichen
            Datenträger geliefert werden. Nach dem Kauf erfolgt die <strong>sofortige Freischaltung</strong>
            {" "}und Bereitstellung der Inhalte.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Preise und Zahlung</h2>
          <p>
            Alle angegebenen Preise verstehen sich als Endpreise. Aufgrund der Anwendung der Kleinunternehmerregelung
            gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen. Es fallen keine zusätzlichen Versandkosten an,
            da es sich um digitale Leistungen handelt.
          </p>
          <p className="mt-2">
            Die Zahlung erfolgt über die auf der Plattform angebotenen Zahlungsmethoden. Der Kaufpreis wird
            mit Abschluss des Bestellvorgangs fällig.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Vertragsschluss</h2>
          <p>
            Die Darstellung der Premium-Leistungen auf der Plattform stellt kein rechtlich bindendes Angebot dar,
            sondern eine unverbindliche Aufforderung zur Abgabe einer Bestellung. Durch Klicken auf den Button
            „<strong>zahlungspflichtig bestellen</strong>" gibt der Nutzer ein verbindliches Kaufangebot ab.
            Der Vertrag kommt mit der Bestätigung durch den Anbieter (Freischaltung) zustande.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Widerrufsbelehrung</h2>

          <div className="rounded-lg border border-border bg-muted/30 p-5 mt-3">
            <h3 className="font-bold text-foreground mb-3">Widerrufsrecht</h3>
            <p>
              Sie haben das Recht, binnen <strong>vierzehn Tagen</strong> ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            </p>
            <p className="mt-2">
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
            </p>
            <p className="mt-2">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
            </p>
            <p className="mt-1">
              <strong>RealCore Digital</strong><br />
              Inhaber: Demir Sinanovic<br />
              Münchener Straße 78, 83395 Freilassing<br />
              E-Mail: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a>
            </p>
            <p className="mt-2">
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail)
              über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
            </p>
            <p className="mt-2">
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
              Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
            </p>

            <h3 className="font-bold text-foreground mt-4 mb-2">Folgen des Widerrufs</h3>
            <p>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
              über Ihren Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel,
              das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich
              etwas anderes vereinbart.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Vorzeitiges Erlöschen des Widerrufsrechts</h2>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5 mt-3">
            <p>
              Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung von digitalen Inhalten, die nicht
              auf einem körperlichen Datenträger geliefert werden, wenn der Unternehmer mit der Ausführung des
              Vertrags begonnen hat, nachdem der Verbraucher:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <strong>ausdrücklich zugestimmt hat</strong>, dass der Unternehmer mit der Ausführung des Vertrags
                vor Ablauf der Widerrufsfrist beginnt, und
              </li>
              <li>
                <strong>seine Kenntnis davon bestätigt hat</strong>, dass er durch seine Zustimmung mit Beginn der
                Ausführung des Vertrags sein Widerrufsrecht verliert
              </li>
            </ul>
            <p className="mt-3">(§ 356 Abs. 5 BGB)</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-5 mt-4">
            <h3 className="font-bold text-foreground mb-2">Einwilligungstext (Checkbox)</h3>
            <p className="italic">
              „Ich verlange ausdrücklich, dass die Ausführung der digitalen Dienstleistung sofort beginnt,
              und mir ist bekannt, dass ich dadurch mein Widerrufsrecht verliere."
            </p>
          </div>

          <p className="mt-4">
            Der Bestellvorgang wird über den Button „<strong>zahlungspflichtig bestellen</strong>" abgeschlossen.
            Die Aktivierung der Checkbox ist Voraussetzung für die sofortige Freischaltung.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. Kein Anspruch auf Rückerstattung nach Nutzung</h2>
          <p>
            Sofern das Widerrufsrecht gemäß § 356 Abs. 5 BGB wirksam erloschen ist, besteht nach der Freischaltung
            und Nutzung der digitalen Inhalte <strong>kein Anspruch auf Rückerstattung</strong> des Kaufpreises.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">7. Kein Beratungsvertrag</h2>
          <p>
            Die Premium-Leistungen stellen keine individuelle Rechts-, Steuer- oder sonstige Beratung dar.
            Es handelt sich um standardisierte digitale Informationsinhalte. Ein Beratungsvertrag oder
            Mandatsverhältnis wird durch den Kauf nicht begründet.
          </p>
        </section>

        <section>
          <p className="text-xs text-muted-foreground/60">Stand: März 2026</p>
        </section>
      </div>
    </div>
    </>
  );
}
