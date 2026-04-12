import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NtNotificationBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user has any enabled notification preferences
  const { data: hasNotifications } = useQuery({
    queryKey: ["nt-notification-prefs-check", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("classifieds_notification_preferences" as any)
        .select("id")
        .eq("user_id", user!.id)
        .eq("enabled", true)
        .limit(1);
      return (data ?? []).length > 0;
    },
  });

  // Show banner for: logged-out users, or logged-in users without active notifications
  if (hasNotifications) return null;

  return (
    <div className="rounded-xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-4 flex items-center gap-3 flex-wrap">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--gold))]/10">
        <Bell className="h-4 w-4 text-[hsl(var(--gold))]" />
      </div>
      <div className="flex-1 min-w-[200px]">
        <p className="text-sm font-semibold">Prati nove oglase</p>
        <p className="text-xs text-muted-foreground">
          Primaj email obavijesti odmah kad se nešto objavi.
        </p>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="shrink-0 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 text-xs gap-1.5"
        onClick={() => {
          if (!user) {
            navigate("/login", { state: { from: "/profil/notifikacije" } });
          } else {
            navigate("/profil/notifikacije");
          }
        }}
      >
        <Bell className="h-3 w-3" /> Postavi notifikacije →
      </Button>
    </div>
  );
}
