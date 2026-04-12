import { useNavigate } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";

export default function NapomenaOKI() {
  const navigate = useNavigate();
  return (
    <>
      <PageNavBar onBack={() => navigate("/")} />
      <div className="container max-w-3xl py-16">
        <h1 className="mb-2 text-3xl font-bold">
          Napomena o upotrebi asistenta
        </h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Transparentnost, ograničenja i odricanje od odgovornosti
          za sadržaje koje generiše BalkanLink Asistent
        </p>
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <div className="rounded-md border border-red-400/30 bg-red-950/40 p-5">
              <p className="font-bold text-red-100 text-base">
                ⚠ Obavezno pročitaj prije korištenja asistenta
              </p>
              <p className="mt-3 text-red-100">
                BalkanLink Asistent pruža isključivo{" "}
                <strong>opće, informativne odgovore</strong>. Odgovori
                asistenta{" "}
                <strong>
                  ne predstavljaju pravni, porezni, finansijski ni
                  medicinski savjet
                </strong>{" "}
                i ne mogu zamijeniti konzultaciju s nadležnim organima
                ili stručnim licima.
              </p>
              <p className="mt-3 text-red-100">
                <strong>BalkanLink ne snosi nikakvu odgovornost</strong>{" "}
                za tačnost, potpunost, aktuelnost ni primjenjivost
                odgovora asistenta. Svaka odluka donesena na osnovu
                odgovora asistenta donosi se na{" "}
                <strong>isključivu vlastitu odgovornost korisnika</strong>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              1. Šta je BalkanLink Asistent?
            </h2>
            <p>
              BalkanLink Asistent je automatizirani sistem koji odgovara
              na pitanja o životu u Njemačkoj, birokratiji, vizama,
              socijalnim naknadama, radu i stanovanju — na bosanskom
              jeziku. Sistem je konfiguriran s detaljnim znanjem o:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Viznim i boravišnim pravilima za balkanske državljane</li>
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
                automatizirani sistemi mogu generirati netačne, nepotpune
                ili zastarjele odgovore
              </strong>{" "}
              — ovo je tehničko ograničenje koje nije moguće u potpunosti
              eliminirati.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              2. Ograničenja asistenta — šta ne može i ne smije
            </h2>
            <div className="rounded-md border border-yellow-400/25 bg-yellow-950/30 p-4 text-yellow-100">
              <ul className="list-disc ml-4 space-y-2">
                <li>
                  <strong>Ne može davati pravno obavezujuće savjete</strong>{" "}
                  niti te zastupati u upravnim ili sudskim postupcima
                </li>
                <li>
                  <strong>Ne garantuje tačnost informacija</strong> —
                  zakoni, iznosi naknada i procedure mijenjaju se bez
                  prethodne najave
                </li>
                <li>
                  <strong>Ne poznaje tvoju specifičnu situaciju</strong>{" "}
                  — isti odgovor može biti tačan za jednu osobu, a netačan
                  za drugu ovisno o individualnim okolnostima
                </li>
                <li>
                  <strong>Ne može pristupiti bazama ureda</strong> niti
                  provjeriti status tvojeg predmeta, zahtjeva ili dozvole
                </li>
                <li>
                  <strong>Ne može predvidjeti odluke</strong> konkretnih
                  Ausländerbehörde, Jobcenter-a ni sudova — praksa varira
                  po gradu i saveznoj zemlji
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
              3. Odricanje od odgovornosti za sadržaje asistenta
            </h2>
            <p>
              U skladu s §7 DDG-a i općim odredbama građanskog prava,
              <strong className="text-foreground"> BalkanLink izričito
              isključuje svaku odgovornost</strong> za sadržaje koje
              generiše asistent, uključujući:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-2">
              <li>
                <strong className="text-foreground">
                  Netačne ili zastarjele informacije
                </strong>{" "}
                — sistem ne može pratiti promjene zakona u realnom vremenu
              </li>
              <li>
                <strong className="text-foreground">
                  Nepotpune odgovore
                </strong>{" "}
                — sistem možda neće uzeti u obzir sve relevantne
                okolnosti tvoje situacije
              </li>
              <li>
                <strong className="text-foreground">
                  Štetu nastalu primjenom odgovora asistenta
                </strong>{" "}
                — gubitak, propuštena korist, kazne, odbijeni zahtjevi
                ili drugi negativni ishodi
              </li>
              <li>
                <strong className="text-foreground">
                  Odluke nadležnih organa
                </strong>{" "}
                — ishod tvojeg predmeta kod Ausländerbehörde, Jobcenter-a
                ili BAMF-a ne može se predvidjeti putem asistenta
              </li>
              <li>
                <strong className="text-foreground">
                  Propuštene rokove
                </strong>{" "}
                — asistent ne zna za konkretne rokove tvojeg predmeta;
                rokove uvijek provjeri direktno kod nadležnog organa
              </li>
            </ul>
            <p className="mt-3 rounded-md border border-white/10 bg-white/5 p-3 text-muted-foreground">
              <strong className="text-foreground">Zakonska osnova:</strong>{" "}
              §7 st. 1 DDG, §521 BGB (besplatne usluge), §276 BGB
              (isključenje obične nepažnje). Odgovornost za namjernu
              ili grubom nepažnjom prouzrokovanu štetu i za povredu
              tijela ili zdravlja ostaje nepromijenjena.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              4. Tvoja obaveza provjere
            </h2>
            <p>
              Svaku informaciju dobivenu od asistenta{" "}
              <strong className="text-foreground">
                dužan/na si provjeriti na zvaničnim izvorima
              </strong>{" "}
              prije preduzimanja bilo koje radnje:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <a href="https://www.bamf.de" target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline">bamf.de</a>{" "}
                — Savezni ured za migracije i izbjeglice
              </li>
              <li>
                <a href="https://www.arbeitsagentur.de" target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline">
                  arbeitsagentur.de</a>{" "}
                — Federalna agencija za zapošljavanje
              </li>
              <li>
                <a href="https://www.bundesregierung.de" target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline">
                  bundesregierung.de</a>{" "}
                — Vlada SR Njemačke
              </li>
              <li>
                <a href="https://www.make-it-in-germany.com"
                  target="_blank" rel="noopener noreferrer"
                  className="text-primary hover:underline">
                  make-it-in-germany.com</a>{" "}
                — Zvanični portal za stručnjake iz inostranstva
              </li>
              <li>
                Nadležna Ausländerbehörde, Jobcenter ili Finanzamt
                u tvom gradu
              </li>
              <li>
                Licencirani advokat ili savjetovalište (AWO, Caritas,
                Diakonie, Pro Asyl) za pravna pitanja
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              5. Sigurnosne mjere i kvalitet sistema
            </h2>
            <ul className="ml-4 mt-1 list-disc space-y-2">
              <li>
                <strong className="text-foreground">
                  Detaljan konfiguracijski sistem
                </strong>{" "}
                — asistent je podešen s opsežnim znanjem o relevantnim
                zakonima i procedurama te uputama da uvijek preporuči
                provjeru na zvaničnim izvorima
              </li>
              <li>
                <strong className="text-foreground">
                  Zabrana štetnih odgovora
                </strong>{" "}
                — sistem je konfiguriran da odbije davati savjete koji
                bi mogli potaknuti kršenje zakona, diskriminaciju
                ili nasilje
              </li>
              <li>
                <strong className="text-foreground">
                  Redovno ažuriranje
                </strong>{" "}
                — konfiguracija se ažurira pri važnim zakonskim
                promjenama, ali između ažuriranja može doći do
                zastarjelosti informacija
              </li>
            </ul>
            <p className="mt-3 text-xs opacity-70">
              Ove mjere značajno smanjuju, ali{" "}
              <strong>ne eliminuju u potpunosti</strong> mogućnost
              netačnih odgovora. Tvoja vlastita provjera informacija
              ostaje neophodna.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              6. Zaštita podataka
            </h2>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>
                Tvoji upiti obrađuju se u skladu s DSGVO standardima
              </li>
              <li>
                <strong className="text-foreground">
                  Tvoji podaci se ne koriste za poboljšanje sistema
                </strong>{" "}
                trećih strana
              </li>
              <li>
                Historiju razgovora možeš obrisati u Postavkama računa
              </li>
            </ul>
            <div className="mt-3 rounded-md border border-red-400/20 bg-red-950/30 p-3 text-xs text-red-100/80">
              <strong>Preporuka:</strong> Nikada ne unosite u asistenta
              osjetljive osobne podatke: JMBG/OIB, broj pasoša, podatke
              o platnoj kartici niti medicinske informacije.
            </div>
            <p className="mt-2">
              Više o zaštiti podataka:{" "}
              <a href="/datenschutz"
                className="text-primary hover:underline">
                Zaštita podataka
              </a>
            </p>
          </section>

          <p className="text-xs opacity-60 pt-4">Verzija: April 2026</p>

        </div>
      </div>
    </>
  );
}
