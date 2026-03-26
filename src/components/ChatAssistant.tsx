import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Copy, ShieldCheck, ExternalLink, BookOpen, Briefcase, Home, FileText, Calculator, HelpCircle, MapPin } from "lucide-react";
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

// ── Quick action chips ──
const QUICK_ACTIONS = [
  { key: "jobs", icon: Briefcase, label: "Pretraga poslova", message: "Tražim posao u Njemačkoj" },
  { key: "housing", icon: Home, label: "Pretraga stanova", message: "Tražim stan u Njemačkoj" },
  { key: "forms", icon: FileText, label: "Formulari", message: "Koji formulari postoje?" },
  { key: "calculator", icon: Calculator, label: "Kalkulator plate", message: "Kolika je neto plata od 3000€ bruto?" },
  { key: "arrival", icon: MapPin, label: "Dolazak u DE", message: "Koji su prvi koraci kad dođem u Njemačku?" },
  { key: "help", icon: HelpCircle, label: "Pomoći i davanja", message: "Koje pomoći mogu dobiti u Njemačkoj?" },
];

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

// ── Action buttons ──
function ResponseActions({ msg, t }: { msg: Msg; t: (key: string) => string }) {
  const actions: { label: string; to: string; icon: typeof BookOpen; primary?: boolean }[] = [];

  // Redirect action (job/housing search)
  if (msg.redirectUrl && msg.redirectLabel) {
    actions.push({
      label: msg.redirectLabel,
      to: msg.redirectUrl,
      icon: ExternalLink,
      primary: true,
    });
  }

  if (msg.guideSlug && VALID_GUIDE_SLUGS.has(msg.guideSlug)) {
    actions.push({
      label: t("chat.openGuide"),
      to: `/guide/${msg.guideSlug}`,
      icon: BookOpen,
      primary: true,
    });
  }

  if (msg.formSlugs && msg.formSlugs.length > 0) {
    const slug = msg.formSlugs[0];
    const formPath = `/formulari/${slug}`;
    if (!actions.some(a => a.to === formPath)) {
      actions.push({ label: t("chat.openForm"), to: formPath, icon: ExternalLink });
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
    if (open) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 150);
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

    // Enforce daily limit for free users
    if (!canChat) {
      setMessages((prev) => [...prev,
        { role: "user", content: text.trim() },
        { role: "assistant", content: "⚡ Dostigao/la si dnevni limit od 3 pitanja.\n\nSa **BalkanLink Premium** dobijaš neograničenu AI pomoć i personalizirane odgovore.\n\n[👉 Premium aktivieren](/premium)" },
      ]);
      setInput("");
      return;
    }

    // Record usage
    await recordQuery();

    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const detectedSlug = detectGuideSlugFromText(text);
    const errorMsg = t("chat.error");

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

        // Job/Housing search redirect
        if (data.search_redirect) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: data.content,
            redirectUrl: data.redirect_url,
            redirectLabel: data.redirect_label,
          }]);
          setLoading(false);
          return;
        }

        if (data.smart_guide_redirect) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content, guideSlug: data.guideSlug || detectedSlug, formSlugs: data.detectedForm ? [data.detectedForm.slug] : [] }]);
          setLoading(false);
          return;
        }
        if (data.premium_required) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: `${data.teaser}\n\n${data.cta}`,
            formSlugs: data.detectedForm ? [data.detectedForm.slug] : [],
            redirectUrl: "/premium",
            redirectLabel: "Premium pogledaj",
          }]);
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
  }, [loading, messages, isPremium, language, t]);

  const sendMessage = useCallback(() => sendMessageWithText(input), [input, sendMessageWithText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setInput("");
  };

  const showStartScreen = messages.length === 0;

  return (
    <>
      {/* ── Floating Trigger ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-0.5 rounded-xl bg-white/95 dark:bg-card/95 backdrop-blur-sm px-4 py-1.5 shadow-md border border-border/30"
            >
              <span className="text-[12px] font-bold text-foreground leading-tight">
                {t("chatbot.trigger")}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                {t("chatbot.triggerSub")}
              </span>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-[-14px] rounded-[22px] bg-gradient-to-br from-[hsl(var(--primary))]/30 to-[#9333EA]/30 blur-2xl group-hover:from-[hsl(var(--primary))]/50 group-hover:to-[#9333EA]/50 transition-all duration-300" />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex items-center justify-center w-[58px] h-[58px] sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[20px] shadow-[0_0_30px_rgba(59,130,246,0.4),0_0_60px_rgba(147,51,234,0.2),0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 group-hover:scale-105 group-active:scale-95 border border-white/20 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #9333EA 100%)" }}
              >
                <BLIcon size={32} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal Overlay + Chat ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 flex flex-col w-auto sm:w-[460px] sm:max-w-[calc(100vw-2rem)] h-auto sm:h-[600px] sm:max-h-[80vh] rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative overflow-hidden px-5 py-4 shrink-0" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #9333EA 100%)" }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm overflow-hidden">
                      <BLIcon size={28} />
                    </div>
                    <div>
                      <span className="text-[15px] font-bold text-white block leading-tight">{t("chat.headerTitle")}</span>
                      <span className="text-[11px] text-white/55 leading-tight">{t("chat.headerSubtitle")}</span>
                    </div>
                  </div>
                  <button onClick={handleClose} className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white" title={t("chat.close")}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {showStartScreen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center pt-6 pb-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 100%)" }}>
                      <BLIcon size={40} />
                    </div>
                    <h2 className="text-base font-bold text-foreground mb-1">
                      {t("chatbot.welcome")}
                    </h2>
                    <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px] mb-5">
                      {t("chatbot.welcomeSub")}
                    </p>

                    {/* Quick action chips */}
                    <div className="grid grid-cols-2 gap-2 w-full max-w-[340px]">
                      {QUICK_ACTIONS.map((action, i) => (
                        <motion.button
                          key={action.key}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
                          onClick={() => sendMessageWithText(action.message)}
                          className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-3 py-2.5 text-left text-[12px] font-medium text-foreground transition-all hover:bg-accent hover:border-primary/30 active:scale-[0.97]"
                        >
                          <action.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="truncate">{action.label}</span>
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
                                {copied === i ? "✓" : t("chat.copy")}
                              </button>
                            )}
                          </>
                        ) : (
                          msg.content
                        )}
                      </div>
                      {msg.role === "assistant" && !loading && (
                        <ResponseActions msg={msg} t={t} />
                      )}
                    </div>
                  </motion.div>
                ))}

                {loading && messages[messages.length - 1]?.role === "user" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="rounded-2xl bg-muted/60 px-4 py-3">
                      <div className="flex items-center gap-1">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="px-4 py-1 border-t border-border/20 shrink-0">
                <p className="text-[8px] text-center text-muted-foreground/40">{t("chat.disclaimer")}</p>
              </div>

              {/* Input area */}
              <div className="border-t border-border/40 px-4 py-3 shrink-0">
                <div className="flex items-center gap-1 mb-1.5 px-0.5">
                  <ShieldCheck className="h-2.5 w-2.5 text-emerald-600/60 dark:text-emerald-400/60 shrink-0" />
                  <p className="text-[8px] text-muted-foreground/40">
                    {t("chat.noSensitiveData")}
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("chatbot.placeholder")}
                    rows={1}
                    className="flex-1 resize-none rounded-xl border border-border/60 bg-background px-3 py-2.5 text-[13px] outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-200 disabled:opacity-30 hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}
                  >
                    <Send className="h-4 w-4" />
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
