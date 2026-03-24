import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Lock, Info, BookOpen, FileText, ClipboardList, Home, Briefcase, Users, FileCheck, PenLine, FileSignature, Mail, CheckSquare, Copy, ShieldCheck, ExternalLink, AlertTriangle, ArrowRight, Sparkles, Zap, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { formCatalog, type FormEntry } from "@/lib/form-catalog";

type Msg = {
  role: "user" | "assistant";
  content: string;
  premiumGated?: boolean;
  softUpsell?: boolean;
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

// ── Detect current form from URL ──

function detectFormFromPath(pathname: string): FormEntry | null {
  const match = pathname.match(/\/formulari\??.*form=([a-z0-9-]+)/i);
  if (match) return getFormBySlug(match[1]) || null;
  // Also check /formulari/slug pattern
  const slugMatch = pathname.match(/\/formulari\/([a-z0-9-]+)/i);
  if (slugMatch) return getFormBySlug(slugMatch[1]) || null;
  return null;
}

function isOnFormPage(pathname: string, search: string): FormEntry | null {
  // Check query param ?form=slug
  const params = new URLSearchParams(search);
  const formParam = params.get("form");
  if (formParam) return getFormBySlug(formParam) || null;
  return detectFormFromPath(pathname);
}

// ── i18n constants ──

const PLACEHOLDER: Record<string, string> = {
  bs: "Napiši šta ti treba, npr. Kindergeld, stan, Kündigung...",
  de: "Schreib, was du brauchst (z.B. Kindergeld, Wohnung, Job...)",
  en: "Write what you need (e.g. Kindergeld, apartment, job...)",
};

const HEADER_TITLE: Record<string, string> = {
  bs: "Kako ti mogu pomoći danas?",
  de: "Wie kann ich dir heute helfen?",
  en: "How can I help you today?",
};

const HEADER_SUBTITLE: Record<string, string> = {
  bs: "Riješi formulare, dokumente, posao i život u Njemačkoj na jednom mjestu.",
  de: "Formulare, Dokumente, Job und Leben in Deutschland — alles an einem Ort.",
  en: "Forms, documents, jobs and life in Germany — all in one place.",
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

const DATA_NOTICE: Record<string, string> = {
  bs: "Uneseni podaci se koriste samo tokom ove sesije i ne pohranjuju se trajno.",
  de: "Eingegebene Daten werden nur in dieser Sitzung verwendet und nicht dauerhaft gespeichert.",
  en: "Entered data is used only during this session and is not stored permanently.",
};

const INPUT_WARNING: Record<string, string> = {
  bs: "Ne unosite osjetljive podatke (broj dokumenta, bankovne podatke).",
  de: "Geben Sie keine sensiblen Daten ein (Dokumentennummer, Bankdaten).",
  en: "Do not enter sensitive data (document numbers, bank details).",
};

const PREMIUM_CTA_LABELS: Record<string, { activate: string; features: string[]; price: string; social: string; skip: string }> = {
  bs: {
    activate: "Aktiviraj Premium",
    features: ["Svi formulari korak-po-korak", "Personalizovani odgovori", "Template poruke (stan, posao)", "Checklist generator"],
    price: "7.99€ / mjesec",
    social: "Većina korisnika uz vodič završi prijavu bez greške iz prvog pokušaja.",
    skip: "Nastavi bez vodiča",
  },
  de: {
    activate: "Premium aktivieren",
    features: ["Alle Formulare Schritt-für-Schritt", "Personalisierte Antworten", "Vorlagen (Wohnung, Job)", "Checklisten-Generator"],
    price: "7,99€ / Monat",
    social: "Die meisten Nutzer erledigen ihren Antrag beim ersten Mal fehlerfrei.",
    skip: "Ohne Guide fortfahren",
  },
  en: {
    activate: "Activate Premium",
    features: ["All forms step-by-step", "Personalized answers", "Template messages (apartment, job)", "Checklist generator"],
    price: "€7.99 / month",
    social: "Most users complete their application error-free on the first try.",
    skip: "Continue without guide",
  },
};

// ── Action buttons ──

interface ActionButton {
  icon: typeof FileText;
  label: Record<string, string>;
  message: Record<string, string>;
  accent?: string;
}

const MAIN_ACTIONS: ActionButton[] = [
  {
    icon: FileText,
    label: { bs: "Formulari i papiri", de: "Formulare & Dokumente", en: "Forms & Documents" },
    message: { bs: "Koji formulari postoje na BalkanLinku? Pokaži mi najvažnije.", de: "Welche Formulare gibt es auf BalkanLink?", en: "What forms are available on BalkanLink?" },
    accent: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Users,
    label: { bs: "Kindergeld", de: "Kindergeld", en: "Kindergeld" },
    message: { bs: "Trebam informacije o Kindergeld-u.", de: "Ich brauche Infos zum Kindergeld.", en: "I need info about Kindergeld." },
    accent: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: Home,
    label: { bs: "Stan i prijava", de: "Wohnung & Anmeldung", en: "Apartment & Registration" },
    message: { bs: "Tražim stan i trebam pomoć sa prijavom.", de: "Ich suche eine Wohnung und brauche Hilfe bei der Anmeldung.", en: "I'm looking for an apartment and need help with registration." },
    accent: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: Briefcase,
    label: { bs: "Posao", de: "Job", en: "Job" },
    message: { bs: "Tražim posao u Njemačkoj.", de: "Ich suche einen Job in Deutschland.", en: "I'm looking for a job in Germany." },
    accent: "from-violet-500/10 to-purple-500/10",
  },
  {
    icon: FileCheck,
    label: { bs: "Boravišna dozvola", de: "Aufenthaltstitel", en: "Residence permit" },
    message: { bs: "Trebam pomoć oko boravišne dozvole.", de: "Ich brauche Hilfe mit meinem Aufenthaltstitel.", en: "I need help with my residence permit." },
    accent: "from-rose-500/10 to-pink-500/10",
  },
];

const QUICK_ACTIONS: ActionButton[] = [
  {
    icon: FileSignature,
    label: { bs: "Napiši Kündigung", de: "Kündigung schreiben", en: "Write cancellation" },
    message: { bs: "Trebam pomoć da napišem Kündigung.", de: "Ich brauche Hilfe beim Schreiben einer Kündigung.", en: "I need help writing a cancellation letter." },
  },
  {
    icon: Briefcase,
    label: { bs: "Napravi Bewerbung", de: "Bewerbung erstellen", en: "Create application" },
    message: { bs: "Trebam pomoć da napravim Bewerbung.", de: "Ich brauche Hilfe bei der Erstellung einer Bewerbung.", en: "I need help creating a job application." },
  },
  {
    icon: Mail,
    label: { bs: "Poruka za stan", de: "Wohnungsnachricht", en: "Apartment message" },
    message: { bs: "Trebam gotovu poruku za stanodavca.", de: "Ich brauche eine fertige Nachricht für den Vermieter.", en: "I need a ready-made message for a landlord." },
  },
  {
    icon: PenLine,
    label: { bs: "Napiši email", de: "E-Mail schreiben", en: "Write email" },
    message: { bs: "Trebam pomoć da napišem službeni email na njemačkom.", de: "Ich brauche Hilfe beim Schreiben einer offiziellen E-Mail.", en: "I need help writing an official email." },
  },
  {
    icon: CheckSquare,
    label: { bs: "Napravi checklistu", de: "Checkliste erstellen", en: "Create checklist" },
    message: { bs: "Trebam personalizovanu checklistu.", de: "Ich brauche eine personalisierte Checkliste.", en: "I need a personalized checklist." },
  },
];

// ── Guide slug detection (client-side) ──

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

// ── Form Card Component ──

function FormCard({ slug, lk }: { slug: string; lk: string }) {
  const form = getFormBySlug(slug);
  if (!form) return null;

  const labels = {
    openForm: lk === "de" ? "Formular öffnen" : lk === "en" ? "Open form" : "Otvori formular",
    startGuide: lk === "de" ? "Smart Guide starten" : lk === "en" ? "Start Smart Guide" : "Pokreni Smart Guide",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border/60 bg-gradient-to-br from-muted/40 to-muted/20 p-3 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-foreground truncate">{form.label}</p>
          <p className="text-[10px] text-muted-foreground leading-snug">{form.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <Link
          to={`/formulari?form=${slug}`}
          className="flex items-center justify-center gap-1 rounded-lg border border-border bg-background px-2 py-2 text-[10px] font-medium text-foreground transition hover:bg-accent"
        >
          <ExternalLink className="h-3 w-3" /> {labels.openForm}
        </Link>
        <Link
          to={`/formulari?form=${slug}`}
          className="flex items-center justify-center gap-1 rounded-lg bg-primary px-2 py-2 text-[10px] font-bold text-primary-foreground transition hover:bg-primary/90"
        >
          <BookOpen className="h-3 w-3" /> {labels.startGuide}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Premium Upsell Card ──

function PremiumUpsellCard({ lk, onSkip }: { lk: string; onSkip: () => void }) {
  const labels = PREMIUM_CTA_LABELS[lk] || PREMIUM_CTA_LABELS["bs"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-purple-200/60 dark:border-purple-800/30 bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-950/20 dark:to-blue-950/20 p-3.5"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <Lock className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
        <span className="text-[12px] font-bold text-purple-700 dark:text-purple-300">
          {lk === "de" ? "Alle Guides freischalten" : lk === "en" ? "Unlock all guides" : "Otključaj sve vodiče"}
        </span>
      </div>

      <div className="space-y-1 mb-2.5">
        {labels.features.map((f, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-purple-500 shrink-0" />
            <span className="text-[10px] text-purple-700 dark:text-purple-300">{f}</span>
          </div>
        ))}
      </div>

      <p className="text-[9px] text-purple-600/60 dark:text-purple-400/60 mb-2.5 italic">{labels.social}</p>

      <div className="flex flex-col gap-1.5">
        <Link
          to="/premium"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-bold text-primary-foreground transition hover:bg-primary/90"
        >
          <Lock className="h-3 w-3" /> {labels.activate} — {labels.price}
        </Link>
        <button onClick={onSkip} className="text-[10px] text-muted-foreground hover:text-foreground transition py-0.5">
          {labels.skip} →
        </button>
      </div>
    </motion.div>
  );
}

// ── Context Banner (shown when user opens chat on a form page) ──

function FormContextBanner({ form, lk, onAction }: { form: FormEntry; lk: string; onAction: (msg: string) => void }) {
  const actions = [
    { label: lk === "de" ? "Smart Guide starten" : "Pokreni Smart Guide", msg: `Pokreni Smart Guide za ${form.label}` },
    { label: lk === "de" ? "Dokumente" : "Dokumenti", msg: `Koji dokumenti mi trebaju za ${form.label}?` },
    { label: lk === "de" ? "Häufige Fehler" : "Česte greške", msg: `Koje su najčešće greške kod ${form.label}?` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-primary/20 bg-primary/5 p-3 mb-2"
    >
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-3.5 w-3.5 text-primary" />
        <p className="text-[11px] text-foreground leading-snug">
          {lk === "de"
            ? `Du bist auf: **${form.label}**. Ich kann dir Schritt für Schritt helfen.`
            : `Trenutno si na: **${form.label}**. Mogu ti pomoći korak po korak.`}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => onAction(a.msg)}
            className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] font-medium text-foreground transition hover:bg-accent hover:border-primary/30"
          >
            {a.label}
          </button>
        ))}
      </div>
    </motion.div>
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

  // Detect if user is on a form page
  const activeForm = isOnFormPage(location.pathname, location.search);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
  }, [open]);

  const handleAction = (actionMsg: string) => {
    setInput(actionMsg);
    setTimeout(() => sendMessageWithText(actionMsg), 50);
  };

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
        if (last?.role === "assistant" && !last.premiumGated && !last.softUpsell) {
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
          const formSlugs = data.detectedForm ? [data.detectedForm.slug] : (data.guideSlug ? [data.guideSlug] : []);
          setMessages(prev => [...prev, { role: "assistant", content: `${data.teaser}\n\n${data.cta}`, premiumGated: true, formSlugs }]);
          setLoading(false);
          return;
        }
        if (data.soft_upsell) {
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: data.free_content },
            { role: "assistant", content: data.upsell_text, softUpsell: true, guideSlug: data.guideSlug || detectedSlug },
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
              {/* Glow */}
              <div className="absolute inset-[-6px] rounded-[32px] bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-xl group-hover:from-blue-500/50 group-hover:to-purple-600/50 transition-all duration-300" />
              {/* Button */}
              <div
                className="relative flex h-[60px] w-[60px] sm:h-[68px] sm:w-[68px] items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20 transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30 group-active:scale-95"
                style={{ borderRadius: "32% 68% 60% 40% / 40% 32% 68% 60%" }}
              >
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              {/* Notification dot when on form page */}
              {activeForm && (
                <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-background shadow-sm">
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                </div>
              )}
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
            {/* Header */}
            <div className="relative overflow-hidden px-4 py-3.5" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #9333EA 100%)" }}>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1 pr-2">
                  <p className="text-[14px] font-bold leading-tight text-white">{HEADER_TITLE[lk] || HEADER_TITLE["bs"]}</p>
                  <p className="text-[10px] leading-snug text-white/60 mt-0.5">{HEADER_SUBTITLE[lk] || HEADER_SUBTITLE["bs"]}</p>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/[0.06] blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/[0.06] blur-2xl" />
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
              {/* Context banner if on form page */}
              {showStartScreen && activeForm && (
                <FormContextBanner form={activeForm} lk={lk} onAction={handleAction} />
              )}

              {/* Start Screen */}
              {showStartScreen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-3">
                  {/* Section A: Main Actions */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1 mb-1.5">
                      {lk === "de" ? "Häufigste Aktionen" : lk === "en" ? "Most common" : "Najčešće radnje"}
                    </p>
                    <div className="space-y-1.5">
                      {MAIN_ACTIONS.map((action, i) => {
                        const Icon = action.icon;
                        return (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04, duration: 0.2 }}
                            onClick={() => handleAction(action.message[lk] || action.message["bs"])}
                            className="flex w-full items-center gap-2.5 rounded-xl border border-border/50 bg-background px-3 py-2.5 text-left transition-all duration-150 hover:shadow-sm hover:border-primary/20 group"
                          >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${action.accent || "from-blue-500/10 to-purple-500/10"} group-hover:scale-105 transition-transform`}>
                              <Icon className="h-3.5 w-3.5 text-foreground/70" />
                            </div>
                            <span className="text-[12px] font-medium text-foreground">{action.label[lk] || action.label["bs"]}</span>
                            <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section B: Quick Actions */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1 mb-1.5">
                      <Zap className="h-3 w-3 inline-block mr-0.5 -mt-0.5" />
                      {lk === "de" ? "Schnelle Aktionen" : lk === "en" ? "Quick Actions" : "Brze radnje"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_ACTIONS.map((action, i) => {
                        const Icon = action.icon;
                        return (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.03, duration: 0.15 }}
                            onClick={() => handleAction(action.message[lk] || action.message["bs"])}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5 text-[10px] font-medium text-foreground/80 transition hover:bg-muted/60 hover:border-primary/20"
                          >
                            <Icon className="h-3 w-3" />
                            {action.label[lk] || action.label["bs"]}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* GDPR notice */}
                  <div className="flex items-start gap-1.5 px-1 pt-1">
                    <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-[9px] text-muted-foreground/50 leading-snug">
                      {DATA_NOTICE[lk] || DATA_NOTICE["bs"]}
                    </p>
                  </div>
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
                  {msg.softUpsell ? (
                    <div className="max-w-[92%]">
                      <PremiumUpsellCard lk={lk} onSkip={() => inputRef.current?.focus()} />
                    </div>
                  ) : (
                    <div className="max-w-[92%] space-y-2">
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : msg.premiumGated
                            ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-foreground"
                            : "bg-muted/60 text-foreground shadow-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <>
                            {msg.premiumGated && (
                              <div className="flex items-center gap-1.5 mb-2">
                                <Lock className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">Premium</span>
                              </div>
                            )}

                            <ChatMarkdown content={msg.content} />

                            {!msg.premiumGated && msg.content.length > 200 && (
                              <button
                                onClick={() => copyToClipboard(msg.content, i)}
                                className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition"
                              >
                                <Copy className="h-3 w-3" />
                                {copied === i ? "✓" : "Kopiraj"}
                              </button>
                            )}

                            {msg.premiumGated && (
                              <div className="mt-2.5">
                                <PremiumUpsellCard lk={lk} onSkip={() => { setInput(""); inputRef.current?.focus(); }} />
                              </div>
                            )}
                          </>
                        ) : (
                          msg.content
                        )}
                      </div>

                      {/* Form Cards below message */}
                      {msg.role === "assistant" && msg.formSlugs && msg.formSlugs.length > 0 && (
                        <div className="space-y-1.5">
                          {msg.formSlugs.map(slug => (
                            <FormCard key={slug} slug={slug} lk={lk} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
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

            {/* Disclaimer footer */}
            <div className="px-3 py-1 border-t border-border/30">
              <p className="text-[8px] text-center text-muted-foreground/40">
                {DISCLAIMER[lk] || DISCLAIMER["bs"]}
              </p>
            </div>

            {/* Input area */}
            <div className="border-t border-border/50 px-3 py-2">
              <div className="flex items-center gap-1 mb-1 px-0.5">
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
