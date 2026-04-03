import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import PageNav from "@/components/navigation/PageNav";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      toast({ title: t("common.error"), description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{t("auth.checkEmail")}</CardTitle>
            <CardDescription>{t("auth.checkEmailDesc")}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link to="/login" className="text-sm text-primary hover:underline">{t("auth.backToLogin")}</Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <>
    <SubpageNav />
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("auth.forgotTitle")}</CardTitle>
          <CardDescription>{t("auth.forgotDesc")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("auth.sending") : t("auth.sendLink")}
            </Button>
            <Link to="/login" className="text-sm text-primary hover:underline">{t("auth.backToLogin")}</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
