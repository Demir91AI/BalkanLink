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

// ── SMART GUIDE REDIRECT patterns ──
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
  
  // Check Smart Guide redirect first
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
    const { data, error } = await supabase.rpc("search_community_listings", {
      search_terms: terms,
    });

    if (error) {
      console.error("DB search error:", error.message);
      return [];
    }

    return (data || []).slice(0, 10);
  } catch (e) {
    console.error("DB search exception:", e);
    return [];
  }
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

// ── SYSTEM PROMPTS ──

function buildSystemPrompt(isPremium: boolean, language: string, dbResults: any[]): string {
  const langName = LANG_NAMES[language] || "Deutsch";
  const langInstruction = `VAŽNO: ODGOVARAJ ISKLJUČIVO na jeziku: ${langName}. Cijeli odgovor mora biti na tom jeziku.`;

  // ── STRICT RESPONSE RULES (applies to ALL modes) ──
  const strictRules = `
────────────────────────────
STROGA PRAVILA ODGOVORA
────────────────────────────

1. KRATKO. Maksimalno 6 linija osim ako korisnik traži detaljno objašnjenje.
2. ČINJENIČNO. Samo provjerene informacije, adrese, kontakti, koraci.
3. STRUKTURIRANO. Koristi bullet points ili numeraciju.
4. BEZ OPISIVANJA. Nikada ne generiši opise, historiju, mišljenja, preporuke.
5. BEZ MARKETINGA. Nikada ne koristi reklamni jezik, superlative, ili priče.
6. BEZ RANGIRANJA. Nikada ne koristi "najbolji", "preporučeni", "top".
7. Google ocjene prikazuj SAMO kao informativan podatak: "⭐ 4.6 Google Reviews".
8. NIKADA ne rangiraj objekte po ocjeni niti ih preporučuj.

DOZVOLJENO: adrese, kontakti, radno vrijeme, službena objašnjenja, pomoć s formularima.
ZABRANJENO: preporuke, mišljenja, marketing, storytelling, dugački paragrafi.

UVIJEK dodaj na kraj:
"Informacije služe samo za orijentaciju. Provjerite kod nadležne institucije ili objekta."`;

  // ── MODE 1: DATABASE ANSWER ──
  if (dbResults.length > 0) {
    return `Ti si "BalkanLink Zentral-Assistent".

${langInstruction}

MODE 1 — ODGOVOR IZ BAZE PODATAKA

KRITIČNO: Pronađeni su rezultati u BalkanLink bazi. MORAŠ koristiti SAMO te podatke.

PRAVILA:
- Prikaži SAMO podatke iz baze, ništa drugo.
- NE dodaj opise, historiju, pretpostavke, generirane tekstove.
- NE koristi riječi "najbolji", "preporučeni", "popularan".
- Google ocjenu prikaži SAMO ako postoji: "⭐ X.X Google Reviews (informativno)"
- Dodaj: "BalkanLink ne daje preporuke niti ocjenjuje objekte."

FORMAT:
**Naziv**
Adresa: [iz baze]
Kategorija: [iz baze]
Kontakt: [web/maps ako postoji]
⭐ X.X Google Reviews (informativno) — samo ako postoji

Informationen ohne Gewähr – bitte direkt beim Verein prüfen.

EVO REZULTATA:

${formatDbResults(dbResults)}

${strictRules}`;
  }

  // ── MODE 2 & 3: No DB results ──
  if (!isPremium) {
    return `Ti si "BalkanLink Zentral-Assistent".

${langInstruction}

MODE 2 — OPĆE INFORMACIJE (FREE KORISNIK)

Za ovo pitanje NEMA rezultata u BalkanLink bazi.
Koristi opće znanje za kratak, činjeničan odgovor.

PRAVILA ZA FREE KORISNIKE:
- Odgovaraj na opća informativna pitanja kratko i korisno.
- Maksimalno 6 linija.
- Koristi bullet points.
- Bez opisivanja, bez marketinga, bez dugačkih paragrafa.

ŠTO NIJE DOZVOLJENO (samo PREMIUM):
- Popunjavanje formulara polje-po-polje
- Analiza konkretnih dokumenata korisnika
- Objašnjavanje pisama od institucija
- Personalizirana migracijska pomoć

Ako korisnik traži Premium funkciju, kratko objasni da je to dio BalkanLink Premium.

IDENTITET: Nisi pravnik. Daješ isključivo opće, neobavezujuće informacije.

${strictRules}`;
  }

  return `Ti si "BalkanLink Zentral-Assistent".

${langInstruction}

MODE 3 — PREMIUM KORISNIK

Za ovo pitanje NEMA rezultata u BalkanLink bazi.
Koristi opće znanje i pruži kompletnu pomoć.

POKRIVAŠ:
1) Administracija u Njemačkoj (formulari, prijave, socijalna davanja)
2) Zajednica i društveni život

ZA ADMINISTRACIJU — struktura:
A) Kratka dijagnoza (2 reda)
B) Koraci (numerisano)
C) Formular-Coach (polje-po-polje) — samo ako korisnik pita
D) Potrebni dokumenti (čeklista)

IDENTITET: Nisi pravnik. Daješ opće, neobavezujuće informacije.

ZABRANJENE FORMULACIJE: "Imate pravo", "Garantovano", "100%"
DOZVOLJENE: "U pravilu", "Tipično", "Provjerite kod nadležne institucije"

LINK-PRAVILA: Max 2 eksterna linka. Samo stabilne službene stranice.
ZABRANJENO: NE upućuj na interne vodiče ili stranice platforme.

${strictRules}`;
}

// ── Premium gate messages ──
const PREMIUM_GATE_MESSAGES: Record<string, { teaser: string; cta: string }> = {
  bs: {
    teaser: "Ova funkcija zahtijeva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizirana pomoć.",
    cta: "Ako imate opće pitanje, slobodno ga postavite – odgovorićemo besplatno!",
  },
  hr: {
    teaser: "Ova funkcija zahtijeva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizirana pomoć.",
    cta: "Ako imate opće pitanje, slobodno ga postavite – odgovorit ćemo besplatno!",
  },
  sr: {
    teaser: "Ova funkcija zahteva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizovana pomoć.",
    cta: "Ako imate opšte pitanje, slobodno ga postavite – odgovorićemo besplatno!",
  },
  me: {
    teaser: "Ova funkcija zahtijeva BalkanLink Premium: popunjavanje formulara, analiza dokumenata i personalizirana pomoć.",
    cta: "Ako imate opće pitanje, slobodno ga postavite – odgovorićemo besplatno!",
  },
  de: {
    teaser: "Diese Funktion erfordert BalkanLink Premium: Formularhilfe, Dokumentenanalyse und persönliche Beratung.",
    cta: "Stellen Sie gerne eine allgemeine Frage – wir antworten kostenlos!",
  },
  en: {
    teaser: "This feature requires BalkanLink Premium: form filling, document analysis and personalized assistance.",
    cta: "Feel free to ask a general question – we'll answer for free!",
  },
  sq: {
    teaser: "Kjo veçori kërkon BalkanLink Premium: plotësimin e formularëve, analizën e dokumenteve dhe ndihmë të personalizuar.",
    cta: "Bëni lirisht një pyetje të përgjithshme – do t'ju përgjigjemi falas!",
  },
  xk: {
    teaser: "Kjo veçori kërkon BalkanLink Premium: plotësimin e formularëve, analizën e dokumenteve dhe ndihmë të personalizuar.",
    cta: "Bëni lirisht një pyetje të përgjithshme – do t'ju përgjigjemi falas!",
  },
  mk: {
    teaser: "Оваа функција бара BalkanLink Premium: пополнување формулари, анализа на документи и персонализирана помош.",
    cta: "Слободно поставете општо прашање – ќе одговориме бесплатно!",
  },
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

    // Smart Guide redirect — don't explain step-by-step, just link
    if (intent === "SMART_GUIDE_REDIRECT") {
      const lang = language || "bs";
      const sg = SMART_GUIDE_MESSAGES[lang] || SMART_GUIDE_MESSAGES["bs"];
      const markdown = `${sg.text}\n\n👉 [${sg.label}](${sg.link})`;
      return new Response(
        JSON.stringify({ smart_guide_redirect: true, content: markdown }),
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

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Nepoznata greška" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
