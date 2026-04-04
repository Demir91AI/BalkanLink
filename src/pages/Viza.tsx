import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Home as HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VISA_COUNTRIES } from "@/data/visaNavigatorData";
import CountrySelector from "@/components/visaNavigator/CountrySelector";
import EUFlow from "@/components/visaNavigator/EUFlow";
import NonEUFlow from "@/components/visaNavigator/NonEUFlow";
import DecisionSystem from "@/components/visaNavigator/DecisionSystem";
import VisaRightPanel from "@/components/visaNavigator/VisaRightPanel";

export default function Viza() {
  const { t } = useTranslation("visaNavigator");
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const country = VISA_COUNTRIES.find((c) => c.code === selectedCountry);

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
    setSelectedRoute(null);
  };

  // Breadcrumb
  const breadcrumbs = [
    { label: t("title"), onClick: () => { setSelectedCountry(null); setSelectedRoute(null); } },
    ...(selectedCountry ? [{ label: t(`country_${selectedCountry}`), onClick: () => { setSelectedRoute(null); } }] : []),
    ...(selectedRoute ? [{ label: t(`route_${selectedRoute === "blue_card" ? "blue_card" : selectedRoute}`), onClick: () => {} }] : []),
  ];

  // Main content
  const renderMain = () => {
    if (!selectedCountry) {
      return <CountrySelector selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry} />;
    }

    if (country?.isEU) {
      return <EUFlow />;
    }

    if (!selectedRoute) {
      return (
        <>
          <CountrySelector selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry} />
          <DecisionSystem
            selectedCountry={selectedCountry}
            onSelectRoute={setSelectedRoute}
            onBack={() => setSelectedCountry(null)}
          />
        </>
      );
    }

    return (
      <NonEUFlow
        selectedCountry={selectedCountry}
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRoute}
      />
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-[1280px] mx-auto px-12 py-8">
        {/* Nav */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">
            <HomeIcon size={16} />
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-[28px] font-bold text-[#2D2D2D]">{t("title")}</h1>
          <p className="text-[16px] text-[#6B6B6B] mt-1">{t("subtitle")}</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[13px] text-[#9CA3AF]">›</span>}
              <button
                onClick={b.onClick}
                className="text-[13px] transition-colors hover:underline"
                style={{
                  color: i === breadcrumbs.length - 1 ? "#2D2D2D" : "#9CA3AF",
                  fontWeight: i === breadcrumbs.length - 1 ? 500 : 400,
                }}
              >
                {b.label}
              </button>
            </span>
          ))}
        </div>

        {/* 3-col layout */}
        <div className="flex gap-6">
          {/* Main */}
          <div className="flex-1 min-w-0">
            <div
              className="transition-all duration-200"
              style={{ animation: "fadeSlideIn 200ms ease" }}
              key={`${selectedCountry}-${selectedRoute}`}
            >
              {renderMain()}
            </div>
          </div>

          {/* Right panel */}
          <VisaRightPanel
            selectedCountry={selectedCountry}
            selectedRoute={selectedRoute}
            onSelectRoute={setSelectedRoute}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
