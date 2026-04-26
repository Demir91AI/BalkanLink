/**
 * Generator email šablona — prvi kontakt sa nadležnom ustanovom za priznavanje.
 * Bilingvalni (DE primarno, BS uz njemački tekst kao prevod za korisnika).
 *
 * Cilj: korisnik kopira ili preuzme spreman email i pošalje ga nadležnoj
 * ustanovi (npr. Regierungspräsidium, HWK, IHK) s tačno onim što treba.
 */

export interface EmailTemplateInput {
  /** Korisničko ime i prezime */
  fullName: string;
  /** Profesija (njemački naziv, npr. "Pflegefachperson") */
  professionDE: string;
  /** Profesija (lokalno, npr. "Medicinska sestra") */
  professionLocal: string;
  /** Zemlja porijekla (puni naziv, npr. "Bosna i Hercegovina") */
  countryOfOrigin: string;
  /** Bundesland gdje se traži priznavanje */
  bundesland: string;
  /** Reglementacija — REG / NREG / PARTIAL */
  regulation: "REG" | "NREG" | "PARTIAL";
  /** Da li je obavezna jezička provjera */
  requiresLanguageExam: boolean;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  /** Kratki BS prevod uz svaki paragraf — pomoć korisniku */
  bsTranslation: string;
}

export function generateAnerkennungEmail(input: EmailTemplateInput): GeneratedEmail {
  const {
    fullName,
    professionDE,
    professionLocal,
    countryOfOrigin,
    bundesland,
    regulation,
    requiresLanguageExam,
  } = input;

  const regulationText =
    regulation === "REG"
      ? "Da es sich um einen reglementierten Beruf handelt, beantrage ich die formelle Anerkennung meiner Berufsqualifikation."
      : regulation === "PARTIAL"
      ? "Da der Beruf teilweise reglementiert ist, bitte ich um Auskunft, welcher Anerkennungsweg in meinem Fall in Frage kommt."
      : "Da der Beruf nicht reglementiert ist, möchte ich eine Gleichwertigkeitsfeststellung beantragen, um meine Qualifikation auf dem deutschen Arbeitsmarkt nachzuweisen.";

  const langClause = requiresLanguageExam
    ? "Mir ist bekannt, dass für die endgültige Anerkennung der Nachweis ausreichender Deutschkenntnisse (üblicherweise B2/C1) sowie ggf. eine Fachsprachenprüfung erforderlich ist."
    : "";

  const subject = `Antrag auf Anerkennung der Berufsqualifikation als ${professionDE} (${countryOfOrigin})`;

  const body = `Sehr geehrte Damen und Herren,

mein Name ist ${fullName}. Ich habe meine Berufsqualifikation als ${professionDE} in ${countryOfOrigin} erworben und beabsichtige, in ${bundesland} in diesem Beruf tätig zu werden.

${regulationText}

Hierzu bitte ich Sie höflich um folgende Informationen:

1. Welche Unterlagen werden für die Antragstellung benötigt?
2. In welcher Form müssen die Dokumente vorgelegt werden (Original, beglaubigte Kopie, Übersetzung, Apostille)?
3. Wie hoch sind die Verfahrensgebühren und in welcher Form sind diese zu entrichten?
4. Mit welcher Bearbeitungsdauer ist üblicherweise zu rechnen?
5. Gibt es ein Antragsformular, das ich vorab ausfüllen kann?
${requiresLanguageExam ? "6. Welche Anforderungen bestehen an den Nachweis meiner Deutschkenntnisse und gibt es Vorgaben zur Fachsprachenprüfung?" : ""}

${langClause}

Falls Ihre Behörde für mein Anliegen nicht zuständig sein sollte, bitte ich um einen Hinweis auf die zuständige Stelle.

Für Ihre Unterstützung danke ich Ihnen im Voraus.

Mit freundlichen Grüßen
${fullName}`;

  const bsTranslation = `📝 PREVOD NA BOSANSKI (samo za tvoje razumijevanje — NE šalji ovo s emailom):

Naslov: Zahtjev za priznavanje stručne kvalifikacije ${professionLocal} (${countryOfOrigin})

Poštovani,

Moje ime je ${fullName}. Stekao/la sam stručnu kvalifikaciju ${professionLocal} u ${countryOfOrigin} i namjeravam raditi u ovom zanimanju u ${bundesland}.

${regulation === "REG" ? "Pošto je riječ o reglementovanom zanimanju, podnosim zahtjev za formalno priznavanje moje kvalifikacije." : regulation === "PARTIAL" ? "Pošto je zanimanje djelimično reglementovano, molim za informaciju koji put priznavanja u mom slučaju dolazi u obzir." : "Pošto zanimanje nije reglementovano, želim podnijeti zahtjev za utvrđivanje ekvivalentnosti."}

Ljubazno molim za sljedeće informacije:
1. Koji dokumenti su potrebni za podnošenje zahtjeva?
2. U kakvoj formi (original, ovjerena kopija, prevod, apostille)?
3. Koji su troškovi postupka i kako se plaćaju?
4. Koliko obično traje obrada zahtjeva?
5. Postoji li formular koji mogu unaprijed popuniti?
${requiresLanguageExam ? "6. Koji su zahtjevi za njemački jezik i Fachsprachenprüfung?" : ""}

${requiresLanguageExam ? "Svjestan/na sam da je za konačno priznavanje potreban B2/C1 njemački i Fachsprachenprüfung." : ""}

Ako vaša ustanova nije nadležna, molim da mi uputite na pravu adresu.

Hvala unaprijed na podršci.

Srdačan pozdrav
${fullName}`;

  return { subject, body, bsTranslation };
}
