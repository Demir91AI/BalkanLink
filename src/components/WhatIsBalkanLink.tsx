import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sparkles, Plane, Languages, Briefcase, Crown, ArrowRight, Info, X } from "lucide-react";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

const STORAGE_KEY = "balkanlink_whatis_seen_v1";
const AUTO_OPEN_DELAY_MS = 8000;

export default function WhatIsBalkanLink() {
  const { t } = useTranslation("pages");
  const [open, setOpen] = useState(false);
  const [showFab, setShowFab] = useState(true);
  const href = useLocalizedHref();
  const location = useLocation();

  // Hide on admin/auth/payment routes
  const hidden =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/payment") ||
    location.pathname.includes("/reset-password") ||
    location.pathname.includes("/forgot-password");

  // Auto-open once on first visit
  useEffect(() => {
    if (hidden) return;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        const timer = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore */
    }
  }, [hidden]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  };

  const handleDismissFab = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFab(false);
  };

  if (hidden) return null;

  const audiences = [
    {
      icon: Plane,
      titleKey: "audience.newcomer.title",
      descKey: "audience.newcomer.desc",
      bullets: ["audience.newcomer.b1", "audience.newcomer.b2", "audience.newcomer.b3"],
    },
    {
      icon: Languages,
      titleKey: "audience.language.title",
      descKey: "audience.language.desc",
      bullets: ["audience.language.b1", "audience.language.b2", "audience.language.b3"],
    },
    {
      icon: Briefcase,
      titleKey: "audience.established.title",
      descKey: "audience.established.desc",
      bullets: ["audience.established.b1", "audience.established.b2", "audience.established.b3"],
    },
  ];

  const premiumPerks = ["premium.p1", "premium.p2", "premium.p3", "premium.p4", "premium.p5"];

  return (
    <>
      {/* Floating action button */}
      {showFab && (
        <button
          onClick={() => setOpen(true)}
          aria-label={t("whatIs.fabAria")}
          className="fixed bottom-24 left-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl md:bottom-6"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">{t("whatIs.fabLabel")}</span>
          <span className="sm:hidden">{t("whatIs.fabLabelShort")}</span>
          <span
            role="button"
            aria-label="Close"
            onClick={handleDismissFab}
            className="ml-1 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30"
          >
            <X className="h-3 w-3" />
          </span>
        </button>
      )}

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader className="text-left">
            <div className="flex items-center gap-2 text-primary">
              <Info className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t("whatIs.kicker")}
              </span>
            </div>
            <SheetTitle className="text-2xl">{t("whatIs.title")}</SheetTitle>
            <SheetDescription className="text-base leading-relaxed">
              {t("whatIs.tagline")}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* One-liner pitch */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm leading-relaxed">{t("whatIs.pitch")}</p>
            </div>

            {/* Audiences */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("whatIs.forWhomTitle")}
              </h3>
              {audiences.map((a) => (
                <div key={a.titleKey} className="rounded-lg border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <a.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold">{t(`whatIs.${a.titleKey}`)}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{t(`whatIs.${a.descKey}`)}</p>
                      <ul className="mt-2 space-y-1">
                        {a.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-1.5 text-xs">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            <span>{t(`whatIs.${b}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium */}
            <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("whatIs.premium.kicker")}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-bold">
                {t("whatIs.premium.title")} <span className="text-primary">9,99 €/mo</span>
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{t("whatIs.premium.subtitle")}</p>
              <ul className="mt-3 space-y-1.5">
                {premiumPerks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{t(`whatIs.${p}`)}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-4 w-full" onClick={() => handleOpenChange(false)}>
                <Link to={href("/paketi")}>
                  {t("whatIs.premium.cta")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Quick links */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("whatIs.exploreTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={href("/dolazak")}
                  onClick={() => handleOpenChange(false)}
                  className="rounded-lg border bg-card p-3 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  {t("whatIs.links.dolazak")}
                </Link>
                <Link
                  to={href("/asistent")}
                  onClick={() => handleOpenChange(false)}
                  className="rounded-lg border bg-card p-3 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  {t("whatIs.links.asistent")}
                </Link>
                <Link
                  to={href("/formulari")}
                  onClick={() => handleOpenChange(false)}
                  className="rounded-lg border bg-card p-3 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  {t("whatIs.links.formulari")}
                </Link>
                <Link
                  to={href("/dokumenten-check")}
                  onClick={() => handleOpenChange(false)}
                  className="rounded-lg border bg-card p-3 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  {t("whatIs.links.docCheck")}
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
