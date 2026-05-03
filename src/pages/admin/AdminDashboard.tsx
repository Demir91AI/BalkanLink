import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Users, TrendingUp, Crown, Eye, MessageSquare, FileText,
  Loader2, Search, ArrowRight, Calendar, CreditCard, Mail,
  AlertTriangle, Building2, HelpCircle, Activity, Euro, Zap,
  CheckCircle2, XCircle, Clock, Globe, MapPin,
} from "lucide-react";

// ──────────────────────── Types ────────────────────────
interface Stats {
  totalUsers: number;
  newToday: number; new7d: number; new30d: number;
  activePremium: number; trialUsers: number;
  launchTrialUsers: number; influencerTrialUsers: number; freeUsers: number;
  chatToday: number; chat7d: number; chat30d: number;
  docsToday: number; docs7d: number; docs30d: number;
  viewsToday: number; views7d: number; views30d: number;
  pendingQuestions: number; publishedQuestions: number;
  pendingDirectory: number; verifiedDirectory: number; totalReviews: number;
  uniqueVisitorsToday: number; uniqueVisitors7d: number; uniqueVisitors30d: number;
  loggedInViews7d: number; anonViews7d: number;
  avgViewsPerDay30d: number;
  revenueToday: number; revenue7d: number; revenue30d: number; revenueAllTime: number;
  paidCount30d: number; estimatedMrr: number; lifetimeUsers: number;
  funnel: { visitors: number; signups: number; trialActive: number; paid: number };
  trialEndingSoon: Array<{ id: string; email: string; first_name: string | null; subscription_tier: string; expires_at: string }>;
  topActiveUsers: Array<{ email: string; first_name: string | null; chat_count: number }>;
  emailStats: { sent: number; failed: number; suppressed: number; pending: number; total: number };
  emailRecentFailures: Array<{ template_name: string; recipient_email: string; status: string; error_message: string | null; created_at: string }>;
  topPages: Array<{ path: string; views: number }>;
  topPages30d: Array<{ path: string; views: number; unique_visitors: number }>;
  topReferrers: Array<{ source: string; views: number }>;
  viewsByDay: Array<{ day: string; views: number }>;
  viewsByHourToday: Array<{ hour: number; views: number }>;
  newUsersByDay: Array<{ day: string; signups: number }>;
  chatByDay: Array<{ day: string; queries: number }>;
  revenueByDay: Array<{ day: string; amount_cents: number; tx_count: number }>;
  topCountries: Array<{ country: string; views: number; unique_visitors: number }>;
  topCities: Array<{ city: string; country: string | null; views: number; unique_visitors: number }>;
}

interface AdminUser {
  id: string; email: string; first_name: string | null;
  is_premium: boolean; subscription_tier: string;
  subscription_expires_at: string | null;
  created_at: string; last_login_at: string | null;
}

interface AdminPayment {
  id: string; user_id: string; email: string | null;
  amount: number; currency: string; status: string;
  paid_at: string | null; created_at: string;
}

// ──────────────────────── Helpers ────────────────────────
const eur = (cents: number) => `${(cents / 100).toFixed(2)} €`;
const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

function StatCard({ icon: Icon, label, value, sub, accent = "default" }: {
  icon: any; label: string; value: string | number; sub?: string;
  accent?: "default" | "gold" | "green" | "blue" | "red" | "violet";
}) {
  const colors = {
    default: "border-border/40 bg-card/60",
    gold: "border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5",
    green: "border-emerald-500/30 bg-emerald-500/5",
    blue: "border-sky-500/30 bg-sky-500/5",
    red: "border-rose-500/30 bg-rose-500/5",
    violet: "border-violet-500/30 bg-violet-500/5",
  }[accent];
  return (
    <div className={`rounded-xl border p-4 ${colors}`}>
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
        <Icon className="h-4 w-4" /> {label}
      </div>
      <div className="mt-2 text-2xl font-bold tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function MiniBars({ data, color = "gold", labelKey, valueKey }: {
  data: any[]; color?: "gold" | "blue" | "green" | "violet";
  labelKey: string; valueKey: string;
}) {
  if (!data || data.length === 0) return <p className="text-sm text-muted-foreground">Nema podataka.</p>;
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  const cls = {
    gold: "bg-[hsl(var(--gold))]/60",
    blue: "bg-sky-500/60",
    green: "bg-emerald-500/60",
    violet: "bg-violet-500/60",
  }[color];
  return (
    <div className="space-y-1">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-16 text-muted-foreground tabular-nums truncate">{String(d[labelKey]).slice(-5)}</span>
          <div className="flex-1 bg-muted/40 rounded h-3.5 overflow-hidden">
            <div className={`h-full ${cls}`} style={{ width: `${(d[valueKey] / max) * 100}%` }} />
          </div>
          <span className="w-14 text-right font-semibold tabular-nums">{d[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

function Section({ title, icon: Icon, children, right }: { title: string; icon?: any; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 p-5">
      <div className="flex items-center justify-between mb-3 gap-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">{Icon && <Icon className="h-4 w-4" />} {title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

// ──────────────────────── Page ────────────────────────
export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const loadAll = async (silent = false) => {
    if (!silent) setLoading(true);
    const [statsRes, usersRes, paymentsRes] = await Promise.all([
      supabase.rpc("get_admin_stats" as any),
      supabase.rpc("get_admin_users" as any, { _search: null, _limit: 100 }),
      supabase.rpc("get_admin_payments" as any, { _limit: 25 }),
    ]);
    if (statsRes.data) setStats(statsRes.data as any);
    if (usersRes.data) setUsers(usersRes.data as any);
    if (paymentsRes.data) setPayments(paymentsRes.data as any);
    setLastRefresh(new Date());
    if (!silent) setLoading(false);
  };

  useEffect(() => {
    loadAll();
    const id = setInterval(() => loadAll(true), 30000);
    const onVis = () => { if (document.visibilityState === "visible") loadAll(true); };
    const onSignIn = () => loadAll(false);
    const onFocus = () => loadAll(true);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("bl:user-signed-in", onSignIn);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("bl:user-signed-in", onSignIn);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      setSearchBusy(true);
      const { data } = await supabase.rpc("get_admin_users" as any, { _search: search.trim() || null, _limit: 100 });
      if (data) setUsers(data as any);
      setSearchBusy(false);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("bs-BA", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
  const fmtDT = (d: string | null) => d ? new Date(d).toLocaleString("bs-BA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
  const daysLeft = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000));

  const tierBadge = (tier: string, isPremium: boolean) => {
    if (tier === "premium" || tier === "premium_yearly" || tier === "lifetime")
      return <Badge className="bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/40">Premium</Badge>;
    if (tier === "launch_trial") return <Badge variant="secondary">Launch trial</Badge>;
    if (tier === "influencer_trial") return <Badge variant="secondary">Influencer</Badge>;
    if (isPremium) return <Badge>Premium</Badge>;
    return <Badge variant="outline">Free</Badge>;
  };

  const conversionRate = useMemo(() => {
    if (!stats) return 0;
    return pct(stats.funnel.paid + stats.funnel.trialActive, stats.funnel.signups);
  }, [stats]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Učitavanje…
      </div>
    );
  }
  if (!stats) return null;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard · BalkanLink</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="container py-8 max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
              Pregled platforme · BalkanLink
              {lastRefresh && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/70">
                  · <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  auto-refresh 30s · {lastRefresh.toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => loadAll(true)}>Osvježi</Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/pitanja">
                Q&A {stats.pendingQuestions > 0 && <Badge className="ml-2 bg-rose-500/20 text-rose-300 border-rose-500/40">{stats.pendingQuestions}</Badge>}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild><Link to="/admin/trialovi">Trialovi</Link></Button>
            <Button variant="outline" size="sm" asChild><Link to="/admin/forms">Formulari</Link></Button>
          </div>
        </div>

        {/* KPI bar — uvijek vidljivo */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard icon={Users} label="Korisnici" value={stats.totalUsers} sub={`+${stats.newToday} danas`} />
          <StatCard icon={Crown} label="Aktivni Premium" value={stats.activePremium} sub={`MRR ~${eur(stats.estimatedMrr)}`} accent="gold" />
          <StatCard icon={Calendar} label="Trial aktivni" value={stats.trialUsers} sub={`${stats.launchTrialUsers}L · ${stats.influencerTrialUsers}I`} accent="blue" />
          <StatCard icon={Euro} label="Prihod 30d" value={eur(stats.revenue30d)} sub={`${stats.paidCount30d} transakcija`} accent="green" />
          <StatCard icon={Eye} label="Posjete danas" value={stats.viewsToday} sub={`${stats.uniqueVisitorsToday} jedinstvenih`} accent="violet" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full overflow-x-auto justify-start flex-nowrap">
            <TabsTrigger value="overview">Pregled</TabsTrigger>
            <TabsTrigger value="users">
              Korisnici
              {stats.trialEndingSoon.length > 0 && (
                <Badge className="ml-2 bg-amber-500/20 text-amber-300 border-amber-500/40 h-5 px-1.5 text-[10px]">{stats.trialEndingSoon.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="revenue">Prihodi</TabsTrigger>
            <TabsTrigger value="content">
              Sadržaj
              {(stats.pendingQuestions + stats.pendingDirectory) > 0 && (
                <Badge className="ml-2 bg-rose-500/20 text-rose-300 border-rose-500/40 h-5 px-1.5 text-[10px]">{stats.pendingQuestions + stats.pendingDirectory}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="traffic">Saobraćaj</TabsTrigger>
            <TabsTrigger value="geo">
              <Globe className="h-3.5 w-3.5 mr-1" /> Geo
            </TabsTrigger>
            <TabsTrigger value="email">
              Email
              {stats.emailStats.failed > 0 && (
                <Badge className="ml-2 bg-rose-500/20 text-rose-300 border-rose-500/40 h-5 px-1.5 text-[10px]">{stats.emailStats.failed}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ──────────── PREGLED ──────────── */}
          <TabsContent value="overview" className="space-y-2 mt-4">
            <Accordion type="multiple" defaultValue={["funnel"]} className="space-y-2">
              <AccordionItem value="funnel" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><Activity className="h-4 w-4" /> Konverzioni lijevak (30 dana)</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Posjetioci", value: stats.funnel.visitors, base: stats.funnel.visitors },
                      { label: "Registracije", value: stats.funnel.signups, base: stats.funnel.visitors },
                      { label: "Trial aktivni", value: stats.funnel.trialActive, base: stats.funnel.signups },
                      { label: "Plaćeni Premium", value: stats.funnel.paid, base: stats.funnel.signups },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-border/40 bg-background/40 p-3">
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                        <div className="text-xl font-bold tabular-nums mt-1">{s.value.toLocaleString("bs-BA")}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{pct(s.value, s.base)}% konverzija</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Stopa konverzije registracije → trial/Premium: <strong className="text-foreground">{conversionRate}%</strong>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="activity" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Aktivnost po danima (14d)</span>
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible defaultValue="views" className="w-full">
                    <AccordionItem value="views" className="border-border/40">
                      <AccordionTrigger className="text-xs py-2">Posjete</AccordionTrigger>
                      <AccordionContent><MiniBars data={stats.viewsByDay} color="gold" labelKey="day" valueKey="views" /></AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="signups" className="border-border/40">
                      <AccordionTrigger className="text-xs py-2">Nove registracije</AccordionTrigger>
                      <AccordionContent><MiniBars data={stats.newUsersByDay} color="blue" labelKey="day" valueKey="signups" /></AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="chat" className="border-border/40">
                      <AccordionTrigger className="text-xs py-2">Asistent upiti</AccordionTrigger>
                      <AccordionContent><MiniBars data={stats.chatByDay} color="violet" labelKey="day" valueKey="queries" /></AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="revenue" className="border-border/40 border-b-0">
                      <AccordionTrigger className="text-xs py-2">Prihodi (30d)</AccordionTrigger>
                      <AccordionContent>
                        <MiniBars
                          data={stats.revenueByDay.map((d) => ({ ...d, eur: +(d.amount_cents / 100).toFixed(2) }))}
                          color="green" labelKey="day" valueKey="eur"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="hourly" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Posjete po satu (danas)</span>
                </AccordionTrigger>
                <AccordionContent>
                  <MiniBars
                    data={stats.viewsByHourToday.map((d) => ({ hour: `${String(d.hour).padStart(2, "0")}h`, views: d.views }))}
                    color="blue" labelKey="hour" valueKey="views"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="actions" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Brze akcije</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Button variant="outline" size="sm" asChild><Link to="/admin/pitanja">Moderacija pitanja ({stats.pendingQuestions})</Link></Button>
                    <Button variant="outline" size="sm" asChild><Link to="/admin/trialovi">Generiši trial kod</Link></Button>
                    <Button variant="outline" size="sm" asChild><Link to="/admin/forms">Forms mapper</Link></Button>
                    <Button variant="outline" size="sm" asChild><Link to="/firma/submit">Pregledaj submissions</Link></Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* ──────────── KORISNICI ──────────── */}
          <TabsContent value="users" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Users} label="Ukupno" value={stats.totalUsers} />
              <StatCard icon={TrendingUp} label="Novi 7d" value={stats.new7d} sub={`${stats.new30d} u 30d`} accent="green" />
              <StatCard icon={Crown} label="Plaćeni Premium" value={stats.activePremium} accent="gold" />
              <StatCard icon={Calendar} label="Free" value={stats.freeUsers} accent="default" />
            </div>

            {stats.trialEndingSoon.length > 0 && (
              <Section title="Trial pred istek (sljedećih 7 dana)" icon={AlertTriangle} right={
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">{stats.trialEndingSoon.length}</Badge>
              }>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b border-border/40">
                        <th className="py-2 pr-3">Email</th>
                        <th className="py-2 pr-3">Ime</th>
                        <th className="py-2 pr-3">Tier</th>
                        <th className="py-2 pr-3 text-right">Ističe</th>
                        <th className="py-2 pr-3 text-right">Dana</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.trialEndingSoon.map((u) => (
                        <tr key={u.id} className="border-b border-border/20 hover:bg-muted/20">
                          <td className="py-2 pr-3 truncate max-w-[220px]">{u.email}</td>
                          <td className="py-2 pr-3 text-muted-foreground">{u.first_name || "—"}</td>
                          <td className="py-2 pr-3">{tierBadge(u.subscription_tier, true)}</td>
                          <td className="py-2 pr-3 text-right text-xs text-muted-foreground">{fmtDT(u.expires_at)}</td>
                          <td className="py-2 pr-3 text-right">
                            <Badge variant={daysLeft(u.expires_at) <= 2 ? "destructive" : "secondary"}>{daysLeft(u.expires_at)}d</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            <Accordion type="single" collapsible defaultValue="all" className="space-y-2">
              <AccordionItem value="all" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Svi korisnici ({users.length})</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative w-full md:w-72 mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Email ili ime…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
                    {searchBusy && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />}
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
                            <td className="py-2 pr-3 font-medium truncate max-w-[220px]" title={u.email}>{u.email}</td>
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="active" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><Activity className="h-4 w-4" /> Top aktivni korisnici (Asistent, 30d)</span>
                </AccordionTrigger>
                <AccordionContent>
                  {stats.topActiveUsers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nema podataka.</p>
                  ) : (
                    <ol className="space-y-1 text-sm">
                      {stats.topActiveUsers.map((u, i) => (
                        <li key={u.email} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
                          <span className="w-5 text-xs text-muted-foreground">{i + 1}.</span>
                          <span className="flex-1 truncate">{u.first_name || u.email}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">{u.email}</span>
                          <Badge variant="secondary">{u.chat_count}</Badge>
                        </li>
                      ))}
                    </ol>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* ──────────── PRIHODI ──────────── */}
          <TabsContent value="revenue" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Euro} label="Danas" value={eur(stats.revenueToday)} accent="green" />
              <StatCard icon={Euro} label="7 dana" value={eur(stats.revenue7d)} accent="green" />
              <StatCard icon={Euro} label="30 dana" value={eur(stats.revenue30d)} sub={`${stats.paidCount30d} transakcija`} accent="green" />
              <StatCard icon={Crown} label="Procijenjeni MRR" value={eur(stats.estimatedMrr)} sub="9.99€ × aktivni Premium" accent="gold" />
            </div>
            <StatCard icon={Euro} label="Ukupan prihod (sva vremena)" value={eur(stats.revenueAllTime)} accent="gold" />

            <Section title="Prihodi po danu (30d)" icon={TrendingUp}>
              <MiniBars
                data={stats.revenueByDay.map((d) => ({ day: d.day, eur: +(d.amount_cents / 100).toFixed(2) }))}
                color="green" labelKey="day" valueKey="eur"
              />
            </Section>

            <Section title="Zadnja plaćanja" icon={CreditCard}>
              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nema plaćanja zabilježenih.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b border-border/40">
                        <th className="py-2 pr-3">Email</th>
                        <th className="py-2 pr-3 text-right">Iznos</th>
                        <th className="py-2 pr-3">Status</th>
                        <th className="py-2 pr-3">Datum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-border/20 hover:bg-muted/20">
                          <td className="py-2 pr-3 truncate max-w-[220px]">{p.email || "—"}</td>
                          <td className="py-2 pr-3 text-right font-semibold tabular-nums">{(p.amount / 100).toFixed(2)} {p.currency}</td>
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
            </Section>
          </TabsContent>

          {/* ──────────── SADRŽAJ ──────────── */}
          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={HelpCircle} label="Pitanja na čekanju" value={stats.pendingQuestions} accent={stats.pendingQuestions > 0 ? "red" : "default"} />
              <StatCard icon={CheckCircle2} label="Objavljena pitanja" value={stats.publishedQuestions} accent="green" />
              <StatCard icon={Building2} label="Direktorij na čekanju" value={stats.pendingDirectory} accent={stats.pendingDirectory > 0 ? "red" : "default"} />
              <StatCard icon={Building2} label="Verifikovani biznisi" value={stats.verifiedDirectory} accent="green" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={MessageSquare} label="Asistent danas" value={stats.chatToday} sub={`${stats.chat7d} u 7d · ${stats.chat30d} u 30d`} accent="violet" />
              <StatCard icon={FileText} label="Doc-Check danas" value={stats.docsToday} sub={`${stats.docs7d} u 7d · ${stats.docs30d} u 30d`} accent="blue" />
              <StatCard icon={CheckCircle2} label="Recenzije" value={stats.totalReviews} />
              <StatCard icon={Crown} label="Trial korisnici" value={stats.trialUsers} accent="gold" />
            </div>

            <Section title="Akcije moderacije" icon={Zap}>
              <div className="flex flex-wrap gap-2 text-sm">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/pitanja">Moderacija Q&A {stats.pendingQuestions > 0 && <Badge className="ml-2">{stats.pendingQuestions}</Badge>}</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/firma">Direktorij {stats.pendingDirectory > 0 && <Badge className="ml-2">{stats.pendingDirectory}</Badge>}</Link>
                </Button>
                <Button variant="outline" size="sm" asChild><Link to="/admin/forms">Formulari</Link></Button>
              </div>
            </Section>
          </TabsContent>

          {/* ──────────── SAOBRAĆAJ ──────────── */}
          <TabsContent value="traffic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Eye} label="Posjete danas" value={stats.viewsToday} sub={`${stats.uniqueVisitorsToday} jedinstvenih`} />
              <StatCard icon={Eye} label="Posjete 7d" value={stats.views7d} sub={`${stats.uniqueVisitors7d} jedinstvenih`} accent="blue" />
              <StatCard icon={Eye} label="Posjete 30d" value={stats.views30d} sub={`${stats.uniqueVisitors30d} jedinstvenih`} accent="violet" />
              <StatCard icon={TrendingUp} label="Prosjek/dan (30d)" value={stats.avgViewsPerDay30d} accent="green" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              <StatCard icon={Users} label="Prijavljeni (7d)" value={stats.loggedInViews7d} sub={`${pct(stats.loggedInViews7d, stats.views7d)}% od ukupno`} accent="gold" />
              <StatCard icon={Eye} label="Anonimni (7d)" value={stats.anonViews7d} sub={`${pct(stats.anonViews7d, stats.views7d)}% od ukupno`} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Section title="Posjete po satu (danas)" icon={Calendar}>
                <MiniBars
                  data={stats.viewsByHourToday.map((d) => ({ hour: `${String(d.hour).padStart(2, "0")}h`, views: d.views }))}
                  color="blue" labelKey="hour" valueKey="views"
                />
              </Section>
              <Section title="Izvori posjeta (7d)" icon={ArrowRight}>
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
              </Section>
            </div>

            <Accordion type="single" collapsible defaultValue="top30" className="space-y-2">
              <AccordionItem value="top30" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Top stranice (30 dana)</span>
                </AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="top7" className="rounded-xl border border-border/40 bg-card/60 px-5">
                <AccordionTrigger className="font-semibold text-sm">
                  <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Top stranice (7 dana)</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-1.5 text-sm">
                    {stats.topPages.map((p, i) => (
                      <li key={p.path} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-0">
                        <span className="text-muted-foreground w-5 text-xs">{i + 1}.</span>
                        <code className="flex-1 truncate text-xs">{p.path}</code>
                        <span className="font-semibold text-sm tabular-nums">{p.views}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* ──────────── GEO ──────────── */}
          <TabsContent value="geo" className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground">
              Geolokacija putem IP adrese (preko vanjskog GeoJS servisa). Podaci se prikupljaju od sada — stari posjeti nemaju lokaciju.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Section title="Top zemlje (7d)" icon={Globe}>
                {!stats.topCountries || stats.topCountries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Još nema geo podataka.</p>
                ) : (
                  <ol className="space-y-1.5 text-sm">
                    {stats.topCountries.map((c, i) => (
                      <li key={c.country} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-0">
                        <span className="text-muted-foreground w-5 text-xs">{i + 1}.</span>
                        <span className="flex-1 font-medium">{c.country}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{c.unique_visitors} jedin.</span>
                        <span className="font-semibold text-sm tabular-nums w-12 text-right">{c.views}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </Section>
              <Section title="Top gradovi (7d)" icon={MapPin}>
                {!stats.topCities || stats.topCities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Još nema geo podataka.</p>
                ) : (
                  <ol className="space-y-1.5 text-sm">
                    {stats.topCities.map((c, i) => (
                      <li key={`${c.city}-${i}`} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-0">
                        <span className="text-muted-foreground w-5 text-xs">{i + 1}.</span>
                        <span className="flex-1 truncate">
                          <span className="font-medium">{c.city}</span>
                          {c.country && <span className="text-xs text-muted-foreground ml-1">· {c.country}</span>}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">{c.unique_visitors}</span>
                        <span className="font-semibold text-sm tabular-nums w-12 text-right">{c.views}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </Section>
            </div>
          </TabsContent>

          {/* ──────────── EMAIL ──────────── */}
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <StatCard icon={Mail} label="Ukupno (7d)" value={stats.emailStats.total} />
              <StatCard icon={CheckCircle2} label="Poslano" value={stats.emailStats.sent} accent="green" />
              <StatCard icon={XCircle} label="Failovi" value={stats.emailStats.failed} accent={stats.emailStats.failed > 0 ? "red" : "default"} />
              <StatCard icon={AlertTriangle} label="Suppressed" value={stats.emailStats.suppressed} accent="gold" />
              <StatCard icon={Clock} label="Pending" value={stats.emailStats.pending} accent="blue" />
            </div>

            <Section title="Stopa uspjeha (7d)" icon={Activity}>
              {stats.emailStats.total === 0 ? (
                <p className="text-sm text-muted-foreground">Nema poslanih emailova u 7d.</p>
              ) : (
                <div className="space-y-2">
                  <div className="h-3 rounded bg-muted/40 overflow-hidden flex">
                    <div className="bg-emerald-500" style={{ width: `${pct(stats.emailStats.sent, stats.emailStats.total)}%` }} />
                    <div className="bg-rose-500" style={{ width: `${pct(stats.emailStats.failed, stats.emailStats.total)}%` }} />
                    <div className="bg-amber-500" style={{ width: `${pct(stats.emailStats.suppressed, stats.emailStats.total)}%` }} />
                    <div className="bg-sky-500" style={{ width: `${pct(stats.emailStats.pending, stats.emailStats.total)}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
                    <span>✅ {pct(stats.emailStats.sent, stats.emailStats.total)}% sent</span>
                    <span>❌ {pct(stats.emailStats.failed, stats.emailStats.total)}% failed</span>
                    <span>⚠️ {pct(stats.emailStats.suppressed, stats.emailStats.total)}% suppressed</span>
                    <span>⏳ {pct(stats.emailStats.pending, stats.emailStats.total)}% pending</span>
                  </div>
                </div>
              )}
            </Section>

            <Section title="Posljednji failovi (14d)" icon={XCircle}>
              {stats.emailRecentFailures.length === 0 ? (
                <p className="text-sm text-muted-foreground">🎉 Nema neuspjelih emailova u zadnja 14 dana.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b border-border/40">
                        <th className="py-2 pr-3">Template</th>
                        <th className="py-2 pr-3">Primalac</th>
                        <th className="py-2 pr-3">Status</th>
                        <th className="py-2 pr-3">Greška</th>
                        <th className="py-2 pr-3">Vrijeme</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.emailRecentFailures.map((f, i) => (
                        <tr key={i} className="border-b border-border/20 hover:bg-muted/20">
                          <td className="py-2 pr-3 text-xs"><code>{f.template_name}</code></td>
                          <td className="py-2 pr-3 truncate max-w-[180px] text-xs">{f.recipient_email}</td>
                          <td className="py-2 pr-3"><Badge variant="destructive">{f.status}</Badge></td>
                          <td className="py-2 pr-3 text-xs text-muted-foreground truncate max-w-[260px]" title={f.error_message ?? ""}>{f.error_message || "—"}</td>
                          <td className="py-2 pr-3 text-xs text-muted-foreground">{fmtDT(f.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
