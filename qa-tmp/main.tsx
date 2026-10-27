import { createRoot } from "react-dom/client";
import i18n from "i18next";
import "../src/i18n";
import "../src/index.css";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
i18n.changeLanguage(new URLSearchParams(location.search).get("lang") || "bs");
createRoot(document.getElementById("root")!).render(<div className="dark guide-dark-surface min-h-screen bg-background px-4 pt-6 pb-28" data-testid="guide-dark-surface"><KindergeldGuideContent /></div>);
