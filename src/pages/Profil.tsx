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
import { LogOut, Crown, User, Calendar, RefreshCw, Settings, AlertTriangle, CheckCircle2, History, XCircle, Receipt } from "lucide-react";
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

              {lastError && !isPremium && (
                <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] text-muted-foreground flex items-start gap-2">
                  <RefreshCw className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500/70" />
                  <p>
                    Status se osvježava… Ako Premium nije aktivan u par minuta, klikni{" "}
                    <span className="font-medium text-foreground">Osvježi status</span>.
                  </p>
                </div>
              )}
              {lastError && isPremium && (
                <p className="text-[10px] text-muted-foreground/60 italic">
                  Premium status potvrđen iz tvog naloga.
                </p>
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

              {auditLog.length > 0 && (
                <div className="rounded-md border border-border/40 bg-background/40 p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/90">
                      <History className="h-3 w-3" />
                      Historija sinhronizacija
                      <span className="text-muted-foreground/70 font-normal">
                        ({auditLog.length}/{AUDIT_MAX})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAuditLog([]);
                        saveAudit([]);
                      }}
                      className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Očisti
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {auditLog.map((entry, idx) => {
                      const ts = new Date(entry.at);
                      return (
                        <li
                          key={`${entry.at}-${idx}`}
                          className="flex items-start gap-2 text-[11px] rounded border border-border/30 bg-muted/20 px-2 py-1.5"
                        >
                          {entry.ok ? (
                            <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-emerald-500/90" />
                          ) : (
                            <XCircle className="h-3 w-3 mt-0.5 shrink-0 text-destructive" />
                          )}
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-medium text-foreground">
                                {entry.ok ? "Uspjeh" : "Greška"}
                                {entry.ok && entry.status && (
                                  <span className="ml-1 text-muted-foreground font-normal">
                                    · Stripe:{" "}
                                    <span className={entry.subscribed ? "text-emerald-500/90" : "text-muted-foreground"}>
                                      {entry.status}
                                    </span>
                                  </span>
                                )}
                              </span>
                              <span className="text-muted-foreground/70 text-[10px]">
                                {ts.toLocaleDateString("bs-BA", { day: "2-digit", month: "2-digit" })}{" "}
                                {ts.toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                                {" · "}{entry.durationMs}ms
                              </span>
                            </div>
                            {!entry.ok && (
                              <div className="text-destructive/90 break-words">
                                <span className="font-mono text-[10px] uppercase">{entry.errorCode}</span>
                                {entry.errorMessage && (
                                  <span className="text-destructive/80"> — {entry.errorMessage}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
                onClick={() => navigate("/profil/placanja")}
                variant="outline"
                className="w-full"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Historija plaćanja
              </Button>
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
