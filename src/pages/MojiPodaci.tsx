import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

export default function MojiPodaci() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
      a.download = `balkanlink-podaci-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast({
        title: "Izvještaj preuzet",
        description: "Tvoj izvještaj je sačuvan i možeš ga otvoriti u bilo kojem programu.",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({
        variant: "destructive",
        title: "Greška pri preuzimanju",
        description: msg,
      });
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const emailOk =
      confirmEmail.trim().toLowerCase() === (user.email ?? "").toLowerCase() &&
      (user.email ?? "").length > 0;
    const textOk = confirmText === "OBRIŠI";
    if (!emailOk || !textOk) {
      setDeleteError(
        !emailOk
          ? "Email ne odgovara tvom računu."
          : "Moraš ukucati tačno OBRIŠI (velikim slovima)."
      );
      return;
    }

    setDeleting(true);
    setDeleteError(null);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error("Nema aktivne sesije. Prijavi se ponovo.");

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/delete-account`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            confirm_email: confirmEmail,
            confirm_text: confirmText,
          }),
        }
      );

      const payload = await res.json().catch(() => ({} as Record<string, unknown>));

      if (!res.ok) {
        const backendMsg =
          (payload as { error?: string })?.error ||
          `Brisanje nije uspjelo (HTTP ${res.status}).`;
        throw new Error(backendMsg);
      }

      const warnings = (payload as { stripe_warnings?: string[] })?.stripe_warnings ?? [];
      const cancelled = (payload as { stripe_cancelled_count?: number })?.stripe_cancelled_count ?? 0;

      toast({
        title: "Račun obrisan",
        description:
          warnings.length > 0
            ? `Podaci su uklonjeni. Napomena uz Stripe (${cancelled} otkazanih): ${warnings.join("; ")}`
            : cancelled > 0
              ? `Svi tvoji podaci su uklonjeni. Otkazano ${cancelled} pretplata.`
              : "Svi tvoji podaci su uklonjeni.",
      });

      await signOut();
      navigate("/", { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setDeleteError(msg);
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
        <div className="container max-w-md mx-auto py-12 px-4 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Moraš biti prijavljen da bi pristupio postavkama.
          </p>
          <Button onClick={() => navigate("/login")} size="sm">Prijavi se</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Postavke računa | BalkanLink"
        description="Upravljaj svojim podacima i računom (GDPR čl. 15 i 17)."
      />
      <PageNav />
      <div className="container max-w-md mx-auto py-8 px-4 space-y-6">
        <button
          type="button"
          onClick={() => navigate("/profil")}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Nazad na profil
        </button>

        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Postavke računa</h1>
          <p className="text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>

        {/* Export — diskretna sekcija */}
        <section className="space-y-2 pb-5 border-b border-border/40">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <p className="text-sm font-medium">Preuzmi svoje podatke</p>
              <p className="text-[11px] text-muted-foreground">
                Čitljiv izvještaj svih tvojih podataka (GDPR čl. 15).
              </p>
            </div>
            <Button
              onClick={handleExport}
              disabled={exporting}
              variant="outline"
              size="sm"
              className="shrink-0 text-xs h-8"
            >
              {exporting ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                  Pripremam…
                </>
              ) : (
                "Preuzmi izvještaj"
              )}
            </Button>
          </div>
        </section>

        {/* Delete — diskretna sekcija; agresivno UI tek kad se otvori konfirmacija */}
        <section className="space-y-2">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Brisanje računa</p>
            <p className="text-[11px] text-muted-foreground">
              Trajno uklanja sve tvoje podatke i otkazuje aktivnu pretplatu (GDPR čl. 17).
            </p>
          </div>

          {!showConfirm ? (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="text-xs text-destructive/80 hover:text-destructive transition-colors underline-offset-4 hover:underline"
            >
              Želim obrisati račun
            </button>
          ) : (
            <div className="space-y-3 rounded-md border border-border/50 bg-muted/20 p-3 mt-1">
              <p className="text-[11px] text-muted-foreground">
                Ova akcija je nepovratna. Aktivna pretplata bit će otkazana, profil i historija obrisani.
              </p>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-email" className="text-[11px] text-muted-foreground">
                  Ukucaj svoj email ({user.email}):
                </Label>
                <Input
                  id="confirm-email"
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => {
                    setConfirmEmail(e.target.value);
                    if (deleteError) setDeleteError(null);
                  }}
                  placeholder={user.email ?? ""}
                  autoComplete="off"
                  className="h-8 text-xs"
                  aria-invalid={deleteError ? true : undefined}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-text" className="text-[11px] text-muted-foreground">
                  Ukucaj <span className="font-mono font-bold text-destructive">OBRIŠI</span> velikim slovima:
                </Label>
                <Input
                  id="confirm-text"
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    if (deleteError) setDeleteError(null);
                  }}
                  placeholder="OBRIŠI"
                  autoComplete="off"
                  className="h-8 text-xs"
                  aria-invalid={deleteError ? true : undefined}
                />
              </div>

              {deleteError && (
                <p
                  role="alert"
                  className="text-[11px] text-destructive"
                >
                  {deleteError}
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-2 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowConfirm(false);
                    setConfirmEmail("");
                    setConfirmText("");
                    setDeleteError(null);
                  }}
                  disabled={deleting}
                  className="text-xs h-8"
                >
                  Odustani
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={
                    deleting ||
                    confirmEmail.trim().toLowerCase() !== (user.email ?? "").toLowerCase() ||
                    confirmText !== "OBRIŠI"
                  }
                  className="flex-1 text-xs h-8"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                      Brišem…
                    </>
                  ) : (
                    "Trajno obriši"
                  )}
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
