import PremiumModal from "./PremiumModal";

interface AiLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiLimitModal({ isOpen, onClose }: AiLimitModalProps) {
  return <PremiumModal isOpen={isOpen} onClose={onClose} trigger="ai" />;
}
