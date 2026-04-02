import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
    <div className="flex gap-1">
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
                : "text-white/20"
            }`}
          />
        </button>
      ))}
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
    <section id="reviews-section" className="py-16 sm:py-20 border-t border-white/[0.05]">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
            Recenzije
          </h2>
          {avgRating && (
            <p className="mt-2 text-sm text-white/40">
              Prosječna ocjena: {avgRating} / 5 ({reviews.length} {reviews.length === 1 ? "recenzija" : "recenzija"})
            </p>
          )}
        </motion.div>

        {/* Review form */}
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-[#0f1f3d] p-6 mb-8"
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
          <div className="rounded-2xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-6 mb-8 text-center">
            <p className="text-sm font-semibold text-white">✅ Hvala na recenziji!</p>
          </div>
        )}

        {/* Reviews list */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.slice(0, 10).map((r) => (
              <div key={r.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < r.rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-white/15"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-white/30 ml-auto">
                    {new Date(r.createdAt).toLocaleDateString("de-DE")}
                  </span>
                </div>
                {r.comment && <p className="text-sm text-white/60">{r.comment}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-white/30">
            Budi prvi koji ostavi recenziju — pomozi zajednici.
          </p>
        )}
      </div>
    </section>
  );
}
