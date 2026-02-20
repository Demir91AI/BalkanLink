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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, isPremium, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

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
