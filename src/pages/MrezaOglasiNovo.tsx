import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateAd } from "@/hooks/useAds";
import { useCityGeo } from "@/hooks/useCityGeo";
import { AD_DOMAINS, AD_TYPES, SERVICE_CATEGORIES, MREZA_DISCLAIMER } from "@/lib/mreza-constants";
import { BUNDESLAENDER } from "@/lib/germany-data";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";

const adSchema = z.object({
  type: z.enum(["SEEKING", "OFFERING"]),
  domain: z.enum(["JOB", "SERVICE", "HOUSING", "CAR"]),
  category: z.string().optional(),
  title: z.string().trim().min(5, "Naslov mora imati barem 5 znakova").max(80),
  description: z.string().trim().min(10, "Opis mora imati barem 10 znakova").max(500),
  bundesland: z.string().min(1, "Odaberite Bundesland"),
  city: z.string().trim().min(2, "Unesite grad"),
  contact_type: z.enum(["PHONE", "EMAIL"]),
  contact_value: z.string().trim().min(3, "Unesite kontakt"),
  owner_email: z.string().trim().email("Unesite ispravan email"),
});

export default function MrezaOglasiNovo() {
  const navigate = useNavigate();
  const createAd = useCreateAd();
  const { suggest, findCity } = useCityGeo();

  const [form, setForm] = useState({
    type: "OFFERING" as string,
    domain: "" as string,
    category: "",
    title: "",
    description: "",
    bundesland: "",
    city: "",
    contact_type: "PHONE" as string,
    contact_value: "",
    owner_email: "",
  });
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const handleCityInput = (val: string) => {
    set("city", val);
    setCitySuggestions(suggest(val).map(c => c.city_name));
  };

  const selectCity = (name: string) => {
    set("city", name);
    setCitySuggestions([]);
    const geo = findCity(name);
    if (geo && !form.bundesland) set("bundesland", geo.bundesland);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = adSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    const geo = findCity(form.city);
    await createAd.mutateAsync({
      ...result.data,
      category: result.data.category || undefined,
      city_lat: geo?.lat,
      city_lng: geo?.lng,
    });
    navigate("/mreza/oglasi");
  };

  return (
    <div className="container max-w-xl py-8 sm:py-12 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" asChild className="mb-3 -ml-2">
          <Link to="/mreza/oglasi"><ArrowLeft className="mr-1 h-4 w-4" />Nazad</Link>
        </Button>
        <h1 className="font-heading text-xl font-extrabold">Objavi oglas</h1>
        <p className="text-sm text-muted-foreground">Oglas traje 15 dana. Besplatno.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div className="space-y-1.5">
          <Label>Tip oglasa *</Label>
          <div className="flex gap-2">
            {AD_TYPES.map(t => (
              <button key={t.value} type="button" onClick={() => set("type", t.value)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${form.type === t.value ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-border"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Domain */}
        <div className="space-y-1.5">
          <Label>Oblast *</Label>
          <Select value={form.domain} onValueChange={v => set("domain", v)}>
            <SelectTrigger><SelectValue placeholder="Odaberite oblast" /></SelectTrigger>
            <SelectContent>
              {AD_DOMAINS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.domain && <p className="text-xs text-destructive">{errors.domain}</p>}
        </div>

        {/* Category for SERVICE */}
        {form.domain === "SERVICE" && (
          <div className="space-y-1.5">
            <Label>Kategorija usluge</Label>
            <Select value={form.category} onValueChange={v => set("category", v)}>
              <SelectTrigger><SelectValue placeholder="Odaberite kategoriju" /></SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Title */}
        <div className="space-y-1.5">
          <Label>Naslov * <span className="text-muted-foreground font-normal">({form.title.length}/80)</span></Label>
          <Input maxLength={80} value={form.title} onChange={e => set("title", e.target.value)} placeholder="npr. Tražim posao u skladištu" />
          {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label>Opis * <span className="text-muted-foreground font-normal">({form.description.length}/500)</span></Label>
          <Textarea maxLength={500} rows={4} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Opišite šta tražite ili nudite..." />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>

        {/* Location */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Bundesland *</Label>
            <Select value={form.bundesland} onValueChange={v => set("bundesland", v)}>
              <SelectTrigger><SelectValue placeholder="Bundesland" /></SelectTrigger>
              <SelectContent>
                {BUNDESLAENDER.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.bundesland && <p className="text-xs text-destructive">{errors.bundesland}</p>}
          </div>
          <div className="space-y-1.5 relative">
            <Label>Grad *</Label>
            <Input value={form.city} onChange={e => handleCityInput(e.target.value)} placeholder="npr. München" autoComplete="off" />
            {citySuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-lg border bg-popover shadow-lg max-h-40 overflow-y-auto">
                {citySuggestions.map(c => (
                  <button key={c} type="button" onClick={() => selectCity(c)} className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors">{c}</button>
                ))}
              </div>
            )}
            {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-1.5">
          <Label>Kontakt *</Label>
          <div className="flex gap-2">
            <Select value={form.contact_type} onValueChange={v => set("contact_type", v)}>
              <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="PHONE">Telefon</SelectItem>
                <SelectItem value="EMAIL">Email</SelectItem>
              </SelectContent>
            </Select>
            <Input className="flex-1" value={form.contact_value} onChange={e => set("contact_value", e.target.value)}
              placeholder={form.contact_type === "PHONE" ? "+49 123 456789" : "email@primjer.de"} />
          </div>
          {errors.contact_value && <p className="text-xs text-destructive">{errors.contact_value}</p>}
        </div>

        {/* Owner email */}
        <div className="space-y-1.5">
          <Label>Vaš email <span className="text-muted-foreground font-normal">(neće biti prikazan)</span> *</Label>
          <Input type="email" value={form.owner_email} onChange={e => set("owner_email", e.target.value)} placeholder="vas@email.de" />
          <p className="text-[10px] text-muted-foreground">Koristi se za upravljanje oglasom. Nikada se ne prikazuje javno.</p>
          {errors.owner_email && <p className="text-xs text-destructive">{errors.owner_email}</p>}
        </div>

        <div className="rounded-lg border border-border/60 bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground leading-relaxed">{MREZA_DISCLAIMER}</p>
        </div>

        <Button type="submit" className="w-full" disabled={createAd.isPending}>
          {createAd.isPending ? "Objavljujem..." : "Objavi oglas (besplatno)"}
        </Button>
      </form>
    </div>
  );
}
