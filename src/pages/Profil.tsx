import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import PageNav from "@/components/navigation/PageNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Crown, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Profil() {
  const { user, isPremium, subscriptionEnd, signOut, profileLoading, displayName } = useAuth();
  const { subscriptionTier } = useSubscription();
  const navigate = useNavigate();
  const [editName, setEditName] = useState(displayName);
  const [saving, setSaving] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const saveName = async () => {
    if (!user || editName.trim() === displayName) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({ first_name: editName.trim() } as any)
      .eq("id", user.id);
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <PageNav />
      <div className="container max-w-lg py-12">
        <Card className="border-border/60 bg-card/80 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Dobro došao, {displayName} 👋</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Editable name */}
            <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-3 space-y-1.5">
              <Label htmlFor="editName" className="text-xs text-muted-foreground">Ime</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={saveName}
                placeholder="Tvoje ime"
                className="h-9"
              />
              <p className="text-[11px] text-muted-foreground">
                {saving ? "Čuvam..." : "Automatski se čuva"}
              </p>
            </div>

            {/* Subscription */}
            <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                {profileLoading ? (
                  <span className="text-sm text-muted-foreground">{"Wird geladen..."}</span>
                ) : isPremium ? (
                  <>
                    <Badge className="bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]">
                      <Crown className="h-3 w-3 mr-1" /> Premium
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">{subscriptionTier}</span>
                  </>
                ) : (
                  <Badge variant="secondary">Free</Badge>
                )}
              </div>
              {isPremium && subscriptionEnd && (
                <p className="text-xs text-muted-foreground mt-1.5">
                  {"Gültig bis" || "Vrijedi do"}: {new Date(subscriptionEnd).toLocaleDateString("de-DE")}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {!isPremium && (
                <Button
                  onClick={() => navigate("/premium")}
                  className="w-full bg-[hsl(var(--gold))] text-[#0f1f3d] hover:opacity-90 font-bold"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Premium
                </Button>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {"Abmelden"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
