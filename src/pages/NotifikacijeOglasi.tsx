import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageNav from "@/components/navigation/PageNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Briefcase, Wrench, Home, ShoppingBag, Package, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { key: "sve", label: "Sve kategorije", icon: Bell, description: "Primaj obavijest za svaku novu objavu" },
  { key: "posao", label: "Posao i karijera", icon: Briefcase, description: "Ponude za posao, traženje radnika" },
  { key: "usluge", label: "Usluge", icon: Wrench, description: "Majstori, prijevoz, prevodioci..." },
  { key: "stanovanje", label: "Stanovanje", icon: Home, description: "Stanovi, sobe, zajedničko stanovanje" },
  { key: "kupoprodaja", label: "Prodaja / Kupovina", icon: ShoppingBag, description: "Kupujem, prodajem, poklanjam" },
  { key: "ostalo", label: "Ostalo", icon: Package, description: "Sve ostalo" },
] as const;

type Prefs = Record<string, boolean>;

export default function NotifikacijeOglasi() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<Prefs>({});
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { from: "/profil/notifikacije" } });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("classifieds_notification_preferences" as any)
        .select("category, enabled")
        .eq("user_id", user.id);
      const map: Prefs = {};
      CATEGORIES.forEach((c) => (map[c.key] = false));
      (data ?? []).forEach((row: any) => {
        map[row.category] = row.enabled;
      });
      setPrefs(map);
      setLoadingPrefs(false);
    })();
  }, [user]);

  const toggleCategory = async (category: string, enabled: boolean) => {
    if (!user) return;
    setSaving(category);

    let updates: { key: string; value: boolean }[] = [];

    if (category === "sve") {
      // Toggle all categories to match
      updates = CATEGORIES.map((c) => ({ key: c.key, value: enabled }));
    } else {
      updates = [{ key: category, value: enabled }];
      // If turning off one while "sve" is on, turn off "sve"
      if (!enabled && prefs["sve"]) {
        updates.push({ key: "sve", value: false });
      }
      // If turning on all individual ones, turn on "sve" too
      if (enabled) {
        const allOn = CATEGORIES
          .filter((c) => c.key !== "sve" && c.key !== category)
          .every((c) => prefs[c.key]);
        if (allOn) {
          updates.push({ key: "sve", value: true });
        }
      }
    }

    // Optimistic update
    const newPrefs = { ...prefs };
    updates.forEach((u) => (newPrefs[u.key] = u.value));
    setPrefs(newPrefs);

    // Upsert each preference
    for (const u of updates) {
      await supabase.from("classifieds_notification_preferences" as any).upsert(
        { user_id: user.id, category: u.key, enabled: u.value } as any,
        { onConflict: "user_id,category" }
      );
    }

    setSaving(null);
    toast.success("Postavke spremljene ✓");
  };

  if (authLoading || loadingPrefs) {
    return (
      <>
        <PageNav />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageNav />
      <div className="container max-w-lg py-10 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-[hsl(var(--gold))]" />
            Email notifikacije
          </h1>
          <p className="text-sm text-muted-foreground">
            Primaj email kada se objavi novi oglas u kategorijama koje pratiš.
          </p>
        </div>

        <Card className="border-border/60">
          <CardContent className="divide-y divide-border/40 p-0">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isSve = cat.key === "sve";
              return (
                <div
                  key={cat.key}
                  className={`flex items-center justify-between px-5 py-4 ${
                    isSve ? "bg-muted/30" : ""
                  } ${i === 0 ? "rounded-t-lg" : ""}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isSve ? "bg-[hsl(var(--gold))]/10" : "bg-muted"
                    }`}>
                      <Icon className={`h-4 w-4 ${isSve ? "text-[hsl(var(--gold))]" : "text-muted-foreground"}`} />
                    </div>
                    <div className="min-w-0">
                      <Label className={`text-sm font-semibold cursor-pointer ${isSve ? "text-[hsl(var(--gold))]" : ""}`}>
                        {isSve ? "🔔 " : ""}{cat.label}
                      </Label>
                      <p className="text-[11px] text-muted-foreground truncate">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {saving === cat.key && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
                    <Switch
                      checked={!!prefs[cat.key]}
                      onCheckedChange={(v) => toggleCategory(cat.key, v)}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Separator between "Sve" and individual */}
        
        <Card className="border-border/40 bg-muted/20">
          <CardContent className="p-4 flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                📧 Notifikacije se šalju na: <strong className="text-foreground">{user?.email}</strong>
              </p>
              <p>Možeš se odjaviti u svakom trenutku — u svakom emailu postoji link za odjavu.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
