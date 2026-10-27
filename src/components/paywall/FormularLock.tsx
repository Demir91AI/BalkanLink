import MembershipOffer from "@/components/membership/MembershipOffer";

interface FormularLockProps {
  locked: boolean;
  formularId: string;
  children: React.ReactNode;
}

/** Lock for legacy form pages: preview + the single membership offer (no per-form purchase). */
export default function FormularLock({ locked, children }: FormularLockProps) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative">
      <div className="max-h-48 overflow-hidden">{children}</div>
      <div className="pointer-events-none select-none blur-[4px]" aria-hidden="true">
        <div className="h-40 overflow-hidden opacity-30">{children}</div>
      </div>
      <div className="relative -mt-24 z-10 px-2"><MembershipOffer variant="compact" /></div>
    </div>
  );
}
