import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Eye, Users, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { BLIcon } from "@/components/BrandLogo";
import { useIsMobile } from "@/hooks/use-mobile";

function seededRandom(salt: number): number {
  const today = new Date();
  const n = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate() + salt;
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

function DateSeededTicker() {
  const items = useMemo(() => {
    const dayOfMonth = new Date().getDate();
    const monthName = new Date().toLocaleString("bs-BA", { month: "long" });
    const todayVisits = Math.floor(seededRandom(1) * 28) + 14;
    const monthViews = Math.floor(800 + dayOfMonth * 14 + seededRandom(2) * 120);
    const monthRegs = Math.floor(seededRandom(3) * 7) + 2;
    return [
      { Icon: Eye, color: "#60a5fa", main: `${monthViews.toLocaleString("de-DE")} pregleda u ${monthName}`, sub: "i broj raste svake sedmice" },
      { Icon: Users, color: "#4ade80", main: `${todayVisits} posjeta danas`, sub: "Balkanci u Njemačkoj pronašli su nas" },
      { Icon: UserPlus, color: "#f97316", main: `Već ${monthRegs} novih registracija u ${monthName}`, sub: "pridruži im se — besplatno" },
    ];
  }, []);
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState<"in" | "out">("in");
  useEffect(() => {
    const id = setInterval(() => {
      setAnim("out");
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setAnim("in");
      }, 400);
    }, 3500);
    return () => clearInterval(id);
  }, [items.length]);
  const cur = items[idx];
  const Icon = cur.Icon;
  const translate = anim === "out" ? "translateY(-100%)" : "translateY(0)";
  const opacity = anim === "out" ? 0 : 1;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center gap-2.5"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 9999,
          padding: "9px 18px 9px 10px",
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `${cur.color}26`,
            transition: "background 400ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Icon size={15} style={{ color: cur.color, transition: "color 400ms cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
        <div className="overflow-hidden" style={{ minWidth: 200 }}>
          <div
            style={{
              transform: translate,
              opacity,
              transition: "transform 400ms cubic-bezier(0.4,0,0.2,1), opacity 400ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: "#f1f5f9", lineHeight: 1.2 }}>{cur.main}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", lineHeight: 1.3, marginTop: 2 }}>{cur.sub}</div>
          </div>
        </div>
        <span
          className="shrink-0 animate-pulse"
          style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }}
          aria-hidden
        />
      </div>
      <div className="flex items-center gap-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            style={{
              height: 3,
              width: i === idx ? 28 : 18,
              borderRadius: 2,
              background: i === idx ? "#f59e0b" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const slides = [
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
];

const INITIAL_SLIDE_COUNT = 2;

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation("pages");
  const { t: tc } = useTranslation("common");
  const trialActive = new Date() < new Date("2026-05-31T23:59:59Z");
  const [askValue, setAskValue] = useState("");
  const [typed, setTyped] = useState("");
  const [phraseKey, setPhraseKey] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);
  const [askFocused, setAskFocused] = useState(false);
  const [renderAllSlides, setRenderAllSlides] = useState(false);
  const isMobile = useIsMobile();

  const trustBadges = [
    t("home.trustBadges.officialSources"),
    t("home.trustBadges.updated"),
    t("home.trustBadges.stepByStep"),
  ];

  const askPlaceholdersFull = t("home.assistantCta.examples", { returnObjects: true }) as string[];
  const askPlaceholdersShortRaw = t("home.assistantCta.examplesShort", { returnObjects: true }) as string[];
  const askPlaceholdersRaw = isMobile && Array.isArray(askPlaceholdersShortRaw) && askPlaceholdersShortRaw.length > 0
    ? askPlaceholdersShortRaw
    : askPlaceholdersFull;
  const askPlaceholdersKey = Array.isArray(askPlaceholdersRaw) ? askPlaceholdersRaw.join("|") : "";
  const askPlaceholders = useMemo(
    () => (Array.isArray(askPlaceholdersRaw) ? askPlaceholdersRaw : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [askPlaceholdersKey],
  );

  // Typewriter: type full phrase → hold → fade-out → switch to next
  useEffect(() => {
    if (askPlaceholders.length === 0) return;
    // Pause animation when input is focused or has user content
    if (askFocused || askValue.length > 0) {
      setTyped("");
      setPhraseVisible(false);
      return;
    }
    setPhraseVisible(true);
    let i = 0;
    let charIdx = 0;
    let mode: "typing" | "holding" | "swapping" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = askPlaceholders[i];
      if (mode === "typing") {
        charIdx++;
        setTyped(current.slice(0, charIdx));
        if (charIdx >= current.length) {
          mode = "holding";
          timer = setTimeout(tick, 2400); // hold full phrase
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 32);
      } else if (mode === "holding") {
        // fade-out current
        setPhraseVisible(false);
        mode = "swapping";
        timer = setTimeout(tick, 350);
      } else {
        // swap to next + fade-in fresh typing
        i = (i + 1) % askPlaceholders.length;
        charIdx = 0;
        setTyped("");
        setPhraseKey((k) => k + 1);
        setPhraseVisible(true);
        mode = "typing";
        timer = setTimeout(tick, 180);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [askPlaceholders, askFocused, askValue.length === 0 ? 0 : 1]);

  const submitAsk = (prefill?: string) => {
    const value = (prefill ?? askValue).trim();
    window.dispatchEvent(new CustomEvent("open-assistant", { detail: { prefill: value || undefined } }));
    setAskValue("");
    if (!value) navigate("/ai-asistent");
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const loadRest = () => setRenderAllSlides(true);
    const ric = (window as typeof window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }).requestIdleCallback;
    if (ric) {
      const id = ric(loadRest, { timeout: 3500 });
      return () => (window as typeof window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(loadRest, 2200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Background slides with slow zoom */}
      {(renderAllSlides ? slides : slides.slice(0, INITIAL_SLIDE_COUNT)).map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: idx === currentSlide ? 1 : 0, zIndex: idx === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt={slide.city}
            width={1280}
            height={720}
            decoding={idx === 0 ? "sync" : "async"}
            className="h-full w-full object-cover"
            style={{
              filter: "brightness(0.55) saturate(1.15) contrast(1.05)",
              animation: idx === currentSlide ? "heroZoom 18s ease-in-out infinite alternate" : "none",
            }}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      {/* Radial glow behind text area */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.65) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade for depth */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, rgba(2,6,23,0.85) 100%)",
        }}
      />

      {/* Side vignette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(90deg, rgba(2,6,23,0.5) 0%, transparent 25%, transparent 75%, rgba(2,6,23,0.5) 100%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {/* Headline - staggered */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading font-[900] leading-[1.08] sm:whitespace-nowrap"
            style={{
              fontSize: "clamp(1.6rem, 4.2vw, 3.8rem)",
              background: "linear-gradient(135deg, #ffffff 20%, #D4AF37 60%, #F5D76E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
            }}
          >
            {t("home.heroHeadlineBeforeAccent")}{t("home.heroHeadlineAccent")}{t("home.heroHeadlineAfterAccent")}
          </motion.h1>

          {/* Stari baner uklonjen — premješten iznad Asistent bloka */}

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mx-auto mt-7 max-w-xl text-white/80 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
          >
            {t("home.heroSubline")}
          </motion.p>

          {/* CTA — premium split duo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3.5"
          >
            {/* Primary — gold with shimmer + arrow */}
            <button
              onClick={() => navigate("/formulari")}
              aria-label={t("home.ctaPrimary")}
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl px-9 py-[15px] text-[15px] font-extrabold text-[#0a0a0a] transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 50%, hsl(var(--gold)) 100%)",
                backgroundSize: "200% 100%",
                border: "1px solid hsla(43,80%,70%,0.45)",
                boxShadow:
                  "0 14px 36px -10px hsla(43,70%,55%,0.65), 0 0 0 1px hsla(43,70%,55%,0.15) inset, inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
            >
              {/* Shimmer sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              {/* Soft outer glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-[14px] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: "radial-gradient(60% 60% at 50% 50%, hsla(43,70%,55%,0.55), transparent 70%)" }}
              />
              <Sparkles className="relative h-[17px] w-[17px]" strokeWidth={2.5} />
              <span className="relative tracking-tight">{t("home.ctaPrimary")}</span>
              <ArrowRight className="relative h-[17px] w-[17px] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.7} />
            </button>

            {/* Secondary — ghost with gold accent on hover */}
            <button
              onClick={() => navigate("/paketi")}
              aria-label={t("home.ctaSecondary")}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-9 py-[15px] text-[15px] font-semibold text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:text-white active:scale-[0.97]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(22,30,52,0.35) 0%, rgba(8,12,24,0.35) 100%)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Gold border tint on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 0 1.5px hsla(43,70%,55%,0.55)" }}
              />
              <span className="relative tracking-tight">{t("home.ctaSecondary")}</span>
              <ArrowRight className="relative h-[15px] w-[15px] opacity-60 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={2.4} />
            </button>
          </motion.div>

          {/* "Šta je BalkanLink?" — diskretan link koji otvara modal (zamjena za uklonjeni FAB) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease }}
            className="mt-4 flex justify-center"
          >
            <button
              type="button"
              onClick={() => { try { window.dispatchEvent(new CustomEvent("bl:open-whatis")); } catch { /* noop */ } }}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 px-3.5 py-1.5 text-[12px] font-semibold text-[hsl(var(--gold))]/90 shadow-[0_0_18px_-6px_hsla(43,70%,55%,0.55)] backdrop-blur-sm transition-all hover:border-[hsl(var(--gold))]/70 hover:bg-[hsl(var(--gold))]/15 hover:text-[hsl(var(--gold))]"
            >
              <Sparkles className="h-3 w-3 opacity-90 transition-opacity group-hover:opacity-100" />
              <span>{t("home.whatIsLink")}</span>
            </button>
          </motion.div>

          {/* ─── Live social proof ─── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
            className="mt-8 flex justify-center"
          >
            <DateSeededTicker />
          </motion.div>

          {/* Launch Trial banner — gold WOW (shine + pulse + float), bez 🎉 konfeta */}
          {trialActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease }}
              className="mt-12 w-full flex flex-col items-center px-2"
            >
              {/* Diskretan Promo chip — iznad banera, "etiketa" */}
              <span className="relative z-20 -mb-2 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[hsl(var(--gold))]/40 bg-slate-950/80 px-3 py-1 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-[hsl(var(--gold))] shadow-sm backdrop-blur-sm sm:px-4 sm:text-[10px] sm:tracking-[0.12em]">
                {tc("trialCta.promoLabel")}
              </span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                aria-label={tc("trialCta.heroBanner")}
                className="bl-trial-banner group relative w-full max-w-xl overflow-hidden rounded-2xl border-2 border-amber-200/70 px-5 py-4 text-slate-900 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] sm:px-7 sm:py-5"
              >
                <span className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-5">
                  {/* Left: paketić */}
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900/15 text-[18px] sm:h-11 sm:w-11 sm:text-[20px]"
                    aria-hidden
                  >
                    🎁
                  </span>

                  {/* Center: text */}
                  <span className="flex min-w-0 flex-col items-center text-center leading-tight">
                    <span className="text-[14px] font-black tracking-tight sm:text-[16px]">
                      {tc("trialCta.heroBanner")}
                    </span>
                    <span className="mt-1 text-[11px] font-semibold text-slate-900/75 sm:text-[12.5px]">
                      {tc("trialCta.heroSubtext")}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-900/75 sm:text-[12.5px]">
                      {tc("trialCta.heroSubtextLine2")}
                    </span>
                  </span>

                  {/* Right: arrow */}
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900 text-amber-100 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-11 sm:w-11"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.8} />
                  </span>
                </span>
              </button>

            </motion.div>
          )}

          {/* ─── Asistent — interactive ask bar ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
            className="mt-10 w-full max-w-3xl"
          >
            {/* Unified Asistent block: label tab + bar feel like one piece */}
            <div className="relative flex flex-col items-center">
              {/* Floating brand label — no box, just glowing text above bar */}
              <div className="relative z-10 mb-2 inline-flex items-center gap-2.5">
                <Sparkles
                  className="h-[18px] w-[18px] text-[hsl(var(--gold))]"
                  style={{
                    filter: "drop-shadow(0 0 8px hsla(43,70%,55%,0.8))",
                    animation: "blSparkleA 3.6s ease-in-out infinite",
                  }}
                />
                <h2
                  className="text-[19px] font-extrabold tracking-[0.04em] sm:text-[21px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, hsl(var(--gold-light)) 0%, #fff 35%, hsl(var(--gold)) 65%, hsl(var(--gold-light)) 100%)",
                    backgroundSize: "220% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    animation: "blChipShine 5s ease-in-out infinite",
                    textShadow: "0 0 28px hsla(43,70%,55%,0.45)",
                  }}
                >
                  BalkanLink Asistent
                </h2>
                <Sparkles
                  className="h-[18px] w-[18px] text-[hsl(var(--gold))]"
                  style={{
                    filter: "drop-shadow(0 0 8px hsla(43,70%,55%,0.8))",
                    animation: "blSparkleB 3.6s ease-in-out infinite",
                  }}
                />
              </div>

            {/* Ask bar — premium dual-glow, full width */}
            <form
              onSubmit={(e) => { e.preventDefault(); submitAsk(); }}
              className="group relative w-full rounded-[22px] transition-all duration-300 focus-within:-translate-y-0.5"
            >
              {/* Soft outer halo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[14px] rounded-[32px] opacity-50 blur-2xl transition-opacity duration-500 group-focus-within:opacity-80"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, hsla(43,70%,55%,0.45) 0%, hsla(43,70%,55%,0) 70%)",
                }}
              />
              {/* Bar surface */}
              <div
                className="relative overflow-hidden rounded-[20px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(22,30,52,0.18) 0%, rgba(8,12,24,0.18) 100%)",
                  border: "1px solid hsla(43,70%,55%,0.25)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow:
                    "0 30px 90px -25px rgba(0,0,0,0.85), 0 0 60px -20px hsla(43,70%,55%,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
              >
                {/* Continuous slow sheen sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                    animation: "blSheen 5.5s ease-in-out infinite",
                  }}
                />
                {/* Top inner highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                  }}
                />

                <div className="relative flex items-center gap-3 p-2.5 sm:gap-3.5 sm:p-3">
                  {/* Brand avatar — real BL logo with pulsing gold ring */}
                  <span className="relative flex h-12 w-12 sm:h-[52px] sm:w-[52px] shrink-0 items-center justify-center">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl opacity-80"
                      style={{
                        background:
                          "linear-gradient(135deg, hsla(43,70%,55%,0.45), hsla(43,70%,55%,0.05))",
                        animation: "blAvatarPulse 3.2s ease-in-out infinite",
                      }}
                    />
                    <span
                      className="relative flex h-12 w-12 sm:h-[52px] sm:w-[52px] items-center justify-center rounded-xl ring-1 ring-[hsla(43,70%,55%,0.45)]"
                      style={{
                        boxShadow:
                          "0 8px 26px -6px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12)",
                        background:
                          "linear-gradient(135deg, rgba(20,28,48,0.9), rgba(8,12,24,0.9))",
                      }}
                    >
                      <BLIcon size={40} />
                    </span>
                  </span>

                  {/* Input */}
                  <div className="relative min-w-0 flex-1 overflow-hidden">
                    <input
                      type="text"
                      value={askValue}
                      onChange={(e) => setAskValue(e.target.value)}
                      onFocus={() => setAskFocused(true)}
                      onBlur={() => setAskFocused(false)}
                      placeholder=" "
                      aria-label={t("home.assistantCta.title")}
                      className="peer w-full bg-transparent py-3 pr-1 text-[12.5px] sm:text-[15px] font-medium text-white placeholder-transparent caret-[hsl(var(--gold))] outline-none truncate"
                    />
                    {/* Typewriter placeholder (only when input is empty AND not focused) */}
                    {askValue.length === 0 && !askFocused && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center text-[12.5px] sm:text-[15px] text-white/65">
                        <div
                          className="flex w-full items-center overflow-hidden whitespace-nowrap pr-2"
                        >
                          <span
                            key={phraseKey}
                            className="inline-block min-w-0 flex-1 truncate transition-all duration-300 ease-out"
                            style={{
                              opacity: phraseVisible ? 1 : 0,
                              transform: phraseVisible ? "translateY(0)" : "translateY(-6px)",
                            }}
                          >
                            {typed}
                          </span>
                          <span
                            aria-hidden
                            className="ml-0.5 inline-block h-[1.1em] w-[2px] shrink-0 rounded-[1px] bg-[hsl(var(--gold))]"
                            style={{
                              animation: "blCaret 1s steps(2) infinite",
                              boxShadow: "0 0 8px hsla(43,70%,55%,0.7)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit — premium pill with text */}
                  <button
                    type="submit"
                    aria-label={t("home.assistantCta.send")}
                    className="group/btn relative flex h-12 sm:h-[52px] shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 sm:px-5 text-[#0a0a0a] font-extrabold text-[14px] sm:text-[15px] tracking-tight transition-all duration-200 hover:scale-[1.04] active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 100%)",
                      boxShadow:
                        "0 12px 32px -6px hsla(43,70%,55%,0.75), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                    />
                    <span className="relative hidden sm:inline">{t("home.assistantCta.send")}</span>
                    <ArrowRight className="relative h-5 w-5" strokeWidth={2.8} />
                  </button>
                </div>
              </div>
            </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blCaret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        @keyframes blRingSpin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes blSheen {
          0% { transform: translateX(0) skewX(12deg); opacity: 0 }
          15% { opacity: 1 }
          60% { transform: translateX(450%) skewX(12deg); opacity: 0.8 }
          100% { transform: translateX(450%) skewX(12deg); opacity: 0 }
        }
        @keyframes blAvatarPulse {
          0%, 100% { transform: scale(1); opacity: 0.55 }
          50% { transform: scale(1.08); opacity: 0.85 }
        }
        @keyframes blChipPulse {
          0%, 100% { transform: scale(1); opacity: 0.5 }
          50% { transform: scale(1.6); opacity: 0 }
        }
        @keyframes blChipShine {
          0%, 100% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
        }
        @keyframes blSparkleA {
          0%, 100% { opacity: 0.55; transform: scale(1) rotate(0deg) }
          50% { opacity: 1; transform: scale(1.2) rotate(15deg) }
        }
        @keyframes blSparkleB {
          0%, 100% { opacity: 1; transform: scale(1.2) rotate(-15deg) }
          50% { opacity: 0.55; transform: scale(1) rotate(0deg) }
        }
      `}</style>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? "h-1.5 w-6 bg-[hsl(var(--gold))] shadow-[0_0_8px_hsla(43,52%,54%,0.5)]"
                : "h-1.5 w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
