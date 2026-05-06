import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Users, TrendingUp, Crown, Eye, FileText, Loader2, Search, Calendar, CreditCard,
  AlertTriangle, HelpCircle, Activity, Euro, Zap, CheckCircle2, XCircle, Clock,
  Globe, MapPin, Sparkles, ShieldCheck, RefreshCw, Mail, BarChart3, Inbox,
  ExternalLink, Building2, Bell, Download, Copy, Check, Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActivityFeed from "@/components/admin/ActivityFeed";

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
const num = (n: number) => n.toLocaleString("bs-BA");

// Premium KPI tile — gradient border, soft glow, large numerals.
function KpiTile({
  icon: Icon, label, value, sub, accent = "default", trend,
}: {
  icon: any; label: string; value: string | number; sub?: string;
  accent?: "default" | "gold" | "green" | "blue" | "violet" | "rose";
  trend?: { value: number; positive?: boolean };
}) {
  const accentMap: Record<string, { border: string; glow: string; iconBg: string; iconFg: string }> = {
    default: { border: "border-white/10 hover:border-[hsl(var(--gold)/0.35)]", glow: "from-white/[0.02]", iconBg: "bg-white/5", iconFg: "text-white/80" },
    gold: { border: "border-[hsl(var(--gold))]/25 hover:border-[hsl(var(--gold))]/50", glow: "from-[hsl(var(--gold))]/[0.08]", iconBg: "bg-[hsl(var(--gold))]/15", iconFg: "text-[hsl(var(--gold))]" },
    green: { border: "border-emerald-500/25 hover:border-emerald-500/45", glow: "from-emerald-500/[0.06]", iconBg: "bg-emerald-500/15", iconFg: "text-emerald-300" },
    blue: { border: "border-sky-500/25 hover:border-sky-500/45", glow: "from-sky-500/[0.06]", iconBg: "bg-sky-500/15", iconFg: "text-sky-300" },
    violet: { border: "border-violet-500/25 hover:border-violet-500/45", glow: "from-violet-500/[0.06]", iconBg: "bg-violet-500/15", iconFg: "text-violet-300" },
    rose: { border: "border-rose-500/25 hover:border-rose-500/45", glow: "from-rose-500/[0.06]", iconBg: "bg-rose-500/15", iconFg: "text-rose-300" },
  };
  const c = accentMap[accent];
  return (
    <div className={`group relative overflow-hidden rounded-2xl border ${c.border} bg-[hsl(225,45%,8%)]/80 bg-gradient-to-br ${c.glow} to-transparent p-4 backdrop-blur-md transition-all hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.iconBg} ring-1 ring-inset ring-white/10`}>
          <Icon className={`h-4 w-4 ${c.iconFg}`} />
        </div>
        {trend && (
          <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${trend.positive ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
            {trend.positive ? "▲" : "▼"} {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/75">{label}</div>
      <div className="mt-1 text-2xl md:text-3xl font-extrabold tabular-nums leading-tight text-white drop-shadow">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-white/70">{sub}</div>}
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
    gold: "from-[hsl(var(--gold))]/80 to-[hsl(var(--gold))]/40",
    blue: "from-sky-500/80 to-sky-500/40",
    green: "from-emerald-500/80 to-emerald-500/40",
    violet: "from-violet-500/80 to-violet-500/40",
  }[color];
  return (
    <div className="space-y-1.5">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-16 text-white/70 tabular-nums truncate">{String(d[labelKey]).slice(-5)}</span>
          <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${cls} rounded-full transition-all`} style={{ width: `${(d[valueKey] / max) * 100}%` }} />
          </div>
          <span className="w-16 text-right font-bold tabular-nums text-white">{d[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

function Panel({ title, icon: Icon, children, right, tone = "default" }: {
  title: string; icon?: any; children: React.ReactNode; right?: React.ReactNode;
  tone?: "default" | "warning" | "success";
}) {
  const toneCls = tone === "warning"
    ? "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-[hsl(225,45%,8%)]/80"
    : tone === "success"
    ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-[hsl(225,45%,8%)]/80"
    : "border-[hsl(var(--gold)/0.15)] bg-[hsl(225,45%,8%)]/80";
  return (
    <div className={`rounded-2xl border ${toneCls} p-5 backdrop-blur-md shadow-lg shadow-black/30`}>
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="font-semibold text-sm flex items-center gap-2 text-white">
          {Icon && <Icon className="h-4 w-4 text-[hsl(var(--gold))]" />} {title}
        </h3>
        {right}
      </div>
      {children}
    </div>
  );
}

// ──────────────────────── Page ────────────────────────
export default function AdminDashboard() {
  const { displayName } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<"all" | "premium" | "trial" | "free">("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      toast({ title: "Email kopiran", description: email });
      setTimeout(() => setCopiedEmail(null), 1500);
    } catch {
      toast({ title: "Kopiranje nije uspjelo", variant: "destructive" });
    }
  };

  const exportCSV = (rows: any[], filename: string) => {
    if (!rows || rows.length === 0) {
      toast({ title: "Nema podataka za export" });
      return;
    }
    const headers = Object.keys(rows[0]);
    const escape = (v: any) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV preuzet", description: `${rows.length} redova` });
  };

  const loadAll = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [statsRes, usersRes, paymentsRes] = await Promise.all([
        supabase.rpc("get_admin_stats" as any),
        supabase.rpc("get_admin_users" as any, { _search: null, _limit: 100 }),
        supabase.rpc("get_admin_payments" as any, { _limit: 25 }),
      ]);
      const errors = [
        statsRes.error && `Statistika: ${statsRes.error.message}`,
        usersRes.error && `Korisnici: ${usersRes.error.message}`,
        paymentsRes.error && `Plaćanja: ${paymentsRes.error.message}`,
      ].filter(Boolean) as string[];
      if (statsRes.data) setStats(statsRes.data as any);
      if (usersRes.data) setUsers(usersRes.data as any);
      if (paymentsRes.data) setPayments(paymentsRes.data as any);
      setLoadError(errors.length ? errors.join(" · ") : null);
      setLastRefresh(new Date());
    } catch (err: any) {
      setLoadError(err?.message ?? "Neočekivana greška pri učitavanju admin podataka.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAll();
    const id = setInterval(() => loadAll(true), 30000);
    const onVis = () => { if (document.visibilityState === "visible") loadAll(true); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      setSearchBusy(true);
      const { data, error } = await supabase.rpc("get_admin_users" as any, { _search: search.trim() || null, _limit: 100 });
      if (data) setUsers(data as any);
      if (error) setLoadError(`Pretraga korisnika: ${error.message}`);
      setSearchBusy(false);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("bs-BA", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
  const fmtDT = (d: string | null) => d ? new Date(d).toLocaleString("bs-BA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
  const daysLeft = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000));
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Dobro jutro";
    if (h < 18) return "Dobar dan";
    return "Dobro veče";
  };

  const tierBadge = (tier: string, isPremium: boolean) => {
    if (tier === "premium" || tier === "premium_yearly" || tier === "lifetime")
      return <Badge className="bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/40">Premium</Badge>;
    if (tier === "launch_trial") return <Badge variant="secondary" className="bg-sky-500/15 text-sky-300 border-sky-500/30">Launch trial</Badge>;
    if (tier === "influencer_trial") return <Badge variant="secondary" className="bg-violet-500/15 text-violet-300 border-violet-500/30">Influencer</Badge>;
    if (isPremium) return <Badge>Premium</Badge>;
    return <Badge variant="outline">Free</Badge>;
  };

  const conversionRate = useMemo(() => {
    if (!stats) return 0;
    return pct(stats.funnel.paid + stats.funnel.trialActive, stats.funnel.signups);
  }, [stats]);

  const emailHealthPct = useMemo(() => {
    if (!stats) return 100;
    const t = stats.emailStats.total;
    if (t === 0) return 100;
    return Math.round((stats.emailStats.sent / t) * 100);
  }, [stats]);

  if (loading) {
    return (
      <div className="container py-24 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[hsl(var(--gold))]/20 blur-xl animate-pulse" />
          <Loader2 className="relative h-8 w-8 animate-spin text-[hsl(var(--gold))]" />
        </div>
        <p className="text-sm">Učitavam komandnu tablu…</p>
      </div>
    );
  }
  if (!stats) {
    return (
      <div className="container max-w-2xl py-16">
        <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-card/40 p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/15 ring-1 ring-rose-500/40">
              <AlertTriangle className="h-6 w-6 text-rose-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold">Admin Dashboard se nije učitao</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Admin pristup je otvoren, ali podaci iz baze nisu vraćeni.
              </p>
              <div className="mt-5 rounded-xl border border-border/40 bg-background/40 p-4 text-xs text-muted-foreground break-words">
                {loadError ?? "Nema dodatne poruke greške."}
              </div>
              <Button className="mt-5" size="sm" onClick={() => loadAll()}>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Pokušaj ponovo
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pendingTotal = stats.pendingQuestions + stats.pendingDirectory;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard · BalkanLink</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="admin-dark-scope relative min-h-screen bg-[#020617] text-white">
      <style>{`
        .admin-dark-scope [data-state="active"][role="tab"] { background: hsl(var(--gold) / 0.18); color: hsl(var(--gold)); }
        .admin-dark-scope [role="tab"] { color: rgba(255,255,255,0.7); }
        .admin-dark-scope [role="tab"]:hover { color: #fff; }
        .admin-dark-scope button[class*="border-input"],
        .admin-dark-scope a[class*="border-input"] {
          background: hsl(225 45% 10% / 0.8) !important;
          border-color: hsl(var(--gold) / 0.3) !important;
          color: #fff !important;
        }
        .admin-dark-scope button[class*="border-input"]:hover,
        .admin-dark-scope a[class*="border-input"]:hover {
          background: hsl(var(--gold) / 0.12) !important;
          border-color: hsl(var(--gold) / 0.55) !important;
          color: hsl(var(--gold)) !important;
        }
        .admin-dark-scope input { background: hsl(225 45% 8% / 0.9); border-color: hsl(var(--gold) / 0.35); color: #fff; }
        .admin-dark-scope input::placeholder { color: rgba(255,255,255,0.55); }
        .admin-dark-scope .text-muted-foreground { color: rgba(255,255,255,0.78) !important; }
        .admin-dark-scope .text-foreground { color: #fff !important; }
        .admin-dark-scope [data-radix-accordion-trigger] { color: #fff; font-weight: 600; }
        .admin-dark-scope table thead th { color: rgba(255,255,255,0.85) !important; }
        .admin-dark-scope table tbody td { color: rgba(255,255,255,0.92); }
        .admin-dark-scope table tbody tr:hover { background: hsl(var(--gold) / 0.08) !important; }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,50%,8%)] via-[#020617] to-[hsl(225,45%,6%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-[hsl(var(--gold)/0.08)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[hsl(var(--brand-orange)/0.06)] blur-[120px] pointer-events-none" />

      {/* Premium hero header */}
      <div className="relative overflow-hidden border-b border-[hsl(var(--gold)/0.15)] bg-gradient-to-b from-[hsl(var(--gold))]/[0.06] via-transparent to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gold)/0.15),_transparent_50%)] pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[hsl(var(--gold))]/10 blur-3xl pointer-events-none" />
        <div className="container max-w-7xl py-8 relative">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--gold))]/30 to-[hsl(var(--gold))]/5 ring-1 ring-[hsl(var(--gold))]/40 shadow-lg shadow-[hsl(var(--gold))]/10">
                <ShieldCheck className="h-6 w-6 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] text-[10px] font-bold tracking-wider uppercase">
                    <Sparkles className="h-3 w-3 mr-1" /> Admin
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" /> Live
                  </Badge>
                </div>
                <h1 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">
                  {greeting()}, {displayName}.
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Pregled platforme · BalkanLink ·{" "}
                  {lastRefresh && (
                    <span className="text-xs">auto-refresh 30s · zadnji put {lastRefresh.toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => loadAll(true)} disabled={refreshing}>
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} /> Osvježi
              </Button>
              <Button variant="outline" size="sm" asChild className="relative">
                <Link to="/admin/pitanja">
                  <HelpCircle className="h-3.5 w-3.5 mr-1.5" /> Q&A
                  {stats.pendingQuestions > 0 && (
                    <Badge className="ml-2 h-5 min-w-[20px] px-1.5 bg-rose-500/20 text-rose-300 border-rose-500/40">{stats.pendingQuestions}</Badge>
                  )}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/trialovi"><Sparkles className="h-3.5 w-3.5 mr-1.5" /> Trialovi</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/forms"><FileText className="h-3.5 w-3.5 mr-1.5" /> Formulari</Link>
              </Button>
            </div>
          </div>

          {/* Top KPI grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiTile icon={Users} label="Korisnici" value={num(stats.totalUsers)} sub={`+${stats.newToday} danas · +${stats.new7d} u 7d`} />
            <KpiTile icon={Crown} label="Aktivni Premium" value={num(stats.activePremium)} sub={`MRR ${eur(stats.estimatedMrr)}`} accent="gold" />
            <KpiTile icon={Calendar} label="Trialovi" value={num(stats.trialUsers)} sub={`${stats.launchTrialUsers}L · ${stats.influencerTrialUsers}I`} accent="blue" />
            <KpiTile icon={Euro} label="Prihod 30d" value={eur(stats.revenue30d)} sub={`${stats.paidCount30d} transakcija`} accent="green" />
            <KpiTile icon={Eye} label="Posjete danas" value={num(stats.viewsToday)} sub={`${stats.uniqueVisitorsToday} jedinstvenih`} accent="violet" />
            <KpiTile
              icon={Activity}
              label="Konverzija"
              value={`${conversionRate}%`}
              sub="signup → trial/Premium"
              accent={conversionRate >= 10 ? "green" : "rose"}
            />
          </div>

          {/* Alert strip */}
          {(stats.trialEndingSoon.length > 0 || pendingTotal > 0 || stats.emailStats.failed > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {stats.trialEndingSoon.length > 0 && (
                <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/40 gap-1">
                  <AlertTriangle className="h-3 w-3" /> {stats.trialEndingSoon.length} trial pred istek
                </Badge>
              )}
              {pendingTotal > 0 && (
                <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/40 gap-1">
                  <Inbox className="h-3 w-3" /> {pendingTotal} čekaju moderaciju
                </Badge>
              )}
              {stats.emailStats.failed > 0 && (
                <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/40 gap-1">
                  <Mail className="h-3 w-3" /> {stats.emailStats.failed} neuspjelih emailova
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container py-8 max-w-7xl space-y-6 relative z-10">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full overflow-x-auto justify-start flex-nowrap h-11 bg-[hsl(225,45%,8%)]/80 backdrop-blur-md border border-[hsl(var(--gold)/0.15)]">
            <TabsTrigger value="overview" className="gap-1.5"><BarChart3 className="h-3.5 w-3.5" /> Pregled</TabsTrigger>
            <TabsTrigger value="activity" className="gap-1.5"><Bell className="h-3.5 w-3.5" /> Aktivnost</TabsTrigger>
            <TabsTrigger value="users" className="gap-1.5">
              <Users className="h-3.5 w-3.5" /> Korisnici
              {stats.trialEndingSoon.length > 0 && (
                <Badge className="ml-1 bg-amber-500/20 text-amber-300 border-amber-500/40 h-4 px-1 text-[10px]">{stats.trialEndingSoon.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-1.5"><Euro className="h-3.5 w-3.5" /> Prihodi</TabsTrigger>
            <TabsTrigger value="content" className="gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Sadržaj
              {pendingTotal > 0 && (
                <Badge className="ml-1 bg-rose-500/20 text-rose-300 border-rose-500/40 h-4 px-1 text-[10px]">{pendingTotal}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="traffic" className="gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Saobraćaj</TabsTrigger>
            <TabsTrigger value="geo" className="gap-1.5"><Globe className="h-3.5 w-3.5" /> Geo</TabsTrigger>
            <TabsTrigger value="email" className="gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email
              {stats.emailStats.failed > 0 && (
                <Badge className="ml-1 bg-rose-500/20 text-rose-300 border-rose-500/40 h-4 px-1 text-[10px]">{stats.emailStats.failed}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ──────────── AKTIVNOST ──────────── */}
          <TabsContent value="activity" className="space-y-4 mt-5">
            <Panel title="Posljednje aktivnosti korisnika" icon={Bell}>
              <ActivityFeed />
            </Panel>
          </TabsContent>

          {/* ──────────── PREGLED ──────────── */}
          <TabsContent value="overview" className="space-y-4 mt-5">
            <Panel title="Konverzioni lijevak (zadnjih 30 dana)" icon={Activity}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Posjetioci", value: stats.funnel.visitors, base: stats.funnel.visitors, color: "violet" },
                  { label: "Registracije", value: stats.funnel.signups, base: stats.funnel.visitors, color: "blue" },
                  { label: "Trial aktivni", value: stats.funnel.trialActive, base: stats.funnel.signups, color: "gold" },
                  { label: "Plaćeni Premium", value: stats.funnel.paid, base: stats.funnel.signups, color: "green" },
                ].map((s, i) => (
                  <div key={s.label} className="relative rounded-xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(225,45%,6%)]/80 p-4 overflow-hidden">
                    <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">{`${i + 1}. ${s.label}`}</div>
                    <div className="text-2xl font-extrabold tabular-nums mt-2 text-white">{num(s.value)}</div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[hsl(var(--gold))]/90 to-[hsl(var(--gold))]/50"
                        style={{ width: `${pct(s.value, s.base)}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-white/55 mt-1.5">{pct(s.value, s.base)}% prethodnog</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Stopa konverzije <strong className="text-foreground">registracije → trial/Premium</strong>:{" "}
                <span className="font-bold text-[hsl(var(--gold))]">{conversionRate}%</span>
              </div>
            </Panel>

            <div className="grid lg:grid-cols-2 gap-4">
              <Panel title="Aktivnost (zadnjih 14 dana)" icon={TrendingUp}>
                <Accordion type="single" collapsible defaultValue="views" className="w-full">
                  <AccordionItem value="views" className="border-border/30">
                    <AccordionTrigger className="text-xs py-2.5"><span className="flex items-center gap-2"><Eye className="h-3.5 w-3.5" /> Posjete</span></AccordionTrigger>
                    <AccordionContent><MiniBars data={stats.viewsByDay} color="gold" labelKey="day" valueKey="views" /></AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="signups" className="border-border/30">
                    <AccordionTrigger className="text-xs py-2.5"><span className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Nove registracije</span></AccordionTrigger>
                    <AccordionContent><MiniBars data={stats.newUsersByDay} color="blue" labelKey="day" valueKey="signups" /></AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="chat" className="border-border/30">
                    <AccordionTrigger className="text-xs py-2.5"><span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Asistent upiti</span></AccordionTrigger>
                    <AccordionContent><MiniBars data={stats.chatByDay} color="violet" labelKey="day" valueKey="queries" /></AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="revenue" className="border-border/30 border-b-0">
                    <AccordionTrigger className="text-xs py-2.5"><span className="flex items-center gap-2"><Euro className="h-3.5 w-3.5" /> Prihodi (30d)</span></AccordionTrigger>
                    <AccordionContent>
                      <MiniBars
                        data={stats.revenueByDay.map((d) => ({ ...d, eur: +(d.amount_cents / 100).toFixed(2) }))}
                        color="green" labelKey="day" valueKey="eur"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Panel>

              <Panel title="Posjete po satu (danas)" icon={Calendar}>
                <MiniBars
                  data={stats.viewsByHourToday.map((d) => ({ hour: `${String(d.hour).padStart(2, "0")}h`, views: d.views }))}
                  color="blue" labelKey="hour" valueKey="views"
                />
              </Panel>
            </div>

            <Panel title="Brze akcije" icon={Zap}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <Button variant="outline" size="sm" asChild className="justify-start"><Link to="/admin/pitanja"><HelpCircle className="h-3.5 w-3.5 mr-2" /> Moderacija ({stats.pendingQuestions})</Link></Button>
                <Button variant="outline" size="sm" asChild className="justify-start"><Link to="/admin/trialovi"><Sparkles className="h-3.5 w-3.5 mr-2" /> Trial kodovi</Link></Button>
                <Button variant="outline" size="sm" asChild className="justify-start"><Link to="/admin/forms"><FileText className="h-3.5 w-3.5 mr-2" /> Forms mapper</Link></Button>
                <Button variant="outline" size="sm" asChild className="justify-start"><Link to="/firma/submit"><Building2 className="h-3.5 w-3.5 mr-2" /> Submissions</Link></Button>
              </div>
            </Panel>
          </TabsContent>

          {/* ──────────── KORISNICI ──────────── */}
          <TabsContent value="users" className="space-y-4 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiTile icon={Users} label="Ukupno" value={num(stats.totalUsers)} />
              <KpiTile icon={TrendingUp} label="Novi 7d" value={num(stats.new7d)} sub={`${stats.new30d} u 30d`} accent="green" />
              <KpiTile icon={Crown} label="Premium" value={num(stats.activePremium)} sub={`${stats.lifetimeUsers ?? 0} lifetime`} accent="gold" />
              <KpiTile icon={Calendar} label="Free" value={num(stats.freeUsers)} />
            </div>

            {stats.trialEndingSoon.length > 0 && (
              <Panel title="Trial pred istek (sljedećih 7 dana)" icon={AlertTriangle} tone="warning"
                right={<Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">{stats.trialEndingSoon.length}</Badge>}>
                <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/40">
                        <th className="py-2 pr-3 font-semibold">Email</th>
                        <th className="py-2 pr-3 font-semibold">Ime</th>
                        <th className="py-2 pr-3 font-semibold">Tier</th>
                        <th className="py-2 pr-3 font-semibold text-right">Ističe</th>
                        <th className="py-2 pr-3 font-semibold text-right">Dana</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.trialEndingSoon.map((u) => (
                        <tr key={u.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                          <td className="py-2.5 pr-3 truncate max-w-[220px] font-medium">{u.email}</td>
                          <td className="py-2.5 pr-3 text-muted-foreground">{u.first_name || "—"}</td>
                          <td className="py-2.5 pr-3">{tierBadge(u.subscription_tier, true)}</td>
                          <td className="py-2.5 pr-3 text-right text-xs text-muted-foreground">{fmtDT(u.expires_at)}</td>
                          <td className="py-2.5 pr-3 text-right">
                            <Badge variant={daysLeft(u.expires_at) <= 2 ? "destructive" : "secondary"}>{daysLeft(u.expires_at)}d</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}

            <Panel title={`Svi korisnici (${users.length})`} icon={Users}
              right={
                <div className="relative w-56">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Email ili ime…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-8 text-xs" />
                  {searchBusy && <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 animate-spin text-muted-foreground" />}
                </div>
              }>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/40">
                      <th className="py-2 pr-3 font-semibold">Email</th>
                      <th className="py-2 pr-3 font-semibold">Ime</th>
                      <th className="py-2 pr-3 font-semibold">Tier</th>
                      <th className="py-2 pr-3 font-semibold">Registrovan</th>
                      <th className="py-2 pr-3 font-semibold">Zadnji login</th>
                      <th className="py-2 pr-3 font-semibold">Trial do</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className="py-2.5 pr-3 font-medium truncate max-w-[220px]" title={u.email}>{u.email}</td>
                        <td className="py-2.5 pr-3 text-muted-foreground">{u.first_name || "—"}</td>
                        <td className="py-2.5 pr-3">{tierBadge(u.subscription_tier, u.is_premium)}</td>
                        <td className="py-2.5 pr-3 text-muted-foreground text-xs">{fmtDate(u.created_at)}</td>
                        <td className="py-2.5 pr-3 text-muted-foreground text-xs">{fmtDT(u.last_login_at)}</td>
                        <td className="py-2.5 pr-3 text-muted-foreground text-xs">{fmtDate(u.subscription_expires_at)}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">Nema rezultata.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Top aktivni korisnici (Asistent, 30d)" icon={Activity}>
              {stats.topActiveUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nema podataka.</p>
              ) : (
                <ol className="space-y-1 text-sm">
                  {stats.topActiveUsers.map((u, i) => (
                    <li key={u.email} className="flex items-center gap-3 py-2 border-b border-border/20 last:border-0">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${i < 3 ? "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))]" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                      <span className="flex-1 truncate font-medium">{u.first_name || u.email}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">{u.email}</span>
                      <Badge variant="secondary">{u.chat_count}</Badge>
                    </li>
                  ))}
                </ol>
              )}
            </Panel>
          </TabsContent>

          {/* ──────────── PRIHODI ──────────── */}
          <TabsContent value="revenue" className="space-y-4 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiTile icon={Euro} label="Danas" value={eur(stats.revenueToday)} accent="green" />
              <KpiTile icon={Euro} label="7 dana" value={eur(stats.revenue7d)} accent="green" />
              <KpiTile icon={Euro} label="30 dana" value={eur(stats.revenue30d)} sub={`${stats.paidCount30d} transakcija`} accent="green" />
              <KpiTile icon={Crown} label="Procijenjeni MRR" value={eur(stats.estimatedMrr)} sub="9.99€ × aktivni Premium" accent="gold" />
            </div>
            <KpiTile icon={Sparkles} label="Ukupan prihod (sva vremena)" value={eur(stats.revenueAllTime)} accent="gold" />

            <Panel title="Prihodi po danu (30d)" icon={TrendingUp}>
              <MiniBars
                data={stats.revenueByDay.map((d) => ({ day: d.day, eur: +(d.amount_cents / 100).toFixed(2) }))}
                color="green" labelKey="day" valueKey="eur"
              />
            </Panel>

            <Panel title="Zadnja plaćanja" icon={CreditCard}>
              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nema plaćanja zabilježenih.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/40">
                        <th className="py-2 pr-3 font-semibold">Email</th>
                        <th className="py-2 pr-3 font-semibold text-right">Iznos</th>
                        <th className="py-2 pr-3 font-semibold">Status</th>
                        <th className="py-2 pr-3 font-semibold">Datum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                          <td className="py-2.5 pr-3 truncate max-w-[220px]">{p.email || "—"}</td>
                          <td className="py-2.5 pr-3 text-right font-bold tabular-nums">{eur(p.amount)}</td>
                          <td className="py-2.5 pr-3">
                            {p.status === "paid" || p.status === "succeeded" ? (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 gap-1"><CheckCircle2 className="h-3 w-3" /> {p.status}</Badge>
                            ) : p.status === "pending" ? (
                              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 gap-1"><Clock className="h-3 w-3" /> {p.status}</Badge>
                            ) : (
                              <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30 gap-1"><XCircle className="h-3 w-3" /> {p.status}</Badge>
                            )}
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground text-xs">{fmtDT(p.paid_at || p.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </TabsContent>

          {/* ──────────── SADRŽAJ ──────────── */}
          <TabsContent value="content" className="space-y-4 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiTile icon={HelpCircle} label="Pending Q&A" value={stats.pendingQuestions} sub={`${stats.publishedQuestions} objavljenih`} accent={stats.pendingQuestions > 0 ? "rose" : "default"} />
              <KpiTile icon={Building2} label="Pending direktorij" value={stats.pendingDirectory} sub={`${stats.verifiedDirectory} verifikovanih`} accent={stats.pendingDirectory > 0 ? "rose" : "default"} />
              <KpiTile icon={Sparkles} label="Asistent (30d)" value={num(stats.chat30d)} sub={`${stats.chatToday} danas · ${stats.chat7d} u 7d`} accent="violet" />
              <KpiTile icon={FileText} label="Doc-Check (30d)" value={num(stats.docs30d)} sub={`${stats.docsToday} danas · ${stats.docs7d} u 7d`} accent="blue" />
            </div>

            <Panel title="Recenzije" icon={CheckCircle2}>
              <div className="text-sm text-muted-foreground">Ukupno odobrenih recenzija: <strong className="text-foreground tabular-nums">{stats.totalReviews}</strong></div>
            </Panel>

            <Panel title="Akcije moderacije" icon={Zap}>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild><Link to="/admin/pitanja">Pregledaj Q&A ({stats.pendingQuestions})</Link></Button>
                <Button variant="outline" size="sm" asChild><Link to="/firma/submit">Direktorij submissions</Link></Button>
                <Button variant="outline" size="sm" asChild><Link to="/admin/forms">Forms upravljanje</Link></Button>
              </div>
            </Panel>
          </TabsContent>

          {/* ──────────── SAOBRAĆAJ ──────────── */}
          <TabsContent value="traffic" className="space-y-4 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiTile icon={Eye} label="Pregledi 7d" value={num(stats.views7d)} accent="violet" />
              <KpiTile icon={Eye} label="Pregledi 30d" value={num(stats.views30d)} sub={`Ø ${stats.avgViewsPerDay30d}/dan`} accent="violet" />
              <KpiTile icon={Users} label="Jedinstveni 30d" value={num(stats.uniqueVisitors30d)} accent="blue" />
              <KpiTile icon={ShieldCheck} label="Prijavljeni 7d" value={num(stats.loggedInViews7d)} sub={`vs ${num(stats.anonViews7d)} anonimnih`} accent="green" />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <Panel title="Top stranice (30d)" icon={FileText}>
                {stats.topPages30d.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema podataka.</p>
                ) : (
                  <ol className="space-y-1 text-sm">
                    {stats.topPages30d.slice(0, 10).map((p, i) => (
                      <li key={p.path} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
                        <span className="w-5 text-xs text-muted-foreground tabular-nums">{i + 1}.</span>
                        <span className="flex-1 truncate font-mono text-xs">{p.path}</span>
                        <Badge variant="secondary" className="tabular-nums">{p.views}</Badge>
                        <Badge variant="outline" className="tabular-nums text-xs">{p.unique_visitors}u</Badge>
                      </li>
                    ))}
                  </ol>
                )}
              </Panel>

              <Panel title="Top izvori posjeta" icon={ExternalLink}>
                {stats.topReferrers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema podataka.</p>
                ) : (
                  <ol className="space-y-1 text-sm">
                    {stats.topReferrers.map((r, i) => (
                      <li key={r.source} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
                        <span className="w-5 text-xs text-muted-foreground tabular-nums">{i + 1}.</span>
                        <span className="flex-1 truncate text-xs">{r.source}</span>
                        <Badge variant="secondary" className="tabular-nums">{r.views}</Badge>
                      </li>
                    ))}
                  </ol>
                )}
              </Panel>
            </div>
          </TabsContent>

          {/* ──────────── GEO ──────────── */}
          <TabsContent value="geo" className="space-y-4 mt-5">
            <div className="grid lg:grid-cols-2 gap-4">
              <Panel title="Top zemlje (30d)" icon={Globe}>
                {stats.topCountries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema geo podataka.</p>
                ) : (
                  <ol className="space-y-1 text-sm">
                    {stats.topCountries.map((c, i) => (
                      <li key={c.country || i} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
                        <span className="w-5 text-xs text-muted-foreground tabular-nums">{i + 1}.</span>
                        <span className="flex-1 font-medium">{c.country || "Nepoznato"}</span>
                        <Badge variant="secondary" className="tabular-nums">{c.views} pregleda</Badge>
                        <Badge variant="outline" className="tabular-nums text-xs">{c.unique_visitors} jed.</Badge>
                      </li>
                    ))}
                  </ol>
                )}
              </Panel>

              <Panel title="Top gradovi (30d)" icon={MapPin}>
                {stats.topCities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nema geo podataka.</p>
                ) : (
                  <ol className="space-y-1 text-sm">
                    {stats.topCities.slice(0, 15).map((c, i) => (
                      <li key={`${c.city}-${i}`} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
                        <span className="w-5 text-xs text-muted-foreground tabular-nums">{i + 1}.</span>
                        <span className="flex-1 truncate font-medium text-xs">{c.city}{c.country ? `, ${c.country}` : ""}</span>
                        <Badge variant="secondary" className="tabular-nums">{c.views}</Badge>
                      </li>
                    ))}
                  </ol>
                )}
              </Panel>
            </div>
          </TabsContent>

          {/* ──────────── EMAIL ──────────── */}
          <TabsContent value="email" className="space-y-4 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiTile icon={CheckCircle2} label="Sent" value={num(stats.emailStats.sent)} accent="green" />
              <KpiTile icon={XCircle} label="Failed" value={num(stats.emailStats.failed)} accent={stats.emailStats.failed > 0 ? "rose" : "default"} />
              <KpiTile icon={AlertTriangle} label="Suppressed" value={num(stats.emailStats.suppressed)} accent="default" />
              <KpiTile icon={Clock} label="Pending" value={num(stats.emailStats.pending)} accent="blue" />
            </div>

            <Panel title="Stopa uspjeha dostave" icon={Mail} tone={emailHealthPct >= 95 ? "success" : "warning"}>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${emailHealthPct >= 95 ? "from-emerald-500/80 to-emerald-500/40" : "from-amber-500/80 to-amber-500/40"} rounded-full`}
                    style={{ width: `${emailHealthPct}%` }}
                  />
                </div>
                <span className="font-bold tabular-nums">{emailHealthPct}%</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Ukupno emailova: <strong className="text-foreground">{stats.emailStats.total}</strong> (dedup po message_id)
              </div>
            </Panel>

            {stats.emailRecentFailures.length > 0 && (
              <Panel title="Posljednji failovi (14d)" icon={XCircle} tone="warning">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/40">
                        <th className="py-2 pr-3 font-semibold">Template</th>
                        <th className="py-2 pr-3 font-semibold">Recipient</th>
                        <th className="py-2 pr-3 font-semibold">Greška</th>
                        <th className="py-2 pr-3 font-semibold">Kada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.emailRecentFailures.map((f, i) => (
                        <tr key={i} className="border-b border-border/20">
                          <td className="py-2.5 pr-3 font-mono text-xs">{f.template_name}</td>
                          <td className="py-2.5 pr-3 truncate max-w-[200px]">{f.recipient_email}</td>
                          <td className="py-2.5 pr-3 text-rose-400 text-xs truncate max-w-[300px]" title={f.error_message || ""}>{f.error_message || f.status}</td>
                          <td className="py-2.5 pr-3 text-muted-foreground text-xs">{fmtDT(f.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </>
  );
}
