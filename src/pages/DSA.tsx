import { useNavigate } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";

export default function DSA() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
        <PageNavBar onBack={() => navigate(-1)} />

        <h1 className="mb-2 text-3xl font-bold">Prijava sadržaja i postupak žalbe</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          U skladu s Uredbom (EU) 2022/2065 o digitalnim uslugama (Digital Services Act — DSA)
          i odredbama Digitale-Dienste-Gesetza (DDG)
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              1. Prijava nezakonitog sadržaja
            </h2>
            <p>
              Korisnici i treća lica imaju mogućnost prijaviti sadržaje na Platformi koje
              smatraju nezakonitim. Prijave shvatamo ozbiljno i obrađujemo ih pravovremeno.
            </p>

            <h3 className="mt-4 font-semibold text-foreground">1.1 Kako prijaviti sadržaj?</h3>
            <p className="mt-1">
              Prijavu pošalji e-poštom na:{" "}
              <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">
                kontakt@balkanlink.de
              </a>
            </p>
            <p className="mt-1">
              Predmet: <strong className="text-foreground">„Prijava nezakonitog sadržaja"</strong>
            </p>

            <h3 className="mt-4 font-semibold text-foreground">1.2 Potrebni podaci</h3>
            <p className="mt-1">Da bismo mogli obraditi tvoju prijavu, potrebni su nam:</p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Tačan URL ili opis spornog sadržaja</li>
              <li>Obrazloženje zašto se sadržaj smatra nezakonitim</li>
              <li>Po potrebi relevantne pravne odredbe</li>
              <li>Kontakt podaci prijavitelja (ime, e-mail adresa)</li>
              <li>Izjava da su podaci istiniti i potpuni po najboljem znanju</li>
            </ul>

            <h3 className="mt-4 font-semibold text-foreground">1.3 Provjera i mjere</h3>
            <p className="mt-1">Po prijemu tvoje prijave:</p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Pravovremeno ćemo potvrditi prijem prijave</li>
              <li>Prijavljeni sadržaj pažljivo i objektivno provjeriti</li>
              <li>U slučaju utvrđene nezakonitosti — sadržaj ukloniti ili blokirati pristup</li>
              <li>Prijavitelja obavijestiti o donesenoj odluci i obrazloženju</li>
              <li>
                Pogođenog korisnika (autora sadržaja) obavijestiti o mjeri i mogućnosti
                žalbe, osim ako tome ne stoje pravne prepreke
              </li>
            </ul>
            <p className="mt-2">
              Obrada se vrši u pravilu u roku od 7 radnih dana po prijemu potpune prijave.
              Kod očigledno nezakonitih sadržaja (npr. huškanje na mržnju, zlostavljanje
              djece) uklanjanje se vrši odmah.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              2. Interni postupak žalbe
            </h2>
            <p>
              U skladu s čl. 20 Uredbe (EU) 2022/2065 omogućavamo interni postupak žalbe
              koji je otvoren za:
            </p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Korisnike čiji su sadržaji uklonjeni ili čiji je pristup blokiran</li>
              <li>Prijavitelje čija je prijava odbijena</li>
            </ul>

            <h3 className="mt-4 font-semibold text-foreground">2.1 Podnošenje žalbe</h3>
            <p className="mt-1">
              Žalbe se mogu podnijeti u roku od{" "}
              <strong className="text-foreground">6 mjeseci</strong> od dotične odluke
              e-poštom na{" "}
              <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">
                kontakt@balkanlink.de
              </a>
            </p>
            <p className="mt-1">
              Predmet: <strong className="text-foreground">„Žalba — [kratak opis]"</strong>
            </p>

            <h3 className="mt-4 font-semibold text-foreground">2.2 Sadržaj žalbe</h3>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Referenca na dotičnu odluku (uklj. datum i eventualni referentni broj)</li>
              <li>Obrazloženje žalbe</li>
              <li>Kontakt podaci podnositelja žalbe</li>
            </ul>

            <h3 className="mt-4 font-semibold text-foreground">2.3 Obrada</h3>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Žalba se pravovremeno, objektivno i nepristrasno provjerava.</li>
              <li>Odluka se ne donosi isključivo automatski.</li>
              <li>Podnositelj žalbe biva obaviješten o rezultatu i obrazloženju.</li>
              <li>Ako je žalba opravdana, prvobitna odluka se poništava.</li>
            </ul>

            <h3 className="mt-4 font-semibold text-foreground">
              2.4 Vansudsko rješavanje sporova
            </h3>
            <p className="mt-1">
              Nezavisno od ovog internog postupka žalbe, imaš pravo obratiti se
              certificiranom tijelu za vansudsko rješavanje sporova prema čl. 21
              Uredbe (EU) 2022/2065.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">3. Kontakt tačka</h2>
            <p>
              Centralna kontakt tačka za organe država članica, Komisiju i Odbor za
              digitalne usluge prema čl. 11 Uredbe (EU) 2022/2065 je:
            </p>
            <p className="mt-2">
              <strong className="text-foreground">RealCore Digital</strong>
              <br />
              E-pošta:{" "}
              <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">
                kontakt@balkanlink.de
              </a>
              <br />
              Jezici: njemački, engleski
            </p>
          </section>

          <p className="text-xs opacity-60 pt-4">Verzija: April 2026</p>
        </div>
      </div>
    </>
  );
}
