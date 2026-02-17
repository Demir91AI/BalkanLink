import { AlertTriangle, Clock, Users, ListChecks, CheckCircle2, CalendarDays } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function PrviKoraci() {
  return (
    <DolazakPageTemplate
      title="Prvi koraci – kompletna checklista"
      subtitle="Sve što trebaš uraditi u prvim sedmicama i mjesecima u Njemačkoj."
      sections={[
        {
          icon: <CalendarDays className="h-4 w-4 text-gold" />,
          title: "Prva sedmica",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Prijavi prebivalište (Anmeldung)</strong> — Najvažniji korak. Zakaži termin odmah po dolasku.</li>
              <li><strong>Otvori bankovni račun</strong> — Trebaš IBAN za sve: platu, stanarinu, ugovore.</li>
              <li><strong>Kupi SIM karticu</strong> — Prepaid (Aldi Talk, Lidl Connect) ili ugovor (Telekom, Vodafone, O2).</li>
              <li><strong>Zdravstveno osiguranje</strong> — Ako već nisi osiguran/a preko poslodavca, prijavi se kod kase (TK, AOK, Barmer).</li>
            </ol>
          ),
        },
        {
          icon: <CheckCircle2 className="h-4 w-4 text-gold" />,
          title: "Prve 2 sedmice",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Predaj Steuer-ID poslodavcu</strong> — Ako je već stigao poštom. Ako ne, poslodavac može privremeno koristiti datum rođenja.</li>
              <li><strong>Registruj se kod kućnog ljekara (Hausarzt)</strong> — Pronađi ljekara blizu kuće. Uzmi eGK karticu sa sobom.</li>
              <li><strong>Internet i telefon za stan</strong> — Naruči kućni internet (Telekom, Vodafone, 1&1). Instalacija traje 2-4 sedmice.</li>
              <li><strong>Prijavi se na GEZ</strong> — Obavezna TV/radio taksa: 18,36 € mjesečno po domaćinstvu. Prijava na rundfunkbeitrag.de.</li>
              <li><strong>Haftpflichtversicherung</strong> — Osiguranje od odgovornosti (privatna). Košta ~5-10 € mjesečno i pokriva štete koje napraviš drugima.</li>
            </ol>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Prvi mjesec",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Ausländerbehörde (ako treba)</strong> — Zakaži termin za boravišnu dozvolu ako si na vizi.</li>
              <li><strong>Provjeri poreznu klasu</strong> — Na prvoj platnoj listi provjeri da li je ispravna.</li>
              <li><strong>Integracijski kurs (ako je obavezan)</strong> — Provjeri da li trebaš pohađati kurs njemačkog jezika (A1-B1).</li>
              <li><strong>KiTa / škola za djecu</strong> — Prijavi djecu u vrtić (Kindertagesstätte) ili školu. U nekim gradovima postoji lista čekanja — prijavi se što prije!</li>
              <li><strong>Vozačka dozvola</strong> — Provjeri da li tvoja dozvola važi u Njemačkoj. BiH dozvola mora se zamijeniti u roku od 6 mjeseci.</li>
            </ol>
          ),
        },
        {
          icon: <CalendarDays className="h-4 w-4 text-gold" />,
          title: "Prva 3 mjeseca",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Mein ELSTER registracija</strong> — Registruj se za online porezni portal (aktivacijski kod stiže poštom).</li>
              <li><strong>Kindergeld (ako imaš djecu)</strong> — Podnesi zahtjev kod Familienkasse. 250 € po djetetu mjesečno.</li>
              <li><strong>Elterngeld (ako je beba)</strong> — Zahtjev podnesi u roku od 3 mjeseca nakon rođenja.</li>
              <li><strong>Potpiši dodatna osiguranja</strong> — Berufsunfähigkeitsversicherung (osiguranje u slučaju nesposobnosti za rad), Hausratversicherung (osiguranje kućnog inventara).</li>
              <li><strong>Učlani se u Verein</strong> — Sportski klub, kulturno društvo — dobar način za integraciju.</li>
              <li><strong>Prvu poreznu prijavu planiraj</strong> — Saberi sve dokumente za poreznu prijavu (Steuererklärung) za tekuću godinu.</li>
            </ol>
          ),
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Važni rokovi (ne propusti!)",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Anmeldung:</strong> 14 dana od useljenja.</li>
              <li><strong>Aufenthaltstitel:</strong> Zahtjev podnijeti prije isteka vize (obično 90 dana).</li>
              <li><strong>Vozačka dozvola:</strong> Zamjena u roku od 6 mjeseci (za neke zemlje).</li>
              <li><strong>Kindergeld:</strong> Retroaktivno samo 6 mjeseci — podnesi što prije.</li>
              <li><strong>GEZ:</strong> Prijava odmah po useljenju.</li>
              <li><strong>Porezna prijava:</strong> Do 31. jula naredne godine (ili 28./29. februara sa poreznim savjetnikom).</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Odgađanje Anmeldung-a — blokira sve ostalo (banka, Steuer-ID, osiguranje).</li>
              <li>Ne prijaviti se na GEZ — dugovi se kumuliraju retroaktivno.</li>
              <li>Ignorisati Haftpflichtversicherung — jedan nesretni slučaj može koštati hiljade eura.</li>
              <li>Ne zamijeniti vozačku dozvolu na vrijeme — nakon isteka roka voziš nelegalno.</li>
              <li>Kasno prijaviti djecu u KiTa — u velikim gradovima čekanje može trajati mjesecima.</li>
              <li>Ne čuvati dokumente — svaki dokument iz Njemačke je važan. Napravi digitalne kopije.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Make it in Germany (vodič)", url: "https://www.make-it-in-germany.com/de/leben-in-deutschland/erste-schritte" },
        { type: "portal", label: "GEZ prijava", url: "https://www.rundfunkbeitrag.de/anmelden" },
      ]}
    />
  );
}
