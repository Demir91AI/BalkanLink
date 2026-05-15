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

interface Stats {
  totalUsers: number;
  newToday: number; new7d: number; new30d: number;
  activePremium: number; trialUsers: number;
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
      const [statsRes, paymentsRes] = await Promise.all([
        supabase.rpc("get_admin_stats" as any),
        supabase.rpc("get_admin_payments" as any, { _limit: 50 }),
      ]);
      if (statsRes.data) setStats(statsRes.data as any);
      if (paymentsRes.data) setPayments(paymentsRes.data as any);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAll();
    const id = setInterval(() => loadAll(true), 30000);
    return () => clearInterval(id);
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
          {tab === "Korisnici" && <TabKorisnici />}
          {tab === "Saobraćaj" && <TabSaobracaj />}
          {tab === "Funkcije" && <TabFunkcije />}
          {tab === "DeutschTrainer" && <TabTrainer />}
          {tab === "AI Asistent" && <TabAsistent />}
          {tab === "Geo" && <TabGeo />}
          {tab === "Troškovi" && <TabTroskovi />}
          {tab === "Ciljevi" && <TabCiljevi />}
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

interface MockUser {
  id: string; email: string; type: "premium_paid" | "trial_active" | "trial_expired" | "lifetime" | "free";
  registered: string; lastSeen: string; pagesPerSession: number; activity: "high" | "mid" | "low";
}

const TYPE_META: Record<MockUser["type"], { label: string; color: string }> = {
  premium_paid: { label: "Premium", color: ACCENT.amber },
  trial_active: { label: "Trial", color: ACCENT.cyan },
  trial_expired: { label: "Trial istekao", color: ACCENT.rose },
  lifetime: { label: "Lifetime", color: ACCENT.violet },
  free: { label: "Free", color: ACCENT.slate },
};

function TabKorisnici() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | MockUser["type"]>("all");

  const cohorts = [
    { name: "Mart 2025", d1: 100, d7: 67, d30: 50 },
    { name: "April 2025", d1: 100, d7: 60, d30: null as number | null },
    { name: "Maj 2025", d1: 100, d7: null as number | null, d30: null as number | null },
  ];
  const cohortColor = (v: number | null) => {
    if (v === null) return C.card;
    if (v <= 30) return `${C.rose}30`;
    if (v <= 60) return `${C.amber}30`;
    return `${C.emerald}30`;
  };

  const trials = [
    { email: "korisnik@gmail.com", expires: "20.05.2025", days: 5 },
    { email: "marko.k@hotmail.com", expires: "22.05.2025", days: 7 },
  ];

  const regWeeks = Array.from({ length: 8 }).map((_, i) => ({
    week: `S${i + 1}`,
    paid: i === 6 ? 1 : 0,
    trial: [0, 0, 1, 0, 0, 1, 0, 1][i],
    free: [1, 0, 2, 1, 0, 1, 2, 1][i],
  }));

  const users: MockUser[] = [
    { id: "1", email: "demir@balkanlink.de", type: "lifetime", registered: "01.03.2025", lastSeen: "danas", pagesPerSession: 42, activity: "high" },
    { id: "2", email: "korisnik@gmail.com", type: "premium_paid", registered: "02.05.2025", lastSeen: "danas", pagesPerSession: 28, activity: "high" },
    { id: "3", email: "marko.k@hotmail.com", type: "trial_active", registered: "10.05.2025", lastSeen: "jučer", pagesPerSession: 14, activity: "mid" },
    { id: "4", email: "ana.j@yahoo.com", type: "free", registered: "12.05.2025", lastSeen: "3d", pagesPerSession: 4, activity: "low" },
    { id: "5", email: "test1@balkanlink.de", type: "lifetime", registered: "15.03.2025", lastSeen: "1d", pagesPerSession: 18, activity: "mid" },
    { id: "6", email: "test2@balkanlink.de", type: "lifetime", registered: "20.03.2025", lastSeen: "5d", pagesPerSession: 9, activity: "low" },
  ];
  const filtered = users.filter((u) =>
    (filter === "all" || u.type === filter) &&
    (!search || u.email.toLowerCase().includes(search.toLowerCase()))
  );
  const dotColor = (a: MockUser["activity"]) => a === "high" ? C.emerald : a === "mid" ? C.amber : C.slate;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiTile icon={<Users className="h-4 w-4" />} label="Ukupno" value="10" />
        <KpiTile icon={<Crown className="h-4 w-4" />} label="Premium paid" value="1" accent="amber" />
        <KpiTile icon={<Clock className="h-4 w-4" />} label="Trial aktivan" value="1" accent="cyan" />
        <KpiTile icon={<ShieldCheck className="h-4 w-4" />} label="Lifetime interni" value="8" accent="slate" />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Premium udio (realni)" value="33%" sub="od 3 vanjska" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Churn 30D" value="0" accent="emerald" />
      </div>

      <Card className="p-5">
        <SectionTitle>Retencija korisnika — kohorte</SectionTitle>
        <table className="w-full text-sm">
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {["Kohorta", "Day 1", "Day 7", "Day 30"].map((h) => (
              <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {cohorts.map((c) => (
              <tr key={c.name} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td className="py-2 px-3 font-bold" style={{ color: C.text }}>{c.name}</td>
                {[c.d1, c.d7, c.d30].map((v, i) => (
                  <td key={i} className="py-2 px-3">
                    <span className="inline-block px-3 py-1 rounded-md tabular-nums font-bold text-xs"
                      style={{ background: cohortColor(v), color: v === null ? C.slate : C.text }}>
                      {v === null ? "—" : `${v}%`}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-5" style={{ borderLeft: `3px solid ${C.amber}` }}>
        <SectionTitle>⏰ Triali koji ističu — akcija potrebna</SectionTitle>
        <div className="space-y-2">
          {trials.map((t) => (
            <div key={t.email} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold" style={{ color: C.text }}>{t.email}</span>
                <span className="text-xs" style={{ color: C.textDim }}>ističe {t.expires}</span>
                <Badge variant="outline" style={{ borderColor: C.amber + "60", color: C.amber }}>za {t.days} dana</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-xs" style={{ color: C.textDim }}>Pošalji podsjetnik</Button>
                <Button size="sm" variant="outline" className="text-xs" style={{ borderColor: C.amber, color: C.amber, background: "transparent" }}>Produžiti trial</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Registracije — zadnjih 8 sedmica</SectionTitle>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={regWeeks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="paid" name="Paid" stackId="a" fill={C.amber} radius={[0, 0, 0, 0]} />
              <Bar dataKey="trial" name="Trial" stackId="a" fill={C.cyan} />
              <Bar dataKey="free" name="Free" stackId="a" fill={C.slate} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle right={
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}
            className="text-xs rounded-lg px-2 py-1.5 outline-none"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
            <option value="all">Svi tipovi</option>
            <option value="premium_paid">Paid</option>
            <option value="trial_active">Trial</option>
            <option value="lifetime">Lifetime</option>
            <option value="free">Free</option>
          </select>
        }>Korisnici</SectionTitle>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: C.slate }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pretraži po email-u…"
            className="w-full text-xs rounded-lg pl-9 pr-3 py-2 outline-none"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["", "Email", "Tip", "Registrovan", "Zadnja posjeta", "Stranice/sesija", "Aktivnost", ""].map((h, i) => (
                <th key={i} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((u) => {
                const meta = TYPE_META[u.type];
                const init = u.email.slice(0, 2).toUpperCase();
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
                    <td className="py-2 px-3" style={{ color: C.textDim }}>{u.registered}</td>
                    <td className="py-2 px-3" style={{ color: C.textDim }}>{u.lastSeen}</td>
                    <td className="py-2 px-3 tabular-nums font-bold" style={{ color: C.text }}>{u.pagesPerSession}</td>
                    <td className="py-2 px-3"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: dotColor(u.activity) }} /></td>
                    <td className="py-2 px-3"><MoreVertical className="h-4 w-4 cursor-pointer" style={{ color: C.slate }} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] mt-3 text-right" style={{ color: C.slate }}>1–{filtered.length} od {users.length} · 10 po stranici</div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 4: SAOBRAĆAJ ═══════════════════════ */

function TabSaobracaj() {
  const devices = [
    { name: "Mobilni", value: 72, color: C.cyan },
    { name: "Desktop", value: 22, color: C.violet },
    { name: "Tablet", value: 6, color: C.amber },
  ];
  const browsers = [
    { name: "Chrome", value: 68 },
    { name: "Firefox", value: 14 },
    { name: "Safari", value: 12 },
    { name: "Ostali", value: 6 },
  ];
  const sources = [
    { name: "Direktno", value: 45, color: C.violet },
    { name: "Google", value: 28, color: C.emerald },
    { name: "Facebook", value: 12, color: C.cyan },
    { name: "WhatsApp", value: 9, color: C.amber },
    { name: "Ostalo", value: 6, color: C.slate },
  ];
  const hourly = Array.from({ length: 24 }).map((_, h) => {
    const base = [3, 2, 1, 1, 1, 2, 4, 6, 12, 9, 7, 8, 9, 10, 8, 7, 6, 5, 6, 7, 6, 5, 4, 3];
    return { h: `${h}h`, v: base[h], peak: h === 8 };
  });
  const peakMax = Math.max(...hourly.map((x) => x.v));
  const daily = Array.from({ length: 30 }).map((_, i) => ({
    d: `${i + 1}`,
    auth: 5 + (i % 7) * 2,
    anon: 15 + (i % 5) * 4 + (i > 20 ? 10 : 0),
  }));
  const journeys = [
    { steps: ["Početna", "DeutschTrainer", "A1 Level"], pct: 38 },
    { steps: ["Početna", "Viza Navigator", "BiH→DE"], pct: 24 },
    { steps: ["Početna", "Formulari", "Bürgergeld"], pct: 18 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Posjete 30D" value="1,070" />
        <KpiTile icon={<Users className="h-4 w-4" />} label="Jedinstveni 30D" value="26" />
        <KpiTile icon={<Eye className="h-4 w-4" />} label="Stranice/posjeta" value="38.2" />
        <KpiTile icon={<ArrowDownRight className="h-4 w-4" />} label="Bounce rate" value="~62%" accent="amber" />
        <KpiTile icon={<Smartphone className="h-4 w-4" />} label="Mobile udio" value="72%" accent="cyan" />
        <KpiTile icon={<Clock className="h-4 w-4" />} label="Peak sat" value="8h" accent="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <SectionTitle>Uređaji</SectionTitle>
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
        </Card>

        <Card className="p-5">
          <SectionTitle>Pretraživači</SectionTitle>
          <div className="space-y-2">
            {browsers.map((b) => (
              <div key={b.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: C.textDim }}>{b.name}</span>
                  <span className="tabular-nums font-bold" style={{ color: C.text }}>{b.value}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full" style={{ width: `${b.value}%`, background: C.cyan }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Saobraćajni izvori</SectionTitle>
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
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle>Distribucija posjeta po satu — prosječan dan</SectionTitle>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="h" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="v" name="Posjete" radius={[4, 4, 0, 0]}>
                {hourly.map((x, i) => <Cell key={i} fill={x.v === peakMax ? C.amber : C.cyan} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Dnevni saobraćaj — 30 dana</SectionTitle>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <AreaChart data={daily} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gAuth" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.violet} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={C.violet} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAnon" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="d" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="auth" name="Prijavljeni" stackId="1" stroke={C.violet} fill="url(#gAuth)" />
              <Area type="monotone" dataKey="anon" name="Anonimni" stackId="1" stroke={C.cyan} fill="url(#gAnon)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Najčešći putevi kroz platformu</SectionTitle>
        <div className="space-y-3">
          {journeys.map((j, i) => (
            <div key={i} className="flex items-center gap-2 flex-wrap p-3 rounded-lg"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
              {j.steps.map((s, k) => (
                <div key={k} className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: `${C.violet}20`, color: C.violet, border: `1px solid ${C.violet}40` }}>{s}</span>
                  {k < j.steps.length - 1 && <span style={{ color: C.slate }}>→</span>}
                </div>
              ))}
              <span className="ml-auto tabular-nums font-bold text-sm" style={{ color: C.amber }}>{j.pct}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 5: FUNKCIJE ═══════════════════════ */

function TabFunkcije() {
  const features = [
    { icon: "🎓", name: "DeutschTrainer", uses: 87, trend: 12, color: C.cyan, max: 100 },
    { icon: "✈️", name: "Viza Navigator", uses: 54, trend: 5, color: C.violet, max: 100 },
    { icon: "📄", name: "Formulari", uses: 41, trend: 22, color: C.emerald, max: 100 },
    { icon: "📢", name: "Oglasi", uses: 28, trend: 0, color: C.slate, max: 100 },
    { icon: "🤖", name: "AI Asistent", uses: 15, trend: -8, color: C.amber, max: 100 },
    { icon: "🔍", name: "Dok. provjera", uses: 0, trend: 0, color: C.rose, max: 100, warn: true },
  ];
  const visaCountries = [
    { flag: "🇧🇦", name: "Bosna i Hercegovina", views: 145 },
    { flag: "🇷🇸", name: "Srbija", views: 98 },
    { flag: "🇭🇷", name: "Hrvatska", views: 76 },
    { flag: "🇲🇪", name: "Crna Gora", views: 41 },
    { flag: "🇲🇰", name: "Sjeverna Makedonija", views: 28 },
    { flag: "🇽🇰", name: "Kosovo", views: 19 },
    { flag: "🇦🇱", name: "Albanija", views: 12 },
    { flag: "🇸🇮", name: "Slovenija", views: 5 },
  ];
  const totalVisa = visaCountries.reduce((a, c) => a + c.views, 0);
  const forms = [
    { name: "Bürgergeld", opened: 32, completed: 14 },
    { name: "Anmeldung", opened: 28, completed: 21 },
    { name: "Jobcenter", opened: 19, completed: 8 },
    { name: "Krankenversicherung", opened: 17, completed: 10 },
    { name: "Schufa", opened: 12, completed: 7 },
    { name: "Anerkennung", opened: 9, completed: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => {
          const spark = Array.from({ length: 7 }).map(() => Math.max(0, f.uses / 7 + (Math.random() * 6 - 3)));
          return (
            <Card key={f.name} className="p-5" style={{ borderLeft: `3px solid ${f.color}` }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl">{f.icon}</div>
                  <div className="text-sm font-bold mt-1" style={{ color: C.text }}>{f.name}</div>
                </div>
                <Sparkline data={spark} color={f.color} />
              </div>
              <div className="mt-3 flex items-end justify-between">
                <Metric><div className="text-3xl tabular-nums">{f.uses}</div></Metric>
                <div className="text-xs flex items-center gap-1"
                  style={{ color: f.trend > 0 ? C.emerald : f.trend < 0 ? C.rose : C.slate }}>
                  {f.trend > 0 && <ArrowUpRight className="h-3 w-3" />}
                  {f.trend < 0 && <ArrowDownRight className="h-3 w-3" />}
                  {f.trend > 0 ? "+" : ""}{f.trend}%
                </div>
              </div>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="h-full" style={{ width: `${(f.uses / f.max) * 100}%`, background: f.color }} />
              </div>
              {f.warn && (
                <div className="mt-3 text-[11px]" style={{ color: C.rose }}>
                  ⚠️ Niko ne koristi — razmisli o vidljivosti
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <SectionTitle>Viza Navigator — pregledi po zemlji</SectionTitle>
        <div className="space-y-2">
          {visaCountries.map((c) => {
            const pct = Math.round((c.views / totalVisa) * 100);
            return (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-lg w-7">{c.flag}</span>
                <span className="text-sm w-48" style={{ color: C.text }}>{c.name}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full" style={{ width: `${pct}%`, background: C.violet }} />
                </div>
                <span className="text-xs tabular-nums font-bold w-12 text-right" style={{ color: C.text }}>{c.views}</span>
                <span className="text-[11px] w-10 text-right" style={{ color: C.slate }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Formulari — stope završetka</SectionTitle>
        <table className="w-full text-sm">
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {["Naziv", "Otvoreno", "Završeno", "Stopa", "Trend"].map((h) => (
              <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {forms.map((f, i) => {
              const rate = Math.round((f.completed / f.opened) * 100);
              const color = rate >= 60 ? C.emerald : rate >= 40 ? C.amber : C.rose;
              return (
                <tr key={f.name} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-2 px-3 font-bold" style={{ color: C.text }}>{f.name}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.textDim }}>{f.opened}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.textDim }}>{f.completed}</td>
                  <td className="py-2 px-3 tabular-nums font-bold" style={{ color }}>{rate}%</td>
                  <td className="py-2 px-3"><Sparkline data={[3, 4, 2, 5, 6, 5, 7].map((v) => v + i)} color={color} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 6: DEUTSCHTRAINER ═══════════════════════ */

function TabTrainer() {
  const levels = [
    { name: "A1", done: 32, total: 40, users: 18, color: C.emerald },
    { name: "A2", done: 24, total: 40, users: 12, color: C.cyan },
    { name: "B1", done: 18, total: 40, users: 9, color: C.violet },
    { name: "B2", done: 11, total: 40, users: 5, color: C.amber },
    { name: "C1", done: 6, total: 40, users: 2, color: C.rose },
    { name: "C2", done: 2, total: 40, users: 1, color: C.slate },
  ];
  const hardest = [
    { lvl: "B2", name: "Konjunktiv II — irrealne rečenice", score: 38, attempts: 22 },
    { lvl: "C1", name: "Partizip I/II u atributu", score: 41, attempts: 14 },
    { lvl: "B1", name: "Passiv mit Modalverben", score: 47, attempts: 31 },
    { lvl: "B2", name: "Nominalisierung", score: 49, attempts: 18 },
    { lvl: "B1", name: "Reflexivverben", score: 52, attempts: 28 },
    { lvl: "A2", name: "Trennbare Verben — Perfekt", score: 55, attempts: 42 },
    { lvl: "B2", name: "Genitiv-Präpositionen", score: 58, attempts: 16 },
    { lvl: "C1", name: "Funktionsverbgefüge", score: 61, attempts: 9 },
    { lvl: "A2", name: "Dativ vs. Akkusativ", score: 64, attempts: 51 },
    { lvl: "B1", name: "Nebensätze mit weil/dass", score: 66, attempts: 38 },
  ];
  const popular = [
    { lvl: "A1", name: "Begrüßung & Vorstellung", done: 67, score: 88, dur: "3:12" },
    { lvl: "A1", name: "Zahlen 1-100", done: 58, score: 91, dur: "2:48" },
    { lvl: "A2", name: "Familie & Beruf", done: 49, score: 81, dur: "4:05" },
    { lvl: "A1", name: "Im Restaurant", done: 44, score: 84, dur: "3:38" },
    { lvl: "A2", name: "Termine vereinbaren", done: 38, score: 76, dur: "4:42" },
    { lvl: "B1", name: "Wohnungssuche", done: 32, score: 72, dur: "5:18" },
    { lvl: "A1", name: "Wegbeschreibung", done: 29, score: 79, dur: "4:01" },
    { lvl: "A2", name: "Beim Arzt", done: 27, score: 73, dur: "5:02" },
    { lvl: "B1", name: "Bewerbungsgespräch", done: 22, score: 68, dur: "6:14" },
    { lvl: "B2", name: "Diskussion führen", done: 18, score: 62, dur: "7:22" },
  ];
  const dist = [
    { range: "0-10%", n: 2 }, { range: "11-20%", n: 3 }, { range: "21-30%", n: 5 },
    { range: "31-40%", n: 8 }, { range: "41-50%", n: 11 }, { range: "51-60%", n: 14 },
    { range: "61-70%", n: 18 }, { range: "71-80%", n: 22 }, { range: "81-90%", n: 16 }, { range: "91-100%", n: 9 },
  ];
  const distColor = (i: number) => i < 5 ? C.rose : i < 7 ? C.amber : C.emerald;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile icon={<GraduationCap className="h-4 w-4" />} label="Lekcija započeto 30D" value="87" accent="cyan" />
        <KpiTile icon={<CheckCircle2 className="h-4 w-4" />} label="Lekcija završeno 30D" value="54" accent="emerald" />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Stopa završetka" value="62%" />
        <KpiTile icon={<Sparkles className="h-4 w-4" />} label="Prosj. score" value="78%" accent="amber" />
        <KpiTile icon={<Clock className="h-4 w-4" />} label="Prosj. trajanje" value="4:21" sub="minuta po lekciji" />
      </div>

      <Card className="p-5">
        <SectionTitle>Level napredak</SectionTitle>
        <div className="space-y-3">
          {levels.map((l) => {
            const pct = Math.round((l.done / l.total) * 100);
            return (
              <div key={l.name} className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md w-10 text-center"
                  style={{ background: `${l.color}25`, color: l.color, border: `1px solid ${l.color}40` }}>{l.name}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full" style={{ width: `${pct}%`, background: l.color }} />
                </div>
                <span className="text-xs tabular-nums font-bold w-20 text-right" style={{ color: C.text }}>{l.done}/{l.total}</span>
                <span className="text-xs tabular-nums w-12 text-right" style={{ color: C.textDim }}>{pct}%</span>
                <span className="text-[11px] w-20 text-right" style={{ color: C.slate }}>{l.users} korisnika</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionTitle>Lekcije s najnižim prosječnim scoreom</SectionTitle>
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["#", "Level", "Naziv", "Score", "Pokušaji"].map((h) => (
                <th key={h} className="text-left py-2 px-2 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {hardest.map((l, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: l.score < 50 ? `${C.rose}08` : "transparent" }}>
                  <td className="py-2 px-2" style={{ color: C.slate }}>{i + 1}</td>
                  <td className="py-2 px-2"><span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${C.violet}20`, color: C.violet }}>{l.lvl}</span></td>
                  <td className="py-2 px-2 text-xs" style={{ color: C.text }}>{l.name}</td>
                  <td className="py-2 px-2 tabular-nums font-bold" style={{ color: l.score < 50 ? C.rose : C.amber }}>{l.score}%</td>
                  <td className="py-2 px-2 tabular-nums" style={{ color: C.textDim }}>{l.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-5">
          <SectionTitle>Najpopularnije lekcije</SectionTitle>
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["#", "Lvl", "Naziv", "Završ.", "Score", "Trajanje"].map((h) => (
                <th key={h} className="text-left py-2 px-2 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {popular.map((l, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-2 px-2" style={{ color: C.slate }}>{i + 1}</td>
                  <td className="py-2 px-2"><span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${C.cyan}20`, color: C.cyan }}>{l.lvl}</span></td>
                  <td className="py-2 px-2 text-xs" style={{ color: C.text }}>{l.name}</td>
                  <td className="py-2 px-2 tabular-nums font-bold" style={{ color: C.text }}>{l.done}</td>
                  <td className="py-2 px-2 tabular-nums" style={{ color: C.emerald }}>{l.score}%</td>
                  <td className="py-2 px-2 tabular-nums text-xs" style={{ color: C.textDim }}>{l.dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle>Distribucija scoreova</SectionTitle>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={dist} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="range" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="n" name="Korisnika" radius={[4, 4, 0, 0]}>
                {dist.map((_, i) => <Cell key={i} fill={distColor(i)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 7: AI ASISTENT ═══════════════════════ */

function TabAsistent() {
  const trend = Array.from({ length: 30 }).map((_, i) => ({
    d: `${i + 1}`,
    q: i < 10 ? Math.floor(Math.random() * 2) : i < 20 ? 1 : Math.floor(Math.random() * 3),
  }));
  const topics = [
    { name: "Bürgergeld", n: 4 },
    { name: "Anmeldung", n: 3 },
    { name: "Krankenversicherung", n: 3 },
    { name: "Radno pravo", n: 2 },
    { name: "Ostalo", n: 3 },
  ];
  const queries = Array.from({ length: 15 }).map((_, i) => ({
    time: `${(13 - Math.floor(i / 3)).toString().padStart(2, "0")}:${(45 - (i * 7) % 60).toString().padStart(2, "0")}`,
    user: `K#${i + 1}`,
    topic: ["Bürgergeld", "Anmeldung", "Krankenversicherung", "Radno pravo", "Familienzulage"][i % 5],
    tokens: 280 + (i * 47) % 800,
    cost: 0.003 + (i * 0.0007) % 0.01,
    rating: i % 5 === 0 ? "👎" : i % 3 === 0 ? "—" : "👍",
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile icon={<Bot className="h-4 w-4" />} label="Upiti 30D" value="15" accent="violet" />
        <KpiTile icon={<Calendar className="h-4 w-4" />} label="Upiti danas" value="0" />
        <KpiTile icon={<Euro className="h-4 w-4" />} label="Trošak 30D" value="~0.08 €" sub="Gemini 2.5 Flash" accent="amber" />
        <KpiTile icon={<Clock className="h-4 w-4" />} label="Avg. odgovor" value="2.3s" />
        <KpiTile icon={<CheckCircle2 className="h-4 w-4" />} label="Pozitivnih" value="80%" sub="od ocijenjenih" accent="emerald" />
      </div>

      <Card className="p-5">
        <SectionTitle>Upiti — zadnjih 30 dana</SectionTitle>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gAsist" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.violet} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={C.violet} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="d" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="q" name="Upiti" stroke={C.violet} fill="url(#gAsist)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>O čemu korisnici pitaju</SectionTitle>
        <div className="space-y-2">
          {topics.map((t) => {
            const pct = (t.n / 15) * 100;
            return (
              <div key={t.name} className="flex items-center gap-3">
                <span className="text-xs w-44" style={{ color: C.text }}>{t.name}</span>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full" style={{ width: `${pct}%`, background: C.violet }} />
                </div>
                <span className="text-xs tabular-nums font-bold w-16 text-right" style={{ color: C.text }}>{t.n} upita</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Zadnjih 15 upita</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Vrijeme", "Korisnik", "Tema", "Tokeni", "Trošak", "Ocjena"].map((h) => (
                <th key={h} className="text-left py-2 px-3 text-[10px] uppercase font-bold tracking-wider" style={{ color: C.slate }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {queries.map((q, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-2 px-3 tabular-nums text-xs" style={{ color: C.textDim }}>{q.time}</td>
                  <td className="py-2 px-3 font-mono text-xs" style={{ color: C.cyan }}>{q.user}</td>
                  <td className="py-2 px-3" style={{ color: C.text }}>{q.topic}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.textDim }}>{q.tokens}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: C.amber }}>{q.cost.toFixed(4)} €</td>
                  <td className="py-2 px-3 text-base">{q.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 8: GEO ═══════════════════════ */

function TabGeo() {
  const cities = [
    { flag: "🇩🇪", name: "München", n: 3 },
    { flag: "🇩🇪", name: "Berlin", n: 2 },
    { flag: "🇩🇪", name: "Frankfurt", n: 2 },
    { flag: "🇩🇪", name: "Hamburg", n: 1 },
    { flag: "🇧🇦", name: "Sarajevo", n: 1 },
    { flag: "🇭🇷", name: "Zagreb", n: 1 },
  ];
  const origin = [
    { name: "BiH", value: 45, color: C.amber, flag: "🇧🇦" },
    { name: "Hrvatska", value: 25, color: C.cyan, flag: "🇭🇷" },
    { name: "Srbija", value: 18, color: C.violet, flag: "🇷🇸" },
    { name: "Crna Gora", value: 7, color: C.emerald, flag: "🇲🇪" },
    { name: "Ostalo", value: 5, color: C.slate, flag: "🌍" },
  ];
  const langs = [
    { code: "BA", flag: "🇧🇦", pct: 48, color: C.amber },
    { code: "HR", flag: "🇭🇷", pct: 27, color: C.cyan },
    { code: "SR", flag: "🇷🇸", pct: 19, color: C.violet },
    { code: "DE", flag: "🇩🇪", pct: 6, color: C.emerald },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiTile icon={<Globe className="h-4 w-4" />} label="Zemalja" value="2" sub="DE + BA" />
        <KpiTile icon={<MapPin className="h-4 w-4" />} label="Gradova" value="6" />
        <KpiTile icon={<Users className="h-4 w-4" />} label="Iz Njemačke" value="85%" accent="violet" />
        <KpiTile icon={<Plane className="h-4 w-4" />} label="Iz Balkana" value="15%" accent="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionTitle>Top gradovi</SectionTitle>
          <div className="space-y-2.5">
            {cities.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-lg w-7">{c.flag}</span>
                <span className="text-sm w-24" style={{ color: C.text }}>{c.name}</span>
                <div className="flex-1 flex gap-1">
                  {Array.from({ length: c.n }).map((_, i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: C.violet }} />
                  ))}
                </div>
                <span className="text-xs tabular-nums font-bold" style={{ color: C.text }}>{c.n}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Porijeklo korisnika</SectionTitle>
          <div className="flex items-center gap-3">
            <div style={{ width: 160, height: 160 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={origin} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={2}>
                    {origin.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">
              {origin.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2" style={{ color: C.textDim }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.flag} {d.name}
                  </span>
                  <span className="tabular-nums font-bold" style={{ color: C.text }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle>Jezik UI koji korisnici koriste</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {langs.map((l) => (
            <div key={l.code} className="rounded-xl p-4"
              style={{ background: `${l.color}10`, border: `1px solid ${C.border}`, borderLeft: `3px solid ${l.color}` }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{l.flag}</span>
                <span className="text-sm font-bold" style={{ color: C.text }}>{l.code}</span>
              </div>
              <Metric><div className="text-3xl mt-2 tabular-nums">{l.pct}%</div></Metric>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="h-full" style={{ width: `${l.pct}%`, background: l.color }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 9: TROŠKOVI ═══════════════════════ */

function TabTroskovi() {
  const services = [
    { name: "Supabase Free", cost: 0, note: "Storage, DB, Auth" },
    { name: "Gemini 2.5 Flash", cost: 0.08, note: "15 upita × ~0.005€" },
    { name: "ElevenLabs", cost: 2.50, note: "TTS generacija (cached)" },
    { name: "Lovable Pro", cost: 20.00, note: "Builder (nije u profit kalkulaciji)", excluded: true },
    { name: "Stripe fees", cost: 0.62, note: "2.9% + 0.30€ × 2" },
    { name: "Cloudflare", cost: 0, note: "Free tier" },
    { name: "Domain (god./12)", cost: 1.00, note: "balkanlink.de" },
  ];
  const opTotal = services.filter((s) => !s.excluded).reduce((a, s) => a + s.cost, 0);
  const revenue = 19.98;
  const profit = revenue - opTotal;
  const margin = Math.round((profit / revenue) * 100);
  const months = [
    { m: "Mart", revenue: 0, cost: 3.8 },
    { m: "April", revenue: 9.99, cost: 4.0 },
    { m: "Maj", revenue: 19.98, cost: 4.2 },
  ];
  const breakeven = Math.ceil(opTotal / 9.99);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile icon={<Wallet className="h-4 w-4" />} label="Troškovi 30D" value={`~${opTotal.toFixed(2)} €`} accent="rose" />
        <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Prihod 30D" value={`${revenue.toFixed(2)} €`} accent="emerald" />
        <KpiTile icon={<Euro className="h-4 w-4" />} label="Profit 30D" value={`~${profit.toFixed(2)} €`} accent="emerald" />
        <KpiTile icon={<BarChart3 className="h-4 w-4" />} label="Profit marža" value={`${margin}%`} accent="amber" />
        <KpiTile icon={<Calendar className="h-4 w-4" />} label="Procij. trošak/mj" value={`~${opTotal.toFixed(2)} €`} />
      </div>

      <Card className="p-5">
        <SectionTitle>Troškovi po servisu</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
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
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={services.filter((s) => !s.excluded)} layout="vertical" margin={{ top: 5, right: 10, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" {...axisProps} />
                <YAxis type="category" dataKey="name" {...axisProps} width={120} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="cost" name="Trošak €" fill={C.amber} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle>Profit / Loss — zadnja 3 mjeseca</SectionTitle>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={months} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
              <Bar dataKey="revenue" name="Prihod €" fill={C.emerald} radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="Troškovi €" fill={C.rose} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey={(d: any) => d.revenue - d.cost} name="Profit €" stroke={C.violet} strokeDasharray="5 5" strokeWidth={2} dot />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5" style={{ borderLeft: `3px solid ${C.violet}` }}>
        <SectionTitle>Break-even kalkulator</SectionTitle>
        <div className="text-sm" style={{ color: C.text }}>
          Koliko pretplata trebaš za pokriće troškova?
        </div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
            <Label>Troškovi/mj</Label>
            <Metric><div className="text-xl mt-1">{opTotal.toFixed(2)} €</div></Metric>
          </div>
          <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}>
            <Label>Cijena pretplate</Label>
            <Metric><div className="text-xl mt-1">9.99 €</div></Metric>
          </div>
          <div className="rounded-lg p-3" style={{ background: `${C.emerald}15`, border: `1px solid ${C.emerald}40` }}>
            <Label>Minimum za pokriće</Label>
            <Metric><div className="text-xl mt-1" style={{ color: C.emerald }}>{breakeven} korisnik ✅</div></Metric>
          </div>
        </div>
        <div className="mt-4 text-xs" style={{ color: C.textDim }}>
          Trenutno: <span style={{ color: C.emerald, fontWeight: 700 }}>2 plaćena korisnika</span> — pokriveni troškovi + 100% profit marže
        </div>
        <div className="mt-2 h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="h-full" style={{ width: `${Math.min(100, (2 / breakeven) * 100)}%`, background: `linear-gradient(90deg, ${C.emerald}, ${C.amber})` }} />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════ TAB 10: CILJEVI ═══════════════════════ */

function TabCiljevi() {
  const [mrrTarget, setMrrTarget] = useState(100);
  const [usersTarget, setUsersTarget] = useState(50);
  const [visitsTarget, setVisitsTarget] = useState(200);
  const mrrCurrent = 9.99;
  const usersCurrent = 1;
  const visitsCurrent = 35.7;

  const goals = [
    { icon: "🎯", label: "MRR cilj", current: mrrCurrent, target: mrrTarget, unit: "€", color: C.amber, hint: `Trebaš još ${Math.ceil((mrrTarget - mrrCurrent) / 9.99)} novih pretplata`, set: setMrrTarget },
    { icon: "👥", label: "Korisnici cilj", current: usersCurrent, target: usersTarget, unit: "", color: C.violet, hint: "Pravi (vanjski) korisnici", set: setUsersTarget },
    { icon: "📈", label: "Posjete/dan cilj", current: visitsCurrent, target: visitsTarget, unit: "", color: C.cyan, hint: "Prosjek zadnjih 30 dana", set: setVisitsTarget },
  ];

  const milestones = [
    { date: "02.05.2025", text: "Prva pretplata (9.99 €)", state: "done" as const },
    { date: "05.05.2025", text: "Druga transakcija", state: "done" as const },
    { date: "Sljedeće", text: "10 pravih korisnika", state: "next" as const },
    { date: "—", text: "100 € MRR", state: "todo" as const },
    { date: "—", text: "1,000 € MRR", state: "todo" as const },
    { date: "—", text: "100 korisnika", state: "todo" as const },
  ];

  const months12 = ["Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "Maj"];
  const projection = months12.map((m, i) => ({
    m,
    konzervativno: 9.99 + (i + 1) * 9.99 * 1,
    realisticno: 9.99 + (i + 1) * 9.99 * 3,
    optimisticno: 9.99 + (i + 1) * 9.99 * 7,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((g) => {
          const pct = Math.min(100, (g.current / g.target) * 100);
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
                <Metric><div className="text-2xl tabular-nums">{g.current}{g.unit}</div></Metric>
                <span className="text-xs mb-1" style={{ color: C.slate }}>/ target</span>
                <input
                  type="number"
                  value={g.target}
                  onChange={(e) => g.set(Number(e.target.value) || 0)}
                  className="ml-auto w-20 text-xs rounded px-2 py-1 outline-none tabular-nums"
                  style={{ background: C.card, border: `1px solid ${C.border}`, color: g.color }}
                />
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
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px" style={{ background: C.border }} />
          {milestones.map((m, i) => {
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
      </Card>

      <Card className="p-5">
        <SectionTitle>Projekcija prihoda — 12 mjeseci unaprijed</SectionTitle>
        <div className="text-[11px] mb-3" style={{ color: C.textDim }}>
          Pri različitim scenarijima rasta (broj novih pretplata mjesečno)
        </div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={projection} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} tickFormatter={(v) => `${v.toFixed(0)}€`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
              <Line type="monotone" dataKey="konzervativno" name="+1/mj (konzervativno)" stroke={C.slate} strokeDasharray="5 5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="realisticno" name="+3/mj (realistično)" stroke={C.violet} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="optimisticno" name="+7/mj (optimistično)" stroke={C.emerald} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-[11px] flex items-center gap-1" style={{ color: C.slate }}>
          <Trophy className="h-3 w-3" /> X osa: Jun 2025 → Maj 2026
        </div>
      </Card>
    </div>
  );
}
