import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = userData.user.id;
    const userEmail = userData.user.email;

    const [
      profile,
      payments,
      mrezaPayments,
      ads,
      notifPrefs,
      trainerProgress,
      docCheckUsage,
      chatUsage,
      formAccess,
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("payments").select("*").eq("user_id", userId),
      supabase.from("mreza_payments").select("*").eq("user_id", userId),
      supabase.from("ads").select("*").eq("user_id", userId),
      supabase.from("classifieds_notification_preferences").select("*").eq("user_id", userId),
      supabase.from("trainer_progress").select("*").eq("user_id", userId),
      supabase.from("doc_check_usage").select("*").eq("user_id", userId),
      supabase.from("chat_usage").select("*").eq("user_id", userId),
      supabase.from("user_form_access").select("*").eq("user_id", userId),
    ]);

    const exportData = {
      meta: {
        generated_at: new Date().toISOString(),
        user_id: userId,
        email: userEmail,
        gdpr_article: "GDPR Art. 15 — Pravo na pristup podacima",
        platform: "BalkanLink",
      },
      profile: profile.data ?? null,
      payments: {
        stripe: payments.data ?? [],
        mreza: mrezaPayments.data ?? [],
      },
      ads: ads.data ?? [],
      notification_preferences: notifPrefs.data ?? [],
      trainer_progress: trainerProgress.data ?? [],
      usage: {
        document_check: docCheckUsage.data ?? [],
        chat_assistant: chatUsage.data ?? [],
      },
      form_access: formAccess.data ?? [],
    };

    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="balkanlink-podaci-${userId}.json"`,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[export-user-data]", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
