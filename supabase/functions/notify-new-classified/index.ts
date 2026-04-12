import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

const CATEGORY_LABELS: Record<string, string> = {
  posao: "Posao i karijera",
  usluge: "Usluge",
  stanovanje: "Stanovanje",
  kupoprodaja: "Prodaja / Kupovina",
  prevoz: "Prevoz",
  porodica: "Djeca i porodica",
  ostalo: "Ostalo",
};

const SITE_URL = Deno.env.get("SITE_URL") || "https://balkan-navi-deutsch.lovable.app";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!resendKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json();
    const { ad_id, title, description, category } = body;

    if (!ad_id || !title || !category) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: ad_id, title, category" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const categoryLabel = CATEGORY_LABELS[category] || category;
    const shortDesc = (description || "").split("\n").slice(0, 2).join("\n").slice(0, 200);
    const adLink = `${SITE_URL}/nudim-trazim?ad=${ad_id}`;
    const settingsLink = `${SITE_URL}/profil/notifikacije`;

    // Find all users with enabled notifications for this category or "sve"
    const { data: subscribers } = await supabase
      .from("classifieds_notification_preferences")
      .select("user_id")
      .in("category", [category, "sve"])
      .eq("enabled", true);

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Deduplicate user_ids
    const uniqueUserIds = [...new Set(subscribers.map((s: any) => s.user_id))];

    // Fetch user emails and names from profiles
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, first_name")
      .in("id", uniqueUserIds);

    if (!profiles || profiles.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let sentCount = 0;

    for (const profile of profiles) {
      const name = profile.first_name || "Korisniče";
      const unsubscribeLink = `${SITE_URL}/profil/notifikacije`;

      const html = `
<!DOCTYPE html>
<html lang="bs">
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #ffffff; color: #1a1a2e; padding: 20px;">
  <div style="max-width: 560px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Balkan<span style="color: #C9A84C;">Link</span></span>
    </div>
    
    <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 8px;">Novi oglas — ${categoryLabel}</h2>
    
    <p style="font-size: 14px; color: #555; margin: 0 0 20px;">Zdravo ${name},</p>
    
    <p style="font-size: 14px; color: #555; margin: 0 0 16px;">
      Objavljen je novi oglas u kategoriji <strong>${categoryLabel}</strong> na BalkanLinku.
    </p>
    
    <div style="background: #f8f6f0; border: 1px solid #e8e4d8; border-radius: 8px; padding: 16px; margin: 0 0 20px;">
      <h3 style="font-size: 16px; font-weight: 700; margin: 0 0 6px; color: #1a1a2e;">${title}</h3>
      <p style="font-size: 13px; color: #666; margin: 0; white-space: pre-line;">${shortDesc}</p>
    </div>
    
    <a href="${adLink}" style="display: inline-block; background: linear-gradient(135deg, #C9A84C, #F0D080); color: #1a1a2e; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700;">
      Pogledaj oglas →
    </a>
    
    <hr style="border: none; border-top: 1px solid #e8e4d8; margin: 32px 0 16px;" />
    
    <p style="font-size: 11px; color: #999; margin: 0 0 4px;">
      Upravljaj notifikacijama: <a href="${settingsLink}" style="color: #C9A84C;">Promijeni postavke →</a>
    </p>
    <p style="font-size: 11px; color: #999; margin: 0 0 4px;">
      <a href="${settingsLink}" style="color: #999;">Odjavi se od ovih notifikacija</a>
    </p>
    <p style="font-size: 11px; color: #bbb; margin: 16px 0 0;">
      BalkanLink — Tvoj vodič kroz njemački sistem.<br/>
      Bez PDV-a prema §19 UStG.
    </p>
  </div>
</body>
</html>`;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "BalkanLink <noreply@balkanlink.de>",
            to: [profile.email],
            subject: `Novi oglas — ${categoryLabel} | BalkanLink`,
            html,
          }),
        });

        if (res.ok) {
          sentCount++;
        } else {
          const errText = await res.text();
          console.error(`Failed to send to ${profile.email}:`, errText);
        }
      } catch (e) {
        console.error(`Error sending to ${profile.email}:`, e);
      }
    }

    return new Response(
      JSON.stringify({ sent: sentCount, total: profiles.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("notify-new-classified error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
