import { useTranslation } from "@/i18n/useTranslation";
import { Plane, Home, Users, Shield, ArrowLeft } from "lucide-react";

interface Props {
  selectedCountry: string | null;
  onSelectRoute: (routeId: string) => void;
  onBack: () => void;
}

const decisions = [
  { icon: Plane, titleKey: "route_first_arrival", descKey: "decision_arrival_desc", route: "work" },
  { icon: Home, titleKey: "route_extension", descKey: "decision_extension_desc", route: "extension" },
  { icon: Users, titleKey: "route_family", descKey: "decision_family_desc", route: "family" },
  { icon: Shield, titleKey: "route_permanent", descKey: "decision_permanent_desc", route: "permanent" },
];

const DecisionSystem = ({ selectedCountry, onSelectRoute, onBack }: Props) => {
  const { t } = useTranslation("visaNavigator");

  if (!selectedCountry) return null;
  const euCodes = ["hr", "si"];
  if (euCodes.includes(selectedCountry)) return null;

  return (
    <div className="mt-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[14px] mb-4 transition-colors hover:underline"
        style={{ color: "#C9A84C" }}
      >
        <ArrowLeft size={16} />
        {t("back_to_countries")}
      </button>

      <h2 className="text-[20px] font-bold text-[#2D2D2D] mb-6">{t("selectRoute")}</h2>

      <div className="grid grid-cols-2 gap-4">
        {decisions.map((d) => {
          const Icon = d.icon;
          return (
            <button
              key={d.route}
              onClick={() => onSelectRoute(d.route)}
              className="bg-white rounded-[14px] p-6 text-center cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:border-[#C9A84C]"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                border: "1.5px solid #F0EAD8",
              }}
            >
              <Icon size={32} style={{ color: "#C9A84C" }} className="mx-auto mb-3" />
              <p className="font-bold text-[16px] text-[#2D2D2D] mb-2">{t(d.titleKey)}</p>
              <p className="text-[13px] text-[#6B6B6B] leading-[1.6]">{t(d.descKey)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DecisionSystem;
