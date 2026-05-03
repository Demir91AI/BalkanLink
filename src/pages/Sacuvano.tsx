/**
 * /sacuvano — pregled svih sačuvanih stavki (localStorage).
 * Bez registracije; sve je grupisano po tipu (form / checklist / qa).
 */
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, FileText, ListChecks, MessageSquare, Trash2, ArrowRight, Lock, Building2, BookmarkIcon } from "lucide-react";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { useSavedItems, type SavedItemType } from "@/hooks/useSavedItems";
import { useLocalizedHref, useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { useAuth } from "@/contexts/AuthContext";

const ICONS: Record<SavedItemType, typeof FileText> = {
  form: FileText,
  checklist: ListChecks,
  qa: MessageSquare,
  directory: Building2,
  page: BookmarkIcon,
};

const ORDER: SavedItemType[] = ["form", "checklist", "qa", "directory", "page"];

export default function Sacuvano() {
  const { t } = useTranslation("saved");
  const { items, remove, clear } = useSavedItems();
  const localize = useLocalizedHref();
  const navigate = useLocalizedNavigate();
  const { user } = useAuth();

  const grouped = useMemo(() => {
    const map: Record<SavedItemType, typeof items> = { form: [], checklist: [], qa: [], directory: [], page: [] };
    items.forEach((it) => map[it.type]?.push(it));
    return map;
  }, [items]);

  const isEmpty = items.length === 0;

  return (
    <div className="container max-w-3xl py-8 px-4">
      <SEO title={t("page.title")} description={t("page.subtitle")} path="/sacuvano" />
      <PageNavBar showShare={false} />

      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Star className="h-6 w-6 text-[hsl(var(--gold))]" fill="currentColor" />
            {t("page.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("page.subtitle")}</p>
        </div>
        {!isEmpty && (
          <button
            onClick={() => {
              if (confirm(t("actions.clearAll") + "?")) clear();
            }}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("actions.clearAll")}
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <Star className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">{t("page.empty.title")}</h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
            {t("page.empty.body")}
          </p>
          <button
            onClick={() => navigate("/vorlagen")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t("page.empty.cta")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {ORDER.map((type) => {
            const list = grouped[type];
            if (!list.length) return null;
            const Icon = ICONS[type];
            return (
              <section key={type}>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  <Icon className="h-4 w-4" />
                  {t(`groups.${type}`)} <span className="text-muted-foreground/60">({list.length})</span>
                </h2>
                <div className="grid gap-2">
                  {list.map((it) => (
                    <div
                      key={`${it.type}:${it.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-[hsl(var(--gold))]/40 transition-colors"
                    >
                      <Link
                        to={localize(it.path)}
                        className="flex flex-1 min-w-0 items-center gap-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--gold))]/10">
                          <Icon className="h-4 w-4 text-[hsl(var(--gold))]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{it.title}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {new Date(it.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                      <button
                        onClick={() => remove(it.type, it.id)}
                        aria-label={t("actions.remove")}
                        className="shrink-0 rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {!user && (
            <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold mb-1.5">
                <Lock className="h-4 w-4 text-[hsl(var(--gold))]" />
                {t("page.registerHint.title")}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{t("page.registerHint.body")}</p>
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--gold))] px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-opacity"
              >
                {t("page.registerHint.cta")}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
