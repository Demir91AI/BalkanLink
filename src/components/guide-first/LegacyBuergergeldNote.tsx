import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

/** Shown when an old /musterformular/buergergeld link was redirected here. */
export default function LegacyBuergergeldNote() {
  const { t } = useTranslation("pages");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  if (params.get("from") !== "buergergeld") return null;
  return (
    <div data-testid="legacy-buergergeld-note" className="mb-6 rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-4">
      <p className="text-sm font-semibold text-foreground">{t("guideFirst.legacy.buergergeldTitle")}</p>
      <p className="mt-1 text-sm text-foreground/80">{t("guideFirst.legacy.buergergeldBody")}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={() => navigate("/formulari/hauptantrag", { replace: true })} className="rounded-xl border border-[hsl(var(--gold))]/40 px-3 py-2 text-sm font-semibold text-[hsl(var(--gold))]">
          {t("guideFirst.legacy.hauptantrag")}
        </button>
        <button type="button" onClick={() => navigate("/formulari/weiterbewilligung")} className="rounded-xl border border-border/60 px-3 py-2 text-sm font-semibold text-foreground">
          {t("guideFirst.legacy.weiterbewilligung")}
        </button>
      </div>
    </div>
  );
}
