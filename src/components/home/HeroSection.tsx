import { useState, type FormEvent } from "react";
import { ArrowRight, BookOpen, FileText, GraduationCap, LayoutGrid, MapPin, ScanLine, Send, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { Link } from "react-router-dom";
import { BLIcon } from "@/components/BrandLogo";

/** Six functional homepage categories — every path is an existing route. */
export const HOME_CATEGORIES = [
  { key: "forms", path: "/formulari", Icon: FileText },
  { key: "visa", path: "/viza", Icon: Shield },
  { key: "recognition", path: "/anerkennung-navigator", Icon: GraduationCap },
  { key: "docs", path: "/dokumenten-check", Icon: ScanLine },
  { key: "german", path: "/deutsch-trainer", Icon: BookOpen },
  { key: "life", path: "/zivot-u-njemackoj", Icon: MapPin },
] as const;

/** Existing source-checked SmartGuides (catalog slugs served by /formulari/:slug). */
export const HOME_SMARTGUIDES = [
  { key: "kindergeld", slug: "kindergeld" },
  { key: "anmeldung", slug: "anmeldung" },
] as const;

const card =
  "group rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm transition-colors hover:border-[hsl(var(--gold))]/45 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(215_55%_4%)]";

export default function HeroSection() {
  const { t } = useTranslation("pages");
  const href = useLocalizedHref();
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const prefill = value.trim();
    window.dispatchEvent(new CustomEvent("open-assistant", { detail: { prefill: prefill || undefined } }));
    setValue("");
  };

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:pt-14 md:pb-14" aria-labelledby="home-title">
      {/* Subtle tech backdrop: gold glow + fine grid; static, no motion */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-140px] h-[420px] w-[720px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[hsl(var(--gold))]/[0.10] blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--gold) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1040px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/[0.07] px-3 py-1 text-[11.5px] font-semibold tracking-wide text-[hsl(var(--gold))]">
            <BLIcon size={16} />
            {t("home.v2.eyebrow")}
          </p>
          <h1 id="home-title" className="mt-4 font-heading text-[28px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[44px]">
            {t("home.v2.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/70 sm:text-base">
            {t("home.v2.subtitle")}
          </p>

          <form onSubmit={submit} className="mx-auto mt-6 max-w-xl" role="search">
            <label htmlFor="home-ask" className="sr-only">{t("home.v2.askLabel")}</label>
            <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--gold))]/40 bg-[hsl(220_45%_8%)] p-1.5 shadow-[0_10px_40px_-12px_hsl(var(--gold)/0.35)] focus-within:border-[hsl(var(--gold))] focus-within:ring-2 focus-within:ring-[hsl(var(--gold))]/40">
              <input
                id="home-ask"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t("home.v2.askPlaceholder")}
                aria-describedby="home-ask-hint"
                autoComplete="off"
                maxLength={500}
                className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-white placeholder:text-white/45 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl bg-[hsl(var(--gold))] px-4 text-sm font-bold text-[hsl(220_50%_8%)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Send className="h-4 w-4" aria-hidden />
                {t("home.v2.askSubmit")}
              </button>
            </div>
            <p id="home-ask-hint" className="mt-2 text-[12px] text-white/50">{t("home.v2.askHint")}</p>
          </form>
        </div>

        <h2 className="mt-9 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">{t("home.v2.categoriesHeading")}</h2>
        <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
          {HOME_CATEGORIES.map(({ key, path, Icon }) => (
            <li key={key}>
              <Link to={href(path)} className={`${card} flex h-full flex-col gap-2 p-3.5 sm:flex-row sm:items-center sm:gap-3 sm:p-4`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10">
                  <Icon className="h-[18px] w-[18px] text-[hsl(var(--gold))]" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold leading-tight text-white">{t(`home.v2.cat.${key}.title`)}</span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-white/60">{t(`home.v2.cat.${key}.desc`)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-[hsl(var(--gold))] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))]"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
            {t("home.v2.allServices")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <h2 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">{t("home.v2.guidesHeading")}</h2>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {HOME_SMARTGUIDES.map(({ key, slug }) => (
            <li key={key}>
              <Link to={href(`/formulari/${slug}`)} className={`${card} flex items-center justify-between gap-3 p-4`}>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-bold text-white">{t(`home.v2.guides.${key}.title`)}</span>
                  <span className="mt-0.5 block text-[12.5px] text-white/60">{t(`home.v2.guides.${key}.desc`)}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-[hsl(var(--gold))]">
                  <span className="hidden sm:inline">{t("home.v2.guideCta")}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
