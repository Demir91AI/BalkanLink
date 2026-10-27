import { useTranslation } from "react-i18next";
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
import { LogOut, Crown, Calendar, Settings, AlertTriangle } from "lucide-react";
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
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const daysUntil = (iso?: string | null) => {
  if (!iso) return null;
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

export default function Profil() {
  const { t: tPlus } = useTranslation("plus");
  const { user, isPremium, subscriptionEnd, signOut, profileLoading, displayName } = useAuth();
  const { subscriptionTier } = useSubscription();
  const navigate = useNavigate();
  const [editName, setEditName] = useState(displayName);
  const [saving, setSaving] = useState(false);
  const [details, setDetails] = useState<SubDetails | null>(null);

  // Tihi background fetch — samo da dobijemo datum naredne naplate iz Stripe-a.
  // Bez UI feedbacka: bez toasta, bez "Osvježi", bez audit log-a.
  useEffect(() => {
    if (!user || !isPremium) return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("check-subscription");
        if (cancelled || error || !data || data.error) return;
        setDetails(data as SubDetails);
      } catch {
        // namjerno tiho — UI fallback koristi subscriptionEnd iz AuthContext-a
      }
    })();
    return () => {
      cancelled = true;
    };
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

  const initials = (displayName || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("") || "?";

  return (
    <>
      <PageNav />
      <div className="container max-w-lg py-10">
        <Card className="border-border/60 bg-card/80 backdrop-blur overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold/70 text-base font-semibold text-primary shadow-sm ring-1 ring-gold/30">
                  {initials}
                </div>
                {isPremium && (
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold ring-2 ring-card">
                    <Crown className="h-3 w-3 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg leading-tight truncate">{displayName}</CardTitle>
                <p className="mt-0.5 text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
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
                      {tPlus("unlockNote")}
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
                  {tPlus("unlockCta")}
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
