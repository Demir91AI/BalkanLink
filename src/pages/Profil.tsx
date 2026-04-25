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
import { LogOut, Crown, User, Calendar, RefreshCw, Settings, AlertTriangle, CheckCircle2 } from "lucide-react";
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

  const loadDetails = async (manual = false) => {
    if (!user) return;
    setRefreshing(true);
    setLastError(null);
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      if (error) throw error;
      if (data?.error) throw new Error(String(data.error));
      if (data) setDetails(data as SubDetails);
      setLastSyncedAt(new Date());
      if (manual) {
        toast({
          title: "Status osvježen",
          description: "Pretplata je uspješno sinhronizirana sa Stripe-om.",
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Nepoznata greška";
      console.error("check-subscription error", e);
      setLastError(msg);
      if (manual) {
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

            {/* Status sekcija */}
            <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">Status pretplate</p>
                <Button
                  onClick={() => loadDetails(true)}
                  disabled={refreshing}
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                  aria-label="Osvježi status pretplate"
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${refreshing ? "animate-spin" : ""}`} />
                  {refreshing ? "Sinhronizujem..." : "Osvježi status"}
                </Button>
              </div>

              {lastError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-[11px] text-destructive flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <div className="space-y-0.5 min-w-0">
                    <p className="font-medium">Sinhronizacija sa Stripe-om nije uspjela</p>
                    <p className="text-destructive/80 break-words">{lastError}</p>
                  </div>
                </div>
              )}

              {!lastError && lastSyncedAt && (
                <div className="rounded-md border border-emerald-500/25 bg-emerald-500/5 p-2.5 text-[11px] flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500/90" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      Sinhronizacija uspješna
                    </p>
                    <div className="space-y-0.5 text-muted-foreground">
                      <p>
                        Status:{" "}
                        {details?.subscribed ? (
                          willCancel ? (
                            <span className="font-medium text-amber-500/90">Aktivan (otkazana obnova)</span>
                          ) : (
                            <span className="font-medium text-emerald-500/90">Aktivan (Premium)</span>
                          )
                        ) : (
                          <span className="font-medium text-muted-foreground">Neaktivan (Free)</span>
                        )}
                      </p>
                      {endDate && (
                        <p>
                          {willCancel || !details?.subscribed ? "Premium istječe" : "Sljedeća naplata"}:{" "}
                          <span className="font-medium text-foreground">{formatDate(endDate)}</span>
                          {typeof daysLeft === "number" && (
                            <span className="text-muted-foreground/70">
                              {" "}({daysLeft} {daysLeft === 1 ? "dan" : "dana"})
                            </span>
                          )}
                        </p>
                      )}
                      <p className="text-muted-foreground/70 text-[10px] pt-0.5">
                        Provjereno u {lastSyncedAt.toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {profileLoading ? (
                <span className="text-sm text-muted-foreground">Učitavanje...</span>
              ) : isPremium ? (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]">
                      <Crown className="h-3 w-3 mr-1" /> {planLabel}
                    </Badge>
                    {priceLabel && (
                      <span className="text-xs text-muted-foreground">
                        {priceLabel} / {isYearly ? "godišnje" : "mjesečno"}
                      </span>
                    )}
                  </div>

                  <div className="rounded-md border border-border/40 bg-background/40 p-3 space-y-2 text-sm">
                    <p className="text-foreground/90 leading-relaxed">
                      Trenutno koristiš{" "}
                      <span className="font-semibold text-[hsl(var(--gold))]">{planLabel}</span> pretplatu.
                    </p>

                    {endDate && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          {willCancel ? (
                            <>
                              <p className="text-amber-500/90 font-medium">
                                Pretplata otkazana
                              </p>
                              <p>
                                Premium pristup ostaje aktivan do{" "}
                                <span className="font-medium text-foreground">{formatDate(endDate)}</span>.
                                Nakon toga prelaziš na Free.
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                Sljedeća automatska naplata:{" "}
                                <span className="font-medium text-foreground">{formatDate(endDate)}</span>
                              </p>
                              {typeof daysLeft === "number" && daysLeft <= 7 && (
                                <p className="text-amber-500/90">
                                  Obnova za {daysLeft} {daysLeft === 1 ? "dan" : "dana"}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {!willCancel && (
                      <div className="flex items-start gap-2 text-[11px] text-muted-foreground/80 pt-1 border-t border-border/30">
                        <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-emerald-500/80" />
                        <p>
                          Auto-renewal je aktivan. Možeš ga otkazati u svako doba preko portala
                          — pristup ostaje do kraja perioda.
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handlePortal}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Settings className="h-3.5 w-3.5 mr-2" />
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
            </div>

            <div className="space-y-2 pt-2">
              {!isPremium && (
                <Button
                  onClick={() => navigate("/paketi")}
                  className="w-full bg-[hsl(var(--gold))] text-[#0f1f3d] hover:opacity-90 font-bold"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
