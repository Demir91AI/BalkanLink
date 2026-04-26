import { Link } from "react-router-dom";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist Wirtschaftliche Jugendhilfe (WiJuHi)?",
    bhsField: "Šta je Wirtschaftliche Jugendhilfe?",
    whatToWrite:
      "WiJuHi nije zasebna socijalna pomoć koju samostalno tražiš. To je finansijski dio šire odgojne pomoći (Hilfe zur Erziehung) po SGB VIII koji obrađuje Jugendamt — automatski prati svaku odobrenu mjeru.",
    whereToFind:
      "Pravni osnov: Sozialgesetzbuch VIII (SGB VIII) — Achtes Buch Kinder- und Jugendhilfe. Nadležno tijelo: Jugendamt tvoje općine.",
    format:
      "Cilj nije isplata novca u ruke roditelju, već finansiranje mjere koja je u korist djeteta — ambulantne, polustacionarne ili stacionarne.",
    commonMistake:
      "Misliti da možeš samostalno tražiti 'WiJuHi' kao zasebnu naknadu. Uvijek se traži konkretna mjera (npr. § 30 ili § 33), a finansiranje slijedi automatski.",
    note: "Stand 2026. Pravo na pomoć po SGB VIII u principu ne zavisi od državljanstva — vezano je za uobičajeno boravište djeteta u Njemačkoj.",
  },
  {
    deField: "Anspruchsberechtigte — Za koga je pomoć?",
    bhsField: "Za koga je pomoć?",
    whatToWrite:
      "1) Roditelji (Personensorgeberechtigte) kojima treba pomoć u odgoju. 2) Hraniteljske porodice (Pflegeeltern). 3) Mladi punoljetni 18–21 (izuzetno do 27) — Hilfe für junge Volljährige § 41. 4) Samohrani mladi roditelji u zajedničkom stanovanju. 5) Djeca i mladi sa duševnim poteškoćama — Eingliederungshilfe § 35a.",
    whereToFind:
      "Allgemeiner Sozialer Dienst (ASD) tvoje opštine. Razgovor je besplatan, povjerljiv i ne obavezuje te ni na šta.",
    commonMistake:
      "Junge Volljährige otpuštaju sebe sa 18. — pravo na § 41 traje do 21. (izuzetno do 27.) godine. Ne moraš sam izaći iz Heim-a samo jer si punoljetan.",
    note: "Bosanski, srpski, hrvatski i drugi državljani sa boravištem u Njemačkoj imaju ista prava kao i Nijemci.",
  },
  {
    deField: "Antragstellung — Kada predati zahtjev?",
    bhsField: "Kada predati zahtjev?",
    whatToWrite:
      "Što ranije, to bolje. Pomoć NE djeluje retroaktivno — Jugendamt ne može odobriti pomoć za period prije nego što je primio formalni Antrag. Bez pisanog zahtjeva, rok ne počinje teći.",
    whereToFind:
      "Pisani zahtjev predaješ ASD-u nadležnom za tvoju adresu. Možeš preporučenom poštom, lično (sa pečatom prijema) ili online portalom grada.",
    format:
      "Tipični momenti za prijavu: tinejdžer izmiče kontroli (izostanci, agresija, supstance), razvod ili smrt u porodici, roditelj se razboli, dijete dobija dijagnozu (autizam, ADHD, depresija), savjet škole/ljekara, hitne situacije nasilja u porodici.",
    commonMistake:
      "'Samo se idem raspitati' — bez formalnog Antrag-a rok ne teče. Ako želiš uslugu, podnesi pisani zahtjev i čuvaj dokaz o predaji.",
    example:
      "Antrag (slobodna forma): 'Hiermit beantrage ich gemäß § 27 SGB VIII Hilfe zur Erziehung für mein Kind [ime, datum rođenja]. Begründung: ... ' + datum + potpis.",
  },
  {
    deField: "Hilfeart — Decision tree: koja vrsta pomoći mi treba?",
    bhsField: "Koja vrsta pomoći mi treba?",
    whatToWrite:
      "Samo savjet → Erziehungsberatung (§ 28). Pomoć cijeloj porodici u kući → Sozialpädagogische Familienhilfe (§ 31). Samo tinejdžer → Erziehungsbeistand (§ 30). Mlađa djeca u grupi → Soziale Gruppenarbeit (§ 29). Dnevni boravak van škole → Tagesgruppe (§ 32). Hraniteljska porodica → Vollzeitpflege (§ 33). Specijalizovani dom → Heimerziehung (§ 34). Intenzivna 1-na-1 → Einzelbetreuung (§ 35). Duševne smetnje → Eingliederungshilfe (§ 35a). Akutna opasnost → Inobhutnahme (§ 42). Punoljetan, ne može sam → Hilfe für junge Volljährige (§ 41).",
    whereToFind:
      "Konačnu mjeru bira Jugendamt zajedno sa tobom u Hilfeplangespräch-u — ne biraš sam paragraf, ali možeš predložiti.",
    commonMistake:
      "Tražiti odmah Heim (§ 34) iako bi ambulantna pomoć (§ 30 ili § 31) bila dovoljna. Jugendamt po zakonu mora birati najmanje invazivnu mjeru koja postiže cilj.",
  },
  {
    deField: "Erforderliche Unterlagen — Dokumenti",
    bhsField: "Dokumenti koje pripremiti",
    whatToWrite:
      "LIČNO: lična karta/pasoš (oba roditelja + dijete), Aufenthaltstitel (ne-EU), Anmeldebescheinigung, Geburtsurkunde djeteta (internacionalna), Sorgerechtsnachweis (kod razvoda). FINANSIJSKI: Lohnabrechnung zadnja 3 mjeseca, Steuerbescheid, eventualni Bürgergeld-/Wohngeld-/Kinderzuschlag-Bescheid, Mietvertrag, Kindergeld-Bescheid. DIJETE: Krankenversicherungskarte, Impfpass, Schulzeugnisse, medicinski/psihološki nalazi (kod § 35a), pisana izjava škole/ljekara/terapeuta.",
    whereToFind:
      "Lista varira po Bundesland-u i tipu mjere. Ovo je realističan minimum koji se traži u većini ASD-ova.",
    commonMistake:
      "Predati originale. Uvijek nosiš originale na uvid, a predaješ KOPIJE. Napravi kopije svega prije sastanka.",
    note: "Ako primaš Bürgergeld, Wohngeld ili Kinderzuschlag — nećeš plaćati Kostenbeitrag (§§ 91–94), pa Bescheid o tome obavezno priloži.",
  },
  {
    deField: "Hilfeplanverfahren (§ 36) — Postupak korak po korak",
    bhsField: "Postupak korak po korak",
    whatToWrite:
      "1) Prvi kontakt sa ASD-om (telefon/mail/lično). 2) Formalni pisani Antrag — čuvaj dokaz o predaji. 3) Bedarfsfeststellung — procjena potrebe (4–8 sedmica). 4) Hilfeplangespräch — sastanak svih učesnika. 5) Pisani Hilfeplan (mjera, ciljevi, trajanje obično 6 mjeseci, evaluacija). 6) Bewilligungsbescheid (rok za žalbu = mjesec dana!). 7) Sprovođenje + revizija svakih 6 mjeseci kroz Fortschreibungsgespräch.",
    whereToFind:
      "Ako ne govoriš dovoljno njemački — IZRIČITO traži Dolmetscher (certifikovanog tumača). Imaš pravo, plaća Jugendamt.",
    format:
      "Imaš pravo dovesti Vertrauensperson (osobu od povjerenja) — prijatelja, rođaka, savjetnika iz Caritas/Diakonie/AWO.",
    commonMistake:
      "Idete na Hilfeplangespräch nepripremljen — to nije neformalni razgovor. Sve što kažeš ulazi u Hilfeplan koji ima pravni značaj.",
    example:
      "Pripremi 1 stranicu: 'Šta je problem konkretno', 'Šta sam već probao/la', 'Šta želim da se postigne za 6 mjeseci'.",
  },
  {
    deField: "Pflegegeld 2026 — Iznosi za hraniteljske porodice (Vollzeitpflege § 33)",
    bhsField: "Pflegegeld iznosi 2026",
    whatToWrite:
      "Sachaufwand 0–6 god: 764 € · 6–12 god: 923 € · 12–18 god: 1.072 €. Erziehungsbeitrag (jednako za sve uzraste): 439 €. Primjer 14-godišnjak: 1.072 + 439 = 1.511 € mjesečno.",
    whereToFind:
      "Iznosi prate preporuke Deutscher Verein für öffentliche und private Fürsorge. Bundesländer-i mogu blago varirati.",
    format:
      "Dodatno: polovična nadoknada doprinosa za penziono osiguranje, puna nadoknada Unfallversicherung, Erstausstattung (krevet, autosjedalica, kolica), Beihilfe za posebne prilike (krštenje, prvo pričešće, konfirmacija) i ljetovanje.",
    commonMistake:
      "Polovina Kindergeld-a se odbija od Pflegegeld-a (§ 39 Abs. 6) jer hranitelji primaju Kindergeld pored Pflegegeld-a — uračunaj to u svoju računicu.",
  },
  {
    deField: "Kostenheranziehung (§§ 91–94 SGB VIII) — Kad roditelji moraju doplatiti",
    bhsField: "Kad roditelji moraju doplatiti",
    whatToWrite:
      "Kad Jugendamt smjesti dijete van kuće (dom, hraniteljska porodica), biološki roditelji mogu biti pozvani na doprinos iz svog dohotka. Tabela ima 14 dohodovnih grupa iz KostenbeitragsV. Ako bi mjesečni doprinos bio manji od 20 €, opština ga ne treba ni naplaćivati.",
    whereToFind:
      "Kostenbeitragsverordnung (KostenbeitragsV) — tabela na gesetze-im-internet.de.",
    format:
      "NE plaćaju doprinos: primaoci Bürgergeld/Sozialhilfe/Asylbewerberleistungen, primaoci Wohngeld/Kinderzuschlag, trudnice, roditelji koji brinu o djetetu mlađem od 6 godina.",
    commonMistake:
      "Ne tražiti Härtefallantrag — ako te Kostenbeitrag pritišće (drugi izdržavani, dugovi, bolest), opština može djelimično ili potpuno ukinuti doprinos. Niko te neće sam pitati.",
    note: "Velika promjena 2023: Junge Volljährige više ne plaćaju doprinos iz svojih prihoda od posla dok su pod § 41 SGB VIII. Mnogi to još uvijek ne znaju.",
  },
  {
    deField: "Widerspruch — Ako ti zahtjev odbiju",
    bhsField: "Ako ti zahtjev odbiju",
    whatToWrite:
      "Widerspruch (žalba) u roku od MJESEC DANA od dostave Bescheid-a. Pisano, na isti Jugendamt. Mora sadržavati: oznaku Bescheid-a (Az.), izričitu izjavu da podnosiš Widerspruch, kratko obrazloženje zašto, datum i potpis.",
    whereToFind:
      "Po potrebi tužba pred Verwaltungsgericht-om (upravni sud). Beratungshilfe (besplatna pravna konsultacija) postoji za niska primanja — Beratungshilfeschein dobijaš u Amtsgericht-u.",
    format:
      "Šablon: 'Hiermit lege ich gegen den Bescheid vom [datum], Az. [broj], fristgerecht Widerspruch ein. Begründung: ... Ich bitte um erneute Prüfung.'",
    commonMistake:
      "Propustiti rok od mjesec dana — Bescheid tada postaje pravno obvezujući i više se ne može osporavati standardnim putem.",
    note: "Hitno: ako ti je rok blizu, prvo pošalji preporučenom poštom kratak Widerspruch BEZ obrazloženja sa najavom da slijedi obrazloženje — time si rok sačuvao.",
  },
  {
    deField: "Spezifika za balkansku dijasporu",
    bhsField: "Specifičnosti za našu dijasporu",
    whatToWrite:
      "1) Strah od Jugendamt-a — nasljeđe iz domovine. Realnost u Njemačkoj: Jugendamt prvenstveno NUDI pomoć. Inobhutnahme (oduzimanje) je krajnja mjera kod akutne opasnosti i traži sudsku potvrdu. 2) Korištenje SGB VIII pomoći NE dovodi automatski do problema sa Aufenthaltstitel-om — to je odgojna pomoć, ne čista socijalna pomoć kao Bürgergeld. 3) Verwandtenpflege (baka iz BiH brine o unuku u Njemačkoj) — legitiman model, može se isplaćivati Pflegegeld.",
    whereToFind:
      "Caritas Migrationsberatung, Diakonisches Werk, AWO, Pro Familia — savjetovanje na našem jeziku, besplatno.",
    commonMistake:
      "Vodiš rođaka kao tumača — može biti pristrasan. Imaš pravo na certifikovanog tumača kojeg plaća Jugendamt.",
    note: "Razdvojeno stanovanje (jedan roditelj u Njemačkoj, drugi u BiH/HR/SRB) — doprinos roditelja iz inostranstva se računa, ali naplata u praksi varira. Ne ignoriši Bescheid — može se osporavati ili pregovarati.",
  },
];

export default function WirtschaftlicheJugendhilfeGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Wirtschaftliche Jugendhilfe (Hilfe zur Erziehung)"
        source="Jugendamt · SGB VIII (Stand 2026)"
        formName="Antrag auf Hilfe zur Erziehung (§ 27 SGB VIII)"
        whoCanApply="Roditelji, hraniteljske porodice, mladi punoljetni 18–21 (do 27), djeca/mladi sa duševnim smetnjama (§ 35a). Pravo ne zavisi od državljanstva — vezano je za uobičajeno boravište djeteta u Njemačkoj."
        processingTime="4–12 sedmica od podnošenja kompletnog zahtjeva (Bedarfsfeststellung 4–8 sedmica + Hilfeplangespräch + Bescheid)"
        requirements={[
          "Pisani Antrag (slobodna forma ili formular Jugendamt-a)",
          "Lična dokumenta roditelja i djeteta + Aufenthaltstitel (ne-EU)",
          "Geburtsurkunde djeteta (internacionalna)",
          "Sorgerechtsnachweis (kod razvoda)",
          "Lohnabrechnung zadnja 3 mjeseca + Steuerbescheid",
          "Aktuelni Bescheid o Bürgergeld/Wohngeld/Kinderzuschlag (ako primaš)",
          "Schulzeugnisse + medicinski/psihološki nalazi (po potrebi)",
          "Pisana izjava škole, ljekara ili terapeuta (ako je inicijativa od njih)",
        ]}
        commonMistakes={[
          "Bez formalnog Antrag-a rok za pomoć ne teče — uvijek pisano i sa dokazom predaje",
          "Idete na Hilfeplangespräch nepripremljen — sve što kažeš ulazi u pravno obvezujući Hilfeplan",
          "Propušten rok od mjesec dana za Widerspruch — Bescheid postaje pravosnažan",
          "Ne tražite Härtefallantrag — Kostenbeitrag se može smanjiti ili ukinuti uz obrazloženje",
          "Junge Volljährige misli da pravo prestaje sa 18 — § 41 traje do 21. (izuzetno 27.) godine",
          "Vodi rođaka kao tumača — imaš pravo na certifikovanog tumača kojeg plaća Jugendamt",
        ]}
      />

      <SmartGuideWizardShared steps={STEPS} />

      {/* Besplatne savjetovaonice */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <h3 className="mb-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
          📞 Besplatne savjetovaonice (prije pokretanja postupka)
        </h3>
        <ul className="space-y-1 text-xs text-emerald-900/90 dark:text-emerald-200/80">
          <li>• <strong>Caritas Migrationsberatung</strong> — savjetovanje za migrante na više jezika</li>
          <li>• <strong>Diakonisches Werk</strong> — psihosocijalna podrška</li>
          <li>• <strong>AWO (Arbeiterwohlfahrt)</strong> — porodična savjetovaonica</li>
          <li>• <strong>Pro Familia</strong> — savjetovaonica za porodična pitanja</li>
          <li>• <strong>Verbraucherzentrale</strong> — pravni savjeti oko Bescheid-a</li>
        </ul>
      </div>

      {/* Povezani vodiči */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-2 text-xs font-bold">🔗 Povezani vodiči</h3>
        <ul className="space-y-1 text-xs">
          <li>• <Link to="/formulari/kindergeld" className="text-primary underline">Kindergeld</Link> — kako prijaviti dječji dodatak</li>
          <li>• <Link to="/formulari/hauptantrag" className="text-primary underline">Bürgergeld</Link> — osnovni socijalni minimum</li>
          <li>• <Link to="/formulari/mutterschaftsgeld" className="text-primary underline">Mutterschaftsgeld</Link> — naknada za majke</li>
          <li>• <Link to="/formulari/unterhaltsvorschuss" className="text-primary underline">Unterhaltsvorschuss</Link> — alimentacijski predujam</li>
        </ul>
      </div>

      {/* Pravna napomena */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <p className="text-[11px] text-amber-900/80 dark:text-amber-200/70 leading-relaxed">
          <strong>Pravni izvori:</strong> SGB VIII (gesetze-im-internet.de), Empfehlungen des Deutschen Vereins zur
          Fortschreibung der Pauschalbeträge in der Vollzeitpflege 2026, Gemeinsame Empfehlungen BAGLJÄ zur
          Kostenbeteiligung nach SGB VIII (6. izdanje, juni 2024), KostenbeitragsV. Stand: januar 2026.
          Ovo je edukativni vodič — nije zamjena za pravni savjet.
        </p>
      </div>
    </div>
  );
}
