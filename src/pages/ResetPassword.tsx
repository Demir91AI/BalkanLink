import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import { SEO } from "@/components/SEO";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation("common");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("type=recovery")) {
      setReady(true);
    } else {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setReady(true);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: t("auth.resetPassword.passwordMismatch"), variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: t("auth.resetPassword.passwordTooShort"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast({ title: t("auth.resetPassword.errorTitle"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("auth.resetPassword.successTitle"), description: t("auth.resetPassword.successDescription") });
      navigate("/login");
    }
  };

  if (!ready) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{t("auth.forgotPassword.successTitle")}</CardTitle>
            <CardDescription>{t("auth.forgotPassword.successDescription")}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
    <SEO title="Postavi Novu Lozinku" description="Postavi novu lozinku za svoj BalkanLink nalog i nastavi sa korištenjem Premium alata." path="/reset-password" />
    <PageNav />
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("auth.resetPassword.title")}</CardTitle>
          <CardDescription>{t("auth.resetPassword.subtitle")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleReset}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.resetPassword.newPasswordPlaceholder")}</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.resetPassword.newPasswordPlaceholder")} className="pr-10" />
                <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.resetPassword.confirmPasswordPlaceholder")}</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pr-10" />
                <button type="button" onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors">
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("auth.resetPassword.loading") : t("auth.resetPassword.submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
