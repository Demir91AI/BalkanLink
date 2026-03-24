import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Copy, ShieldCheck, ExternalLink, BookOpen, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { formCatalog, type FormEntry } from "@/lib/form-catalog";

type SiteTopicAction = { url: string; label: string };

type Msg = {
  role: "user" | "assistant";
  content: string;
  guideSlug?: string | null;
  formSlugs?: string[];
  siteTopics?: SiteTopicAction[];
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

// ── Valid app routes (for 404 prevention) ──
const VALID_ROUTES = new Set([
  "/", "/dolazak", "/pocni-ovdje", "/dolazak/prijava-prebivalista",
  "/dolazak/boravisna-dozvola", "/dolazak/steuer-id-i-porezna-klasa",
  "/dolazak/zdravstveno-osiguranje", "/dolazak/bankovni-racun",
  "/dolazak/prvi-koraci", "/dolazak/sozialversicherung",
  "/dolazak/rundfunkbeitrag", "/dolazak/fuehrerschein",
  "/dolazak/auto-anmelden", "/zivot", "/zivot-savjeti",
  "/probleme", "/trebam-pomoc", "/formulare", "/formulari",
  "/familie", "/foerderungen", "/tools", "/brutto-netto-rechner",
  "/wohnungen", "/stellenangebote", "/premium", "/dokumenten-check",
  "/qa", "/directory", "/directory/submit", "/ambasade-konzulati",
  "/ambasade", "/login", "/register", "/impressum", "/datenschutz",
  "/disclaimer", "/haftungsausschluss", "/ki-hinweis", "/mitgliedschaft",
  "/nudim-trazim",
]);

function isValidRoute(path: string): boolean {
  if (VALID_ROUTES.has(path)) return true;
  // Dynamic routes: /guide/:slug, /formulari/:slug, /qa/:id
  if (path.startsWith("/guide/") || path.startsWith("/formulari/") || path.startsWith("/qa/")) return true;
  return false;
}

// ── Form catalog lookup ──
const ALL_FORMS: FormEntry[] = (() => {
  const seen = new Set<string>();
  const result: FormEntry[] = [];
  for (const group of formCatalog) {
    for (const item of group.items) {
      if (!seen.has(item.slug)) { seen.add(item.slug); result.push(item); }
    }
  }
  return result;
})();

function extractFormMarkers(text: string): { cleanText: string; formSlugs: string[] } {
  const regex = /\[FORM:([a-z0-9-]+)\]/gi;
  const slugs: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!slugs.includes(match[1])) slugs.push(match[1]);
  }
  const cleanText = text.replace(regex, "").replace(/\n{3,}/g, "\n\n").trim();
  return { cleanText, formSlugs: slugs };
}

// ── Guide slug detection ──
const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld", kinderzuschlag: "kinderzuschlag", elterngeld: "elterngeld",
  mutterschutz: "mutterschaftsgeld", bürgergeld: "buergergeld", burgergeld: "buergergeld",
  wohngeld: "wohngeld", bafög: "bafoeg", bafoeg: "bafoeg",
  anmeldung: "anmeldung", aufenthaltstitel: "aufenthaltstitel-verlaengerung",
  boravišn: "aufenthaltstitel-verlaengerung", boravisn: "aufenthaltstitel-verlaengerung",
  führungszeugnis: "fuehrungszeugnis", krankengeld: "krankengeld",
  sozialhilfe: "sozialhilfe", unterhalt: "unterhaltsvorschuss", wbs: "wbs",
  arbeitslosengeld: "arbeitslosengeld", kurzarbeitergeld: "kurzarbeitergeld",
  bildungsgutschein: "bildungsgutschein", integrationskurs: "integrationskurs",
  kirchenaustritt: "kirchenaustritt", heizkostenzuschuss: "heizkostenzuschuss",
  rundfunkbeitrag: "gez-anmeldung", gez: "gez-anmeldung",
  steuerklasse: "steuerklassenwechsel", krankenkasse: "familienversicherung",
};

function detectGuideSlugFromText(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, slug] of Object.entries(TOPIC_GUIDE_MAP)) {
    if (lower.includes(keyword)) return slug;
  }
  return null;
}

// ── i18n ──
const PLACEHOLDER: Record<string, string> = {
  bs: "Npr. Kindergeld, stan, posao, AGB...",
  de: "Z.B. Kindergeld, Wohnung, Job, AGB...",
  en: "E.g. Kindergeld, apartment, job, AGB...",
};

const ERROR_MSG: Record<string, string> = {
  bs: "Došlo je do greške. Pokušajte ponovo.",
  de: "Ein Fehler ist aufgetreten. Versuchen Sie es erneut.",
  en: "An error occurred. Please try again.",
};

const DISCLAIMER: Record<string, string> = {
  bs: "Informativne smjernice — za konačne odluke konsultujte nadležnu instituciju.",
  de: "Informative Hinweise — für Entscheidungen wenden Sie sich an die zuständige Behörde.",
  en: "Informative guidance — for final decisions, consult the relevant authority.",
};

// ── Markdown renderer ──
function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href && href.startsWith("/")) {
            if (!isValidRoute(href)) return <span className="font-medium text-muted-foreground">{children}</span>;
            return <Link to={href} className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-500">{children}</Link>;
          }
          return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-500">{children}</a>;
        },
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ol: ({ children }) => <ol className="mb-2 list-decimal space-y-0.5 pl-5">{children}</ol>,
        ul: ({ children }) => <ul className="mb-2 list-disc space-y-0.5 pl-5">{children}</ul>,
        li: ({ children }) => <li className="text-[13px] leading-snug">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        h1: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1">{children}</h4>,
        h2: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1">{children}</h4>,
        h3: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1">{children}</h4>,
        h4: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1">{children}</h4>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Action buttons (max 2) ──
function ResponseActions({ msg, lk }: { msg: Msg; lk: string }) {
  const actions: { label: string; to: string; icon: typeof BookOpen; primary?: boolean }[] = [];

  if (msg.guideSlug) {
    const guidePath = `/guide/${msg.guideSlug}`;
    actions.push({
      label: lk === "de" ? "Smart Guide öffnen" : lk === "en" ? "Open Smart Guide" : "Pokreni Smart Guide",
      to: guidePath,
      icon: BookOpen,
      primary: true,
    });
  }

  if (msg.formSlugs && msg.formSlugs.length > 0) {
    const slug = msg.formSlugs[0];
    const formPath = `/formulari/${slug}`;
    // Only add if different from guide action
    if (!actions.some(a => a.to === formPath)) {
      actions.push({
        label: lk === "de" ? "Formular öffnen" : lk === "en" ? "Open form" : "Otvori formular",
        to: formPath,
        icon: ExternalLink,
      });
    }
  }

  if (msg.siteTopics && msg.siteTopics.length > 0) {
    for (const topic of msg.siteTopics) {
      if (!isValidRoute(topic.url)) continue;
      if (actions.some(a => a.to === topic.url)) continue;
      if (actions.length >= 2) break;
      actions.push({
        label: lk === "de" ? `${topic.label} öffnen` : lk === "en" ? `Open ${topic.label}` : `Otvori: ${topic.label}`,
        to: topic.url,
        icon: ExternalLink,
      });
    }
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {actions.slice(0, 2).map((a, i) => (
        <Link
          key={i}
          to={a.to}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${
            a.primary
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-background text-foreground hover:bg-accent"
          }`}
        >
          <a.icon className="h-3 w-3" />
          {a.label}
        </Link>
      ))}
    </div>
  );
}

// ── Main Component ──
export default function ChatAssistant() {
  const { language } = useLanguage();
  const { isPremium } = useAuth();
  const lk = ["bs", "hr", "sr", "me"].includes(language) ? "bs" : language === "de" ? "de" : "en";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
  }, [open]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const sendMessageWithText = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const detectedSlug = detectGuideSlugFromText(text);

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      const { cleanText, formSlugs } = extractFormMarkers(assistantSoFar);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: cleanText, guideSlug: detectedSlug, formSlugs } : m));
        }
        return [...prev, { role: "assistant", content: cleanText, guideSlug: detectedSlug, formSlugs }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages, isPremium, language }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const contentType = resp.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await resp.json();
        if (data.smart_guide_redirect) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content, guideSlug: data.guideSlug || detectedSlug, formSlugs: data.detectedForm ? [data.detectedForm.slug] : [] }]);
          setLoading(false);
          return;
        }
        if (data.premium_required) {
          setMessages(prev => [...prev, { role: "assistant", content: `${data.teaser}\n\n${data.cta}`, formSlugs: data.detectedForm ? [data.detectedForm.slug] : [] }]);
          setLoading(false);
          return;
        }
        if (data.soft_upsell) {
          setMessages(prev => [...prev, { role: "assistant", content: data.free_content, guideSlug: data.guideSlug || detectedSlug }]);
          setLoading(false);
          return;
        }
        if (data.error) {
          upsertAssistant(data.error);
          setLoading(false);
          return;
        }
      }

      const headerSlug = resp.headers.get("X-Guide-Slug");
      const headerFormSlug = resp.headers.get("X-Form-Slug");
      const headerSiteTopicsRaw = resp.headers.get("X-Site-Topics");
      let headerSiteTopics: SiteTopicAction[] = [];
      if (headerSiteTopicsRaw) {
        try { headerSiteTopics = JSON.parse(headerSiteTopicsRaw); } catch {}
      }
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (headerSlug || headerFormSlug || headerSiteTopics.length > 0) {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            const updatedFormSlugs = [...(last.formSlugs || [])];
            if (headerFormSlug && !updatedFormSlugs.includes(headerFormSlug)) {
              updatedFormSlugs.push(headerFormSlug);
            }
            return prev.map((m, i) => (i === prev.length - 1 ? {
              ...m,
              guideSlug: headerSlug || m.guideSlug,
              formSlugs: updatedFormSlugs,
              siteTopics: headerSiteTopics.length > 0 ? headerSiteTopics : m.siteTopics,
            } : m));
          }
          return prev;
        });
      }
    } catch {
      upsertAssistant(ERROR_MSG[lk] || ERROR_MSG["bs"]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, lk, isPremium, language]);

  const sendMessage = useCallback(() => sendMessageWithText(input), [input, sendMessageWithText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const showStartScreen = messages.length === 0;

  return (
    <>
      {/* ── Floating Orb + "Pomoć" badge ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group flex flex-col items-center gap-1.5"
            aria-label="BalkanLink Assistant"
          >
            {/* Pomoć badge */}
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-full bg-white dark:bg-card px-3 py-1 text-[11px] font-semibold text-foreground shadow-md border border-border/40 group-hover:shadow-lg transition-shadow"
            >
              {lk === "de" ? "Hilfe" : lk === "en" ? "Help" : "Pomoć"}
            </motion.span>
            {/* Custom BL icon */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-[-8px] rounded-2xl bg-gradient-to-br from-blue-500/25 to-purple-600/25 blur-xl group-hover:from-blue-500/40 group-hover:to-purple-600/40 transition-all duration-300" />
              <div
                className="relative flex items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#9333EA] shadow-lg shadow-purple-500/25 transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/35 group-active:scale-95 w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-2xl"
              >
                <span className="text-white font-black text-[20px] sm:text-[22px] tracking-tight select-none">BL</span>
              </div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex h-[88vh] sm:h-[78vh] max-h-[680px] w-full sm:w-[400px] sm:max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-border/50 bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="relative overflow-hidden px-5 py-4" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #9333EA 100%)" }}>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                    <span className="text-white font-black text-[13px] tracking-tight">BL</span>
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-white block leading-tight">BalkanLink</span>
                    <span className="text-[10px] text-white/60">Asistent</span>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Start Screen */}
              {showStartScreen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center pt-16 pb-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-5">
                    <span className="text-primary font-black text-[18px]">BL</span>
                  </div>
                  <h2 className="text-[18px] font-bold text-foreground mb-2">
                    {lk === "de" ? "Wie kann ich dir helfen?" : lk === "en" ? "How can I help you?" : "Kako ti mogu pomoći?"}
                  </h2>
                  <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px]">
                    {lk === "de"
                      ? "Stell eine Frage und bekomme eine klare Antwort und den nächsten Schritt."
                      : lk === "en"
                      ? "Ask a question and get a clear answer and next step."
                      : "Postavi pitanje i dobit ćeš jasan odgovor i sljedeći korak."}
                  </p>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[90%] space-y-1">
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/60 text-foreground shadow-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <>
                          <ChatMarkdown content={msg.content} />
                          {msg.content.length > 200 && (
                            <button
                              onClick={() => copyToClipboard(msg.content, i)}
                              className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition"
                            >
                              <Copy className="h-3 w-3" />
                              {copied === i ? "✓" : "Kopiraj"}
                            </button>
                          )}
                        </>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.role === "assistant" && !loading && (
                      <ResponseActions msg={msg} lk={lk} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator — minimal */}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-2xl bg-muted/60 px-4 py-3">
                    <div className="flex items-center gap-1">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-1 border-t border-border/20">
              <p className="text-[8px] text-center text-muted-foreground/40">{DISCLAIMER[lk] || DISCLAIMER["bs"]}</p>
            </div>

            {/* Input area */}
            <div className="border-t border-border/40 px-4 py-3">
              <div className="flex items-center gap-1 mb-1.5 px-0.5">
                <ShieldCheck className="h-2.5 w-2.5 text-emerald-600/60 dark:text-emerald-400/60 shrink-0" />
                <p className="text-[8px] text-muted-foreground/40">
                  {lk === "de" ? "Keine sensiblen Daten eingeben." : lk === "en" ? "Do not enter sensitive data." : "Ne unosite osjetljive podatke."}
                </p>
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={PLACEHOLDER[lk] || PLACEHOLDER["bs"]}
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-border/60 bg-background px-3 py-2.5 text-[13px] outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 disabled:opacity-30 hover:bg-primary/90 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
