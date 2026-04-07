import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { checkSubscriptionStatus } from "@/lib/stripe";
import { useSessionTimeout, consumeSessionExpiredFlag } from "@/hooks/useSessionTimeout";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isPremium: boolean;
  isAdmin: boolean;
  subscriptionEnd: string | null;
  signOut: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isPremium: false,
  isAdmin: false,
  subscriptionEnd: null,
  signOut: async () => {},
  refreshSubscription: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const fetchUserMeta = async (userId: string) => {
    const [profileRes, roleRes] = await Promise.all([
      supabase.from("profiles").select("is_premium").eq("id", userId).single(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);
    setIsPremium(profileRes.data?.is_premium ?? false);
    setIsAdmin(roleRes.data?.some((r) => r.role === "admin") ?? false);
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
        const prevSession = session;
        setSession(session);
        if (session?.user) {
          setTimeout(() => fetchUserMeta(session.user.id), 0);
          setTimeout(() => refreshSubscription(), 100);
        } else {
          setIsPremium(false);
          setIsAdmin(false);
          setSubscriptionEnd(null);

          // Show expired-session toast if the flag was set by timeout logic
          if (consumeSessionExpiredFlag()) {
            toast({
              title: t("auth.sessionExpired"),
              duration: 5000,
            });
          }
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserMeta(session.user.id);
        refreshSubscription();
      }
      setLoading(false);
    });

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

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      loading,
      isPremium,
      isAdmin,
      subscriptionEnd,
      signOut,
      refreshSubscription,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
