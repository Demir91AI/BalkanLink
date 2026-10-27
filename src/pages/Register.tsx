import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Crown, Eye, EyeOff } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

const TRIAL_STORAGE_KEY = "pending_trial_code";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trialCode, setTrialCode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation("common");

  // Pick up trial code from URL or sessionStorage
  useEffect(() => {
    const fromUrl = searchParams.get("trial");
    if (fromUrl && /^[A-Z0-9_-]{1,64}$/i.test(fromUrl)) {
      const normalized = fromUrl.trim().toUpperCase();
      setTrialCode(normalized);
      try { localStorage.setItem(TRIAL_STORAGE_KEY, normalized); } catch {}
      return;
    }
    try {
      const stored = localStorage.getItem(TRIAL_STORAGE_KEY);
      if (stored && /^[A-Z0-9_-]{1,64}$/.test(stored)) setTrialCode(stored);
    } catch {}
  }, [searchParams]);

  const PW_RULES = useMemo(() => [
    { label: t("auth.register.rule1"), test: (pw: string) => pw.length >= 8 },
    { label: t("auth.register.rule2"), test: (pw: string) => /[A-Z]/.test(pw) },
    { label: t("auth.register.rule3"), test: (pw: string) => /[a-z]/.test(pw) },
    { label: t("auth.register.rule4"), test: (pw: string) => /[0-9]/.test(pw) },
    { label: t("auth.register.rule5"), test: (pw: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pw) },
  ], [t]);

  const ruleResults = useMemo(() => PW_RULES.map(r => ({ ...r, pass: r.test(password) })), [password, PW_RULES]);
  const allRulesPass = ruleResults.every(r => r.pass);
  const passwordsMatch = password === confirmPassword;
  const canSubmit = allRulesPass && passwordsMatch && confirmPassword.length > 0 && acceptedTerms && firstName.trim().length > 0;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast({ title: t("auth.register.passwordTooShortShort"), variant: "destructive" });
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    setLoading(true);
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          first_name: firstName.trim(),
          ...(trialCode ? { pending_trial_code: trialCode } : {}),
        },
      },
    });

    // Supabase ne vraća grešku za duplikate (security) — detektujemo preko praznog identities array
    const isDuplicate = !!signUpData.user && Array.isArray((signUpData.user as any).identities) && (signUpData.user as any).identities.length === 0;

    if (isDuplicate || error?.message?.toLowerCase().includes("already")) {
      setLoading(false);
      toast({
        title: t("auth.register.errorTitleShort"),
        description: t("auth.register.emailAlreadyExists"),
        variant: "destructive",
      });
      return;
    }

    if (!error && signUpData.user) {
      await supabase
        .from("profiles")
        .upsert({
          id: signUpData.user.id,
          email: normalizedEmail,
          first_name: firstName.trim(),
        } as any, { onConflict: "id" });

      // Admin notification — fire & forget (ne blokirati registraciju)
      try {
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "admin-new-user",
            recipientEmail: "kontakt@balkanlink.de",
            idempotencyKey: `admin-new-user-${signUpData.user.id}`,
            templateData: {
              email: normalizedEmail,
              firstName: firstName.trim(),
              trialCode: trialCode ?? undefined,
              registeredAt: new Date().toISOString(),
            },
          },
        }).catch((e) => console.warn("[admin-notify] failed", e));
      } catch (e) {
        console.warn("[admin-notify] invoke threw", e);
      }

      // Trial redemption — only if user is already signed in (auto-confirm OFF means session is null)
      if (trialCode && signUpData.session) {
        try {
          const { data: redeemData, error: redeemErr } = await supabase.functions.invoke("redeem-trial", {
            body: { code: trialCode },
          });
          if (!redeemErr && (redeemData as any)?.success) {
            try { localStorage.removeItem(TRIAL_STORAGE_KEY); } catch {}
            toast({
              title: t("auth.register.trialActivatedTitle"),
              description: t("auth.register.trialActivatedDesc", { days: (redeemData as any)?.days ?? 30 }),
            });
          } else {
            const reason = (redeemData as any)?.error ?? "invalid_code";
            try { localStorage.removeItem(TRIAL_STORAGE_KEY); } catch {}
            toast({
              title: t("auth.register.trialFailedTitle"),
              description: t(`auth.register.trialError.${reason}`, { defaultValue: t("auth.register.trialError.invalid_code") }),
              variant: "destructive",
            });
          }
        } catch (err) {
          console.error("[trial] redeem failed", err);
          toast({
            title: t("auth.register.trialFailedTitle"),
            description: t("auth.register.trialError.invalid_code"),
            variant: "destructive",
          });
        }
      }
    }

    setLoading(false);

    if (error) {
      toast({ title: t("auth.register.errorTitleShort"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("auth.register.successRegistered"), description: t("auth.register.successCheckEmail") });
      navigate("/login");
    }
  };

  return (
    <>
    <SEO title="Registracija — Besplatno" description="Otvori besplatan BalkanLink nalog i isprobaj vodiče, Viza Navigator i Asistenta." path="/register" />
    <PageNav />
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><BrandLogo variant="full" linkHome={false} darkText /></div>
          <CardTitle className="text-2xl">{t("auth.register.title")}</CardTitle>
          <CardDescription>{t("auth.register.subtitleCard")}</CardDescription>
        </CardHeader>

        {trialCode && (
          <div className="mx-6 mb-2 rounded-xl border border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--gold))]/15 to-[hsl(var(--gold))]/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/20">
                <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">
                  {t("auth.register.trialBannerTitle")}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("auth.register.trialBannerDesc", { code: trialCode })}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("auth.register.labelFirstName")}</Label>
              <Input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t("auth.register.labelFirstName")} autoComplete="given-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.register.labelEmail")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.register.emailExample")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.register.labelPassword")}</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.register.passwordHint")} className="pr-10" />
                <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 space-y-1 rounded-lg border bg-muted/30 p-3">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1">{t("auth.register.rulesTitle")}</p>
                  {ruleResults.map(r => (
                    <div key={r.label} className="flex items-center gap-2 text-xs">
                      {r.pass ? (
                        <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      )}
                      <span className={r.pass ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.register.labelConfirmPassword")}</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pr-10" />
                <button type="button" onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors">
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" /> {t("auth.register.passwordMismatch")}
                </p>
              )}
              {confirmPassword.length > 0 && passwordsMatch && (
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <Check className="h-3 w-3" /> ✓
                </p>
              )}
            </div>

            <label
              htmlFor="terms"
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                acceptedTerms
                  ? "border-primary/50 bg-primary/5"
                  : "border-primary/40 bg-primary/[0.04] hover:bg-primary/[0.08]"
              }`}
            >
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(v === true)}
                className="mt-0.5 h-5 w-5 rounded border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary shadow-sm"
              />
              <span className="text-xs leading-relaxed text-foreground/85 font-medium select-none">
                {t("auth.register.consentText")}{" "}
                <Link to="/uslovi-koristenja" target="_blank" className="font-semibold text-primary underline underline-offset-2 hover:no-underline">
                  {t("auth.register.consentTermsLink")}
                </Link>
                ,{" "}
                <Link to="/datenschutz" target="_blank" className="font-semibold text-primary underline underline-offset-2 hover:no-underline">
                  {t("auth.register.consentPrivacyLink")}
                </Link>{" "}
                {t("auth.register.consentAiPrefix")}{" "}
                <Link to="/napomena-o-ki" target="_blank" className="font-semibold text-primary underline underline-offset-2 hover:no-underline">
                  {t("auth.register.consentAiLink")}
                </Link>
                {t("auth.register.consentAiSuffix")}
              </span>
            </label>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
              {loading ? t("auth.register.loading") : t("auth.register.submit")}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t("auth.register.haveAccount").split("?")[0]}? <Link to="/login" className="text-primary hover:underline">{t("auth.login.submit")}</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
