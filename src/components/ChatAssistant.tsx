import React, { useState, useRef, useEffect, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { X, Send, Copy, ShieldCheck, ExternalLink, BookOpen, ThumbsUp, ThumbsDown, Camera, Save, MessageCircle, Clock, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";
import { useChatLimit } from "@/hooks/usePremiumAccess";
import { Link, useLocation } from "react-router-dom";
import { formCatalog, type FormEntry } from "@/lib/form-catalog";
import { isValidProductionRoute } from "@/lib/canonical-routes";
import { BLIcon } from "@/components/BrandLogo";
import ChatOnboarding from "@/components/chat/ChatOnboarding";
import ChatBenefitCalc from "@/components/chat/ChatBenefitCalc";
import ChatDeadlines from "@/components/chat/ChatDeadlines";
import ChatProfile from "@/components/chat/ChatProfile";
import {
  type UserProfile, type Feedback,
  isOnboardingDone, loadFeedback, saveFeedback, loadProfile,
  extractSuggestions, getPageContext, getContextualWelcome,
} from "@/components/chat/chatUtils";

type SiteTopicAction = { url: string; label: string };

type Msg = {
  role: "user" | "assistant";
  content: string;
  guideSlug?: string | null;
  formSlugs?: string[];
  siteTopics?: SiteTopicAction[];
  redirectUrl?: string;
  redirectLabel?: string;
  suggestions?: string[];
  feedbackGiven?: "up" | "down" | null;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const VALID_GUIDE_SLUGS = new Set([
  "kindergeld", "kinderzuschlag", "elterngeld", "bildung-teilhabe", "unterhaltsvorschuss",
  "elternzeit", "mutterschutz", "mutterschaftsleistungen", "unterhalt", "wohngeld",
  "buergergeld", "heizkostenzuschuss", "arbeitslosengeld", "kurzarbeitergeld", "krankengeld",
  "pflegegrad", "reha", "bafoeg", "lernfoerderung", "kita-zuschuss",
  "mutterschaftsgeld", "familienversicherung", "steuerklassenwechsel", "kirchenaustritt",
  "gez-anmeldung", "bildungsgutschein", "integrationskurs", "fuehrungszeugnis",
  "aufenthaltstitel-verlaengerung", "anmeldung", "wbs", "krippengeld-bayern", "sozialhilfe",
  "eu-blue-card", "radna-viza", "spajanje-porodice", "studentska-viza", "stalni-boravak",
]);

const VALID_ROUTES = new Set<string>(); // kept for backward compat but unused

function isValidRoute(path: string): boolean {
  return isValidProductionRoute(path);
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

const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld", kinderzuschlag: "kinderzuschlag", elterngeld: "elterngeld",
  mutterschutz: "mutterschaftsgeld", bürgergeld: "buergergeld", burgergeld: "buergergeld",
  wohngeld: "wohngeld", bafög: "bafoeg", bafoeg: "bafoeg",
  anmeldung: "anmeldung", aufenthaltstitel: "aufenthaltstitel-verlaengerung",
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
  for (const [kw, slug] of Object.entries(TOPIC_GUIDE_MAP)) {
    if (lower.includes(kw)) return slug;
  }
  return null;
}

// Quick starters
const STARTER_QUESTIONS = [
  { emoji: "📋", label: "Trebam Kindergeld", message: "Trebam Kindergeld" },
  { emoji: "✈️", label: "Viza za Bosnu", message: "Trebam vizu za Njemačku, državljanin sam Bosne i Hercegovine" },
  { emoji: "📄", label: "Šta je Anmeldung?", message: "Šta je Anmeldung i kako se prijaviti?" },
  { emoji: "💰", label: "Koliko košta Premium?", message: "Koliko košta Premium i šta dobijem?" },
];

const DEFAULT_WELCOME = "Zdravo! 👋 Ja sam BalkanLink Asistent. Pomažem Balkancima u Njemačkoj da se snađu — od formulara do svakodnevnog života. Šta te muči?";

// ── Auto-link keywords ──
const KEYWORD_LINKS: [RegExp, string][] = [
  // FORMULARI
  [/\b(dječji dodatak|djecji dodatak)\b/gi, "/formulari/kindergeld"],
  [/\b(Kindergeld|kindergeld)\b/g, "/formulari/kindergeld"],
  [/\b(prijava adrese)\b/gi, "/formulari/anmeldung"],
  [/\b(Anmeldung|anmeldung)\b/g, "/formulari/anmeldung"],
  [/\b(Ummeldung|ummeldung)\b/g, "/formulari/anmeldung"],
  [/\b(Steuer-ID|steuer-id|poreski broj)\b/gi, "/formulari/steuer-id"],
  [/\b(Elterngeld|elterngeld|roditeljska naknada)\b/gi, "/formulari/elterngeld"],
  [/\b(Krankenkasse|krankenkasse|zdravstveno osiguranje)\b/gi, "/formulari/krankenkasse"],
  [/\b(Bürgergeld|bürgergeld|socijalna pomoć)\b/gi, "/formulari/burgergeld"],
  [/\b(Wohngeld|wohngeld|pomoć za kiriju)\b/gi, "/formulari/wohngeld"],
  [/\b(BAföG|bafög|stipendija)\b/gi, "/formulari/bafog"],
  [/\b(Führungszeugnis|führungszeugnis|potvrda o nekažnjavanju)\b/gi, "/formulari/fuhrungszeugnis"],
  [/\b(Steuerklassenwechsel|steuerklassenwechsel|Steuerklasse|steuerklasse|porezna klasa)\b/gi, "/formulari/steuerklassenwechsel"],
  // AUFENTHALTSTITEL / VIZA
  [/\b(Aufenthaltstitel|aufenthaltstitel|boravišna dozvola|boravisna dozvola)\b/gi, "/formulari/aufenthaltstitel"],
  [/\b(Niederlassungserlaubnis|niederlassungserlaubnis|stalni boravak)\b/gi, "/formulari/aufenthaltstitel"],
  [/\b(Blaue Karte|blaue karte|plava karta)\b/gi, "/formulari/aufenthaltstitel"],
  [/\b(Arbeitsvisum|arbeitsvisum|radna viza)\b/gi, "/formulari/aufenthaltstitel"],
  // DEUTSCH
  [/\b(BalkanLink Deutsch|balkanlink deutsch)\b/gi, "/deutsch-trainer"],
  [/\b(učenje njemačkog|ucenje njemackog)\b/gi, "/deutsch-trainer"],
  // ALATI
  [/\b(Brutto-Netto|brutto-netto)\b/g, "/brutto-netto-rechner"],
  // DOKUMENTEN CHECK
  [/\b(Dokumenten-Check|dokumenten-check|analiza pisma)\b/gi, "/dokumenten-check"],
  // DOLAZAK
  [/\b(dolazak u njemačku|dolazak u njemacku|preseljenje)\b/gi, "/nach-deutschland"],
  // PAKETI
  [/\b(paketi i opcije|Paketi i opcije)\b/gi, "/paketi"],
  // POREZI (new tax hub)
  [/\b(Steuererklärung|steuererklarung|porezna prijava)\b/gi, "/porezi"],
  [/\b(Finanzamt|finanzamt)\b/g, "/porezi"],
  [/\b(ELSTER|elster)\b/g, "/porezi/elster-vodic"],
  [/\b(Werbungskosten|werbungskosten)\b/g, "/porezi/sta-mogu-odbiti"],
  [/\b(Verspätungszuschlag|verspatungszuschlag)\b/gi, "/porezi/rokovi-i-kazne"],
  [/\b(Doppelte Haushaltsführung|doppelhaushalt|dvostruko domaćinstvo)\b/gi, "/porezi/dvostruko-domacinstvo"],
  // ANERKENNUNG
  [/\b(Anerkennung|anerkennung|nostrifikacija|priznavanje diplome)\b/gi, "/anerkennung"],
  // MIETRECHT
  [/\b(Mietrecht|mietrecht|stanarsko pravo)\b/gi, "/mietrecht"],
  // RADNO PRAVO / BIZNIS
  [/\b(Arbeitsrecht|arbeitsrecht|radno pravo)\b/gi, "/radno-pravo"],
  [/\b(Gewerbe|gewerbeanmeldung|samozaposlenje|biznis u Njemačkoj)\b/gi, "/biznis"],
];

function autoLinkKeywords(text: string): string {
  let result = text;
  const linked = new Set<string>();
  for (const [regex, url] of KEYWORD_LINKS) {
    result = result.replace(regex, (match) => {
      // Only link each keyword once per message to avoid clutter
      if (linked.has(url)) return match;
      // Don't link if already inside a markdown link
      const idx = result.indexOf(match);
      const before = result.slice(Math.max(0, idx - 2), idx);
      if (before.includes("[") || before.includes("(")) return match;
      linked.add(url);
      return `[${match}](${url})`;
    });
  }
  return result;
}

// ── Markdown renderer ──
const ChatMarkdown = React.memo(function ChatMarkdown({ content }: { content: string }) {
  const linkedContent = autoLinkKeywords(content);
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith("/")) {
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
      {linkedContent}
    </ReactMarkdown>
  );
});

// ── Action buttons ──
function ResponseActions({ msg }: { msg: Msg }) {
  const actions: { label: string; to: string; icon: typeof BookOpen; primary?: boolean }[] = [];
  if (msg.redirectUrl && msg.redirectLabel) {
    actions.push({ label: msg.redirectLabel, to: msg.redirectUrl, icon: ExternalLink, primary: true });
  }
  if (msg.guideSlug && VALID_GUIDE_SLUGS.has(msg.guideSlug)) {
    actions.push({ label: "Otvori Smart Guide", to: `/formulari/${msg.guideSlug}`, icon: BookOpen, primary: true });
  }
  if (msg.formSlugs?.length) {
    const fp = `/formulari/${msg.formSlugs[0]}`;
    if (!actions.some(a => a.to === fp)) actions.push({ label: "Otvori formular", to: fp, icon: ExternalLink });
  }
  if (msg.siteTopics) {
    for (const t of msg.siteTopics) {
      if (!isValidRoute(t.url) || actions.some(a => a.to === t.url) || actions.length >= 3) continue;
      actions.push({ label: t.label, to: t.url, icon: ExternalLink });
    }
  }
  if (!actions.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {actions.slice(0, 3).map((a, i) => (
        <Link key={i} to={a.to} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${a.primary ? "bg-[hsl(45,93%,49%)] text-black hover:bg-[hsl(45,93%,55%)]" : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"}`}>
          <a.icon className="h-3 w-3" />{a.label}
        </Link>
      ))}
    </div>
  );
}

// ── Tabs ──
type PanelTab = "chat" | "deadlines" | "profile";

// ── Main Component ──
export default function ChatAssistant() {
  const { isPremium } = useAuth();
  const { canChat, remaining, recordQuery } = useChatLimit();
  const location = useLocation();

  const [open, setOpen] = useState(location.pathname === "/ai-asistent");
  const { user } = useAuth();

  // ── Session-scoped chat persistence ──
  const chatStorageKey = user ? `bl-chat-${user.id}` : null;
  // Track previous user id to detect logout vs initial load
  const prevUserIdRef = useRef<string | null | undefined>(undefined);
  // Flag to prevent save effect from overwriting localStorage before restore completes
  const restoredRef = useRef(false);

  function loadMessagesForUser(userId: string): Msg[] {
    try {
      const raw = localStorage.getItem(`bl-chat-${userId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed as Msg[];
      }
    } catch (e) {
      console.warn("[BL-Chat] Failed to parse stored chat, clearing:", e);
      localStorage.removeItem(`bl-chat-${userId}`);
    }
    return [];
  }

  const [messages, setMessages] = useState<Msg[]>(() => {
    // Try to restore on very first render if user is already available
    if (user?.id) {
      const restored = loadMessagesForUser(user.id);
      if (restored.length > 0) {
        restoredRef.current = true;
        return restored;
      }
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<PanelTab>("chat");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showBenefitCalc, setShowBenefitCalc] = useState(false);
  const [chatLang, setChatLang] = useState<"bs" | "de">("bs");
  const [hasUnread, setHasUnread] = useState(false);
  const [disclaimerSeen, setDisclaimerSeen] = useState(() =>
    localStorage.getItem("bl_ai_disclaimer_seen") === "true"
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastFailedMsgRef = useRef<string | null>(null);

  // Persist messages to localStorage whenever they change — but never overwrite with empty before restore
  useEffect(() => {
    if (!chatStorageKey) return;
    if (messages.length > 0) {
      localStorage.setItem(chatStorageKey, JSON.stringify(messages));
    }
    // Only remove stored chat if messages were explicitly cleared (logout), not on initial empty state
  }, [messages, chatStorageKey]);

  // Handle user changes: restore on login, clear on logout
  useEffect(() => {
    const prevId = prevUserIdRef.current;
    prevUserIdRef.current = user?.id ?? null;

    if (!user) {
      // User logged out — clear chat state and localStorage
      if (prevId && prevId !== undefined) {
        // Actual logout (was logged in before)
        setMessages([]);
        const keys = Object.keys(localStorage).filter(k => k.startsWith("bl-chat-"));
        keys.forEach(k => localStorage.removeItem(k));
        restoredRef.current = false;
        console.debug("[BL-Chat] Logout — chat cleared");
      }
    } else if (!restoredRef.current) {
      // User just became available (login or auth hydration) — restore
      const restored = loadMessagesForUser(user.id);
      if (restored.length > 0) {
        setMessages(restored);
        console.debug("[BL-Chat] Restored", restored.length, "messages for user", user.id);
      }
      restoredRef.current = true;
    }
  }, [user?.id]);

  // Load chat lang preference
  useEffect(() => {
    const saved = localStorage.getItem("bl-lang");
    if (saved === "de") setChatLang("de");
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, showOnboarding, showBenefitCalc]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
      setHasUnread(false);
    }
  }, [open]);

  // Listen for external "open-assistant" events (e.g. hero CTA)
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
    };
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Check if onboarding needed on first open
  useEffect(() => {
    if (open && messages.length === 0 && !isOnboardingDone()) {
      setShowOnboarding(true);
    }
  }, [open, messages.length]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const giveFeedback = (index: number, rating: "up" | "down") => {
    setMessages(prev => prev.map((m, i) => i === index ? { ...m, feedbackGiven: rating } : m));
    const fb = loadFeedback();
    const userMsg = messages.slice(0, index).reverse().find(m => m.role === "user");
    fb.push({ messageIndex: index, question: userMsg?.content || "", rating, timestamp: new Date().toISOString() });
    saveFeedback(fb);
  };

  const saveConversation = () => {
    const date = new Date().toISOString().split("T")[0];
    const text = messages.map(m => `[${m.role === "user" ? "Ti" : "Asistent"}]: ${m.content}`).join("\n\n");
    const header = `BalkanLink Razgovor — ${date}\n${"=".repeat(40)}\n\n`;
    const blob = new Blob([header + text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BalkanLink-razgovor-${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const mimeType = file.type || "image/jpeg";

      const userMsg: Msg = { role: "user", content: `📎 Uploadovao sam dokument: ${file.name}` };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setLoading(true);

      try {
        if (!canChat) {
          setMessages(prev => [...prev, { role: "assistant", content: "⚡ Dostigao/la si dnevni limit od 3 pitanja.\n\n[👉 Premium](/premium)" }]);
          setLoading(false);
          return;
        }
        await recordQuery();

        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              ...newMessages.slice(0, -1),
              {
                role: "user",
                content: [
                  { type: "text", text: "Korisnik je uploadovao dokument. Analiziraj šta piše, objasni na bosanskom/srpskom/hrvatskom jeziku šta je ovaj dokument, šta znači, i šta korisnik treba uraditi. Ako je pismo od državne institucije — reci koja je institucija, o čemu se radi, koji je rok ako postoji, i koji je sljedeći korak." },
                  { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
                ],
              },
            ],
            isPremium,
            language: chatLang,
            currentPage: location.pathname,
          }),
        });

        if (!resp.ok) throw new Error("Upload analysis failed");

        const contentType = resp.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await resp.json();
          setMessages(prev => [...prev, { role: "assistant", content: data.content || data.error || "Nisam mogao analizirati dokument." }]);
        } else if (resp.body) {
          await streamResponse(resp, "");
        }
      } catch {
        setMessages(prev => [...prev, { role: "assistant", content: "Ups, nisam mogao analizirati ovaj dokument. Pokušaj ponovo." }]);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const streamResponse = async (resp: Response, userText: string) => {
    let assistantSoFar = "";
    const detectedSlug = detectGuideSlugFromText(userText);
    let flushPending = false;

    const flushToState = () => {
      flushPending = false;
      const { cleanText: rawClean, formSlugs } = extractFormMarkers(assistantSoFar);
      const { cleanText, suggestions } = extractSuggestions(rawClean);
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: cleanText, guideSlug: detectedSlug, formSlugs, suggestions } : m);
        }
        return [...prev, { role: "assistant", content: cleanText, guideSlug: detectedSlug, formSlugs, suggestions }];
      });
    };

    const scheduleFlush = () => {
      if (!flushPending) {
        flushPending = true;
        requestAnimationFrame(flushToState);
      }
    };

    const headerSlug = resp.headers.get("X-Guide-Slug");
    const headerFormSlug = resp.headers.get("X-Form-Slug");
    const headerSiteTopicsRaw = resp.headers.get("X-Site-Topics");
    let headerSiteTopics: SiteTopicAction[] = [];
    if (headerSiteTopicsRaw) { try { headerSiteTopics = JSON.parse(headerSiteTopicsRaw); } catch {} }

    const reader = resp.body!.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });
      let ni: number;
      while ((ni = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, ni);
        textBuffer = textBuffer.slice(ni + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || !line.trim() || !line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;
        try {
          const parsed = JSON.parse(jsonStr);
          const c = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (c) {
            assistantSoFar += c;
            scheduleFlush();
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush to ensure all content is rendered
    flushToState();

    if (headerSlug || headerFormSlug || headerSiteTopics.length > 0) {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          const ufs = [...(last.formSlugs || [])];
          if (headerFormSlug && !ufs.includes(headerFormSlug)) ufs.push(headerFormSlug);
          return prev.map((m, i) => i === prev.length - 1 ? {
            ...m, guideSlug: headerSlug || m.guideSlug, formSlugs: ufs,
            siteTopics: headerSiteTopics.length > 0 ? headerSiteTopics : m.siteTopics,
          } : m);
        }
        return prev;
      });
    }
  };

  const sendMessageWithText = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    if (!canChat) {
      setMessages(prev => [...prev,
        { role: "user", content: text.trim() },
        { role: "assistant", content: "⚡ Dostigao/la si dnevni limit od 3 pitanja.\n\nSa **BalkanLink Premium** dobijaš neograničenu pomoć.\n\n[👉 Premium](/premium)" },
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

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages,
          isPremium,
          language: chatLang,
          currentPage: location.pathname,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const ct = resp.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const data = await resp.json();
        // Safety block (illegal/dangerous content)
        if (data.safety_blocked) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
          setLoading(false);
          return;
        }
        if (data.search_redirect) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content, redirectUrl: data.redirect_url, redirectLabel: data.redirect_label }]);
          setLoading(false);
          return;
        }
        if (data.smart_guide_redirect) {
          setMessages(prev => [...prev, { role: "assistant", content: data.content, guideSlug: data.guideSlug, formSlugs: data.detectedForm ? [data.detectedForm.slug] : [] }]);
          setLoading(false);
          return;
        }
        if (data.premium_required) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: data.content,
            formSlugs: data.detectedForm ? [data.detectedForm.slug] : [],
            guideSlug: data.guideSlug,
            redirectUrl: data.redirect_url || "/premium",
            redirectLabel: data.redirect_label || "Premium pogledaj",
          }]);
          setLoading(false);
          return;
        }
        if (data.soft_upsell) {
          setMessages(prev => [...prev, { role: "assistant", content: data.free_content, guideSlug: data.guideSlug }]);
          setLoading(false);
          return;
        }
        if (data.error) {
          setMessages(prev => [...prev, { role: "assistant", content: data.error }]);
          setLoading(false);
          return;
        }
      }

      await streamResponse(resp, text);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Greška pri povezivanju. Pokušaj ponovo za nekoliko sekundi.", _retry: true } as any]);
      lastFailedMsgRef.current = text;
    } finally {
      setLoading(false);
    }
  }, [loading, messages, isPremium, chatLang, location.pathname, canChat, recordQuery]);

  const sendMessage = useCallback(() => sendMessageWithText(input), [input, sendMessageWithText]);
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const handleClose = () => setOpen(false);

  const handleOnboardingComplete = (_profile: UserProfile, todoMessage: string) => {
    setShowOnboarding(false);
    setMessages([{ role: "assistant", content: todoMessage }]);
  };

  const handleBenefitResult = (resultText: string) => {
    setShowBenefitCalc(false);
    setMessages(prev => [...prev, { role: "assistant", content: resultText }]);
  };

  const handleDeadlineChat = (msg: string) => {
    setActiveTab("chat");
    setTimeout(() => sendMessageWithText(msg), 100);
  };

  const toggleChatLang = () => {
    const next = chatLang === "bs" ? "de" : "bs";
    setChatLang(next);
    localStorage.setItem("bl-lang", next);
  };

  const showStartScreen = messages.length === 0 && !showOnboarding && !showBenefitCalc;
  const contextWelcome = getContextualWelcome(location.pathname);
  const welcomeMsg = contextWelcome || DEFAULT_WELCOME;

  return (
    <>
      {location.pathname === "/ai-asistent" && <SEO title="BalkanLink Asistent — Pitaj na Svom Jeziku" description="Postavi pitanje o životu u Njemačkoj i dobij odgovor odmah." path="/ai-asistent" />}
      {/* ── Floating Trigger ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-20 right-4 z-50 group cursor-pointer hidden md:block md:bottom-6 md:right-6"
            onClick={() => setOpen(true)}
          >
            <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[hsl(220,30%,12%)] border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Pitaj BalkanLink Asistenta
            </div>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[hsl(45,93%,49%)]"
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_20px_rgba(234,179,8,0.4)] overflow-hidden" style={{ background: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)" }}>
              <BLIcon size={28} />
              {hasUnread && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-[#0d1526]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={handleClose} className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm" />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-[1000] flex flex-col w-full md:w-[420px] h-full border-l border-[hsl(215,20%,15%)]"
              style={{ background: "#0d1526" }}
            >
              {/* Header */}
              <div className="shrink-0 px-4 py-3 border-b border-[hsl(215,20%,15%)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #EAB308, #F59E0B)" }}>
                      <BLIcon size={22} />
                    </div>
                    <div>
                      <span className="text-[14px] font-bold text-white block leading-tight">BalkanLink Asistent</span>
                      <span className="text-[10px] text-white/40">Tvoj vodič kroz Njemačku</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Save */}
                    {messages.length > 0 && (
                      <button onClick={saveConversation} className="rounded-lg p-1.5 text-white/30 hover:text-white/60 hover:bg-white/5 transition-all" title="Spremi razgovor">
                        <Save className="h-4 w-4" />
                      </button>
                    )}
                    {/* Close */}
                    <button onClick={handleClose} className="rounded-lg p-1.5 text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1">
                  {([
                    { key: "chat" as PanelTab, icon: MessageCircle, label: "Chat" },
                    { key: "deadlines" as PanelTab, icon: Clock, label: "Rokovi" },
                    { key: "profile" as PanelTab, icon: User, label: "Status" },
                  ]).map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-medium transition-all ${
                        activeTab === tab.key
                          ? "bg-[hsl(45,93%,49%)] text-black"
                          : "text-white/40 hover:text-white/60 hover:bg-white/5"
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              {activeTab === "deadlines" ? (
                <ChatDeadlines onAskChat={handleDeadlineChat} />
              ) : activeTab === "profile" ? (
                <ChatProfile />
              ) : (
                <>
                  {/* AI Disclaimer overlay — shown once */}
                  {!disclaimerSeen && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[hsl(var(--primary))]/95 backdrop-blur-sm rounded-lg p-6">
                      <div className="max-w-md text-center space-y-4">
                        <div className="text-3xl">📋</div>
                        <h3 className="text-lg font-bold text-white">
                          Prije nego počneš — pročitaj ovo
                        </h3>
                        <div className="text-sm text-white/70 text-left space-y-2">
                          <p>
                            BalkanLink Asistent pruža <strong className="text-white">
                            isključivo informativne odgovore</strong>. Odgovori asistenta:
                          </p>
                          <ul className="list-disc ml-4 space-y-1">
                            <li>Ne predstavljaju pravni ni porezni savjet</li>
                            <li>Mogu sadržavati greške ili zastarjele informacije</li>
                            <li>Ne zamjenjuju konsultaciju s nadležnim organima</li>
                            <li>Uvijek provjeri informacije na zvaničnim izvorima</li>
                          </ul>
                          <p className="text-xs opacity-70 mt-2">
                            Više o asistentu:{" "}
                            <a href="/napomena-o-ki" target="_blank"
                              className="text-[hsl(var(--brand-orange))] hover:underline">
                              Napomena o asistentu
                            </a>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            localStorage.setItem("bl_ai_disclaimer_seen", "true");
                            setDisclaimerSeen(true);
                          }}
                          className="w-full rounded-md bg-[hsl(var(--brand-orange))] px-6 py-2.5 text-sm font-medium text-[hsl(var(--brand-orange-foreground))] hover:bg-[hsl(var(--brand-orange))]/90 transition-colors"
                        >
                          Razumijem — nastavi na asistenta
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Chat messages area */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    {showOnboarding && (
                      <ChatOnboarding onComplete={handleOnboardingComplete} />
                    )}

                    {showBenefitCalc && (
                      <ChatBenefitCalc
                        onResult={handleBenefitResult}
                        onCancel={() => setShowBenefitCalc(false)}
                      />
                    )}

                    {showStartScreen && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="flex justify-start">
                          <div className="max-w-[88%]">
                            <div className="rounded-xl rounded-bl-none px-4 py-3 text-[13px] leading-relaxed text-white/90" style={{ background: "#1F2937" }}>
                              {welcomeMsg}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 px-1">
                          {STARTER_QUESTIONS.map((q, i) => (
                            <motion.button key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 + i * 0.06 }} onClick={() => sendMessageWithText(q.message)} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-[12px] font-medium text-white/80 transition-all hover:bg-white/[0.07] hover:border-[hsl(45,93%,49%)]/30 active:scale-[0.97]">
                              <span className="text-base shrink-0">{q.emoji}</span>
                              <span className="truncate">{q.label}</span>
                            </motion.button>
                          ))}
                        </div>

                        {/* Benefit calc button */}
                        <motion.button
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          onClick={() => setShowBenefitCalc(true)}
                          className="w-full rounded-xl border border-[hsl(45,93%,49%)]/20 bg-[hsl(45,93%,49%)]/5 px-4 py-3 text-left text-[12px] font-semibold text-[hsl(45,93%,49%)] transition-all hover:bg-[hsl(45,93%,49%)]/10 active:scale-[0.98]"
                        >
                          💰 Izračunaj šta možeš dobiti
                        </motion.button>
                      </motion.div>
                    )}

                    {messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.1 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="max-w-[88%] space-y-1">
                          <div className={`px-4 py-3 text-[13px] leading-relaxed ${msg.role === "user" ? "rounded-xl rounded-br-none bg-[hsl(45,93%,49%)] text-black" : "rounded-xl rounded-bl-none text-white/90"}`} style={msg.role === "assistant" ? { background: "#1F2937" } : undefined}>
                            {msg.role === "assistant" ? (
                              <>
                                <ChatMarkdown content={msg.content} />
                                {(msg as any)._retry && lastFailedMsgRef.current && (
                                  <button
                                    onClick={() => {
                                      const retryText = lastFailedMsgRef.current;
                                      lastFailedMsgRef.current = null;
                                      setMessages(prev => prev.filter((_, idx) => idx !== i));
                                      if (retryText) sendMessageWithText(retryText);
                                    }}
                                    className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 hover:bg-white/20 transition-all"
                                  >
                                    🔄 Pokušaj ponovo
                                  </button>
                                )}
                                {msg.content.length > 200 && !(msg as any)._retry && (
                                  <button onClick={() => copyToClipboard(msg.content, i)} className="mt-2 flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition">
                                    <Copy className="h-3 w-3" />
                                    {copied === i ? "✓ Kopirano" : "Kopiraj"}
                                  </button>
                                )}
                              </>
                            ) : msg.content}
                          </div>

                          {/* Feedback + Actions for assistant messages */}
                          {msg.role === "assistant" && !loading && (
                            <>
                              <div className="flex items-center gap-2 px-1">
                                <ResponseActions msg={msg} />
                                {/* Feedback */}
                                <div className="flex items-center gap-0.5 ml-auto">
                                  <button onClick={() => giveFeedback(i, "up")} className={`p-1 rounded transition-all ${msg.feedbackGiven === "up" ? "text-emerald-400" : "text-white/15 hover:text-white/40"}`}>
                                    <ThumbsUp className="h-3 w-3" />
                                  </button>
                                  <button onClick={() => giveFeedback(i, "down")} className={`p-1 rounded transition-all ${msg.feedbackGiven === "down" ? "text-red-400" : "text-white/15 hover:text-white/40"}`}>
                                    <ThumbsDown className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Follow-up suggestions */}
                              {msg.suggestions && msg.suggestions.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                  {msg.suggestions.slice(0, 3).map((s, si) => (
                                    <button key={si} onClick={() => sendMessageWithText(s)} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/60 hover:text-white/80 hover:border-[hsl(45,93%,49%)]/30 transition-all">
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {loading && messages[messages.length - 1]?.role === "user" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bl-shimmer-host w-[85%] space-y-2.5 rounded-xl rounded-bl-none px-4 py-4 overflow-hidden" style={{ background: "#1F2937" }}>
                          <div className="flex items-center gap-2">
                            <div className="bl-shimmer h-4 w-4 rounded-full" />
                            <div className="bl-shimmer h-3 w-24 rounded-md" />
                          </div>
                          <div className="bl-shimmer h-3 w-full rounded-md" />
                          <div className="bl-shimmer h-3 w-[90%] rounded-md" style={{ animationDelay: "150ms" }} />
                          <div className="bl-shimmer h-3 w-[70%] rounded-md" style={{ animationDelay: "300ms" }} />
                          <div className="flex gap-2 pt-1">
                            <div className="bl-shimmer h-3 w-16 rounded-md" style={{ animationDelay: "400ms" }} />
                            <div className="bl-shimmer h-3 w-20 rounded-md" style={{ animationDelay: "500ms" }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <div className="px-4 py-1 border-t border-white/5 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/60 shrink-0" />
                        <p className="text-[10px] text-white/60">BalkanLink Asistent daje orijentacione informacije, ne pravni savjet.</p>
                      </div>
                      {!isPremium && (
                        <p className="text-[8px] text-white/30 font-medium shrink-0 ml-2">
                          {remaining > 0 ? `${remaining}/3` : "Limit"}
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
                        placeholder="Npr: Kako da prijavim adresu? Šta je Steuer-ID?"
                        rows={1}
                        className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white outline-none transition-all placeholder:text-white/25 focus:border-[hsl(45,93%,49%)]/40 focus:ring-1 focus:ring-[hsl(45,93%,49%)]/20"
                      />
                      {/* Send */}
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
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
