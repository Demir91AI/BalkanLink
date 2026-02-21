import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ---------- CONFIG ----------

const BUNDESLAENDER_CITIES: Record<string, string[]> = {
  "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heilbronn", "Ulm", "Pforzheim"],
  "Bayern": ["München", "Nürnberg", "Augsburg", "Regensburg", "Ingolstadt", "Würzburg"],
  "Berlin": ["Berlin"],
  "Brandenburg": ["Potsdam", "Cottbus"],
  "Bremen": ["Bremen", "Bremerhaven"],
  "Hamburg": ["Hamburg"],
  "Hessen": ["Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"],
  "Mecklenburg-Vorpommern": ["Rostock", "Schwerin"],
  "Niedersachsen": ["Hannover", "Braunschweig", "Osnabrück", "Oldenburg", "Wolfsburg"],
  "Nordrhein-Westfalen": ["Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster", "Gelsenkirchen", "Aachen"],
  "Rheinland-Pfalz": ["Mainz", "Koblenz", "Ludwigshafen", "Trier", "Kaiserslautern"],
  "Saarland": ["Saarbrücken"],
  "Sachsen": ["Dresden", "Leipzig", "Chemnitz"],
  "Sachsen-Anhalt": ["Magdeburg", "Halle"],
  "Schleswig-Holstein": ["Kiel", "Lübeck"],
  "Thüringen": ["Erfurt", "Jena"],
};

const CATEGORY_SEARCH_TERMS: Record<string, string[]> = {
  dzamije: ["Moschee", "Islamisches Zentrum", "Džamija"],
  kultura: ["Bosnischer Kulturverein", "Kroatischer Kulturverein", "Serbischer Kulturverein", "Balkan Verein"],
  prodavnice: ["Balkan Supermarkt", "Balkan Lebensmittel", "Internationale Lebensmittel Balkan"],
  restorani: ["Balkan Restaurant", "Bosnisches Restaurant", "Kroatisches Restaurant", "Serbisches Restaurant", "Balkan Grill", "Ćevapi"],
  sport: ["Balkan Sportverein", "Bosnischer Fußballverein"],
};

const MAIN_CATEGORY_MAP: Record<string, string> = {
  dzamije: "kultura",
  kultura: "kultura",
  prodavnice: "prodavnice",
  restorani: "restorani",
  sport: "sport",
};

const SUB_CATEGORY_MAP: Record<string, string> = {
  dzamije: "dzamije",
  kultura: "udruzenja",
  prodavnice: "marketi",
  restorani: "restoran",
  sport: "fudbal",
};

interface OriginRule {
  code: string;
  keywords: string[];
}

const ORIGIN_RULES: OriginRule[] = [
  { code: "BIH", keywords: ["bosnisch", "bosna", "bosanski", "bosnien", "džemat", "bosnischer", "bosansko", "bošnjačk"] },
  { code: "HR", keywords: ["kroatisch", "hrvatski", "kroatien", "katholische mission kroat", "hrvatska"] },
  { code: "SRB", keywords: ["serbisch", "serbische kirche", "serbisch orthodox", "srpsk"] },
  { code: "ME", keywords: ["montenegro", "crnogorsk"] },
  { code: "MK", keywords: ["mazedonisch", "makedonisch", "makedonsk"] },
  { code: "XK", keywords: ["kosovar", "kosovo"] },
  { code: "AL", keywords: ["albanisch", "albania", "albansk", "shqiptar"] },
];

function detectOrigin(name: string, types: string[], searchTerm?: string): string | null {
  const haystack = (name + " " + types.join(" ") + " " + (searchTerm || "")).toLowerCase();
  for (const rule of ORIGIN_RULES) {
    for (const kw of rule.keywords) {
      if (haystack.includes(kw)) return rule.code;
    }
  }
  if (haystack.includes("moschee") || haystack.includes("mosque") || haystack.includes("islamic") || haystack.includes("džamija")) return "BIH";
  if (haystack.includes("orthodox")) return "SRB";
  if (haystack.includes("katolička") || haystack.includes("catholic mission")) return "HR";
  // For generic Balkan searches, assign BALKAN as origin
  if (haystack.includes("balkan") || haystack.includes("ćevap") || haystack.includes("cevap") || haystack.includes("pljeskavica") || haystack.includes("burek")) return "BALKAN";
  return null;
}

function detectBundesland(city: string): string {
  for (const [bl, cities] of Object.entries(BUNDESLAENDER_CITIES)) {
    if (cities.some((c) => city.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(city.toLowerCase()))) {
      return bl;
    }
  }
  return "Unbekannt";
}

// ---------- GOOGLE PLACES API (NEW) - Text Search ----------

async function searchPlaces(query: string, city: string, apiKey: string): Promise<any[]> {
  const textQuery = `${query} in ${city}, Deutschland`;
  const url = "https://places.googleapis.com/v1/places:searchText";

  console.log(`Searching: "${textQuery}"`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.types,places.googleMapsUri,places.location",
    },
    body: JSON.stringify({
      textQuery,
      languageCode: "de",
      regionCode: "DE",
      maxResultCount: 20,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Places API error ${res.status}: ${errText}`);
    return [];
  }

  const data = await res.json();
  const places = data.places || [];
  console.log(`Found ${places.length} results for "${textQuery}"`);
  return places;
}

// ---------- MAIN HANDLER ----------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_SERVER_KEY");
    if (!GOOGLE_API_KEY) {
      throw new Error("GOOGLE_PLACES_SERVER_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let categoryFilter: string | null = null;
    let bundeslandFilter: string | null = null;
    let cityFilter: string | null = null;
    try {
      const body = await req.json();
      categoryFilter = body.category || null;
      bundeslandFilter = body.bundesland || null;
      cityFilter = body.city || null;
    } catch {
      // No body = run all
    }

    const categories = categoryFilter
      ? { [categoryFilter]: CATEGORY_SEARCH_TERMS[categoryFilter] || [] }
      : CATEGORY_SEARCH_TERMS;

    let bundeslaender: Record<string, string[]>;
    if (cityFilter && bundeslandFilter) {
      bundeslaender = { [bundeslandFilter]: [cityFilter] };
    } else if (bundeslandFilter) {
      bundeslaender = { [bundeslandFilter]: BUNDESLAENDER_CITIES[bundeslandFilter] || [] };
    } else {
      bundeslaender = BUNDESLAENDER_CITIES;
    }

    let imported = 0;
    let skipped = 0;
    let total = 0;

    for (const [catKey, searchTerms] of Object.entries(categories)) {
      for (const [bl, cities] of Object.entries(bundeslaender)) {
        for (const city of cities) {
          for (const term of searchTerms) {
            const results = await searchPlaces(term, city, GOOGLE_API_KEY);
            total += results.length;

            for (const place of results) {
              const addr = place.formattedAddress || "";
              const placeName = place.displayName?.text || "";
              
              // Accept all places with an address (search is already scoped to Germany)
              if (!addr) { skipped++; continue; }

              const origin = detectOrigin(placeName, place.types || [], term);
              if (!origin) { skipped++; continue; }

              const detectedBl = detectBundesland(city);
              const mainCat = MAIN_CATEGORY_MAP[catKey] || catKey;
              const subCat = SUB_CATEGORY_MAP[catKey] || catKey;

              const { error } = await supabase
                .from("community_listings")
                .upsert(
                  {
                    google_place_id: place.id,
                    name: placeName,
                    address: addr,
                    city,
                    bundesland: detectedBl !== "Unbekannt" ? detectedBl : bl,
                    origin_country: origin,
                    main_category: mainCat,
                    sub_category: subCat,
                    google_maps_url: place.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${place.id}`,
                  },
                  { onConflict: "google_place_id" }
                );

              if (error) {
                console.error(`Upsert error for ${placeName}:`, error.message);
                skipped++;
              } else {
                imported++;
                console.log(`✅ Imported: ${placeName} (${origin}) → ${mainCat}/${subCat}`);
              }
            }

            // Rate limit
            await new Promise((r) => setTimeout(r, 250));
          }
        }
      }
    }

    const result = { success: true, total, imported, skipped, timestamp: new Date().toISOString() };
    console.log("Import complete:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Import error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
