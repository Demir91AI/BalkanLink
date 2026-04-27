import PageNavBar from "@/components/navigation/PageNavBar";

export default function Impressum() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
        <PageNavBar />

        <h1 className="mb-2 text-3xl font-bold">Impressum</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Zakonski obavezne informacije o operatoru platforme
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Podaci o operatoru prema §5 DDG
            </h2>
            <p>
              <strong className="text-foreground">RealCore Digital</strong><br />
              Vlasnik: Demir Sinanovic<br />
              Münchener Straße 78<br />
              83395 Freilassing<br />
              Deutschland
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Pravna forma:</strong> Einzelunternehmen (samostalni obrt)
            </p>
            <div className="mt-3 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-3 text-xs text-yellow-700 dark:text-yellow-200/80">
              BalkanLink je <strong>privatna, nezavisna informacijska platforma</strong> bez ikakve
              veze s njemačkim državnim organima, ambasadama, konzulatima niti s bilo kojim
              zvaničnim tijelom Savezne Republike Njemačke ili bilo koje druge države.
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Kontakt</h2>
            <p>
              E-pošta:{" "}
              <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">
                kontakt@balkanlink.de
              </a><br />
              Web:{" "}
              <a href="https://balkanlink.de" className="text-primary hover:underline">
                https://balkanlink.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Poreski status</h2>
            <p>
              Mali poduzetnik prema §19 Zakona o porezu na promet (UStG) —{" "}
              <em>Kleinunternehmerregelung</em>.<br />
              Na računima <strong>ne prikazujemo PDV</strong>.
            </p>
            <p className="mt-2 text-xs opacity-70">
              Što to znači: Sve naše cijene su konačne cijene bez PDV-a. Kao mali poduzetnik
              nismo obveznici PDV-a — ne naplaćujemo ni ne uplaćujemo porez na dodatu vrijednost.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Odgovorna osoba za sadržaj prema §18 Abs. 2 MStV
            </h2>
            <p>
              Demir Sinanovic<br />
              Münchener Straße 78, 83395 Freilassing, Deutschland
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Opis platforme</h2>
            <p>
              BalkanLink je digitalna informacijska platforma za osobe iz balkanskih zemalja koje
              žive u Njemačkoj ili planiraju preseljenje. Platforma nudi:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Informativne vodiče kroz njemačku birokratiju (Smart Guide)</li>
              <li>Interaktivne pomoćnike za popunjavanje obrazaca (Musterformulare)</li>
              <li>Navigaciju kroz vizne i boravišne postupke (Viza Navigator)</li>
              <li>Kurs njemačkog jezika (DeutschTrainer A1–C2)</li>
              <li>AI asistenta za informativna pitanja (BalkanLink Asistent)</li>
              <li>Provjeru dokumenata (Dokumenten-Check)</li>
              <li>Oglasnik za dijasporu (Nudim / Tražim)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Odgovornost za sadržaj (§§7–10 DDG)
            </h2>
            <p>
              Sadržaj platforme izrađen je s najvećom pažnjom, ali ne preuzimamo odgovornost za
              tačnost, potpunost ni aktuelnost objavljenih informacija.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Važno:</strong> Informacije na ovoj platformi{" "}
              <strong>ne predstavljaju pravni, porezni ni finansijski savjet</strong>.
              Sadržaj služi isključivo općem informiranju i orijentaciji. Za obavezujuće
              informacije konsultuj nadležne organe, advokate ili porezne savjetnike.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Odgovornost za vanjske linkove
            </h2>
            <p>
              Platforma sadrži linkove na vanjske stranice. Na sadržaj tih stranica nemamo utjecaj
              i ne preuzimamo odgovornost za eventualne naknadne promjene. Ako primijetiš
              problematičan sadržaj, obavijesti nas na kontakt@balkanlink.de.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Autorska prava</h2>
            <p>
              Sadržaji platforme podliježu njemačkom zakonu o autorskim pravima. Umnožavanje i
              distribucija van zakonskih granica zahtijeva pisanu saglasnost autora.
              Preuzimanje je dozvoljeno samo za privatnu, nekomercijalnu upotrebu.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Nije pravno savjetovanje</h2>
            <p>
              Svi sadržaji — vodiči, obrasci, AI asistent, alati —{" "}
              <strong className="text-foreground">ne predstavljaju pravno savjetovanje</strong>{" "}
              u smislu RDG-a (Rechtsdienstleistungsgesetz). Korištenjem platforme{" "}
              <strong>ne nastaje punomoć ni ugovor o savjetovanju</strong>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Rješavanje sporova — OS platforma EU
            </h2>
            <p>
              Evropska komisija pruža platformu za online rješavanje sporova:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Nismo ni voljni ni obavezni sudjelovati u postupku rješavanja sporova pred
              arbitražnom komisijom za zaštitu potrošača.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
