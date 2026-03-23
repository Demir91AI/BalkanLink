export const NT_CATEGORIES = [
  { value: "posao", label: "Posao", icon: "Briefcase" },
  { value: "stanovanje", label: "Stanovanje", icon: "Home" },
  { value: "usluge", label: "Usluge", icon: "Wrench" },
  { value: "prevoz", label: "Prevoz", icon: "Car" },
  { value: "pomoc", label: "Pomoć", icon: "HandHelping" },
  { value: "kupoprodaja", label: "Kupujem / Prodajem", icon: "ShoppingBag" },
  { value: "porodica", label: "Djeca i porodica", icon: "Baby" },
  { value: "administracija", label: "Administracija / Papiri", icon: "FileText" },
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
    title: "Pomoć pri selidbi",
    category: "usluge",
    city: "München",
    description: "Nudim pomoć pri selidbi u Münchenu i okolici. Imam kombi i iskustvo. Cijena po dogovoru. Dostupan vikendom i radnim danima nakon 16h.",
    contact_type: "phone",
    contact_value: "+49 176 1234567",
    created_at: "2026-03-21T10:00:00Z",
    is_pro: false,
  },
  {
    id: "demo-2",
    type: "trazim",
    title: "Jednosoban stan",
    category: "stanovanje",
    city: "Nürnberg",
    description: "Tražim jednosoban stan u Nürnbergu ili okolici do 600€ warm. Imam stalni posao i Schufa. Useljenje od 01.05.",
    contact_type: "email",
    contact_value: "stan.nurnberg@email.de",
    created_at: "2026-03-20T14:30:00Z",
    is_pro: false,
  },
  {
    id: "demo-3",
    type: "nudim",
    title: "Privatni časovi njemačkog",
    category: "usluge",
    city: "Frankfurt",
    description: "Držim privatne časove njemačkog jezika za početnike i srednji nivo. Online ili uživo u Frankfurtu. 20€/sat. Imam iskustvo kao DaF nastavnik.",
    contact_type: "email",
    contact_value: "deutsch.kurse@email.de",
    created_at: "2026-03-19T09:15:00Z",
    is_pro: true,
  },
  {
    id: "demo-4",
    type: "trazim",
    title: "Posao u skladištu",
    category: "posao",
    city: "Stuttgart",
    description: "Tražim posao u skladištu ili produkciji u Stuttgartu. Imam vozačku B kategoriju i iskustvo sa viličarom. Mogu odmah početi.",
    contact_type: "phone",
    contact_value: "+49 151 9876543",
    created_at: "2026-03-18T16:45:00Z",
    is_pro: false,
  },
  {
    id: "demo-5",
    type: "nudim",
    title: "Keramičarske usluge",
    category: "usluge",
    city: "München",
    description: "Profesionalne keramičarske usluge – kupatila, kuhinje, balkoni. 15 godina iskustva. Fer cijene i kvalitetan rad. Besplatna procjena.",
    contact_type: "phone",
    contact_value: "+49 170 5551234",
    created_at: "2026-03-17T11:00:00Z",
    is_pro: true,
  },
  {
    id: "demo-6",
    type: "trazim",
    title: "Prevoz do Austrije",
    category: "prevoz",
    city: "Freilassing",
    description: "Tražim prevoz od Münchena do Salzburga/Freilassinga za 29.03. Mogu podijeliti troškove goriva. Fleksibilan sam s vremenom.",
    contact_type: "message",
    contact_value: "preko platforme",
    created_at: "2026-03-16T08:20:00Z",
    is_pro: false,
  },
  {
    id: "demo-7",
    type: "nudim",
    title: "Čuvanje djece vikendom",
    category: "porodica",
    city: "Augsburg",
    description: "Nudim čuvanje djece vikendom u Augsburgu. Iskustvo s djecom od 2–10 godina. Govorim BKS i njemački. Reference na upit.",
    contact_type: "phone",
    contact_value: "+49 162 3334455",
    created_at: "2026-03-15T13:10:00Z",
    is_pro: false,
  },
  {
    id: "demo-8",
    type: "trazim",
    title: "Pomoć oko prijave i papira",
    category: "administracija",
    city: "Berlin",
    description: "Tek sam došao u Berlin i trebam pomoć oko Anmeldung, zdravstvenog osiguranja i otvaranja računa. Spreman platiti za asistenciju.",
    contact_type: "email",
    contact_value: "pomoć.berlin@email.de",
    created_at: "2026-03-14T17:30:00Z",
    is_pro: false,
  },
];
