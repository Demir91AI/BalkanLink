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

const PW_RULES = [
  { label: "Minimalno 8 znakova", test: (pw: string) => pw.length >= 8 },
  { label: "Jedno veliko slovo", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "Jedno malo slovo", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "Jedan broj", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "Jedan specijalni znak", test: (pw: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pw) },
];

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const ruleResults = useMemo(() => PW_RULES.map(r => ({ ...r, pass: r.test(password) })), [password]);
  const allRulesPass = ruleResults.every(r => r.pass);
  const passwordsMatch = password === confirmPassword;
  const canSubmit = allRulesPass && passwordsMatch && confirmPassword.length > 0 && acceptedTerms && firstName.trim().length > 0;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast({ title: "Lozinka je prekratka.", variant: "destructive" });
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
      toast({ title: "Greška pri registraciji.", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uspješno registrirani!", description: "Provjeri e-mail za potvrdu registracije." });
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
          <CardTitle className="text-2xl">Registracija</CardTitle>
          <CardDescription>Kreiraj nalog za puni pristup.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ime</Label>
              <Input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ime" autoComplete="given-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail adresa</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lozinka</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimalno 8 znakova" />
              {password.length > 0 && (
                <div className="mt-2 space-y-1 rounded-lg border bg-muted/30 p-3">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1">Lozinka mora sadržavati:</p>
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
              <Label htmlFor="confirmPassword">Potvrdi lozinku</Label>
              <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" /> Lozinke se ne podudaraju.
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
                Prihvatam{" "}
                <Link to="/uslovi-koristenja" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  Uslove korištenja
                </Link>
                ,{" "}
                <Link to="/datenschutz" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  Zaštitu podataka
                </Link>{" "}
                i potvrđujem da sam pročitao/la{" "}
                <Link to="/napomena-o-ki" target="_blank" className="font-semibold text-primary underline hover:no-underline">
                  Napomenu o upotrebi asistenta
                </Link>
                . Razumijem da AI asistent pruža isključivo informativne odgovore
                i ne zamjenjuje pravni savjet.
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
              {loading ? "Registracija..." : "Registruj se"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Već imaš nalog? <Link to="/login" className="text-primary hover:underline">Prijavi se</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
