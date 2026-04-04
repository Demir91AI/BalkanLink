import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Landmark, Wallet, Star, X } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface FooterReview {
  id: string;
  username: string;
  rating: number;
  comment: string;
}

interface FullReview {
  id: string;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-110">
          <Star className={`h-7 w-7 transition-colors ${s <= (hover || value) ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
        </button>
      ))}
    </div>
  );
}

function AllReviewsModal() {
  const { t } = useTranslation();
  const [allReviews, setAllReviews] = useState<FullReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(100);
    if (data) setAllReviews(data as FullReview[]);
    setLoading(false);
  };

  useEffect(() => {
    if (open) { fetchAll(); setSubmitted(false); setRating(0); setComment(""); setUsername(""); }
  }, [open]);

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim().length < 3) return;
    const { error } = await supabase.from("reviews").insert({ username: username.trim() || t("reviews.anonymous"), rating, comment: comment.trim() });
    if (error) { toast.error(t("reviews.errorSend")); return; }
    toast.success(t("reviews.successSend"));
    setSubmitted(true);
    setRating(0); setComment(""); setUsername("");
    fetchAll();
  };

  const isValid = rating > 0 && comment.trim().length >= 3;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[12px] font-semibold text-[hsl(var(--gold))] hover:underline hover:opacity-80 cursor-pointer mt-1 text-left transition-opacity">
          {t("reviews.viewAll")} →
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t("reviews.allTitle")}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-4">{t("reviews.loading")}</p>
        ) : allReviews.length > 0 ? (
          <div className="space-y-3 mb-6">
            {allReviews.map((r) => (
              <div key={r.id} className="rounded-[10px] border border-[#E8E0D0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-foreground leading-relaxed mb-1">{r.comment}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">— {r.username}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">{t("reviews.noReviews")}</p>
        )}

        <div className="border-t border-[#E8E0D0] pt-5">
          <h3 className="text-sm font-bold mb-3">{t("reviews.leaveReview")}</h3>
          {!submitted ? (
            <div className="space-y-3">
              <StarInput value={rating} onChange={setRating} />
              <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("reviews.comment")} className="border-[#E8E0D0] resize-none min-h-[80px]" rows={3} />
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("reviews.name")} className="border-[#E8E0D0]" />
              <Button onClick={handleSubmit} disabled={!isValid} className="bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))] disabled:opacity-50">
                {t("reviews.submit")}
              </Button>
            </div>
          ) : (
            <p className="text-sm font-semibold text-center py-3">{t("reviews.thanks")}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<FooterReview[]>([]);

  useEffect(() => {
    supabase.from("reviews").select("id, username, rating, comment").order("created_at", { ascending: false }).limit(3).then(({ data }) => {
      if (data) setReviews(data as FooterReview[]);
    });
  }, []);

  return (
    <footer className="border-t border-[#E8E0D0] text-[#2D2D2D]" style={{ background: "#FAFAF7" }}>
      <div className="container py-12">
        <div className="grid gap-10 text-left grid-cols-4">
          <div>
            <BrandLogo variant="small" />
            <p className="mt-3 text-[13px] leading-relaxed text-[#6B6B6B]">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">{t("footer.legalSection")}</h4>
            <nav className="flex flex-col items-start gap-2.5">
              <Link to="/impressum" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.privacy")}</Link>
              <Link to="/agb" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.agb")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.kiHinweis")}</Link>
              <Link to="/inhalte-melden" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.reportContent")}</Link>
              <button onClick={() => (window as any).__blOpenCookieSettings?.()} className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))] text-left">
                {t("cookie.footerLink")}
              </button>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">{t("footer.trust")}</h4>
            <div className="flex flex-col gap-3">
              {reviews.length > 0 ? reviews.map((r) => (
                <div key={r.id} className="text-left">
                  <p className="text-[13px] text-[#6B6B6B] leading-snug line-clamp-2">"{r.comment}"</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={`h-3 w-3 ${si < r.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#6B6B6B]/60 mt-0.5">— {r.username}</p>
                </div>
              )) : (
                <p className="text-[12px] text-[#6B6B6B]/60">{t("reviews.noReviews")}</p>
              )}
              <AllReviewsModal />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">{t("footer.paymentMethods")}</h4>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title="Stripe">
                <CreditCard className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">Stripe</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title="PayPal">
                <Wallet className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">PayPal</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title={t("footer.creditCard")}>
                <CreditCard className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">{t("footer.creditCard")}</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title={t("footer.bankTransfer")}>
                <Landmark className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">{t("footer.bankTransfer")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#E8E0D0] to-transparent" />
        <p className="mt-6 text-center text-sm text-[#6B6B6B]">© {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
