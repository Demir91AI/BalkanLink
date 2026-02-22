import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import {
  ExternalLink, Bus, Plus, AlertTriangle, MapPin, Calendar,
  Users, Phone, MessageCircle, ArrowRight, Search, X, Filter,
  ChevronDown, Globe, Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ── Bus Prevoznici grouped by country ── */
interface Carrier {
  name: string;
  url: string;
  phone?: string;
  whatsapp?: string;
  badges?: ("Direktlinie" | "Umstieg" | "Beliebt bei Diaspora")[];
}

interface CountryCarriers {
  country: string;
  carriers: Carrier[];
}

const busCarriersByCountry: CountryCarriers[] = [
  {
    country: "Bosna i Hercegovina",
    carriers: [
      { name: "Centrotrans", url: "https://www.centrotrans.com", badges: ["Direktlinie", "Beliebt bei Diaspora"] },
      { name: "Globtour", url: "https://www.globtour.com", badges: ["Direktlinie", "Beliebt bei Diaspora"] },
      { name: "Eurolines / Touring", url: "https://www.eurolines.de", badges: ["Direktlinie"] },
      { name: "Flixbus", url: "https://www.flixbus.de", badges: ["Umstieg"] },
    ],
  },
  {
    country: "Srbija",
    carriers: [
      { name: "Lasta", url: "https://www.lasta.rs", badges: ["Direktlinie", "Beliebt bei Diaspora"] },
      { name: "Niš Ekspres", url: "https://www.nisekspres.rs", badges: ["Direktlinie"] },
      { name: "Flixbus", url: "https://www.flixbus.de", badges: ["Umstieg"] },
    ],
  },
  {
    country: "Hrvatska",
    carriers: [
      { name: "Čazmatrans / Arriva", url: "https://www.arriva.com.hr", badges: ["Direktlinie", "Beliebt bei Diaspora"] },
      { name: "Flixbus", url: "https://www.flixbus.de", badges: ["Direktlinie"] },
      { name: "Croatia Bus", url: "https://www.croatiabus.hr", badges: ["Direktlinie"] },
    ],
  },
  {
    country: "Crna Gora",
    carriers: [
      { name: "Globtour", url: "https://www.globtour.com", badges: ["Direktlinie"] },
      { name: "Eurolines / Touring", url: "https://www.eurolines.de", badges: ["Umstieg"] },
    ],
  },
  {
    country: "Sjeverna Makedonija",
    carriers: [
      { name: "Eurobus", url: "https://www.eurobus.com.mk", badges: ["Direktlinie"] },
      { name: "Flixbus", url: "https://www.flixbus.de", badges: ["Umstieg"] },
    ],
  },
  {
    country: "Kosovo",
    carriers: [
      { name: "Kosova Linja", url: "https://www.kosovalinja.com", badges: ["Direktlinie", "Beliebt bei Diaspora"] },
      { name: "Flixbus", url: "https://www.flixbus.de", badges: ["Umstieg"] },
    ],
  },
  {
    country: "Albanija",
    carriers: [
      { name: "Flixbus", url: "https://www.flixbus.de", badges: ["Umstieg"] },
      { name: "Eurolines / Touring", url: "https://www.eurolines.de", badges: ["Umstieg"] },
    ],
  },
];

/* ── Types ── */
interface Ride {
  id: string;
  from_text: string;
  to_text: string;
  from_city: string | null;
  to_city: string | null;
  depart_at: string;
  seats_total: number;
  seats_available: number;
  price_eur: number | null;
  price_type: string;
  notes: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  status: string;
  created_at: string;
}

interface RideForm {
  from_text: string;
  to_text: string;
  depart_date: Date | undefined;
  depart_time: string;
  seats_total: string;
  price_eur: string;
  price_type: string;
  notes: string;
  contact_phone: string;
  contact_whatsapp: string;
  disclaimer: boolean;
}

const emptyForm: RideForm = {
  from_text: "",
  to_text: "",
  depart_date: undefined,
  depart_time: "08:00",
  seats_total: "3",
  price_eur: "",
  price_type: "per_person",
  notes: "",
  contact_phone: "",
  contact_whatsapp: "",
  disclaimer: false,
};

interface Filters {
  from: string;
  to: string;
  date: Date | undefined;
}

export default function Putovanja() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<RideForm>({ ...emptyForm });
  const [filters, setFilters] = useState<Filters>({ from: "", to: "", date: undefined });
  const [showFilters, setShowFilters] = useState(false);

  const set = (key: keyof RideForm, val: any) => setForm((f) => ({ ...f, [key]: val }));

  /* ── Fetch rides ── */
  const { data: rides = [], isLoading } = useQuery<Ride[]>({
    queryKey: ["rides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rides")
        .select("*")
        .eq("status", "active")
        .gte("depart_at", new Date().toISOString())
        .order("depart_at", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as Ride[];
    },
  });

  /* ── Client-side filter ── */
  const filteredRides = useMemo(() => {
    let result = rides;
    const fromQ = filters.from.toLowerCase().trim();
    const toQ = filters.to.toLowerCase().trim();
    if (fromQ) {
      result = result.filter(
        (r) =>
          r.from_text.toLowerCase().includes(fromQ) ||
          (r.from_city && r.from_city.toLowerCase().includes(fromQ))
      );
    }
    if (toQ) {
      result = result.filter(
        (r) =>
          r.to_text.toLowerCase().includes(toQ) ||
          (r.to_city && r.to_city.toLowerCase().includes(toQ))
      );
    }
    if (filters.date) {
      const dateStr = format(filters.date, "yyyy-MM-dd");
      result = result.filter((r) => r.depart_at.startsWith(dateStr));
    }
    return result;
  }, [rides, filters]);

  /* ── Create ride mutation ── */
  const createRide = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Login required");
      if (!form.disclaimer) throw new Error("Disclaimer required");
      if (!form.from_text || !form.to_text || !form.depart_date) throw new Error("Missing fields");
      if (!form.contact_phone && !form.contact_whatsapp) throw new Error("Contact required");

      const seats = Math.min(9, Math.max(1, parseInt(form.seats_total) || 3));
      const [hours, minutes] = form.depart_time.split(":").map(Number);
      const departAt = new Date(form.depart_date);
      departAt.setHours(hours || 8, minutes || 0, 0, 0);

      const { error } = await supabase.from("rides").insert({
        user_id: user.id,
        from_text: form.from_text.trim(),
        to_text: form.to_text.trim(),
        from_city: form.from_text.trim(),
        to_city: form.to_text.trim(),
        depart_at: departAt.toISOString(),
        seats_total: seats,
        seats_available: seats,
        price_eur: form.price_eur ? parseFloat(form.price_eur) : null,
        price_type: form.price_type,
        notes: form.notes.trim() || null,
        contact_phone: form.contact_phone.trim() || null,
        contact_whatsapp: form.contact_whatsapp.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "✅ Vožnja objavljena!" });
      setShowForm(false);
      setForm({ ...emptyForm });
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
    onError: (e: any) =>
      toast({ title: "Greška", description: e.message, variant: "destructive" }),
  });

  const canSubmit =
    form.from_text &&
    form.to_text &&
    form.depart_date &&
    (form.contact_phone || form.contact_whatsapp) &&
    form.disclaimer &&
    !createRide.isPending;

  const hasActiveFilters = filters.from || filters.to || filters.date;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white md:text-4xl"
          >
            🚗 Balkan Ride
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base"
          >
            Nudim prijevoz • Tražim prijevoz • Putujem na Balkan
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Button
              size="lg"
              onClick={() => {
                if (!user) {
                  toast({
                    title: "Prijava potrebna",
                    description: "Prijavi se da objaviš svoju vožnju.",
                    variant: "destructive",
                  });
                  return;
                }
                setShowForm(true);
              }}
              className="gap-2 bg-[#E3B341] text-[#0F1B2D] hover:bg-[#E3B341]/90 font-bold text-base px-8"
            >
              <Plus className="h-5 w-5" /> Objavi vožnju
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-10" style={{ background: "#0F1B2D" }}>
        <div className="container max-w-4xl space-y-8">
          {/* ── Disclaimer ── */}
          <div
            className="flex items-start gap-2.5 rounded-xl p-4"
            style={{
              background: "rgba(227,179,65,0.08)",
              border: "1px solid rgba(227,179,65,0.2)",
            }}
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#E3B341]" />
            <p className="text-xs text-white/50">
              BalkanLink je oglasnik; nije prijevoznik. Korištenje na vlastitu
              odgovornost. Ne preuzimamo odgovornost za dogovorene vožnje.
            </p>
          </div>

          {/* ── Filters ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))",
              border: "1px solid rgba(227,179,65,0.15)",
            }}
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#E3B341]" />
                <span className="text-sm font-semibold text-white">
                  Pretraži vožnje
                </span>
                {hasActiveFilters && (
                  <span className="rounded-full bg-[#E3B341] px-2 py-0.5 text-[10px] font-bold text-[#0F1B2D]">
                    Filtrirano
                  </span>
                )}
              </div>
              <span className="text-xs text-white/30">
                {showFilters ? "Sakrij" : "Prikaži"}
              </span>
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <Label className="text-xs text-white/50">Odakle</Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/30" />
                        <Input
                          value={filters.from}
                          onChange={(e) =>
                            setFilters((f) => ({ ...f, from: e.target.value }))
                          }
                          placeholder="npr. München"
                          className="border-white/10 pl-8 text-white text-sm"
                          style={{ background: "#16263F" }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-white/50">Kuda</Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/30" />
                        <Input
                          value={filters.to}
                          onChange={(e) =>
                            setFilters((f) => ({ ...f, to: e.target.value }))
                          }
                          placeholder="npr. Sarajevo"
                          className="border-white/10 pl-8 text-white text-sm"
                          style={{ background: "#16263F" }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-white/50">Datum</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "mt-1 w-full justify-start text-left text-sm font-normal border-white/10 text-white",
                              !filters.date && "text-white/40"
                            )}
                            style={{ background: "#16263F" }}
                          >
                            <Calendar className="mr-2 h-3.5 w-3.5" />
                            {filters.date
                              ? format(filters.date, "dd.MM.yyyy")
                              : "Odaberi datum"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarPicker
                            mode="single"
                            selected={filters.date}
                            onSelect={(d) =>
                              setFilters((f) => ({ ...f, date: d }))
                            }
                            disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setFilters({ from: "", to: "", date: undefined })
                      }
                      className="mt-3 gap-1 text-xs text-white/40 hover:text-white"
                    >
                      <X className="h-3 w-3" /> Očisti filtere
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Rides List ── */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/60">
                {filteredRides.length}{" "}
                {filteredRides.length === 1 ? "vožnja" : "vožnji"}
              </h2>
            </div>

            {isLoading && (
              <div className="py-12 text-center">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#E3B341] border-t-transparent" />
              </div>
            )}

            {!isLoading && filteredRides.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-white/30">
                  {hasActiveFilters
                    ? "Nema vožnji za tražene kriterije."
                    : "Trenutno nema objavljenih vožnji. Budi prvi!"}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {filteredRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>

          {/* ── Bus Prevoznici ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))",
              border: "1px solid rgba(227,179,65,0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Bus className="h-5 w-5 text-[#E3B341]" />
              <h2 className="text-lg font-bold text-white">Bus Prevoznici</h2>
            </div>
            <p className="text-sm text-white/40 mb-5">
              Profesionalni prevoznici na linijama Njemačka ↔ Balkan, grupirani po zemlji.
            </p>
            <div className="space-y-2">
              {busCarriersByCountry.map((group) => (
                <BusCountryGroup key={group.country} group={group} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Post Ride Dialog ── */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent
          className="max-h-[90vh] overflow-y-auto sm:max-w-lg"
          style={{ background: "#0F1B2D", border: "1px solid rgba(227,179,65,0.2)" }}
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              Objavi vožnju
            </DialogTitle>
            <DialogDescription className="text-white/40 text-sm">
              Popuni detalje o svojoj vožnji.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* From / To */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-white/50">
                  <MapPin className="mr-1 inline h-3 w-3" />
                  Polazište *
                </Label>
                <Input
                  value={form.from_text}
                  onChange={(e) => set("from_text", e.target.value)}
                  placeholder="npr. München"
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                  maxLength={100}
                />
              </div>
              <div>
                <Label className="text-xs text-white/50">
                  <MapPin className="mr-1 inline h-3 w-3" />
                  Odredište *
                </Label>
                <Input
                  value={form.to_text}
                  onChange={(e) => set("to_text", e.target.value)}
                  placeholder="npr. Sarajevo"
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                  maxLength={100}
                />
              </div>
            </div>

            {/* Date / Time */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-white/50">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  Datum polaska *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "mt-1 w-full justify-start text-left text-sm font-normal border-white/10 text-white",
                        !form.depart_date && "text-white/40"
                      )}
                      style={{ background: "#16263F" }}
                    >
                      <Calendar className="mr-2 h-3.5 w-3.5" />
                      {form.depart_date
                        ? format(form.depart_date, "dd.MM.yyyy")
                        : "Odaberi datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarPicker
                      mode="single"
                      selected={form.depart_date}
                      onSelect={(d) => set("depart_date", d)}
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-xs text-white/50">Vrijeme polaska</Label>
                <Input
                  type="time"
                  value={form.depart_time}
                  onChange={(e) => set("depart_time", e.target.value)}
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                />
              </div>
            </div>

            {/* Seats / Price */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <Label className="text-xs text-white/50">
                  <Users className="mr-1 inline h-3 w-3" />
                  Mjesta *
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={form.seats_total}
                  onChange={(e) => set("seats_total", e.target.value)}
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                />
              </div>
              <div>
                <Label className="text-xs text-white/50">Cijena (€)</Label>
                <Input
                  type="number"
                  min="0"
                  step="5"
                  value={form.price_eur}
                  onChange={(e) => set("price_eur", e.target.value)}
                  placeholder="30"
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                />
              </div>
              <div>
                <Label className="text-xs text-white/50">Tip cijene</Label>
                <Select
                  value={form.price_type}
                  onValueChange={(v) => set("price_type", v)}
                >
                  <SelectTrigger
                    className="mt-1 border-white/10 text-white text-sm"
                    style={{ background: "#16263F" }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per_person">Po osobi</SelectItem>
                    <SelectItem value="total">Ukupno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-white/50">
                  <Phone className="mr-1 inline h-3 w-3" />
                  Telefon
                </Label>
                <Input
                  value={form.contact_phone}
                  onChange={(e) => set("contact_phone", e.target.value)}
                  placeholder="+49..."
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                  maxLength={20}
                />
              </div>
              <div>
                <Label className="text-xs text-white/50">
                  <MessageCircle className="mr-1 inline h-3 w-3" />
                  WhatsApp
                </Label>
                <Input
                  value={form.contact_whatsapp}
                  onChange={(e) => set("contact_whatsapp", e.target.value)}
                  placeholder="+49..."
                  className="mt-1 border-white/10 text-white text-sm"
                  style={{ background: "#16263F" }}
                  maxLength={20}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label className="text-xs text-white/50">Napomena</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Dodatne informacije o vožnji..."
                className="mt-1 min-h-[60px] border-white/10 text-white text-sm"
                style={{ background: "#16263F" }}
                maxLength={500}
              />
            </div>

            {/* Disclaimer checkbox */}
            <div
              className="flex items-start gap-3 rounded-lg p-3"
              style={{
                background: "rgba(227,179,65,0.08)",
                border: "1px solid rgba(227,179,65,0.2)",
              }}
            >
              <Checkbox
                id="disclaimer"
                checked={form.disclaimer}
                onCheckedChange={(v) => set("disclaimer", !!v)}
                className="mt-0.5 border-[#E3B341]/50 data-[state=checked]:bg-[#E3B341] data-[state=checked]:text-[#0F1B2D]"
              />
              <label htmlFor="disclaimer" className="text-xs text-white/50 cursor-pointer">
                Potvrđujem da BalkanLink nije prijevoznik i ne preuzima
                odgovornost za dogovorene vožnje. Korištenje na vlastitu
                odgovornost. *
              </label>
            </div>

            <Button
              onClick={() => createRide.mutate()}
              disabled={!canSubmit}
              className="w-full bg-[#E3B341] text-[#0F1B2D] hover:bg-[#E3B341]/90 font-bold"
            >
              {createRide.isPending ? "Objavljuje se…" : "Objavi vožnju"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── Ride Card Component ── */
function RideCard({ ride }: { ride: Ride }) {
  const departDate = new Date(ride.depart_at);
  const dateStr = format(departDate, "dd.MM.yyyy");
  const timeStr = format(departDate, "HH:mm");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Route */}
      <div className="flex items-center gap-2 text-base font-bold text-white">
        <MapPin className="h-4 w-4 text-[#E3B341] shrink-0" />
        <span className="truncate">{ride.from_text}</span>
        <ArrowRight className="h-4 w-4 text-[#E3B341] shrink-0" />
        <span className="truncate">{ride.to_text}</span>
      </div>

      {/* Details row */}
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {dateStr} • {timeStr}h
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {ride.seats_available}/{ride.seats_total} mjesta
        </span>
        {ride.price_eur !== null && (
          <span className="text-[#E3B341] font-semibold">
            {ride.price_eur}€{" "}
            <span className="font-normal text-white/30">
              {ride.price_type === "per_person" ? "/ os." : "ukupno"}
            </span>
          </span>
        )}
      </div>

      {/* Notes */}
      {ride.notes && (
        <p className="mt-2 text-xs text-white/35 line-clamp-2">{ride.notes}</p>
      )}

      {/* Contact */}
      <div className="mt-3 flex flex-wrap gap-2">
        {ride.contact_phone && (
          <a
            href={`tel:${ride.contact_phone}`}
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-white/70 transition hover:text-[#E3B341]"
            style={{
              background: "rgba(15,27,45,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Phone className="h-3 w-3" />
            {ride.contact_phone}
          </a>
        )}
        {ride.contact_whatsapp && (
          <a
            href={`https://wa.me/${ride.contact_whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-white/70 transition hover:text-green-400"
            style={{
              background: "rgba(15,27,45,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <MessageCircle className="h-3 w-3" />
            WhatsApp
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Bus Country Group (expandable) ── */
function BusCountryGroup({ group }: { group: CountryCarriers }) {
  const [open, setOpen] = useState(false);

  const badgeStyle = (badge: string) => {
    if (badge === "Direktlinie")
      return "bg-green-500/15 text-green-400 border-green-500/20";
    if (badge === "Beliebt bei Diaspora")
      return "bg-[#E3B341]/15 text-[#E3B341] border-[#E3B341]/20";
    return "bg-white/5 text-white/50 border-white/10";
  };

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ background: "rgba(15,27,45,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-white/[0.03]"
      >
        <div className="flex items-center gap-2.5">
          <Globe className="h-4 w-4 text-[#E3B341]" />
          <span className="text-sm font-semibold text-white">{group.country}</span>
          <span className="text-[11px] text-white/30">{group.carriers.length} prevoznika</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/30 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5 px-3 pb-3">
              {group.carriers.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-col gap-1.5 rounded-lg px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                  style={{ background: "rgba(22,38,63,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="flex flex-col gap-1">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-[#E3B341]"
                    >
                      {c.name}
                      <ExternalLink className="h-3 w-3 text-white/25" />
                    </a>
                    {c.badges && c.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {c.badges.map((b) => (
                          <span
                            key={b}
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                              badgeStyle(b)
                            )}
                          >
                            {b === "Beliebt bei Diaspora" && <Star className="h-2.5 w-2.5" />}
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {c.phone && (
                      <a
                        href={`tel:${c.phone}`}
                        className="inline-flex items-center gap-1 text-[11px] text-white/40 transition hover:text-white/70"
                      >
                        <Phone className="h-3 w-3" />
                        {c.phone}
                      </a>
                    )}
                    {c.whatsapp && (
                      <a
                        href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-white/40 transition hover:text-green-400"
                      >
                        <MessageCircle className="h-3 w-3" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
