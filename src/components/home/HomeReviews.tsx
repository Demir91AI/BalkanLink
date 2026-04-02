import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const LS_KEY = "bl_reviews_v2";

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveReview(review: Review) {
  const all = loadReviews();
  all.unshift(review);
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              star <= (hover || value)
                ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]"
                : "text-white/15"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = "K" + (review.id.slice(0, 1).toUpperCase());
  return (
    <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-5 transition-all hover:border-white/[0.12]">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--gold))]/20 to-[hsl(var(--gold))]/5 text-xs font-bold text-[hsl(var(--gold))]">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">Korisnik</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < review.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-white/10"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-[10px] text-white/25">
          {new Date(review.createdAt).toLocaleDateString("de-DE")}
        </span>
      </div>
      {review.comment && (
        <p className="text-sm text-white/50 leading-relaxed">{review.comment}</p>
      )}
    </div>
  );
}

export default function HomeReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Odaberi ocjenu (1–5 zvjezdica)");
      return;
    }
    const review: Review = {
      id: crypto.randomUUID(),
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    saveReview(review);
    setReviews(loadReviews());
    setRating(0);
    setComment("");
    setSubmitted(true);
    toast.success("Hvala na recenziji!");
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section id="reviews-section" className="py-14 sm:py-16">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))]/15 bg-[hsl(var(--gold))]/[0.06] px-3 py-1">
            <Sparkles className="h-3 w-3 text-[hsl(var(--gold))]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">Recenzije</span>
          </div>
          <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
            Šta kažu korisnici
          </h2>
          {avgRating && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(Number(avgRating)) ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-white/15"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-white/60">{avgRating}</span>
              <span className="text-xs text-white/30">({reviews.length})</span>
            </div>
          )}
        </motion.div>

        {/* Reviews grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {reviews.slice(0, 6).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-white/10 mb-3" />
            <p className="text-sm font-medium text-white/40 mb-1">Još nema recenzija</p>
            <p className="text-xs text-white/25">
              Budi prvi koji podijeli svoje iskustvo s BalkanLink platformom
            </p>
          </div>
        )}

        {/* Review form */}
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6"
          >
            <h3 className="text-sm font-bold text-white mb-4">Ostavi recenziju</h3>
            <div className="mb-4">
              <StarRating value={rating} onChange={setRating} />
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Napiši komentar (opcionalno)"
              className="mb-4 bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
              rows={3}
            />
            <Button
              onClick={handleSubmit}
              className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] font-bold hover:bg-[hsl(var(--gold))]/90"
            >
              Pošalji recenziju
            </Button>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-6 text-center">
            <p className="text-sm font-semibold text-white">✅ Hvala na recenziji!</p>
          </div>
        )}
      </div>
    </section>
  );
}
