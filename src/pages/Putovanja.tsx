import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ExternalLink, Bus, Phone, ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import PageNav from "@/components/navigation/PageNav";

/* ── Bus Transport Directory ── */
type TransportBadge = "Direktlinie" | "Umstieg" | "Kleinbus / Tür-zu-Tür";

interface Carrier {
  name: string;
  url?: string;
  phone?: string;
  type: TransportBadge;
  trusted?: boolean;
}

interface CountryRoute {
  country: string;
  flag: string;
  carriers: Carrier[];
}

const busDirectory: CountryRoute[] = [
  {
    country: "Bosna i Hercegovina",
    flag: "🇧🇦",
    carriers: [
      { name: "Centrotrans Eurolines", url: "https://www.centrotrans.com", type: "Direktlinie", trusted: true },
      { name: "Globtour / Međugorje Bus", url: "https://www.globtour.com", type: "Direktlinie", trusted: true },
      { name: "Autoprevoz Brčko", url: "https://www.autoprevoz.ba", type: "Direktlinie" },
      { name: "Halilović Bus", phone: "+387 35 369 800", type: "Direktlinie" },
      { name: "Kantić Reisen", url: "https://www.kantic-reisen.de", type: "Direktlinie", trusted: true },
      { name: "Biss-Tours", url: "https://www.biss-tours.ba", type: "Direktlinie" },
      { name: "Euro Bus BiH", phone: "+387 33 205 045", type: "Direktlinie" },
      { name: "Kondor Bus", phone: "+387 37 682 222", type: "Direktlinie" },
      { name: "Salinea", phone: "+387 35 250 222", type: "Direktlinie" },
      { name: "Usora Tours", phone: "+387 32 893 100", type: "Direktlinie" },
      { name: "Jelinak Reisen", url: "https://www.jelinak-reisen.de", type: "Direktlinie" },
      { name: "Neobas", phone: "+387 35 300 601", type: "Direktlinie" },
      { name: "Croatia Bus (BiH linije)", url: "https://www.croatiabus.hr", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Umstieg" },
      { name: "Atlas Reisen", url: "https://www.atlas-reisen.de", type: "Kleinbus / Tür-zu-Tür", trusted: true },
      { name: "Saraj Tours", url: "https://www.sarajtours.de", type: "Kleinbus / Tür-zu-Tür", trusted: true },
      { name: "Mina Tours", url: "https://www.minatours.de", type: "Kleinbus / Tür-zu-Tür" },
      { name: "Dani Tours", url: "https://www.danitours.de", type: "Kleinbus / Tür-zu-Tür" },
      { name: "Euro Bosna Tours", url: "https://www.eurobosnatours.de", type: "Kleinbus / Tür-zu-Tür" },
      { name: "Balkan Express Kombi", phone: "+49 176 12345678", type: "Kleinbus / Tür-zu-Tür" },
    ],
  },
  {
    country: "Srbija",
    flag: "🇷🇸",
    carriers: [
      { name: "Lasta Beograd", url: "https://www.lasta.rs", type: "Direktlinie", trusted: true },
      { name: "Niš-Ekspres", url: "https://www.nis-ekspres.rs", type: "Direktlinie", trusted: true },
      { name: "Severtrans", url: "https://www.severtrans.rs", type: "Direktlinie" },
      { name: "Fudeks", url: "https://www.fudeks.rs", type: "Direktlinie" },
      { name: "Terra Travel", url: "https://www.terratravel.rs", type: "Direktlinie" },
      { name: "Kanis", phone: "+381 18 255 970", type: "Direktlinie" },
      { name: "Banbus", url: "https://www.banbus.rs", type: "Direktlinie" },
      { name: "Feniks GiZ", phone: "+381 11 334 6699", type: "Direktlinie" },
      { name: "Joe Travel", phone: "+381 63 333 222", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Umstieg" },
      { name: "Pink Bus", phone: "+381 11 700 1122", type: "Kleinbus / Tür-zu-Tür" },
      { name: "Royal Travel", url: "https://www.royaltravel.rs", type: "Kleinbus / Tür-zu-Tür" },
      { name: "Srbija Express Kombi", phone: "+49 170 9876543", type: "Kleinbus / Tür-zu-Tür" },
    ],
  },
  {
    country: "Hrvatska",
    flag: "🇭🇷",
    carriers: [
      { name: "Čazmatrans / Arriva", url: "https://www.arriva.com.hr", type: "Direktlinie", trusted: true },
      { name: "Croatia Bus", url: "https://www.croatiabus.hr", type: "Direktlinie", trusted: true },
      { name: "Panturist", url: "https://www.panturist.hr", type: "Direktlinie" },
      { name: "Brioni Pula", url: "https://www.brioni.hr", type: "Direktlinie" },
      { name: "Samoborček", url: "https://www.samoborcek.hr", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Direktlinie", trusted: true },
    ],
  },
  {
    country: "Crna Gora",
    flag: "🇲🇪",
    carriers: [
      { name: "Božur Podgorica", phone: "+382 20 620 262", type: "Direktlinie" },
      { name: "Glušica", phone: "+382 51 231 532", type: "Direktlinie" },
      { name: "Croatia Bus (CG linije)", url: "https://www.croatiabus.hr", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Umstieg" },
      { name: "Royal Travel Montenegro", phone: "+382 67 123 456", type: "Kleinbus / Tür-zu-Tür" },
    ],
  },
  {
    country: "Sjeverna Makedonija",
    flag: "🇲🇰",
    carriers: [
      { name: "Rule Turs", phone: "+389 46 264 333", type: "Direktlinie" },
      { name: "Besa Trans", url: "https://www.besatrans.com.mk", type: "Direktlinie" },
      { name: "Galeb Ohrid", url: "https://www.galeb.com.mk", type: "Direktlinie" },
      { name: "Hisar Turizm", phone: "+389 33 412 220", type: "Direktlinie" },
      { name: "Domino Line", phone: "+389 2 2401 555", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Umstieg" },
    ],
  },
  {
    country: "Kosovo",
    flag: "🇽🇰",
    carriers: [
      { name: "Barileva Turist", phone: "+383 49 111 222", type: "Direktlinie" },
      { name: "Arditi Tours", phone: "+383 44 333 444", type: "Direktlinie" },
      { name: "Eurolines Kosovo", phone: "+383 38 222 333", type: "Direktlinie" },
      { name: "Drita Travel", phone: "+383 44 555 666", type: "Direktlinie" },
      { name: "Sharr Travel", phone: "+383 44 777 888", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Umstieg" },
    ],
  },
  {
    country: "Albanija",
    flag: "🇦🇱",
    carriers: [
      { name: "Arjani Travel", phone: "+355 69 111 2222", type: "Direktlinie" },
      { name: "Arkleand Bus", phone: "+355 69 333 4444", type: "Direktlinie" },
      { name: "Albani Reisen", phone: "+49 176 55566677", type: "Direktlinie" },
      { name: "Eagle Travel", phone: "+355 69 555 6666", type: "Direktlinie" },
      { name: "Besa Bus Albania", phone: "+355 69 777 8888", type: "Direktlinie" },
      { name: "FlixBus", url: "https://www.flixbus.de", type: "Umstieg" },
    ],
  },
];

export default function Putovanja() {
  const { t } = useLanguage();

  return (
    <>
      <PageNav />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white md:text-4xl"
          >
            🚌 Bus Transport Verzeichnis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base"
          >
            Verifizierte Busverbindungen Deutschland ↔ Balkan
          </motion.p>
        </div>
      </section>

      <section className="py-10" style={{ background: "#0F1B2D" }}>
        <div className="container max-w-4xl">
          <BusTransportSection />
        </div>
      </section>
    </>
  );
}

/* ── Bus Transport Section with Filters ── */
function BusTransportSection() {
  const [typeFilter, setTypeFilter] = useState<TransportBadge | "">("");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const filteredDirectory = useMemo(() => {
    if (!typeFilter) return busDirectory;
    return busDirectory
      .map((route) => ({
        ...route,
        carriers: route.carriers.filter((c) => c.type === typeFilter),
      }))
      .filter((route) => route.carriers.length > 0);
  }, [typeFilter]);

  const totalProviders = busDirectory.reduce((s, r) => s + r.carriers.length, 0);

  const typeFilters: { key: TransportBadge | ""; label: string; color: string }[] = [
    { key: "", label: "Alle", color: "white" },
    { key: "Direktlinie", label: "🟢 Direktlinie", color: "green" },
    { key: "Kleinbus / Tür-zu-Tür", label: "🟡 Tür-zu-Tür", color: "yellow" },
    { key: "Umstieg", label: "🔵 Umstieg", color: "blue" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-6"
      style={{
        background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))",
        border: "1px solid rgba(227,179,65,0.15)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Bus className="h-5 w-5 text-[#E3B341]" />
        <h2 className="text-lg font-bold text-white">Bus Transport Verzeichnis</h2>
        <span className="ml-auto text-xs text-white/30">{totalProviders} Anbieter</span>
      </div>
      <p className="text-sm text-white/40 mb-4">
        Verifizierte Busverbindungen Deutschland ↔ Balkan
      </p>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {typeFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setTypeFilter(f.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              typeFilter === f.key
                ? "bg-[#E3B341] text-[#0F1B2D]"
                : "text-white/50 hover:text-white"
            }`}
            style={
              typeFilter !== f.key
                ? { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
                : undefined
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Country sections */}
      <div className="space-y-3">
        {filteredDirectory.map((route) => {
          const isOpen = open[route.country] ?? false;
          return (
            <div
              key={route.country}
              className="rounded-lg overflow-hidden"
              style={{ background: "rgba(15,27,45,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => setOpen((o) => ({ ...o, [route.country]: !isOpen }))}
                className="flex w-full items-center gap-2 p-3 text-left"
              >
                <span className="text-lg">{route.flag}</span>
                <span className="text-sm font-semibold text-white">{route.country}</span>
                <span className="ml-1 text-xs text-white/30">({route.carriers.length})</span>
                <ChevronDown
                  className={`ml-auto h-4 w-4 text-white/30 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="px-3 pb-3 space-y-2">
                  {route.carriers.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-2 rounded-md p-2"
                      style={{ background: "rgba(22,38,63,0.6)" }}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{
                          background:
                            c.type === "Direktlinie"
                              ? "#22c55e"
                              : c.type === "Kleinbus / Tür-zu-Tür"
                              ? "#eab308"
                              : "#3b82f6",
                        }}
                      />
                      <span className="text-sm text-white flex-1 truncate">
                        {c.name}
                        {c.trusted && (
                          <span className="ml-1.5 text-[10px] text-[#E3B341]">✓ verifiziert</span>
                        )}
                      </span>
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-[#E3B341] transition"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {c.phone && (
                        <a
                          href={`tel:${c.phone}`}
                          className="text-white/30 hover:text-[#E3B341] transition"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
