import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, ArrowRight, CheckCircle2, Eye, ChevronDown, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CQ {
  id: string;
  title: string;
  body: string;
  category: string | null;
  view_count: number;
  answered_at: string | null;
}

/**
 * Homepage section that surfaces the latest answered community questions.
 * Loads top 3 published & answered questions, falls back to most recent published.
 */
export default function CommunityHighlights() {
  const { t } = useTranslation("pages");
  const [items, setItems] = useState<CQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      // First try answered questions
      const { data: answered } = await supabase
        .from("community_questions")
        .select("id,title,body,category,view_count,answered_at")
        .eq("status", "published")
        .not("answer", "is", null)
        .order("answered_at", { ascending: false })
        .limit(3);

      let list = answered || [];
      if (list.length < 3) {
        // Backfill with most recent published, regardless of answer
        const { data: recent } = await supabase
          .from("community_questions")
          .select("id,title,body,category,view_count,answered_at")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(3);
        const seen = new Set(list.map((q) => q.id));
        for (const r of recent || []) {
          if (!seen.has(r.id)) list.push(r as CQ);
          if (list.length >= 3) break;
        }
      }
      if (!cancelled) {
        setItems(list as CQ[]);
        setLoading(false);
      }
    };
    // Defer to idle so it doesn't extend the critical request chain / LCP
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const handle = ric
      ? ric(() => { if (!cancelled) load(); }, { timeout: 3000 })
      : (window.setTimeout(() => { if (!cancelled) load(); }, 1800) as unknown as number);
    return () => {
      cancelled = true;
      if (ric && (window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  // Don't render section if there's no content yet
  if (!loading && items.length === 0) return null;

  return (
    <section
      className="py-10 sm:py-12 px-4"
      style={{ background: "hsl(215 55% 4%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] border border-[hsl(var(--gold))]/25 p-6 sm:p-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(234,179,8,0.06) 0%, rgba(234,179,8,0.02) 40%, rgba(255,255,255,0.02) 100%)",
            boxShadow:
              "0 30px 80px -30px rgba(234,179,8,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(var(--gold)/0.35), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)" }}
          />

          {/* Header */}
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">
                <Sparkles className="h-3 w-3" />
                {t("home.community.label", "Pitaj dijasporu")}
              </div>
              <h2 className="mt-3 font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-br from-white via-white to-[hsl(var(--gold))]/85 bg-clip-text text-transparent">
                  {t("home.community.heading", "Pitanja i odgovori iz zajednice")}
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/65 max-w-xl leading-relaxed">
                {t(
                  "home.community.subline",
                  "Postavi pitanje, pitaj za iskustvo i dobij konkretan odgovor od ljudi koji su prošli isto.",
                )}
              </p>
            </div>
            <Link
              to="/pitaj-dijasporu"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 px-4 py-2 text-sm font-semibold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/20 transition-colors shrink-0"
            >
              <MessageSquarePlus className="h-4 w-4" />
              {t("home.community.askCta", "Postavi pitanje")}
            </Link>
          </div>

          {/* Fancy collapsible toggle */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="relative w-full flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-3.5 text-left transition-all hover:bg-white/[0.07] hover:border-[hsl(var(--gold))]/30 group"
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/15 ring-1 ring-[hsl(var(--gold))]/35">
                <MessageSquarePlus className="h-4 w-4 text-[hsl(var(--gold))]" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] sm:text-sm font-bold text-white">
                  {expanded
                    ? t("home.community.hideList", "Sakrij pitanja")
                    : t("home.community.showList", "Prikaži najnovija pitanja")}
                </span>
                <span className="block text-[11px] text-white/50 mt-0.5">
                  {items.length}{" "}
                  {items.length === 1
                    ? t("home.community.questionOne", "pitanje")
                    : t("home.community.questionMany", "pitanja")}
                </span>
              </span>
            </span>
            <ChevronDown
              className={`h-5 w-5 text-[hsl(var(--gold))] transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="qa-list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-[160px] rounded-2xl border border-white/5 bg-white/[0.03] animate-pulse"
                        />
                      ))
                    : items.map((q, idx) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.06, duration: 0.3 }}
                        >
                          <Link
                            to={`/pitaj-dijasporu/${q.id}`}
                            className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.07] hover:-translate-y-0.5"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              {q.answered_at ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/20">
                                  <CheckCircle2 className="h-3 w-3" />
                                  {t("home.community.answered", "Odgovoreno")}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10">
                                  {t("home.community.pending", "Novo")}
                                </span>
                              )}
                              {q.view_count > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
                                  <Eye className="h-3 w-3" />
                                  {q.view_count}
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-white text-[15px] leading-snug line-clamp-2 group-hover:text-[hsl(var(--gold))] transition-colors">
                              {q.title}
                            </h3>
                            <p className="mt-2 text-xs text-white/45 line-clamp-2 leading-relaxed">
                              {q.body}
                            </p>
                            <div className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 group-hover:text-white">
                              {t("home.community.read", "Pročitaj")}
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
