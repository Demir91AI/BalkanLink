import { useTranslation } from "react-i18next";
import PageNavBar from "@/components/navigation/PageNavBar";
import i18n from "@/i18n";

interface LegalSection {
  heading?: string;
  html?: string;
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
 * Defensive against missing/malformed translation keys:
 *  - Falls back to the default language ('bs') for the requested key
 *  - If the key truly does not exist, renders a minimal placeholder
 *    instead of crashing or printing the raw key path
 */
export default function LegalPage({ tKey, children }: LegalPageProps) {
  const { t } = useTranslation("legal");

  // Helper: try current lang, then fall back to default 'bs'
  const tWithFallback = <T,>(key: string, opts?: Record<string, unknown>): T => {
    const value = t(key, { ...opts, defaultValue: undefined as unknown as T });
    if (value !== undefined && value !== null && value !== "") {
      return value as T;
    }
    // Fallback: read directly from default language ('bs')
    const fallback = i18n.getResource("bs", "legal", key) as T | undefined;
    if (fallback !== undefined) return fallback;
    return (opts?.defaultValue as T) ?? ("" as unknown as T);
  };

  const title = tWithFallback<string>(`${tKey}.title`, { defaultValue: "" });
  const subtitle = tWithFallback<string>(`${tKey}.subtitle`, { defaultValue: "" });
  const sectionsRaw = tWithFallback<LegalSection[]>(`${tKey}.sections`, {
    returnObjects: true,
    defaultValue: [],
  });
  const sections = Array.isArray(sectionsRaw) ? sectionsRaw : [];

  // Last-resort placeholder when the entire entry is missing
  const isEmpty = !title && !subtitle && sections.length === 0 && !children;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar hideTrail shareTitle={title || tKey} />

      <h1 className="mb-2 text-3xl font-bold">{title || tKey}</h1>
      {subtitle && (
        <p className="mb-10 text-sm text-muted-foreground">{subtitle}</p>
      )}

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground legal-prose">
        {sections.map((s, i) => (
          <section key={i}>
            {s?.heading && (
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {s.heading}
              </h2>
            )}
            {s?.html && (
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            )}
          </section>
        ))}

        {children}

        {isEmpty && (
          <p className="text-sm opacity-60">
            Sadržaj trenutno nije dostupan na izabranom jeziku.
          </p>
        )}
      </div>
    </div>
  );
}
