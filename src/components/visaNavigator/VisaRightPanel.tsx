import { useTranslation } from "react-i18next";
import { Globe, ExternalLink, Clock } from "lucide-react";
import { VISA_COUNTRIES, VISA_ROUTES } from "@/data/visaNavigatorData";
import TrustSystem from "./TrustSystem";

const QUICK_LINKS = [
  { key: "source_makeitingermany", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt" },
  { key: "source_bamf", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html" },
  { key: "source_youreurope", url: "https://europa.eu/youreurope/citizens/index_de.htm" },
  { key: "source_auswamt", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt" },
];

const QUICK_ROUTES = [
  { id: "work", key: "route_work" },
  { id: "blue_card", key: "route_blue_card" },
  { id: "family", key: "route_family" },
];

const DIFFICULTY_STYLES: Record<string, { bg: string; color: string }> = {
  low: { bg: "#DCFCE7", color: "#166534" },
  medium: { bg: "#FEF9C3", color: "#854D0E" },
  high: { bg: "#FEE2E2", color: "#991B1B" },
};

interface Props {
  selectedCountry: string | null;
  selectedRoute: string | null;
  onSelectRoute: (routeId: string) => void;
}

const VisaRightPanel = ({ selectedCountry, selectedRoute, onSelectRoute }: Props) => {
  const { t } = useTranslation("visaNavigator");
  const country = VISA_COUNTRIES.find((c) => c.code === selectedCountry);
  const route = VISA_ROUTES.find((r) => r.id === selectedRoute);

  return (
    <div
      className="w-[280px] flex-shrink-0 bg-white rounded-2xl sticky top-6 overflow-y-auto"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: 24,
        maxHeight: "calc(100vh - 48px)",
        scrollbarWidth: "none",
      }}
    >
      {/* STATE 3: Country + Route */}
      {country && route ? (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-[16px] text-[#2D2D2D]">{t(route.titleKey)}</h3>
            <p className="text-[13px] text-[#6B6B6B] mt-1">{t(route.subtitleKey)}</p>
          </div>
          <div className="h-px" style={{ background: "#F0EAD8" }} />

          {/* Difficulty + Time */}
          <div className="space-y-2">
            <div className="rounded-lg p-2.5" style={{ background: "#F5F0E8" }}>
              <p className="text-[11px] text-[#6B6B6B] mb-1">{t("panel_difficulty")}</p>
              <span
                className="text-[12px] font-semibold px-2 py-0.5 rounded-full inline-block"
                style={DIFFICULTY_STYLES[route.difficulty]}
              >
                {t(`difficulty_${route.difficulty}`)}
              </span>
            </div>
            <div className="rounded-lg p-2.5 flex items-center gap-1.5" style={{ background: "#F5F0E8" }}>
              <Clock size={14} className="text-[#6B6B6B]" />
              <div>
                <p className="text-[11px] text-[#6B6B6B]">{t("panel_time")}</p>
                <p className="text-[13px] text-[#2D2D2D]">
                  {t(route.timeUnit === "weeks" ? "time_weeks" : "time_months", { count: route.timeValue })}
                </p>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: "#C9A84C" }}>
              {t("legal_summary")}
            </p>
            <span className="text-[13px] font-mono rounded-md px-2.5 py-1 inline-block" style={{ background: "#F5F0E8" }}>
              {route.legalBasis}
            </span>
          </div>

          {/* CTA */}
          <a
            href={route.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-white font-semibold text-[14px] rounded-lg py-3 transition-opacity hover:opacity-90"
            style={{ background: "#C9A84C" }}
          >
            {t("panel_cta")}
            <ExternalLink size={14} />
          </a>

          {/* Sources */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
              {t("sources_title")}
            </p>
            <div className="flex flex-col gap-1">
              {route.sources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">
                  <ExternalLink size={14} style={{ color: "#C9A84C" }} />
                  {t(s.labelKey)}
                </a>
              ))}
            </div>
          </div>

          <div className="h-px" style={{ background: "#F0EAD8" }} />
          <TrustSystem variant="compact" showSources={false} />
        </div>
      ) : country ? (
        /* STATE 2: Country selected, no route */
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={country.flagUrl} alt="" className="h-7 rounded-sm" />
            <span className="font-bold text-[18px] text-[#2D2D2D]">{t(country.nameKey)}</span>
          </div>
          <span
            className="inline-block text-[12px] font-semibold px-3 py-0.5 rounded-[20px]"
            style={country.isEU
              ? { background: "#DCFCE7", color: "#166534" }
              : { background: "#FEF9C3", color: "#854D0E" }
            }
          >
            {country.isEU ? t("badge_eu") : t("badge_western_balkans")}
          </span>

          <div className="h-px" style={{ background: "#F0EAD8" }} />

          {/* Embassy */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
              {t("panel_embassy")}
            </p>
            <a
              href={country.embassyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full rounded-lg px-4 py-2.5 text-[13px] text-[#2D2D2D] transition-colors hover:bg-[#FFF8EC]"
              style={{ border: "1px solid #E0D8C8" }}
            >
              {country.embassyLabel}
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="h-px" style={{ background: "#F0EAD8" }} />

          {/* Sources */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
              {t("panel_sources")}
            </p>
            <div className="flex flex-col gap-1.5">
              {country.sources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] text-[#4A4A4A] hover:text-[#C9A84C] transition-colors">
                  <ExternalLink size={14} style={{ color: "#C9A84C" }} />
                  {t(s.labelKey)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick routes for non-EU */}
          {!country.isEU && (
            <>
              <div className="h-px" style={{ background: "#F0EAD8" }} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
                  {t("noneu_routes_title")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ROUTES.map((qr) => (
                    <button
                      key={qr.id}
                      onClick={() => onSelectRoute(qr.id)}
                      className="text-[13px] px-3.5 py-1.5 rounded-[20px] cursor-pointer transition-colors hover:border-[#C9A84C] hover:bg-[#FFF3DC]"
                      style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}
                    >
                      {t(qr.key)}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="h-px" style={{ background: "#F0EAD8" }} />
          <div className="flex items-start gap-1.5">
            <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#9CA3AF" }} />
            <p className="text-[12px] text-[#9CA3AF] leading-[1.6]">{t("disclaimer")}</p>
          </div>
        </div>
      ) : (
        /* STATE 1: Nothing selected */
        <div className="flex flex-col items-center text-center space-y-4">
          <Globe size={48} style={{ color: "#C9A84C" }} />
          <h3 className="font-bold text-[20px] text-[#2D2D2D]">{t("welcome_title")}</h3>
          <p className="text-[14px] text-[#6B6B6B] max-w-[260px]">{t("welcome_text")}</p>

          <div className="w-full h-px my-6" style={{ background: "#F0EAD8" }} />

          <div className="w-full text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#C9A84C" }}>
              Make it in Germany
            </p>
            <div className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] text-[#4A4A4A] hover:text-[#C9A84C] transition-colors"
                >
                  <ExternalLink size={14} style={{ color: "#C9A84C" }} />
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaRightPanel;
