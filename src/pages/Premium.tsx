import { useNavigate } from "react-router-dom";
import { Crown, Check, Star, FileText, Globe, Bot, ShieldCheck, BookOpen, Download } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { toast } from "sonner";
import PageNavBar from "@/components/navigation/PageNavBar";
import { motion } from "framer-motion";

const premiumFeatures = [
  { icon: <FileText className="h-5 w-5" />, text: "Alle Musterformulare als PDF-Download" },
  { icon: <BookOpen className="h-5 w-5" />, text: "Smart Guides für jeden Antrag" },
  { icon: <Globe className="h-5 w-5" />, text: "Viza Navigator — vollständiger Zugang" },
  { icon: <Bot className="h-5 w-5" />, text: "AI Asistent ohne Einschränkungen" },
  { icon: <ShieldCheck className="h-5 w-5" />, text: "Dokumenten-Check (1× täglich gratis)" },
  { icon: <Download className="h-5 w-5" />, text: "BalkanLink Deutsch — alle Lektionen" },
  { icon: <Star className="h-5 w-5" />, text: "Vorlagen/Šabloni PDF-Download" },
  { icon: <Crown className="h-5 w-5" />, text: "Priority-Support" },
];

export default function Premium() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePurchase = () => {
    toast.info("Zahlung wird in Kürze verfügbar");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageNavBar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))]/15 px-4 py-1.5 mb-4">
            <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
            <span className="text-sm font-semibold text-[hsl(var(--gold))]">Premium</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            BalkanLink Premium
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sve što trebaš za snalaženje u Njemačkoj — formulari, vodiči, AI asistent i više. Na tvom jeziku.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl border border-border bg-card p-6 flex flex-col"
          >
            <h2 className="text-lg font-bold text-foreground mb-1">Mjesečno</h2>
            <p className="text-muted-foreground text-sm mb-4">Fleksibilno, bez ugovora</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">9,99€</span>
              <span className="text-muted-foreground text-sm">/mj.</span>
            </div>
            <button
              onClick={handlePurchase}
              className="mt-auto w-full rounded-full border-2 border-[hsl(var(--gold))] bg-transparent py-3 text-sm font-bold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 transition-colors"
            >
              Jetzt Premium holen
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">ohne MwSt. gem. §19 UStG</p>
          </motion.div>

          {/* Annual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 flex flex-col"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-4 py-0.5 text-xs font-bold text-[#0f1f3d]">
              POPULARNO
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">Godišnje</h2>
            <p className="text-muted-foreground text-sm mb-4">Uštedi 2 mjeseca</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">99,90€</span>
              <span className="text-muted-foreground text-sm">/god.</span>
            </div>
            <button
              onClick={handlePurchase}
              className="mt-auto w-full rounded-full bg-[hsl(var(--gold))] py-3 text-sm font-bold text-[#0f1f3d] hover:opacity-90 transition-opacity"
            >
              Jetzt Premium holen
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">ohne MwSt. gem. §19 UStG</p>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-6">Was ist alles enthalten?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {premiumFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 text-[hsl(var(--gold))]">{f.icon}</div>
                <span className="text-sm text-foreground">{f.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
