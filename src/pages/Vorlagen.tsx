import { ArrowLeft, FileCheck, Clock } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";

const TEMPLATE_ITEMS = [
  { slug: "bewerbung", key: "vorlagen.bewerbung", section: "work" },
  { slug: "lebenslauf", key: "vorlagen.lebenslauf", section: "work" },
  { slug: "anschreiben", key: "vorlagen.anschreiben", section: "work" },
  { slug: "kuendigung", key: "vorlagen.kuendigung", section: "work" },
  { slug: "fristlose-kuendigung", key: "vorlagen.fristlose", section: "work" },
  { slug: "kuendigung-probezeit", key: "vorlagen.probezeit", section: "work" },
  { slug: "widerruf", key: "vorlagen.widerruf", section: "service" },
  { slug: "vertragskundigung", key: "vorlagen.vertragKuendigung", section: "service" },
  { slug: "reklamation", key: "vorlagen.reklamation", section: "service" },
];

const SECTIONS = [
  { id: "work", titleKey: "vorlagen.sectionWork", fallback: "Arbeitsrecht & Karriere" },
  { id: "service", titleKey: "vorlagen.sectionService", fallback: "Kundenservice / Verträge" },
];

export default function Vorlagen() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { t } = useLanguage();

  // Individual template detail view
  if (slug) {
    const item = TEMPLATE_ITEMS.find((i) => i.slug === slug);
    const label = item ? t(item.key) : slug;

    return (
      <div className="container max-w-3xl py-8 px-4">
        <button
          onClick={() => navigate("/vorlagen")}
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> {t("vorlagen.sidebarTitle")}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
            <FileCheck className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{label}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3" /> {t("vorlagen.comingSoon")}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">{t("vorlagen.comingSoon")}</p>
        </div>
      </div>
    );
  }

  // Overview
  return (
    <div className="container max-w-3xl py-8 px-4">
      <button
        onClick={() => navigateBackOrHome(navigate)}
        className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> {t("common.back") || "Nazad"}
      </button>
      <h1 className="text-2xl font-bold mb-2">{t("vorlagen.sidebarTitle")}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t("vorlagen.subtitle")}</p>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.id}>
            <h2 className="text-lg font-semibold mb-4">{t(section.titleKey) || section.fallback}</h2>
            <div className="grid gap-3">
              {TEMPLATE_ITEMS.filter((i) => i.section === section.id).map((item) => (
                <Link
                  key={item.slug}
                  to={`/vorlagen/${item.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileCheck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{t(item.key)}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {t("vorlagen.comingSoon")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
