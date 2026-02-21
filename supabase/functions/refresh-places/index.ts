import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Fetch Place Details from Google Places API (New)
async function getPlaceDetails(placeId: string, apiKey: string) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "id,displayName,formattedAddress,location,businessStatus,googleMapsUri,types,addressComponents",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Place Details error for ${placeId}: ${res.status} ${errText}`);
    return null;
  }

  return await res.json();
}

// Extract city from addressComponents
function extractCity(addressComponents: any[]): string | null {
  if (!addressComponents) return null;
  for (const comp of addressComponents) {
    if (comp.types?.includes("locality")) {
      return comp.longText || comp.shortText || null;
    }
  }
  // Fallback to administrative_area_level_3
  for (const comp of addressComponents) {
    if (comp.types?.includes("administrative_area_level_3")) {
      return comp.longText || comp.shortText || null;
    }
  }
  return null;
}

// Extract Bundesland from addressComponents
function extractBundesland(addressComponents: any[]): string | null {
  if (!addressComponents) return null;
  for (const comp of addressComponents) {
    if (comp.types?.includes("administrative_area_level_1")) {
      return comp.longText || comp.shortText || null;
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_SERVER_KEY");
    if (!GOOGLE_API_KEY) throw new Error("GOOGLE_PLACES_SERVER_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse optional offset/limit for batching
    let offset = 0;
    let batchSize = 50; // Process 50 at a time to stay within time limits
    try {
      const body = await req.json();
      offset = body.offset || 0;
      batchSize = body.batch_size || 50;
    } catch { /* defaults */ }

    // Fetch listings with google_place_id
    const { data: listings, error: fetchErr } = await supabase
      .from("community_listings")
      .select("id, google_place_id, name, address, city, bundesland")
      .not("google_place_id", "is", null)
      .order("created_at", { ascending: true })
      .range(offset, offset + batchSize - 1);

    if (fetchErr) throw new Error(`DB fetch error: ${fetchErr.message}`);
    if (!listings || listings.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No more listings to process", offset, updated: 0, removed: 0, errors: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing batch: offset=${offset}, count=${listings.length}`);

    let updated = 0;
    let removed = 0;
    let errors = 0;
    let unchanged = 0;

    for (const listing of listings) {
      try {
        const details = await getPlaceDetails(listing.google_place_id, GOOGLE_API_KEY);

        if (!details) {
          // Place not found or API error — mark for removal
          const { error: delErr } = await supabase
            .from("community_listings")
            .delete()
            .eq("id", listing.id);
          if (!delErr) {
            removed++;
            console.log(`🗑️ Removed (API error): ${listing.name}`);
          } else {
            errors++;
          }
          continue;
        }

        // Check business status — remove closed/permanently closed
        const status = details.businessStatus;
        if (status === "CLOSED_PERMANENTLY") {
          const { error: delErr } = await supabase
            .from("community_listings")
            .delete()
            .eq("id", listing.id);
          if (!delErr) {
            removed++;
            console.log(`🗑️ Removed (permanently closed): ${listing.name}`);
          } else {
            errors++;
          }
          continue;
        }

        // Extract fresh data
        const newName = details.displayName?.text || listing.name;
        const newAddress = details.formattedAddress || listing.address;
        const newCity = extractCity(details.addressComponents) || listing.city;
        const newBundesland = extractBundesland(details.addressComponents) || listing.bundesland;
        const newMapsUrl = details.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${listing.google_place_id}`;

        // Check if anything changed
        const changed =
          newName !== listing.name ||
          newAddress !== listing.address ||
          newCity !== listing.city ||
          newBundesland !== listing.bundesland;

        if (!changed) {
          unchanged++;
          continue;
        }

        // Update the listing
        const { error: updErr } = await supabase
          .from("community_listings")
          .update({
            name: newName,
            address: newAddress,
            city: newCity,
            bundesland: newBundesland,
            google_maps_url: newMapsUrl,
          })
          .eq("id", listing.id);

        if (updErr) {
          console.error(`Update error for ${listing.name}: ${updErr.message}`);
          errors++;
        } else {
          updated++;
          console.log(`✅ Updated: ${listing.name} → ${newName} | ${newCity}, ${newBundesland}`);
        }

        // Rate limit: 100ms between requests
        await new Promise((r) => setTimeout(r, 100));
      } catch (e) {
        console.error(`Error processing ${listing.name}:`, e);
        errors++;
      }
    }

    const hasMore = listings.length === batchSize;
    const nextOffset = offset + batchSize;

    const result = {
      success: true,
      offset,
      processed: listings.length,
      updated,
      removed,
      unchanged,
      errors,
      has_more: hasMore,
      next_offset: hasMore ? nextOffset : null,
      timestamp: new Date().toISOString(),
    };

    console.log("Batch complete:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
