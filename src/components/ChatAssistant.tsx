import React, { useState, useRef, useEffect, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { X, Send, Copy, ShieldCheck, ExternalLink, BookOpen, ThumbsUp, ThumbsDown, Camera, Save, MessageCircle, Clock, User, Trash2, Minus } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";
import { useChatLimit } from "@/hooks/usePremiumAccess";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  getPageTopicLabel, getContextualPromptChips,
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
const ACTIVE_CHAT_STORAGE_KEY = "bl-chat-current";

// ── Rate-limit message with reset countdown (resets at midnight local) ──
function buildRateLimitMessage(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diffMs = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  const minutes = Math.floor((diffMs % 3_600_000) / 60_000);
  const resetIn = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  return `⚡ **Dostigao/la si dnevni limit od 5 pitanja.**\n\nNovi besplatni upiti se otključavaju za **${resetIn}** (ponoć).\n\nSa **BalkanLink Premium** (9,99 €/mj) dobijaš neograničena pitanja, prioritetne odgovore i sve premium vodiče.\n\n[👉 Aktiviraj Premium](/premium)`;
}

// ── Detekcija pitanja o broju preostalih dnevnih pitanja (lokalno, bez AI) ──
const QUOTA_QUERY_RE = /\b(kol[iı]ko|kolko|koliko\s+jo[sš]?|jo[sš]?\s+kol[iı]ko|preostal|ostal[oa]?|ostalo)\b.*\b(pitanj|upit|kvot|limit)\b|\b(pitanj|upit|kvot|limit)\b.*\b(kol[iı]ko|kolko|preostal|ostal[oa]?)\b/i;

function isQuotaQuestion(text: string): boolean {
  const t = (text || "").trim().toLowerCase();
  if (!t) return false;
  // brzi pogodci
  if (/(kol[iı]ko|kolko)\s+(jo[sš]\s+)?(imam\s+)?(pitanja|upita)/i.test(t)) return true;
  if (/(jo[sš]\s+)?kol[iı]ko\s+pitanja/i.test(t)) return true;
  if (/(preostal|ostalo)\s+pitanja/i.test(t)) return true;
  return QUOTA_QUERY_RE.test(t);
}

function buildQuotaAnswer(remaining: number, isPremium: boolean): string {
  if (isPremium) {
    return `Imaš **neograničen broj pitanja** kao Premium korisnik. 🎉\n\nPostavi mi šta god ti treba — formulari, vize, porez, stanovanje, posao u Njemačkoj.`;
  }
  if (remaining <= 0) {
    return `Iskoristio/la si svih **5 besplatnih pitanja** za danas. Brojač se resetuje u ponoć.\n\nSa **Premium pretplatom (9,99 €/mj)** dobijaš:\n- ✅ Neograničena pitanja\n- ✅ Prioritetne odgovore\n- ✅ Sve premium vodiče i alate\n\n[👉 Aktiviraj Premium](/premium)`;
  }
  const word = remaining === 1 ? "pitanje" : (remaining < 5 ? "pitanja" : "pitanja");
  return `Imaš još **${remaining} ${word}** za danas na besplatnom paketu (od ukupno 5 dnevno). Brojač se resetuje u ponoć.\n\nAko želiš neograničen pristup i sve premium funkcije, pogledaj [Paketi i cijene](/paketi).`;
}

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
  // VIZA NAVIGATOR (državljanstvo, Staatsangehörigkeit, vize, ulazak)
  [/\b(Staatsangehörigkeit|staatsangehorigkeit|državljanstvo|drzavljanstvo|dvojno državljanstvo|dvojno drzavljanstvo|državljanin|drzavljanin|naturalizacija|Einbürgerung|einburgerung)\b/gi, "/viza"],
  [/\b(viza za Njemačku|viza za njemacku|koja viza|vizni režim|vizni rezim|Visum|visum|nacionalna viza)\b/gi, "/viza"],
  [/\b(spajanje porodice|Familiennachzug|familiennachzug)\b/gi, "/viza"],
  // AUFENTHALTSTITEL (boravišne dozvole — već u Njemačkoj)
  [/\b(Aufenthaltstitel|aufenthaltstitel|boravišna dozvola|boravisna dozvola)\b/gi, "/formulari/aufenthaltstitel"],
  [/\b(Niederlassungserlaubnis|niederlassungserlaubnis|stalni boravak)\b/gi, "/formulari/aufenthaltstitel"],
  [/\b(Blaue Karte|blaue karte|plava karta)\b/gi, "/formulari/aufenthaltstitel"],
  [/\b(Arbeitsvisum|arbeitsvisum|radna viza)\b/gi, "/viza"],
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
type AssistantPanelState = "open" | "minimized" | "closed";

const ASSISTANT_PANEL_STATE_KEY = "bl_assistant_panel_state_v1";

function getStoredAssistantPanelState(): AssistantPanelState | null {
  try {
    const state = localStorage.getItem(ASSISTANT_PANEL_STATE_KEY);
    return state === "open" || state === "minimized" || state === "closed" ? state : null;
  } catch {
    return null;
  }
}

function storeAssistantPanelState(state: AssistantPanelState) {
  try {
    localStorage.setItem(ASSISTANT_PANEL_STATE_KEY, state);
  } catch {
    /* ignore */
  }
}

// ── Main Component ──
export default function ChatAssistant() {
  const { isPremium } = useAuth();
  const { canChat, remaining, recordQuery } = useChatLimit();
  const location = useLocation();

  const [panelState, setPanelState] = useState<AssistantPanelState>(() => {
    const stored = getStoredAssistantPanelState();
    if (stored) return stored;
    if (location.pathname === "/ai-asistent") return "open";
    // Na homepage NE prikazuj floating button by default — hero već ima asistenta.
    // FAB se pojavljuje tek kad korisnik otvori asistenta i zatim ga minimizira.
    if (location.pathname === "/") return "closed";
    return "minimized";
  });
  const open = panelState === "open";
  const { user } = useAuth();

  // Prati da li je korisnik otvorio asistenta u ovoj sesiji.
  // Na homepageu FAB smije da se vidi SAMO ako je panel bio otvoren bar jednom.
  const openedThisSessionRef = useRef<boolean>(panelState === "open");

  const setPersistentPanelState = useCallback((state: AssistantPanelState) => {
    if (state === "open") openedThisSessionRef.current = true;
    setPanelState(state);
    storeAssistantPanelState(state);
  }, []);
  const openAssistant = useCallback(() => setPersistentPanelState("open"), [setPersistentPanelState]);
  const minimizeAssistant = useCallback(() => setPersistentPanelState("minimized"), [setPersistentPanelState]);
  const closeAssistant = useCallback(() => setPersistentPanelState("closed"), [setPersistentPanelState]);

  // ── Cross-device chat persistence (localStorage cache + Supabase sync) ──
  const chatStorageKey = user ? `bl-chat-${user.id}` : ACTIVE_CHAT_STORAGE_KEY;
  const prevUserIdRef = useRef<string | null | undefined>(undefined);
  const restoredRef = useRef(false);
  // Track which messages have been synced to DB (by stable signature) to avoid duplicates
  const syncedSigsRef = useRef<Set<string>>(new Set());
  // Track ids of messages we received via realtime to avoid re-inserting them
  const remoteIdsRef = useRef<Set<string>>(new Set());

  function msgSignature(m: Msg, idx: number): string {
    // Stable per-position signature (role + first 80 chars + index)
    return `${idx}|${m.role}|${(m.content || "").slice(0, 80)}`;
  }

  function loadMessagesByKey(storageKey: string): Msg[] {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed as Msg[];
      }
    } catch (e) {
      console.warn("[BL-Chat] Failed to parse stored chat, clearing:", e);
      localStorage.removeItem(storageKey);
    }
    return [];
  }

  function loadMessagesForUser(userId: string): Msg[] {
    return loadMessagesByKey(`bl-chat-${userId}`);
  }

  function loadActiveMessages(userId?: string): Msg[] {
    const userMessages = userId ? loadMessagesForUser(userId) : [];
    return userMessages.length > 0 ? userMessages : loadMessagesByKey(ACTIVE_CHAT_STORAGE_KEY);
  }

  // Fetch full history from Supabase for cross-device restore
  async function fetchRemoteHistory(userId: string): Promise<Msg[]> {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("id, role, content, metadata, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(500);
      if (error) {
        console.warn("[BL-Chat] Remote history fetch failed:", error.message);
        return [];
      }
      if (!data) return [];
      return data.map((row: any) => {
        remoteIdsRef.current.add(row.id);
        const meta = row.metadata || {};
        return {
          role: row.role,
          content: row.content,
          guideSlug: meta.guideSlug ?? null,
          formSlugs: meta.formSlugs ?? undefined,
          siteTopics: meta.siteTopics ?? undefined,
          redirectUrl: meta.redirectUrl ?? undefined,
          redirectLabel: meta.redirectLabel ?? undefined,
          suggestions: meta.suggestions ?? undefined,
          feedbackGiven: meta.feedbackGiven ?? null,
        } as Msg;
      });
    } catch (e) {
      console.warn("[BL-Chat] fetchRemoteHistory error:", e);
      return [];
    }
  }

  const [messages, setMessages] = useState<Msg[]>(() => {
    const restored = loadActiveMessages(user?.id);
    if (restored.length > 0) {
      restoredRef.current = true;
      // Mark all locally-restored as already synced (best-effort) to avoid spam re-inserts.
      // The remote fetch on mount will reconcile.
      restored.forEach((m, i) => syncedSigsRef.current.add(msgSignature(m, i)));
      return restored;
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

  // Persist messages to localStorage (fast cache)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(chatStorageKey, JSON.stringify(messages));
      localStorage.setItem(ACTIVE_CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, chatStorageKey]);

  // Restore from local cache immediately on auth hydration, then cloud if available.
  useEffect(() => {
    if (user?.id) {
      const local = loadActiveMessages(user.id);
      if (local.length > 0) {
        setMessages(prev => (prev.length > 0 ? prev : local));
        local.forEach((m, i) => syncedSigsRef.current.add(msgSignature(m, i)));
      }
    } else {
      const local = loadActiveMessages();
      if (local.length > 0) setMessages(prev => (prev.length > 0 ? prev : local));
    }
  }, [user?.id]);

  // Restore from cloud on login/hydration. Cloud is source of truth across devices.
  useEffect(() => {
    if (!user?.id) return;
    if (prevUserIdRef.current === user.id) return;

    let cancelled = false;
    (async () => {
      const remote = await fetchRemoteHistory(user.id);
      if (cancelled) return;

      if (remote.length > 0) {
        // Cloud wins on cross-device login — replace local with remote
        setMessages(remote);
        remote.forEach((m, i) => syncedSigsRef.current.add(msgSignature(m, i)));
        console.debug("[BL-Chat] Restored", remote.length, "messages from cloud");
      } else {
        // No cloud history — keep local (will be synced upward by sync effect)
        const local = loadActiveMessages(user.id);
        if (local.length > 0 && messages.length === 0) {
          setMessages(local);
        }
      }
      restoredRef.current = true;
      prevUserIdRef.current = user.id;
    })();

    return () => { cancelled = true; };
  }, [user?.id]);

  // Push new messages to Supabase as they appear (best-effort, non-blocking)
  useEffect(() => {
    if (!user?.id || !restoredRef.current || messages.length === 0) return;
    const toSync: { idx: number; msg: Msg }[] = [];
    messages.forEach((m, i) => {
      const sig = msgSignature(m, i);
      if (!syncedSigsRef.current.has(sig)) {
        toSync.push({ idx: i, msg: m });
      }
    });
    if (toSync.length === 0) return;

    // Mark as synced optimistically to avoid double-insert on rapid updates
    toSync.forEach(({ idx, msg }) => syncedSigsRef.current.add(msgSignature(msg, idx)));

    const rows = toSync.map(({ msg }) => ({
      user_id: user.id,
      role: msg.role,
      content: msg.content,
      metadata: {
        guideSlug: msg.guideSlug ?? null,
        formSlugs: msg.formSlugs ?? null,
        siteTopics: msg.siteTopics ?? null,
        redirectUrl: msg.redirectUrl ?? null,
        redirectLabel: msg.redirectLabel ?? null,
        suggestions: msg.suggestions ?? null,
        feedbackGiven: msg.feedbackGiven ?? null,
      },
    }));

    supabase.from("chat_messages").insert(rows).then(({ error, data }) => {
      if (error) {
        console.warn("[BL-Chat] Cloud sync failed:", error.message);
        // Roll back marker so we can retry on next change
        toSync.forEach(({ idx, msg }) => syncedSigsRef.current.delete(msgSignature(msg, idx)));
      } else if (data) {
        (data as any[]).forEach(r => remoteIdsRef.current.add(r.id));
      }
    });
  }, [messages, user?.id]);

  // Realtime: receive messages from other devices
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel(`chat-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const row: any = payload.new;
          if (!row?.id || remoteIdsRef.current.has(row.id)) return;
          remoteIdsRef.current.add(row.id);
          const meta = row.metadata || {};
          const incoming: Msg = {
            role: row.role,
            content: row.content,
            guideSlug: meta.guideSlug ?? null,
            formSlugs: meta.formSlugs ?? undefined,
            siteTopics: meta.siteTopics ?? undefined,
            redirectUrl: meta.redirectUrl ?? undefined,
            redirectLabel: meta.redirectLabel ?? undefined,
            suggestions: meta.suggestions ?? undefined,
            feedbackGiven: meta.feedbackGiven ?? null,
          };
          setMessages(prev => {
            // Skip if this exact message is already at the tail (we just sent it locally)
            const tail = prev[prev.length - 1];
            if (tail && tail.role === incoming.role && tail.content === incoming.content) {
              return prev;
            }
            const next = [...prev, incoming];
            syncedSigsRef.current.add(msgSignature(incoming, next.length - 1));
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Manual clear (Trash button) — explicit user action, also wipes cloud history
  const clearChat = useCallback(() => {
    if (messages.length === 0) return;
    const ok = window.confirm("Obrisati cijeli razgovor sa svih uređaja? Ova radnja se ne može poništiti.");
    if (!ok) return;
    setMessages([]);
    syncedSigsRef.current.clear();
    remoteIdsRef.current.clear();
    localStorage.removeItem(chatStorageKey);
    localStorage.removeItem(ACTIVE_CHAT_STORAGE_KEY);
    if (user?.id) {
      supabase.from("chat_messages").delete().eq("user_id", user.id).then(({ error }) => {
        if (error) console.warn("[BL-Chat] Cloud clear failed:", error.message);
      });
    }
    toast.success("Razgovor obrisan", {
      description: "Historija je uklonjena sa svih tvojih uređaja.",
      duration: 3000,
    });
  }, [messages.length, chatStorageKey, user?.id]);

  // On real sign-out: clear local cache AND wipe cloud history.
  // During an active session (minimize/close/navigation) history persists.
  useEffect(() => {
    const handleSignOut = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as { userId?: string } | undefined;
      const signedOutUserId = detail?.userId ?? prevUserIdRef.current ?? user?.id ?? null;
      setMessages([]);
      syncedSigsRef.current.clear();
      remoteIdsRef.current.clear();
      const keys = Object.keys(localStorage).filter(k => k.startsWith("bl-chat-"));
      keys.forEach(k => localStorage.removeItem(k));
      localStorage.removeItem(ACTIVE_CHAT_STORAGE_KEY);
      restoredRef.current = false;
      prevUserIdRef.current = null;
      // Reset panel: na sljedećem ulasku na home FAB se NE smije pojaviti
      openedThisSessionRef.current = false;
      try { localStorage.removeItem(ASSISTANT_PANEL_STATE_KEY); } catch {}
      setPanelState("closed");
      if (signedOutUserId) {
        supabase.from("chat_messages").delete().eq("user_id", signedOutUserId).then(({ error }) => {
          if (error) console.warn("[BL-Chat] Cloud clear on sign-out failed:", error.message);
        });
      }
      console.debug("[BL-Chat] Sign-out — local cache and cloud history cleared");
    };
    window.addEventListener("bl:user-signed-out", handleSignOut);
    return () => window.removeEventListener("bl:user-signed-out", handleSignOut);
  }, [user?.id]);

  // Load chat lang preference
  useEffect(() => {
    const saved = localStorage.getItem("bl-lang");
    if (saved === "de") setChatLang("de");
  }, []);

  // Smart scroll: kada user pošalje novo pitanje (zadnji msg = user) ILI stigne novi assistant odgovor,
  // skrolaj zadnju USER poruku na vrh vidljivog područja, da korisnik vidi pitanje + početak odgovora
  // umjesto da bude bačen na dno (gdje je input/loading/kraj odgovora).
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    // Tokom onboarding/benefit calc — klasično dno
    if (showOnboarding || showBenefitCalc) {
      container.scrollTop = container.scrollHeight;
      return;
    }

    if (messages.length === 0) return;
    const last = messages[messages.length - 1];

    // Ako je zadnji msg user (tek poslao) ILI je assistant koji upravo stigao (nije loading streaming),
    // skrolaj zadnju USER poruku na vrh vidljivog područja.
    if (last.role === "user" || (last.role === "assistant" && !loading)) {
      let lastUserIdx = -1;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === "user") { lastUserIdx = i; break; }
      }
      if (lastUserIdx >= 0) {
        // Sačekaj da DOM/animacije stignu da renderuju, pa onda izračunaj poziciju
        const raf = requestAnimationFrame(() => {
          if (!scrollRef.current) return;
          const c = scrollRef.current;
          const userEl = c.querySelector<HTMLElement>(`[data-msg-idx="${lastUserIdx}"]`);
          if (!userEl) return;
          // getBoundingClientRect je pouzdaniji od offsetTop (koji ovisi o offsetParent)
          const containerRect = c.getBoundingClientRect();
          const userRect = userEl.getBoundingClientRect();
          const target = c.scrollTop + (userRect.top - containerRect.top) - 12;
          c.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
        });
        return () => cancelAnimationFrame(raf);
      }
    }

    // Streaming assistant odgovor → drži dno
    if (loading) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading, showOnboarding, showBenefitCalc]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
      setHasUnread(false);
    }
  }, [open]);

  // Ref to sendMessageWithText so the open-assistant listener can call it
  // even though the function is declared further below in the component body.
  const sendMessageRef = useRef<((text: string) => void) | null>(null);

  // Listen for external "open-assistant" events (e.g. hero CTA)
  useEffect(() => {
    const handler = (e: Event) => {
      openAssistant();
      const detail = (e as CustomEvent<{ prefill?: string; autoSend?: boolean }>).detail;
      const prefill = detail?.prefill?.trim();
      // If a prefill is provided, auto-send it (unless explicitly disabled).
      // Default: send right away so the user doesn't have to press send again.
      if (prefill && detail?.autoSend !== false) {
        setInput("");
        setTimeout(() => { sendMessageRef.current?.(prefill); }, 120);
      } else if (prefill) {
        setInput(prefill);
        setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
      } else {
        setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
      }
    };
    window.addEventListener("open-assistant", handler as EventListener);
    return () => window.removeEventListener("open-assistant", handler as EventListener);
  }, [openAssistant]);

  // Minimize on hardware Back button (mobile): push a history state when opening,
  // and on popstate close the panel instead of navigating away.
  useEffect(() => {
    if (!open) return;
    const STATE_FLAG = "bl-assistant-open";
    try {
      if (!window.history.state || window.history.state[STATE_FLAG] !== true) {
        window.history.pushState({ ...(window.history.state || {}), [STATE_FLAG]: true }, "");
      }
    } catch {}
    const onPop = () => {
      // User pressed Back → just minimize the assistant
      minimizeAssistant();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // When closing via UI, pop the synthetic state we pushed (if still on top)
      try {
        if (window.history.state && window.history.state[STATE_FLAG] === true) {
          window.history.back();
        }
      } catch {}
    };
  }, [open, minimizeAssistant]);

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
          setMessages(prev => [...prev, { role: "assistant", content: buildRateLimitMessage() }]);
          setLoading(false);
          return;
        }
        await recordQuery();

        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        if (!accessToken) {
          setMessages(prev => [...prev, { role: "assistant", content: "Molimo prijavite se da biste koristili asistenta." }]);
          setLoading(false);
          return;
        }

        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
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

    const safeDecode = (v: string | null) => {
      if (!v) return null;
      try { return decodeURIComponent(v); } catch { return v; }
    };
    const headerSlug = safeDecode(resp.headers.get("X-Guide-Slug"));
    const headerFormSlug = safeDecode(resp.headers.get("X-Form-Slug"));
    const headerSiteTopicsRaw = safeDecode(resp.headers.get("X-Site-Topics"));
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
        { role: "assistant", content: buildRateLimitMessage() },
      ]);
      setInput("");
      return;
    }

    // Lokalni odgovor na pitanja o broju preostalih pitanja — bez trošenja kvote i bez poziva AI-a
    if (isQuotaQuestion(text)) {
      setMessages(prev => [...prev,
        { role: "user", content: text.trim() },
        {
          role: "assistant",
          content: buildQuotaAnswer(remaining, isPremium),
          redirectUrl: isPremium ? undefined : "/paketi",
          redirectLabel: isPremium ? undefined : "Paketi i cijene",
        },
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
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) {
        setMessages(prev => [...prev, { role: "assistant", content: "Molimo prijavite se da biste koristili asistenta." }]);
        setLoading(false);
        return;
      }
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messages: newMessages,
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
  }, [loading, messages, isPremium, chatLang, location.pathname, canChat, recordQuery, remaining]);

  // Keep ref in sync so the open-assistant listener can invoke the latest version
  useEffect(() => { sendMessageRef.current = sendMessageWithText; }, [sendMessageWithText]);

  const sendMessage = useCallback(() => sendMessageWithText(input), [input, sendMessageWithText]);
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  // Minimize: zatvara panel, FAB ostaje vidljiv i stanje ostaje nakon refresh-a.
  const handleMinimize = minimizeAssistant;
  // Close: zatvara panel i sakriva FAB trajno dok ga korisnik ne otvori eksternim CTA-om.
  const handleClose = closeAssistant;

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
  const pageTopic = getPageTopicLabel(location.pathname);
  const contextualChips = getContextualPromptChips(location.pathname);

  return (
    <>
      {location.pathname === "/ai-asistent" && <SEO title="BalkanLink Asistent — Pitaj na Svom Jeziku" description="Postavi pitanje o životu u Njemačkoj i dobij odgovor odmah." path="/ai-asistent" />}
      {/* ── Floating Trigger ──
          Na homepage ('/') FAB se prikazuje SAMO ako je korisnik otvorio
          asistenta u ovoj sesiji (preko hero CTA) i zatim ga minimizirao.
          U svakoj drugoj situaciji na homepage se ne pojavljuje. */}
      <AnimatePresence>
        {panelState === "minimized" &&
          (location.pathname !== "/" || openedThisSessionRef.current) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-20 right-4 z-50 group cursor-pointer md:bottom-6 md:right-6"
            onClick={openAssistant}
          >
            <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[hsl(220,30%,12%)] border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Pitaj Asistenta
            </div>
            <div className="relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full shadow-md ring-1 ring-amber-300/40 overflow-hidden" style={{ background: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)" }}>
              <BLIcon size={22} />
              {hasUnread && (
                <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 border border-[#0d1526]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={handleMinimize} className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm" />

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
                  <div className="flex items-center gap-1.5">
                    {/* Minimize — sakriva panel, FAB ostaje */}
                    <button onClick={handleMinimize} className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:text-[hsl(45,93%,49%)] hover:border-[hsl(45,93%,49%)]/40 hover:bg-white/10 transition-all" title="Minimiziraj asistenta" aria-label="Minimiziraj asistenta">
                      Minimiziraj
                    </button>
                    {/* Close — zatvori (na home sakriva i FAB do navigacije) */}
                    <button onClick={handleClose} className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all" title="Zatvori asistenta" aria-label="Zatvori asistenta">
                      Zatvori
                    </button>
                  </div>
                </div>

                {/* Tabs + Clear button */}
                <div className="flex gap-1 items-center">
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
                  {messages.length > 0 && activeTab === "chat" && (
                    <button
                      onClick={clearChat}
                      className="shrink-0 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 hover:text-red-300 hover:border-red-400/40 hover:bg-red-500/10 transition-all"
                      title="Obriši razgovor"
                      aria-label="Obriši razgovor"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
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
                          <div className="max-w-[88%] space-y-2">
                            {pageTopic && (
                              <div className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(45,93%,49%)]/30 bg-[hsl(45,93%,49%)]/10 px-2.5 py-1 text-[10px] font-semibold text-[hsl(45,93%,49%)]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(45,93%,49%)]" />
                                Pitam o: {pageTopic}
                              </div>
                            )}
                            <div className="rounded-xl rounded-bl-none px-4 py-3 text-[13px] leading-relaxed text-white/90" style={{ background: "#1F2937" }}>
                              {welcomeMsg}
                            </div>
                          </div>
                        </div>

                        {contextualChips.length > 0 && (
                          <div className="space-y-1.5 px-1">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Brzi prijedlozi za ovu stranicu</p>
                            <div className="flex flex-col gap-1.5">
                              {contextualChips.map((chip, i) => (
                                <motion.button
                                  key={i}
                                  initial={{ opacity: 0, x: -4 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
                                  onClick={() => sendMessageWithText(chip)}
                                  className="flex items-center gap-2 rounded-xl border border-[hsl(45,93%,49%)]/20 bg-[hsl(45,93%,49%)]/5 px-3 py-2.5 text-left text-[12px] font-medium text-white/85 transition-all hover:bg-[hsl(45,93%,49%)]/10 hover:border-[hsl(45,93%,49%)]/40 active:scale-[0.98]"
                                >
                                  <span className="text-[hsl(45,93%,49%)]">→</span>
                                  <span className="flex-1">{chip}</span>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}

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
                      <motion.div key={i} data-msg-idx={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.1 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
                        <p className="text-[10px] text-white/40 font-medium shrink-0 ml-2">
                          {remaining > 0 ? `${remaining}/5 pitanja` : "Limit dostignut"}
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
