import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"before" | "after">("after");
  const [sliderPos, setSliderPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Cache rect on drag-start to avoid forced reflow on every mousemove
  const cachedRect = useRef<{ left: number; width: number } | null>(null);
  const { t } = useTranslation("pages");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const refreshRect = useCallback(() => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    cachedRect.current = { left: r.left, width: r.width };
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!dragging.current || !cachedRect.current) return;
    const { left, width } = cachedRect.current;
    const pct = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100);
    setSliderPos(pct);
  }, []);

  const onMouseDown = () => { refreshRect(); dragging.current = true; };
  const onMouseUp = () => { dragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchStart = () => { refreshRect(); dragging.current = true; };
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const onScrollOrResize = () => { if (dragging.current) refreshRect(); };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [refreshRect]);

  const beforeContent = (
    <div className="p-6 sm:p-8 sm:pt-14 h-full" style={{ background: "#f3f4f6", fontFamily: "monospace" }}>
      <div className="space-y-3">
        <div className="h-3 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-1/2 rounded bg-gray-300" />
        <div className="border border-gray-300 rounded p-3 mt-4 space-y-2">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">ANTRAG AUF KINDERGELD</div>
          <div className="grid grid-cols-2 gap-2">
            {["Familienname", "Vorname", "Geburtsdatum", "Steuer-ID", "Bankverbindung", "Staatsangehörigkeit"].map(f => (
              <div key={f} className="border border-gray-300 rounded p-1.5">
                <span className="text-[9px] text-gray-500">{f}</span>
                <div className="h-2.5 w-full bg-gray-200 rounded mt-1" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-2/3 rounded bg-gray-200" />
        </div>
        <div className="text-[8px] text-gray-400 mt-4 leading-relaxed">
          Hinweis: Bitte füllen Sie alle Felder vollständig aus. Unvollständige Anträge werden nicht bearbeitet. 
          Für weitere Informationen beachten Sie das Merkblatt KG2...
        </div>
      </div>
    </div>
  );

  const afterContent = (
    <div className="p-6 sm:p-8 sm:pt-14 h-full" style={{ background: "hsl(220 50% 6%)" }}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "hsla(43,52%,54%,0.15)" }}>📋</div>
          <div>
            <div className="text-sm font-bold text-white">{t("home.beforeAfter.afterCard.title")}</div>
            <div className="text-[10px] text-white/40">{t("home.beforeAfter.afterCard.subtitle")}</div>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/4 rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))" }} />
        </div>
        {[
          { label: t("home.beforeAfter.afterCard.field1"), hint: t("home.beforeAfter.afterCard.hint1"), example: "Kovač" },
          { label: t("home.beforeAfter.afterCard.field2"), hint: t("home.beforeAfter.afterCard.hint2"), example: "Maja" },
          { label: t("home.beforeAfter.afterCard.field3"), hint: t("home.beforeAfter.afterCard.hint3"), example: "15.03.1990" },
        ].map(f => (
          <div key={f.label} className="rounded-xl p-3" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-white">{f.label}</span>
              <span className="text-[9px] text-[hsl(var(--gold))]">💡 {f.hint}</span>
            </div>
            <div className="h-8 rounded-lg flex items-center px-3 text-xs text-white/60" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {f.example}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-lg p-2" style={{ background: "hsla(145,60%,32%,0.1)", border: "1px solid hsla(145,60%,32%,0.2)" }}>
          <span className="text-xs">✅</span>
          <span className="text-[10px] text-emerald-400">{t("home.beforeAfter.afterCard.ok")}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-14 px-4"
      style={{ background: "hsl(220 50% 5%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-[900] text-white tracking-tight">
            {t("home.beforeAfter.heading")}
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg mx-auto">
            {t("home.beforeAfter.subline")}
          </p>
        </div>

        {/* Mobile: tabs */}
        <div className="sm:hidden">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("before")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === "before" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {t("home.beforeAfter.before")}
            </button>
            <button
              onClick={() => setTab("after")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === "after" ? "text-[hsl(var(--gold))] border border-[hsla(43,52%,54%,0.4)]" : "bg-white/5 text-white/40 border border-white/10"
              }`}
              style={tab === "after" ? { background: "hsla(43,52%,54%,0.1)" } : {}}
            >
              {t("home.beforeAfter.after")}
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10" style={{ minHeight: 340 }}>
            <div style={{ opacity: 1, transition: "opacity 0.3s ease" }}>
              {tab === "before" ? beforeContent : afterContent}
            </div>
          </div>
        </div>

        {/* Desktop: slider comparison */}
        <div
          ref={containerRef}
          className="hidden sm:block relative rounded-2xl overflow-hidden border border-white/10 select-none"
          style={{ height: 480, cursor: dragging.current ? "grabbing" : "default" }}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* Before (full width behind) */}
          <div className="absolute inset-0">
            {beforeContent}
            <div className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm">
              {t("home.beforeAfter.before")}
            </div>
          </div>

          {/* After (clipped) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            {afterContent}
            <div
              className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--gold))] border backdrop-blur-sm"
              style={{ background: "hsla(43,52%,54%,0.15)", borderColor: "hsla(43,52%,54%,0.3)", boxShadow: "0 0 12px hsla(43,52%,54%,0.2)" }}
            >
              {t("home.beforeAfter.after")}
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 cursor-col-resize"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)", background: "hsl(var(--gold))", boxShadow: "0 0 12px hsla(43,52%,54%,0.5)" }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "hsl(var(--gold))", color: "#000", boxShadow: "0 4px 20px hsla(43,52%,54%,0.5)" }}
            >
              ⟷
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
