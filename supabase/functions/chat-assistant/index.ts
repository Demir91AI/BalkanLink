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
// INTENT CLASSIFIER — server-side enforcement (not bypassable by prompt)
// =====================================================================

const PREMIUM_KEYWORDS = [
  // Bosnian/Croatian/Serbian
  "gdje", "kako", "upiši", "upisi", "popuniti", "popuni", "polje", "tačno", "tacno",
  "korak", "korak po korak", "potpis", "dokument", "priložiti", "priloziti",
  "prilog", "čeklista", "ceklista", "objasni korak", "korak za korak",
  "detaljno", "detaljne upute", "polje po polje", "polje-po-polje",
  "koji dokument", "koje dokumente", "što priložiti", "sta priloziti",
  "kako popuniti", "kako ispuniti", "kako upisati", "šta upisati", "sta upisati",
  "šta napisati", "sta napisati", "koje polje", "u koje polje", "u kom polju",
  "koji obrazac", "tačan format", "tacan format", "format datuma",
  "potpisati", "potpisan", "priložen", "prilozen",
  // German
  "ausfüllen", "ausfullen", "schritt für schritt", "schritt fur schritt",
  "feld für feld", "feld fur feld", "anlage", "nachweis", "eintragen",
  "wo trage ich", "wo schreibe ich", "was trage ich ein", "was schreibe ich",
  "welches feld", "in welches feld", "genau eintragen", "formular ausfüllen",
  "welche unterlagen", "welche dokumente", "checkliste",
  // English
  "step by step", "step-by-step", "field by field", "field-by-field",
  "where do i write", "how to fill", "what exactly", "which field",
  "which document", "what to attach", "checklist",
];

// Patterns that indicate detailed guidance requests
const PREMIUM_PATTERNS = [
  /gdje\s+(se\s+)?upis/i,
  /kako\s+(se\s+)?(popun|ispun|upis)/i,
  /objasni.*korak/i,
  /korak\s+(po|za)\s+korak/i,
  /polje\s+(po|za)\s+polje/i,
  /šta\s+(da\s+)?(upis|napišem|unesem)/i,
  /sta\s+(da\s+)?(upis|napisem|unesem)/i,
  /koji\s+dokument/i,
  /koje\s+dokumente/i,
  /što\s+priloži/i,
  /sta\s+prilozi/i,
  /wo\s+(trage|schreibe)\s+ich/i,
  /was\s+(trage|schreibe)\s+ich/i,
  /schritt\s+f[uü]r\s+schritt/i,
  /feld\s+f[uü]r\s+feld/i,
  /how\s+to\s+fill/i,
  /step\s+by\s+step/i,
  /field\s+by\s+field/i,
  /where\s+do\s+i\s+(write|enter|put)/i,
];

type Intent = "FREE_ALLOWED" | "PREMIUM_REQUIRED";

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();

  // Check patterns first (strongest signals)
  for (const pat of PREMIUM_PATTERNS) {
    if (pat.test(lower)) return "PREMIUM_REQUIRED";
  }

  // Check keywords — require at least one keyword match
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

KORISNIK JE FREE KORISNIK. Tvoj odgovor mora biti KRATAK i OPĆENIT.

PRAVILA ZA FREE KORISNIKE:
- Odgovaraj KRATKO (max. 3-5 rečenica).
- Daj samo opći pregled teme, bez detalja.
- NE daj Schritt-für-Schritt upute.
- NE daj Formular-Coach (polje-po-polje objašnjenja).
- NE daj detaljne čekliste dokumenata.
- Na kraju SVAKOG odgovora dodaj na jeziku ${langName}: napomenu da su detaljne upute dostupne sa BalkanLink Premium.

DOZVOLJENO:
- Kratka dijagnoza (2-3 reda)
- Ime nadležne institucije
- Ime formulara
- Opći savjet (1-2 rečenice)
- Prijevod pojedinačnog polja (npr. Vorname = ime). Ali NE objašnjavaj GDJE se to polje nalazi ili KAKO ga popuniti.

IDENTITET:
- Nisi pravnik i nisi institucija.
- Daješ isključivo opće, neobavezujuće informacije.

STIL: Profesionalan, kratak, bez emotikona, bez praznih fraza.

DISCLAIMER na kraju SVAKOG odgovora (na jeziku ${langName}):
Informacije služe samo za orijentaciju – obavezujuće je samo nadležna institucija.`;
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

────────────────────────────
DISCLAIMER
────────────────────────────

Na kraju SVAKOG odgovora (na jeziku ${langName}):
Informacije služe samo za orijentaciju – obavezujuće je samo nadležna institucija.`;
}

// Premium gate response messages per language
const PREMIUM_GATE_MESSAGES: Record<string, { teaser: string; cta: string }> = {
  bs: {
    teaser: "Ovo pitanje zahtijeva detaljne upute polje-po-polje.",
    cta: "Detaljne upute, čekliste dokumenata i Formular-Coach su dostupni u BalkanLink Premium.",
  },
  hr: {
    teaser: "Ovo pitanje zahtijeva detaljne upute polje-po-polje.",
    cta: "Detaljne upute, popisi dokumenata i Formular-Coach dostupni su u BalkanLink Premium.",
  },
  sr: {
    teaser: "Ovo pitanje zahteva detaljne upute polje-po-polje.",
    cta: "Detaljne upute, čekliste dokumenata i Formular-Coach su dostupni u BalkanLink Premium.",
  },
  me: {
    teaser: "Ovo pitanje zahtijeva detaljne upute polje-po-polje.",
    cta: "Detaljne upute, čekliste dokumenata i Formular-Coach su dostupni u BalkanLink Premium.",
  },
  de: {
    teaser: "Diese Frage erfordert eine detaillierte Schritt-für-Schritt-Anleitung.",
    cta: "Detaillierte Anleitungen, Dokument-Checklisten und der Formular-Coach sind mit BalkanLink Premium verfügbar.",
  },
  en: {
    teaser: "This question requires detailed step-by-step guidance.",
    cta: "Detailed instructions, document checklists, and the Form Coach are available with BalkanLink Premium.",
  },
  sq: {
    teaser: "Kjo pyetje kërkon udhëzime të hollësishme hap pas hapi.",
    cta: "Udhëzimet e hollësishme, listat e dokumenteve dhe Form Coach janë të disponueshme me BalkanLink Premium.",
  },
  xk: {
    teaser: "Kjo pyetje kërkon udhëzime të hollësishme hap pas hapi.",
    cta: "Udhëzimet e hollësishme, listat e dokumenteve dhe Form Coach janë të disponueshme me BalkanLink Premium.",
  },
  mk: {
    teaser: "Ова прашање бара детални упатства чекор по чекор.",
    cta: "Детални упатства, листи на документи и Формулар-Коуч се достапни со BalkanLink Premium.",
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
    // Get the latest user message
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    const userText = lastUserMsg?.content || "";

    // Classify intent
    const intent = classifyIntent(userText);

    // If PREMIUM_REQUIRED and user is NOT premium → block with gate response
    if (intent === "PREMIUM_REQUIRED" && !isPremium) {
      const lang = language || "bs";
      const gate = PREMIUM_GATE_MESSAGES[lang] || PREMIUM_GATE_MESSAGES["bs"];

      // Return a non-streaming JSON response with premium_required flag
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
