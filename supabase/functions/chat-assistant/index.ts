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
  { slug: "anmeldung", label: "Anmeldung", desc: "Prijava adrese stanovanja." },
  { slug: "steuerklassenwechsel", label: "Steuer-ID", desc: "Poreski ID." },
  { slug: "familienversicherung", label: "Krankenkasse", desc: "Zdravstveno osiguranje." },
  { slug: "kindergeld", label: "Kindergeld", desc: "Pomoć za djecu." },
  { slug: "elterngeld", label: "Elterngeld", desc: "Naknada za roditelje." },
  { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Naknada za porod." },
  { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Dodatak za djecu." },
  { slug: "kita-zuschuss", label: "Kita-Zuschuss", desc: "Troškovi vrtića." },
  { slug: "krippengeld-bayern", label: "Krippengeld", desc: "Jaslice (Bavaria)." },
  { slug: "unterhaltsvorschuss", label: "Unterhaltsvorschuss", desc: "Alimentacija." },
  { slug: "buergergeld", label: "Bürgergeld", desc: "Osnovna pomoć." },
  { slug: "wohngeld", label: "Wohngeld", desc: "Pomoć za stan." },
  { slug: "sozialhilfe", label: "Sozialhilfe", desc: "Socijalna pomoć." },
  { slug: "bildung-teilhabe", label: "Bildung und Teilhabe", desc: "Školski troškovi." },
  { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada nezaposlenima." },
  { slug: "kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "Skraćeni rad." },
  { slug: "krankengeld", label: "Krankengeld", desc: "Naknada pri bolesti." },
  { slug: "bildungsgutschein", label: "Bildungsgutschein", desc: "Vaučer za edukaciju." },
  { slug: "bafoeg", label: "BAföG", desc: "Pomoć za studij." },
  
  { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs njemačkog." },
  { slug: "lernfoerderung", label: "Lernförderung", desc: "Dopunska nastava." },
  { slug: "wbs", label: "WBS", desc: "Socijalni stanovi." },
  { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss", desc: "Grijanje." },
  { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Nekažnjavanje." },
  { slug: "kirchenaustritt", label: "Kirchenaustritt", desc: "Odjava iz crkve." },
];

function buildFormCatalogContext(): string {
  return FORM_CATALOG.map(f => `- ${f.label} (slug: ${f.slug}): ${f.desc}`).join("\n");
}

// ── SITE CONTENT INDEX ──

const SITE_CONTENT_INDEX = `
BALKANLINK STRANICE:
Dolazak: /dolazak/prvi-koraci, /dolazak/prijava-prebivalista (Anmeldung), /dolazak/boravisna-dozvola, /dolazak/steuer-id-i-porezna-klasa, /dolazak/zdravstveno-osiguranje, /dolazak/bankovni-racun, /dolazak/sozialversicherung, /dolazak/rundfunkbeitrag, /dolazak/fuehrerschein, /dolazak/auto-anmelden
Formulari: /formulari (lista), /formulari/:slug (pojedinačni), /guide/:slug (Smart Guide vodič)
Život: /zivot-savjeti, /trebam-pomoc, /familie, /foerderungen
Alati: /brutto-netto-rechner, /dokumenten-check, /generatoren
Stanovi: /wohnungen (pametna pretraga stanova sa filterima)
Posao: /stellenangebote (pametna pretraga poslova sa filterima)
Oglasi: /nudim-trazim (Nudim/Tražim oglasna tabla)
Zajednica: /qa, /directory, /ambasade-konzulati
Premium: /premium (Free vs Premium)
Pravne: /impressum, /datenschutz, /disclaimer, /ki-hinweis, /mitgliedschaft
Auth: /login, /register
`;

// ── SITE TOPIC DETECTION ──

type SiteTopic = { url: string; label: string; category: string };

const SITE_TOPIC_MAP: Record<string, SiteTopic> = {
  "agb": { url: "/mitgliedschaft", label: "Uslovi članstva", category: "legal" },
  "uslovi": { url: "/mitgliedschaft", label: "Uslovi članstva", category: "legal" },
  "mitgliedschaft": { url: "/mitgliedschaft", label: "Mitgliedschaftsbedingungen", category: "legal" },
  "datenschutz": { url: "/datenschutz", label: "Datenschutz", category: "legal" },
  "privatnost": { url: "/datenschutz", label: "Zaštita podataka", category: "legal" },
  "gdpr": { url: "/datenschutz", label: "GDPR / Datenschutz", category: "legal" },
  "impressum": { url: "/impressum", label: "Impressum", category: "legal" },
  "disclaimer": { url: "/disclaimer", label: "Haftungsausschluss", category: "legal" },
  "haftung": { url: "/disclaimer", label: "Haftungsausschluss", category: "legal" },
  "ki-hinweis": { url: "/ki-hinweis", label: "KI-Hinweis", category: "legal" },
  "premium": { url: "/premium", label: "Premium", category: "premium" },
  "članstvo": { url: "/premium", label: "Premium", category: "premium" },
  "clanstvo": { url: "/premium", label: "Premium", category: "premium" },
  "cijena": { url: "/premium", label: "Premium cijena", category: "premium" },
  "pretplata": { url: "/premium", label: "Premium", category: "premium" },
  "oglas": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "oglasi": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "nudim": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "tražim": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "trazim": { url: "/nudim-trazim", label: "Nudim / Tražim", category: "ads" },
  "dolazak": { url: "/dolazak", label: "Dolazak", category: "arrival" },
  "prvi koraci": { url: "/dolazak/prvi-koraci", label: "Prvi koraci", category: "arrival" },
  "prijava adrese": { url: "/dolazak/prijava-prebivalista", label: "Anmeldung", category: "arrival" },
  "prijava prebivalista": { url: "/dolazak/prijava-prebivalista", label: "Anmeldung", category: "arrival" },
  "zdravstveno": { url: "/dolazak/zdravstveno-osiguranje", label: "Zdravstveno", category: "arrival" },
  "bankovni": { url: "/dolazak/bankovni-racun", label: "Bankovni račun", category: "arrival" },
  "vozačka": { url: "/dolazak/fuehrerschein", label: "Vozačka dozvola", category: "arrival" },
  "vozacka": { url: "/dolazak/fuehrerschein", label: "Vozačka dozvola", category: "arrival" },
  "führerschein": { url: "/dolazak/fuehrerschein", label: "Führerschein", category: "arrival" },
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
  "förderung": { url: "/foerderungen", label: "Förderungen", category: "finance" },
  "pomoći": { url: "/foerderungen", label: "Pomoći", category: "finance" },
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

// ── INTENT CLASSIFIER (expanded) ──

const PREMIUM_PATTERNS = [
  /popuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /ispuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /pomozi\s+mi\s+(popuniti|ispuniti)/i,
  /objasni\s+(mi\s+)?(ovo\s+)?pismo/i,
  /analiziraj\s+(mi\s+)?(ovaj\s+)?dokument/i,
  /moj[ae]?\s+(situacij|slučaj|slucaj|dokument)/i,
  /formular\s+ausf[uü]llen\s+(f[uü]r\s+mich|bitte)/i,
  /mein(e[rn]?)?\s+(dokument|brief|situation)/i,
  /fill\s+(out\s+)?my\s+(form|document)/i,
];

const PREMIUM_KEYWORDS = [
  "popuni za mene", "pomozi mi popuniti", "popuni formular",
  "polje po polje", "polje-po-polje", "objasni mi pismo",
  "analiziraj dokument", "moja situacija", "moj slučaj",
  "formular ausfüllen für mich", "feld für feld",
  "fill form for me", "fill out my form",
];

const SMART_GUIDE_PATTERNS = [
  /kako\s+(popuniti|ispuniti|riješiti)\s+\w+/i,
  /\w+\s+(formular|antrag|zahtjev|obrazac)\s*(popuniti|ispuniti)?/i,
  /korak\s+po\s+korak/i,
  /step.by.step/i,
  /wie\s+(füll|full)\s+(ich|man)\s+.*\s*(antrag|formular)/i,
  /how\s+to\s+fill/i,
];

const JOB_PATTERNS = [
  /traži[m]?\s+(posao|job|rad|zaposlenje|arbeit)/i,
  /pronađi\s+(posao|job|rad)/i,
  /pronadji\s+(posao|job|rad)/i,
  /job\s*(suche|such|find)/i,
  /arbeit\s*(such|find)/i,
  /gdje\s+(naći|naci|pronaći|pronaci)\s+(posao|job|rad)/i,
  /kako\s+(naći|naci|pronaći|pronaci)\s+(posao|job|rad)/i,
  /looking\s+for\s+(a\s+)?(job|work)/i,
  /zaposliti\s+se/i,
  /raditi\s+u\s+njemačk/i,
  /stellenangebot/i,
];

const HOUSING_PATTERNS = [
  /traži[m]?\s+(stan|wohnung|sobu|wg|smještaj|smjestaj)/i,
  /pronađi\s+(stan|wohnung|sobu)/i,
  /pronadji\s+(stan|wohnung|sobu)/i,
  /wohnung\s*(such|find)/i,
  /gdje\s+(naći|naci|pronaći|pronaci)\s+(stan|wohnung|sobu)/i,
  /kako\s+(naći|naci|pronaći|pronaci)\s+(stan|wohnung|sobu)/i,
  /looking\s+for\s+(a\s+)?(flat|apartment|room)/i,
  /stanovanje/i,
  /wg.*(suche|zimmer)/i,
  /miet(e|wohnung)/i,
];

const JOB_KEYWORDS = [
  "tražim posao", "trazim posao", "pronađi posao", "pronadji posao",
  "traži posao", "trazi posao", "pretraga poslova", "job suche",
  "arbeit finden", "posao u njemačkoj", "posao u njemackoj",
  "rad u njemačkoj", "zaposlenje", "stellenangebote",
];

const HOUSING_KEYWORDS = [
  "tražim stan", "trazim stan", "pronađi stan", "pronadji stan",
  "traži stan", "trazi stan", "pretraga stanova", "wohnung suchen",
  "wohnung finden", "stan u njemačkoj", "stan u njemackoj",
  "tražim sobu", "trazim sobu", "wg suche", "smještaj",
];

type Intent = "FREE_ALLOWED" | "PREMIUM_REQUIRED" | "SMART_GUIDE_REDIRECT" | "JOB_SEARCH" | "HOUSING_SEARCH";

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();

  // Job search
  for (const pat of JOB_PATTERNS) {
    if (pat.test(lower)) return "JOB_SEARCH";
  }
  for (const kw of JOB_KEYWORDS) {
    if (lower.includes(kw)) return "JOB_SEARCH";
  }

  // Housing search
  for (const pat of HOUSING_PATTERNS) {
    if (pat.test(lower)) return "HOUSING_SEARCH";
  }
  for (const kw of HOUSING_KEYWORDS) {
    if (lower.includes(kw)) return "HOUSING_SEARCH";
  }

  // Smart guide
  for (const pat of SMART_GUIDE_PATTERNS) {
    if (pat.test(lower)) return "SMART_GUIDE_REDIRECT";
  }

  // Premium
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

  const stopWords = new Set(["die", "der", "das", "und", "oder", "für", "von", "wie", "was", "ist", "ein", "the", "and", "for", "gdje", "kako", "sta", "koji"]);
  const terms = query.toLowerCase().replace(/[?!.,;:"""„'']/g, " ").split(/\s+/).filter((w) => w.length >= 3 && !stopWords.has(w));
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
    if (r.google_rating) parts.push(`⭐ ${r.google_rating}`);
    if (r.website) parts.push(`Web: ${r.website}`);
    if (r.google_maps_url) parts.push(`[Maps](${r.google_maps_url})`);
    return parts.join("\n");
  }).join("\n\n---\n\n");
}

// ── GUIDE SLUG MAPPING ──

const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld", kinderzuschlag: "kinderzuschlag", elterngeld: "elterngeld",
  mutterschutz: "mutterschaftsgeld", mutterschaftsgeld: "mutterschaftsgeld",
  unterhalt: "unterhaltsvorschuss", bürgergeld: "buergergeld", burgergeld: "buergergeld",
  wohngeld: "wohngeld", bafög: "bafoeg", bafoeg: "bafoeg", sozialhilfe: "sozialhilfe",
  krankengeld: "krankengeld", führungszeugnis: "fuehrungszeugnis",
  anmeldung: "anmeldung", wbs: "wbs", arbeitslosengeld: "arbeitslosengeld",
  kurzarbeitergeld: "kurzarbeitergeld", bildungsgutschein: "bildungsgutschein",
  integrationskurs: "integrationskurs", kirchenaustritt: "kirchenaustritt",
  heizkostenzuschuss: "heizkostenzuschuss",
  steuerklasse: "steuerklassenwechsel", krankenkasse: "familienversicherung",
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
    "dječji dodatak": "kindergeld", "djecji dodatak": "kindergeld",
    "prijava adrese": "anmeldung", "roditeljski novac": "elterngeld",
    "socijalna pomoć": "sozialhilfe", "pomoć za stan": "wohngeld",
    
    "alimentacija": "unterhaltsvorschuss",
  };
  for (const [alias, slug] of Object.entries(aliases)) {
    if (lower.includes(alias)) return FORM_CATALOG.find(f => f.slug === slug) || null;
  }
  return null;
}

// ── SYSTEM PROMPT ──

function buildSystemPrompt(isPremium: boolean, language: string, dbResults: any[], pageContext: string): string {
  const langName = LANG_NAMES[language] || "Deutsch";

  if (dbResults.length > 0) {
    return `Ti si BalkanLink Asistent. Odgovaraj na: ${langName}.

Korisnik traži lokalni biznis. Koristi SAMO podatke iz baze:
${formatDbResults(dbResults)}

Format: ime, adresa, kontakt. Završi sa "Treba li ti još nešto?"`;
  }

  return `Ti si BalkanLink Asistent — centralni digitalni vodič za Balkance u Njemačkoj.
Odgovaraj ISKLJUČIVO na: ${langName}.

${SITE_CONTENT_INDEX}

FORMULARI:
${buildFormCatalogContext()}

PRAVILA ODGOVARANJA:
1. STRUKTURA svakog odgovora:
   - **Šta je**: Kratko objašnjenje (1-2 rečenice)
   - **Koraci**: Konkretni koraci (numerisana lista)
   - **⚠️ Česte greške** (opciono, samo ako je relevantno)
   - **👉 Sljedeći korak**: CTA sa linkom na BalkanLink stranicu

2. KRATAK odgovor: 2-4 pasusa max.
3. Uključi [FORM:slug] kad je tema o formularu.
4. Uključi Markdown link na relevantnu stranicu (npr. [Pogledaj](/premium)).
5. Max 2 linka po odgovoru.
6. Završi sa "Treba li ti još nešto?"
7. NE izmišljaj sadržaj. Koristi samo BalkanLink stranice.
8. Za "koji formulari postoje" prikaži top 5 sa [FORM:slug].

PRETRAGA POSLOVA I STANOVA:
- Ako korisnik traži posao → uputi na /stellenangebote sa objašnjenjem da može koristiti pametne filtere.
- Ako korisnik traži stan → uputi na /wohnungen sa objašnjenjem da može koristiti pametne filtere.
- Objasni kratko kako filteri rade (grad, branša, udaljenost itd.)

PREMIUM LOGIKA:
${!isPremium ? `FREE korisnik:
- OBJASNI temu, daj orijentaciju i korake
- Za polje-po-polje popunjavanje formulara → uputi na Smart Guide: "Za tačno popunjavanje koristi [Smart Guide](/guide/slug)"
- Za dokumente daj preview (3 reda) + uputi na Premium
- NIKAD ne popunjaj formulare kompletno` : `PREMIUM korisnik:
- Puni pristup Smart Guide i generisanju dokumenata
- Detaljnija pomoć i personalizovani savjeti`}

NAVIGACIJA:
- Aktivno koristi linkove na BalkanLink stranice
- Svaki odgovor treba imati barem jedan interni link
- Koristi [Pogledaj stranicu](/putanja) format
- Na kraju svakog odgovora gdje je relevantno dodaj:
  "👉 Pogledaj: [naziv]" gdje naziv odgovara temi:
  - Pitanje o Kindergeld → "👉 Pogledaj: [Kindergeld vodič](/guide/kindergeld)"
  - Pitanje o vizi/aufenthaltstitel/produženju → "👉 Pogledaj: [Viza Navigator](/formulari/aufenthaltstitel)"
  - Pitanje o dolasku → "👉 Pogledaj: [Dolazak u Njemačku](/nach-deutschland)"
  - Pitanje o cijeni/premiumu → "👉 Pogledaj: [Paketi i opcije](/paketi)"
  - Pitanje o dokumentu koji ne razumije → "👉 Pogledaj: [Dokumenten-Check](/dokumenten-check)"
  - Pitanje o učenju njemačkog → "👉 Pogledaj: [BalkanLink Deutsch](/deutsch-trainer)"

${pageContext ? `KONTEKST STRANICE:\n${pageContext}\nPrilagodi odgovor kontekstu stranice na kojoj se korisnik nalazi.\n` : ""}

PRAVNA SIGURNOST — ZABRANJENI ODGOVORI:
- Azilni postupci i deportacije → "Za ovo pitanje moraš kontaktirati pravnog savjetnika ili Caritas."
- Rad na crno ili utaja poreza → "Ovo nije nešto o čemu mogu razgovarati."
- Konkretni pravni savjeti za individualne slučajeve → "Za tvoj specifičan slučaj trebas pravnog savjetnika."
- Medicinski savjeti → "Konsultuj doktora."
- NIKAD koristi "imaš pravo na X" → uvijek "možeš imati pravo na X"
- NIKAD garantuj iznose naknada → uvijek "procijenjeno" ili "orijentaciono"
- Na kraju osjetljivih odgovora UVIJEK dodaj: "⚠️ Ovo je orijentaciona informacija — za tvoj konkretni slučaj provjeri s nadležnom ustanovom."

FOLLOW-UP SUGESTIJE:
Na kraju SVAKOG odgovora dodaj JSON blok (koji NEĆE biti prikazan korisniku):
{"suggestions": ["pitanje1", "pitanje2", "pitanje3"]}
Generiši 2-3 relevantna follow-up pitanja na osnovu konteksta razgovora.`;
}

// ── Gate messages ──

const PREMIUM_GATE: Record<string, { teaser: string; cta: string }> = {
  bs: { teaser: "Ova funkcija zahtijeva Premium: popunjavanje formulara i personalizirana pomoć.", cta: "Za opće pitanje — pitaj slobodno, odgovorićemo besplatno!" },
  de: { teaser: "Diese Funktion erfordert Premium: Formularhilfe und persönliche Beratung.", cta: "Stellen Sie gerne eine allgemeine Frage — kostenlos!" },
  en: { teaser: "This feature requires Premium: form filling and personalized assistance.", cta: "Feel free to ask a general question — it's free!" },
};

const SMART_GUIDE_MSG: Record<string, { text: string; label: string }> = {
  bs: { text: "Za detaljno popunjavanje formulara koristi Smart Guide — interaktivni vodič korak po korak.", label: "Otvori Smart Guide" },
  de: { text: "Für das detaillierte Ausfüllen nutzen Sie unseren Smart Guide.", label: "Smart Guide öffnen" },
  en: { text: "For detailed form filling, use our Smart Guide — step-by-step.", label: "Open Smart Guide" },
};

const JOB_SEARCH_MSG: Record<string, { text: string; label: string }> = {
  bs: {
    text: 'BalkanLink ima **pametnu pretragu poslova** koja ti generise direktne linkove na najvece portale u Njemackoj.\n\n**Kako funkcionise:**\n1. Unesi grad i bransu\n2. Odaberi dodatne filtere (bez njemackog, sa smjestajem...)\n3. Klikni "Trazi poslove"\n4. Dobij gotove pretrage za Indeed, StepStone, Bundesagentur i druge\n\n[Otvori pretragu poslova](/stellenangebote)',
    label: "Otvori pretragu poslova",
  },
  de: {
    text: 'BalkanLink bietet eine **intelligente Jobsuche**, die direkte Suchlinks zu den groessten Portalen generiert.\n\n**So funktioniert es:**\n1. Stadt und Branche eingeben\n2. Zusaetzliche Filter waehlen\n3. "Jobs suchen" klicken\n4. Fertige Suchen fuer Indeed, StepStone u.a. erhalten\n\n[Jobsuche oeffnen](/stellenangebote)',
    label: "Jobsuche oeffnen",
  },
  en: {
    text: 'BalkanLink offers a **smart job search** that generates direct search links to major German job portals.\n\n**How it works:**\n1. Enter city and industry\n2. Select additional filters\n3. Click "Search jobs"\n4. Get ready-made searches for Indeed, StepStone, and more\n\n[Open job search](/stellenangebote)',
    label: "Open job search",
  },
};

const HOUSING_SEARCH_MSG: Record<string, { text: string; label: string }> = {
  bs: {
    text: 'BalkanLink ima **pametnu pretragu stanova** koja ti generise direktne linkove na najvece portale.\n\n**Kako funkcionise:**\n1. Unesi grad i maksimalnu cijenu\n2. Odaberi tip (stan ili WG/soba)\n3. Oznaci filtere (bez provizije, namjesteno...)\n4. Dobij gotove pretrage za ImmobilienScout24, Immowelt i druge\n\n[Otvori pretragu stanova](/wohnungen)',
    label: "Otvori pretragu stanova",
  },
  de: {
    text: 'BalkanLink bietet eine **intelligente Wohnungssuche**, die direkte Suchlinks zu grossen Portalen generiert.\n\n**So funktioniert es:**\n1. Stadt und Maximalmiete eingeben\n2. Typ waehlen (Wohnung oder WG)\n3. Filter setzen (provisionsfrei, moebliert...)\n4. Fertige Suchen fuer ImmobilienScout24, Immowelt u.a. erhalten\n\n[Wohnungssuche oeffnen](/wohnungen)',
    label: "Wohnungssuche oeffnen",
  },
  en: {
    text: 'BalkanLink offers a **smart housing search** that generates direct search links to major portals.\n\n**How it works:**\n1. Enter city and max rent\n2. Select type (apartment or shared room)\n3. Set filters (no commission, furnished...)\n4. Get ready-made searches for ImmobilienScout24, Immowelt, and more\n\n[Open housing search](/wohnungen)',
    label: "Open housing search",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, isPremium, language, currentPage } = await req.json();
    const pageContext = currentPage ? `Korisnik se trenutno nalazi na stranici: ${currentPage}` : "";
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    const userText = lastUserMsg?.content || "";

    const intent = classifyIntent(userText);
    const guideSlug = detectGuideSlug(userText);
    const detectedForm = detectFormFromCatalog(userText);
    const siteTopics = detectSiteTopics(userText);
    const lang = ["bs", "hr", "sr", "me"].includes(language) ? "bs" : language === "de" ? "de" : "en";

    // Job search redirect — instant
    if (intent === "JOB_SEARCH") {
      const msg = JOB_SEARCH_MSG[lang] || JOB_SEARCH_MSG["bs"];
      return new Response(
        JSON.stringify({
          search_redirect: true,
          search_type: "job",
          content: msg.text,
          redirect_url: "/stellenangebote",
          redirect_label: msg.label,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Housing search redirect — instant
    if (intent === "HOUSING_SEARCH") {
      const msg = HOUSING_SEARCH_MSG[lang] || HOUSING_SEARCH_MSG["bs"];
      return new Response(
        JSON.stringify({
          search_redirect: true,
          search_type: "housing",
          content: msg.text,
          redirect_url: "/wohnungen",
          redirect_label: msg.label,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Smart Guide redirect — instant
    if (intent === "SMART_GUIDE_REDIRECT") {
      const sg = SMART_GUIDE_MSG[lang] || SMART_GUIDE_MSG["bs"];
      const slug = guideSlug || detectedForm?.slug || "kindergeld";
      const link = `/guide/${slug}`;
      return new Response(
        JSON.stringify({ smart_guide_redirect: true, content: `${sg.text}\n\n👉 [${sg.label}](${link})`, guideSlug: slug, detectedForm }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Premium gate — instant
    if (intent === "PREMIUM_REQUIRED" && !isPremium) {
      const gate = PREMIUM_GATE[lang] || PREMIUM_GATE["bs"];
      return new Response(
        JSON.stringify({ premium_required: true, teaser: gate.teaser, cta: gate.cta, detectedForm, guideSlug }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // DB search
    const dbResults = await searchDatabase(userText);
    const systemPrompt = buildSystemPrompt(isPremium, language || "de", dbResults, pageContext);

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
          stream: true,
          max_tokens: 600,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Previše zahtjeva. Pokušaj ponovo." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Nedovoljno kredita. Pokušaj kasnije." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: "Greška. Pokušaj ponovo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const extraHeaders: Record<string, string> = { ...corsHeaders, "Content-Type": "text/event-stream" };
    if (guideSlug) extraHeaders["X-Guide-Slug"] = guideSlug;
    if (detectedForm) extraHeaders["X-Form-Slug"] = detectedForm.slug;
    if (siteTopics.length > 0) {
      extraHeaders["X-Site-Topics"] = JSON.stringify(siteTopics.map(t => ({ url: t.url, label: t.label })));
    }

    return new Response(response.body, { headers: extraHeaders });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Greška" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
