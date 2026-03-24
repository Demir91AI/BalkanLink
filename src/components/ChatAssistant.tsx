import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Lock, Info, BookOpen, FileText, ClipboardList, Home, Briefcase, Users, FileCheck, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string; premiumGated?: boolean; guideSlug?: string | null };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const PLACEHOLDER: Record<string, string> = {
  bs: "Napiši šta ti treba (npr. Kindergeld, stan, posao...)",
  hr: "Napiši šta ti treba (npr. Kindergeld, stan, posao...)",
  sr: "Napiši šta ti treba (npr. Kindergeld, stan, posao...)",
  me: "Napiši šta ti treba (npr. Kindergeld, stan, posao...)",
  sq: "Shkruani çfarë ju nevojitet (p.sh. Kindergeld, banesë, punë...)",
  xk: "Shkruani çfarë ju nevojitet (p.sh. Kindergeld, banesë, punë...)",
  mk: "Напишете што ви треба (пр. Kindergeld, стан, работа...)",
  de: "Schreib, was du brauchst (z.B. Kindergeld, Wohnung, Job...)",
  en: "Write what you need (e.g. Kindergeld, apartment, job...)",
};

const HEADER_TITLE: Record<string, string> = {
  bs: "Kako ti mogu pomoći danas?",
  hr: "Kako ti mogu pomoći danas?",
  sr: "Kako ti mogu pomoći danas?",
  me: "Kako ti mogu pomoći danas?",
  sq: "Si mund t'ju ndihmoj sot?",
  xk: "Si mund t'ju ndihmoj sot?",
  mk: "Како можам да ви помогнам денес?",
  de: "Wie kann ich dir heute helfen?",
  en: "How can I help you today?",
};

const HEADER_SUBTITLE: Record<string, string> = {
  bs: "Riješi papire, posao i život u Njemačkoj — brzo i jednostavno",
  hr: "Riješi papire, posao i život u Njemačkoj — brzo i jednostavno",
  sr: "Reši papire, posao i život u Nemačkoj — brzo i jednostavno",
  me: "Riješi papire, posao i život u Njemačkoj — brzo i jednostavno",
  sq: "Zgjidh dokumentet, punën dhe jetën në Gjermani — shpejt dhe lehtë",
  xk: "Zgjidh dokumentet, punën dhe jetën në Gjermani — shpejt dhe lehtë",
  mk: "Реши документи, работа и живот во Германија — брзо и едноставно",
  de: "Erledige Papierkram, Job und Leben in Deutschland — schnell und einfach",
  en: "Sort out paperwork, job and life in Germany — fast and easy",
};

const ERROR_MSG: Record<string, string> = {
  bs: "Došlo je do greške. Pokušajte ponovo.", hr: "Došlo je do greške. Pokušajte ponovo.",
  sr: "Došlo je do greške. Pokušajte ponovo.", me: "Došlo je do greške. Pokušajte ponovo.",
  sq: "Ndodhi një gabim. Provoni përsëri.", xk: "Ndodhi një gabim. Provoni përsëri.",
  mk: "Настана грешка. Обидете се повторно.",
  de: "Ein Fehler ist aufgetreten. Versuchen Sie es erneut.",
  en: "An error occurred. Please try again.",
};

const DISCLAIMER: Record<string, string> = {
  bs: "Ovaj asistent daje informativne smjernice. Za konačne odluke konsultujte nadležnu instituciju.",
  hr: "Ovaj asistent daje informativne smjernice. Za konačne odluke konsultujte nadležnu instituciju.",
  sr: "Ovaj asistent daje informativne smernice. Za konačne odluke konsultujte nadležnu instituciju.",
  me: "Ovaj asistent daje informativne smjernice. Za konačne odluke konsultujte nadležnu instituciju.",
  sq: "Ky asistent ofron udhëzime informative. Për vendime përfundimtare konsultohuni me institucionin përkatës.",
  xk: "Ky asistent ofron udhëzime informative. Për vendime përfundimtare konsultohuni me institucionin përkatës.",
  mk: "Овој асистент дава информативни насоки. За конечни одлуки консултирајте ја надлежната институција.",
  de: "Dieser Assistent gibt informative Hinweise. Für endgültige Entscheidungen wenden Sie sich an die zuständige Behörde.",
  en: "This assistant provides informative guidance. For final decisions, consult the relevant authority.",
};

const SMART_GUIDE_PROMO: Record<string, string> = {
  bs: "Detaljno polje-po-polje popunjavanje formulara dostupno je u BalkanLink Premium Smart Guide vodiču.",
  hr: "Detaljno polje-po-polje popunjavanje formulara dostupno je u BalkanLink Premium Smart Guide vodiču.",
  sr: "Detaljno polje-po-polje popunjavanje formulara dostupno je u BalkanLink Premium Smart Guide vodiču.",
  me: "Detaljno polje-po-polje popunjavanje formulara dostupno je u BalkanLink Premium Smart Guide vodiču.",
  sq: "Plotësimi i detajuar fushë-për-fushë i formularëve disponohet në BalkanLink Premium Smart Guide.",
  xk: "Plotësimi i detajuar fushë-për-fushë i formularëve disponohet në BalkanLink Premium Smart Guide.",
  mk: "Детално поле-по-поле пополнување на формулари е достапно во BalkanLink Premium Smart Guide водичот.",
  de: "Detailliertes Feld-für-Feld-Ausfüllen von Formularen ist im BalkanLink Premium Smart Guide verfügbar.",
  en: "Detailed field-by-field form filling is available in the BalkanLink Premium Smart Guide.",
};

// ── Action buttons for start screen ──
interface ActionButton {
  icon: typeof FileText;
  label: Record<string, string>;
  message: Record<string, string>;
}

const ACTION_BUTTONS: ActionButton[] = [
  {
    icon: FileText,
    label: { bs: "Formulari i papiri", hr: "Formulari i papiri", sr: "Formulari i papiri", me: "Formulari i papiri", de: "Formulare & Dokumente", en: "Forms & Documents", sq: "Formularë & Dokumente", xk: "Formularë & Dokumente", mk: "Формулари и документи" },
    message: { bs: "Treba mi pomoć sa formularima i papirima u Njemačkoj.", hr: "Treba mi pomoć sa formularima i papirima u Njemačkoj.", sr: "Treba mi pomoć sa formularima i papirima u Nemačkoj.", me: "Treba mi pomoć sa formularima i papirima u Njemačkoj.", de: "Ich brauche Hilfe mit Formularen und Dokumenten.", en: "I need help with forms and documents in Germany.", sq: "Kam nevojë për ndihmë me formularë dhe dokumente.", xk: "Kam nevojë për ndihmë me formularë dhe dokumente.", mk: "Ми треба помош со формулари и документи." },
  },
  {
    icon: Home,
    label: { bs: "Nađi stan", hr: "Nađi stan", sr: "Nađi stan", me: "Nađi stan", de: "Wohnung finden", en: "Find apartment", sq: "Gjej banesë", xk: "Gjej banesë", mk: "Најди стан" },
    message: { bs: "Tražim stan u Njemačkoj. Možeš li mi pomoći?", hr: "Tražim stan u Njemačkoj. Možeš li mi pomoći?", sr: "Tražim stan u Nemačkoj. Možeš li mi pomoći?", me: "Tražim stan u Njemačkoj. Možeš li mi pomoći?", de: "Ich suche eine Wohnung in Deutschland. Kannst du mir helfen?", en: "I'm looking for an apartment in Germany. Can you help?", sq: "Po kërkoj një banesë në Gjermani. A mund të më ndihmosh?", xk: "Po kërkoj një banesë në Gjermani. A mund të më ndihmosh?", mk: "Барам стан во Германија. Можеш ли да ми помогнеш?" },
  },
  {
    icon: Briefcase,
    label: { bs: "Nađi posao", hr: "Nađi posao", sr: "Nađi posao", me: "Nađi posao", de: "Job finden", en: "Find a job", sq: "Gjej punë", xk: "Gjej punë", mk: "Најди работа" },
    message: { bs: "Tražim posao u Njemačkoj. Kako da počnem?", hr: "Tražim posao u Njemačkoj. Kako da počnem?", sr: "Tražim posao u Nemačkoj. Kako da počnem?", me: "Tražim posao u Njemačkoj. Kako da počnem?", de: "Ich suche einen Job in Deutschland. Wie fange ich an?", en: "I'm looking for a job in Germany. How do I start?", sq: "Po kërkoj punë në Gjermani. Si ta filloj?", xk: "Po kërkoj punë në Gjermani. Si ta filloj?", mk: "Барам работа во Германија. Како да почнам?" },
  },
  {
    icon: Users,
    label: { bs: "Porodica i socijala", hr: "Obitelj i socijala", sr: "Porodica i socijala", me: "Porodica i socijala", de: "Familie & Soziales", en: "Family & Social", sq: "Familja & Sociale", xk: "Familja & Sociale", mk: "Семејство и социјала" },
    message: { bs: "Trebam informacije o porodičnim davanjima (Kindergeld, Elterngeld, Bürgergeld).", hr: "Trebam informacije o obiteljskim davanjima (Kindergeld, Elterngeld, Bürgergeld).", sr: "Trebam informacije o porodičnim davanjima (Kindergeld, Elterngeld, Bürgergeld).", me: "Trebam informacije o porodičnim davanjima (Kindergeld, Elterngeld, Bürgergeld).", de: "Ich brauche Infos zu Familienleistungen (Kindergeld, Elterngeld, Bürgergeld).", en: "I need info about family benefits (Kindergeld, Elterngeld, Bürgergeld).", sq: "Kam nevojë për informacione mbi përfitimet familjare.", xk: "Kam nevojë për informacione mbi përfitimet familjare.", mk: "Ми требаат информации за семејни давачки." },
  },
  {
    icon: FileCheck,
    label: { bs: "Boravišna dozvola", hr: "Boravišna dozvola", sr: "Boravišna dozvola", me: "Boravišna dozvola", de: "Aufenthaltstitel", en: "Residence permit", sq: "Leja e qëndrimit", xk: "Leja e qëndrimit", mk: "Дозвола за престој" },
    message: { bs: "Trebam pomoć oko boravišne dozvole u Njemačkoj.", hr: "Trebam pomoć oko boravišne dozvole u Njemačkoj.", sr: "Trebam pomoć oko boravišne dozvole u Nemačkoj.", me: "Trebam pomoć oko boravišne dozvole u Njemačkoj.", de: "Ich brauche Hilfe mit meinem Aufenthaltstitel.", en: "I need help with my residence permit.", sq: "Kam nevojë për ndihmë me lejen e qëndrimit.", xk: "Kam nevojë për ndihmë me lejen e qëndrimit.", mk: "Ми треба помош околу дозволата за престој." },
  },
];

// ── Auto-trigger messages per route ──
const AUTO_TRIGGER: Record<string, Record<string, string>> = {
  "/wohnungen": {
    bs: "Treba pomoć oko pronalaska stana?",
    de: "Brauchst du Hilfe bei der Wohnungssuche?",
    en: "Need help finding an apartment?",
  },
  "/stellenangebote": {
    bs: "Treba pomoć oko pronalaska posla?",
    de: "Brauchst du Hilfe bei der Jobsuche?",
    en: "Need help finding a job?",
  },
  "/formulari": {
    bs: "Treba pomoć sa formularima?",
    de: "Brauchst du Hilfe mit Formularen?",
    en: "Need help with forms?",
  },
};

function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href && href.startsWith("/")) {
            return (
              <Link to={href} className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-500">
                {children}
              </Link>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-500">
              {children}
            </a>
          );
        },
        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
        ol: ({ children }) => <ol className="mb-1.5 list-decimal space-y-0.5 pl-5">{children}</ol>,
        ul: ({ children }) => <ul className="mb-1.5 list-disc space-y-0.5 pl-5">{children}</ul>,
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

// Detect guide slug from message text for CTA buttons
const TOPIC_GUIDE_MAP: Record<string, string> = {
  kindergeld: "kindergeld-kg1",
  kinderzuschlag: "kinderzuschlag",
  elterngeld: "elterngeld",
  elternzeit: "elternzeit",
  mutterschutz: "mutterschutz",
  bürgergeld: "buergergeld",
  burgergeld: "buergergeld",
  wohngeld: "wohngeld",
  bafög: "bafoeg",
  bafoeg: "bafoeg",
  anmeldung: "anmeldung",
  aufenthaltstitel: "aufenthaltstitel-verlaengerung",
  boravišn: "aufenthaltstitel-verlaengerung",
  boravisn: "aufenthaltstitel-verlaengerung",
  führungszeugnis: "fuehrungszeugnis",
  krankengeld: "krankengeld",
  pflegegrad: "pflegegrad",
  sozialhilfe: "sozialhilfe",
  unterhalt: "unterhalt",
  wbs: "wbs",
};

function detectGuideSlugFromText(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, slug] of Object.entries(TOPIC_GUIDE_MAP)) {
    if (lower.includes(keyword)) return slug;
  }
  return null;
}

export default function ChatAssistant() {
  const { language } = useLanguage();
  const { isPremium } = useAuth();
  const location = useLocation();
  const lk = language;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
  }, [open]);

  // Auto-trigger based on route
  useEffect(() => {
    const path = location.pathname;
    const trigger = AUTO_TRIGGER[path];
    if (trigger && !autoTriggered.has(path) && messages.length === 0) {
      setAutoTriggered(prev => new Set(prev).add(path));
      const msg = trigger[lk] || trigger["bs"] || trigger["en"];
      if (msg) {
        setTimeout(() => {
          setMessages([{ role: "assistant", content: msg }]);
          setOpen(true);
        }, 2000);
      }
    }
  }, [location.pathname, lk, autoTriggered, messages.length]);

  const handleAction = (actionMsg: string) => {
    setInput(actionMsg);
    setTimeout(() => {
      sendMessageWithText(actionMsg);
    }, 50);
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
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && !last.premiumGated) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar, guideSlug: detectedSlug } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar, guideSlug: detectedSlug }];
      });
    };

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
          language,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const contentType = resp.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await resp.json();
        if (data.smart_guide_redirect) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.content, guideSlug: data.guideSlug || detectedSlug },
          ]);
          setLoading(false);
          return;
        }
        if (data.premium_required) {
          const gateMsg = `${data.teaser}\n\n${data.cta}`;
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: gateMsg, premiumGated: true },
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

      if (headerSlug) {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, guideSlug: headerSlug } : m));
          }
          return prev;
        });
      }
    } catch {
      upsertAssistant(ERROR_MSG[lk]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, lk, isPremium, language]);

  const sendMessage = useCallback(() => {
    sendMessageWithText(input);
  }, [input, sendMessageWithText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating Orb Button ── */}
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
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-blue-500 to-purple-600 opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
              {/* Blob shape */}
              <div
                className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl group-active:scale-95"
                style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
              >
                <span className="text-white font-extrabold text-lg sm:text-xl select-none tracking-tight">BL</span>
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex h-[85vh] sm:h-[75vh] max-h-[650px] w-full sm:w-[420px] sm:max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-white/10 bg-card shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="relative overflow-hidden px-5 py-4" style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1">
                  <p className="text-[15px] font-bold leading-tight text-white">
                    {HEADER_TITLE[lk] || HEADER_TITLE["bs"]}
                  </p>
                  <p className="text-[11px] leading-snug text-white/70 mt-1">
                    {HEADER_SUBTITLE[lk] || HEADER_SUBTITLE["bs"]}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Decorative blur circles */}
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
            </div>

            {/* ── Messages ── */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
              {/* Start Screen */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {ACTION_BUTTONS.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.25 }}
                          onClick={() => handleAction(action.message[lk] || action.message["bs"])}
                          className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-800 group"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <span className="text-[13px] font-medium text-foreground">
                            {action.label[lk] || action.label["bs"]}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                      msg.role === "user"
                        ? "text-white shadow-md"
                        : msg.premiumGated
                        ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-foreground shadow-sm"
                        : "bg-muted text-foreground shadow-sm"
                    }`}
                    style={msg.role === "user" ? { background: "linear-gradient(135deg, #3B82F6, #9333EA)" } : undefined}
                  >
                    {msg.role === "assistant" ? (
                      <>
                        {msg.premiumGated && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <Lock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Premium</span>
                          </div>
                        )}

                        <ChatMarkdown content={msg.content} />

                        {msg.premiumGated && (
                          <div className="mt-3 flex flex-col gap-2">
                            <Link
                              to="/premium"
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-[12px] font-bold text-white transition hover:bg-amber-600"
                            >
                              <Lock className="h-3 w-3" />
                              Otključaj Premium
                            </Link>
                            <button
                              onClick={() => { setInput(""); inputRef.current?.focus(); }}
                              className="text-[11px] text-muted-foreground hover:text-foreground transition"
                            >
                              Postavi opće pitanje →
                            </button>
                          </div>
                        )}

                        {!msg.premiumGated && (
                          <div className="mt-3 space-y-2">
                            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 px-3 py-2">
                              <div className="flex items-start gap-2">
                                <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-snug">
                                  {SMART_GUIDE_PROMO[lk] || SMART_GUIDE_PROMO["bs"]}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              {msg.guideSlug && (
                                <Link
                                  to={`/formulari/${msg.guideSlug}`}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-white transition hover:opacity-90"
                                  style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}
                                >
                                  <BookOpen className="h-3.5 w-3.5" />
                                  {lk === "de" ? "Smart Guide starten" : lk === "en" ? "Start Smart Guide" : "Pokreni Smart Guide"}
                                </Link>
                              )}
                              <Link
                                to="/formulari"
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground transition hover:bg-accent"
                              >
                                <ClipboardList className="h-3.5 w-3.5" />
                                {lk === "de" ? "Alle Formulare ansehen" : lk === "en" ? "Browse all forms" : "Pogledaj sve formulare"}
                              </Link>
                            </div>

                            <div className="flex items-start gap-1.5 pt-1">
                              <Info className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/50" />
                              <p className="text-[10px] text-muted-foreground/60 leading-snug">
                                {DISCLAIMER[lk] || DISCLAIMER["bs"]}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl bg-muted px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Disclaimer bar ── */}
            <div className="px-3 py-1 border-t border-border/50">
              <p className="text-[9px] text-center text-muted-foreground/50">
                {DISCLAIMER[lk] || DISCLAIMER["bs"]}
              </p>
            </div>

            {/* ── Input ── */}
            <div className="border-t px-3 py-2.5">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={PLACEHOLDER[lk] || PLACEHOLDER["bs"]}
                  rows={1}
                  className="flex-1 resize-none rounded-xl border bg-background px-3.5 py-2.5 text-[13px] outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-200 disabled:opacity-40 hover:opacity-90 hover:shadow-md active:scale-95"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}
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
