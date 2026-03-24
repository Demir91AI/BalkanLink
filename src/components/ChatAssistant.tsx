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

// ── Valid guide slugs (from guide-data.ts) ──
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
            return <Link to={href} className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">{children}</Link>;
          }
          return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">{children}</a>;
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

// ── Action buttons (max 2, with strict route validation) ──
function ResponseActions({ msg, lk }: { msg: Msg; lk: string }) {
  const actions: { label: string; to: string; icon: typeof BookOpen; primary?: boolean }[] = [];

  if (msg.guideSlug && VALID_GUIDE_SLUGS.has(msg.guideSlug)) {
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

  const [open, setOpen] = useState<"closed" | "open" | "minimized">("closed");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open === "open") setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
  }, [open]);

  // Tooltip: show after 3s, hide after 5s
  useEffect(() => {
    if (open !== "closed") { setShowTooltip(false); return; }
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(showTimer);
  }, [open]);

  useEffect(() => {
    if (!showTooltip) return;
    const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(hideTimer);
  }, [showTooltip]);

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

  const handleClose = () => {
    setOpen("closed");
    setMessages([]);
    setInput("");
  };

  const handleMinimize = () => {
    setOpen("minimized");
  };

  const openChat = () => {
    setShowTooltip(false);
    setOpen("open");
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <AnimatePresence>
        {open === "closed" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 cursor-pointer group"
          >
            {/* BL circle */}
            <div className="relative">
              <div className="absolute inset-[-18px] rounded-full bg-gradient-to-br from-brand-orange/40 to-brand-orange/20 blur-3xl group-hover:from-brand-orange/60 group-hover:to-brand-orange/40 transition-all duration-300 animate-pulse" />
              <div className="absolute inset-[-8px] rounded-full bg-brand-orange/20 blur-xl" />
              <div className="relative flex items-center justify-center w-[58px] h-[58px] sm:w-16 sm:h-16 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_40px_hsl(var(--brand-orange)/0.5),0_0_80px_hsl(var(--brand-orange)/0.25),0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_50px_hsl(var(--brand-orange)/0.6),0_0_100px_hsl(var(--brand-orange)/0.35)] group-active:scale-95 border-2 border-brand-orange/30">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <text x="4" y="30" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1">
                    <tspan fill="#FFFFFF">B</tspan><tspan fill="hsl(var(--brand-orange))">L</tspan>
                  </text>
                </svg>
              </div>
            </div>

            {/* Text below */}
            <div className="text-center rounded-xl bg-white/95 dark:bg-card/95 backdrop-blur-sm px-3.5 py-2 shadow-[0_0_30px_hsl(var(--brand-orange)/0.2),0_2px_12px_rgba(0,0,0,0.08)] border border-brand-orange/15">
              <p className="text-[12px] font-bold text-foreground leading-tight">Pitaj BalkanLink</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Asistent za Njemačku</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Minimized pill ── */}
      <AnimatePresence>
        {open === "minimized" && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setOpen("open")}
            className="fixed bottom-5 right-5 z-50 group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] px-4 py-3 shadow-lg shadow-[hsl(271,81%,56%)]/25 hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Open chat"
          >
            <span className="text-white font-black text-[14px] tracking-tight select-none">BL</span>
            <span className="text-white/90 text-[12px] font-medium">
              {messages.length > 0
                ? `${messages.length} ${lk === "de" ? "Nachr." : lk === "en" ? "msg" : "por."}`
                : "Chat"}
            </span>
            <X
              className="h-3.5 w-3.5 text-white/50 hover:text-white transition-colors ml-1"
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open === "open" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-5 sm:right-5 z-50 flex h-[88vh] sm:h-[78vh] max-h-[680px] w-full sm:w-[400px] sm:max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-border/50 bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="relative overflow-hidden px-5 py-4" style={{ background: "linear-gradient(135deg, hsl(217,91%,60%) 0%, hsl(259,69%,52%) 50%, hsl(271,81%,56%) 100%)" }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <span className="text-white font-black text-[14px] tracking-tight">BL</span>
                  </div>
                  <div>
                    <span className="text-[15px] font-bold text-white block leading-tight">BalkanLink Asistent</span>
                    <span className="text-[11px] text-white/55 leading-tight">
                      {lk === "de" ? "Stelle eine Frage (z.B. Kindergeld, Wohnung...)" : lk === "en" ? "Ask a question (e.g. Kindergeld, apartment...)" : "Postavi pitanje (npr. Kindergeld, stan, posao...)"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button onClick={handleMinimize} className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white" title={lk === "de" ? "Minimieren" : lk === "en" ? "Minimize" : "Minimiziraj"}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <button onClick={handleClose} className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white" title={lk === "de" ? "Schließen" : lk === "en" ? "Close" : "Zatvori"}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Start Screen — clean and minimal */}
              {showStartScreen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center pt-16 pb-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(217,91%,60%)]/10 to-[hsl(271,81%,56%)]/10 mb-5">
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

              {/* Typing indicator */}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-2xl bg-muted/60 px-4 py-3">
                    <div className="flex items-center gap-1">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.12 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.24 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
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
