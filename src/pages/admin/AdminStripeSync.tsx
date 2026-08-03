import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, AlertTriangle, CheckCircle2, CloudOff, Database, Wand2 } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

interface AuditRow {
  email: string;
  user_id: string | null;
  db_tier: string | null;
  db_is_premium: boolean | null;
  db_expires_at: string | null;
  stripe_customer_id: string | null;
  stripe_status: string | null;
  stripe_period_end: string | null;
  stripe_price_id: string | null;
  stripe_interval: string | null;
  cancel_at_period_end: boolean | null;
  diff_days: number | null;
  status: "ok" | "date_mismatch" | "missing_in_db" | "missing_in_stripe" | "no_stripe";
  issue: string | null;
}

interface AuditSummary {
  stripeSubscriptions: number;
  stripeActive: number;
  profiles: number;
  mismatches: number;
  fixed: number;
  checkedAt: string;
}

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";

const STATUS_META: Record<AuditRow["status"], { label: string; className: string }> = {
  ok: { label: "Sinhronizovano", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  date_mismatch: { label: "Neusklađen datum", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  missing_in_db: { label: "Nema u bazi", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  missing_in_stripe: { label: "Nema u Stripeu", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  no_stripe: { label: "Bez Stripea", className: "bg-slate-500/15 text-slate-300 border-slate-500/30" },
};

export default function AdminStripeSync() {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [summary, setSummary] = useState<AuditSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [fixing, setFixing] = useState(false);
  const [onlyProblems, setOnlyProblems] = useState(true);
  const { toast } = useToast();

  const run = useCallback(
    async (apply = false) => {
      apply ? setFixing(true) : setLoading(true);
      const { data, error } = await supabase.functions.invoke("stripe-sync-audit", { body: { apply } });
      apply ? setFixing(false) : setLoading(false);
      if (error) {
        toast({ title: "Greška", description: error.message, variant: "destructive" });
        return;
      }
      setRows(data?.rows ?? []);
      setSummary(data?.summary ?? null);
      if (apply) {
        toast({ title: "Sinhronizacija završena", description: `Ažurirano naloga: ${data?.summary?.fixed ?? 0}` });
      }
    },
    [toast],
  );

  useEffect(() => {
    void run(false);
  }, [run]);

  const visible = onlyProblems ? rows.filter((r) => r.status !== "ok") : rows;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Stripe sinhronizacija — Admin" description="Poređenje Stripe pretplata sa bazom" />
      <PageNav />
      <div className="container mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Stripe ↔ Baza</h1>
            <p className="text-sm text-muted-foreground">
              Poređenje Stripe statusa pretplate sa <code>subscription_expires_at</code> za svaki nalog.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => run(false)} disabled={loading || fixing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Osvježi
            </Button>
            <Button onClick={() => run(true)} disabled={loading || fixing || !summary?.mismatches}>
              <Wand2 className={`mr-2 h-4 w-4 ${fixing ? "animate-pulse" : ""}`} />
              Sinhronizuj bazu prema Stripeu
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: CheckCircle2, label: "Aktivne u Stripeu", value: summary?.stripeActive ?? "—" },
            { icon: Database, label: "Ukupno Stripe pretplata", value: summary?.stripeSubscriptions ?? "—" },
            { icon: AlertTriangle, label: "Neusklađenih naloga", value: summary?.mismatches ?? "—" },
            { icon: CloudOff, label: "Profila u bazi", value: summary?.profiles ?? "—" },
          ].map((c) => (
            <Card key={c.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <c.icon className="h-4 w-4" />
                  {c.label}
                </div>
                <div className="mt-1 text-2xl font-bold">{c.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">
              Nalozi {summary ? `· provjereno ${new Date(summary.checkedAt).toLocaleString("de-DE")}` : ""}
            </CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setOnlyProblems((v) => !v)}>
              {onlyProblems ? "Prikaži sve" : "Samo problemi"}
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {loading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Učitavanje…</p>
            ) : visible.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Sve je sinhronizovano ✅</p>
            ) : (
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2 pr-3">Email</th>
                    <th className="py-2 pr-3">Stripe status</th>
                    <th className="py-2 pr-3">Stripe do</th>
                    <th className="py-2 pr-3">Baza tier</th>
                    <th className="py-2 pr-3">Baza do</th>
                    <th className="py-2 pr-3">Razlika</th>
                    <th className="py-2 pr-3">Stanje</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r, i) => (
                    <tr key={`${r.email}-${i}`} className="border-b border-border/50 align-top">
                      <td className="py-2 pr-3">
                        <div className="font-medium">{r.email}</div>
                        {r.issue && <div className="text-xs text-muted-foreground">{r.issue}</div>}
                      </td>
                      <td className="py-2 pr-3">
                        {r.stripe_status ?? "—"}
                        {r.cancel_at_period_end && <div className="text-xs text-amber-400">otkazuje se</div>}
                        {r.stripe_interval && <div className="text-xs text-muted-foreground">{r.stripe_interval === "year" ? "godišnje" : "mjesečno"}</div>}
                      </td>
                      <td className="py-2 pr-3">{fmt(r.stripe_period_end)}</td>
                      <td className="py-2 pr-3">
                        {r.db_tier ?? "—"}
                        {r.db_is_premium === false && <div className="text-xs text-muted-foreground">nije premium</div>}
                      </td>
                      <td className="py-2 pr-3">{fmt(r.db_expires_at)}</td>
                      <td className="py-2 pr-3 font-mono">
                        {r.diff_days === null ? "—" : `${r.diff_days > 0 ? "+" : ""}${r.diff_days} d`}
                      </td>
                      <td className="py-2 pr-3">
                        <Badge variant="outline" className={STATUS_META[r.status].className}>
                          {STATUS_META[r.status].label}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
