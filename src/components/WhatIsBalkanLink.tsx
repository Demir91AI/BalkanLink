import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Plane,
  Languages,
  Briefcase,
  Crown,
  ArrowRight,
  X,
  Check,
  MessageSquare,
  FileSearch,
  FileText,
  Mail,
  Calculator,
  GraduationCap,
  Award,
  ListChecks,
  AlertCircle,
  Globe2,
  Wrench,
  Clock3,
} from "lucide-react";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "balkanlink_whatis_seen_v1";
const AUTO_OPEN_DELAY_MS = 8000;

type AudienceKey = "newcomer" | "language" | "established";

const AUDIENCES: Array<{
  key: AudienceKey;
  Icon: typeof Plane;
  accent: string;
  to: string;
}> = [
  { key: "newcomer", Icon: Plane, accent: "from-sky-500/20 to-blue-500/5", to: "/dolazak/prvi-koraci" },
  { key: "language", Icon: Languages, accent: "from-emerald-500/20 to-teal-500/5", to: "/dokumenten-check" },
  { key: "established", Icon: Briefcase, accent: "from-amber-500/20 to-orange-500/5", to: "/porezi/wizard" },
];

const FEATURES: Array<{ key: string; Icon: typeof MessageSquare; to: string }> = [
  { key: "f1", Icon: MessageSquare, to: "/asistent" },
  { key: "f2", Icon: FileSearch, to: "/dokumenten-check" },
  { key: "f3", Icon: FileText, to: "/formulari" },
  { key: "f4", Icon: Mail, to: "/vorlagen" },
  { key: "f5", Icon: Calculator, to: "/porezi/wizard" },
  { key: "f6", Icon: GraduationCap, to: "/deutsch-trainer" },
  { key: "f7", Icon: Award, to: "/anerkennung" },
  { key: "f8", Icon: ListChecks, to: "/check-liste" },
];

export default function WhatIsBalkanLink() {
  const { t } = useTranslation("pages");
  const [open, setOpen] = useState(false);
  const [showFab, setShowFab] = useState(true);
  const [activeAudience, setActiveAudience] = useState<AudienceKey>("newcomer");
  const href = useLocalizedHref();
  const location = useLocation();

  const hidden =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/payment") ||
    location.pathname.includes("/reset-password") ||
    location.pathname.includes("/forgot-password");

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

  const close = () => handleOpenChange(false);

  return (
    <>
      {/* Floating action button */}
      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setOpen(true)}
            aria-label={t("whatIs.fabAria")}
            className="fixed bottom-24 left-4 z-40 group flex items-center gap-2 rounded-full bg-gradient-to-r from-[hsl(var(--gold))] to-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_8px_30px_rgba(217,165,54,0.4)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(217,165,54,0.55)] md:bottom-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-950 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-950" />
            </span>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">{t("whatIs.fabLabel")}</span>
            <span className="sm:hidden">{t("whatIs.fabLabelShort")}</span>
            <span
              role="button"
              aria-label="Close"
              onClick={handleDismissFab}
              className="ml-1 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-slate-950/15 hover:bg-slate-950/30"
            >
              <X className="h-3 w-3" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-3xl gap-0 overflow-hidden border-white/10 bg-[#020617] p-0 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto"
        >
          <DialogTitle className="sr-only">{t("whatIs.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("whatIs.tagline")}</DialogDescription>

          {/* HERO */}
          <div className="relative overflow-hidden border-b border-white/10 px-6 pt-10 pb-8 sm:px-10 sm:pt-12 sm:pb-10">
            {/* gradient bg */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(217,165,54,0.18),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(56,189,248,0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[hsl(var(--gold))]/20 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--gold))]">
                <Sparkles className="h-3 w-3" />
                {t("whatIs.kicker")}
              </div>
              <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {t("whatIs.title")}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                {t("whatIs.tagline")}
              </p>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { Icon: Globe2, k: "languages" },
                  { Icon: Wrench, k: "tools" },
                  { Icon: Clock3, k: "available" },
                ].map(({ Icon, k }) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-[hsl(var(--gold))]" />
                    <div className="mt-2 text-base font-bold sm:text-lg">
                      {t(`whatIs.stats.${k}`)}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50 sm:text-[11px]">
                      {t(`whatIs.stats.${k}Desc`)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* PITCH */}
          <div className="border-b border-white/10 px-6 py-6 sm:px-10">
            <p className="text-[15px] leading-relaxed text-white/80">{t("whatIs.pitch")}</p>
          </div>

          {/* PROBLEM → SOLUTION */}
          <div className="border-b border-white/10 px-6 py-7 sm:px-10">
            <div className="flex items-center gap-2 text-[hsl(var(--gold))]">
              <AlertCircle className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {t("whatIs.problemTitle")}
              </h3>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {(["p1", "p2", "p3", "p4"] as const).map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-white/70"
                >
                  <span className="mt-0.5 text-base">😰</span>
                  <span>{t(`whatIs.problems.${p}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-2 text-emerald-400">
              <Check className="h-4 w-4" />
              <p className="text-sm font-semibold">{t("whatIs.solutionTitle")}</p>
            </div>
          </div>

          {/* AUDIENCE TABS */}
          <div className="border-b border-white/10 px-6 py-7 sm:px-10">
            <h3 className="font-heading text-lg font-bold sm:text-xl">
              {t("whatIs.forWhomTitle")}
            </h3>

            <Tabs
              value={activeAudience}
              onValueChange={(v) => setActiveAudience(v as AudienceKey)}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-3 gap-1 bg-white/[0.04] p-1">
                {AUDIENCES.map(({ key, Icon }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-1.5 text-xs font-semibold data-[state=active]:bg-[hsl(var(--gold))] data-[state=active]:text-slate-950 sm:text-sm"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{t(`whatIs.audience.${key}.title`)}</span>
                    <span className="sm:hidden">{t(`whatIs.audience.${key}.title`).split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {AUDIENCES.map(({ key, Icon, accent, to }) => (
                <TabsContent key={key} value={key} className="mt-5">
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "rounded-2xl border border-white/10 bg-gradient-to-br p-5 sm:p-6",
                      accent,
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold sm:text-lg">
                          {t(`whatIs.audience.${key}.title`)}
                        </h4>
                        <p className="text-xs text-white/50 sm:text-[13px]">
                          {t(`whatIs.audience.${key}.subtitle`)}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-white/75">
                      {t(`whatIs.audience.${key}.desc`)}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {(["b1", "b2", "b3", "b4"] as const).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
                          <span>{t(`whatIs.audience.${key}.${b}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant="secondary"
                      className="mt-5 bg-white/10 text-white hover:bg-white/15"
                      onClick={close}
                    >
                      <Link to={href(to)}>
                        {t(`whatIs.audience.${key}.cta`)}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* FEATURES GRID */}
          <div className="border-b border-white/10 px-6 py-7 sm:px-10">
            <h3 className="font-heading text-lg font-bold sm:text-xl">
              {t("whatIs.featuresTitle")}
            </h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {FEATURES.map(({ key, Icon, to }) => (
                <Link
                  key={key}
                  to={href(to)}
                  onClick={close}
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.06]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-white">
                        {t(`whatIs.features.${key}.title`)}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[hsl(var(--gold))]" />
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-white/55">
                      {t(`whatIs.features.${key}.desc`)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PREMIUM SHOWCASE */}
          <div className="relative px-6 py-8 sm:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,165,54,0.15),transparent_70%)]" />
            <div className="relative rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/10 via-amber-500/5 to-transparent p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--gold))]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--gold))]">
                    <Crown className="h-3 w-3" />
                    {t("whatIs.premium.kicker")}
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">
                    {t("whatIs.premium.title")}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-heading text-3xl font-extrabold text-[hsl(var(--gold))] sm:text-4xl">
                      {t("whatIs.premium.price")}
                    </span>
                    <span className="text-sm text-white/60">{t("whatIs.premium.priceUnit")}</span>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    {t("whatIs.premium.badge")}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-white/60">{t("whatIs.premium.subtitle")}</p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {(["p1", "p2", "p3", "p4", "p5", "p6"] as const).map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
                    <span>{t(`whatIs.premium.${p}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button
                  asChild
                  className="flex-1 bg-[hsl(var(--gold))] text-slate-950 hover:bg-[hsl(var(--gold))]/90"
                  onClick={close}
                >
                  <Link to={href("/paketi")}>
                    {t("whatIs.premium.cta")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white/70 hover:bg-white/5 hover:text-white"
                  onClick={close}
                >
                  <Link to={href("/dolazak")}>{t("whatIs.premium.ctaFree")}</Link>
                </Button>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-white/40">{t("whatIs.footer")}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
