import { useNavigate } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";

export default function Datenschutz() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
        <PageNavBar onBack={() => navigate(-1)} />

        <h1 className="mb-2 text-3xl font-bold">Zaštita podataka</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Izjava o privatnosti — DSGVO (Opća uredba EU o zaštiti podataka) i BDSG
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">1. Odgovorna osoba</h2>
            <p>Odgovorna osoba u smislu DSGVO-a je:</p>
            <p className="mt-2">
              <strong className="text-foreground">RealCore Digital</strong>, vlasnik Demir
              Sinanovic
              <br />
              Münchener Straße 78, 83395 Freilassing, Deutschland
              <br />
              E-pošta:{" "}
              <a href="mailto:kontakt@realcore-digital.de" className="text-primary hover:underline">
                kontakt@realcore-digital.de
              </a>
            </p>
            <p className="mt-2 text-xs opacity-70">
              Ova osoba je pravno odgovorna za sve odluke o tome kako se tvoji podaci
              obrađuju. Obrati joj se s bilo kojim pitanjem o privatnosti podataka.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              2. Koje podatke prikupljamo
            </h2>
            <p>
              <strong className="text-foreground">Kategorije korisnika:</strong>
            </p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Posjetioci platforme (bez registracije)</li>
              <li>Registrirani korisnici (s korisničkim računom)</li>
              <li>Premium pretplatnici</li>
              <li>Osobe koje kontaktiraju e-poštom</li>
            </ul>
            <p className="mt-3">
              <strong className="text-foreground">Kategorije podataka:</strong>
            </p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>
                Podaci o računu: e-mail adresa, lozinka (pohranjena šifrirano —
                bcrypt/argon2)
              </li>
              <li>Podaci o korištenju: posjećene stranice, napredak u kursu</li>
              <li>Tehnički podaci: IP adresa, tip preglednika, OS</li>
              <li>Sadržajni podaci: tekst u obrascima/alatima (nije trajno pohranjen)</li>
              <li>
                Podaci o plaćanju: obrađuju se isključivo putem Stripe-a (mi ne vidimo
                broj kartice)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              3. Pravne osnove obrade
            </h2>
            <ul className="ml-4 mt-1 list-disc space-y-2">
              <li>
                <strong className="text-foreground">
                  Saglasnost (čl. 6 st. 1 tač. a DSGVO):
                </strong>{" "}
                Npr. za opcionalne kolačiće — saglasnost se može povući u svako doba.
              </li>
              <li>
                <strong className="text-foreground">
                  Izvršenje ugovora (čl. 6 st. 1 tač. b DSGVO):
                </strong>{" "}
                Neophodna obrada za pružanje usluga — korisnički račun, pretplata.
              </li>
              <li>
                <strong className="text-foreground">
                  Zakonska obaveza (čl. 6 st. 1 tač. c DSGVO):
                </strong>{" "}
                Čuvanje računovodstvenih isprava prema §147 AO (do 10 godina).
              </li>
              <li>
                <strong className="text-foreground">
                  Legitimni interes (čl. 6 st. 1 tač. f DSGVO):
                </strong>{" "}
                Bezbjednost platforme, sprečavanje zloupotrebe, ispravno funkcionisanje.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              4. Serverski logovi
            </h2>
            <p>
              Hosting-provider automatski bilježi tehničke podatke: IP adresu,
              datum/vrijeme pristupa, URL, HTTP statusni kod, tip preglednika, OS i
              referrer URL. Ovi podaci se ne kombinuju s drugim izvorima i brišu se
              nakon max. 30 dana.
            </p>
            <p className="mt-1">Pravna osnova: čl. 6 st. 1 tač. f DSGVO.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              5. Korisnički račun
            </h2>
            <p>
              Registracijom prikupljamo e-mail adresu i lozinku (pohranjena isključivo
              šifrirano, nikada u čitljivom obliku). Korisnički račun možeš obrisati u
              svako doba u Postavkama ili slanjem zahtjeva na kontakt@realcore-digital.de.
            </p>
            <p className="mt-1">Pravna osnova: čl. 6 st. 1 tač. b DSGVO.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              6. Obrasci, alati i Dokumenten-Check
            </h2>
            <p>
              Tekst koji uneseš u obrasce i alate obrađuje se isključivo radi pružanja
              tražene funkcije. Učitani dokumenti obrađuju se samo privremeno u radnoj
              memoriji — <strong className="text-foreground">bez trajnog pohranjivanja</strong>.
              Svi podaci brišu se odmah po prikazu rezultata.
            </p>
            <div className="mt-2 rounded-md border border-yellow-400/25 bg-yellow-950/30 p-3 text-xs text-yellow-100">
              <strong className="text-foreground">Preporuka:</strong> Prekrij osobne podatke
              (ime, adresu, JMBG, porezni broj) prije korištenja Dokumenten-Check
              funkcije.
            </div>
            <p className="mt-1">Pravna osnova: čl. 6 st. 1 tač. a i f DSGVO.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              7. BalkanLink Asistent
            </h2>
            <p>
              BalkanLink Asistent je automatizirani sistem koji odgovara na pitanja
              korisnika. Upiti se obrađuju putem eksternog servisa u skladu s GDPR
              standardima.
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Tvoje poruke obrađuju se radi generiranja odgovora i odmah se vraća rezultat</li>
              <li>
                Zaključen je ugovor o obradi podataka (DPA) s pružaocem usluge (čl. 28
                DSGVO)
              </li>
              <li>
                <strong className="text-foreground">
                  Tvoji podaci se ne koriste za poboljšanje sistema
                </strong>{" "}
                trećih strana
              </li>
              <li>
                Historija razgovora može biti pohranjena u tvom profilu radi
                kontinuiteta i može se obrisati u Postavkama računa
              </li>
            </ul>
            <p className="mt-1">
              Pravna osnova: čl. 6 st. 1 tač. b i f DSGVO; prijenos podataka po čl. 46
              DSGVO (standardne ugovorne klauzule EU — SCC).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              8. Plaćanje putem Stripe
            </h2>
            <p>
              Plaćanja obrađuje{" "}
              <strong className="text-foreground">Stripe Payments Europe, Ltd.</strong>
              {" "}(Dublin, Irska) — certificiran prema PCI DSS Level 1.
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                Mi <strong className="text-foreground">nikada ne vidimo niti pohranjujemo</strong>{" "}
                podatke o kartici
              </li>
              <li>Stripe prima podatke direktno od tebe putem sigurne šifrirane veze</li>
              <li>Mi primamo samo potvrdu uplate i anonimni ID transakcije</li>
              <li>Stripe čuva transakcijske podatke radi zakonskih obaveza (do 10 godina)</li>
            </ul>
            <p className="mt-1">
              Stripe privatnost:{" "}
              <a
                href="https://stripe.com/de/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                stripe.com/de/privacy
              </a>
              <br />
              Pravna osnova: čl. 6 st. 1 tač. b DSGVO.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              9. Supabase — baza podataka
            </h2>
            <p>
              Za pohranu i autentifikaciju koristimo{" "}
              <strong className="text-foreground">Supabase Inc.</strong> Podaci se
              pohranjuju na serverima u{" "}
              <strong className="text-foreground">Frankfurt am Main, EU (AWS eu-central-1)</strong>.
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Supabase je izvršilac obrade — DPA ugovor zaključen</li>
              <li>Podaci se ne prenose izvan EU-a</li>
              <li>Enkripcija u prijenosu: TLS; u mirovanju: AES-256</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              10. Kolačići i lokalna pohrana
            </h2>
            <p>
              Ne koristimo marketinške kolačiće ni praćenje od strane trećih strana. U
              lokalnoj pohrani pregledača pohranjujemo:
            </p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Token za autentifikaciju (samo za prijavljene korisnike)</li>
              <li>Postavke saglasnosti za kolačiće</li>
              <li>Napredak u DeutschTraineru (do sinhronizacije s računom)</li>
            </ul>
            <p className="mt-1">Pravna osnova: §25 TDDDG / čl. 6 st. 1 tač. a DSGVO.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">11. Rok čuvanja</h2>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Serverski logovi: max. 30 dana</li>
              <li>E-mail upiti: max. 6 mjeseci po završetku obrade</li>
              <li>Korisnički račun: do brisanja od strane korisnika</li>
              <li>Sadržajni podaci (alati): trenutno brisanje</li>
              <li>Podaci o plaćanju: 10 godina (§147 AO)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              12. Primaoci podataka
            </h2>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>
                <strong className="text-foreground">Supabase Inc.</strong> — hosting i
                baza podataka (čl. 28 DSGVO)
              </li>
              <li>
                <strong className="text-foreground">Stripe Payments Europe, Ltd.</strong>
                — obrada plaćanja
              </li>
              <li>Pružalac usluge za BalkanLink Asistenta (SCC ugovor, čl. 46 DSGVO)</li>
              <li>Državni organi — samo na zakonski osnovan zahtjev</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              13. Sigurnost podataka (čl. 32 DSGVO)
            </h2>
            <p>
              SSL/TLS enkripcija svih veza, šifrirano pohranjivanje lozinki
              (bcrypt/argon2), ograničen pristup podacima, redovne sigurnosne provjere.
              Prenosivu prenosivu vezu prepoznaješ po "https://" u adresnoj traci.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              14. Tvoja prava (čl. 15–22 DSGVO)
            </h2>
            <ul className="ml-4 mt-1 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Pravo na pristup (čl. 15):</strong>{" "}
                Možeš zatražiti uvid u sve podatke koje obrađujemo.
              </li>
              <li>
                <strong className="text-foreground">Pravo na ispravak (čl. 16):</strong>{" "}
                Možeš zatražiti ispravku netačnih podataka.
              </li>
              <li>
                <strong className="text-foreground">
                  Pravo na brisanje (čl. 17 — "pravo na zaborav"):
                </strong>{" "}
                Možeš zatražiti brisanje svojih podataka.
              </li>
              <li>
                <strong className="text-foreground">Pravo na ograničenje (čl. 18):</strong>{" "}
                Možeš zatražiti ograničenje obrade u određenim slučajevima.
              </li>
              <li>
                <strong className="text-foreground">Pravo na prenosivost (čl. 20):</strong>{" "}
                Možeš dobiti svoje podatke u strojno čitljivom formatu.
              </li>
              <li>
                <strong className="text-foreground">Pravo na prigovor (čl. 21):</strong>{" "}
                Možeš podnijeti prigovor na obradu zasnovanu na legitimnom interesu.
              </li>
              <li>
                <strong className="text-foreground">Opoziv saglasnosti (čl. 7 st. 3):</strong>{" "}
                Saglasnost možeš povući u svako doba — bez retroaktivnog dejstva.
              </li>
              <li>
                <strong className="text-foreground">Pravo na žalbu (čl. 77):</strong>{" "}
                Nadležno nadzorno tijelo:{" "}
                <strong className="text-foreground">
                  Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
                </strong>
                , Promenade 18, 91522 Ansbach.
              </li>
            </ul>
            <p className="mt-2">
              Zahtjeve šalji na:{" "}
              <a href="mailto:kontakt@realcore-digital.de" className="text-primary hover:underline">
                kontakt@realcore-digital.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              15. Nema automatiziranog odlučivanja
            </h2>
            <p>
              Ne vrši se automatizovano donošenje odluka niti profiliranje (čl. 22
              DSGVO) koje bi imalo pravno dejstvo ili na sličan način znatno pogađalo
              korisnika.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">16. Izmjene izjave</h2>
            <p>
              Zadržavamo pravo izmjene ove Izjave radi usklađenosti s propisima ili
              promjenama usluga.
            </p>
            <p className="mt-2 text-xs opacity-60">Verzija: April 2026</p>
          </section>
        </div>
      </div>
    </>
  );
}
