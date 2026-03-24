import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_NAMES: Record<string, string> = {
  bs: "bosanski", hr: "hrvatski", sr: "srpski", me: "crnogorski",
  sq: "shqip", xk: "shqip", mk: "македонски", de: "Deutsch", en: "English",
};

// ── FORM CATALOG ──

const FORM_CATALOG: { slug: string; label: string; desc: string }[] = [
  { slug: "anmeldung", label: "Anmeldung", desc: "Prijava adrese stanovanja u Njemačkoj." },
  { slug: "steuerklassenwechsel", label: "Steuer-ID", desc: "Poreski identifikacijski broj." },
  { slug: "familienversicherung", label: "Krankenkasse", desc: "Prijava u zdravstveno osiguranje." },
  { slug: "kindergeld", label: "Kindergeld", desc: "Mjesečna novčana pomoć za djecu." },
  { slug: "elterngeld", label: "Elterngeld", desc: "Naknada za roditelje nakon rođenja djeteta." },
  { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Naknada za vrijeme poroda." },
  { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Dodatna pomoć za porodice sa manjim prihodima." },
  { slug: "kita-zuschuss", label: "Kita-Zuschuss", desc: "Pomoć za troškove vrtića." },
  { slug: "krippengeld-bayern", label: "Krippengeld", desc: "Dodatak za jaslice u Bavarskoj." },
  { slug: "unterhaltsvorschuss", label: "Unterhaltsvorschuss", desc: "Alimentacijski predujam." },
  { slug: "buergergeld", label: "Bürgergeld", desc: "Osnovna pomoć za život." },
  { slug: "wohngeld", label: "Wohngeld", desc: "Pomoć za troškove stanovanja." },
  { slug: "sozialhilfe", label: "Sozialhilfe", desc: "Osnovna socijalna pomoć." },
  { slug: "bildung-teilhabe", label: "Bildung und Teilhabe", desc: "Pomoć za školske troškove djece." },
  { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada za nezaposlene." },
  { slug: "kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "Naknada kod skraćenog rada." },
  { slug: "krankengeld", label: "Krankengeld", desc: "Naknada plate pri bolesti." },
  { slug: "bildungsgutschein", label: "Bildungsgutschein", desc: "Vaučer za prekvalifikaciju." },
  { slug: "bafoeg", label: "BAföG", desc: "Finansijska pomoć za studij." },
  { slug: "schueler-bafoeg", label: "Schüler-BAföG", desc: "Pomoć za učenike." },
  { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs njemačkog jezika." },
  { slug: "lernfoerderung", label: "Lernförderung", desc: "Dopunska nastava za djecu." },
  { slug: "wbs", label: "WBS", desc: "Pristup socijalnim stanovima." },
  { slug: "gez-anmeldung", label: "Rundfunkbeitrag", desc: "Prijava/oslobađanje RTV takse." },
  { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss", desc: "Dodatak za grijanje." },
  { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Potvrda o nekažnjavanju." },
  { slug: "aufenthaltstitel-verlaengerung", label: "Aufenthaltstitel Verlängerung", desc: "Produženje boravišne dozvole." },
  { slug: "kirchenaustritt", label: "Kirchenaustritt", desc: "Odjava iz crkve." },
];

function buildFormCatalogContext(): string {
  return FORM_CATALOG.map(f => `- ${f.label} (slug: ${f.slug}): ${f.desc}`).join("\n");
}

// ── SITE CONTENT INDEX ──
// This is the comprehensive map of ALL BalkanLink pages the chatbot knows about.

const SITE_CONTENT_INDEX = `
────────────────────────────
BALKANLINK PLATFORMA — KOMPLETNI SADRŽAJ
────────────────────────────

BalkanLink je nezavisna informaciona platforma za balkanske iseljenike u Njemačkoj.
Chatbot MORA poznavati SVE sekcije i moći odgovoriti na pitanja o bilo kojem dijelu platforme.

=== DOLAZAK U NJEMAČKU ===
Sekcija za ljude koji tek dolaze ili su nedavno stigli u Njemačku.

Stranice:
- /dolazak — Početak: pregled svih koraka nakon dolaska
- /dolazak/prijava-prebivalista — Anmeldung: kako, gdje, koji dokumenti, rokovi
- /dolazak/boravisna-dozvola — Aufenthaltstitel: vrste dozvola, produženje, uslovi
- /dolazak/steuer-id-i-porezna-klasa — Steuer-ID i porezne klase: objašnjenje sistema, kako dobiti
- /dolazak/zdravstveno-osiguranje — Zdravstveno osiguranje: javno vs privatno, prijava, troškovi
- /dolazak/bankovni-racun — Otvaranje bankovnog računa: opcije, dokumenti, online banke
- /dolazak/prvi-koraci — Opći prvi koraci nakon dolaska u Njemačku
- /dolazak/sozialversicherung — Socijalno osiguranje: penziono, zdravstveno, nezaposlenost
- /dolazak/rundfunkbeitrag — Rundfunkbeitrag (GEZ): šta je, ko plaća, oslobađanje
- /dolazak/fuehrerschein — Vozačka dozvola: konverzija, zamjena, ispiti
- /dolazak/auto-anmelden — Registracija vozila: uvoz auta, Zulassung, TÜV

=== FORMULARI I SMART GUIDE ===
Interaktivni sistem za popunjavanje njemačkih formulara korak po korak.

- /formulare — Lista svih dostupnih formulara
- /formulari — FormCenter: pristup svim formularima
- /formulari/:slug — Pojedinačni formular sa Smart Guide vodičem
- /guide/:slug — Detaljni vodič za specifičnu temu

=== ŽIVOT U NJEMAČKOJ ===
Savjeti za svakodnevni život.

- /zivot — Život i savjeti: svakodnevica, integracija, tips
- /probleme — Trebam pomoć: rješavanje problema, hitne situacije
- /familie — Porodica: djeca, škola, vrtić, roditeljstvo u Njemačkoj

=== FINANSIJE I POMOĆI ===
Finansijska davanja i kalkulatori.

- /foerderungen — Pregled svih finansijskih pomoći i subvencija
- /brutto-netto-rechner — Brutto-Netto kalkulator: izračun plate
- /tools — Generatori i alati

=== STANOVANJE I POSAO ===
- /wohnungen — Stanovi: pretraga, savjeti za pronalazak stana
- /stellenangebote — Poslovi: ponude, savjeti za zapošljavanje

=== NUDIM / TRAŽIM (OGLASI) ===
BalkanLink Mreža — oglasna tabla za zajednicu.

- /nudim-trazim — Oglasi: postavljanje i pretraga oglasa (poslovi, usluge, stanovi, autos)
  Kako funkcioniše: korisnik može besplatno postaviti oglas (Nudim ili Tražim).
  Kategorije: Posao, Usluge, Stanovi, Autos.
  PRO oglasi: istaknuti, više vidljivosti, plaćena opcija.

=== ZAJEDNICA I INSTITUCIJE ===
- /qa — Pitanja i odgovori: česta pitanja korisnika
- /directory — Direktorij: popis balkanskih biznisa u Njemačkoj
- /directory/submit — Prijava biznisa u direktorij
- /ambasade-konzulati — Ambasade i konzulati: kontakt info, adrese

=== PREMIUM / ČLANSTVO ===
- /premium — BalkanLink Premium: šta uključuje, cijene, poređenje Free vs Premium
  FREE: pristup kategorijama, zajednici, AI asistent, pretraga
  PREMIUM: Smart Guide (polje-po-polje), generisanje dokumenata, šabloni, prioritetna podrška
  Cijena: prikazana na stranici
  Nema ugovora, može se otkazati bilo kad

=== PRAVNE STRANICE ===
- /impressum — Impressum: podaci o operateru platforme
- /datenschutz — Datenschutz: privatnost podataka, GDPR, šta se prikuplja
  Ključno: email + šifra pri registraciji, server logovi (anonimizirano), dokumenten-check lokalno u browseru
- /disclaimer — Haftungsausschluss: platforma nije pravni savjet, bez garancije
- /ki-hinweis — KI-Hinweis: informacije o korištenju AI tehnologije
- /mitgliedschaft — Mitgliedschaftsbedingungen: uslovi članstva, automatsko produženje

=== KORISNIČKE STRANICE ===
- /login — Prijava
- /register — Registracija
- /forgot-password — Zaboravljena šifra
- /reset-password — Reset šifre
`;

// ── SITE TOPIC DETECTION ──
// Maps keywords to page URLs and topic names for site-wide routing

type SiteTopic = { url: string; label: string; category: string };

const SITE_TOPIC_MAP: Record<string, SiteTopic> = {
  // Legal
  "agb": { url: "/mitgliedschaft", label: "Mitgliedschaftsbedingungen", category: "legal" },
  "uslovi": { url: "/mitgliedschaft", label: "Uslovi članstva", category: "legal" },
  "mitgliedschaft": { url: "/mitgliedschaft", label: "Mitgliedschaftsbedingungen", category: "legal" },
  "datenschutz": { url: "/datenschutz", label: "Datenschutzerklärung", category: "legal" },
  "privatnost": { url: "/datenschutz", label: "Zaštita podataka", category: "legal" },
  "gdpr": { url: "/datenschutz", label: "GDPR / Datenschutz", category: "legal" },
  "impressum": { url: "/impressum", label: "Impressum", category: "legal" },
  "disclaimer": { url: "/disclaimer", label: "Haftungsausschluss", category: "legal" },
  "haftung": { url: "/disclaimer", label: "Haftungsausschluss", category: "legal" },
  "ki-hinweis": { url: "/ki-hinweis", label: "KI-Hinweis", category: "legal" },
  "ai hinweis": { url: "/ki-hinweis", label: "KI-Hinweis", category: "legal" },

  // Premium
  "premium": { url: "/premium", label: "BalkanLink Premium", category: "premium" },
  "članstvo": { url: "/premium", label: "Premium članstvo", category: "premium" },
  "clanstvo": { url: "/premium", label: "Premium članstvo", category: "premium" },
  "paket": { url: "/premium", label: "Premium paketi", category: "premium" },
  "cijena": { url: "/premium", label: "Premium cijena", category: "premium" },
  "cena": { url: "/premium", label: "Premium cijena", category: "premium" },
  "pretplata": { url: "/premium", label: "Premium pretplata", category: "premium" },

  // Nudim/Trazim
  "oglas": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "oglasi": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "nudim": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "tražim": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "trazim": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "postaviti oglas": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "pro oglas": { url: "/nudim-trazim", label: "PRO oglasi", category: "ads" },

  // Dolazak
  "dolazak": { url: "/dolazak", label: "Dolazak u Njemačku", category: "arrival" },
  "prvi koraci": { url: "/dolazak/prvi-koraci", label: "Prvi koraci", category: "arrival" },
  "prijava adrese": { url: "/dolazak/prijava-prebivalista", label: "Prijava prebivališta", category: "arrival" },
  "prijava prebivalista": { url: "/dolazak/prijava-prebivalista", label: "Prijava prebivališta", category: "arrival" },
  "prijava prebivališta": { url: "/dolazak/prijava-prebivalista", label: "Prijava prebivališta", category: "arrival" },
  "zdravstveno": { url: "/dolazak/zdravstveno-osiguranje", label: "Zdravstveno osiguranje", category: "arrival" },
  "krankenversicherung": { url: "/dolazak/zdravstveno-osiguranje", label: "Zdravstveno osiguranje", category: "arrival" },
  "bankovni": { url: "/dolazak/bankovni-racun", label: "Bankovni račun", category: "arrival" },
  "bankkonto": { url: "/dolazak/bankovni-racun", label: "Bankovni račun", category: "arrival" },
  "vozačka": { url: "/dolazak/fuehrerschein", label: "Vozačka dozvola", category: "arrival" },
  "vozacka": { url: "/dolazak/fuehrerschein", label: "Vozačka dozvola", category: "arrival" },
  "führerschein": { url: "/dolazak/fuehrerschein", label: "Führerschein", category: "arrival" },
  "fuehrerschein": { url: "/dolazak/fuehrerschein", label: "Führerschein", category: "arrival" },
  "auto anmelden": { url: "/dolazak/auto-anmelden", label: "Auto anmelden", category: "arrival" },
  "registracija auta": { url: "/dolazak/auto-anmelden", label: "Registracija vozila", category: "arrival" },
  "uvoz auta": { url: "/dolazak/auto-anmelden", label: "Uvoz i registracija auta", category: "arrival" },
  "sozialversicherung": { url: "/dolazak/sozialversicherung", label: "Sozialversicherung", category: "arrival" },
  "socijalno osiguranje": { url: "/dolazak/sozialversicherung", label: "Socijalno osiguranje", category: "arrival" },

  // Life
  "posao": { url: "/stellenangebote", label: "Stellenangebote", category: "life" },
  "poslovi": { url: "/stellenangebote", label: "Poslovi", category: "life" },
  "job": { url: "/stellenangebote", label: "Stellenangebote", category: "life" },
  "stan": { url: "/wohnungen", label: "Stanovi", category: "life" },
  "stanovi": { url: "/wohnungen", label: "Stanovi", category: "life" },
  "wohnung": { url: "/wohnungen", label: "Wohnungen", category: "life" },
  "porodica": { url: "/familie", label: "Porodica", category: "life" },
  "familie": { url: "/familie", label: "Familie", category: "life" },
  "djeca": { url: "/familie", label: "Porodica i djeca", category: "life" },
  "kinder": { url: "/familie", label: "Familie und Kinder", category: "life" },
  "savjeti": { url: "/zivot", label: "Život i savjeti", category: "life" },

  // Tools
  "kalkulator": { url: "/brutto-netto-rechner", label: "Brutto-Netto Rechner", category: "tools" },
  "brutto": { url: "/brutto-netto-rechner", label: "Brutto-Netto Rechner", category: "tools" },
  "netto": { url: "/brutto-netto-rechner", label: "Brutto-Netto Rechner", category: "tools" },
  "plata": { url: "/brutto-netto-rechner", label: "Kalkulator plate", category: "tools" },
  "gehalt": { url: "/brutto-netto-rechner", label: "Gehaltsrechner", category: "tools" },
  "dokumenten-check": { url: "/dokumenten-check", label: "Dokumenten-Check", category: "tools" },

  // Community
  "direktorij": { url: "/directory", label: "Direktorij", category: "community" },
  "biznisi": { url: "/directory", label: "Balkanski biznisi", category: "community" },
  "ambasad": { url: "/ambasade-konzulati", label: "Ambasade i konzulati", category: "community" },
  "konzulat": { url: "/ambasade-konzulati", label: "Konzulati", category: "community" },
  "botschaft": { url: "/ambasade-konzulati", label: "Botschaften", category: "community" },
  "faq": { url: "/qa", label: "Pitanja i odgovori", category: "community" },
  "pitanja": { url: "/qa", label: "Česta pitanja", category: "community" },

  // Foerderungen
  "subvencij": { url: "/foerderungen", label: "Subvencije i pomoći", category: "finance" },
  "förderung": { url: "/foerderungen", label: "Förderungen", category: "finance" },
  "foerderung": { url: "/foerderungen", label: "Förderungen", category: "finance" },
  "pomoći": { url: "/foerderungen", label: "Finansijske pomoći", category: "finance" },
  "pomoci": { url: "/foerderungen", label: "Finansijske pomoći", category: "finance" },

  // Smart Guide
  "smart guide": { url: "/formulare", label: "Smart Guide", category: "forms" },
  "formular": { url: "/formulare", label: "Formulari", category: "forms" },
  "formulari": { url: "/formulare", label: "Svi formulari", category: "forms" },
};

function detectSiteTopics(text: string): SiteTopic[] {
  const lower = text.toLowerCase();
  const found: SiteTopic[] = [];
  const seenUrls = new Set<string>();
  // Check longer phrases first
  const sortedKeys = Object.keys(SITE_TOPIC_MAP).sort((a, b) => b.length - a.length);
  for (const keyword of sortedKeys) {
    if (lower.includes(keyword) && !seenUrls.has(SITE_TOPIC_MAP[keyword].url)) {
      seenUrls.add(SITE_TOPIC_MAP[keyword].url);
      found.push(SITE_TOPIC_MAP[keyword]);
    }
  }
  return found.slice(0, 3);
}

// ── INTENT CLASSIFIER ──

const PREMIUM_KEYWORDS = [
  "popuni za mene", "pomozi mi popuniti", "popuni formular",
  "ispuni za mene", "ispuni formular",
  "polje po polje", "polje-po-polje",
  "objasni mi pismo", "objasni pismo", "pismo od amta", "pismo od amt",
  "analiziraj dokument", "analiziraj moj", "provjeri moj dokument",
  "moja situacija", "moj slučaj", "moj slucaj",
  "personalizirano", "personalizovano", "lična pomoć", "licna pomoc",
  "formular ausfüllen für mich", "formular ausfullen fur mich",
  "feld für feld ausfüllen", "feld fur feld ausfullen",
  "brief erklären", "brief erklaren", "brief vom amt",
  "mein dokument", "dokument analysieren", "meine situation",
  "persönliche hilfe", "personliche hilfe", "individuell",
  "fill form for me", "fill out my form",
  "field by field filling", "explain my letter",
  "analyze my document", "my situation", "my case",
  "personal assistance", "personalized help",
];

const PREMIUM_PATTERNS = [
  /popuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /ispuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /pomozi\s+mi\s+(popuniti|ispuniti)/i,
  /objasni\s+(mi\s+)?(ovo\s+)?pismo/i,
  /analiziraj\s+(mi\s+)?(ovaj\s+)?dokument/i,
  /provjeri\s+(mi\s+)?(ovaj\s+)?dokument/i,
  /moj[ae]?\s+(situacij|slučaj|slucaj|dokument)/i,
  /formular\s+ausf[uü]llen\s+(f[uü]r\s+mich|bitte)/i,
  /brief\s+(vom\s+amt\s+)?erkl[aä]ren/i,
  /mein(e[rn]?)?\s+(dokument|brief|situation|fall)/i,
  /fill\s+(out\s+)?my\s+(form|document)/i,
  /explain\s+my\s+(letter|document)/i,
  /analy[sz]e\s+my\s+(document|letter)/i,
];

type Intent = "FREE_ALLOWED" | "PREMIUM_REQUIRED" | "SMART_GUIDE_REDIRECT";

const SMART_GUIDE_PATTERNS = [
  /kako\s+(popuniti|ispuniti|riješiti|rjesiti)\s+kindergeld/i,
  /kindergeld\s+(formular|antrag|zahtjev|obrazac)/i,
  /antrag\s+kg\s*1/i,
  /kg\s*1\s+(popuniti|ispuniti|formular)/i,
  /kako\s+(popuniti|ispuniti)\s+(formular|antrag|obrazac)/i,
  /popuniti\s+(formular|antrag|zahtjev)/i,
  /wohngeld\s+(formular|antrag)/i,
  /elterngeld\s+(formular|antrag)/i,
  /bürgergeld\s+(formular|antrag)/i,
  /wie\s+(füll|full)\s+(ich|man)\s+.*\s*(antrag|formular)/i,
  /how\s+to\s+fill\s+(out\s+)?(the\s+)?(kindergeld|form|application)/i,
  /korak\s+po\s+korak.*(kindergeld|formular)/i,
  /step.by.step.*(kindergeld|form)/i,
];

const SMART_GUIDE_KEYWORDS = [
  "kako popuniti kindergeld", "kindergeld korak po korak", "kindergeld formular popuniti",
  "kg1 popuniti", "kindergeld antrag ausfüllen", "kindergeld step by step",
  "kako ispuniti formular kindergeld", "kindergeld zahtjev popuniti",
];

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();
  for (const kw of SMART_GUIDE_KEYWORDS) {
    if (lower.includes(kw)) return "SMART_GUIDE_REDIRECT";
  }
  for (const pat of SMART_GUIDE_PATTERNS) {
    if (pat.test(lower)) return "SMART_GUIDE_REDIRECT";
  }
  for (const pat of PREMIUM_PATTERNS) {
    if (pat.test(lower)) return "PREMIUM_REQUIRED";
  }
  for (const kw of PREMIUM_KEYWORDS) {
    if (lower.includes(kw)) return "PREMIUM_REQUIRED";
  }
  return "FREE_ALLOWED";
}

// ── DATABASE LOOKUP ──

async function searchDatabase(query: string): Promise<any[]> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) return [];
  const supabase = createClient(supabaseUrl, supabaseKey);

  const stopWords = new Set(["die", "der", "das", "und", "oder", "für", "fur", "von", "vom", "wie", "was", "ist", "ein", "eine", "den", "dem", "des", "als", "mit", "bei", "nach", "aus", "auf", "the", "and", "for", "gdje", "kako", "sta", "šta", "koji", "koje"]);
  const terms = query.toLowerCase().replace(/[?!.,;:"""„'']/g, " ").split(/\s+/).filter((w) => w.length >= 3 && !stopWords.has(w));
  if (terms.length === 0) return [];

  try {
    const { data, error } = await supabase.rpc("search_community_listings", { search_terms: terms });
    if (error) { console.error("DB search error:", error.message); return []; }
    return (data || []).slice(0, 10);
  } catch (e) { console.error("DB search exception:", e); return []; }
}

function formatDbResults(results: any[]): string {
  if (results.length === 0) return "";
  return results.map((r) => {
    const parts = [`**${r.name}**`];
    const addr = [r.address, r.postal_code, r.city].filter(Boolean).join(", ");
    if (addr) parts.push(`Adresa: ${addr}`);
    if (r.bundesland) parts.push(`Bundesland: ${r.bundesland}`);
    const cats = [r.main_category, r.sub_category].filter(Boolean).join(" / ");
    if (cats) parts.push(`Kategorija: ${cats}`);
    if (r.google_rating) parts.push(`⭐ ${r.google_rating} Google Reviews`);
    if (r.website) parts.push(`Web: ${r.website}`);
    if (r.google_maps_url) parts.push(`Maps: ${r.google_maps_url}`);
    return parts.join("\n");
  }).join("\n\n---\n\n");
}

// ── SMART GUIDE SLUG MAPPING ──

const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld", kinderzuschlag: "kinderzuschlag", elterngeld: "elterngeld",
  elternzeit: "elterngeld", mutterschutz: "mutterschaftsgeld", mutterschaftsgeld: "mutterschaftsgeld",
  unterhalt: "unterhaltsvorschuss", unterhaltsvorschuss: "unterhaltsvorschuss",
  "bildung und teilhabe": "bildung-teilhabe", bürgergeld: "buergergeld", burgergeld: "buergergeld",
  wohngeld: "wohngeld", bafög: "bafoeg", bafoeg: "bafoeg", sozialhilfe: "sozialhilfe",
  krippengeld: "krippengeld-bayern", krankengeld: "krankengeld",
  führungszeugnis: "fuehrungszeugnis", fuehrungszeugnis: "fuehrungszeugnis",
  aufenthaltstitel: "aufenthaltstitel-verlaengerung", "boravišna dozvola": "aufenthaltstitel-verlaengerung",
  boravisna: "aufenthaltstitel-verlaengerung",
  anmeldung: "anmeldung", wbs: "wbs",
  arbeitslosengeld: "arbeitslosengeld", kurzarbeitergeld: "kurzarbeitergeld",
  bildungsgutschein: "bildungsgutschein", integrationskurs: "integrationskurs",
  kirchenaustritt: "kirchenaustritt", heizkostenzuschuss: "heizkostenzuschuss",
  "kita-zuschuss": "kita-zuschuss", "kita zuschuss": "kita-zuschuss",
  rundfunkbeitrag: "gez-anmeldung", gez: "gez-anmeldung",
  steuerklasse: "steuerklassenwechsel", "steuer-id": "steuerklassenwechsel", "steuer id": "steuerklassenwechsel",
  krankenkasse: "familienversicherung", familienversicherung: "familienversicherung",
  "schüler-bafög": "schueler-bafoeg", "schueler-bafoeg": "schueler-bafoeg",
  lernförderung: "lernfoerderung", lernfoerderung: "lernfoerderung",
};

function detectGuideSlug(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, slug] of Object.entries(TOPIC_GUIDE_MAP)) {
    if (lower.includes(keyword)) return slug;
  }
  return null;
}

// ── DETECT FORM FROM CATALOG ──

function detectFormFromCatalog(text: string): typeof FORM_CATALOG[0] | null {
  const lower = text.toLowerCase();
  for (const form of FORM_CATALOG) {
    if (lower.includes(form.slug) || lower.includes(form.label.toLowerCase())) {
      return form;
    }
  }
  const aliases: Record<string, string> = {
    "dječji dodatak": "kindergeld", "djecji dodatak": "kindergeld",
    "prijava adrese": "anmeldung", "prijava prebivališta": "anmeldung", "prijava prebivalista": "anmeldung",
    "roditeljski novac": "elterngeld", "roditeljska naknada": "elterngeld",
    "socijalna pomoć": "sozialhilfe", "socijalna pomoc": "sozialhilfe",
    "pomoć za stan": "wohngeld", "pomoc za stan": "wohngeld",
    "produženje boravišne": "aufenthaltstitel-verlaengerung", "produzenje boravisne": "aufenthaltstitel-verlaengerung",
    "boravišna dozvola": "aufenthaltstitel-verlaengerung", "boravisna dozvola": "aufenthaltstitel-verlaengerung",
    "potvrda o nekažnjavanju": "fuehrungszeugnis", "nekažnjavanje": "fuehrungszeugnis",
    "alimentacija": "unterhaltsvorschuss", "alimentacij": "unterhaltsvorschuss",
  };
  for (const [alias, slug] of Object.entries(aliases)) {
    if (lower.includes(alias)) {
      return FORM_CATALOG.find(f => f.slug === slug) || null;
    }
  }
  return null;
}

// ── SYSTEM PROMPTS ──

function buildSystemPrompt(isPremium: boolean, language: string, dbResults: any[]): string {
  const langName = LANG_NAMES[language] || "Deutsch";
  const langInstruction = `VAŽNO: ODGOVARAJ ISKLJUČIVO na jeziku: ${langName}. Cijeli odgovor mora biti na tom jeziku.`;

  const formCatalogContext = `
────────────────────────────
DOSTUPNI FORMULARI NA BALKANLINK PLATFORMI
────────────────────────────

Ovo su formulari koji postoje na BalkanLink platformi. Kad korisnik spomene bilo koji od ovih formulara ili srodnu temu, OBAVEZNO:
1. Prepoznaj koji formular mu treba
2. U odgovoru uključi marker: [FORM:slug] (npr. [FORM:kindergeld]) — ovo će automatski prikazati karticu formulara sa akcijama.
3. NE duplciraj sadržaj Smart Guide-a — samo uputi korisnika na njega.
4. SVAKI odgovor vezan za formular mora završiti sa [FORM:slug] markerom.

Katalog formulara:
${buildFormCatalogContext()}

PRAVILO: Kad korisnik kaže "Formulari i papiri" ili "Koji formulari postoje", prikaži TOP 5 najvažnijih formulara sa markerima:
[FORM:anmeldung]
[FORM:kindergeld]
[FORM:wohngeld]
[FORM:buergergeld]
[FORM:aufenthaltstitel-verlaengerung]
`;

  const siteWideContext = `
${SITE_CONTENT_INDEX}

────────────────────────────
LINKOVI U ODGOVORIMA (OBAVEZNO)
────────────────────────────

Kad odgovaraš na pitanje o bilo kojoj sekciji BalkanLinka, OBAVEZNO uključi relevantni link u odgovor koristeći Markdown format:
- Za stranicu "Premium": [Pogledaj Premium](/premium)
- Za stranicu "AGB/Uslovi": [Otvori uslove članstva](/mitgliedschaft)
- Za stranicu "Datenschutz": [Otvori Datenschutz](/datenschutz)
- Za stranicu "Oglasi": [Otvori oglase](/nudim-trazim)
- Za stranicu "Stanovi": [Pogledaj stanove](/wohnungen)
- Za stranicu "Poslovi": [Pogledaj poslove](/stellenangebote)
- Za stranicu "Dolazak": [Pogledaj korake](/dolazak)
- Za stranicu "Kalkulator": [Otvori kalkulator](/brutto-netto-rechner)
- Za stranicu "Q&A": [Pogledaj FAQ](/qa)
- Za stranicu "Direktorij": [Otvori direktorij](/directory)
- Za stranicu "Ambasade": [Pogledaj ambasade](/ambasade-konzulati)
- Za stranicu "Porodica": [Pogledaj sekciju Porodica](/familie)
- Za stranicu "Subvencije": [Pogledaj pomoći](/foerderungen)
- Za stranicu "Dokumenten-Check": [Otvori Dokumenten-Check](/dokumenten-check)

UVIJEK uključi barem 1 relevantan link. Maksimalno 2-3 linka po odgovoru.
`;

  const corePrompt = `
────────────────────────────
PONAŠANJE (OBAVEZNO)
────────────────────────────

Ti si "BalkanLink Assistant" — centralni digitalni vodič za CIJELU BalkanLink platformu.
Ti poznaješ SVE sekcije sajta: formulare, pravne stranice, premium, oglase, dolazak, život, alate, zajednicu.
Tvoj cilj je brzo i precizno odgovoriti na BILO KOJE pitanje vezano za BalkanLink i povezati korisnika sa pravim dijelom platforme.

PRAVILA:
1. Kad korisnik postavi pitanje — PREPOZNAJ o kojoj sekciji BalkanLinka se radi.
2. Daj KRATAK i JASAN odgovor (2-4 kratka pasusa).
3. UKLJUČI relevantan link na pravu stranicu BalkanLinka.
4. Za formular teme — koristi [FORM:slug] marker.
5. NIKAD ne zatrpavaj korisnika. Maks 2-3 akcije/linka po odgovoru.
6. NIKAD ne daj ogromne blokove teksta. Budi sažet.
7. UVIJEK završi sa "Šta ti još treba?" ili sličnom ponudom za dalje.

STRUKTURA ODGOVORA:
1. Šta je to? (1-2 rečenice)
2. Najbitnije što treba znati (bullets, max 4)
3. Šta dalje? + linkovi na relevantne stranice
4. Maksimalno 2-3 akcije

PRIORITET ODGOVORA:
- Ako je pitanje o formularu → koristi formular kontekst + [FORM:slug]
- Ako je pitanje o pravnim stranicama (AGB, Datenschutz) → sažmi i linkaj
- Ako je pitanje o premiumu → objasni Free vs Premium i linkaj
- Ako je pitanje o oglasima → objasni sistem i linkaj
- Ako je pitanje o dolasku → objasni korake i linkaj
- Ako je pitanje o životu/poslu/stanu → daj savjet i linkaj
- Ako je generalno pitanje o Njemačkoj → koristi svoje znanje + poveži sa relevantnom sekcijom

────────────────────────────
MONETIZACIJSKI FLOW (SOFT UPSELL)
────────────────────────────

KORAK 1 — FREE: Osnovno objašnjenje + linkovi
KORAK 2 — PROBLEM TRIGGER: "Najveći problem je što ljudi pogriješe u formularu."
KORAK 3 — SOFT PONUDA: "Želiš Smart Guide koji te vodi polje po polje?"

NE prodavaj agresivno. Premium izgleda kao logičan sljedeći korak.

────────────────────────────
TASK ENGINE (GENERISANJE DOKUMENATA)
────────────────────────────

Kad korisnik traži generisanje teksta (Kündigung, Bewerbung, poruka za stan, email):
1. Postavi 3-5 kratkih pitanja za personalizaciju
2. Generiši KRATKI PREVIEW (prvih 3-4 reda teksta)
3. Na kraju dodaj: "Ovo je skraćena verzija. Za kompletnu verziju, aktiviraj Premium."

Za Premium korisnike: generiši PUNI tekst i ponudi opcije.

────────────────────────────
GDPR PRAVILA
────────────────────────────

- NIKAD ne traži lične podatke (broj dokumenta, IBAN).
- Koristi placeholder: [Ime], [Adresa], [Datum].
`;

  const strictRules = `
STROGA PRAVILA:
1. KRATAK I KONKRETAN.
2. ČINJENIČNO.
3. BEZ marketinga i superlativa.
4. BEZ generisanja formulara ili pravnih savjeta.
5. Google ocjene SAMO informativno.
6. Ako korisnik spominje grad: "Nadležna institucija: [institucija] grada [grad]"
7. UVIJEK završi sa "šta dalje" opcijama.
8. OBAVEZNO koristi [FORM:slug] marker kad je tema vezana za formular.
9. OBAVEZNO uključi Markdown link na relevantnu BalkanLink stranicu.`;

  if (dbResults.length > 0) {
    return `Ti si "BalkanLink Assistant" — centralni digitalni vodič za CIJELU BalkanLink platformu.
${langInstruction}

MODE: ODGOVOR IZ BAZE PODATAKA
Koristi SAMO podatke iz baze.

FORMAT:
**Naziv**
Adresa: [iz baze]
Kategorija: [iz baze]
Kontakt: [web/maps]
⭐ X.X Google Reviews (informativno)

REZULTATI:
${formatDbResults(dbResults)}

Na kraju: "Želiš li pomoć s nečim drugim?"
${strictRules}`;
  }

  if (!isPremium) {
    return `${langInstruction}

${siteWideContext}

${formCatalogContext}

${corePrompt}

DODATNA PRAVILA ZA FREE KORISNIKE:
- Detaljno polje-po-polje popunjavanje je Premium funkcija — uputi na Smart Guide.
- Generisanje punih dokumenata je Premium funkcija.
- Za template poruke: daj KRATKI preview (3-4 reda) pa reci da je puna verzija u Premiumu.
- EMOTIONAL TRIGGER: "Većina korisnika uz vodič završi prijavu bez greške iz prvog pokušaja."

${strictRules}`;
  }

  return `${langInstruction}

${siteWideContext}

${formCatalogContext}

${corePrompt}

PREMIUM MOGUĆNOSTI:
- Puni Smart Guide pristup (polje-po-polje)
- Generisanje punih dokumenata (Kündigung, Bewerbung, poruke)
- Personalizirana pomoć i checkliste

${strictRules}`;
}

// ── Gate messages ──

const PREMIUM_GATE_MESSAGES: Record<string, { teaser: string; cta: string }> = {
  bs: { teaser: "Ova funkcija zahtijeva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizirana pomoć.", cta: "Ako imate opće pitanje, slobodno ga postavite – odgovorićemo besplatno!" },
  hr: { teaser: "Ova funkcija zahtijeva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizirana pomoć.", cta: "Ako imate opće pitanje, slobodno ga postavite – odgovorit ćemo besplatno!" },
  sr: { teaser: "Ova funkcija zahteva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizovana pomoć.", cta: "Ako imate opšte pitanje, slobodno ga postavite – odgovorićemo besplatno!" },
  me: { teaser: "Ova funkcija zahtijeva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizirana pomoć.", cta: "Ako imate opće pitanje, slobodno ga postavite – odgovorićemo besplatno!" },
  de: { teaser: "Diese Funktion erfordert BalkanLink Premium: Formularhilfe, Dokumentenanalyse und persönliche Beratung.", cta: "Stellen Sie gerne eine allgemeine Frage – wir antworten kostenlos!" },
  en: { teaser: "This feature requires BalkanLink Premium: form filling, document analysis and personalized assistance.", cta: "Feel free to ask a general question – we'll answer for free!" },
  sq: { teaser: "Kjo veçori kërkon BalkanLink Premium: plotësimin e formularëve, analizën e dokumenteve dhe ndihmë të personalizuar.", cta: "Bëni lirisht një pyetje të përgjithshme – do t'ju përgjigjemi falas!" },
  xk: { teaser: "Kjo veçori kërkon BalkanLink Premium: plotësimin e formularëve, analizën e dokumenteve dhe ndihmë të personalizuar.", cta: "Bëni lirisht një pyetje të përgjithshme – do t'ju përgjigjemi falas!" },
  mk: { teaser: "Оваа функција бара BalkanLink Premium: пополнување формулари, анализа на документи и персонализирана помош.", cta: "Слободно поставете општо прашање – ќе одговориме бесплатно!" },
};

const SMART_GUIDE_MESSAGES: Record<string, { text: string; link: string; label: string }> = {
  bs: { text: "Za detaljno popunjavanje formulara koristite naš Smart Guide — interaktivni vodič korak po korak.", link: "/formulari/kindergeld-kg1", label: "Otvori Smart Guide – Kindergeld (KG1)" },
  hr: { text: "Za detaljno popunjavanje formulara koristite naš Smart Guide — interaktivni vodič korak po korak.", link: "/formulari/kindergeld-kg1", label: "Otvori Smart Guide – Kindergeld (KG1)" },
  sr: { text: "Za detaljno popunjavanje formulara koristite naš Smart Guide — interaktivni vodič korak po korak.", link: "/formulari/kindergeld-kg1", label: "Otvori Smart Guide – Kindergeld (KG1)" },
  me: { text: "Za detaljno popunjavanje formulara koristite naš Smart Guide — interaktivni vodič korak po korak.", link: "/formulari/kindergeld-kg1", label: "Otvori Smart Guide – Kindergeld (KG1)" },
  de: { text: "Für das detaillierte Ausfüllen von Formularen nutzen Sie unseren Smart Guide.", link: "/formulari/kindergeld-kg1", label: "Smart Guide öffnen – Kindergeld (KG1)" },
  en: { text: "For detailed form filling, use our Smart Guide — an interactive step-by-step wizard.", link: "/formulari/kindergeld-kg1", label: "Open Smart Guide – Kindergeld (KG1)" },
  sq: { text: "Për plotësimin e detajuar të formularëve përdorni Smart Guide-in tonë.", link: "/formulari/kindergeld-kg1", label: "Hap Smart Guide – Kindergeld (KG1)" },
  xk: { text: "Për plotësimin e detajuar të formularëve përdorni Smart Guide-in tonë.", link: "/formulari/kindergeld-kg1", label: "Hap Smart Guide – Kindergeld (KG1)" },
  mk: { text: "За детално пополнување формулари користете го нашиот Smart Guide.", link: "/formulari/kindergeld-kg1", label: "Отвори Smart Guide – Kindergeld (KG1)" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, isPremium, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    const userText = lastUserMsg?.content || "";

    const intent = classifyIntent(userText);
    const guideSlug = detectGuideSlug(userText);
    const detectedForm = detectFormFromCatalog(userText);
    const siteTopics = detectSiteTopics(userText);

    // Smart Guide redirect
    if (intent === "SMART_GUIDE_REDIRECT") {
      const lang = language || "bs";
      const sg = SMART_GUIDE_MESSAGES[lang] || SMART_GUIDE_MESSAGES["bs"];
      const slug = guideSlug || (detectedForm?.slug) || "kindergeld";
      const link = `/guide/${slug}`;
      const markdown = `${sg.text}\n\n👉 [${sg.label}](${link})`;
      return new Response(
        JSON.stringify({ smart_guide_redirect: true, content: markdown, guideSlug: slug, detectedForm: detectedForm }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (intent === "PREMIUM_REQUIRED" && !isPremium) {
      const lang = language || "bs";
      const gate = PREMIUM_GATE_MESSAGES[lang] || PREMIUM_GATE_MESSAGES["bs"];
      return new Response(
        JSON.stringify({ premium_required: true, teaser: gate.teaser, cta: gate.cta, detectedForm: detectedForm, guideSlug: guideSlug }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dbResults = await searchDatabase(userText);
    console.log(`DB search for "${userText.slice(0, 60)}": ${dbResults.length} results`);

    const systemPrompt = buildSystemPrompt(isPremium, language || "de", dbResults);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Previše zahtjeva. Pokušajte ponovo za trenutak." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usluga trenutno nije dostupna." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Greška u komunikaciji sa serverom." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const extraHeaders: Record<string, string> = { ...corsHeaders, "Content-Type": "text/event-stream" };
    if (guideSlug) extraHeaders["X-Guide-Slug"] = guideSlug;
    if (detectedForm) extraHeaders["X-Form-Slug"] = detectedForm.slug;
    // Pass detected site topics as header for frontend action buttons
    if (siteTopics.length > 0) {
      extraHeaders["X-Site-Topics"] = JSON.stringify(siteTopics.map(t => ({ url: t.url, label: t.label })));
    }

    return new Response(response.body, { headers: extraHeaders });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Nepoznata greška" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
