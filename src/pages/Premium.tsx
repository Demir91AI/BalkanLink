import { useState, useEffect } from "react";
import { Check, Star, Shield, Zap, Crown, Megaphone, Image, Monitor, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSectionT } from "@/hooks/useSectionT";
import type { ReactNode } from "react";

/* ─── Floating Particles ─── */
function HeroParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 2,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  );

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[hsl(var(--gold))]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ─── Animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

/* ─── Product Card ─── */
function ProductCard({
  icon, title, price, period, badge, features, cta, dominant, small, index, user, isPremium, activeLabel, children,
}: {
  icon: ReactNode; title: string; price: string; period: string; badge?: string;
  features: string[]; cta: string; dominant?: boolean; small?: boolean; index: number;
  user: any; isPremium: boolean; activeLabel: string; children?: ReactNode;
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
        dominant && "border-2 border-[hsl(var(--gold))]/50 shadow-[0_0_40px_-10px_hsl(var(--gold)/0.25)] ring-2 ring-[hsl(var(--gold))]/10 p-8 md:p-10",
        !dominant && !small && "p-6 md:p-8",
        small && "p-5 md:p-6 max-w-xl",
        "hover:shadow-lg hover:shadow-[hsl(var(--gold))]/5"
      )}
    >
      {dominant && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-4 py-1 text-[11px] font-bold text-[hsl(var(--gold-foreground))] shadow-md whitespace-nowrap">
          {badge}
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
              {badge && !dominant && (
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
            <p className="text-sm font-medium text-[hsl(var(--gold))]">{activeLabel}</p>
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

/* ─── Category Header ─── */
function CategoryHeader({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="flex items-center gap-3 pt-6 first:pt-0"
    >
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Premium() {
  const { user, isPremium } = useAuth();
  const st = useSectionT();

  const comparisonRows = [
    { label: st("pricing.cmpRow1"), free: true, premium: true },
    { label: st("pricing.cmpRow2"), free: true, premium: true },
    { label: st("pricing.cmpRow3"), free: false, premium: true },
    { label: st("pricing.cmpRow4"), free: false, premium: true },
    { label: st("pricing.cmpRow5"), free: false, premium: true },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #12254a 40%, #1a2d5a 60%, #1f2a52 80%, #0B1F3A 100%)" }}>
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[140px]"
            style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.12), transparent 70%)" }}
          />
          <motion.div
            animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)" }}
          />
          <motion.div
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute top-1/2 right-1/3 w-[250px] h-[250px] rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.06), transparent 70%)" }}
          />
        </div>

        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)", backgroundSize: "32px 32px" }} />

        {/* Floating particles */}
        <HeroParticles />

        <div className="container relative z-10 text-center max-w-3xl">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 15, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <span className="group relative inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--gold))]"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold) / 0.15), hsl(var(--gold) / 0.05))", boxShadow: "0 0 20px hsl(var(--gold) / 0.15), inset 0 1px 0 hsl(var(--gold) / 0.1)" }}>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]"
                style={{ boxShadow: "0 0 6px hsl(var(--gold) / 0.6)" }}
              />
              {st("pricing.heroBadge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-6 font-heading text-[1.75rem] font-extrabold tracking-tight leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            style={{
              background: "linear-gradient(180deg, #ffffff 30%, hsl(var(--gold) / 0.85) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 20px rgba(255,255,255,0.08))",
            }}>
            {st("pricing.heroTitle")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 max-w-xl text-[0.95rem] text-white/65 md:text-lg leading-[1.7]">
            {st("pricing.heroSubtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="h-12 rounded-xl px-8 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-[1.04]" asChild
              style={{
                background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light, var(--gold))))",
                color: "hsl(var(--gold-foreground))",
                boxShadow: "0 4px 24px hsl(var(--gold) / 0.35), 0 0 0 1px hsl(var(--gold) / 0.1)",
              }}>
              <Link to="/pocni-ovdje">
                👉 {st("pricing.heroCta1")}
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="h-12 rounded-xl px-8 text-sm text-white/45 hover:text-white hover:bg-white/5 transition-all duration-200" asChild>
              <a href="#products">
                {st("pricing.heroCta2")}
              </a>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-xs text-white/30 tracking-wide">
            {st("pricing.heroTrust")}
          </motion.p>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent" />
      </section>

      {/* PRODUCTS */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl space-y-8">

          {/* ── Category: BalkanLink ── */}
          <CategoryHeader label={st("pricing.catBalkanLink")} index={0} />

          <ProductCard index={1}
            icon={<Crown className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title={st("pricing.premiumTitle")}
            price={st("pricing.premiumPrice")}
            period={st("pricing.premiumPeriod")}
            badge={st("pricing.premiumBadge")}
            features={[st("pricing.premiumF1"), st("pricing.premiumF2"), st("pricing.premiumF3"), st("pricing.premiumF4")]}
            cta={st("pricing.premiumCta")}
            dominant
            user={user}
            isPremium={isPremium}
            activeLabel={st("pricing.active")}
          />

          {/* Free vs Premium */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
            className="rounded-xl border bg-card p-6 md:p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {st("pricing.compareTitle")}
            </h3>
            <div className="hidden sm:block overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-5 py-3 text-left font-semibold">{st("pricing.compareFunc")}</th>
                    <th className="px-5 py-3 text-center font-semibold">{st("pricing.compareFree")}</th>
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
            <div className="flex flex-col gap-3 sm:hidden">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 text-xs font-semibold text-muted-foreground">{st("pricing.compareFree")}</h4>
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

          {/* ── Category: Reklame (Advertising) ── */}
          <CategoryHeader label={st("pricing.catAds")} index={3} />

          <ProductCard index={4}
            icon={<Image className="h-7 w-7 text-[hsl(var(--gold))]" />}
            title={st("pricing.showcaseTitle")}
            price={st("pricing.showcasePrice")}
            period={st("pricing.showcasePeriod")}
            badge={st("pricing.showcaseBadge")}
            features={[st("pricing.showcaseF1"), st("pricing.showcaseF2"), st("pricing.showcaseF3"), st("pricing.showcaseF4")]}
            cta={st("pricing.showcaseCta")}
            user={user}
            isPremium={isPremium}
            activeLabel={st("pricing.active")}
          />

          <ProductCard index={5}
            icon={<Monitor className="h-6 w-6 text-[hsl(var(--gold))]" />}
            title={st("pricing.bannerTitle")}
            price={st("pricing.bannerPrice")}
            period={st("pricing.bannerPeriod")}
            badge={st("pricing.bannerBadge")}
            features={[st("pricing.bannerF1"), st("pricing.bannerF2"), st("pricing.bannerF3")]}
            cta={st("pricing.bannerCta")}
            user={user}
            isPremium={isPremium}
            activeLabel={st("pricing.active")}
          />

          {/* ── Category: Oglasi (Listings) ── */}
          <CategoryHeader label={st("pricing.catListings")} index={6} />

          <ProductCard index={7}
            icon={<Megaphone className="h-5 w-5 text-[hsl(var(--gold))]" />}
            title={st("pricing.proTitle")}
            price={st("pricing.proPrice")}
            period={st("pricing.proPeriod")}
            features={[st("pricing.proF1"), st("pricing.proF2"), st("pricing.proF3")]}
            cta={st("pricing.proCta")}
            small
            user={user}
            isPremium={isPremium}
            activeLabel={st("pricing.active")}
          >
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>• {st("pricing.proNote1")}</p>
              <p>• {st("pricing.proNote2")}</p>
            </div>
          </ProductCard>

          {/* Free ads info */}
          <motion.div custom={8} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
            className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{st("pricing.freeAdsTitle")}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{st("pricing.freeAdsDesc")}</p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> {st("pricing.freeAdsRenew")}</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> {st("pricing.freeAdsPro")}</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> {st("pricing.freeAdsTop")}</li>
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
              { icon: Shield, text: st("pricing.trustNoContract") },
              { icon: Zap, text: st("pricing.trustCancel") },
              { icon: Star, text: st("pricing.trustCommunity") },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10">
                    <Icon className="h-5 w-5 text-[hsl(var(--gold))]" />
                  </div>
                  <p className="text-sm font-medium">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">{st("pricing.taxNote")}</p>
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
