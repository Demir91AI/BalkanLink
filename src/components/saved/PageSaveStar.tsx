import { Star, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { toast } from "sonner";
import { useSavedItems, type SavedItemType } from "@/hooks/useSavedItems";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const LANG_PREFIXES = SUPPORTED_LANGUAGES.filter((l) => l !== "bs");

/**
 * Globalna zvjezdica za "Sačuvaj stranicu" — radi na bilo kojoj ruti.
 * Premium-only: free/auth korisnik vidi lock + toast koji vodi na /premium.
 * Tip se automatski izvodi iz pathname-a (form/checklist/qa/page).
 */
export function PageSaveStar({
  title: titleProp,
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const { t } = useTranslation("saved");
  const { isSaved, toggle } = useSavedItems();
  const { isPremium } = usePremiumAccess();
  const navigate = useLocalizedNavigate();
  const location = useLocation();

  const { id, type, path, title } = useMemo(() => {
    const raw = (location.pathname || "/").replace(/\/+$/, "") || "/";
    const segs = raw.split("/").filter(Boolean);
    if (segs.length && (LANG_PREFIXES as readonly string[]).includes(segs[0])) segs.shift();
    const cleanPath = "/" + segs.join("/");
    const first = segs[0] || "home";
    let type: SavedItemType = "page";
    if (first === "vorlagen" || first === "musterformular" || first === "formulari") type = "form";
    else if (first === "check-liste") type = "checklist";
    else if (first === "pitaj-dijasporu") type = "qa";
    else if (first === "directory" || first === "firma") type = "directory";
    const fallbackTitle =
      typeof document !== "undefined"
        ? (document.title || "").replace(/\s*[|·–—].*$/, "").trim()
        : cleanPath;
    return {
      id: cleanPath,
      type,
      path: cleanPath,
      title: titleProp || fallbackTitle || cleanPath,
    };
  }, [location.pathname, titleProp]);

  const saved = isSaved(type, id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isPremium) {
      toast.message(t("premiumGate.title"), {
        description: t("premiumGate.body"),
        action: {
          label: t("premiumGate.cta"),
          onClick: () => navigate("/premium"),
        },
      });
      return;
    }
    const nowSaved = toggle({ type, id, title, path });
    if (nowSaved) {
      toast.success(t("toast.added"), {
        action: { label: t("actions.viewAll"), onClick: () => navigate("/sacuvano") },
      });
    } else {
      toast(t("toast.removed"));
    }
  };

  const label = !isPremium
    ? t("premiumGate.title")
    : saved
      ? t("actions.saved")
      : t("actions.save");

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur-sm transition-all hover:scale-105 hover:border-[hsl(var(--gold))]/60 ${
        saved
          ? "text-[hsl(var(--gold))] border-[hsl(var(--gold))]/60"
          : "text-muted-foreground hover:text-[hsl(var(--gold))]"
      } ${className}`}
    >
      <Star className="h-[18px] w-[18px]" fill={saved ? "currentColor" : "none"} strokeWidth={2} />
      {!isPremium && (
        <span className="absolute -bottom-1 -right-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-black">
          <Lock className="h-2 w-2" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
