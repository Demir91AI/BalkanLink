export default function GdjePocetiTimeline() {
  const steps = [
    {
      icon: "🔍",
      title: "Provjeri status vize",
      desc: "Jesi li EU državljanin (HR, SI)? Možeš odmah. Western Balkans (BA, RS, ME, MK, AL, XK)? Trebaš vizu — ali postoji Western Balkans regulativa koja olakšava pristup tržištu rada.",
    },
    {
      icon: "💼",
      title: "Nađi posao ili Ausbildung",
      desc: "Bez posla ili Ausbildung ugovora — nema vize. Počni tražiti PRIJE nego apliciraš. Portali: make-it-in-germany.com, arbeitsagentur.de",
    },
    {
      icon: "📋",
      title: "Pripremi dokumenta",
      desc: "Pasoš (min 6 mj valjanosti), diploma ovjerena i prevedena, rodni list, potvrda o zaposlenju, dokaz o smještaju, finansijska sredstva min 1.000€",
    },
    {
      icon: "🏛️",
      title: "Ambasada — zakaži termin",
      desc: "Apliciranje se radi ISKLJUČIVO u matičnoj zemlji na Ambasadi Njemačke. Termini su često 4-12 sedmica unaprijed — rezerviši odmah!",
    },
    {
      icon: "✈️",
      title: "Dolazak i Anmeldung",
      desc: "Po dolasku imaš 14 dana za Anmeldung — prijavu adrese. Bez ovoga ne možeš otvoriti bankovni račun, primiti Steuer-ID, ni ništa drugo.",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-1">🚀 Planiraš dolazak u Njemačku?</h2>
      <p className="text-sm font-semibold text-[#EAB308] mb-5">Evo koraka koje svaki Balkanac treba proći</p>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-[#EAB308]" />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Circle with number */}
              <div className="absolute -left-8 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#EAB308] text-xs font-bold text-black z-10">
                {i + 1}
              </div>

              <div className="rounded-xl bg-[#111827] border border-white/10 p-4">
                <p className="text-sm font-semibold text-foreground mb-1">
                  {step.icon} {step.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
