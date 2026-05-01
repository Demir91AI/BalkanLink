import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, TrendingUp, Crown, Eye, MessageSquare, FileText,
  Loader2, Search, ArrowRight, Calendar, CreditCard,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  newToday: number; new7d: number; new30d: number;
  activePremium: number; trialUsers: number;
  chatToday: number; chat7d: number;
  docsToday: number;
  viewsToday: number; views7d: number; views30d: number;
  pendingQuestions: number;
  uniqueVisitorsToday: number; uniqueVisitors7d: number; uniqueVisitors30d: number;
  loggedInViews7d: number; anonViews7d: number;
  avgViewsPerDay30d: number;
  topPages: Array<{ path: string; views: number }>;
  topPages30d: Array<{ path: string; views: number; unique_visitors: number }>;
  topReferrers: Array<{ source: string; views: number }>;
  viewsByDay: Array<{ day: string; views: number }>;
  viewsByHourToday: Array<{ hour: number; views: number }>;
}

interface AdminUser {
  id: string;
  email: string;
  first_name: string | null;
  is_premium: boolean;
  subscription_tier: string;
  subscription_expires_at: string | null;
  created_at: string;
  last_login_at: string | null;
}

interface AdminPayment {
  id: string;
  user_id: string;
  email: string | null;
  amount: number;
  currency: string;
  status: string;
  paid_at: string | null;
  created_at: string;
}

function StatCard({ icon: Icon, label, value, sub, accent = "default" }: {
  icon: any; label: string; value: string | number; sub?: string;
  accent?: "default" | "gold" | "green" | "blue";
}) {
  const colors = {
    default: "border-border/40 bg-card/60",
    gold: "border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5",
    green: "border-emerald-500/30 bg-emerald-500/5",
    blue: "border-sky-500/30 bg-sky-500/5",
  }[accent];
  return (
    <div className={`rounded-xl border p-4 ${colors}`}>
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
        <Icon className="h-4 w-4" /> {label}
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    const [statsRes, usersRes, paymentsRes] = await Promise.all([
      supabase.rpc("get_admin_stats" as any),
      supabase.rpc("get_admin_users" as any, { _search: null, _limit: 50 }),
      supabase.rpc("get_admin_payments" as any, { _limit: 20 }),
    ]);
    if (statsRes.data) setStats(statsRes.data as any);
    if (usersRes.data) setUsers(usersRes.data as any);
    if (paymentsRes.data) setPayments(paymentsRes.data as any);
    setLoading(false);
  };

  useEffect(() => { loadAll(); }, []);

  // debounced search
  useEffect(() => {
    const t = setTimeout(async () => {
      setSearchBusy(true);
      const { data } = await supabase.rpc("get_admin_users" as any, {
        _search: search.trim() || null,
        _limit: 50,
      });
      if (data) setUsers(data as any);
      setSearchBusy(false);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("bs-BA", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
  const fmtDT = (d: string | null) => d ? new Date(d).toLocaleString("bs-BA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";

  const tierBadge = (tier: string, isPremium: boolean) => {
    if (tier === "premium" || tier === "premium_yearly") return <Badge className="bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/40">Premium</Badge>;
    if (tier === "launch_trial") return <Badge variant="secondary">Launch trial</Badge>;
    if (tier === "influencer_trial") return <Badge variant="secondary">Influencer trial</Badge>;
    if (isPremium) return <Badge>Premium</Badge>;
    return <Badge variant="outline">Free</Badge>;
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Učitavanje…
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard · BalkanLink</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="container py-8 max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Pregled korisnika, prometa i prihoda</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild><Link to="/admin/pitanja">Pitanja {stats && stats.pendingQuestions > 0 && <Badge className="ml-2">{stats.pendingQuestions}</Badge>}</Link></Button>
            <Button variant="outline" size="sm" asChild><Link to="/admin/trialovi">Trialovi</Link></Button>
            <Button variant="outline" size="sm" asChild><Link to="/admin/forms">Formulari</Link></Button>
          </div>
        </div>

        {/* Stats grid */}
        {stats && (
          <>
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Korisnici</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={Users} label="Ukupno" value={stats.totalUsers} />
                <StatCard icon={TrendingUp} label="Novi danas" value={stats.newToday} sub={`+${stats.new7d} u 7 dana`} accent="green" />
                <StatCard icon={Crown} label="Aktivni Premium" value={stats.activePremium} accent="gold" />
                <StatCard icon={Calendar} label="Trial korisnici" value={stats.trialUsers} accent="blue" />
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Aktivnost (posjete)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={Eye} label="Posjete danas" value={stats.viewsToday} sub={`${stats.uniqueVisitorsToday} jedinstvenih`} />
                <StatCard icon={Eye} label="Posjete 7 dana" value={stats.views7d} sub={`${stats.uniqueVisitors7d} jedinstvenih`} accent="blue" />
                <StatCard icon={Eye} label="Posjete 30 dana" value={stats.views30d} sub={`${stats.uniqueVisitors30d} jedinstvenih`} />
                <StatCard icon={MessageSquare} label="Asistent danas" value={stats.chatToday} sub={`${stats.chat7d} u 7 dana`} />
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Detaljna statistika posjeta</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <StatCard icon={TrendingUp} label="Prosjek/dan (30d)" value={stats.avgViewsPerDay30d} accent="blue" />
                <StatCard icon={Users} label="Prijavljeni (7d)" value={stats.loggedInViews7d} sub={`${stats.views7d > 0 ? Math.round((stats.loggedInViews7d / stats.views7d) * 100) : 0}% od ukupno`} accent="gold" />
                <StatCard icon={Eye} label="Anonimni (7d)" value={stats.anonViews7d} sub={`${stats.views7d > 0 ? Math.round((stats.anonViews7d / stats.views7d) * 100) : 0}% od ukupno`} />
                <StatCard icon={FileText} label="Dokumenti danas" value={stats.docsToday} accent="green" />
              </div>

              {/* Hourly views today + Top referrers */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border/40 bg-card/60 p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Calendar className="h-4 w-4" /> Posjete po satu (danas)</h3>
                  {stats.viewsByHourToday.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nema podataka za danas.</p>
                  ) : (
                    <div className="space-y-1">
                      {(() => {
                        const max = Math.max(...stats.viewsByHourToday.map(d => d.views), 1);
                        return stats.viewsByHourToday.map((d) => (
                          <div key={d.hour} className="flex items-center gap-2 text-xs">
                            <span className="w-10 text-muted-foreground tabular-nums">{String(d.hour).padStart(2, "0")}h</span>
                            <div className="flex-1 bg-muted/40 rounded h-3 overflow-hidden">
                              <div className="h-full bg-sky-500/60" style={{ width: `${(d.views / max) * 100}%` }} />
                            </div>
                            <span className="w-10 text-right font-semibold tabular-nums">{d.views}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
                <div className="rounded-xl border border-border/40 bg-card/60 p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm"><ArrowRight className="h-4 w-4" /> Izvori posjeta (7d)</h3>
                  {stats.topReferrers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nema podataka.</p>
                  ) : (
                    <ol className="space-y-1.5 text-sm">
                      {stats.topReferrers.map((r, i) => (
                        <li key={r.source} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-0">
                          <span className="text-muted-foreground w-5 text-xs">{i + 1}.</span>
                          <span className="flex-1 truncate text-xs" title={r.source}>{r.source}</span>
                          <span className="font-semibold text-sm tabular-nums">{r.views}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>

              {/* Top pages 30d with unique visitors */}
              <div className="rounded-xl border border-border/40 bg-card/60 p-5 mt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4" /> Top stranice (30 dana) — sa jedinstvenim posjetiocima</h3>
                {stats.topPages30d.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema podataka.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-muted-foreground border-b border-border/40">
                          <th className="py-2 pr-3">#</th>
                          <th className="py-2 pr-3">Stranica</th>
                          <th className="py-2 pr-3 text-right">Posjete</th>
                          <th className="py-2 pr-3 text-right">Jedinstveni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.topPages30d.map((p, i) => (
                          <tr key={p.path} className="border-b border-border/20 hover:bg-muted/20">
                            <td className="py-2 pr-3 text-muted-foreground text-xs">{i + 1}</td>
                            <td className="py-2 pr-3"><code className="text-xs">{p.path}</code></td>
                            <td className="py-2 pr-3 text-right font-semibold tabular-nums">{p.views}</td>
                            <td className="py-2 pr-3 text-right text-muted-foreground tabular-nums">{p.unique_visitors}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Top pages + views by day */}
            <section className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/40 bg-card/60 p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Top stranice (7 dana)</h3>
                {stats.topPages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema podataka još.</p>
                ) : (
                  <ol className="space-y-1.5 text-sm">
                    {stats.topPages.map((p, i) => (
                      <li key={p.path} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-0">
                        <span className="text-muted-foreground w-5 text-xs">{i + 1}.</span>
                        <code className="flex-1 truncate text-xs">{p.path}</code>
                        <span className="font-semibold text-sm">{p.views}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              <div className="rounded-xl border border-border/40 bg-card/60 p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Calendar className="h-4 w-4" /> Posjete po danu (14d)</h3>
                {stats.viewsByDay.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema podataka još.</p>
                ) : (
                  <div className="space-y-1">
                    {(() => {
                      const max = Math.max(...stats.viewsByDay.map(d => d.views), 1);
                      return stats.viewsByDay.map((d) => (
                        <div key={d.day} className="flex items-center gap-2 text-xs">
                          <span className="w-20 text-muted-foreground">{d.day.slice(5)}</span>
                          <div className="flex-1 bg-muted/40 rounded h-4 overflow-hidden">
                            <div className="h-full bg-[hsl(var(--gold))]/60" style={{ width: `${(d.views / max) * 100}%` }} />
                          </div>
                          <span className="w-10 text-right font-semibold">{d.views}</span>
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Users */}
        <section className="rounded-xl border border-border/40 bg-card/60 p-5">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Registrovani korisnici</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Email ili ime…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
              {searchBusy && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border/40">
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Ime</th>
                  <th className="py-2 pr-3">Tier</th>
                  <th className="py-2 pr-3">Registrovan</th>
                  <th className="py-2 pr-3">Zadnji login</th>
                  <th className="py-2 pr-3">Trial do</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/20 hover:bg-muted/20">
                    <td className="py-2 pr-3 font-medium truncate max-w-[200px]" title={u.email}>{u.email}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{u.first_name || "—"}</td>
                    <td className="py-2 pr-3">{tierBadge(u.subscription_tier, u.is_premium)}</td>
                    <td className="py-2 pr-3 text-muted-foreground text-xs">{fmtDate(u.created_at)}</td>
                    <td className="py-2 pr-3 text-muted-foreground text-xs">{fmtDT(u.last_login_at)}</td>
                    <td className="py-2 pr-3 text-muted-foreground text-xs">{fmtDate(u.subscription_expires_at)}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={6} className="py-6 text-center text-muted-foreground">Nema rezultata.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payments */}
        <section className="rounded-xl border border-border/40 bg-card/60 p-5">
          <h2 className="font-semibold flex items-center gap-2 mb-4"><CreditCard className="h-4 w-4" /> Zadnja plaćanja</h2>
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nema plaćanja zabilježenih.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border/40">
                    <th className="py-2 pr-3">Email</th>
                    <th className="py-2 pr-3">Iznos</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/20">
                      <td className="py-2 pr-3 truncate max-w-[200px]">{p.email || "—"}</td>
                      <td className="py-2 pr-3 font-semibold">{(p.amount / 100).toFixed(2)} {p.currency}</td>
                      <td className="py-2 pr-3">
                        <Badge variant={p.status === "succeeded" || p.status === "paid" ? "default" : "outline"}>{p.status}</Badge>
                      </td>
                      <td className="py-2 pr-3 text-muted-foreground text-xs">{fmtDT(p.paid_at || p.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
