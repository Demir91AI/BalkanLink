import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Check, CheckCheck, RefreshCw, Trash2, AlertTriangle, CircleCheck, Info, XCircle } from "lucide-react";

type Notification = {
  id: string;
  type: string;
  severity: string;
  title: string;
  body: string | null;
  metadata: Record<string, unknown> | null;
  read_at: string | null;
  created_at: string;
};

const SEV = {
  error: { color: "#f87171", bg: "rgba(248,113,113,0.10)", Icon: XCircle, label: "Greška" },
  warning: { color: "#fbbf24", bg: "rgba(251,191,36,0.10)", Icon: AlertTriangle, label: "Upozorenje" },
  success: { color: "#34d399", bg: "rgba(52,211,153,0.10)", Icon: CircleCheck, label: "Uspjeh" },
  info: { color: "#60a5fa", bg: "rgba(96,165,250,0.10)", Icon: Info, label: "Info" },
} as const;

const sevOf = (s: string) => SEV[(s as keyof typeof SEV)] ?? SEV.info;

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function AdminNotificationsSection() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("admin_notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    setItems((data as Notification[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("admin-notifications")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_notifications" }, (payload) => {
        setItems((prev) => [payload.new as Notification, ...prev]);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const markRead = async (id: string) => {
    await supabase.from("admin_notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)));
  };

  const markAllRead = async () => {
    const ts = new Date().toISOString();
    await supabase.from("admin_notifications").update({ read_at: ts }).is("read_at", null);
    setItems((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: ts })));
  };

  const remove = async (id: string) => {
    await supabase.from("admin_notifications").delete().eq("id", id);
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const unread = items.filter((n) => !n.read_at).length;
  const shown = filter === "unread" ? items.filter((n) => !n.read_at) : items;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" style={{ color: "#C9A84C" }} />
          <h2 className="text-sm font-bold text-white">Notifikacije</h2>
          {unread > 0 && (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(248,113,113,0.15)", color: "#f87171" }}
            >
              {unread} nepročitano
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-[11px] font-bold px-3 py-1.5 rounded-lg"
              style={{
                background: filter === f ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f ? "#C9A84C" : "rgba(255,255,255,0.08)"}`,
                color: filter === f ? "#C9A84C" : "#94a3b8",
              }}
            >
              {f === "all" ? "Sve" : "Nepročitane"}
            </button>
          ))}
          <button
            onClick={markAllRead}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
          >
            <CheckCheck className="w-3.5 h-3.5" /> Sve pročitano
          </button>
          <button
            onClick={load}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Osvježi
          </button>
        </div>
      </div>

      {loading && items.length === 0 ? (
        <div className="text-xs text-slate-400">Učitavanje…</div>
      ) : shown.length === 0 ? (
        <div
          className="text-xs text-slate-400 rounded-xl p-6 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Nema notifikacija.
        </div>
      ) : (
        <div className="space-y-2">
          {shown.map((n) => {
            const s = sevOf(n.severity);
            const Icon = s.Icon;
            return (
              <div
                key={n.id}
                className="rounded-xl p-4 flex gap-3 items-start"
                style={{
                  background: n.read_at ? "rgba(255,255,255,0.03)" : s.bg,
                  border: `1px solid ${n.read_at ? "rgba(255,255,255,0.08)" : s.color}`,
                  borderLeft: `3px solid ${s.color}`,
                }}
              >
                <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: s.color }} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-bold text-white">{n.title}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: s.color }}>
                      {n.type}
                    </span>
                  </div>
                  {n.body && <p className="text-[12px] text-slate-300 mt-1 break-words">{n.body}</p>}
                  <span className="text-[11px] text-slate-500">{fmt(n.created_at)}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!n.read_at && (
                    <button
                      onClick={() => markRead(n.id)}
                      title="Označi kao pročitano"
                      className="p-1.5 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => remove(n.id)}
                    title="Obriši"
                    className="p-1.5 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#f87171" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
