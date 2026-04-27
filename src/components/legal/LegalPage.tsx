import { useTranslation } from "react-i18next";
import PageNavBar from "@/components/navigation/PageNavBar";

interface LegalSection {
  heading: string;
  html: string;
}

interface LegalPageProps {
  /**
   * Key inside the `legal` i18n namespace
   * (e.g. "impressum", "datenschutz", "agb", "disclaimer", "asistent", "dsa", "cookies")
   */
  tKey: string;
  /** Optional content rendered after translated sections (e.g. cookie settings UI) */
  children?: React.ReactNode;
}

/**
 * Renders a translated legal page from the `legal` namespace.
 *
 * Each entry has shape:
 *   { title, subtitle, sections: [{ heading, html }] }
 *
 * Section HTML may use special CSS classes:
 *   .legal-warn-yellow / .legal-warn-red / .legal-note-box
 */
export default function LegalPage({ tKey, children }: LegalPageProps) {
  const { t } = useTranslation("legal");

  const title = t(`${tKey}.title`, { defaultValue: tKey });
  const subtitle = t(`${tKey}.subtitle`, { defaultValue: "" });
  // Force array return; default to [] if missing
  const sections = t(`${tKey}.sections`, {
    returnObjects: true,
    defaultValue: [] as LegalSection[],
  }) as LegalSection[];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar />

      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      {subtitle && (
        <p className="mb-10 text-sm text-muted-foreground">{subtitle}</p>
      )}

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground legal-prose">
        {Array.isArray(sections) &&
          sections.map((s, i) => (
            <section key={i}>
              {s.heading && (
                <h2 className="mb-3 text-lg font-semibold text-foreground">
                  {s.heading}
                </h2>
              )}
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}

        {children}
      </div>
    </div>
  );
}
