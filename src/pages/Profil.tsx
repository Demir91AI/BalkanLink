import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Crown, User, Calendar, Settings, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { openCustomerPortal, STRIPE_PRODUCT_IDS } from "@/lib/stripe";
import { toast } from "@/hooks/use-toast";

interface SubDetails {
  subscribed: boolean;
  product_id?: string | null;
  price_id?: string | null;
  subscription_end?: string | null;
  interval?: "month" | "year" | null;
  cancel_at_period_end?: boolean;
  amount?: number | null;
  currency?: string | null;
}

interface AuditEntry {
  at: string;
  ok: boolean;
  subscribed?: boolean;
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  durationMs: number;
}

const AUDIT_STORAGE_KEY = "premium_sync_audit_v1";
const AUDIT_MAX = 5;

const loadAudit = (): AuditEntry[] => {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, AUDIT_MAX) : [];
  } catch {
    return [];
  }
};

const saveAudit = (entries: AuditEntry[]) => {
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(entries.slice(0, AUDIT_MAX)));
  } catch {
    // ignore quota errors
  }
};

const formatPrice = (amount?: number | null, currency?: string | null) => {
  if (!amount || !currency) return null;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

const formatDate = (iso?: string | null) => {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("bs-BA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const daysUntil = (iso?: string | null) => {
  if (!iso) return null;
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

export default function Profil() {
  const { user, isPremium, subscriptionEnd, signOut, profileLoading, displayName } = useAuth();
  const { subscriptionTier } = useSubscription();
  const navigate = useNavigate();
  const [editName, setEditName] = useState(displayName);
  const [saving, setSaving] = useState(false);
  const [details, setDetails] = useState<SubDetails | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(() => loadAudit());

  const recordAudit = (entry: AuditEntry) => {
    setAuditLog((prev) => {
      const next = [entry, ...prev].slice(0, AUDIT_MAX);
      saveAudit(next);
      return next;
    });
  };

  const loadDetails = async (manual = false) => {
    if (!user) return;
    setRefreshing(true);
    setLastError(null);
    const startedAt = performance.now();
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      if (error) throw error;
      if (data?.error) throw new Error(String(data.error));
      if (data) setDetails(data as SubDetails);
      setLastSyncedAt(new Date());
      if (manual) {
        recordAudit({
          at: new Date().toISOString(),
          ok: true,
          subscribed: !!data?.subscribed,
          status: data?.subscribed
            ? (data?.cancel_at_period_end ? "active_canceling" : "active")
            : "inactive",
          durationMs: Math.round(performance.now() - startedAt),
        });
        toast({
          title: "Status osvježen",
          description: "Pretplata je uspješno sinhronizirana sa Stripe-om.",
        });
      }
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : "Nepoznata greška";
      const code = e?.code || e?.name || (e?.status ? `HTTP_${e.status}` : "UNKNOWN");
      console.error("check-subscription error", e);
      setLastError(msg);
      if (manual) {
        recordAudit({
          at: new Date().toISOString(),
          ok: false,
          errorCode: String(code),
          errorMessage: msg,
          durationMs: Math.round(performance.now() - startedAt),
        });
        toast({
          title: "Sinhronizacija nije uspjela",
          description: msg,
          variant: "destructive",
        });
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user && isPremium) loadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isPremium]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const saveName = async () => {
    if (!user || editName.trim() === displayName) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({ first_name: editName.trim() } as any)
      .eq("id", user.id);
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handlePortal = async () => {
    try {
      await openCustomerPortal();
    } catch {
      toast({ title: "Greška", description: "Pokušajte ponovo.", variant: "destructive" });
    }
  };

  const isYearly = details?.interval === "year"
    || details?.product_id === STRIPE_PRODUCT_IDS.PREMIUM_YEARLY;
  const planLabel = isPremium
    ? isYearly ? "Premium Godišnji" : "Premium Mjesečni"
    : "Free";
  const priceLabel = formatPrice(details?.amount, details?.currency);
  const endDate = details?.subscription_end ?? subscriptionEnd ?? null;
  const daysLeft = daysUntil(endDate);
  const willCancel = details?.cancel_at_period_end === true;

  return (
    <>
      <PageNav />
      <div className="container max-w-lg py-12">
        <Card className="border-border/60 bg-card/80 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Dobro došao/la, {displayName} 👋</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-3 space-y-1.5">
              <Label htmlFor="editName" className="text-xs text-muted-foreground">Ime</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={saveName}
                placeholder="Tvoje ime"
                className="h-9"
              />
              <p className="text-[11px] text-muted-foreground">
                {saving ? "Čuvam..." : "Automatski se čuva"}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {profileLoading ? (
                <span className="text-sm text-muted-foreground">Učitavanje...</span>
              ) : isPremium ? (
                <>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Badge className="bg-gold text-gold-foreground hover:bg-gold">
                      <Crown className="h-3 w-3 mr-1" /> {planLabel}
                    </Badge>
                    {priceLabel && (
                      <span className="text-xs text-muted-foreground">
                        {priceLabel} / {isYearly ? "godišnje" : "mjesečno"}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={handlePortal}
                    className="w-full bg-gold text-gold-foreground hover:opacity-90 font-bold"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Upravljaj pretplatom
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Free</Badge>
                    <span className="text-xs text-muted-foreground">Osnovni pristup</span>
                  </div>
                  <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-foreground/80 flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500/80" />
                    <p>
                      Premium sadržaj (formulari, Smart Guide, vize, asistent bez limita) trenutno nije aktivan.
                    </p>
                  </div>
                </>
              )}

              {isPremium && endDate && (
                <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-3 flex items-start gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <p>
                    {willCancel ? "Premium pristup ostaje aktivan do" : "Sljedeća automatska naplata"}:{" "}
                    <span className="font-medium text-foreground">{formatDate(endDate)}</span>
                    {typeof daysLeft === "number" && (
                      <span className="text-muted-foreground/70"> ({daysLeft} {daysLeft === 1 ? "dan" : "dana"})</span>
                    )}
                  </p>
                </div>
              )}

              {!isPremium && (
                <Button
                  onClick={() => navigate("/paketi")}
                  className="w-full bg-gold text-gold-foreground hover:opacity-90 font-bold"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Nadogradi na Premium
                </Button>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Odjavi se
              </Button>

              {/* Suptilna disclosure sekcija — GDPR (čl. 15 i 17). Namjerno tihana. */}
              <details className="group pt-3 mt-1 border-t border-border/30">
                <summary className="cursor-pointer text-[11px] text-muted-foreground/70 hover:text-muted-foreground transition-colors list-none flex items-center justify-center gap-1.5 select-none">
                  <span>Postavke računa i privatnost</span>
                  <span className="text-muted-foreground/40 group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <div className="pt-2.5 space-y-1.5 text-[11px] text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/moji-podaci")}
                    className="block w-full text-muted-foreground/70 hover:text-foreground transition-colors py-1"
                  >
                    Preuzmi svoje podatke <span className="text-muted-foreground/40">(GDPR čl. 15)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/moji-podaci")}
                    className="block w-full text-muted-foreground/70 hover:text-destructive/80 transition-colors py-1"
                  >
                    Trajno obriši račun
                  </button>
                </div>
              </details>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
