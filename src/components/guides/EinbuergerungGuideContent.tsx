import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Persönliche Angaben — Name, Geburtsdatum, Geburtsort, Staatsangehörigkeit",
    bhsField: "Lični podaci podnosioca",
    whatToWrite:
      "Prezime, ime, datum i mjesto rođenja, trenutno državljanstvo (npr. bosnisch-herzegowinisch). Ako se prezime razlikuje od onog u rodnom listu (Geburtsname), upiši i taj.",
    whereToFind:
      "Pasoš, lična karta i rodni list (Geburtsurkunde sa internacionalnim prevodom ili overom Apostille).",
    format:
      "Ime tačno kao u pasošu (sa svim dijakritikama: č, ć, š, đ, ž). Datum: DD.MM.GGGG.",
    commonMistake:
      "Pisati ime po njemačkoj transkripciji (Hadzic umjesto Hadžić). Einbürgerungsbehörde uzima ime tačno iz pasoša — neslaganje uzrokuje vraćanje zahtjeva.",
    example:
      "Familienname: Hadžić | Vorname: Amina | Geburtstag: 15.03.1990 | Geburtsort: Sarajevo | Staatsangehörigkeit: bosnisch-herzegowinisch",
    note:
      "Od 27.06.2024. (StARModG) Njemačka generalno dozvoljava višestruko državljanstvo — ne moraš se odreći BiH pasoša.",
  },
  {
    deField: "Aufenthaltsstatus und Einreisedatum",
    bhsField: "Boravišni status i datum dolaska u Njemačku",
    whatToWrite:
      "Trenutni Aufenthaltstitel (npr. Niederlassungserlaubnis, Blaue Karte EU, befristete Aufenthaltserlaubnis), datum kad si prvi put ušao u Njemačku, i ukupan broj godina legalnog boravka.",
    whereToFind:
      "Aufenthaltstitel kartica, Meldebescheinigung sa Anmeldedatum, stari pasoši sa pečatima.",
    format:
      "Aufenthaltsstatus: tačan njemački termin sa kartice. Datum: DD.MM.GGGG. Broj godina: cijeli brojevi (npr. „seit 5 Jahren in Deutschland“).",
    commonMistake:
      "Brojati godine od dolaska kao turista — broji se LEGALAN boravak sa registrovanom adresom (Anmeldung). Boravak po vizi za posjetu se NE računa.",
    example: "Niederlassungserlaubnis seit 12.04.2021 | Einreisedatum: 03.09.2019",
    note:
      "Standardno se traži minimum 5 godina legalnog boravka (§ 10 StAG; ranije 8). Ubrzana naturalizacija nakon 3 godine („besondere Integrationsleistungen“) ukinuta je 30.10.2025. Kraći rok važi npr. za supružnike njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG).",
  },
  {
    deField: "Aufenthaltsdauer — Mindestens 5 Jahre",
    bhsField: "Trajanje boravka — minimum 5 godina (izuzeci npr. za supružnike Nijemaca, § 9 StAG)",
    whatToWrite:
      "Tačan ukupan broj godina i mjeseci legalnog neprekidnog boravka u Njemačkoj. Ako je bio prekid duži od 6 mjeseci, navesti razloge.",
    whereToFind:
      "Sve Meldebescheinigungen, kopije starih i trenutnih boravišnih dozvola, eventualno Bestätigungen poslodavaca.",
    format: "Godine i mjeseci, npr. „5 Jahre 7 Monate ununterbrochen“.",
    commonMistake:
      "Ne prijaviti dugotrajne odlaske u BiH (preko 6 mjeseci) — to može prekinuti period i resetovati brojač. Ako si bio van Njemačke duže, traži se posebno objašnjenje.",
    example: "5 Jahre 7 Monate seit 03.09.2019 ohne Unterbrechung > 6 Monate.",
    whenToLeaveEmpty:
      "Nikada — boravišni period je centralni uslov, mora biti dokazan.",
  },
  {
    deField: "Sprachkenntnisse — Deutsch B1 (für Schnellverfahren B2)",
    bhsField: "Znanje njemačkog jezika — minimum B1, za ubrzani postupak B2",
    whatToWrite:
      "Naziv testa, datum polaganja, ocjena/level i izdavalac. Telc B1, Goethe-Zertifikat B1, ÖSD B1, DTZ — svi su priznati.",
    whereToFind:
      "Originalna potvrda o položenom testu (Sprachzertifikat). Mora biti od priznatog izdavaoca (Telc, Goethe, ÖSD, BAMF za DTZ).",
    format: "Naziv testa + level + datum, npr. „telc Deutsch B1 — bestanden am 15.05.2024“.",
    commonMistake:
      "Prilagati interne potvrde Volkshochschule koje NISU službeni testovi. Mora biti zvanični Sprachzertifikat — OSIM ako spadaš u izuzetke (vidi dolje).",
    example: "Goethe-Zertifikat B1 — Gesamtnote: gut (bestanden) — Datum: 22.06.2023",
    note:
      "🎓 OSLOBOĐENI ste jezičkog testa ako imate: (1) njemački školski završetak — Hauptschulabschluss ili viši; (2) ZAVRŠEN AUSBILDUNG u Njemačkoj na njemačkom (3 godine, IHK/HWK završni ispit) — Ausbildungszeugnis se priznaje kao dokaz B1; (3) studij na njemačkom univerzitetu (završen ili u toku). U tom slučaju umjesto Sprachzertifikata prilažeš kopiju Zeugnis-a. Za turbo-naturalizaciju (3 god.) treba B2 + posebne integracijske dostignuća.",
  },
  {
    deField: "Einbürgerungstest — bestanden",
    bhsField: "Test integracije — položen Einbürgerungstest",
    whatToWrite:
      "Datum polaganja Einbürgerungstesta i broj tačnih odgovora (od 33). Test ima 33 pitanja iz njemačke historije, prava i kulture — prag za polaganje je 17.",
    whereToFind:
      "Originalna potvrda o položenom testu — izdaje BAMF priznata Volkshochschule ili druga akreditovana institucija.",
    format: "Datum + rezultat (npr. „26 von 33 richtig“) + ime izdavaoca.",
    commonMistake:
      "Polagati test na vlastitu ruku bez prijave preko Volkshochschule. Test se MORA polagati u akreditovanoj instituciji. Cijena ~25€.",
    example:
      "Einbürgerungstest — bestanden am 18.03.2024 — Volkshochschule Berlin Mitte — 28 von 33 richtig.",
    note:
      "🎓 OSLOBOĐENI ste Einbürgerungstesta (§10 Abs. 6 StAG) ako imate „Abschluss einer deutschen Schule“ — uključujući: (1) Hauptschulabschluss, Realschulabschluss, Abitur; (2) **Berufsschulabschluss / Berufsschulzeugnis** koji dobijaš UZ završen Ausbildung u Njemačkoj — Berufsschule se priznaje kao njemačka škola, pa Ausbildungszeugnis + Berufsschulzeugnis u praksi oslobađa i od jezika i od Einbürgerungstesta (npr. Altenpflege, MFA, Kfz-Mechatroniker — sve 3-godišnje Ausbildunge na njemačkom); (3) završen studij prava/političkih/društvenih nauka na njemačkom univerzitetu; (4) djeca ispod 16 god.; (5) trajna nesposobnost zbog bolesti/invaliditeta/starosti. 📍 BAYERN: Bavarske Einbürgerungsbehörde (StMI praksa) DOSLJEDNO priznaju Berufsschulzeugnis kao oslobađanje od testa — zato kandidati sa završenim Ausbildungom u Bayernu često ne polažu ništa. U drugim Bundesländerima (npr. NRW, Berlin) praksa varira — neke Behörde traže odvojen Hauptschulabschluss; uvijek pitaj svoju Einbürgerungsbehörde prije plaćanja testa (~25€).",
  },
  {
    deField: "Lebensunterhalt — Sicherung des eigenen Einkommens",
    bhsField: "Vlastiti prihodi — moraš se izdržavati bez socijalnih davanja",
    whatToWrite:
      "Trenutni neto-prihod, ime poslodavca, vrsta ugovora (befristet/unbefristet), trajanje radnog odnosa. Ako si samostalan — porezna prijava + BWA. Ako primaš Bürgergeld/Sozialhilfe — uglavnom NE ispunjavaš uslov.",
    whereToFind:
      "Posljednje 3 platne liste (Lohnabrechnung), Arbeitsvertrag, Steuerbescheid (poreske rješenje), Renteninformation.",
    format:
      "Bruto i neto mjesečno, ime poslodavca, datum početka. Sve dokumente priložiti u kopiji.",
    commonMistake:
      "Misliti da Wohngeld ili Kindergeld diskvalifikuju — NE diskvalifikuju! Diskvalifikuje samo Bürgergeld, Sozialhilfe i Grundsicherung. Studentski BAföG i Aufstocker pravila se mijenjaju — provjeri sa savjetnikom.",
    example:
      "Festanstellung unbefristet seit 01.06.2022 bei Siemens AG | Brutto: 3.450 € | Netto: 2.180 € | Beruf: Maschinenbauingenieur.",
    note:
      "Izuzeci od prihoda postoje za: žene/muškarce na roditeljskom (Elternzeit), umirovljenike sa rentom > Bürgergeld-praga, osobe sa invaliditetom.",
  },
  {
    deField: "Bekenntnis zur freiheitlich-demokratischen Grundordnung",
    bhsField: "Izjava o priznavanju demokratskog uređenja Njemačke",
    whatToWrite:
      "Vlastoručno potpisati standardiziranu Loyalitätserklärung. Izjavljuješ da prihvaćaš njemački Ustav (Grundgesetz), demokratiju, jednakost spolova i odbijaš svaki ekstremizam.",
    whereToFind:
      "Tekst se nalazi u zahtjevu (Einbürgerungsantrag) — popunjavaš datum i potpis. Mnoge zemlje (Bundesländer) traže i posebnu izjavu protiv antisemitizma (od 2024).",
    format:
      "Datum + vlastoručni potpis. Ne smije biti elektronski potpis ako se predaje u papirnom obliku.",
    commonMistake:
      "Potpisati izjavu bez čitanja. U intervjuu Einbürgerungsbehörde te može pitati o Grundgesetz — npr. ravnopravnost spolova, sloboda vjeroispovijesti, demokratija.",
    example: "„Ich bekenne mich zur freiheitlich-demokratischen Grundordnung… Ort, Datum, Unterschrift“",
    note:
      "Od 27.06.2024. dodatno se traži pisano priznavanje historijske odgovornosti Njemačke i prava Izraela na postojanje.",
  },
  {
    deField: "Beibehaltung der bisherigen Staatsangehörigkeit",
    bhsField: "Zadržavanje BiH državljanstva — više nije problem",
    whatToWrite:
      "Označiti polje „Ich behalte meine bisherige Staatsangehörigkeit“. Više nema potrebe podnositi Beibehaltungsgenehmigung — od StARModG (27.06.2024) Njemačka prihvata višestruko državljanstvo bez izuzetka.",
    whereToFind: "Polje u Einbürgerungsantrag obrascu, sekcija „Mehrstaatigkeit“.",
    format: "Označiti polje + priložiti kopiju trenutnog pasoša BiH.",
    commonMistake:
      "Misliti da i dalje treba „Genehmigung“ — to je staro pravilo. Pažnja: Bosna i Hercegovina formalno NEMA bilateralni sporazum s Njemačkom, ali u praksi BiH ne oduzima pasoš automatski.",
    example: "☑ Ich beabsichtige, meine bisherige Staatsangehörigkeit beizubehalten.",
    note:
      "Detaljniji pregled BiH situacije pogledaj na našoj stranici „Dvojno državljanstvo“ (BiH kartica).",
  },
  {
    deField: "Erforderliche Unterlagen — Vollständige Liste",
    bhsField: "Spisak obaveznih dokumenata — provjeri prije slanja",
    whatToWrite:
      "Sastavi kontrolni spisak svih dokumenata u redu prema sekcijama zahtjeva. Sve mora biti u kopiji + neki originali (rodni list, Sprachzertifikat).",
    whereToFind:
      "Trenutni pasoš, rodni list (overen Apostille + njemački prevod), vjenčani list ako je relevantno, Aufenthaltstitel, sve Meldebescheinigungen, Sprachzertifikat, Einbürgerungstest potvrda, posljednje 3 platne liste, Steuerbescheid, eventualno Schulabschluss/Ausbildung.",
    format:
      "Svaki dokument numerisan na kontrolnoj listi, kopije A4 jednostrano. Sve preko 1 godine starosti — moguće da treba ažuriran original.",
    commonMistake:
      "Predati zahtjev bez svih dokumenata u nadi „dopunit ću kasnije“. Einbürgerungsbehörde čeka tek kad je sve kompletno. Kompletna lista skraćuje vrijeme čekanja sa 24 na 6 mjeseci.",
    example:
      "Lista: 1) Pasoš, 2) Rodni list+prevod, 3) Aufenthaltstitel, 4) Meldebescheinigung, 5) Sprachzertifikat B1, 6) Einbürgerungstest potvrda, 7) Lohnabrechnung 03/2026, 04/2026, 05/2026, 8) Arbeitsvertrag, 9) Steuerbescheid 2024, 10) Loyalitätserklärung.",
    note:
      "Tražiš listu od svog Einbürgerungsbehörde — može varirati po Bundeslandu (npr. Bavarska traži dodatno potvrdu Verfassungsschutza).",
  },
  {
    deField: "Antrag stellen — Einbürgerungsbehörde",
    bhsField: "Predaja zahtjeva — gdje i kako",
    whatToWrite:
      "Mjesto i datum predaje, ime nadležnog Einbürgerungsbehörde (obično u tvom Landratsamt ili Bürgeramt), tačan datum termina ili oznaka „postom predan“.",
    whereToFind:
      "Termin se traži preko sajta tvog grada/okruga (npr. service.berlin.de, muenchen.de). U većini gradova obavezan je termin (Termin notwendig).",
    format:
      "Predaja lično ili preporučenom poštom (Einschreiben mit Rückschein). Online predaja postoji samo u nekoliko gradova.",
    commonMistake:
      "Predati zahtjev bez termina — vraćaju ga. Drugo: ne čuvati Einlieferungsbeleg pošte. Treće: zaboraviti platiti taksu (~255€) — bez plaćanja zahtjev se ne obrađuje.",
    example:
      "Termin am 22.07.2026 um 09:30 Uhr beim Landratsamt München — Mitarbeiterin: Frau Müller — Eingangsbestätigung Nr. 2026/4471.",
    note:
      "Vrijeme obrade je trenutno 6–24 mjeseca, ovisno o Bundeslandu. Berlin i NRW imaju duže redove (12–18 mjeseci), Bayern brže (6–9). Tokom procesa redovno provjeravaš status.",
  },
  {
    deField: "Bearbeitungsgebühr — 255 € pro Person",
    bhsField: "Cijena postupka — 255 € po osobi (51 € za maloljetnu djecu)",
    whatToWrite:
      "Ime uplatnika, broj predmeta (Aktenzeichen), iznos i datum uplate. Plaćaš preko bankovnog naloga ili EC-Karte na šalteru.",
    whereToFind:
      "IBAN i Verwendungszweck dobiješ u pozivu na uplatu od Einbürgerungsbehörde nakon predaje zahtjeva.",
    format:
      "Bankovni transfer s tačnim Verwendungszweck (npr. „Einbürgerungsgebühr Hadžić, AZ 2026-4471“). Sačuvati Überweisungsbeleg.",
    commonMistake:
      "Platiti bez Aktenzeichen u Verwendungszweck — uplata se ne može pripisati i smatraju da nisi platio. Drugo: misliti da je 255€ konačna cijena — dodaj ~25€ za test, ~150–200€ za prevode dokumenata.",
    example:
      "Verwendungszweck: „Einbürgerungsgebühr A. Hadžić AZ 2026-4471“ | Iznos: 255,00 € | IBAN: DE89… | Datum: 25.07.2026",
    note:
      "Maloljetna djeca koja se uvezuju u zahtjev roditelja plaćaju 51€ po djetetu. Postoji mogućnost rate (Ratenzahlung) ako su dokazane finansijske teškoće.",
  },
  {
    deField: "Einbürgerungsfeier — Übergabe der Urkunde",
    bhsField: "Ceremonija uručenja — dobijanje Einbürgerungsurkunde",
    whatToWrite:
      "Datum, mjesto i prisustvo na svečanosti uručenja. Najčešće je Einbürgerungsfeier obavezna i traje 30–60 minuta. Tu primaš Einbürgerungsurkunde — od tog trenutka si njemački državljanin.",
    whereToFind:
      "Pozivnica dolazi pismom 2–6 sedmica prije ceremonije. Obavezno potvrditi prisustvo.",
    format:
      "Doći lično, ponijeti pasoš/ličnu kartu i pozivnicu. U većini Bundeslandova izgovara se Loyalitätsformel naglas pred matičarem.",
    commonMistake:
      "Ne doći bez prethodnog otkazivanja — ceremonija se zakazuje ponovo nakon 3–6 mjeseci. Drugo: zaboraviti naručiti njemački pasoš odmah nakon dobijanja Urkunde — to je odvojen postupak (~37,50€).",
    example:
      "Einbürgerungsfeier am 14.10.2026 im Rathaus Berlin-Mitte | Übergabe der Urkunde Nr. 2026/4471 | Anschließender Antrag auf Reisepass am Bürgeramt.",
    note:
      "Nakon dobijanja njemačkog pasoša možeš putovati bez vize u 191 zemlju. BiH pasoš zadržavaš (de facto) — ali se prijavi BiH konzulatu radi evidentiranja statusa.",
  },
];

export default function EinbuergerungGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Njemačko državljanstvo (Einbürgerung)"
        source="Bundesministerium des Innern und für Heimat (BMI) + nadležna Einbürgerungsbehörde u Bundeslandu"
        formName="Antrag auf Einbürgerung in den deutschen Staatsverband"
        whoCanApply="Stranci sa minimum 5 godina legalnog boravka u Njemačkoj (supružnici njemačkih državljana u pravilu 3 godine boravka + 2 godine braka, § 9 StAG). Od 27.06.2024. Njemačka ne traži odricanje od dosadašnjeg državljanstva — da li ga zadržavaš, odlučuje pravo tvoje zemlje porijekla."
        processingTime="Zavisi od nadležne Einbürgerungsbehörde — često više mjeseci; tačan rok javlja ustanova"
        requirements={[
          "Minimum 5 godina legalnog neprekidnog boravka (ubrzani put nakon 3 godine ukinut 30.10.2025.)",
          "Trajna boravišna dozvola (Niederlassungserlaubnis) ili stabilan Aufenthaltstitel",
          "Sigurnost vlastitih prihoda — bez Bürgergeld/Sozialhilfe",
          "Znanje njemačkog jezika — minimum B1. 🎓 Izuzetak: završen Ausbildung u DE, njemačka škola ili studij — nije potreban Sprachzertifikat",
          "Položen Einbürgerungstest (33 pitanja, prag 17). 🎓 Izuzetak: njemački Schulabschluss (Hauptschulabschluss+) ILI Berufsschulzeugnis uz završen Ausbildung (priznato u Bayernu, varira po Bundesland-u) ILI studij prava/političkih nauka",
          "Čista kaznena evidencija (bez osuda preko 90 dana zatvora)",
          "Bekenntnis zur freiheitlichen demokratischen Grundordnung (potvrda lojalnosti njemačkom Ustavu)",
          "Plaćena taksa od 255€ (odrasli) / 51€ (djeca uz roditelje)",
        ]}
        commonMistakes={[
          "Polagati Einbürgerungstest van akreditovane institucije — rezultat ne važi",
          "Platiti 25€ za Einbürgerungstest, a imati pravo na oslobađanje (Ausbildung + Berufsschulzeugnis u Bayernu) — uvijek prvo pitaj Behörde",
          "Uplatiti taksu bez Aktenzeichen u Verwendungszweck — uplata se ne pripisuje predmetu",
        ]}
      />

      <SmartGuideWizardShared steps={STEPS} />
    </div>
  );
}
