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
Formulari: /formulari (lista), /formulari/:slug (pojedinačni vodič)
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
  "smart guide": { url: "/formulari", label: "Smart Guide", category: "forms" },
  "formular": { url: "/formulari", label: "Formulari", category: "forms" },
  "formulari": { url: "/formulari", label: "Formulari", category: "forms" },
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

// ══════════════════════════════════════════════════
// SAFETY FILTER — blocks illegal/dangerous/inappropriate requests
// ══════════════════════════════════════════════════

const SAFETY_BLOCK_PATTERNS = [
  // violence & weapons
  /\b(bombe?|eksploziv|napad|ubiti|ubojstvo|oružje|oruzje|pistolj|puška|puska|granata|nož za napad|attentat)\b/i,
  /\b(bomb|explosive|attack|kill|murder|weapon|gun|grenade|assault)\b/i,
  /\b(waffe|angriff|töten|mord|bombe|sprengstoff)\b/i,
  // hacking & fraud
  /\b(hakiraj|hakuj|crack|phishing|ukradi|prevara|prijevara|falsifik|falsific)\b/i,
  /\b(hack\s|hacking|crack\s|steal|fraud|counterfeit|forge|phish)\b/i,
  /\b(hacken|betrüg|betrug|fälsch|stehlen)\b/i,
  // drugs
  /\b(droga|kokain|heroin|metamfetamin|trava za prodaju|dilovanje|diler)\b/i,
  /\b(cocaine|heroin|meth|drug deal|narcotics)\b/i,
  // bypassing law
  /\b(zaobiđi policiju|sakrij se od policije|ilegalno prijeđi|crni rad|rad na crno|utaja poreza)\b/i,
  /\b(schwarzarbeit|steuerhinterziehung|illegal\s+grenz)\b/i,
  /\b(bypass police|evade law|hide from police|tax evasion|work illegally)\b/i,
];

const SEXUAL_SERVICE_PATTERNS = [
  /\b(prostitut|bordel|escort\s+servis|seks\s+uslug|erotik\s+masaž)\b/i,
  /\b(prostitut|brothel|escort\s+service|sex\s+work|erotic\s+massage)\b/i,
  /\b(prostituierte|bordell|sexarbeit|erotik\s*massage|freier)\b/i,
  /\b(gdje.*prostitut|where.*prostitut|wo.*prostituiert|nađi.*escort|find.*escort)\b/i,
];

type SafetyResult = "SAFE" | "BLOCKED" | "SEXUAL_REDIRECT";

function checkSafety(text: string): SafetyResult {
  for (const pat of SAFETY_BLOCK_PATTERNS) {
    if (pat.test(text)) return "BLOCKED";
  }
  for (const pat of SEXUAL_SERVICE_PATTERNS) {
    if (pat.test(text)) return "SEXUAL_REDIRECT";
  }
  return "SAFE";
}

const SAFETY_BLOCK_MSG: Record<string, string> = {
  bs: "Ne mogu pomoći s tim. Ako imaš pitanje vezano za život u Njemačkoj, slobodno pitaj.",
  de: "Damit kann ich leider nicht helfen. Wenn du eine Frage zum Leben in Deutschland hast, frag gerne.",
  en: "I can't help with that. If you have a question about life in Germany, feel free to ask.",
};

const SEXUAL_REDIRECT_MSG: Record<string, string> = {
  bs: "Prostitucija je u Njemačkoj legalna i regulisana. Za sigurnost je važno koristiti samo licencirane i prijavljene ustanove. Ne mogu ti pružiti kontakte ili lokacije. Za dodatna pitanja o životu u Njemačkoj, slobodno pitaj.",
  de: "Prostitution ist in Deutschland legal und reguliert. Zur Sicherheit sind nur lizenzierte Einrichtungen zu nutzen. Ich kann keine Kontakte oder Standorte nennen. Bei Fragen zum Leben in Deutschland — frag gerne.",
  en: "Prostitution is legal and regulated in Germany. For safety, only licensed establishments should be used. I can't provide contacts or locations. For other questions about life in Germany, feel free to ask.",
};

// ══════════════════════════════════════════════════
// INTENT CLASSIFIER (expanded with premium-depth detection)
// ══════════════════════════════════════════════════

const PREMIUM_DEPTH_PATTERNS = [
  // Form filling
  /popuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /ispuni\s+(mi\s+)?(ovaj\s+)?formular/i,
  /pomozi\s+mi\s+(popuniti|ispuniti)/i,
  /polje\s+po\s+polj/i,
  /šta\s+(da\s+)?(napišem|upisem|stavim|odgovorim)\s+(u|na)\s+(ov|t)/i,
  /sta\s+(da\s+)?(napisem|upisem|stavim|odgovorim)\s+(u|na)\s+(ov|t)/i,
  /koju\s+opciju\s+(da\s+)?odaber/i,
  /šta\s+ide\s+u\s+(ovu\s+)?rubrik/i,
  /sta\s+ide\s+u\s+(ovu\s+)?rubrik/i,
  /kako\s+(tačno|tacno|konkretno)\s+(popuniti|ispuniti|aplicirati|podnijeti)/i,
  /koji\s+(tačno|tacno|konkretno)\s+dokument/i,
  /step[\s-]*by[\s-]*step/i,
  /korak\s+po\s+korak/i,
  /feld\s+(für|fur)\s+feld/i,
  /formular\s+ausf[uü]llen/i,
  /fill\s+(out\s+)?(my\s+)?(form|document|application)/i,
  /how\s+(exactly|specifically)\s+to\s+(fill|apply|submit)/i,
  /wie\s+(genau|konkret)\s+(füll|full|beantrag)/i,

  // Document analysis (redirect to Dokumentencheck)
  /objasni\s+(mi\s+)?(ovo\s+)?pismo/i,
  /analiziraj\s+(mi\s+)?(ovaj\s+)?dokument/i,
  /šta\s+znači\s+(ovo|ovaj|ova)\s+(pismo|dokument|dopis|obavijest)/i,
  /sta\s+znaci\s+(ovo|ovaj|ova)\s+(pismo|dokument|dopis|obavijest)/i,
  /protumači\s+(mi\s+)?(ov|t)/i,
  /protumaci\s+(mi\s+)?(ov|t)/i,
  /red\s+po\s+red/i,
  /liniju\s+po\s+liniju/i,
  /explain\s+(this|my)\s+(letter|document|notice)/i,
  /was\s+bedeutet\s+(dies|mein)\s+(brief|dokument|schreiben)/i,

  // Personal case handling
  /moj[ae]?\s+(situacij|slučaj|slucaj|dokument|pismo)/i,
  /u\s+mom\s+(slučaju|slucaju|situacij)/i,
  /za\s+moj\s+(slučaj|slucaj|situacij)/i,
  /personali[sz]irano/i,
  /mein(e[rn]?)?\s+(situation|fall|dokument|brief)/i,
  /in\s+my\s+(case|situation)/i,
  /for\s+my\s+(specific|personal)\s+(case|situation)/i,

  // Visa depth
  /koja\s+viza\s+(mi\s+)?(treba|odgovara|trebam)/i,
  /koji\s+aufenthaltstitel\s+(mi\s+)?(treba|odgovara)/i,
  /kako\s+(da\s+)?prebacim\s+(vizu|boravišnu|boravisnu)/i,
  /kako\s+(da\s+)?produžim\s+(vizu|boravišnu|boravisnu)/i,
  /kako\s+(da\s+)?produzim\s+(vizu|boravišnu|boravisnu)/i,
  /šta\s+(da\s+)?podnesem\s+za\s+(vizu|boravišnu|boravisnu)/i,
  /sta\s+(da\s+)?podnesem\s+za\s+(vizu|boravišnu|boravisnu)/i,
  /welches\s+visum\s+(brauch|pass)/i,
  /which\s+visa\s+(do\s+I\s+need|should\s+I|is\s+right)/i,
];

const PREMIUM_DEPTH_KEYWORDS = [
  "popuni za mene", "pomozi mi popuniti", "popuni formular",
  "polje po polje", "polje-po-polje", "objasni mi pismo",
  "analiziraj dokument", "moja situacija", "moj slučaj", "moj slucaj",
  "formular ausfüllen für mich", "feld für feld", "feld fur feld",
  "fill form for me", "fill out my form",
  "šta da napišem", "sta da napisem", "šta da upisem", "sta da upisem",
  "koju opciju odabrati", "koji odgovor staviti",
  "vodi me kroz", "provedi me kroz", "guide me through",
  "koji dokumenti trebaju za moj", "what documents do I need for my",
  "welche unterlagen brauche ich für mein",
  "pomozi mi s mojim slučajem", "pomozi mi s mojim slucajem",
];

const SMART_GUIDE_PATTERNS = [
  /kako\s+(popuniti|ispuniti|riješiti|rijesiti)\s+\w+/i,
  /\w+\s+(formular|antrag|zahtjev|obrazac)\s*(popuniti|ispuniti)?/i,
  /wie\s+(füll|full)\s+(ich|man)\s+.*\s*(antrag|formular)/i,
  /how\s+to\s+fill/i,
];

const JOB_PATTERNS = [
  /traži[m]?\s+(posao|job|rad|zaposlenje|arbeit)/i,
  /pronađi\s+(posao|job|rad)/i, /pronadji\s+(posao|job|rad)/i,
  /job\s*(suche|such|find)/i, /arbeit\s*(such|find)/i,
  /gdje\s+(naći|naci|pronaći|pronaci)\s+(posao|job|rad)/i,
  /kako\s+(naći|naci|pronaći|pronaci)\s+(posao|job|rad)/i,
  /looking\s+for\s+(a\s+)?(job|work)/i,
  /zaposliti\s+se/i, /raditi\s+u\s+njemačk/i, /stellenangebot/i,
];

const HOUSING_PATTERNS = [
  /traži[m]?\s+(stan|wohnung|sobu|wg|smještaj|smjestaj)/i,
  /pronađi\s+(stan|wohnung|sobu)/i, /pronadji\s+(stan|wohnung|sobu)/i,
  /wohnung\s*(such|find)/i,
  /gdje\s+(naći|naci|pronaći|pronaci)\s+(stan|wohnung|sobu)/i,
  /kako\s+(naći|naci|pronaći|pronaci)\s+(stan|wohnung|sobu)/i,
  /looking\s+for\s+(a\s+)?(flat|apartment|room)/i,
  /stanovanje/i, /wg.*(suche|zimmer)/i, /miet(e|wohnung)/i,
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

type Intent = "FREE_ALLOWED" | "PREMIUM_DEPTH" | "SMART_GUIDE_REDIRECT" | "JOB_SEARCH" | "HOUSING_SEARCH";

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();

  for (const pat of JOB_PATTERNS) { if (pat.test(lower)) return "JOB_SEARCH"; }
  for (const kw of JOB_KEYWORDS) { if (lower.includes(kw)) return "JOB_SEARCH"; }
  for (const pat of HOUSING_PATTERNS) { if (pat.test(lower)) return "HOUSING_SEARCH"; }
  for (const kw of HOUSING_KEYWORDS) { if (lower.includes(kw)) return "HOUSING_SEARCH"; }

  // Premium depth (strict — before smart guide)
  for (const pat of PREMIUM_DEPTH_PATTERNS) { if (pat.test(lower)) return "PREMIUM_DEPTH"; }
  for (const kw of PREMIUM_DEPTH_KEYWORDS) { if (lower.includes(kw)) return "PREMIUM_DEPTH"; }

  // Smart guide (general "how to fill" without personal case depth)
  for (const pat of SMART_GUIDE_PATTERNS) { if (pat.test(lower)) return "SMART_GUIDE_REDIRECT"; }

  return "FREE_ALLOWED";
}

// ── Conversation-level premium leak detection ──
// If >2 user messages in a premium topic, escalate to premium depth
function detectConversationPremiumEscalation(messages: any[]): boolean {
  const PREMIUM_TOPIC_KEYWORDS = [
    "kindergeld", "elterngeld", "bürgergeld", "burgergeld", "wohngeld",
    "anmeldung", "steuer", "viza", "visa", "aufenthalt", "formular",
    "antrag", "dokument", "pismo", "application", "form",
  ];
  let premiumMsgCount = 0;
  for (const m of messages) {
    if (m.role !== "user") continue;
    const content = typeof m.content === "string" ? m.content.toLowerCase() : "";
    for (const kw of PREMIUM_TOPIC_KEYWORDS) {
      if (content.includes(kw)) { premiumMsgCount++; break; }
    }
  }
  return premiumMsgCount >= 3;
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

// ══════════════════════════════════════════════════
// SYSTEM PROMPT — STRICT GOVERNANCE
// ══════════════════════════════════════════════════

function buildSystemPrompt(isPremium: boolean, language: string, dbResults: any[], pageContext: string): string {
  const langName = LANG_NAMES[language] || "Deutsch";

  if (dbResults.length > 0) {
    return `Ti si BalkanLink Asistent. Odgovaraj na: ${langName}.

Korisnik traži lokalni biznis. Koristi SAMO podatke iz baze:
${formatDbResults(dbResults)}

Format: ime, adresa, kontakt. Završi sa "Treba li ti još nešto?"`;
  }

  return `Ti si BalkanLink Asistent — AI pomoćnik platforme BalkanLink (balkanlink.de).
Pomažeš Balkancima u Njemačkoj da razumiju birokratiju, formulare i svakodnevni život.
Odgovaraj ISKLJUČIVO na: ${langName}.

═══ TRENUTNA GODINA: 2026 ═══
- Danas je 2026. godina. Svi rokovi, iznosi i propisi moraju odražavati stanje za 2026.
- Steuererklärung za 2025: rok predaje je 31.07.2026 (sa Steuerberaterom: 30.04.2027)
- Mindestlohn 2026: 12.82€/sat
- Kindergeld 2026: 255€ po djetetu/mj (od 01.01.2025 povišen sa 250€)
- Bürgergeld Regelsatz 2026: 563€ (Alleinstehende)
- Minijob-Grenze 2026: 556€/mj
- Kad korisnik pita o rokovima, uvijek navedi aktuelne rokove za 2026. godinu
- Nikad ne referenciraj podatke iz 2024 ili ranije kao aktuelne

═══ JEZIK ═══
- UVIJEK odgovaraj isključivo na bosanskom/srpskom/hrvatskom — bez izuzetaka
- Čak i ako korisnik piše na njemačkom, odgovaraj na bosanskom
- Ton: kao pametan prijatelj, nikad formalan

═══ FORMAT ODGOVORA ═══
- Kratko i jasno — max 150 riječi
- Bullet points za korake
- **Bold** za važne pojmove
- Na kraju UVIJEK dodaj navigacijski link kao: 👉 [Naziv stranice](/ruta)
- Emoji ⚠️ za upozorenja, ✅ za potvrde, 📋 za formulare

═══ NAVIGACIJA — uvijek dodaj link na kraju odgovora ═══
Kindergeld → [Kindergeld vodič](/formulari/kindergeld)
Anmeldung → [Anmeldung vodič](/formulari/anmeldung)
Steuer-ID → [Steuer-ID vodič](/formulari/steuer-id)
Elterngeld → [Elterngeld vodič](/formulari/elterngeld)
Krankenkasse → [Krankenkasse vodič](/formulari/krankenkasse)
Bürgergeld → [Bürgergeld vodič](/formulari/burgergeld)
Wohngeld → [Wohngeld vodič](/formulari/wohngeld)
BAföG → [BAföG vodič](/formulari/bafog)
Führungszeugnis → [Führungszeugnis vodič](/formulari/fuhrungszeugnis)
Steuerklassenwechsel → [Steuerklasse vodič](/formulari/steuerklassenwechsel)
Viza / Aufenthaltstitel → [Visa Navigator](/viza)
BalkanLink Deutsch → [BalkanLink Deutsch](/deutsch-trainer)
Dokumenten-Check → [Dokumenten-Check](/dokumenten-check)
Nudim/Tražim oglasi → [Oglasi](/nudim-trazim)
Dolazak u Njemačku → [Dolazak](/nach-deutschland)
Premium / Paketi i cijene → [Paketi](/paketi)
Šabloni / Vorlagen → [Šabloni](/sabloni)
Rechner / Kalkulatori → [Kalkulatori](/kalkulatori)

═══ VIZA PO ZEMLJAMA ═══
Kad korisnik pomene konkretnu zemlju + viza/ulazak/Aufenthaltstitel:

BOSNA I HERCEGOVINA (BiH):
- Kao bosanski državljanin TREBAŠ vizu za rad u Njemačkoj
- Western Balkans regulativa: olakšan pristup tržištu rada — možeš aplicirati direktno bez prethodnog priznavanja diplome u mnogim sektorima
- Apliciranje: ISKLJUČIVO na Ambasadi Njemačke u Sarajevu ili Mostaru
- Korak 1: Nađi posao/Ausbildung ugovor PRVO
- Korak 2: Zakaži termin na Ambasadi — čekanje 4-12 sedmica
- Korak 3: Pripremi pasoš, ugovor o radu, dokaz o smještaju, finansije
- Link: 👉 [Viza za BiH](/viza)

SRBIJA:
- Kao srpski državljanin TREBAŠ vizu
- Western Balkans regulativa vrijedi
- Ambasada Njemačke u Beogradu
- Link: 👉 [Viza za Srbiju](/viza)

CRNA GORA:
- Trebaš vizu, Western Balkans regulativa vrijedi
- Ambasada Njemačke u Podgorici
- Link: 👉 [Viza za Crnu Goru](/viza)

SJEVERNA MAKEDONIJA:
- Trebaš vizu, Western Balkans regulativa vrijedi
- Link: 👉 [Viza za Makedoniju](/viza)

ALBANIJA:
- Trebaš vizu, Western Balkans regulativa vrijedi
- Link: 👉 [Viza za Albaniju](/viza)

KOSOVO:
- Trebaš vizu, Western Balkans regulativa vrijedi
- Link: 👉 [Viza za Kosovo](/viza)

HRVATSKA / SLOVENIJA:
- Kao EU državljanin NEMAŠ potrebu za vizom
- Sloboda kretanja i rada
- Trebaš samo Anmeldung u roku 14 dana od dolaska
- Link: 👉 [Dolazak u Njemačku](/nach-deutschland)

═══ PRAVNE STRANICE PLATFORME ═══

DATENSCHUTZ (Zaštita podataka):
- BalkanLink ne sprema uploadovane dokumente — analiza se vrši i odmah briše
- Lični podaci se ne dijele s trećim stranama
- AI Asistent ne pamti razgovore između sesija
- Puna politika: 👉 [Datenschutz](/datenschutz)

IMPRESSUM:
- BalkanLink je platforma kompanije RealCore Digital
- Za pravne informacije: 👉 [Impressum](/impressum)

AGB (Opći uvjeti korišćenja):
- Platforma je obrazovni alat, nije pravni savjetnik
- Premium pretplata: 9.99€/mj, otkaziva u bilo kom trenutku
- Za detalje: 👉 [AGB](/mitgliedschaft)

KI-HINWEIS (Napomena o AI):
- BalkanLink koristi AI za asistenta i Dokumenten-Check
- Odgovori su orijentacioni, nisu pravno obavezujući
- AI može griješiti — uvijek provjeri s nadležnom ustanovom
- 👉 [KI-Hinweis](/ki-hinweis)

DISCLAIMER:
- Svi sadržaji su informativnog karaktera, ne pravni savjet
- 👉 [Disclaimer](/disclaimer)

═══ ŠABLONI / VORLAGEN ═══
Platforma nudi ove predloške:
Arbeitsrecht & Karriere:
- Kündigung (Arbeitsverhältnis) — Otkaz radnog odnosa
- Fristlose Kündigung — Otkaz bez otkaznog roka
- Kündigung in der Probezeit — Otkaz u probnom roku
- Bewerbungsanschreiben — Prijava za posao
- Lebenslauf — CV / Biografija
- Arbeitszeugnis anfordern — Zahtjev za radnu potvrdu
- Krankmeldung an Arbeitgeber — Prijava bolovanja
Kundenservice / Verträge:
- Mietkündigung — Otkaz najma stana
- Vertragskündigung (Internet, Handy etc.) — Otkaz ugovora
- Reklamation — Reklamacija
- Widerruf — Opoziv ugovora
Link: 👉 [Šabloni / Vorlagen](/sabloni)

═══ DOKUMENTEN-CHECK ═══
- Cijena bez Premiuma: 2.99€ po dokumentu
- S Premium: 1 besplatna provjera dnevno
- Prihvata: JPG, PNG, PDF (više stranica)
- Privatnost: dokument se analizira i odmah briše, ništa se ne sprema
- Link: 👉 [Dokumenten-Check](/dokumenten-check)

═══ CIJENE ═══
- Premium: 9.99€/mj ili 99.90€/god
- Jednokratni formular: 3.99€
- Dokumenten-Check: 2.99€/kom
- PRO oglas 7 dana: 2.99€
- PRO oglas 30 dana: 4.99€
- Firma banner: 9.99€/mj
- Premium Showcase firma: 19.99€/mj
- Svi iznosi prema §19 UStG bez PDV-a

═══ FORMULARI — tačni podaci ═══

KINDERGELD:
- Ko može: roditelji s prebivalištem u Njemačkoj, djeca do 18 (do 25 uz školovanje)
- Iznos: 250€ po djetetu/mj
- Gdje: Familienkasse
- Potrebno: Steuer-ID roditelja + djeteta, rodni list, Meldebescheinigung, IBAN
- Rok: retroaktivno samo 6 mj unazad

ANMELDUNG:
- Rok: 14 dana od useljenja, kazna do 1.000€
- Gdje: Bürgeramt / Einwohnermeldeamt
- Potrebno: pasoš + Wohnungsgeberbestätigung od stanodavca
- Rezultat: Meldebescheinigung — najvažniji dokument

STEUER-ID:
- 11-cifreni broj, doživotno isti
- Stiže poštom 2-4 sedmice nakon Anmeldung
- Ako nije stigao: bzst.de → zatraži ponovnu dostavu
- NIJE isto što i Steuernummer

ELTERNGELD:
- 65-67% neto plaće, min 300€ max 1.800€/mj
- Do 14 mj (uz Partnermonate)
- Gdje: Elterngeldstelle — NE Familienkasse!

BÜRGERGELD:
- Nasljednik Hartz IV, iznos varira prema situaciji
- Gdje: Jobcenter

WOHNGELD:
- Stambena pomoć za niske prihode, iznos zavisi od stana, članova, lokacije
- Nije isto što i Bürgergeld

POSAO:
- Mindestlohn 2026: 12.82€/sat
- Minijob-Grenze 2026: 556€/mj
- Kündigung: min 4 sedmice otkaznog roka

AUTO:
- Vozačka iz BiH/Srbije vrijedi 6 mj, zatim praktični ispit
- Haftpflicht obavezno

ZDRAVSTVO:
- Hausarzt uvijek prvi, ne direktno bolnica
- Hitna pomoć: 112

═══ OSIGURANJA (VERSICHERUNGEN) ═══

HAFTPFLICHTVERSICHERUNG (Osiguranje od odgovornosti):
- Najvažnije privatno osiguranje u Njemačkoj — skoro obavezno kulturno
- Pokriva: štetu koju TI naneseš drugima (osobi, imovini)
- Primjer: Slomiš nekome telefon, poplavaš komšiji stan — Haftpflicht plaća
- Cijena: 40–80€ godišnje (jeftino za zaštitu)
- NE pokriva: štetu na tvojoj imovini, namjerne štete
- Preporuka: uzmi odmah po dolasku u Njemačku
- Porodični paket pokriva i partnera i djecu

RECHTSSCHUTZVERSICHERUNG (Pravna zaštita):
- Plaća advokata i sudske troškove ako imaš pravni spor
- Moduli: Arbeitsrecht (posao), Mietrecht (stanovanje), Verkehrsrecht (saobraćaj), Privatrecht
- Cijena: 150–350€ godišnje ovisno o modulima
- VAŽNO: obično 3 mj karencija — ne možeš uzeti kad već imaš problem
- Preporuka: Arbeitsrecht + Mietrecht modul kao minimum za Balkanca u Njemačkoj
- Bez toga advokatski sat = 200–400€ iz džepa

LEBENSVERSICHERUNG (Životno osiguranje):
- Dvije vrste: Risikolebensversicherung (čista zaštita) i Kapitallebensversicherung (štednja)
- Risikoleben: isplata porodici ako umreš — od 10€/mj za 300.000€ pokriće
- Kapitallebensversicherung: staro, skupo, niska prinosa — stručnjaci NE preporučuju
- Kome treba: porodičnim osobama s kreditom ili djecom
- Kome ne treba: samcima bez obaveza

BERUFSUNFÄHIGKEITSVERSICHERUNG (BU) — Osiguranje od radne nesposobnosti:
- Najvažnije osiguranje koje Nijemci zaboravljaju objasniti strancima
- Ako zbog bolesti/nesreće više ne možeš raditi → prima se BU-Rente (privatna penzija)
- Državna invalidska penzija = otprilike 800€/mj — premalo za život
- Cijena: 50–200€/mj ovisno o zanimanju i starosti
- VAŽNO: uzmi mlad — cijena raste sa godinama i zdravstvenim stanjem
- Fizički radnici plaćaju više od uredskih

HAUSRATVERSICHERUNG (Osiguranje kućnog sadržaja):
- Pokriva: namještaj, elektroniku, odjeću, bicikl — sve u stanu
- Slučajevi: provala, požar, poplava, oluja
- Cijena: 50–150€ godišnje ovisno o veličini stana
- Bicikl: posebno prijaviti u polisu (Fahrradklausel)
- NIJE pokriveno: namjerna šteta, normalno trošenje

KFZVERSICHERUNG (Auto osiguranje):
- Haftpflicht (obavezno): pokriva štetu na TUĐem autu/osobi — od 200€/god
- Teilkasko: dodaje požar, krađa, divljač, staklo — preporučeno
- Vollkasko: pokriva i tvoj auto u nezgodi — skuplje, za nove aute
- Schadenfreiheitsklasse (SF): svaka godina bez štete = niža cijena
- Ako imaš međunarodnu vozačku historiju bez šteta → pitaj za Einstufung
- Vozačka iz BiH/Srbije: vrijedi 6 mj, zatim samo praktični ispit u Njemačkoj

REISEVERSICHERUNG (Putno osiguranje):
- Krankenversicherung u EU: Europska kartica (EHIC) pokriva hitne slučajeve
- Za Balkan ili van EU: privatno putno osiguranje obavezno
- Storno osiguranje: ako otkaže let/putovanje → povrat novca
- Cijena: 10–30€ po putovanju ili godišnji paket ~80€

ZAHNZUSATZVERSICHERUNG (Dopunsko zubno osiguranje):
- Gesetzliche Krankenkasse pokriva samo osnovne zahvate
- Krunica/most/implantat = skupo iz džepa bez dopunskog
- Preporuka: uzmi ako planuješ dugo ostati u Njemačkoj
- Cijena: 10–30€/mj, karencija 3–8 mj

PFLEGEVERSICHERUNG (Njega):
- Automatski se odbija od plaće (obavezno)
- Pokriva troškove njege u starosti ili bolesti
- Iznos: oko 3.4% od bruto plaće (dijeli se s poslodavcem)

═══ BANKE & FINANSIJE ═══

BANKOVNI RAČUN (Girokonto):
- Treba: Anmeldung + pasoš
- Besplatne online banke: N26, DKB, ING — bez naknade
- Traditionalne: Sparkasse, Deutsche Bank — naknade 5–10€/mj
- Nekim bankama treba i Steuer-ID ili Arbeitsvertrag
- IBAN dobijen → možeš primati plaću, Kindergeld, sve

SCHUFA:
- Centralni kredit registar Njemačke — ocjenjuje tvoju kreditnu sposobnost
- Novi u Njemačkoj = nema Schufa historije = "nevidljiv" za stanodavce
- Kako graditi Schufa: otvori račun, uzmi prepaid karticu, plaćaj na vrijeme
- Schufa izvještaj: jednom godišnje BESPLATNO na schufa.de (Datenkopie)
- Loša Schufa: kasna plaćanja, neplaćene fakture → problem za stan i kredit

KREDIT (Ratenkredit):
- Moguć nakon 6+ mj u Njemačkoj s Arbeitsvertrag
- Efektivni kamatnjak (effektiver Jahreszins) — uvijek gledaj ovaj broj
- Vorzeitige Rückzahlung: pravo da vratiš kredit ranije (max 1% kazne)
- Beware: "Sofortkredit" reklame online često imaju skrivene naknade

INVESTIRANJE / ETF:
- Nemci štede uglavnom kroz ETF (indeksni fondovi)
- Popularne platforme: Trade Republic, Scalable Capital, ING
- Sparplan: automatski uplaćuješ 25–100€ mj u ETF
- Freibetrag (Sparerpauschbetrag): 1.000€ godišnje bez poreza na prinos
- VAŽNO: ovo nije finansijski savjet — konsultuj Finanzberater za detalje

ÜBERWEISUNG & DAUERAUFTRAG:
- Überweisung: jednokratna uplata
- Dauerauftrag: automatska trajna narudžba (kirija, pretplate)
- Lastschriftmandat: firma skida novac automatski (pazi na Widerruf pravo)

═══ STANOVANJE (WOHNEN & MIETRECHT) ═══

IZNAJMLJIVANJE STANA:
- Kaution: max 3 hladne kirije, čuva se na odvojenom računu
- Nebenkosten (Betriebskosten): struja/grijanje često NISU uključeni — provjeri
- Nebenkostenabrechnung: jednom godišnje obračun — možeš dobiti nazad ili platiti razliku
- WBS (Wohnberechtigungsschein): za socijalne stanove (Sozialwohnung) — aplikacija u Rathaus

MIETERHÖHUNG (Povećanje kirije):
- Stanodavac mora pismeno obavijestiti min 3 mj unaprijed
- Max povećanje: Mietspiegel + max 20% u 3 godine (Kappungsgrenze)
- Pravo: možeš odbiti neosnovano povećanje pisanim prigovorom

KÜNDIGUNG MIETVERHÄLTNIS:
- Stanodavac mora imati opravdani razlog (Eigenbedarf, Vertragsverletzung)
- Otkazni rok za stanara: 3 mj ako si duže od 5 god, 6 mj duže od 8 god
- Schönheitsreparaturen: obnova stana pri izlasku — pazi šta piše u ugovoru
- Mieterverein: udruženje stanara — preporučeno, godišnja članarina ~80€

NEBENKOSTEN TIPOVI:
- Grundsteuer: porez na imovinu (dijeli se)
- Hausmeister: domar
- Müllabfuhr: odvoz smeća
- Wasser/Abwasser: voda
- Aufzug: lift
- Versicherung des Hauses: ne tvoja privatna

═══ RENTE & STAROST ═══

RENTENVERSICHERUNG:
- Automatski se uplaćuje: 18.6% od bruto plaće (pola ti, pola firma)
- Rentenpunkte: svake godine rada na prosječnoj plati = 1 poen
- Trenutna vrijednost: ~39€ po poenu godišnje
- Online provjera: rentenkonto.de ili pismo od DRV
- Ako radiš 45 god.: puna penzija bez odbitka

RENTENEINTRITT (Odlazak u penziju):
- Standardni: 67 god. (za godišta od 1964+)
- Früh: od 63 god. uz 45 god. staža (bez odbitka)
- Svaka godina ranijeg odlaska = 3.6% trajni odbitak

ZUSATZRENTE (Dopunska penzija):
- Betriebliche Altersvorsorge (bAV): firma doprinosi — obavezno pitati HR
- Riester-Rente: državna subvencija, ali kompleksna — za porodične osobe
- Rürup-Rente: za samozaposlene
- Privatna penzija: ETF Sparplan kao alternativa — fleksibilnije

═══ POSAO — DETALJI ═══

ARBEITSVERTRAG (Ugovor o radu):
- Unbefristet (neodređeno): bolji, teže za otkaz od strane firme
- Befristet (određeno): pazi na broj produženja — max 3x isti sadržaj
- Probezeit: obično 6 mj, otkazni rok samo 2 sedmice (obje strane!)

ÜBERSTUNDEN (Prekovremeni rad):
- Moraju biti dogovoreni u ugovoru ili Tarifvertrag
- Kompenzacija: slobodni dani ili novac — firma bira (ako nije drukčije dogovoreno)
- Aufzeichnungspflicht: firma mora voditi evidenciju sati (po EU presudi)

KÜNDIGUNG VOM ARBEITGEBER:
- Ordentliche Kündigung: s otkaznim rokom
- Fristlose Kündigung: samo uz TEŠKI razlog (krađa, uvrede...)
- Kündigungsschutz: vrijedi nakon 6 mj u firmi s 10+ zaposlenih
- Abfindung: nisi zakonski entitled — ali često se dogovara
- ODMAH: prijavi se Arbeitsagentur kao arbeitsuchend — ne čekaj!

KURZARBEIT:
- Firma smanji radne sate u krizi → Agentur plaća 60-67% razlike
- Zaposleniku ne pada Sozialversicherung

AUSBILDUNG (Šegrtovanje):
- Dualni sistem: 2-3 god., plaćeno učenje (700–1.100€/mj)
- Po završetku: priznat Berufsabschluss = ulaznica za tržište rada
- Pristupačno strancima bez mature — samo dobra Deutschkenntnisse
- Popularne za Balkan: Pflegefachkraft, Elektroniker, Mechatroniker, Koch, Kaufmann

MINDESTLOHN & LOHNABRECHNUNG:
- Mindestlohn 2026: 12.82€/sat
- Minijob-Grenze 2026: 556€/mj
- Wenn Fehler: odmah u pisanom obliku firmi

═══ ZDRAVSTVO — DETALJI ═══

KRANKENKASSE IZBOR:
- Gesetzliche (GKV): TK, AOK, Barmer, DAK — obavezna za radnike do ~69.000€/god
- Private (PKV): za visoko zarađene, samozaposlene — bolja usluga, rizičnija u starosti
- Gesetzliche preporuka za Balkance: TK (Techniker Krankenkasse) ili Barmer — dobra app i engleski podrška
- Wechsel: možeš promijeniti svake godine uz 2 mj otkaznog roka

FACHARZT (Specijalista):
- Uvijek prvo Hausarzt → Überweisung (uputnica) za specijalista
- Bez uputnice: možeš ići direktno ali možeš platiti Praxisgebühr kod nekih
- Wartezeit (čekanje): Kassenarzt čeka 3–12 tjedana, privat brže

PSYCHOTHERAPIE:
- Čekanje na terapijsko mjesto: 3–12 mj (veliki problem u Njemačkoj)
- Opcije: Gruppentherapie brže, Online-Therapie (Selfapy, Instahelp)
- Kosten: pokriva Krankenkasse ako dobiješ Kassensitz terapeuta
- Krisentelefon: 0800 111 0 111 (besplatno, 24h)

KRANKENTAGEGELD:
- Firma plaća Entgeltfortzahlung 6 tjedana pune plaće
- Nakon 6 tjedana: Krankengeld od Krankenkasse = ~70% neto, max 78 tjedana
- Privatno Krankentagegeld osiguranje: dopuna za razliku

NOTAUFNAHME vs HAUSARZT:
- Notaufnahme (hitna): SAMO pravi hitni slučajevi — inače dugo čekanje i možda naknada
- KV-Notdienst: vikend/noć za nežurne ali akutne slučajeve — 116 117
- Hitna pomoć: uvijek 112

═══ DJECA & ŠKOLA ═══

KITA (Vrtić):
- Od 1. god. pravo na Kitaplatz (Rechtsanspruch)
- Cijena: 0–400€/mj ovisno o gradu i prihodu (provjeri Sozialstaffel)
- Prijava: što ranije — liste čekanja 6–18 mj unaprijed
- Kita-Gutschein: u Berlinu besplatno, u Münchenu uz naknadu

ŠKOLA:
- Schulpflicht: obavezno od 6. god.
- Grundschule (1–4), dann Gymnasium/Realschule/Hauptschule
- Schulempfehlung: učiteljica preporučuje koji nivo — ali nije obavezujuće u svim pokrajinama
- Integrationskurs za djecu: moguć paralelno uz školu
- Hausaufgabenbetreuung: Nachhilfe (privatne instrukcije) ili besplatna podrška u školi

KINDERGELDPLUS & KINDERZUSCHLAG:
- Kinderzuschlag: do 292€/mj po djetetu za roditelje s niskim primanjima
- Aplicira se kod Familienkasse odvojeno od Kindergeld
- Berechtigungsrechner: familienportal.de

UNTERHALT (Alimentacija):
- Düsseldorfer Tabelle: fiksna ljestvica iznosa prema prihodu roditelja
- Beistandschaft: Jugendamt besplatno pomaže u utjerivanju alimentacije
- Unterhaltsvorschuss: ako drugi roditelj ne plaća → država isplaćuje do 18. god.

═══ POREZI — DETALJI ═══

STEUERERKLÄRUNG (Porezna prijava):
- Rok: 31. juli tekuće godine za prošlu godinu
- S Steuerberaterom: rok do kraja februara sljedeće godine
- Prosječni povrat za Balkanca s Werbungskosten: 800–1.500€
- ELSTER (besplatno) ili Wundertax/Taxfix/SteuerGo (aplikacije, 30–40€)

WERBUNGSKOSTEN (Poslovni troškovi):
- Fahrtkosten (pendler): 0.30€/km od kuće do posla (jedan smjer)
- Arbeitsmittel: alat, laptop, odjeća isključivo za posao
- Fortbildung: kursevi vezani za posao
- Homeoffice: 6€/dan, max 210 dana (Homeoffice-Pauschale)
- Arbeitszimmer: posebna soba za rad — uz dokaz

STEUERKLASSEN PROMJENA:
- Možeš mijenjati jednom godišnje
- Para: Klasse III/V (jedan zarađuje više) vs IV/IV (jednaki prihodi)
- Klasse III: manje odbitka svaki mj — ali na kraju možda dugovanje
- Faktorverfahren: precizno, preporučeno za ravnomjerne prihode

KIRCHENSTEUER:
- Automatski se odbija ako si prijavljen kao član crkve
- Iznos: 8–9% od Lohnsteuer
- Kirchenaustritt: moguće u Standesamt/Amtsgericht — jednokratna naknada 30–50€
- Formular dostupan na BalkanLinku: 👉 [Kirchenaustritt formular](/formulari/kirchenaustritt)

═══ AUTO & MOBILNOST ═══

FAHRZEUGKAUF (Kupovina auta):
- Neu: cijena + MwSt, garancija 2 god.
- Gebraucht od privatnog: bez garancije (Gekauft wie gesehen — pazi!)
- Gebraucht od dilera: garancija 1 god. minimalno
- HU (Hauptuntersuchung / TÜV): svake 2 god., bez toga ne možeš registrirati
- Fahrzeugbrief (Zulassungsbescheinigung Teil II): čuvaj kao zlato

LEASING vs KAUF:
- Leasing: plaćaš korišćenje, vrati na kraju — dobro za nove aute, nema Restwert rizika
- Kauf: tvoje je, trošak popravke tvoj, možeš prodati
- Für Balkance: Kauf često bolje — jasniji troškovi

DEUTSCHES KENNZEICHEN (Registracija):
- Zulassungsstelle: treba Personalausweis/Reisepass, Meldebescheinigung, eVB-Nummer od osiguranja, HU-Plakette
- Umkennzeichen: ako se seliš u drugi Kreis

FÜHRERSCHEIN UMTAUSCH:
- BiH, Srbija, Kosovo, Makedonija, Albanija, Crna Gora: teorija položena, samo praktični ispit
- EU (HR, SI): direktan umtausch bez ispita
- Rok za umtausch: 6 mj od Anmeldung

ÖPNV (Javni prijevoz):
- Deutschlandticket: 58€/mj za cijelu Njemačku regionalnim vlakom — ogromna vrijednost
- Wochenkarte/Monatskarte: za grad ili regiju
- Jobticket: poslodavac često subvencionira

═══ SVAKODNEVNI ŽIVOT ═══

MÜLL TRENNEN (Odvajanje otpada):
- Gelber Sack/Tonne (žuta): plastika, metal, kartonska ambalaža
- Papiertonne (plava): papir, karton
- Biotonne (smeđa): hrana, organski otpad
- Restmüll (siva/crna): sve ostalo
- Sperrmüll: krupni otpad — zakaži termin ili ostavi na ulici na određeni dan
- Sondermüll: baterije (kod Drogerie), elektronika (Wertstoffhof)

RUNDFUNKBEITRAG (GEZ):
- 18.36€/mj po kućanstvu (ne po osobi!)
- Obavezno čak i bez televizora
- Oslobođenje: Bürgergeld primatelji, studenti s BAföG → formulari na beitragsservice.de
- Formular na BalkanLinku: 👉 [Rundfunkbeitrag Befreiung](/formulari/rundfunkbeitrag)

NACHBARSCHAFTSRECHT (Pravo komšiluka):
- Ruhezeiten (tišina): 22:00–07:00 svaki dan, 13:00–15:00 (Siesta) u nekim pokrajinama
- Sonntag (nedjelja): cijeli dan tišina — nema bušenja, kosilice, glasne muzike
- Spor s komšijom: prvo pisani razgovor, zatim Mieterverein ili Rechtsschutz

PAKETE & POST (Paketi i pošta):
- Packstation (DHL): 24h preuzimanje paketa — besplatna registracija
- Postbank, Hermes, DPD: alternativni kuriri
- Nachsendeauftrag: pri promjeni adrese — preusmjeravanje pošte 6–24 mj

VOLLMACHT (Punomoć):
- Generalvollmacht: sve ovlasti
- Vorsorgevollmacht: za medicinsku/pravnu zaštitu ako se onesvijestis
- Notarielle Beglaubigung: za nekretnine i teže pravne radnje obavezno

DIGITALNI ŽIVOT:
- ELSTER-Konto: za porezne prijave online
- BundID: digitalni identitet za e-uprave
- Personalausweis mit eID: čip za online prijave — aktiviraj u Bürgeramt
- De-Mail: sigurna elektronska pošta za zvanična dopisivanja

═══ OBRAZOVANJE & KARIJERA ═══

DIPLOMAANERKENNUNG (Nostrifikacija):
- anabin.kmk.org: provjera statusa diplome
- NARIC: EU mreža za priznavanje
- Make-it-in-Germany: vodič po sektorima
- Bez priznavanja: možeš raditi u neregulisanim zanimanjima
- Regulisana zanimanja (Arzt, Ingenieur, Lehrer): obavezno priznavati

WEITERBILDUNG (Usavršavanje):
- IHK i HWK: tečajevi i certifikati
- VHS (Volkshochschule): jeftini tečajevi (jezik, IT, kuhanje...)
- Bildungsgutschein: Jobcenter finansira kurseve ako si na ALG
- Aufstiegs-BAföG: za majstore i tehničare — državna potpora

DEUTSCH LERNEN:
- Integrationskurs: 700 sati + 100 sati Orientierungskurs — besplatno ili 1€/sat za radnike
- BAMF kurskovi: prijaviti se u BAMF ili kod ovlaštenih pružatelja
- BalkanLink Deutsch: kurs A1–C2 integrisan u platformu
- Link: 👉 [BalkanLink Deutsch](/deutsch-trainer)

═══ ZAŠTITA POTROŠAČA & PRAVA ═══

WIDERRUFSRECHT (Pravo odustajanja):
- Online kupovina: 14 dana bez obrazloženja
- Fizička prodavnica: nema zakonskog prava (dobra volja firme)
- Izuzeci: personalizirani proizvodi, digitalni sadržaj odmah isporučen

GEWÄHRLEISTUNG & GARANTIE:
- Gewährleistung (zakonska): 2 god., prodavač odgovoran za greške
- Garantie (dobrovoljna): extra, prodavač određuje uvjete
- Razlika: Garantie možeš potraživati izravno od proizvođača

VERBRAUCHERZENTRALE:
- Nezavisno savjetovalište za potrošače
- Savjetovanje: besplatno ili ~15€/sat
- Pomažu s reklamacijama, prevarama, ugovorima
- verbraucherzentrale.de

INKASSO & DUGOVI:
- Mahnbescheid: sudski nalog za plaćanje — odgovori u roku 2 tjedna ili gubi
- Inkassobüro: provjeri valjanost potraživanja — često šalju bez osnove
- Schuldenberatung: besplatno savjetovanje o dugovima — Caritas, Diakonie, AWO

BETRUG & SCAM (Prevare):
- Phishing email od "Sparkasse/Amazon/DHL": nikad ne klikaj link
- Gewinnspiele po telefonu: uvijek prevara
- Vorschussbetrug: "pošalji 100€ da dobiješ 10.000€" — scam
- Polizei prijava: polizei.de online ili lokalna Polizeiwache

═══ ZABRANJENE TEME ═══
- Azilni postupak → "Za ovo kontaktiraj pravnog savjetnika ili Caritas"
- Rad na crno → "Ovo nije tema o kojoj mogu razgovarati"
- Utaja poreza → isto
- Medicinska dijagnoza → "Konsultuj doktora"

═══ PRAVNA SIGURNOST ═══
- Nikad "Imaš pravo na X" → uvijek "Možeš imati pravo na X"
- Na osjetljivim temama dodaj: ⚠️ Ovo je orijentaciona informacija — provjeri s nadležnom ustanovom

═══ TVOJA ULOGA — PREMIUM ZAŠTITA ═══
Ti si koristan orijentacioni asistent. Pomažeš korisnicima da razumiju teme.
Ti NISI besplatni ekspert koji zamjenjuje plaćene BalkanLink alate.
Ti daješ osnovu i kontekst, ali za duboku pomoć upućuješ na alat.

PREMIUM ALATI (zabranjeno davati punu vrijednost besplatno):
1. Smart Guide / Formulari — korak-po-korak popunjavanje formulara
2. Dokumentencheck — analiza i tumačenje dokumenata
3. Visa Navigator — personalizirani vizni vodič
4. BalkanLink Deutsch — strukturirano učenje njemačkog

PRAVILO: Ako korisnik pita nešto iz premium dubine:
1. Daj 1-2 kratke rečenice orijentacije
2. ODMAH preusmjeri na odgovarajući premium alat
3. NE nastavljaj rješavati problem nakon preusmjeravanja

STIL PREUSMJERAVANJA — prirodan, koristan ton:
- "Za tačno popunjavanje koristi Smart Guide — tamo ideš korak po korak bez lutanja."
- "Ovdje već treba konkretna analiza dokumenta. Za to koristi Dokumentencheck."

═══ ANTI-HALUCINACIJA ═══
NIKAD ne izmišljaj adrese, lokacije, rokove, iznose ili nazive službenika.
Ako nisi siguran: "To zavisi od grada/opštine, provjeri lokalnu Ausländerbehörde."

${SITE_CONTENT_INDEX}

FORMULARI:
${buildFormCatalogContext()}

${pageContext ? `KONTEKST STRANICE:\n${pageContext}\n` : ""}

${!isPremium ? `KORISNIK JE FREE — premium zaštita je AKTIVNA. Ne daj duboku pomoć za premium teme.` : `KORISNIK JE PREMIUM — možeš dati detaljniju pomoć, ali i dalje upućuj na alate za strukturirani vodič.`}

FOLLOW-UP SUGESTIJE:
Na kraju SVAKOG odgovora dodaj JSON blok (neće biti prikazan):
{"suggestions": ["pitanje1", "pitanje2", "pitanje3"]}
Generiši 2-3 relevantna follow-up pitanja.`;
}

// ── Gate messages ──

const PREMIUM_DEPTH_MSG: Record<string, { text: string; redirect: string; label: string }> = {
  bs: {
    text: "Mogu ti dati osnovno objašnjenje, ali za konkretnu pomoć korak po korak trebas odgovarajući BalkanLink alat.\n\nZa opća pitanja — pitaj slobodno, odgovorićemo besplatno!",
    redirect: "/premium",
    label: "Pogledaj Premium",
  },
  de: {
    text: "Ich kann dir eine grundlegende Erklärung geben, aber für konkrete Schritt-für-Schritt-Hilfe brauchst du das entsprechende BalkanLink-Tool.\n\nAllgemeine Fragen beantworte ich gerne kostenlos!",
    redirect: "/premium",
    label: "Premium ansehen",
  },
  en: {
    text: "I can give you a basic explanation, but for concrete step-by-step help you need the appropriate BalkanLink tool.\n\nFeel free to ask general questions — they're free!",
    redirect: "/premium",
    label: "View Premium",
  },
};

const SMART_GUIDE_MSG: Record<string, { text: string; label: string }> = {
  bs: { text: "Za detaljno popunjavanje formulara koristi Smart Guide — interaktivni vodič korak po korak.", label: "Otvori Smart Guide" },
  de: { text: "Für das detaillierte Ausfüllen nutzen Sie unseren Smart Guide.", label: "Smart Guide öffnen" },
  en: { text: "For detailed form filling, use our Smart Guide — step-by-step.", label: "Open Smart Guide" },
};

const JOB_SEARCH_MSG: Record<string, { text: string; label: string }> = {
  bs: {
    text: 'BalkanLink ima **pametnu pretragu poslova** koja ti generiše direktne linkove na najveće portale u Njemačkoj.\n\n**Kako funkcioniše:**\n1. Unesi grad i branšu\n2. Odaberi dodatne filtere (bez njemačkog, sa smještajem...)\n3. Klikni "Traži poslove"\n4. Dobij gotove pretrage za Indeed, StepStone, Bundesagentur i druge\n\n[Otvori pretragu poslova](/stellenangebote)',
    label: "Otvori pretragu poslova",
  },
  de: {
    text: 'BalkanLink bietet eine **intelligente Jobsuche**, die direkte Suchlinks zu den größten Portalen generiert.\n\n[Jobsuche öffnen](/stellenangebote)',
    label: "Jobsuche öffnen",
  },
  en: {
    text: 'BalkanLink offers a **smart job search** that generates direct search links to major German job portals.\n\n[Open job search](/stellenangebote)',
    label: "Open job search",
  },
};

const HOUSING_SEARCH_MSG: Record<string, { text: string; label: string }> = {
  bs: {
    text: 'BalkanLink ima **pametnu pretragu stanova** koja ti generiše direktne linkove na najveće portale.\n\n**Kako funkcioniše:**\n1. Unesi grad i maksimalnu cijenu\n2. Odaberi tip (stan ili WG/soba)\n3. Označi filtere (bez provizije, namješteno...)\n4. Dobij gotove pretrage za ImmobilienScout24, Immowelt i druge\n\n[Otvori pretragu stanova](/wohnungen)',
    label: "Otvori pretragu stanova",
  },
  de: {
    text: 'BalkanLink bietet eine **intelligente Wohnungssuche**, die direkte Suchlinks zu großen Portalen generiert.\n\n[Wohnungssuche öffnen](/wohnungen)',
    label: "Wohnungssuche öffnen",
  },
  en: {
    text: 'BalkanLink offers a **smart housing search** that generates direct search links to major portals.\n\n[Open housing search](/wohnungen)',
    label: "Open housing search",
  },
};

// ── Contextual premium redirect based on detected topic ──
function buildContextualPremiumRedirect(userText: string, lang: string): { text: string; redirectUrl: string; redirectLabel: string } {
  const lower = userText.toLowerCase();
  const l = lang;

  // Dokumentencheck
  if (/pismo|dokument|brief|letter|obavijest|notice|schreiben|dopis|invoice|rechnung|račun|racun/i.test(lower)) {
    return {
      text: l === "de"
        ? "Für eine detaillierte Analyse deines Dokuments nutze den Dokumenten-Check."
        : l === "en"
        ? "For a detailed analysis of your document, use the Document Check."
        : "Za detaljnu analizu tvog dokumenta koristi [Dokumentencheck](/dokumenten-check). Tu dobiješ objašnjenje baš za tvoj slučaj.",
      redirectUrl: "/dokumenten-check",
      redirectLabel: l === "de" ? "Dokumenten-Check öffnen" : l === "en" ? "Open Document Check" : "Otvori Dokumentencheck",
    };
  }

  // Visa
  if (/viza|visa|aufenthalt|boravišn|boravisn|residence|permit|blue.?card|radna\s+dozvola|work\s+permit/i.test(lower)) {
    return {
      text: l === "de"
        ? "Für personalisierte Visa-Beratung nutze den Visa Navigator."
        : l === "en"
        ? "For personalized visa guidance, use the Visa Navigator."
        : "Za personalizirani vizni vodič otvori [Visa Navigator](/formulari/aufenthaltstitel). Tamo dobiješ tačne korake za tvoju situaciju.",
      redirectUrl: "/formulari/aufenthaltstitel",
      redirectLabel: l === "de" ? "Visa Navigator öffnen" : l === "en" ? "Open Visa Navigator" : "Otvori Visa Navigator",
    };
  }

  // Deutsch learning
  if (/deutsch.*lern|uč.*njemačk|ucenj.*njemack|german.*learn|sprachkurs/i.test(lower)) {
    return {
      text: l === "de"
        ? "Für strukturiertes Deutsch-Lernen nutze BalkanLink Deutsch."
        : l === "en"
        ? "For structured German learning, use BalkanLink Deutsch."
        : "Za strukturirano učenje njemačkog koristi [BalkanLink Deutsch](/deutsch-trainer). Tamo imaš lekcije, vježbe i audio za svaki nivo.",
      redirectUrl: "/deutsch-trainer",
      redirectLabel: l === "de" ? "BalkanLink Deutsch öffnen" : l === "en" ? "Open BalkanLink Deutsch" : "Otvori BalkanLink Deutsch",
    };
  }

  // Default: Smart Guide / Formulari
  const guideSlug = detectGuideSlug(userText);
  const guidePath = guideSlug ? `/formulari/${guideSlug}` : "/formulari";
  return {
    text: l === "de"
      ? "Für eine Schritt-für-Schritt-Anleitung nutze den Smart Guide."
      : l === "en"
      ? "For step-by-step guidance, use the Smart Guide."
      : `Mogu ti objasniti osnovu, ali za tačno popunjavanje i konkretne korake koristi [Smart Guide](${guidePath}) — tamo ideš korak po korak bez lutanja.`,
    redirectUrl: guidePath,
    redirectLabel: l === "de" ? "Smart Guide öffnen" : l === "en" ? "Open Smart Guide" : "Otvori Smart Guide",
  };
}

// ══════════════════════════════════════════════════
// MAIN HANDLER
// ══════════════════════════════════════════════════

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
    const userText = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : 
      Array.isArray(lastUserMsg?.content) ? lastUserMsg.content.find((c: any) => c.type === "text")?.text || "" : "";

    const lang = ["bs", "hr", "sr", "me"].includes(language) ? "bs" : language === "de" ? "de" : "en";

    // ── SAFETY CHECK (highest priority) ──
    const safety = checkSafety(userText);
    if (safety === "BLOCKED") {
      console.log("[SAFETY] Blocked request:", userText.slice(0, 80));
      return new Response(
        JSON.stringify({ safety_blocked: true, content: SAFETY_BLOCK_MSG[lang] || SAFETY_BLOCK_MSG["bs"] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (safety === "SEXUAL_REDIRECT") {
      console.log("[SAFETY] Sexual redirect:", userText.slice(0, 80));
      return new Response(
        JSON.stringify({ safety_blocked: true, content: SEXUAL_REDIRECT_MSG[lang] || SEXUAL_REDIRECT_MSG["bs"] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── INTENT CLASSIFICATION ──
    const intent = classifyIntent(userText);
    const guideSlug = detectGuideSlug(userText);
    const detectedForm = detectFormFromCatalog(userText);
    const siteTopics = detectSiteTopics(userText);

    console.log("[INTENT]", intent, "| guide:", guideSlug, "| premium:", isPremium, "| text:", userText.slice(0, 60));

    // ── Conversation-level premium leak detection ──
    const conversationEscalation = !isPremium && detectConversationPremiumEscalation(messages);

    // Job search redirect
    if (intent === "JOB_SEARCH") {
      const msg = JOB_SEARCH_MSG[lang] || JOB_SEARCH_MSG["bs"];
      return new Response(
        JSON.stringify({ search_redirect: true, search_type: "job", content: msg.text, redirect_url: "/stellenangebote", redirect_label: msg.label }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Housing search redirect
    if (intent === "HOUSING_SEARCH") {
      const msg = HOUSING_SEARCH_MSG[lang] || HOUSING_SEARCH_MSG["bs"];
      return new Response(
        JSON.stringify({ search_redirect: true, search_type: "housing", content: msg.text, redirect_url: "/wohnungen", redirect_label: msg.label }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Smart Guide redirect
    if (intent === "SMART_GUIDE_REDIRECT" && !isPremium) {
      const sg = SMART_GUIDE_MSG[lang] || SMART_GUIDE_MSG["bs"];
      const slug = guideSlug || detectedForm?.slug || "kindergeld";
      const link = `/formulari/${slug}`;
      return new Response(
        JSON.stringify({ smart_guide_redirect: true, content: `${sg.text}\n\n👉 [${sg.label}](${link})`, guideSlug: slug, detectedForm }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Premium depth gate (for free users)
    if ((intent === "PREMIUM_DEPTH" || conversationEscalation) && !isPremium) {
      const redirect = buildContextualPremiumRedirect(userText, lang);
      console.log("[PREMIUM_GATE] Blocking depth request, redirecting to:", redirect.redirectUrl);
      return new Response(
        JSON.stringify({
          premium_required: true,
          content: redirect.text,
          redirect_url: redirect.redirectUrl,
          redirect_label: redirect.redirectLabel,
          guideSlug,
          detectedForm,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── DB search for local business queries ──
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
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: true,
          max_tokens: 1024,
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
