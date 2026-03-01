import { Crown, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface FormPaywallModalProps {
  open: boolean;
  onSimulatePay: () => void;
  paying: boolean;
}

export default function FormPaywallModal({ open, onSimulatePay, paying }: FormPaywallModalProps) {
  const { user } = useAuth();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Crown className="h-5 w-5 text-gold" />
            Premium Formular Pomoć
          </DialogTitle>
          <DialogDescription>
            Otključaj kompletni Smart Guide za ovaj formular.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-4">
            <p className="text-center text-2xl font-bold">7€ <span className="text-sm font-normal text-muted-foreground">jednokratno</span></p>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> Objašnjenje svakog polja na bosanskom</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> Najčešće greške i kako ih izbjeći</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> Interaktivni PDF pregled s klikabilnim poljima</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> Step-by-step vodič</li>
          </ul>

          {user ? (
            <Button
              className="btn-gold-gradient w-full rounded-xl"
              onClick={onSimulatePay}
              disabled={paying}
            >
              <Lock className="mr-2 h-4 w-4" />
              {paying ? "Obrađujem…" : "Simuliraj uplatu (7€)"}
            </Button>
          ) : (
            <Button className="btn-gold-gradient w-full rounded-xl" asChild>
              <Link to="/login">
                <Lock className="mr-2 h-4 w-4" />
                Prijavi se za pristup
              </Link>
            </Button>
          )}

          <p className="text-center text-[10px] text-muted-foreground">
            DEV MODE: Uplata se simulira lokalno. Stripe integracija dolazi kasnije.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
