import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { premiumShowcaseFirms } from "@/components/home/premium-showcase-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FirmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const firm = premiumShowcaseFirms.find((f) => f.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useLanguage();

  if (!firm) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">{t("firm.notFound")}</h1>
        <Button asChild variant="outline">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> {t("common.back")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back */}
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" /> {t("firm.back")}
      </Link>

      {/* Hero image */}
      <div className="relative mt-4 overflow-hidden rounded-2xl">
        <img
          src={firm.images[selectedImage]}
          alt={`${firm.name} ${selectedImage + 1}`}
          className="h-[300px] w-full object-cover sm:h-[400px] transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Logo overlay */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/25 bg-white/20 px-4 py-2.5 backdrop-blur-md">
          <img src={firm.logoUrl} alt={firm.logoAlt} className="h-8 max-w-[120px] object-contain" />
        </div>

        {/* Premium badge */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-gold/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-gold-foreground shadow-lg">
          <Star className="h-3 w-3 fill-current" /> {t("firm.recommended")}
        </span>

        {/* Nav arrows */}
        {firm.images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage((prev) => (prev - 1 + firm.images.length) % firm.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedImage((prev) => (prev + 1) % firm.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {firm.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {firm.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === selectedImage ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {firm.images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {firm.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === selectedImage ? "border-gold shadow-md" : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <img src={img} alt={`${firm.name} ${i + 1}`} className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{firm.name}</h1>

        {firm.city && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-sm">{firm.city}</span>
          </div>
        )}

        <p className="text-base leading-relaxed text-muted-foreground">{firm.fullDescription || firm.description}</p>

        {/* Phone CTA */}
        {firm.phone && (
          <div className="flex items-center gap-3">
            <a
              href={`tel:${firm.phone}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" /> {firm.phone}
            </a>
          </div>
        )}

        {/* Website CTA */}
        {firm.website && (
          <div className="flex gap-3">
            <Button asChild className="btn-gold-gradient rounded-xl px-6 font-bold">
              <a href={firm.website} target="_blank" rel="noopener noreferrer">{t("firm.visitWebsite")}</a>
            </Button>
            {firm.contactUrl && (
              <Button asChild variant="outline" className="rounded-xl border-border/40 px-6 font-semibold">
                <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">{t("firm.contact")}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}