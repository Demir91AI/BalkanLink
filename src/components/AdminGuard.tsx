import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

/** AdminGuard — gates /admin/* routes. */
export default function AdminGuard() {
  const { loading, session, isAdmin, refreshUserMeta } = useAuth();
  // null = still verifying, true = allowed, false = deny
  const [verifiedAdmin, setVerifiedAdmin] = useState<boolean | null>(
    isAdmin ? true : null,
  );

  useEffect(() => {
    if (loading) return;
    if (!session?.user) {
      setVerifiedAdmin(false);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (cancelled) return;
        if (error) {
          setVerifiedAdmin(isAdmin ? true : false);
          return;
        }
        const allowed = data?.role === "admin";
        setVerifiedAdmin(allowed);
        if (allowed) void refreshUserMeta();
      } catch {
        if (!cancelled) setVerifiedAdmin(isAdmin ? true : false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Re-run only when the user identity or auth-loading state actually changes.
  }, [loading, session?.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || verifiedAdmin === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Provjeravam pristup…
      </div>
    );
  }
  if (!verifiedAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
