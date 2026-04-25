import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { checkSubscriptionStatus, STRIPE_PRODUCT_IDS } from "@/lib/stripe";
import PageNav from "@/components/navigation/PageNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Crown,
  Calendar,
  Receipt,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentRow {
  id: string;
  provider: string;
  status: string;
  amount: number;
  currency: string;
  transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
}

interface SubInfo {
  subscribed: boolean;
  product_id?: string | null;
  subscription_end?: string | null;
}

const formatPrice = (amount: number, currency: string) => {
  // payments.amount is stored in minor units (cents)
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: (currency || "EUR").toUpperCase(),
  }).format(amount / 100);
};

const formatDateTime = (iso: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("bs-BA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (iso?: string | null) => {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("bs-BA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getStatusBadge = (status: string) => {
  const s = status?.toLowerCase() ?? "";
  if (s === "paid" || s === "succeeded" || s === "complete" || s === "completed") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/30">
        <CheckCircle2 className="h-3 w-3 mr-1" /> Plaćeno
      </Badge>
    );
  }
  if (s === "pending" || s === "processing") {
    return (
      <Badge variant="secondary" className="border border-amber-500/30 text-amber-500">
        <Clock className="h-3 w-3 mr-1" /> U obradi
      </Badge>
    );
  }
  if (s === "failed" || s === "canceled" || s === "cancelled") {
    return (
      <Badge variant="destructive" className="bg-destructive/15 text-destructive border-destructive/30">
        <XCircle className="h-3 w-3 mr-1" /> {s === "failed" ? "Neuspjelo" : "Otkazano"}
      </Badge>
    );
  }
  return <Badge variant="outline">{status}</Badge>;
};

export default function HistorijaPlacanja() {
  const { user, loading: authLoading } = useAuth();
  const { isPremium } = useSubscription();
  const navigate = useNavigate();

  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subInfo, setSubInfo] = useState<SubInfo | null>(null);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  const loadPayments = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from("payments")
      .select("id, provider, status, amount, currency, transaction_id, paid_at, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (dbError) {
      setError(dbError.message);
      setPayments([]);
    } else {
      setPayments((data ?? []) as PaymentRow[]);
    }
    setLoading(false);
  };

  const loadSubscription = async () => {
    setSubLoading(true);
    const info = await checkSubscriptionStatus();
    setSubInfo({
      subscribed: info.subscribed,
      product_id: info.product_id ?? null,
      subscription_end: info.subscription_end ?? null,
    });
    setSubLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadPayments();
      loadSubscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Učitavanje...</p>
      </div>
    );
  }

  const isYearly = subInfo?.product_id === STRIPE_PRODUCT_IDS.PREMIUM_YEARLY;
  const planLabel = subInfo?.subscribed ? (isYearly ? "Premium (godišnje)" : "Premium (mjesečno)") : "Free";
  const endDate = subInfo?.subscription_end ?? null;

  const totalPaid = payments
    .filter((p) => ["paid", "succeeded", "complete", "completed"].includes((p.status ?? "").toLowerCase()))
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return (
    <>
      <PageNav />

      <div className="container max-w-5xl mx-auto px-4 pt-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Historija plaćanja
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pregled svih transakcija i trenutni period pretplate.
        </p>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/profil">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Nazad na profil
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              loadPayments();
              loadSubscription();
            }}
            disabled={loading || subLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading || subLoading ? "animate-spin" : ""}`} />
            Osvježi
          </Button>
        </div>

        {/* Trenutni premium period */}
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              Trenutni period pretplate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subLoading ? (
              <p className="text-sm text-muted-foreground">Sinhronizujem sa Stripe-om...</p>
            ) : subInfo?.subscribed ? (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-[hsl(var(--gold))] text-[#0f1f3d] hover:bg-[hsl(var(--gold))]">
                    <Crown className="h-3 w-3 mr-1" /> {planLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Aktivan</span>
                </div>
                {endDate && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>
                      Sljedeća automatska naplata / istek perioda:{" "}
                      <span className="font-medium text-foreground">{formatDate(endDate)}</span>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Free</Badge>
                <span className="text-xs text-muted-foreground">
                  {isPremium
                    ? "Premium pristup je aktivan kroz drugi izvor (admin/jednokratni)."
                    : "Nemaš aktivnu Premium pretplatu."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabela plaćanja */}
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <CardTitle className="flex items-center gap-2 text-base">
                <Receipt className="h-4 w-4 text-primary" />
                Sve transakcije
                <span className="text-xs font-normal text-muted-foreground">
                  ({payments.length})
                </span>
              </CardTitle>
              {totalPaid > 0 && (
                <span className="text-xs text-muted-foreground">
                  Ukupno plaćeno:{" "}
                  <span className="font-semibold text-foreground">
                    {formatPrice(totalPaid, payments[0]?.currency ?? "EUR")}
                  </span>
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Greška pri učitavanju historije plaćanja</p>
                  <p className="text-destructive/80 break-words">{error}</p>
                </div>
              </div>
            )}

            {loading ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Učitavanje transakcija...</p>
            ) : payments.length === 0 ? (
              <div className="rounded-md border border-dashed border-border/50 bg-muted/20 p-8 text-center space-y-2">
                <Receipt className="h-8 w-8 mx-auto text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  Još nemaš zabilježenih plaćanja.
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Kada izvršiš prvu uplatu (Premium ili jednokratni paket), pojavit će se ovdje.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Datum</TableHead>
                      <TableHead className="text-xs">Provider</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">Iznos</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Plaćeno</TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-xs whitespace-nowrap">
                          {formatDateTime(p.created_at)}
                        </TableCell>
                        <TableCell className="text-xs capitalize">{p.provider}</TableCell>
                        <TableCell>{getStatusBadge(p.status)}</TableCell>
                        <TableCell className="text-xs text-right font-medium whitespace-nowrap">
                          {formatPrice(p.amount, p.currency)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden md:table-cell whitespace-nowrap">
                          {formatDateTime(p.paid_at)}
                        </TableCell>
                        <TableCell className="text-[10px] font-mono text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                          {p.transaction_id || "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-[11px] text-muted-foreground/70 text-center">
          Plaćanja se sinhronizuju automatski preko Stripe webhook-a. Ako neka transakcija nedostaje,
          klikni „Osvježi" ili koristi „Upravljaj pretplatom" na profilu.
        </p>
      </div>
    </>
  );
}
