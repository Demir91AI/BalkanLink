import { useNavigate } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";

export default function Nutzungsbedingungen() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
        <PageNavBar onBack={() => navigate(-1)} />

        <h1 className="mb-2 text-3xl font-bold">Uslovi korištenja</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Opći uslovi korištenja platforme BalkanLink (AGB)
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 1 Područje primjene i operator</h2>
            <p>
              Ovi Opći uslovi korištenja (u daljem tekstu: „AGB") važe za korištenje platforme
              „BalkanLink" (u daljem tekstu: „Platforma"), koju vodi:
            </p>
            <p className="mt-2">
              <strong className="text-foreground">RealCore Digital</strong><br />
              Vlasnik: Demir Sinanovic<br />
              Münchener Straße 78, 83395 Freilassing, Deutschland<br />
              E-pošta:{" "}
              <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">
                kontakt@balkanlink.de
              </a>
            </p>
            <p className="mt-2">
              Korištenjem Platforme korisnik prihvata ove AGB. Drugačiji uslovi korisnika
              ne vrijede, osim ako operator izričito pristane u pisanom obliku.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 2 Opis usluga</h2>
            <p>Platforma nudi sljedeće usluge:</p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Strukturirane informacije o birokratskim postupcima i svakodnevnim temama u Njemačkoj</li>
              <li>Digitalne pomoćnike za popunjavanje obrazaca (ne predstavljaju pravno savjetovanje)</li>
              <li>Alate i kalkulatore (npr. Brutto-Netto-Rechner)</li>
              <li>Informativnog asistenta (BalkanLink Asistent)</li>
              <li>Dokumenten-Check (opće objašnjenje učitanih dokumenata)</li>
              <li>Korisnički generirane sadržaje (oglasi, unosi, direktoriji)</li>
              <li>Direktorije i karte</li>
            </ul>
            <p className="mt-2">
              Operator zadržava pravo da obim usluga u svakom trenutku izmijeni, proširi ili
              ograniči, bez da iz toga nastaju potraživanja korisnika.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 3 Bez ugovora o savjetovanju</h2>
            <p>
              Korištenjem Platforme <strong className="text-foreground">ne nastaje
              punomoć, ugovor o savjetovanju niti bilo kakav drugi ugovorni odnos</strong>{" "}
              koji uključuje individualno pravno, porezno, finansijsko ili drugo stručno
              savjetovanje.
            </p>
            <p className="mt-2">
              Svi sadržaji služe isključivo općem informiranju i orijentaciji. Za obavezujuće
              informacije konsultuj nadležne organe, advokate, porezne savjetnike ili druge
              kvalificirane stručnjake.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 4 Bez garancije za sadržaj</h2>
            <p>
              Sve informacije na Platformi pružaju se po najboljem znanju, ali bez ikakve garancije
              za tačnost, potpunost, aktuelnost ili prikladnost za određenu svrhu. Zakoni i propisi
              mogu se u svakom trenutku promijeniti. Operator ne preuzima odgovornost za štete
              nastale korištenjem ili oslanjanjem na pružene sadržaje.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 5 Obaveze korisnika</h2>
            <p>Korisnik se obavezuje:</p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>koristiti Platformu samo u zakonite svrhe;</li>
              <li>ne objavljivati lažne, obmanjujuće ili nezakonite sadržaje;</li>
              <li>ne kršiti prava trećih lica (autorska prava, žigove, lična prava);</li>
              <li>ne koristiti malware, spam ili automatizirane pristupe;</li>
              <li>čuvati povjerljivost svojih pristupnih podataka;</li>
              <li>ne manipulirati Platformom niti narušavati njenu funkcionalnost;</li>
              <li>ne objavljivati sadržaje koji krše važeće pravo ili prava trećih lica;</li>
              <li>davati istinite podatke pri registraciji i objavljivanju sadržaja.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 6 Korisnički generirani sadržaji</h2>
            <p>
              Korisnici mogu na Platformi objavljivati vlastite sadržaje (npr. oglase, unose,
              recenzije). Korisnik je isključivo odgovoran za sadržaje koje objavi.
            </p>
            <p className="mt-2">
              Objavljivanjem sadržaja korisnik operatoru daje jednostavno, vremenski i
              prostorno neograničeno, besplatno pravo korištenja sadržaja u okviru Platforme.
            </p>
            <p className="mt-2">
              Operator nije obavezan pregledati sadržaje prije objavljivanja, ali zadržava
              pravo da sadržaje u svakom trenutku pregleda, uredi, pomjeri ili ukloni.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 7 Zabranjeni sadržaji</h2>
            <p>Zabranjeno je na Platformi objavljivati ili širiti:</p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Sadržaje koji krše važeće pravo (posebno krivično)</li>
              <li>Sadržaje koji huškaju na mržnju, rasizam, diskriminaciju</li>
              <li>Sadržaje koji veličaju nasilje ili terorizam</li>
              <li>Pornografske ili za maloljetnike štetne sadržaje</li>
              <li>Autorski zaštićene sadržaje bez odobrenja</li>
              <li>Lične podatke trećih lica bez njihove saglasnosti</li>
              <li>Spam, reklamu ili komercijalne sadržaje bez odobrenja</li>
              <li>Pokušaje prevare, phishing ili druge obmanjujuće aktivnosti</li>
              <li>Sadržaje koji mogu naštetiti ugledu Platforme</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 8 Moderacija, blokiranje i brisanje</h2>
            <p>
              Operator je ovlašten da u slučaju kršenja ovih AGB ili pri postojanju
              indicija o nezakonitom sadržaju poduzme sljedeće mjere:
            </p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>Upozorenje korisniku</li>
              <li>Uređivanje ili uklanjanje pojedinačnih sadržaja</li>
              <li>Privremeno ili trajno blokiranje korisničkog računa</li>
              <li>Brisanje korisničkog računa</li>
            </ul>
            <p className="mt-2">
              Korisnik će biti obaviješten o mjeri i njenom obrazloženju, osim ako tome
              ne stoje pravne prepreke.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 9 Platforma kao posrednik</h2>
            <p>
              Platforma pruža samo tehničku infrastrukturu za razmjenu informacija. Operator
              nije ugovorna strana u dogovorima između korisnika (npr. kontakt putem oglasa).
              Operator ne preuzima nikakvu odgovornost za ugovore ili pravne odnose između korisnika.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 10 Ograničenje odgovornosti</h2>
            <p>
              Operator odgovara neograničeno samo u slučaju namjere i grubog nemara, te pri
              povredi bitnih ugovornih obaveza (kardinalne obaveze). Kod blagog nemara
              odgovornost je ograničena na predvidivu, uobičajenu štetu.
            </p>
            <p className="mt-2">
              Odgovornost za štete nastale povredom života, tijela ili zdravlja ostaje
              nepromijenjena. Isto vrijedi i za zahtjeve prema Zakonu o odgovornosti za proizvode.
            </p>
            <p className="mt-2">
              Operator ne odgovara za štete nastale korištenjem ili oslanjanjem na pružene
              informacije, alate ili korisnički generirane sadržaje.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 11 Oslobađanje od odgovornosti</h2>
            <p>
              Korisnik oslobađa operatora od svih potraživanja trećih lica koja nastanu
              zbog nezakonitog korištenja Platforme ili zbog sadržaja koje je korisnik
              objavio. Korisnik snosi troškove potrebne pravne odbrane uključujući sudske
              i advokatske troškove.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 12 Dostupnost platforme</h2>
            <p>
              Operator nastoji osigurati što neprekidniju dostupnost Platforme. Međutim, ne
              postoji pravo na stalnu dostupnost. Operator zadržava pravo da Platformu
              privremeno ograniči ili obustavi radi održavanja, ažuriranja ili iz drugih razloga.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 13 Izmjene platforme i AGB-a</h2>
            <p>
              Operator zadržava pravo da ove AGB u svakom trenutku izmijeni. Izmjene se
              objavljuju na Platformi. Daljnje korištenje Platforme nakon objave izmijenjenih
              AGB-a smatra se prihvatanjem izmjena.
            </p>
            <p className="mt-2">
              Operator također zadržava pravo da Platformu, njene funkcije, dizajn i sadržaje
              u svakom trenutku izmijeni, proširi ili obustavi.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 14 Primjenjivo pravo i nadležnost suda</h2>
            <p>
              Primjenjuje se pravo Savezne Republike Njemačke uz isključenje UN Konvencije o
              ugovorima o međunarodnoj prodaji robe. Ako je korisnik trgovac, pravno lice javnog
              prava ili javnopravni fond, nadležan je sud na sjedištu operatora.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">§ 15 Salvatorska klauzula</h2>
            <p>
              Ako pojedine odredbe ovih AGB-a budu nevažeće ili neprovedive, to ne utiče na
              važnost ostalih odredbi. Umjesto nevažeće odredbe primjenjuje se važeća odredba
              koja najbliže odgovara ekonomskom cilju.
            </p>
            <p className="mt-2 text-xs opacity-60">Verzija: April 2026</p>
          </section>
        </div>
      </div>
    </>
  );
}
