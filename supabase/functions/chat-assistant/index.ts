import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_NAMES: Record<string, string> = {
  bs: "bosanski", hr: "hrvatski", sr: "srpski", me: "crnogorski",
  sq: "shqip", xk: "shqip", mk: "makedonski", de: "Deutsch", en: "English",
};

// ── FORM CATALOG ──

const FORM_CATALOG: { slug: string; label: string; desc: string }[] = [
  { slug: "anmeldung", label: "Anmeldung", desc: "Prijava adrese stanovanja." },
  { slug: "steuerklassenwechsel", label: "Steuer-ID", desc: "Poreski ID." },
  { slug: "familienversicherung", label: "Krankenkasse", desc: "Zdravstveno osiguranje." },
  { slug: "kindergeld", label: "Kindergeld", desc: "Pomoc za djecu." },
  { slug: "elterngeld", label: "Elterngeld", desc: "Naknada za roditelje." },
  { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Naknada za porod." },
  { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Dodatak za djecu." },
  { slug: "kita-zuschuss", label: "Kita-Zuschuss", desc: "Troskovi vrtica." },
  { slug: "krippengeld-bayern", label: "Krippengeld", desc: "Jaslice (Bavaria)." },
  { slug: "unterhaltsvorschuss", label: "Unterhaltsvorschuss", desc: "Alimentacija." },
  { slug: "buergergeld", label: "Buergergeld", desc: "Osnovna pomoc." },
  { slug: "wohngeld", label: "Wohngeld", desc: "Pomoc za stan." },
  { slug: "sozialhilfe", label: "Sozialhilfe", desc: "Socijalna pomoc." },
  { slug: "bildung-teilhabe", label: "Bildung und Teilhabe", desc: "Skolski troskovi." },
  { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada nezaposlenima." },
  { slug: "kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "Skraceni rad." },
  { slug: "krankengeld", label: "Krankengeld", desc: "Naknada pri bolesti." },
  { slug: "bildungsgutschein", label: "Bildungsgutschein", desc: "Vaucer za edukaciju." },
  { slug: "bafoeg", label: "BAfoG", desc: "Pomoc za studij." },
  { slug: "schueler-bafoeg", label: "Schueler-BAfoG", desc: "Pomoc za ucenike." },
  { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs njemackog." },
  { slug: "lernfoerderung", label: "Lernfoerderung", desc: "Dopunska nastava." },
  { slug: "wbs", label: "WBS", desc: "Socijalni stanovi." },
  { slug: "gez-anmeldung", label: "Rundfunkbeitrag", desc: "RTV taksa." },
  { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss", desc: "Grijanje." },
  { slug: "fuehrungszeugnis", label: "Fuehrungszeugnis", desc: "Nekaznjavanje." },
  { slug: "aufenthaltstitel-verlaengerung", label: "Aufenthaltstitel", desc: "Boravisna dozvola." },
  { slug: "kirchenaustritt", label: "Kirchenaustritt", desc: "Odjava iz crkve." },
];

function buildFormCatalogContext(): string {
  return FORM_CATALOG.map(f => `- ${f.label} (slug: ${f.slug}): ${f.desc}`).join("\n");
}

// ── SITE CONTENT INDEX ──

const SITE_CONTENT_INDEX = `
BALKANLINK STRANICE:
Dolazak: /dolazak/prvi-koraci, /dolazak/prijava-prebivalista (Anmeldung), /dolazak/boravisna-dozvola, /dolazak/steuer-id-i-porezna-klasa, /dolazak/zdravstveno-osiguranje, /dolazak/bankovni-racun, /dolazak/sozialversicherung, /dolazak/rundfunkbeitrag, /dolazak/fuehrerschein, /dolazak/auto-anmelden
Formulari: /formulari (lista), /formulari/:slug (pojedinacni), /guide/:slug (Smart Guide vodic)
Zivot: /zivot-savjeti, /trebam-pomoc, /familie, /foerderungen
Alati: /brutto-netto-rechner, /dokumenten-check, /generatoren
Stanovi: /wohnungen (pametna pretraga stanova sa filterima)
Posao: /stellenangebote (pametna pretraga poslova sa filterima)
Oglasi: /nudim-trazim (Nudim/Trazim oglasna tabla)
Zajednica: /qa, /directory, /ambasade-konzulati
Premium: /premium (Free vs Premium)
Pravne: /impressum, /datenschutz, /disclaimer, /ki-hinweis, /mitgliedschaft
Auth: /login, /register
`;

// ── RELATED TOPICS MAP ──

const RELATED_TOPICS_MAP: Record<string, { label: string; url: string }[]> = {
  kindergeld: [
    { label: "Kinderzuschlag", url: "/formulari/kinderzuschlag" },
    { label: "Elterngeld", url: "/formulari/elterngeld" },
    { label: "Bildung & Teilhabe", url: "/formulari/bildung-teilhabe" },
  ],
  kinderzuschlag: [
    { label: "Kindergeld", url: "/formulari/kindergeld" },
    { label: "Wohngeld", url: "/formulari/wohngeld" },
    { label: "Bildung & Teilhabe", url: "/formulari/bildung-teilhabe" },
  ],
  elterngeld: [
    { label: "Kindergeld", url: "/formulari/kindergeld" },
    { label: "Mutterschaftsgeld", url: "/formulari/mutterschaftsgeld" },
    { label: "Kita-Zuschuss", url: "/formulari/kita-zuschuss" },
  ],
  mutterschaftsgeld: [
    { label: "Elterngeld", url: "/formulari/elterngeld" },
    { label: "Kindergeld", url: "/formulari/kindergeld" },
  ],
  wohngeld: [
    { label: "WBS", url: "/formulari/wbs" },
    { label: "Buergergeld", url: "/formulari/buergergeld" },
    { label: "Heizkostenzuschuss", url: "/formulari/heizkostenzuschuss" },
  ],
  buergergeld: [
    { label: "Wohngeld", url: "/formulari/wohngeld" },
    { label: "Sozialhilfe", url: "/formulari/sozialhilfe" },
    { label: "Bildungsgutschein", url: "/formulari/bildungsgutschein" },
  ],
  anmeldung: [
    { label: "Steuer-ID", url: "/dolazak/steuer-id-i-porezna-klasa" },
    { label: "Bankovni racun", url: "/dolazak/bankovni-racun" },
    { label: "Zdravstveno", url: "/dolazak/zdravstveno-osiguranje" },
  ],
  bafoeg: [
    { label: "Schueler-BAfoG", url: "/formulari/schueler-bafoeg" },
    { label: "Bildungsgutschein", url: "/formulari/bildungsgutschein" },
  ],
  arbeitslosengeld: [
    { label: "Buergergeld", url: "/formulari/buergergeld" },
    { label: "Bildungsgutschein", url: "/formulari/bildungsgutschein" },
    { label: "Pretraga poslova", url: "/stellenangebote" },
  ],
  aufenthaltstitel: [
    { label: "Anmeldung", url: "/formulari/anmeldung" },
    { label: "Zdravstveno", url: "/dolazak/zdravstveno-osiguranje" },
    { label: "Integrationskurs", url: "/formulari/integrationskurs" },
  ],
};

function getRelatedTopics(text: string): { label: string; url: string }[] {
  const lower = text.toLowerCase();
  for (const [key, topics] of Object.entries(RELATED_TOPICS_MAP)) {
    if (lower.includes(key)) return topics;
  }
  return [];
}

// ── SITE TOPIC DETECTION ──

type SiteTopic = { url: string; label: string; category: string };

const SITE_TOPIC_MAP: Record<string, SiteTopic> = {
  "agb": { url: "/mitgliedschaft", label: "Uslovi clanstva", category: "legal" },
  "uslovi": { url: "/mitgliedschaft", label: "Uslovi clanstva", category: "legal" },
  "mitgliedschaft": { url: "/mitgliedschaft", label: "Mitgliedschaftsbedingungen", category: "legal" },
  "datenschutz": { url: "/datenschutz", label: "Datenschutz", category: "legal" },
  "privatnost": { url: "/datenschutz", label: "Zastita podataka", category: "legal" },
  "gdpr": { url: "/datenschutz", label: "GDPR / Datenschutz", category: "legal" },
  "impressum": { url: "/impressum", label: "Impressum", category: "legal" },
  "disclaimer": { url: "/disclaimer", label: "Haftungsausschluss", category: "legal" },
  "haftung": { url: "/disclaimer", label: "Haftungsausschluss", category: "legal" },
  "ki-hinweis": { url: "/ki-hinweis", label: "KI-Hinweis", category: "legal" },
  "premium": { url: "/premium", label: "Premium", category: "premium" },
  "clanstvo": { url: "/premium", label: "Premium", category: "premium" },
  "cijena": { url: "/premium", label: "Premium cijena", category: "premium" },
  "pretplata": { url: "/premium", label: "Premium", category: "premium" },
  "oglas": { url: "/nudim-trazim", label: "Nudim / Trazim", category: "ads" },
  "oglasi": { url: "/nudim-trazim", label: "Nudim / Trazim", category: "ads" },
  "nudim": { url: "/nudim-trazim", label: "Nudim / Trazim", category: "ads" },
  "trazim": { url: "/nudim-trazim", label: "Nudim / Trazim", category: "ads" },
  "dolazak": { url: "/dolazak", label: "Dolazak", category: "arrival" },
  "prvi koraci": { url: "/dolazak/prvi-koraci", label: "Prvi koraci", category: "arrival" },
  "prijava adrese": { url: "/dolazak/prijava-prebivalista", label: "Anmeldung", category: "arrival" },
  "prijava prebivalista": { url: "/dolazak/prijava-prebivalista", label: "Anmeldung", category: "arrival" },
  "zdravstveno": { url: "/dolazak/zdravstveno-osiguranje", label: "Zdravstveno", category: "arrival" },
  "bankovni": { url: "/dolazak/bankovni-racun", label: "Bankovni racun", category: "arrival" },
  "vozacka": { url: "/dolazak/fuehrerschein", label: "Vozacka dozvola", category: "arrival" },
  "fuehrerschein": { url: "/dolazak/fuehrerschein", label: "Fuehrerschein", category: "arrival" },
  "auto anmelden": { url: "/dolazak/auto-anmelden", label: "Auto registracija", category: "arrival" },
  "uvoz auta": { url: "/dolazak/auto-anmelden", label: "Uvoz auta", category: "arrival" },
  "sozialversicherung": { url: "/dolazak/sozialversicherung", label: "Sozialversicherung", category: "arrival" },
  "posao": { url: "/stellenangebote", label: "Pretraga poslova", category: "search" },
  "poslovi": { url: "/stellenangebote", label: "Pretraga poslova", category: "search" },
  "job": { url: "/stellenangebote", label: "Pretraga poslova", category: "search" },
  "stan": { url: "/wohnungen", label: "Pretraga stanova", category: "search" },
  "stanovi": { url: "/wohnungen", label: "Pretraga stanova", category: "search" },
  "wohnung": { url: "/wohnungen", label: "Pretraga stanova", category: "search" },
  "porodica": { url: "/familie", label: "Porodica", category: "life" },
  "familie": { url: "/familie", label: "Porodica", category: "life" },
  "djeca": { url: "/familie", label: "Porodica", category: "life" },
  "kalkulator": { url: "/brutto-netto-rechner", label: "Kalkulator", category: "tools" },
  "brutto": { url: "/brutto-netto-rechner", label: "Kalkulator", category: "tools" },
  "netto": { url: "/brutto-netto-rechner", label: "Kalkulator", category: "tools" },
  "plata": { url: "/brutto-netto-rechner", label: "Kalkulator", category: "tools" },
  "dokumenten-check": { url: "/dokumenten-check", label: "Dokumenten-Check", category: "tools" },
  "direktorij": { url: "/directory", label: "Direktorij", category: "community" },
  "biznisi": { url: "/directory", label: "Direktorij", category: "community" },
  "ambasad": { url: "/ambasade-konzulati", label: "Ambasade", category: "community" },
  "konzulat": { url: "/ambasade-konzulati", label: "Konzulati", category: "community" },
  "faq": { url: "/qa", label: "Pitanja i odgovori", category: "community" },
  "pitanja": { url: "/qa", label: "FAQ", category: "community" },
  "subvencij": { url: "/foerderungen", label: "Subvencije", category: "finance" },
  "foerderung": { url: "/foerderungen", label: "Foerderungen", category: "finance" },
  "smart guide": { url: "/formulare", label: "Smart Guide", category: "forms" },
  "formular": { url: "/formulare", label: "Formulari", category: "forms" },
  "formulari": { url: "/formulare", label: "Formulari", category: "forms" },
};

function detectSiteTopics(text: string): SiteTopic[] {
  const lower = text.toLowerCase();
  const found: SiteTopic[] = [];
  const seenUrls = new Set<string>();
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

const PREMIUM_PATTERNS = [
  /popuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /ispuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /pomozi\s+mi\s+(popuniti|ispuniti)/i,
  /objasni\s+(mi\s+)?(ovo\s+)?pismo/i,
  /analiziraj\s+(mi\s+)?(ovaj\s+)?dokument/i,
  /moj[ae]?\s+(situacij|slucaj|dokument)/i,
  /formular\s+ausf[uu]llen\s+(f[uu]r\s+mich|bitte)/i,
  /mein(e[rn]?)?\s+(dokument|brief|situation)/i,
  /fill\s+(out\s+)?my\s+(form|document)/i,
];

const PREMIUM_KEYWORDS = [
  "popuni za mene", "pomozi mi popuniti", "popuni formular",
  "polje po polje", "polje-po-polje", "objasni mi pismo",
  "analiziraj dokument", "moja situacija", "moj slucaj",
  "formular ausfuellen fuer mich", "feld fuer feld",
  "fill form for me", "fill out my form",
];

const SMART_GUIDE_PATTERNS = [
  /kako\s+(popuniti|ispuniti|rijesiti)\s+\w+/i,
  /\w+\s+(formular|antrag|zahtjev|obrazac)\s*(popuniti|ispuniti)?/i,
  /korak\s+po\s+korak/i,
  /step.by.step/i,
  /wie\s+(fuell|full)\s+(ich|man)\s+.*\s*(antrag|formular)/i,
  /how\s+to\s+fill/i,
];

const JOB_PATTERNS = [
  /trazi[m]?\s+(posao|job|rad|zaposlenje|arbeit)/i,
  /pronadji\s+(posao|job|rad)/i,
  /job\s*(suche|such|find)/i,
  /arbeit\s*(such|find)/i,
  /gdje\s+(naci|pronaci)\s+(posao|job|rad)/i,
  /kako\s+(naci|pronaci)\s+(posao|job|rad)/i,
  /looking\s+for\s+(a\s+)?(job|work)/i,
  /zaposliti\s+se/i,
  /raditi\s+u\s+njemack/i,
  /stellenangebot/i,
];

const HOUSING_PATTERNS = [
  /trazi[m]?\s+(stan|wohnung|sobu|wg|smjestaj)/i,
  /pronadji\s+(stan|wohnung|sobu)/i,
  /wohnung\s*(such|find)/i,
  /gdje\s+(naci|pronaci)\s+(stan|wohnung|sobu)/i,
  /kako\s+(naci|pronaci)\s+(stan|wohnung|sobu)/i,
  /looking\s+for\s+(a\s+)?(flat|apartment|room)/i,
  /stanovanje/i,
  /wg.*(suche|zimmer)/i,
  /miet(e|wohnung)/i,
];

const JOB_KEYWORDS = [
  "trazim posao", "pronadji posao", "trazi posao",
  "pretraga poslova", "job suche", "arbeit finden",
  "posao u njemackoj", "rad u njemackoj", "zaposlenje", "stellenangebote",
];

const HOUSING_KEYWORDS = [
  "trazim stan", "pronadji stan", "trazi stan",
  "pretraga stanova", "wohnung suchen", "wohnung finden",
  "stan u njemackoj", "trazim sobu", "wg suche", "smjestaj",
];

type Intent = "FREE_ALLOWED" | "PREMIUM_REQUIRED" | "SMART_GUIDE_REDIRECT" | "JOB_SEARCH" | "HOUSING_SEARCH";

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();

  for (const pat of JOB_PATTERNS) { if (pat.test(lower)) return "JOB_SEARCH"; }
  for (const kw of JOB_KEYWORDS) { if (lower.includes(kw)) return "JOB_SEARCH"; }

  for (const pat of HOUSING_PATTERNS) { if (pat.test(lower)) return "HOUSING_SEARCH"; }
  for (const kw of HOUSING_KEYWORDS) { if (lower.includes(kw)) return "HOUSING_SEARCH"; }

  for (const pat of SMART_GUIDE_PATTERNS) { if (pat.test(lower)) return "SMART_GUIDE_REDIRECT"; }

  for (const pat of PREMIUM_PATTERNS) { if (pat.test(lower)) return "PREMIUM_REQUIRED"; }
  for (const kw of PREMIUM_KEYWORDS) { if (lower.includes(kw)) return "PREMIUM_REQUIRED"; }

  return "FREE_ALLOWED";
}

// ── DATABASE LOOKUP ──

async function searchDatabase(query: string): Promise<any[]> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) return [];
  const supabase = createClient(supabaseUrl, supabaseKey);

  const stopWords = new Set(["die", "der", "das", "und", "oder", "fuer", "von", "wie", "was", "ist", "ein", "the", "and", "for", "gdje", "kako", "sta", "koji"]);
  const terms = query.toLowerCase().replace(/[?!.,;:'"]/g, " ").split(/\s+/).filter((w) => w.length >= 3 && !stopWords.has(w));
  if (terms.length === 0) return [];

  try {
    const { data, error } = await supabase.rpc("search_community_listings", { search_terms: terms });
    if (error) return [];
    return (data || []).slice(0, 5);
  } catch { return []; }
}

function formatDbResults(results: any[]): string {
  if (results.length === 0) return "";
  return results.map((r) => {
    const parts = [`**${r.name}**`];
    const addr = [r.address, r.postal_code, r.city].filter(Boolean).join(", ");
    if (addr) parts.push(`Adresa: ${addr}`);
    if (r.google_rating) parts.push(`Rating: ${r.google_rating}`);
    if (r.website) parts.push(`Web: ${r.website}`);
    if (r.google_maps_url) parts.push(`Maps: ${r.google_maps_url}`);
    return parts.join("\n");
  }).join("\n---\n");
}

// ── GUIDE SLUG MAPPING ──

const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld", kinderzuschlag: "kinderzuschlag", elterngeld: "elterngeld",
  mutterschutz: "mutterschaftsgeld", mutterschaftsgeld: "mutterschaftsgeld",
  unterhalt: "unterhaltsvorschuss", buergergeld: "buergergeld",
  wohngeld: "wohngeld", bafoeg: "bafoeg", sozialhilfe: "sozialhilfe",
  krankengeld: "krankengeld", fuehrungszeugnis: "fuehrungszeugnis",
  aufenthaltstitel: "aufenthaltstitel-verlaengerung", boravisna: "aufenthaltstitel-verlaengerung",
  anmeldung: "anmeldung", wbs: "wbs", arbeitslosengeld: "arbeitslosengeld",
  kurzarbeitergeld: "kurzarbeitergeld", bildungsgutschein: "bildungsgutschein",
  integrationskurs: "integrationskurs", kirchenaustritt: "kirchenaustritt",
  heizkostenzuschuss: "heizkostenzuschuss", rundfunkbeitrag: "gez-anmeldung", gez: "gez-anmeldung",
  steuerklasse: "steuerklassenwechsel", krankenkasse: "familienversicherung",
};

function detectGuideSlug(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, slug] of Object.entries(TOPIC_GUIDE_MAP)) {
    if (lower.includes(keyword)) return slug;
  }
  return null;
}

function detectFormFromCatalog(text: string): typeof FORM_CATALOG[0] | null {
  const lower = text.toLowerCase();
  for (const form of FORM_CATALOG) {
    if (lower.includes(form.slug) || lower.includes(form.label.toLowerCase())) return form;
  }
  const aliases: Record<string, string> = {
    "djecji dodatak": "kindergeld",
    "prijava adrese": "anmeldung", "roditeljski novac": "elterngeld",
    "socijalna pomoc": "sozialhilfe", "pomoc za stan": "wohngeld",
    "boravisna dozvola": "aufenthaltstitel-verlaengerung",
    "alimentacija": "unterhaltsvorschuss",
  };
  for (const [alias, slug] of Object.entries(aliases)) {
    if (lower.includes(alias)) return FORM_CATALOG.find(f => f.slug === slug) || null;
  }
  return null;
}

// ── SYSTEM PROMPT — STRUCTURED JSON ──

function buildSystemPrompt(isPremium: boolean, language: string, dbResults: any[]): string {
  const langName = LANG_NAMES[language] || "Deutsch";

  if (dbResults.length > 0) {
    return `Ti si BalkanLink Asistent. Odgovaraj na: ${langName}.
Korisnik trazi lokalni biznis. Koristi SAMO podatke iz baze:
${formatDbResults(dbResults)}

Odgovori ISKLJUCIVO u JSON formatu:
{
  "title": "Naziv pretrage",
  "summary": "Kratki opis rezultata",
  "steps": ["Rezultat 1 sa detaljima", "Rezultat 2 sa detaljima"],
  "warnings": []
}
SAMO JSON, bez teksta ispred ili iza.`;
  }

  return `Ti si BalkanLink Asistent - centralni digitalni vodic za Balkance u Njemackoj.
Odgovaraj ISKLJUCIVO na: ${langName}.

${SITE_CONTENT_INDEX}

FORMULARI:
${buildFormCatalogContext()}

PRAVILA:
Odgovaraj ISKLJUCIVO u JSON formatu sa ovom strukturom:
{
  "title": "Naziv teme (npr. Kindergeld, Anmeldung)",
  "summary": "Jedno kratko objasnjenje u 1-2 recenice",
  "badges": [
    {"label": "10-15 min", "type": "duration"},
    {"label": "Besplatno", "type": "cost"},
    {"label": "Lako", "type": "difficulty"}
  ],
  "eligibility": ["Uslov 1", "Uslov 2"],
  "documents": ["Dokument 1", "Dokument 2"],
  "steps": ["Korak 1", "Korak 2", "Korak 3"],
  "warnings": ["Upozorenje 1"]
}

VAZNA PRAVILA:
1. SAMO JSON - nikakav tekst ispred ili iza JSON-a
2. "title" - uvijek jasan naslov teme
3. "summary" - max 2 recenice
4. "badges" - type moze biti: "duration", "cost", "difficulty", "amount"
5. "eligibility" - ko ima pravo (max 4 stavke, svaka max 15 rijeci)
6. "documents" - koji dokumenti trebaju (max 5 stavki)
7. "steps" - konkretni koraci (max 5, svaki max 20 rijeci)
8. "warnings" - najcesce greske (max 3, svaka max 15 rijeci)
9. Ako neka sekcija nije relevantna, stavi prazan niz []
10. NE izmisljaj sadrzaj. Koristi samo tacne informacije.

${!isPremium ? `FREE korisnik: Objasni temu, daj orijentaciju i korake. Za popunjavanje formulara uputi na Smart Guide.` : `PREMIUM korisnik: Detaljnija pomoc i personalizovani savjeti.`}`;
}

// ── Gate messages ──

const PREMIUM_GATE: Record<string, { teaser: string; cta: string }> = {
  bs: { teaser: "Ova funkcija zahtijeva Premium: popunjavanje formulara i personalizirana pomoc.", cta: "Za opce pitanje - pitaj slobodno, odgovoricemo besplatno!" },
  de: { teaser: "Diese Funktion erfordert Premium: Formularhilfe und persoenliche Beratung.", cta: "Stellen Sie gerne eine allgemeine Frage - kostenlos!" },
  en: { teaser: "This feature requires Premium: form filling and personalized assistance.", cta: "Feel free to ask a general question - it is free!" },
};

const SMART_GUIDE_MSG: Record<string, { text: string; label: string }> = {
  bs: { text: "Za detaljno popunjavanje formulara koristi Smart Guide - interaktivni vodic korak po korak.", label: "Otvori Smart Guide" },
  de: { text: "Fuer das detaillierte Ausfuellen nutzen Sie unseren Smart Guide.", label: "Smart Guide oeffnen" },
  en: { text: "For detailed form filling, use our Smart Guide - step-by-step.", label: "Open Smart Guide" },
};

const JOB_SEARCH_MSG: Record<string, { text: string; label: string }> = {
  bs: {
    text: "BalkanLink ima pametnu pretragu poslova koja ti generise direktne linkove na najvece portale u Njemackoj.",
    label: "Otvori pretragu poslova",
  },
  de: {
    text: "BalkanLink bietet eine intelligente Jobsuche, die direkte Suchlinks zu den groessten Portalen generiert.",
    label: "Jobsuche oeffnen",
  },
  en: {
    text: "BalkanLink offers a smart job search that generates direct search links to major German job portals.",
    label: "Open job search",
  },
};

const HOUSING_SEARCH_MSG: Record<string, { text: string; label: string }> = {
  bs: {
    text: "BalkanLink ima pametnu pretragu stanova koja ti generise direktne linkove na najvece portale.",
    label: "Otvori pretragu stanova",
  },
  de: {
    text: "BalkanLink bietet eine intelligente Wohnungssuche, die direkte Suchlinks zu grossen Portalen generiert.",
    label: "Wohnungssuche oeffnen",
  },
  en: {
    text: "BalkanLink offers a smart housing search that generates direct search links to major portals.",
    label: "Open housing search",
  },
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
    const relatedTopics = getRelatedTopics(userText);
    const lang = ["bs", "hr", "sr", "me"].includes(language) ? "bs" : language === "de" ? "de" : "en";

    // Job search redirect
    if (intent === "JOB_SEARCH") {
      const msg = JOB_SEARCH_MSG[lang] || JOB_SEARCH_MSG["bs"];
      return new Response(
        JSON.stringify({
          type: "redirect",
          title: "Pretraga poslova",
          summary: msg.text,
          redirect_url: "/stellenangebote",
          redirect_label: msg.label,
          badges: [{ label: "Besplatno", type: "cost" }],
          steps: [
            "Unesi grad i bransu",
            "Odaberi dodatne filtere",
            "Klikni 'Trazi poslove'",
            "Dobij gotove pretrage za Indeed, StepStone i druge",
          ],
          relatedTopics: [
            { label: "Brutto-Netto Kalkulator", url: "/brutto-netto-rechner" },
            { label: "Dokumenten-Check", url: "/dokumenten-check" },
          ],
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Housing search redirect
    if (intent === "HOUSING_SEARCH") {
      const msg = HOUSING_SEARCH_MSG[lang] || HOUSING_SEARCH_MSG["bs"];
      return new Response(
        JSON.stringify({
          type: "redirect",
          title: "Pretraga stanova",
          summary: msg.text,
          redirect_url: "/wohnungen",
          redirect_label: msg.label,
          badges: [{ label: "Besplatno", type: "cost" }],
          steps: [
            "Unesi grad i maksimalnu cijenu",
            "Odaberi tip (stan ili WG/soba)",
            "Oznaci filtere (bez provizije, namjesteno...)",
            "Dobij gotove pretrage za ImmobilienScout24, Immowelt i druge",
          ],
          relatedTopics: [
            { label: "Wohngeld", url: "/formulari/wohngeld" },
            { label: "WBS", url: "/formulari/wbs" },
          ],
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Smart Guide redirect
    if (intent === "SMART_GUIDE_REDIRECT") {
      const sg = SMART_GUIDE_MSG[lang] || SMART_GUIDE_MSG["bs"];
      const slug = guideSlug || detectedForm?.slug || "kindergeld";
      return new Response(
        JSON.stringify({
          type: "smart_guide",
          title: detectedForm?.label || slug,
          summary: sg.text,
          guideSlug: slug,
          redirect_url: `/guide/${slug}`,
          redirect_label: sg.label,
          relatedTopics: relatedTopics.length > 0 ? relatedTopics : [],
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Premium gate
    if (intent === "PREMIUM_REQUIRED" && !isPremium) {
      const gate = PREMIUM_GATE[lang] || PREMIUM_GATE["bs"];
      return new Response(
        JSON.stringify({
          type: "premium_gate",
          title: detectedForm?.label || "Premium funkcija",
          summary: gate.teaser,
          cta: gate.cta,
          guideSlug: guideSlug || detectedForm?.slug,
          redirect_url: "/premium",
          redirect_label: "Pogledaj Premium",
          relatedTopics: relatedTopics.length > 0 ? relatedTopics : [],
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // DB search
    const dbResults = await searchDatabase(userText);
    const systemPrompt = buildSystemPrompt(isPremium, language || "de", dbResults);

    // Non-streaming JSON response
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: false,
          max_tokens: 800,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Previse zahtjeva. Pokusaj ponovo." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Nedovoljno kredita. Pokusaj kasnije." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: "Greska. Pokusaj ponovo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Try to parse structured JSON from AI
    let structured: any = null;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        structured = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // fallback
    }

    const result: any = {
      type: "structured",
      title: structured?.title || "Rezultat",
      summary: structured?.summary || rawContent.slice(0, 200),
      badges: structured?.badges || [],
      eligibility: structured?.eligibility || [],
      documents: structured?.documents || [],
      steps: structured?.steps || [],
      warnings: structured?.warnings || [],
      guideSlug: guideSlug || undefined,
      formSlug: detectedForm?.slug || undefined,
      relatedTopics: relatedTopics.length > 0 ? relatedTopics : [],
    };

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Greska" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
