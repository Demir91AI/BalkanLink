import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { bearerToken, isServiceRoleToken } from "../_shared/service-role-guard.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// =====================================================================
// LANDKREISE & KREISFREIE STÄDTE — full Germany coverage
// Each entry: [name, bundesland, lat, lng]
// =====================================================================

const LANDKREISE: [string, string, number, number][] = [
  // Baden-Württemberg
  ["Stuttgart", "Baden-Württemberg", 48.7758, 9.1829],
  ["Mannheim", "Baden-Württemberg", 49.4875, 8.4660],
  ["Karlsruhe", "Baden-Württemberg", 49.0069, 8.4037],
  ["Freiburg", "Baden-Württemberg", 47.9990, 7.8421],
  ["Heidelberg", "Baden-Württemberg", 49.3988, 8.6724],
  ["Heilbronn", "Baden-Württemberg", 49.1427, 9.2109],
  ["Ulm", "Baden-Württemberg", 48.4011, 9.9876],
  ["Pforzheim", "Baden-Württemberg", 48.8922, 8.6947],
  ["Reutlingen", "Baden-Württemberg", 48.4914, 9.2043],
  ["Tübingen", "Baden-Württemberg", 48.5216, 9.0576],
  ["Esslingen", "Baden-Württemberg", 48.7396, 9.3048],
  ["Ludwigsburg", "Baden-Württemberg", 48.8975, 9.1922],
  ["Konstanz", "Baden-Württemberg", 47.6633, 9.1751],
  ["Villingen-Schwenningen", "Baden-Württemberg", 48.0622, 8.4935],
  ["Offenburg", "Baden-Württemberg", 48.4721, 7.9408],
  ["Sindelfingen", "Baden-Württemberg", 48.7132, 9.0028],
  ["Böblingen", "Baden-Württemberg", 48.6862, 9.0106],
  ["Göppingen", "Baden-Württemberg", 48.7025, 9.6528],
  ["Waiblingen", "Baden-Württemberg", 48.8305, 9.3169],
  ["Schwäbisch Gmünd", "Baden-Württemberg", 48.7995, 9.7979],
  ["Aalen", "Baden-Württemberg", 48.8378, 10.0933],
  ["Rastatt", "Baden-Württemberg", 48.8586, 8.2036],
  ["Lörrach", "Baden-Württemberg", 47.6162, 7.6610],
  ["Freudenstadt", "Baden-Württemberg", 48.4628, 8.4108],
  ["Rottweil", "Baden-Württemberg", 48.1675, 8.6267],

  // Bayern
  ["München", "Bayern", 48.1351, 11.5820],
  ["Nürnberg", "Bayern", 49.4521, 11.0767],
  ["Augsburg", "Bayern", 48.3705, 10.8978],
  ["Regensburg", "Bayern", 49.0134, 12.1016],
  ["Ingolstadt", "Bayern", 48.7665, 11.4258],
  ["Würzburg", "Bayern", 49.7913, 9.9534],
  ["Fürth", "Bayern", 49.4774, 10.9886],
  ["Erlangen", "Bayern", 49.5897, 11.0078],
  ["Rosenheim", "Bayern", 47.8561, 12.1289],
  ["Bamberg", "Bayern", 49.8988, 10.9028],
  ["Aschaffenburg", "Bayern", 49.9769, 9.1583],
  ["Passau", "Bayern", 48.5735, 13.4513],
  ["Landshut", "Bayern", 48.5372, 12.1522],
  ["Schweinfurt", "Bayern", 50.0492, 10.2261],
  ["Freising", "Bayern", 48.4028, 11.7489],
  ["Traunstein", "Bayern", 47.8694, 12.6433],
  ["Freilassing", "Bayern", 47.8408, 12.9814],
  ["Burghausen", "Bayern", 48.1692, 12.8318],
  ["Mühldorf am Inn", "Bayern", 48.2444, 12.5223],
  ["Altötting", "Bayern", 48.2265, 12.6754],
  ["Deggendorf", "Bayern", 48.8312, 12.9598],
  ["Straubing", "Bayern", 48.8777, 12.5730],
  ["Kempten", "Bayern", 47.7267, 10.3168],
  ["Kaufbeuren", "Bayern", 47.8804, 10.6224],
  ["Memmingen", "Bayern", 47.9838, 10.1811],
  ["Hof", "Bayern", 50.3135, 11.9128],
  ["Bayreuth", "Bayern", 49.9427, 11.5761],
  ["Coburg", "Bayern", 50.2588, 10.9639],
  ["Ansbach", "Bayern", 49.3009, 10.5719],
  ["Weiden", "Bayern", 49.6768, 12.1629],

  // Berlin
  ["Berlin", "Berlin", 52.5200, 13.4050],

  // Brandenburg
  ["Potsdam", "Brandenburg", 52.3906, 13.0645],
  ["Cottbus", "Brandenburg", 51.7563, 14.3329],
  ["Frankfurt (Oder)", "Brandenburg", 52.3471, 14.5506],
  ["Brandenburg an der Havel", "Brandenburg", 52.4125, 12.5316],
  ["Oranienburg", "Brandenburg", 52.7551, 13.2425],
  ["Eberswalde", "Brandenburg", 52.8342, 13.8210],
  ["Königs Wusterhausen", "Brandenburg", 52.3012, 13.6331],

  // Bremen
  ["Bremen", "Bremen", 53.0793, 8.8017],
  ["Bremerhaven", "Bremen", 53.5396, 8.5809],

  // Hamburg
  ["Hamburg", "Hamburg", 53.5511, 9.9937],

  // Hessen
  ["Frankfurt am Main", "Hessen", 50.1109, 8.6821],
  ["Wiesbaden", "Hessen", 50.0782, 8.2398],
  ["Kassel", "Hessen", 51.3127, 9.4797],
  ["Darmstadt", "Hessen", 49.8728, 8.6512],
  ["Offenbach am Main", "Hessen", 50.0956, 8.7761],
  ["Hanau", "Hessen", 50.1264, 8.9274],
  ["Gießen", "Hessen", 50.5840, 8.6784],
  ["Marburg", "Hessen", 50.8021, 8.7667],
  ["Fulda", "Hessen", 50.5528, 9.6778],
  ["Rüsselsheim", "Hessen", 49.9895, 8.4113],
  ["Bad Homburg", "Hessen", 50.2267, 8.6183],
  ["Limburg", "Hessen", 50.3884, 8.0651],

  // Mecklenburg-Vorpommern
  ["Rostock", "Mecklenburg-Vorpommern", 54.0924, 12.0991],
  ["Schwerin", "Mecklenburg-Vorpommern", 53.6355, 11.4012],
  ["Neubrandenburg", "Mecklenburg-Vorpommern", 53.5574, 13.2614],
  ["Stralsund", "Mecklenburg-Vorpommern", 54.3093, 13.0818],
  ["Greifswald", "Mecklenburg-Vorpommern", 54.0865, 13.3923],

  // Niedersachsen
  ["Hannover", "Niedersachsen", 52.3759, 9.7320],
  ["Braunschweig", "Niedersachsen", 52.2689, 10.5268],
  ["Osnabrück", "Niedersachsen", 52.2799, 8.0472],
  ["Oldenburg", "Niedersachsen", 53.1435, 8.2146],
  ["Wolfsburg", "Niedersachsen", 52.4227, 10.7865],
  ["Göttingen", "Niedersachsen", 51.5413, 9.9158],
  ["Salzgitter", "Niedersachsen", 52.1548, 10.3318],
  ["Hildesheim", "Niedersachsen", 52.1508, 9.9512],
  ["Wilhelmshaven", "Niedersachsen", 53.5210, 8.1174],
  ["Delmenhorst", "Niedersachsen", 53.0505, 8.6317],
  ["Emden", "Niedersachsen", 53.3594, 7.2060],
  ["Celle", "Niedersachsen", 52.6224, 10.0807],
  ["Lüneburg", "Niedersachsen", 53.2464, 10.4115],
  ["Hameln", "Niedersachsen", 52.1037, 9.3568],
  ["Lingen", "Niedersachsen", 52.5222, 7.3188],
  ["Nordhorn", "Niedersachsen", 52.4311, 7.0682],
  ["Cuxhaven", "Niedersachsen", 53.8617, 8.6942],

  // Nordrhein-Westfalen
  ["Köln", "Nordrhein-Westfalen", 50.9375, 6.9603],
  ["Düsseldorf", "Nordrhein-Westfalen", 51.2277, 6.7735],
  ["Dortmund", "Nordrhein-Westfalen", 51.5136, 7.4653],
  ["Essen", "Nordrhein-Westfalen", 51.4556, 7.0116],
  ["Duisburg", "Nordrhein-Westfalen", 51.4344, 6.7624],
  ["Bochum", "Nordrhein-Westfalen", 51.4818, 7.2162],
  ["Wuppertal", "Nordrhein-Westfalen", 51.2562, 7.1508],
  ["Bielefeld", "Nordrhein-Westfalen", 52.0302, 8.5325],
  ["Bonn", "Nordrhein-Westfalen", 50.7374, 7.0982],
  ["Münster", "Nordrhein-Westfalen", 51.9607, 7.6261],
  ["Gelsenkirchen", "Nordrhein-Westfalen", 51.5177, 7.0857],
  ["Aachen", "Nordrhein-Westfalen", 50.7753, 6.0839],
  ["Mönchengladbach", "Nordrhein-Westfalen", 51.1805, 6.4428],
  ["Krefeld", "Nordrhein-Westfalen", 51.3388, 6.5853],
  ["Oberhausen", "Nordrhein-Westfalen", 51.4963, 6.8528],
  ["Hagen", "Nordrhein-Westfalen", 51.3671, 7.4633],
  ["Hamm", "Nordrhein-Westfalen", 51.6739, 7.8160],
  ["Herne", "Nordrhein-Westfalen", 51.5369, 7.2000],
  ["Solingen", "Nordrhein-Westfalen", 51.1652, 7.0671],
  ["Leverkusen", "Nordrhein-Westfalen", 51.0459, 6.9844],
  ["Neuss", "Nordrhein-Westfalen", 51.2042, 6.6879],
  ["Paderborn", "Nordrhein-Westfalen", 51.7189, 8.7544],
  ["Siegen", "Nordrhein-Westfalen", 50.8748, 8.0243],
  ["Gütersloh", "Nordrhein-Westfalen", 51.9032, 8.3856],
  ["Recklinghausen", "Nordrhein-Westfalen", 51.6141, 7.1979],
  ["Moers", "Nordrhein-Westfalen", 51.4516, 6.6263],
  ["Detmold", "Nordrhein-Westfalen", 51.9373, 8.8825],
  ["Arnsberg", "Nordrhein-Westfalen", 51.3966, 8.0642],
  ["Lüdenscheid", "Nordrhein-Westfalen", 51.2173, 7.6275],
  ["Iserlohn", "Nordrhein-Westfalen", 51.3749, 7.6944],
  ["Minden", "Nordrhein-Westfalen", 52.2891, 8.9168],

  // Rheinland-Pfalz
  ["Mainz", "Rheinland-Pfalz", 49.9929, 8.2473],
  ["Koblenz", "Rheinland-Pfalz", 50.3569, 7.5890],
  ["Ludwigshafen", "Rheinland-Pfalz", 49.4774, 8.4452],
  ["Trier", "Rheinland-Pfalz", 49.7490, 6.6371],
  ["Kaiserslautern", "Rheinland-Pfalz", 49.4447, 7.7689],
  ["Worms", "Rheinland-Pfalz", 49.6341, 8.3507],
  ["Neustadt an der Weinstraße", "Rheinland-Pfalz", 49.3498, 8.1383],
  ["Speyer", "Rheinland-Pfalz", 49.3173, 8.4311],
  ["Bad Kreuznach", "Rheinland-Pfalz", 49.8405, 7.8674],

  // Saarland
  ["Saarbrücken", "Saarland", 49.2354, 6.9960],
  ["Neunkirchen", "Saarland", 49.3446, 7.1699],
  ["Völklingen", "Saarland", 49.2524, 6.8577],
  ["Homburg", "Saarland", 49.3226, 7.3397],
  ["Saarlouis", "Saarland", 49.3135, 6.7525],

  // Sachsen
  ["Dresden", "Sachsen", 51.0504, 13.7373],
  ["Leipzig", "Sachsen", 51.3397, 12.3731],
  ["Chemnitz", "Sachsen", 50.8278, 12.9214],
  ["Zwickau", "Sachsen", 50.7183, 12.4964],
  ["Plauen", "Sachsen", 50.4974, 12.1343],
  ["Görlitz", "Sachsen", 51.1539, 14.9877],
  ["Bautzen", "Sachsen", 51.1814, 14.4244],
  ["Freiberg", "Sachsen", 50.9127, 13.3431],

  // Sachsen-Anhalt
  ["Magdeburg", "Sachsen-Anhalt", 52.1205, 11.6276],
  ["Halle (Saale)", "Sachsen-Anhalt", 51.4828, 11.9700],
  ["Dessau-Roßlau", "Sachsen-Anhalt", 51.8313, 12.2474],
  ["Stendal", "Sachsen-Anhalt", 52.6066, 11.8594],
  ["Halberstadt", "Sachsen-Anhalt", 51.8956, 11.0562],

  // Schleswig-Holstein
  ["Kiel", "Schleswig-Holstein", 54.3233, 10.1228],
  ["Lübeck", "Schleswig-Holstein", 53.8655, 10.6866],
  ["Flensburg", "Schleswig-Holstein", 54.7937, 9.4469],
  ["Neumünster", "Schleswig-Holstein", 54.0712, 9.9841],
  ["Norderstedt", "Schleswig-Holstein", 53.6960, 9.9865],
  ["Elmshorn", "Schleswig-Holstein", 53.7536, 9.6526],
  ["Pinneberg", "Schleswig-Holstein", 53.6551, 9.7987],

  // Thüringen
  ["Erfurt", "Thüringen", 50.9848, 11.0299],
  ["Jena", "Thüringen", 50.9272, 11.5892],
  ["Gera", "Thüringen", 50.8810, 12.0832],
  ["Weimar", "Thüringen", 50.9795, 11.3235],
  ["Eisenach", "Thüringen", 50.9807, 10.3195],
  ["Suhl", "Thüringen", 50.6091, 10.6940],
  ["Gotha", "Thüringen", 50.9489, 10.7018],
];

// =====================================================================
// CATEGORY SEARCH TERMS — strict Balkan-only keywords
// =====================================================================

interface CategoryConfig {
  mainCategory: string;
  subCategory: string;
  searchTerms: string[];
  excludeKeywords: string[];
  confidenceBase: number;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  dzamije_balkan: {
    mainCategory: "kultura",
    subCategory: "dzamija",
    searchTerms: [
      "dzemat", "džemat", "džamija", "dzamija", "islamski centar",
      "islamska zajednica", "bosnische moschee", "bosnischer islamischer verein",
      "bosniakische gemeinde", "islamische gemeinde bosnisch",
      "albanische moschee", "albanischer islamischer verein",
      "kosovarische moschee", "makedonische moschee",
      "sandžak gemeinde", "sandzak verein",
    ],
    excludeKeywords: [
      "türk", "turkish", "ditib", "diyanet", "afghan", "arab", "arabisch",
      "pakistan", "indian", "somali", "syrian", "syrisch", "marokk",
      "ägypt", "iran", "irani", "banglade", "tamil",
    ],
    confidenceBase: 80,
  },
  kulturvereine: {
    mainCategory: "kultura",
    subCategory: "kulturno_udruzenje",
    searchTerms: [
      "bosnischer kulturverein", "kroatischer kulturverein", "serbischer kulturverein",
      "albanischer kulturverein", "kosovarischer verein", "makedonischer verein",
      "montenegrinischer verein", "bosnische gemeinde", "kroatische gemeinde",
      "serbische gemeinde", "balkan kulturverein", "ex jugoslawischer verein",
      "folklorverein balkan", "bosniakischer verein",
    ],
    excludeKeywords: [],
    confidenceBase: 75,
  },
  crkve_balkanske: {
    mainCategory: "kultura",
    subCategory: "crkva_balkanska",
    searchTerms: [
      "kroatische mission", "kroatische katholische gemeinde", "hrvatska misija",
      "serbisch orthodoxe kirche", "serbische orthodoxe gemeinde",
      "griechisch orthodoxe kirche", "makedonisch orthodoxe",
      "rumänisch orthodoxe", "bulgarisch orthodoxe",
    ],
    excludeKeywords: [],
    confidenceBase: 80,
  },
  restorani: {
    mainCategory: "restorani",
    subCategory: "restoran",
    searchTerms: [
      "balkan restaurant", "bosnisches restaurant", "kroatisches restaurant",
      "serbisches restaurant", "albanisches restaurant", "ex yu restaurant",
      "jugoslawisches restaurant", "cevapi", "ćevapi", "cevapcici", "ćevapčići",
      "pljeskavica", "grillhaus balkan", "balkan grill",
    ],
    excludeKeywords: ["lidl", "aldi", "rewe", "edeka", "netto", "penny", "norma"],
    confidenceBase: 70,
  },
  pekare: {
    mainCategory: "prodavnice",
    subCategory: "pekara",
    searchTerms: [
      "burek", "börek balkan", "bosnische bäckerei", "balkan bäckerei",
      "pekara", "buregdzinica", "buregdžinica", "pita bäckerei",
    ],
    excludeKeywords: ["lidl", "aldi", "rewe", "edeka", "kamps", "steinecke"],
    confidenceBase: 70,
  },
  mesnice: {
    mainCategory: "prodavnice",
    subCategory: "mesnica",
    searchTerms: [
      "halal metzgerei", "balkan metzgerei", "mesnica",
      "bosnische metzgerei", "albanische metzgerei", "serbische metzgerei",
    ],
    excludeKeywords: ["lidl", "aldi", "rewe", "edeka"],
    confidenceBase: 70,
  },
  marketi: {
    mainCategory: "prodavnice",
    subCategory: "market",
    searchTerms: [
      "balkan markt", "balkan lebensmittel", "balkan shop",
      "bosnischer markt", "serbischer markt", "kroatischer markt",
      "ex yu markt", "internationaler supermarkt balkan",
    ],
    excludeKeywords: ["lidl", "aldi", "rewe", "edeka", "netto", "penny", "norma", "kaufland", "real"],
    confidenceBase: 65,
  },
  sport: {
    mainCategory: "sport",
    subCategory: "klub",
    searchTerms: [
      "bosnischer sportverein", "kroatischer sportverein", "serbischer sportverein",
      "albanischer sportverein", "balkan fußballverein", "balkan sportverein",
    ],
    excludeKeywords: [],
    confidenceBase: 65,
  },
};

// =====================================================================
// ORIGIN DETECTION — strict Balkan signals only
// =====================================================================

interface OriginRule { code: string; keywords: string[]; confidence: number; }

const ORIGIN_RULES: OriginRule[] = [
  { code: "BIH", keywords: ["bosnisch", "bosna", "bosanski", "bosnien", "džemat", "dzemat", "bosnischer", "bosansko", "bošnjačk", "bosniakisch", "bosniaken", "sandžak", "sandzak"], confidence: 90 },
  { code: "HR", keywords: ["kroatisch", "hrvatski", "kroatien", "hrvatska", "kroatische mission", "kroatische gemeinde", "katolička misija"], confidence: 90 },
  { code: "SRB", keywords: ["serbisch", "srpsk", "serbische kirche", "serbisch orthodox", "serbische orthodoxe"], confidence: 90 },
  { code: "ME", keywords: ["montenegro", "crnogorsk", "montenegrinisch"], confidence: 85 },
  { code: "MK", keywords: ["mazedonisch", "makedonisch", "makedonsk", "nordmazedonisch"], confidence: 85 },
  { code: "XK", keywords: ["kosovar", "kosovo", "kosovsk"], confidence: 85 },
  { code: "AL", keywords: ["albanisch", "albania", "albansk", "shqiptar"], confidence: 85 },
  { code: "SI", keywords: ["slowenisch", "slovensko", "slowenien"], confidence: 80 },
];

function detectOrigin(name: string, types: string[], searchTerm?: string): { code: string; confidence: number } {
  const haystack = (name + " " + (searchTerm || "")).toLowerCase();

  for (const rule of ORIGIN_RULES) {
    for (const kw of rule.keywords) {
      if (haystack.includes(kw)) return { code: rule.code, confidence: rule.confidence };
    }
  }

  // Generic Balkan signals (lower confidence)
  const balkanSignals = ["balkan", "cevap", "ćevap", "pljeskavica", "burek", "börek", "rostilj", "grillhaus", "ex yu", "jugoslaw"];
  for (const sig of balkanSignals) {
    if (haystack.includes(sig)) return { code: "BALKAN", confidence: 50 };
  }

  return { code: "BALKAN", confidence: 30 };
}

// =====================================================================
// NON-BALKAN EXCLUSION CHECK
// =====================================================================

function shouldExclude(name: string, types: string[], catConfig: CategoryConfig): boolean {
  const haystack = name.toLowerCase();

  // Check category-level excludes
  for (const ex of catConfig.excludeKeywords) {
    if (haystack.includes(ex)) return true;
  }

  // For mosques: exclude if non-Balkan signals and NO Balkan signals
  if (catConfig.subCategory === "dzamija") {
    const hasBalkanSignal = ORIGIN_RULES.some(r => r.keywords.some(kw => haystack.includes(kw)));
    const nonBalkanExclude = catConfig.excludeKeywords;
    const hasNonBalkan = nonBalkanExclude.some(ex => haystack.includes(ex));

    if (hasNonBalkan && !hasBalkanSignal) return true;

    // Also check types for generic mosque without any Balkan indicator
    if (types.includes("mosque") && !hasBalkanSignal) {
      // Check if name has any generic Balkan signal at all
      const genericBalkan = ["balkan", "bosnisch", "bosn", "kroat", "serb", "alban", "kosovar", "makedon", "džemat", "dzemat", "džamija", "sandžak", "sandzak"];
      if (!genericBalkan.some(g => haystack.includes(g))) return true;
    }
  }

  return false;
}

// =====================================================================
// GOOGLE PLACES API (New) — Text Search + Details
// =====================================================================

async function searchPlacesNearby(query: string, lat: number, lng: number, radiusM: number, apiKey: string): Promise<any[]> {
  const textQuery = `${query}`;
  const url = "https://places.googleapis.com/v1/places:searchText";
  const body: any = {
    textQuery,
    languageCode: "de",
    regionCode: "DE",
    maxResultCount: 20,
    locationBias: {
      circle: { center: { latitude: lat, longitude: lng }, radius: radiusM },
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.types",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.places || [];
}

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

// =====================================================================
// MAIN HANDLER
// =====================================================================

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    return JSON.parse(atob(payload)) as Record<string, unknown>;
  } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Require a signature-verified service-role key — admin/cron-only, can destroy data.
    if (!(await isServiceRoleToken(bearerToken(req)))) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_SERVER_KEY");
    if (!GOOGLE_API_KEY) throw new Error("GOOGLE_PLACES_SERVER_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let categoryFilter: string | null = null;
    let bundeslandFilter: string | null = null;
    let radiusM = 20000; // 20km default
    let cleanFirst = false;
    try {
      const body = await req.json();
      categoryFilter = body.category || null;
      bundeslandFilter = body.bundesland || null;
      radiusM = body.radius || 20000;
      cleanFirst = body.clean === true;
    } catch { /* defaults */ }

    // Optional: clean google_places records first
    if (cleanFirst) {
      const { error: delErr } = await supabase
        .from("community_listings")
        .delete()
        .eq("source", "google_places")
        .eq("verified_by_admin", false);
      if (delErr) console.error("Clean delete error:", delErr.message);
      else console.log("Cleaned non-verified google_places records");
    }

    const categories = categoryFilter
      ? { [categoryFilter]: CATEGORIES[categoryFilter] }
      : CATEGORIES;

    const locations = bundeslandFilter
      ? LANDKREISE.filter(([, bl]) => bl === bundeslandFilter)
      : LANDKREISE;

    let imported = 0, skipped = 0, excluded = 0, total = 0, verified_skipped = 0;
    const excludeReasons: Record<string, number> = {};

    function trackExclude(reason: string) {
      excluded++;
      excludeReasons[reason] = (excludeReasons[reason] || 0) + 1;
    }

    for (const [catKey, catConfig] of Object.entries(categories)) {
      if (!catConfig) continue;
      for (const [locName, bl, lat, lng] of locations) {
        for (const term of catConfig.searchTerms) {
          const results = await searchPlacesNearby(term, lat, lng, radiusM, GOOGLE_API_KEY);
          total += results.length;

          for (const place of results) {
            if (!place.id) { skipped++; continue; }

            const placeName = place.displayName?.text || "";
            const placeTypes = place.types || [];

            // Exclusion check
            if (shouldExclude(placeName, placeTypes, catConfig)) {
              trackExclude(`excluded:${catKey}:non_balkan_signal`);
              continue;
            }

            // Check if already verified by admin
            const { data: existing } = await supabase
              .from("community_listings")
              .select("id, verified_by_admin, locked_fields")
              .eq("google_place_id", place.id)
              .maybeSingle();

            if (existing?.verified_by_admin) { verified_skipped++; continue; }

            // Fetch Place Details
            const details = await getPlaceDetails(place.id, GOOGLE_API_KEY);
            if (!details) { skipped++; continue; }
            if (details.businessStatus === "CLOSED_PERMANENTLY") {
              trackExclude("closed_permanently");
              continue;
            }

            const detailName = details.displayName?.text;
            const detailAddress = details.formattedAddress;
            if (!detailName || !detailAddress) { skipped++; continue; }

            const { city: detailCity, bundesland: detailBl, postalCode, country } = extractFromAddressComponents(details.addressComponents);
            if (country && country !== "DE") {
              trackExclude("not_germany");
              continue;
            }

            // Re-check exclusion with full details name
            if (shouldExclude(detailName, placeTypes, catConfig)) {
              trackExclude(`excluded:${catKey}:details_non_balkan`);
              continue;
            }

            const latVal = details.location?.latitude || null;
            const lngVal = details.location?.longitude || null;
            const mapsUrl = details.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${place.id}`;
            const website = details.websiteUri || null;

            const origin = detectOrigin(detailName, placeTypes, term);

            // Build upsert record — respect locked_fields
            const lockedFields = existing?.locked_fields || {};
            const record: Record<string, any> = {
              google_place_id: place.id,
              name: lockedFields.name ? undefined : detailName,
              address: lockedFields.address ? undefined : detailAddress,
              city: lockedFields.city ? undefined : (detailCity || locName),
              bundesland: lockedFields.bundesland ? undefined : (detailBl || bl),
              postal_code: lockedFields.postal_code ? undefined : postalCode,
              lat: lockedFields.lat ? undefined : latVal,
              lng: lockedFields.lng ? undefined : lngVal,
              business_status: details.businessStatus || "OPERATIONAL",
              origin_country: lockedFields.origin_country ? undefined : origin.code,
              origin_confidence: origin.confidence,
              main_category: lockedFields.main_category ? undefined : catConfig.mainCategory,
              sub_category: lockedFields.sub_category ? undefined : catConfig.subCategory,
              category_confidence: catConfig.confidenceBase,
              google_maps_url: mapsUrl,
              website: lockedFields.website ? undefined : website,
              needs_review: false,
              source: "google_places",
              imported_at: new Date().toISOString(),
            };

            // Remove undefined keys
            for (const k of Object.keys(record)) {
              if (record[k] === undefined) delete record[k];
            }

            const { error } = await supabase
              .from("community_listings")
              .upsert(record, { onConflict: "google_place_id" });

            if (error) { console.error(`Upsert error for ${detailName}:`, error.message); skipped++; }
            else { imported++; }

            await new Promise((r) => setTimeout(r, 120));
          }
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }

    // Sort exclude reasons
    const topExcludes = Object.entries(excludeReasons)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    const result = {
      success: true,
      total,
      imported,
      skipped,
      excluded,
      verified_skipped,
      top_exclude_reasons: topExcludes,
      timestamp: new Date().toISOString(),
    };
    console.log("Import complete:", JSON.stringify(result));
    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Import error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
