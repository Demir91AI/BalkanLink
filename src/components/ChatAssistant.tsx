import { stripLangPrefix } from "@/lib/i18n-paths";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { X, Send, Copy, ShieldCheck, ExternalLink, BookOpen, ThumbsUp, ThumbsDown, Camera, Save, MessageCircle, Clock, User, Trash2, Minus } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";
import { useChatLimit } from "@/hooks/usePremiumAccess";
import { useTranslation } from "react-i18next";
import { chatScrollAction, followAfterScroll, mayPinOnResize, USER_GESTURE_WINDOW_MS } from "@/lib/chat-scroll";
import { nextStepCards } from "@/lib/assistant-next-steps";
import { clearConfirmedHistory } from "@/lib/phase1-reliability/history";
import { GUEST_CHAT_KEY, chatKeyFor, loadUserChat, purgeAllChats, saveUserChat } from "@/lib/chat-persistence";
import { consumeAssistantStream, createAssistantRequestLock } from "@/lib/assistant-stream";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ASSISTANT_GUIDE_SLUGS, detectAssistantGuide, assistantGuideRoute, autoLinkAssistantText } from "@/lib/assistant-links";
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

function isValidRoute(path: string): boolean {
  return isValidProductionRoute(path);
}

function extractFormMarkers(text: string): { cleanText: string; formSlugs: string[] } {
  const regex = /\[FORM:([a-z0-9-]+)\]/gi;
  const slugs: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (ASSISTANT_GUIDE_SLUGS.has(match[1]) && !slugs.includes(match[1])) slugs.push(match[1]);
  }
  const cleanText = text.replace(regex, "").replace(/\n{3,}/g, "\n\n").trim();
  return { cleanText, formSlugs: slugs };
}

const detectGuideSlugFromText = detectAssistantGuide;

// Quick starters
const STARTER_QUESTIONS = [
  { emoji: "📋", label: "Trebam Kindergeld", message: "Trebam Kindergeld" },
  { emoji: "✈️", label: "Viza za Bosnu", message: "Trebam vizu za Njemačku, državljanin sam Bosne i Hercegovine" },
  { emoji: "📄", label: "Šta je Anmeldung?", message: "Šta je Anmeldung i kako se prijaviti?" },
  { emoji: "💰", label: "Šta uključuje članstvo?", message: "Šta uključuje BalkanLink članstvo i koliko košta?" },
];

const DEFAULT_WELCOME = "Zdravo! 👋 Ja sam BalkanLink Asistent. Pomažem Balkancima u Njemačkoj da se snađu — od formulara do svakodnevnog života. Šta te muči?";
const ACTIVE_CHAT_STORAGE_KEY = GUEST_CHAT_KEY;
// Last scroll position of the chat list (memory only) so a remount/route change keeps the reading spot.
let savedScroll: { owner: string | null; top: number; following: boolean } | null = null;

// ── Detekcija pitanja o broju preostalih dnevnih pitanja (lokalno, bez AI) ──
const QUOTA_QUERY_RE = /\b(kol[iı]ko|kolko|koliko\s+jo[sš]?|jo[sš]?\s+kol[iı]ko|preostal|ostal[oa]?|ostalo)\b.*\b(pitanj|upit|kvot|limit)\b|\b(pitanj|upit|kvot|limit)\b.*\b(kol[iı]ko|kolko|preostal|ostal[oa]?)\b/i;

function isQuotaQuestion(text: string): boolean {
  const t = (text || "").trim().toLowerCase();
  if (!t) return false;
  if (/(kol[iı]ko|kolko)\s+(jo[sš]\s+)?(imam\s+)?(pitanja|upita)/i.test(t)) return true;
  if (/(jo[sš]\s+)?kol[iı]ko\s+pitanja/i.test(t)) return true;
  if (/(preostal|ostalo)\s+pitanja/i.test(t)) return true;
  return QUOTA_QUERY_RE.test(t);
}

function buildQuotaAnswer(): string {
  return `Imaš **neograničen broj pitanja**. 🎉\n\nPostavi mi šta god ti treba — formulari, vize, porez, stanovanje, posao u Njemačkoj.`;
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
  [/\b(Bürgergeld|bürgergeld)\b/gi, "/formulari/hauptantrag"],
  [/\b(Wohngeld|wohngeld|pomoć za kiriju)\b/gi, "/formulari/wohngeld"],
  [/\b(BAföG|bafög|stipendija)\b/gi, "/formulari/bafoeg"],
  [/\b(Führungszeugnis|führungszeugnis|potvrda o nekažnjavanju)\b/gi, "/formulari/fuehrungszeugnis"],
  [/\b(Steuerklassenwechsel|steuerklassenwechsel|Steuerklasse|steuerklasse|porezna klasa)\b/gi, "/formulari/steuerklassenwechsel"],
  [/\b(Sozialhilfe|socijalna pomoć)\b/gi, "/formulari/grundsicherung"],
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
  return autoLinkAssistantText(text, KEYWORD_LINKS);
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
        p: ({ children }) => <p className="mb-2 last:mb-0 break-words">{children}</p>,
        blockquote: ({ children }) => <blockquote className="my-2 border-l-2 border-[hsl(45,93%,49%)]/50 pl-3 text-white/75">{children}</blockquote>,
        code: ({ children }) => <code className="rounded bg-white/10 px-1 py-0.5 text-[12px]">{children}</code>,
        hr: () => <hr className="my-2 border-white/10" />,
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
function responseActionList(msg: Msg, t: (k: string) => string) {
  const actions: { label: string; to: string; icon: typeof BookOpen; primary?: boolean }[] = [];
  if (msg.redirectUrl && msg.redirectLabel && isValidRoute(msg.redirectUrl)) {
    actions.push({ label: msg.redirectLabel, to: msg.redirectUrl, icon: ExternalLink, primary: true });
  }
  if (msg.guideSlug && ASSISTANT_GUIDE_SLUGS.has(msg.guideSlug)) {
    actions.push({ label: t("assistantGuides.open"), to: assistantGuideRoute(msg.guideSlug), icon: BookOpen, primary: true });
  }
  if (msg.formSlugs?.length && ASSISTANT_GUIDE_SLUGS.has(msg.formSlugs[0])) {
    const fp = `/formulari/${msg.formSlugs[0]}`;
    if (!actions.some(a => a.to === fp)) actions.push({ label: t("assistantGuides.open"), to: fp, icon: ExternalLink });
  }
  if (msg.siteTopics) {
    for (const t of msg.siteTopics) {
      if (!isValidRoute(t.url) || actions.some(a => a.to === t.url) || actions.length >= 3) continue;
      actions.push({ label: t.label, to: t.url, icon: ExternalLink });
    }
  }
  return actions.slice(0, 3);
}

function ResponseActions({ msg }: { msg: Msg }) {
  const { t } = useTranslation("common");
  const actions = responseActionList(msg, t);
  if (!actions.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {actions.map((a, i) => (
        <Link key={i} to={a.to} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${a.primary ? "bg-[hsl(45,93%,49%)] text-black hover:bg-[hsl(45,93%,55%)]" : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"}`}>
          <a.icon className="h-3 w-3" />{a.label}
        </Link>
      ))}
    </div>
  );
}

// ── Deterministic next-step cards (verified catalog only, no model call) ──
function NextStepCards({ msg, userText, onAsk }: { msg: Msg; userText: string; onAsk: (q: string) => void }) {
  const { t } = useTranslation("common");
  const exclude = responseActionList(msg, t).map(a => a.to);
  const cards = nextStepCards({ guideSlug: msg.guideSlug ?? null, userText, isValidRoute, excludeRoutes: exclude });
  if (!cards.length) return null;
  const cls = "inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-left text-[12px] font-medium text-white/85 transition-colors hover:border-[hsl(45,93%,49%)]/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(45,93%,49%)]";
  return (
    <nav aria-label={t("assistantNext.title")} className="mt-2">
      <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-white/45">{t("assistantNext.title")}</p>
      <div className="flex flex-wrap gap-1.5">
        {cards.map(c => c.kind === "route" ? (
          <Link key={c.to} to={c.to} className={cls}><BookOpen className="h-3.5 w-3.5 text-[hsl(45,93%,55%)]" aria-hidden="true" />{t(c.labelKey, c.labelVars)}</Link>
        ) : (
          <button key={c.questionKey} type="button" onClick={() => onAsk(t(c.questionKey, c.vars))} className={cls}>
            <MessageCircle className="h-3.5 w-3.5 text-[hsl(45,93%,55%)]" aria-hidden="true" />{t(c.labelKey, c.vars)}
          </button>
        ))}
      </div>
    </nav>
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
  const { t } = useTranslation('common');
  const { isPremium } = useAuth();
  const { recordQuery } = useChatLimit();
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

  // ── Chat persistence: device-local, scoped to one user AND one sign-in (see chat-persistence.ts).
  // Survives close/minimize, navigation, refresh and app restart while the same sign-in lasts;
  // a new sign-in (even of the same account) starts empty. Cloud rows are kept (no auto-delete)
  // but are NOT restored into the chat.
  const signInAt = (user as any)?.last_sign_in_at ?? null;
  const chatOwnerRef = useRef<string | null>(user?.id ?? null);
  const prevUserIdRef = useRef<string | null | undefined>(undefined);
  const restoredRef = useRef(false);
  // Track which messages have been synced to DB (by stable signature) to avoid duplicates
  const syncedSigsRef = useRef<Set<string>>(new Set());
  // Track ids of messages we received via realtime to avoid re-inserting them
  const remoteIdsRef = useRef<Set<string>>(new Set());
  const clearPending = useRef(false);
  const [clearing, setClearing] = useState(false);

  function msgSignature(m: Msg, idx: number): string {
    // Stable per-position signature (role + first 80 chars + index)
    return `${idx}|${m.role}|${(m.content || "").slice(0, 80)}`;
  }

  function loadGuestMessages(): Msg[] {
    try {
      const raw = localStorage.getItem(GUEST_CHAT_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? (parsed as Msg[]) : [];
    } catch { try { localStorage.removeItem(GUEST_CHAT_KEY); } catch {} return []; }
  }

  function loadOwnedMessages(userId: string | null | undefined): Msg[] {
    if (!userId) return loadGuestMessages();
    return loadUserChat<Msg>(localStorage, userId, signInAt);
  }

  const [messages, setMessages] = useState<Msg[]>(() => {
    const restored = loadOwnedMessages(user?.id);
    if (user?.id) restoredRef.current = true;
    restored.forEach((m, i) => syncedSigsRef.current.add(msgSignature(m, i)));
    return restored;
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
  const followingRef = useRef(true);
  const touchingRef = useRef(false);
  const lastGestureAtRef = useRef(0);
  const [showLatest, setShowLatest] = useState(false);
  const { t: tc } = useTranslation("common");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastFailedMsgRef = useRef<string | null>(null);
  const requestLockRef = useRef(createAssistantRequestLock());

  // Account switch / sign-in / sign-out: swap the chat to the new owner's own sign-in cache.
  // Runs before the persist effect, which only reacts to `messages`, so old messages are never
  // written under the new owner's key.
  useEffect(() => {
    const nextOwner = user?.id ?? null;
    if (chatOwnerRef.current === nextOwner && prevUserIdRef.current !== undefined) return;
    const changed = chatOwnerRef.current !== nextOwner;
    chatOwnerRef.current = nextOwner;
    prevUserIdRef.current = nextOwner;
    if (!changed) return;
    if (nextOwner) { try { localStorage.removeItem(GUEST_CHAT_KEY); } catch {} }
    syncedSigsRef.current.clear();
    remoteIdsRef.current.clear();
    const next = loadOwnedMessages(nextOwner);
    next.forEach((m, i) => syncedSigsRef.current.add(msgSignature(m, i)));
    restoredRef.current = !!nextOwner;
    followingRef.current = true;
    savedScroll = null;
    setMessages(next);
  }, [user?.id]);

  // Persist messages (device-local) for the current owner only.
  useEffect(() => {
    const owner = chatOwnerRef.current;
    if (owner) saveUserChat(localStorage, owner, signInAt, messages);
    else {
      try {
        if (messages.length > 0) localStorage.setItem(GUEST_CHAT_KEY, JSON.stringify(messages));
        else localStorage.removeItem(GUEST_CHAT_KEY);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Another tab signed out / cleared this chat → drop it here too.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      const owner = chatOwnerRef.current;
      if (!owner || e.key === null) { if (e.key === null) setMessages([]); return; }
      if (e.key === chatKeyFor(owner) && e.newValue === null) setMessages([]);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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
  const clearChat = useCallback(async () => {
    if (messages.length === 0 || clearPending.current || loading) return;
    const ok = window.confirm(t('reliability.clearConfirm'));
    if (!ok) return;
    clearPending.current = true; setClearing(true);
    try {
      await clearConfirmedHistory(
        async () => user?.id
          ? await supabase.from("chat_messages").delete().eq("user_id", user.id)
          : { error: null },
        () => {
          setMessages([]);
          syncedSigsRef.current.clear();
          remoteIdsRef.current.clear();
          if (chatOwnerRef.current) localStorage.removeItem(chatKeyFor(chatOwnerRef.current));
          localStorage.removeItem(ACTIVE_CHAT_STORAGE_KEY);
        },
      );
      toast.success(t('reliability.clearSuccess'), {
        description: t(user?.id ? 'reliability.clearCloudSuccess' : 'reliability.clearLocalSuccess'), duration: 3000,
      });
    } catch { toast.error(t('reliability.clearFailed')); }
    finally { clearPending.current = false; setClearing(false); }
  }, [messages.length, user?.id, loading, t]);

  // On real sign-out (also fired in other open tabs): wipe every local chat cache and the
  // in-memory chat. Cloud rows are NOT deleted automatically (the session is already gone at
  // this point, so RLS would reject it anyway); only the explicit Trash action deletes them.
  useEffect(() => {
    const handleSignOut = () => {
      setMessages([]);
      syncedSigsRef.current.clear();
      remoteIdsRef.current.clear();
      purgeAllChats(localStorage);
      restoredRef.current = false;
      savedScroll = null;
      followingRef.current = true;
      // Reset panel: na sljedećem ulasku na home FAB se NE smije pojaviti
      openedThisSessionRef.current = false;
      try { localStorage.removeItem(ASSISTANT_PANEL_STATE_KEY); } catch {}
      setPanelState("closed");
    };
    window.addEventListener("bl:user-signed-out", handleSignOut);
    return () => window.removeEventListener("bl:user-signed-out", handleSignOut);
  }, []);

  // Load chat lang preference
  useEffect(() => {
    const saved = localStorage.getItem("bl-lang");
    if (saved === "de") setChatLang("de");
  }, []);

  // Scroll rules (see chat-scroll.ts): only the user's own scrolling (touch/wheel/keys/scrollbar)
  // detaches or re-attaches; content growth, streaming chunks, the typing line, keyboard resize,
  // focus and remounts never move a reader who scrolled up. Sending a message re-attaches.
  const prevLenRef = useRef(messages.length);
  const pinToBottom = useCallback(() => {
    const c = scrollRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, []);
  useEffect(() => {
    if (!scrollRef.current) return;
    const grew = messages.length > prevLenRef.current;
    prevLenRef.current = messages.length;
    const last = messages[messages.length - 1];
    const justSent = grew && last?.role === "user";
    const action = chatScrollAction({ justSent, following: followingRef.current, streaming: loading, touching: touchingRef.current });
    if (action === "user-top") {
      followingRef.current = true;
      setShowLatest(false);
      pinToBottom();
    } else if (action === "bottom") {
      pinToBottom();
    } else if (!followingRef.current) {
      setShowLatest(true);
    }
  }, [messages, loading, showOnboarding, showBenefitCalc, pinToBottom]);

  // On (re)open or remount: restore this owner's reading spot if they had scrolled up, else newest.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      const c = scrollRef.current;
      if (!c) return;
      const saved = savedScroll;
      if (saved && saved.owner === chatOwnerRef.current && !saved.following) {
        c.scrollTop = saved.top;
        followingRef.current = false;
        setShowLatest(true);
      } else {
        c.scrollTop = c.scrollHeight;
        followingRef.current = true;
        setShowLatest(false);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Mobile keyboard / viewport resize: keep newest visible only while following.
  useEffect(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!open) return;
    const onResize = () => {
      if (mayPinOnResize({ following: followingRef.current, touching: touchingRef.current })) pinToBottom();
    };
    vv?.addEventListener("resize", onResize);
    window.addEventListener("resize", onResize);
    return () => { vv?.removeEventListener("resize", onResize); window.removeEventListener("resize", onResize); };
  }, [open, pinToBottom]);

  const markGesture = useCallback(() => { lastGestureAtRef.current = Date.now(); }, []);
  const detach = useCallback(() => {
    markGesture();
    if (followingRef.current) { followingRef.current = false; }
  }, [markGesture]);
  const gestureHandlers = {
    onWheel: (e: React.WheelEvent) => { if (e.deltaY < 0) detach(); else markGesture(); },
    onTouchStart: () => { touchingRef.current = true; markGesture(); },
    onTouchMove: () => { touchingRef.current = true; markGesture(); },
    onTouchEnd: () => { touchingRef.current = false; markGesture(); },
    onTouchCancel: () => { touchingRef.current = false; markGesture(); },
    onPointerDown: (e: React.PointerEvent) => { if (e.target === e.currentTarget) markGesture(); },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (["PageUp", "ArrowUp", "Home"].includes(e.key)) detach();
      else if (["PageDown", "ArrowDown", "End", " "].includes(e.key)) markGesture();
    },
  };

  const handleChatScroll = useCallback(() => {
    const c = scrollRef.current;
    if (!c) return;
    const userInitiated = touchingRef.current || Date.now() - lastGestureAtRef.current < USER_GESTURE_WINDOW_MS;
    const following = followAfterScroll({ wasFollowing: followingRef.current, userInitiated, metrics: c });
    followingRef.current = following;
    setShowLatest(!following);
    savedScroll = { owner: chatOwnerRef.current, top: c.scrollTop, following };
  }, []);

  const jumpToLatest = useCallback(() => {
    const c = scrollRef.current;
    if (!c) return;
    followingRef.current = true;
    lastGestureAtRef.current = 0;
    setShowLatest(false);
    savedScroll = null;
    c.scrollTo({ top: c.scrollHeight, behavior: "smooth" });
  }, []);

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
    if (clearPending.current) return;
    const file = e.target.files?.[0];
    if (!file || !requestLockRef.current.acquire()) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const mimeType = file.type || "image/jpeg";

      const userMsg: Msg = { role: "user", content: `📎 Uploadovao sam dokument: ${file.name}` };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setLoading(true);

      try {
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
        requestLockRef.current.release();
      }
    };
    reader.onerror = reader.onabort = () => { requestLockRef.current.release(); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const streamResponse = async (resp: Response, userText: string) => {
    let assistantSoFar = "";
    const detectedSlug = detectGuideSlugFromText(userText);
    let flushFrame: number | null = null;

    const flushToState = () => {
      flushFrame = null;
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
      if (flushFrame === null) {
        flushFrame = requestAnimationFrame(flushToState);
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

    if (!resp.body) throw new Error("ASSISTANT_STREAM_MISSING");
    try {
      await consumeAssistantStream(resp.body, content => {
        assistantSoFar += content;
        scheduleFlush();
      });
    } finally {
      if (flushFrame !== null) cancelAnimationFrame(flushFrame);
      // Preserve received text even on interruption; no late frame may overwrite the error.
      if (assistantSoFar) flushToState();
    }

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
    if (!text.trim() || loading || clearPending.current) return;

    // Lokalni odgovor na pitanja o broju preostalih pitanja — bez poziva AI-a
    if (isQuotaQuestion(text)) {
      setMessages(prev => [...prev,
        { role: "user", content: text.trim() },
        {
          role: "assistant",
          content: buildQuotaAnswer(),
        },
      ]);
      setInput("");
      return;
    }

    if (!requestLockRef.current.acquire()) return;
    setLoading(true);
    try {
      await recordQuery();
      const userMsg: Msg = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
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
            redirectUrl: data.redirect_url || "/paketi",
            redirectLabel: data.redirect_label || "Pogledaj članstvo",
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
      requestLockRef.current.release();
    }
  }, [loading, messages, isPremium, chatLang, location.pathname, recordQuery]);

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
      {/* ── Floating Trigger (single instance) ──
          Ostale stranice: kad je minimiziran (kao ranije). Homepage: na mobilnom
          uvijek dok panel nije otvoren; na desktopu samo nakon otvaranja u sesiji. */}
      <AnimatePresence>
        {!open && (stripLangPrefix(location.pathname) === "/" || panelState === "minimized") && (
          <motion.button
            type="button"
            aria-label={t("assistantFab.open")}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={`fixed right-4 z-50 group cursor-pointer rounded-full bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] md:bottom-6 md:right-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1526] ${stripLangPrefix(location.pathname) === "/" && !(panelState === "minimized" && openedThisSessionRef.current) ? "md:hidden" : ""}`}
            onClick={openAssistant}
          >
            <span aria-hidden className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[hsl(220,30%,12%)] border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              {t("assistantFab.open")}
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-md ring-1 ring-amber-300/40 overflow-hidden" style={{ background: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)" }}>
              <BLIcon size={22} />
              {hasUnread && (
                <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 border border-[#0d1526]" />
              )}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div data-pull-refresh="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={handleMinimize} className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm" />

            <motion.div
              data-pull-refresh="off"
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
                    <Button variant="ghost" size="icon"
                      onClick={clearChat}
                      disabled={clearing || loading}
                      className="h-auto w-auto shrink-0 p-1.5"
                      title={t('reliability.clearAction')}
                      aria-label={t('reliability.clearAction')}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
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
                  <div className="relative flex-1 min-h-0 flex flex-col">
                  <div ref={scrollRef} onScroll={handleChatScroll} {...gestureHandlers} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
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

                          {/* Feedback + Actions for assistant messages. Only the answer that is still arriving hides them;
                              earlier answers keep theirs so content above a reader never shrinks/grows during streaming. */}
                          {msg.role === "assistant" && !(loading && i === messages.length - 1) && (
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
                              {i === messages.length - 1 && !(msg as any)._retry && (
                                <NextStepCards msg={msg} userText={messages[i - 1]?.role === "user" ? messages[i - 1].content : ""} onAsk={sendMessageWithText} />
                              )}
                              {msg.suggestions && msg.suggestions.length > 0 && !(i === messages.length - 1 && nextStepCards({ guideSlug: msg.guideSlug ?? null, userText: messages[i - 1]?.content ?? "", isValidRoute }).length > 0) && (
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                  {msg.suggestions.slice(0, 3).map((s, si) => (
                                    <button key={si} disabled={loading} onClick={() => sendMessageWithText(s)} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/60 hover:text-white/80 hover:border-[hsl(45,93%,49%)]/30 transition-all disabled:opacity-50">
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
                        <div role="status" aria-live="polite" className="inline-flex items-center gap-2 rounded-xl rounded-bl-none px-3 py-2 text-[12px] text-white/70" style={{ background: "#1F2937" }}>
                          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(45,93%,55%)] motion-safe:animate-pulse" aria-hidden="true" />
                          {tc("chatScroll.preparing")}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  {/* Overlay (outside the scroll content) so showing/hiding it never changes the list height. */}
                  {showLatest && (
                    <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none">
                      <button type="button" onClick={jumpToLatest} className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-[hsl(45,93%,49%)]/40 bg-[#111827] px-3 py-1.5 text-[11px] font-semibold text-[hsl(45,93%,60%)] shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(45,93%,49%)]">
                        ↓ {tc("chatScroll.latest")}
                      </button>
                    </div>
                  )}
                  </div>

                  {/* Disclaimer */}
                  <div className="px-4 py-1 border-t border-white/5 shrink-0">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/60 shrink-0" />
                      <p className="text-[10px] text-white/60">BalkanLink Asistent daje orijentacione informacije, ne pravni savjet.</p>
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
