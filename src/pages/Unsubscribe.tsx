import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { unsubscribeState } from '@/lib/phase1-reliability/unsubscribe-response';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Status = "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

export default function Unsubscribe() {
  const { i18n } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState<string | null>(null);

  const lang = (i18n.language || "bs").slice(0, 2);
  const T = {
    bs: {
      title: "Odjava sa email obavijesti",
      loading: "Provjeravamo link...",
      valid: "Da li si siguran da se želiš odjaviti?",
      confirm: "Potvrdi odjavu",
      success: "Odjavio si se. Više ti nećemo slati emailove.",
      already: "Već si odjavljen.",
      invalid: "Link nije valjan ili je istekao.",
      back: "Nazad na BalkanLink",
      submitting: "Odjavljivanje...",
      error: "Došlo je do greške. Pokušaj ponovo.",
    },
    de: {
      title: "Vom E-Mail-Versand abmelden",
      loading: "Wir prüfen den Link...",
      valid: "Möchtest du dich wirklich abmelden?",
      confirm: "Abmeldung bestätigen",
      success: "Du bist abgemeldet. Wir senden dir keine E-Mails mehr.",
      already: "Du bist bereits abgemeldet.",
      invalid: "Der Link ist ungültig oder abgelaufen.",
      back: "Zurück zu BalkanLink",
      submitting: "Wird abgemeldet...",
      error: "Ein Fehler ist aufgetreten. Versuche es erneut.",
    },
    hr: {
      title: "Odjava s email obavijesti",
      loading: "Provjeravamo link...",
      valid: "Jesi li siguran da se želiš odjaviti?",
      confirm: "Potvrdi odjavu",
      success: "Odjavio si se. Više ti nećemo slati emailove.",
      already: "Već si odjavljen.",
      invalid: "Link nije valjan ili je istekao.",
      back: "Natrag na BalkanLink",
      submitting: "Odjavljivanje...",
      error: "Došlo je do greške. Pokušaj ponovno.",
    },
    sr: {
      title: "Odjava sa email obaveštenja",
      loading: "Proveravamo link...",
      valid: "Da li si siguran da se želiš odjaviti?",
      confirm: "Potvrdi odjavu",
      success: "Odjavio si se. Više ti nećemo slati mejlove.",
      already: "Već si odjavljen.",
      invalid: "Link nije validan ili je istekao.",
      back: "Nazad na BalkanLink",
      submitting: "Odjavljivanje...",
      error: "Došlo je do greške. Pokušaj ponovo.",
    },
  }[lang as "bs" | "de" | "hr" | "sr"] || ({} as any);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        const next = unsubscribeState(r.ok, data, 'GET');
        if (next === 'valid') {
          setEmail(data.email ?? null);
          setStatus("valid");
        } else if (next === 'already') {
          setStatus("already");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const onConfirm = async () => {
    setStatus("submitting");
    try {
      const r = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ token }),
      });
      const data = await r.json().catch(() => ({}));
      setStatus(unsubscribeState(r.ok, data, 'POST'));
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>{T.title} | BalkanLink</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
        <div className="w-full max-w-md rounded-2xl border border-border/40 bg-card/60 backdrop-blur p-8 shadow-xl text-center">
          <h1 className="text-2xl font-semibold mb-6">{T.title}</h1>

          {status === "loading" && (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>{T.loading}</p>
            </div>
          )}

          {status === "valid" && (
            <div className="space-y-5">
              <p className="text-foreground/90">{T.valid}</p>
              {email && <p className="text-sm text-muted-foreground break-all">{email}</p>}
              <Button onClick={onConfirm} className="w-full">{T.confirm}</Button>
            </div>
          )}

          {status === "submitting" && (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>{T.submitting}</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
              <p>{T.success}</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">{T.back}</Link>
              </Button>
            </div>
          )}

          {status === "already" && (
            <div className="space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
              <p>{T.already}</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">{T.back}</Link>
              </Button>
            </div>
          )}

          {(status === "invalid" || status === "error") && (
            <div className="space-y-4">
              <XCircle className="h-12 w-12 text-destructive mx-auto" />
              <p>{status === "invalid" ? T.invalid : T.error}</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">{T.back}</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
