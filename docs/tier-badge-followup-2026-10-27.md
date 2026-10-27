# Dopuna vizuelnog čišćenja — 27.10.2026.

Samo razvojni UI; bez objave/deploymenta, auth/naplate/Stripe/DB promjena, promjene ruta, kategorija ili PDF motora.

## Promijenjene datoteke

| Datoteka | Minimalna izmjena |
|---|---|
| `src/pages/Vorlagen.tsx` | Uklonjene FreeBadge/PremiumBadge funkcije i status uz naslov detalja; canAccess i paywall ostaju. |
| `src/pages/Index.tsx` | Uklonjen dekorativni FREE kvadrat iz mobilnog teaser/pricing accordion-a; sadržaj, cijene i linkovi ostaju. |
| `src/pages/AnerkennungNavigator.tsx` | Uklonjen Premium chip uz naslov; pravne/regulatorne oznake i zaključavanje ostaju. |
| `src/pages/AnerkennungFakulteti.tsx` | Uklonjen Premium chip uz naslov; dva kupovna CTA koriste postojeći PlusCtaLabel. |
| `src/pages/DeutschTrainer.tsx` | Uklonjen Free chip iz kartice lekcije; isFree/isLocked, završena lekcija, click handler i paywall ostaju. |
| `src/pages/BussgeldAssistent.tsx` | Uklonjen FREE TOOL chip, kalkulator ostaje identičan. |
| `src/components/layout/Header.tsx` | Vidljivi kupovni CTA i njegovo pristupačno ime koriste postojeći `plus:unlockCta`; isti `/premium` link i uslov pristupa. Zbog dužeg postojećeg prevoda CTA se prikazuje od `lg` širine, da na tabletu ne prekriva logotip; meni i postojeći kupovni ulazi ostaju. |
| `src/components/layout/UserMenu.tsx` | Kupovni CTA koristi postojeći PlusCtaLabel; isti link i uslov vidljivosti. |
| `roadmap.md` | Zabilježen završeni uski nastavak. |
| `docs/tier-badge-followup-2026-10-27.md` | Ovaj izvještaj. |

Nema novih prevoda ni uklonjenih ključeva. `plus:unlockCta` već postoji u BS/HR/SR/DE i navodi 19,90 €; `plus:unlockNote` već navodi jednokratnu uplatu bez pretplate. Zamijenjeno je samo kupovno „Postani Premium” na navedena četiri mjesta. Nije globalno prepisivan naziv Premium niti pricing sadržaj.

## Sačuvano / preostalo

- Funkcionalni lockovi na stvarno zaključanim lekcijama, koracima, disabled fakultetskim primjerima i paywallima; cijene, 19,90 € kupovina i svi CTA handleri.
- `Reglementovano`/`Slobodno` na fakultetima označava regulaciju zanimanja, **ne cijenu**. RegulationBadge, legal warnings, verified/success/completed, NEW i availability nisu uklonjeni.
- Vorlagen paywall benefits/CTA, Anerkennung zaključani detalji („Premium verzija”), DeutschTrainer freeSuffix (opis dostupnog sadržaja), StageCard/LockedContentOverlay i ostali funkcionalni paywall tekstovi ostaju.
- Homepage pricing nazivi i poređenje javnog/plaćenog sadržaja, recommended oznaka ponude, cijene i jednokratni uslovi ostaju; nisu ukrasne FREE/PREMIUM/PLUS kategorijske značke.
- Plus ponude (`PremiumBenefitsSection`, WhatIsBalkanLink), purchase confirmations i pricing/legal objašnjenja ostaju. Interne isPremium/FREE konstante, stare locale vrijednosti `nav.becomePremium` i nazivi komponenti ostaju; njihovo brisanje nije traženo.
- Nisu mijenjani raspored ili rotacija mobilne navigacije. Nisu pretpostavljeni besplatan pristup svim alatima ili nove dozvole.

## Provjera

- `bunx vitest run`: **729/729**, 16/16 test datoteka, pokrenuto dvaput; posljednji prolaz 05:56:34 UTC. Phase1 baseline/snapshoti nepromijenjeni.
- Automatski build log: **build OK**, posljednji pregledani zapis 05:56:08 UTC. Zaseban TypeScript checker nije ručno pokrenut zbog pravila okruženja; Vite rezultat ne dokazuje punu TypeScript provjeru.
- Playwright: sedam javnih prikaza (`/`, oba Vorlagen detalja, dva Anerkennung prikaza, DeutschTrainer, Bußgeld), bez runtime `pageerror` grešaka; na pregledanim prikazima nema zasebnih tačnih FREE/FREE TOOL/PREMIUM/PLUS chipova. Header pokazuje postojeći 19,90 € CTA u sva četiri jezika.
- Snimci Vorlagen detalja, fakulteta i njemačkog headera na 768×1024. Prvi tablet snimak otkrio je preklapanje dužeg CTA s logotipom; minimalno promijenjen breakpoint prikaza CTA na `lg`, zatim ponovljena provjera. Backend POST/RPC/Edge pozivi blokirani tokom provjere. Nije izvršena kupovina, auth tok, analiza ili zapis u bazu. Prijavljeni/legacy pristup nije testiran uživo, a logika nije mijenjana.

Nove funkcionalne testove nismo dodavali za samo stil/markup; postojeća sigurnosna osnova ostaje netaknuta. Nema tvrdnje da je svaki stari Premium tekst globalno uklonjen.