/**
 * NebenkostenResultView
 *
 * Pretvara Markdown output AI analize u pregledan, kartični prikaz:
 *  - Top "summary trake" sa brojem 🟢 / 🟡 / 🔵 / ⚠️ pronalazaka
 *  - Svaka "## emoji Naslov" sekcija postaje vlastita kartica
 *  - Tag tokeni (🟢 SIGURNO / 🟡 VRIJEDI PROVJERITI / 🔵 INFORMATIVNO)
 *    se prikazuju kao colored pill badge u sadržaju kartice
 *  - Pravna napomena dolazi kao zaseban muted blok na dnu
 *
 * NIŠTA u edge funkciji se ne mijenja — samo presentation layer.
 */
import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp } from "lucide-react";

type Tone = "safe" | "warn" | "info" | "danger" | "neutral";

interface ParsedSection {
  /** raw "## ..." line bez "## " */
  rawTitle: string;
  /** prvi emoji iz naslova (ako postoji) */
  emoji: string | null;
  /** naslov bez emojija */
  title: string;
  /** body bez naslovne linije */
  body: string;
  /** dominanti ton sekcije za boju kartice */
  tone: Tone;
  /** broj zelenih tagova u tijelu */
  greenCount: number;
  yellowCount: number;
  blueCount: number;
}

const TONE_CLASSES: Record<Tone, { border: string; bg: string; iconBg: string; titleColor: string }> = {
  safe:    { border: "border-emerald-500/30", bg: "bg-emerald-500/[0.04]",  iconBg: "bg-emerald-500/15",  titleColor: "text-emerald-700 dark:text-emerald-400" },
  warn:    { border: "border-amber-500/30",   bg: "bg-amber-500/[0.04]",    iconBg: "bg-amber-500/15",    titleColor: "text-amber-700 dark:text-amber-400" },
  info:    { border: "border-sky-500/30",     bg: "bg-sky-500/[0.04]",      iconBg: "bg-sky-500/15",      titleColor: "text-sky-700 dark:text-sky-400" },
  danger:  { border: "border-rose-500/30",    bg: "bg-rose-500/[0.04]",     iconBg: "bg-rose-500/15",     titleColor: "text-rose-700 dark:text-rose-400" },
  neutral: { border: "border-border",         bg: "bg-card",                iconBg: "bg-muted",           titleColor: "text-foreground" },
};

/** Detect leading emoji (1–4 chars) from a heading. */
function splitEmoji(line: string): { emoji: string | null; rest: string } {
  // unicode property escape — emojis often live in Symbol/Other ranges
  const m = line.match(/^([\p{Extended_Pictographic}\u2600-\u27BF]+)\s*(.*)$/u);
  if (m) return { emoji: m[1], rest: m[2].trim() };
  return { emoji: null, rest: line.trim() };
}

function detectTone(emoji: string | null, body: string): Tone {
  // Emoji-based hints take priority
  if (emoji?.includes("⚠️")) return "danger";
  if (emoji?.includes("⏰") || emoji?.includes("🔥")) return "warn";
  if (emoji?.includes("⚖️")) return "neutral";

  // Otherwise, count tags inside body
  const yellow = (body.match(/🟡/g) || []).length;
  const green  = (body.match(/🟢/g) || []).length;
  const blue   = (body.match(/🔵/g) || []).length;
  const danger = (body.match(/❌|✗/g) || []).length;

  if (danger >= 2 && danger > green) return "danger";
  if (yellow > 0 && yellow >= green) return "warn";
  if (green > 0) return "safe";
  if (blue > 0) return "info";
  return "neutral";
}

function parseAnalysis(markdown: string): ParsedSection[] {
  if (!markdown) return [];
  // split on lines starting with "## "
  const lines = markdown.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let current: { title: string; bodyLines: string[] } | null = null;

  for (const line of lines) {
    const m = line.match(/^##\s+(.*)$/);
    if (m) {
      if (current) {
        sections.push(buildSection(current.title, current.bodyLines.join("\n")));
      }
      current = { title: m[1].trim(), bodyLines: [] };
    } else if (current) {
      current.bodyLines.push(line);
    }
    // ignore content before first heading
  }
  if (current) sections.push(buildSection(current.title, current.bodyLines.join("\n")));
  return sections;
}

function buildSection(rawTitle: string, body: string): ParsedSection {
  const { emoji, rest } = splitEmoji(rawTitle);
  const tone = detectTone(emoji, body);
  return {
    rawTitle,
    emoji,
    title: rest || rawTitle,
    body: body.trim(),
    tone,
    greenCount:  (body.match(/🟢/g) || []).length,
    yellowCount: (body.match(/🟡/g) || []).length,
    blueCount:   (body.match(/🔵/g) || []).length,
  };
}

interface Props {
  analysis: string;
}

export default function NebenkostenResultView({ analysis }: Props) {
  const sections = useMemo(() => parseAnalysis(analysis), [analysis]);

  // totals across all sections
  const totals = useMemo(() => {
    return sections.reduce(
      (acc, s) => {
        acc.green  += s.greenCount;
        acc.yellow += s.yellowCount;
        acc.blue   += s.blueCount;
        return acc;
      },
      { green: 0, yellow: 0, blue: 0 }
    );
  }, [sections]);

  // collapse state per section — by default top important ones open
  const [openMap, setOpenMap] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    sections.forEach((s, i) => {
      // open by default: first 3, plus anything containing ⚠️
      init[i] = i < 3 || s.emoji?.includes("⚠️") || s.tone === "danger" || s.tone === "warn";
    });
    return init;
  });

  if (sections.length === 0) {
    // fallback — no headings detected, show raw markdown
    return (
      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-strong:text-foreground">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </article>
    );
  }

  // separate the legal note (⚖️) so we render it differently at the bottom
  const legalIdx = sections.findIndex((s) => s.emoji?.includes("⚖️"));
  const mainSections = legalIdx >= 0 ? sections.filter((_, i) => i !== legalIdx) : sections;
  const legalSection = legalIdx >= 0 ? sections[legalIdx] : null;

  return (
    <div className="space-y-5">
      {/* SUMMARY BAR */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <SummaryPill tone="safe" count={totals.green}  label="Sigurno" />
        <SummaryPill tone="warn" count={totals.yellow} label="Vrijedi provjeriti" />
        <SummaryPill tone="info" count={totals.blue}   label="Informativno" />
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 🟢 sigurno
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 🟡 vrijedi provjeriti
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> 🔵 informativno
        </span>
      </div>

      {/* SECTION CARDS */}
      <div className="space-y-3">
        {mainSections.map((s, i) => {
          const tone = TONE_CLASSES[s.tone];
          const isOpen = !!openMap[i];
          return (
            <div
              key={i}
              className={`rounded-2xl border-2 ${tone.border} ${tone.bg} overflow-hidden transition-colors`}
            >
              <button
                type="button"
                onClick={() => setOpenMap((m) => ({ ...m, [i]: !m[i] }))}
                className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <div className={`shrink-0 h-10 w-10 rounded-xl ${tone.iconBg} flex items-center justify-center text-xl`}>
                  {s.emoji || "📋"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm sm:text-base font-bold leading-tight ${tone.titleColor}`}>
                    {s.title}
                  </h3>
                  {/* mini badges */}
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {s.greenCount > 0 && <MiniBadge tone="safe" count={s.greenCount} />}
                    {s.yellowCount > 0 && <MiniBadge tone="warn" count={s.yellowCount} />}
                    {s.blueCount > 0 && <MiniBadge tone="info" count={s.blueCount} />}
                  </div>
                </div>
                <div className="shrink-0 text-muted-foreground">
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1">
                  <div className="rounded-xl bg-background/50 border border-border/50 p-4">
                    <article className="prose prose-sm dark:prose-invert max-w-none
                                        prose-p:my-2 prose-p:leading-relaxed
                                        prose-ul:my-2 prose-li:my-1
                                        prose-strong:text-foreground
                                        prose-headings:hidden">
                      <ReactMarkdown>{s.body}</ReactMarkdown>
                    </article>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* LEGAL NOTE — distinct muted footer */}
      {legalSection && (
        <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{legalSection.emoji || "⚖️"}</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {legalSection.title}
            </h3>
          </div>
          <article className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none prose-p:my-1 text-muted-foreground prose-strong:text-foreground">
            <ReactMarkdown>{legalSection.body}</ReactMarkdown>
          </article>
        </div>
      )}
    </div>
  );
}

function SummaryPill({ tone, count, label }: { tone: Tone; count: number; label: string }) {
  const t = TONE_CLASSES[tone];
  return (
    <div className={`rounded-2xl border-2 ${t.border} ${t.bg} p-3 sm:p-4 text-center`}>
      <div className={`text-2xl sm:text-3xl font-black ${t.titleColor}`}>{count}</div>
      <div className="mt-0.5 text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}

function MiniBadge({ tone, count }: { tone: Tone; count: number }) {
  const map = {
    safe: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    warn: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    info: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
    danger: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
    neutral: "bg-muted text-muted-foreground",
  } as const;
  const dot = {
    safe: "🟢", warn: "🟡", info: "🔵", danger: "⚠️", neutral: "•",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone]}`}>
      <span>{dot[tone]}</span>
      <span>×{count}</span>
    </span>
  );
}
