import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Lock, Info, BookOpen, FileText, ClipboardList, Home, Briefcase, Users, FileCheck, PenLine, FileSignature, Mail, CheckSquare, Copy, ShieldCheck, ExternalLink, AlertTriangle, ArrowRight } from "lucide-react";
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

// ── Extract [FORM:slug] markers from text ──

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

// ── i18n constants ──

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
  bs: "BalkanLink Assistant", hr: "BalkanLink Assistant",
  sr: "BalkanLink Assistant", me: "BalkanLink Assistant",
  sq: "BalkanLink Assistant", xk: "BalkanLink Assistant",
  mk: "BalkanLink Assistant",
  de: "BalkanLink Assistant", en: "BalkanLink Assistant",
};

const HEADER_SUBTITLE: Record<string, string> = {
  bs: "Digitalni asistent — postavite pitanje o životu i birokratiji u Njemačkoj",
  hr: "Digitalni asistent — postavite pitanje o životu i birokratiji u Njemačkoj",
  sr: "Digitalni asistent — postavite pitanje o životu i birokratiji u Nemačkoj",
  me: "Digitalni asistent — postavite pitanje o životu i birokratiji u Njemačkoj",
  sq: "Asistenti dixhital — bëni pyetje rreth jetës dhe burokracisë në Gjermani",
  xk: "Asistenti dixhital — bëni pyetje rreth jetës dhe burokracisë në Gjermani",
  mk: "Дигитален асистент — поставете прашање за животот и бирократијата во Германија",
  de: "Digitaler Assistent — Fragen zum Leben und Bürokratie in Deutschland",
  en: "Digital assistant — ask about life and bureaucracy in Germany",
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

const DATA_NOTICE: Record<string, string> = {
  bs: "Uneseni podaci se koriste samo za generisanje odgovora i ne pohranjuju se.",
  hr: "Uneseni podaci se koriste samo za generisanje odgovora i ne pohranjuju se.",
  sr: "Uneseni podaci se koriste samo za generisanje odgovora i ne pohranjuju se.",
  me: "Uneseni podaci se koriste samo za generisanje odgovora i ne pohranjuju se.",
  sq: "Të dhënat e futura përdoren vetëm për gjenerimin e përgjigjes dhe nuk ruhen.",
  xk: "Të dhënat e futura përdoren vetëm për gjenerimin e përgjigjes dhe nuk ruhen.",
  mk: "Внесените податоци се користат само за генерирање одговор и не се зачувуваат.",
  de: "Eingegebene Daten werden nur zur Antwortgenerierung verwendet und nicht gespeichert.",
  en: "Entered data is used only for response generation and is not stored.",
};

const INPUT_WARNING: Record<string, string> = {
  bs: "Ne unosite osjetljive podatke (broj dokumenta, bankovne podatke).",
  hr: "Ne unosite osjetljive podatke (broj dokumenta, bankovne podatke).",
  sr: "Ne unosite osetljive podatke (broj dokumenta, bankovne podatke).",
  me: "Ne unosite osjetljive podatke (broj dokumenta, bankovne podatke).",
  sq: "Mos futni të dhëna të ndjeshme (numër dokumenti, të dhëna bankare).",
  xk: "Mos futni të dhëna të ndjeshme (numër dokumenti, të dhëna bankare).",
  mk: "Не внесувајте чувствителни податоци (број на документ, банкарски податоци).",
  de: "Geben Sie keine sensiblen Daten ein (Dokumentennummer, Bankdaten).",
  en: "Do not enter sensitive data (document numbers, bank details).",
};

const PREMIUM_CTA_LABELS: Record<string, { activate: string; features: string[]; price: string; social: string; skip: string }> = {
  bs: {
    activate: "Aktiviraj Premium",
    features: [
      "Svi formulari korak-po-korak",
      "Personalizovani odgovori",
      "Template poruke (stan, posao)",
      "Checklist generator",
    ],
    price: "7.99€ / mjesec",
    social: "Većina korisnika uz vodič završi prijavu bez greške iz prvog pokušaja.",
    skip: "Nastavi bez vodiča",
  },
  de: {
    activate: "Premium aktivieren",
    features: [
      "Alle Formulare Schritt-für-Schritt",
      "Personalisierte Antworten",
      "Vorlagen (Wohnung, Job)",
      "Checklisten-Generator",
    ],
    price: "7,99€ / Monat",
    social: "Die meisten Nutzer erledigen ihren Antrag beim ersten Mal fehlerfrei.",
    skip: "Ohne Guide fortfahren",
  },
  en: {
    activate: "Activate Premium",
    features: [
      "All forms step-by-step",
      "Personalized answers",
      "Template messages (apartment, job)",
      "Checklist generator",
    ],
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
}

const ACTION_BUTTONS: ActionButton[] = [
  {
    icon: FileText,
    label: { bs: "Formulari i papiri", de: "Formulare & Dokumente", en: "Forms & Documents" },
    message: { bs: "Koji formulari postoje na BalkanLinku? Pokaži mi najvažnije.", de: "Welche Formulare gibt es auf BalkanLink? Zeig mir die wichtigsten.", en: "What forms are available on BalkanLink? Show me the most important ones." },
  },
  {
    icon: Home,
    label: { bs: "Nađi stan", de: "Wohnung finden", en: "Find apartment" },
    message: { bs: "Tražim stan u Njemačkoj. Možeš li mi pomoći?", de: "Ich suche eine Wohnung in Deutschland. Kannst du mir helfen?", en: "I'm looking for an apartment in Germany. Can you help?" },
  },
  {
    icon: Briefcase,
    label: { bs: "Nađi posao", de: "Job finden", en: "Find a job" },
    message: { bs: "Tražim posao u Njemačkoj. Kako da počnem?", de: "Ich suche einen Job in Deutschland. Wie fange ich an?", en: "I'm looking for a job in Germany. How do I start?" },
  },
  {
    icon: Users,
    label: { bs: "Porodica i socijala", de: "Familie & Soziales", en: "Family & Social" },
    message: { bs: "Trebam informacije o porodičnim davanjima (Kindergeld, Elterngeld, Bürgergeld).", de: "Ich brauche Infos zu Familienleistungen (Kindergeld, Elterngeld, Bürgergeld).", en: "I need info about family benefits (Kindergeld, Elterngeld, Bürgergeld)." },
  },
  {
    icon: FileCheck,
    label: { bs: "Boravišna dozvola", de: "Aufenthaltstitel", en: "Residence permit" },
    message: { bs: "Trebam pomoć oko boravišne dozvole u Njemačkoj.", de: "Ich brauche Hilfe mit meinem Aufenthaltstitel.", en: "I need help with my residence permit." },
  },
];

// ── Task Engine: Quick Actions ──

interface QuickAction {
  icon: typeof PenLine;
  label: Record<string, string>;
  message: Record<string, string>;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: FileSignature,
    label: { bs: "Kündigung napisati", de: "Kündigung schreiben", en: "Write cancellation" },
    message: { bs: "Trebam pomoć da napišem Kündigung (otkaz/raskid ugovora).", de: "Ich brauche Hilfe beim Schreiben einer Kündigung.", en: "I need help writing a cancellation letter." },
  },
  {
    icon: Briefcase,
    label: { bs: "Bewerbung napraviti", de: "Bewerbung erstellen", en: "Create application" },
    message: { bs: "Trebam pomoć da napravim Bewerbung (prijavu za posao).", de: "Ich brauche Hilfe bei der Erstellung einer Bewerbung.", en: "I need help creating a job application." },
  },
  {
    icon: Mail,
    label: { bs: "Poruka za stan", de: "Wohnungsnachricht", en: "Apartment message" },
    message: { bs: "Trebam gotovu poruku koju mogu poslati stanodavcu za stan.", de: "Ich brauche eine fertige Nachricht für den Vermieter.", en: "I need a ready-made message for a landlord." },
  },
  {
    icon: PenLine,
    label: { bs: "Email napisati", de: "E-Mail schreiben", en: "Write email" },
    message: { bs: "Trebam pomoć da napišem službeni email na njemačkom.", de: "Ich brauche Hilfe beim Schreiben einer offiziellen E-Mail.", en: "I need help writing an official email in German." },
  },
  {
    icon: CheckSquare,
    label: { bs: "Checklist napraviti", de: "Checkliste erstellen", en: "Create checklist" },
    message: { bs: "Trebam personalizovanu checklistu za moju situaciju.", de: "Ich brauche eine personalisierte Checkliste.", en: "I need a personalized checklist for my situation." },
  },
];

// ── Auto-trigger ──

const AUTO_TRIGGER: Record<string, Record<string, string>> = {
  "/wohnungen": { bs: "Treba pomoć oko pronalaska stana?", de: "Brauchst du Hilfe bei der Wohnungssuche?", en: "Need help finding an apartment?" },
  "/stellenangebote": { bs: "Treba pomoć oko pronalaska posla?", de: "Brauchst du Hilfe bei der Jobsuche?", en: "Need help finding a job?" },
  "/formulari": { bs: "Treba pomoć sa formularima? Reci mi koji ti treba i vodim te dalje.", de: "Brauchst du Hilfe mit Formularen? Sag mir welches du brauchst.", en: "Need help with forms? Tell me which one you need." },
};

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
    docs: lk === "de" ? "Dokumente" : lk === "en" ? "Documents" : "Dokumenti",
    mistakes: lk === "de" ? "Häufige Fehler" : lk === "en" ? "Common mistakes" : "Česte greške",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/20 dark:to-indigo-950/20 p-3 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
          <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-foreground truncate">{form.label}</p>
          <p className="text-[10px] text-muted-foreground leading-snug">{form.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <Link
          to={`/formulari?form=${slug}`}
          className="flex items-center justify-center gap-1 rounded-lg border border-border bg-background px-2 py-1.5 text-[10px] font-medium text-foreground transition hover:bg-accent"
        >
          <ExternalLink className="h-3 w-3" /> {labels.openForm}
        </Link>
        <Link
          to={`/formulari?form=${slug}`}
          className="flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-white transition hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}
        >
          <BookOpen className="h-3 w-3" /> {labels.startGuide}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Premium Upsell Card (soft, non-aggressive) ──

function PremiumUpsellCard({ lk, onSkip }: { lk: string; onSkip: () => void }) {
  const labels = PREMIUM_CTA_LABELS[lk] || PREMIUM_CTA_LABELS["bs"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-purple-200 dark:border-purple-800/40 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <span className="text-[13px] font-bold text-purple-700 dark:text-purple-300">
          {lk === "de" ? "Alle Guides und Tools freischalten" : lk === "en" ? "Unlock all guides and tools" : "Otključaj sve vodiče i alate"}
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        {labels.features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-purple-500 shrink-0" />
            <span className="text-[11px] text-purple-700 dark:text-purple-300">{f}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-purple-600/70 dark:text-purple-400/70 mb-3 italic">
        {labels.social}
      </p>

      <div className="flex flex-col gap-2">
        <Link
          to="/premium"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[12px] font-bold text-white transition hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}
        >
          <Lock className="h-3 w-3" />
          {labels.activate} — {labels.price}
        </Link>
        <button
          onClick={onSkip}
          className="text-[11px] text-muted-foreground hover:text-foreground transition py-1"
        >
          {labels.skip} →
        </button>
      </div>
    </motion.div>
  );
}

// ── Tab type ──

type Tab = "help" | "actions";

// ── Main Component ──

export default function ChatAssistant() {
  const { language } = useLanguage();
  const { isPremium } = useAuth();
  const location = useLocation();
  const lk = language;

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("help");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    setTab("help");
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
      // Extract form markers in real-time
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

      // Apply header slugs after stream completes
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
      upsertAssistant(ERROR_MSG[lk]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, lk, isPremium, language]);

  const sendMessage = useCallback(() => sendMessageWithText(input), [input, sendMessageWithText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

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
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-blue-500 to-purple-600 opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
              <div
                className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl group-active:scale-95"
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
            {/* Header */}
            <div className="relative overflow-hidden px-5 py-4" style={{ background: "linear-gradient(135deg, #3B82F6, #9333EA)" }}>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1">
                  <p className="text-[15px] font-bold leading-tight text-white">{HEADER_TITLE[lk] || HEADER_TITLE["bs"]}</p>
                  <p className="text-[10px] leading-snug text-white/70 mt-1">{HEADER_SUBTITLE[lk] || HEADER_SUBTITLE["bs"]}</p>
                </div>
                <button onClick={() => setOpen(false)} className="ml-2 rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
            </div>

            {/* Tab bar */}
            {messages.length === 0 && (
              <div className="flex border-b border-border">
                <button
                  onClick={() => setTab("help")}
                  className={`flex-1 py-2 text-[12px] font-medium transition-colors ${tab === "help" ? "text-foreground border-b-2 border-blue-500" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {lk === "de" ? "Hilfe" : lk === "en" ? "Help" : "Pomoć"}
                </button>
                <button
                  onClick={() => setTab("actions")}
                  className={`flex-1 py-2 text-[12px] font-medium transition-colors ${tab === "actions" ? "text-foreground border-b-2 border-purple-500" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {lk === "de" ? "Schnelle Aktionen" : lk === "en" ? "Quick Actions" : "Brze radnje"}
                </button>
              </div>
            )}

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
              {/* Start Screen */}
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
                  {tab === "help" ? (
                    ACTION_BUTTONS.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                          onClick={() => handleAction(action.message[lk] || action.message["bs"])}
                          className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-800 group"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-[13px] font-medium text-foreground">{action.label[lk] || action.label["bs"]}</span>
                        </motion.button>
                      );
                    })
                  ) : (
                    QUICK_ACTIONS.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                          onClick={() => handleAction(action.message[lk] || action.message["bs"])}
                          className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-purple-200 dark:hover:border-purple-800 group"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-[13px] font-medium text-foreground">{action.label[lk] || action.label["bs"]}</span>
                        </motion.button>
                      );
                    })
                  )}

                  {/* GDPR notice on start screen */}
                  <div className="flex items-start gap-1.5 pt-2 px-1">
                    <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-green-600 dark:text-green-400" />
                    <p className="text-[10px] text-muted-foreground/70 leading-snug">
                      {DATA_NOTICE[lk] || DATA_NOTICE["bs"]}
                    </p>
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
                  {msg.softUpsell ? (
                    <div className="max-w-[92%]">
                      <PremiumUpsellCard lk={lk} onSkip={() => inputRef.current?.focus()} />
                    </div>
                  ) : (
                    <div className="max-w-[92%] space-y-2">
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
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

                            {/* Copy button for longer assistant messages */}
                            {!msg.premiumGated && msg.content.length > 200 && (
                              <button
                                onClick={() => copyToClipboard(msg.content, i)}
                                className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition"
                              >
                                <Copy className="h-3 w-3" />
                                {copied === i ? "✓ Kopirano" : "Kopiraj"}
                              </button>
                            )}

                            {msg.premiumGated && (
                              <div className="mt-3">
                                <PremiumUpsellCard lk={lk} onSkip={() => { setInput(""); inputRef.current?.focus(); }} />
                              </div>
                            )}

                            {!msg.premiumGated && !msg.formSlugs?.length && (
                              <div className="mt-2 flex items-start gap-1.5">
                                <Info className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/50" />
                                <p className="text-[10px] text-muted-foreground/60 leading-snug">
                                  {DISCLAIMER[lk] || DISCLAIMER["bs"]}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          msg.content
                        )}
                      </div>

                      {/* Form Cards rendered BELOW the message bubble */}
                      {msg.role === "assistant" && msg.formSlugs && msg.formSlugs.length > 0 && (
                        <div className="space-y-2">
                          {msg.formSlugs.map(slug => (
                            <FormCard key={slug} slug={slug} lk={lk} />
                          ))}
                          <div className="flex items-start gap-1.5 px-1">
                            <Info className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/50" />
                            <p className="text-[10px] text-muted-foreground/60 leading-snug">
                              {DISCLAIMER[lk] || DISCLAIMER["bs"]}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
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

            {/* GDPR + Disclaimer footer */}
            <div className="px-3 py-1 border-t border-border/50">
              <p className="text-[9px] text-center text-muted-foreground/50">
                {DISCLAIMER[lk] || DISCLAIMER["bs"]}
              </p>
            </div>

            {/* Input area */}
            <div className="border-t px-3 py-2">
              {/* Input warning */}
              <div className="flex items-center gap-1 mb-1.5 px-1">
                <ShieldCheck className="h-2.5 w-2.5 text-green-600 dark:text-green-400 shrink-0" />
                <p className="text-[9px] text-muted-foreground/60">{INPUT_WARNING[lk] || INPUT_WARNING["bs"]}</p>
              </div>
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
