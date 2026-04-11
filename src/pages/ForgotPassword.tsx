import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PageNav from "@/components/navigation/PageNav";
import TurnstileWidget from "@/components/TurnstileWidget";
import { verifyTurnstileToken } from "@/lib/turnstile";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (turnstileToken) {
      const valid = await verifyTurnstileToken(turnstileToken);
      if (!valid) {
        toast({ title: "Die Verifizierung ist fehlgeschlagen.", variant: "destructive" });
        setTurnstileToken("");
        setLoading(false);
        return;
      }
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Ein Fehler ist aufgetreten", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{"E-Mail prüfen"}</CardTitle>
            <CardDescription>{"Wir haben dir eine Bestätigungs-E-Mail gesendet."}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link to="/login" className="text-sm text-primary hover:underline">{"Zurück zur Anmeldung"}</Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <>
    <PageNav />
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{"Passwort vergessen"}</CardTitle>
          <CardDescription>{"E-Mail eingeben zum Zurücksetzen."}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{"E-Mail-Adresse"}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>
            <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} className="flex justify-center" />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sende..." : "Link senden"}
            </Button>
            <Link to="/login" className="text-sm text-primary hover:underline">{"Zurück zur Anmeldung"}</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
