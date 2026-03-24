import { ArrowLeft, FileCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";

const SECTIONS = [
  {
    titleKey: "vorlagen.sectionWork",
    fallback: "Arbeitsrecht & Karriere",
    items: [
      { key: "vorlagen.bewerbung", fallback: "Bewerbung" },
      { key: "vorlagen.lebenslauf", fallback: "Lebenslauf" },
      { key: "vorlagen.anschreiben", fallback: "Anschreiben" },
      { key: "vorlagen.kuendigung", fallback: "Kündigungsschreiben" },
      { key: "vorlagen.fristlose", fallback: "Fristlose Kündigung" },
      { key: "vorlagen.probezeit", fallback: "Kündigung in der Probezeit" },
    ],
  },
  {
    titleKey: "vorlagen.sectionService",
    fallback: "Kundenservice / Verträge",
    items: [
      { key: "vorlagen.widerruf", fallback: "Widerruf" },
      { key: "vorlagen.vertragKuendigung", fallback: "Kündigung von Verträgen" },
      { key: "vorlagen.reklamation", fallback: "Reklamation" },
    ],
  },
];

export default function Vorlagen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="container max-w-3xl py-8 px-4">
      <button onClick={() => navigateBackOrHome(navigate)} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> {t("common.back") || "Nazad"}
      </button>
      <h1 className="text-2xl font-bold mb-2">{t("vorlagen.sidebarTitle") || "Šabloni / Vorlagen"}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t("vorlagen.subtitle") || "Vorlagen für die wichtigsten Schreiben im Alltag."}</p>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.titleKey}>
            <h2 className="text-lg font-semibold mb-4">{t(section.titleKey) || section.fallback}</h2>
            <div className="grid gap-3">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 opacity-70"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileCheck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{t(item.key) || item.fallback}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {t("vorlagen.comingSoon") || "Demnächst verfügbar"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
