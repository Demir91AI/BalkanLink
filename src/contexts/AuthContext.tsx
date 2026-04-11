import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { checkSubscriptionStatus } from "@/lib/stripe";
import { useSessionTimeout, consumeSessionExpiredFlag } from "@/hooks/useSessionTimeout";
import { useToast } from "@/hooks/use-toast";
import { getDisplayName } from "@/lib/display-name";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profileLoading: boolean;
  isPremium: boolean;
  isAdmin: boolean;
  subscriptionEnd: string | null;
  displayName: string;
  signOut: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  profileLoading: true,
  isPremium: false,
  isAdmin: false,
  subscriptionEnd: null,
  displayName: "Korisniče",
  signOut: async () => {},
  refreshSubscription: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{ first_name?: string | null } | null>(null);
  const { toast } = useToast();
  const fetchUserMeta = async (userId: string) => {
    setProfileLoading(true);
    try {
      const [profileRes, roleRes] = await Promise.all([
        supabase.from("profiles").select("is_premium, first_name").eq("id", userId).single(),
        supabase.from("user_roles").select("role").eq("user_id", userId),
      ]);
      setIsPremium(profileRes.data?.is_premium ?? false);
      setProfileData({ first_name: (profileRes.data as any)?.first_name ?? null });
      setIsAdmin(roleRes.data?.some((r) => r.role === "admin") ?? false);
    } catch (err) {
      console.error("fetchUserMeta failed:", err);
      setIsPremium(false);
      setIsAdmin(false);
      setProfileData(null);
    } finally {
      setProfileLoading(false);
    }
  };

  const refreshSubscription = useCallback(async () => {
    try {
      const result = await checkSubscriptionStatus();
      setIsPremium(result.subscribed);
      setSubscriptionEnd(result.subscription_end ?? null);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          setTimeout(() => fetchUserMeta(session.user.id), 0);
          setTimeout(() => refreshSubscription(), 100);
        } else {
          setIsPremium(false);
          setIsAdmin(false);
          setSubscriptionEnd(null);
          setProfileData(null);
          setProfileLoading(false);

          if (consumeSessionExpiredFlag()) {
            toast({
              title: "Sitzung abgelaufen. Bitte melden Sie sich erneut an.",
              duration: 5000,
            });
          }
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auto-refresh subscription every 60 seconds
  useEffect(() => {
    if (!session?.user) return;
    const interval = setInterval(refreshSubscription, 60_000);
    return () => clearInterval(interval);
  }, [session?.user, refreshSubscription]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Session timeout — runs globally
  useSessionTimeout(!!session?.user);

  const displayName = getDisplayName(session?.user ?? null, profileData);

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      loading,
      profileLoading,
      isPremium,
      isAdmin,
      subscriptionEnd,
      displayName,
      signOut,
      refreshSubscription,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
