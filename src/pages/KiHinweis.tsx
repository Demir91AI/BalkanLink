import PageNavBar from "@/components/navigation/PageNavBar";

export default function KiHinweis() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar />

      <h1 className="mb-2 text-3xl font-bold">
        Napomena o upotrebi vještačke inteligencije
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        KI-Hinweis — Transparentnost, ograničenja i odricanje od odgovornosti
        za AI sadržaje na platformi BalkanLink
      </p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        {/* CRVENO UPOZORENJE */}
        <section>
          <div className="rounded-md border border-red-500/40 bg-red-500/[0.08] p-5">
            <p className="font-bold text-red-300 text-base">
              ⚠ Obavezno pročitaj prije korištenja AI asistenta
            </p>
            <p className="mt-3 text-red-200/90">
              BalkanLink AI Asistent pruža isključivo{" "}
              <strong>opće, informativne odgovore</strong>. Odgovori koje
              generira vještačka inteligencija{" "}
              <strong>
                ne predstavljaju pravni, porezni, finansijski ni medicinski savjet
              </strong>{" "}
              i ne mogu zamijeniti konzultaciju s nadležnim organima ili
              stručnim licima.
            </p>
            <p className="mt-3 text-red-200/90">
              <strong>BalkanLink ne snosi nikakvu odgovornost</strong> za
              tačnost, potpunost, aktuelnost ni primjenjivost odgovora koje
              generira AI asistent. Svaka odluka donesena na osnovu AI odgovora
              donosi se na{" "}
              <strong>isključivu vlastitu odgovornost korisnika</strong>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Koje AI tehnologije koristimo?
          </h2>
          <p>
            Platforma koristi model{" "}
            <strong className="text-foreground">Claude</strong> kompanije{" "}
            <strong className="text-foreground">Anthropic PBC</strong>{" "}
            (San Francisco, SAD) putem API poziva za sljedeće funkcije:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>
              <strong className="text-foreground">BalkanLink AI Asistent</strong>{" "}
              — Odgovara na pitanja o životu u Njemačkoj, birokratiji,
              vizama, socijalnim naknadama, radu i stanovanju na bosanskom
              jeziku.
            </li>
            <li>
              <strong className="text-foreground">Dokumenten-Check</strong>{" "}
              — Analizira učitane dokumente i pruža informativne napomene
              o sadržaju.
            </li>
          </ul>
          <p className="mt-3 text-xs">
            Model:{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              claude-sonnet-4-20250514
            </code>{" "}
            (Anthropic Claude Sonnet 4)
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. Kako AI funkcionira?
          </h2>
          <p>
            Kada postaviš pitanje, tvoj upit se šalje Anthropic API-ju,
            tamo se obrađuje i vraća odgovor u roku od nekoliko sekundi.
            AI asistent je konfiguriran s detaljnim znanjem o:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Viznim i boravišnim pravilima za balkanske državljane u Njemačkoj</li>
            <li>
              Socijalnim naknadama (Bürgergeld, Kindergeld, Elterngeld,
              BAföG, Wohngeld itd.)
            </li>
            <li>Radnom pravu, stanarskom pravu i zdravstvenom osiguranju</li>
            <li>Poreznim osnovama za strane radnike</li>
            <li>Procedurama kod ključnih njemačkih ureda</li>
          </ul>
          <p className="mt-3">
            Bez obzira na kvalitet konfiguracije,{" "}
            <strong className="text-foreground">
              AI modeli mogu generirati netačne, nepotpune ili zastarjele
              odgovore
            </strong>{" "}
            — tzv. &quot;halucinacije&quot;. Ovo je tehnološko ograničenje svih
            trenutno dostupnih AI sistema i nije moguće u potpunosti
            eliminirati.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Ograničenja AI sistema — šta AI ne može i ne smije
          </h2>
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-4 text-yellow-200/80">
            <ul className="list-disc ml-4 space-y-2">
              <li>
                <strong>Ne može davati pravno obavezujuće savjete</strong>{" "}
                niti te zastupati u upravnim ili sudskim postupcima
              </li>
              <li>
                <strong>Ne garantuje tačnost informacija</strong> — zakoni,
                iznosi naknada i procedure mijenjaju se bez prethodne najave
              </li>
              <li>
                <strong>Ne poznaje tvoju specifičnu situaciju</strong> —
                isti odgovor može biti tačan za jednu osobu, a netačan za
                drugu ovisno o individualnim okolnostima
              </li>
              <li>
                <strong>Ne može pristupiti bazama ureda</strong> niti
                provjeriti status tvojeg predmeta, zahtjeva ili dozvole
              </li>
              <li>
                <strong>Ne može predvidjeti odluke</strong> konkretnih
                Ausländerbehörde, Jobcenter-a, Finanzamt-a ni sudova —
                praksa varira po gradu i saveznoj zemlji
              </li>
              <li>
                <strong>Može pogriješiti</strong> — čak i uvjerljivo
                formuliran odgovor može biti faktički netačan
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Odricanje od odgovornosti za AI sadržaje
          </h2>
          <p>
            U skladu s §7 DDG-a i općim odredbama građanskog prava,
            <strong className="text-foreground"> BalkanLink izričito isključuje
            svaku odgovornost</strong> za sadržaje koje generira AI asistent,
            uključujući ali ne ograničavajući se na:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Netačne ili zastarjele informacije</strong>{" "}
              — AI je treniran na podacima s određenim datumom zaključenja
              i ne može pratiti promjene zakona u realnom vremenu
            </li>
            <li>
              <strong className="text-foreground">Nepotpune odgovore</strong>{" "}
              — AI možda neće uzeti u obzir sve relevantne okolnosti
              tvoje situacije
            </li>
            <li>
              <strong className="text-foreground">Štetu nastalu primjenom AI savjeta</strong>{" "}
              — bilo kakav gubitak, propuštena korist, kazne, odbijeni
              zahtjevi ili drugi negativni ishodi nastali oslanjanjem na
              AI odgovore
            </li>
            <li>
              <strong className="text-foreground">Odluke nadležnih organa</strong>{" "}
              — ishod tvojeg predmeta kod Ausländerbehörde, Jobcenter-a,
              BAMF-a ili bilo kojeg drugog tijela ne može se predvidjeti
              putem AI-a
            </li>
            <li>
              <strong className="text-foreground">Propuštene rokove</strong>{" "}
              — AI ne zna za konkretne rokove tvojeg predmeta;
              rokove uvijek provjeri direktno kod nadležnog organa
            </li>
          </ul>
          <p className="mt-3 rounded-md border border-border bg-muted/30 p-3">
            <strong className="text-foreground">Zakonska osnova odricanja:</strong>{" "}
            Odricanje od odgovornosti za AI sadržaje zasnovano je na §7 st. 1 DDG-a
            (vlastiti sadržaj), §521 BGB-a (besplatne usluge) i §276 BGB-a
            (isključenje obične nepažnje ugovorom). Odgovornost za namjerno ili
            grubom nepažnjom prouzrokovanu štetu i za povredu tijela ili zdravlja
            ostaje nepromijenjena.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Tvoja obaveza provjere — uvijek konzultuj zvanične izvore
          </h2>
          <p>
            Svaku informaciju dobivenu od AI asistenta{" "}
            <strong className="text-foreground">
              dužan/na si provjeriti na zvaničnim izvorima
            </strong>{" "}
            prije preduzimanja bilo koje radnje:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>
              <a href="https://www.bamf.de" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">bamf.de</a>{" "}
              — Savezni ured za migracije i izbjeglice
            </li>
            <li>
              <a href="https://www.arbeitsagentur.de" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">arbeitsagentur.de</a>{" "}
              — Federalna agencija za zapošljavanje
            </li>
            <li>
              <a href="https://www.bundesregierung.de" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">bundesregierung.de</a>{" "}
              — Vlada SR Njemačke
            </li>
            <li>
              <a href="https://www.make-it-in-germany.com" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">make-it-in-germany.com</a>{" "}
              — Zvanični portal za stručnjake iz inostranstva
            </li>
            <li>
              Nadležna Ausländerbehörde, Jobcenter ili Finanzamt u
              tvom gradu
            </li>
            <li>
              Licencirani advokat (Rechtsanwalt) ili savjetovalište
              (AWO, Caritas, Diakonie, Pro Asyl) za pravna pitanja
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Sigurnosne mjere i kvalitet AI sistema
          </h2>
          <p>
            Kako bismo minimizirali rizik od netačnih ili štetnih odgovora,
            primjenjujemo sljedeće mjere:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Detaljan sistemski prompt</strong>{" "}
              — AI asistent je konfiguriran s opsežnim znanjem o
              relevantnim zakonima i procedurama te uputama da uvijek
              preporuči provjeru na zvaničnim izvorima
            </li>
            <li>
              <strong className="text-foreground">Zabrana štetnih odgovora</strong>{" "}
              — AI je konfiguriran da odbije davati savjete koji bi mogli
              potaknuti kršenje zakona, diskriminaciju ili nasilje
            </li>
            <li>
              <strong className="text-foreground">Transparentno označavanje</strong>{" "}
              — svi AI odgovori su jasno označeni oznakom &quot;AI odgovor&quot;
              u skladu s EU AI Act-om i čl. 13 DSGVO-a
            </li>
            <li>
              <strong className="text-foreground">Redovno ažuriranje znanja</strong>{" "}
              — sistemski prompt se ažurira pri važnim zakonskim
              promjenama, ali između ažuriranja može doći do zastarjelosti
            </li>
            <li>
              <strong className="text-foreground">Anthropic-ova sigurnosna politika</strong>{" "}
              — Claude model je razvijen s fokusom na sigurnost i
              smanjenje štetnih odgovora (Constitutional AI metodologija)
            </li>
          </ul>
          <p className="mt-3 text-xs opacity-70">
            Ove mjere značajno smanjuju, ali{" "}
            <strong>ne eliminuju u potpunosti</strong> mogućnost netačnih
            odgovora. Tvoja vlastita provjera informacija ostaje neophodna.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. Zaštita podataka pri AI korištenju
          </h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>
              Sklopljen je DPA ugovor između BalkanLink-a i Anthropic-a
              (čl. 28 DSGVO)
            </li>
            <li>
              Prijenos u SAD po standardnim ugovornim klauzulama EU
              (SCC — čl. 46 DSGVO)
            </li>
            <li>
              <strong className="text-foreground">
                Tvoji podaci se ne koriste za treniranje AI modela
              </strong>{" "}
              (Anthropic API politika)
            </li>
            <li>
              Historiju razgovora možeš obrisati u Postavkama računa
            </li>
          </ul>
          <div className="mt-3 rounded-md border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-200/70">
            <strong>Preporuka:</strong> Nikada ne unosite u AI asistenta
            osjetljive osobne podatke: JMBG/OIB, broj pasoša, podatke o
            platnoj kartici, medicinske dijagnoze ni slično.
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. EU AI Act — usklađenost
          </h2>
          <p>
            BalkanLink koristi AI u kategoriji{" "}
            <strong className="text-foreground">
              General Purpose AI (GPAI)
            </strong>{" "}
            prema Zakonu o AI EU (Uredba (EU) 2024/1689). Platforma ne
            koristi AI za biometrijsku identifikaciju, automatizovano
            donošenje odluka s pravnim posljedicama, Social Scoring ni
            manipulaciju ponašanjem. Upotreba je klasificirana kao{" "}
            <strong className="text-foreground">nizak rizik</strong>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            9. Više o Anthropic-u
          </h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>
              <a href="https://www.anthropic.com" target="_blank"
                rel="noopener noreferrer" className="text-primary hover:underline">
                anthropic.com
              </a>
            </li>
            <li>
              <a href="https://www.anthropic.com/privacy" target="_blank"
                rel="noopener noreferrer" className="text-primary hover:underline">
                anthropic.com/privacy
              </a>
            </li>
            <li>
              <a href="https://www.anthropic.com/usage-policy" target="_blank"
                rel="noopener noreferrer" className="text-primary hover:underline">
                anthropic.com/usage-policy
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs opacity-60">Verzija: April 2026</p>
        </section>

      </div>
    </div>
  );
}
