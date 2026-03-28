import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Check, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrainerHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="border-y border-white/[0.05] py-16 lg:py-24" style={{ background: "#0B0F1A" }}>
      <div className="container max-w-5xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              BalkanLink{" "}
              <span className="text-gold">Deutsch</span>
            </h2>

            <p className="mt-3 text-base font-semibold text-foreground/80 sm:text-lg">
              Effektives Deutschlernen für das echte Leben
            </p>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Lerne Deutsch durch reale Situationen in Deutschland – kurz, klar und ohne Komplikationen.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button
                onClick={() => navigate("/deutsch-trainer")}
                className="h-11 rounded-full bg-gold px-7 text-sm font-bold text-gold-foreground shadow-[0_4px_20px_hsl(var(--gold)/0.3)] hover:bg-gold-light hover:shadow-[0_6px_28px_hsl(var(--gold)/0.4)] transition-all duration-300"
              >
                Kostenlos starten <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/deutsch-trainer/preise")}
                className="h-11 rounded-full px-7 text-sm font-bold"
              >
                <Play className="mr-1.5 h-4 w-4" /> So funktioniert es
              </Button>
            </div>

            {/* Trust elements */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
              {[
                "5 Lektionen kostenlos pro Niveau",
                "Kein Abo",
                "Einmal zahlen – dauerhaft nutzen",
              ].map((text) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold" />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Example learning card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="w-full max-w-xs shrink-0"
          >
            <div className="rounded-2xl border bg-card p-5 shadow-lg">
              {/* Header */}
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Beispiel · A1
                </p>
                <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold-dark">
                  <Zap className="h-3 w-3" /> +4 XP
                </span>
              </div>

              {/* Question */}
              <p className="mb-4 text-sm font-bold leading-snug">
                Du bist beim Arzt. Was sagst du?
              </p>

              {/* Options */}
              <div className="flex flex-col gap-2">
                {[
                  { text: "Ich habe seit zwei Tagen Kopfschmerzen.", correct: true },
                  { text: "Ja, hier bitte.", correct: false },
                  { text: "Nein, ich habe Hunger.", correct: false },
                ].map((opt, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-xs font-medium transition-all ${
                      opt.correct
                        ? "border-[hsl(var(--success))] bg-[hsl(var(--success)/0.06)] text-[hsl(var(--success))]"
                        : i === 1
                          ? "border-destructive/40 bg-destructive/5 text-muted-foreground"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                    {opt.correct && <Check className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />}
                    {!opt.correct && i === 1 && <X className="h-4 w-4 shrink-0 text-destructive/60" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
