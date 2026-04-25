import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, Crown, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { checkSubscriptionStatus } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";

type Status = "verifying" | "confirmed" | "pending" | "invalid";

// Polling schedule: quick at first, then back off. Total budget ~30s.
const POLL_DELAYS_MS = [800, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 5000, 5000];

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshSubscription, isPremium } = useAuth();
  const [status, setStatus] = useState<Status>("verifying");
  const [attempt, setAttempt] = useState(0);
  const cancelledRef = useRef(false);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    cancelledRef.current = false;

    if (!sessionId) {
      setStatus("invalid");
      return;
    }

    // If global state already shows premium, short-circuit immediately.
    if (isPremium) {
      setStatus("confirmed");
      return;
    }

    let timeoutId: number | undefined;

    const poll = async (i: number) => {
      if (cancelledRef.current) return;
      setAttempt(i + 1);

      try {
        const result = await checkSubscriptionStatus();
        if (cancelledRef.current) return;

        if (result.subscribed) {
          // Sync the AuthContext so the rest of the app sees premium too.
          await refreshSubscription();
          if (!cancelledRef.current) setStatus("confirmed");
          return;
        }
      } catch {
        // swallow — polling will retry
      }

      // Schedule next attempt or give up
      if (i + 1 < POLL_DELAYS_MS.length) {
        timeoutId = window.setTimeout(() => poll(i + 1), POLL_DELAYS_MS[i]);
      } else if (!cancelledRef.current) {
        // Webhook hasn't caught up — show pending state, don't claim failure.
        setStatus("pending");
      }
    };

    poll(0);

    return () => {
      cancelledRef.current = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Auto-redirect after confirmation
  useEffect(() => {
    if (status !== "confirmed") return;
    const t = window.setTimeout(() => navigate("/"), 4000);
    return () => window.clearTimeout(t);
  }, [status, navigate]);

  // Manual reconciliation trigger (used in pending state)
  const retryNow = async () => {
    setStatus("verifying");
    setAttempt(0);
    try {
      const result = await checkSubscriptionStatus();
      if (result.subscribed) {
        await refreshSubscription();
        setStatus("confirmed");
        return;
      }
    } catch {}
    setStatus("pending");
  };

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

  if (status === "pending") {
    return (
      <div className="min-h-screen bg-background">
        <PageNav />
        <div className="container max-w-md py-20 px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10">
            <AlertTriangle className="h-8 w-8 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Plaćanje primljeno</h1>
          <p className="text-muted-foreground mb-2">
            Stripe potvrda još nije stigla do našeg sistema. Aktivacija obično traje do minutu.
          </p>
          <p className="text-xs text-muted-foreground mb-8">
            Pokušajte ponovo za nekoliko sekundi ili osvježite stranicu.
          </p>
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

  // confirmed
  return (
    <div className="min-h-screen bg-background">
      <PageNav />
      <div className="container max-w-md py-20 px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
          <Check className="h-8 w-8 text-[hsl(var(--success))]" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Plaćanje uspješno!</h1>
        <p className="text-muted-foreground mb-2">Hvala vam na povjerenju. Vaš pristup je sada aktiviran.</p>
        <p className="text-xs text-muted-foreground mb-8">Preusmjeravamo vas za 4 sekunde…</p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/")}
            className="rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))]"
          >
            <Crown className="mr-2 h-4 w-4" />
            Nastavi na BalkanLink
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={() => navigate("/paketi")}>
            Pogledaj svoj plan
          </Button>
        </div>
      </div>
    </div>
  );
}
