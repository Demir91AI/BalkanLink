import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  /** Background style applied to the wrapper section. */
  background?: string;
  /** Optional id for deep-linking / anchor scroll. */
  id?: string;
}

/**
 * Homepage collapsible wrapper. Renders only a title + chevron by default.
 * Content is hidden until user clicks. Smooth expand/collapse.
 */
export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  background = "hsl(220 50% 6%)",
  id,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(defaultOpen ? "none" : "0px");

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    // Defer DOM reads to next animation frame to avoid forced reflow when
    // the effect runs synchronously after a state change.
    const rafId = requestAnimationFrame(() => {
      if (open) {
        const h = el.scrollHeight;
        setMaxHeight(`${h}px`);
        timeoutId = setTimeout(() => setMaxHeight("none"), 450);
      } else {
        const h = el.scrollHeight;
        setMaxHeight(`${h}px`);
        requestAnimationFrame(() => setMaxHeight("0px"));
      }
    });
    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [open]);

  return (
    <section id={id} className="px-4 py-6" style={{ background }}>
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 rounded-xl px-4 py-4 text-left transition-colors"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid hsl(var(--gold))",
          }}
        >
          <span className="font-heading text-lg sm:text-xl font-extrabold text-white">
            {title}
          </span>
          <ChevronDown
            className="h-5 w-5 shrink-0 transition-transform duration-300"
            style={{
              color: "hsl(var(--gold))",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight,
            overflow: maxHeight === "none" ? "visible" : "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
