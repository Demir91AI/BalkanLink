import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Home as HomeIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VISA_COUNTRIES } from "@/data/visaNavigatorData";
import CountrySelector from "@/components/visaNavigator/CountrySelector";
import EUFlow from "@/components/visaNavigator/EUFlow";
import NonEUFlow from "@/components/visaNavigator/NonEUFlow";
import DecisionSystem from "@/components/visaNavigator/DecisionSystem";
import VisaRightPanel from "@/components/visaNavigator/VisaRightPanel";
import PrintFormButton from "@/components/visaNavigator/PrintFormButton";

/* Musterformulare */
import VisaWorkForm1 from "@/components/formulare/muster/VisaWorkForm1";
import VisaWorkForm2 from "@/components/formulare/muster/VisaWorkForm2";
import VisaBluecardForm from "@/components/formulare/muster/VisaBluecardForm";
import VisaFamilyForm from "@/components/formulare/muster/VisaFamilyForm";
import VisaStudyForm from "@/components/formulare/muster/VisaStudyForm";
import VisaPermanentForm1 from "@/components/formulare/muster/VisaPermanentForm1";
import VisaPermanentForm2 from "@/components/formulare/muster/VisaPermanentForm2";

const FORM_MAP: Record<string, React.ComponentType> = {
  "visa-work-form1": VisaWorkForm1,
  "visa-work-form2": VisaWorkForm2,
  "visa-bluecard-form": VisaBluecardForm,
  "visa-family-form": VisaFamilyForm,
  "visa-study-form": VisaStudyForm,
  "visa-permanent-form1": VisaPermanentForm1,
  "visa-permanent-form2": VisaPermanentForm2,
};

export default function Viza() {
  const { t } = useTranslation("visaNavigator");
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const country = VISA_COUNTRIES.find((c) => c.code === selectedCountry);

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
    setSelectedRoute(null);
    setActiveForm(null);
  };

  const handleOpenForm = (formId: string) => {
    setActiveForm(formId);
  };

  const handleCloseForm = () => {
    setActiveForm(null);
  };

  // If a form is active, render it full-width
  if (activeForm && FORM_MAP[activeForm]) {
    const FormComponent = FORM_MAP[activeForm];
    return (
      <div className="min-h-screen print-form-container" style={{ background: "#F5F0E8" }}>
        <div className="max-w-[1280px] mx-auto px-12 py-8">
          <div className="flex items-center gap-4 mb-6 no-print">
            <button onClick={handleCloseForm}
              className="flex items-center gap-1.5 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">
              <ArrowLeft size={16} />
              {t("back_to_routes")}
            </button>
            <PrintFormButton />
          </div>
          <div className="form-container">
            <FormComponent />
          </div>
        </div>

        <style>{`
          @media print {
            .no-print { display: none !important; }
            .form-container { max-width: 100%; padding: 0; box-shadow: none; border: none; }
            .form-page-break { page-break-before: always; }
            body::before {
              content: "BalkanLink — Musterformular (nur zur Orientierung)";
              display: block; text-align: center; font-size: 10px; color: #999; margin-bottom: 10px;
            }
          }
        `}</style>
      </div>
    );
  }

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
        onOpenForm={handleOpenForm}
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
              <button onClick={b.onClick}
                className="text-[13px] transition-colors hover:underline"
                style={{ color: i === breadcrumbs.length - 1 ? "#2D2D2D" : "#9CA3AF", fontWeight: i === breadcrumbs.length - 1 ? 500 : 400 }}>
                {b.label}
              </button>
            </span>
          ))}
        </div>

        {/* 3-col layout */}
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <div className="transition-all duration-200" style={{ animation: "fadeSlideIn 200ms ease" }}
              key={`${selectedCountry}-${selectedRoute}`}>
              {renderMain()}
            </div>
          </div>
          <VisaRightPanel selectedCountry={selectedCountry} selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
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
