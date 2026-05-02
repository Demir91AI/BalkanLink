import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquarePlus, Eye, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { SaveStarButton } from "@/components/saved/SaveStarButton";

interface CQ {
  id: string;
  title: string;
  body: string;
  category: string | null;
  lang: string;
  author_name: string | null;
  answer: string | null;
  answered_at: string | null;
  view_count: number;
  created_at: string;
}

const COPY = {
  bs: {
    title: "Pitaj dijasporu",
    intro: "Postavi pitanje – odgovorit će ti neko iz dijaspore koji je prošao isto.",
    ask: "Postavi pitanje",
    askLogin: "Prijavi se da postaviš pitanje",
    formTitle: "Tvoje pitanje",
    fTitle: "Naslov pitanja",
    fTitlePh: "npr. Kako da prijavim adresu u Münchenu?",
    fBody: "Detalji",
    fBodyPh: "Opiši situaciju – što više detalja, lakši je odgovor.",
    fCat: "Kategorija (opcionalno)",
    submit: "Pošalji pitanje",
    submitting: "Slanje...",
    success: "Pitanje poslano! Odgovor stiže u roku 24-48h.",
    error: "Greška pri slanju. Pokušaj ponovo.",
    none: "Još nema objavljenih pitanja. Budi prvi!",
    answered: "Odgovoreno",
    views: "pregleda",
    by: "Pita",
    anon: "Anonimno",
    loading: "Učitavanje...",
  },
  de: {
    title: "Frag die Diaspora",
    intro: "Stell deine Frage – jemand aus der Diaspora, der dasselbe erlebt hat, antwortet.",
    ask: "Frage stellen",
    askLogin: "Anmelden, um eine Frage zu stellen",
    formTitle: "Deine Frage",
    fTitle: "Titel der Frage",
    fTitlePh: "z. B. Wie melde ich meine Adresse in München an?",
    fBody: "Details",
    fBodyPh: "Beschreibe die Situation – je mehr Details, desto einfacher die Antwort.",
    fCat: "Kategorie (optional)",
    submit: "Frage senden",
    submitting: "Wird gesendet...",
    success: "Frage gesendet! Antwort kommt innerhalb von 24-48h.",
    error: "Fehler beim Senden. Versuche es erneut.",
    none: "Noch keine veröffentlichten Fragen. Sei der Erste!",
    answered: "Beantwortet",
    views: "Aufrufe",
    by: "Fragt",
    anon: "Anonym",
    loading: "Lädt...",
  },
  hr: {
    title: "Pitaj dijasporu",
    intro: "Postavi pitanje – odgovorit će ti netko iz dijaspore koji je prošao isto.",
    ask: "Postavi pitanje",
    askLogin: "Prijavi se da postaviš pitanje",
    formTitle: "Tvoje pitanje",
    fTitle: "Naslov pitanja",
    fTitlePh: "npr. Kako prijaviti adresu u Münchenu?",
    fBody: "Detalji",
    fBodyPh: "Opiši situaciju – što više detalja, lakši odgovor.",
    fCat: "Kategorija (opcionalno)",
    submit: "Pošalji pitanje",
    submitting: "Slanje...",
    success: "Pitanje poslano! Odgovor stiže u roku 24-48h.",
    error: "Greška pri slanju. Pokušaj ponovno.",
    none: "Još nema objavljenih pitanja. Budi prvi!",
    answered: "Odgovoreno",
    views: "pregleda",
    by: "Pita",
    anon: "Anonimno",
    loading: "Učitavanje...",
  },
  sr: {
    title: "Pitaj dijasporu",
    intro: "Postavi pitanje – odgovoriće ti neko iz dijaspore ko je prošao isto.",
    ask: "Postavi pitanje",
    askLogin: "Prijavi se da postaviš pitanje",
    formTitle: "Tvoje pitanje",
    fTitle: "Naslov pitanja",
    fTitlePh: "npr. Kako da prijavim adresu u Minhenu?",
    fBody: "Detalji",
    fBodyPh: "Opiši situaciju – što više detalja, lakši odgovor.",
    fCat: "Kategorija (opciono)",
    submit: "Pošalji pitanje",
    submitting: "Slanje...",
    success: "Pitanje poslato! Odgovor stiže u roku 24-48h.",
    error: "Greška pri slanju. Pokušaj ponovo.",
    none: "Još nema objavljenih pitanja. Budi prvi!",
    answered: "Odgovoreno",
    views: "pregleda",
    by: "Pita",
    anon: "Anonimno",
    loading: "Učitavanje...",
  },
};

export default function PitajDijasporu() {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const lang = (i18n.language || "bs").slice(0, 2) as "bs" | "de" | "hr" | "sr";
  const T = COPY[lang] || COPY.bs;

  const [items, setItems] = useState<CQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", category: "" });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("community_questions")
      .select("id,title,body,category,lang,author_name,answer,answered_at,view_count,created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(50);
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!user) return;
    if (form.title.trim().length < 5 || form.body.trim().length < 10) {
      toast.error(T.error);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("community_questions").insert({
      user_id: user.id,
      author_name: (user.user_metadata?.first_name as string) || null,
      title: form.title.trim(),
      body: form.body.trim(),
      category: form.category.trim() || null,
      lang,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error(T.error);
      return;
    }
    toast.success(T.success);
    setForm({ title: "", body: "", category: "" });
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{T.title} | BalkanLink</title>
        <meta name="description" content={T.intro} />
      </Helmet>
      <div className="min-h-screen" style={{ background: "hsl(215 55% 4%)" }}>
        <div className="container py-8 md:py-12 max-w-4xl">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{T.title}</h1>
              <p className="mt-2 text-white/60 max-w-xl">{T.intro}</p>
            </div>
            {user ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2 bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
                    <MessageSquarePlus className="h-5 w-5" />
                    {T.ask}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{T.formTitle}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div>
                      <label className="text-sm font-medium mb-1 block">{T.fTitle}</label>
                      <Input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder={T.fTitlePh}
                        maxLength={200}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{T.fBody}</label>
                      <Textarea
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        placeholder={T.fBodyPh}
                        rows={6}
                        maxLength={4000}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{T.fCat}</label>
                      <Input
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        placeholder="Anmeldung, Kindergeld, Wohnen..."
                        maxLength={50}
                      />
                    </div>
                    <Button onClick={submit} disabled={submitting} className="w-full">
                      {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{T.submitting}</> : T.submit}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button asChild size="lg" variant="outline" className="border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10">
                <Link to="/login">{T.askLogin}</Link>
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-white/50">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />{T.loading}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-12 text-center text-white/50"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {T.none}
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((q) => {
                const initials = (q.author_name || "?")
                  .split(" ")
                  .map((s) => s[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                return (
                  <Link
                    key={q.id}
                    to={`/pitaj-dijasporu/${q.id}`}
                    className="group relative rounded-2xl p-[1px] transition-all hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 50%, rgba(212,175,55,0.18) 100%)",
                    }}
                  >
                    <div
                      className="relative rounded-2xl p-5 sm:p-6 h-full backdrop-blur-sm transition-colors group-hover:bg-[hsl(215_55%_5%)]"
                      style={{ background: "hsl(215 55% 4%)" }}
                    >
                      {/* Header: avatar + ime + status */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black shadow-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(45 80% 55%) 100%)",
                          }}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white truncate">
                            {q.author_name || T.anon}
                          </p>
                          <p className="text-[11px] text-white/40">
                            {new Date(q.created_at).toLocaleDateString(lang)}
                          </p>
                        </div>
                        {q.answer ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3" />
                            {T.answered}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10 shrink-0">
                            <Clock className="h-3 w-3" />
                          </span>
                        )}
                        <SaveStarButton
                          type="qa"
                          id={q.id}
                          title={q.title}
                          path={`/pitaj-dijasporu/${q.id}`}
                          className="-mr-1"
                        />
                      </div>

                      {/* Naslov + body */}
                      <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mb-2 group-hover:text-[hsl(var(--gold))] transition-colors">
                        {q.title}
                      </h2>
                      <p className="text-sm text-white/55 line-clamp-2 leading-relaxed mb-4">
                        {q.body}
                      </p>

                      {/* Footer: kategorija + views */}
                      <div className="flex items-center gap-3 text-xs">
                        {q.category && (
                          <span className="rounded-full border border-[hsl(var(--gold))]/25 bg-[hsl(var(--gold))]/5 px-2.5 py-1 text-[10px] font-semibold text-[hsl(var(--gold))]">
                            {q.category}
                          </span>
                        )}
                        <span className="ml-auto flex items-center gap-1 text-white/40">
                          <Eye className="h-3 w-3" />
                          {q.view_count} {T.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
