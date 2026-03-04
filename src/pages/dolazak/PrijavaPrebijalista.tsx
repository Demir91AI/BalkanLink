import { CheckCircle2, AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Shield, BookOpen } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function PrijavaPrebijalista() {
  return (
    <DolazakPageTemplate
      title="Prijava prebivališta (Anmeldung)"
      subtitle="Obavezna registracija adrese u roku od 14 dana nakon useljenja u stan u Njemačkoj — regulisana Saveznim zakonom o prijavljivanju (Bundesmeldegesetz, BMG)."
      sections={[
        {
          icon: <BookOpen className="h-4 w-4 text-gold" />,
          title: "Šta je Anmeldung i zašto je važan?",
          content: (
            <div className="space-y-2">
              <p>Sistem prijavljivanja prebivališta (<strong>Meldewesen</strong>) je „informacijski temelj" moderne njemačke uprave. Na osnovu tvojih podataka o prebivalištu:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Izdaju se <strong>lični dokumenti</strong> (pasoš, lična karta).</li>
                <li>Organizuju se <strong>izbori</strong> — biraš samo tamo gdje si prijavljen.</li>
                <li>Planiraju se <strong>mjesta u vrtićima i školama</strong> za tvoju djecu.</li>
                <li>Određuju se <strong>finansijske dotacije</strong> tvoje općine od savezne zemlje.</li>
                <li>Obrađuju se zahtjevi za <strong>Kindergeld, Bürgergeld, Wohngeld</strong> i druge naknade.</li>
              </ul>
              <p className="text-xs text-muted-foreground">Bez prijave praktično ne možeš obaviti nijedan administrativni postupak u Njemačkoj.</p>
            </div>
          ),
        },
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko treba prijaviti prebivalište?",
          content: (
            <div className="space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li>Svako ko se useljava u stan u Njemačkoj — bez obzira na državljanstvo.</li>
                <li>Građani EU, državljani trećih zemalja, azilanti.</li>
                <li>I <strong>djeca i bebe</strong> moraju biti prijavljena (roditelj ih prijavljuje).</li>
                <li>Rok: <strong>14 dana</strong> od useljenja (u nekim saveznim zemljama 7 dana).</li>
              </ul>
              <p className="mt-2 text-sm"><strong>Odjava (Abmeldung)</strong> je potrebna samo ako se seliš u inostranstvo. Ako se seliš unutar Njemačke, dovoljno je samo nova prijava na novoj adresi — stara se automatski gasi.</p>
              <p className="mt-1 text-xs text-muted-foreground">Važno: Ako boravio u hotelu, pansionu ili na campingu, dužan si popuniti hotelski prijavni list (Hotelmeldeschein) — osim ako se koristi digitalni postupak prijave.</p>
            </div>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Šta ti treba?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Pasoš ili lična karta</strong> (original, ne kopija)</li>
              <li><strong>Potvrda stanodavca</strong> (Wohnungsgeberbestätigung) — stanodavac ti mora dati ovaj dokument. Sadrži: ime stanodavca, adresu stana, datum useljenja. Bez ovog dokumenta prijava nije moguća.</li>
              <li><strong>Popunjen Anmeldung formular</strong> (Anmeldeformular) — dostupan online na stranici tvog grada ili u uredu.</li>
              <li><strong>Ugovor o najmu</strong> (preporučljivo, ali ne uvijek obavezno)</li>
              <li>Eventualno: viza ili dozvola boravka (za državljane trećih zemalja).</li>
              <li>Vjenčani list (ako prijavljuješ supružnika).</li>
              <li>Rodni listovi djece (ako prijavljuješ djecu).</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Pronađi nadležni ured</strong> — Bürgerbüro ili Einwohnermeldeamt u tvom gradu. Traži na Google: „Anmeldung + [tvoj grad]".</li>
              <li><strong>Zakaži termin</strong> — Većina gradova zahtijeva online termin. Provjeri web stranicu grada. U velikim gradovima (Berlin, München, Frankfurt) termini mogu biti zauzeti sedmicama unaprijed — zakaži odmah!</li>
              <li><strong>Zatraži Wohnungsgeberbestätigung</strong> — Tvoj stanodavac mora ispuniti i potpisati ovaj dokument. Bez njega ne možeš završiti prijavu.</li>
              <li><strong>Preuzmi i popuni Anmeldeformular</strong> — Dostupan na web stranici grada. Upiši: puno ime, datum rođenja, državljanstvo, bračno stanje, nova adresa, prethodna adresa.</li>
              <li><strong>Pripremi dokumente</strong> — Pasoš + potvrda stanodavca + popunjen formular. Stavi sve u mapu.</li>
              <li><strong>Dođi na termin</strong> — Na šalteru predaješ dokumente. Službenica provjerava podatke i unosi ih u sistem.</li>
              <li><strong>Primi Meldebescheinigung</strong> — Odmah na licu mjesta dobijaš potvrdu o prijavi (Anmeldebestätigung / Meldebescheinigung). <strong>Čuvaj ovaj dokument!</strong> Trebaće ti za banku, poslodavca, osiguranje itd.</li>
              <li><strong>Steuer-ID dolazi poštom</strong> — U roku od 2–4 sedmice dobijaš Steuer-ID (porezni identifikacioni broj) na novu adresu. Ako si već imao Steuer-ID, novi ti neće biti dodijeljen — koristi postojeći.</li>
              <li><strong>Obavijesti poslodavca</strong> — Dostavi novu adresu i Steuer-ID poslodavcu.</li>
              <li><strong>Ažuriraj ostale institucije</strong> — Banka, osiguravajuće kuće, škola za djecu, Kindergeldstelle itd.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: (
            <div className="space-y-2">
              <p>U nadležnom <strong>Bürgerbüro</strong> ili <strong>Einwohnermeldeamt</strong> tvog grada. Adresu i termine pronaći na web stranici grada (npr. muenchen.de, berlin.de itd.).</p>
              <p className="text-xs text-muted-foreground">U Njemačkoj postoji oko 5.100 općinskih službi za prijavljivanje (Meldebehörden). Svaka općina ima vlastiti ured.</p>
            </div>
          ),
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Rok: <strong>14 dana</strong> od useljenja.</li>
              <li>Troškovi: <strong>Besplatno</strong> (Anmeldung je besplatna).</li>
              <li>Kazna za kašnjenje: do <strong>1.000 €</strong> (rijetko se primjenjuje, ali moguće).</li>
              <li>Meldebescheinigung dobijaš <strong>odmah na licu mjesta</strong>.</li>
              <li>Steuer-ID stiže poštom za 2–4 sedmice.</li>
            </ul>
          ),
        },
        {
          icon: <Shield className="h-4 w-4 text-gold" />,
          title: "Tvoja prava i zaštita podataka",
          content: (
            <div className="space-y-2">
              <p>Prema Bundesmeldegesetz (BMG) i GDPR-u imaš sljedeća prava:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Pravo na uvid</strong> — Možeš zatražiti informaciju o svim podacima koji su o tebi pohranjeni u registru.</li>
                <li><strong>Pravo na ispravku</strong> — Ako su podaci netačni, imaš pravo na ispravku ili brisanje.</li>
                <li><strong>Auskunftssperre</strong> (zaštitna blokada) — Ako postoji opasnost za tvoju sigurnost, možeš zatražiti da tvoji podaci ne budu dostupni javnosti.</li>
                <li><strong>Meldegeheimnis</strong> — Službenici su obavezni čuvati tajnost tvojih podataka, čak i nakon odlaska iz službe.</li>
              </ul>
              <p className="text-xs text-muted-foreground">Tvoji podaci smiju se koristiti samo u zakonski propisane svrhe. Privatna lica i firme mogu dobiti ograničene informacije samo u zakonski definiranom obimu.</p>
            </div>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Kasniti sa prijavom duže od 14 dana — može doći do kazne.</li>
              <li>Zaboraviti Wohnungsgeberbestätigung — bez nje prijava nije moguća.</li>
              <li>Donijeti kopiju pasoša umjesto originala.</li>
              <li>Pogrešna adresa na formularu (mora se poklapati sa ugovorom o najmu).</li>
              <li>Ne zakazati termin — u velikim gradovima se čeka sedmicama bez termina.</li>
              <li>Misliti da moraš odjaviti staru adresu pri seljenju unutar Njemačke — ne moraš, nova prijava automatski gasi staru.</li>
              <li>Izgubiti Meldebescheinigung — čuvaj ga, trebaće ti za mnoge postupke.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Službene informacije – Meldewesen (BMI)", url: "https://www.bmi.bund.de/DE/themen/moderne-verwaltung/verwaltungsrecht/meldewesen/meldewesen-node.html" },
        { type: "info", label: "Bundesmeldegesetz (BMG) – puni tekst zakona", url: "https://www.gesetze-im-internet.de/bmg/BJNR108410013.html" },
        { type: "info", label: "Česta pitanja o Meldewesen (BMI FAQ)", url: "https://www.bmi.bund.de/SharedDocs/faqs/DE/themen/moderne-verwaltung/meldewesen/meldewesen.html" },
      ]}
    />
  );
}
