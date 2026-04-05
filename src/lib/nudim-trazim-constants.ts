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

export const DEMO_ADS: NtAd[] = [
  {
    id: "demo-1",
    type: "nudim",
    title: "Pomoc pri Anmeldung i birokratiji",
    category: "usluge",
    city: "München",
    description: "Pomažem pridošlicama sa Anmeldung, Ummeldung, otvaranjem bankovnog računa i svim papirima. Imam iskustvo, sve riješeno brzo i bez stresa.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_pro: true,
  },
  {
    id: "demo-2",
    type: "nudim",
    title: "Prevoz München ↔ Sarajevo — svaki petak",
    category: "prevoz",
    city: "München",
    description: "Organizujem redovne prevoze svaki petak München → Sarajevo i nazad. Ima mjesta za 3 osobe i prtljagu. Cijena dogovor.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    is_pro: true,
  },
  {
    id: "demo-3",
    type: "trazim",
    title: "Tražim sobu ili mali stan u Berlinu",
    category: "stanovanje",
    city: "Berlin",
    description: "Dolazim u Berlin krajem aprila, tražim sobu ili garsonijeru. Student, uredan, ne pušim. Budget do 700€ sa nebenkosten.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    is_pro: false,
  },
  {
    id: "demo-4",
    type: "nudim",
    title: "Učim djecu bosanski/srpski/hrvatski",
    category: "porodica",
    city: "Hamburg",
    description: "Nudim privatne čase maternjeg jezika za djecu od 5 do 15 godina. Prilagođen program, online ili uživo u Hamburgu.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    is_pro: false,
  },
  {
    id: "demo-5",
    type: "trazim",
    title: "Tražim posao u ugostiteljstvu — Frankfurt",
    category: "posao",
    city: "Frankfurt am Main",
    description: "Imam 5 godina iskustva u ugostiteljstvu (konobar/šanker). Tražim stalno ili sezonsko zaposlenje u Frankfurtu. Imam sve papire, vozačku B.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    is_pro: false,
  },
  {
    id: "demo-6",
    type: "nudim",
    title: "Prodajem automobil — VW Golf 2018",
    category: "kupoprodaja",
    city: "Stuttgart",
    description: "Prodajem VW Golf 7 iz 2018, diesel, 150.000 km, redovno servisiran. Cijena 9.500€. Registrovan do juna 2026.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    is_pro: false,
  },
  {
    id: "demo-7",
    type: "nudim",
    title: "Prevodilaštvo BS/HR/SR ↔ DE",
    category: "usluge",
    city: "Köln",
    description: "Certificirana prevoditeljica BS/HR/SR ↔ njemački. Sudski dokumenti, diplome, ugovori, medicinska dokumentacija. Brzo i povoljno.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    is_pro: true,
  },
  {
    id: "demo-8",
    type: "trazim",
    title: "Tražim majstora za renovaciju stana",
    category: "usluge",
    city: "Düsseldorf",
    description: "Trebam majstora za kompletno renoviranje stana (50m²) — farbanje, laminat, kupatilo. Molim za ponudu.",
    contact_type: "message",
    contact_value: "",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    is_pro: false,
  },
];
