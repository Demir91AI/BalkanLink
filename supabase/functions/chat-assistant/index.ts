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

// ── FORM CATALOG (mirrors src/lib/form-catalog.ts) ──

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
  // Also check common Bosnian/German terms
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

  const taskOrientedCore = `
────────────────────────────
PONAŠANJE (OBAVEZNO)
────────────────────────────

Ti si TASK-ORIENTED digitalni vodič i NAVIGATOR za BalkanLink platformu.
Tvoj GLAVNI cilj je POVEZATI korisnika sa postojećim formularima i Smart Guide sistemom.
Ti NISI odvojeni alat — ti si inteligentni ulaz u BalkanLink ekosistem.

PRAVILA:
1. Kad korisnik spomene formular ili administrativni problem — PREPOZNAJ koji formular mu treba iz kataloga i uključi [FORM:slug] marker.
2. NE generiši detaljne upute za popunjavanje — to radi Smart Guide. Ti samo uputi korisnika.
3. Daj KRATKO objašnjenje (2-3 rečenice) + uslove + česte greške + ponudi akcije.
4. UVIJEK na kraju ponudi: "Želiš da pokrenem Smart Guide?" ili "Šta ti još treba?"
5. Govori REALNO — uključi upozorenja o čestim greškama.
6. NIKAD ne daj dugačke generičke tekstove. Budi kratak, konkretan, akcijski.
7. Postavi 1-2 pitanja za kontekst SAMO kad je potrebno (grad, broj djece, radni status).

STRUKTURA ODGOVORA ZA FORMULARE:
1. Kratko objašnjenje (2-3 rečenice šta je i ko ima pravo)
2. Ključni uslovi (bullet points, max 4)
3. ⚠️ Najčešće greške (1-2)
4. [FORM:slug] marker (OBAVEZNO)

────────────────────────────
MONETIZACIJSKI FLOW (SOFT UPSELL)
────────────────────────────

KORAK 1 — FREE: Osnovno objašnjenje + uslovi + česte greške + link na formular
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

────────────────────────────
FORMAT ODGOVORA
────────────────────────────

**KRATKO** (2-3 rečenice)

**USLOVI**
• Uslov 1
• Uslov 2

**⚠️ ČESTE GREŠKE**
- Greška 1

[FORM:slug]

**ŠTA DALJE?**
Ponudi 2-3 opcije.

────────────────────────────
REALITY CHECK
────────────────────────────
- "Ovo možda neće proći ako..."
- "Ovdje često odbijaju jer..."
- DOZVOLJENO: "U pravilu", "Tipično", "Provjerite"
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
8. OBAVEZNO koristi [FORM:slug] marker kad je tema vezana za formular.`;

  if (dbResults.length > 0) {
    return `Ti si "BalkanLink Assistant" — digitalni vodič i navigator za BalkanLink platformu.
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
    return `Ti si "BalkanLink Assistant" — digitalni vodič i navigator za BalkanLink platformu.
${langInstruction}

${formCatalogContext}

${taskOrientedCore}

DODATNA PRAVILA ZA FREE KORISNIKE:
- Detaljno polje-po-polje popunjavanje je Premium funkcija — uputi na Smart Guide.
- Generisanje punih dokumenata je Premium funkcija.
- Za template poruke: daj KRATKI preview (3-4 reda) pa reci da je puna verzija u Premiumu.
- EMOTIONAL TRIGGER: "Većina korisnika uz vodič završi prijavu bez greške iz prvog pokušaja."

${strictRules}`;
  }

  return `Ti si "BalkanLink Assistant" — digitalni vodič i navigator za BalkanLink platformu.
${langInstruction}

${formCatalogContext}

${taskOrientedCore}

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

    // Smart Guide redirect
    if (intent === "SMART_GUIDE_REDIRECT") {
      const lang = language || "bs";
      const sg = SMART_GUIDE_MESSAGES[lang] || SMART_GUIDE_MESSAGES["bs"];
      const slug = guideSlug || (detectedForm?.slug) || "kindergeld";
      const link = `/formulari/${slug}`;
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

    return new Response(response.body, { headers: extraHeaders });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Nepoznata greška" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
