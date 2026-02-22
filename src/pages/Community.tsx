import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import flagBIH from "@/assets/flags/ba.png";
import flagHR from "@/assets/flags/hr.png";
import flagSRB from "@/assets/flags/rs.png";
import flagME from "@/assets/flags/me.png";
import flagMK from "@/assets/flags/mk.png";
import flagXK from "@/assets/flags/xk.png";
import flagAL from "@/assets/flags/al.png";

const COUNTRY_CARDS = [
  { code: "bih", name: "Bosna i Hercegovina", flag: flagBIH },
  { code: "hr",  name: "Hrvatska",            flag: flagHR },
  { code: "srb", name: "Srbija",              flag: flagSRB },
  { code: "me",  name: "Crna Gora",           flag: flagME },
  { code: "mk",  name: "Sjeverna Makedonija", flag: flagMK },
  { code: "xk",  name: "Kosovo",              flag: flagXK },
  { code: "al",  name: "Albanija",            flag: flagAL },
];

export default function Community() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-14 sm:py-20">
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

      {/* Country Flag Cards Grid */}
      <section className="bg-primary py-10 sm:py-14">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {COUNTRY_CARDS.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  to={`/community/${c.code}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold/10"
                >
                  {/* Flag background */}
                  <img
                    src={c.flag}
                    alt={c.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/70" />

                  {/* Gold glow on hover */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse at center bottom, hsl(45 93% 49% / 0.12), transparent 70%)" }}
                  />

                  {/* Country name */}
                  <div className="absolute inset-0 flex items-end p-4 sm:p-5">
                    <h2 className="text-base font-black leading-tight text-white drop-shadow-lg sm:text-lg md:text-xl">
                      {c.name}
                    </h2>
                  </div>

                  {/* Top-right arrow indicator */}
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-sm transition-all duration-300 group-hover:bg-gold/20 group-hover:text-gold">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
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
