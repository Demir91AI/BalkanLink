# BalkanLink — katalog i navigacija, 27.10.2026.

## Obim i provjera

Samo razvojni prikaz: uklonjene dekorativne FREE/PREMIUM/PLUS oznake iz bočnog menija, status računa uz avatar, FormCenter kataloga i njegovog bočnog menija, dugmadi za Musterformular, Vorlagen liste, CheckListe liste, Porezi kategorijskih kartica i QA liste. Uklonjen i brojač „Besplatno” u katalogu te oznake na FlowBanner karticama.

Osam zaglavlja FormCatalogVault koristi postojeće Lucide ikone; identifikatori, redoslijed, nazivi, linkovi i sadržaj kategorija ostaju isti. Kruna uz aktivne linkove kupovine u Header/UserMenu/AppSidebar zamijenjena je neutralnom ikonom; sami linkovi, uslovi vidljivosti i pristupa nisu promijenjeni. Nisu dodani prevodi niti uklonjeni postojeći ključevi; ista izmjena važi u sva četiri jezika. Postojeći hardkodirani tekst kataloga nije prevodilački popravljen u ovom zahvatu.

Nema objave, deploymenta, migracija, novih paketa, promjene cijena, naplate, prava pristupa, auth logike, PDF motora, pravnih tvrdnji ili korisničkih podataka. Browser provjera blokirala je vanjske backend upise, RPC/Edge pozive i praćenje; nije obavljena kupovina niti prijava.

- `bunx vitest run`: **16 datoteka, 729/729 testova prolazi**, ponovljeno nakon posljednje izmjene. Phase1 baseline i PDF snapshoti nisu mijenjani.
- Automatska provjera prikaza: `/tmp/observability/build-errors.log`, posljednji pregledani rezultat **build OK**, 05:49:59 UTC. Zaseban TypeScript checker nije ručno pokretan zbog pravila okruženja; Vite build nije zamjena za punu TypeScript provjeru.
- Playwright: otvoreno 16 stranica — formulari, Vorlagen, CheckListe, Porezi u BS/HR/SR/DE (DE `/steuern`); nema `pageerror` grešaka. Kindergeld klik otvara postojeći `/formulari/kindergeld` sa zaključanim detaljem i cijenom 19,90 €. Vorlagen zadržava 12 linkova. Meni nema zasebnih FREE/PREMIUM/PLUS statusnih spanova. Na 390×844 nema horizontalnog prelijevanja kataloga. Desktop provjera 1280×1800.
- Snimci potvrđuju uklonjene oznake; postojeća slaba čitljivost pojedinih naslova na tamnoj pozadini nije mijenjana. Provjeren gostujući prikaz; pristup prijavljenih/legacy korisnika nije testiran uživo. Njihova pravila nisu mijenjana.

## Tačne promijenjene datoteke

1. `src/components/layout/AppSidebar.tsx`
2. `src/components/layout/Header.tsx`
3. `src/components/layout/UserMenu.tsx`
4. `src/components/formCenter/FormCatalogVault.tsx`
5. `src/components/formCenter/FormRightPanel.tsx`
6. `src/pages/FormCenter.tsx`
7. `src/pages/Vorlagen.tsx`
8. `src/pages/CheckListe.tsx`
9. `src/components/home/FlowBanner.tsx`
10. `src/pages/Porezi.tsx`
11. `src/pages/QA.tsx`
12. `roadmap.md`
13. `docs/catalog-navigation-cleanup-2026-10-27.md`

Vlasnikovo pravilo zabilježeno je i u projektnoj memoriji, ne u UI-u. `.lovable/plan.md` nije prisutan nakon arhiviranja; pročitan je arhivirani baseline plan i Phase1 dokument/testovi. Nije napisan novi plan za odobrenje već odobrenog uskog zahvata.

## Preporučena buduća matrica — sve stavke bočnog menija

Ovo su preporuke, **ništa nije premješteno**. Svaki postojeći link ostaje dostupan; objediniti otkrivanje sadržaja, ne brisati alate. Tematsko preklapanje nije dokaz da su dva toka identična.

| Sadašnje odredište | Namjera korisnika / buduća grupa | Preklapanje i sigurna preporuka |
|---|---|---|
| `/formulari` | Popuniti zahtjev | Centralni katalog, ali sadrži vodiče i navigator; jasno razlikovati vrste izlaza tek u zasebnom zahvatu. |
| `/viza` | Doći / ostati u Njemačkoj | Preklapa kategoriju Vize i boravak; navigator i pojedinačni obrasci ostaju odvojeni tokovi. |
| `/anerkennung-navigator` | Priznati kvalifikaciju | **Isti link** u FormCenter Obrazovanje; jedan alat dostupan iz obje grupe. |
| `/dvojno-drzavljanstvo` | Državljanstvo | Povezati s boravkom/državljanstvom; nije formular koji treba preseliti u PDF katalog. |
| `/dokumenten-check` | Razumjeti dokument | Grupa pomoći/dokumenata; ne poistovjetiti s popunjavanjem formulara. |
| `/deutsch-trainer` | Učiti njemački | Obrazovanje/jezik; sačuvati samostalni alat. |
| `/porezi`, DE `/de/steuern` | Porezi | Tematski preklapa Steuer-ID i Steuerklassenwechsel u katalogu; povezati isti sadržaj bez mijenjanja odredišta. |
| `/schufa-simulator` | Stan / bonitet | Povezati sa stanovanjem; **nije stavka osam kategorija trenutnog formCatalog-a**. |
| `/nebenkosten-scan` | Provjeriti račun za stan | Povezati s Mietrecht/stanovanjem; zadržati samostalnu analizu. |
| `/vorlagen` | Napisati pismo | Razlikovati pisma od službenih obrazaca; radni, stambeni i zdravstveni šabloni smiju imati prečice iz tematskih hubova. |
| `/nudim-trazim` | Oglas / pronaći ponudu | Preklapa namjere Stellenangebote/Wohnungen/Biznis, ne nužno iste podatke; jasno odvojiti izvore ponuda. |
| `/zivot-u-njemackoj` | Dolazak / svakodnevica | Tematski preklapa Dolazak u katalogu; vodiči i formulari ostaju zasebni. |
| `/radno-pravo` | Prava na poslu | Povezati s radnim vodičima i Vorlagen radnim pismima; ne ukidati hub. |
| `/mietrecht` | Prava stanara | Povezati Wohngeld, Nebenkosten i stambena pisma; različite usluge. |
| `/biznis` | Poslovanje | Poslovni vodiči naspram oglasa/ponuda; očuvati razliku. |
| `/stellenangebote` | Pronaći posao | Preklapa radne oglase; sačuvati postojeći spisak i filtriranje. |
| `/wohnungen` | Pronaći stan | Preklapa stambene oglase; sačuvati postojeći spisak. |
| `/kalkulatori` | Izračunati | Prečice iz poreza/posla/stanovanja, bez uklanjanja centralnog hub-a. |
| `/obnova-pasosa` | Obnoviti dokument | Povezati s dokumentima/konzularnim poslovima; nije njemački federalni formular. |
| `/sacuvano` | Nastaviti ranije sačuvano | Lični meni; ostaje i u UserMenu. Duplirani pristup je koristan, nije duplirani sadržaj. |
| `/profil` | Moj račun | Ostaje u uslovnom meniju računa. |
| `/paketi` | Cijena / kupiti pristup | Ostaje i donja stavka i uslovni upgrade link; ista kupovina, bez nove tarife. Header/UserMenu zadržavaju stari `/premium` link. |
| `/admin` | Upravljanje | Postojeći uslovni brzi link i link u računu; ne mijenjati ovlaštenja. |
| `/login` | Prijava / registracija | Postojeći ulaz za gosta; ne mijenjati prijavu. |
| Odjava | Napustiti račun | Postojeća akcija ostaje. |
| Nedavno korišteno | Nastaviti rad | Do tri izvedena postojeća odredišta, već deduplicirana; ostaviti. |
| Podijeli BalkanLink | Podijeliti aplikaciju | Nativno dijeljenje/clipboard ostaje; tokom testa nije aktivirano. |
| Preuzmi aplikaciju | Instalirati | Uslovna PWA akcija ostaje. |
| Povratna informacija | Kontaktirati | Postojeći mailto ostaje; nije aktiviran. |

Izvori: `src/components/layout/AppSidebar.tsx`, `UserMenu.tsx`, `Header.tsx`, `src/lib/form-catalog.ts`, arhivirani baseline plan. `/familie`, CheckListe i QA su postojeći povezani hubovi, ali nisu samostalne stavke ovog bočnog menija. Vijesti/blog nisu stavke ovog menija; nisu dodavani niti se pretpostavlja da su spremni.

## Svih osam FormCenter kategorija

| Kategorija (id) | Stvarni sadržaj | Preporuka / neprikladan smještaj |
|---|---|---|
| Dolazak (`dolazak`) | Anmeldung, Steuer-ID, Führerschein, Fahrzeugzulassung | Dolazak kao namjera; vozila imaju i samostalnu namjeru Auto. Sačuvati sva četiri linka. |
| Porodica (`porodica`) | Kindergeld, Elterngeld, Mutterschaftsgeld, Kinderzuschlag, Krippengeld Bayern, Wirtschaftliche Jugendhilfe | `/familie` za otkrivanje + postojeći detalji/primjeri; razlikovati regionalne/lokalne uslove. |
| Bürgergeld (`buergergeld`) | Hauptantrag, Weiterbewilligung + **19 priloga/stavki** | Jedan zahtjev i povezani prilozi; Arbeitsbescheinigung je ovdje, **nije dupliran u trenutnoj kategoriji Rad i karijera**. Ne zamijeniti potvrdu poslodavca korisničkim zahtjevom. |
| Wohngeld (`wohngeld`) | Wohngeld | Stanovanje/pomoć za stan; nije isti tok kao Bürgergeld KDU. |
| Rad (`posao`) | Arbeitslosengeld I, Krankenkasse, Steuerklassenwechsel | Krankenkasse bolje otkrivanje kroz zdravstvo/dolazak; Steuerklassenwechsel kroz poreze/porodicu. Sada ne premještati. |
| Obrazovanje (`obrazovanje`) | Anerkennung Navigator, BAföG, Schüler-BAföG, Integrationskurs | Navigator je alat, ostala tri su zahtjevi; isti Anerkennung link sa sidebarom je dokazani cross-hub duplikat. |
| Dokumenti (`dokumenti`) | Grundsicherung, Führungszeugnis, Kirchenaustritt | Grundsicherung pripada socijalnoj pomoći, ne općim potvrdama. Führungszeugnis je potvrda; Kirchenaustritt posebna administrativna radnja. |
| Vize (`vize`) | Nationalvisum, Aufenthaltstitel, Niederlassungserlaubnis, Verpflichtungserklärung | Preklapa Viza hub. **Aufenthaltstitel klik trenutno vraća katalog** kroz `isRemovedFormSlug` u FormCenter, iako je kartica još prisutna; postojeća neusklađenost, nije popravljana u ovoj izmjeni. |

Katalog ima 46 stavki i nema dupliranih slugova među ovih osam kategorija. Razlikovati stvarno isti link (Anerkennung) od samo zajedničke teme. Budući pomak traži popis starih/novih ulaza, sve četiri jezičke varijante i potvrdu da stari detalji, ispisi i podaci ostaju dostupni.

## Mobilna donja navigacija — nepromijenjena

`src/components/layout/MobileBottomNav.tsx` izmjenjuje dva seta lijevih/desnih linkova svakih 10 sekundi uz centralni Home. Interakcija pauzira rotaciju 15 sekundi; dots/swipe mijenjaju set. Rizik: odredište može promijeniti poziciju dok korisnik namjerava kliknuti; `cycleSet` zanemaruje smjer.

Prije zasebnog zahvata: testirati svih 12 odredišta i Home u sva četiri jezika, fake timers na 9,9/10 s i 15 s pauze, dodir tokom promjene seta, oba swipe smjera, dots, aktivnu oznaku, fokus/tastaturu, portrait/landscape, zoom i safe-area. Zabilježiti stare linkove pa provjeriti da stabilniji raspored ne skriva nijedan. Ovdje nisu mijenjani rotacija ni linkovi.

## Preostali tokeni i oznake — nisu isto što i dekorativni katalog

**Funkcionalno sačuvano:** `isPremium`, `isFormFree`, `FREE_FORM_SLUGS`, `FREE_TEMPLATE_SLUGS`, DEV_MODE i entitlement hookovi; plaćanje/legacy obnova; `FormPremiumPaywall`, `TemplatePremiumPaywall`, PlusCtaLabel, PremiumModal, VisaGateCard, zaključani koraci vodiča/DeutschTrainer-a, zaključani rezultati Nebenkosten i DokumentenCheck. Porezi zadržava auth/access uslove i lock uz aktivno dugme ulaska. Header/UserMenu i sidebar zadržavaju aktivni kupovni link s postojećim prevodom „Postani Premium” — to nije zaseban statusni badge. Ne tvrditi da je sve besplatno.

**Druge oznake/tekst ostavljen:**
- Vorlagen oznaka u **pojedinačnom detalju**, ne listi; svi paywall tekstovi i cijena ostaju.
- `PremiumBenefitsSection` ponuda ispod kataloga (BalkanLink Plus) — kupovni/promo blok, nije kategorijska oznaka.
- Naslov „Premium Check liste”, postojeći nazivi i prevodi u locale datotekama; owner je tražio očuvanje naziva.
- Homepage `Index.tsx` FREE status u postojećem informativnom/ponudnom bloku, `BussgeldAssistent.tsx` FREE TOOL na samom alatu, AnerkennungNavigator/AnerkennungFakulteti oznake unutar posebnih tokova i DeutschTrainer lockovi; nisu promijenjeni ovim kataloškim zahvatom.
- NOVO oznake, brojači rezultata/formulara, QA teme/tagovi, coming-soon dostupnost, sačuvane zvjezdice, upozorenja i privole nisu tier oznake i ostaju.
- Admin preview traka i interne Premium/Free varijable/komentari ostaju. Oglasne/promotivne oznake poslovnih listinga nisu prava pristupa potrošača i nisu mijenjane.

Ovaj izvještaj ne tvrdi globalno uklanjanje riječi Premium niti potpunu provjeru plaćanja/autorizacije. Sljedeći mali zahvat: zasebno odobren popravak neaktivne Aufenthaltstitel kartice uz test postojeće putanje, bez brisanja ili premještanja sadržaja.