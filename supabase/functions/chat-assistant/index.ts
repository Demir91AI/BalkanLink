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
  const terms = query
    .toLowerCase()
    .replace(/[?!.,;:"""„'']/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !stopWords.has(w));

  if (terms.length === 0) return [];

  try {
    const { data, error } = await supabase.rpc("search_community_listings", { search_terms: terms });
    if (error) { console.error("DB search error:", error.message); return []; }
    return (data || []).slice(0, 10);
  } catch (e) { console.error("DB search exception:", e); return []; }
}

function formatDbResults(results: any[]): string {
  if (results.length === 0) return "";
  const entries = results.map((r) => {
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
  });
  return entries.join("\n\n---\n\n");
}

// ── SMART GUIDE SLUG MAPPING ──

const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld-kg1",
  kinderzuschlag: "kinderzuschlag",
  elterngeld: "elterngeld",
  elternzeit: "elternzeit",
  mutterschutz: "mutterschutz",
  mutterschaftsleistungen: "mutterschaftsleistungen",
  unterhalt: "unterhalt",
  unterhaltsvorschuss: "unterhaltsvorschuss",
  "bildung und teilhabe": "bildung-teilhabe",
  bürgergeld: "buergergeld",
  wohngeld: "wohngeld",
  bafög: "bafoeg",
  bafoeg: "bafoeg",
  sozialhilfe: "sozialhilfe",
  krippengeld: "bayerisches-krippengeld",
  krankengeld: "krankengeld",
  pflegegrad: "pflegegrad",
  führungszeugnis: "fuehrungszeugnis",
  aufenthaltstitel: "aufenthaltstitel-verlaengerung",
  anmeldung: "anmeldung",
  wbs: "wbs",
};

function detectGuideSlug(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, slug] of Object.entries(TOPIC_GUIDE_MAP)) {
    if (lower.includes(keyword)) return slug;
  }
  return null;
}

// ── SYSTEM PROMPTS ──

function buildSystemPrompt(isPremium: boolean, language: string, dbResults: any[]): string {
  const langName = LANG_NAMES[language] || "Deutsch";
  const langInstruction = `VAŽNO: ODGOVARAJ ISKLJUČIVO na jeziku: ${langName}. Cijeli odgovor mora biti na tom jeziku.`;

  const structuredFormat = `
────────────────────────────
FORMAT ODGOVORA (OBAVEZNO)
────────────────────────────

Svaki odgovor MORA sadržavati ove sekcije u ovom redoslijedu:

**1. KRATKO OBJAŠNJENJE**
2-3 rečenice koje objašnjavaju šta je tema i gdje se podnosi zahtjev.

**2. KLJUČNI USLOVI**
Bullet points sa glavnim zahtjevima:
• Zahtjev: šta treba podnijeti
• Dokumenti: koji dokumenti trebaju
• Prihodi: ako je relevantno
• Status: npr. Anmeldung, boravišna dozvola

**3. PREPORUČENI REDOSLIJED**
Numerisani koraci (max 4):
1. Pripremite dokumente
2. Provjerite uslove
3. Podnesite zahtjev

**4. BRZA PROVJERA (ORIJENTACIJA)**
Čeklista sa ✔ za brzu samoprocjenu:
✔ Uslov 1
✔ Uslov 2
✔ Uslov 3
Završi sa: "Ako većina odgovora glasi DA, moguće je da imate pravo na ovu pomoć."

**5. NAPOMENA**
NIKADA ne generiši popunjene formulare, pravne savjete ili dokumente.
Završi UVIJEK sa: "Informacije služe samo za orijentaciju. BalkanLink ne pruža pravne usluge. Za službene informacije obratite se nadležnoj instituciji."
`;

  const strictRules = `
────────────────────────────
STROGA PRAVILA
────────────────────────────
1. STRUKTURIRANO prema formatu iznad.
2. ČINJENIČNO. Samo provjerene informacije.
3. BEZ opisivanja, marketinga, rangiranja, superlativa.
4. BEZ generisanja formulara ili pravnih savjeta.
5. Google ocjene SAMO informativno: "⭐ 4.6 Google Reviews".
6. Ako korisnik spominje grad, dodaj: "Nadležna institucija: [institucija] grada [grad]"
7. UVIJEK završi sa disclaimerom.`;

  if (dbResults.length > 0) {
    return `Ti si "BalkanLink Assistant".
${langInstruction}

MODE: ODGOVOR IZ BAZE PODATAKA
Pronađeni su rezultati u BalkanLink bazi. Koristi SAMO te podatke.
NE dodaj opise, historiju, pretpostavke.

FORMAT:
**Naziv**
Adresa: [iz baze]
Kategorija: [iz baze]
Kontakt: [web/maps ako postoji]
⭐ X.X Google Reviews (informativno)

EVO REZULTATA:
${formatDbResults(dbResults)}

${strictRules}`;
  }

  if (!isPremium) {
    return `Ti si "BalkanLink Assistant" — digitalni asistent za život i birokratiju u Njemačkoj.
${langInstruction}

MODE: OPĆE INFORMACIJE (FREE KORISNIK)

${structuredFormat}

DODATNA PRAVILA ZA FREE KORISNIKE:
- Detaljno polje-po-polje popunjavanje formulara je dio BalkanLink Premium Smart Guide.
- Ako korisnik traži popunjavanje formulara, objasni da je to Premium funkcija.
- Završi sa: "Detaljno polje-po-polje popunjavanje formulara dostupno je u BalkanLink Premium Smart Guide vodiču."

${strictRules}`;
  }

  return `Ti si "BalkanLink Assistant" — digitalni asistent za život i birokratiju u Njemačkoj.
${langInstruction}

MODE: PREMIUM KORISNIK

${structuredFormat}

PREMIUM MOGUĆNOSTI:
- Formular-Coach (polje-po-polje) — samo ako korisnik pita
- Analiza dokumenata
- Personalizirana pomoć

ZABRANJENE FORMULACIJE: "Imate pravo", "Garantovano", "100%"
DOZVOLJENE: "U pravilu", "Tipično", "Provjerite kod nadležne institucije"

${strictRules}`;
}

// ── Premium gate messages ──
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
  de: { text: "Für das detaillierte Ausfüllen von Formularen nutzen Sie unseren Smart Guide — eine interaktive Schritt-für-Schritt-Anleitung.", link: "/formulari/kindergeld-kg1", label: "Smart Guide öffnen – Kindergeld (KG1)" },
  en: { text: "For detailed form filling, use our Smart Guide — an interactive step-by-step wizard.", link: "/formulari/kindergeld-kg1", label: "Open Smart Guide – Kindergeld (KG1)" },
  sq: { text: "Për plotësimin e detajuar të formularëve përdorni Smart Guide-in tonë — udhëzues interaktiv hap pas hapi.", link: "/formulari/kindergeld-kg1", label: "Hap Smart Guide – Kindergeld (KG1)" },
  xk: { text: "Për plotësimin e detajuar të formularëve përdorni Smart Guide-in tonë — udhëzues interaktiv hap pas hapi.", link: "/formulari/kindergeld-kg1", label: "Hap Smart Guide – Kindergeld (KG1)" },
  mk: { text: "За детално пополнување формулари користете го нашиот Smart Guide — интерактивен водич чекор по чекор.", link: "/formulari/kindergeld-kg1", label: "Отвори Smart Guide – Kindergeld (KG1)" },
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

    // Smart Guide redirect
    if (intent === "SMART_GUIDE_REDIRECT") {
      const lang = language || "bs";
      const sg = SMART_GUIDE_MESSAGES[lang] || SMART_GUIDE_MESSAGES["bs"];
      const link = guideSlug ? `/formulari/${guideSlug}` : sg.link;
      const markdown = `${sg.text}\n\n👉 [${sg.label}](${link})`;
      return new Response(
        JSON.stringify({ smart_guide_redirect: true, content: markdown, guideSlug: guideSlug || "kindergeld-kg1" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (intent === "PREMIUM_REQUIRED" && !isPremium) {
      const lang = language || "bs";
      const gate = PREMIUM_GATE_MESSAGES[lang] || PREMIUM_GATE_MESSAGES["bs"];
      return new Response(
        JSON.stringify({ premium_required: true, teaser: gate.teaser, cta: gate.cta }),
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
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Previše zahtjeva. Pokušajte ponovo za trenutak." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usluga trenutno nije dostupna." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Greška u komunikaciji sa serverom." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return the guide slug alongside the stream for CTA rendering
    const extraHeaders: Record<string, string> = {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
    };
    if (guideSlug) {
      extraHeaders["X-Guide-Slug"] = guideSlug;
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
