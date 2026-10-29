import { useEffect, useState, type FormEvent } from "react";
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

/** Original BalkanLink city photos (existing public assets); first loads eagerly, the rest after first paint. */
export const HERO_SLIDES = [
  { image: "/assets/hero-frankfurt-1280.webp", city: "FRANKFURT", srcSet: "/assets/hero-frankfurt-768.webp 768w, /assets/hero-frankfurt-1280.webp 1280w" },
  { image: "/assets/hero-berlin.jpg", city: "BERLIN" },
  { image: "/assets/hero-muenchen.jpg", city: "MÜNCHEN" },
  { image: "/assets/hero-hamburg.jpg", city: "HAMBURG" },
  { image: "/assets/hero-koeln.jpg", city: "KÖLN" },
  { image: "/assets/hero-freilassing-real.jpg", city: "FREILASSING" },
  { image: "/assets/hero-stuttgart.jpg", city: "STUTTGART" },
  { image: "/assets/hero-duesseldorf.jpg", city: "DÜSSELDORF" },
  { image: "/assets/hero-nuernberg.jpg", city: "NÜRNBERG" },
  { image: "/assets/hero-leipzig.jpg", city: "LEIPZIG" },
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

  const [slide, setSlide] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(!!mq?.matches);
    const id = window.setTimeout(() => setAllLoaded(true), 2500);
    return () => window.clearTimeout(id);
  }, []);
  useEffect(() => {
    if (reduced || !allLoaded) return;
    const id = window.setInterval(() => setSlide((i) => (i + 1) % HERO_SLIDES.length), 7000);
    return () => window.clearInterval(id);
  }, [reduced, allLoaded, slide]);
  const visible = allLoaded ? HERO_SLIDES : HERO_SLIDES.slice(0, 2);

  return (
    <section className="relative" aria-labelledby="home-title">
      <div className="relative flex min-h-[70svh] items-center overflow-hidden md:min-h-[72vh] md:max-h-[80vh] md:pb-16">
        {visible.map((s, idx) => (
          <div key={s.city} aria-hidden={idx !== slide} className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out" style={{ opacity: idx === slide ? 1 : 0 }}>
            <img
              src={s.image}
              srcSet={"srcSet" in s ? s.srcSet : undefined}
              sizes="100vw"
              alt={idx === slide ? s.city : ""}
              width={1280}
              height={720}
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "auto"}
              decoding="async"
              className={`h-full w-full object-cover ${idx === slide ? "bl-hero-zoom" : ""}`}
              style={{ filter: "brightness(0.5) saturate(1.1)" }}
            />
          </div>
        ))}
        {/* Readability layers: central scrim, side vignette, navy fade into the page */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,hsl(222_60%_4%/0.72)_0%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(222_60%_4%/0.55)_0%,transparent_28%,transparent_72%,hsl(222_60%_4%/0.55)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,hsl(222_60%_4%/0.25)_0%,transparent_35%,hsl(222_84%_5%)_100%)]" />

        <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(222_60%_4%)]/60 px-3 py-1 text-[11.5px] font-semibold tracking-wide text-[hsl(var(--gold))] backdrop-blur-sm">
            <BLIcon size={16} />
            {t("home.v2.eyebrow")}
          </p>
          <h1 id="home-title" className="mt-4 font-heading text-[30px] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_18px_hsl(222_60%_4%/0.8)] sm:text-[46px] lg:text-[54px]">
            {t("home.heroHeadlineBeforeAccent")}
            <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(45_85%_70%)] bg-clip-text text-transparent">{t("home.heroHeadlineAccent")}</span>
            {t("home.heroHeadlineAfterAccent")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/85 sm:text-base">
            {t("home.v2.subtitle")}
          </p>

          <form onSubmit={submit} className="mx-auto mt-6 max-w-xl text-left" role="search">
            <label htmlFor="home-ask" className="mb-2 block text-center text-[15px] font-bold text-white sm:text-[17px]">{t("home.v2.title")}</label>
            <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--gold))]/50 bg-[hsl(220_45%_8%)]/90 p-1.5 shadow-[0_10px_40px_-12px_hsl(var(--gold)/0.45)] backdrop-blur-md focus-within:border-[hsl(var(--gold))] focus-within:ring-2 focus-within:ring-[hsl(var(--gold))]/40">
              <input
                id="home-ask"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t("home.v2.askPlaceholder")}
                aria-describedby="home-ask-hint"
                autoComplete="off"
                maxLength={500}
                className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl bg-[hsl(var(--gold))] px-4 text-sm font-bold text-[hsl(220_50%_8%)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Send className="h-4 w-4" aria-hidden />
                {t("home.v2.askSubmit")}
              </button>
            </div>
            <p id="home-ask-hint" className="mt-2 text-center text-[12px] text-white/65">{t("home.v2.askHint")}</p>
          </form>
        </div>

        <div className="absolute bottom-3 left-0 right-0 z-10 mx-auto flex max-w-[1040px] items-center justify-between px-4 md:bottom-20">
          <span className="text-[10.5px] font-bold tracking-[0.25em] text-white/70" aria-live="off">{HERO_SLIDES[slide].city}</span>
          <div className="flex gap-1">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.city}
                type="button"
                onClick={() => { setAllLoaded(true); setSlide(idx); }}
                aria-label={t("home.v2.slideLabel", { city: s.city })}
                aria-current={idx === slide}
                className="flex h-6 w-4 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))]"
              >
                <span className={`block h-1.5 rounded-full transition-all ${idx === slide ? "w-4 bg-[hsl(var(--gold))]" : "w-1.5 bg-white/30"}`} />
              </button>
            ))}
          </div>
        </div>
        <style>{`@media (prefers-reduced-motion: no-preference){.bl-hero-zoom{animation:blHeroZoom 18s ease-in-out infinite alternate}}@keyframes blHeroZoom{from{transform:scale(1)}to{transform:scale(1.08)}}`}</style>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1040px] px-4 pb-10 md:-mt-14 md:pb-14">
        <h2 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">{t("home.v2.categoriesHeading")}</h2>
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
