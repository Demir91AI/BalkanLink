import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { MapPin, Search, Shield, X, Users, ChevronLeft, ChevronRight, MessageSquare, Send, Home } from "lucide-react";
import balkanSarajevo from "@/assets/balkan-sarajevo.jpg";
import balkanBeograd from "@/assets/balkan-beograd.jpg";
import balkanZagreb from "@/assets/balkan-zagreb.jpg";
import balkanMostar from "@/assets/balkan-mostar.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MapMember {
  id: string;
  city: string;
  displayName: string;
  note: string;
  createdAt: string;
}

const LS_KEY = "bl_mapa_members";
const LS_SELF_KEY = "bl_mapa_self_id";

function loadMembers(): MapMember[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveMembers(members: MapMember[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(members));
}

const GERMAN_CITIES = [
  "Berlin","Hamburg","München","Köln","Frankfurt am Main","Stuttgart","Düsseldorf",
  "Leipzig","Dortmund","Essen","Bremen","Dresden","Hannover","Nürnberg","Duisburg",
  "Bochum","Wuppertal","Bielefeld","Bonn","Münster","Mannheim","Karlsruhe","Augsburg",
  "Wiesbaden","Mönchengladbach","Gelsenkirchen","Aachen","Braunschweig","Kiel",
  "Chemnitz","Halle","Magdeburg","Freiburg","Krefeld","Mainz","Lübeck","Erfurt",
  "Oberhausen","Rostock","Kassel","Hagen","Potsdam","Saarbrücken","Hamm","Ludwigshafen",
  "Oldenburg","Osnabrück","Leverkusen","Heidelberg","Solingen","Darmstadt","Regensburg",
  "Ingolstadt","Würzburg","Wolfsburg","Ulm","Heilbronn","Göttingen","Reutlingen",
  "Koblenz","Bremerhaven","Erlangen","Trier","Jena","Salzgitter","Cottbus","Moers",
  "Siegen","Hildesheim","Gütersloh","Kaiserslautern","Schwerin","Witten","Gera",
  "Iserlohn","Düren","Esslingen","Ludwigsburg","Tübingen","Flensburg","Zwickau",
  "Ratingen","Lünen","Villingen-Schwenningen","Konstanz","Marl","Minden","Dorsten",
  "Norderstedt","Delmenhorst","Bamberg","Viersen","Marburg","Rheine","Detmold",
  "Gladbeck","Bayreuth","Lüdenscheid","Arnsberg","Plauen","Bocholt","Aschaffenburg",
  "Herford","Fulda","Dinslaken","Freilassing","Traunstein","Rosenheim","Passau",
  "Landshut","Straubing","Deggendorf","Weiden","Schweinfurt","Coburg","Hof","Ansbach",
];

/* Visual carousel images - placeholder stock-style descriptions */
const visualSlides = [
  { img: balkanSarajevo, label: "Kafa i druženje" },
  { img: balkanBeograd, label: "Café bašta" },
  { img: balkanZagreb, label: "Auto-Treffen" },
  { img: balkanMostar, label: "Druženje i zajednica" },
];

function VisualCarousel() {
  return (
    <div className="w-full mb-6">
      <div className="flex flex-row flex-nowrap gap-4">
        {visualSlides.map((slide) => (
          <div
            key={slide.label}
            className="flex-1 min-w-0 rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer transition-all duration-250 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img src={slide.img} alt={slide.label} className="h-full w-full object-cover" loading="lazy" width={800} height={512} />
            </div>
            <p className="px-4 py-3 text-[15px] font-semibold text-[#2D2D2D]">{slide.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommunityMapa() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<MapMember[]>(loadMembers);
  const [search, setSearch] = useState("");
  const [showConsent, setShowConsent] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [city, setCity] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [note, setNote] = useState("");
  const [selfId, setSelfId] = useState(() => localStorage.getItem(LS_SELF_KEY) || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Messaging state
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgRecipient, setMsgRecipient] = useState<{ name: string; city: string } | null>(null);
  const [msgText, setMsgText] = useState("");

  const handleBack = () => navigateBackOrHome(navigate);

  const citySuggestions = useMemo(() => {
    if (city.length < 2) return [];
    const q = city.toLowerCase();
    return GERMAN_CITIES.filter(c => c.toLowerCase().includes(q)).slice(0, 8);
  }, [city]);

  // City groups
  const cityGroups = useMemo(() => {
    const groups: Record<string, MapMember[]> = {};
    members.forEach(m => {
      const key = m.city;
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [members]);

  // Instant search filtering
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return cityGroups;
    const q = search.toLowerCase();
    return cityGroups.filter(([cityName]) => cityName.toLowerCase().includes(q));
  }, [search, cityGroups]);

  const handleStartAdd = () => setShowConsent(true);

  const handleConsentConfirm = () => {
    if (!consentChecked) return;
    setShowConsent(false);
    setShowAddForm(true);
  };

  const selectCity = useCallback((c: string) => {
    setCity(c);
    setShowSuggestions(false);
  }, []);

  const handleAddMember = () => {
    if (!city.trim()) return;
    const member: MapMember = {
      id: crypto.randomUUID(),
      city: city.trim(),
      displayName: displayName.trim() || `Korisnik iz ${city.trim()}`,
      note: note.trim().slice(0, 100),
      createdAt: new Date().toISOString(),
    };
    const updated = [...members, member];
    setMembers(updated);
    saveMembers(updated);
    setSelfId(member.id);
    localStorage.setItem(LS_SELF_KEY, member.id);
    setShowAddForm(false);
    setCity("");
    setDisplayName("");
    setNote("");
  };

  const handleRemoveSelf = () => {
    if (!selfId) return;
    const updated = members.filter(m => m.id !== selfId);
    setMembers(updated);
    saveMembers(updated);
    setSelfId("");
    localStorage.removeItem(LS_SELF_KEY);
  };

  const openMessage = (member: MapMember) => {
    setMsgRecipient({ name: member.displayName, city: member.city });
    setMsgText("");
    setMsgOpen(true);
  };

  const handleSendMessage = async () => {
    if (!msgText.trim() || !msgRecipient) return;
    
    const { error } = await supabase.from("messages").insert({
      sender_name: "Anonimno",
      recipient_name: msgRecipient.name,
      recipient_city: msgRecipient.city,
      content: msgText.trim(),
    });

    if (error) {
      toast.error("Greška pri slanju poruke");
      return;
    }

    toast.success("Poruka poslana!");
    setMsgOpen(false);
    setMsgText("");
    setMsgRecipient(null);
  };

  const isSelfOnMap = selfId && members.some(m => m.id === selfId);

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-cream))]">
      {/* Hero */}
      <section className="border-b border-[#E8E0D0] bg-white py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={handleBack} className="back-button">
              <ChevronLeft className="h-4 w-4" /> Nazad
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E0D0] bg-white px-3 py-2 text-sm text-[#6B6B6B] transition-colors hover:bg-[hsl(var(--warm-cream))] hover:text-[hsl(var(--gold))] hover:shadow-sm"
              aria-label="Početna"
            >
              <Home className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-7 w-7 text-[hsl(var(--gold))]" />
            <h1 className="text-xl font-bold text-[#2D2D2D] sm:text-2xl">
              🗺️ Balkanci u Njemačkoj
            </h1>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Dobrovoljno se dodaj na mapu i pronađi druge iz svoje zajednice.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl py-8 space-y-6">
        {/* Visual carousel */}
        <VisualCarousel />

        {/* Disclaimer */}
        <div className="rounded-xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-4">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold))]" />
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              BalkanLink ne odgovara za tačnost navedenih podataka. Sve angabe su freiwillig i na vlastitu odgovornost korisnika. Tvoja lokacija neće biti precizna — samo grad/mjesto.
            </p>
          </div>
        </div>

        {/* Search box */}
        <div className="relative max-w-[480px] mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pretraži grad..."
            className="pl-10 h-12 text-sm rounded-xl border-[#E8E0D0] bg-white"
          />
        </div>

        {/* Add/Remove button */}
        <div className="flex gap-3">
          {!isSelfOnMap ? (
            <Button onClick={handleStartAdd} className="gap-2 bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))]">
              <MapPin className="h-4 w-4" /> Dodaj se na mapu
            </Button>
          ) : (
            <Button onClick={handleRemoveSelf} variant="outline" className="gap-2 text-destructive border-destructive/30">
              <X className="h-4 w-4" /> Ukloni me s mape
            </Button>
          )}
        </div>

        {/* Consent popup */}
        {showConsent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowConsent(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="w-full max-w-md rounded-2xl border border-[#E8E0D0] bg-white p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">Angabe ist freiwillig</h3>
              <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">
                Dodavanje na mapu je potpuno dobrovoljno. Tvoja lokacija neće biti precizna — samo grad/mjesto. BalkanLink ne dijeli ove podatke trećim stranama. Možeš se ukloniti u svakom trenutku.
              </p>
              <div className="flex items-start gap-3 mb-5">
                <Checkbox
                  id="consent"
                  checked={consentChecked}
                  onCheckedChange={v => setConsentChecked(v === true)}
                  className="mt-0.5"
                />
                <label htmlFor="consent" className="text-sm cursor-pointer text-[#2D2D2D]">
                  Razumijem i dajem saglasnost
                </label>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleConsentConfirm} disabled={!consentChecked} className="flex-1 bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))]">
                  Potvrdi i nastavi
                </Button>
                <Button onClick={() => setShowConsent(false)} variant="outline" className="flex-1">
                  Odustani
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Add form */}
        {showAddForm && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[#E8E0D0] bg-white p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#2D2D2D]">Dodaj se na mapu</h3>
            <div className="relative">
              <Input
                value={city}
                onChange={e => { setCity(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Upiši grad / mjesto (npr. München)"
                className="text-sm border-[#E8E0D0]"
              />
              {showSuggestions && citySuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-lg border border-[#E8E0D0] bg-white shadow-lg max-h-48 overflow-y-auto">
                  {citySuggestions.map(c => (
                    <button
                      key={c}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectCity(c);
                      }}
                      className="w-full px-4 py-2.5 text-sm text-left hover:bg-[hsl(var(--warm-cream))] transition-colors text-[#2D2D2D] cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Ime za prikaz (opcionalno)"
              className="text-sm border-[#E8E0D0]"
            />
            <Input
              value={note}
              onChange={e => setNote(e.target.value.slice(0, 100))}
              placeholder="Kratka napomena, maks 100 znakova (opcionalno)"
              className="text-sm border-[#E8E0D0]"
            />
            <p className="text-[10px] text-[#6B6B6B]">{note.length}/100</p>
            <div className="flex gap-3">
              <Button onClick={handleAddMember} disabled={!city.trim()} className="bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))]">
                Dodaj me
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">Odustani</Button>
            </div>
          </motion.div>
        )}

        {/* City grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#6B6B6B] uppercase tracking-wider text-center">
            Gradovi ({filteredGroups.length})
          </h3>

          {filteredGroups.length === 0 && search.trim() ? (
            <div className="rounded-xl border border-[#E8E0D0] bg-white p-8 text-center">
              <p className="text-sm text-[#6B6B6B]">Nema rezultata za &quot;{search}&quot;</p>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="rounded-xl border border-[#E8E0D0] bg-white p-8 text-center">
              <MapPin className="mx-auto h-8 w-8 text-[#E8E0D0] mb-3" />
              <p className="text-sm text-[#6B6B6B]">Još niko nije dodan. Budi prvi!</p>
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
                  <div className="space-y-2">
                    {cityMembers.map(m => (
                      <div key={m.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs min-w-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))] shrink-0" />
                          <span className="font-medium text-[#2D2D2D] truncate">{m.displayName}</span>
                        </div>
                        <button
                          onClick={() => openMessage(m)}
                          className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[hsl(var(--gold))] px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-[hsl(var(--gold-dark))] transition-colors"
                        >
                          <MessageSquare className="h-2.5 w-2.5" />
                          Pošalji poruku
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={msgOpen} onOpenChange={setMsgOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#2D2D2D]">Pošalji poruku</DialogTitle>
          </DialogHeader>
          {msgRecipient && (
            <div className="space-y-4">
              <p className="text-sm text-[#6B6B6B]">
                Primaoc: <span className="font-semibold text-[#2D2D2D]">{msgRecipient.name}</span> ({msgRecipient.city})
              </p>
              <Textarea
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                placeholder="Napiši poruku..."
                className="min-h-[100px] border-[#E8E0D0]"
              />
              <div className="flex gap-3">
                <Button onClick={handleSendMessage} disabled={!msgText.trim()} className="flex-1 gap-2 bg-[hsl(var(--gold))] text-white font-bold hover:bg-[hsl(var(--gold-dark))]">
                  <Send className="h-4 w-4" /> Pošalji
                </Button>
                <Button onClick={() => setMsgOpen(false)} variant="outline" className="flex-1">
                  Odustani
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
