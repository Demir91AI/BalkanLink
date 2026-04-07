import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/translations";

const disclaimers: Record<Language, string> = {
  bs: "Ove informacije služe samo za orijentaciju i ne predstavljaju pravni savjet.",
  hr: "Ove informacije služe samo za orijentaciju i ne predstavljaju pravni savjet.",
  sr: "Ove informacije služe samo za orijentaciju i ne predstavljaju pravni savet.",
  me: "Ove informacije služe samo za orijentaciju i ne predstavljaju pravni savjet.",
  sq: "Këto informacione shërbejnë vetëm për orientim dhe nuk përbëjnë këshillë juridike.",
  xk: "Këto informacione shërbejnë vetëm për orientim dhe nuk përbëjnë këshillë juridike.",
  mk: "Овие информации служат само за ориентација и не претставуваат правен совет.",
  
  sl: "Te informacije so namenjene zgolj orientaciji in ne predstavljajo pravnega nasveta.",
};

export default function LegalDisclaimer() {
  const { language } = useLanguage();

  return (
    <p className="mt-8 text-center text-[11px] text-muted-foreground/60">
      {disclaimers[language]}
    </p>
  );
}
