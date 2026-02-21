import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ---------- CITY CONFIG ----------

const BUNDESLAENDER_CITIES: Record<string, string[]> = {
  "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heilbronn", "Ulm", "Pforzheim", "Reutlingen", "Esslingen", "Ludwigsburg", "Konstanz", "Villingen-Schwenningen", "Tübingen", "Sindelfingen", "Offenburg"],
  "Bayern": ["München", "Nürnberg", "Augsburg", "Regensburg", "Ingolstadt", "Würzburg", "Fürth", "Erlangen", "Rosenheim", "Schweinfurt", "Bamberg", "Aschaffenburg", "Passau", "Freising", "Landshut"],
  "Berlin": ["Berlin"],
  "Brandenburg": ["Potsdam", "Cottbus", "Frankfurt (Oder)", "Brandenburg an der Havel"],
  "Bremen": ["Bremen", "Bremerhaven"],
  "Hamburg": ["Hamburg"],
  "Hessen": ["Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach am Main", "Hanau", "Gießen", "Marburg", "Fulda", "Rüsselsheim"],
  "Mecklenburg-Vorpommern": ["Rostock", "Schwerin", "Neubrandenburg", "Stralsund", "Greifswald"],
  "Niedersachsen": ["Hannover", "Braunschweig", "Osnabrück", "Oldenburg", "Wolfsburg", "Göttingen", "Salzgitter", "Hildesheim", "Wilhelmshaven", "Delmenhorst"],
  "Nordrhein-Westfalen": ["Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster", "Gelsenkirchen", "Aachen", "Mönchengladbach", "Krefeld", "Oberhausen", "Hagen", "Hamm", "Herne", "Solingen", "Leverkusen", "Neuss", "Paderborn", "Siegen", "Gütersloh", "Recklinghausen"],
  "Rheinland-Pfalz": ["Mainz", "Koblenz", "Ludwigshafen", "Trier", "Kaiserslautern", "Worms", "Neustadt an der Weinstraße"],
  "Saarland": ["Saarbrücken", "Neunkirchen", "Völklingen"],
  "Sachsen": ["Dresden", "Leipzig", "Chemnitz", "Zwickau", "Plauen"],
  "Sachsen-Anhalt": ["Magdeburg", "Halle (Saale)", "Dessau-Roßlau"],
  "Schleswig-Holstein": ["Kiel", "Lübeck", "Flensburg", "Neumünster"],
  "Thüringen": ["Erfurt", "Jena", "Gera", "Weimar", "Eisenach"],
};

// ---------- SEMANTIC KEYWORD CLUSTERS ----------

const CATEGORY_SEARCH_TERMS: Record<string, string[]> = {
  moscheen: [
    "Moschee", "Islamisches Zentrum", "Islamische Gemeinde", "Islamischer Verein",
    "Džamija", "Islamic Center", "Gebetsraum muslimisch",
  ],
  kirchen_gemeinden: [
    "Kroatische Mission", "Kroatische Gemeinde", "Katholische Mission Kroatisch",
    "Serbisch-Orthodoxe Kirche", "Serbische Orthodoxe Gemeinde", "Griechisch-Orthodoxe Kirche",
  ],
  restorani: [
    "Cevapcici", "Cevapi", "Ćevapi", "Grillhaus", "Balkan Grill", "Pljeskavica",
    "Grill Restaurant", "Rostilj", "Ćevabdžinica", "Balkan Restaurant",
    "Bosnisches Restaurant", "Kroatisches Restaurant", "Serbisches Restaurant",
  ],
  pekare: [
    "Burek", "Börek", "Pita Bäckerei", "Balkan Bäckerei", "Bosnische Bäckerei",
    "Pekara", "Buregdžinica",
  ],
  mesnice_marketi: [
    "Halal Metzgerei", "Balkan Markt", "Balkan Lebensmittel",
    "Internationaler Supermarkt", "Türkischer Supermarkt", "Südländischer Supermarkt",
    "Balkan Supermarkt", "Internationale Lebensmittel",
  ],
  kultura_sport: [
    "Kulturverein Bosnisch", "Kulturverein Kroatisch", "Kulturverein Serbisch",
    "Bosnischer Verein", "Kroatischer Verein", "Serbischer Verein",
    "Albanischer Verein", "Balkan Verein", "Folklorverein", "Balkan Sportverein",
    "Bosnischer Fußballverein",
  ],
};

// Map search categories → DB main_category + sub_category
const MAIN_CATEGORY_MAP: Record<string, string> = {
  moscheen: "kultura", kirchen_gemeinden: "kultura", restorani: "restorani",
  pekare: "restorani", mesnice_marketi: "prodavnice", kultura_sport: "kultura",
};
const SUB_CATEGORY_MAP: Record<string, string> = {
  moscheen: "dzamije", kirchen_gemeinden: "crkve", restorani: "restoran",
  pekare: "pekara", mesnice_marketi: "marketi", kultura_sport: "udruzenja",
};

// ---------- ORIGIN DETECTION ----------

interface OriginRule { code: string; keywords: string[]; }

const ORIGIN_RULES: OriginRule[] = [
  { code: "BIH", keywords: ["bosnisch", "bosna", "bosanski", "bosnien", "džemat", "bosnischer", "bosansko", "bošnjačk", "islamische gemeinde", "islamisches zentrum", "islamischer verein"] },
  { code: "HR", keywords: ["kroatisch", "hrvatski", "kroatien", "katholische mission kroat", "hrvatska", "kroatische mission", "kroatische gemeinde"] },
  { code: "SRB", keywords: ["serbisch", "serbische kirche", "serbisch orthodox", "srpsk", "serbische orthodoxe"] },
  { code: "ME", keywords: ["montenegro", "crnogorsk"] },
  { code: "MK", keywords: ["mazedonisch", "makedonisch", "makedonsk"] },
  { code: "XK", keywords: ["kosovar", "kosovo"] },
  { code: "AL", keywords: ["albanisch", "albania", "albansk", "shqiptar"] },
];

function detectOrigin(name: string, types: string[], searchTerm?: string): string {
  const haystack = (name + " " + types.join(" ") + " " + (searchTerm || "")).toLowerCase();
  for (const rule of ORIGIN_RULES) {
    for (const kw of rule.keywords) {
      if (haystack.includes(kw)) return rule.code;
    }
  }
  // Semantic fallbacks
  if (haystack.includes("moschee") || haystack.includes("mosque") || haystack.includes("islamic") || haystack.includes("džamija") || haystack.includes("gebetsraum")) return "BIH";
  if (haystack.includes("orthodox")) return "SRB";
  if (haystack.includes("katolička") || haystack.includes("catholic mission")) return "HR";
  // Food/shop keywords → generic BALKAN
  if (haystack.includes("cevap") || haystack.includes("ćevap") || haystack.includes("pljeskavica") || haystack.includes("burek") || haystack.includes("börek") || haystack.includes("grillhaus") || haystack.includes("rostilj") || haystack.includes("balkan") || haystack.includes("halal")) return "BALKAN";
  return "BALKAN";
}

// ---------- PLACE DETAILS ----------

async function getPlaceDetails(placeId: string, apiKey: string) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,location,businessStatus,googleMapsUri,types,addressComponents,websiteUri,internationalPhoneNumber",
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

function extractFromAddressComponents(components: any[]): { city: string | null; bundesland: string | null; postalCode: string | null; country: string | null } {
  let city: string | null = null, bundesland: string | null = null, postalCode: string | null = null, country: string | null = null;
  if (!components) return { city, bundesland, postalCode, country };
  for (const comp of components) {
    if (comp.types?.includes("locality")) city = comp.longText || comp.shortText || null;
    if (comp.types?.includes("administrative_area_level_1")) bundesland = comp.longText || comp.shortText || null;
    if (comp.types?.includes("postal_code")) postalCode = comp.longText || comp.shortText || null;
    if (comp.types?.includes("country")) country = comp.shortText || null;
  }
  if (!city) {
    for (const comp of components) {
      if (comp.types?.includes("administrative_area_level_3")) { city = comp.longText || comp.shortText || null; break; }
    }
  }
  return { city, bundesland, postalCode, country };
}

// ---------- TEXT SEARCH ----------

async function searchPlaces(query: string, city: string, apiKey: string): Promise<any[]> {
  const textQuery = `${query} in ${city}, Deutschland`;
  const url = "https://places.googleapis.com/v1/places:searchText";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.types",
    },
    body: JSON.stringify({ textQuery, languageCode: "de", regionCode: "DE", maxResultCount: 20 }),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.places || [];
}

// ---------- MAIN HANDLER ----------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_SERVER_KEY");
    if (!GOOGLE_API_KEY) throw new Error("GOOGLE_PLACES_SERVER_KEY not configured");

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
    } catch { /* defaults */ }

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

    let imported = 0, skipped = 0, total = 0, verified_skipped = 0;

    for (const [catKey, searchTerms] of Object.entries(categories)) {
      for (const [bl, cities] of Object.entries(bundeslaender)) {
        for (const city of cities) {
          for (const term of searchTerms) {
            const results = await searchPlaces(term, city, GOOGLE_API_KEY);
            total += results.length;

            for (const place of results) {
              if (!place.id) { skipped++; continue; }

              const placeName = place.displayName?.text || "";
              const origin = detectOrigin(placeName, place.types || [], term);

              // Check if already verified by admin
              const { data: existing } = await supabase
                .from("community_listings")
                .select("id, verified_by_admin")
                .eq("google_place_id", place.id)
                .maybeSingle();

              if (existing?.verified_by_admin) { verified_skipped++; continue; }

              // Fetch Place Details
              const details = await getPlaceDetails(place.id, GOOGLE_API_KEY);
              if (!details) { skipped++; continue; }
              if (details.businessStatus === "CLOSED_PERMANENTLY") { skipped++; continue; }

              const detailName = details.displayName?.text;
              const detailAddress = details.formattedAddress;
              if (!detailName || !detailAddress) { skipped++; continue; }

              const { city: detailCity, bundesland: detailBl, postalCode, country } = extractFromAddressComponents(details.addressComponents);
              if (country && country !== "DE") { skipped++; continue; }

              const lat = details.location?.latitude || null;
              const lng = details.location?.longitude || null;
              const mapsUrl = details.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${place.id}`;
              const website = details.websiteUri || null;

              const mainCat = MAIN_CATEGORY_MAP[catKey] || catKey;
              const subCat = SUB_CATEGORY_MAP[catKey] || catKey;

              const { error } = await supabase
                .from("community_listings")
                .upsert({
                  google_place_id: place.id,
                  name: detailName,
                  address: detailAddress,
                  city: detailCity || city,
                  bundesland: detailBl || bl,
                  postal_code: postalCode,
                  lat, lng,
                  business_status: details.businessStatus || "OPERATIONAL",
                  origin_country: origin,
                  main_category: mainCat,
                  sub_category: subCat,
                  google_maps_url: mapsUrl,
                  website,
                  needs_review: false,
                  source: "google_places",
                }, { onConflict: "google_place_id" });

              if (error) { console.error(`Upsert error for ${detailName}:`, error.message); skipped++; }
              else { imported++; }

              await new Promise((r) => setTimeout(r, 120));
            }
            await new Promise((r) => setTimeout(r, 200));
          }
        }
      }
    }

    const result = { success: true, total, imported, skipped, verified_skipped, timestamp: new Date().toISOString() };
    console.log("Import complete:", result);
    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Import error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
