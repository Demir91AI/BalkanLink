import { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-110">
          <Star className={`h-7 w-7 transition-colors ${star <= (hover || value) ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-[10px] border border-[#E8E0D0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
          ))}
        </div>
      </div>
      <p className="text-[13px] text-[#2D2D2D] leading-relaxed mb-2">{review.comment}</p>
      <p className="text-[11px] font-semibold text-[#6B6B6B]">{review.username}</p>
    </div>
  );
}

export default function HomeReviews() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(50);
    if (data) setReviews(data as Review[]);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async () => {
    if (rating === 0) { toast.error(t("reviews.errorRating")); return; }
    if (comment.trim().length < 3) { toast.error(t("reviews.errorComment")); return; }
    const { error } = await supabase.from("reviews").insert({ username: username.trim() || t("reviews.anonymous"), rating, comment: comment.trim() });
    if (error) { toast.error(t("reviews.errorSend")); return; }
    toast.success(t("reviews.successSend"));
    setRating(0); setComment(""); setUsername(""); setSubmitted(true);
    fetchReviews();
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);
  const isValid = rating > 0 && comment.trim().length >= 3;

  return (
    <section className="py-16 bg-[hsl(var(--warm-cream))] border-t border-[#E8E0D0]">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-heading text-2xl font-extrabold text-[#2D2D2D] text-center mb-10">
          {t("reviews.title")}
        </h2>

        <div className="grid grid-cols-[1fr_1.2fr] gap-10">
          <div className="space-y-6">
            {reviews.length > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-[#2D2D2D]">{avgRating.toFixed(1)}</span>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.round(avgRating) ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-[#E8E0D0]"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-[#6B6B6B] mt-0.5">{reviews.length} {t("reviews.average")}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <MessageSquare className="mx-auto h-8 w-8 text-[#E8E0D0] mb-2" />
                <p className="text-sm text-[#6B6B6B]">{t("reviews.noReviews")}</p>
              </div>
            )}

            {!submitted ? (
              <div className="rounded-xl border border-[#E8E0D0] bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-[#2D2D2D] mb-4">{t("reviews.leaveReview")}</h3>
                <div className="mb-4"><StarRating value={rating} onChange={setRating} /></div>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("reviews.comment")} className="mb-3 border-[#E8E0D0] text-[#2D2D2D] placeholder:text-[#6B6B6B]/50 resize-none min-h-[100px]" rows={4} />
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("reviews.name")} className="mb-4 border-[#E8E0D0] text-[#2D2D2D] placeholder:text-[#6B6B6B]/50" />
                <Button onClick={handleSubmit} disabled={!isValid} className="bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))] disabled:opacity-50 disabled:cursor-not-allowed">
                  {t("reviews.submit")}
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-6 text-center">
                <p className="text-sm font-semibold text-[#2D2D2D]">{t("reviews.thanks")}</p>
              </div>
            )}
          </div>

          <div>
            {loading ? (
              <div className="text-center py-8 text-sm text-[#6B6B6B]">{t("reviews.loading")}</div>
            ) : reviews.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {visibleReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            ) : null}

            {reviews.length > 5 && !showAll && (
              <div className="text-center mt-4">
                <Button variant="outline" onClick={() => setShowAll(true)} className="border-[#E8E0D0] text-[#6B6B6B] hover:bg-white">
                  {t("reviews.showMore")} ({reviews.length - 5})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
