import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ScrollText, FileText, GitCompareArrows } from "lucide-react";
import { SEO } from "@/components/SEO";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DVOJNO_DRZAVLJANSTVO_COUNTRIES,
  DEFAULT_COUNTRY_ID,
  type CitizenshipStatus,
} from "@/data/dvojnoDrzavljanstvoContent";

const STATUS_BADGE: Record<
  CitizenshipStatus,
  { bg: string; text: string; border: string; icon: typeof CheckCircle2 }
> = {
  ok: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  okEu: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-300",
    icon: AlertTriangle,
  },
};

export default function DvojnoDrzavljanstvo() {
  const { t } = useTranslation("dvojnoDrzavljanstvo");
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId =
    searchParams.get("zemlja") ||
    searchParams.get("country") ||
    DEFAULT_COUNTRY_ID;

  const country = useMemo(
    () =>
      DVOJNO_DRZAVLJANSTVO_COUNTRIES.find((c) => c.id === selectedId) ??
      DVOJNO_DRZAVLJANSTVO_COUNTRIES[0],
    [selectedId],
  );

  const handleSelect = (id: string) => {
    setSearchParams({ zemlja: id }, { replace: false });
  };

  const statusKey: "ok" | "okEu" | "warning" = country.status;
  const statusBadge = STATUS_BADGE[statusKey];
  const StatusIcon = statusBadge.icon;
  const statusText = t(
    statusKey === "ok"
      ? "status.ok"
      : statusKey === "okEu"
        ? "status.okEu"
        : "status.warning",
  );

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        path="/dvojno-drzavljanstvo"
      />
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        <Breadcrumbs variant="light" />

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]">
              <ScrollText className="h-5 w-5" />
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#2D2D2D] leading-tight">
              {t("page.title")}
            </h1>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#6B6B6B] max-w-2xl">
            {t("page.subtitle")}
          </p>
        </header>

        {/* Info banner — novi njemački zakon */}
        <section
          className="mb-7 rounded-2xl border border-[#BFD8E8] bg-gradient-to-br from-[#EAF4FA] to-[#F4FAFD] p-4 sm:p-5"
          aria-labelledby="info-banner-title"
        >
          <div className="flex gap-3">
            <div className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center bg-[#1F6FB2]/10 text-[#1F6FB2]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="info-banner-title"
                className="text-[14px] font-bold text-[#1B4F7E] mb-1"
              >
                {t("page.infoBannerTitle")}
              </h2>
              <p className="text-[13.5px] leading-relaxed text-[#2D4760]">
                {t("page.infoBannerBody")}
              </p>
            </div>
          </div>
        </section>

        {/* Smart Guide CTA — Vodič kako uzeti njemačko državljanstvo */}
        <Link
          to="/dvojno-drzavljanstvo/einbuergerung-vodic"
          className="mb-7 flex items-center justify-between gap-3 rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] sm:text-[15px] font-bold text-[#2D2D2D] mb-0.5">
                {t("einbuergerung.ctaCard.title")}
              </p>
              <p className="text-[12.5px] sm:text-[13px] text-[#6B6B6B] truncate">
                {t("einbuergerung.ctaCard.subtitle")}
              </p>
            </div>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold whitespace-nowrap"
            style={{
              background: "hsl(var(--gold))",
              color: "hsl(var(--gold-foreground))",
            }}
          >
            {t("einbuergerung.ctaCard.cta")}
          </span>
        </Link>

        <div
          className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label={t("page.title")}
        >
          {DVOJNO_DRZAVLJANSTVO_COUNTRIES.map((c) => {
            const active = c.id === country.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleSelect(c.id)}
                className="shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium border transition-all"
                style={{
                  background: active ? "#FFF8EC" : "white",
                  borderColor: active ? "#C9A84C" : "#E5DFC9",
                  color: active ? "#8A6B1F" : "#2D2D2D",
                  fontWeight: active ? 700 : 500,
                  boxShadow: active
                    ? "0 1px 2px rgba(201, 168, 76, 0.15)"
                    : "none",
                }}
              >
                <span aria-hidden="true" className="text-[16px] leading-none">
                  {c.flag}
                </span>
                <span>{t(`countries.${c.id}.name`)}</span>
              </button>
            );
          })}
        </div>

        {/* Active country card */}
        <article
          className="rounded-2xl bg-white border border-[#E5DFC9] shadow-sm p-5 sm:p-7 animate-fade-in"
          key={country.id}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="text-[36px] leading-none select-none"
              >
                {country.flag}
              </span>
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#2D2D2D]">
                {t(`countries.${country.id}.name`)}
              </h2>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-[12.5px] font-semibold ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}
            >
              <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{statusText}</span>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue={country.sectionKeys[0]}
            className="w-full divide-y divide-[#F0EAD8]"
          >
            {country.sectionKeys.map((sectionKey) => (
              <AccordionItem
                key={sectionKey}
                value={sectionKey}
                className="border-b-0"
              >
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#2D2D2D] hover:no-underline py-4">
                  {t(
                    `countries.${country.id}.sections.${sectionKey}.title`,
                  )}
                </AccordionTrigger>
                <AccordionContent className="text-[14.5px] leading-relaxed text-[#3D3D3D] pb-5">
                  {t(
                    `countries.${country.id}.sections.${sectionKey}.body`,
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>

        {/* Bottom disclaimer */}
        <aside
          className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5"
          role="note"
        >
          <div className="flex gap-3">
            <AlertTriangle
              className="h-5 w-5 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <div>
              <p className="text-[13px] font-bold text-amber-900 mb-1">
                {t("disclaimer.title")}
              </p>
              <p className="text-[13px] leading-relaxed text-amber-900/90">
                {t("disclaimer.body")}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
