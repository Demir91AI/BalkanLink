/**
 * HeaderInstallPopup
 * ------------------
 * Dropdown-style popup anchored under a small header trigger button.
 * - Auto-opens once after every login (`bl:user-signed-in` event).
 * - Opens on demand via the trigger button (Smartphone icon in header).
 * - Closes on X, Esc, outside click, or after install accepted.
 * - Per-session dismissal (sessionStorage), not permanent — next login
 *   shows it again, matching the user's request.
 *
 * iOS Safari: shows the manual A2HS instruction (Share → Add to Home Screen).
 * Android/Chromium: triggers the native `beforeinstallprompt` if available.
 * Desktop / unsupported: shows a friendly hint to open on mobile.
 *
 * No PWA / service worker is registered by this component — install only
 * works if the host page already qualifies (manifest + https). Safe inside
 * the Lovable preview iframe (it just won't trigger the native prompt there).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Smartphone, X, Download, Apple, Share2, PlusSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { isStandalone, isIOS, usePWAInstall } from "@/hooks/usePWAInstall";
import { cn } from "@/lib/utils";

const SS_DISMISS_KEY = "bl_install_popup_dismissed";

export function HeaderInstallPopup() {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const { installAndroid, triggerManual } = usePWAInstall();

  const [open, setOpen] = useState(false);
  const [installed, setInstalled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Detect already-installed standalone mode
  useEffect(() => {
    const check = () => {
      try {
        setInstalled(isStandalone());
      } catch {
        setInstalled(false);
      }
    };
    check();
    const mq = window.matchMedia("(display-mode: standalone)");
    const handler = () => check();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Auto-open after every login (per session) — and on initial mount if
  // user is already signed in (e.g. page refresh or returning visitor).
  useEffect(() => {
    const tryOpen = () => {
      try {
        if (isStandalone()) return;
        if (sessionStorage.getItem(SS_DISMISS_KEY) === "1") return;
        window.setTimeout(() => setOpen(true), 600);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("bl:user-signed-in", tryOpen);
    // Also trigger on mount if user is already authenticated
    if (user) tryOpen();
    return () => window.removeEventListener("bl:user-signed-in", tryOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Close on Esc + outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = wrapperRef.current?.contains(target);
      const insidePopup = popupRef.current?.contains(target);
      if (!insideTrigger && !insidePopup) handleDismiss();
    };
    window.addEventListener("keydown", onKey);
    // Capture phase so it runs before other handlers
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SS_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  const handleInstallClick = useCallback(async () => {
    try {
      await installAndroid();
    } catch {
      // Fallback to manual trigger logic (iOS toast or info)
      triggerManual();
    }
    setOpen(false);
  }, [installAndroid, triggerManual]);

  // Hide only if app is already running in standalone mode (already installed).
  // Show for both guests and logged-in users so the install entry is always reachable.
  if (installed) return null;

  const ios = isIOS();

  return (
    <>
      <div ref={wrapperRef} className="relative">
        {/* Trigger button — matches header glassy style */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("install.ariaTrigger", "Instaliraj aplikaciju")}
          aria-expanded={open}
          className="flex items-center justify-center transition-all duration-250 ease-in-out relative"
          style={{
            width: 36,
            height: 36,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
            e.currentTarget.style.background = "rgba(212,175,55,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        >
          <Smartphone
            className="h-[18px] w-[18px]"
            style={{ color: "rgba(255,255,255,0.78)" }}
            strokeWidth={1.9}
          />
          {/* Subtle gold dot to hint there's something to discover */}
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full animate-pulse"
            style={{
              background: "#D4AF37",
              boxShadow: "0 0 6px rgba(212,175,55,0.6)",
            }}
          />
        </button>
      </div>

      {/* Popup is rendered through a portal to escape header's backdrop-filter
          containing block (which would otherwise clip a fixed child). */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popupRef}
            role="dialog"
        aria-modal="false"
        aria-label={t("install.ariaDialog", "Preuzmi BalkanLink aplikaciju")}
        className={cn(
          "fixed right-3 sm:right-4 top-[64px] sm:top-[80px] w-[min(360px,calc(100vw-1.5rem))] origin-top-right z-[100]",
          "rounded-2xl overflow-hidden",
          "transition-all duration-200 ease-out",
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-1"
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(13,22,48,0.98) 0%, rgba(8,15,35,0.98) 100%)",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Top accent line */}
        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
          }}
        />

        {/* Close X */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t("install.close", "Zatvori")}
          className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <X className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.85)" }} />
        </button>

        <div className="p-5 pt-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))",
                border: "1px solid rgba(212,175,55,0.35)",
                boxShadow: "0 0 14px rgba(212,175,55,0.2)",
              }}
            >
              <Download className="h-5 w-5" style={{ color: "#F4D77A" }} />
            </div>
            <div className="min-w-0">
              <h3
                className="text-[15px] font-bold leading-tight mb-0.5"
                style={{ color: "#F8F8FF" }}
              >
                {t("install.title", "Instaliraj BalkanLink")}
              </h3>
              <p className="text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.65)" }}>
                {t(
                  "install.subtitle",
                  "Brži pristup, offline mod i ikona na home screenu."
                )}
              </p>
            </div>
          </div>

          {/* Body — instructions per platform */}
          {ios ? (
            <div
              className="rounded-xl p-3 mb-4 space-y-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Step
                num="1"
                icon={<Apple className="h-3.5 w-3.5" />}
                text={t("install.iosStep1", "Otvori u Safariju na iPhoneu")}
              />
              <Step
                num="2"
                icon={<Share2 className="h-3.5 w-3.5" />}
                text={t("install.iosStep2", "Pritisni Share dugme (kvadrat sa strelicom)")}
              />
              <Step
                num="3"
                icon={<PlusSquare className="h-3.5 w-3.5" />}
                text={t("install.iosStep3", "Odaberi 'Add to Home Screen'")}
              />
            </div>
          ) : (
            <ul
              className="rounded-xl p-3 mb-4 space-y-1.5 text-[12px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              <li className="flex items-start gap-2">
                <span style={{ color: "#D4AF37" }}>✓</span>
                <span>{t("install.benefit1", "Radi i bez interneta na osnovnim ekranima")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#D4AF37" }}>✓</span>
                <span>{t("install.benefit2", "Otvara se kao prava aplikacija — bez tabova")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#D4AF37" }}>✓</span>
                <span>{t("install.benefit3", "Brži start i podsjetnici za rokove")}</span>
              </li>
            </ul>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-[13px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #F4D77A 50%, #B8941F 100%)",
                color: "#0A0F1F",
                boxShadow:
                  "0 4px 14px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
              {ios
                ? t("install.gotItIos", "Razumio sam")
                : t("install.installNow", "Instaliraj sada")}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-xl py-2.5 px-3 text-[12px] font-medium transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {t("install.later", "Kasnije")}
            </button>
          </div>

          {/* Tiny hint footer */}
          <p
            className="mt-3 text-[10.5px] leading-snug text-center"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {t("install.footerHint", "Ovaj prozor se opet pojavljuje pri svakoj prijavi.")}
          </p>
        </div>
          </div>,
          document.body
        )}
    </>
  );
}

function Step({ num, icon, text }: { num: string; icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[12px]" style={{ color: "rgba(255,255,255,0.85)" }}>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shrink-0"
        style={{
          background: "rgba(212,175,55,0.18)",
          border: "1px solid rgba(212,175,55,0.35)",
          color: "#F4D77A",
        }}
      >
        {num}
      </span>
      <span className="opacity-80">{icon}</span>
      <span className="leading-snug">{text}</span>
    </div>
  );
}
