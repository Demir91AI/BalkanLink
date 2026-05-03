import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { jsPDF } from "https://esm.sh/jspdf@2.5.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function fmtDate(iso?: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}.${mm}.${yyyy} ${hh}:${mi}`;
  } catch {
    return String(iso);
  }
}

function fmtDateOnly(iso?: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  } catch {
    return String(iso);
  }
}

// Replace diacritics with ASCII equivalents (jsPDF default fonts don't ship čćžšđ)
function asciiSafe(s: unknown): string {
  if (s === null || s === undefined) return "—";
  const str = String(s);
  return str
    .replace(/č/g, "c").replace(/Č/g, "C")
    .replace(/ć/g, "c").replace(/Ć/g, "C")
    .replace(/ž/g, "z").replace(/Ž/g, "Z")
    .replace(/š/g, "s").replace(/Š/g, "S")
    .replace(/đ/g, "dj").replace(/Đ/g, "Dj");
}

function buildTextReport(opts: {
  email: string | null | undefined;
  userId: string;
  profile: any;
  payments: any[];
  mreza: any[];
  ads: any[];
  formAccess: any[];
  trainerProgress: any;
  docCheckUsage: any[];
  chatUsage: any[];
  notifPrefs: any[];
}): string {
  const { email, userId, profile: p, payments, mreza, ads, formAccess, trainerProgress: tp, docCheckUsage, chatUsage, notifPrefs } = opts;

  const section = (title: string) => {
    const line = "─".repeat(60);
    return `\n${line}\n  ${title.toUpperCase()}\n${line}\n`;
  };
  const kv = (label: string, value: unknown) => {
    const v = value === null || value === undefined || value === "" ? "—" : String(value);
    return `  ${label.padEnd(28, " ")}${v}\n`;
  };

  let out = "";
  out += "═══════════════════════════════════════════════════════════\n";
  out += "       BALKANLINK — IZVJEŠTAJ O TVOJIM PODACIMA\n";
  out += "       GDPR čl. 15 — Pravo na pristup podacima\n";
  out += "═══════════════════════════════════════════════════════════\n";
  out += `\n  Generisano:    ${fmtDate(new Date().toISOString())}\n`;
  out += `  Korisnik:      ${email ?? "—"}\n`;
  out += `  ID računa:     ${userId}\n`;

  out += section("Profil");
  if (p) {
    out += kv("Ime", p.first_name);
    out += kv("Email", p.email);
    out += kv("Račun kreiran", fmtDate(p.created_at));
    out += kv("Posljednja prijava", fmtDate(p.last_login_at));
    out += kv("Premium status", p.is_premium ? "Aktivan" : "Neaktivan");
    out += kv("Paket", p.subscription_tier);
    out += kv("Pretplata ističe", fmtDateOnly(p.subscription_expires_at));
  } else {
    out += "  (nema podataka)\n";
  }

  out += section("Plaćanja (Stripe)");
  if (payments.length === 0) {
    out += "  (nema zabilježenih plaćanja)\n";
  } else {
    for (const pay of payments) {
      out += `  • ${fmtDate(pay.created_at)}  ${pay.amount} ${(pay.currency ?? "EUR").toUpperCase()}  —  ${pay.status}\n`;
      if (pay.transaction_id) out += `    Transakcija: ${pay.transaction_id}\n`;
    }
  }

  if (mreza.length > 0) {
    out += section("Plaćanja (Mreža / oglasi)");
    for (const pay of mreza) {
      out += `  • ${fmtDate(pay.created_at)}  ${pay.amount} ${(pay.currency ?? "EUR").toUpperCase()}  —  ${pay.status}  (${pay.product_type})\n`;
    }
  }

  out += section("Oglasi");
  if (ads.length === 0) {
    out += "  (nema oglasa)\n";
  } else {
    for (const ad of ads) {
      out += `  • [${ad.status}] ${ad.title}\n`;
      out += `    ${ad.city}, ${ad.bundesland}  —  ${ad.domain}/${ad.type}\n`;
      out += `    Postavljeno: ${fmtDate(ad.created_at)}\n`;
    }
  }

  out += section("Pristup formularima (Premium)");
  if (formAccess.length === 0) {
    out += "  (nema posebnih pristupa)\n";
  } else {
    for (const a of formAccess) {
      out += `  • ${a.form_slug}  —  ${fmtDateOnly(a.purchased_at)}  (${a.status})\n`;
    }
  }

  out += section("Deutsch Trainer napredak");
  if (tp) {
    out += kv("Nivo", tp.level);
    out += kv("XP", tp.xp);
    out += kv("Streak", tp.streak);
    out += kv("Završene lekcije", (tp.completed_lessons ?? []).length);
    out += kv("Posljednja izmjena", fmtDate(tp.updated_at));
  } else {
    out += "  (nema napretka)\n";
  }

  out += section("Korištenje servisa");
  out += kv("Provjere dokumenata", docCheckUsage.length);
  out += kv("Pitanja Asistentu", chatUsage.length);

  if (notifPrefs.length > 0) {
    out += section("Notifikacije (oglasi)");
    for (const pref of notifPrefs) {
      out += `  • ${pref.category}: ${pref.enabled ? "uključeno" : "isključeno"}\n`;
    }
  }

  out += "\n═══════════════════════════════════════════════════════════\n";
  out += "  Ovo je tvoja kompletna kopija podataka u skladu sa\n";
  out += "  GDPR članom 15. Za brisanje računa (čl. 17) koristi\n";
  out += "  opciju u 'Postavke računa' na profilu.\n";
  out += "\n  Kontakt: kontakt@realcore-digital.de\n";
  out += "═══════════════════════════════════════════════════════════\n";

  return out;
}

function buildPdfReport(opts: {
  email: string | null | undefined;
  userId: string;
  profile: any;
  payments: any[];
  mreza: any[];
  ads: any[];
  formAccess: any[];
  trainerProgress: any;
  docCheckUsage: any[];
  chatUsage: any[];
  notifPrefs: any[];
}): Uint8Array {
  const { email, userId, profile: p, payments, mreza, ads, formAccess, trainerProgress: tp, docCheckUsage, chatUsage, notifPrefs } = opts;

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const contentWidth = pageWidth - marginX * 2;
  let y = 56;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 56) {
      doc.addPage();
      y = 56;
    }
  };

  const writeLine = (text: string, opts2?: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number }) => {
    const size = opts2?.size ?? 10;
    const bold = opts2?.bold ?? false;
    const color = opts2?.color ?? [30, 30, 30];
    const gap = opts2?.gap ?? 4;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const safe = asciiSafe(text);
    const lines = doc.splitTextToSize(safe, contentWidth);
    for (const line of lines) {
      ensureSpace(size + gap);
      doc.text(line, marginX, y);
      y += size + gap;
    }
  };

  const sectionHeader = (title: string) => {
    y += 10;
    ensureSpace(28);
    doc.setDrawColor(201, 168, 76); // gold
    doc.setLineWidth(0.8);
    doc.line(marginX, y - 4, marginX + contentWidth, y - 4);
    writeLine(title.toUpperCase(), { size: 11, bold: true, color: [10, 25, 60], gap: 6 });
  };

  const kvRow = (label: string, value: unknown) => {
    const v = value === null || value === undefined || value === "" ? "—" : String(value);
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(asciiSafe(label), marginX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 20, 20);
    const valueLines = doc.splitTextToSize(asciiSafe(v), contentWidth - 170);
    doc.text(valueLines, marginX + 170, y);
    y += Math.max(14, valueLines.length * 12);
  };

  // Header
  doc.setFillColor(2, 6, 23); // navy
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(201, 168, 76);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BalkanLink", marginX, 26);
  doc.setTextColor(220, 220, 220);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Izvjestaj o tvojim podacima — GDPR cl. 15", pageWidth - marginX, 26, { align: "right" });
  y = 70;

  writeLine("Tvoj izvjestaj o podacima", { size: 18, bold: true, color: [10, 25, 60], gap: 6 });
  writeLine(`Generisano: ${fmtDate(new Date().toISOString())}`, { size: 9, color: [110, 110, 110] });
  writeLine(`Korisnik: ${email ?? "—"}`, { size: 9, color: [110, 110, 110] });
  writeLine(`ID racuna: ${userId}`, { size: 9, color: [110, 110, 110] });

  sectionHeader("Profil");
  if (p) {
    kvRow("Ime", p.first_name);
    kvRow("Email", p.email);
    kvRow("Racun kreiran", fmtDate(p.created_at));
    kvRow("Posljednja prijava", fmtDate(p.last_login_at));
    kvRow("Premium status", p.is_premium ? "Aktivan" : "Neaktivan");
    kvRow("Paket", p.subscription_tier);
    kvRow("Pretplata istice", fmtDateOnly(p.subscription_expires_at));
  } else {
    writeLine("(nema podataka)", { size: 10, color: [120, 120, 120] });
  }

  sectionHeader("Placanja (Stripe)");
  if (payments.length === 0) {
    writeLine("(nema zabiljezenih placanja)", { size: 10, color: [120, 120, 120] });
  } else {
    for (const pay of payments) {
      writeLine(
        `• ${fmtDate(pay.created_at)}   ${pay.amount} ${(pay.currency ?? "EUR").toUpperCase()}   —   ${pay.status}`,
        { size: 10 }
      );
      if (pay.transaction_id) {
        writeLine(`   Transakcija: ${pay.transaction_id}`, { size: 8, color: [120, 120, 120] });
      }
    }
  }

  if (mreza.length > 0) {
    sectionHeader("Placanja (Mreza / oglasi)");
    for (const pay of mreza) {
      writeLine(
        `• ${fmtDate(pay.created_at)}   ${pay.amount} ${(pay.currency ?? "EUR").toUpperCase()}   —   ${pay.status}   (${pay.product_type})`,
        { size: 10 }
      );
    }
  }

  sectionHeader("Oglasi");
  if (ads.length === 0) {
    writeLine("(nema oglasa)", { size: 10, color: [120, 120, 120] });
  } else {
    for (const ad of ads) {
      writeLine(`• [${ad.status}] ${ad.title}`, { size: 10, bold: true });
      writeLine(`   ${ad.city}, ${ad.bundesland} — ${ad.domain}/${ad.type}`, { size: 9, color: [80, 80, 80] });
      writeLine(`   Postavljeno: ${fmtDate(ad.created_at)}`, { size: 9, color: [120, 120, 120] });
    }
  }

  sectionHeader("Pristup formularima (Premium)");
  if (formAccess.length === 0) {
    writeLine("(nema posebnih pristupa)", { size: 10, color: [120, 120, 120] });
  } else {
    for (const a of formAccess) {
      writeLine(`• ${a.form_slug}   —   ${fmtDateOnly(a.purchased_at)}   (${a.status})`, { size: 10 });
    }
  }

  sectionHeader("Deutsch Trainer napredak");
  if (tp) {
    kvRow("Nivo", tp.level);
    kvRow("XP", tp.xp);
    kvRow("Streak", tp.streak);
    kvRow("Zavrsene lekcije", (tp.completed_lessons ?? []).length);
    kvRow("Posljednja izmjena", fmtDate(tp.updated_at));
  } else {
    writeLine("(nema napretka)", { size: 10, color: [120, 120, 120] });
  }

  sectionHeader("Koristenje servisa");
  kvRow("Provjere dokumenata", docCheckUsage.length);
  kvRow("Pitanja Asistentu", chatUsage.length);

  if (notifPrefs.length > 0) {
    sectionHeader("Notifikacije (oglasi)");
    for (const pref of notifPrefs) {
      writeLine(`• ${pref.category}: ${pref.enabled ? "ukljuceno" : "iskljuceno"}`, { size: 10 });
    }
  }

  // Footer on each page
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(230, 230, 230);
    doc.line(marginX, pageHeight - 36, pageWidth - marginX, pageHeight - 36);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text("BalkanLink — kontakt@realcore-digital.de", marginX, pageHeight - 22);
    doc.text(`Strana ${i} / ${pageCount}`, pageWidth - marginX, pageHeight - 22, { align: "right" });
  }

  const ab = doc.output("arraybuffer");
  return new Uint8Array(ab);
}

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

    // Determine format: ?format=pdf or ?format=txt (default txt for backward compat)
    const url = new URL(req.url);
    const format = (url.searchParams.get("format") ?? "txt").toLowerCase();

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
      supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("mreza_payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("ads").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("classifieds_notification_preferences").select("*").eq("user_id", userId),
      supabase.from("trainer_progress").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("doc_check_usage").select("*").eq("user_id", userId).order("used_at", { ascending: false }),
      supabase.from("chat_usage").select("*").eq("user_id", userId).order("used_at", { ascending: false }),
      supabase.from("user_form_access").select("*").eq("user_id", userId).order("purchased_at", { ascending: false }),
    ]);

    const payload = {
      email: userEmail,
      userId,
      profile: profile.data,
      payments: payments.data ?? [],
      mreza: mrezaPayments.data ?? [],
      ads: ads.data ?? [],
      formAccess: formAccess.data ?? [],
      trainerProgress: trainerProgress.data,
      docCheckUsage: docCheckUsage.data ?? [],
      chatUsage: chatUsage.data ?? [],
      notifPrefs: notifPrefs.data ?? [],
    };

    const dateStr = new Date().toISOString().slice(0, 10);

    if (format === "pdf") {
      const pdfBytes = buildPdfReport(payload);
      return new Response(pdfBytes, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="balkanlink-podaci-${dateStr}.pdf"`,
        },
      });
    }

    const txt = buildTextReport(payload);
    return new Response(txt, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="balkanlink-podaci-${dateStr}.txt"`,
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
