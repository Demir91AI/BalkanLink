import logoAluhome from "@/assets/logo-aluhome.jpg";
import logoVrebo from "@/assets/logo-vrebo.jpg";
import showcaseAluhome1 from "@/assets/showcase-aluhome-1.jpg";
import showcaseAluhome2 from "@/assets/showcase-aluhome-2.jpg";
import showcaseAluhome3 from "@/assets/showcase-aluhome-3.jpg";
import showcaseVrebo1 from "@/assets/showcase-vrebo-1.jpg";
import showcaseVrebo2 from "@/assets/showcase-vrebo-2.jpg";
import showcaseVrebo3 from "@/assets/showcase-vrebo-3.jpg";

export interface PremiumShowcaseFirm {
  name: string;
  description: string;
  website: string;
  contactUrl: string;
  logoUrl: string;
  logoAlt: string;
  logoWrapperClassName: string;
  highlights: string[];
  images: string[];
}

export const premiumShowcaseFirms: PremiumShowcaseFirm[] = [
  {
    name: "Alu Home",
    description: "Moderne aluminijske konstrukcije, pergole i stakleni sistemi za dom i terasu.",
    website: "https://www.alu-home.de/",
    contactUrl: "https://www.alu-home.de/#kontakt",
    logoUrl: logoAluhome,
    logoAlt: "ALUHOME logo",
    logoWrapperClassName: "w-[11.5rem] sm:w-[13rem] h-[4.5rem]",
    highlights: ["Pergole", "Stakleni sistemi", "Ograde i kapije"],
    images: [showcaseAluhome1, showcaseAluhome2, showcaseAluhome3],
  },
  {
    name: "Vrebo Bau",
    description: "Pouzdani građevinski radovi, renoviranje i kvalitetna rješenja sa dugogodišnjim iskustvom.",
    website: "https://vrebo-bau.de/",
    contactUrl: "https://vrebo-bau.de/kontakt",
    logoUrl: logoVrebo,
    logoAlt: "Vrebo Bau logo",
    logoWrapperClassName: "w-[12.5rem] sm:w-[15rem] h-[4.75rem]",
    highlights: ["Renoviranje", "Trockenbau", "Prozori i vrata"],
    images: [showcaseVrebo1, showcaseVrebo2, showcaseVrebo3],
  },
];
