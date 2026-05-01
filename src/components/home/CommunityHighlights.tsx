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
    load();
    return () => { cancelled = true; };
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
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[hsl(var(--gold))]/40 bg-gradient-to-r from-[hsl(var(--gold))]/15 to-[hsl(var(--gold))]/5 px-4 py-2 shadow-[0_0_24px_-8px_hsl(var(--gold)/0.5)]">
              <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6 text-[hsl(var(--gold))]" />
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[hsl(var(--gold))] tracking-tight">
                {t("home.community.label", "Pitaj dijasporu")}
              </h2>
            </div>
            <p className="mt-4 text-lg sm:text-xl font-semibold text-white">
              {t("home.community.heading", "Pitanja i odgovori iz zajednice")}
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
              {t(
                "home.community.subline",
                "Postavi pitanje, pitaj za iskustvo i dobij konkretan odgovor od ljudi koji su prošli isto.",
              )}
            </p>
          </div>
          <Link
            to="/pitaj-dijasporu"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 px-4 py-2 text-sm font-semibold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/15 transition-colors"
          >
            <MessageSquarePlus className="h-4 w-4" />
            {t("home.community.askCta", "Postavi pitanje")}
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[160px] rounded-2xl border border-white/5 bg-white/[0.03] animate-pulse"
                />
              ))
            : items.map((q) => (
                <Link
                  key={q.id}
                  to={`/pitaj-dijasporu/${q.id}`}
                  className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur transition-all hover:border-[hsl(var(--gold))]/30 hover:bg-white/[0.05] hover:-translate-y-0.5"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
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
              ))}
        </div>
      </div>
    </section>
  );
}
