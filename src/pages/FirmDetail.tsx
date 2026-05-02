import { useParams } from "react-router-dom";
import { Phone, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { premiumShowcaseFirms } from "@/components/home/premium-showcase-data";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function FirmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const firm = premiumShowcaseFirms.find((f) => f.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  if (!firm) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs />
        <h1 className="mt-6 text-center text-2xl font-bold text-foreground">Firma nije pronađena</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs currentLabel={firm.name} />

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
          <img src={firm.logoUrl} alt={firm.logoAlt} className="h-8 max-w-[120px] object-contain" loading="lazy" decoding="async" />
        </div>

        {/* Premium badge */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-gold/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-gold-foreground shadow-lg">
          <Star className="h-3 w-3 fill-current" /> {"Preporučeno"}
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
              <img src={img} alt={`${firm.name} ${i + 1}`} className="h-16 w-24 object-cover" loading="lazy" decoding="async" width="96" height="64" />
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
              <a href={firm.website} target="_blank" rel="noopener noreferrer">{"Webseite besuchen"}</a>
            </Button>
            {firm.contactUrl && (
              <Button asChild variant="outline" className="rounded-xl border-border/40 px-6 font-semibold">
                <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">{"Kontakt"}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}