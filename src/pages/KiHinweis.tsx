import PageNavBar from "@/components/navigation/PageNavBar";

export default function KiHinweis() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar />

      <h1 className="mb-2 text-3xl font-bold">Napomena o upotrebi vještačke inteligencije</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        KI-Hinweis — Transparentnost u upotrebi AI tehnologije na platformi BalkanLink
      </p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Koje AI tehnologije koristimo?</h2>
          <p>
            Platforma koristi model{" "}
            <strong className="text-foreground">Claude</strong> kompanije{" "}
            <strong className="text-foreground">Anthropic PBC</strong> (San Francisco, SAD)
            za sljedeće funkcije:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-2">
            <li>
              <strong className="text-foreground">BalkanLink AI Asistent</strong> — Odgovara
              na pitanja o životu u Njemačkoj, birokratiji, vizama, socijalnim naknadama,
              radu i stanovanju, na bosanskom jeziku.
            </li>
            <li>
              <strong className="text-foreground">Dokumenten-Check</strong> — Analizira
              učitane dokumente i pruža informativne napomene o sadržaju.
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
          <h2 className="mb-3 text-lg font-semibold text-foreground">Kako AI funkcionira?</h2>
          <p>
            Kada postaviš pitanje, tvoj upit se šalje Anthropic API-ju, obrađuje se i vraća
            odgovor u roku od nekoliko sekundi. AI asistent ima znanje o:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Viznim i boravišnim pravilima za balkanske državljane u Njemačkoj</li>
            <li>Socijalnim naknadama (Bürgergeld, Kindergeld, Elterngeld, BAföG, Wohngeld itd.)</li>
            <li>Radnom pravu, stanarskom pravu i zdravstvenom osiguranju</li>
            <li>Poreznim osnovama za strane radnike</li>
            <li>Procedurama kod ključnih njemačkih ureda</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Ograničenja AI sistema</h2>
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-4 text-yellow-700 dark:text-yellow-200/80">
            <p className="font-semibold text-yellow-600 dark:text-yellow-300">Šta AI ne može i ne smije:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Davati pravno obavezujuće savjete ili zastupati te u postupcima</li>
              <li>Garantovati tačnost svih informacija — zakoni se mijenjaju</li>
              <li>Poznavati specifičnosti tvoje situacije bez tvog objašnjenja</li>
              <li>Pristupiti bazama podataka ureda niti provjeriti status tvog predmeta</li>
              <li>Predvidjeti odluke konkretnih Ausländerbehörde ili sudova</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Zaštita podataka pri AI korištenju</h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Sklopljen je DPA ugovor između BalkanLink-a i Anthropic-a (čl. 28 DSGVO)</li>
            <li>
              Prijenos u SAD po standardnim ugovornim klauzulama EU (SCC — čl. 46 DSGVO)
            </li>
            <li>
              <strong className="text-foreground">
                Tvoji podaci se ne koriste za treniranje AI modela
              </strong>{" "}
              (Anthropic API politika)
            </li>
            <li>Historiju razgovora možeš obrisati u Postavkama računa</li>
          </ul>
          <div className="mt-3 rounded-md border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-700 dark:text-red-200/70">
            <strong>Preporuka:</strong> Ne unosi u AI asistenta osjetljive osobne podatke:
            JMBG/OIB, broj pasoša, podatke o platnoj kartici, medicinske informacije.
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">EU AI Act — usklađenost</h2>
          <p>
            BalkanLink koristi AI u kategoriji{" "}
            <strong className="text-foreground">General Purpose AI (GPAI)</strong> prema
            Zakonu o AI EU (Uredba (EU) 2024/1689). Platforma{" "}
            <strong className="text-foreground">ne koristi AI za:</strong>
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Biometrijsku identifikaciju osoba</li>
            <li>Automatizovano donošenje odluka s pravnim posljedicama</li>
            <li>Socijalnu bodovnu evaluaciju (Social Scoring)</li>
            <li>Manipulaciju ponašanjem korisnika</li>
          </ul>
          <p className="mt-2">
            Upotreba AI-a klasificirana je kao{" "}
            <strong className="text-foreground">nizak rizik</strong> prema EU AI Act-u.
            Svi AI odgovori su jasno označeni oznakom "AI odgovor" u skladu s načelom
            transparentnosti (čl. 13 DSGVO + EU AI Act).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Više o Anthropic-u</h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>
              <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">anthropic.com</a>
            </li>
            <li>
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">anthropic.com/privacy</a>
            </li>
            <li>
              <a href="https://www.anthropic.com/usage-policy" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">anthropic.com/usage-policy</a>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
