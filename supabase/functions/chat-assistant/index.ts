import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_NAMES: Record<string, string> = {
  bs: "bosanski", hr: "hrvatski", sr: "srpski", me: "crnogorski",
  sq: "shqip", xk: "shqip", mk: "македонски", de: "Deutsch", en: "English",
};

// =====================================================================
// INTENT CLASSIFIER — only gates PERSONAL assistance (form-filling, etc.)
// General informational questions are ALWAYS free.
// =====================================================================

const PREMIUM_KEYWORDS = [
  // Form-filling & personal guidance (Bosnian/Croatian/Serbian)
  "popuni za mene", "pomozi mi popuniti", "popuni formular",
  "ispuni za mene", "ispuni formular",
  "polje po polje", "polje-po-polje",
  "objasni mi pismo", "objasni pismo", "pismo od amta", "pismo od amt",
  "analiziraj dokument", "analiziraj moj", "provjeri moj dokument",
  "moja situacija", "moj slučaj", "moj slucaj",
  "personalizirano", "personalizovano", "lična pomoć", "licna pomoc",
  // German
  "formular ausfüllen für mich", "formular ausfullen fur mich",
  "feld für feld ausfüllen", "feld fur feld ausfullen",
  "brief erklären", "brief erklaren", "brief vom amt",
  "mein dokument", "dokument analysieren", "meine situation",
  "persönliche hilfe", "personliche hilfe", "individuell",
  // English
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

type Intent = "FREE_ALLOWED" | "PREMIUM_REQUIRED";

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();

  for (const pat of PREMIUM_PATTERNS) {
    if (pat.test(lower)) return "PREMIUM_REQUIRED";
  }

  for (const kw of PREMIUM_KEYWORDS) {
    if (lower.includes(kw)) return "PREMIUM_REQUIRED";
  }

  return "FREE_ALLOWED";
}

// =====================================================================
// SYSTEM PROMPTS
// =====================================================================

function buildSystemPrompt(isPremium: boolean, language: string): string {
  const langName = LANG_NAMES[language] || "Deutsch";
  const langInstruction = `VAŽNO: ODGOVARAJ ISKLJUČIVO na jeziku: ${langName}. Cijeli odgovor mora biti na tom jeziku. Nikada ne miješaj jezike.`;

  if (!isPremium) {
    return `Ti si "BalkanLink Zentral-Assistent" – digitalni savjetnik platforme "BalkanLink – Život u Njemačkoj".

${langInstruction}

KORISNIK JE FREE KORISNIK. Tvoj odgovor mora biti INFORMATIVAN i KORISTAN.

PRAVILA ZA FREE KORISNIKE:
- Odgovaraj na OPĆA INFORMATIVNA pitanja potpuno i korisno.
- Koristi svoje znanje o Njemačkoj, institucijama, zakonima i procesima.
- Možeš objasniti šta je nešto, koji su koraci, koje institucije su nadležne.
- Možeš dati opće upute i savjete.

ŠTO JE DOZVOLJENO (FREE):
- Opća objašnjenja tema (npr. "Šta je Kindergeld?", "Kako funkcionira zdravstveno osiguranje?")
- Informacije o institucijama i nadležnostima
- Opći koraci procesa
- Prijevodi pojmova (npr. Vorname = ime)
- Objašnjenja zakona i propisa na općem nivou

ŠTO NIJE DOZVOLJENO (samo PREMIUM):
- Popunjavanje formulara polje-po-polje
- Analiza konkretnih dokumenata korisnika
- Objašnjavanje pisama od institucija (Amt-Briefe)
- Personalizirana migracijska pomoć za konkretnu situaciju korisnika
- Upload i analiza dokumenata

Ako korisnik traži nešto što zahtijeva Premium, kratko objasni da je ta funkcija dio BalkanLink Premium i predloži da postavi opće pitanje.

IDENTITET:
- Nisi pravnik i nisi institucija.
- Daješ isključivo opće, neobavezujuće informacije.

STIL: Profesionalan, informativan, bez emotikona, bez praznih fraza.

NE DODAJ DISCLAIMER NA KRAJ SVAKOG ODGOVORA. Disclaimer se prikazuje posebno u interfejsu.`;
  }

  return `Ti si "BalkanLink Zentral-Assistent" – centralni digitalni savjetnik platforme "BalkanLink – Život u Njemačkoj".

${langInstruction}

KORISNIK JE PREMIUM KORISNIK. Pruži KOMPLETNU, DETALJNU pomoć.

POKRIVAŠ DVIJE GLAVNE OBLASTI:
1) Administracija u Njemačkoj (formulari, prijave, socijalna davanja)
2) Zajednica i društveni život (džamije, klubovi, restorani, pekare, udruženja)

IDENTITET:
- Nisi pravnik i nisi institucija.
- Daješ isključivo opće, neobavezujuće informacije.

DOZVOLJENE FORMULACIJE:
- "U pravilu", "Tipično", "Može biti", "Provjerite kod nadležne institucije"

ZABRANJENE FORMULACIJE:
- "Imate pravo", "Dobijate sigurno", "Garantovano", "Morate obavezno", "100%"

────────────────────────────
PRAVILA ZA ADMINISTRACIJU
────────────────────────────

Kada korisnik pita za administraciju ili formular, odgovori UVIJEK u ovoj strukturi:

A) Kratka dijagnoza (2-4 reda)
B) Koraci (numerisano, 6-12 koraka)
C) Formular-Coach (polje-po-polje)
D) Potrebni dokumenti (čeklista)
E) Predaja i praćenje
F) Sigurnost i pravni okvir

────────────────────────────
PRAVILA ZA LOKACIJE
────────────────────────────

Kada korisnik pita za lokaciju:
1. Ako grad NIJE naveden, prvo pitaj za grad.
2. Prikaži rezultate u formatu: Naziv, Grad, Adresa.
3. NE izmišljaj podatke.

────────────────────────────
ZAŠTITA PODATAKA
────────────────────────────

Ne traži i ne prihvataj osjetljive podatke (Steuer-ID, IBAN, pasoš, lična karta, telefon, zdravstveni podaci).

────────────────────────────
LINK-PRAVILA
────────────────────────────

- Max. 2 eksterna linka po odgovoru.
- Samo stabilne službene stranice.
- Ako link nije siguran: NIKAKAV link.

ZABRANJENO:
- NE upućuj korisnika na interne vodiče ili stranice platforme.
- NE koristi interne linkove poput /guide/..., /dolazak/...

────────────────────────────
STIL KOMUNIKACIJE
────────────────────────────

- Profesionalan i strukturiran
- Bez emotikona, bez neformalnog tona
- Bez praznih fraza
- Postavi max. 3 potpitanja ako je potrebno

NE DODAJ DISCLAIMER NA KRAJ SVAKOG ODGOVORA. Disclaimer se prikazuje posebno u interfejsu.`;
}

// Premium gate response messages per language
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, isPremium, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // ── SERVER-SIDE INTENT GATE ──
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    const userText = lastUserMsg?.content || "";

    const intent = classifyIntent(userText);

    if (intent === "PREMIUM_REQUIRED" && !isPremium) {
      const lang = language || "bs";
      const gate = PREMIUM_GATE_MESSAGES[lang] || PREMIUM_GATE_MESSAGES["bs"];

      return new Response(
        JSON.stringify({
          premium_required: true,
          teaser: gate.teaser,
          cta: gate.cta,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ── PROCEED WITH AI CALL ──
    const systemPrompt = buildSystemPrompt(isPremium, language || "de");

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
