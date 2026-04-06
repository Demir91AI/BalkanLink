import { useTranslation } from "@/i18n/useTranslation";
import { ExternalLink } from "lucide-react";
import type { VisaSource } from "@/data/visaNavigatorData";

interface Props {
  sources: VisaSource[];
  title?: string;
}

const LegalSources = ({ sources, title }: Props) => {
  const { t } = useTranslation("visaNavigator");

  return (
    <div>
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3"
        style={{ color: "#C9A84C" }}
      >
        {title ? t(title) : t("sources_title")}
      </p>

      <div className="flex flex-col gap-2.5">
        {sources.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] transition-colors hover:underline"
            style={{ color: "#4A4A4A" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4A4A4A")}
          >
            <ExternalLink size={14} style={{ color: "#C9A84C" }} />
            {t(s.labelKey)}
          </a>
        ))}
      </div>

      <div className="h-px mt-4 mb-2" style={{ background: "#F0EAD8" }} />
      <p className="text-[12px]" style={{ color: "#9CA3AF" }}>
        {t("disclaimer")}
      </p>
    </div>
  );
};

export default LegalSources;
