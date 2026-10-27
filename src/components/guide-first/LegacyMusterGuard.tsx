import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { resolveLegacyMuster } from "@/lib/guide-first/legacy-muster";

/** Renders children unless the URL is a legacy manual-fill Muster page. */
export default function LegacyMusterGuard({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const target = resolveLegacyMuster(pathname);
  if (target) return <Navigate to={target} replace />;
  return <>{children}</>;
}
