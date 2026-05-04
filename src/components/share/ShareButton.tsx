import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Share2, Copy, Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildEmailLink,
  buildFacebookLink,
  buildLinkedInLink,
  buildTelegramLink,
  buildViberLink,
  buildWhatsAppLink,
  buildXLink,
} from "./shareLinks";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedInLogo,
  TelegramLogo,
  ViberLogo,
  WhatsAppLogo,
  XLogo,
} from "./BrandIcons";

type Variant = "icon" | "compact" | "full";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  variant?: Variant;
  className?: string;
}

interface Channel {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  bg: string;
  fg: string;
}

/**
 * Universal share component.
 * - Mobile: tries Web Share API first (covers Instagram, Snapchat, etc.)
 * - Fallback panel: WhatsApp, Telegram, Viber, Facebook, X, LinkedIn, Email, Copy
 */
export default function ShareButton({
  url,
  title,
  text,
  variant = "compact",
  className,
}: ShareButtonProps) {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || (typeof document !== "undefined" ? document.title : "BalkanLink");
  const shareText = text || t("share.defaultText", "Pogledaj ovo na BalkanLink:");
  const target = { url: shareUrl, title: shareTitle, text: shareText };

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hasNativeShare =
    typeof navigator !== "undefined" && typeof (navigator as any).share === "function";

  const handleNative = async () => {
    if (!hasNativeShare) return false;
    try {
      await (navigator as any).share({ title: shareTitle, text: shareText, url: shareUrl });
    } catch {
      /* user cancelled or share failed — do nothing */
    }
    return true;
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If the device supports native share, ALWAYS use it.
    // Never open the fallback panel when native is available — otherwise the
    // panel stays visible after the user dismisses the native share sheet.
    if (hasNativeShare) {
      await handleNative();
      return;
    }
    setOpen((v) => !v);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const handleInstagram = async () => {
    // Instagram has no web share URL; copy link, then prompt user.
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* ignore */
    }
  };

  const channels: Channel[] = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: buildWhatsAppLink(target),
      icon: <WhatsAppLogo className="h-4 w-4" />,
      bg: "bg-[#25D366]",
      fg: "text-white",
    },
    {
      key: "telegram",
      label: "Telegram",
      href: buildTelegramLink(target),
      icon: <TelegramLogo className="h-4 w-4" />,
      bg: "bg-[#229ED9]",
      fg: "text-white",
    },
    {
      key: "viber",
      label: "Viber",
      href: buildViberLink(target),
      icon: <ViberLogo className="h-4 w-4" />,
      bg: "bg-[#7360F2]",
      fg: "text-white",
    },
    {
      key: "facebook",
      label: "Facebook",
      href: buildFacebookLink(target),
      icon: <FacebookLogo className="h-4 w-4" />,
      bg: "bg-[#1877F2]",
      fg: "text-white",
    },
    {
      key: "instagram",
      label: t("share.instagram", "Instagram"),
      onClick: handleInstagram,
      icon: <InstagramLogo className="h-4 w-4" />,
      bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
      fg: "text-white",
    },
    {
      key: "x",
      label: "X",
      href: buildXLink(target),
      icon: <XLogo className="h-4 w-4" />,
      bg: "bg-black ring-1 ring-white/20",
      fg: "text-white",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: buildLinkedInLink(target),
      icon: <LinkedInLogo className="h-4 w-4" />,
      bg: "bg-[#0A66C2]",
      fg: "text-white",
    },
    {
      key: "email",
      label: t("share.email", "Email"),
      href: buildEmailLink(target),
      icon: <Mail className="h-4 w-4" />,
      bg: "bg-white/15",
      fg: "text-white",
    },
  ];

  const baseBtn =
    "inline-flex items-center justify-center gap-2 rounded-full border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--gold)/0.10)] px-3 py-1.5 text-[13px] font-semibold text-[hsl(var(--gold))] backdrop-blur transition-all hover:bg-[hsl(var(--gold)/0.18)] hover:border-[hsl(var(--gold)/0.7)] active:scale-[0.97]";

  return (
    <div ref={wrapRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={t("share.aria", "Podijeli")}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          baseBtn,
          variant === "icon" && "h-10 w-10 p-0",
          variant === "full" && "w-full",
        )}
      >
        <Share2 className="h-4 w-4" aria-hidden />
        {variant !== "icon" && <span>{t("share.label", "Podijeli")}</span>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("share.aria", "Podijeli")}
          className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1224]/95 shadow-2xl backdrop-blur-xl animate-fade-in"
        >
          <div className="border-b border-white/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            {t("share.heading", "Podijeli stranicu")}
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5">
            {channels.map((ch) =>
              ch.href ? (
                <a
                  key={ch.key}
                  href={ch.href}
                  target={ch.href.startsWith("mailto:") || ch.href.startsWith("viber://") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#0b1224] px-3 py-2.5 text-[12.5px] text-white/90 transition-colors hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full shadow-sm", ch.bg, ch.fg)}>
                    {ch.icon}
                  </span>
                  <span className="font-medium truncate">{ch.label}</span>
                </a>
              ) : (
                <button
                  key={ch.key}
                  type="button"
                  onClick={() => {
                    ch.onClick?.();
                  }}
                  className="flex items-center gap-2.5 bg-[#0b1224] px-3 py-2.5 text-left text-[12.5px] text-white/90 transition-colors hover:bg-white/[0.06]"
                >
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full shadow-sm", ch.bg, ch.fg)}>
                    {ch.icon}
                  </span>
                  <span className="font-medium truncate">{ch.label}</span>
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-3 border-t border-white/10 px-4 py-3 text-left text-[13px] text-white/90 transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80">
              {copied ? <Check className="h-4 w-4 text-[hsl(45,93%,55%)]" /> : <Copy className="h-4 w-4" />}
            </span>
            <span className="font-medium">
              {copied ? t("share.copied", "Link kopiran!") : t("share.copy", "Kopiraj link")}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
