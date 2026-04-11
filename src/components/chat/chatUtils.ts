// Shared types for ChatAssistant features

export type UserProfile = {
  residencyStatus: string;
  hasChildren: string;
  workStatus: string;
  completedAt: string;
};

export type StatusChecklist = Record<string, boolean>;

export type Feedback = {
  messageIndex: number;
  question: string;
  rating: "up" | "down";
  timestamp: string;
};

export type OnboardingStep = {
  question: string;
  options: { label: string; value: string }[];
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    question: "Hej! Dobrodošao na BalkanLink 👋 Jesi li tek došao u Njemačku?",
    options: [
      { label: "Tek sam došao (manje od 6 mj)", value: "new" },
      { label: "Živim već duže", value: "established" },
      { label: "Još sam u matičnoj zemlji", value: "abroad" },
    ],
  },
  {
    question: "Imaš li djecu?",
    options: [
      { label: "Da, jedno", value: "1" },
      { label: "Da, dvoje ili više", value: "2+" },
      { label: "Nemam djece", value: "0" },
    ],
  },
  {
    question: "Radiš li već u Njemačkoj?",
    options: [
      { label: "Da, radim", value: "employed" },
      { label: "Tražim posao", value: "seeking" },
      { label: "Student sam", value: "student" },
      { label: "Ne radim trenutno", value: "unemployed" },
    ],
  },
];

export const STATUS_ITEMS = [
  { group: "OBAVEZNO", items: [
    { key: "anmeldung", label: "Anmeldung prijava" },
    { key: "steuer-id", label: "Steuer-ID primljen" },
    { key: "krankenkasse", label: "Krankenkasse odabrana" },
  ]},
  { group: "FINANCIJSKE NAKNADE", items: [
    { key: "kindergeld", label: "Kindergeld apliciran" },
    { key: "elterngeld", label: "Elterngeld apliciran" },
    { key: "steuererklaerung", label: "Steuererklärung podnesena" },
  ]},
  { group: "NAPREDNI", items: [
    { key: "steuerklasse", label: "Steuerklasse optimizovana" },
    { key: "wohngeld", label: "Wohngeld provjeren" },
    { key: "familienversicherung", label: "Familienversicherung iskorišten" },
  ]},
];

export function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem("bl-user-profile");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveProfile(p: UserProfile) {
  localStorage.setItem("bl-user-profile", JSON.stringify(p));
  localStorage.setItem("bl-onboarding-done", "true");
}

export function loadStatus(): StatusChecklist {
  try {
    const raw = localStorage.getItem("bl-status");
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveStatus(s: StatusChecklist) {
  localStorage.setItem("bl-status", JSON.stringify(s));
}

export function loadFeedback(): Feedback[] {
  try {
    const raw = localStorage.getItem("bl-feedback");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveFeedback(f: Feedback[]) {
  localStorage.setItem("bl-feedback", JSON.stringify(f));
}

export function isOnboardingDone(): boolean {
  return localStorage.getItem("bl-onboarding-done") === "true";
}

export function generateTodoList(profile: UserProfile): string {
  const { residencyStatus, hasChildren, workStatus } = profile;
  const isNew = residencyStatus === "new";
  const isAbroad = residencyStatus === "abroad";
  const hasKids = hasChildren !== "0";
  const kidCount = hasChildren === "2+" ? 2 : hasChildren === "1" ? 1 : 0;
  const isWorking = workStatus === "employed";
  const isSeeking = workStatus === "seeking";

  let plan = "✅ **Tvoj personalni plan za Njemačku:**\n\n";

  if (isNew || isAbroad) {
    plan += "🔴 **HITNO (rok 14 dana):**\n";
    plan += "1. **Anmeldung** — prijava adrese u Bürgeramt\n\n";
  }

  plan += "🟡 **OVO SEDMICE:**\n";
  let step = isNew || isAbroad ? 2 : 1;

  if (isNew || isAbroad) {
    plan += `${step}. **Steuer-ID** — stiže poštom automatski nakon Anmeldung\n`;
    step++;
  }
  if (isWorking) {
    plan += `${step}. **Krankenkasse** — javi poslodavcu koji odabiraš\n`;
    step++;
  }

  if (hasKids || isSeeking) {
    plan += `\n🟢 **NE ZABORAVI (možeš dobiti novac!):**\n`;
    if (hasKids) {
      const kg = kidCount * 255;
      plan += `${step}. **Kindergeld** — ${kg}€/mj za ${kidCount === 1 ? "1 dijete" : `${kidCount}+ djece`}!\n`;
      step++;
      plan += `${step}. **Elterngeld** — ako je dijete mlađe od 14 mj\n`;
      step++;
    }
    if (isSeeking) {
      plan += `${step}. **Bürgergeld** — 563€/mj + troškovi stana dok tražiš posao\n`;
      step++;
    }
  }

  // Estimate
  let estimate = 0;
  if (hasKids) estimate += kidCount * 255 * 12;
  if (isSeeking) estimate += 563 * 6;
  if (isWorking) estimate += 800; // tax return estimate

  if (estimate > 0) {
    plan += `\n💡 *Na osnovu tvog profila možeš dobiti procijenjeno **${estimate.toLocaleString("de-DE")}€+** godišnje u naknadama koje mnogi Balkanci propuste!*`;
  }

  return plan;
}

export function generateDeadlines(profile: UserProfile | null): { priority: string; title: string; desc: string; chatMsg: string }[] {
  const deadlines: { priority: string; title: string; desc: string; chatMsg: string }[] = [];
  
  if (!profile || profile.residencyStatus === "new" || profile.residencyStatus === "abroad") {
    deadlines.push({
      priority: "🔴",
      title: "Anmeldung — rok 14 dana od useljenja",
      desc: "Nisi se još prijavio? Kazna do 1.000€!",
      chatMsg: "Kako da se prijavim na adresu (Anmeldung)?",
    });
  }

  deadlines.push({
    priority: "🟡",
    title: "Steuererklärung 2025 — rok: 31. Juli 2026",
    desc: "Možeš dobiti povrat ~800€",
    chatMsg: "Kako podnijeti Steuererklärung?",
  });

  if (!profile || profile.hasChildren !== "0") {
    deadlines.push({
      priority: "🟢",
      title: "Kindergeld — podnosi se odmah",
      desc: "Retroaktivno do 6 mjeseci unazad",
      chatMsg: "Kako aplicirati za Kindergeld?",
    });
  }

  deadlines.push({
    priority: "🟢",
    title: "Krankenkasse — prijava kod poslodavca",
    desc: "Obavezno pri zaposlenju",
    chatMsg: "Kako odabrati zdravstveno osiguranje?",
  });

  return deadlines;
}

export function calculateBenefits(data: { brutto: number; children: number; childAges: string; yearsInDE: number; married: boolean }): string {
  const { brutto, children, married } = data;

  let result = "💰 **PROCJENA — šta možeš dobiti:**\n\n";
  let total = 0;

  // Kindergeld
  if (children > 0) {
    const kgMonthly = children * 255;
    const kgRetro = kgMonthly * 6;
    result += `**Kindergeld:** ${kgMonthly}€/mj (retroaktivno 6mj = ${kgRetro.toLocaleString("de-DE")}€)\n`;
    total += kgMonthly * 12;
  }

  // Steuererklärung estimate
  const taxReturn = married ? Math.round(brutto * 0.04) : Math.round(brutto * 0.025);
  if (taxReturn > 100) {
    result += `**Steuererklärung povrat:** ~${taxReturn.toLocaleString("de-DE")}€ godišnje\n`;
    total += taxReturn;
  }

  // Wohngeld check
  const wohngeldThreshold = married ? 2200 : 1400;
  if (brutto < wohngeldThreshold) {
    const wg = Math.round((wohngeldThreshold - brutto) * 0.15);
    result += `**Wohngeld:** možda ${wg}€/mj (provjeri eligibilnost)\n`;
    total += wg * 12;
  }

  // Kinderzuschlag
  if (children > 0 && brutto < 3000) {
    const kz = children * 292;
    result += `**Kinderzuschlag:** do ${kz}€/mj (provjeri)\n`;
    total += kz * 6; // conservative
  }

  result += `\n📊 **UKUPNO PROCIJENJENO: ${total.toLocaleString("de-DE")}€ godišnje**\n\n`;
  result += `⚠️ *Ovo je orijentaciona procjena. Provjeri tačan iznos s nadležnom ustanovom.*\n\n`;
  result += `👉 Hoćeš da ti pokažem kako aplicirati za svako?`;

  return result;
}

// Parse suggestion JSON from AI response
export function extractSuggestions(text: string): { cleanText: string; suggestions: string[] } {
  const regex = /\{[\s]*"?suggestions"?\s*:\s*\[([^\]]*)\]\s*\}/;
  const match = text.match(regex);
  if (!match) return { cleanText: text, suggestions: [] };

  try {
    const jsonStr = match[0];
    const parsed = JSON.parse(jsonStr);
    const suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions.filter((s: any) => typeof s === "string") : [];
    const cleanText = text.replace(regex, "").replace(/\n{3,}/g, "\n\n").trim();
    return { cleanText, suggestions };
  } catch {
    return { cleanText: text, suggestions: [] };
  }
}

// Page context for system prompt
export function getPageContext(pathname: string): string {
  const map: Record<string, string> = {
    "/formulari/kindergeld": "Korisnik gleda Kindergeld stranicu. Ako pita nešto, najvjerovatnije se odnosi na Kindergeld.",
    "/formulari/anmeldung": "Korisnik gleda Anmeldung stranicu. Fokusiraj se na prijavu adrese.",
    "/formulari/elterngeld": "Korisnik gleda Elterngeld stranicu.",
    "/formulari/wohngeld": "Korisnik gleda Wohngeld stranicu.",
    "/formulari/buergergeld": "Korisnik gleda Bürgergeld stranicu.",
    "/formulari/steuer-id": "Korisnik gleda Steuer-ID stranicu.",
    "/formulari/krankenkasse": "Korisnik gleda Krankenkasse stranicu.",
    "/stellenangebote": "Korisnik je na stranici pretrage poslova.",
    "/wohnungen": "Korisnik je na stranici pretrage stanova.",
    "/dolazak": "Korisnik gleda sekciju o dolasku u Njemačku.",
    "/premium": "Korisnik gleda Premium stranicu.",
    "/brutto-netto-rechner": "Korisnik koristi Brutto-Netto kalkulator.",
  };

  // Check prefix matches for /formulari/ routes
  for (const [key, val] of Object.entries(map)) {
    if (pathname === key || pathname.startsWith(key)) return val;
  }

  if (pathname.startsWith("/formulari/")) {
    const slug = pathname.replace("/formulari/", "");
    return `Korisnik gleda formular: ${slug}.`;
  }
  if (pathname.startsWith("/formulari/")) {
    const slug = pathname.replace("/formulari/", "");
    return `Korisnik je u Smart Guide za: ${slug}.`;
  }

  return "";
}

export function getContextualWelcome(pathname: string): string | null {
  if (pathname.startsWith("/formulari/kindergeld")) return "Vidim da gledaš Kindergeld 👶 Ima li nešto što te zbunjuje? Mogu ti objasniti svako polje ili reći gdje najčešće griješe.";
  if (pathname.startsWith("/formulari/anmeldung")) return "Gledaš Anmeldung stranicu 🏠 Trebas pomoć s prijavom adrese? Mogu objasniti šta ti treba i gdje najčešće prave greške.";
  if (pathname.startsWith("/formulari/elterngeld")) return "Vidim da gledaš Elterngeld 👨‍👩‍👧 Mogu ti pomoći da razumiješ koliko možeš dobiti i kako aplicirati.";
  if (pathname.startsWith("/formulari/")) return "Vidim da gledaš formular — imam li nešto što te zbunjuje? Pitaj slobodno!";
  if (pathname.startsWith("/stellenangebote")) return "Tražiš posao? 💼 Mogu ti pomoći s pretragom ili objasniti kako koristiti filtere.";
  if (pathname.startsWith("/wohnungen")) return "Tražiš stan? 🏠 Mogu ti pomoći s pretragom ili objasniti na šta obratiti pažnju.";
  return null;
}
