import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Activity, Users, FileCheck, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LiveStats {
  totalUsers: number;
  chatToday: number;
  docsToday: number;
  newToday: number;
}

interface Props {
  /** Compact one-liner ticker style */
  variant?: "ticker" | "card";
  className?: string;
}

/**
 * Live social proof widget — shows aggregate platform activity.
 * Refreshes every 60s. Pure aggregate counts (no PII).
 */
export default function LiveSocialProof({ variant = "ticker", className = "" }: Props) {
  const { t } = useTranslation("common");
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase.rpc("get_live_stats" as any);
      if (!cancelled && !error && data) {
        const next = data as unknown as LiveStats;
        setStats((prev) => {
          if (prev && (prev.chatToday !== next.chatToday || prev.docsToday !== next.docsToday || prev.newToday !== next.newToday)) {
            setPulse(true);
            setTimeout(() => setPulse(false), 1000);
          }
          return next;
        });
      }
    };
    load();
    const interval = setInterval(load, 60_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  if (!stats) return null;

  // Hide widget if no meaningful activity yet
  const totalActivity = stats.chatToday + stats.docsToday + stats.newToday;
  if (totalActivity < 3 && stats.totalUsers < 10) return null;

  if (variant === "ticker") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70 backdrop-blur ${pulse ? "ring-1 ring-[hsl(45,93%,55%)]/40" : ""} ${className}`}
        role="status"
        aria-live="polite"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
        </span>
        <span className="font-medium text-white/85">{stats.totalUsers.toLocaleString("de-DE")}</span>
        <span>{t("socialProof.usersOnPlatform", "korisnika koristi BalkanLink")}</span>
        {stats.newToday > 0 && (
          <>
            <span className="text-white/30">·</span>
            <span className="font-medium text-[hsl(45,93%,60%)]">+{stats.newToday}</span>
            <span>{t("socialProof.today", "danas")}</span>
          </>
        )}
      </div>
    );
  }

  // Card variant
  const items = [
    { icon: Users, value: stats.totalUsers, label: t("socialProof.totalUsers", "korisnika") },
    { icon: MessageSquare, value: stats.chatToday, label: t("socialProof.chatQueries", "Asistent upita danas") },
    { icon: FileCheck, value: stats.docsToday, label: t("socialProof.docsChecked", "dokumenata danas") },
    { icon: Activity, value: stats.newToday, label: t("socialProof.newUsersToday", "novih danas") },
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      {items.map(({ icon: Icon, value, label }, i) => (
        <div
          key={i}
          className={`rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition-all ${pulse ? "ring-1 ring-[hsl(45,93%,55%)]/30" : ""}`}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/45">
            <Icon className="h-3.5 w-3.5" aria-hidden />
            <span className="truncate">{label}</span>
          </div>
          <div className="mt-1.5 text-xl font-bold text-white">
            {value.toLocaleString("de-DE")}
          </div>
        </div>
      ))}
    </div>
  );
}
