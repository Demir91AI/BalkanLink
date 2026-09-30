import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Credit reserved up-front (atomic) and released again if the check does not complete.
  let reservedCreditId: string | null = null;
  let reservedLegacyId: string | null = null;
  let completed = false;
  // deno-lint-ignore no-explicit-any
  let adminRef: any = null;

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

    // ── Pricing: 1,99€ per completed check for EVERY user (Plus/lifetime included, no free quota) ──
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    adminRef = adminSupabase;
    const isPremium = false; // kept for logging compatibility; no quota logic anymore

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

    // Included in the one-time BalkanLink access (19,90€). No per-check charges.
    const { data: hasAccess, error: accessErr } = await adminSupabase.rpc("has_full_access", { uid: userId });
    if (accessErr) {
      console.error("has_full_access error:", accessErr.message);
      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Provjera pristupa nije uspjela." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!hasAccess) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "ACCESS_REQUIRED", message: "Dokumenten-Check je uključen u BalkanLink pristup (19,90€ jednokratno)." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
- Dies ist ein BEZAHLTES Feature (1.99€ pro Pruefung). Die Analyse muss diesen Preis rechtfertigen.
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

    completed = true;

    return new Response(
      JSON.stringify({ success: true, analysis: result, status: { fullAccess: true } }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Document check error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analiza nije uspjela. Pokusajte ponovo." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } finally {
    void completed; void adminRef; void reservedCreditId; void reservedLegacyId;
  }
});
