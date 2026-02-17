import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Heart } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function ZdravstvenoOsiguranje() {
  return (
    <DolazakPageTemplate
      title="Zdravstveno osiguranje"
      subtitle="Javno ili privatno – zdravstveno osiguranje je obavezno za sve u Njemačkoj."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko treba zdravstveno osiguranje?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Svi</strong> koji žive u Njemačkoj moraju imati zdravstveno osiguranje — bez izuzetka.</li>
              <li>Zaposleni sa platom do <strong>69.300 € godišnje</strong> (2024) su obavezno u javnom osiguranju (GKV).</li>
              <li>Zaposleni iznad tog iznosa mogu birati: javno ili privatno (PKV).</li>
              <li>Samozaposleni i freelanceri mogu birati od početka.</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Razlika: javno vs. privatno",
          content: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Javno osiguranje (GKV):</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Doprinos: ~14,6% + dodatni doprinos kase (~1,3-1,7%).</li>
                  <li>Pola plaća poslodavac, pola ti.</li>
                  <li>Porodično osiguranje (Familienversicherung): supružnik i djeca besplatno osigurani ako ne rade.</li>
                  <li>Kase: TK, AOK, Barmer, DAK, IKK itd.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Privatno osiguranje (PKV):</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Premija zavisi od zdravlja, starosti i paketa.</li>
                  <li>Nema porodičnog osiguranja — svaki član plaća posebno.</li>
                  <li>Bolji pristup specijalistima i kraće čekanje.</li>
                  <li>Povratak u javno: teško nakon 55. godine.</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Odluči se za kasu</strong> — Istraži opcije: TK, AOK, Barmer, DAK. Uporedi dodatne doprinose i pogodnosti.</li>
              <li><strong>Prijavi se online ili u poslovnici</strong> — Većina kasa ima online prijavu. Treba ti: pasoš, Meldebescheinigung, ugovor o radu.</li>
              <li><strong>Primi potvrdu članstva</strong> — Kasa ti šalje potvrdu (Mitgliedsbescheinigung) u roku od nekoliko dana.</li>
              <li><strong>Predaj potvrdu poslodavcu</strong> — Poslodavac koristi ovu potvrdu za registraciju kod zdravstvenog fonda.</li>
              <li><strong>Primi zdravstvenu karticu (eGK)</strong> — Elektronska zdravstvena kartica dolazi poštom u roku od 2-3 sedmice.</li>
              <li><strong>Registruj se kod kućnog ljekara (Hausarzt)</strong> — Pronađi ljekara u blizini i zakaži prvi pregled.</li>
              <li><strong>Porodično osiguranje</strong> — Ako supružnik ne radi: prijavi ga/je putem iste kase (besplatno u GKV).</li>
              <li><strong>Djeca</strong> — Automatski osigurana putem roditeljskog javnog osiguranja.</li>
              <li><strong>Promjena kase</strong> — Moguća nakon 12 mjeseci članstva, sa otkaznim rokom od 2 mjeseca.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>Direktno kod izabrane zdravstvene kase (online, telefonski ili u poslovnici). Poslodavac pomaže sa prijavom ako si zaposlen/a.</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Prijava: <strong>odmah po početku rada</strong> — poslodavac ne može isplatiti platu bez osiguranja.</li>
              <li>Kartica (eGK): <strong>2-3 sedmice</strong> nakon prijave.</li>
              <li>Troškovi prijave: <strong>Besplatno</strong>.</li>
              <li>Mjesečni doprinos (GKV): ~<strong>7,3% tvoje bruto plate</strong> (pola plaća poslodavac).</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Ne prijaviti se na vrijeme — ostati neosiguran je ilegalno i kumuliraju se doprinosi unazad.</li>
              <li>Odabrati privatno osiguranje bez razumijevanja — teško se vratiti u javno.</li>
              <li>Zaboraviti porodično osiguranje — supružnik i djeca mogu biti besplatno osigurani u GKV.</li>
              <li>Ne donijeti eGK karticu kod ljekara — bez nje ćeš morati platiti pregled i tražiti povrat.</li>
              <li>Ne prijaviti promjenu posla kasi — može doći do prekida osiguranja.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Službene informacije (BMG)", url: "https://www.bundesgesundheitsministerium.de/krankenversicherung.html" },
      ]}
    />
  );
}
