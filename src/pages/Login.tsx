import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogIn, Mail, Lock } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import TurnstileWidget from "@/components/TurnstileWidget";
import { verifyTurnstileToken } from "@/lib/turnstile";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast({ title: t("auth.termsRequired") || "Bitte akzeptieren Sie die AGB und Datenschutzbestimmungen.", variant: "destructive" });
      return;
    }
    setLoading(true);
    if (turnstileToken) {
      const valid = await verifyTurnstileToken(turnstileToken);
      if (!valid) {
        toast({ title: "Verifikacija nije uspjela. Pokušaj ponovo.", variant: "destructive" });
        setTurnstileToken("");
        setLoading(false);
        return;
      }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast({ title: t("auth.loginError"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("auth.loginSuccess") });
      navigate("/");
    }
  };

  return (
    <>
    <PageNav />
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.03)] via-background to-[hsl(var(--brand-orange)/0.04)]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(var(--brand-orange)/0.06)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(var(--primary)/0.06)] blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="group relative inline-flex items-center gap-2.5" aria-label="BalkanLink home">
            <span className="absolute -inset-4 rounded-2xl bg-[hsl(var(--brand-orange)/0.08)] blur-2xl group-hover:bg-[hsl(var(--brand-orange)/0.15)] transition-all duration-500 pointer-events-none" />
            <span className="relative font-heading text-[32px] font-extrabold leading-none tracking-tight">
              <span className="text-foreground">B</span>
              <span className="bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">L</span>
            </span>
            <span className="relative font-heading text-xl font-bold leading-none tracking-tight">
              <span className="text-foreground">Balkan</span>
              <span className="bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">Link</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/5 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--brand-orange)/0.12)] mb-4">
              <LogIn className="w-5 h-5 text-[hsl(var(--brand-orange))]" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Dobrodošao nazad
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              Pristupi BalkanLink platformi i nastavi gdje si stao
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email adresa"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-background/60 text-sm text-foreground placeholder:text-muted-foreground/50 shadow-sm shadow-black/[0.03] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--brand-orange)/0.5)] focus:ring-2 focus:ring-[hsl(var(--brand-orange)/0.15)] focus:shadow-[0_0_0_4px_hsl(var(--brand-orange)/0.08)]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lozinka"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-background/60 text-sm text-foreground placeholder:text-muted-foreground/50 shadow-sm shadow-black/[0.03] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--brand-orange)/0.5)] focus:ring-2 focus:ring-[hsl(var(--brand-orange)/0.15)] focus:shadow-[0_0_0_4px_hsl(var(--brand-orange)/0.08)]"
              />
            </div>

            {/* Terms - compact */}
            <div className="flex items-start gap-2.5 py-1">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(v === true)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-border/60"
              />
              <label htmlFor="terms" className="cursor-pointer text-[11px] leading-relaxed text-muted-foreground/70">
                {t("auth.termsLabel") || "Ich habe die"}{" "}
                <Link to="/agb" target="_blank" className="font-medium text-[hsl(var(--brand-orange))] hover:underline">
                  {t("auth.termsAGB") || "AGB"}
                </Link>{" "}
                {t("auth.termsAnd") || "und die"}{" "}
                <Link to="/datenschutz" target="_blank" className="font-medium text-[hsl(var(--brand-orange))] hover:underline">
                  {t("auth.termsPrivacy") || "Datenschutzbestimmungen"}
                </Link>{" "}
                {t("auth.termsAccept") || "gelesen und akzeptiere sie."}
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--gold-light))] text-white font-semibold text-sm shadow-md shadow-[hsl(var(--brand-orange)/0.25)] hover:shadow-lg hover:shadow-[hsl(var(--brand-orange)/0.35)] hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? t("auth.loginLoading") : "Prijavi se"}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-5 flex items-center justify-between text-[12px]">
            <Link to="/forgot-password" className="text-muted-foreground/60 hover:text-[hsl(var(--brand-orange))] transition-colors">
              Zaboravljena lozinka?
            </Link>
            <Link to="/register" className="font-medium text-[hsl(var(--brand-orange))] hover:underline">
              Nemaš nalog? Registruj se
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
