import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

/** AdminGuard — gates /admin/* routes. */
export default function AdminGuard() {
  const { loading, profileLoading, session, isAdmin, refreshUserMeta } = useAuth();
  // null = still verifying, true = allowed, false = deny
  const [verifiedAdmin, setVerifiedAdmin] = useState<boolean | null>(
    isAdmin ? true : null,
  );

  useEffect(() => {
    if (loading || profileLoading) return;
    if (!session?.user) {
      setVerifiedAdmin(false);
      return;
    }
    if (isAdmin) {
      setVerifiedAdmin(true);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        if (cancelled) return;
        if (error) {
          setVerifiedAdmin(false);
          return;
        }
        const allowed = data === true;
        setVerifiedAdmin(allowed);
        if (allowed) void refreshUserMeta();
      } catch {
        if (!cancelled) setVerifiedAdmin(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Re-run only when the user identity or auth-loading state actually changes.
  }, [isAdmin, loading, profileLoading, refreshUserMeta, session?.user?.id]);

  if (loading || profileLoading || verifiedAdmin === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Provjeravam pristup…
      </div>
    );
  }
  if (!verifiedAdmin) return <Navigate to="/login?redirect=/admin" replace />;
  return <Outlet />;
}
