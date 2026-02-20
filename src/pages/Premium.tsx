import { Check, X, Star, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const comparisonRowKeys = [
  { key: "premium.row.categories" as const, free: true, premium: true },
  { key: "premium.row.community" as const, free: true, premium: true },
  { key: "premium.row.ai" as const, free: true, premium: true },
  { key: "premium.row.search" as const, free: true, premium: true },
  { key: "premium.row.forms" as const, free: false, premium: true },
  { key: "premium.row.assistant" as const, free: false, premium: true },
  { key: "premium.row.templates" as const, free: false, premium: true },
  { key: "premium.row.priority" as const, free: false, premium: true },
  { key: "premium.row.badge" as const, free: false, premium: true },
];

const trustItemKeys = [
  { icon: Shield, key: "premium.noContract" as const },
  { icon: Zap, key: "premium.cancelAnytime" as const },
  { icon: Star, key: "premium.forCommunity" as const },
];

export default function Premium() {
  const { user, isPremium } = useAuth();
  const { t } = useLanguage();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1F3A]/80" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container relative z-10 text-center">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            BalkanLink{" "}
            <span className="inline-flex items-center gap-2 rounded-lg bg-gold/15 px-3 py-1 text-gold ring-1 ring-gold/25">
              <span className="text-lg md:text-2xl">✨</span> {t("premium.badge")}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50 md:text-lg">
            {t("premium.subtitle")}
          </p>
          <p className="mx-auto mt-2 text-sm text-white/30">
            {t("premium.price")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="btn-gold-gradient h-12 rounded-xl px-8 text-sm font-bold" asChild>
              <a href="#pricing">
                {t("premium.heroCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="h-12 rounded-xl px-8 text-sm text-white/40 hover:text-white hover:bg-white/5" asChild>
              <Link to="/">{t("premium.heroFree")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="mb-2 text-center font-heading text-2xl font-bold md:text-3xl">
            {t("premium.compareTitle")}
          </h2>
          <p className="mb-10 text-center text-sm text-muted-foreground">
            {t("premium.compareSubtitle")}
          </p>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-4 text-left font-semibold">{t("premium.function")}</th>
                  <th className="px-6 py-4 text-center font-semibold">{t("premium.free")}</th>
                  <th className="relative px-6 py-4 text-center font-semibold">
                    <div className="absolute -top-px left-0 right-0 h-1 rounded-t bg-gold" />
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-sm">✨</span> {t("premium.badge")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRowKeys.map((row, i) => (
                  <tr key={i} className="border-b last:border-b-0 transition-colors hover:bg-muted/30">
                    <td className="px-6 py-3.5">{t(row.key)}</td>
                    <td className="px-6 py-3.5 text-center">
                      {row.free ? (
                        <Check className="mx-auto h-4 w-4 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-muted-foreground/30" />
                      )}
                    </td>
                    <td className="bg-gold/[0.03] px-6 py-3.5 text-center">
                      <Check className="mx-auto h-4 w-4 text-gold" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 font-semibold">{t("premium.free")}</h3>
              <ul className="space-y-2.5">
                {comparisonRowKeys.map((row, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px]">
                    {row.free ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/30" />
                    )}
                    <span className={row.free ? "" : "text-muted-foreground/50"}>{t(row.key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-gold/30 bg-card p-5 ring-1 ring-gold/10">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm">✨</span>
                <h3 className="font-semibold">{t("premium.badge")}</h3>
              </div>
              <ul className="space-y-2.5">
                {comparisonRowKeys.map((row, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>{t(row.key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-separator" />

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20 py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="mb-2 text-center font-heading text-2xl font-bold md:text-3xl">
            {t("premium.pricingTitle")}
          </h2>
          <p className="mb-10 text-center text-sm text-muted-foreground">
            {t("premium.pricingSubtitle")}
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Monthly */}
            <div className="flex flex-col rounded-2xl border bg-card p-7 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground">{t("premium.monthly")}</h3>
              <p className="mt-2 mb-1">
                <span className="font-heading text-4xl font-extrabold">9 €</span>
                <span className="ml-1 text-sm text-muted-foreground">{t("premium.perMonth")}</span>
              </p>
              <p className="mb-6 text-xs text-muted-foreground">{t("premium.flexible")}</p>
              <div className="mt-auto">
                {isPremium ? (
                  <p className="text-center text-sm font-medium text-gold">{t("premium.active")}</p>
                ) : (
                  <Button variant="outline" className="w-full rounded-xl" asChild>
                    {user ? <span>{t("premium.soon")}</span> : <Link to="/login">{t("nav.login")}</Link>}
                  </Button>
                )}
              </div>
            </div>

            {/* Yearly */}
            <div className="relative flex flex-col rounded-2xl border-2 border-gold/40 bg-card p-7 shadow-md ring-2 ring-gold/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-bold text-[#0B1F3A]">
                {t("premium.bestOffer")}
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground">{t("premium.yearly")}</h3>
              <p className="mt-2 mb-1">
                <span className="font-heading text-4xl font-extrabold">49 €</span>
                <span className="ml-1 text-sm text-muted-foreground">{t("premium.perYear")}</span>
              </p>
              <p className="mb-6 text-xs text-gold font-medium">{t("premium.save")}</p>
              <div className="mt-auto">
                {isPremium ? (
                  <p className="text-center text-sm font-medium text-gold">{t("premium.active")}</p>
                ) : (
                  <Button className="btn-gold-gradient w-full rounded-xl" asChild>
                    {user ? <span>{t("premium.soon")}</span> : <Link to="/login">{t("nav.login")}</Link>}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-separator" />

      {/* TRUST */}
      <section className="py-14">
        <div className="container max-w-3xl">
          <div className="grid gap-5 sm:grid-cols-3">
            {trustItemKeys.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-sm font-medium">{t(item.key)}</p>
                </div>
              );
            })}
          </div>
          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
