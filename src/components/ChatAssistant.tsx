import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Loader2, Lock, Info, BookOpen, FileText, CheckCircle2, ListOrdered, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string; premiumGated?: boolean; guideSlug?: string | null };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const PLACEHOLDER: Record<string, string> = {
  bs: "Postavite pitanje (npr. Kako dobiti Kindergeld?)",
  hr: "Postavite pitanje (npr. Kako dobiti Kindergeld?)",
  sr: "Postavite pitanje (npr. Kako dobiti Kindergeld?)",
  me: "Postavite pitanje (npr. Kako dobiti Kindergeld?)",
  sq: "Bëni një pyetje (p.sh. Si të marr Kindergeld?)",
  xk: "Bëni një pyetje (p.sh. Si të marr Kindergeld?)",
  mk: "Поставете прашање (пр. Како да добијам Kindergeld?)",
  de: "Frage stellen (z.B. Wie bekomme ich Kindergeld?)",
  en: "Ask a question (e.g. How to get Kindergeld?)",
};

const SUBTITLE: Record<string, string> = {
  bs: "Digitalni asistent BalkanLink — postavite pitanje o životu i birokratiji u Njemačkoj.",
  hr: "Digitalni asistent BalkanLink — postavite pitanje o životu i birokratiji u Njemačkoj.",
  sr: "Digitalni asistent BalkanLink — postavite pitanje o životu i birokratiji u Nemačkoj.",
  me: "Digitalni asistent BalkanLink — postavite pitanje o životu i birokratiji u Njemačkoj.",
  sq: "Asistenti dixhital BalkanLink — bëni pyetje rreth jetës dhe burokracisë në Gjermani.",
  xk: "Asistenti dixhital BalkanLink — bëni pyetje rreth jetës dhe burokracisë në Gjermani.",
  mk: "Дигитален асистент BalkanLink — поставете прашање за животот и бирократијата во Германија.",
  de: "Digitaler Assistent BalkanLink — Fragen zu Leben und Bürokratie in Deutschland.",
  en: "BalkanLink Digital Assistant — ask about life and bureaucracy in Germany.",
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
  bs: "Informacije služe samo za orijentaciju. BalkanLink ne pruža pravne usluge. Za službene informacije obratite se nadležnoj instituciji.",
  hr: "Informacije služe samo za orijentaciju. BalkanLink ne pruža pravne usluge. Za službene informacije obratite se nadležnoj instituciji.",
  sr: "Informacije služe samo za orijentaciju. BalkanLink ne pruža pravne usluge. Za službene informacije obratite se nadležnoj instituciji.",
  me: "Informacije služe samo za orijentaciju. BalkanLink ne pruža pravne usluge. Za službene informacije obratite se nadležnoj instituciji.",
  sq: "Informacionet janë vetëm orientuese. BalkanLink nuk ofron shërbime juridike. Për informacione zyrtare kontaktoni institucionin përkatës.",
  xk: "Informacionet janë vetëm orientuese. BalkanLink nuk ofron shërbime juridike. Për informacione zyrtare kontaktoni institucionin përkatës.",
  mk: "Информациите се само ориентација. BalkanLink не нуди правни услуги. За официјални информации обратете се до надлежната институција.",
  de: "Die Informationen dienen nur zur Orientierung. BalkanLink bietet keine Rechtsdienstleistungen an. Für offizielle Informationen wenden Sie sich an die zuständige Behörde.",
  en: "Information is for orientation only. BalkanLink does not provide legal services. For official information, contact the relevant authority.",
};

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  bs: ["Kako dobiti Kindergeld?", "Kako dobiti Bürgergeld?", "Kako prijaviti stan (Anmeldung)?", "Kako dobiti Wohngeld?", "Kako produžiti boravišnu dozvolu?"],
  hr: ["Kako dobiti Kindergeld?", "Kako dobiti Bürgergeld?", "Kako prijaviti stan (Anmeldung)?", "Kako dobiti Wohngeld?", "Kako produžiti boravišnu dozvolu?"],
  sr: ["Kako dobiti Kindergeld?", "Kako dobiti Bürgergeld?", "Kako prijaviti stan (Anmeldung)?", "Kako dobiti Wohngeld?", "Kako produžiti boravišnu dozvolu?"],
  me: ["Kako dobiti Kindergeld?", "Kako dobiti Bürgergeld?", "Kako prijaviti stan (Anmeldung)?", "Kako dobiti Wohngeld?", "Kako produžiti boravišnu dozvolu?"],
  sq: ["Si të marr Kindergeld?", "Si të marr Bürgergeld?", "Si të regjistroj banesën (Anmeldung)?", "Si të marr Wohngeld?", "Si të zgjat lejen e qëndrimit?"],
  xk: ["Si të marr Kindergeld?", "Si të marr Bürgergeld?", "Si të regjistroj banesën (Anmeldung)?", "Si të marr Wohngeld?", "Si të zgjat lejen e qëndrimit?"],
  mk: ["Како да добијам Kindergeld?", "Како да добијам Bürgergeld?", "Како да пријавам стан (Anmeldung)?", "Како да добијам Wohngeld?", "Како да ја продолжам дозволата за престој?"],
  de: ["Wie bekomme ich Kindergeld?", "Wie bekomme ich Bürgergeld?", "Wie melde ich meine Wohnung an?", "Wie bekomme ich Wohngeld?", "Wie verlängere ich den Aufenthaltstitel?"],
  en: ["How to get Kindergeld?", "How to get Bürgergeld?", "How to register address (Anmeldung)?", "How to get Wohngeld?", "How to extend residence permit?"],
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

function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href && href.startsWith("/")) {
            return (
              <Link to={href} className="font-medium text-primary underline hover:text-primary/80">
                {children}
              </Link>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline hover:text-primary/80">
              {children}
            </a>
          );
        },
        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
        ol: ({ children }) => <ol className="mb-1.5 list-decimal space-y-0.5 pl-5">{children}</ol>,
        ul: ({ children }) => <ul className="mb-1.5 list-disc space-y-0.5 pl-5">{children}</ul>,
        li: ({ children }) => <li className="text-[13px] leading-snug">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        h1: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 flex items-center gap-1.5">{children}</h4>,
        h2: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 flex items-center gap-1.5">{children}</h4>,
        h3: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 flex items-center gap-1.5">{children}</h4>,
        h4: ({ children }) => <h4 className="text-[13px] font-bold mt-2 mb-1 flex items-center gap-1.5">{children}</h4>,
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
  const lk = language;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleQuickQuestion = (q: string) => {
    setInput(q);
    setTimeout(() => {
      sendMessageWithText(q);
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

      // Check for guide slug from response header
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

      // Update slug from header if available
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

  const questions = SUGGESTED_QUESTIONS[lk] || SUGGESTED_QUESTIONS["bs"];

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
            aria-label="BalkanLink Assistant"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex h-[85vh] sm:h-[75vh] max-h-[600px] w-full sm:w-[400px] sm:max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border bg-card shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="border-b bg-primary px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight text-primary-foreground">BalkanLink Assistant</p>
                  <p className="text-[10px] leading-snug text-primary-foreground/60 mt-0.5">{SUBTITLE[lk] || SUBTITLE["bs"]}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 rounded-lg p-1.5 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
              {/* Welcome + Suggested Questions */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="rounded-xl bg-muted px-3.5 py-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <p className="text-[13px] font-bold text-foreground">BalkanLink Assistant</p>
                    </div>
                    <p className="text-[12px] leading-relaxed text-muted-foreground">
                      {SUBTITLE[lk] || SUBTITLE["bs"]}
                    </p>
                  </div>

                  {/* Quick Questions */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-muted-foreground px-1">
                      {lk === "de" ? "Häufige Fragen" : lk === "en" ? "Popular questions" : "Česta pitanja"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {questions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickQuestion(q)}
                          className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-[13px] leading-snug ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : msg.premiumGated
                        ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <>
                        {/* Premium gate */}
                        {msg.premiumGated && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <Lock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Premium</span>
                          </div>
                        )}

                        <ChatMarkdown content={msg.content} />

                        {/* Premium gated CTAs */}
                        {msg.premiumGated && (
                          <div className="mt-3 flex flex-col gap-2">
                            <Link
                              to="/premium"
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-[12px] font-bold text-white transition hover:bg-amber-600"
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

                        {/* CTA Buttons for non-gated responses */}
                        {!msg.premiumGated && (
                          <div className="mt-3 space-y-2">
                            {/* Smart Guide Promo */}
                            <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2">
                              <div className="flex items-start gap-2">
                                <FileText className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                                <p className="text-[11px] text-muted-foreground leading-snug">
                                  {SMART_GUIDE_PROMO[lk] || SMART_GUIDE_PROMO["bs"]}
                                </p>
                              </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-1.5">
                              {msg.guideSlug && (
                                <Link
                                  to={`/formulari/${msg.guideSlug}`}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[12px] font-bold text-primary-foreground transition hover:bg-primary/90"
                                >
                                  <BookOpen className="h-3.5 w-3.5" />
                                  {lk === "de" ? "Smart Guide starten" : lk === "en" ? "Start Smart Guide" : "Pokreni Smart Guide"}
                                </Link>
                              )}
                              <Link
                                to="/formulari"
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground transition hover:bg-accent"
                              >
                                <ClipboardList className="h-3.5 w-3.5" />
                                {lk === "de" ? "Alle Formulare ansehen" : lk === "en" ? "Browse all forms" : "Pogledaj sve formulare"}
                              </Link>
                            </div>

                            {/* Disclaimer */}
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
                </div>
              ))}

              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="rounded-xl bg-muted px-3.5 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
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
                  className="flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
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
