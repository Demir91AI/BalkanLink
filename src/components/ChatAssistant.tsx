import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Copy, ShieldCheck, MessageCircle, BookOpen, ExternalLink, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { formCatalog, type FormEntry } from "@/lib/form-catalog";

type Msg = {
  role: "user" | "assistant";
  content: string;
  guideSlug?: string | null;
  formSlugs?: string[];
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

// ── Form catalog lookup ──

const ALL_FORMS: FormEntry[] = (() => {
  const seen = new Set<string>();
  const result: FormEntry[] = [];
  for (const group of formCatalog) {
    for (const item of group.items) {
      if (!seen.has(item.slug)) {
        seen.add(item.slug);
        result.push(item);
      }
    }
  }
  return result;
})();

function getFormBySlug(slug: string): FormEntry | undefined {
  return ALL_FORMS.find(f => f.slug === slug);
}

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
  bs: "Npr. Kindergeld, stan, posao, boravišna dozvola...",
  de: "Z.B. Kindergeld, Wohnung, Job, Aufenthaltstitel...",
  en: "E.g. Kindergeld, apartment, job, residence permit...",
};

const ERROR_MSG: Record<string, string> = {
  bs: "Došlo je do greške. Pokušajte ponovo.",
  de: "Ein Fehler ist aufgetreten. Versuchen Sie es erneut.",
  en: "An error occurred. Please try again.",
};

const DISCLAIMER: Record<string, string> = {
  bs: "Ovaj asistent daje informativne smjernice. Za konačne odluke konsultujte nadležnu instituciju.",
  de: "Dieser Assistent gibt informative Hinweise. Für endgültige Entscheidungen wenden Sie sich an die zuständige Behörde.",
  en: "This assistant provides informative guidance. For final decisions, consult the relevant authority.",
};

const INPUT_WARNING: Record<string, string> = {
  bs: "Ne unosite osjetljive podatke (broj dokumenta, bankovne podatke).",
  de: "Geben Sie keine sensiblen Daten ein (Dokumentennummer, Bankdaten).",
  en: "Do not enter sensitive data (document numbers, bank details).",
};

// ── Markdown renderer ──

function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href && href.startsWith("/")) {
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

// ── Action buttons after assistant response (max 2-3) ──

function ResponseActions({ msg, lk }: { msg: Msg; lk: string }) {
  const actions: { label: string; to: string; icon: typeof FileText; primary?: boolean }[] = [];

  if (msg.guideSlug) {
    actions.push({
      label: lk === "de" ? "Smart Guide starten" : lk === "en" ? "Start Smart Guide" : "Pokreni Smart Guide",
      to: `/smart-guide/${msg.guideSlug}`,
      icon: BookOpen,
      primary: true,
    });
  }

  if (msg.formSlugs && msg.formSlugs.length > 0) {
    const slug = msg.formSlugs[0];
    const form = getFormBySlug(slug);
    if (form) {
      actions.push({
        label: lk === "de" ? "Formular öffnen" : lk === "en" ? "Open form" : "Otvori formular",
        to: `/formulari?form=${slug}`,
        icon: ExternalLink,
      });
    }
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {actions.slice(0, 3).map((a, i) => (
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
  const location = useLocation();
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
          const formSlugs = data.detectedForm ? [data.detectedForm.slug] : (data.guideSlug ? [data.guideSlug] : []);
          setMessages(prev => [...prev, { role: "assistant", content: data.content, guideSlug: data.guideSlug || detectedSlug, formSlugs }]);
          setLoading(false);
          return;
        }
        if (data.premium_required) {
          const formSlugs = data.detectedForm ? [data.detectedForm.slug] : [];
          setMessages(prev => [...prev, { role: "assistant", content: `${data.teaser}\n\n${data.cta}`, formSlugs }]);
          setLoading(false);
          return;
        }
        if (data.soft_upsell) {
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: data.free_content, guideSlug: data.guideSlug || detectedSlug },
          ]);
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

      if (headerSlug || headerFormSlug) {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            const updatedFormSlugs = [...(last.formSlugs || [])];
            if (headerFormSlug && !updatedFormSlugs.includes(headerFormSlug)) {
              updatedFormSlugs.push(headerFormSlug);
            }
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, guideSlug: headerSlug || m.guideSlug, formSlugs: updatedFormSlugs } : m));
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
      {/* ── Floating Orb ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="BalkanLink Assistant"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-[60px] w-[60px] sm:h-[68px] sm:w-[68px] items-center justify-center"
            >
              <div className="absolute inset-[-6px] rounded-[32px] bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-xl group-hover:from-blue-500/50 group-hover:to-purple-600/50 transition-all duration-300" />
              <div
                className="relative flex h-[60px] w-[60px] sm:h-[68px] sm:w-[68px] items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20 transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30 group-active:scale-95"
                style={{ borderRadius: "32% 68% 60% 40% / 40% 32% 68% 60%" }}
              >
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex h-[88vh] sm:h-[78vh] max-h-[680px] w-full sm:w-[400px] sm:max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-border/50 bg-card shadow-2xl"
          >
            {/* Header — minimal */}
            <div className="relative overflow-hidden px-5 py-4" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #9333EA 100%)" }}>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[14px] font-bold text-white">BalkanLink</span>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/[0.06] blur-2xl" />
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Start Screen — clean and minimal */}
              {showStartScreen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center justify-center pt-12 pb-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-5">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-[18px] font-bold text-foreground mb-2">
                    {lk === "de" ? "Wie kann ich dir helfen?" : lk === "en" ? "How can I help you?" : "Kako ti mogu pomoći?"}
                  </h2>
                  <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px]">
                    {lk === "de"
                      ? "Stelle eine Frage und du bekommst eine klare Antwort und den nächsten Schritt."
                      : lk === "en"
                      ? "Ask a question and you'll get a clear answer and the next step."
                      : "Postavi pitanje i dobit ćeš jasno objašnjenje i sljedeći korak."}
                  </p>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
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

                    {/* Discrete action buttons — max 2-3, only after response */}
                    {msg.role === "assistant" && !loading && (
                      <ResponseActions msg={msg} lk={lk} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-2xl bg-muted/60 px-4 py-3">
                    <div className="flex items-center gap-1">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-1 border-t border-border/20">
              <p className="text-[8px] text-center text-muted-foreground/40">
                {DISCLAIMER[lk] || DISCLAIMER["bs"]}
              </p>
            </div>

            {/* Input area */}
            <div className="border-t border-border/40 px-4 py-3">
              <div className="flex items-center gap-1 mb-1.5 px-0.5">
                <ShieldCheck className="h-2.5 w-2.5 text-emerald-600/60 dark:text-emerald-400/60 shrink-0" />
                <p className="text-[8px] text-muted-foreground/40">{INPUT_WARNING[lk] || INPUT_WARNING["bs"]}</p>
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
