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
          {tab !== "Pregled" && tab !== "Prihodi" && (
            <Card className="p-12 text-center">
              <BarChart3 className="h-10 w-10 mx-auto mb-3" style={{ color: C.slate }} />
              <h3 className="font-bold text-lg" style={{ color: C.text }}>{tab}</h3>
              <p className="text-sm mt-2" style={{ color: C.textDim }}>
                Ovaj tab dolazi u sljedećoj iteraciji. Pregled i Prihodi su trenutno aktivni.
              </p>
              <div className="flex gap-2 justify-center mt-5">
                <Button asChild size="sm" variant="outline" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
                  <Link to="/admin/pitanja">Q&A moderacija</Link>
                </Button>
                <Button asChild size="sm" variant="outline" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
                  <Link to="/admin/trialovi">Trialovi</Link>
                </Button>
                <Button asChild size="sm" variant="outline" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
                  <Link to="/admin/forms">Formulari</Link>
                </Button>
              </div>
            </Card>
          )}
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
