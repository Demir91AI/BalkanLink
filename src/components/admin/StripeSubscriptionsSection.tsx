import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, CheckCircle2, AlertTriangle, CreditCard, Clock, XCircle } from "lucide-react";

interface AuditRow {
  email: string;
  user_id: string | null;
  db_tier: string | null;
  db_is_premium: boolean | null;
  db_expires_at: string | null;
  stripe_status: string | null;
  stripe_period_end: string | null;
  stripe_interval: string | null;
  cancel_at_period_end: boolean | null;
  diff_days: number | null;
  status: "ok" | "date_mismatch" | "missing_in_db" | "missing_in_stripe" | "no_stripe";
  issue: string | null;
}

interface PaymentRow {
  id: string;
  user_id: string | null;
  email: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  paid_at: string | null;
  created_at: string | null;
}

interface Summary {
  stripeSubscriptions: number;
  stripeActive: number;
  mismatches: number;
  checkedAt: string;
  payments: { paid: number; failed: number; pending: number; paidAmountCents: number };
}

const C = {
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  slate: "#94A3B8",
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
const fmtEur = (cents: number) => (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

const normalize = (s: string | null) => {
  const v = (s ?? "").toLowerCase();
  if (v === "paid" || v === "succeeded") return "paid";
  if (v === "failed" || v === "canceled" || v === "cancelled") return "failed";
  return "pending";
};

const PAY_META: Record<string, { label: string; cls: string }> = {
  paid: { label: "Plaćeno", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  failed: { label: "Neuspješno", cls: "bg-red-500/15 text-red-400 border-red-500/30" },
  pending: { label: "Na čekanju", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
};

const SUB_META: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  trialing: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  past_due: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  canceled: "bg-red-500/15 text-red-400 border-red-500/30",
  unpaid: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function StripeSubscriptionsSection() {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncingEmail, setSyncingEmail] = useState<string | null>(null);
  const [payFilter, setPayFilter] = useState<"all" | "paid" | "failed" | "pending">("all");
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("stripe-sync-audit", { body: {} });
    setLoading(false);
    if (error || (data as any)?.error) {
      toast({ title: "Greška", description: error?.message ?? (data as any)?.error, variant: "destructive" });
      return;
    }
    setRows(((data as any).rows ?? []) as AuditRow[]);
    setPayments(((data as any).payments ?? []) as PaymentRow[]);
    setSummary((data as any).summary as Summary);
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const resyncOne = async (email: string) => {
    setSyncingEmail(email);
    const { data, error } = await supabase.functions.invoke("stripe-sync-audit", { body: { apply: true, email } });
    setSyncingEmail(null);
    if (error || (data as any)?.error) {
      toast({ title: "Greška", description: error?.message ?? (data as any)?.error, variant: "destructive" });
      return;
    }
    toast({ title: "Sinhronizovano", description: `${email} — ažurirano zapisa: ${(data as any).summary?.fixed ?? 0}` });
    setRows(((data as any).rows ?? []) as AuditRow[]);
    setPayments(((data as any).payments ?? []) as PaymentRow[]);
    setSummary((data as any).summary as Summary);
  };

  const filteredPayments = payFilter === "all" ? payments : payments.filter((p) => normalize(p.status) === payFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Stripe pretplate i uplate
          </h2>
          <p className="text-xs" style={{ color: C.slate }}>
            {summary ? `Zadnja provjera: ${new Date(summary.checkedAt).toLocaleString("de-DE")}` : "Učitavanje…"}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => load()} disabled={loading}>
          <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? "animate-spin" : ""}`} /> Osvježi
        </Button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Stripe pretplata", value: summary?.stripeSubscriptions ?? 0, icon: CreditCard },
          { label: "Aktivnih", value: summary?.stripeActive ?? 0, icon: CheckCircle2 },
          { label: "Neusklađeno", value: summary?.mismatches ?? 0, icon: AlertTriangle },
          { label: "Plaćenih uplata", value: summary?.payments?.paid ?? 0, icon: CheckCircle2 },
          { label: "Neuspješnih", value: summary?.payments?.failed ?? 0, icon: XCircle },
        ].map((k) => (
          <div key={k.label} className="rounded-xl p-3" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: C.slate }}>
              <k.icon className="w-3 h-3" /> {k.label}
            </div>
            <div className="text-xl font-bold text-white mt-1">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Subscriptions */}
      <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="px-4 py-3 text-sm font-bold text-white" style={{ borderBottom: `1px solid ${C.border}` }}>
          Pretplate po statusu
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: C.slate }}>
                {["Korisnik", "Stripe status", "Period do", "Baza do", "Razlika", ""].map((h) => (
                  <th key={h} className="text-left font-semibold px-4 py-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-center" style={{ color: C.slate }}>
                  {loading ? "Učitavanje…" : "Nema zapisa."}
                </td></tr>
              )}
              {rows.map((r) => (
                <tr key={`${r.email}-${r.stripe_period_end ?? "x"}`} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td className="px-4 py-2 text-white whitespace-nowrap">
                    {r.email}
                    {r.issue && <div className="text-[11px] text-amber-400">{r.issue}</div>}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] ${SUB_META[r.stripe_status ?? ""] ?? "bg-slate-500/15 text-slate-300 border-slate-500/30"}`}>
                      {r.stripe_status ?? "nema"}
                      {r.cancel_at_period_end ? " · otkazuje se" : ""}
                    </span>
                  </td>
                  <td className="px-4 py-2" style={{ color: C.slate }}>{fmtDate(r.stripe_period_end)}</td>
                  <td className="px-4 py-2" style={{ color: C.slate }}>{fmtDate(r.db_expires_at)}</td>
                  <td className="px-4 py-2" style={{ color: r.diff_days && Math.abs(r.diff_days) >= 1 ? "#FBBF24" : C.slate }}>
                    {r.diff_days === null ? "—" : `${r.diff_days > 0 ? "+" : ""}${r.diff_days} d`}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!r.user_id || syncingEmail === r.email}
                      onClick={() => resyncOne(r.email)}
                    >
                      <RefreshCw className={`w-3 h-3 mr-1.5 ${syncingEmail === r.email ? "animate-spin" : ""}`} />
                      Re-synchronize
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payments */}
      <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="text-sm font-bold text-white">
            Payment zapisi{" "}
            <span className="text-xs font-normal" style={{ color: C.slate }}>
              (ukupno plaćeno: {fmtEur(summary?.payments?.paidAmountCents ?? 0)})
            </span>
          </div>
          <div className="flex gap-1">
            {(["all", "paid", "failed", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setPayFilter(f)}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
                style={{
                  background: payFilter === f ? "rgba(255,255,255,0.12)" : "transparent",
                  border: `1px solid ${C.border}`,
                  color: payFilter === f ? "#fff" : C.slate,
                }}
              >
                {f === "all" ? "Sve" : PAY_META[f].label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: C.slate }}>
                {["Korisnik", "Iznos", "Status", "Plaćeno", "Kreirano"].map((h) => (
                  <th key={h} className="text-left font-semibold px-4 py-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center" style={{ color: C.slate }}>
                  {loading ? "Učitavanje…" : "Nema uplata za ovaj filter."}
                </td></tr>
              )}
              {filteredPayments.map((p) => {
                const st = normalize(p.status);
                return (
                  <tr key={p.id} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td className="px-4 py-2 text-white whitespace-nowrap">{p.email ?? p.user_id ?? "—"}</td>
                    <td className="px-4 py-2 text-white">{fmtEur(Number(p.amount) || 0)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full border text-[11px] ${PAY_META[st].cls}`}>
                        {PAY_META[st].label}
                      </span>
                    </td>
                    <td className="px-4 py-2" style={{ color: C.slate }}>{fmtDate(p.paid_at)}</td>
                    <td className="px-4 py-2 flex items-center gap-1" style={{ color: C.slate }}>
                      <Clock className="w-3 h-3" /> {fmtDate(p.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
