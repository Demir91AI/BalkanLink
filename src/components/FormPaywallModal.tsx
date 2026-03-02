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
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface FormPaywallModalProps {
  open: boolean;
  onSimulatePay: () => void;
  paying: boolean;
}

export default function FormPaywallModal({ open, onSimulatePay, paying }: FormPaywallModalProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Crown className="h-5 w-5 text-gold" />
            {t("paywall.title")}
          </DialogTitle>
          <DialogDescription>
            {t("paywall.desc")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-4">
            <p className="text-center text-2xl font-bold">7€ <span className="text-sm font-normal text-muted-foreground">{t("paywall.oneTime")}</span></p>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> {t("paywall.feature1")}</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> {t("paywall.feature2")}</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> {t("paywall.feature3")}</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> {t("paywall.feature4")}</li>
          </ul>

          {user ? (
            <Button
              className="btn-gold-gradient w-full rounded-xl"
              onClick={onSimulatePay}
              disabled={paying}
            >
              <Lock className="mr-2 h-4 w-4" />
              {paying ? t("paywall.processing") : t("paywall.simulate")}
            </Button>
          ) : (
            <Button className="btn-gold-gradient w-full rounded-xl" asChild>
              <Link to="/login">
                <Lock className="mr-2 h-4 w-4" />
                {t("paywall.loginRequired")}
              </Link>
            </Button>
          )}

          <p className="text-center text-[10px] text-muted-foreground">
            {t("paywall.devNote")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
