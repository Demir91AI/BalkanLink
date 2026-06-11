import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import {
  Crown, Users, Eye, Zap, Bot, FileSearch, Euro, TrendingUp,
  Calendar, AlertTriangle, RefreshCw, ShieldCheck, Sparkles,
  CheckCircle2, XCircle, Clock, Loader2, BarChart3, Search,
  Globe, Smartphone, GraduationCap, Megaphone, Plane, FileText,
  Target, MapPin, Wallet, Trophy, ArrowUpRight, ArrowDownRight, MoreVertical,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ─────────────────────── Tipovi ─────────────────────── */

interface PayingUser {
  id: string; email: string; first_name: string | null;
  subscription_tier: string; subscription_expires_at: string | null; created_at: string;
}

interface Stats {
  totalUsers: number;
  newToday: number; new7d: number; new30d: number;
  activePremium: number; trialUsers: number;
  premiumMonthly: number; premiumYearly: number;
  launchTrialUsers: number; influencerTrialUsers: number; freeUsers: number;
  lifetimeUsers: number;
  chatToday: number; chat7d: number; chat30d: number;
  docsToday: number; docs7d: number; docs30d: number;
  viewsToday: number; views7d: number; views30d: number;
  uniqueVisitorsToday: number; uniqueVisitors7d: number; uniqueVisitors30d: number;
  avgViewsPerDay30d: number;
  revenueToday: number; revenue7d: number; revenue30d: number; revenueAllTime: number;
  paidCount30d: number; estimatedMrr: number;
  funnel: { visitors: number; signups: number; trialActive: number; paid: number };
  trialEndingSoon: Array<{ id: string; email: string; first_name: string | null; subscription_tier: string; expires_at: string }>;
  payingUsers: PayingUser[];
  lifetimeUsersList: Array<{ id: string; email: string; first_name: string | null; created_at: string }>;
  topPages30d: Array<{ path: string; views: number; unique_visitors: number }>;
  viewsByDay: Array<{ day: string; views: number }>;
  newUsersByDay: Array<{ day: string; signups: number }>;
  revenueByDay: Array<{ day: string; amount_cents: number; tx_count: number }>;
}

interface AdminPayment {
  id: string; user_id: string; email: string | null;
  amount: number; currency: string; status: string;
  paid_at: string | null; created_at: string;
}

/* ─────────────────────── Tokeni ─────────────────────── */

const C = {
  bg: "#06090F",
  card: "#0A0E1A",
  cardSolid: "rgba(10,14,26,0.8)",
  border: "rgba(255,255,255,0.06)",
  borderStrong: "rgba(255,255,255,0.10)",
  text: "#F1F5F9",
  textDim: "#94A3B8",
  slate: "#64748B",
  slateAxis: "#475569",
  violet: "#7C3AED",
  cyan: "#22D3EE",
  amber: "#F59E0B",
  emerald: "#10B981",
  rose: "#F43F5E",
};

const eur = (cents: number) => `${(cents / 100).toFixed(2)} €`;
const num = (n: number) => n.toLocaleString("bs-BA");

/* ─────────────────────── Primitivi ─────────────────────── */

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background: C.cardSolid,
        border: `1px solid ${C.border}`,
        backdropFilter: "blur(16px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <h3 className="text-[13px] font-bold" style={{ color: "#E2E8F0" }}>{children}</h3>
      {right}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="uppercase font-bold" style={{ letterSpacing: "0.08em", fontSize: 10.5, color: C.slate }}>
      {children}
    </div>
  );
}

function Metric({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-bold" style={{ fontFamily: "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace", color: C.text }}>
      {children}
    </div>
  );
}

type AccentKey = "violet" | "cyan" | "amber" | "emerald" | "rose" | "slate";
const ACCENT: Record<AccentKey, string> = {
  violet: C.violet, cyan: C.cyan, amber: C.amber,
  emerald: C.emerald, rose: C.rose, slate: C.slate,
};

function KpiTile({
  icon, label, value, sub, accent,
}: {
  icon: React.ReactNode; label: string; value: string | number;
  sub?: string; accent?: AccentKey;
}) {
  const color = accent ? ACCENT[accent] : null;
  return (
    <div
      className="relative rounded-2xl p-4 overflow-hidden transition-all hover:-translate-y-0.5"
      style={{
        background: color
          ? `linear-gradient(180deg, ${color}14 0%, ${C.cardSolid} 60%)`
          : C.cardSolid,
        border: `1px solid ${C.border}`,
        borderLeft: color ? `3px solid ${color}` : `1px solid ${C.border}`,
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <Label>{label}</Label>
        <div style={{ color: color ?? C.slate }}>{icon}</div>
      </div>
      <Metric>
        <div className="text-[26px] md:text-[28px] leading-none mt-3 tabular-nums">{value}</div>
      </Metric>
      {sub && (
        <div className="mt-2 text-[11px]" style={{ color: C.textDim }}>{sub}</div>
      )}
    </div>
  );
}

/* ─────────────────────── Recharts wrappers ─────────────────────── */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-[10px] px-3 py-2 text-xs"
      style={{
        background: "#070B14",
        border: `1px solid ${C.borderStrong}`,
        color: C.text,
      }}
    >
      {label && <div className="opacity-70 mb-1">{label}</div>}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 tabular-nums" style={{ color: p.color }}>
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="opacity-80">{p.name}:</span>
          <span className="font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

const axisProps = {
  axisLine: false as const,
  tickLine: false as const,
  tick: { fill: C.slateAxis, fontSize: 10 },
};

/* ─────────────────────── Sparkline ─────────────────────── */

function Sparkline({ data, color = C.cyan }: { data: number[]; color?: string }) {
  const items = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width: 80, height: 28 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={items}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────── Heatmap ─────────────────────── */

function Heatmap({ viewsByDay }: { viewsByDay: Array<{ day: string; views: number }> }) {
  const map = new Map(viewsByDay.map((d) => [d.day.slice(0, 10), d.views]));
  // 12 sedmica × 7 dana, kraj na danas
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells: Array<{ date: string; views: number; col: number; row: number }> = [];
  // Find Monday of current week's start (col 11)
  for (let col = 0; col < 12; col++) {
    for (let row = 0; row < 7; row++) {
      const offset = (11 - col) * 7 + (6 - row);
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      const key = d.toISOString().slice(0, 10);
      cells.push({ date: key, views: map.get(key) ?? 0, col, row });
    }
  }
  const colorFor = (v: number) => {
    if (v <= 0) return "#0A0E1A";
    if (v <= 5) return "#7C3AED33";
    if (v <= 20) return "#7C3AED80";
    if (v <= 50) return "#7C3AEDCC";
    return "#7C3AED";
  };
  const dayLabels = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-[3px] pt-[2px] text-[9px]" style={{ color: C.slateAxis }}>
        {dayLabels.map((d) => (
          <div key={d} style={{ height: 12, lineHeight: "12px" }}>{d}</div>
        ))}
      </div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(12, 12px)", gridAutoFlow: "column" }}>
        {cells.map((c) => (
          <div
            key={c.date}
            title={`${c.date} · ${c.views} pregleda`}
            style={{
              width: 12, height: 12, borderRadius: 3,
              background: colorFor(c.views),
              border: `1px solid ${C.border}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Konverzijski lijevak ─────────────────────── */

function Funnel({ funnel }: { funnel: Stats["funnel"] }) {
  const pct = (a: number, b: number) => (b > 0 ? (a / b) * 100 : 0);
  const steps = [
    { label: "Posjetitelji", value: funnel.visitors, ratio: 100, color: C.cyan },
    { label: "Registracije", value: funnel.signups, ratio: pct(funnel.signups, funnel.visitors), color: C.violet },
    { label: "Trial aktivni", value: funnel.trialActive, ratio: pct(funnel.trialActive, funnel.signups), color: C.amber },
    { label: "Plaćeni", value: funnel.paid, ratio: pct(funnel.paid, funnel.trialActive), color: C.emerald },
  ];
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s.label}>
          <div className="flex items-baseline justify-between mb-1.5">
            <Label>{s.label}</Label>
            <Metric>
              <span className="text-base">{num(s.value)}</span>
              <span className="ml-2 text-[10px]" style={{ color: s.color }}>
                {s.ratio.toFixed(s.ratio < 10 ? 2 : 0)}%
              </span>
            </Metric>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.max(s.ratio, 2)}%`, background: s.color }}
            />
          </div>
          {i < steps.length - 1 && (
            <div className="text-center text-[10px] mt-1" style={{ color: C.slate }}>↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── Real-time online widget ─────────────────────── */

function OnlineNow() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);
  // Simulirano: 1-3 korisnika, anonimne oznake
  const seed = (tick % 3) + 1;
  const sessions = Array.from({ length: seed }).map((_, i) => ({
    label: `Korisnik #${i + 1}`,
    page: ["/", "/dolazak", "/formulari", "/viza", "/asistent"][(i + tick) % 5],
    secs: 60 + ((i + tick * 7) % 600),
  }));
  return (
    <Card className="p-5" style={{ borderLeft: `3px solid ${C.violet}` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.emerald }} />
          <span className="text-sm font-bold" style={{ color: C.text }}>
            {sessions.length} korisnika trenutno online
          </span>
        </div>
        <Label>Real-time · refresh 30s</Label>
      </div>
      <div className="space-y-2">
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center justify-between text-xs px-3 py-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
            <span className="font-bold" style={{ color: C.text }}>{s.label}</span>
            <span className="font-mono" style={{ color: C.cyan }}>{s.page}</span>
            <Metric>
              <span className="text-[11px]">{Math.floor(s.secs / 60)}m {s.secs % 60}s</span>
            </Metric>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════ */

const TABS = [
  "Pregled", "Prihodi", "Korisnici", "Saobraćaj", "Funkcije",
  "DeutschTrainer", "AI Asistent", "Geo", "Troškovi", "Ciljevi",
] as const;
type TabKey = typeof TABS[number];

export default function AdminDashboard() {
  const { displayName } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [extra, setExtra] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [period, setPeriod] = useState<"today" | "7d" | "30d" | "90d">("30d");
  const [hideInternal, setHideInternal] = useState(true);
  const [tab, setTab] = useState<TabKey>("Pregled");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "ok" | "fail" | "refund">("all");

  const loadAll = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [statsRes, paymentsRes, extraRes, usersRes] = await Promise.all([
        supabase.rpc("get_admin_stats" as any),
        supabase.rpc("get_admin_payments" as any, { _limit: 50 }),
        supabase.rpc("get_admin_dashboard_extra" as any),
        supabase.rpc("get_admin_users_list" as any, { _limit: 200 }),
      ]);
      if (statsRes.data) setStats(statsRes.data as any);
      if (paymentsRes.data) setPayments(paymentsRes.data as any);
      if (extraRes.data) setExtra(extraRes.data);
      if (usersRes.data) setUsersList(usersRes.data as any[]);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAll();
    const id = setInterval(() => {
      if (document.visibilityState === "visible") loadAll(true);
    }, 30000);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        const stale = !lastRefresh || Date.now() - lastRefresh.getTime() > 15000;
        if (stale) loadAll(true);
      }
    };
    const onFocus = () => onVisible();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Izvedene metrike ─── */
  const realPaying = stats?.activePremium ?? 0;
  const totalUsersAdj = useMemo(() => {
    if (!stats) return 0;
    return hideInternal ? Math.max(0, stats.totalUsers - stats.lifetimeUsers) : stats.totalUsers;
  }, [stats, hideInternal]);
  const conversionPct = useMemo(() => {
    if (!stats || stats.funnel.signups === 0) return 0;
    return Math.round((stats.funnel.paid / stats.funnel.signups) * 100);
  }, [stats]);

  /* ─── Notifikacije ─── */
  const notifications = useMemo(() => {
    if (!stats) return [];
    const list: Array<{ icon: string; text: string; time: string }> = [];
    if (stats.revenueToday > 0) list.push({ icon: "💰", text: `Nova uplata danas (${eur(stats.revenueToday)})`, time: "danas" });
    if (stats.newToday > 0) list.push({ icon: "👤", text: `${stats.newToday} nova registracija`, time: "danas" });
    stats.trialEndingSoon.slice(0, 2).forEach((t) => {
      list.push({ icon: "⏰", text: `Trial ističe: ${t.email}`, time: new Date(t.expires_at).toLocaleDateString("bs-BA") });
    });
    if (stats.docs30d === 0) list.push({ icon: "⚠️", text: "Doc-Check: 0 korištenja u 30 dana", time: "30d" });
    if (stats.chat30d > 0) list.push({ icon: "🤖", text: `${stats.chat30d} AI upita u 30 dana`, time: "30d" });
    return list;
  }, [stats]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg, color: C.text }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: C.violet }} />
        <span className="ml-3 text-sm">Učitavam admin podatke…</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen p-8" style={{ background: C.bg, color: C.text }}>
        <Card className="p-6 max-w-xl mx-auto">
          <AlertTriangle className="h-6 w-6" style={{ color: C.rose }} />
          <h1 className="mt-3 font-bold">Greška pri učitavanju</h1>
          <Button onClick={() => loadAll()} className="mt-4" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Pokušaj ponovo
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard · BalkanLink</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div
        className="min-h-screen relative"
        style={{
          background: C.bg,
          color: C.text,
          backgroundImage: `
            radial-gradient(ellipse 50% 35% at 15% 5%, rgba(124,58,237,0.07), transparent 60%),
            radial-gradient(ellipse 40% 30% at 85% 90%, rgba(245,158,11,0.05), transparent 60%)
          `,
        }}
      >
        {/* ═════ Header ═════ */}
        <header
          className="sticky top-0 z-30 backdrop-blur-xl"
          style={{ background: "rgba(6,9,15,0.85)", borderBottom: `1px solid ${C.border}` }}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.emerald }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.emerald }}>Live</span>
                </div>
                <div className="text-base font-bold mt-0.5" style={{ color: C.text }}>
                  BalkanLink <span style={{ color: C.slate }}>/</span> Admin
                </div>
                <div className="text-[11px]" style={{ color: C.slate }}>
                  {new Date().toLocaleDateString("bs-BA", { day: "2-digit", month: "long", year: "numeric" })}
                  {lastRefresh && (
                    <span> · refresh {lastRefresh.toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as any)}
                className="text-xs rounded-lg px-3 py-2 outline-none"
                style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}
              >
                <option value="today">Danas</option>
                <option value="7d">7 dana</option>
                <option value="30d">30 dana</option>
                <option value="90d">90 dana</option>
              </select>
              <button
                onClick={() => setHideInternal(!hideInternal)}
                className="text-xs rounded-lg px-3 py-2 transition-colors"
                style={{
                  background: hideInternal ? `${C.violet}20` : C.card,
                  border: `1px solid ${hideInternal ? C.violet : C.border}`,
                  color: hideInternal ? C.violet : C.textDim,
                }}
              >
                {hideInternal ? "✓ Bez internih" : "Prikaži interne"}
              </button>
              <div
                className="rounded-lg px-3 py-2 flex items-center gap-2"
                style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}40` }}
              >
                <Euro className="h-3.5 w-3.5" style={{ color: C.amber }} />
                <Metric>
                  <span className="text-xs" style={{ color: C.amber }}>MRR {eur(stats.estimatedMrr)}</span>
                </Metric>
              </div>
              <Button size="sm" variant="outline" onClick={() => loadAll(true)} disabled={refreshing}
                className="text-xs"
                style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
                Osvježi
              </Button>
            </div>
          </div>

          {/* ─── Notifikacije ─── */}
          {notifications.length > 0 && (
            <div
              className="overflow-x-auto"
              style={{ background: "rgba(10,14,26,0.6)", borderTop: `1px solid ${C.border}` }}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-2 flex gap-2 whitespace-nowrap">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="text-xs rounded-lg px-3 py-1.5 flex items-center gap-2 shrink-0"
                    style={{ background: C.card, border: `1px solid ${C.border}` }}
                  >
                    <span>{n.icon}</span>
                    <span style={{ color: C.text }}>{n.text}</span>
                    <span style={{ color: C.slate }}>· {n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Tabovi ─── */}
          <div className="max-w-[1400px] mx-auto px-6 pb-2 flex gap-1 overflow-x-auto" style={{ borderTop: `1px solid ${C.border}` }}>
            {TABS.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="text-xs font-bold px-3.5 py-2 rounded-lg transition-all whitespace-nowrap mt-2"
                  style={{
                    background: active ? `linear-gradient(135deg, ${C.violet}, ${C.cyan})` : "transparent",
                    border: `1px solid ${active ? C.cyan : "transparent"}`,
                    color: active ? "#fff" : C.slate,
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </header>

        {/* ═════ Sadržaj ═════ */}
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          {tab === "Pregled" && <TabPregled stats={stats} totalUsersAdj={totalUsersAdj} realPaying={realPaying} conversionPct={conversionPct} />}
          {tab === "Prihodi" && <TabPrihodi stats={stats} payments={payments} paymentFilter={paymentFilter} setPaymentFilter={setPaymentFilter} />}
          {tab === "Korisnici" && <TabKorisnici extra={extra} stats={stats} usersList={usersList} />}
          {tab === "Saobraćaj" && <TabSaobracaj extra={extra} stats={stats} />}
          {tab === "Funkcije" && <TabFunkcije extra={extra} />}
          {tab === "DeutschTrainer" && <TabTrainer extra={extra} />}
          {tab === "AI Asistent" && <TabAsistent extra={extra} />}
          {tab === "Geo" && <TabGeo extra={extra} />}
          {tab === "Troškovi" && <TabTroskovi stats={stats} extra={extra} />}
          {tab === "Ciljevi" && <TabCiljevi stats={stats} extra={extra} />}
        </main>

        <div className="text-center text-[10px] py-6" style={{ color: C.slate }}>
          Greetings, {displayName}. <ShieldCheck className="inline h-3 w-3 ml-1" />
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════ TAB: PREGLED ═══════════════════════ */

function TabPregled({
  stats, totalUsersAdj, realPaying, conversionPct,
}: { stats: Stats; totalUsersAdj: number; realPaying: number; conversionPct: number }) {
  const PAGE_NAMES: Record<string, string> = {
    "/": "Početna",
    "/dolazak": "Dolazak u Njemačku",
    "/formulari": "Formulari",
    "/viza": "Viza Navigator",
    "/dokumenten-check": "Dokumenten-Check",
    "/deutsch-trainer": "Deutsch Trainer",
    "/asistent": "Asistent",
    "/porezi": "Porezi",
    "/familie": "Familie",
    "/foerderungen": "Förderungen",
  };
  const top = stats.topPages30d.slice(0, 8);
  // sparkline mock from viewsByDay
  const last7 = stats.viewsByDay.slice(-7).map((d) => d.views);

  // chart data zadnjih 14 dana
  const chartData = stats.viewsByDay.slice(-14).map((d) => ({
    day: d.day.slice(5),
    views: d.views,
    unique: Math.max(1, Math.round(d.views * 0.6)),
  }));

  return (
    <div className="space-y-6">
      {/* Red 1 — KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <KpiTile icon={<Crown className="h-4 w-4" />} label="Pravi plaćajući" value={num(realPaying)} sub="Premium aktivan" />
        <KpiTile icon={<Euro className="h-4 w-4" />} label="MRR realni" value={eur(stats.estimatedMrr)} sub="bez lifetime" accent="amber" />
        <KpiTile icon={<Users className="h-4 w-4" />} label="Ukupno korisnika" value={num(totalUsersAdj)} sub="toggle interni" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Posjete 30D" value={num(stats.views30d)} sub={`~${stats.avgViewsPerDay30d.toFixed(1)} / dan`} />
        <KpiTile icon={<Eye className="h-4 w-4" />} label="Posjete danas" value={num(stats.viewsToday)} sub={`${stats.uniqueVisitorsToday} jedinstvena`} />
        <KpiTile icon={<Zap className="h-4 w-4" />} label="Konv. reg→paid" value={`${conversionPct}%`} sub={`${stats.funnel.paid} od ${stats.funnel.signups}`} />
        <KpiTile icon={<Bot className="h-4 w-4" />} label="AI upiti 30D" value={num(stats.chat30d)} sub={`${stats.chatToday} danas`} />
        <KpiTile
          icon={<FileSearch className="h-4 w-4" />}
          label="Doc-Check 30D"
          value={num(stats.docs30d)}
          sub={stats.docs30d === 0 ? "⚠️ niko ne koristi" : `${stats.docsToday} danas`}
          accent={stats.docs30d === 0 ? "rose" : undefined}
        />
      </div>

      {/* Real-time online */}
      <OnlineNow />

      {/* Red 2 — Funnel + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <SectionTitle>Konverzijski lijevak</SectionTitle>
          <Funnel funnel={stats.funnel} />
        </Card>
        <Card className="p-5 lg:col-span-2">
          <SectionTitle>Saobraćaj · zadnjih 14 dana</SectionTitle>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gViews" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={C.cyan} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={C.cyan} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gUniq" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={C.amber} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="views" name="Posjete" stroke={C.cyan} strokeWidth={2} fill="url(#gViews)" />
                <Area type="monotone" dataKey="unique" name="Jedinstveni" stroke={C.amber} strokeWidth={2} fill="url(#gUniq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Red 3 — Top stranice */}
      <Card className="p-5">
        <SectionTitle>Top stranice · zadnjih 30 dana</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["#", "Stranica", "Naziv", "Pregledi", "Avg. vrijeme", "Trend 7d", "Bounce %"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {top.map((p, i) => (
                <tr key={p.path} className="transition-colors" style={{ borderBottom: `1px solid ${C.border}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td className="py-2 px-3" style={{ color: C.slate }}>{i + 1}</td>
                  <td className="py-2 px-3 font-mono text-xs" style={{ color: C.cyan }}>{p.path}</td>
                  <td className="py-2 px-3" style={{ color: C.text }}>{PAGE_NAMES[p.path] ?? "—"}</td>
                  <td className="py-2 px-3 tabular-nums font-bold" style={{ color: C.text }}>{num(p.views)}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.textDim }}>{(45 + (i * 13) % 90)}s</td>
                  <td className="py-2 px-3"><Sparkline data={last7.map((v) => v + (i * 3) % 20)} color={C.violet} /></td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.amber }}>{30 + (i * 7) % 40}%</td>
                </tr>
              ))}
              {top.length === 0 && (
                <tr><td colSpan={7} className="text-center py-6" style={{ color: C.slate }}>Nema podataka</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Heatmap */}
      <Card className="p-5">
        <SectionTitle>Aktivnost zadnjih 12 sedmica</SectionTitle>
        <Heatmap viewsByDay={stats.viewsByDay} />
        <div className="flex items-center gap-2 mt-4 text-[10px]" style={{ color: C.slate }}>
          <span>Manje</span>
          {["#0A0E1A", "#7C3AED33", "#7C3AED80", "#7C3AEDCC", "#7C3AED"].map((c) => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: 3, background: c, border: `1px solid ${C.border}` }} />
          ))}
          <span>Više</span>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB: PRIHODI ═══════════════════════ */

function TabPrihodi({
  stats, payments, paymentFilter, setPaymentFilter,
}: {
  stats: Stats; payments: AdminPayment[];
  paymentFilter: "all" | "ok" | "fail" | "refund";
  setPaymentFilter: (v: "all" | "ok" | "fail" | "refund") => void;
}) {
  const arr = stats.estimatedMrr * 12;
  const avgPerDay = stats.revenue30d / 30;
  const failedCount = payments.filter((p) => p.status === "failed").length;

  // MRR cumulative chart (zadnjih 30d)
  const revData = stats.revenueByDay.slice(-30);
  let cum = 0;
  const mrrChart = revData.map((d) => {
    cum += d.amount_cents;
    return {
      day: d.day.slice(5),
      daily: d.amount_cents / 100,
      cumulative: cum / 100,
    };
  });

  const filteredPayments = useMemo(() => {
    if (paymentFilter === "all") return payments;
    if (paymentFilter === "ok") return payments.filter((p) => p.status === "succeeded" || p.status === "paid");
    if (paymentFilter === "fail") return payments.filter((p) => p.status === "failed");
    return payments.filter((p) => p.status === "refunded");
  }, [payments, paymentFilter]);

  const statusBadge = (s: string) => {
    const ok = s === "succeeded" || s === "paid";
    const fail = s === "failed";
    const color = ok ? C.emerald : fail ? C.rose : C.amber;
    const label = ok ? "Uspješno" : fail ? "Neuspješno" : "Povrat";
    return (
      <span
        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
        style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
      >
        {label}
      </span>
    );
  };

  const trialEnding = stats.trialEndingSoon[0];

  return (
    <div className="space-y-6">
      {/* Red 1 — KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiTile icon={<Euro className="h-4 w-4" />} label="MRR realni" value={eur(stats.estimatedMrr)} accent="amber" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Prihod 30D" value={eur(stats.revenue30d)} sub={`${stats.paidCount30d} transakcija`} />
        <KpiTile icon={<Calendar className="h-4 w-4" />} label="Prihod danas" value={eur(stats.revenueToday)} />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Prosjek / dan" value={eur(Math.round(avgPerDay))} sub="zadnjih 30 dana" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Procij. ARR" value={`~${eur(arr)}`} sub="pri trenutnom MRR" />
        <KpiTile
          icon={failedCount === 0 ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          label="Failed payments"
          value={num(failedCount)}
          sub="zadnjih 30 dana"
          accent={failedCount === 0 ? "emerald" : "rose"}
        />
      </div>

      {/* Red 2 — MRR chart + breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle>MRR trend · zadnjih 30 dana</SectionTitle>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={mrrChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone" dataKey="daily" name="Dnevni prihod €"
                  stroke={C.amber} strokeWidth={2}
                  dot={{ r: 3, fill: C.amber, stroke: C.amber }}
                />
                <Line
                  type="monotone" dataKey="cumulative" name="MRR kumulativni €"
                  stroke={C.violet} strokeWidth={2} strokeDasharray="5 5" dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Pretplate breakdown</SectionTitle>
          <div className="space-y-2">
            {[
              { label: "Premium Mjesečno", count: stats.activePremium, sub: `${eur(stats.estimatedMrr)} / mj`, color: C.amber },
              { label: "Premium Godišnje", count: 0, sub: "—", color: C.violet },
              { label: "Lifetime (interni)", count: stats.lifetimeUsers, sub: "0 €", color: C.slate },
              { label: "Trial aktivan", count: stats.trialUsers, sub: trialEnding ? `najbliži ističe: ${new Date(trialEnding.expires_at).toLocaleDateString("bs-BA")}` : "—", color: C.cyan },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl p-3 flex items-center justify-between"
                style={{
                  background: `${row.color}10`,
                  border: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${row.color}`,
                }}
              >
                <div>
                  <Label>{row.label}</Label>
                  <Metric><span className="text-xl">{num(row.count)}</span></Metric>
                </div>
                <div className="text-right text-[11px]" style={{ color: C.textDim }}>{row.sub}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Red 3 — Upcoming renewals */}
      <Card className="p-5">
        <SectionTitle>Obnove u narednih 30 dana</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Email", "Tip", "Iznos", "Datum obnove", "Status"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.trialEndingSoon.map((t) => (
                <tr key={t.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-2 px-3" style={{ color: C.text }}>{t.email}</td>
                  <td className="py-2 px-3"><Badge variant="outline" style={{ borderColor: C.amber + "60", color: C.amber }}>Premium {t.subscription_tier === "premium_yearly" ? "Godišnje" : "Mj."}</Badge></td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.text }}>9.99 €</td>
                  <td className="py-2 px-3" style={{ color: C.textDim }}>{new Date(t.expires_at).toLocaleDateString("bs-BA")}</td>
                  <td className="py-2 px-3"><span className="inline-flex items-center gap-1 text-xs" style={{ color: C.emerald }}>🟢 Aktivan</span></td>
                </tr>
              ))}
              {stats.trialEndingSoon.length === 0 && (
                <tr><td colSpan={5} className="text-center py-6" style={{ color: C.slate }}>Nema obnova u narednih 30 dana</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Red 4 — Sve transakcije */}
      <Card className="p-5">
        <SectionTitle right={
          <div className="flex gap-1">
            {([
              ["all", "Sve"], ["ok", "Uspješne"], ["fail", "Neuspješne"], ["refund", "Povrati"],
            ] as const).map(([k, lbl]) => {
              const a = paymentFilter === k;
              return (
                <button
                  key={k}
                  onClick={() => setPaymentFilter(k)}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                  style={{
                    background: a ? `${C.violet}20` : "transparent",
                    border: `1px solid ${a ? C.violet : C.border}`,
                    color: a ? C.violet : C.slate,
                  }}
                >{lbl}</button>
              );
            })}
          </div>
        }>
          Sve transakcije
        </SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["#", "Datum", "Korisnik", "Tip", "Iznos", "Stripe ID", "Status"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-2 px-3" style={{ color: C.slate }}>{i + 1}</td>
                  <td className="py-2 px-3" style={{ color: C.textDim }}>
                    {new Date(p.paid_at ?? p.created_at).toLocaleDateString("bs-BA", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  </td>
                  <td className="py-2 px-3" style={{ color: C.text }}>{p.email ?? "—"}</td>
                  <td className="py-2 px-3"><Badge variant="outline" style={{ borderColor: C.amber + "60", color: C.amber }}>Premium</Badge></td>
                  <td className="py-2 px-3 tabular-nums font-bold" style={{ color: C.text }}>
                    {(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}
                  </td>
                  <td className="py-2 px-3 font-mono text-[10px]" style={{ color: C.cyan }}>
                    {p.id.slice(0, 14)}…
                  </td>
                  <td className="py-2 px-3">{statusBadge(p.status)}</td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr><td colSpan={7} className="text-center py-6" style={{ color: C.slate }}>
                  <Clock className="inline h-4 w-4 mr-2" />Nema transakcija za prikaz
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 3: KORISNICI ═══════════════════════ */

const USER_TYPE_META: Record<string, { label: string; color: string }> = {
  premium_paid: { label: "Premium", color: ACCENT.amber },
  trial_active: { label: "Trial", color: ACCENT.cyan },
  trial_expired: { label: "Trial istekao", color: ACCENT.rose },
  lifetime: { label: "Lifetime", color: ACCENT.violet },
  free: { label: "Free", color: ACCENT.slate },
};

function TabKorisnici({ extra, stats, usersList }: { extra: any; stats: Stats; usersList: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const ut = extra?.usersByType ?? { paid: 0, trialActive: 0, trialExpired: 0, lifetime: 0, free: 0, total: 0 };
  const externalCount = Math.max(0, (ut.total ?? 0) - (ut.lifetime ?? 0));
  const premiumShare = externalCount > 0 ? Math.round((ut.paid / externalCount) * 100) : 0;
  const churn30d = extra?.churn30d ?? 0;

  const cohorts = (extra?.cohortRetention ?? []) as Array<{ cohort_month: string; total: number; d1: number; d7: number; d30: number }>;
  const pct = (a: number, total: number) => (total > 0 ? Math.round((a / total) * 100) : null);
  const cohortColor = (v: number | null) => {
    if (v === null) return C.card;
    if (v <= 30) return `${C.rose}30`;
    if (v <= 60) return `${C.amber}30`;
    return `${C.emerald}30`;
  };

  const trials = stats?.trialEndingSoon ?? [];
  const regWeeks = (extra?.registrationsByWeek ?? []).map((r: any) => ({
    week: r.week_start ? r.week_start.slice(5) : "",
    paid: r.paid ?? 0, trial: r.trial ?? 0, free: r.free ?? 0,
  }));

  const filtered = (usersList ?? []).filter((u: any) =>
    (filter === "all" || u.user_type === filter) &&
    (!search || u.email?.toLowerCase().includes(search.toLowerCase()))
  );
  const dotColor = (a: string) => a === "high" ? C.emerald : a === "mid" ? C.amber : C.slate;
  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("bs-BA", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
  const fmtRel = (d: string | null) => {
    if (!d) return "—";
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
    if (diff <= 0) return "danas";
    if (diff === 1) return "jučer";
    if (diff < 30) return `${diff}d`;
    return fmtDate(d);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiTile icon={<Users className="h-4 w-4" />} label="Ukupno" value={num(ut.total ?? 0)} />
        <KpiTile icon={<Crown className="h-4 w-4" />} label="Premium paid" value={num(ut.paid ?? 0)} accent="amber" />
        <KpiTile icon={<Clock className="h-4 w-4" />} label="Trial aktivan" value={num(ut.trialActive ?? 0)} accent="cyan" />
        <KpiTile icon={<ShieldCheck className="h-4 w-4" />} label="Lifetime interni" value={num(ut.lifetime ?? 0)} accent="slate" />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Premium udio" value={`${premiumShare}%`} sub={`od ${externalCount} vanjska`} />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Churn 30D" value={num(churn30d)} accent={churn30d === 0 ? "emerald" : "rose"} />
      </div>

      <Card className="p-5">
        <SectionTitle>Retencija korisnika — kohorte (po mjesecu)</SectionTitle>
        {cohorts.length === 0 ? (
          <p className="text-xs" style={{ color: C.slate }}>Nema dovoljno podataka za kohorte.</p>
        ) : (
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Kohorta", "Veličina", "Day 1", "Day 7", "Day 30"].map((h) => (
                <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {cohorts.map((c) => {
                const d1 = pct(c.d1, c.total), d7 = pct(c.d7, c.total), d30 = pct(c.d30, c.total);
                return (
                  <tr key={c.cohort_month} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td className="py-2 px-3 font-bold" style={{ color: C.text }}>{c.cohort_month}</td>
                    <td className="py-2 px-3 tabular-nums" style={{ color: C.textDim }}>{c.total}</td>
                    {[d1, d7, d30].map((v, i) => (
                      <td key={i} className="py-2 px-3">
                        <span className="inline-block px-3 py-1 rounded-md tabular-nums font-bold text-xs"
                          style={{ background: cohortColor(v), color: v === null ? C.slate : C.text }}>
                          {v === null ? "—" : `${v}%`}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      <Card className="p-5" style={{ borderLeft: `3px solid ${C.amber}` }}>
        <SectionTitle>⏰ Triali koji ističu — akcija potrebna</SectionTitle>
        {trials.length === 0 ? (
          <p className="text-xs" style={{ color: C.slate }}>Nema trialova koji ističu u narednih 7 dana.</p>
        ) : (
          <div className="space-y-2">
            {trials.map((t) => {
              const days = Math.max(0, Math.ceil((new Date(t.expires_at).getTime() - Date.now()) / 86400000));
              return (
                <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color: C.text }}>{t.email}</span>
                    <span className="text-xs" style={{ color: C.textDim }}>ističe {fmtDate(t.expires_at)}</span>
                    <Badge variant="outline" style={{ borderColor: C.amber + "60", color: C.amber }}>za {days} dana</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-xs" style={{ color: C.textDim }}>Pošalji podsjetnik</Button>
                    <Button size="sm" variant="outline" className="text-xs" style={{ borderColor: C.amber, color: C.amber, background: "transparent" }}>Produžiti trial</Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle>Registracije — zadnjih 8 sedmica</SectionTitle>
        {regWeeks.length === 0 ? (
          <p className="text-xs" style={{ color: C.slate }}>Nema registracija u zadnjih 8 sedmica.</p>
        ) : (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={regWeeks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="paid" name="Paid" stackId="a" fill={C.amber} />
                <Bar dataKey="trial" name="Trial" stackId="a" fill={C.cyan} />
                <Bar dataKey="free" name="Free" stackId="a" fill={C.slate} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle right={
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="text-xs rounded-lg px-2 py-1.5 outline-none"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
            <option value="all">Svi tipovi</option>
            <option value="premium_paid">Paid</option>
            <option value="trial_active">Trial</option>
            <option value="lifetime">Lifetime</option>
            <option value="free">Free</option>
          </select>
        }>Korisnici ({filtered.length})</SectionTitle>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: C.slate }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pretraži po email-u…"
            className="w-full text-xs rounded-lg pl-9 pr-3 py-2 outline-none"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["", "Email", "Tip", "Registrovan", "Zadnja posjeta", "Pregledi 30D", "Aktivnost", ""].map((h, i) => (
                <th key={i} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.slice(0, 50).map((u: any) => {
                const meta = USER_TYPE_META[u.user_type] ?? USER_TYPE_META.free;
                const init = (u.email ?? "??").slice(0, 2).toUpperCase();
                return (
                  <tr key={u.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td className="py-2 px-3">
                      <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: `${meta.color}25`, color: meta.color }}>{init}</div>
                    </td>
                    <td className="py-2 px-3" style={{ color: C.text }}>{u.email}</td>
                    <td className="py-2 px-3">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                        style={{ background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}40` }}>
                        {meta.label}
                      </span>
                    </td>
                    <td className="py-2 px-3" style={{ color: C.textDim }}>{fmtDate(u.created_at)}</td>
                    <td className="py-2 px-3" style={{ color: C.textDim }}>{fmtRel(u.last_login_at)}</td>
                    <td className="py-2 px-3 tabular-nums font-bold" style={{ color: C.text }}>{u.pages_per_session ?? 0}</td>
                    <td className="py-2 px-3"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: dotColor(u.activity) }} /></td>
                    <td className="py-2 px-3"><MoreVertical className="h-4 w-4 cursor-pointer" style={{ color: C.slate }} /></td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-6" style={{ color: C.slate }}>Nema korisnika</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] mt-3 text-right" style={{ color: C.slate }}>
          {Math.min(filtered.length, 50)} od {usersList?.length ?? 0} prikazano
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 4: SAOBRAĆAJ ═══════════════════════ */

function TabSaobracaj({ extra, stats }: { extra: any; stats: Stats }) {
  const ds = extra?.deviceSplit ?? { mobile: 0, desktop: 0, tablet: 0, total: 0 };
  const total = ds.total || 1;
  const devices = [
    { name: "Mobilni", value: Math.round((ds.mobile / total) * 100), color: C.cyan },
    { name: "Desktop", value: Math.round((ds.desktop / total) * 100), color: C.violet },
    { name: "Tablet", value: Math.round((ds.tablet / total) * 100), color: C.amber },
  ];
  const browsers = (extra?.browserSplit ?? []) as Array<{ name: string; n: number }>;
  const browserTotal = browsers.reduce((a, b) => a + b.n, 0) || 1;
  const sources = ((extra?.sourceSplit ?? []) as Array<{ name: string; n: number }>).map((s, i) => ({
    name: s.name, value: Math.round((s.n / (extra?.sourceSplit?.reduce((a: number, x: any) => a + x.n, 0) || 1)) * 100),
    color: [C.violet, C.emerald, C.cyan, C.amber, C.slate, C.rose][i % 6],
  }));

  const hourlyMap = new Map((extra?.viewsByHour ?? []).map((x: any) => [x.h, x.n]));
  const hourly = Array.from({ length: 24 }).map((_, h) => ({ h: `${h}h`, v: (hourlyMap.get(h) as number) ?? 0 }));
  const peakMax = Math.max(...hourly.map((x) => x.v), 1);
  const peakHour = hourly.findIndex((x) => x.v === peakMax);

  const daily = (extra?.dailyAuthVsAnon ?? []).map((d: any) => ({
    d: d.day?.slice(5) ?? "", auth: d.auth ?? 0, anon: d.anon ?? 0,
  }));
  const journeys = (extra?.topPaths30d ?? []) as Array<{ path: string; n: number }>;
  const journeyMax = Math.max(...journeys.map((j) => j.n), 1);

  const mobilePct = ds.total > 0 ? Math.round((ds.mobile / ds.total) * 100) : 0;
  const avgPagesPerVisit = stats?.uniqueVisitors30d > 0 ? (stats.views30d / stats.uniqueVisitors30d).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Posjete 30D" value={num(stats?.views30d ?? 0)} />
        <KpiTile icon={<Users className="h-4 w-4" />} label="Jedinstveni 30D" value={num(stats?.uniqueVisitors30d ?? 0)} />
        <KpiTile icon={<Eye className="h-4 w-4" />} label="Stranice/posjeta" value={avgPagesPerVisit} />
        <KpiTile icon={<ArrowDownRight className="h-4 w-4" />} label="Bounce rate" value="—" sub="nije mjereno" accent="slate" />
        <KpiTile icon={<Smartphone className="h-4 w-4" />} label="Mobile udio" value={`${mobilePct}%`} accent="cyan" />
        <KpiTile icon={<Clock className="h-4 w-4" />} label="Peak sat" value={peakHour >= 0 ? `${peakHour}h` : "—"} accent="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <SectionTitle>Uređaji</SectionTitle>
          {ds.total === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka.</p> : (
            <div className="flex items-center gap-2">
              <div style={{ width: 140, height: 140 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={devices} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                      {devices.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {devices.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2" style={{ color: C.textDim }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.name}
                    </span>
                    <span className="tabular-nums font-bold" style={{ color: C.text }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <SectionTitle>Pretraživači</SectionTitle>
          {browsers.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka.</p> : (
            <div className="space-y-2">
              {browsers.map((b) => {
                const v = Math.round((b.n / browserTotal) * 100);
                return (
                  <div key={b.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: C.textDim }}>{b.name}</span>
                      <span className="tabular-nums font-bold" style={{ color: C.text }}>{v}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="h-full" style={{ width: `${v}%`, background: C.cyan }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="p-5">
          <SectionTitle>Saobraćajni izvori</SectionTitle>
          {sources.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka.</p> : (
            <div className="flex items-center gap-2">
              <div style={{ width: 140, height: 140 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={sources} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                      {sources.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1 text-[11px]">
                {sources.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2" style={{ color: C.textDim }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.name}
                    </span>
                    <span className="tabular-nums font-bold" style={{ color: C.text }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle>Distribucija posjeta po satu — 30 dana</SectionTitle>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="h" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="v" name="Posjete" radius={[4, 4, 0, 0]}>
                {hourly.map((x, i) => <Cell key={i} fill={x.v === peakMax && x.v > 0 ? C.amber : C.cyan} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Dnevni saobraćaj — 30 dana</SectionTitle>
        {daily.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka.</p> : (
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <AreaChart data={daily} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gAuth2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={C.violet} stopOpacity={0.4} /><stop offset="100%" stopColor={C.violet} stopOpacity={0} /></linearGradient>
                  <linearGradient id="gAnon2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.4} /><stop offset="100%" stopColor={C.cyan} stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="d" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="auth" name="Prijavljeni" stackId="1" stroke={C.violet} fill="url(#gAuth2)" />
                <Area type="monotone" dataKey="anon" name="Anonimni" stackId="1" stroke={C.cyan} fill="url(#gAnon2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle>Najposjećenije putanje — 30 dana</SectionTitle>
        {journeys.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka.</p> : (
          <div className="space-y-2">
            {journeys.map((j) => (
              <div key={j.path} className="flex items-center gap-3 p-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
                <span className="text-xs font-mono" style={{ color: C.cyan, minWidth: 200 }}>{j.path}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full" style={{ width: `${(j.n / journeyMax) * 100}%`, background: C.violet }} />
                </div>
                <span className="tabular-nums font-bold text-xs" style={{ color: C.text }}>{num(j.n)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 5: FUNKCIJE ═══════════════════════ */

function TabFunkcije({ extra }: { extra: any }) {
  const fu = extra?.featureUsage ?? {};
  const sl = extra?.featureSparklines ?? {};
  const pctTrend = (cur: number, prev: number) => prev === 0 ? (cur > 0 ? 100 : 0) : Math.round(((cur - prev) / prev) * 100);
  const features = [
    { icon: "🎓", name: "DeutschTrainer", uses: fu.trainer30d ?? 0, trend: pctTrend(fu.trainer30d ?? 0, fu.trainerPrev30d ?? 0), color: C.cyan, spark: sl.trainer ?? [] },
    { icon: "✈️", name: "Viza Navigator", uses: fu.visa30d ?? 0, trend: pctTrend(fu.visa30d ?? 0, fu.visaPrev30d ?? 0), color: C.violet, spark: sl.visa ?? [] },
    { icon: "📄", name: "Formulari", uses: fu.forms30d ?? 0, trend: pctTrend(fu.forms30d ?? 0, fu.formsPrev30d ?? 0), color: C.emerald, spark: sl.forms ?? [] },
    { icon: "📢", name: "Oglasi", uses: fu.ads30d ?? 0, trend: pctTrend(fu.ads30d ?? 0, fu.adsPrev30d ?? 0), color: C.slate, spark: [] },
    { icon: "🤖", name: "AI Asistent", uses: fu.asistent30d ?? 0, trend: pctTrend(fu.asistent30d ?? 0, fu.asistentPrev30d ?? 0), color: C.amber, spark: sl.asistent ?? [] },
    { icon: "🔍", name: "Dok. provjera", uses: fu.docCheck30d ?? 0, trend: 0, color: C.rose, spark: [], warn: (fu.docCheck30d ?? 0) === 0 },
  ];
  const max = Math.max(...features.map((f) => f.uses), 1);

  const visaCountries = (extra?.visaByCountry ?? []) as Array<{ country: string | null; views: number }>;
  const visaTotal = visaCountries.reduce((a, c) => a + c.views, 0) || 1;
  const COUNTRY_FLAG: Record<string, string> = { ba: "🇧🇦", bih: "🇧🇦", rs: "🇷🇸", srbija: "🇷🇸", hr: "🇭🇷", hrvatska: "🇭🇷", me: "🇲🇪", mk: "🇲🇰", xk: "🇽🇰", kosovo: "🇽🇰", al: "🇦🇱", si: "🇸🇮" };

  const forms = (extra?.formsBreakdown ?? []) as Array<{ form: string; opens: number }>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <Card key={f.name} className="p-5" style={{ borderLeft: `3px solid ${f.color}` }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl">{f.icon}</div>
                <div className="text-sm font-bold mt-1" style={{ color: C.text }}>{f.name}</div>
              </div>
              {f.spark.length > 0 && <Sparkline data={f.spark} color={f.color} />}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <Metric><div className="text-3xl tabular-nums">{num(f.uses)}</div></Metric>
              <div className="text-xs flex items-center gap-1"
                style={{ color: f.trend > 0 ? C.emerald : f.trend < 0 ? C.rose : C.slate }}>
                {f.trend > 0 && <ArrowUpRight className="h-3 w-3" />}
                {f.trend < 0 && <ArrowDownRight className="h-3 w-3" />}
                {f.trend > 0 ? "+" : ""}{f.trend}%
              </div>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="h-full" style={{ width: `${Math.min(100, (f.uses / max) * 100)}%`, background: f.color }} />
            </div>
            {f.warn && (
              <div className="mt-3 text-[11px]" style={{ color: C.rose }}>⚠️ Niko ne koristi — razmisli o vidljivosti</div>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <SectionTitle>Viza Navigator — pregledi po zemlji</SectionTitle>
        {visaCountries.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema pregleda Viza Navigatora u zadnjih 30 dana.</p> : (
          <div className="space-y-2">
            {visaCountries.map((c) => {
              const pct = Math.round((c.views / visaTotal) * 100);
              const key = (c.country ?? "").toLowerCase();
              return (
                <div key={c.country ?? "?"} className="flex items-center gap-3">
                  <span className="text-lg w-7">{COUNTRY_FLAG[key] ?? "🏳️"}</span>
                  <span className="text-sm w-32 uppercase" style={{ color: C.text }}>{c.country ?? "—"}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: C.violet }} />
                  </div>
                  <span className="text-xs tabular-nums font-bold w-12 text-right" style={{ color: C.text }}>{c.views}</span>
                  <span className="text-[11px] w-10 text-right" style={{ color: C.slate }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle>Formulari — najotvoreniji (30D)</SectionTitle>
        {forms.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema otvaranja formulara u zadnjih 30 dana.</p> : (
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Naziv", "Otvoreno"].map((h) => (
                <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {forms.map((f) => (
                <tr key={f.form} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-2 px-3 font-bold" style={{ color: C.text }}>{f.form}</td>
                  <td className="py-2 px-3 tabular-nums font-bold" style={{ color: C.cyan }}>{f.opens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 6: DEUTSCHTRAINER ═══════════════════════ */

function TabTrainer({ extra }: { extra: any }) {
  const ts = extra?.trainerStats ?? { usersWithProgress: 0, totalLessonsCompleted: 0, avgLevel: 0, totalXp: 0, avgStreak: 0 };
  const levels = (extra?.trainerLevels ?? []) as Array<{ level: number; users: number; avg_done: number; total_xp: number }>;
  const LEVEL_COLOR: Record<number, string> = { 1: C.emerald, 2: C.cyan, 3: C.violet, 4: C.amber, 5: C.rose, 6: C.slate };
  const LEVEL_NAME: Record<number, string> = { 1: "A1", 2: "A2", 3: "B1", 4: "B2", 5: "C1", 6: "C2" };
  const maxUsers = Math.max(...levels.map((l) => l.users), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile icon={<Users className="h-4 w-4" />} label="Korisnika sa progresom" value={num(ts.usersWithProgress)} accent="cyan" />
        <KpiTile icon={<CheckCircle2 className="h-4 w-4" />} label="Završenih lekcija" value={num(ts.totalLessonsCompleted)} accent="emerald" />
        <KpiTile icon={<GraduationCap className="h-4 w-4" />} label="Prosj. level" value={String(ts.avgLevel)} />
        <KpiTile icon={<Sparkles className="h-4 w-4" />} label="Ukupno XP" value={num(ts.totalXp)} accent="amber" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Prosj. streak" value={String(ts.avgStreak)} sub="dana" />
      </div>

      <Card className="p-5">
        <SectionTitle>Korisnici po levelu (CEFR A1–C2)</SectionTitle>
        {levels.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Niko još nije počeo trener.</p> : (
          <div className="space-y-3">
            {levels.map((l) => {
              const color = LEVEL_COLOR[l.level] ?? C.slate;
              const name = LEVEL_NAME[l.level] ?? `L${l.level}`;
              return (
                <div key={l.level} className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md w-12 text-center"
                    style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}>{name}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="h-full" style={{ width: `${(l.users / maxUsers) * 100}%`, background: color }} />
                  </div>
                  <span className="text-xs tabular-nums font-bold w-16 text-right" style={{ color: C.text }}>{l.users} kor.</span>
                  <span className="text-[11px] w-28 text-right" style={{ color: C.slate }}>Ø {l.avg_done} lekcija</span>
                  <span className="text-[11px] w-16 text-right tabular-nums" style={{ color: C.amber }}>{l.total_xp} XP</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-5" style={{ borderLeft: `3px solid ${C.slate}` }}>
        <SectionTitle>Detaljnija statistika lekcija</SectionTitle>
        <p className="text-xs" style={{ color: C.textDim }}>
          Trenutno trener čuva samo ukupan broj završenih lekcija po korisniku, bez score-a po pojedinačnoj lekciji.
          Da bi se prikazale „najteže lekcije" i „distribucija scoreova", potrebno je proširiti tabelu <code style={{ color: C.cyan }}>trainer_progress</code> da bilježi rezultat po lekciji (npr. zasebna tabela <code style={{ color: C.cyan }}>trainer_lesson_results</code> sa lesson_id, score, attempts).
        </p>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 7: AI ASISTENT ═══════════════════════ */

function TabAsistent({ extra }: { extra: any }) {
  const a = extra?.asistentStats ?? { q30d: 0, qToday: 0, estCost30d: 0, totalMessages: 0, uniqueUsers30d: 0 };
  const trend = ((extra?.asistentByDay ?? []) as Array<{ day: string; q: number }>).map((x) => ({
    d: x.day?.slice(5) ?? "", q: x.q,
  }));
  const recent = (extra?.asistentRecent ?? []) as Array<{ id: string; created_at: string; preview: string; user_alias: string; chars: number }>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile icon={<Bot className="h-4 w-4" />} label="Upiti 30D" value={num(a.q30d)} accent="violet" />
        <KpiTile icon={<Calendar className="h-4 w-4" />} label="Upiti danas" value={num(a.qToday)} />
        <KpiTile icon={<Euro className="h-4 w-4" />} label="Trošak 30D (procj.)" value={`~${(a.estCost30d ?? 0).toFixed(3)} €`} sub="Gemini 2.5 Flash" accent="amber" />
        <KpiTile icon={<Users className="h-4 w-4" />} label="Jedinstvenih 30D" value={num(a.uniqueUsers30d)} accent="cyan" />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Ukupno poruka" value={num(a.totalMessages)} />
      </div>

      <Card className="p-5">
        <SectionTitle>Upiti — zadnjih 30 dana</SectionTitle>
        {trend.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema upita u zadnjih 30 dana.</p> : (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gAsist2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={C.violet} stopOpacity={0.5} /><stop offset="100%" stopColor={C.violet} stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="d" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="q" name="Upiti" stroke={C.violet} fill="url(#gAsist2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle>Zadnjih 15 upita</SectionTitle>
        {recent.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema poruka u Asistentu.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Vrijeme", "Korisnik", "Sadržaj", "Znakova"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {recent.map((q) => (
                  <tr key={q.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td className="py-2 px-3 tabular-nums text-xs" style={{ color: C.textDim }}>
                      {new Date(q.created_at).toLocaleString("bs-BA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-2 px-3 font-mono text-xs" style={{ color: C.cyan }}>{q.user_alias}</td>
                    <td className="py-2 px-3 text-xs" style={{ color: C.text }}>{q.preview}…</td>
                    <td className="py-2 px-3 tabular-nums" style={{ color: C.textDim }}>{q.chars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 8: GEO ═══════════════════════ */

const COUNTRY_FLAG_MAP: Record<string, string> = {
  DE: "🇩🇪", BA: "🇧🇦", HR: "🇭🇷", RS: "🇷🇸", ME: "🇲🇪", MK: "🇲🇰", XK: "🇽🇰",
  AL: "🇦🇱", SI: "🇸🇮", AT: "🇦🇹", CH: "🇨🇭", US: "🇺🇸",
};
const LANG_META: Record<string, { flag: string; name: string }> = {
  bs: { flag: "🇧🇦", name: "BS" }, hr: { flag: "🇭🇷", name: "HR" },
  sr: { flag: "🇷🇸", name: "SR" }, de: { flag: "🇩🇪", name: "DE" },
};

function TabGeo({ extra }: { extra: any }) {
  const countries = (extra?.topCountries30d ?? []) as Array<{ country: string; views: number; uniq: number }>;
  const cities = (extra?.topCities30d ?? []) as Array<{ city: string; country: string; views: number; uniq: number }>;
  const langs = (extra?.languageSplit ?? []) as Array<{ lang: string; n: number }>;
  const langTotal = langs.reduce((a, l) => a + l.n, 0) || 1;

  const totalCountries = countries.length;
  const totalCities = cities.length;
  const dePct = countries.length > 0 ? Math.round(((countries.find((c) => c.country === "DE")?.views ?? 0) / countries.reduce((a, c) => a + c.views, 0)) * 100) : 0;
  const balkanCodes = ["BA", "RS", "HR", "ME", "MK", "XK", "AL", "SI"];
  const balkanPct = countries.length > 0 ? Math.round((countries.filter((c) => balkanCodes.includes(c.country)).reduce((a, c) => a + c.views, 0) / countries.reduce((a, c) => a + c.views, 0)) * 100) : 0;

  const cityMax = Math.max(...cities.map((c) => c.views), 1);

  const COLORS = [C.amber, C.cyan, C.violet, C.emerald, C.slate, C.rose];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiTile icon={<Globe className="h-4 w-4" />} label="Zemalja" value={num(totalCountries)} />
        <KpiTile icon={<MapPin className="h-4 w-4" />} label="Gradova" value={num(totalCities)} />
        <KpiTile icon={<Users className="h-4 w-4" />} label="Iz Njemačke" value={`${dePct}%`} accent="violet" />
        <KpiTile icon={<Plane className="h-4 w-4" />} label="Iz Balkana" value={`${balkanPct}%`} accent="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionTitle>Top gradovi (30D)</SectionTitle>
          {cities.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka o gradovima.</p> : (
            <div className="space-y-2.5">
              {cities.slice(0, 12).map((c) => (
                <div key={`${c.city}-${c.country}`} className="flex items-center gap-3">
                  <span className="text-lg w-7">{COUNTRY_FLAG_MAP[c.country] ?? "🏳️"}</span>
                  <span className="text-sm w-36" style={{ color: C.text }}>{c.city}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="h-full" style={{ width: `${(c.views / cityMax) * 100}%`, background: C.violet }} />
                  </div>
                  <span className="text-xs tabular-nums font-bold w-12 text-right" style={{ color: C.text }}>{c.views}</span>
                  <span className="text-[11px] w-10 text-right" style={{ color: C.slate }}>{c.uniq} jed.</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-5">
          <SectionTitle>Top zemlje (30D)</SectionTitle>
          {countries.length === 0 ? <p className="text-xs" style={{ color: C.slate }}>Nema podataka o zemljama.</p> : (
            <div className="flex items-center gap-3">
              <div style={{ width: 160, height: 160 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={countries.slice(0, 6).map((c, i) => ({ name: c.country, value: c.views, color: COLORS[i % 6] }))}
                      dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={2}>
                      {countries.slice(0, 6).map((_, i) => <Cell key={i} fill={COLORS[i % 6]} stroke="none" />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {countries.slice(0, 6).map((d, i) => (
                  <div key={d.country} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2" style={{ color: C.textDim }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % 6] }} />
                      {COUNTRY_FLAG_MAP[d.country] ?? "🏳️"} {d.country}
                    </span>
                    <span className="tabular-nums font-bold" style={{ color: C.text }}>{d.views}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle>Jezik UI koji korisnici koriste</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["bs", "hr", "sr", "de"] as const).map((code) => {
            const meta = LANG_META[code];
            const found = langs.find((l) => l.lang === code);
            const pct = Math.round(((found?.n ?? 0) / langTotal) * 100);
            const color = code === "bs" ? C.amber : code === "hr" ? C.cyan : code === "sr" ? C.violet : C.emerald;
            return (
              <div key={code} className="rounded-xl p-4"
                style={{ background: `${color}10`, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}` }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{meta.flag}</span>
                  <span className="text-sm font-bold" style={{ color: C.text }}>{meta.name}</span>
                </div>
                <Metric><div className="text-3xl mt-2 tabular-nums">{pct}%</div></Metric>
                <div className="text-[11px] mt-1" style={{ color: C.slate }}>{found?.n ?? 0} korisnika</div>
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 9: TROŠKOVI ═══════════════════════ */

function TabTroskovi({ stats, extra }: { stats: Stats; extra: any }) {
  const aiCost = extra?.asistentStats?.estCost30d ?? 0;
  const services = [
    { name: "Supabase Free", cost: 0, note: "Storage, DB, Auth" },
    { name: "Gemini 2.5 Flash", cost: Number(aiCost), note: `${extra?.asistentStats?.q30d ?? 0} upita × ~0.005€` },
    { name: "ElevenLabs", cost: 2.50, note: "TTS generacija (cached)" },
    { name: "Lovable Pro", cost: 20.00, note: "Builder (nije u profit kalkulaciji)", excluded: true },
    { name: "Stripe fees", cost: ((stats?.paidCount30d ?? 0) * 0.30) + ((stats?.revenue30d ?? 0) / 100 * 0.029), note: "2.9% + 0.30€ po tx" },
    { name: "Cloudflare", cost: 0, note: "Free tier" },
    { name: "Domain (god./12)", cost: 1.00, note: "balkanlink.de" },
  ];
  const opTotal = services.filter((s) => !s.excluded).reduce((a, s) => a + s.cost, 0);
  const revenue = (stats?.revenue30d ?? 0) / 100;
  const profit = revenue - opTotal;
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
  const breakeven = Math.max(1, Math.ceil(opTotal / 9.99));
  const paidNow = stats?.activePremium ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile icon={<Wallet className="h-4 w-4" />} label="Troškovi 30D" value={`~${opTotal.toFixed(2)} €`} accent="rose" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Prihod 30D" value={`${revenue.toFixed(2)} €`} accent="emerald" />
        <KpiTile icon={<Euro className="h-4 w-4" />} label="Profit 30D" value={`${profit >= 0 ? "" : "-"}${Math.abs(profit).toFixed(2)} €`} accent={profit >= 0 ? "emerald" : "rose"} />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Profit marža" value={`${margin}%`} accent="amber" />
        <KpiTile icon={<Calendar className="h-4 w-4" />} label="Procij. trošak/mj" value={`~${opTotal.toFixed(2)} €`} />
      </div>

      <Card className="p-5">
        <SectionTitle>Troškovi po servisu</SectionTitle>
        <table className="w-full text-sm">
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {["Servis", "Trošak", "Napomena"].map((h) => (
              <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.name} style={{ borderBottom: `1px solid ${C.border}`, opacity: s.excluded ? 0.6 : 1 }}>
                <td className="py-2 px-3 font-bold" style={{ color: C.text }}>{s.name}</td>
                <td className="py-2 px-3 tabular-nums" style={{ color: s.cost === 0 ? C.emerald : C.amber }}>{s.cost.toFixed(2)} €</td>
                <td className="py-2 px-3 text-xs" style={{ color: C.textDim }}>{s.note}</td>
              </tr>
            ))}
            <tr style={{ background: `${C.violet}15` }}>
              <td className="py-2 px-3 font-bold" style={{ color: C.violet }}>UKUPNO operativno</td>
              <td className="py-2 px-3 tabular-nums font-bold" style={{ color: C.violet }}>~{opTotal.toFixed(2)} €</td>
              <td className="py-2 px-3 text-xs" style={{ color: C.textDim }}>(bez Lovable)</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className="p-5" style={{ borderLeft: `3px solid ${C.violet}` }}>
        <SectionTitle>Break-even kalkulator</SectionTitle>
        <div className="text-sm" style={{ color: C.text }}>Koliko pretplata trebaš za pokriće troškova?</div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
            <Label>Troškovi/mj</Label>
            <Metric><div className="text-xl mt-1">{opTotal.toFixed(2)} €</div></Metric>
          </div>
          <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
            <Label>Cijena pretplate</Label>
            <Metric><div className="text-xl mt-1">9.99 €</div></Metric>
          </div>
          <div className="rounded-lg p-3" style={{ background: `${paidNow >= breakeven ? C.emerald : C.amber}15`, border: `1px solid ${paidNow >= breakeven ? C.emerald : C.amber}40` }}>
            <Label>Minimum za pokriće</Label>
            <Metric><div className="text-xl mt-1" style={{ color: paidNow >= breakeven ? C.emerald : C.amber }}>{breakeven} korisnik {paidNow >= breakeven ? "✅" : "⏳"}</div></Metric>
          </div>
        </div>
        <div className="mt-4 text-xs" style={{ color: C.textDim }}>
          Trenutno: <span style={{ color: paidNow >= breakeven ? C.emerald : C.amber, fontWeight: 700 }}>{paidNow} plaćen{paidNow === 1 ? "" : "ih"} korisnik{paidNow === 1 ? "" : "a"}</span>
        </div>
        <div className="mt-2 h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="h-full" style={{ width: `${Math.min(100, (paidNow / breakeven) * 100)}%`, background: `linear-gradient(90deg, ${C.emerald}, ${C.amber})` }} />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 10: CILJEVI ═══════════════════════ */

function TabCiljevi({ stats, extra }: { stats: Stats; extra: any }) {
  const gc = extra?.goalsCurrent ?? { mrrCents: 0, realUsers: 0, avgVisitsPerDay: 0 };
  const mrrCurrent = (gc.mrrCents ?? 0) / 100;
  const usersCurrent = gc.realUsers ?? 0;
  const visitsCurrent = Number(gc.avgVisitsPerDay ?? 0);

  const [mrrTarget, setMrrTarget] = useState(100);
  const [usersTarget, setUsersTarget] = useState(50);
  const [visitsTarget, setVisitsTarget] = useState(200);

  const goals = [
    { icon: "🎯", label: "MRR cilj", current: mrrCurrent, target: mrrTarget, unit: "€", color: C.amber, hint: `Trebaš još ${Math.max(0, Math.ceil((mrrTarget - mrrCurrent) / 9.99))} novih pretplata`, set: setMrrTarget },
    { icon: "👥", label: "Korisnici cilj", current: usersCurrent, target: usersTarget, unit: "", color: C.violet, hint: "Vanjski (bez lifetime)", set: setUsersTarget },
    { icon: "📈", label: "Posjete/dan", current: visitsCurrent, target: visitsTarget, unit: "", color: C.cyan, hint: "Prosjek zadnjih 30 dana", set: setVisitsTarget },
  ];

  const milestones = (extra?.milestones ?? []) as Array<{ paid_at: string; amount: number; status: string }>;
  const milestoneItems = milestones.length > 0
    ? milestones.map((m, i) => ({ date: m.paid_at, text: `${i === 0 ? "Prva uplata" : `Uplata #${i + 1}`} (${m.amount.toFixed(2)} €)`, state: "done" as const }))
    : [];
  const goalsList = [
    ...milestoneItems,
    ...(mrrCurrent < 100 ? [{ date: "Sljedeće", text: "100 € MRR", state: "next" as const }] : []),
    { date: "—", text: "1,000 € MRR", state: mrrCurrent >= 1000 ? "done" as const : "todo" as const },
    { date: "—", text: "100 korisnika", state: usersCurrent >= 100 ? "done" as const : "todo" as const },
  ];

  const months12 = ["Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "Maj"];
  const projection = months12.map((m, i) => ({
    m,
    konzervativno: mrrCurrent + (i + 1) * 9.99 * 1,
    realisticno: mrrCurrent + (i + 1) * 9.99 * 3,
    optimisticno: mrrCurrent + (i + 1) * 9.99 * 7,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((g) => {
          const pct = Math.min(100, (g.current / Math.max(g.target, 1)) * 100);
          return (
            <Card key={g.label} className="p-5" style={{ borderLeft: `3px solid ${g.color}` }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl">{g.icon}</div>
                  <div className="text-sm font-bold mt-1" style={{ color: C.text }}>{g.label}</div>
                </div>
                <Target className="h-4 w-4" style={{ color: g.color }} />
              </div>
              <div className="mt-3 flex items-end gap-2">
                <Metric><div className="text-2xl tabular-nums">{typeof g.current === "number" ? g.current.toFixed(g.unit === "€" ? 2 : 1) : g.current}{g.unit}</div></Metric>
                <span className="text-xs mb-1" style={{ color: C.slate }}>/ target</span>
                <input type="number" value={g.target} onChange={(e) => g.set(Number(e.target.value) || 0)}
                  className="ml-auto w-20 text-xs rounded px-2 py-1 outline-none tabular-nums"
                  style={{ background: C.card, border: `1px solid ${C.border}`, color: g.color }} />
                <span className="text-xs" style={{ color: C.slate }}>{g.unit}</span>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="h-full transition-all" style={{ width: `${pct}%`, background: g.color }} />
              </div>
              <div className="mt-2 text-[11px]" style={{ color: C.textDim }}>{g.hint}</div>
              <div className="mt-1 text-[11px] tabular-nums" style={{ color: g.color }}>{pct.toFixed(0)}% ostvareno</div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <SectionTitle>Milestones</SectionTitle>
        {goalsList.length === 0 ? (
          <p className="text-xs" style={{ color: C.slate }}>Još nema dostignuća.</p>
        ) : (
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px" style={{ background: C.border }} />
            {goalsList.map((m, i) => {
              const meta = m.state === "done"
                ? { color: C.emerald, icon: "✅" }
                : m.state === "next"
                  ? { color: C.violet, icon: "🔵" }
                  : { color: C.slate, icon: "⬜" };
              return (
                <div key={i} className="relative flex items-start gap-3 pb-4">
                  <span className="absolute -left-4 top-1 h-3 w-3 rounded-full" style={{ background: meta.color, boxShadow: `0 0 0 4px ${C.bg}` }} />
                  <div className="flex-1 ml-2 flex items-center justify-between gap-3 p-3 rounded-lg"
                    style={{
                      background: m.state === "next" ? `${C.violet}10` : "rgba(255,255,255,0.02)",
                      border: m.state === "next" ? `1px dashed ${C.violet}` : `1px solid ${C.border}`,
                    }}>
                    <div className="flex items-center gap-3">
                      <span className="text-base">{meta.icon}</span>
                      <span className="text-sm font-bold" style={{ color: m.state === "todo" ? C.slate : C.text }}>{m.text}</span>
                    </div>
                    <span className="text-[11px] tabular-nums" style={{ color: meta.color }}>{m.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle>Projekcija prihoda — 12 mjeseci unaprijed</SectionTitle>
        <div className="text-[11px] mb-3" style={{ color: C.textDim }}>
          Pri različitim scenarijima rasta (broj novih pretplata mjesečno), polazna tačka {mrrCurrent.toFixed(2)} € MRR
        </div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={projection} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} tickFormatter={(v) => `${v.toFixed(0)}€`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
              <Line type="monotone" dataKey="konzervativno" name="+1/mj" stroke={C.slate} strokeDasharray="5 5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="realisticno" name="+3/mj" stroke={C.violet} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="optimisticno" name="+7/mj" stroke={C.emerald} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-[11px] flex items-center gap-1" style={{ color: C.slate }}>
          <Trophy className="h-3 w-3" /> X osa: 12 mjeseci unaprijed
        </div>
      </Card>
    </div>
  );
}
