import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getPlaceDetails(placeId: string, apiKey: string) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,location,businessStatus,googleMapsUri,types,addressComponents",
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

function extractFromAddressComponents(components: any[]): { city: string | null; bundesland: string | null; postalCode: string | null } {
  let city: string | null = null;
  let bundesland: string | null = null;
  let postalCode: string | null = null;
  if (!components) return { city, bundesland, postalCode };
  for (const comp of components) {
    if (comp.types?.includes("locality")) city = comp.longText || comp.shortText || null;
    if (comp.types?.includes("administrative_area_level_1")) bundesland = comp.longText || comp.shortText || null;
    if (comp.types?.includes("postal_code")) postalCode = comp.longText || comp.shortText || null;
  }
  if (!city) {
    for (const comp of components) {
      if (comp.types?.includes("administrative_area_level_3")) { city = comp.longText || comp.shortText || null; break; }
    }
  }
  return { city, bundesland, postalCode };
}

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
    // Require service-role JWT — cron-only endpoint.
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    if (!token || parseJwtClaims(token)?.role !== "service_role") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_SERVER_KEY");
    if (!GOOGLE_API_KEY) throw new Error("GOOGLE_PLACES_SERVER_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let offset = 0;
    let batchSize = 50;
    try {
      const body = await req.json();
      offset = body.offset || 0;
      batchSize = body.batch_size || 50;
    } catch { /* defaults */ }

    // Only fetch UNVERIFIED listings with google_place_id
    const { data: listings, error: fetchErr } = await supabase
      .from("community_listings")
      .select("id, google_place_id, name, address, city, bundesland, verified_by_admin")
      .not("google_place_id", "is", null)
      .eq("verified_by_admin", false)
      .order("created_at", { ascending: true })
      .range(offset, offset + batchSize - 1);

    if (fetchErr) throw new Error(`DB fetch error: ${fetchErr.message}`);
    if (!listings || listings.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No more unverified listings to process", offset, updated: 0, removed: 0, errors: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing batch: offset=${offset}, count=${listings.length}`);

    let updated = 0, removed = 0, errors = 0, unchanged = 0;

    for (const listing of listings) {
      try {
        const details = await getPlaceDetails(listing.google_place_id, GOOGLE_API_KEY);

        if (!details) {
          await supabase.from("community_listings").delete().eq("id", listing.id);
          removed++;
          continue;
        }

        if (details.businessStatus === "CLOSED_PERMANENTLY") {
          await supabase.from("community_listings").delete().eq("id", listing.id);
          removed++;
          continue;
        }

        const newName = details.displayName?.text || listing.name;
        const newAddress = details.formattedAddress || listing.address;
        const { city: newCity, bundesland: newBl, postalCode } = extractFromAddressComponents(details.addressComponents);
        const lat = details.location?.latitude || null;
        const lng = details.location?.longitude || null;
        const mapsUrl = details.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${listing.google_place_id}`;

        const { error: updErr } = await supabase
          .from("community_listings")
          .update({
            name: newName,
            address: newAddress,
            city: newCity || listing.city,
            bundesland: newBl || listing.bundesland,
            postal_code: postalCode,
            lat, lng,
            business_status: details.businessStatus || "OPERATIONAL",
            google_maps_url: mapsUrl,
          })
          .eq("id", listing.id);

        if (updErr) { errors++; } else { updated++; }
        await new Promise((r) => setTimeout(r, 100));
      } catch (e) {
        console.error(`Error processing ${listing.name}:`, e);
        errors++;
      }
    }

    const hasMore = listings.length === batchSize;
    const result = {
      success: true, offset, processed: listings.length,
      updated, removed, unchanged, errors,
      has_more: hasMore, next_offset: hasMore ? offset + batchSize : null,
      timestamp: new Date().toISOString(),
    };
    console.log("Batch complete:", result);
    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Refresh error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
