import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function AdminGuard() {
  const { isAdmin, loading, profileLoading, session, refreshUserMeta } = useAuth();
  const [verifiedAdmin, setVerifiedAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!session?.user) {
      setVerifiedAdmin(false);
      return;
    }
    if (isAdmin) {
      setVerifiedAdmin(true);
      return;
    }
    if (profileLoading) return;

    let cancelled = false;
    setVerifiedAdmin(null);
    void (async () => {
      try {
        const { data, error } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
        if (cancelled) return;
        const allowed = !error && data === true;
        setVerifiedAdmin(allowed);
        if (allowed) void refreshUserMeta();
      } catch {
        if (!cancelled) setVerifiedAdmin(false);
      }
    })();

    return () => { cancelled = true; };
  }, [isAdmin, loading, profileLoading, refreshUserMeta, session?.user]);

  if (loading || profileLoading || verifiedAdmin === null) return null;
  if (!verifiedAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
