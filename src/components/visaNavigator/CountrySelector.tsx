import { useTranslation } from "@/i18n/useTranslation";
import { VISA_COUNTRIES } from "@/data/visaNavigatorData";

interface Props {
  selectedCountry: string | null;
  onSelectCountry: (code: string) => void;
}

const CountrySelector = ({ selectedCountry, onSelectCountry }: Props) => {
  const { t } = useTranslation("visaNavigator");

  const euCountries = VISA_COUNTRIES.filter((c) => c.isEU);
  const balkanCountries = VISA_COUNTRIES.filter((c) => !c.isEU);

  const renderCard = (code: string, nameKey: string, isEU: boolean, flagUrl: string) => {
    const isActive = selectedCountry === code;
    return (
      <button
        key={code}
        onClick={() => onSelectCountry(code)}
        className="flex items-center gap-3 rounded-[10px] px-[18px] py-[14px] text-left transition-all duration-150 hover:bg-[#FFF8EC] hover:border-[#C9A84C]"
        style={{
          border: isActive ? "2px solid #C9A84C" : "1.5px solid #F0EAD8",
          background: isActive ? "#FFF8EC" : "white",
          boxShadow: isActive ? "0 0 0 3px rgba(201,168,76,0.15)" : "none",
        }}
      >
        <img src={flagUrl} alt="" className="h-6 rounded-sm" />
        <span
          className="text-[15px]"
          style={{
            fontWeight: isActive ? 700 : 500,
            color: isActive ? "#C9A84C" : "#2D2D2D",
          }}
        >
          {t(nameKey)}
        </span>
        <span
          className="ml-auto text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={isEU
            ? { background: "#DCFCE7", color: "#166534" }
            : { background: "#FEF9C3", color: "#854D0E" }
          }
        >
          {isEU ? "EU" : "WB"}
        </span>
      </button>
    );
  };

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#2D2D2D] mb-6">{t("selectCountry")}</h2>

      {/* EU */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#C9A84C" }}>
        {t("sidebar_eu")}
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {euCountries.map((c) => renderCard(c.code, c.nameKey, true, c.flagUrl))}
      </div>

      {/* Balkans */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#C9A84C" }}>
        {t("sidebar_balkan")}
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {balkanCountries.map((c) => renderCard(c.code, c.nameKey, false, c.flagUrl))}
      </div>
    </div>
  );
};

export default CountrySelector;
