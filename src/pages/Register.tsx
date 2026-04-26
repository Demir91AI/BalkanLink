import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation("common");

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
    setLoading(true);
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { first_name: firstName.trim() },
      },
    });

    if (!error && signUpData.user) {
      await supabase
        .from("profiles")
        .upsert({
          id: signUpData.user.id,
          email,
          first_name: firstName.trim(),
        } as any, { onConflict: "id" });
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
    <PageNav />
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><BrandLogo variant="full" linkHome={false} darkText /></div>
          <CardTitle className="text-2xl">{t("auth.register.title")}</CardTitle>
          <CardDescription>{t("auth.register.subtitleCard")}</CardDescription>
        </CardHeader>
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
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.register.passwordHint")} />
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
              <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
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

            <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
                {t("auth.register.consentText")}{" "}
                <Link to="/uslovi-koristenja" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {t("auth.register.consentTermsLink")}
                </Link>
                ,{" "}
                <Link to="/datenschutz" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {t("auth.register.consentPrivacyLink")}
                </Link>{" "}
                {t("auth.register.consentAiPrefix")}{" "}
                <Link to="/napomena-o-ki" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {t("auth.register.consentAiLink")}
                </Link>
                {t("auth.register.consentAiSuffix")}
              </label>
            </div>
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
