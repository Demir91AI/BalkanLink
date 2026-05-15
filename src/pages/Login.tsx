import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { t } = useTranslation("common");
  const redirectTo = (() => {
    const value = searchParams.get("redirect");
    return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
  })();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast({ title: t("auth.login.mustAcceptTerms"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast({ title: t("auth.login.wrongCredentials"), description: error.message, variant: "destructive" });
    } else {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <>
    <SEO title="Prijava na BalkanLink" description="Prijavi se na svoj BalkanLink nalog i nastavi sa formularima, Asistentom i Premium alatima." path="/login" />
    <PageNav />
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,50%,8%)] via-[#020617] to-[hsl(225,45%,6%)]" />
      <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[hsl(var(--gold)/0.12)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[320px] h-[320px] rounded-full bg-[hsl(var(--brand-orange)/0.10)] blur-[110px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="flex justify-center mb-8">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2.5 rounded-2xl border border-[hsl(var(--gold)/0.35)] bg-[hsl(225,45%,8%)]/80 backdrop-blur-md px-5 py-3 shadow-lg shadow-black/40 transition-all duration-300 hover:border-[hsl(var(--gold)/0.6)] hover:shadow-[0_0_24px_hsl(var(--gold)/0.25)]"
            aria-label="BalkanLink home"
          >
            <span className="absolute -inset-4 rounded-2xl bg-[hsl(var(--gold)/0.10)] blur-2xl group-hover:bg-[hsl(var(--gold)/0.18)] transition-all duration-500 pointer-events-none" />
            <span className="relative font-heading text-[32px] font-extrabold leading-none tracking-tight">
              <span className="text-white">B</span>
              <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">L</span>
            </span>
            <span className="relative font-heading text-xl font-bold leading-none tracking-tight">
              <span className="text-white">Balkan</span>
              <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">Link</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--gold)/0.20)] bg-[hsl(225,45%,8%)]/85 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--gold)/0.12)] ring-1 ring-[hsl(var(--gold)/0.35)] mb-4">
              <LogIn className="w-5 h-5 text-[hsl(var(--gold))]" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{t("auth.login.title")}</h1>
            {redirectTo === "/admin" && (
              <p className="mt-2 text-sm text-white/60">{t("auth.login.adminRedirectHint")}</p>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.login.emailPlaceholder")}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:border-[hsl(var(--gold)/0.6)] focus:ring-2 focus:ring-[hsl(var(--gold)/0.20)]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.login.passwordPlaceholder")}
                className="w-full h-11 pl-10 pr-11 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:border-[hsl(var(--gold)/0.6)] focus:ring-2 focus:ring-[hsl(var(--gold)/0.20)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-[hsl(225,45%,8%)] text-[hsl(var(--gold))] hover:text-[hsl(var(--gold-light))] hover:bg-[hsl(225,45%,12%)] transition-colors z-10"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <label
              htmlFor="terms"
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                acceptedTerms
                  ? "border-[hsl(var(--gold)/0.5)] bg-[hsl(var(--gold)/0.08)]"
                  : "border-[hsl(var(--gold)/0.30)] bg-[hsl(var(--gold)/0.04)] hover:bg-[hsl(var(--gold)/0.08)]"
              }`}
            >
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(v === true)}
                className="mt-0.5 h-5 w-5 rounded border-2 border-[hsl(var(--gold))] data-[state=checked]:bg-[hsl(var(--gold))] data-[state=checked]:border-[hsl(var(--gold))] data-[state=checked]:text-[hsl(225,45%,8%)] shadow-sm"
              />
              <span className="text-[12px] leading-relaxed text-white/85 font-medium select-none">
                {t("auth.login.termsPrefix")}{" "}
                <Link to="/agb" target="_blank" className="font-semibold text-[hsl(var(--gold))] underline underline-offset-2 hover:brightness-110">
                  {t("auth.login.termsLink")}
                </Link>{" "}
                {t("auth.login.termsAnd")}{" "}
                <Link to="/datenschutz" target="_blank" className="font-semibold text-[hsl(var(--gold))] underline underline-offset-2 hover:brightness-110">
                  {t("auth.login.privacyLink")}
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-[hsl(225,45%,8%)] font-bold text-sm shadow-md shadow-[hsl(var(--gold)/0.30)] hover:shadow-lg hover:shadow-[hsl(var(--gold)/0.45)] hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? t("auth.login.loading") : t("auth.login.submit")}
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between text-[12px]">
            <Link to="/forgot-password" className="text-white/50 hover:text-[hsl(var(--gold))] transition-colors">
              {t("auth.login.forgotPassword")}
            </Link>
            <Link to="/register" className="font-semibold text-[hsl(var(--gold))] hover:brightness-110">
              {t("auth.login.noAccount")}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
