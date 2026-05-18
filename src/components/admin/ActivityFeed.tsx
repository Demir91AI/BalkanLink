import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Loader2, Star, MessageSquare, Megaphone, UserPlus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ActivityItem = {
  id: string;
  kind: "review" | "question" | "ad" | "user";
  title: string;
  meta?: string;
  body?: string;
  status?: string;
  createdAt: string;
  href?: string;
};

const fmtDT = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString("bs-BA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
};

const ICONS: Record<ActivityItem["kind"], any> = {
  review: Star,
  question: MessageSquare,
  ad: Megaphone,
  user: UserPlus,
};

const KIND_LABEL: Record<ActivityItem["kind"], string> = {
  review: "Recenzija",
  question: "Pitanje",
  ad: "Oglas",
  user: "Registracija",
};

const KIND_COLOR: Record<ActivityItem["kind"], string> = {
  review: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  question: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  ad: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  user: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export default function ActivityFeed() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const sinceISO = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const all: ActivityItem[] = [];

    const [reviews, questions, ads, users] = await Promise.all([
      supabase.from("reviews").select("id, username, rating, comment, created_at").gte("created_at", sinceISO).order("created_at", { ascending: false }).limit(20),
      supabase.from("community_questions").select("id, title, body, status, author_name, lang, created_at").gte("created_at", sinceISO).order("created_at", { ascending: false }).limit(20),
      supabase.from("ads").select("id, title, category, city, status, created_at").gte("created_at", sinceISO).order("created_at", { ascending: false }).limit(20),
      supabase.from("profiles").select("id, email, first_name, subscription_tier, created_at").gte("created_at", sinceISO).order("created_at", { ascending: false }).limit(20),
    ]);

    (reviews.data || []).forEach((r: any) => all.push({
      id: `r-${r.id}`, kind: "review",
      title: `${r.username || "Anonimno"} – ${r.rating}/5★`,
      body: r.comment || "",
      createdAt: r.created_at,
    }));
    (questions.data || []).forEach((q: any) => all.push({
      id: `q-${q.id}`, kind: "question",
      title: q.title,
      meta: `${q.author_name || "Anonimno"} • ${q.lang}`,
      body: q.body,
      status: q.status,
      createdAt: q.created_at,
      href: "/admin/pitanja",
    }));
    (dir.data || []).forEach((d: any) => all.push({
      id: `d-${d.id}`, kind: "directory",
      title: d.name,
      meta: `${d.category || "—"} • ${d.city || "—"}`,
      status: d.verified ? "verified" : "pending",
      createdAt: d.created_at,
    }));
    (ads.data || []).forEach((a: any) => all.push({
      id: `a-${a.id}`, kind: "ad",
      title: a.title,
      meta: `${a.category || "—"} • ${a.city || "—"}`,
      status: a.status,
      createdAt: a.created_at,
    }));
    (users.data || []).forEach((u: any) => all.push({
      id: `u-${u.id}`, kind: "user",
      title: u.first_name || u.email || "Novi korisnik",
      meta: u.email,
      status: u.subscription_tier,
      createdAt: u.created_at,
    }));
    (payments.data || []).forEach((p: any) => all.push({
      id: `p-${p.id}`, kind: "payment",
      title: `${(p.amount / 100).toFixed(2)} ${p.currency || "EUR"}`,
      meta: p.status,
      createdAt: p.paid_at || p.created_at,
    }));

    all.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    setItems(all.slice(0, 100));
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" /> Učitavanje aktivnosti...</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Posljednjih 14 dana — recenzije, pitanja, biznisi, oglasi, registracije, uplate.</p>
        <Button size="sm" variant="outline" onClick={load} className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Osvježi</Button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Nema novih aktivnosti.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => {
            const Icon = ICONS[it.kind];
            return (
              <li key={it.id} className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/50 p-3 hover:bg-card/70 transition-colors">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${KIND_COLOR[it.kind]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`${KIND_COLOR[it.kind]} text-[10px] uppercase tracking-wider`}>{KIND_LABEL[it.kind]}</Badge>
                    {it.status && <Badge variant="secondary" className="text-[10px]">{it.status}</Badge>}
                    <span className="text-[11px] text-muted-foreground ml-auto">{fmtDT(it.createdAt)}</span>
                  </div>
                  <div className="mt-1 text-sm font-medium truncate">{it.title}</div>
                  {it.meta && <div className="text-xs text-muted-foreground truncate">{it.meta}</div>}
                  {it.body && <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{it.body}</div>}
                  {it.href && (
                    <Link to={it.href} className="text-[11px] text-[hsl(var(--gold))] hover:underline mt-1 inline-block">Otvori →</Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
