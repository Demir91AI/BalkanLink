import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle, Send } from "lucide-react";

interface CQ {
  id: string;
  title: string;
  body: string;
  category: string | null;
  lang: string;
  status: string;
  author_name: string | null;
  answer: string | null;
  created_at: string;
}

export default function AdminPitanja() {
  const { user } = useAuth();
  const [items, setItems] = useState<CQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "published" | "all">("pending");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    let q = supabase.from("community_questions").select("*").order("created_at", { ascending: false }).limit(200);
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setItems((data || []) as any);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const publish = async (id: string) => {
    const answer = drafts[id]?.trim();
    if (!answer) { toast.error("Napiši odgovor prije objavljivanja."); return; }
    setBusy(id);
    const { error } = await supabase.from("community_questions").update({
      answer,
      answered_by: user?.user_metadata?.first_name || "Dijaspora",
      answered_at: new Date().toISOString(),
      status: "published",
    }).eq("id", id);
    setBusy(null);
    if (error) { toast.error("Greška: " + error.message); return; }
    toast.success("Objavljeno!");
    load();
  };

  const reject = async (id: string) => {
    setBusy(id);
    await supabase.from("community_questions").update({ status: "rejected" }).eq("id", id);
    setBusy(null);
    load();
  };

  return (
    <>
      <Helmet><title>Admin · Pitanja dijaspore</title><meta name="robots" content="noindex" /></Helmet>
      <div className="container py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Pitanja dijaspore</h1>
          <div className="flex gap-2">
            {(["pending", "published", "all"] as const).map((f) => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
                {f}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin mr-2" />Učitavanje...</div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">Nema pitanja u kategoriji "{filter}".</p>
        ) : (
          <div className="space-y-4">
            {items.map((q) => (
              <div key={q.id} className="rounded-xl border border-border/40 bg-card/60 p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold">{q.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <Badge variant="outline">{q.lang}</Badge>
                    <Badge variant={q.status === "published" ? "default" : "secondary"}>{q.status}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">{q.body}</p>
                <div className="text-xs text-muted-foreground mb-3">
                  {q.author_name || "Anon"} · {new Date(q.created_at).toLocaleString()}
                  {q.category && ` · ${q.category}`}
                </div>

                {q.status === "published" && q.answer ? (
                  <div className="rounded-lg bg-primary/5 border border-primary/30 p-3 text-sm whitespace-pre-line">{q.answer}</div>
                ) : q.status === "pending" ? (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Napiši odgovor..."
                      rows={4}
                      value={drafts[q.id] || ""}
                      onChange={(e) => setDrafts({ ...drafts, [q.id]: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => publish(q.id)} disabled={busy === q.id}>
                        <Send className="h-4 w-4 mr-1" />Objavi
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => reject(q.id)} disabled={busy === q.id}>
                        <XCircle className="h-4 w-4 mr-1" />Odbij
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
