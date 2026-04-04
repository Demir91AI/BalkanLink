import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, CreditCard, Landmark } from "lucide-react";
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

function ReviewFormModal() {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) { setSubmitted(false); setRating(0); setComment(""); setUsername(""); }
  }, [open]);

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim().length < 3) return;
    const { error } = await supabase.from("reviews").insert({ username: username.trim() || t("reviews.anonymous"), rating, comment: comment.trim() });
    if (error) { toast.error(t("reviews.errorSend")); return; }
    toast.success(t("reviews.successSend"));
    setSubmitted(true);
  };

  const isValid = rating > 0 && comment.trim().length >= 3;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[11px] text-[hsl(var(--gold))] hover:underline cursor-pointer transition-opacity">
          {t("reviews.leaveReview")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">{t("reviews.leaveReview")}</DialogTitle>
        </DialogHeader>
        {!submitted ? (
          <div className="space-y-3 pt-2">
            <StarInput value={rating} onChange={setRating} />
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("reviews.comment")} className="border-[#E8E0D0] resize-none min-h-[70px]" rows={2} />
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("reviews.name")} className="border-[#E8E0D0]" />
            <Button onClick={handleSubmit} disabled={!isValid} size="sm" className="bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))] disabled:opacity-50 w-full">
              {t("reviews.submit")}
            </Button>
          </div>
        ) : (
          <p className="text-sm font-semibold text-center py-4">{t("reviews.thanks")}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AllReviewsModal({ reviews }: { reviews: FooterReview[] }) {
  const { t } = useTranslation();
  const [allReviews, setAllReviews] = useState<FullReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(100);
    if (data) setAllReviews(data as FullReview[]);
    setLoading(false);
  };

  useEffect(() => {
    if (open) fetchAll();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[11px] text-[#6A6A6A] hover:text-[hsl(var(--gold))] cursor-pointer transition-colors">
          {t("reviews.viewAll")} →
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">{t("reviews.allTitle")}</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-4">{t("reviews.loading")}</p>
        ) : allReviews.length > 0 ? (
          <div className="space-y-2.5">
            {allReviews.map((r) => (
              <div key={r.id} className="flex items-start gap-3 py-2.5 border-b border-[#E8E0D0] last:border-0">
                <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-foreground leading-snug">{r.comment}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">— {r.username}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">{t("reviews.noReviews")}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FooterBrandLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={28} height={28} viewBox="0 0 40 40" fill="none" className="block shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="8" fill="hsl(var(--gold))" />
        <text x="4" y="30" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1">
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

const Divider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C4BDB0]/50 to-transparent" />
);

export default function Footer() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<FooterReview[]>([]);

  useEffect(() => {
    supabase.from("reviews").select("id, username, rating, comment").order("created_at", { ascending: false }).limit(3).then(({ data }) => {
      if (data) setReviews(data as FooterReview[]);
    });
  }, []);

  const legalLinks = [
    { to: "/impressum", label: t("footer.imprint") },
    { to: "/datenschutz", label: t("footer.privacy") },
    { to: "/agb", label: t("footer.agb") },
    { to: "/haftungsausschluss", label: t("footer.haftung") },
    { to: "/ki-hinweis", label: t("footer.kiHinweis") },
    { to: "/inhalte-melden", label: t("footer.reportContent") },
  ];

  const paymentMethods = ["Stripe", "PayPal", t("footer.creditCard"), t("footer.bankTransfer")];

  return (
    <footer className="text-[#3A3A3A]" style={{ background: "#F0EDE6" }}>
      {/* Gold accent top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-50" />

      <div className="container max-w-3xl mx-auto py-16 flex flex-col items-center">

        {/* 1. Brand */}
        <div className="flex flex-col items-center gap-2">
          <FooterBrandLogo />
          <p className="text-[13px] text-[#505050] leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <div className="my-10 w-full"><Divider /></div>

        {/* 2. Legal links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1.5">
          {legalLinks.map((link, i) => (
            <span key={link.to} className="flex items-center">
              <Link to={link.to} className="text-[12px] text-[#505050] transition-colors hover:text-[hsl(var(--gold))]">
                {link.label}
              </Link>
              {i < legalLinks.length - 1 && <span className="text-[#B8B0A0] mx-2">·</span>}
            </span>
          ))}
          <span className="flex items-center">
            <span className="text-[#B8B0A0] mx-2">·</span>
            <button
              onClick={() => (window as any).__blOpenCookieSettings?.()}
              className="text-[12px] text-[#505050] transition-colors hover:text-[hsl(var(--gold))]"
            >
              {t("cookie.footerLink")}
            </button>
          </span>
        </nav>

        <div className="my-10 w-full"><Divider /></div>

        {/* 3. Payment methods with icons */}
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#505050]">{t("footer.paymentMethods")}</h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Stripe */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4CFC5] bg-white/60">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635BFF"/>
              </svg>
              <span className="text-[12px] font-semibold text-[#505050]">Stripe</span>
            </div>
            {/* PayPal */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4CFC5] bg-white/60">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" fill="#003087"/>
                <path d="M18.318 7.468c-.025.166-.054.333-.089.504-1.148 5.887-5.083 7.922-10.108 7.922H6.379c-.613 0-1.131.444-1.227 1.048l-1.154 7.322a.554.554 0 0 0 .547.64h3.842c.537 0 .993-.39 1.076-.919l.044-.23.853-5.4.055-.299c.083-.528.539-.919 1.076-.919h.677c4.383 0 7.816-1.78 8.819-6.932.419-2.15.202-3.946-.906-5.207a4.32 4.32 0 0 0-1.237-.93z" fill="#009cde"/>
              </svg>
              <span className="text-[12px] font-semibold text-[#505050]">PayPal</span>
            </div>
            {/* Mastercard / Credit Card */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4CFC5] bg-white/60">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <circle cx="9" cy="12" r="7" fill="#EB001B" opacity="0.9"/>
                <circle cx="15" cy="12" r="7" fill="#F79E1B" opacity="0.9"/>
                <path d="M12 6.5a6.98 6.98 0 0 1 2.5 5.5 6.98 6.98 0 0 1-2.5 5.5A6.98 6.98 0 0 1 9.5 12 6.98 6.98 0 0 1 12 6.5z" fill="#FF5F00"/>
              </svg>
              <span className="text-[12px] font-semibold text-[#505050]">{t("footer.creditCard")}</span>
            </div>
            {/* Bank Transfer */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4CFC5] bg-white/60">
              <Landmark className="h-5 w-5 text-[#505050]" />
              <span className="text-[12px] font-semibold text-[#505050]">{t("footer.bankTransfer")}</span>
            </div>
          </div>
        </div>

        <div className="my-10 w-full"><Divider /></div>

        {/* 4. Trust */}
        <div className="flex flex-col items-center gap-3">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#505050]">{t("footer.trust")}</h4>
          {reviews.length > 0 ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className={`h-4.5 w-4.5 ${si < reviews[0].rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#D4CFC5]"}`} />
                ))}
              </div>
              <p className="text-[14px] font-medium text-[#3A3A3A] text-center max-w-md leading-relaxed italic">
                "{reviews[0].comment}"
              </p>
              <p className="text-[11px] text-[#6A6A6A]">— {reviews[0].username}</p>
            </div>
          ) : (
            <p className="text-[12px] text-[#6A6A6A]">{t("reviews.noReviews")}</p>
          )}
          <AllReviewsModal />
        </div>

        {/* RealCore accent divider */}
        <div className="mt-12 mb-8 w-full">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/30 to-transparent" />
        </div>

        {/* 5. RealCore */}
        <div className="flex flex-col items-center gap-2.5">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-[#8A8A8A] uppercase">Powered by</p>
          <img
            src={realcoreLogo}
            alt="RealCore Digital"
            loading="lazy"
            className="h-[46px] w-auto object-contain"
          />
          <p className="text-[11px] text-[#7A7A7A] tracking-wide italic">Klar denken. Digital umsetzen.</p>
        </div>

        <div className="mt-10 mb-0 w-full"><Divider /></div>

        {/* 6. Copyright */}
        <p className="mt-6 text-[12px] text-[#6A6A6A]">
          © {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
