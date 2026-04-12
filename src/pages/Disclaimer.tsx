import PageNavBar from "@/components/navigation/PageNavBar";

export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar />

      <h1 className="mb-2 text-3xl font-bold">Odricanje odgovornosti</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Haftungsausschluss — Važne napomene o ograničenju odgovornosti platforme BalkanLink
      </p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <div className="rounded-md border border-red-500/30 bg-red-500/5 p-4 text-red-700 dark:text-red-200/80">
            <p className="font-semibold text-red-600 dark:text-red-300">⚠ Važno upozorenje</p>
            <p className="mt-1">
              BalkanLink je <strong>informacijska platforma</strong> — ne pravna kancelarija,
              ne savjetovalište, ne zastupnik. Sve informacije služe isključivo općem
              informiranju i ne mogu zamijeniti stručni pravni, porezni ni administrativni savjet.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Nema pravnog savjetovanja</h2>
          <p>
            Svi sadržaji — Smart Guide vodiči, Musterformulare, Viza Navigator, AI asistent,
            DeutschTrainer i ostali alati —{" "}
            <strong className="text-foreground">ne predstavljaju pravno savjetovanje</strong>{" "}
            u smislu RDG-a. Korištenjem platforme{" "}
            <strong className="text-foreground">ne nastaje punomoć ni ugovor o savjetovanju</strong>.
          </p>
          <p className="mt-2">Za pravno obavezujuće informacije obrati se:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Nadležnoj službi (Ausländerbehörde, Jobcenter, Finanzamt, Standesamt itd.)</li>
            <li>Licenciranom advokatu (Rechtsanwalt)</li>
            <li>Priznatom savjetovalištu (AWO, Caritas, Diakonie, Pro Asyl)</li>
            <li>Poreznom savjetniku (Steuerberater) za porezna pitanja</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Tačnost i aktuelnost informacija</h2>
          <p>
            Nastojimo redovito ažurirati sve sadržaje, ali{" "}
            <strong className="text-foreground">
              ne garantujemo tačnost, potpunost ni aktuelnost
            </strong>{" "}
            objavljenih informacija. Zakoni, iznosi naknada i administrativni postupci
            mogu se mijenjati bez prethodne najave.
          </p>
          <p className="mt-2">Posebno napominjemo:</p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Vizni propisi mijenjaju se po odlukama Vlade i EU-a</li>
            <li>Iznosi naknada (Bürgergeld, Kindergeld, BAföG itd.) ažuriraju se godišnje</li>
            <li>Zahtjevi Ausländerbehörde variraju po saveznoj zemlji i gradu</li>
            <li>Obrasci se povremeno mijenjaju — uvijek preuzmi aktuelnu verziju s web stranice nadležnog organa</li>
          </ul>
          <p className="mt-2">
            <strong className="text-foreground">
              Uvijek provjeri informacije na zvaničnim izvorima
            </strong>{" "}
            (bundesregierung.de, bamf.de, arbeitsagentur.de, make-it-in-germany.com)
            prije preduzimanja bilo koje radnje.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Ograničenje odgovornosti za sadržaj</h2>
          <p>
            Odgovaramo za vlastite sadržaje po §7 DDG-a i općim propisima, ograničeno na
            namjerno pogrešne ili grubim nemarom netačne informacije.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Isključujemo odgovornost za:</strong>
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Gubitke nastale zbog oslanjanja na informacije s platforme</li>
            <li>Zastarjele informacije nastale uslijed zakonodavnih promjena</li>
            <li>Odluke administrativnih organa donesene na osnovu sadržaja s platforme</li>
            <li>Greške pri popunjavanju obrazaca na osnovu naših informacija</li>
            <li>Privremenu nedostupnost platforme</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Vanjske poveznice</h2>
          <p>
            Sadržaj vanjskih stranica nije pod našom kontrolom. Ne preuzimamo odgovornost
            za eventualne naknadne promjene. Obavijesti nas o problematičnom sadržaju na{" "}
            <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">
              kontakt@balkanlink.de
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. AI asistent — posebne napomene</h2>
          <p>
            AI odgovori su automatski generirani i{" "}
            <strong className="text-foreground">
              mogu sadržavati greške, zastarjele podatke ili nepotpune informacije
            </strong>.
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>AI ne može predvidjeti individualne okolnosti tvog slučaja</li>
            <li>AI odgovori ne zamjenjuju konzultaciju s nadležnim organom ili stručnjakom</li>
            <li>Ne preduzimaj pravno relevantne radnje isključivo na osnovu AI odgovora</li>
            <li>Provjeri sve važne informacije na zvaničnim stranicama nadležnih institucija</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. Musterformulare</h2>
          <p>
            Musterformulare su{" "}
            <strong className="text-foreground">informativni primjeri</strong> koji pomažu
            razumijevanju obrazaca. Ne garantujemo da su uvijek usklađeni s najnovijim
            zvaničnim verzijama.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">
              Uvijek preuzmi i koristi zvanični obrazac
            </strong>{" "}
            s web stranice nadležnog organa — linkovi su dostupni na svakom Musterformularu.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">7. Ograničenje prema §521 BGB</h2>
          <p>
            U mjeri u kojoj je zakonski dopušteno, ograničavamo odgovornost na namjeru i grubu
            nepažnju (§521 BGB za besplatne usluge; §276 BGB za plaćene). Odgovornost za
            povredu tijela ili zdravlja ostaje nepromijenjena.
          </p>
        </section>

      </div>
    </div>
  );
}
