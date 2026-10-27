import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ExternalLink, FileText, Info, Lock } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import PremiumModal from "@/components/paywall/PremiumModal";

interface OfficialLink {
  type: "portal" | "pdf" | "info";
  label: string;
  url: string;
}

interface DolazakPageProps {
  title: string;
  subtitle: string;
  sections: {
    icon: ReactNode;
    title: string;
    content: ReactNode;
  }[];
  links: OfficialLink[];
}

const fade = (i: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function DolazakPageTemplate({ title, subtitle, sections, links }: DolazakPageProps) {
  const { t: tPlus } = useTranslation("plus");
  const { isPremium } = useSubscription();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  return (
    <>
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <Breadcrumbs variant="dark" currentLabel={title} />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{subtitle}</p>
        </div>
      </section>

      <section className="pt-10 pb-10">
        <div className="container max-w-3xl space-y-6">
          {sections.map((s, i) => {
            const isLocked = i > 0 && !isPremium;
            return (
              <motion.div key={i} {...fade(i)} className="rounded-xl border bg-card shadow-sm overflow-hidden relative">
                <div className={`p-6 ${isLocked ? "blur-sm select-none pointer-events-none" : ""}`}>
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                    {s.icon}
                    {s.title}
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground">{s.content}</div>
                </div>

                {isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/80 backdrop-blur-sm z-10">
                    <Lock className="h-6 w-6 text-primary" />
                    <p className="text-sm font-semibold text-foreground text-center px-4">
                      {tPlus("lockedTitle")}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => setShowPremiumModal(true)}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        {tPlus("unlockCta")}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Službene informacije */}
      {links.length > 0 && (
        <section className="border-t bg-card pb-10 pt-6">
          <div className="container max-w-3xl text-center">
            <h3 className="mb-3 flex items-center justify-center gap-1.5 text-sm font-bold">
              <Info className="h-4 w-4 text-primary" /> {"Korisni linkovi"}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  {l.type === "pdf" ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  {l.label}
                </a>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground/70">
              {"Informativne napomene — ne predstavlja pravni savjet."}
            </p>
          </div>
        </section>
      )}

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        trigger="guide"
      />
    </>
  );
}