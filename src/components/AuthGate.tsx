import { ReactNode, useState } from "react";
import { Lock, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

interface AuthGateProps {
  children: ReactNode;
  /** Optional preview content shown above the blur overlay */
  preview?: ReactNode;
}

/**
 * Wraps detailed content behind a free registration wall.
 * If user is authenticated → renders children normally.
 * If not → shows blurred overlay with registration CTA.
 */
export default function AuthGate({ children, preview }: AuthGateProps) {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  if (loading) return <>{children}</>;

  if (user) return <>{children}</>;

  return (
    <>
      <div className="relative">
        {/* Show preview or first bit of children behind blur */}
        <div className="pointer-events-none select-none" style={{ filter: "blur(6px)", opacity: 0.45, maxHeight: 420, overflow: "hidden" }}>
          {preview ?? children}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="mx-4 flex flex-col items-center gap-4 rounded-2xl border border-[hsl(var(--gold))]/30 px-8 py-10 text-center shadow-2xl backdrop-blur-md"
            style={{
              background: "linear-gradient(160deg, hsl(220,50%,8%,0.95), hsl(225,45%,6%,0.97))",
              maxWidth: 420,
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,60%,42%))" }}
            >
              <Lock className="h-6 w-6 text-[hsl(225,45%,6%)]" />
            </div>

            <h3 className="text-lg font-bold text-white">Registracija je potrebna</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Kreiraj besplatan nalog da pristupiš sadržaju.<br />
              Traje manje od 30 sekundi.
            </p>

            <button
              onClick={() => setAuthOpen(true)}
              className="mt-2 flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all hover:brightness-110 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
                color: "hsl(225,45%,6%)",
                boxShadow: "0 4px 20px hsla(43,70%,53%,0.35)",
              }}
            >
              <UserPlus className="h-4 w-4" />
              Registruj se besplatno →
            </button>

            <button
              onClick={() => setAuthOpen(true)}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Već imaš nalog? <span className="underline">Prijavi se</span>
            </button>
          </div>
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
