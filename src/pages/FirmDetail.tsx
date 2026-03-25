import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { premiumShowcaseFirms } from "@/components/home/premium-showcase-data";

export default function FirmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const firm = premiumShowcaseFirms.find((f) => f.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!firm) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Firma nije pronađena</h1>
        <Button asChild variant="outline">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Nazad</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back */}
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Nazad na početnu
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
          <Star className="h-3 w-3 fill-current" /> Preporučeno
        </span>

        {/* Nav arrows */}
        {firm.images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage((p) => (p - 1 + firm.images.length) % firm.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedImage((p) => (p + 1) % firm.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {firm.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              idx === selectedImage ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`${firm.name} ${idx + 1}`} className="h-16 w-24 object-cover sm:h-20 sm:w-28" />
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">{firm.name}</h1>
          {firm.city && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {firm.city}
            </p>
          )}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {firm.highlights.map((h) => (
            <span key={h} className="rounded-full border border-border/40 bg-muted/50 px-3 py-1 text-xs font-semibold text-foreground/70">
              {h}
            </span>
          ))}
        </div>

        {/* Full description */}
        {firm.fullDescription && (
          <div className="rounded-xl border border-border/30 bg-card p-5">
            <h2 className="mb-3 text-lg font-bold text-foreground">O firmi</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{firm.fullDescription}</p>
          </div>
        )}

        {/* Services */}
        {firm.services && firm.services.length > 0 && (
          <div className="rounded-xl border border-border/30 bg-card p-5">
            <h2 className="mb-3 text-lg font-bold text-foreground">Usluge</h2>
            <ul className="space-y-2">
              {firm.services.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact */}
        {firm.phone && (
          <div className="rounded-xl border border-border/30 bg-card p-5">
            <h2 className="mb-3 text-lg font-bold text-foreground">Kontakt</h2>
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
              <a href={firm.website} target="_blank" rel="noopener noreferrer">Posjeti web stranicu</a>
            </Button>
            {firm.contactUrl && (
              <Button asChild variant="outline" className="rounded-xl border-border/40 px-6 font-semibold">
                <a href={firm.contactUrl} target="_blank" rel="noopener noreferrer">Kontakt</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
