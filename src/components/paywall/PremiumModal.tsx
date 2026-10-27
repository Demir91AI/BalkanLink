import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import MembershipOffer from "@/components/membership/MembershipOffer";

type Trigger = "formular" | "guide" | "ai" | "kurs" | "viza";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: Trigger;
  formularId?: string;
}

/** Legacy modal API, now showing the single new membership offer. */
export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const { t } = useTranslation("plus");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label={t("close")} className="absolute right-3 top-3 z-10 rounded-lg p-1 text-[#CBD5E1] hover:text-[#F8FAFC]">
          <X className="h-4 w-4" />
        </button>
        <MembershipOffer variant="compact" onNavigate={onClose} />
      </div>
    </div>
  );
}
