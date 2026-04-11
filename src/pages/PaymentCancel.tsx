import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <PageNav />
      <div className="container max-w-md py-20 px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Zahlung abgebrochen</h1>
        <p className="text-muted-foreground mb-8">
          Die Zahlung wurde nicht abgeschlossen. Du kannst es jederzeit erneut versuchen.
        </p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/paketi")}
            className="rounded-xl bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-light))]"
          >
            Erneut versuchen
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={() => navigate("/")}>
            Zur Startseite
          </Button>
        </div>
      </div>
    </div>
  );
}
