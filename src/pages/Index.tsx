import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Megaphone, CheckCircle2, Star, ExternalLink,
  ChevronLeft, ChevronRight, FileText, Shield, GraduationCap, Search, Home, Calculator, Map, Camera,
} from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { premiumShowcaseFirms } from "@/components/home/premium-showcase-data";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import HomeReviews from "@/components/home/HomeReviews";

import realcoreDigitalLogo from "@/assets/realcore-digital-logo.png";
import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";
import heroLeipzig from "@/assets/hero-leipzig.jpg";
import heroFreilassing from "@/assets/hero-freilassing-real.jpg";

const slides = [
  { image: heroFrankfurt, city: "FRANKFURT" },
  { image: heroBerlin, city: "BERLIN" },
  { image: heroMuenchen, city: "MÜNCHEN" },
  { image: heroHamburg, city: "HAMBURG" },
  { image: heroKoeln, city: "KÖLN" },
  { image: heroFreilassing, city: "FREILASSING" },
  { image: heroStuttgart, city: "STUTTGART" },
  { image: heroDuesseldorf, city: "DÜSSELDORF" },
  { image: heroNuernberg, city: "NÜRNBERG" },
  { image: heroLeipzig, city: "LEIPZIG" },
];

const trustBadgeKeys = ["hero.bullet.simple", "hero.bullet.language", "hero.bullet.verified"];

const MAILTO_AD = `mailto:kontakt@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent("Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n")}`;

const serviceCardKeys = [
  { icon: FileText, titleKey: "service.smartGuide.title", descKey: "service.smartGuide.desc", ctaKey: "service.smartGuide.cta", to: "/formulari", premium: true },
  { icon: Shield, titleKey: "service.visa.title", descKey: "service.visa.desc", ctaKey: "service.visa.cta", to: "/dolazak/boravisna-dozvola", premium: true },
  { icon: GraduationCap, titleKey: "service.deutsch.title", descKey: "service.deutsch.desc", ctaKey: "service.deutsch.cta", to: "/deutsch-trainer", premium: true },
  { icon: Camera, titleKey: "service.docCheck.title", descKey: "service.docCheck.desc", ctaKey: "service.docCheck.cta", to: "/dokumenten-check", premium: true },
  { icon: Megaphone, titleKey: "service.nudim.title", descKey: "service.nudim.desc", ctaKey: "service.nudim.cta", to: "/nudim-trazim", premium: false },
  { icon: Map, titleKey: "service.balkanci.title", descKey: "service.balkanci.desc", ctaKey: "service.balkanci.cta", to: "/mapa", premium: false },
  { icon: Search, titleKey: "service.jobs.title", descKey: "service.jobs.desc", ctaKey: "service.jobs.cta", to: "/stellenangebote", premium: false },
  { icon: Home, titleKey: "service.housing.title", descKey: "service.housing.desc", ctaKey: "service.housing.cta", to: "/wohnungen", premium: false },
  { icon: Calculator, titleKey: "service.calc.title", descKey: "service.calc.desc", ctaKey: "service.calc.cta", to: "/kalkulatori", premium: false },
];

const placeholderAds = [
  { name: "RealCore Digital", slogan: "Klar denken. Digital umsetzen.", desc: "Webdesign, KI-Lösungen und digitale Strategien.", logo: realcoreDigitalLogo, href: "https://realcore.digital" },
  { name: "BalkanLink", slogan: "Rezerviraj reklamni prostor", desc: "Predstavite svoju firmu cijeloj zajednici.", logo: "/icons/icon-192x192.png" },
  { name: "BalkanLink", slogan: "Vaš oglas ovdje", desc: "Premium pozicija za vašu firmu.", logo: "/icons/icon-192x192.png" },
  { name: "BalkanLink", slogan: "Oglasite svoju uslugu", desc: "Dođite do hiljada korisnika iz regije.", logo: "/icons/icon-192x192.png" },
  { name: "BalkanLink", slogan: "Povećajte vidljivost", desc: "Istaknite svoju ponudu na platformi.", logo: "/icons/icon-192x192.png" },
];

/* ─── Infinite scroll hook (rAF based) ─── */
function useInfiniteScroll(speed = 0.5, resumeDelay = 3000) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const animate = useCallback(() => {
    const el = ref.current;
    if (el && !pausedRef.current) {
      el.scrollLeft += speed;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      if (el.scrollLeft <= 0) el.scrollLeft += half;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, resumeDelay);
  }, [resumeDelay]);

  const scrollByCard = useCallback((direction: "left" | "right") => {
    const el = ref.current;
    if (!el || !el.children.length) return;
    const firstCard = el.children[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth;
    const gap = parseInt(getComputedStyle(el).gap) || 20;
    const amount = (cardWidth + gap) * (direction === "right" ? 1 : -1);
    el.scrollBy({ left: amount, behavior: "smooth" });
    pause();
    scheduleResume();
  }, [pause, scheduleResume]);

  const onTouchStart = useCallback((e: React.TouchEvent) => { pause(); isDragging.current = true; dragStartX.current = e.touches[0].clientX; dragScrollLeft.current = ref.current?.scrollLeft ?? 0; }, [pause]);
  const onTouchMove = useCallback((e: React.TouchEvent) => { if (!isDragging.current || !ref.current) return; ref.current.scrollLeft = dragScrollLeft.current - (e.touches[0].clientX - dragStartX.current); }, []);
  const onTouchEnd = useCallback(() => { isDragging.current = false; scheduleResume(); }, [scheduleResume]);
  const onMouseDown = useCallback((e: React.MouseEvent) => { pause(); isDragging.current = true; dragStartX.current = e.clientX; dragScrollLeft.current = ref.current?.scrollLeft ?? 0; if (ref.current) ref.current.style.cursor = "grabbing"; e.preventDefault(); }, [pause]);
  const onMouseMove = useCallback((e: React.MouseEvent) => { if (!isDragging.current || !ref.current) return; ref.current.scrollLeft = dragScrollLeft.current - (e.clientX - dragStartX.current); }, []);
  const onMouseUp = useCallback(() => { isDragging.current = false; if (ref.current) ref.current.style.cursor = "grab"; scheduleResume(); }, [scheduleResume]);
  const onMouseLeave = useCallback(() => { if (isDragging.current) { isDragging.current = false; if (ref.current) ref.current.style.cursor = "grab"; } scheduleResume(); }, [scheduleResume]);

  return { ref, pause, scheduleResume, scrollByCard, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave };
}

function CarouselArrows({ onLeft, onRight }: { onLeft: () => void; onRight: () => void }) {
  return (
    <>
      <button onClick={onLeft} className="flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 shadow-md items-center justify-center hover:scale-105 hover:shadow-lg transition-all border border-[#E8E0D0]" aria-label="Previous">
        <ChevronLeft className="h-5 w-5 text-[#2D2D2D]" />
      </button>
      <button onClick={onRight} className="flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 shadow-md items-center justify-center hover:scale-105 hover:shadow-lg transition-all border border-[#E8E0D0]" aria-label="Next">
        <ChevronRight className="h-5 w-5 text-[#2D2D2D]" />
      </button>
    </>
  );
}

/* ─── Services Carousel ─── */
function ServicesCarousel() {
  const { t } = useTranslation();
  const doubled = [...serviceCardKeys, ...serviceCardKeys];
  const { ref, pause, scheduleResume, scrollByCard, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useInfiniteScroll(0.6, 3000);

  return (
    <div className="relative overflow-hidden" onMouseEnter={pause} onMouseLeave={scheduleResume}>
      <CarouselArrows onLeft={() => scrollByCard("left")} onRight={() => scrollByCard("right")} />
      <div ref={ref} className="flex gap-5 px-4 overflow-x-hidden scrollbar-hide cursor-grab select-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
        {doubled.map((card, i) => {
          const Icon = card.icon;
          const isPremium = card.premium;
          return (
            <Link
              key={`${card.titleKey}-${i}`}
              to={card.to}
              className={`group flex flex-col w-[280px] shrink-0 rounded-[14px] p-5 transition-all duration-300 hover:-translate-y-[3px] ${
                isPremium
                  ? "border-2 border-[hsl(43,70%,53%)] shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_18px_hsla(43,70%,53%,0.12)] hover:border-[hsl(43,80%,62%)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45),0_0_28px_hsla(43,70%,53%,0.22)]"
                  : "bg-white border border-[#E8E0D0] shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
              }`}
              style={isPremium ? { background: "linear-gradient(160deg, hsl(220,50%,8%), hsl(225,45%,6%))" } : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`h-6 w-6 shrink-0 ${isPremium ? "text-[hsl(43,70%,53%)]" : "text-[hsl(var(--gold))]"}`} />
                {isPremium && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[hsl(225,45%,6%)]"
                    style={{ background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,60%,42%))", boxShadow: "0 0 10px hsla(43,70%,53%,0.25)" }}
                  >
                    ⭐ Premium
                  </span>
                )}
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${isPremium ? "text-white" : "text-[#2D2D2D]"}`}>{t(card.titleKey)}</h3>
              <p className={`text-xs leading-relaxed mb-4 flex-1 ${isPremium ? "text-white/60" : "text-[#6B6B6B]"}`}>{t(card.descKey)}</p>
              <span
                className={`block w-full rounded-lg py-2 text-center text-xs font-semibold transition-all duration-300 ${
                  isPremium
                    ? "text-[hsl(225,45%,6%)] group-hover:brightness-110 group-hover:scale-[1.02]"
                    : "bg-[hsl(var(--gold))] text-white group-hover:bg-[hsl(var(--gold-dark))]"
                }`}
                style={isPremium ? { background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))", boxShadow: "0 2px 12px hsla(43,70%,53%,0.25)" } : undefined}
              >
                {t(card.ctaKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Showcase Carousel ─── */
function ShowcaseCarousel() {
  const { t } = useTranslation();
  const doubled = [...premiumShowcaseFirms, ...premiumShowcaseFirms];

  return (
    <div className="overflow-hidden w-full">
      <div className="flex w-fit gap-6 animate-showcase-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused]">
        {doubled.map((firm, i) => (
          <article key={`${firm.slug}-${i}`} className="min-w-[340px] max-w-[380px] shrink-0 rounded-2xl bg-white border border-[#E8E0D0] overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
            <div className="relative h-[180px] w-full overflow-hidden">
              <img src={firm.images[0]} alt={firm.name} className="h-full w-full object-cover" style={{ filter: "brightness(0.92) saturate(1.1)" }} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute left-3 top-3 flex items-center rounded-xl border border-white/50 bg-white/70 px-3 py-1.5 backdrop-blur-md">
                <img src={firm.logoUrl} alt={firm.logoAlt} className="h-6 max-w-[90px] object-contain" />
              </div>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                <Star className="h-2.5 w-2.5 fill-current" /> {t("home.recommended")}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5 border-t-[3px] border-[hsl(var(--gold))]">
              <div>
                <h3 className="text-base font-bold text-[#2D2D2D]">{firm.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6B6B6B]">{firm.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {firm.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-[#E8E0D0] bg-[hsl(var(--warm-cream))] px-2.5 py-0.5 text-[10px] font-semibold text-[#6B6B6B]">{h}</span>
                ))}
              </div>
              <div className="mt-auto flex gap-2 pt-2">
                <Button asChild size="sm" className="h-8 rounded-lg bg-[hsl(var(--gold))] px-4 text-xs font-bold text-white hover:bg-[hsl(var(--gold-dark))]">
                  {firm.website ? (
                    <a href={firm.website} target="_blank" rel="noopener noreferrer">{t("home.viewMore")} <ExternalLink className="ml-1 h-3 w-3" /></a>
                  ) : (
                    <Link to={`/firma/${firm.slug}`}>{t("home.viewMore")} <ExternalLink className="ml-1 h-3 w-3" /></Link>
                  )}
                </Button>
                <Button asChild variant="outline" size="sm" className="h-8 rounded-lg border-[#E8E0D0] px-4 text-xs font-semibold text-[#2D2D2D] hover:bg-[hsl(var(--warm-cream))]">
                  {firm.contactUrl ? (
                    <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">{t("home.contact")}</a>
                  ) : firm.phone ? (
                    <a href={`tel:${firm.phone}`}>{t("home.contact")}</a>
                  ) : (
                    <Link to={`/firma/${firm.slug}`}>{t("home.contact")}</Link>
                  )}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ─── Ad Flow Section ─── */
function AdFlowSection() {
  const { t } = useTranslation();
  const doubled = [...placeholderAds, ...placeholderAds];
  return (
    <section className="py-10 border-t border-[#E8E0D0] bg-[hsl(var(--warm-cream))] overflow-hidden">
      <div className="container mb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/[0.08] px-3 py-1">
          <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">{t("home.adLabel")}</span>
        </div>
      </div>
      <div className="overflow-hidden w-full">
        <div className="flex w-fit gap-4 animate-carousel-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {doubled.map((ad, i) => (
            <a key={i} href={ad.href || MAILTO_AD} target={ad.href ? "_blank" : undefined} rel={ad.href ? "noopener noreferrer" : undefined} className="group flex flex-col w-[280px] h-[320px] shrink-0 rounded-xl border border-[#E8E0D0] bg-white overflow-hidden transition-all duration-300 hover:border-[hsl(var(--gold))]/40 hover:shadow-lg">
              <div className="flex items-center justify-center h-[160px] bg-[hsl(var(--warm-cream))] p-5">
                <img src={ad.logo} alt={ad.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
              <div className="flex flex-col flex-1 bg-white p-4">
                <p className="text-lg font-bold text-[#2D2D2D] leading-tight">{ad.name}</p>
                <p className="text-[13px] text-[hsl(var(--gold))] mt-1 font-medium">{ad.slogan}</p>
                <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-2">{ad.desc}</p>
                <div className="mt-auto pt-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[hsl(var(--gold))] px-4 py-2 text-[13px] font-semibold text-[hsl(var(--gold))] transition-colors group-hover:bg-[hsl(var(--gold))]/10">
                    {ad.href ? t("home.viewMore") : t("home.contact")}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    slides.forEach((s) => { const img = new Image(); img.src = s.image; });
  }, []);

  return (
    <div className="relative bg-[hsl(var(--warm-cream))]">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {slides.map((slide, idx) => (
          <div key={idx} className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out" style={{ opacity: idx === currentSlide ? 1 : 0, zIndex: idx === currentSlide ? 1 : 0 }}>
            <img src={slide.image} alt={slide.city} className="h-full w-full object-cover transition-transform duration-[5000ms] ease-out" style={{ filter: "brightness(0.85) saturate(1.1) contrast(1.02)", transform: idx === currentSlide ? "scale(1.04)" : "scale(1)" }} loading="eager" />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.30) 85%, rgba(0,0,0,0.45) 100%)" }} />

        {/* Language Selector — top right */}
        <div className="absolute top-5 right-8 z-20">
          <LanguageSelector />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 py-16 lg:py-20">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col items-center text-center">
              <h1 className="mx-auto max-w-[700px] font-heading font-black leading-[1.15] tracking-tight text-white whitespace-nowrap" style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)" }}>
                {t("hero.title")}
              </h1>

              <p className="mx-auto mt-5 max-w-[640px] font-medium leading-relaxed text-white/90" style={{ fontSize: "clamp(0.8rem, 1.6vw, 1.1rem)", textShadow: "0 2px 12px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
                {t("hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <Button onClick={() => navigate("/formulari")} className="h-12 rounded-lg bg-[hsl(var(--gold))] px-8 text-base font-bold text-white shadow-[0_4px_24px_rgba(201,168,76,0.4)] hover:bg-[hsl(var(--gold-dark))] hover:shadow-[0_8px_36px_rgba(201,168,76,0.55)] hover:scale-[1.03] transition-all duration-300 h-14 px-10 text-lg text-center">
                  {t("hero.cta.primary")}
                </Button>
                <Button variant="outline" onClick={() => navigate("/qa")} className="h-11 rounded-lg border border-white/40 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300">
                  {t("hero.cta.secondary")}
                </Button>
              </div>

              <p className="mx-auto mt-6 max-w-sm text-center text-[11px] leading-relaxed text-white font-medium" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.85)" }}>
                {t("hero.disclaimer")}
              </p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-6 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {trustBadgeKeys.map((key) => (
                  <span key={key} className="flex items-center gap-1.5 text-sm font-medium text-white/70" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))]" />
                    {t(key)}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Flags strip — 80% width, 9 flags, Germany center */}
        <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 flex flex-row flex-nowrap items-center justify-between" style={{ width: "80%", padding: "0 24px" }}>
          {[
            "https://flagcdn.com/h40/ba.png",
            "https://flagcdn.com/h40/rs.png",
            "https://flagcdn.com/h40/hr.png",
            "https://flagcdn.com/h40/me.png",
            "https://flagcdn.com/h40/de.png",
            "https://flagcdn.com/h40/si.png",
            "https://flagcdn.com/h40/mk.png",
            "https://flagcdn.com/h40/al.png",
            "https://flagcdn.com/h40/xk.png",
          ].map((src) => (
            <img key={src} src={src} alt="" className="select-none transition-transform duration-200 hover:scale-110" style={{ height: 34, width: "auto", objectFit: "contain", display: "block" }} loading="eager" />
          ))}
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`rounded-full transition-all duration-500 ${idx === currentSlide ? "h-1.5 w-6 bg-[hsl(var(--gold))] shadow-[0_0_8px_rgba(201,168,76,0.5)]" : "h-1.5 w-1.5 bg-white/15 hover:bg-white/30"}`} aria-label={`Slide ${idx + 1}`} />
          ))}
        </div>
      </section>

      {/* ─── HERO → BODY TRANSITION ─── */}
      <div className="relative h-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/40 to-transparent" />
      </div>

      {/* ─── SERVICES CAROUSEL ─── */}
      <section className="py-16 bg-[hsl(var(--warm-cream))]">
        <div className="container max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="font-heading text-2xl font-extrabold text-[#2D2D2D] lg:text-4xl">
              {t("home.servicesTitle")}
            </h2>
            <p className="mt-2 text-sm text-[#6B6B6B]">{t("home.servicesSubtitle")}</p>
            <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[hsl(var(--gold-dark))] to-[hsl(var(--gold))]" />
          </motion.div>
        </div>
        <ServicesCarousel />
      </section>

      <section className="py-16 bg-white border-t border-[#E8E0D0]">
        <div className="container max-w-[1200px] mx-auto mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[hsl(var(--gold))]">{t("home.showcaseLabel")}</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#2D2D2D]">
              {t("home.showcaseTitle")}
            </h2>
          </motion.div>
        </div>
        <ShowcaseCarousel />
      </section>

      <AdFlowSection />
      <HomeReviews />

      {/* ─── PREMIUM CTA ─── */}
      <section className="py-16 bg-white border-t border-[#E8E0D0]">
        <div className="container max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/[0.08] px-3 py-1">
              <Star className="h-3 w-3 text-[hsl(var(--gold))]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">Premium</span>
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-[#2D2D2D]">
              {t("home.unlockAll")}
            </h2>
            <p className="mt-3 text-sm text-[#6B6B6B]">
              {t("home.unlockDesc")}
            </p>
            <div className="mt-8 flex items-center gap-3 justify-center">
              <Button onClick={() => navigate("/premium")} className="h-12 rounded-full bg-[hsl(var(--gold))] px-8 text-base font-bold text-white shadow-[0_4px_24px_rgba(201,168,76,0.35)] hover:bg-[hsl(var(--gold-dark))] hover:shadow-[0_8px_36px_rgba(201,168,76,0.5)] hover:scale-[1.03] transition-all duration-300">
                {t("home.premiumCta")}
              </Button>
              <Button variant="outline" onClick={() => navigate("/mitgliedschaft")} className="h-12 rounded-full border-[#E8E0D0] px-8 text-sm font-semibold text-[#2D2D2D] hover:bg-[hsl(var(--warm-cream))] transition-all">
                {t("home.comparePlans")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PWAInstallBanner />
    </div>
  );
}
