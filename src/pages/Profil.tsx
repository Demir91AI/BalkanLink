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

  const loadDetails = async () => {
    if (!user) return;
    setRefreshing(true);
    try {
      const { data } = await supabase.functions.invoke("check-subscription");
      if (data) setDetails(data as SubDetails);
    } catch (e) {
      console.error("check-subscription error", e);
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
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Status pretplate</p>
                {isPremium && (
                  <button
                    onClick={loadDetails}
                    disabled={refreshing}
                    className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    aria-label="Osvježi status"
                  >
                    <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
                    Osvježi
                  </button>
                )}
              </div>

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
