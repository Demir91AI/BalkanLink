import MembershipOffer from "@/components/membership/MembershipOffer";

interface SmartGuideLockProps {
  locked: boolean;
  children: React.ReactNode;
}

export default function SmartGuideLock({ locked, children }: SmartGuideLockProps) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative">
      <div className="pointer-events-none select-none max-h-40 overflow-hidden blur-[4px]" aria-hidden="true">{children}</div>
      <div className="relative -mt-16 z-10 px-2"><MembershipOffer variant="compact" /></div>
    </div>
  );
}
