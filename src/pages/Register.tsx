import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X } from "lucide-react";

const PW_RULES = [
  { key: "auth.pwRule.length" as const, test: (pw: string) => pw.length >= 8 },
  { key: "auth.pwRule.upper" as const, test: (pw: string) => /[A-Z]/.test(pw) },
  { key: "auth.pwRule.lower" as const, test: (pw: string) => /[a-z]/.test(pw) },
  { key: "auth.pwRule.number" as const, test: (pw: string) => /[0-9]/.test(pw) },
  { key: "auth.pwRule.special" as const, test: (pw: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pw) },
];

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const ruleResults = useMemo(() => PW_RULES.map(r => ({ ...r, pass: r.test(password) })), [password]);
  const allRulesPass = ruleResults.every(r => r.pass);
  const passwordsMatch = password === confirmPassword;
  const canSubmit = allRulesPass && passwordsMatch && confirmPassword.length > 0 && acceptedTerms;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast({ title: t("auth.passwordTooShort"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);

    if (error) {
      toast({ title: t("auth.registerError"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("auth.registerSuccess"), description: t("auth.registerCheckEmail") });
      navigate("/login");
    }
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><BrandLogo variant="full" linkHome={false} darkText /></div>
          <CardTitle className="text-2xl">{t("auth.registerTitle")}</CardTitle>
          <CardDescription>{t("auth.registerDesc")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.minChars")} />
              {/* Live password rules */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1 rounded-lg border bg-muted/30 p-3">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1">{t("auth.pwRule.title")}</p>
                  {ruleResults.map(r => (
                    <div key={r.key} className="flex items-center gap-2 text-xs">
                      {r.pass ? (
                        <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      )}
                      <span className={r.pass ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {t(r.key)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
              <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" /> {t("auth.passwordMismatch")}
                </p>
              )}
              {confirmPassword.length > 0 && passwordsMatch && (
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <Check className="h-3 w-3" /> ✓
                </p>
              )}
            </div>

            {/* AGB / Datenschutz Checkbox */}
            <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
                {t("auth.termsLabel") || "Ich habe die"}{" "}
                <Link to="/agb" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {t("auth.termsAGB") || "AGB"}
                </Link>{" "}
                {t("auth.termsAnd") || "und die"}{" "}
                <Link to="/datenschutz" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {t("auth.termsPrivacy") || "Datenschutzbestimmungen"}
                </Link>{" "}
                {t("auth.termsAccept") || "gelesen und akzeptiere sie."}
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
              {loading ? t("auth.registerLoading") : t("auth.registerButton")}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t("auth.haveAccount")} <Link to="/login" className="text-primary hover:underline">{t("auth.loginButton")}</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
