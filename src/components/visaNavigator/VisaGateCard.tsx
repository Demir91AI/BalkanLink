import { useSubscription } from "@/hooks/useSubscription";
import MembershipOffer from "@/components/membership/MembershipOffer";

interface Props {
  routeTitle?: string;
}

/** Visa Navigator gate — single membership offer. */
export default function VisaGateCard({ routeTitle }: Props) {
  const { isPremium } = useSubscription();
  if (isPremium) return null;
  return <div className="my-6"><MembershipOffer variant="compact" title={routeTitle} /></div>;
}
