import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Loader2, Lock, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string; premiumGated?: boolean };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const PLACEHOLDER: Record<string, string> = {
  bs: "Postavite pitanje...", hr: "Postavite pitanje...", sr: "Postavite pitanje...", me: "Postavite pitanje...",
  sq: "Bëni një pyetje...", xk: "Bëni një pyetje...",
  mk: "Поставете прашање...",
  de: "Stellen Sie eine Frage...",
  en: "Ask a question...",
};

const WELCOME: Record<string, string> = {
  bs: "Digitalni asistent BalkanLink\nPruža pomoć pri popunjavanju formulara, objašnjava postupke korak po korak i daje opće informacije o institucijama i uslugama u Njemačkoj.\nPrimjer: \u201EKako podnijeti zahtjev za Kindergeld?\u201C",
  hr: "Digitalni asistent BalkanLink\nPruža pomoć pri popunjavanju formulara, objašnjava postupke korak po korak i daje opće informacije o institucijama i uslugama u Njemačkoj.\nPrimjer: \u201EKako podnijeti zahtjev za Kindergeld?\u201C",
  sr: "Digitalni asistent BalkanLink\nPruža pomoć pri popunjavanju formulara, objašnjava postupke korak po korak i daje opšte informacije o institucijama i uslugama u Nemačkoj.\nPrimer: \u201EKako podneti zahtev za Kindergeld?\u201C",
  me: "Digitalni asistent BalkanLink\nPruža pomoć pri popunjavanju formulara, objašnjava postupke korak po korak i daje opće informacije o institucijama i uslugama u Njemačkoj.\nPrimjer: \u201EKako podnijeti zahtjev za Kindergeld?\u201C",
  sq: "Asistenti dixhital BalkanLink\nOfron ndihmë për plotësimin e formularëve, shpjegon procedurat hap pas hapi dhe jep informacione të përgjithshme rreth institucioneve dhe shërbimeve në Gjermani.\nShembull: \u201ESi të aplikoj për Kindergeld?\u201D",
  xk: "Asistenti dixhital BalkanLink\nOfron ndihmë për plotësimin e formularëve, shpjegon procedurat hap pas hapi dhe jep informacione të përgjithshme rreth institucioneve dhe shërbimeve në Gjermani.\nShembull: \u201ESi të aplikoj për Kindergeld?\u201D",
  mk: "Дигитален асистент BalkanLink\nНуди помош при пополнување формулари, објаснува постапки чекор по чекор и дава општи информации за институции и услуги во Германија.\nПример: \u201EКако да поднесам барање за Kindergeld?\u201C",
  de: "Digitaler Assistent BalkanLink\nHilft beim Ausfüllen von Formularen, erklärt Verfahren Schritt für Schritt und gibt allgemeine Informationen zu Institutionen und Dienstleistungen in Deutschland.\nBeispiel: \u201EWie beantrage ich Kindergeld?\u201C",
  en: "BalkanLink Digital Assistant\nHelps with filling out forms, explains procedures step by step, and provides general information about institutions and services in Germany.\nExample: \u201CHow do I apply for Kindergeld?\u201D",
};

const ERROR_MSG: Record<string, string> = {
  bs: "Došlo je do greške. Pokušajte ponovo.", hr: "Došlo je do greške. Pokušajte ponovo.",
  sr: "Došlo je do greške. Pokušajte ponovo.", me: "Došlo je do greške. Pokušajte ponovo.",
  sq: "Ndodhi një gabim. Provoni përsëri.", xk: "Ndodhi një gabim. Provoni përsëri.",
  mk: "Настана грешка. Обидете се повторно.",
  de: "Ein Fehler ist aufgetreten. Versuchen Sie es erneut.",
  en: "An error occurred. Please try again.",
};

const INFO_NOTICE: Record<string, string> = {
  bs: "ℹ️ Informativni odgovor – provjerite službenu instituciju.",
  hr: "ℹ️ Informativni odgovor – provjerite službenu instituciju.",
  sr: "ℹ️ Informativni odgovor – proverite službenu instituciju.",
  me: "ℹ️ Informativni odgovor – provjerite službenu instituciju.",
  sq: "ℹ️ Përgjigje informative – verifikoni pranë institucionit zyrtar.",
  xk: "ℹ️ Përgjigje informative – verifikoni pranë institucionit zyrtar.",
  mk: "ℹ️ Информативен одговор – проверете кај надлежната институција.",
  de: "ℹ️ Informative Antwort – bitte bei der zuständigen Behörde prüfen.",
  en: "ℹ️ Informational answer – please verify with the official institution.",
};

const DISCLAIMER: Record<string, string> = {
  bs: "Ovaj asistent pruža opće informacije i ne predstavlja pravni savjet. Za obavezujuće informacije obratite se nadležnoj instituciji.",
  hr: "Ovaj asistent pruža opće informacije i ne predstavlja pravni savjet. Za obvezujuće informacije obratite se nadležnoj instituciji.",
  sr: "Ovaj asistent pruža opšte informacije i ne predstavlja pravni savet. Za obavezujuće informacije obratite se nadležnoj instituciji.",
  me: "Ovaj asistent pruža opće informacije i ne predstavlja pravni savjet. Za obavezujuće informacije obratite se nadležnoj instituciji.",
  sq: "Ky asistent ofron informacione të përgjithshme dhe nuk përbën këshillë juridike. Për informacione zyrtare kontaktoni institucionin përkatës.",
  xk: "Ky asistent ofron informacione të përgjithshme dhe nuk përbën këshillë juridike. Për informacione zyrtare kontaktoni institucionin përkatës.",
  mk: "Овој асистент дава општи информации и не претставува правен совет. За обврзувачки информации обратете се до надлежната институција.",
  de: "Dieser Assistent gibt allgemeine Informationen und stellt keine Rechtsberatung dar. Für verbindliche Auskünfte wenden Sie sich an die zuständige Behörde.",
  en: "This assistant provides general information and does not constitute legal advice. For binding information, contact the relevant authority.",
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
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function ChatAssistant() {
  const { language } = useLanguage();
  const { isPremium, user } = useAuth();
  const lk = language;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [disclaimerShown, setDisclaimerShown] = useState(false);
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

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Show disclaimer once per session on first message
    if (!disclaimerShown) {
      setDisclaimerShown(true);
    }

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
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
          isPremium: isPremium,
          language: language,
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Stream failed");
      }

      const contentType = resp.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await resp.json();
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
    } catch {
      upsertAssistant(ERROR_MSG[lk]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, lk, isPremium, language, disclaimerShown]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
            aria-label="Hilfe"
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex h-[85vh] sm:h-[75vh] max-h-[560px] w-full sm:w-[370px] sm:max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b bg-primary px-3 py-2">
              <div>
                <p className="text-[13px] font-semibold leading-tight text-primary-foreground">BalkanLink Assistent</p>
                <p className="text-[9px] leading-tight text-primary-foreground/50">
                  {isPremium ? "Premium" : (WELCOME[lk]?.split("\n")[0] || "Digital Assistant")}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-2.5">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="rounded-lg bg-muted px-3 py-2.5">
                  <p className="text-[13px] font-semibold leading-tight text-foreground mb-1">{lk === "de" ? "Digitaler Assistent BalkanLink" : lk === "en" ? "BalkanLink Digital Assistant" : "Digitalni asistent BalkanLink"}</p>
                  <p className="text-[12px] leading-snug text-muted-foreground">{WELCOME[lk].split("\n").slice(1).join(" ")}</p>
                </div>
              )}

              {/* Disclaimer – shown once per session after first message */}
              {disclaimerShown && messages.length > 0 && messages.length <= 2 && (
                <div className="flex items-start gap-1.5 rounded-md bg-muted/50 px-2.5 py-2 text-[11px] text-muted-foreground">
                  <Info className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>{DISCLAIMER[lk]}</span>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] leading-snug ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : msg.premiumGated
                        ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <>
                        {msg.premiumGated && (
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Lock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Premium</span>
                          </div>
                        )}
                        <ChatMarkdown content={msg.content} />
                        {msg.premiumGated && (
                          <div className="mt-2 flex flex-col gap-1.5">
                            <Link
                              to="/premium"
                              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-amber-500 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-amber-600"
                            >
                              <Lock className="h-3 w-3" />
                              Otključaj Premium
                            </Link>
                            <button
                              onClick={() => {
                                setInput("");
                                inputRef.current?.focus();
                              }}
                              className="text-[11px] text-muted-foreground hover:text-foreground transition"
                            >
                              Postavi opće pitanje →
                            </button>
                          </div>
                        )}
                        {/* Info notice for free (non-gated) assistant answers */}
                        {!msg.premiumGated && !isPremium && (
                          <p className="mt-1.5 text-[10px] text-muted-foreground/70">{INFO_NOTICE[lk]}</p>
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
                  <div className="rounded-lg bg-muted px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t px-3 py-2">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={PLACEHOLDER[lk]}
                  rows={1}
                  className="flex-1 resize-none rounded-lg border bg-background px-2.5 py-2 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
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
