import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageNavBar from "@/components/navigation/PageNavBar";

export default function CookieRichtlinie() {
  const { t } = useTranslation("legal");

  const [analytics, setAnalytics] = useState(() => {
    try {
      const s = localStorage.getItem("bl-cookie-consent");
      return s ? JSON.parse(s).statistics ?? false : false;
    } catch { return false; }
  });

  const handleSave = () => {
    localStorage.setItem("bl-cookie-consent", JSON.stringify({
      necessary: true,
      functional: false,
      statistics: analytics,
      marketing: false,
    }));
    alert(t("cookies.saved"));
  };

  const necessaryItems = t("cookies.necessaryItems", {
    returnObjects: true,
    defaultValue: [] as string[],
  }) as string[];
  const deleteItems = t("cookies.deleteItems", {
    returnObjects: true,
    defaultValue: [] as string[],
  }) as string[];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar />
      <h1 className="mb-2 text-3xl font-bold">{t("cookies.title")}</h1>
      <p className="mb-10 text-sm text-muted-foreground">{t("cookies.subtitle")}</p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            {t("cookies.whatAreCookies")}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: t("cookies.whatAreCookiesText") }} />
          <p className="mt-2 text-xs opacity-70">{t("cookies.legalBasisShort")}</p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            {t("cookies.categoriesTitle")}
          </h2>

          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-4 mt-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-green-300">✓ {t("cookies.necessary")}</p>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                {t("cookies.alwaysActive")}
              </span>
            </div>
            <p className="mt-2 text-xs">{t("cookies.necessaryDesc")}</p>
            <ul className="ml-4 mt-2 list-disc space-y-1 text-xs">
              {Array.isArray(necessaryItems) && necessaryItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs opacity-60">{t("cookies.necessaryLegal")}</p>
          </div>

          <div className="rounded-md border border-border p-4 mt-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">📊 {t("cookies.analytics")}</p>
              <button
                onClick={() => setAnalytics(!analytics)}
                aria-label={t("cookies.analytics")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${analytics ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${analytics ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs">{t("cookies.analyticsDesc")}</p>
            <p className="mt-2 text-xs opacity-60">
              {analytics ? t("cookies.statusOn") : t("cookies.statusOff")}<br />
              {t("cookies.analyticsLegal")}
            </p>
          </div>

          <div className="rounded-md border border-border p-4 mt-4 opacity-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">🎯 {t("cookies.marketing")}</p>
              <span className="rounded-full bg-muted px-3 py-1 text-xs">
                {t("cookies.notInUse")}
              </span>
            </div>
            <p className="mt-2 text-xs" dangerouslySetInnerHTML={{ __html: t("cookies.marketingDesc") }} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            {t("cookies.deleteTitle")}
          </h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            {Array.isArray(deleteItems) && deleteItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
          <p className="mt-2 text-xs opacity-70">{t("cookies.deleteWarn")}</p>
        </section>

        <section>
          <p className="text-xs opacity-60">{t("cookies.version")}</p>
        </section>

        <div className="pt-2">
          <button
            onClick={handleSave}
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium
              text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("cookies.save")}
          </button>
        </div>

      </div>
    </div>
  );
}
