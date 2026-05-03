import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

function getIP(req: Request): string | null {
  const h = req.headers;
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    null
  );
}

async function geoLookup(ip: string): Promise<{ country: string | null; city: string | null }> {
  try {
    const r = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return { country: null, city: null };
    const d = await r.json();
    return {
      country: d.country || d.country_code || null,
      city: d.city || null,
    };
  } catch {
    return { country: null, city: null };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const path = String(body.path || "/").slice(0, 500);
    const analytics = body.analytics === true;
    const referrer = analytics && body.referrer ? String(body.referrer).slice(0, 500) : null;
    const userAgent = analytics ? (req.headers.get("user-agent")?.slice(0, 255) || null) : null;

    let userId: string | null = null;
    const auth = req.headers.get("authorization");
    if (auth?.startsWith("Bearer ")) {
      try {
        const supa = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_ANON_KEY")!,
          { global: { headers: { Authorization: auth } } },
        );
        const { data } = await supa.auth.getUser();
        userId = data.user?.id ?? null;
      } catch { /* ignore */ }
    }

    let ipHash: string | null = null;
    let geo: { country: string | null; city: string | null } = { country: null, city: null };

    if (analytics) {
      const ip = getIP(req);
      ipHash = ip ? await sha256(ip + (Deno.env.get("SUPABASE_URL") || "")) : null;
      geo = ip ? await geoLookup(ip) : { country: null, city: null };
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    await admin.from("page_views").insert({
      path,
      user_id: userId,
      referrer,
      user_agent: userAgent,
      ip_hash: ipHash,
      country: geo.country,
      city: geo.city,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
