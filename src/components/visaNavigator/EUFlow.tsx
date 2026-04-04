import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin, Heart, Building2, Briefcase, Shield, ExternalLink } from "lucide-react";
import TrustSystem from "./TrustSystem";

const steps = [
  { icon: MapPin, titleKey: "eu_step1", detailKey: "eu_anmeldung_detail", link: "/formulari?topic=anmeldung" },
  { icon: Heart, titleKey: "eu_step2", detailKey: "eu_kranken_detail", link: "/formulari?topic=krankenversicherung" },
  { icon: Building2, titleKey: "eu_step3", detailKey: "eu_bank_detail", link: "/formulari?topic=bankkonto" },
  { icon: Briefcase, titleKey: "eu_step4", detailKey: "eu_work_detail" },
  { icon: Shield, titleKey: "eu_step5", detailKey: "eu_permanent_detail", link: "/formulari?topic=stalni-boravak" },
];

const EUFlow = () => {
  const { t } = useTranslation("visaNavigator");

  return (
    <div className="space-y-8">
      {/* EU Badge */}
      <span
        className="inline-block text-[13px] font-semibold px-[14px] py-1 rounded-[20px]"
        style={{ background: "#DCFCE7", color: "#166534" }}
      >
        🇪🇺 {t("badge_eu")}
      </span>

      {/* Heading */}
      <div>
        <h2 className="text-[22px] font-bold text-[#2D2D2D]">{t("eu_title")}</h2>
        <p className="text-[15px] text-[#4A4A4A] leading-[1.7] mt-2 mb-8">
          {t("eu_freedom")}
        </p>
      </div>

      {/* Steps */}
      <div>
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-4"
          style={{ color: "#C9A84C" }}
        >
          {t("eu_title")}
        </p>
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.titleKey}
                className="bg-white rounded-xl px-6 py-5 flex items-start gap-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                {/* Number circle */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "#C9A84C" }}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={20} style={{ color: "#C9A84C" }} />
                    <span className="font-semibold text-[15px] text-[#2D2D2D]">
                      {t(step.titleKey)}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6B6B6B] leading-relaxed">
                    {t(step.detailKey)}
                  </p>
                  {step.link && (
                    <Link
                      to={step.link}
                      className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium hover:underline"
                      style={{ color: "#C9A84C" }}
                    >
                      {t("learn_more")}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sources */}
      <div className="mt-8">
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-3"
          style={{ color: "#C9A84C" }}
        >
          {t("sources_title")}
        </p>
        <a
          href="https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizens/index_de.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:underline"
        >
          <ExternalLink size={14} />
          {t("source_youreurope")}
        </a>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-[10px] px-5 py-4 mt-6"
        style={{ background: "#F9F6F0" }}
      >
        <div className="flex items-start gap-2.5">
          <Info size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#6B6B6B" }} />
          <div>
            <p className="text-[13px] text-[#6B6B6B] leading-relaxed">
              {t("disclaimer")}
            </p>
            <p className="text-[13px] text-[#6B6B6B] leading-relaxed mt-1">
              {t("warning")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EUFlow;
