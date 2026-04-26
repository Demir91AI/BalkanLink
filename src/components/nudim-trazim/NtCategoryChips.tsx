import {
  Briefcase, Home, Wrench, Car,
  ShoppingBag, Baby, MoreHorizontal,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NT_CATEGORIES } from "@/lib/nudim-trazim-constants";
const ICONS: Record<string, React.ElementType> = {
  Briefcase, Home, Wrench, Car,
  ShoppingBag, Baby, MoreHorizontal,
};

interface Props {
  active: string;
  onSelect: (cat: string) => void;
}

export default function NtCategoryChips({ active, onSelect }: Props) {
  const { t } = useTranslation("pages");
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("sve")}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          active === "sve"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        }`}
      >
        {t("classifieds.filters.all")}
      </button>
      {NT_CATEGORIES.map((c) => {
        const Icon = ICONS[c.icon];
        const isActive = active === c.value;
        return (
          <button
            key={c.value}
            onClick={() => onSelect(c.value)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {t(`classifieds.categories.${c.value}`, c.label)}
          </button>
        );
      })}
    </div>
  );
}
