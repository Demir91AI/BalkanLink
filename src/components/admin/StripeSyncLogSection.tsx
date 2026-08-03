import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, RefreshCw, CheckCircle2, XCircle, ShieldAlert, Trash2, Save } from "lucide-react";

type SyncLogRow = {
  id: string;
  action: string;
  success: boolean;
  admin_email: string | null;
  target_email: string | null;
  records_updated: number;
  mismatches_found: number;
  error_message: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};

type RetentionSettings = {
  retention_days: number;
  auto_purge_enabled: boolean;
  last_purged_at: string | null;
  last_purged_count: number;
};

const ACTION_LABEL: Record<string, string> = {
  audit: "Provjera (audit)",
  sync_all: "Sync svih",
  sync_user: "Sync korisnika",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "medium" });

export default function StripeSyncLogSection() {
  const { isAdmin, profileLoading } = useAuth();
  const [rows, setRows] = useState<SyncLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlyFailed, setOnlyFailed] = useState(false);
  const [settings, setSettings] = useState<RetentionSettings | null>(null);
  const [retentionInput, setRetentionInput] = useState("90");
  const [savingSettings, setSavingSettings] = useState(false);
  const [purging, setPurging] = useState(false);


  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("stripe_sync_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast.error("Greška pri učitavanju audit loga");
    } else {
      setRows((data ?? []) as SyncLogRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("stripe-sync-log")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stripe_sync_log" },
        (payload) => setRows((prev) => [payload.new as SyncLogRow, ...prev]),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const visible = useMemo(
    () => (onlyFailed ? rows.filter((r) => !r.success) : rows),
    [rows, onlyFailed],
  );

  const stats = useMemo(
    () => ({
      total: rows.length,
      ok: rows.filter((r) => r.success).length,
      failed: rows.filter((r) => !r.success).length,
      updated: rows.reduce((s, r) => s + (r.records_updated ?? 0), 0),
    }),
    [rows],
  );

  const exportCsv = () => {
    if (!visible.length) {
      toast.error("Nema zapisa za izvoz");
      return;
    }
    const head = [
      "timestamp",
      "akcija",
      "status",
      "admin",
      "target_korisnik",
      "azurirano_zapisa",
      "neslaganja",
      "greska",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      head.join(","),
      ...visible.map((r) =>
        [
          new Date(r.created_at).toISOString(),
          ACTION_LABEL[r.action] ?? r.action,
          r.success ? "uspjeh" : "neuspjeh",
          r.admin_email ?? "",
          r.target_email ?? "",
          r.records_updated ?? 0,
          r.mismatches_found ?? 0,
          r.error_message ?? "",
        ]
          .map(esc)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stripe-sync-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Izvezeno ${visible.length} zapisa`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Stripe ↔ baza audit log</h2>
          <p className="text-sm text-muted-foreground">
            Svaki pokušaj sinhronizacije: vrijeme, admin, rezultat i broj ažuriranih zapisa.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setOnlyFailed((v) => !v)}>
            {onlyFailed ? "Prikaži sve" : "Samo neuspjeli"}
          </Button>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Osvježi
          </Button>
          <Button size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-1.5" />
            Izvoz CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Ukupno pokušaja", value: stats.total },
          { label: "Uspješnih", value: stats.ok },
          { label: "Neuspješnih", value: stats.failed },
          { label: "Ažuriranih zapisa", value: stats.updated },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-semibold text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-3 py-2">Vrijeme</th>
              <th className="text-left font-medium px-3 py-2">Akcija</th>
              <th className="text-left font-medium px-3 py-2">Status</th>
              <th className="text-left font-medium px-3 py-2">Admin</th>
              <th className="text-left font-medium px-3 py-2">Korisnik</th>
              <th className="text-right font-medium px-3 py-2">Ažurirano</th>
              <th className="text-right font-medium px-3 py-2">Neslaganja</th>
              <th className="text-left font-medium px-3 py-2">Greška</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-t border-border/60">
                <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">{fmt(r.created_at)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-foreground">
                  {ACTION_LABEL[r.action] ?? r.action}
                </td>
                <td className="px-3 py-2">
                  <Badge variant={r.success ? "secondary" : "destructive"} className="gap-1">
                    {r.success ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {r.success ? "Uspjeh" : "Neuspjeh"}
                  </Badge>
                </td>
                <td className="px-3 py-2 text-muted-foreground">{r.admin_email ?? "—"}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.target_email ?? "—"}</td>
                <td className="px-3 py-2 text-right text-foreground">{r.records_updated}</td>
                <td className="px-3 py-2 text-right text-foreground">{r.mismatches_found}</td>
                <td className="px-3 py-2 text-destructive max-w-[280px] truncate" title={r.error_message ?? ""}>
                  {r.error_message ?? ""}
                </td>
              </tr>
            ))}
            {!visible.length && !loading && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-muted-foreground">
                  Nema zapisa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
