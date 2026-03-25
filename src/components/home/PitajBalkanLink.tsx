import { useState, useRef } from "react";
import { Search, ArrowRight, Loader2, BookOpen, Briefcase, Home, FileText, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const QUICK_TOPICS = [
  { label: "Kindergeld", icon: FileText },
  { label: "Stan", icon: Home },
  { label: "Posao", icon: Briefcase },
  { label: "Boravišna dozvola", icon: BookOpen },
  { label: "Ausbildung", icon: GraduationCap },
];

interface AssistantResponse {
  content: string;
  redirectUrl?: string;
  redirectLabel?: string;
  guideSlug?: string;
  formSlugs?: string[];
}

export default function PitajBalkanLink() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const askAssistant = async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setResponse(null);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          language,
        }),
      });

      if (!resp.ok) throw new Error("Request failed");

      const contentType = resp.headers.get("content-type") || "";

      // JSON response (intent redirect)
      if (contentType.includes("application/json")) {
        const data = await resp.json();
        setResponse({
          content: data.content || data.text || "",
          redirectUrl: data.redirect_url,
          redirectLabel: data.redirect_label,
        });
      } else {
        // SSE streaming
        const reader = resp.body?.getReader();
        if (!reader) throw new Error("No reader");
        const decoder = new TextDecoder();
        let full = "";
        let buf = "";
        let metaGuideSlug: string | null = null;
        let metaFormSlugs: string[] = [];
        let metaRedirectUrl: string | null = null;
        let metaRedirectLabel: string | null = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buf.indexOf("\n")) !== -1) {
            let line = buf.slice(0, nl);
            buf = buf.slice(nl + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                full += delta;
                setResponse((prev) => ({
                  ...(prev || {}),
                  content: full,
                }));
              }
            } catch {
              /* partial */
            }
          }
        }

        // Extract metadata from response headers
        metaGuideSlug = resp.headers.get("x-guide-slug");
        const formHeader = resp.headers.get("x-form-slugs");
        if (formHeader) metaFormSlugs = formHeader.split(",").map((s) => s.trim());
        metaRedirectUrl = resp.headers.get("x-redirect-url");
        metaRedirectLabel = resp.headers.get("x-redirect-label");

        setResponse({
          content: full,
          guideSlug: metaGuideSlug || undefined,
          formSlugs: metaFormSlugs.length ? metaFormSlugs : undefined,
          redirectUrl: metaRedirectUrl || undefined,
          redirectLabel: metaRedirectLabel || undefined,
        });
      }

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (e) {
      console.error("PitajBL error:", e);
      setResponse({
        content: "Greska pri obradi zahtjeva. Pokusajte ponovo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askAssistant(query);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[hsl(215,55%,7%)] to-[hsl(215,50%,11%)] py-14 px-4 sm:px-6 lg:py-20">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Pitaj{" "}
            <span className="text-gold drop-shadow-[0_0_16px_rgba(255,204,0,0.35)]">
              BalkanLink
            </span>
          </h2>
          <p className="mt-2 text-sm text-white/50 sm:text-base">
            Tvoj pametan vodic kroz Njemacku — od prijave do posla.
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-[0_4px_32px_rgba(0,0,0,0.3)] transition-all focus-within:border-gold/40 focus-within:shadow-[0_4px_32px_rgba(255,204,0,0.12)]">
            <Search className="ml-5 h-5 w-5 shrink-0 text-white/30" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Postavi pitanje… (npr. Kindergeld, stan, posao, Anmeldung)"
              className="flex-1 bg-transparent px-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none sm:py-5 sm:text-base"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-gold-foreground transition-all hover:bg-gold-light disabled:opacity-30 sm:mr-3 sm:h-11 sm:w-11"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </form>

        {/* Quick topics */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => {
                setQuery(topic.label);
                askAssistant(topic.label);
              }}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/50 transition-all hover:border-gold/30 hover:bg-gold/10 hover:text-gold disabled:opacity-40 sm:text-sm"
            >
              <topic.icon className="h-3.5 w-3.5" />
              {topic.label}
            </button>
          ))}
        </div>

        {/* Result area */}
        <AnimatePresence mode="wait">
          {(response || loading) && (
            <motion.div
              ref={resultRef}
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-8 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-5 sm:p-7"
            >
              {loading && !response?.content ? (
                <div className="flex items-center gap-3 text-white/40">
                  <Loader2 className="h-5 w-5 animate-spin text-gold" />
                  <span className="text-sm">Obradujem tvoje pitanje…</span>
                </div>
              ) : response?.content ? (
                <div className="space-y-4">
                  {/* Markdown response */}
                  <div className="prose prose-sm prose-invert max-w-none text-white/80 prose-headings:text-white prose-headings:font-bold prose-strong:text-white prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-li:marker:text-gold/60 prose-ol:text-white/80 prose-ul:text-white/80">
                    <ReactMarkdown>{response.content}</ReactMarkdown>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {response.redirectUrl && (
                      <Link to={response.redirectUrl}>
                        <Button
                          size="sm"
                          className="rounded-full bg-gold text-gold-foreground hover:bg-gold-light"
                        >
                          {response.redirectLabel || "Otvori"}
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
                    {response.guideSlug && (
                      <Link to={`/guide/${response.guideSlug}`}>
                        <Button
                          size="sm"
                          className="rounded-full bg-gold text-gold-foreground hover:bg-gold-light"
                        >
                          Otvori Smart Guide
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
                    {response.formSlugs?.map((slug) => (
                      <Link key={slug} to={`/formulari/${slug}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full border-white/15 text-white/70 hover:border-gold/40 hover:text-gold"
                        >
                          <FileText className="mr-1 h-3.5 w-3.5" />
                          {slug}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
