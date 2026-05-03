import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, Loader2, LogIn, Home } from "lucide-react";

type AccessState =
  | { status: "checking" }
  | { status: "no-session" }
  | { status: "denied"; userId: string; email: string | null; reason: string }
  | { status: "allowed" };

/**
 * AdminGuard — gates all /admin/* routes.
 * Shows a clear status screen (admin/user + reason) instead of a silent redirect,
 * so the operator can see exactly why access was refused.
 */
export default function AdminGuard() {
  const { loading, profileLoading, session, isAdmin, refreshUserMeta } = useAuth();
  const location = useLocation();
  const [state, setState] = useState<AccessState>(
    isAdmin ? { status: "allowed" } : { status: "checking" },
  );

  useEffect(() => {
    if (loading || profileLoading) return;

    if (!session?.user) {
      setState({ status: "no-session" });
      return;
    }

    // Trust cached admin flag from AuthContext immediately, but still re-verify in background.
    if (isAdmin) setState({ status: "allowed" });

    let cancelled = false;
    void (async () => {
      try {
        // Direct query — avoids RPC race condition we hit before.
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          setState({
            status: "denied",
            userId: session.user.id,
            email: session.user.email ?? null,
            reason: `Greška pri provjeri uloge: ${error.message}`,
          });
          return;
        }

        const allowed = data?.role === "admin";
        if (allowed) {
          setState({ status: "allowed" });
          if (!isAdmin) void refreshUserMeta();
        } else {
          setState({
            status: "denied",
            userId: session.user.id,
            email: session.user.email ?? null,
            reason: "Tvoj nalog nema 'admin' ulogu u tabeli user_roles.",
          });
        }
      } catch (err: any) {
        if (!cancelled) {
          setState({
            status: "denied",
            userId: session.user.id,
            email: session.user.email ?? null,
            reason: `Mrežna greška: ${err?.message ?? "nepoznato"}`,
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAdmin, loading, profileLoading, refreshUserMeta, session?.user?.id]);

  // Loading
  if (loading || profileLoading || state.status === "checking") {
    return (
      <div className="container py-24 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-[hsl(var(--gold))]" />
        <p className="text-sm">Provjeravam admin pristup…</p>
      </div>
    );
  }

  // Not logged in → redirect with return path
  if (state.status === "no-session") {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Denied → explicit status screen so the user knows WHY
  if (state.status === "denied") {
    return (
      <div className="container max-w-xl py-16">
        <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-card/40 p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 ring-1 ring-rose-500/40 shrink-0">
              <ShieldAlert className="h-6 w-6 text-rose-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">Pristup odbijen</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Ova ruta zahtijeva <strong className="text-foreground">admin</strong> ulogu.
              </p>

              <div className="mt-5 space-y-2 rounded-xl border border-border/40 bg-background/40 p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-rose-400">user (nije admin)</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-mono text-xs truncate">{state.email ?? "—"}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-mono text-[11px] truncate">{state.userId}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Ruta:</span>
                  <span className="font-mono text-xs truncate">{location.pathname}</span>
                </div>
                <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
                  <strong className="text-foreground">Razlog:</strong> {state.reason}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/"><Home className="h-3.5 w-3.5 mr-1.5" /> Početna</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/profil">Moj profil</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Allowed — show small confirmation strip above admin content
  return (
    <>
      <div className="border-b border-emerald-500/20 bg-emerald-500/5">
        <div className="container max-w-7xl py-2 flex items-center gap-2 text-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-semibold">Status: admin</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground truncate">{session?.user?.email}</span>
        </div>
      </div>
      <Outlet />
    </>
  );
}
