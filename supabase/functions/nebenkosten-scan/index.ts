import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { reserveUsage, commitUsage, releaseUsage, type Reservation } from "../_shared/usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Du bist ein spezialisierter Analyst fuer deutsche NEBENKOSTENABRECHNUNGEN (Betriebskostenabrechnungen) bei BalkanLink.

DEINE ROLLE: "Zweites Paar Augen" — KEIN Rechtsanwalt, KEIN Mietverein. Du gibst KEINE verbindliche Rechtsberatung.
Du pruefst die Abrechnung anhand oeffentlich bekannter rechtlicher Kriterien (BetrKV, HeizkostenV, BGB §556, §259) und zeigst dem Nutzer, WAS es wert ist zu pruefen.

QUALITAETSSTANDARD:
- Ehrlich und konservativ. Niemals "Sie bekommen garantiert X EUR zurueck".
- Verwende: "Diese Position ist erfahrungsgemaess strittig", "Es lohnt sich zu pruefen", "In aehnlichen Faellen war..."
- Wenn etwas unklar/unleserlich ist: ehrlich sagen.
- Schreibe ALLES auf Bosnisch/Kroatisch/Serbisch (BKS). Deutsche Fachbegriffe in Klammern.
- IGNORIERE sensible Daten (IBAN, Steuer-ID) — nicht erwaehnen.

PRUEFKRITERIEN (12 Punkte):
1. Frist: Abrechnung muss binnen 12 Monaten nach Ende des Abrechnungszeitraums beim Mieter sein (§556 Abs.3 BGB). Sonst: Nachzahlung NICHT mehr durchsetzbar (Guthaben aber schon).
2. Abrechnungszeitraum: muss klar genannt sein (max. 12 Monate).
3. Verteilerschluessel: muss angegeben sein (m², Personen, Wohneinheiten, Verbrauch).
4. Anteil des Mieters: nachvollziehbar berechnet auf Basis der angegebenen m².
5. Nicht umlagefaehige Kosten (haeufige Fehler — §1 Abs.2 BetrKV / §2 BetrKV abschliessend):
   - Reparaturen / Instandhaltung / Instandsetzung
   - Verwaltungskosten / Hausverwaltung
   - Bankgebuehren / Kontofuehrung
   - Leerstandskosten
   - Erstmalige Anschaffungen
   - Rechtsberatungskosten des Vermieters
6. Heizkosten 50/70-Regel (§7 HeizkostenV): zwischen 50% und 70% MUSS verbrauchsabhaengig abgerechnet sein. 100% nach m² ist meist unzulaessig.
7. Warm-/Kaltwasser: muss getrennt abgerechnet werden, wenn separat erfasst.
8. Muellgebuehren: nur kommunale Gebuehren, keine zusaetzlichen Aufschlaege.
9. Hausmeister: nur Hauswart-Taetigkeiten umlagefaehig — KEINE Reparaturen oder Verwaltungstaetigkeiten.
10. Versicherung: nur Sach- und Haftpflichtversicherung des Gebaeudes — nicht Rechtsschutz / persoenliche Versicherungen des Vermieters.
11. Rechenfehler: Summen, Prozente, Anteile pruefen.
12. Vorauszahlungen: Soll-Vorauszahlung im Vergleich zu tatsaechlich gezahlten Betraegen.

CONFIDENCE-SYSTEM (verwende diese Tags in der Analyse):
- 🟢 SIGURNO: harte rechtliche/mathematische Tatsachen (Frist, Rechenfehler, fehlende Pflichtangaben)
- 🟡 VRIJEDI PROVJERITI: vermutlich problematisch, abhaengig vom Mietvertrag
- 🔵 INFORMATIVNO: ungewoehnlich, aber nicht zwangslaeufig falsch

VERBOTEN:
- "Garantujemo povrat XY EUR"
- "Tvoj gazda krsi zakon"
- "Tuzi gazdu"
- Konkrete EUR-Summen als Versprechen

ERLAUBT:
- "U slicnim slucajevima sudovi su odlucili..."
- "Procjena moguceg sporenog iznosa: cca. XX–YY EUR (informativno)"
- "Preporucujemo provjeru sa Mieterbund-om ili odvjetnikom"

AUSGABEFORMAT — verwende EXAKT diese Markdown-Ueberschriften:

## 📄 Sta je ovo
Kratko: tip dokumenta, period, ukupan iznos, ko salje, sta gazda trazi (Nachzahlung) ili vraca (Guthaben). 3–4 recenice na BKS.

## ⏰ Provjera roka (§556 BGB)
Datum kraja perioda + datum slanja/prijema. Tag 🟢 ili 🟡.
Ako je preko 12 mjeseci → "Nachzahlung NIJE pravno utuziva (info, ne pravni savjet)".

## 📐 Pravna struktura obracuna
Provjera 4 obavezne komponente:
- Period naveden? ✓/✗
- Ukupni troskovi naveden? ✓/✗
- Kljuc raspodjele (Verteilerschluessel)? ✓/✗
- Tvoj udio (m²/osobe/jedinice)? ✓/✗
Svaka tacka sa tag-om.

## 🔥 Heizung obracun (HeizkostenV §7)
Provjeri 50/70 pravilo. Tag 🟢 ako je ispravno, 🟡 ako nije.

## ⚠️ Sumnjive stavke (najvazniji dio)
Lista pronadjenih stavki koje su PO ZAKONU obicno NE-umlagefaehig.
Za svaku: 
- Naziv stavke + iznos iz dokumenta
- Pravna osnova (§ BetrKV / HeizkostenV)
- Tag (🟢/🟡/🔵)
- Kratko objasnjenje (1–2 recenice)
Ako nema sumnjivih stavki: "Nismo pronasli ocigledne stavke koje krse §2 BetrKV. To ne znaci da je obracun 100% ispravan — preporucujemo provjeru sa Mieterbund-om za potpunu sigurnost."

## 🧮 Provjera matematike
Da li se sume slazu? Da li je tvoj udio tacno izracunat?

## 📊 Procjena (informativno, NE garancija)
"Ukupan iznos sumnjivih stavki (informativno): cca. XX EUR. Tvoj udio od toga (po prijavljenom kljucu raspodjele): cca. YY EUR. Ovo NIJE iznos koji garantovano dobijes nazad — to je iznos koji vrijedi pravno provjeriti."

## ✉️ Sljedeci korak
Konkretne preporuke:
1. Posalji gazdi "Bitte um Erlaeuterung" (mekani upit, ne Widerspruch) za sumnjive stavke
2. Trazi Belege (originalne racune) — imas pravo po §259 BGB
3. Ako gazda odbije ili stavke ostanu sporne → kontaktiraj Mieterbund (60–90€/god) ili odvjetnika za Mietrecht
4. Rok za prigovor: do sljedece godisnje uplate (§556 Abs.3 S.5 BGB)

## ⚖️ Pravna napomena
"Ova analiza je INFORMATIVNA POMOC, ne pravni savjet u smislu Rechtsdienstleistungsgesetz. BalkanLink nije advokat ni Mieterverein. Za pravno obavezujucu provjeru obratite se Mieterbund-u ili odvjetniku specijalizovanom za Mietrecht. BalkanLink ne preuzima odgovornost za odluke donesene na osnovu ove analize."

KVALITETNA PROVJERA PRIJE ODGOVORA:
- Da li sam bio iskren o ogranicenjima?
- Da li sam izbjegao garancije?
- Da li su tagovi (🟢/🟡/🔵) dosljedno korisceni?
Ako NE → ispravi prije slanja.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
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

    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("is_premium, subscription_expires_at")
      .eq("id", userId)
      .maybeSingle();

    const now = new Date();
    const isPremium = !!profile?.is_premium &&
      (!profile.subscription_expires_at || new Date(profile.subscription_expires_at) > now);

    // Free: 1 preview-skeniranje na dan (samo prve 2 sekcije se vraćaju klijentu)
    if (!isPremium) {
      const { data: allowed, error: rpcErr } = await adminSupabase.rpc("consume_doc_check", {
        uid: userId,
        daily_limit: 1,
      });
      if (rpcErr) {
        console.error("consume_doc_check error:", rpcErr.message);
        return new Response(
          JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Provjera kvote nije uspjela." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!allowed) {
        return new Response(
          JSON.stringify({
            success: false,
            errorCode: "QUOTA_EXCEEDED",
            message: "Besplatna dnevna kvota iskorištena. Premium daje neograničene analize.",
          }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
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

    if (!text && files.length === 0) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "EMPTY_INPUT", message: "Nije poslan tekst ni fajl." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Server-Konfigurationsfehler." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (files.length > 0) {
      const userContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
      const intro = files.length === 1
        ? "Analiziraj ovu Nebenkostenabrechnung detaljno koristeci SVE sekcije iz formata. Budi konzervativan i iskren."
        : `Analiziraj ovu Nebenkostenabrechnung — dokument se sastoji od ${files.length} stranica/fajlova (priloženi redom). Tretiraj ih kao JEDAN dokument i napravi JEDNU objedinjenu analizu koristeci SVE sekcije iz formata. Budi konzervativan i iskren.`;
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
        content: `Analiziraj sljedeci tekst Nebenkostenabrechnung detaljno koristeci SVE sekcije iz formata. Budi konzervativan i iskren.\n\n---\n${text}\n---`,
      });
    }

    // Protective daily cap for full-access users (free users keep the existing 1/day preview).
    let nkReservation: Reservation | null = null;
    if (isPremium) {
      try {
        nkReservation = await reserveUsage(adminSupabase, userId, "nebenkosten_scan");
      } catch (e) {
        console.error("nebenkosten usage reserve error", e instanceof Error ? e.message : "unknown");
      }
      if (nkReservation && !nkReservation.ok) {
        return new Response(
          JSON.stringify({ success: false, errorCode: "DAILY_CAP", message: "Dnevni limit analiza je dostignut. Pokušaj sutra." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log("[nebenkosten-scan] Calling AI...", { userId, isPremium, fileCount: files.length });

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
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      await releaseUsage(adminSupabase, nkReservation);
      const errText = await response.text();
      console.error("AI API error:", response.status, errText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, errorCode: "RATE_LIMITED", message: "Previse zahtjeva. Pokusajte ponovo za par trenutaka." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, errorCode: "CREDITS_EXHAUSTED", message: "Servis privremeno nedostupan." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analiza nije uspjela." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";

    if (!result) {
      await releaseUsage(adminSupabase, nkReservation);
      return new Response(
        JSON.stringify({ success: false, errorCode: "PARSING_FAILED", message: "Analiza nije mogla biti provedena." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await commitUsage(adminSupabase, nkReservation);
    return new Response(
      JSON.stringify({ success: true, analysis: result, isPremium }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("nebenkosten-scan error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ success: false, errorCode: "SERVER_ERROR", message: "Analiza nije uspjela. Pokusajte ponovo." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
