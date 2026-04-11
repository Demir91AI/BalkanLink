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
import { Check, X } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";
import TurnstileWidget from "@/components/TurnstileWidget";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { label } from "@/lib/de-labels";

const PW_RULES = [
  { key: "auth.pwRule.length" as const, test: (pw: string) => pw.length >= 8 },
  { key: "auth.pwRule.upper" as const, test: (pw: string) => /[A-Z]/.test(pw) },
  { key: "auth.pwRule.lower" as const, test: (pw: string) => /[a-z]/.test(pw) },
  { key: "auth.pwRule.number" as const, test: (pw: string) => /[0-9]/.test(pw) },
  { key: "auth.pwRule.special" as const, test: (pw: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pw) },
];

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const ruleResults = useMemo(() => PW_RULES.map(r => ({ ...r, pass: r.test(password) })), [password]);
  const allRulesPass = ruleResults.every(r => r.pass);
  const passwordsMatch = password === confirmPassword;
  const canSubmit = allRulesPass && passwordsMatch && confirmPassword.length > 0 && acceptedTerms && turnstileToken.length > 0 && firstName.trim().length > 0;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast({ title: "Passwort ist zu kurz.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const valid = await verifyTurnstileToken(turnstileToken);
    if (!valid) {
      toast({ title: "Die Verifizierung ist fehlgeschlagen. Bitte versuche es erneut.", variant: "destructive" });
      setTurnstileToken("");
      setLoading(false);
      return;
    }
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { first_name: firstName.trim() },
      },
    });
    
    // Save first_name to profiles table immediately after signup
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
      toast({ title: "Registrierungsfehler.", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Erfolgreich registriert!", description: "Prüfe E-Mail zur Registrierungsbestätigung." });
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
          <CardTitle className="text-2xl">{"Registrierung"}</CardTitle>
          <CardDescription>{"Erstelle ein Konto für vollen Zugang."}</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{"Vorname"}</Label>
              <Input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Dein Vorname" autoComplete="given-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{"E-Mail-Adresse"}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{"Passwort"}</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Mindestens 8 Zeichen"} />
              {/* Live password rules */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1 rounded-lg border bg-muted/30 p-3">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1">{"Passwort muss enthalten:"}</p>
                  {ruleResults.map(r => (
                    <div key={r.key} className="flex items-center gap-2 text-xs">
                      {r.pass ? (
                        <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      )}
                      <span className={r.pass ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {label(r.key)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{"Passwort bestätigen"}</Label>
              <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" /> {"Passwörter stimmen nicht überein."}
                </p>
              )}
              {confirmPassword.length > 0 && passwordsMatch && (
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <Check className="h-3 w-3" /> ✓
                </p>
              )}
            </div>

            <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} className="flex justify-center" />

            {/* AGB / Datenschutz Checkbox */}
            <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
                {"Ich akzeptiere die AGB"}{" "}
                <Link to="/agb" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {"AGB"}
                </Link>{" "}
                {"und"}{" "}
                <Link to="/datenschutz" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  {"Datenschutzrichtlinie"}
                </Link>{" "}
                {"zu akzeptieren."}
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
              {loading ? "Registrierung..." : "Registrieren"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {"Schon ein Konto?"} <Link to="/login" className="text-primary hover:underline">{"Anmelden"}</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
