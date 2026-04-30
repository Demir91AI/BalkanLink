import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ScrollText, FileText, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import EinbuergerungGuideContent from "@/components/guides/EinbuergerungGuideContent";

export default function EinbuergerungVodic() {
  const { t } = useTranslation("dvojnoDrzavljanstvo");

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <SEO
        title={t("einbuergerung.seo.title")}
        description={t("einbuergerung.seo.description")}
        path="/dvojno-drzavljanstvo/einbuergerung-vodic"
      />
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        <Breadcrumbs variant="light" />

        {/* Back link */}
        <Link
          to="/dvojno-drzavljanstvo"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("einbuergerung.backLink")}
        </Link>

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]">
              <ScrollText className="h-5 w-5" />
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#2D2D2D] leading-tight">
              {t("einbuergerung.page.title")}
            </h1>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#6B6B6B] max-w-2xl">
            {t("einbuergerung.page.subtitle")}
          </p>
        </header>

        {/* Quick CTA — Musterformular */}
        <Link
          to="/musterformular/einbuergerung"
          className="mb-6 flex items-center justify-between gap-3 rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-[#2D2D2D] mb-0.5">
                {t("einbuergerung.musterCard.title")}
              </p>
              <p className="text-[12.5px] text-[#6B6B6B] truncate">
                {t("einbuergerung.musterCard.subtitle")}
              </p>
            </div>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold"
            style={{
              background: "hsl(var(--gold))",
              color: "hsl(var(--gold-foreground))",
            }}
          >
            {t("einbuergerung.musterCard.cta")}
          </span>
        </Link>

        {/* Smart Guide content (auto: 2 free steps, ostatak Premium gated) */}
        <article className="rounded-2xl bg-white border border-[#E5DFC9] shadow-sm p-4 sm:p-6">
          <EinbuergerungGuideContent />
        </article>
      </div>
    </div>
  );
}
