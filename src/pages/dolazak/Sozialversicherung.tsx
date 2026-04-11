import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Shield } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function Sozialversicherung() {
  return (
    <DolazakPageTemplate
      title="Socijalno osiguranje"
      subtitle="Obavezno socijalno osiguranje u Njemačkoj – 5 stubova sigurnosti za sve zaposlene."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko je obavezno osiguran?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Svi <strong>zaposleni</strong> u Njemačkoj su automatski obavezno socijalno osigurani.</li>
              <li>Samozaposleni i freelanceri su djelimično izuzeti (ali mogu dobrovoljno).</li>
              <li>Minijob (do 603 €/mjesečno) — ograničeno osiguranje.</li>
              <li>Doprinos dijele <strong>poslodavac i zaposleni</strong> (otprilike pola-pola).</li>
            </ul>
          ),
        },
        {
          icon: <Shield className="h-4 w-4 text-gold" />,
          title: "5 stubova socijalnog osiguranja",
          content: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold">1. Krankenversicherung (zdravstveno)</p>
                <p className="text-xs">~14,6% + dodatni doprinos. Pokriva ljekare, bolnicu, lijekove.</p>
              </div>
              <div>
                <p className="font-semibold">2. Rentenversicherung (penzijsko)</p>
                <p className="text-xs">~18,6%. Pravo na penziju nakon min. 5 godina uplaćivanja.</p>
              </div>
              <div>
                <p className="font-semibold">3. Arbeitslosenversicherung (nezaposlenost)</p>
                <p className="text-xs">~2,6%. Pravo na ALG I nakon 12 mjeseci zaposlenja.</p>
              </div>
              <div>
                <p className="font-semibold">4. Pflegeversicherung (njega)</p>
                <p className="text-xs">~3,4% (bez djece: 4,0%). Pokriva troškove njege u starosti.</p>
              </div>
              <div>
                <p className="font-semibold">5. Unfallversicherung (nezgode na radu)</p>
                <p className="text-xs">Plaća isključivo poslodavac. Pokriva nezgode na poslu i putu.</p>
              </div>
            </div>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Prijavi se kod zdravstvene kase</strong> — Izaberi kasu (TK, AOK, Barmer itd.) prije početka rada.</li>
              <li><strong>Predaj potvrdu poslodavcu</strong> — Poslodavac te automatski prijavljuje za svih 5 osiguranja.</li>
              <li><strong>Primi Sozialversicherungsausweis</strong> — Rentenversicherung ti šalje ausweis sa tvojim brojem (SV-Nummer).</li>
              <li><strong>Provjeri platnu listu</strong> — Na prvoj listi provjeri: KV, RV, AV, PV doprinose.</li>
              <li><strong>Čuvaj SV-Nummer</strong> — Ovaj broj koristiš cijeli radni vijek u Njemačkoj.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>Prijava ide automatski preko <strong>poslodavca</strong>. Ti biraš samo zdravstvenu kasu. Sve ostalo registruje poslodavac. Sozialversicherungsausweis šalje <strong>Deutsche Rentenversicherung</strong>.</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Prijava: <strong>odmah sa početkom zaposlenja</strong>.</li>
              <li>SV-Ausweis dolazi: <strong>2-4 sedmice</strong>.</li>
              <li>Troškovi prijave: <strong>Besplatno</strong> (doprinosi se automatski odbijaju od plate).</li>
              <li>Ukupni doprinosi zaposlenog: cca. <strong>20% bruto plate</strong>.</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Ne predati Mitgliedsbescheinigung poslodavcu — može kasniti prijava.</li>
              <li>Izgubiti SV-Nummer — zatraži duplikat kod Rentenversicherung.</li>
              <li>Ne razumjeti razliku Minijob vs. regularan posao — Minijob nema puno osiguranje.</li>
              <li>Samozaposleni koji se ne osiguraju — mogu izgubiti penzijska prava.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Deutsche Rentenversicherung", url: "https://www.deutsche-rentenversicherung.de" },
        { type: "info", label: "BMAS – Sozialversicherung", url: "https://www.bmas.de/DE/Soziales/Sozialversicherung/sozialversicherung.html" },
      ]}
    />
  );
}
