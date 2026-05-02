import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Crown,
  ArrowRight,
  Check,
  Quote,
  Globe2,
  Wrench,
  Clock3,
} from "lucide-react";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

const STORAGE_KEY = "balkanlink_whatis_seen_v1";
const AUTO_OPEN_DELAY_MS = 60_000;
export const OPEN_WHATIS_EVENT = "bl:open-whatis";

export default function WhatIsBalkanLink({ initialOpen = false }: { initialOpen?: boolean }) {
  const { t } = useTranslation("pages");
  const [open, setOpen] = useState(initialOpen);
  const href = useLocalizedHref();
  const location = useLocation();

  const hidden =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/payment") ||
    location.pathname.includes("/reset-password") ||
    location.pathname.includes("/forgot-password");

  // Auto-open once on first visit (after delay) — preserves prior behavior
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

  // External trigger (Hero "Šta je BalkanLink?" link)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_WHATIS_EVENT, handler);
    return () => window.removeEventListener(OPEN_WHATIS_EVENT, handler);
  }, []);

  useEffect(() => {
    if (initialOpen) setOpen(true);
  }, [initialOpen]);

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

  if (hidden) return null;

  const close = () => handleOpenChange(false);

  // Narrative sections — pure prose, no bullets/cards
  const sections: Array<{ key: string; paragraphs: number }> = [
    { key: "why", paragraphs: 2 },
    { key: "how", paragraphs: 2 },
    { key: "principle", paragraphs: 2 },
    { key: "audience", paragraphs: 3 },
    { key: "trust", paragraphs: 2 },
  ];

  return (
    <>
      {/* FAB removed — trigger lives in Hero ("Šta je BalkanLink?" link).
          Modal still auto-opens once on first visit. */}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden border-white/10 bg-[#020617] p-0 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto scrollbar-hide">
          <DialogTitle className="sr-only">{t("whatIs.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("whatIs.tagline")}</DialogDescription>

          {/* HERO */}
          <div className="relative overflow-hidden border-b border-white/10 px-6 pt-10 pb-8 sm:px-12 sm:pt-14 sm:pb-12">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(217,165,54,0.35), rgba(56,189,248,0.18), rgba(217,165,54,0.35))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -left-32 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "conic-gradient(from 180deg, rgba(56,189,248,0.25), rgba(217,165,54,0.2), rgba(56,189,248,0.25))",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(217,165,54,0.15),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(56,189,248,0.1),transparent_60%)]" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--gold))] shadow-[0_0_24px_rgba(217,165,54,0.25)]"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-3 w-3" />
                </motion.span>
                {t("whatIs.kicker")}
              </motion.div>

              <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.6rem]">
                <span className="bg-gradient-to-br from-white via-white to-[hsl(var(--gold))]/85 bg-clip-text text-transparent">
                  {t("whatIs.title")}
                </span>
              </h2>

              <div className="relative mt-4 h-px w-full max-w-2xl overflow-hidden rounded-full bg-gradient-to-r from-[hsl(var(--gold))]/30 via-white/10 to-transparent">
                <motion.div
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent"
                  animate={{ x: ["-100%", "350%"] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
                {t("whatIs.tagline")}
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { Icon: Globe2, k: "languages" },
                  { Icon: Wrench, k: "tools" },
                  { Icon: Clock3, k: "available" },
                ].map(({ Icon, k }, idx) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-3 backdrop-blur transition-all hover:border-[hsl(var(--gold))]/40 hover:shadow-[0_8px_30px_rgba(217,165,54,0.2)]"
                  >
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <div className="relative">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--gold))]/15 ring-1 ring-[hsl(var(--gold))]/30">
                        <Icon className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                      </div>
                      <div className="mt-2 text-[13px] font-bold leading-tight sm:text-sm">
                        {t(`whatIs.stats.${k}`)}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/45 sm:text-[10.5px]">
                        {t(`whatIs.stats.${k}Desc`)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* PULL QUOTE */}
          <div className="relative overflow-hidden border-b border-white/10 px-6 py-8 sm:px-12 sm:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,165,54,0.06),transparent_70%)]" />
            <Quote className="absolute left-6 top-6 h-8 w-8 text-[hsl(var(--gold))]/30 sm:left-10 sm:top-8" />
            <p className="relative ml-10 max-w-2xl font-heading text-lg italic leading-relaxed text-white/95 sm:ml-12 sm:text-xl">
              {t("whatIs.pullQuote")}
            </p>
            <div className="relative ml-10 mt-3 flex items-center gap-3 sm:ml-12">
              <span className="h-px w-8 bg-gradient-to-r from-[hsl(var(--gold))]/60 to-transparent" />
              <p className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--gold))]/70">
                {t("whatIs.pullQuoteAuthor")}
              </p>
            </div>
          </div>

          {/* NARRATIVE SECTIONS */}
          <div className="divide-y divide-white/10">
            {sections.map(({ key, paragraphs }, idx) => (
              <motion.section
                key={key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="px-6 py-9 sm:px-12 sm:py-11"
              >
                <div className="group/num flex items-center gap-3">
                  <span className="relative inline-flex h-7 w-10 items-center justify-center rounded-md bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/30 font-heading text-xs font-bold tracking-[0.18em] text-[hsl(var(--gold))] transition-all duration-300 group-hover/num:bg-[hsl(var(--gold))]/25 group-hover/num:ring-[hsl(var(--gold))]/60 group-hover/num:shadow-[0_0_18px_rgba(217,165,54,0.45)] group-hover/num:text-amber-200">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--gold))]/50 via-[hsl(var(--gold))]/15 to-transparent transition-all duration-500 group-hover/num:from-[hsl(var(--gold))]/80 group-hover/num:via-[hsl(var(--gold))]/30" />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-bold leading-tight sm:text-[1.7rem]">
                  <span className="bg-gradient-to-r from-white to-white/85 bg-clip-text text-transparent">
                    {t(`whatIs.sections.${key}.title`)}
                  </span>
                </h3>
                <div className="mt-5 space-y-4 text-[15px] leading-[1.75] text-white/75 sm:text-base">
                  {Array.from({ length: paragraphs }).map((_, p) => (
                    <p key={p}>{t(`whatIs.sections.${key}.p${p + 1}`)}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* PREMIUM SHOWCASE */}
          <div className="relative border-t border-white/10 px-6 py-10 sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,165,54,0.18),transparent_70%)]" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))]/30 blur-3xl"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative overflow-hidden rounded-2xl border-2 border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--gold))]/12 via-amber-500/5 to-transparent p-6 shadow-[0_20px_60px_-20px_rgba(217,165,54,0.4)] sm:p-8">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />

              <div className="relative flex flex-wrap items-start justify-between gap-3">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--gold))]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--gold))] ring-1 ring-[hsl(var(--gold))]/40 shadow-[0_0_20px_rgba(217,165,54,0.3)]"
                  >
                    <motion.span
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Crown className="h-3 w-3" />
                    </motion.span>
                    {t("whatIs.premium.kicker")}
                  </motion.div>
                  <h3 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">
                    <span className="bg-gradient-to-br from-white via-[hsl(var(--gold))]/95 to-amber-300 bg-clip-text text-transparent">
                      {t("whatIs.premium.title")}
                    </span>
                  </h3>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-0.5">
                    <span
                      className="font-heading text-3xl font-extrabold sm:text-4xl bg-gradient-to-br from-[hsl(var(--gold))] to-amber-300 bg-clip-text text-transparent"
                      style={{ filter: "drop-shadow(0 0 12px rgba(217,165,54,0.45))" }}
                    >
                      {t("whatIs.premium.price")}
                    </span>
                    <span className="text-sm text-white/60">{t("whatIs.premium.priceUnit")}</span>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                    {t("whatIs.premium.badge")}
                  </span>
                </div>
              </div>

              <p className="relative mt-4 text-[15px] leading-relaxed text-white/85">
                {t("whatIs.premium.narrative")}
              </p>

              <div className="relative mt-5 flex items-start gap-2 text-sm text-white/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
                <span>{t("whatIs.premium.summary")}</span>
              </div>

              <div className="relative mt-6 flex flex-col gap-2 sm:flex-row">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--gold))] to-amber-400 text-slate-950 font-bold shadow-[0_8px_30px_rgba(217,165,54,0.45)] hover:from-amber-400 hover:to-[hsl(var(--gold))] hover:shadow-[0_12px_40px_rgba(217,165,54,0.6)] transition-all"
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

            <p className="mt-7 text-center text-xs text-white/40">{t("whatIs.footer")}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
