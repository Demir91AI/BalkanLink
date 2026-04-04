import { useTranslation } from "react-i18next";
import {
  Briefcase, CreditCard, Users, GraduationCap, RefreshCw, Home,
  ExternalLink, Info, Zap, Clock, CheckCircle, Scale, FileText,
  AlertTriangle, ArrowLeft, Lightbulb, ListOrdered, MapPin, Star,
} from "lucide-react";
import TrustSystem from "./TrustSystem";

const EMBASSY_MAP: Record<string, { label: string; url: string }> = {
  ba: { label: "Sarajevo", url: "https://sarajevo.diplo.de" },
  rs: { label: "Beograd", url: "https://belgrad.diplo.de" },
  me: { label: "Podgorica", url: "https://podgorica.diplo.de" },
  mk: { label: "Skopje", url: "https://skopje.diplo.de" },
  al: { label: "Tirana", url: "https://tirana.diplo.de" },
  xk: { label: "Prishtina", url: "https://pristina.diplo.de" },
};

const FLAG_MAP: Record<string, string> = {
  ba: "🇧🇦", rs: "🇷🇸", me: "🇲🇪", mk: "🇲🇰", al: "🇦🇱", xk: "🇽🇰",
};

type Difficulty = "low" | "medium" | "high";

interface RouteConfig {
  id: string;
  icon: typeof Briefcase;
  titleKey: string;
  subtitleKey: string;
  difficulty: Difficulty;
  timeKey: string;
  timeCount: number;
  eligibilityKey: string;
  legalKey: string;
  warningKeys: string[];
  ctaUrl: string;
  /** Keys for full steps from formulare namespace */
  stepKeys?: string[];
  docKeys?: string[];
  costKeys?: string[];
  errorKeys?: string[];
  formButtons?: { labelKey: string; formId: string }[];
  pdfLinks?: { label: string; url: string }[];
}

const ROUTES: RouteConfig[] = [
  {
    id: "work",
    icon: Briefcase,
    titleKey: "route_work",
    subtitleKey: "route_work_sub",
    difficulty: "medium",
    timeKey: "time_months",
    timeCount: 4,
    eligibilityKey: "route_work_eligibility",
    legalKey: "route_work_legal",
    warningKeys: ["route_work_warning1", "route_work_warning2"],
    ctaUrl: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit",
    stepKeys: Array.from({ length: 9 }, (_, i) => `visa_work_step${i + 1}`),
    docKeys: Array.from({ length: 10 }, (_, i) => `visa_work_doc${i + 1}`),
    costKeys: Array.from({ length: 9 }, (_, i) => `visa_work_cost${i + 1}`),
    errorKeys: Array.from({ length: 8 }, (_, i) => `visa_work_err${i + 1}`),
    formButtons: [
      { labelKey: "work_form1", formId: "visa-work-form1" },
      { labelKey: "work_form2", formId: "visa-work-form2" },
    ],
    pdfLinks: [
      { label: "BAMF – Arbeit", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html" },
      { label: "EzB Formular (BA)", url: "https://www.arbeitsagentur.de/datei/ezb_ba047549.pdf" },
    ],
  },
  {
    id: "bluecard",
    icon: CreditCard,
    titleKey: "route_blue_card",
    subtitleKey: "route_bluecard_sub",
    difficulty: "medium",
    timeKey: "time_months",
    timeCount: 3,
    eligibilityKey: "route_bluecard_eligibility",
    legalKey: "route_bluecard_legal",
    warningKeys: ["route_bluecard_warning1", "route_bluecard_warning2"],
    ctaUrl: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/blaue-karte-eu",
    stepKeys: Array.from({ length: 8 }, (_, i) => `visa_bluecard_step${i + 1}`),
    docKeys: Array.from({ length: 10 }, (_, i) => `visa_bluecard_doc${i + 1}`),
    costKeys: Array.from({ length: 8 }, (_, i) => `visa_bluecard_cost${i + 1}`),
    errorKeys: Array.from({ length: 8 }, (_, i) => `visa_bluecard_err${i + 1}`),
    formButtons: [{ labelKey: "bluecard_form", formId: "visa-bluecard-form" }],
    pdfLinks: [
      { label: "BAMF – Blaue Karte EU", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/BlaueKarte/blaue-karte-node.html" },
    ],
  },
  {
    id: "family",
    icon: Users,
    titleKey: "route_family",
    subtitleKey: "route_family_sub",
    difficulty: "high",
    timeKey: "time_months",
    timeCount: 5,
    eligibilityKey: "route_family_eligibility",
    legalKey: "route_family_legal",
    warningKeys: ["route_family_warning1", "route_family_warning2"],
    ctaUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthaltsrecht",
    stepKeys: Array.from({ length: 8 }, (_, i) => `visa_family_step${i + 1}`),
    docKeys: Array.from({ length: 12 }, (_, i) => `visa_family_doc${i + 1}`),
    costKeys: Array.from({ length: 8 }, (_, i) => `visa_family_cost${i + 1}`),
    errorKeys: Array.from({ length: 8 }, (_, i) => `visa_family_err${i + 1}`),
    formButtons: [{ labelKey: "family_form", formId: "visa-family-form" }],
    pdfLinks: [
      { label: "BAMF – Familiennachzug", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html" },
      { label: "Termin (digital.diplo.de)", url: "https://digital.diplo.de/visa" },
    ],
  },
  {
    id: "study",
    icon: GraduationCap,
    titleKey: "route_study",
    subtitleKey: "route_study_sub",
    difficulty: "medium",
    timeKey: "time_months",
    timeCount: 4,
    eligibilityKey: "route_study_eligibility",
    legalKey: "route_study_legal",
    warningKeys: ["route_study_warning1", "route_study_warning2"],
    ctaUrl: "https://www.study-in-germany.de",
    stepKeys: Array.from({ length: 9 }, (_, i) => `visa_study_step${i + 1}`),
    docKeys: Array.from({ length: 11 }, (_, i) => `visa_study_doc${i + 1}`),
    costKeys: Array.from({ length: 9 }, (_, i) => `visa_study_cost${i + 1}`),
    errorKeys: Array.from({ length: 8 }, (_, i) => `visa_study_err${i + 1}`),
    formButtons: [{ labelKey: "study_form", formId: "visa-study-form" }],
    pdfLinks: [
      { label: "BAMF – Studium §16b", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html" },
      { label: "uni-assist.de", url: "https://www.uni-assist.de" },
    ],
  },
  {
    id: "extension",
    icon: RefreshCw,
    titleKey: "route_extension",
    subtitleKey: "route_extension_sub",
    difficulty: "low",
    timeKey: "time_weeks",
    timeCount: 6,
    eligibilityKey: "route_extension_eligibility",
    legalKey: "route_extension_legal",
    warningKeys: ["route_extension_warning1", "route_extension_warning2"],
    ctaUrl: "https://www.bamf.de",
  },
  {
    id: "permanent",
    icon: Home,
    titleKey: "route_permanent",
    subtitleKey: "route_permanent_sub",
    difficulty: "high",
    timeKey: "time_months",
    timeCount: 6,
    eligibilityKey: "route_permanent_eligibility",
    legalKey: "route_permanent_legal",
    warningKeys: ["route_permanent_warning1", "route_permanent_warning2"],
    ctaUrl: "https://www.bamf.de",
    stepKeys: Array.from({ length: 8 }, (_, i) => `visa_permanent_step${i + 1}`),
    docKeys: Array.from({ length: 15 }, (_, i) => `visa_permanent_doc${i + 1}`),
    costKeys: Array.from({ length: 7 }, (_, i) => `visa_permanent_cost${i + 1}`),
    errorKeys: Array.from({ length: 8 }, (_, i) => `visa_permanent_err${i + 1}`),
    formButtons: [
      { labelKey: "permanent_form1", formId: "visa-permanent-form1" },
      { labelKey: "permanent_form2", formId: "visa-permanent-form2" },
    ],
    pdfLinks: [
      { label: "BAMF – Niederlassungserlaubnis", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html" },
      { label: "Deutsche Rentenversicherung (DRV)", url: "https://www.drv.de" },
    ],
  },
];

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; color: string }> = {
  low: { bg: "#DCFCE7", color: "#166534" },
  medium: { bg: "#FEF9C3", color: "#854D0E" },
  high: { bg: "#FEE2E2", color: "#991B1B" },
};

interface NonEUFlowProps {
  selectedCountry: string;
  selectedRoute: string | null;
  onSelectRoute: (route: string | null) => void;
  onOpenForm?: (formId: string) => void;
}

const NonEUFlow = ({ selectedCountry, selectedRoute, onSelectRoute, onOpenForm }: NonEUFlowProps) => {
  const { t } = useTranslation("visaNavigator");
  const { t: tf } = useTranslation("formulare");
  const embassy = EMBASSY_MAP[selectedCountry];
  const flag = FLAG_MAP[selectedCountry] || "";
  const route = ROUTES.find((r) => r.id === selectedRoute);

  // STATE B — Route Detail
  if (selectedRoute && route) {
    const diffStyle = DIFFICULTY_STYLES[route.difficulty];
    return (
      <div className="space-y-6">
        {/* Back */}
        <button
          onClick={() => onSelectRoute(null)}
          className="inline-flex items-center gap-1.5 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors"
        >
          <ArrowLeft size={16} />
          {t("back_to_routes")}
        </button>

        {/* Header */}
        <div>
          <h2 className="text-[22px] font-bold text-[#2D2D2D]">{t(route.titleKey)}</h2>
          <p className="text-[14px] text-[#6B6B6B] mt-1">{t(route.subtitleKey)}</p>
        </div>

        {/* Info row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <p className="text-[12px] text-[#6B6B6B] mb-1">{t("panel_difficulty")}</p>
            <span className="inline-block text-[12px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: diffStyle.bg, color: diffStyle.color }}>
              {t(`difficulty_${route.difficulty}`)}
            </span>
          </div>
          <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <p className="text-[12px] text-[#6B6B6B] mb-1">{t("panel_time")}</p>
            <div className="flex items-center gap-1 text-[14px] text-[#2D2D2D]">
              <Clock size={16} />
              {t(route.timeKey, { count: route.timeCount })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <p className="text-[12px] text-[#6B6B6B] mb-1">{t("legal_summary")}</p>
            <p className="text-[13px] text-[#6B6B6B]">{t(route.legalKey)}</p>
          </div>
        </div>

        {/* Context card */}
        <div className="rounded-[14px] px-6 py-5" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
            <div>
              <p className="font-bold text-[15px] mb-1" style={{ color: "#92400E" }}>
                {t(`${route.id}_context_title`)}
              </p>
              <p className="text-[14px] leading-[1.7]" style={{ color: "#4A4A4A" }}>
                {t(`${route.id}_context_body`)}
              </p>
              {t(`${route.id}_context_url`) && !t(`${route.id}_context_url`).startsWith(route.id) && (
                <a href={t(`${route.id}_context_url`)} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium hover:underline" style={{ color: "#C9A84C" }}>
                  <ExternalLink size={14} />
                  {t(`${route.id}_context_link`)}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Route-specific special cards */}
        {route.id === "work" && (
          <div className="rounded-[14px] px-6 py-5" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
            <div className="flex items-start gap-3">
              <Zap size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
              <div>
                <p className="font-bold text-[15px] mb-1" style={{ color: "#92400E" }}>{t("westbalkan_rule_title")}</p>
                <p className="text-[14px] leading-[1.7]" style={{ color: "#4A4A4A" }}>{t("westbalkan_rule_body")}</p>
                <a href="https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium hover:underline" style={{ color: "#C9A84C" }}>
                  <ExternalLink size={14} /> Make it in Germany →
                </a>
              </div>
            </div>
          </div>
        )}

        {route.id === "bluecard" && (
          <div className="rounded-[14px] px-6 py-5" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
            <div className="flex items-start gap-3">
              <Star size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
              <div>
                <p className="font-bold text-[15px] mb-1" style={{ color: "#92400E" }}>{t("salary_standard")}</p>
                <div className="flex gap-3 mt-2">
                  <div className="rounded-lg px-4 py-2" style={{ background: "#FEF9C3" }}>
                    <p className="text-[18px] font-bold text-[#854D0E]">45.300 €</p>
                    <p className="text-[11px] text-[#854D0E]">{t("salary_standard")}</p>
                  </div>
                  <div className="rounded-lg px-4 py-2" style={{ background: "#EFF6FF" }}>
                    <p className="text-[18px] font-bold text-[#1E40AF]">41.041,80 €</p>
                    <p className="text-[11px] text-[#1E40AF]">{t("salary_shortage")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {route.id === "family" && (
          <div className="rounded-[14px] px-6 py-5" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
              <div>
                <p className="font-bold text-[15px] mb-1" style={{ color: "#92400E" }}>{tf("visa_family_lang_title")}</p>
                <p className="text-[14px] leading-[1.7]" style={{ color: "#4A4A4A" }}>{tf("visa_family_lang_body")}</p>
                <a href="https://www.goethe.de" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium hover:underline" style={{ color: "#C9A84C" }}>
                  <ExternalLink size={14} /> Goethe-Institut →
                </a>
              </div>
            </div>
          </div>
        )}

        {route.id === "study" && (
          <>
            <div className="rounded-[14px] px-6 py-5" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                <div>
                  <p className="font-bold text-[15px] mb-1" style={{ color: "#92400E" }}>{tf("visa_study_finance_title")}</p>
                  <div className="flex gap-3 mt-2 mb-3">
                    <div className="rounded-lg px-4 py-2" style={{ background: "#FEF9C3" }}>
                      <p className="text-[18px] font-bold text-[#854D0E]">11.208 €</p>
                      <p className="text-[11px] text-[#854D0E]">Sperrkonto 2025</p>
                    </div>
                    <div className="rounded-lg px-4 py-2" style={{ background: "#EFF6FF" }}>
                      <p className="text-[18px] font-bold text-[#1E40AF]">934 €</p>
                      <p className="text-[11px] text-[#1E40AF]">{t("sperrkonto_amount").split("(")[1]?.replace(")", "") || "/Monat"}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#6B6B6B]">Fintiba · Expatrio · Coracle · Deutsche Bank</p>
                </div>
              </div>
            </div>
            <div className="rounded-[14px] p-5" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <div className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#16A34A" }} />
                <p className="text-[14px] text-[#166534] leading-relaxed">
                  <strong>140 {tf("visa_study_work1").includes("Tage") ? "Tage" : "dana"} / 280 {tf("visa_study_work1").includes("halbe") ? "halbe Tage" : "pola-dana"}</strong> — {tf("visa_study_work1")}
                </p>
              </div>
            </div>
          </>
        )}

        {route.id === "permanent" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[14px] p-5" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
                <p className="font-bold text-[15px] text-[#2D2D2D] mb-1">{tf("visa_permanent_diff_ne")}</p>
                <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{tf("visa_permanent_diff_ne_body")}</p>
              </div>
              <div className="rounded-[14px] p-5" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                <p className="font-bold text-[15px] text-[#2D2D2D] mb-1">{tf("visa_permanent_diff_eu")}</p>
                <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{tf("visa_permanent_diff_eu_body")}</p>
              </div>
            </div>
            <div className="rounded-lg px-5 py-3 text-center font-semibold text-[14px]" style={{ background: "#FEF9C3", color: "#854D0E" }}>
              💡 {t("apply_both_together")}
            </div>
            <div className="rounded-[14px] p-5" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
              <div className="flex items-start gap-2">
                <Star size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#2563EB" }} />
                <p className="text-[14px] text-[#1E40AF] leading-relaxed">
                  <strong>Blue Card:</strong> 21 {tf("visa_permanent_fast1").includes("Monate") ? "Monate" : "mj."} (B1) / 33 {tf("visa_permanent_fast1").includes("Monate") ? "Monate" : "mj."} (ohne B1)
                </p>
              </div>
            </div>
          </>
        )}

        {/* Eligibility */}
        <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
            {t("eligibility")}
          </p>
          <div className="flex items-start gap-2">
            <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#22C55E" }} />
            <p className="text-[14px] text-[#4A4A4A] leading-relaxed">{t(route.eligibilityKey)}</p>
          </div>
        </div>

        {/* Steps */}
        {route.stepKeys && route.stepKeys.length > 0 && (
          <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: "#C9A84C" }}>
              {t("steps_title")}
            </p>
            <div className="space-y-3">
              {route.stepKeys.map((key, i) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold" style={{ background: "#C9A84C" }}>
                    {i + 1}
                  </div>
                  <p className="text-[14px] text-[#4A4A4A] leading-relaxed pt-0.5">{tf(key)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {route.docKeys && route.docKeys.length > 0 && (
          <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#C9A84C" }}>
              {t("docs_title")}
            </p>
            <ul className="space-y-2">
              {route.docKeys.map((key, i) => (
                <li key={key} className="flex items-start gap-2 text-[14px] text-[#4A4A4A]">
                  <span className="text-[12px] font-bold text-[#C9A84C] mt-0.5 w-5 text-right flex-shrink-0">{i + 1}.</span>
                  <span>{tf(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Costs */}
        {route.costKeys && route.costKeys.length > 0 && (
          <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#C9A84C" }}>
              {t("costs_title")}
            </p>
            <ul className="space-y-2">
              {route.costKeys.map((key) => (
                <li key={key} className="flex items-center gap-2 text-[14px] text-[#4A4A4A]">
                  <Clock size={14} style={{ color: "#C9A84C" }} className="flex-shrink-0" />
                  {tf(key)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings/Errors */}
        {route.errorKeys && route.errorKeys.length > 0 && (
          <div className="rounded-[14px] p-6" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#991B1B" }}>
              {t("errors_title")}
            </p>
            <div className="space-y-2">
              {route.errorKeys.map((key) => (
                <div key={key} className="flex items-start gap-2">
                  <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#EF4444" }} />
                  <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{tf(key)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Musterformulare */}
        {route.formButtons && route.formButtons.length > 0 && (
          <div className="rounded-[14px] p-6" style={{ background: "#1A1A2E", border: "1px solid #2D2D4A" }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-1 text-[#C9A84C]">
              {t("musterformulare_title")}
            </p>
            <p className="text-[13px] text-[#9CA3AF] mb-4">{t("musterformulare_hint")}</p>
            <div className="flex flex-col gap-2">
              {route.formButtons.map((fb) => (
                <button
                  key={fb.formId}
                  onClick={() => onOpenForm?.(fb.formId)}
                  className="w-full text-left rounded-lg px-5 py-3.5 text-[14px] font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #B8962F)" }}
                >
                  📋 {t(fb.labelKey)} →
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PDF links */}
        {route.pdfLinks && route.pdfLinks.length > 0 && (
          <div className="rounded-xl px-5 py-4" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-[12px] text-[#6B6B6B] mb-2">{t("pdf_hint")}</p>
            <div className="flex flex-col gap-1.5">
              {route.pdfLinks.map((pl) => (
                <a key={pl.url} href={pl.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-[#2D2D2D] hover:underline">
                  <FileText size={14} /> 📄 {pl.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="mt-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#C9A84C" }}>
            {t("sources_title")}
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              { key: "source_bamf", url: "https://www.bamf.de" },
              { key: "source_auswamt", url: "https://www.auswaertiges-amt.de" },
              { key: "source_makeitingermany", url: "https://www.make-it-in-germany.com" },
            ].map((s) => (
              <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:underline">
                <ExternalLink size={14} /> {t(s.key)}
              </a>
            ))}
          </div>
        </div>

        <TrustSystem variant="full" showSources={true} />
      </div>
    );
  }

  // STATE A — No route selected
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl">{flag}</span>
        <span className="text-[18px] font-bold text-[#2D2D2D]">{t(`country_${selectedCountry}`)}</span>
        <span className="text-[12px] font-semibold px-3 py-0.5 rounded-full"
          style={{ background: "#FFF8EC", color: "#C9A84C", border: "1px solid #E8D9B0" }}>
          {t("badge_western_balkans")}
        </span>
      </div>

      {embassy && (
        <a href={embassy.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">
          <ExternalLink size={14} /> {t("panel_embassy")}: {embassy.label}
        </a>
      )}

      <div className="rounded-xl px-5 py-4" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <div className="flex items-start gap-3">
          <Zap size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
          <div>
            <p className="font-bold text-[15px] text-[#2D2D2D] mb-1">Westbalkanregelung</p>
            <p className="text-[14px] text-[#4A4A4A] leading-relaxed">{t("westbalkan_rule")}</p>
            <a href={t("westbalkan_rule_url")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium hover:underline" style={{ color: "#C9A84C" }}>
              {t("learn_more")}
            </a>
          </div>
        </div>
      </div>

      {selectedCountry === "xk" && (
        <div className="rounded-xl px-4 py-3" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
          <p className="text-[14px] text-[#1E40AF]">{t("kosovo_note")}</p>
        </div>
      )}
      {selectedCountry !== "xk" && (
        <div className="rounded-xl px-4 py-3" style={{ background: "#EFF6FF" }}>
          <p className="text-[14px] text-[#1E40AF]">{t("schengen_free")}</p>
        </div>
      )}

      <div>
        <h3 className="text-[18px] font-bold text-[#2D2D2D] mb-4">{t("noneu_routes_title")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {ROUTES.map((r) => {
            const Icon = r.icon;
            const ds = DIFFICULTY_STYLES[r.difficulty];
            return (
              <button key={r.id} onClick={() => onSelectRoute(r.id)}
                className="bg-white rounded-xl p-5 text-left transition-all duration-200 hover:scale-[1.02]"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <Icon size={24} style={{ color: "#C9A84C" }} className="mb-3" />
                <p className="font-bold text-[16px] text-[#2D2D2D] mb-1">{t(r.titleKey)}</p>
                <p className="text-[13px] text-[#6B6B6B] mb-3">{t(r.subtitleKey)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: ds.bg, color: ds.color }}>
                    {t(`difficulty_${r.difficulty}`)}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-[#6B6B6B]">
                    <Clock size={14} /> {t(r.timeKey, { count: r.timeCount })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <TrustSystem variant="full" showSources={false} />
    </div>
  );
};

export default NonEUFlow;
