import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export default function MoreFeaturesHint() {
  const { t } = useTranslation("pages");
  const localize = useLocalizedHref();

  return (
    <aside
      className="mt-10 rounded-2xl p-5 sm:p-6 flex items-start gap-4"
      style={{
        background: "linear-gradient(135deg, hsla(43,52%,54%,0.08), hsla(43,52%,54%,0.02))",
        border: "1px solid hsla(43,52%,54%,0.25)",
      }}
    >
      <div
        className="shrink-0 grid place-items-center w-10 h-10 rounded-xl"
        style={{ background: "hsla(43,52%,54%,0.15)" }}
      >
        <Sparkles className="h-5 w-5 text-[hsl(var(--gold))]" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-foreground">
          {t("home.moreFeatures.heading")}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t("home.moreFeatures.text")}
        </p>
        <Link
          to={localize("/pocni-ovdje")}
          className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[hsl(var(--gold))] hover:underline"
        >
          {t("home.moreFeatures.cta")} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
