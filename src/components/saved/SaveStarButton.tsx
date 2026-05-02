import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSavedItems, type SavedItemType } from "@/hooks/useSavedItems";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";

interface Props {
  type: SavedItemType;
  id: string;
  title: string;
  path: string;
  /** kompaktna varijanta — samo ikonica (npr. ugao kartice) */
  variant?: "icon" | "button";
  className?: string;
  meta?: Record<string, string | boolean | number>;
}

/**
 * Zvjezdica za "Sačuvaj za kasnije". Klik toggluje stanje + toast.
 * Ne zahtijeva login — sve ide u localStorage preko useSavedItems.
 */
export function SaveStarButton({
  type,
  id,
  title,
  path,
  variant = "icon",
  className = "",
  meta,
}: Props) {
  const { t } = useTranslation("saved");
  const { isSaved, toggle } = useSavedItems();
  const navigate = useLocalizedNavigate();
  const saved = isSaved(type, id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggle({ type, id, title, path, meta });
    if (nowSaved) {
      toast.success(t("toast.added"), {
        action: {
          label: t("actions.viewAll"),
          onClick: () => navigate("/sacuvano"),
        },
      });
    } else {
      toast(t("toast.removed"));
    }
  };

  const label = saved ? t("actions.saved") : t("actions.save");

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={label}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
          saved
            ? "border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
            : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
        } ${className}`}
      >
        <Star
          className="h-3.5 w-3.5"
          fill={saved ? "currentColor" : "none"}
          strokeWidth={2}
        />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110 ${
        saved
          ? "text-[hsl(var(--gold))]"
          : "text-white/40 hover:text-[hsl(var(--gold))]"
      } ${className}`}
    >
      <Star className="h-5 w-5" fill={saved ? "currentColor" : "none"} strokeWidth={2} />
    </button>
  );
}
