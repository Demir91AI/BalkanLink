import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Landmark, Wallet, Star } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import realcoreLogo from "@/assets/realcore-logo-original.png";

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

function FooterBrandLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={28}
        height={28}
        viewBox="0 0 40 40"
        fill="none"
        className="block shrink-0"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="8" fill="hsl(var(--gold))" />
        <text
          x="4"
          y="30"
          fontFamily="'Arial Black', Arial, sans-serif"
          fontWeight="900"
          fontSize="28"
          letterSpacing="-1"
        >
          <tspan fill="#FFFFFF">B</tspan>
          <tspan fill="#1E293B">L</tspan>
        </text>
      </svg>
      <span className="font-heading text-lg font-extrabold leading-none tracking-tight text-[#1E293B]">
        Balkan<span className="text-[hsl(var(--gold))]">Link</span>
      </span>
    </span>
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
    <footer className="text-[#2D2D2D]" style={{ background: "#F0EDE6" }}>
      {/* Premium gold top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-40" />

      <div className="container py-14">
        {/* Main grid */}
        <div className="grid gap-10 text-left grid-cols-4">
          {/* Brand block */}
          <div>
            <FooterBrandLogo />
            <p className="mt-3 text-[13px] leading-relaxed text-[#4A4A4A]">{t("footer.tagline")}</p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A]">{t("footer.legalSection")}</h4>
            <nav className="flex flex-col items-start gap-2.5">
              <Link to="/impressum" className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.privacy")}</Link>
              <Link to="/agb" className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.agb")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.kiHinweis")}</Link>
              <Link to="/inhalte-melden" className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.reportContent")}</Link>
              <button onClick={() => (window as any).__blOpenCookieSettings?.()} className="text-[13px] text-[#4A4A4A] transition-colors hover:text-[hsl(var(--gold))] text-left">
                {t("cookie.footerLink")}
              </button>
            </nav>
          </div>

          {/* Trust / Reviews */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A]">{t("footer.trust")}</h4>
            <div className="flex flex-col gap-3">
              {reviews.length > 0 ? reviews.map((r) => (
                <div key={r.id} className="text-left">
                  <p className="text-[13px] text-[#4A4A4A] leading-snug line-clamp-2">"{r.comment}"</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={`h-3 w-3 ${si < r.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#D4CFC5]"}`} />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#4A4A4A]/60 mt-0.5">— {r.username}</p>
                </div>
              )) : (
                <p className="text-[12px] text-[#4A4A4A]/60">{t("reviews.noReviews")}</p>
              )}
              <AllReviewsModal />
            </div>
          </div>

          {/* Payment methods */}
          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A]">{t("footer.paymentMethods")}</h4>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex h-8 items-center rounded-md border border-[#D4CFC5] bg-white/70 px-2.5" title="Stripe">
                <CreditCard className="h-4 w-4 text-[#4A4A4A]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#4A4A4A]">Stripe</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#D4CFC5] bg-white/70 px-2.5" title="PayPal">
                <Wallet className="h-4 w-4 text-[#4A4A4A]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#4A4A4A]">PayPal</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#D4CFC5] bg-white/70 px-2.5" title={t("footer.creditCard")}>
                <CreditCard className="h-4 w-4 text-[#4A4A4A]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#4A4A4A]">{t("footer.creditCard")}</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#D4CFC5] bg-white/70 px-2.5" title={t("footer.bankTransfer")}>
                <Landmark className="h-4 w-4 text-[#4A4A4A]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#4A4A4A]">{t("footer.bankTransfer")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#D4CFC5] to-transparent" />

        {/* Copyright */}
        <p className="mt-6 text-center text-[13px] text-[#4A4A4A]">
          © {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}
        </p>

        {/* RealCore attribution */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#D4CFC5]/60 to-transparent" />
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-[11px] font-medium tracking-wide text-[#7A7A7A] uppercase">
            Powered by
          </p>
          <img
            src={realcoreLogo}
            alt="RealCore Digital"
            loading="lazy"
            className="h-[58px] w-auto object-contain"
          />
          <p className="text-[11px] text-[#7A7A7A] tracking-wide">
            Klar denken. Digital umsetzen.
          </p>
        </div>
      </div>
    </footer>
  );
}
