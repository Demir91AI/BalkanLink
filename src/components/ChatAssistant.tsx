import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Copy, ShieldCheck, ExternalLink, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useChatLimit } from "@/hooks/usePremiumAccess";
import { Link } from "react-router-dom";
import { formCatalog, type FormEntry } from "@/lib/form-catalog";
import { BLIcon } from "@/components/BrandLogo";

type SiteTopicAction = { url: string; label: string };

type Msg = {
  role: "user" | "assistant";
  content: string;
  guideSlug?: string | null;
  formSlugs?: string[];
  siteTopics?: SiteTopicAction[];
  redirectUrl?: string;
  redirectLabel?: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const VALID_GUIDE_SLUGS = new Set([
  "kindergeld", "kinderzuschlag", "elterngeld", "bildung-teilhabe", "unterhaltsvorschuss",
  "elternzeit", "mutterschutz", "mutterschaftsleistungen", "unterhalt", "wohngeld",
  "buergergeld", "heizkostenzuschuss", "arbeitslosengeld", "kurzarbeitergeld", "krankengeld",
  "pflegegrad", "reha", "bafoeg", "schueler-bafoeg", "lernfoerderung", "kita-zuschuss",
  "mutterschaftsgeld", "familienversicherung", "steuerklassenwechsel", "kirchenaustritt",
  "gez-anmeldung", "bildungsgutschein", "integrationskurs", "fuehrungszeugnis",
  "aufenthaltstitel-verlaengerung", "anmeldung", "wbs", "krippengeld-bayern", "sozialhilfe",
  "eu-blue-card", "radna-viza", "spajanje-porodice", "studentska-viza", "stalni-boravak",
]);

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
  "/nudim-trazim", "/putovanja", "/generatoren",
  "/forgot-password", "/reset-password",
]);

function isValidRoute(path: string): boolean {
  if (VALID_ROUTES.has(path)) return true;
  if (path.startsWith("/guide/")) {
    const slug = path.slice(7);
    return VALID_GUIDE_SLUGS.has(slug);
  }
  if (path.startsWith("/formulari/") || path.startsWith("/qa/")) return true;
  return false;
}

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

// ── Quick starter buttons ──
const STARTER_QUESTIONS = [
  { emoji: "📋", label: "Trebam Kindergeld", message: "Trebam Kindergeld" },
  { emoji: "🏠", label: "Kako prijaviti adresu?", message: "Kako prijaviti adresu u Njemačkoj?" },
  { emoji: "💼", label: "Izgubio sam posao", message: "Izgubio sam posao, šta da radim?" },
  { emoji: "📄", label: "Šta je Steuer-ID?", message: "Šta je Steuer-ID i kako ga dobiti?" },
];

const WELCOME_MESSAGE = "Zdravo! 👋 Ja sam BalkanLink Asistent. Pomažem Balkancima u Njemačkoj da se snađu — od formulara do svakodnevnog života. Šta te muči?";

// ── Markdown renderer ──
function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href && href.startsWith("/")) {
            if (!isValidRoute(href)) return <span className="font-medium text-white/50">{children}</span>;
            return <Link to={href} className="font-medium text-[hsl(45,93%,49%)] underline underline-offset-2 hover:text-[hsl(45,93%,60%)]">{children}</Link>;
          }
          return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[hsl(45,93%,49%)] underline underline-offset-2 hover:text-[hsl(45,93%,60%)]">{children}</a>;
        },
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ol: ({ children }) => <ol className="mb-2 list-decimal space-y-0.5 pl-5">{children}</ol>,
        ul: ({ children }) => <ul className="mb-2 list-disc space-y-0.5 pl-5">{children}</ul>,
        li: ({ children }) => <li className="text-[13px] leading-snug">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        h1: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 text-white">{children}</h4>,
        h2: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 text-white">{children}</h4>,
        h3: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 text-white">{children}</h4>,
        h4: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 text-white">{children}</h4>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Action buttons ──
function ResponseActions({ msg }: { msg: Msg }) {
  const actions: { label: string; to: string; icon: typeof BookOpen; primary?: boolean }[] = [];

  if (msg.redirectUrl && msg.redirectLabel) {
    actions.push({ label: msg.redirectLabel, to: msg.redirectUrl, icon: ExternalLink, primary: true });
  }
  if (msg.guideSlug && VALID_GUIDE_SLUGS.has(msg.guideSlug)) {
    actions.push({ label: "Otvori Smart Guide", to: `/guide/${msg.guideSlug}`, icon: BookOpen, primary: true });
  }
  if (msg.formSlugs && msg.formSlugs.length > 0) {
    const slug = msg.formSlugs[0];
    const formPath = `/formulari/${slug}`;
    if (!actions.some(a => a.to === formPath)) {
      actions.push({ label: "Otvori formular", to: formPath, icon: ExternalLink });
    }
  }
  if (msg.siteTopics && msg.siteTopics.length > 0) {
    for (const topic of msg.siteTopics) {
      if (!isValidRoute(topic.url)) continue;
      if (actions.some(a => a.to === topic.url)) continue;
      if (actions.length >= 3) break;
      actions.push({ label: topic.label, to: topic.url, icon: ExternalLink });
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
              ? "bg-[hsl(45,93%,49%)] text-black hover:bg-[hsl(45,93%,55%)]"
              : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
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
  const { language, t } = useLanguage();
  const { isPremium } = useAuth();
  const { canChat, remaining, recordQuery } = useChatLimit();

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
    if (open) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const sendMessageWithText = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    if (!canChat) {
      setMessages((prev) => [...prev,
        { role: "user", content: text.trim() },
        { role: "assistant", content: "⚡ Dostigao/la si dnevni limit od 3 pitanja.\n\nSa **BalkanLink Premium** dobijaš neograničenu AI pomoć i personalizirane odgovore.\n\n[👉 Premium aktivieren](/premium)" },
      ]);
      setInput("");
      return;
    }

    await recordQuery();

    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const detectedSlug = detectGuideSlugFromText(text);
    const errorMsg = "Ups, nešto je pošlo po krivu. Pokušaj ponovo.";

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

        if (data.search_redirect) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content, redirectUrl: data.redirect_url, redirectLabel: data.redirect_label }]);
          setLoading(false);
          return;
        }
        if (data.smart_guide_redirect) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content, guideSlug: data.guideSlug || detectedSlug, formSlugs: data.detectedForm ? [data.detectedForm.slug] : [] }]);
          setLoading(false);
          return;
        }
        if (data.premium_required) {
          setMessages(prev => [...prev, { role: "assistant", content: `${data.teaser}\n\n${data.cta}`, formSlugs: data.detectedForm ? [data.detectedForm.slug] : [], redirectUrl: "/premium", redirectLabel: "Premium pogledaj" }]);
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
      upsertAssistant(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, isPremium, language, canChat, recordQuery]);

  const sendMessage = useCallback(() => sendMessageWithText(input), [input, sendMessageWithText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showStartScreen = messages.length === 0;

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 group cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[hsl(220,30%,12%)] border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Pitaj BalkanLink Asistenta
            </div>

            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[hsl(45,93%,49%)]"
            />

            {/* Button */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_20px_rgba(234,179,8,0.4)] overflow-hidden"
              style={{ background: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)" }}
            >
              <BLIcon size={28} className="text-white drop-shadow-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Panel Overlay + Side Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-[1000] flex flex-col w-full md:w-[420px] h-full border-l border-[hsl(215,20%,15%)]"
              style={{ background: "#0d1526" }}
            >
              {/* Header */}
              <div className="shrink-0 px-5 py-4 border-b border-[hsl(215,20%,15%)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)" }}
                    >
                      <BLIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <span className="text-[15px] font-bold text-white block leading-tight">🤖 BalkanLink Asistent</span>
                      <span className="text-[11px] text-white/40 leading-tight">Tvoj vodič kroz Njemačku</span>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {/* Welcome message (always first) */}
                {showStartScreen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Welcome bubble */}
                    <div className="flex justify-start">
                      <div className="max-w-[88%]">
                        <div className="rounded-xl rounded-bl-none px-4 py-3 text-[13px] leading-relaxed text-white/90"
                          style={{ background: "#1F2937" }}
                        >
                          {WELCOME_MESSAGE}
                        </div>
                      </div>
                    </div>

                    {/* Starter buttons */}
                    <div className="grid grid-cols-2 gap-2 px-1">
                      {STARTER_QUESTIONS.map((q, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.15 + i * 0.06 }}
                          onClick={() => sendMessageWithText(q.message)}
                          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-[12px] font-medium text-white/80 transition-all hover:bg-white/[0.07] hover:border-[hsl(45,93%,49%)]/30 active:scale-[0.97]"
                        >
                          <span className="text-base shrink-0">{q.emoji}</span>
                          <span className="truncate">{q.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[88%] space-y-1">
                      <div
                        className={`px-4 py-3 text-[13px] leading-relaxed ${
                          msg.role === "user"
                            ? "rounded-xl rounded-br-none bg-[hsl(45,93%,49%)] text-black"
                            : "rounded-xl rounded-bl-none text-white/90"
                        }`}
                        style={msg.role === "assistant" ? { background: "#1F2937" } : undefined}
                      >
                        {msg.role === "assistant" ? (
                          <>
                            <ChatMarkdown content={msg.content} />
                            {msg.content.length > 200 && (
                              <button
                                onClick={() => copyToClipboard(msg.content, i)}
                                className="mt-2 flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition"
                              >
                                <Copy className="h-3 w-3" />
                                {copied === i ? "✓ Kopirano" : "Kopiraj"}
                              </button>
                            )}
                          </>
                        ) : (
                          msg.content
                        )}
                      </div>
                      {msg.role === "assistant" && !loading && (
                        <ResponseActions msg={msg} />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Loading dots */}
                {loading && messages[messages.length - 1]?.role === "user" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="rounded-xl rounded-bl-none px-4 py-3" style={{ background: "#1F2937" }}>
                      <div className="flex items-center gap-1.5">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="h-2 w-2 rounded-full bg-white/30" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="h-2 w-2 rounded-full bg-white/30" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="h-2 w-2 rounded-full bg-white/30" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="px-4 py-1 border-t border-white/5 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/50 shrink-0" />
                    <p className="text-[8px] text-white/20">Ne unosi lične podatke</p>
                  </div>
                  {!isPremium && (
                    <p className="text-[8px] text-white/30 font-medium">
                      {remaining > 0 ? `${remaining}/3 preostalo` : "Limit dostignut"}
                    </p>
                  )}
                </div>
              </div>

              {/* Input area */}
              <div className="border-t border-white/10 px-4 py-3 shrink-0">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pitaj me bilo šta..."
                    rows={1}
                    className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white outline-none transition-all placeholder:text-white/25 focus:border-[hsl(45,93%,49%)]/40 focus:ring-1 focus:ring-[hsl(45,93%,49%)]/20"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl text-black transition-all duration-200 disabled:opacity-30 hover:brightness-110 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)" }}
                  >
                    <Send className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
