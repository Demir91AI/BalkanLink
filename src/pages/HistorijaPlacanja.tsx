import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { checkSubscriptionStatus, initiateCheckout, STRIPE_PRICE_IDS, STRIPE_PRODUCT_IDS } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Crown,
  Calendar,
  Receipt,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentRow {
  id: string;
  provider: string;
  status: string;
  amount: number;
  currency: string;
  transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
}

interface SubInfo {
  subscribed: boolean;
  product_id?: string | null;
  subscription_end?: string | null;
}

const formatPrice = (amount: number, currency: string) => {
  // payments.amount is stored in minor units (cents)
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: (currency || "EUR").toUpperCase(),
  }).format(amount / 100);
};

const formatDateTime = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("bs-BA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (iso?: string | null) => {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("bs-BA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getStatusBadge = (status: string) => {
  const s = status?.toLowerCase() ?? "";
  if (s === "paid" || s === "succeeded" || s === "complete" || s === "completed") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/30">
        <CheckCircle2 className="h-3 w-3 mr-1" /> Plaćeno
      </Badge>
    );
  }
  if (s === "pending" || s === "processing") {
    return (
      <Badge variant="secondary" className="border border-amber-500/30 text-amber-500">
        <Clock className="h-3 w-3 mr-1" /> U obradi
      </Badge>
    );
  }
  if (s === "failed" || s === "canceled" || s === "cancelled") {
    return (
      <Badge variant="destructive" className="bg-destructive/15 text-destructive border-destructive/30">
        <XCircle className="h-3 w-3 mr-1" /> {s === "failed" ? "Neuspjelo" : "Otkazano"}
      </Badge>
    );
  }
  return <Badge variant="outline">{status}</Badge>;
};

/**
 * Animirano popunjavanje progress bara: počinje od 0% i lagano se popunjava
 * do `targetPct` (cca. 900ms ease-out). Re-mount preko parent `key` resetuje
 * animaciju kada se period pretplate promijeni.
 */
function ProgressFill({
  targetPct,
  expiringSoon,
}: {
  targetPct: number;
  expiringSoon: boolean;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setWidth(targetPct));
    return () => window.cancelAnimationFrame(id);
  }, [targetPct]);
  return (
    <div
      className={`h-full rounded-full transition-[width] duration-[900ms] ease-out ${
        expiringSoon ? "bg-amber-500" : "bg-[hsl(var(--gold))]"
      }`}
      style={{ width: `${width}%` }}
    />
  );
}

export default function HistorijaPlacanja() {
  const { user, session, loading: authLoading } = useAuth();
  const { isPremium, expiresAt: profileExpiresAt } = useSubscription();
  const navigate = useNavigate();

  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subInfo, setSubInfo] = useState<SubInfo | null>(null);
  const [subLoading, setSubLoading] = useState(false);

  const [selected, setSelected] = useState<PaymentRow | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Animacija progress bara: kada se `endDate` promijeni (npr. nakon „Osvježi"
  // ili nakon nove uplate), animiramo iz 0% u trenutni postotak i kratko
  // "blicnemo" traku da promjena bude lako uočljiva.
  const prevEndDateRef = useRef<string | null>(null);
  const [progressKey, setProgressKey] = useState(0);
  const [highlightProgress, setHighlightProgress] = useState(false);

  const handleUpgrade = async () => {
    if (!user || checkoutLoading) return;
    setCheckoutLoading(true);
    try {
      await initiateCheckout(STRIPE_PRICE_IDS.PREMIUM_MONTHLY, user.id, "subscription");
    } finally {
      // initiateCheckout otvara Stripe u novom tabu; resetuj stanje da korisnik
      // može ponovo pokrenuti tok ako zatvori tab bez plaćanja.
      setTimeout(() => setCheckoutLoading(false), 1500);
    }
  };

  // Sinhroni guardovi koji rade prije nego React commit-uje state.
  // Sprečavaju duplo otvaranje istog reda kad korisnik brzo klikne više puta.
  const openingRef = useRef<string | null>(null);
  const openTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  // Detektuj promjenu datuma isteka i okini animaciju re-fill + highlight.
  useEffect(() => {
    const next = subInfo?.subscription_end ?? null;
    if (prevEndDateRef.current !== null && prevEndDateRef.current !== next) {
      setProgressKey((k) => k + 1);
      setHighlightProgress(true);
      const t = window.setTimeout(() => setHighlightProgress(false), 1400);
      return () => window.clearTimeout(t);
    }
    prevEndDateRef.current = next;
  }, [subInfo?.subscription_end]);

  const handleRowClick = (p: PaymentRow) => {
    // Blokiraj ako je modal već otvoren za istu transakciju
    if (selected?.id === p.id) return;
    // Blokiraj ako se već priprema bilo koji red (sinhroni ref check)
    if (openingRef.current) return;
    // Blokiraj ako se podaci sinhronizuju
    if (loading || subLoading) return;

    openingRef.current = p.id;
    setOpeningId(p.id);

    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
    }
    openTimerRef.current = window.setTimeout(() => {
      setSelected(p);
      setOpeningId(null);
      openingRef.current = null;
      openTimerRef.current = null;
    }, 180);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelected(null);
      // Resetuj guard kako bi sljedeći klik prošao
      openingRef.current = null;
      setOpeningId(null);
    }
  };

  const copyToClipboard = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success("Kopirano u clipboard");
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    } catch {
      toast.error("Kopiranje nije uspjelo");
    }
  };

  const getStripeUrl = (p: PaymentRow): string | null => {
    if (p.provider?.toLowerCase() !== "stripe" || !p.transaction_id) return null;
    const id = p.transaction_id;
    if (id.startsWith("pi_")) return `https://dashboard.stripe.com/payments/${id}`;
    if (id.startsWith("ch_")) return `https://dashboard.stripe.com/payments/${id}`;
    if (id.startsWith("in_")) return `https://dashboard.stripe.com/invoices/${id}`;
    if (id.startsWith("sub_")) return `https://dashboard.stripe.com/subscriptions/${id}`;
    if (id.startsWith("cs_")) return `https://dashboard.stripe.com/payments/${id}`;
    return null;
  };

  useEffect(() => {
    if (!authLoading && (!user || !session)) {
      navigate("/login");
    }
  }, [authLoading, user, session, navigate]);

  const loadPayments = async () => {
    if (!user || !session) return;

    // Dodatna sigurnosna provjera: re-verifikuj session direktno protiv Supabase-a
    // prije čitanja osjetljivih podataka. Ako je sesija istekla, odjavi.
    const { data: sessData, error: sessErr } = await supabase.auth.getSession();
    const liveUserId = sessData?.session?.user?.id;
    if (sessErr || !liveUserId) {
      setError("Sesija je istekla. Prijavi se ponovo.");
      setPayments([]);
      setLoading(false);
      navigate("/login");
      return;
    }
    if (liveUserId !== user.id) {
      // Spriječi da se podaci jednog korisnika prikažu drugom (account switching race).
      setError("Sigurnosna nepodudarnost sesije.");
      setPayments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const { data, error: dbError } = await (supabase as any)
      .from("payments")
      .select("id, provider, status, amount, currency, transaction_id, paid_at, created_at, user_id")
      .eq("user_id", liveUserId)
      .order("created_at", { ascending: false })
      .limit(100);

    if (dbError) {
      setError(dbError.message);
      setPayments([]);
    } else {
      // Defense-in-depth: čak i ako bi RLS popustio (admin polica), filtriraj
      // klijentski isključivo zapise koji pripadaju trenutnom korisniku.
      const ownOnly = (data ?? []).filter(
        (row: PaymentRow & { user_id?: string }) => row.user_id === liveUserId,
      );
      setPayments(ownOnly as PaymentRow[]);
    }
    setLoading(false);
  };

  const loadSubscription = async () => {
    setSubLoading(true);
    const info = await checkSubscriptionStatus();
    setSubInfo({
      subscribed: info.subscribed,
      product_id: info.product_id ?? null,
      subscription_end: info.subscription_end ?? null,
    });
    setSubLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadPayments();
      loadSubscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Striktni guard: traži i `user` i `session` (access token mora postojati).
  if (authLoading || !user || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Učitavanje...</p>
      </div>
    );
  }

  const isYearly = subInfo?.product_id === STRIPE_PRODUCT_IDS.PREMIUM_YEARLY;
  const planLabel = subInfo?.subscribed ? (isYearly ? "Premium (godišnje)" : "Premium (mjesečno)") : "Free";
  // Fallback: ako Stripe sync nije uspio (npr. customer email mismatch),
  // koristi datum iz `profiles.subscription_expires_at` koji je već sinhronizovan
  // kroz webhook ili admin tool. Time historija prikazuje tačan istek čak i kad
  // direktni Stripe poziv padne.
  const stripeEnd = subInfo?.subscription_end ?? null;
  const profileEndIso = profileExpiresAt ? profileExpiresAt.toISOString() : null;
  const endDate = stripeEnd ?? profileEndIso;
  // Stripe je vraćio aktivnu pretplatu? Ako ne, ali profil kaže Premium sa
  // datumom isteka u budućnosti, tretiramo to kao validan Premium iz baze
  // (npr. nakon webhook obrade, prije nego check-subscription opet uspije).
  const stripeSubscribed = !!subInfo?.subscribed;
  const profileSubscribed =
    isPremium && !!profileExpiresAt && profileExpiresAt.getTime() > Date.now();
  const effectiveSubscribed = stripeSubscribed || profileSubscribed;

  const totalPaid = payments
    .filter((p) => ["paid", "succeeded", "complete", "completed"].includes((p.status ?? "").toLowerCase()))
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  // Plan label nakon što znamo effectiveSubscribed (može biti Premium iz baze
  // čak i kad Stripe sync trenutno ne odgovara).
  const displayPlanLabel = effectiveSubscribed
    ? stripeSubscribed
      ? planLabel
      : "Premium"
    : "Free";

  return (
    <>
      <PageNav />

      <div className="container max-w-5xl mx-auto px-4 pt-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Historija plaćanja
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pregled svih transakcija i trenutni period pretplate.
        </p>

        {/* Lični status pretplate — vidljiv isključivo prijavljenom korisniku
            (admin grana je već vraćena iznad). Daje trenutnu, jasnu informaciju
            "jesam li Premium" bez potrebe za skrolovanjem do kartice ispod. */}
        <div className="mt-3 flex items-center gap-2 flex-wrap" aria-live="polite">
          <span className="text-xs text-muted-foreground">Tvoj status:</span>
          {subLoading ? (
            <Badge variant="outline" className="gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Provjera...
            </Badge>
          ) : isPremium ? (
            <Badge className="bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))] gap-1">
              <Crown className="h-3 w-3" />
              Premium aktivan
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <XCircle className="h-3 w-3" />
              Free nalog
            </Badge>
          )}
          {!subLoading && isPremium && endDate && (
            <span className="text-[11px] text-muted-foreground">
              do <span className="font-medium text-foreground">{formatDate(endDate)}</span>
            </span>
          )}
          {!subLoading && !isPremium && (
            <Button
              size="sm"
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="h-6 px-2 text-[11px] ml-1 bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]/90"
            >
              {checkoutLoading ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Crown className="h-3 w-3 mr-1" />
              )}
              Uključi Premium
            </Button>
          )}
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/profil">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Nazad na profil
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              loadPayments();
              loadSubscription();
            }}
            disabled={loading || subLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading || subLoading ? "animate-spin" : ""}`} />
            Osvježi
          </Button>
        </div>

        {/* Kompaktna napomena: šta otključava Premium + trenutni status */}
        <div
          className={`rounded-md border p-3 text-xs flex items-start gap-2 ${
            isPremium
              ? "border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5"
              : "border-border/50 bg-muted/20"
          }`}
          aria-live="polite"
        >
          {isPremium ? (
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--gold))]" />
          ) : (
            <Crown className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          )}
          <div className="space-y-1 flex-1">
            <p className="font-medium text-foreground">
              {subLoading
                ? "Provjeravam Premium status..."
                : isPremium
                  ? "Premium pristup je aktivan."
                  : "Premium pristup trenutno nije aktivan."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Premium otključava sve Smart Guide korake, kompletne Musterformulare,
              neograničene upite Asistentu, Dokumenten-Check analizu i sve premium šablone.
            </p>
            {isPremium && !subLoading && endDate && (() => {
              const end = new Date(endDate);
              const now = Date.now();
              const daysLeft = Math.max(
                0,
                Math.ceil((end.getTime() - now) / (1000 * 60 * 60 * 24)),
              );
              const expiringSoon = daysLeft <= 7;

              // Početak perioda: pokušaj iz posljednje uspješne uplate (paid_at),
              // u suprotnom procijeni iz tipa plana (mjesečno=30d, godišnje=365d).
              const lastPaid = payments.find(
                (p) =>
                  ["paid", "succeeded", "complete", "completed"].includes(
                    (p.status ?? "").toLowerCase(),
                  ) && p.paid_at,
              );
              const planSpanDays = isYearly ? 365 : 30;
              const periodStartMs = lastPaid?.paid_at
                ? new Date(lastPaid.paid_at).getTime()
                : end.getTime() - planSpanDays * 24 * 60 * 60 * 1000;
              const totalMs = Math.max(1, end.getTime() - periodStartMs);
              const elapsedMs = Math.min(totalMs, Math.max(0, now - periodStartMs));
              const usedPct = Math.round((elapsedMs / totalMs) * 100);
              const remainingPct = Math.max(0, Math.min(100, 100 - usedPct));

              return (
                <div className="mt-2 space-y-1.5">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[11px] ${
                      expiringSoon
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                        : "border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 text-foreground"
                    }`}
                  >
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span>
                      Pristup ističe:{" "}
                      <span className="font-semibold">{formatDate(endDate)}</span>
                      {" "}
                      <span className="text-muted-foreground">
                        ({daysLeft === 0
                          ? "ističe danas"
                          : daysLeft === 1
                            ? "još 1 dan"
                            : `još ${daysLeft} dana`})
                      </span>
                    </span>
                  </div>

                  {/* Vremenska traka — vizuelni odnos iskorišteno vs. preostalo
                      za tekući obračunski period. Animira se kad se promijeni
                      `endDate` (re-fill iz 0% + suptilan glow). */}
                  <div className="space-y-1">
                    <div
                      className={`relative h-1.5 w-full rounded-full bg-muted/50 overflow-hidden transition-shadow duration-500 ${
                        highlightProgress
                          ? expiringSoon
                            ? "ring-2 ring-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.45)]"
                            : "ring-2 ring-[hsl(var(--gold))]/40 shadow-[0_0_12px_hsl(var(--gold)/0.45)]"
                          : ""
                      }`}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={remainingPct}
                      aria-label="Preostalo vrijeme Premium perioda"
                    >
                      <ProgressFill
                        key={progressKey}
                        targetPct={remainingPct}
                        expiringSoon={expiringSoon}
                      />
                      {highlightProgress && (
                        <span
                          className="pointer-events-none absolute inset-0 rounded-full bg-foreground/10 animate-pulse"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{formatDate(new Date(periodStartMs).toISOString())}</span>
                      <span>
                        {remainingPct}% perioda preostalo
                        {!lastPaid && " (procjena)"}
                      </span>
                      <span>{formatDate(endDate)}</span>
                    </div>

                    {/* Obnovi Premium CTA — pojavljuje se kad je preostalo
                        ≤ 7 dana ili kad je period već istekao. Koristi isti
                        Stripe checkout tok kao i početna aktivacija. */}
                    {expiringSoon && (
                      <div className="flex items-center gap-2 flex-wrap pt-1.5">
                        <Button
                          size="sm"
                          onClick={handleUpgrade}
                          disabled={checkoutLoading}
                          className="h-7 px-2.5 text-[11px] bg-amber-500 text-[#0f1f3d] hover:bg-amber-500/90 font-medium"
                        >
                          {checkoutLoading ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <RefreshCw className="h-3 w-3 mr-1" />
                          )}
                          Obnovi Premium
                        </Button>
                        <span className="text-[10px] text-muted-foreground">
                          {daysLeft === 0
                            ? "Period je istekao — aktiviraj ponovo da zadržiš pristup."
                            : `Period ističe za ${daysLeft === 1 ? "1 dan" : `${daysLeft} dana`} — obnovi unaprijed.`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
            {isPremium && !subLoading && !endDate && (
              <p className="mt-2 text-[11px] text-muted-foreground italic">
                Datum isteka nije dostupan (npr. trajni admin pristup ili jednokratna aktivacija).
              </p>
            )}
            {!isPremium && !subLoading && (
              <div className="flex items-center gap-3 flex-wrap pt-1">
                <Button
                  size="sm"
                  onClick={handleUpgrade}
                  disabled={checkoutLoading}
                  className="h-8 bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]/90 font-medium"
                >
                  {checkoutLoading ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  ) : (
                    <Crown className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  Uključi Premium — 9,99€/mj
                </Button>
                <Link
                  to="/paketi"
                  className="text-[11px] text-muted-foreground hover:text-foreground hover:underline"
                >
                  Uporedi sve pakete →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Trenutni premium period */}
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              Trenutni period pretplate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subLoading ? (
              <p className="text-sm text-muted-foreground">Sinhronizujem sa Stripe-om...</p>
            ) : effectiveSubscribed ? (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]">
                    <Crown className="h-3 w-3 mr-1" /> {displayPlanLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Aktivan</span>
                </div>
                {endDate && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>
                      Sljedeća automatska naplata / istek perioda:{" "}
                      <span className="font-medium text-foreground">{formatDate(endDate)}</span>
                    </p>
                  </div>
                )}
                {!stripeSubscribed && (
                  <p className="text-[11px] text-muted-foreground italic">
                    Premium status je potvrđen iz tvog naloga. Lista pojedinačnih
                    transakcija se trenutno ne može dohvatiti sa Stripe-a — pokušaj
                    „Osvježi" za par sekundi.
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Free</Badge>
                <span className="text-xs text-muted-foreground">
                  Nemaš aktivnu Premium pretplatu.
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabela plaćanja */}
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <CardTitle className="flex items-center gap-2 text-base">
                <Receipt className="h-4 w-4 text-primary" />
                Sve transakcije
                <span className="text-xs font-normal text-muted-foreground">
                  ({payments.length})
                </span>
              </CardTitle>
              {totalPaid > 0 && (
                <span className="text-xs text-muted-foreground">
                  Ukupno plaćeno:{" "}
                  <span className="font-semibold text-foreground">
                    {formatPrice(totalPaid, payments[0]?.currency ?? "EUR")}
                  </span>
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Greška pri učitavanju historije plaćanja</p>
                  <p className="text-destructive/80 break-words">{error}</p>
                </div>
              </div>
            )}

            {loading ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Učitavanje transakcija...</p>
            ) : payments.length === 0 ? (
              <div className="rounded-md border border-dashed border-border/50 bg-muted/20 p-8 text-center space-y-2">
                <Receipt className="h-8 w-8 mx-auto text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  Još nemaš zabilježenih plaćanja.
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Kada izvršiš prvu uplatu (Premium ili jednokratni paket), pojavit će se ovdje.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Datum</TableHead>
                      <TableHead className="text-xs">Provider</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">Iznos</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Plaćeno</TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p) => {
                      const isOpening = openingId === p.id;
                      const isDisabled = loading || subLoading || (!!openingId && !isOpening);
                      return (
                        <TableRow
                          key={p.id}
                          onClick={() => handleRowClick(p)}
                          aria-disabled={isDisabled}
                          className={`transition-colors ${
                            isDisabled
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer hover:bg-muted/40"
                          } ${isOpening ? "bg-muted/30" : ""}`}
                        >
                          <TableCell className="text-xs whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              {isOpening && (
                                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                              )}
                              {formatDateTime(p.created_at)}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs capitalize">{p.provider}</TableCell>
                          <TableCell>{getStatusBadge(p.status)}</TableCell>
                          <TableCell className="text-xs text-right font-medium whitespace-nowrap">
                            {formatPrice(p.amount, p.currency)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground hidden md:table-cell whitespace-nowrap">
                            {formatDateTime(p.paid_at)}
                          </TableCell>
                          <TableCell className="text-[10px] font-mono text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                            {p.transaction_id || "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-[11px] text-muted-foreground/70 text-center">
          Plaćanja se sinhronizuju automatski preko Stripe webhook-a. Ako neka transakcija nedostaje,
          klikni „Osvježi" ili koristi „Upravljaj pretplatom" na profilu.
          {payments.length > 0 && (
            <> Klikni na red u tabeli za detalje transakcije.</>
          )}
        </p>
      </div>

      <Dialog open={!!selected} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Receipt className="h-4 w-4 text-primary" />
              Detalji transakcije
            </DialogTitle>
            <DialogDescription className="text-xs">
              Kompletni podaci o uplati zabilježeni u sistemu.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selected.status)}
                  <span className="text-xs text-muted-foreground capitalize">
                    {selected.provider}
                  </span>
                </div>
                <span className="text-lg font-semibold">
                  {formatPrice(selected.amount, selected.currency)}
                </span>
              </div>

              <div className="rounded-md border border-border/40 divide-y divide-border/40">
                <div className="flex items-start justify-between gap-3 p-3">
                  <span className="text-xs text-muted-foreground">Kreirano</span>
                  <span className="text-xs font-medium text-right">
                    {formatDateTime(selected.created_at)}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 p-3">
                  <span className="text-xs text-muted-foreground">Plaćeno (paid_at)</span>
                  <span className="text-xs font-medium text-right">
                    {formatDateTime(selected.paid_at)}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 p-3">
                  <span className="text-xs text-muted-foreground">Raw status</span>
                  <code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-muted text-foreground">
                    {selected.status || "—"}
                  </code>
                </div>
                <div className="flex items-start justify-between gap-3 p-3">
                  <span className="text-xs text-muted-foreground">Valuta</span>
                  <span className="text-xs font-medium uppercase">
                    {selected.currency || "EUR"}
                  </span>
                </div>
                <div className="p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">Transaction ID</span>
                    {selected.transaction_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px]"
                        onClick={() =>
                          copyToClipboard(selected.transaction_id!, "txid")
                        }
                      >
                        {copied === "txid" ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        Kopiraj
                      </Button>
                    )}
                  </div>
                  <code className="block text-[11px] font-mono break-all bg-muted/50 rounded px-2 py-1.5">
                    {selected.transaction_id || "—"}
                  </code>
                </div>
                <div className="p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">Interni ID</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-[11px]"
                      onClick={() => copyToClipboard(selected.id, "id")}
                    >
                      {copied === "id" ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <Copy className="h-3 w-3 mr-1" />
                      )}
                      Kopiraj
                    </Button>
                  </div>
                  <code className="block text-[11px] font-mono break-all bg-muted/50 rounded px-2 py-1.5">
                    {selected.id}
                  </code>
                </div>
              </div>

              {getStripeUrl(selected) ? (
                <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-xs flex items-start gap-2">
                  <ExternalLink className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Otvori u Stripe Dashboard-u</p>
                    <p className="text-muted-foreground mt-0.5">
                      Pristup detaljima transakcije zahtijeva admin pristup Stripe računu.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-muted-foreground/80">
                  Stripe link nije dostupan za ovu transakciju (provider „{selected.provider}" ili nedostaje ID).
                </p>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            {selected && getStripeUrl(selected) && (
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <a
                  href={getStripeUrl(selected)!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Otvori u Stripe-u
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDialogOpenChange(false)}
            >
              Zatvori
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
