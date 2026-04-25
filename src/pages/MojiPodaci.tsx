import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Trash2, ShieldAlert, Loader2, FileJson, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

export default function MojiPodaci() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExport = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setExporting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error("Nema aktivne sesije");

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/export-user-data`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Nepoznata greška" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `balkanlink-podaci-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast({
        title: "Export uspješan",
        description: "Tvoji podaci su preuzeti kao JSON fajl.",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({
        variant: "destructive",
        title: "Greška pri exportu",
        description: msg,
      });
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error("Nema aktivne sesije");

      const { data, error } = await supabase.functions.invoke("delete-account", {
        body: { confirm_email: confirmEmail, confirm_text: confirmText },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: "Račun obrisan",
        description: "Svi tvoji podaci su uklonjeni. Hvala što si bio s nama.",
      });

      await signOut();
      navigate("/", { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({
        variant: "destructive",
        title: "Brisanje nije uspjelo",
        description: msg,
      });
      setDeleting(false);
    }
  };

  if (!user) {
    return (
      <>
        <PageNav />
        <div className="container max-w-2xl mx-auto py-12 px-4">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <p className="text-muted-foreground">
                Moraš biti prijavljen da bi pristupio svojim podacima.
              </p>
              <Button onClick={() => navigate("/login")}>Prijavi se</Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Moji podaci — GDPR | BalkanLink" description="Preuzmi svoje podatke ili trajno obriši svoj BalkanLink račun (GDPR čl. 15 i 17)." />
      <PageNav />
      <div className="container max-w-3xl mx-auto py-8 px-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Moji podaci</h1>
          <p className="text-sm text-muted-foreground">
            Tvoja prava prema GDPR-u (čl. 15 i 17): preuzimanje vlastitih podataka i trajno brisanje računa.
          </p>
        </div>

        {/* EXPORT */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileJson className="h-5 w-5 text-[hsl(var(--gold))]" />
              Preuzmi svoje podatke (GDPR čl. 15)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Dobićeš JSON fajl sa svim podacima koje BalkanLink čuva o tebi:
            </p>
            <ul className="text-sm text-muted-foreground/90 space-y-1 list-disc list-inside ml-2">
              <li>Profil (email, ime, premium status, datumi)</li>
              <li>Plaćanja (Stripe transakcije i mreza payments)</li>
              <li>Tvoji oglasi i postavke notifikacija</li>
              <li>Napredak u Deutsch Traineru</li>
              <li>Korištenje asistenta i Dokumenten-Checka</li>
            </ul>
            <Button onClick={handleExport} disabled={exporting} className="w-full sm:w-auto">
              {exporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Pripremam fajl...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Preuzmi JSON
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* DELETE */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <ShieldAlert className="h-5 w-5" />
              Trajno obriši račun (GDPR čl. 17)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
              <div className="space-y-1.5">
                <p className="font-medium text-foreground">Ova akcija je nepovratna.</p>
                <ul className="text-muted-foreground space-y-0.5 list-disc list-inside text-xs">
                  <li>Aktivna Stripe pretplata bit će automatski otkazana</li>
                  <li>Profil, oglasi, napredak i historija plaćanja bit će obrisani</li>
                  <li>Tvoj auth račun bit će uklonjen — ne možeš ga vratiti</li>
                  <li>Preporučujemo da prvo preuzmeš svoje podatke (gore)</li>
                </ul>
              </div>
            </div>

            {!showConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowConfirm(true)}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Želim obrisati račun
              </Button>
            ) : (
              <div className="space-y-3 rounded-md border border-destructive/40 bg-background/50 p-4">
                <div className="space-y-2">
                  <Label htmlFor="confirm-email" className="text-xs">
                    Ukucaj svoj email ({user.email}):
                  </Label>
                  <Input
                    id="confirm-email"
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder={user.email ?? ""}
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-text" className="text-xs">
                    Ukucaj <span className="font-mono font-bold text-destructive">OBRIŠI</span> velikim slovima:
                  </Label>
                  <Input
                    id="confirm-text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="OBRIŠI"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={
                      deleting ||
                      confirmEmail.trim().toLowerCase() !== (user.email ?? "").toLowerCase() ||
                      confirmText !== "OBRIŠI"
                    }
                    className="flex-1"
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Brišem...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Trajno obriši
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowConfirm(false);
                      setConfirmEmail("");
                      setConfirmText("");
                    }}
                    disabled={deleting}
                  >
                    Odustani
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
