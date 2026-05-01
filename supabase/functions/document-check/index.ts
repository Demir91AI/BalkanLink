import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // ── Auth check (paid feature — must require login) ──
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "UNAUTHORIZED", message: "Prijava je obavezna." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims?.sub) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "UNAUTHORIZED", message: "Sesija nije važeća." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = claimsData.claims.sub as string;

    // ── Status check: Premium dobija 5/dan besplatno → poslije 2,99€/kom ──
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: statusRows, error: statusErr } = await adminSupabase
      .rpc("get_doc_check_status", { uid: userId });

    if (statusErr) {
      console.error("get_doc_check_status error:", statusErr.message);
      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Provjera dostupnosti nije uspjela." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const status = Array.isArray(statusRows) ? statusRows[0] : statusRows;
    const isPremium: boolean = !!status?.is_premium;
    const premiumRemaining: number = Number(status?.premium_remaining_today ?? 0);
    const paidCredits: number = Number(status?.paid_credits ?? 0);

    // Pristup: Premium ima dnevnu kvotu, inače mora imati plaćeni kredit (2,99€)
    // - Premium s preostalim danom → koristi premium_usage
    // - Premium s istrošenom kvotom + plaćeni kredit → koristi kredit
    // - Inače → 402 Payment Required
    const usePremiumFreeQuota = isPremium && premiumRemaining > 0;
    const usePaidCredit = !usePremiumFreeQuota && paidCredits >= 1;

    if (!usePremiumFreeQuota && !usePaidCredit) {
      return new Response(
        JSON.stringify({
          success: false,
          errorCode: "PAYMENT_REQUIRED",
          message: isPremium
            ? "Iskoristio si svojih 5 besplatnih provjera danas. Dodatne provjere su 2,99€/kom — ili pričekaj sutra."
            : "Za provjeru dokumenta potrebno je jednokratno plaćanje 2,99€ ili Premium pretplata.",
          premiumExhausted: isPremium,
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { text, imageBase64, mimeType } = body;
    let files: Array<{ base64: string; mimeType: string; name?: string }> = Array.isArray(body.files) ? body.files : [];

    // Backward compat: ako nije poslan files niz, koristi imageBase64/mimeType
    if (files.length === 0 && imageBase64 && mimeType) {
      files = [{ base64: imageBase64, mimeType }];
    }

    // Limit fajlova na serveru (defense-in-depth)
    const MAX_FILES_SERVER = 10;
    if (files.length > MAX_FILES_SERVER) {
      files = files.slice(0, MAX_FILES_SERVER);
    }

    console.log("Request received:", {
      userId,
      isPremium,
      hasText: !!text,
      textLength: text?.length || 0,
      fileCount: files.length,
    });

    if (!text && files.length === 0) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "EMPTY_INPUT", message: "Kein Text oder Bild uebermittelt." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Server-Konfigurationsfehler." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Du bist ein Premium-Dokumenten-Analyst fuer BalkanLink – eine Plattform fuer Menschen aus den Balkanlaendern, die in Deutschland leben.

Deine Aufgabe: Dokumente und Briefe TIEFGREIFEND und STRUKTURIERT erklaeren, so dass ein Nutzer ohne Deutschkenntnisse oder Buerokratie-Erfahrung alles versteht.

QUALITAETSSTANDARD:
- Dies ist ein BEZAHLTES Feature (2.99€). Die Analyse muss diesen Preis rechtfertigen.
- NIEMALS oberflaechlich oder generisch antworten.
- Jeder Abschnitt muss ECHTE, KONKRETE Erklaerungen enthalten.
- Minimum 3-5 Saetze pro Abschnitt wo anwendbar.
- Wenn du etwas nicht erkennen kannst, sage es EHRLICH.

VERBOTENE PHRASEN (ohne Kontext):
- "Pruefen Sie das Dokument" → stattdessen: WAS genau pruefen und WARUM
- "Kontaktieren Sie die zustaendige Stelle" → stattdessen: WELCHE Stelle, WARUM, und WAS sagen
- "Bewahren Sie das Dokument auf" → stattdessen: WIE LANGE und WARUM

REGELN:
- Du bist KEIN Rechtsanwalt. Keine Rechtsberatung.
- Verwende: "In der Regel", "Typischerweise", "Es kann sein"
- Verwende NIE: "Sie haben Anspruch", "Garantiert", "Sie muessen zwingend"
- IGNORIERE sensible Daten (IBAN, Steuer-ID, Ausweisnummer) – erwaehne sie NICHT
- Schreibe ALLES auf Bosnisch/Kroatisch/Serbisch (BKS). Deutsche Fachbegriffe in Klammern.

AUSGABEFORMAT – Verwende EXAKT diese Markdown-Ueberschriften:

## 📋 Dokument na prvi pogled
- Tip dokumenta
- Posiljilac (firma/institucija)
- Svrha dokumenta
- Kategorija: informativno / racun / zahtjev / upozorenje / promjena ugovora
Jasna klasifikacija u 3-4 recenice.

## 📖 Jednostavno objasnjenje
Objasni kao da korisnik:
- ne razumije njemacku birokratiju
- treba prakticno znacenje
Koristi jednostavan jezik. Svaki pravni pojam objasni u zagradi.
Minimum 4-5 recenica.

## 🔍 Detaljna analiza
OVO JE NAJVAZNIJI DIO – mora biti DUGACAK i DETALJAN.
Izvuci I objasni SVE od sljedeceg sto je prisutno u dokumentu:
- Iznosi (sta, zasto, koliko cesto)
- Datumi (sta se desava na te datume)
- Promjene ugovora
- Ukljucene vs iskljucene usluge
- Detalji tarife/paketa
- Pravne napomene
- Automatski procesi (npr. direktno zaduzienje)
- Razlike od prethodne situacije (ako su vidljive)
Za SVAKU tacku: objasni znacenje, posljedicu i relevantnost.
Minimum 8-12 znacajnih objasnjenih tacaka ako je moguce.

## ⚠️ Sta je stvarno bitno
Razdvoji:
- KRITICNE informacije (korisnik MORA znati)
- Sekundarne informacije (korisno ali ne hitno)
- Nebitni standardni tekst (boilerplate)
Za svaku tacku objasni ZASTO je bitna ili nebitna.

## ⏰ Rokovi i hitnost
Klasificiraj jasno:
- ✅ Nije potrebna akcija
- ⚡ Preporucena akcija
- 🚨 Hitno
Ako postoji rok: TACNO navedi vremenski okvir i sta se desava ako se propusti.
Ako nema roka: jasno napisi "Nema vidljivog roka u dokumentu."

## 💰 Finansijska analiza
OBAVEZNO ako se spominje novac:
- Ukupan iznos
- Period (mjesecno / godisnje / jednokratno)
- Povecanje ili smanjenje u odnosu na ranije
- Buduca placanja
- Automatska zaduzienja
- Moguce ustede ili dodatni troskovi
Ako nema finansijskih podataka, napisi: "Dokument ne sadrzi finansijske informacije."

## 🛠️ Konkretne opcije
NE GENERICKE – daj STVARNE opcije:
- Ne uraditi nista (ako je validno – objasni zasto)
- Provjeriti konkretne podatke (KOJI tacno)
- Otkazati (ako je moguce – KADA i KAKO)
- Uporediti alternative
- Kontaktirati instituciju (ZASTO tacno i STA reci)
- Pripremiti dokumente (ako je potrebno – KOJE)
Svaka opcija mora imati obrazlozenje.

## ❌ Ako nista ne uradis
Objasni jasno:
- Sta se desava automatski
- Finansijske posljedice
- Nastavak ugovora
- Rizik ignorisanja
Ovaj dio povecava percipiranu vrijednost – mora biti JAK.

## 🔒 Rizici i ceste greske
Navedi realisticne rizike:
- Pogresan iznos
- Pogresni licni podaci
- Skriveni uslovi
- Propusten rok
- Automatsko produzenje
Svaki rizik kratko ali jasno objasni.

## 🇧🇦 Sazetak na nasem jeziku
5-8 jakih recenica. Bez ponavljanja. Mora sadrzavati:
- Sta je dokument
- Sta se mijenja
- Da li je potrebna akcija
- Koji je sljedeci korak

## ⚖️ Pravna napomena
"Ova analiza pruza opce informacije i ne predstavlja pravni savjet. Za obavezujuce informacije obratite se nadleznoj instituciji ili pravnom savjetniku."

KVALITETNA PROVJERA PRIJE ODGOVORA:
- Da li je ovo dovoljno detaljno za placeni feature?
- Da li bi korisnik rekao: "Ovo mi je stvarno pomoglo"?
- Da li jasno odgovara na: sta je ovo, sta znaci za mene, trebam li nesto uraditi?
Ako NE → prosiri prije slanja.`;

    const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = [
      { role: "system", content: systemPrompt },
    ];

    if (files.length > 0) {
      const userContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
      const intro = files.length === 1
        ? "Analiziraj ovaj dokument/pismo detaljno koristeci SVE sekcije iz formata. Budi sto detaljniji i konkretniji."
        : `Analiziraj ovaj dokument/pismo — sastoji se od ${files.length} stranica/fajlova (priloženi redom). Tretiraj ih kao JEDAN dokument i napravi JEDNU objedinjenu analizu koristeci SVE sekcije iz formata. Budi sto detaljniji i konkretniji.`;
      userContent.push({ type: "text", text: intro });

      files.forEach((f, idx) => {
        if (!f?.base64 || !f?.mimeType) return;
        if (files.length > 1) {
          userContent.push({ type: "text", text: `--- Stranica/fajl ${idx + 1}/${files.length}${f.name ? ` (${f.name})` : ""} ---` });
        }
        userContent.push({ type: "image_url", image_url: { url: `data:${f.mimeType};base64,${f.base64}` } });
      });

      if (text) {
        userContent.push({ type: "text", text: `\nDodatni tekstualni kontekst:\n${text}` });
      }

      messages.push({ role: "user", content: userContent });
    } else {
      messages.push({
        role: "user",
        content: `Analiziraj sljedeci tekst iz dokumenta/pisma detaljno koristeci SVE sekcije iz formata. Budi sto detaljniji i konkretniji.\n\n---\n${text}\n---`,
      });
    }

    console.log("Calling AI API with deep analysis prompt...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 8000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI API error:", response.status, errText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, errorCode: "RATE_LIMITED", message: "Previse zahtjeva. Pokusajte ponovo za nekoliko trenutaka." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, errorCode: "CREDITS_EXHAUSTED", message: "Servis privremeno nedostupan. Pokusajte ponovo kasnije." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analiza nije uspjela. Pokusajte ponovo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";

    if (!result) {
      console.error("Empty AI response");
      return new Response(
        JSON.stringify({ success: false, errorCode: "PARSING_FAILED", message: "Analiza nije mogla biti provedena." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analysis completed successfully, length:", result.length);

    // Trošenje SAMO nakon uspješne analize (ne troši ako AI padne):
    // - Premium s preostalom dnevnom kvotom → consume_premium_doc_check
    // - Inače → consume_doc_check_credit (plaćeni 2,99€ kredit)
    if (usePremiumFreeQuota) {
      const { data: consumed, error: consumeErr } = await adminSupabase
        .rpc("consume_premium_doc_check", { uid: userId });
      if (consumeErr) console.error("consume_premium_doc_check error:", consumeErr.message);
      else if (!consumed) console.warn("Premium daily quota race for user", userId);
    } else {
      const { data: consumed, error: consumeErr } = await adminSupabase
        .rpc("consume_doc_check_credit", { uid: userId });
      if (consumeErr) console.error("consume_doc_check_credit error:", consumeErr.message);
      else if (!consumed) console.warn("No paid credit was consumed for user", userId);
    }

    // Vrati ažurirani status nazad u UI radi brojača (one-shot, bez dodatnog poziva)
    const { data: postRows } = await adminSupabase
      .rpc("get_doc_check_status", { uid: userId });
    const postStatus = Array.isArray(postRows) ? postRows[0] : postRows;

    return new Response(
      JSON.stringify({
        success: true,
        analysis: result,
        status: {
          isPremium: !!postStatus?.is_premium,
          premiumRemainingToday: Number(postStatus?.premium_remaining_today ?? 0),
          paidCredits: Number(postStatus?.paid_credits ?? 0),
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Document check error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analiza nije uspjela. Pokusajte ponovo." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
