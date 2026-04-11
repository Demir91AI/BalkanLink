import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import PageNav from "@/components/navigation/PageNav";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { refreshSubscription } = useAuth();

  useEffect(() => {
    refreshSubscription();
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [refreshSubscription, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <PageNav />
      <div className="container max-w-md py-20 px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
          <Check className="h-8 w-8 text-[hsl(var(--success))]" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Zahlung erfolgreich!</h1>
        <p className="text-muted-foreground mb-2">
          Vielen Dank. Dein Zugang wurde erfolgreich aktiviert.
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          Du wirst in 3 Sekunden weitergeleitet…
        </p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/")}
            className="rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))]"
          >
            <Crown className="mr-2 h-4 w-4" />
            Weiter zu BalkanLink
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={() => navigate("/paketi")}>
            Mein Paket ansehen
          </Button>
        </div>
      </div>
    </div>
  );
}
