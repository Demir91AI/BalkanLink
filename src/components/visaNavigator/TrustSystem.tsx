import { useLanguage } from "@/contexts/LanguageContext";
import { Info, AlertTriangle, ExternalLink } from "lucide-react";

const SOURCES = [
  { key: "source_bamf", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html" },
  { key: "source_auswamt", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt" },
  { key: "source_makeitingermany", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt" },
  { key: "source_youreurope", url: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm" },
];

interface Props {
  variant: "full" | "compact";
  showSources?: boolean;
}

const TrustSystem = ({ variant, showSources = true }: Props) => {
  const { t } = useTranslation("visaNavigator");

  if (variant === "compact") {
    return (
      <div className="flex items-start gap-1.5">
        <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#9CA3AF" }} />
        <p className="text-[12px] leading-[1.5]" style={{ color: "#9CA3AF" }}>
          {t("disclaimer")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {/* Disclaimer block */}
      <div
        className="rounded-xl px-6 py-5"
        style={{ background: "#F9F6F0", border: "1px solid #E8E0D0" }}
      >
        <div className="flex items-start gap-2.5">
          <Info size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#6B6B6B" }} />
          <p className="text-[14px] leading-[1.7]" style={{ color: "#4A4A4A" }}>
            {t("disclaimer")}
          </p>
        </div>
        <div className="flex items-start gap-2.5 mt-2.5">
          <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#D97706" }} />
          <p className="text-[13px] leading-[1.6]" style={{ color: "#6B6B6B" }}>
            {t("warning")}
          </p>
        </div>
      </div>

      {/* Sources */}
      {showSources && (
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            {t("sources_title")}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {SOURCES.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] transition-colors hover:underline"
                style={{ color: "#4A4A4A" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4A4A4A")}
              >
                <ExternalLink size={14} style={{ color: "#C9A84C" }} />
                {t(s.key)}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Legal notice */}
      <p className="text-[12px] text-center" style={{ color: "#9CA3AF" }}>
        § AufenthG · § FreizügG/EU · BAMF · Auswärtiges Amt · Stand 2025
      </p>
    </div>
  );
};

export default TrustSystem;
