import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "icon" | "compact" | "full";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  variant?: Variant;
  className?: string;
}

/**
 * Universal share component.
 * - Mobile: uses Web Share API when available
 * - Desktop / fallback: WhatsApp link + Copy link
 * Fully i18n via "common:share" namespace.
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

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || (typeof document !== "undefined" ? document.title : "BalkanLink");
  const shareText = text || t("share.defaultText", "Pogledaj ovo na BalkanLink:");

  const message = `${shareText} ${shareUrl}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const handleNative = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: shareTitle, text: shareText, url: shareUrl });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await handleNative();
    if (!ok) setOpen((v) => !v);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const baseBtn =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-white/85 backdrop-blur transition-all hover:bg-white/[0.08] hover:border-[hsl(45,93%,49%)]/40 active:scale-[0.97]";

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={t("share.aria", "Podijeli")}
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
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1224]/95 shadow-2xl backdrop-blur-xl"
          onMouseLeave={() => setOpen(false)}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/90 transition-colors hover:bg-white/[0.06]"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="font-medium">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-3 border-t border-white/5 px-4 py-3 text-left text-[13px] text-white/90 transition-colors hover:bg-white/[0.06]"
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
