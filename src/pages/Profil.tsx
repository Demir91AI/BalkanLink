import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/i18n/useTranslation";
import PageNav from "@/components/navigation/PageNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Crown, User } from "lucide-react";
import SEO from "@/components/SEO";

export default function Profil() {
  const { user, isPremium, subscriptionEnd, signOut, profileLoading } = useAuth();
  const { tier } = useSubscription();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <SEO title="Profil – BalkanLink" description="Upravljaj svojim BalkanLink profilom." />
      <PageNav />
      <div className="container max-w-lg py-12">
        <Card className="border-border/60 bg-card/80 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">{t("nav.profil")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Email */}
            <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground mb-0.5">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>

            {/* Subscription */}
            <div className="rounded-lg border border-border/40 bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                {profileLoading ? (
                  <span className="text-sm text-muted-foreground">{t("general.loading")}</span>
                ) : isPremium ? (
                  <>
                    <Badge className="bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]">
                      <Crown className="h-3 w-3 mr-1" /> Premium
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">{tier}</span>
                  </>
                ) : (
                  <Badge variant="secondary">Free</Badge>
                )}
              </div>
              {isPremium && subscriptionEnd && (
                <p className="text-xs text-muted-foreground mt-1.5">
                  {t("general.validUntil") || "Vrijedi do"}: {new Date(subscriptionEnd).toLocaleDateString("de-DE")}
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
                {t("nav.logout")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
