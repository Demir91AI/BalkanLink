export const NT_CATEGORIES = [
  { value: "posao", label: "Posao", icon: "Briefcase" },
  { value: "stanovanje", label: "Stanovanje", icon: "Home" },
  { value: "usluge", label: "Usluge", icon: "Wrench" },
  { value: "prevoz", label: "Prevoz", icon: "Car" },
  { value: "kupoprodaja", label: "Kupujem / Prodajem", icon: "ShoppingBag" },
  { value: "porodica", label: "Djeca i porodica", icon: "Baby" },
  { value: "ostalo", label: "Ostalo", icon: "MoreHorizontal" },
] as const;

export const NT_RADIUS_OPTIONS = [
  { value: 10, label: "10 km" },
  { value: 25, label: "25 km" },
  { value: 50, label: "50 km" },
  { value: 100, label: "100 km" },
  { value: 0, label: "Cijela Njemačka" },
] as const;

export const NT_SORT_OPTIONS = [
  { value: "newest", label: "Najnovije" },
  { value: "relevant", label: "Najrelevantnije" },
] as const;

export type NtAdType = "nudim" | "trazim";

export interface NtAd {
  id: string;
  type: NtAdType;
  title: string;
  category: string;
  city: string;
  description: string;
  contact_type: "phone" | "email" | "message";
  contact_value: string;
  created_at: string;
  is_pro: boolean;
}

export const DEMO_ADS: NtAd[] = [];
