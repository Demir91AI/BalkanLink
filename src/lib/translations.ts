export type Language = "bhs" | "de";

export interface LanguageInfo {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "bhs", name: "BS / HR / SR", flag: "🇧🇦🇭🇷🇷🇸" },
  { code: "de",  name: "Deutsch",      flag: "🇩🇪" },
];

type T = Record<Language, string>;
export const translations: Record<string, T> = {

  // NAVIGATION
  "nav.home":       { bhs: "Početna",                    de: "Startseite" },
  "nav.back":       { bhs: "Nazad",                      de: "Zurück" },
  "nav.next":       { bhs: "Dalje",                      de: "Weiter" },
  "nav.prev":       { bhs: "Prethodni",                  de: "Vorherige" },

  // HEADER
  "header.login":   { bhs: "Prijavi se",                 de: "Anmelden" },
  "header.register":{ bhs: "Registruj se",               de: "Registrieren" },
  "header.premium": { bhs: "Premium",                    de: "Premium" },
  "header.profile": { bhs: "Moj profil",                 de: "Mein Profil" },
  "header.logout":  { bhs: "Odjava",                     de: "Abmelden" },

  // SIDEBAR
  "sidebar.zivot":           { bhs: "Život i dolazak u Njemačku",  de: "Leben & Ankunft" },
  "sidebar.formulari":       { bhs: "Formulari",                    de: "Formulare" },
  "sidebar.viza":            { bhs: "Viza Navigator",               de: "Visa Navigator" },
  "sidebar.dokumentencheck": { bhs: "Provjera dokumenata",          de: "Dokumentenprüfung" },
  "sidebar.asistent":        { bhs: "AI Asistent",                  de: "KI-Assistent" },
  "sidebar.deutsch":         { bhs: "Deutsch kurs",                 de: "Deutschkurs" },
  "sidebar.nudim":           { bhs: "Nudim / Tražim",               de: "Angebote / Gesuche" },
  "sidebar.balkanci":        { bhs: "Balkanci u Njemačkoj",         de: "Balkaner in Deutschland" },
  "sidebar.kalkulatori":     { bhs: "Kalkulatori",                  de: "Rechner" },
  "sidebar.predloski":       { bhs: "Šabloni / Vorlagen",           de: "Vorlagen" },
  "sidebar.paketi":          { bhs: "Paketi i cijene",              de: "Pakete & Preise" },
  "sidebar.kontakt":         { bhs: "Kontakt",                      de: "Kontakt" },
  "sidebar.prijava":         { bhs: "Prijava / Registracija",       de: "Anmelden / Registrieren" },
  "sidebar.odjava":          { bhs: "Odjava",                       de: "Abmelden" },
  "sidebar.mapa":            { bhs: "Balkanci na mapi",             de: "Balkaner auf der Karte" },
  "sidebar.jobs":            { bhs: "Oglasi za posao",              de: "Stellenangebote" },
  "sidebar.stanovi":         { bhs: "Oglasi za stanove",            de: "Wohnungsangebote" },
  "sidebar.menu":            { bhs: "Meni",                         de: "Menü" },

  // AUTH
  "auth.email":              { bhs: "Email adresa",                 de: "E-Mail-Adresse" },
  "auth.password":           { bhs: "Lozinka",                      de: "Passwort" },
  "auth.confirmPassword":    { bhs: "Potvrdi lozinku",              de: "Passwort bestätigen" },
  "auth.forgotPassword":     { bhs: "Zaboravili ste lozinku?",      de: "Passwort vergessen?" },
  "auth.loginTab":           { bhs: "Prijavi se",                   de: "Anmelden" },
  "auth.registerTab":        { bhs: "Registruj se",                 de: "Registrieren" },
  "auth.loginButton":        { bhs: "Prijavi se",                   de: "Anmelden" },
  "auth.registerButton":     { bhs: "Registruj se",                 de: "Registrieren" },
  "auth.loginError":         { bhs: "Pogrešan email ili lozinka.",  de: "Falsche E-Mail oder Passwort." },
  "auth.emailNotConfirmed":  { bhs: "Potvrdi email adresu prije prijave.", de: "Bitte E-Mail zuerst bestätigen." },
  "auth.emailSent":          { bhs: "Email za potvrdu je poslan.",  de: "Bestätigungs-E-Mail gesendet." },
  "auth.noAccount":          { bhs: "Nemaš nalog?",                 de: "Kein Konto?" },
  "auth.hasAccount":         { bhs: "Već imaš nalog?",              de: "Schon ein Konto?" },
  "auth.resetPassword":      { bhs: "Resetuj lozinku",              de: "Passwort zurücksetzen" },

  // HERO
  "hero.titleWhite":    { bhs: "Tvoj vodič kroz",                        de: "Dein Wegweiser durch" },
  "hero.titleGold":     { bhs: "njemački sistem.",                       de: "das deutsche System." },
  "hero.subtitle":      { bhs: "Jedina platforma koja govori tvoj jezik i razumije tvoje papire.", de: "Die einzige Plattform, die deine Sprache spricht." },
  "hero.cta.primary":   { bhs: "Počni besplatno",                        de: "Kostenlos starten" },
  "hero.cta.secondary": { bhs: "Pogledaj pakete",                        de: "Pakete ansehen" },
  "hero.disclaimer":    { bhs: "BalkanLink je edukativna platforma i nije pravni savjetnik.", de: "BalkanLink ist eine Bildungsplattform und kein Rechtsberater." },
  "hero.badge1":        { bhs: "Jednostavno objašnjeno",                 de: "Einfach erklärt" },
  "hero.badge2":        { bhs: "Na tvom jeziku",                         de: "In deiner Sprache" },
  "hero.badge3":        { bhs: "Provjereni sadržaji",                    de: "Geprüfte Inhalte" },

  // HOMEPAGE SECTIONS
  "home.services.title":     { bhs: "Šta želiš riješiti danas?",         de: "Was möchtest du heute erledigen?" },
  "home.howItWorks.title":   { bhs: "Kako funkcioniše?",                 de: "Wie funktioniert es?" },
  "home.howItWorks.step1":   { bhs: "Odaberi temu",                      de: "Thema wählen" },
  "home.howItWorks.step2":   { bhs: "Popuni formular",                   de: "Formular ausfüllen" },
  "home.howItWorks.step3":   { bhs: "Preuzmi ili pošalji",               de: "Herunterladen oder absenden" },
  "home.features.title":     { bhs: "Sve na jednom mjestu",              de: "Alles an einem Ort" },
  "home.premium.title":      { bhs: "Riješi papire bez grešaka",         de: "Formulare fehlerfrei erledigen" },
  "home.premium.subtitle":   { bhs: "Izaberi plan koji ti odgovara — besplatno počni, nadogradi kad trebaš više.", de: "Wähle deinen Plan — starte kostenlos, upgrade wenn du mehr brauchst." },

  // SERVICE CARDS
  "service.formulare":       { bhs: "Musterformulare",                   de: "Musterformulare" },
  "service.formulare.desc":  { bhs: "Popuni formulare bez grešaka",      de: "Formulare fehlerfrei ausfüllen" },
  "service.viza":            { bhs: "Viza Navigator",                    de: "Visa Navigator" },
  "service.viza.desc":       { bhs: "Koji status trebaš za Njemačku?",   de: "Welchen Status brauchst du?" },
  "service.asistent":        { bhs: "AI Asistent",                       de: "KI-Assistent" },
  "service.asistent.desc":   { bhs: "Pitaj sve o birokratiji",           de: "Alles zur Bürokratie fragen" },
  "service.dokumenti":       { bhs: "Provjera dokumenata",               de: "Dokumentenprüfung" },
  "service.dokumenti.desc":  { bhs: "Provjeri jesi li pripremio sve",    de: "Prüfe ob alles vollständig ist" },
  "service.deutsch":         { bhs: "Deutsch kurs A1–C2",                de: "Deutschkurs A1–C2" },
  "service.deutsch.desc":    { bhs: "Nauči njemački za stvarni život",   de: "Deutsch für den Alltag lernen" },
  "service.kalkulatori":     { bhs: "Kalkulatori",                       de: "Rechner" },
  "service.kalkulatori.desc":{ bhs: "Izračunaj svoje naknade",           de: "Leistungen berechnen" },
  "service.oglasi":          { bhs: "Nudim / Tražim",                    de: "Angebote / Gesuche" },
  "service.oglasi.desc":     { bhs: "Oglasi balkanske zajednice",        de: "Anzeigen der Balkan-Community" },
  "service.dolazak":         { bhs: "Dolazak u Njemačku",                de: "Ankunft in Deutschland" },
  "service.dolazak.desc":    { bhs: "Korak po korak od prvog dana",      de: "Schritt für Schritt ab dem ersten Tag" },

  // BUTTONS
  "btn.save":         { bhs: "Spremi",               de: "Speichern" },
  "btn.cancel":       { bhs: "Odustani",             de: "Abbrechen" },
  "btn.close":        { bhs: "Zatvori",              de: "Schließen" },
  "btn.send":         { bhs: "Pošalji",              de: "Senden" },
  "btn.download":     { bhs: "Preuzmi PDF",          de: "PDF herunterladen" },
  "btn.unlock":       { bhs: "Otključaj",            de: "Freischalten" },
  "btn.continue":     { bhs: "Nastavi",              de: "Weiter" },
  "btn.back":         { bhs: "Nazad",                de: "Zurück" },
  "btn.search":       { bhs: "Pretraži",             de: "Suchen" },
  "btn.showMore":     { bhs: "Prikaži više",         de: "Mehr anzeigen" },
  "btn.showLess":     { bhs: "Prikaži manje",        de: "Weniger anzeigen" },
  "btn.copy":         { bhs: "Kopiraj",              de: "Kopieren" },
  "btn.copied":       { bhs: "Kopirano!",            de: "Kopiert!" },
  "btn.reset":        { bhs: "Resetuj",              de: "Zurücksetzen" },
  "btn.calculate":    { bhs: "Izračunaj",            de: "Berechnen" },
  "btn.submit":       { bhs: "Pošalji zahtjev",      de: "Antrag absenden" },
  "btn.upgrade":      { bhs: "Uzmi Premium",         de: "Upgrade auf Premium" },
  "btn.startFree":    { bhs: "Počni besplatno",      de: "Kostenlos starten" },
  "btn.openGuide":    { bhs: "Otvori vodič",         de: "Leitfaden öffnen" },
  "btn.openForm":     { bhs: "Otvori formular",      de: "Formular öffnen" },

  // FOOTER
  "footer.rights":    { bhs: "Sva prava zadržana.",  de: "Alle Rechte vorbehalten." },
  "footer.disclaimer":{ bhs: "BalkanLink pruža informativne smjernice i ne predstavlja pravni savjet.", de: "BalkanLink bietet informative Hinweise, keine Rechtsberatung." },
  "footer.impressum": { bhs: "Impressum",            de: "Impressum" },
  "footer.datenschutz":{ bhs: "Zaštita podataka",   de: "Datenschutz" },
  "footer.agb":       { bhs: "Uslovi korištenja",   de: "AGB" },
  "footer.haftung":   { bhs: "Izjava o odgovornosti", de: "Haftungsausschluss" },
  "footer.ki":        { bhs: "Napomena o AI",        de: "KI-Hinweis" },
  "footer.contact":   { bhs: "Kontakt",              de: "Kontakt" },
  "footer.about":     { bhs: "O platformi",          de: "Über uns" },

  // AI ASISTENT
  "chat.title":       { bhs: "BalkanLink Asistent",  de: "BalkanLink Assistent" },
  "chat.placeholder": { bhs: "Postavi pitanje...",   de: "Frage stellen..." },
  "chat.send":        { bhs: "Pošalji",              de: "Senden" },
  "chat.welcome":     { bhs: "Zdravo! 👋 Kako ti mogu pomoći?", de: "Hallo! 👋 Wie kann ich dir helfen?" },
  "chat.thinking":    { bhs: "Razmišljam...",        de: "Ich denke nach..." },
  "chat.error":       { bhs: "Greška pri slanju. Pokušaj ponovo.", de: "Fehler. Bitte erneut versuchen." },
  "chat.disclaimer":  { bhs: "Orijentacione informacije, ne pravni savjet.", de: "Orientierende Informationen, keine Rechtsberatung." },
  "chat.quick1":      { bhs: "📋 Trebam Kindergeld", de: "📋 Kindergeld beantragen" },
  "chat.quick2":      { bhs: "🏠 Kako prijaviti adresu?", de: "🏠 Adresse anmelden?" },
  "chat.quick3":      { bhs: "💼 Izgubio sam posao", de: "💼 Job verloren" },
  "chat.quick4":      { bhs: "📄 Šta je Steuer-ID?", de: "📄 Was ist die Steuer-ID?" },

  // FORMULARE
  "forms.title":      { bhs: "Musterformulare",      de: "Musterformulare" },
  "forms.subtitle":   { bhs: "Popuni formulare ispravno, bez grešaka", de: "Formulare korrekt ausfüllen" },
  "forms.search":     { bhs: "Pretraži formulare...", de: "Formulare suchen..." },
  "forms.allGroups":  { bhs: "Sve kategorije",       de: "Alle Kategorien" },
  "forms.download":   { bhs: "Preuzmi PDF",          de: "PDF herunterladen" },
  "forms.locked":     { bhs: "Premium sadržaj",      de: "Premium-Inhalt" },
  "forms.requiredDocs":{ bhs: "Potrebni dokumenti",  de: "Benötigte Dokumente" },
  "forms.commonErrors":{ bhs: "Najčešće greške",     de: "Häufige Fehler" },
  "forms.officialLink":{ bhs: "Službena stranica",   de: "Offizielle Seite" },

  // VIZA NAVIGATOR
  "viza.title":       { bhs: "Viza Navigator",       de: "Visa Navigator" },
  "viza.subtitle":    { bhs: "Pronađi pravi status za tvoju situaciju", de: "Finde den richtigen Status für deine Situation" },
  "viza.selectCountry":{ bhs: "Odaberi svoju zemlju", de: "Herkunftsland wählen" },
  "viza.requirements":{ bhs: "Potrebni dokumenti",   de: "Erforderliche Dokumente" },
  "viza.processing":  { bhs: "Rok obrade",           de: "Bearbeitungszeit" },
  "viza.fee":         { bhs: "Taksa",                de: "Gebühr" },
  "viza.applyOnline": { bhs: "Online zahtjev",       de: "Online-Antrag" },
  "viza.trust.info":  { bhs: "Informacije su bazirane na službenim izvorima.",   de: "Informationen basieren auf offiziellen Quellen." },
  "viza.trust.warn":  { bhs: "Propisi se mogu promijeniti — provjeri službene stranice.", de: "Vorschriften können sich ändern — offizielle Seiten prüfen." },
  "viza.trust.sources": { bhs: "Izvori",             de: "Quellen" },

  // DOKUMENTEN-CHECK
  "dokcheck.title":   { bhs: "Provjera dokumenata",  de: "Dokumentenprüfung" },
  "dokcheck.subtitle":{ bhs: "Provjeri jesi li pripremio sve", de: "Prüfe ob alles vollständig ist" },
  "dokcheck.upload":  { bhs: "Učitaj dokument",      de: "Dokument hochladen" },
  "dokcheck.analyze": { bhs: "Analiziraj",           de: "Analysieren" },
  "dokcheck.ok":      { bhs: "✅ Dokument je uredan", de: "✅ Dokument ist in Ordnung" },
  "dokcheck.issues":  { bhs: "⚠️ Pronađeni problemi", de: "⚠️ Probleme gefunden" },
  "dokcheck.price":   { bhs: "2,99€ po dokumentu",  de: "2,99€ pro Dokument" },
  "dokcheck.premiumFree":{ bhs: "Premium: 1x dnevno besplatno", de: "Premium: 1x täglich kostenlos" },

  // PAKETI / PREMIUM
  "premium.title":       { bhs: "Paketi i cijene",       de: "Pakete & Preise" },
  "premium.badge":       { bhs: "PREMIUM",               de: "PREMIUM" },
  "premium.recommended": { bhs: "PREPORUČENO",           de: "EMPFOHLEN" },
  "premium.free":        { bhs: "BESPLATNO",             de: "KOSTENLOS" },
  "premium.freePrice":   { bhs: "0€",                   de: "0€" },
  "premium.freeTagline": { bhs: "Zauvijek besplatno",    de: "Für immer kostenlos" },
  "premium.monthly":     { bhs: "9,99€/mj.",             de: "9,99€/Monat" },
  "premium.yearly":      { bhs: "ili 99,90€/godišnje (uštedi 17%)", de: "oder 99,90€/Jahr (spare 17%)" },
  "premium.promo":       { bhs: "🎉 Promo cijena — prvih 6 mjeseci", de: "🎉 Promo-Preis — erste 6 Monate" },
  "premium.cta":         { bhs: "Postani Premium →",     de: "Jetzt Premium werden →" },
  "premium.ctaFree":     { bhs: "Počni besplatno",       de: "Kostenlos starten" },
  "premium.ctaCheck":    { bhs: "Provjeri dokument",     de: "Dokument prüfen" },
  "premium.dokLabel":    { bhs: "DOKUMENTEN-CHECK",      de: "DOKUMENTEN-CHECK" },
  "premium.dokPrice":    { bhs: "2,99€",                 de: "2,99€" },
  "premium.dokTagline":  { bhs: "Po dokumentu (bez pretplate)", de: "Pro Dokument (ohne Abo)" },
  "premium.f1":          { bhs: "Osnovni vodič",         de: "Basisführer" },
  "premium.f2":          { bhs: "Pregled formulara",     de: "Formularvorschau" },
  "premium.f3":          { bhs: "Brutto-Netto kalkulator", de: "Brutto-Netto-Rechner" },
  "premium.f4":          { bhs: "Oglasi (besplatno)",    de: "Anzeigen (kostenlos)" },
  "premium.p1":          { bhs: "Svi Musterformulari",  de: "Alle Musterformulare" },
  "premium.p2":          { bhs: "Smart Guides (svi koraci)", de: "Smart Guides (alle Schritte)" },
  "premium.p3":          { bhs: "Viza Navigator",        de: "Visa Navigator" },
  "premium.p4":          { bhs: "1x Dokumenten-Check/dan", de: "1x Dokumentenprüfung/Tag" },
  "premium.p5":          { bhs: "Šabloni (PDF download)", de: "Vorlagen (PDF-Download)" },
  "premium.p6":          { bhs: "AI Asistent neograničeno", de: "KI-Assistent unbegrenzt" },
  "premium.p7":          { bhs: "2 Pro oglasa/mjesečno", de: "2 Pro-Anzeigen/Monat" },
  "premium.d1":          { bhs: "Detaljna analiza dokumenta", de: "Detaillierte Dokumentenanalyse" },
  "premium.d2":          { bhs: "11 sekcija objašnjenja", de: "11 Erklärungsabschnitte" },
  "premium.d3":          { bhs: "Rokovi i finansijski uticaj", de: "Fristen und finanzielle Auswirkung" },
  "premium.d4":          { bhs: "PDF, JPG, PNG do 10 MB", de: "PDF, JPG, PNG bis 10 MB" },

  // DEUTSCH KURS
  "deutsch.title":    { bhs: "Deutsch kurs",          de: "Deutschkurs" },
  "deutsch.subtitle": { bhs: "Nauči njemački za stvarni život", de: "Deutsch für den Alltag lernen" },
  "deutsch.progress": { bhs: "Tvoj napredak",         de: "Dein Fortschritt" },
  "deutsch.completed":{ bhs: "Završeno",              de: "Abgeschlossen" },
  "deutsch.locked":   { bhs: "Zaključano",            de: "Gesperrt" },
  "deutsch.continue": { bhs: "Nastavi gdje si stao",  de: "Weiter wo du aufgehört hast" },
  "deutsch.score":    { bhs: "Rezultat",              de: "Ergebnis" },
  "deutsch.exercise": { bhs: "Vježba",                de: "Übung" },
  "deutsch.nextLesson":{ bhs: "Sljedeća lekcija",     de: "Nächste Lektion" },
  "deutsch.startLesson":{ bhs: "Počni lekciju",       de: "Lektion starten" },

  // KALKULATORI
  "calc.title":       { bhs: "Kalkulatori",            de: "Rechner" },
  "calc.subtitle":    { bhs: "Izračunaj svoje naknade i prava", de: "Berechne deine Leistungen" },
  "calc.result":      { bhs: "Rezultat",               de: "Ergebnis" },
  "calc.monthly":     { bhs: "Mjesečno",               de: "Monatlich" },
  "calc.disclaimer":  { bhs: "Ovo je procjena. Za tačan iznos kontaktiraj nadležnu službu.", de: "Dies ist eine Schätzung. Zuständige Stelle kontaktieren für genaue Beträge." },

  // OGLASI
  "oglasi.title":     { bhs: "Nudim / Tražim",         de: "Angebote / Gesuche" },
  "oglasi.post":      { bhs: "Objavi oglas",           de: "Anzeige aufgeben" },
  "oglasi.search":    { bhs: "Pretraži oglase...",     de: "Anzeigen suchen..." },
  "oglasi.nudim":     { bhs: "Nudim",                  de: "Ich biete" },
  "oglasi.trazim":    { bhs: "Tražim",                 de: "Ich suche" },
  "oglasi.noResults": { bhs: "Nema oglasa u ovoj kategoriji", de: "Keine Anzeigen in dieser Kategorie" },
  "oglasi.pro":       { bhs: "Pro oglas — 2,99€/7 dana", de: "Pro-Anzeige — 2,99€/7 Tage" },

  // DOLAZAK
  "dolazak.title":    { bhs: "Dolazak u Njemačku",     de: "Ankunft in Deutschland" },
  "dolazak.subtitle": { bhs: "Sve što trebaš znati od prvog dana", de: "Alles was du vom ersten Tag wissen musst" },
  "dolazak.openGuide":{ bhs: "Otvori vodič",           de: "Leitfaden öffnen" },
  "dolazak.required": { bhs: "Što trebaš pripremiti",  de: "Was du vorbereiten musst" },
  "dolazak.tips":     { bhs: "Korisni savjeti",        de: "Nützliche Tipps" },
  "dolazak.warnings": { bhs: "Česte greške",           de: "Häufige Fehler" },

  // KONTAKT
  "kontakt.title":    { bhs: "Kontakt",                de: "Kontakt" },
  "kontakt.subtitle": { bhs: "Javi nam se — tu smo!",  de: "Melde dich — wir sind für dich da!" },
  "kontakt.name":     { bhs: "Ime i prezime",          de: "Vor- und Nachname" },
  "kontakt.email":    { bhs: "Email adresa",           de: "E-Mail-Adresse" },
  "kontakt.message":  { bhs: "Poruka",                 de: "Nachricht" },
  "kontakt.send":     { bhs: "Pošalji poruku",         de: "Nachricht senden" },
  "kontakt.success":  { bhs: "Poruka uspješno poslana!", de: "Nachricht erfolgreich gesendet!" },

  // MAPA
  "mapa.title":       { bhs: "Balkanci u Njemačkoj",   de: "Balkaner in Deutschland" },
  "mapa.addMe":       { bhs: "Dodaj se na mapu",       de: "Zur Karte hinzufügen" },
  "mapa.members":     { bhs: "članova",                de: "Mitglieder" },
  "mapa.consent":     { bhs: "Suglasan/na sam s anonimnim prikazom mog grada", de: "Ich stimme der anonymen Anzeige meiner Stadt zu" },

  // COOKIE
  "cookie.title":     { bhs: "Koristimo kolačiće",     de: "Wir verwenden Cookies" },
  "cookie.desc":      { bhs: "Koristimo kolačiće za poboljšanje iskustva.", de: "Wir verwenden Cookies zur Verbesserung der Plattform." },
  "cookie.accept":    { bhs: "Prihvati sve",           de: "Alle akzeptieren" },
  "cookie.reject":    { bhs: "Odbij",                  de: "Ablehnen" },

  // STATUS
  "status.loading":   { bhs: "Učitavanje...",          de: "Wird geladen..." },
  "status.error":     { bhs: "Došlo je do greške",     de: "Ein Fehler ist aufgetreten" },
  "status.success":   { bhs: "Uspješno!",              de: "Erfolgreich!" },
  "status.empty":     { bhs: "Nema rezultata",         de: "Keine Ergebnisse" },

  // PAGE NAV
  "page.backToForms": { bhs: "Nazad na formulare",     de: "Zurück zu Formularen" },
  "page.backToGuides":{ bhs: "Nazad na vodiče",        de: "Zurück zu Leitfäden" },
  "page.step":        { bhs: "Korak",                  de: "Schritt" },
  "page.of":          { bhs: "od",                     de: "von" },

  // MOBILE NAV
  "homepage.mobileNav.dokumenti": { bhs: "Dokumenti",   de: "Dokumente" },
  "homepage.mobileNav.vodici":    { bhs: "Vodiči",      de: "Leitfäden" },
  "homepage.mobileNav.ai":        { bhs: "AI",          de: "KI" },
  "homepage.mobileNav.cijene":    { bhs: "Cijene",      de: "Preise" },
  "homepage.mobileNav.profil":    { bhs: "Profil",      de: "Profil" },

  // SERVICE CARDS (used in Index.tsx carousel)
  "service.smartGuide.title": { bhs: "Smart Guides",                    de: "Smart Guides" },
  "service.smartGuide.desc":  { bhs: "Korak-po-korak vodiči za formulare", de: "Schritt-für-Schritt-Anleitungen" },
  "service.smartGuide.cta":   { bhs: "Otvori vodiče",                   de: "Leitfäden öffnen" },
  "service.visa.title":       { bhs: "Viza Navigator",                  de: "Visa Navigator" },
  "service.visa.desc":        { bhs: "Koji status trebaš za Njemačku?", de: "Welchen Status brauchst du?" },
  "service.visa.cta":         { bhs: "Provjeri status",                 de: "Status prüfen" },
  "service.deutsch.title":    { bhs: "Deutsch kurs A1–C2",              de: "Deutschkurs A1–C2" },
  "service.deutsch.desc":     { bhs: "Nauči njemački za stvarni život", de: "Deutsch für den Alltag lernen" },
  "service.deutsch.cta":      { bhs: "Počni učiti",                     de: "Lernen starten" },
  "service.docCheck.title":   { bhs: "Provjera dokumenata",             de: "Dokumentenprüfung" },
  "service.docCheck.desc":    { bhs: "Provjeri jesi li pripremio sve",  de: "Prüfe ob alles vollständig ist" },
  "service.docCheck.cta":     { bhs: "Provjeri dokument",               de: "Dokument prüfen" },
  "service.nudim.title":      { bhs: "Nudim / Tražim",                  de: "Angebote / Gesuche" },
  "service.nudim.desc":       { bhs: "Oglasi balkanske zajednice",      de: "Anzeigen der Balkan-Community" },
  "service.nudim.cta":        { bhs: "Pogledaj oglase",                 de: "Anzeigen ansehen" },
  "service.balkanci.title":   { bhs: "Balkanci u Njemačkoj",            de: "Balkaner in Deutschland" },
  "service.balkanci.desc":    { bhs: "Pronađi naše ljude na mapi",     de: "Finde unsere Leute auf der Karte" },
  "service.balkanci.cta":     { bhs: "Otvori mapu",                     de: "Karte öffnen" },
  "service.jobs.title":       { bhs: "Oglasi za posao",                 de: "Stellenangebote" },
  "service.jobs.desc":        { bhs: "Pronađi posao u Njemačkoj",      de: "Jobs in Deutschland finden" },
  "service.jobs.cta":         { bhs: "Pretraži poslove",                de: "Jobs suchen" },
  "service.housing.title":    { bhs: "Oglasi za stanove",               de: "Wohnungsangebote" },
  "service.housing.desc":     { bhs: "Pronađi stan u Njemačkoj",       de: "Wohnung in Deutschland finden" },
  "service.housing.cta":      { bhs: "Pretraži stanove",                de: "Wohnungen suchen" },
  "service.calc.title":       { bhs: "Kalkulatori",                     de: "Rechner" },
  "service.calc.desc":        { bhs: "Izračunaj svoje naknade",         de: "Leistungen berechnen" },
  "service.calc.cta":         { bhs: "Otvori kalkulator",               de: "Rechner öffnen" },

  // HOMEPAGE EXTRAS
  "home.recommended":    { bhs: "Preporučeno",          de: "Empfohlen" },
  "home.viewMore":       { bhs: "Pogledaj",             de: "Ansehen" },
  "home.contact":        { bhs: "Kontakt",              de: "Kontakt" },
  "home.adLabel":        { bhs: "PARTNERI",             de: "PARTNER" },
  "home.showcaseLabel":  { bhs: "NAŠI PARTNERI",        de: "UNSERE PARTNER" },
  "home.showcaseTitle":  { bhs: "Preporučene usluge",   de: "Empfohlene Dienste" },

  // COOKIE EXTRAS
  "cookie.acceptAll":          { bhs: "Prihvati sve",                     de: "Alle akzeptieren" },
  "cookie.necessaryOnly":      { bhs: "Samo neophodni",                   de: "Nur notwendige" },
  "cookie.settings":           { bhs: "Postavke",                         de: "Einstellungen" },
  "cookie.settingsTitle":      { bhs: "Postavke kolačića",                de: "Cookie-Einstellungen" },
  "cookie.settingsDesc":       { bhs: "Odaberi koje kolačiće želiš dozvoliti.", de: "Wähle welche Cookies du erlauben möchtest." },
  "cookie.saveSettings":       { bhs: "Spremi postavke",                  de: "Einstellungen speichern" },
  "cookie.cat.necessary":      { bhs: "Neophodni",                        de: "Notwendig" },
  "cookie.cat.necessary.desc": { bhs: "Potrebni za rad platforme.",       de: "Für den Betrieb der Plattform erforderlich." },
  "cookie.cat.functional":     { bhs: "Funkcionalni",                     de: "Funktional" },
  "cookie.cat.functional.desc":{ bhs: "Pamte tvoje postavke.",            de: "Speichern deine Einstellungen." },
  "cookie.cat.statistics":     { bhs: "Statistika",                       de: "Statistik" },
  "cookie.cat.statistics.desc":{ bhs: "Pomažu nam poboljšati platformu.", de: "Helfen uns die Plattform zu verbessern." },
  "cookie.cat.marketing":      { bhs: "Marketing",                        de: "Marketing" },
  "cookie.cat.marketing.desc": { bhs: "Prilagođeni sadržaji i oglasi.",   de: "Personalisierte Inhalte und Anzeigen." },

  // MISC
  "back":  { bhs: "← Nazad", de: "← Zurück" },
  "home":  { bhs: "Početna", de: "Startseite" },
  "sidebar.menu": { bhs: "Meni", de: "Menü" },
};
