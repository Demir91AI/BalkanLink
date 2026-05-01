import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminGuard() {
  const { isAdmin, loading, profileLoading } = useAuth();
  if (loading || profileLoading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
