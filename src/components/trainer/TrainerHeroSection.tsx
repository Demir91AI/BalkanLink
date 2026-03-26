import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrainerHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="border-y border-border/40 bg-gradient-to-br from-primary/[0.04] via-transparent to-gold/[0.04] py-14 lg:py-20">
      <div className="container max-w-5xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-dark">
              <GraduationCap className="h-4 w-4" /> Neu
            </div>
            <h2 className="text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
              Deutsch Trainer{" "}
              <span className="text-gold">– Deutsch für das echte Leben</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              Trainiere reale Situationen in Deutschland – kurz, klar und interaktiv.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button
                onClick={() => navigate("/deutsch-trainer")}
                className="h-11 rounded-full bg-gold px-7 text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
              >
                Training starten <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/deutsch-trainer?demo=1")}
                className="h-11 rounded-full px-7 text-sm font-bold"
              >
                <Play className="mr-1.5 h-4 w-4" /> Demo testen (2 Min)
              </Button>
            </div>
          </motion.div>

          {/* Right: Mini preview card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-xs shrink-0"
          >
            <div className="rounded-2xl border bg-card p-5 shadow-lg">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Beispiel-Aufgabe</p>
              <p className="mb-4 text-sm font-bold">Du bist beim Arzt. Was sagst du?</p>
              <div className="flex flex-col gap-2">
                {["Ja, hier bitte.", "Ich bin krank.", "Nein, ich habe Hunger."].map((opt, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all ${
                      i === 0 ? "border-[hsl(var(--success))] bg-[hsl(var(--success)/0.06)] text-[hsl(var(--success))]" : "border-border text-muted-foreground"
                    }`}
                  >
                    <span className="mr-2 font-bold">{String.fromCharCode(65 + i)}</span> {opt}
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
