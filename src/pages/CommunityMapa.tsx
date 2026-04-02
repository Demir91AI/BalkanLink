import { useState, useMemo, useCallback, useEffect } from "react";
import { MapPin, Search, Shield, X, Users, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";

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

// German cities for autocomplete
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

  const handleBack = () => navigateBackOrHome(navigate);

  // City autocomplete
  const citySuggestions = useMemo(() => {
    if (city.length < 2) return [];
    const q = city.toLowerCase();
    return GERMAN_CITIES.filter(c => c.toLowerCase().includes(q)).slice(0, 8);
  }, [city]);

  // Search results
  const searchResults = useMemo(() => {
    if (search.length < 2) return [];
    const q = search.toLowerCase();
    return GERMAN_CITIES
      .filter(c => c.toLowerCase().includes(q))
      .map(c => ({
        city: c,
        count: members.filter(m => m.city.toLowerCase() === c.toLowerCase()).length,
      }))
      .filter(r => r.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [search, members]);

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

  const handleStartAdd = () => setShowConsent(true);

  const handleConsentConfirm = () => {
    if (!consentChecked) return;
    setShowConsent(false);
    setShowAddForm(true);
  };

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

  const isSelfOnMap = selfId && members.some(m => m.id === selfId);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <button onClick={handleBack} className="back-button mb-3">
            <ChevronLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-7 w-7 text-[hsl(var(--gold))]" />
            <h1 className="text-xl font-bold text-primary-foreground sm:text-2xl">
              🗺️ Balkanci u Njemačkoj
            </h1>
          </div>
          <p className="text-sm text-primary-foreground/70">
            Dobrovoljno se dodaj na mapu i pronađi druge iz svoje zajednice.
          </p>
        </div>
      </section>

      <div className="container max-w-3xl py-8 space-y-6">
        {/* Disclaimer */}
        <div className="rounded-xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-4">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold))]" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              BalkanLink ne odgovara za tačnost navedenih podataka. Sve angabe su freiwillig i na vlastitu odgovornost korisnika. Tvoja lokacija neće biti precizna — samo grad/mjesto.
            </p>
          </div>
        </div>

        {/* Search box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pretraži grad (npr. München, Berlin...)"
            className="pl-10 h-12 text-sm rounded-xl"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-xl border bg-card shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map(r => (
                <button
                  key={r.city}
                  onClick={() => setSearch(r.city)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors"
                >
                  <span className="font-medium">{r.city}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> {r.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add/Remove button */}
        <div className="flex gap-3">
          {!isSelfOnMap ? (
            <Button onClick={handleStartAdd} className="gap-2 bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] font-bold hover:opacity-90">
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
              className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-3">Angabe ist freiwillig</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Dodavanje na mapu je potpuno dobrovoljno. Tvoja lokacija neće biti precizna — samo grad/mjesto. BalkanLink ne dijeli ove podatke trećim stranama. Možeš se ukloniti u svakom trenutku.
              </p>
              <div className="flex items-start gap-3 mb-5">
                <Checkbox
                  id="consent"
                  checked={consentChecked}
                  onCheckedChange={v => setConsentChecked(v === true)}
                  className="mt-0.5"
                />
                <label htmlFor="consent" className="text-sm cursor-pointer">
                  Razumijem i dajem saglasnost
                </label>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleConsentConfirm} disabled={!consentChecked} className="flex-1 bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] font-bold">
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
            className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="text-sm font-bold">Dodaj se na mapu</h3>
            <div className="relative">
              <Input
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Upiši grad / mjesto (npr. München)"
                className="text-sm"
              />
              {citySuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-lg border bg-card shadow-lg max-h-48 overflow-y-auto">
                  {citySuggestions.map(c => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); }}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors"
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
              className="text-sm"
            />
            <Input
              value={note}
              onChange={e => setNote(e.target.value.slice(0, 100))}
              placeholder="Kratka napomena, maks 100 znakova (opcionalno)"
              className="text-sm"
            />
            <p className="text-[10px] text-muted-foreground">{note.length}/100</p>
            <div className="flex gap-3">
              <Button onClick={handleAddMember} disabled={!city.trim()} className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] font-bold">
                Dodaj me
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">Odustani</Button>
            </div>
          </motion.div>
        )}

        {/* City list */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Gradovi ({cityGroups.length})
          </h3>
          {cityGroups.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center">
              <MapPin className="mx-auto h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Još niko nije dodan. Budi prvi!</p>
            </div>
          ) : (
            cityGroups
              .filter(([cityName]) => !search || cityName.toLowerCase().includes(search.toLowerCase()))
              .map(([cityName, cityMembers]) => (
                <div key={cityName} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" />
                      {cityName}
                    </h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> {cityMembers.length}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {cityMembers.map(m => (
                      <div key={m.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]" />
                        <span className="font-medium text-foreground">{m.displayName}</span>
                        {m.note && <span className="text-muted-foreground/70">— {m.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
