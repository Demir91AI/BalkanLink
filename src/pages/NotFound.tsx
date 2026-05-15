import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home, Sparkles, ArrowLeft } from "lucide-react";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation("common");
  const localizedHref = useLocalizedHref();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-5 py-16">
      <SEO title="404 — Stranica nije pronađena" description="Tražena stranica ne postoji ili je premještena. Vrati se na početnu BalkanLink stranicu i nastavi pretragu." path="/404" />
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, hsla(43,70%,55%,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* 404 with gold gradient */}
        <h1
          className="font-heading text-[120px] font-[900] leading-none tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, #ffffff 20%, hsl(var(--gold)) 60%, hsl(var(--gold-light)) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 24px hsla(43,70%,55%,0.35))",
          }}
        >
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {t("notFound.title", "Stranica nije pronađena")}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
          {t(
            "notFound.description",
            "Tražena stranica ne postoji ili je premještena. Vrati se na početnu ili pitaj BalkanLink Asistenta."
          )}
        </p>

        <div className="mt-8 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link
            to={localizedHref("/")}
            className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold text-[#0a0a0a] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 50%, hsl(var(--gold)) 100%)",
              border: "1px solid hsla(43,80%,70%,0.45)",
              boxShadow:
                "0 14px 36px -10px hsla(43,70%,55%,0.65), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            <Home className="h-4 w-4" strokeWidth={2.5} />
            {t("notFound.backHome", "Nazad na početnu")}
          </Link>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-assistant"))
            }
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white active:scale-[0.97]"
          >
            <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" strokeWidth={2.5} />
            {t("notFound.askAssistant", "Pitaj Asistenta")}
          </button>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
        >
          <ArrowLeft className="h-3 w-3" />
          {t("notFound.goBack", "Vrati se nazad")}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
