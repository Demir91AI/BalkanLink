import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import {
  ArrowLeft, Search, ChevronRight, AlertTriangle, ClipboardList,
  PenLine, ExternalLink, Info, Lock, Crown, Check, FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { visaTypes, type VisaType } from "@/lib/visa-data";
import { getGuideBySlug } from "@/lib/guide-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSectionT } from "@/hooks/useSectionT";
import { cn } from "@/lib/utils";
import FormSmartGuide from "@/components/FormSmartGuide";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05 },
});

/* ─── Visual Paywall (non-blocking) ─── */
function VisaPaywall({ visaLabel, st }: { visaLabel: string; st: (k: string) => string }) {
  const { user } = useAuth();
  const included = ["Radna viza", "Spajanje porodice", "Produženje boravka", "EU Blue Card"];

  return (
    <div className="mt-6 rounded-2xl border border-gold/20 bg-gradient-to-b from-muted/70 to-muted/30 px-6 py-8 text-center">
      <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/20">
        <Lock className="h-5 w-5 text-gold" />
      </div>
      <h3 className="mb-1 text-sm font-bold">Smart Guide – korak po korak</h3>
      <p className="mb-5 max-w-md mx-auto text-xs text-muted-foreground">
        {st("viza.smartGuideDesc")}
      </p>
      <div className="grid w-full max-w-md mx-auto gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card p-4 text-left">
          <p className="text-lg font-extrabold text-foreground">3.99€</p>
          <p className="mt-1 text-xs text-muted-foreground">{st("viza.singleAccess")}</p>
        </div>
        <div className="rounded-xl border-2 border-gold/40 bg-gold/5 p-4 text-left relative">
          <span className="absolute -top-2.5 right-3 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold text-gold-foreground">
            {st("viza.popular")}
          </span>
          <p className="text-lg font-extrabold text-foreground">9.99€</p>
          <p className="mt-1 text-xs text-muted-foreground">{st("viza.allAccess")}</p>
          <ul className="mt-3 space-y-1">
            {included.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Check className="h-3 w-3 text-gold shrink-0" /> {f}
              </li>
            ))}
            <li className="text-[11px] text-muted-foreground pl-[18px]">{st("viza.andMore")}</li>
          </ul>
        </div>
      </div>
      <Button className="btn-gold-gradient mt-5 rounded-xl px-8" asChild>
        <Link to={user ? "/premium" : "/login"}>
          <Crown className="mr-2 h-4 w-4" /> {st("viza.unlock")}
        </Link>
      </Button>
    </div>
  );
}

/* ─── Visa Detail (right side) ─── */
function VisaDetail({ visa, st }: { visa: VisaType; st: (k: string) => string }) {
  const { isPremium } = useAuth();
  const guide = visa.guideSlug ? getGuideBySlug(visa.guideSlug) : null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{visa.icon}</span>
          <h2 className="font-heading text-xl font-extrabold">{visa.title}</h2>
        </div>
        <p className="text-xs text-muted-foreground">{visa.titleDe}</p>
        <p className="mt-2 text-sm text-foreground/80">{visa.desc}</p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/20">
        <p className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          {st("viza.disclaimer")}
        </p>
      </div>

      {/* FREE: Who can apply */}
      <motion.div {...fade(0)} className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <PenLine className="h-3.5 w-3.5 text-primary" /> {st("viza.whoCanApply")}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.whoCanApply.map((w, i) => (
            <li key={i} className="text-xs text-muted-foreground">{w}</li>
          ))}
        </ul>
      </motion.div>

      {/* FREE: Basic requirements */}
      <motion.div {...fade(1)} className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <ClipboardList className="h-3.5 w-3.5 text-primary" /> {st("viza.basicReqs")}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.basicRequirements.map((r, i) => (
            <li key={i} className="text-xs text-muted-foreground">{r}</li>
          ))}
        </ul>
      </motion.div>

      {/* FREE: Documents */}
      <motion.div {...fade(2)} className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <FileText className="h-3.5 w-3.5 text-primary" /> {st("viza.documents")}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.documents.map((d, i) => (
            <li key={i} className="text-xs text-muted-foreground">{d}</li>
          ))}
        </ul>
      </motion.div>

      {/* FREE: Common mistakes */}
      <motion.div {...fade(3)} className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" /> {st("viza.mistakes")}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.commonMistakes.map((m, i) => (
            <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
          ))}
        </ul>
      </motion.div>

      {/* Official link */}
      <motion.div {...fade(4)} className="rounded-2xl border border-border/60 bg-card p-4 text-center">
        <h3 className="mb-2 flex items-center justify-center gap-1.5 text-xs font-bold">
          <Info className="h-3.5 w-3.5 text-primary" /> {st("viza.officialInfo")}
        </h3>
        <a
          href={visa.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-3.5 w-3.5" /> {st("viza.openOfficial")}
        </a>
      </motion.div>

      {/* PREMIUM: Smart Guide (non-blocking) */}
      {guide && (
        <>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-semibold text-muted-foreground">
                Smart Guide – korak po korak
              </span>
            </div>
          </div>
          <FormSmartGuide guide={guide} lang="bs" />
          {!isPremium && <VisaPaywall visaLabel={visa.title} st={st} />}
        </>
      )}

      {/* If no guide yet, show paywall as teaser */}
      {!guide && (
        <>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-semibold text-muted-foreground">
                Smart Guide – korak po korak
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center">
            <Badge variant="outline" className="mb-3 text-xs">
              <Lock className="mr-1 h-3 w-3" /> {st("viza.comingSoon")}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {st("viza.comingSoonDesc").replace("\"VISA_NAME\"", `„${visa.title}"`)}
            </p>
          </div>
          {!isPremium && <VisaPaywall visaLabel={visa.title} st={st} />}
        </>
      )}

      <LegalDisclaimer />
    </div>
  );
}

/* ─── Main Page ─── */
export default function BoravisnaDozvola() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const st = useSectionT();
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const q = search.toLowerCase();
  const filtered = visaTypes.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.desc.toLowerCase().includes(q) ||
      v.titleDe.toLowerCase().includes(q)
  );

  const activeVisa = visaTypes.find((v) => v.id === selected);

  // Mobile: show detail
  if (isMobile && activeVisa) {
    return (
      <div className="px-4 py-6">
        <button
          onClick={() => setSelected(null)}
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Nazad
        </button>
        <VisaDetail visa={activeVisa} st={st} />
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-10">
        <div className="container max-w-5xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-4 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Nazad
          </button>
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {st("viza.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            {st("viza.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          {/* Disclaimer */}
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/20">
            <p className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              {st("viza.disclaimer")}
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar / list */}
            <aside className={cn("shrink-0", isMobile ? "w-full" : "sticky top-20 self-start w-72")}>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={st("viza.search")}
                  className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
                />
              </div>

              <nav className="space-y-1.5">
                {filtered.map((visa) => (
                  <button
                    key={visa.id}
                    onClick={() => setSelected(visa.id)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                      visa.id === selected
                        ? "border-primary/40 bg-primary/5 shadow-sm"
                        : "border-border/40 bg-card hover:border-gold/40 hover:shadow-sm"
                    )}
                  >
                    <span className="text-xl shrink-0">{visa.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className={cn("font-semibold truncate", visa.id === selected && "text-primary")}>
                        {visa.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">{visa.desc}</p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-xs text-muted-foreground text-center">{st("viza.noResults")}</p>
                )}
              </nav>
            </aside>

            {/* Detail */}
            {!isMobile && (
              <main className="min-w-0 flex-1">
                {activeVisa ? (
                  <VisaDetail visa={activeVisa} st={st} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 mb-6">
                      <FileText className="h-10 w-10 text-primary/40" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground/70">{st("viza.selectType")}</h2>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      {st("viza.selectHint")}
                    </p>
                  </div>
                )}
              </main>
            )}
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
