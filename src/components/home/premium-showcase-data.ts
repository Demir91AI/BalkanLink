import logoAluhome from "@/assets/logo-aluhome.jpg";
import logoVrebo from "@/assets/logo-vrebo.jpg";
import logoEcronix from "@/assets/logo-ecronix.jpg";
import logoAaaFusspflege from "@/assets/logo-aaa-fusspflege.png";
import logoAmeiseFilm from "@/assets/logo-ameise-film.webp";
import logoRusmir from "@/assets/logo-rusmir-kasibovic.jpg";
import showcaseAmeise1 from "@/assets/showcase-ameise-1.webp";
import showcaseAmeise2 from "@/assets/showcase-ameise-2.webp";
import showcaseAmeise3 from "@/assets/showcase-ameise-3.webp";
import showcaseAmeise4 from "@/assets/showcase-ameise-4.webp";
import showcaseAmeise5 from "@/assets/showcase-ameise-5.webp";
import showcaseRusmir1 from "@/assets/showcase-rusmir-1.jpg";
import showcaseRusmir2 from "@/assets/showcase-rusmir-2.jpg";
import showcaseRusmir3 from "@/assets/showcase-rusmir-3.jpg";
import showcaseRusmir4 from "@/assets/showcase-rusmir-4.jpg";
import showcaseRusmir5 from "@/assets/showcase-rusmir-5.jpg";
import showcaseAluhome1 from "@/assets/showcase-aluhome-1.jpg";
import showcaseAluhome2 from "@/assets/showcase-aluhome-2.jpg";
import showcaseAluhome3 from "@/assets/showcase-aluhome-3.jpg";
import showcaseAluhome4 from "@/assets/showcase-aluhome-4.jpg";
import showcaseAluhome5 from "@/assets/showcase-aluhome-5.jpg";
import showcaseVrebo1 from "@/assets/showcase-vrebo-1.jpg";
import showcaseVrebo2 from "@/assets/showcase-vrebo-2.jpg";
import showcaseVrebo3 from "@/assets/showcase-vrebo-3.jpg";
import showcaseVrebo4 from "@/assets/showcase-vrebo-4.jpg";
import showcaseVrebo5 from "@/assets/showcase-vrebo-5.jpg";
import ecronixSlide1 from "@/assets/ecronix-slide-1.jpg";
import ecronixSlide2 from "@/assets/ecronix-slide-2.jpg";
import ecronixSlide3 from "@/assets/ecronix-slide-3.jpg";
import ecronixSlide4 from "@/assets/ecronix-slide-4.jpg";
import ecronixSlide5 from "@/assets/ecronix-slide-5.jpg";
import aaaFusspflege1 from "@/assets/aaa-fusspflege-1.jpg";
import aaaFusspflege2 from "@/assets/aaa-fusspflege-2.jpg";
import aaaFusspflege3 from "@/assets/aaa-fusspflege-3.jpg";
import aaaFusspflege4 from "@/assets/aaa-fusspflege-4.jpg";
import aaaFusspflege5 from "@/assets/aaa-fusspflege-5.jpg";

export interface PremiumShowcaseFirm {
  name: string;
  slug: string;
  description: string;
  website?: string;
  contactUrl?: string;
  phone?: string;
  logoUrl: string;
  logoAlt: string;
  logoWrapperClassName: string;
  highlights: string[];
  images: string[];
  city?: string;
  fullDescription?: string;
  services?: string[];
}

export const premiumShowcaseFirms: PremiumShowcaseFirm[] = [
  {
    name: "Alu Home",
    slug: "alu-home",
    description: "Moderne aluminijske konstrukcije, pergole i stakleni sistemi za dom i terasu.",
    website: "https://www.alu-home.de/",
    contactUrl: "https://www.alu-home.de/#kontakt",
    logoUrl: logoAluhome,
    logoAlt: "ALUHOME logo",
    logoWrapperClassName: "w-[11.5rem] sm:w-[13rem] h-[4.5rem]",
    highlights: ["Pergole", "Stakleni sistemi", "Ograde i kapije"],
    images: [showcaseAluhome1, showcaseAluhome2, showcaseAluhome3, showcaseAluhome4, showcaseAluhome5],
  },
  {
    name: "Vrebo Bau",
    slug: "vrebo-bau",
    description: "Pouzdani građevinski radovi, renoviranje i kvalitetna rješenja sa dugogodišnjim iskustvom.",
    website: "https://vrebo-bau.de/",
    contactUrl: "https://vrebo-bau.de/kontakt",
    logoUrl: logoVrebo,
    logoAlt: "Vrebo Bau logo",
    logoWrapperClassName: "w-[12.5rem] sm:w-[15rem] h-[4.75rem]",
    highlights: ["Renoviranje", "Trockenbau", "Prozori i vrata"],
    images: [showcaseVrebo1, showcaseVrebo2, showcaseVrebo3, showcaseVrebo4, showcaseVrebo5],
  },
  {
    name: "Ecronix",
    slug: "ecronix",
    description: "Digitalna rješenja koja pokreću rast — web platforme, mobilne aplikacije i AI integracija.",
    website: "https://www.ecronix.com/",
    contactUrl: "https://www.ecronix.com/#contact",
    logoUrl: logoEcronix,
    logoAlt: "Ecronix logo",
    logoWrapperClassName: "w-[10rem] sm:w-[12rem] h-[4rem]",
    highlights: ["Web aplikacije", "Mobilne aplikacije", "AI integracija", "UI/UX dizajn"],
    images: [ecronixSlide1, ecronixSlide2, ecronixSlide3, ecronixSlide4, ecronixSlide5],
  },
  {
    name: "AAA Medizinische Fußpflege",
    slug: "aaa-fusspflege",
    description: "Profesionalna medicinska njega stopala uz Hausbesuche i rad sa ustanovama.",
    phone: "+49173352070",
    city: "Freilassing",
    logoUrl: logoAaaFusspflege,
    logoAlt: "AAA Medizinische Fußpflege logo",
    logoWrapperClassName: "w-[10rem] sm:w-[12rem] h-[4rem]",
    highlights: ["Hausbesuch", "Pflege", "Fußpflege"],
    images: [aaaFusspflege1, aaaFusspflege2, aaaFusspflege3, aaaFusspflege4, aaaFusspflege5],
    fullDescription: "AAA Medizinische Fußpflege pruža profesionalnu medicinsku njegu stopala u Freilassingu i okolini. Naš tim nudi usluge Hausbesuche (kućne posjete) za pacijente kojima je potrebna njega u vlastitom domu, kao i specijalnu brigu za stanovnike ustanova za njegu (Einrichtungen). Sa dugogodišnjim iskustvom u medicinskoj pedikuri, garantujemo najviši standard higijene i profesionalnog tretmana.",
    services: [
      "Medizinische Fußpflege — profesionalna medicinska pedikura",
      "Hausbesuche — tretmani u udobnosti vašeg doma",
      "Betreuung von Einrichtungen — njega za stanare domova i ustanova",
      "Behandlung eingewachsener Nägel — tretman uraslog nokta",
      "Hornhautbehandlung — uklanjanje zadebljane kože",
      "Nagelpflege — kompletna njega noktiju na stopalima",
    ],
  },
  {
    name: "Ameise-Film",
    slug: "ameise-film",
    description: "Strateška video i foto produkcija za firme — Imagefilm, Recruiting, Social Media i Drohnenaufnahmen u Berchtesgadener Land i Salzburgu.",
    website: "https://ameise-film.de/",
    contactUrl: "https://ameise-film.de/#kontakt",
    logoUrl: logoAmeiseFilm,
    logoAlt: "Ameise-Film logo",
    logoWrapperClassName: "w-[11rem] sm:w-[13rem] h-[4.5rem]",
    highlights: ["Imagefilm", "Recruiting-Video", "Social Media Content", "Drohnenaufnahmen"],
    images: [showcaseAmeise1, showcaseAmeise2, showcaseAmeise3, showcaseAmeise4, showcaseAmeise5],
    city: "Berchtesgadener Land & Salzburg",
    fullDescription: "Ameise-Film je specijalizovana video i foto produkcija sa sjedištem u Berchtesgadener Landu, koja firmama u regionu Salzburg, Bad Reichenhall, Freilassing i Piding pomaže da se digitalno i regionalno učine vidljivim. Kroz strateški osmišljene Imagefilmove, Recruiting-Video sadržaje, Social Media klipove i profesionalnu Business-fotografiju, gradi se povjerenje, privlače se Fachkräfte i postižu mjerljivi marketinški rezultati. Tim koristi najsavremeniju tehniku — uključujući Drohnenaufnahmen iz vazduha — sa fokusom na autentično storytelling i emocionalnu povezanost sa publikom.",
    services: [
      "Imagefilm — strateški video za predstavljanje firme",
      "Recruiting-Video — privlačenje Fachkräfte u regionu",
      "Social-Media-Content & Werbespots — kratki klipovi za Instagram, TikTok, YouTube",
      "Produkt- & Erklärvideo — predstavljanje proizvoda i usluga",
      "Eventvideo & Aftermovie — snimanje događaja i sajmova",
      "Immobilien- & Tourismusvideo — video za nekretnine i turizam",
      "Drohnenaufnahmen — profesionalni snimci iz vazduha",
      "Business-Fotografie — profesionalna foto produkcija",
    ],
  },
];
