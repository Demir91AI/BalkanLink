import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, Bus, Plus, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

/* ── Bus Prevoznici ── */
const busCompanies = [
  { name: "Flixbus", url: "https://www.flixbus.de" },
  { name: "Eurolines", url: "https://www.eurolines.de" },
  { name: "Centrotrans", url: "https://www.centrotrans.com" },
  { name: "Autoprevoz Čazmatrans", url: "https://www.cazmatrans.hr" },
  { name: "Globtour", url: "https://www.globtour.com" },
  { name: "Lasta", url: "https://www.lasta.rs" },
];

interface Ride {
  id: string;
  departure_city: string;
  destination_city: string;
  ride_date: string;
  available_seats: number;
  fuel_contribution: string | null;
  contact_info: string;
  created_at: string;
}

export default function Putovanja() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ departure_city: "", destination_city: "", ride_date: "", available_seats: "1", fuel_contribution: "", contact_info: "" });

  const { data: rides = [], isLoading: ridesLoading } = useQuery<Ride[]>({
    queryKey: ["balkan-rides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("balkan_rides")
        .select("id, departure_city, destination_city, ride_date, available_seats, fuel_contribution, contact_info, created_at")
        .eq("is_active", true)
        .gte("ride_date", new Date().toISOString().split("T")[0])
        .order("ride_date");
      if (error) throw error;
      return data;
    },
  });

  const createRide = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Login required");
      const { error } = await supabase.from("balkan_rides").insert({
        user_id: user.id,
        departure_city: form.departure_city,
        destination_city: form.destination_city,
        ride_date: form.ride_date,
        available_seats: parseInt(form.available_seats) || 1,
        fuel_contribution: form.fuel_contribution || null,
        contact_info: form.contact_info,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Vožnja objavljena!" });
      setShowForm(false);
      setForm({ departure_city: "", destination_city: "", ride_date: "", available_seats: "1", fuel_contribution: "", contact_info: "" });
      queryClient.invalidateQueries({ queryKey: ["balkan-rides"] });
    },
    onError: () => toast({ title: "Greška", variant: "destructive" }),
  });

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white md:text-4xl">
            ✈️ Putovanja & Prevoz
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base">
            Bus prevoznici i zajedničke vožnje Njemačka ↔ Balkan.
          </motion.p>
        </div>
      </section>

      <section className="py-12" style={{ background: "#0F1B2D" }}>
        <div className="container max-w-4xl space-y-10">
          {/* ── Bus Prevoznici ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))", border: "1px solid rgba(227,179,65,0.15)" }}>
            <div className="flex items-center gap-2 mb-1">
              <Bus className="h-5 w-5 text-[#E3B341]" />
              <h2 className="text-lg font-bold text-white">Bus Prevoznici</h2>
            </div>
            <p className="text-sm text-white/40 mb-4">Profesionalni prevoznici na linijama Njemačka ↔ Balkan.</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {busCompanies.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-all hover:text-[#E3B341]"
                  style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {link.name}
                  <ExternalLink className="h-3.5 w-3.5 text-white/30" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Balkan Ride ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))", border: "1px solid rgba(227,179,65,0.15)" }}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-white">🚗 Balkan Ride</h2>
              {user && (
                <Button size="sm" onClick={() => setShowForm(!showForm)}
                  className="gap-1.5 bg-[#E3B341] text-[#0F1B2D] hover:bg-[#E3B341]/90">
                  <Plus className="h-3.5 w-3.5" /> Objavi vožnju
                </Button>
              )}
            </div>
            <p className="text-sm text-white/40 mb-4">Putujem / Nudim prevoz — objavi svoju vožnju.</p>

            {/* Disclaimer */}
            <div className="mb-4 flex items-start gap-2 rounded-lg p-3" style={{ background: "rgba(227,179,65,0.08)", border: "1px solid rgba(227,179,65,0.2)" }}>
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#E3B341]" />
              <p className="text-xs text-white/50">
                BalkanLink pruža samo oglasnik zajednice i nije prijevoznik. Korištenje na vlastitu odgovornost.
              </p>
            </div>

            {/* Create ride form */}
            {showForm && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mb-6 space-y-3 rounded-lg p-4" style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs text-white/50">Polazni grad</Label>
                    <Input value={form.departure_city} onChange={(e) => setForm((f) => ({ ...f, departure_city: e.target.value }))}
                      className="mt-1 border-white/10 text-white" style={{ background: "#16263F" }} placeholder="Berlin" />
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Odredišni grad</Label>
                    <Input value={form.destination_city} onChange={(e) => setForm((f) => ({ ...f, destination_city: e.target.value }))}
                      className="mt-1 border-white/10 text-white" style={{ background: "#16263F" }} placeholder="Sarajevo" />
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Datum</Label>
                    <Input type="date" value={form.ride_date} onChange={(e) => setForm((f) => ({ ...f, ride_date: e.target.value }))}
                      className="mt-1 border-white/10 text-white" style={{ background: "#16263F" }} />
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Slobodna mjesta</Label>
                    <Input type="number" min="1" max="8" value={form.available_seats} onChange={(e) => setForm((f) => ({ ...f, available_seats: e.target.value }))}
                      className="mt-1 border-white/10 text-white" style={{ background: "#16263F" }} />
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Doprinos za gorivo (opciono)</Label>
                    <Input value={form.fuel_contribution} onChange={(e) => setForm((f) => ({ ...f, fuel_contribution: e.target.value }))}
                      className="mt-1 border-white/10 text-white" style={{ background: "#16263F" }} placeholder="30€ po osobi" />
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Kontakt</Label>
                    <Input value={form.contact_info} onChange={(e) => setForm((f) => ({ ...f, contact_info: e.target.value }))}
                      className="mt-1 border-white/10 text-white" style={{ background: "#16263F" }} placeholder="Telefon ili email" />
                  </div>
                </div>
                <Button onClick={() => createRide.mutate()} disabled={!form.departure_city || !form.destination_city || !form.ride_date || !form.contact_info || createRide.isPending}
                  className="w-full bg-[#E3B341] text-[#0F1B2D] hover:bg-[#E3B341]/90">
                  {createRide.isPending ? "Objavljuje se…" : "Objavi vožnju"}
                </Button>
              </motion.div>
            )}

            {!user && (
              <p className="mb-4 text-xs text-white/40">Prijavi se da objaviš svoju vožnju.</p>
            )}

            {/* Rides list */}
            {ridesLoading && <div className="py-8 text-center"><div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#E3B341] border-t-transparent" /></div>}
            {!ridesLoading && rides.length === 0 && <p className="py-6 text-center text-sm text-white/30">Trenutno nema objavljenih vožnji.</p>}
            <div className="space-y-2">
              {rides.map((ride) => (
                <div key={ride.id} className="rounded-lg p-3.5" style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span>{ride.departure_city}</span>
                    <span className="text-[#E3B341]">→</span>
                    <span>{ride.destination_city}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-white/40">
                    <span>📅 {new Date(ride.ride_date).toLocaleDateString("de-DE")}</span>
                    <span>💺 {ride.available_seats} mjesta</span>
                    {ride.fuel_contribution && <span>⛽ {ride.fuel_contribution}</span>}
                    <span>📞 {ride.contact_info}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
