import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, CheckCircle2, Clock, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

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

const COPY = {
  bs: { back: "Sva pitanja", answer: "Odgovor", noAnswer: "Još bez odgovora", by: "Pita", on: "Postavljeno", views: "pregleda", answered: "Odgovoreno", notFound: "Pitanje nije pronađeno." },
  de: { back: "Alle Fragen", answer: "Antwort", noAnswer: "Noch keine Antwort", by: "Fragt", on: "Gestellt am", views: "Aufrufe", answered: "Beantwortet", notFound: "Frage nicht gefunden." },
  hr: { back: "Sva pitanja", answer: "Odgovor", noAnswer: "Još bez odgovora", by: "Pita", on: "Postavljeno", views: "pregleda", answered: "Odgovoreno", notFound: "Pitanje nije pronađeno." },
  sr: { back: "Sva pitanja", answer: "Odgovor", noAnswer: "Još bez odgovora", by: "Pita", on: "Postavljeno", views: "pregleda", answered: "Odgovoreno", notFound: "Pitanje nije pronađeno." },
};

export default function PitajDijasporuDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = (i18n.language || "bs").slice(0, 2) as "bs" | "de" | "hr" | "sr";
  const T = COPY[lang] || COPY.bs;
  const [q, setQ] = useState<CQ | null>(null);
  const [loading, setLoading] = useState(true);

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
    })();
  }, [id]);

  if (loading) return <div className="container py-12 text-muted-foreground">...</div>;
  if (!q) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground mb-4">{T.notFound}</p>
        <Button asChild variant="outline"><Link to="/pitaj-dijasporu"><ArrowLeft className="h-4 w-4 mr-2" />{T.back}</Link></Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{q.title} | BalkanLink</title>
        <meta name="description" content={q.body.slice(0, 160)} />
      </Helmet>
      <div className="container py-8 md:py-12 max-w-3xl">
        <Breadcrumbs />
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/pitaj-dijasporu"><ArrowLeft className="h-4 w-4 mr-2" />{T.back}</Link>
        </Button>

        <article className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur p-6 md:p-8 mb-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{q.title}</h1>
            {q.answer ? (
              <Badge variant="default" className="gap-1 shrink-0"><CheckCircle2 className="h-3 w-3" />{T.answered}</Badge>
            ) : (
              <Badge variant="secondary" className="gap-1 shrink-0"><Clock className="h-3 w-3" /></Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
            <span>{T.by}: {q.author_name || "Anonimno"}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(q.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{q.view_count} {T.views}</span>
            {q.category && <Badge variant="outline" className="text-xs">{q.category}</Badge>}
          </div>
          <p className="text-foreground/90 whitespace-pre-line leading-relaxed">{q.body}</p>
        </article>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            {T.answer}
          </h2>
          {q.answer ? (
            <>
              <p className="text-foreground/90 whitespace-pre-line leading-relaxed">{q.answer}</p>
              {q.answered_by && (
                <p className="text-xs text-muted-foreground mt-4">— {q.answered_by}{q.answered_at && ` · ${new Date(q.answered_at).toLocaleDateString()}`}</p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground italic">{T.noAnswer}</p>
          )}
        </section>
      </div>
    </>
  );
}
