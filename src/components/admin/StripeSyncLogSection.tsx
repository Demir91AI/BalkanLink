import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { safeCsv, emptySource, settleSource } from "@/lib/admin-center/model";
import SourceStatus from './SourceStatus';
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

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "medium" });

export default function StripeSyncLogSection() {
  const { isAdmin, profileLoading } = useAuth();
  const { t } = useTranslation("common");
  const ACTION_LABEL: Record<string,string> = { audit:t("adminSync.audit"),sync_all:t("adminSync.syncAll"),sync_user:t("adminSync.syncUser") };
  const [rows, setRows] = useState<SyncLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlyFailed, setOnlyFailed] = useState(false);
  const [settings, setSettings] = useState<RetentionSettings | null>(null);
  const [retentionInput, setRetentionInput] = useState("90");
  const [savingSettings, setSavingSettings] = useState(false);
  const [purging, setPurging] = useState(false);
  const [sourceState,setSourceState] = useState(emptySource);
  const [settingsError,setSettingsError] = useState(false);
  const loadPending = useRef(false);


  const loadSettings = useCallback(async () => {
    const { data, error } = await (supabase as any)
      .from("stripe_sync_log_settings")
      .select("retention_days, auto_purge_enabled, last_purged_at, last_purged_count")
      .eq("id", 1)
      .maybeSingle();
    setSettingsError(!!error || !data);
    if (!error && data) {
      setSettings(data as RetentionSettings);
      setRetentionInput(String((data as RetentionSettings).retention_days));
    }
  }, []);

  const load = useCallback(async () => {
    if (loadPending.current) return;
    loadPending.current=true;
    setLoading(true);
    setSourceState(prev=>({...prev,loading:true}));
    try {
    const { data, error } = await (supabase as any)
      .from("stripe_sync_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setSourceState(prev=>settleSource(prev,{status:'fulfilled',value:{data,error}},new Date().toISOString()));
    if (error) {
      toast.error(t("adminSync.auditError"));
    } else {
      setRows((data ?? []) as SyncLogRow[]);
    }
    } catch { setSourceState(prev=>({...prev,error:true,loading:false})); }
    finally { loadPending.current=false;setLoading(false); }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    load();
    loadSettings();
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
  }, [load, loadSettings, isAdmin]);

  const saveSettings = async (patch: Partial<RetentionSettings>) => {
    if (!window.confirm(t("adminSync.confirmSettings"))) return;
    setSavingSettings(true);
    const { data, error } = await (supabase as any)
      .from("stripe_sync_log_settings")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", 1).select('id');
    setSavingSettings(false);
    if (error || !Array.isArray(data) || data.length!==1) {
      toast.error(t("adminSync.notAllowed"));
      return;
    }
    toast.success(t("adminSync.retentionSaved"));
    loadSettings();
  };

  const saveRetention = () => {
    const days = Number(retentionInput);
    if (!Number.isFinite(days) || days < 1 || days > 3650) {
      toast.error(t("adminSync.retentionRange"));
      return;
    }
    saveSettings({ retention_days: Math.round(days) });
  };

  const purgeNow = async () => {
    if (!window.confirm(t("adminSync.confirmPurge"))) return;
    setPurging(true);
    const { data, error } = await (supabase as any).rpc("purge_stripe_sync_log", { _force: true });
    setPurging(false);
    if (error || typeof data!=='number') {
      toast.error(t("adminSync.purgeError"));
      return;
    }
    toast.success(t("adminSync.purged", { count:data ?? 0 }));
    load();
    loadSettings();
  };


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
      toast.error(t("adminSync.exportEmpty"));
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
    const esc = (v: unknown) => safeCsv([[v]]).slice(1);
    const csv = [
      head.join(","),
      ...visible.map((r) =>
        [
          new Date(r.created_at).toISOString(),
          ACTION_LABEL[r.action] ?? r.action,
          r.success ? t("adminCenter.success") : t("adminCenter.failed"),
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
    toast.success(t("adminSync.exported", { count:visible.length }));
  };

  if (profileLoading) {
    return <p className="text-sm text-muted-foreground">Provjera ovlaštenja…</p>;
  }

  if (!isAdmin) {
    return (
      <Card className="p-6 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <h2 className="text-base font-semibold text-foreground">{t("adminSync.restricted")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("adminSync.adminOnly")}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t("adminSync.title")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("adminSync.description")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setOnlyFailed((v) => !v)}>
            {onlyFailed ? t("adminSync.showAll") : t("adminSync.onlyFailed")}
          </Button>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            {t("adminCenter.refresh")}
          </Button>
          <Button size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-1.5" />
            {t("adminCenter.export")}
          </Button>
        </div>
      </div>

      <SourceStatus state={sourceState} source="stripe_sync_log (≤500)" clock={Date.now()} retry={()=>void load()} />
      {settingsError && <p role="alert" className="text-destructive">{t('adminCenter.error')} · stripe_sync_log_settings</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: t("adminSync.total"), value: stats.total },
          { label: t("adminSync.ok"), value: stats.ok },
          { label: t("adminSync.fail"), value: stats.failed },
          { label: t("adminSync.updated"), value: stats.updated },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-semibold text-foreground">{sourceState.data==null?'—':s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("adminSync.retention")}</h3>
            <p className="text-xs text-muted-foreground">
              {t("adminSync.retentionDesc")}
              {settings?.last_purged_at
                ? t("adminSync.lastPurge", { date:fmt(settings.last_purged_at),count:settings.last_purged_count })
                : " Još nije bilo čišćenja."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t("adminSync.autoPurge")}</span>
            <Switch
              checked={!!settings?.auto_purge_enabled}
              disabled={savingSettings || !settings}
              onCheckedChange={(v) => saveSettings({ auto_purge_enabled: v })}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="number"
            min={1}
            max={3650}
            value={retentionInput}
            onChange={(e) => setRetentionInput(e.target.value)}
            className="w-28"
          />
          <span className="text-sm text-muted-foreground">{t("adminCenter.days", { count:Number(retentionInput) })}</span>
          <Button size="sm" variant="outline" onClick={saveRetention} disabled={savingSettings}>
            <Save className="h-4 w-4 mr-1.5" />
            {t("buttons.save")}
          </Button>
          <Button size="sm" variant="destructive" onClick={purgeNow} disabled={purging}>
            <Trash2 className="h-4 w-4 mr-1.5" />
            {t("adminSync.purgeNow")}
          </Button>
        </div>
      </Card>



      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-3 py-2">{t("adminSync.time")}</th>
              <th className="text-left font-medium px-3 py-2">{t("adminSync.action")}</th>
              <th className="text-left font-medium px-3 py-2">{t("adminCenter.status")}</th>
              <th className="text-left font-medium px-3 py-2">{t("adminSync.admin")}</th>
              <th className="text-left font-medium px-3 py-2">{t("adminSync.user")}</th>
              <th className="text-right font-medium px-3 py-2">{t("adminSync.updated")}</th>
              <th className="text-right font-medium px-3 py-2">{t("adminSync.mismatches")}</th>
              <th className="text-left font-medium px-3 py-2">{t("adminSync.errors")}</th>
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
                    {r.success ? t("adminCenter.success") : t("adminCenter.failed")}
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
                  {t("adminCenter.empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
