import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Heart, Shield, BookOpen } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function ZdravstvenoOsiguranje() {
  return (
    <DolazakPageTemplate
      title="Zdravstveno osiguranje"
      subtitle="Javno ili privatno – zdravstveno osiguranje je obavezno za sve u Njemačkoj. Regulisano Sozialgesetzbuch V (SGB V) i zakonima o zdravstvenom osiguranju."
      sections={[
        {
          icon: <BookOpen className="h-4 w-4 text-gold" />,
          title: "Zašto je zdravstveno osiguranje obavezno?",
          content: (
            <div className="space-y-2">
              <p>Njemački sistem zdravstvenog osiguranja je jedan od najstarijih i najopsežnijih na svijetu. Počiva na principu <strong>solidarnosti</strong> — svi doprinose prema primanjima, a svi dobijaju istu medicinsku zaštitu.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Od 2009. godine <strong>svaka osoba u Njemačkoj mora imati zdravstveno osiguranje</strong> — zakonom propisano.</li>
                <li>Sistem pokriva: posjete ljekaru, bolničko liječenje, lijekove, rehabilitaciju, trudnoću, stomatologiju i mentalnu zdravstvenu zaštitu.</li>
                <li>Oko <strong>90% stanovništva</strong> je osigurano putem javnog osiguranja (GKV), a oko 10% privatno (PKV).</li>
                <li>Poslodavac plaća <strong>polovinu doprinosa</strong> za zaposlene.</li>
              </ul>
              <p className="text-xs text-muted-foreground">Bez zdravstvenog osiguranja ne možeš biti zaposlen, a neosjgurani akumuliraju dugove za doprinose unazad.</p>
            </div>
          ),
        },
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko treba zdravstveno osiguranje?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Svi</strong> koji žive u Njemačkoj moraju imati zdravstveno osiguranje — bez izuzetka.</li>
              <li>Zaposleni sa platom do <strong>69.300 € godišnje</strong> (2024) — tzv. Versicherungspflichtgrenze — su obavezno u javnom osiguranju (GKV).</li>
              <li>Zaposleni iznad tog iznosa mogu birati: ostati u javnom ili preći u privatno (PKV).</li>
              <li>Samozaposleni i freelanceri mogu birati od početka.</li>
              <li>Studenti imaju poseban studentski tarif u GKV (~110 €/mjesečno).</li>
              <li>Minijoberi (450/520 € poslovi): poslodavac plaća paušalni doprinos, ali minijobler treba vlastito osiguranje.</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Razlika: javno vs. privatno",
          content: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Javno osiguranje (Gesetzliche Krankenversicherung – GKV):</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Doprinos: <strong>14,6%</strong> bruto plate + dodatni doprinos kase (~1,3–1,7%) — ukupno ~15,9–16,3%.</li>
                  <li>Pola plaća poslodavac, pola ti.</li>
                  <li><strong>Familienversicherung</strong>: supružnik i djeca su besplatno osigurani ako ne rade ili zarađuju ispod 505 €/mjesečno.</li>
                  <li>Doprinos za njegu (Pflegeversicherung): 3,4% (bez djece: 4,0%).</li>
                  <li>Kase: TK, AOK, Barmer, DAK, IKK, HEK, KKH i mnoge druge — preko 90 kasa u Njemačkoj.</li>
                  <li>Usluge su zakonom propisane i uglavnom iste kod svih kasa (~95% usluga je identično).</li>
                  <li>Razlike među kasama: dodatni doprinos, bonus programi, preventivni pregledi, digitalne usluge.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Privatno osiguranje (Private Krankenversicherung – PKV):</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Premija zavisi od zdravlja, starosti, paketa i početne tarife — ne od plate.</li>
                  <li><strong>Nema porodičnog osiguranja</strong> — svaki član plaća posebno.</li>
                  <li>Bolji pristup specijalistima, kraće čekanje, jednokrevetne sobe u bolnici.</li>
                  <li>Premije rastu sa godinama i mogu postati veoma skupe.</li>
                  <li>Povratak u javno: <strong>veoma teško nakon 55. godine</strong> — praktično nemoguće.</li>
                  <li>Za samozaposlene: nema dijeljenja troškova sa poslodavcem.</li>
                </ul>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Savjet: Za većinu ljudi sa porodicom, javno osiguranje (GKV) je bolja opcija zbog besplatnog porodičnog osiguranja.</p>
            </div>
          ),
        },
        {
          icon: <Heart className="h-4 w-4 text-gold" />,
          title: "Šta pokriva zdravstveno osiguranje?",
          content: (
            <div className="space-y-2">
              <p>GKV pokriva širok spektar medicinskih usluga:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Ambulantna njega</strong>: posjete kućnom ljekaru (Hausarzt) i specijalistima.</li>
                <li><strong>Bolničko liječenje</strong>: operacije, intenzivna njega, rehabilitacija.</li>
                <li><strong>Lijekovi</strong> (Arzneimittel): recepti uz doplatu od max. 10 € po lijeku.</li>
                <li><strong>Stomatologija</strong>: osnovni tretmani besplatno, krunice i proteze uz doplatu (Bonusheft smanjuje troškove).</li>
                <li><strong>Trudnoća i porođaj</strong>: kompletno pokriveno, uključujući babicu (Hebamme).</li>
                <li><strong>Preventivni pregledi</strong>: redovni check-up, skrining za rak, vakcinacije.</li>
                <li><strong>Mentalno zdravlje</strong>: psihoterapija (uz odobrenje kase).</li>
                <li><strong>Pomoćna sredstva</strong> (Hilfsmittel): naočale (djeca), slušni aparati, invalidska kolica.</li>
                <li><strong>Krankengeld</strong>: naknada za bolovanje od 7. sedmice bolesti (70% bruto plate, max. 90% neto).</li>
              </ul>
            </div>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Odluči se za kasu</strong> — Istraži opcije: TK, AOK, Barmer, DAK. Uporedi dodatne doprinose i pogodnosti. Korisne stranice: check24.de, krankenkassen.de.</li>
              <li><strong>Prijavi se online ili u poslovnici</strong> — Većina kasa ima online prijavu. Treba ti: pasoš, Meldebescheinigung, ugovor o radu.</li>
              <li><strong>Primi potvrdu članstva</strong> (Mitgliedsbescheinigung) — Kasa ti šalje potvrdu u roku od nekoliko dana. Ovu potvrdu predaješ poslodavcu.</li>
              <li><strong>Predaj potvrdu poslodavcu</strong> — Poslodavac koristi ovu potvrdu za registraciju doprinosa. Bez nje ne može isplatiti platu.</li>
              <li><strong>Primi elektronsku zdravstvenu karticu (eGK)</strong> — Dolazi poštom u roku od 2–3 sedmice. Sadrži tvoje podatke i sliku.</li>
              <li><strong>Registruj se kod kućnog ljekara (Hausarzt)</strong> — Pronađi ljekara u blizini (jameda.de, doctolib.de) i zakaži prvi pregled.</li>
              <li><strong>Porodično osiguranje</strong> — Ako supružnik ne radi ili zarađuje ispod 505 €/mj: prijavi ga/je putem iste kase (Familienversicherung — besplatno u GKV).</li>
              <li><strong>Djeca</strong> — Automatski osigurana putem roditeljskog javnog osiguranja. Prijavi novorođenče odmah nakon rođenja.</li>
              <li><strong>Promjena kase</strong> — Moguća u bilo kojem trenutku s otkaznim rokom od 2 mjeseca (od 2021. — više nema obaveznog roka od 12 mj.).</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: (
            <div className="space-y-2">
              <p>Direktno kod izabrane zdravstvene kase — online, telefonski ili u poslovnici. Poslodavac pomaže sa prijavom ako si zaposlen/a.</p>
              <p className="text-sm">Najveće javne kase sa poslovnicama širom Njemačke:</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li><strong>Techniker Krankenkasse (TK)</strong> — najveća kasa, odlična digitalna ponuda.</li>
                <li><strong>AOK</strong> — regionalne kase sa gustom mrežom poslovnica.</li>
                <li><strong>Barmer</strong> — druga po veličini, dobra za porodice.</li>
                <li><strong>DAK-Gesundheit</strong> — široka mreža, mnogi bonus programi.</li>
              </ul>
            </div>
          ),
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Prijava: <strong>odmah po početku rada</strong> — poslodavac ne može isplatiti platu bez osiguranja.</li>
              <li>Kartica (eGK): <strong>2–3 sedmice</strong> nakon prijave.</li>
              <li>Troškovi prijave: <strong>Besplatno</strong>.</li>
              <li>Mjesečni doprinos (GKV): ~<strong>7,3% + dodatni doprinos</strong> tvoje bruto plate (pola plaća poslodavac).</li>
              <li>Doplate kod ljekara: <strong>max. 10 € po receptu</strong>, nema doplate za posjetu ljekaru (ranije ukinut Praxisgebühr).</li>
              <li>Godišnji limit doplata: <strong>max. 2% godišnjeg bruto prihoda</strong> (1% za hronično bolesne).</li>
            </ul>
          ),
        },
        {
          icon: <Shield className="h-4 w-4 text-gold" />,
          title: "Tvoja prava kao osiguranik",
          content: (
            <div className="space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Slobodan izbor ljekara</strong> — možeš birati bilo kojeg ljekara koji prima pacijente tvoje kase.</li>
                <li><strong>Pravo na drugo mišljenje</strong> — prije operacije imaš pravo zatražiti mišljenje drugog ljekara.</li>
                <li><strong>Pravo na informaciju</strong> — ljekar ti mora objasniti dijagnozu i opcije liječenja na razumljiv način.</li>
                <li><strong>Krankengeld</strong> — od 7. sedmice bolovanja dobijaš naknadu od kase (prvih 6 sedmica plaća poslodavac punu platu).</li>
                <li><strong>Pravo na žalbu</strong> — ako kasa odbije neku uslugu, imaš pravo na prigovor (Widerspruch) u roku od mjesec dana.</li>
              </ul>
            </div>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Ne prijaviti se na vrijeme — ostati neosiguran je ilegalno i kumuliraju se doprinosi unazad.</li>
              <li>Odabrati privatno osiguranje bez razumijevanja dugoročnih troškova — teško se vratiti u javno.</li>
              <li>Zaboraviti Familienversicherung — supružnik i djeca mogu biti besplatno osigurani u GKV.</li>
              <li>Ne donijeti eGK karticu kod ljekara — bez nje moraš platiti pregled i tražiti povrat od kase.</li>
              <li>Ne prijaviti promjenu posla kasi — može doći do prekida osiguranja.</li>
              <li>Ne koristiti Bonusheft kod stomatologa — redovni pregledi smanjuju doplatu za krunice i proteze do 30%.</li>
              <li>Misliti da privatno znači „bolje" — za porodice sa djecom GKV je gotovo uvijek povoljniji.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Službene informacije – Krankenversicherung (BMG)", url: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung" },
        { type: "info", label: "Online-Ratgeber Krankenversicherung (BMG)", url: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung/online-ratgeber-krankenversicherung" },
      ]}
    />
  );
}
