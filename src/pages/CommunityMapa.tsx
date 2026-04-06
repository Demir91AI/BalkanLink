import { useState, useMemo, useCallback } from "react";
import { MapPin, Search, Shield, X, Users, Phone, ExternalLink } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import balkanSarajevo from "@/assets/balkan-sarajevo.jpg";
import balkanBeograd from "@/assets/balkan-beograd.jpg";
import balkanZagreb from "@/assets/balkan-zagreb.jpg";
import balkanMostar from "@/assets/balkan-mostar.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { toast } from "sonner";


interface MapMember {
  id: string;
  city: string;
  displayName: string;
  note: string;
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  createdAt: string;
}

const LS_KEY = "bl_mapa_members_v2";
const LS_SELF_KEY = "bl_mapa_self_id_v2";

function loadMembers(): MapMember[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as any[];
    return parsed.map((m: any) => ({
      id: m.id,
      city: m.city,
      displayName: m.displayName,
      note: m.note || "",
      phone: m.phone || m.contactValue || "",
      createdAt: m.createdAt,
    }));
  } catch { return []; }
}
function saveMembers(m: MapMember[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(m));
}

const GERMAN_CITIES = [
  "Berlin","Hamburg","München","Köln","Frankfurt am Main","Stuttgart","Düsseldorf",
  "Leipzig","Dortmund","Essen","Bremen","Dresden","Hannover","Nürnberg","Duisburg",
  "Bochum","Wuppertal","Bielefeld","Bonn","Münster","Mannheim","Karlsruhe","Augsburg",
  "Wiesbaden","Gelsenkirchen","Aachen","Braunschweig","Kiel","Chemnitz","Halle",
  "Magdeburg","Freiburg","Krefeld","Mainz","Lübeck","Erfurt","Rostock","Kassel",
  "Potsdam","Saarbrücken","Oldenburg","Osnabrück","Leverkusen","Heidelberg",
  "Darmstadt","Regensburg","Ingolstadt","Würzburg","Wolfsburg","Ulm","Heilbronn",
  "Göttingen","Reutlingen","Koblenz","Erlangen","Trier","Jena","Freilassing",
  "Traunstein","Rosenheim","Passau","Landshut","Straubing","Schweinfurt",
];

const visualSlides = [
  { img: balkanSarajevo, label: "Kafa i druženje" },
  { img: balkanBeograd, label: "Café bašta" },
  { img: balkanZagreb, label: "Auto-Treffen" },
  { img: balkanMostar, label: "Druženje i zajednica" },
];

export default function CommunityMapa() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<MapMember[]>(loadMembers);
  const [search, setSearch] = useState("");
  const [step, setStep] = useState<"idle" | "consent" | "form">("idle");
  const [agbChecked, setAgbChecked] = useState(false);
  const [datenschutzChecked, setDatenschutzChecked] = useState(false);
  const [city, setCity] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [selfId, setSelfId] = useState(() => localStorage.getItem(LS_SELF_KEY) || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Message state
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgRecipient, setMsgRecipient] = useState<MapMember | null>(null);
  const [msgText, setMsgText] = useState("");
  const [msgAgbChecked, setMsgAgbChecked] = useState(false);

  const handleBack = () => navigateBackOrHome(navigate);

  const citySuggestions = useMemo(() => {
    if (city.length < 2) return [];
    const q = city.toLowerCase();
    return GERMAN_CITIES.filter(c => c.toLowerCase().includes(q)).slice(0, 8);
  }, [city]);

  const cityGroups = useMemo(() => {
    const groups: Record<string, MapMember[]> = {};
    members.forEach(m => {
      if (!groups[m.city]) groups[m.city] = [];
      groups[m.city].push(m);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [members]);

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return cityGroups;
    const q = search.toLowerCase();
    return cityGroups.filter(([c]) => c.toLowerCase().includes(q));
  }, [search, cityGroups]);

  const handleAddMember = () => {
    if (!city.trim()) return;

    const member: MapMember = {
      id: crypto.randomUUID(),
      city: city.trim(),
      displayName: displayName.trim() || `Korisnik iz ${city.trim()}`,
      note: note.trim().slice(0, 100),
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...members, member];
    setMembers(updated);
    saveMembers(updated);
    setSelfId(member.id);
    localStorage.setItem(LS_SELF_KEY, member.id);
    setStep("idle");
    setCity(""); setDisplayName(""); setNote(""); setPhone("");
    toast.success("Dodan/a si na mapu!");
  };

  const handleRemoveSelf = () => {
    const updated = members.filter(m => m.id !== selfId);
    setMembers(updated); saveMembers(updated);
    setSelfId(""); localStorage.removeItem(LS_SELF_KEY);
    toast.success("Uklonjen/a si s mape.");
  };


  const isSelfOnMap = selfId && members.some(m => m.id === selfId);

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-cream))]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#E8E0D0]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container max-w-4xl px-4 py-10 sm:py-14">
          <PageNavBar onBack={handleBack} />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/80 backdrop-blur-sm mb-3">
                <MapPin className="h-3 w-3" />
                Community
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">
                🗺️ Balkanci u Njemačkoj
              </h1>
              <p className="mt-2 text-sm text-white/70 max-w-md leading-relaxed">
                Dobrovoljno se dodaj na mapu i pronađi Balkance u svom gradu. Kontakt samo uz tvoju saglasnost.
              </p>
            </div>
            <div className="shrink-0">
              {!isSelfOnMap ? (
                <button
                  onClick={() => setStep("consent")}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-[#0f1f3d] transition-all hover:opacity-90"
                  style={{ background: '#C9A84C' }}
                >
                  <MapPin className="h-4 w-4" /> Dodaj se
                </button>
              ) : (
                <button
                  onClick={handleRemoveSelf}
                  className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-300 transition-all hover:bg-red-500/20"
                >
                  <X className="h-4 w-4" /> Ukloni me
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-4xl px-4 py-8 space-y-6">
        {/* Visual carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {visualSlides.map((slide) => (
            <div
              key={slide.label}
              className="rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-250 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img src={slide.img} alt={slide.label} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="px-3 py-2.5 text-[13px] font-semibold text-[#2D2D2D]">{slide.label}</p>
            </div>
          ))}
        </div>

        {/* Privacy notice */}
        <div className="flex items-start gap-3 rounded-xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-4">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold))]" />
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            BalkanLink ne odgovara za tačnost podataka. Sve angabe su freiwillig i na vlastitu odgovornost korisnika. Lokacija = samo grad. Kontaktni podaci se prikazuju SAMO ako to korisnik eksplicitno odabere i da saglasnost.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-[480px] mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pretraži grad..."
            className="pl-10 h-12 text-sm rounded-xl border-[#E8D9B0] bg-white"
          />
        </div>

        {/* City grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#6B6B6B] uppercase tracking-wider text-center">
            Gradovi ({filteredGroups.length})
          </h3>
          {filteredGroups.length === 0 ? (
            <div className="rounded-xl border border-[#E8E0D0] bg-white p-8 text-center">
              <MapPin className="mx-auto h-8 w-8 text-[#E8E0D0] mb-3" />
              <p className="text-sm text-[#6B6B6B]">
                {search ? `Nema rezultata za "${search}"` : "Još niko nije dodan. Budi prvi!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.map(([cityName, cityMembers]) => (
                <div key={cityName} className="rounded-xl border border-[#E8E0D0] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[hsl(var(--gold))] hover:-translate-y-[3px] transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-[#2D2D2D] flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" />
                      {cityName}
                    </h4>
                    <span className="text-[13px] text-[#6B6B6B] flex items-center gap-1">
                      <Users className="h-3 w-3" /> {cityMembers.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {cityMembers.map(m => (
                      <div key={m.id} className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs min-w-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))] shrink-0" />
                            <span className="font-medium text-[#2D2D2D] truncate">{m.displayName}</span>
                          </div>
                          {m.phone && (
                            <a
                              href={`tel:${encodeURIComponent(m.phone)}`}
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-white transition-colors"
                              style={{ background: '#2563EB' }}
                            >
                              <Phone className="h-2.5 w-2.5" /> {m.phone}
                            </a>
                          )}
                        </div>
                        {m.note && (
                          <p className="text-[11px] text-[#9CA3AF] pl-4">{m.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONSENT DIALOG */}
      <Dialog open={step === "consent"} onOpenChange={() => setStep("idle")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#2D2D2D]">Dodavanje na mapu — saglasnost</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-4">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold))]" />
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Dodavanje je potpuno dobrovoljno. Prikazuje se samo tvoje ime i grad. Kontaktni podaci (email, telefon) se prikazuju ISKLJUČIVO ako to ti odabereš u sljedećem koraku i potvrdiš posebnu saglasnost.
              </p>
            </div>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox checked={agbChecked} onCheckedChange={v => setAgbChecked(v === true)} className="mt-0.5" />
                <span className="text-sm text-[#2D2D2D]">
                  Prihvatam{" "}
                  <Link to="/agb" className="text-[hsl(var(--gold))] underline" target="_blank">Uvjete korištenja (AGB)</Link>{" "}
                  BalkanLink platforme.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox checked={datenschutzChecked} onCheckedChange={v => setDatenschutzChecked(v === true)} className="mt-0.5" />
                <span className="text-sm text-[#2D2D2D]">
                  Pročitao/la sam i razumijem{" "}
                  <Link to="/datenschutz" className="text-[hsl(var(--gold))] underline" target="_blank">Politiku privatnosti (Datenschutz)</Link>.
                </span>
              </label>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => { if (agbChecked && datenschutzChecked) setStep("form"); }}
                disabled={!agbChecked || !datenschutzChecked}
                className="flex-1 font-bold"
                style={{ background: '#C9A84C', color: 'white' }}
              >
                Potvrdi i nastavi →
              </Button>
              <Button onClick={() => setStep("idle")} variant="outline" className="flex-1">
                Odustani
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ADD FORM DIALOG */}
      <Dialog open={step === "form"} onOpenChange={() => setStep("idle")}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2D2D2D]">Dodaj se na mapu</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            {/* City autocomplete */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#2D2D2D]">Grad / Mjesto *</label>
              <div className="relative">
                <Input
                  value={city}
                  onChange={e => { setCity(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="npr. München"
                  className="border-[#E8D9B0]"
                />
                {showSuggestions && citySuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-lg border border-[#E8E0D0] bg-white shadow-lg max-h-48 overflow-y-auto">
                    {citySuggestions.map(c => (
                      <button
                        key={c}
                        type="button"
                        onMouseDown={e => { e.preventDefault(); setCity(c); setShowSuggestions(false); }}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-[#F5F0E8] text-[#2D2D2D]"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#2D2D2D]">Ime za prikaz (opcionalno)</label>
              <Input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="npr. Alen, Maja..." className="border-[#E8D9B0]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#2D2D2D]">Kratka napomena (maks 100 znakova)</label>
              <Input value={note} onChange={e => setNote(e.target.value.slice(0, 100))} placeholder="npr. Iz Sarajeva, radim u IT-u..." className="border-[#E8D9B0]" />
              <p className="text-[10px] text-[#9CA3AF]">{note.length}/100 — NE upisuj broj telefona ovdje</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#2D2D2D]">Telefon za kontakt (opcionalno)</label>
              <Input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+49 123 456789"
                className="border-[#E8D9B0]"
              />
              <p className="text-[10px] text-[#9CA3AF]">Broj će biti javno vidljiv ako ga upišeš</p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddMember}
                disabled={!city.trim()}
                className="flex-1 font-bold"
                style={{ background: '#C9A84C', color: 'white' }}
              >
                Dodaj me na mapu ✓
              </Button>
              <Button onClick={() => setStep("idle")} variant="outline">Odustani</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
