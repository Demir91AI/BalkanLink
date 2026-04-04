import { useTranslation } from "react-i18next";
import {
  Briefcase, CreditCard, Users, GraduationCap, RefreshCw, Home,
  ExternalLink, Info, Zap, Clock, CheckCircle, Scale, FileText,
  AlertTriangle, ArrowLeft, Lightbulb,
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
  documents: string[];
  ctaUrl: string;
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
    documents: ["Reisepass", "Arbeitsvertrag", "Qualifikationsnachweis", "Krankenversicherung", "Passfoto"],
    ctaUrl: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit",
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
    documents: ["Reisepass", "Hochschulabschluss", "Arbeitsvertrag (≥ Mindestgehalt)", "Krankenversicherung", "Passfoto"],
    ctaUrl: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/blaue-karte-eu",
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
    documents: ["Reisepass", "Heiratsurkunde / Geburtsurkunde", "A1-Zertifikat", "Aufenthaltstitel des Familienangehörigen", "Krankenversicherung"],
    ctaUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthaltsrecht",
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
    documents: ["Reisepass", "Zulassungsbescheid", "Finanzierungsnachweis / Sperrkonto", "Sprachzertifikat", "Krankenversicherung"],
    ctaUrl: "https://www.study-in-germany.de",
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
    documents: ["Reisepass", "Aktueller Aufenthaltstitel", "Arbeitsvertrag / Immatrikulation", "Mietvertrag", "Krankenversicherung"],
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
    documents: ["Reisepass", "Aufenthaltstitel (5 Jahre)", "Rentenversicherungsnachweis (60 Monate)", "B1-Zertifikat", "Einkommensnachweis"],
    ctaUrl: "https://www.bamf.de",
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
}

const NonEUFlow = ({ selectedCountry, selectedRoute, onSelectRoute }: NonEUFlowProps) => {
  const { t } = useTranslation("visaNavigator");
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
            <span
              className="inline-block text-[12px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: diffStyle.bg, color: diffStyle.color }}
            >
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

        {/* Legal */}
        <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
            {t("legal_summary")}
          </p>
          <div className="flex items-start gap-2">
            <Scale size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
            <p className="text-[14px] text-[#4A4A4A] leading-relaxed">{t(route.legalKey)}</p>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#C9A84C" }}>
            {t("docs_required")}
          </p>
          <ul className="space-y-2">
            {route.documents.map((doc) => (
              <li key={doc} className="flex items-center gap-2 text-[14px] text-[#4A4A4A]">
                <FileText size={16} style={{ color: "#C9A84C" }} />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings */}
        <div
          className="rounded-[14px] p-6"
          style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: "#991B1B" }}>
            {t("warnings_title")}
          </p>
          <div className="space-y-2">
            {route.warningKeys.map((wk) => (
              <div key={wk} className="flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#EF4444" }} />
                <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{t(wk)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={route.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold text-[15px] rounded-lg px-7 py-3.5 transition-all hover:opacity-90"
          style={{ background: "#C9A84C" }}
        >
          {t("panel_cta")}
          <ExternalLink size={16} />
        </a>

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
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:underline"
              >
                <ExternalLink size={14} />
                {t(s.key)}
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-[10px] px-5 py-4" style={{ background: "#F9F6F0" }}>
          <div className="flex items-start gap-2.5">
            <Info size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#6B6B6B" }} />
            <div>
              <p className="text-[13px] text-[#6B6B6B]">{t("disclaimer")}</p>
              <p className="text-[13px] text-[#6B6B6B] mt-1">{t("warning")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATE A — No route selected
  return (
    <div className="space-y-6">
      {/* Country header */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl">{flag}</span>
        <span className="text-[18px] font-bold text-[#2D2D2D]">
          {t(`country_${selectedCountry}`)}
        </span>
        <span
          className="text-[12px] font-semibold px-3 py-0.5 rounded-full"
          style={{ background: "#FFF8EC", color: "#C9A84C", border: "1px solid #E8D9B0" }}
        >
          {t("badge_western_balkans")}
        </span>
      </div>

      {/* Embassy */}
      {embassy && (
        <a
          href={embassy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors"
        >
          <ExternalLink size={14} />
          {t("panel_embassy")}: {embassy.label}
        </a>
      )}

      {/* Westbalkan rule */}
      <div
        className="rounded-xl px-5 py-4"
        style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}
      >
        <div className="flex items-start gap-3">
          <Zap size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
          <div>
            <p className="font-bold text-[15px] text-[#2D2D2D] mb-1">Westbalkanregelung</p>
            <p className="text-[14px] text-[#4A4A4A] leading-relaxed">{t("westbalkan_rule")}</p>
            <a
              href={t("westbalkan_rule_url")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium hover:underline"
              style={{ color: "#C9A84C" }}
            >
              {t("learn_more")}
            </a>
          </div>
        </div>
      </div>

      {/* Kosovo note */}
      {selectedCountry === "xk" && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <p className="text-[14px] text-[#1E40AF]">{t("kosovo_note")}</p>
        </div>
      )}

      {/* Schengen free (not for xk) */}
      {selectedCountry !== "xk" && (
        <div className="rounded-xl px-4 py-3" style={{ background: "#EFF6FF" }}>
          <p className="text-[14px] text-[#1E40AF]">{t("schengen_free")}</p>
        </div>
      )}

      {/* Routes grid */}
      <div>
        <h3 className="text-[18px] font-bold text-[#2D2D2D] mb-4">{t("noneu_routes_title")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {ROUTES.map((r) => {
            const Icon = r.icon;
            const diffStyle = DIFFICULTY_STYLES[r.difficulty];
            return (
              <button
                key={r.id}
                onClick={() => onSelectRoute(r.id)}
                className="bg-white rounded-xl p-5 text-left transition-all duration-200 hover:scale-[1.02]"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                <Icon size={24} style={{ color: "#C9A84C" }} className="mb-3" />
                <p className="font-bold text-[16px] text-[#2D2D2D] mb-1">{t(r.titleKey)}</p>
                <p className="text-[13px] text-[#6B6B6B] mb-3">{t(r.subtitleKey)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: diffStyle.bg, color: diffStyle.color }}
                  >
                    {t(`difficulty_${r.difficulty}`)}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-[#6B6B6B]">
                    <Clock size={14} />
                    {t(r.timeKey, { count: r.timeCount })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-[10px] px-5 py-4" style={{ background: "#F9F6F0" }}>
        <div className="flex items-start gap-2.5">
          <Info size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#6B6B6B" }} />
          <div>
            <p className="text-[13px] text-[#6B6B6B]">{t("disclaimer")}</p>
            <p className="text-[13px] text-[#6B6B6B] mt-1">{t("warning")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonEUFlow;
