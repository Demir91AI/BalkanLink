import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, CheckCircle2, Clock, Calendar, Loader2, MessageSquare, Send, UserCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { toast } from "sonner";

interface CQ {
  id: string;
  title: string;
  body: string;
  category: string | null;
  lang: string;
  author_name: string | null;
  answer: string | null;
  answered_by: string | null;
  answered_at: string | null;
  view_count: number;
  created_at: string;
}

interface CA {
  id: string;
  author_name: string | null;
  body: string;
  upvotes: number;
  created_at: string;
}

const COPY = {
  bs: {
    back: "Sva pitanja",
    answer: "Odgovor",
    noAnswer: "Još nema odgovora. Budi prvi koji će podijeliti iskustvo.",
    by: "Pita",
    on: "Postavljeno",
    views: "pregleda",
    answered: "Odgovoreno",
    notFound: "Pitanje nije pronađeno.",
    answersHeading: "Odgovori iz dijaspore",
    yourAnswer: "Tvoj odgovor",
    placeholder: "Podijeli svoje iskustvo, savjet ili šta ti je pomoglo...",
    submit: "Pošalji odgovor",
    submitting: "Slanje...",
    success: "Odgovor poslat! Bit će vidljiv nakon pregleda.",
    error: "Greška. Pokušaj ponovo.",
    loginCta: "Prijavi se da odgovoriš",
    anon: "Anonimno",
    minLen: "Odgovor mora imati barem 5 znakova.",
  },
  de: {
    back: "Alle Fragen",
    answer: "Antwort",
    noAnswer: "Noch keine Antworten. Sei der Erste, der seine Erfahrung teilt.",
    by: "Fragt",
    on: "Gestellt am",
    views: "Aufrufe",
    answered: "Beantwortet",
    notFound: "Frage nicht gefunden.",
    answersHeading: "Antworten aus der Diaspora",
    yourAnswer: "Deine Antwort",
    placeholder: "Teile deine Erfahrung, deinen Tipp oder was dir geholfen hat...",
    submit: "Antwort senden",
    submitting: "Wird gesendet...",
    success: "Antwort gesendet! Sie wird nach Prüfung sichtbar.",
    error: "Fehler. Versuche es erneut.",
    loginCta: "Anmelden, um zu antworten",
    anon: "Anonym",
    minLen: "Antwort muss mindestens 5 Zeichen haben.",
  },
  hr: {
    back: "Sva pitanja",
    answer: "Odgovor",
    noAnswer: "Još nema odgovora. Budi prvi koji će podijeliti iskustvo.",
    by: "Pita",
    on: "Postavljeno",
    views: "pregleda",
    answered: "Odgovoreno",
    notFound: "Pitanje nije pronađeno.",
    answersHeading: "Odgovori iz dijaspore",
    yourAnswer: "Tvoj odgovor",
    placeholder: "Podijeli svoje iskustvo, savjet ili što ti je pomoglo...",
    submit: "Pošalji odgovor",
    submitting: "Slanje...",
    success: "Odgovor poslan! Bit će vidljiv nakon pregleda.",
    error: "Greška. Pokušaj ponovno.",
    loginCta: "Prijavi se da odgovoriš",
    anon: "Anonimno",
    minLen: "Odgovor mora imati barem 5 znakova.",
  },
  sr: {
    back: "Sva pitanja",
    answer: "Odgovor",
    noAnswer: "Još nema odgovora. Budi prvi koji će podeliti iskustvo.",
    by: "Pita",
    on: "Postavljeno",
    views: "pregleda",
    answered: "Odgovoreno",
    notFound: "Pitanje nije pronađeno.",
    answersHeading: "Odgovori iz dijaspore",
    yourAnswer: "Tvoj odgovor",
    placeholder: "Podeli svoje iskustvo, savet ili šta ti je pomoglo...",
    submit: "Pošalji odgovor",
    submitting: "Slanje...",
    success: "Odgovor poslat! Biće vidljiv nakon pregleda.",
    error: "Greška. Pokušaj ponovo.",
    loginCta: "Prijavi se da odgovoriš",
    anon: "Anonimno",
    minLen: "Odgovor mora imati bar 5 znakova.",
  },
};

export default function PitajDijasporuDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const lang = (i18n.language || "bs").slice(0, 2) as "bs" | "de" | "hr" | "sr";
  const T = COPY[lang] || COPY.bs;
  const [q, setQ] = useState<CQ | null>(null);
  const [answers, setAnswers] = useState<CA[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadAnswers = async () => {
    if (!id) return;
    const { data } = await supabase
      .from("community_answers")
      .select("id,author_name,body,upvotes,created_at")
      .eq("question_id", id)
      .eq("status", "published")
      .order("created_at", { ascending: true });
    setAnswers((data || []) as CA[]);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase
        .from("community_questions")
        .select("*")
        .eq("id", id)
        .eq("status", "published")
        .maybeSingle();
      setQ(data as any);
      setLoading(false);
      if (data) supabase.rpc("cq_increment_view", { _id: id });
      await loadAnswers();
    })();
  }, [id]);

  const submitAnswer = async () => {
    if (!user || !id) return;
    const body = draft.trim();
    if (body.length < 5) {
      toast.error(T.minLen);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("community_answers").insert({
      question_id: id,
      user_id: user.id,
      author_name: (user.user_metadata?.first_name as string) || null,
      body,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error(T.error);
      return;
    }
    toast.success(T.success);
    setDraft("");
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "hsl(215 55% 4%)" }}>
        <div className="container py-12 text-white/50 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />...
        </div>
      </div>
    );
  }
  if (!q) {
    return (
      <div className="min-h-screen" style={{ background: "hsl(215 55% 4%)" }}>
        <div className="container py-12 text-center">
          <p className="text-white/60 mb-4">{T.notFound}</p>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/pitaj-dijasporu"><ArrowLeft className="h-4 w-4 mr-2" />{T.back}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const hasAnyAnswer = !!q.answer || answers.length > 0;

  return (
    <>
      <SEO title={q.title} description={(q.body || q.title).slice(0, 160)} path={`/pitaj-dijasporu/${q.id}`} type="article" />
      <div className="min-h-screen" style={{ background: "hsl(215 55% 4%)" }}>
        <div className="container py-8 md:py-12 max-w-3xl">
          <Breadcrumbs />
          <Button asChild variant="ghost" size="sm" className="mb-4 text-white/70 hover:text-white hover:bg-white/5">
            <Link to="/pitaj-dijasporu"><ArrowLeft className="h-4 w-4 mr-2" />{T.back}</Link>
          </Button>

          {/* Pitanje */}
          <article
            className="rounded-2xl border p-6 md:p-8 mb-6"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{q.title}</h1>
              {hasAnyAnswer ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="h-3 w-3" />{T.answered}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/50 border border-white/10 shrink-0">
                  <Clock className="h-3 w-3" />
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/45 mb-5">
              <span>{T.by}: {q.author_name || T.anon}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(q.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{q.view_count} {T.views}</span>
              {q.category && (
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/60">{q.category}</span>
              )}
            </div>
            <p className="text-white/85 whitespace-pre-line leading-relaxed">{q.body}</p>
          </article>

          {/* Sekcija odgovora */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[hsl(var(--gold))]" />
              <h2 className="text-xl font-bold text-white">{T.answersHeading}</h2>
              <span className="text-sm text-white/40">({(q.answer ? 1 : 0) + answers.length})</span>
            </div>

            {/* Glavni odgovor (legacy single answer) */}
            {q.answer && (
              <div
                className="rounded-2xl border p-5 md:p-6"
                style={{ background: "rgba(212,175,55,0.06)", borderColor: "rgba(212,175,55,0.3)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <UserCircle2 className="h-5 w-5 text-[hsl(var(--gold))]" />
                  <span className="font-semibold text-white">{q.answered_by || T.anon}</span>
                  {q.answered_at && (
                    <span className="text-xs text-white/40">· {new Date(q.answered_at).toLocaleDateString()}</span>
                  )}
                </div>
                <p className="text-white/85 whitespace-pre-line leading-relaxed">{q.answer}</p>
              </div>
            )}

            {/* Dodatni odgovori iz zajednice */}
            {answers.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <UserCircle2 className="h-5 w-5 text-white/50" />
                  <span className="font-semibold text-white">{a.author_name || T.anon}</span>
                  <span className="text-xs text-white/40">· {new Date(a.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-white/80 whitespace-pre-line leading-relaxed text-[15px]">{a.body}</p>
              </div>
            ))}

            {!hasAnyAnswer && (
              <div
                className="rounded-2xl border border-dashed p-8 text-center text-white/50 text-sm"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                {T.noAnswer}
              </div>
            )}
          </section>

          {/* Forma za novi odgovor */}
          <section
            className="mt-8 rounded-2xl border p-5 md:p-6"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <h3 className="text-lg font-semibold text-white mb-3">{T.yourAnswer}</h3>
            {user ? (
              <div className="space-y-3">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={T.placeholder}
                  rows={5}
                  maxLength={4000}
                  className="bg-black/30 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--gold))]/40"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={submitAnswer}
                    disabled={submitting}
                    className="bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90"
                  >
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{T.submitting}</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />{T.submit}</>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <Button asChild variant="outline" className="border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10">
                <Link to="/login">{T.loginCta}</Link>
              </Button>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
