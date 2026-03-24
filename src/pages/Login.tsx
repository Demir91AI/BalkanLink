import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "@/components/BrandLogo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><BrandLogo variant="full" linkHome={false} darkText /></div>
          <CardTitle className="text-2xl">{t("auth.loginTitle")}</CardTitle>
          <CardDescription>{t("auth.loginDesc")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
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
            <Button type="submit" className="w-full" disabled={loading || !acceptedTerms}>
              {loading ? t("auth.loginLoading") : t("auth.loginButton")}
            </Button>
            <div className="flex w-full justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">{t("auth.forgotPassword")}</Link>
              <Link to="/register" className="text-primary hover:underline">{t("nav.register")}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
