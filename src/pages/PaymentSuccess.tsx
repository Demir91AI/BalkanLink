import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, Crown, AlertTriangle, Loader2, Receipt, Calendar, Hash, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { checkSubscriptionStatus, verifyPaymentSession, type PaymentVerification } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";

type UiStatus = "verifying" | "succeeded" | "pending" | "invalid";

// Polling schedule: quick at first, then back off. Total budget ~30s.
const POLL_DELAYS_MS = [800, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 5000, 5000];

const formatAmount = (minor: number | null | undefined, currency: string | null | undefined) => {
  if (minor == null) return null;
  const major = minor / 100;
  const cur = (currency ?? "EUR").toUpperCase();
  try {
    return new Intl.NumberFormat("bs-BA", { style: "currency", currency: cur }).format(major);
  } catch {
    return `${major.toFixed(2)} ${cur}`;
  }
};

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString("bs-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshSubscription, isPremium } = useAuth();
  const [status, setStatus] = useState<UiStatus>("verifying");
  const [attempt, setAttempt] = useState(0);
  const [details, setDetails] = useState<PaymentVerification | null>(null);
  const cancelledRef = useRef(false);

  const sessionId = searchParams.get("session_id");
  const returnTo = searchParams.get("return_to");
  const safeReturnTo = returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";

  useEffect(() => {
    cancelledRef.current = false;

    if (!sessionId) {
      setStatus("invalid");
      return;
    }

    let timeoutId: number | undefined;

    const poll = async (i: number) => {
      if (cancelledRef.current) return;
      setAttempt(i + 1);

      // Always try to fetch session details (amount/date/transaction id)
      const verification = await verifyPaymentSession(sessionId);
      if (cancelledRef.current) return;
      setDetails(verification);

      if (verification.status === "invalid") {
        setStatus("invalid");
        return;
      }

      if (verification.status === "succeeded") {
        // Sync subscription status if applicable
        try {
          await checkSubscriptionStatus();
          await refreshSubscription();
        } catch { /* ignore */ }
        if (!cancelledRef.current) setStatus("succeeded");
        return;
      }

      // Schedule next attempt or give up
      if (i + 1 < POLL_DELAYS_MS.length) {
        timeoutId = window.setTimeout(() => poll(i + 1), POLL_DELAYS_MS[i]);
      } else if (!cancelledRef.current) {
        setStatus("pending");
      }
    };

    // Short-circuit: if global state already shows premium, mark as succeeded but still fetch details
    if (isPremium) {
      verifyPaymentSession(sessionId).then((v) => {
        if (cancelledRef.current) return;
        setDetails(v);
        setStatus(v.status === "invalid" ? "invalid" : "succeeded");
      });
    } else {
      poll(0);
    }

    return () => {
      cancelledRef.current = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Auto-redirect after success
  useEffect(() => {
    if (status !== "succeeded") return;
    const t = window.setTimeout(() => navigate(safeReturnTo), 6000);
    return () => window.clearTimeout(t);
  }, [status, navigate, safeReturnTo]);

  const retryNow = async () => {
    if (!sessionId) return;
    setStatus("verifying");
    setAttempt(0);
    const v = await verifyPaymentSession(sessionId);
    setDetails(v);
    if (v.status === "succeeded") {
      try {
        await checkSubscriptionStatus();
        await refreshSubscription();
      } catch { /* ignore */ }
      setStatus("succeeded");
    } else if (v.status === "invalid") {
      setStatus("invalid");
    } else {
      setStatus("pending");
    }
  };

  // ── INVALID ────────────────────────────────────────
  if (status === "invalid") {
    return (
      <div className="min-h-screen bg-background">
        <PageNav />
        <div className="container max-w-md py-20 px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Nevalidan pristup</h1>
          <p className="text-muted-foreground mb-8">
            Ova stranica je dostupna samo nakon uspješnog plaćanja.
          </p>
          <Button onClick={() => navigate("/paketi")} className="rounded-xl">
            Pogledaj pakete
          </Button>
        </div>
      </div>
    );
  }

  // ── VERIFYING ──────────────────────────────────────
  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-background">
        <PageNav />
        <div className="container max-w-md py-20 px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10">
            <Loader2 className="h-8 w-8 text-[hsl(var(--gold))] animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Provjeravamo plaćanje…</h1>
          <p className="text-muted-foreground mb-2">
            Sinhronizujemo vaš pristup. Ovo može potrajati nekoliko sekundi.
          </p>
          <p className="text-xs text-muted-foreground">
            Pokušaj {attempt} / {POLL_DELAYS_MS.length}
          </p>
        </div>
      </div>
    );
  }

  const amount = formatAmount(details?.amount, details?.currency);
  const date = formatDate(details?.paid_at);
  const txId = details?.transaction_id ?? details?.session_id ?? null;

  // ── PENDING ────────────────────────────────────────
  if (status === "pending") {
    return (
      <div className="min-h-screen bg-background">
        <PageNav />
        <div className="container max-w-md py-20 px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10">
            <AlertTriangle className="h-8 w-8 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Plaćanje na čekanju</h1>
          <p className="text-muted-foreground mb-2">
            Stripe potvrda još nije stigla do našeg sistema. Aktivacija obično traje do minutu.
          </p>
          <p className="text-xs text-muted-foreground mb-8">
            Pokušajte ponovo za nekoliko sekundi.
          </p>

          {(amount || date || txId) && (
            <div className="rounded-xl border border-border bg-card/50 p-4 text-left text-sm space-y-2 mb-6">
              {amount && (
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Iznos:</span>
                  <span className="font-medium ml-auto">{amount}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Datum:</span>
                  <span className="font-medium ml-auto">{date}</span>
                </div>
              )}
              {txId && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Transakcija:</span>
                  <span className="font-mono text-xs ml-auto truncate max-w-[180px]" title={txId}>{txId}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button
              onClick={retryNow}
              className="rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))]"
            >
              Provjeri ponovo
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/profil")}>
              Idi na profil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── SUCCEEDED ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <PageNav />
      <div className="container max-w-md py-20 px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
          <Check className="h-8 w-8 text-[hsl(var(--success))]" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Plaćanje uspješno!</h1>
        <p className="text-muted-foreground mb-6">
          Hvala vam na povjerenju. Vaš pristup je sada aktiviran.
        </p>

        {(amount || date || txId) && (
          <div className="rounded-xl border border-border bg-card/50 p-4 text-left text-sm space-y-2 mb-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <Receipt className="h-4 w-4 text-[hsl(var(--gold))]" />
              <span className="font-semibold">Detalji plaćanja</span>
            </div>
            {amount && (
              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Iznos:</span>
                <span className="font-medium ml-auto">{amount}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Datum:</span>
                <span className="font-medium ml-auto">{date}</span>
              </div>
            )}
            {txId && (
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Transakcija:</span>
                <span className="font-mono text-xs ml-auto truncate max-w-[180px]" title={txId}>{txId}</span>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground mb-6">Preusmjeravamo vas za 6 sekundi…</p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate(safeReturnTo)}
            className="rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))]"
          >
            <Crown className="mr-2 h-4 w-4" />
            Nastavi na BalkanLink
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={() => navigate("/profil")}>
            Pogledaj svoj plan
          </Button>
        </div>
      </div>
    </div>
  );
}
