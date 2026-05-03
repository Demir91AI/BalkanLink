import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Plus, Crown, Users, Calendar, RefreshCw, Trash2, ChevronDown } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

interface TrialCode {
  id: string;
  code: string;
  description: string | null;
  duration_days: number;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}

const ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://www.balkanlink.de";

type BucketKey = "7" | "30" | "lifetime" | "custom";
const BUCKET_LABELS: Record<BucketKey, string> = {
  "7": "7 dana",
  "30": "30 dana",
  "lifetime": "Lifetime (≥ 365 dana)",
  "custom": "Ostali",
};
const BUCKET_ORDER: BucketKey[] = ["7", "30", "lifetime", "custom"];

function bucketOf(days: number): BucketKey {
  if (days === 7) return "7";
  if (days === 30) return "30";
  if (days >= 365) return "lifetime";
  return "custom";
}

export default function AdminTrialovi() {
  const [codes, setCodes] = useState<TrialCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [redemptionCount, setRedemptionCount] = useState(0);
  const [activeTrialCount, setActiveTrialCount] = useState(0);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();

  // Form
  const [newCode, setNewCode] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDays, setNewDays] = useState(30);
  const [newMaxUses, setNewMaxUses] = useState<string>("");

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    const [codesRes, redemptionsRes, activeRes] = await Promise.all([
      supabase.from("trial_codes").select("*").order("created_at", { ascending: false }),
      supabase.from("trial_redemptions").select("id", { count: "exact", head: true }),
      supabase.from("trial_redemptions").select("id", { count: "exact", head: true }).is("deactivated_at", null).gt("expires_at", new Date().toISOString()),
    ]);
    if (codesRes.error) {
      toast({ title: "Greška pri učitavanju", description: codesRes.error.message, variant: "destructive" });
    } else {
      setCodes((codesRes.data ?? []) as TrialCode[]);
    }
    setRedemptionCount(redemptionsRes.count ?? 0);
    setActiveTrialCount(activeRes.count ?? 0);
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetchCodes(); }, [fetchCodes]);

  const handleCreate = async () => {
    const cleanCode = newCode.trim().toUpperCase();
    if (!cleanCode || !/^[A-Z0-9_-]{3,32}$/.test(cleanCode)) {
      toast({ title: "Nevažeći kod", description: "Koristi 3–32 slova/cifara, _ ili -.", variant: "destructive" });
      return;
    }
    if (newDays < 1 || newDays > 36500) {
      toast({ title: "Nevažeći broj dana", description: "1–36500 dana.", variant: "destructive" });
      return;
    }
    setCreating(true);
    const { error } = await supabase.from("trial_codes").insert({
      code: cleanCode,
      description: newDescription.trim() || null,
      duration_days: newDays,
      max_uses: newMaxUses.trim() ? parseInt(newMaxUses, 10) : null,
    } as any);
    setCreating(false);
    if (error) {
      toast({ title: "Kod već postoji ili greška", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Kod kreiran", description: `${cleanCode} — ${newDays} dana Premium.` });
    setNewCode(""); setNewDescription(""); setNewMaxUses(""); setNewDays(30);
    fetchCodes();
  };

  const deleteCode = async (id: string, code: string, usedCount: number) => {
    const msg = usedCount > 0
      ? `Kod "${code}" je iskorišten ${usedCount}x. Trajno obrisati?\n\n(Postojeći aktivirani trialovi ostaju netaknuti.)`
      : `Trajno obrisati kod "${code}"?`;
    if (!confirm(msg)) return;
    const { error } = await supabase.from("trial_codes").delete().eq("id", id);
    if (error) {
      toast({ title: "Greška pri brisanju", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Kod obrisan", description: code });
      fetchCodes();
    }
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    // Optimistic update — sprečava re-fetch koji uzrokuje skok scrolla.
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, is_active: !currentValue } : c)));
    const { error } = await supabase.from("trial_codes").update({ is_active: !currentValue } as any).eq("id", id);
    if (error) {
      setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, is_active: currentValue } : c)));
      toast({ title: "Greška", description: error.message, variant: "destructive" });
    }
  };

  const copyLink = async (code: string) => {
    const url = `${ORIGIN}/register?trial=${encodeURIComponent(code)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(code);
      setTimeout(() => setCopiedId(null), 2000);
      toast({ title: "Link kopiran", description: url });
    } catch {
      toast({ title: "Greška pri kopiranju", variant: "destructive" });
    }
  };

  const stats = useMemo(() => ({
    total: codes.length,
    active: codes.filter((c) => c.is_active).length,
    redeemed: redemptionCount,
    currentlyActive: activeTrialCount,
  }), [codes, redemptionCount, activeTrialCount]);

  // Grupisanje: bucket → status
  const grouped = useMemo(() => {
    const map: Record<BucketKey, { active: TrialCode[]; paused: TrialCode[]; exhausted: TrialCode[] }> = {
      "7": { active: [], paused: [], exhausted: [] },
      "30": { active: [], paused: [], exhausted: [] },
      "lifetime": { active: [], paused: [], exhausted: [] },
      "custom": { active: [], paused: [], exhausted: [] },
    };
    for (const c of codes) {
      const b = bucketOf(c.duration_days);
      const exhausted = c.max_uses !== null && c.used_count >= c.max_uses;
      if (!c.is_active) map[b].paused.push(c);
      else if (exhausted) map[b].exhausted.push(c);
      else map[b].active.push(c);
    }
    return map;
  }, [codes]);

  const toggleGroup = (key: string) => setOpenGroups((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <SEO title="Influencer trialovi — Admin" description="Upravljanje Premium trial kodovima." />
      <PageNav />
      <div className="container max-w-5xl py-8 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Crown className="h-7 w-7 text-[hsl(var(--gold))]" />
              Influencer trialovi
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Generiši kod, podijeli link, prati iskorištenost.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={fetchCodes} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Aktivnih kodova" value={stats.active} icon={<Crown className="h-4 w-4" />} />
          <StatCard label="Ukupno kodova" value={stats.total} icon={<Calendar className="h-4 w-4" />} />
          <StatCard label="Ukupno aktiviranih" value={stats.redeemed} icon={<Users className="h-4 w-4" />} />
          <StatCard label="Trenutno aktivni trialovi" value={stats.currentlyActive} icon={<Users className="h-4 w-4" />} />
        </div>

        {/* Create — collapsible, default closed */}
        <Card>
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="text-lg font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5" /> Novi kod
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showCreate ? "rotate-180" : ""}`} />
          </button>
          {showCreate && (
            <CardContent className="space-y-4 pt-0">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="code">Kod (npr. AMRA7)</Label>
                  <Input id="code" value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())} placeholder="AMRA7" maxLength={32} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="desc">Opis (interno)</Label>
                  <Input id="desc" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Influencer Amra Bjelić" maxLength={120} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="days">Trajanje (dana, ≥365 = Lifetime)</Label>
                  <Input id="days" type="number" min={1} max={36500} value={newDays} onChange={(e) => setNewDays(parseInt(e.target.value, 10) || 30)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="maxUses">Limit korištenja (prazno = neograničeno)</Label>
                  <Input id="maxUses" type="number" min={1} value={newMaxUses} onChange={(e) => setNewMaxUses(e.target.value)} placeholder="npr. 50" />
                </div>
              </div>
              <Button type="button" onClick={handleCreate} disabled={creating} className="w-full md:w-auto">
                {creating ? "Kreiranje..." : "Kreiraj kod"}
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Groups */}
        {loading ? (
          <p className="text-sm text-muted-foreground">Učitavanje...</p>
        ) : codes.length === 0 ? (
          <p className="text-sm text-muted-foreground">Još nema kreiranih kodova.</p>
        ) : (
          <div className="space-y-3">
            {BUCKET_ORDER.map((bucket) => {
              const g = grouped[bucket];
              const total = g.active.length + g.paused.length + g.exhausted.length;
              if (total === 0) return null;
              return (
                <div key={bucket} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleGroup(bucket)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold">{BUCKET_LABELS[bucket]}</span>
                      <span className="text-xs text-muted-foreground">
                        {g.active.length} aktivni · {g.paused.length} pauzirani · {g.exhausted.length} iskorišteni
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${openGroups[bucket] ? "rotate-180" : ""}`} />
                  </button>
                  {openGroups[bucket] && (
                    <div className="px-4 pb-4 space-y-4 border-t">
                      {g.active.length > 0 && (
                        <StatusSection title="Aktivni" tone="green" codes={g.active} copiedId={copiedId} copyLink={copyLink} toggleActive={toggleActive} deleteCode={deleteCode} />
                      )}
                      {g.paused.length > 0 && (
                        <StatusSection title="Pauzirani" tone="red" codes={g.paused} copiedId={copiedId} copyLink={copyLink} toggleActive={toggleActive} deleteCode={deleteCode} />
                      )}
                      {g.exhausted.length > 0 && (
                        <StatusSection title="Iskorišteni" tone="orange" codes={g.exhausted} copiedId={copiedId} copyLink={copyLink} toggleActive={toggleActive} deleteCode={deleteCode} />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}<span>{label}</span></div>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function StatusSection({
  title, tone, codes, copiedId, copyLink, toggleActive, deleteCode,
}: {
  title: string;
  tone: "green" | "red" | "orange";
  codes: TrialCode[];
  copiedId: string | null;
  copyLink: (code: string) => void;
  toggleActive: (id: string, current: boolean) => void;
  deleteCode: (id: string, code: string, used: number) => void;
}) {
  const toneClass =
    tone === "green" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
    tone === "red" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
    "bg-orange-500/10 text-orange-600 dark:text-orange-400";
  return (
    <div className="space-y-2 pt-3">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${toneClass}`}>{title}</span>
        <span className="text-xs text-muted-foreground">{codes.length}</span>
      </div>
      <div className="space-y-2">
        {codes.map((c) => {
          const link = `${ORIGIN}/register?trial=${encodeURIComponent(c.code)}`;
          return (
            <div key={c.id} className="rounded-lg border bg-background p-3 space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-bold tracking-wider text-[hsl(var(--gold))]">{c.code}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase">{c.duration_days} dana</span>
                  </div>
                  {c.description && <p className="text-xs text-muted-foreground mt-1">{c.description}</p>}
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Iskorišteno: <strong>{c.used_count}</strong>
                    {c.max_uses !== null && <> / {c.max_uses}</>}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={c.is_active} onCheckedChange={() => toggleActive(c.id, c.is_active)} />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => deleteCode(c.id, c.code, c.used_count)}
                    title="Trajno obriši"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5">
                <code className="text-[11px] flex-1 truncate text-muted-foreground">{link}</code>
                <Button type="button" size="sm" variant="ghost" onClick={() => copyLink(c.code)}>
                  {copiedId === c.code ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
