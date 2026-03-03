export const AD_DOMAINS = [
  { value: "JOB", label: "Posao" },
  { value: "SERVICE", label: "Usluga" },
  { value: "HOUSING", label: "Stanovanje" },
  { value: "CAR", label: "Auto" },
] as const;

export const AD_TYPES = [
  { value: "SEEKING", label: "Tražim" },
  { value: "OFFERING", label: "Nudim" },
] as const;

export const SERVICE_CATEGORIES = [
  "Keramičar", "Moler", "Transport", "Selidbe", "Auto servis",
  "Čišćenje", "Električar", "Vodoinstalater", "Klima servis",
  "Građevina", "Frizer", "Prevod", "IT usluge", "Ostalo",
] as const;

export const UMKREIS_OPTIONS = [
  { value: "25", label: "25 km" },
  { value: "50", label: "50 km" },
  { value: "100", label: "100 km" },
  { value: "200", label: "200 km" },
] as const;

export const MREZA_DISCLAIMER = "BalkanLink je samo oglasna tabla. Ne posredujemo u dogovorima i ne odgovaramo za tačnost, kvalitet ili zakonitost oglasa. Svaki dogovor je isključivo između korisnika.";
