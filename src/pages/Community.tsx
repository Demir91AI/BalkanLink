import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/contexts/CountryContext";

const COUNTRY_NAMES: Record<string, string> = {
  BIH: "Bosna i Hercegovina",
  HR: "Hrvatska",
  SRB: "Srbija",
  ME: "Crna Gora",
  MK: "Sjeverna Makedonija",
  XK: "Kosovo",
  AL: "Albanija",
};

const COUNTRY_SUBTITLES: Record<string, string> = {
  BIH: "Moscheen, Džemati, Kulturvereine, Sportklubs",
  HR: "Katholische Missionen, Kulturvereine, Sportklubs",
  SRB: "Orthodoxe Kirchen, Kulturvereine, Sportklubs",
  ME: "Religiöse Gemeinden, Kulturvereine, Sportklubs",
  MK: "Orthodoxe & Islamische Gemeinden, Kulturvereine",
  XK: "Moscheen, Kulturzentren, Sportklubs",
  AL: "Moscheen, Kulturzentren, Sportklubs",
};

export default function Community() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />
        <div className="container relative max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-black text-primary-foreground md:text-5xl"
          >
            Zajednica
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/50 md:text-base"
          >
            Balkanska dijaspora u Njemačkoj — religiöse Gemeinden, Kulturvereine & Sportklubs.
          </motion.p>
        </div>
      </section>

      {/* Country Cards Grid */}
      <section className="bg-primary py-12">
        <div className="container max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={`/community/${c.code.toLowerCase()}`}
                  className="group flex flex-col rounded-2xl border border-gold/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                  style={{ background: "linear-gradient(135deg, hsl(215 40% 14% / 0.95), hsl(215 40% 14% / 0.75))" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <h2 className="text-lg font-bold text-primary-foreground group-hover:text-gold transition-colors">
                        {COUNTRY_NAMES[c.code]}
                      </h2>
                      <p className="mt-0.5 text-xs leading-relaxed text-primary-foreground/40">
                        {COUNTRY_SUBTITLES[c.code]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gold/60 transition-colors group-hover:text-gold">
                    Öffnen <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
