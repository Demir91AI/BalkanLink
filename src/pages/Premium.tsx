import { Check, Star, Shield, Zap, Crown, Megaphone, Image, Monitor, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

/* ─── Comparison rows ─── */
const comparisonRows = [
  { label: "Grundinfos", free: true, premium: true },
  { label: "Basis Inhalte", free: true, premium: true },
  { label: "Konkrete Anleitung", free: false, premium: true },
  { label: "Fehler vermeiden", free: false, premium: true },
  { label: "Schneller fertig", free: false, premium: true },
];

/* ─── Product Card ─── */
function ProductCard({
  icon, title, price, period, badge, features, cta, dominant, small, index, user, isPremium, children,
}: {
  icon: ReactNode; title: string; price: string; period: string; badge?: string;
  features: string[]; cta: string; dominant?: boolean; small?: boolean; index: number;
  user: any; isPremium: boolean; children?: ReactNode;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "group relative rounded-2xl border bg-card shadow-sm transition-shadow duration-300",
        dominant && "border-2 border-[hsl(var(--gold))]/50 shadow-[0_0_40px_-10px_hsl(var(--gold)/0.25)] ring-2 ring-[hsl(var(--gold))]/10",
        dominant && "p-8 md:p-10",
        !dominant && !small && "p-6 md:p-8",
        small && "p-5 md:p-6 max-w-xl",
        "hover:shadow-lg hover:shadow-[hsl(var(--gold))]/5"
      )}
    >
      {dominant && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-4 py-1 text-[11px] font-bold text-[hsl(var(--gold-foreground))] shadow-md">
          Empfohlenes Paket
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20",
            dominant ? "h-14 w-14" : "h-11 w-11"
          )}>
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={cn("font-bold", dominant ? "text-xl md:text-2xl" : small ? "text-base" : "text-lg")}>{title}</h3>
              {badge && (
                <Badge className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] text-[10px] font-bold shadow-sm">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="mt-1">
              <span className={cn("font-heading font-extrabold", dominant ? "text-4xl md:text-5xl" : small ? "text-2xl" : "text-3xl")}>{price}</span>
              <span className="ml-1 text-sm text-muted-foreground">{period}</span>
            </p>
          </div>
        </div>

        <div className="sm:text-right shrink-0">
          {isPremium ? (
            <p className="text-sm font-medium text-[hsl(var(--gold))]">Aktiv ✓</p>
          ) : (
            <Button
              size={dominant ? "lg" : "default"}
              className={cn(
                "rounded-xl transition-all duration-200",
                dominant
                  ? "btn-gold-gradient shadow-md hover:shadow-lg"
                  : "border-[hsl(var(--gold))] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
              )}
              variant={dominant ? "default" : "outline"}
              asChild
            >
              {user ? <span>👉 {cta}</span> : <Link to="/login">👉 {cta}</Link>}
            </Button>
          )}
        </div>
      </div>

      <ul className={cn("mt-5 space-y-2.5", dominant ? "text-base" : "text-sm")}>
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className={cn("mt-0.5 shrink-0 text-[hsl(var(--gold))]", dominant ? "h-5 w-5" : "h-4 w-4")} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Premium() {
  const { user, isPremium } = useAuth();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1F3A]/80" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[hsl(var(--gold))]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-500/5 blur-[80px]" />

        <div className="container relative z-10 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Preise & Leistungen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-base text-white/50 md:text-lg"
          >
            Alles transparent – finde das passende Angebot für dich oder dein Unternehmen.
          </motion.p>

          {/* Launch offer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-8 max-w-lg rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-6 py-4 backdrop-blur-sm"
          >
            <p className="text-sm font-bold text-[hsl(var(--gold))]">
              🎉 Exklusives Startangebot zur Plattform-Einführung
            </p>
            <p className="mt-1 text-xs text-white/60">
              Alle Preise gelten für die ersten 6 Monate nach dem offiziellen Plattformstart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS – ordered by hierarchy */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl space-y-8">

          {/* 1. Premium-Präsenz (DOMINANT) */}
          <ProductCard
            index={0}
            icon={<Image className={cn("text-[hsl(var(--gold))]", "h-7 w-7")} />}
            title="Premium-Präsenz"
            price="19.99€"
            period="/ Monat"
            badge="⭐ Exklusives Startangebot"
            features={[
              "Große Darstellung",
              "Automatisch wechselnde Bilder (Slideshow)",
              "Top-Position auf der Seite",
              "Mehr Klicks & Kunden",
            ]}
            cta="Jetzt sichtbar werden"
            dominant
            user={user}
            isPremium={isPremium}
          />

          {/* 2. BalkanLink Premium */}
          <ProductCard
            index={1}
            icon={<Crown className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title="BalkanLink Premium"
            price="4.99€"
            period="/ Monat"
            badge="🔥 Exklusives Startangebot"
            features={[
              "Smart Guide (Schritt-für-Schritt Hilfe)",
              "Formular Hilfe",
              "KI Unterstützung",
              "Zugriff auf alle Premium Inhalte",
            ]}
            cta="Jetzt freischalten"
            user={user}
            isPremium={isPremium}
          />

          {/* Free vs Premium comparison */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="rounded-xl border bg-card p-6 md:p-8"
          >
            <h3 className="mb-4 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Kostenlos vs. Premium
            </h3>
            <div className="hidden sm:block overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-5 py-3 text-left font-semibold">Funktion</th>
                    <th className="px-5 py-3 text-center font-semibold">Free</th>
                    <th className="relative px-5 py-3 text-center font-semibold">
                      <div className="absolute -top-px left-0 right-0 h-0.5 bg-[hsl(var(--gold))]" />
                      ✨ Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-2.5">{row.label}</td>
                      <td className="px-5 py-2.5 text-center">
                        {row.free ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <span className="text-muted-foreground/30">✕</span>}
                      </td>
                      <td className="bg-[hsl(var(--gold))]/[0.03] px-5 py-2.5 text-center">
                        <Check className="mx-auto h-4 w-4 text-[hsl(var(--gold))]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile comparison */}
            <div className="flex flex-col gap-3 sm:hidden">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 text-xs font-semibold text-muted-foreground">Free</h4>
                <ul className="space-y-2">
                  {comparisonRows.map((row, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      {row.free ? <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> : <span className="mt-0.5 text-muted-foreground/30">✕</span>}
                      <span className={row.free ? "" : "text-muted-foreground/50"}>{row.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border-2 border-[hsl(var(--gold))]/30 p-4 ring-1 ring-[hsl(var(--gold))]/10">
                <h4 className="mb-2 text-xs font-semibold">✨ Premium</h4>
                <ul className="space-y-2">
                  {comparisonRows.map((row, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--gold))]" />
                      <span>{row.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 3. Banner-Präsenz */}
          <ProductCard
            index={3}
            icon={<Monitor className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title="Banner-Präsenz"
            price="9.99€"
            period="/ Monat"
            badge="⭐ Exklusives Startangebot"
            features={[
              "Rotierende Anzeige (Auto-Slider)",
              "Sichtbar auf mehreren Seiten",
              "Dauerhafte Präsenz",
            ]}
            cta="Jetzt sichtbar werden"
            user={user}
            isPremium={isPremium}
          />

          {/* 4. PRO Anzeige (small) */}
          <ProductCard
            index={4}
            icon={<Megaphone className="h-5 w-5 text-[hsl(var(--gold))]" />}
            title="Anzeige hervorheben (PRO)"
            price="2.99€"
            period="/ 30 Tage"
            features={[
              "Anzeige weiter oben",
              "Mehr Sichtbarkeit",
              "Mehr Anfragen",
            ]}
            cta="Anzeige hervorheben – 2.99€"
            small
            user={user}
            isPremium={isPremium}
          >
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>• Max. 3–5 gleichzeitig hervorgehobene Anzeigen</p>
              <p>• Automatisches Ablaufdatum nach 30 Tagen</p>
            </div>
          </ProductCard>

          {/* Free ads info */}
          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Kostenlose Anzeigen</h3>
                <p className="mt-1 text-xs text-muted-foreground">Laufzeit: 14 Tage — danach automatisch deaktiviert.</p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> Kostenlos erneuern</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> Oder PRO Anzeige aktivieren</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> Beim Erneuern erscheint die Anzeige wieder oben</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST + LEGAL */}
      <section className="py-14">
        <div className="container max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Shield, text: "Keine Vertragsbindung" },
              { icon: Zap, text: "Jederzeit kündbar" },
              { icon: Star, text: "Für die Balkan-Community" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10">
                    <Icon className="h-5 w-5 text-[hsl(var(--gold))]" />
                  </div>
                  <p className="text-sm font-medium">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Gemäß §19 UStG wird keine Umsatzsteuer berechnet.
            </p>
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
