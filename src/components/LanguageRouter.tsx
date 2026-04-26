/**
 * <LanguageRouter />
 *
 * Watches the URL and forces i18next to the correct language whenever the
 * pathname changes. Also writes <html lang> and persists the choice to
 * localStorage (key: balkanlink-lang).
 *
 * Mount inside <BrowserRouter> and outside <Routes>.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import i18n, { LANG_STORAGE_KEY } from "@/i18n";
import { langFromPath } from "@/lib/i18n-paths";

export default function LanguageRouter() {
  const { pathname } = useLocation();

  useEffect(() => {
    const target = langFromPath(pathname);
    if (i18n.language !== target) {
      void i18n.changeLanguage(target);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = target;
    }
    try {
      localStorage.setItem(LANG_STORAGE_KEY, target);
    } catch {
      /* storage unavailable — ignore */
    }
  }, [pathname]);

  return null;
}
