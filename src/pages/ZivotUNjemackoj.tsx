import { useNavigate } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";
import {
  Eye, TrendingUp, FileText, MessageSquare, Clock,
  AlertTriangle, Plane, CheckCircle, Euro, ListChecks,
  Globe, XCircle, BookOpen, Info, ExternalLink,
} from "lucide-react";

/* ───────── helpers ───────── */
const bs = {
  pageTitle: "Život i Dolazak u Njemačku",
  pageSubtitle: "Realne informacije za one koji ozbiljno razmišljaju o preseljenju",
  trustBadge: "Stand 2026 — informacije provjerene iz zvaničnih izvora",
  breadcrumbHome: "Početna",
  sec1Title: "Kako stvarno izgleda život u Njemačkoj?",
  card1Title: "Visoki troškovi života",
  card1Text: "Stanovanje, hrana i prevoz su znatno skuplji nego u većini balkanskih država, posebno u Münchenu, Frankfurtu i Hamburgu.",
  card2Title: "Stroga administracija",
  card2Text: "Njemačka je birokratska zemlja. Svaki korak zahtijeva dokumente, rokove i strpljenje. Nema 'improvizacije'.",
  card3Title: "Jezik je ključ",
  card3Text: "Bez njemačkog jezika, napredak je gotovo nemoguć. B2 nivo je praktični minimum za većinu radnih mjesta.",
  card4Title: "Radna kultura",
  card4Text: "Tačnost, odgovornost i disciplina nisu opcija — to je standard. Kašnjenje ili neozbiljnost se ne tolerišu.",
  realityTitle: "Realno stanje",
  realityText: "Prvih 3–6 mjeseci su najteži. Bez jezika i jasnog plana, dolazak može biti izuzetno stresan — finansijski i psihički. Priprema je sve.",
  sec2Title: "Kako možeš doći u Njemačku?",
  way1Tag: "§18 AufenthG", way1Title: "Radna viza",
  way1Desc: "Za kvalificirane radnike sa priznatom diplomom ili stručnom kvalifikacijom. Potreban je ugovor o radu i dokaz o kvalifikaciji.",
  way1For: "Za: Stručnjaci, IT, zdravstvo, zanatstvo",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (stručno obrazovanje)",
  way2Desc: "Njemački sistem obuke koji kombinuje rad i školovanje. Traje 2–3 godine. Firma plaća malu platu tokom obuke.",
  way2For: "Za: Mlade do ~35 godina, osnovno njemačko znanje",
  way3Tag: "§16b AufenthG", way3Title: "Studij",
  way3Desc: "Upis na njemački univerzitet ili Fachhochschule. Potrebna je nostrifikacija diplome ili matura. Studij je besplatan na državnim univerzitetima.",
  way3For: "Za: Maturanti i studenti, B2/C1 njemački ili engleski",
  way4Tag: "Porodično pravo", way4Title: "Spajanje porodice",
  way4Desc: "Ako već imaš člana porodice sa boravišnom dozvolom ili državljanstvom u Njemačkoj, možeš aplicirati na osnovu porodičnog spajanja.",
  way4For: "Za: Bračni partneri, djeca, roditelji (u nekim slučajevima)",
  wayCta: "Pogledaj u Viza Navigatoru →",
  sec3Title: "Šta ti je potrebno?",
  req1Title: "Njemački jezik", req1Text: "Minimum B1, realno B2 za većinu poslova. Za Ausbildung je prihvatljiv B1.",
  req2Title: "Ugovor ili prihvatnica", req2Text: "Ugovor o radu, Ausbildungsvertrag ili pismo o prijemu na fakultet — bez toga nema vize.",
  req3Title: "Važeći pasoš", req3Text: "Pasoš mora biti važeći još najmanje 6 mjeseci od datuma podnošenja zahtjeva.",
  req4Title: "Pripremljeni dokumenti", req4Text: "CV na njemačkom, diplome, certifikati, izvod iz matične knjige, motivaciono pismo.",
  req5Title: "Strpljenje i rezervni plan", req5Text: "Procesi traju sedmicama ili mjesecima. Ambasade imaju dugo čekanje na termine. Planiraj unaprijed.",
  sec4Title: "Koliko novca treba za početak?",
  minLabel: "Apsolutni minimum", minAmount: "1.500€ – 2.500€", minNote: "Rizično — bez rezerve za neočekivane troškove",
  recLabel: "Preporučeni iznos", recAmount: "3.000€ – 6.000€", recNote: "Daje sigurnost za prve 2–3 mjeseca",
  exp1: "🏠 Kirija (WG soba): 400€ – 900€/mj ovisno o gradu",
  exp2: "🔑 Kaution (depozit): 1–3 mjesečne kirije (jednokratno)",
  exp3: "🛒 Hrana i osnovni troškovi: 300€ – 500€/mj",
  exp4: "🚌 Prevoz: 80€ – 120€/mj (javni prevoz)",
  expNote: "Iznosi se značajno razlikuju po gradu. München i Frankfurt su znatno skuplji od Dresdena, Erfurta ili manjih gradova.",
  sec5Title: "Kako početi? — Korak po korak",
  step1Title: "Odluči šta želiš", step1Text: "Rad, Ausbildung ili studij? Svaki put zahtijeva drugačiji pristup i drugačiju pripremu.",
  step2Title: "Pronađi konkretnu ponudu", step2Text: "Posao, Ausbildungsplatz ili upis na fakultet. Bez konkretne ponude, viza se ne može dobiti.",
  step3Title: "Pripremi dokumentaciju", step3Text: "CV na njemačkom, prevedene i apostilirane diplome, certifikati o jeziku, motivaciono pismo.",
  step4Title: "Zakaži termin u ambasadi", step4Text: "Termini su često popunjeni sedmicama unaprijed. Pripremi sve dokumente PRIJE zakazivanja.",
  step5Title: "Podnesi zahtjev za vizu", step5Text: "Lično u ambasadi. Donesi original i kopije svih dokumenata. Očekuj odluku za 4–12 sedmica.",
  step6Title: "Nakon dolaska: Anmeldung i boravišna dozvola", step6Text: "Prijava adrese (Anmeldung) je obavezna u roku od 14 dana. Zatim zakazivanje u Ausländerbehörde.",
  sec6Title: "Dolazak iz tvoje države",
  sec6Cta: "Za detaljne vizne tokove po državi, koristi Viza Navigator →",
  sec7Title: "Greške koje ljudi prave",
  err1Title: "Dolazak bez plana", err1Text: "Dolazak u Njemačku sa ciljem 'naći ću nešto' gotovo uvijek završava loše. Bez ugovora nema legalnog statusa.",
  err2Title: "Nedovoljno znanje jezika", err2Text: "Mnogi dolaze s A2/B1 i očekuju da će naći posao. Realnost je drugačija — bez B2 napredak je spor i frustrirajući.",
  err3Title: "Vjerovanje neprovjerenim agentima", err3Text: "Agencije koje obećavaju 'siguran posao u Njemačkoj' često naplaćuju usluge za koje ne treba plaćati ili su direktno prevara.",
  err4Title: "Nedovoljno finansijskih rezervi", err4Text: "Dolazak s manje od 2.000€ bez osiguranog smještaja je visokorizičan. Prva plata dolazi tek nakon 4–6 sedmica rada.",
  err5Title: "Pogrešna vrsta vize", err5Text: "Dolazak na turističku vizu sa ciljem traženja posla je ilegalno i može rezultovati zabranom ulaska u Schengen.",
  sec8Title: "Zvanični izvori informacija",
  sec8Intro: "Sve informacije na ovoj stranici zasnovane su na sljedećim zvaničnim izvorima. Direktno provjeri aktualne uslove.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Zvanična agencija za zapošljavanje. Podaci o tržištu rada, Ausbildung i priznavanju kvalifikacija.",
  src2Name: "Make it in Germany", src2Desc: "Zvanični portal njemačke vlade za kvalificirane radnike iz inostranstva.",
  src3Name: "BAMF", src3Desc: "Savezni ured za migracije. Informacije o vizama, integraciji i jezičnim kursevima.",
  src4Name: "Auswärtiges Amt", src4Desc: "Njemačko Ministarstvo vanjskih poslova. Vizne informacije i lista potrebnih dokumenata.",
  visit: "Posjeti →",
  ctaTitle: "Spreman/na za sljedeći korak?",
  ctaVisa: "Viza Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulari →",
};

const hr: Record<string, string> = {
  pageTitle: "Život i Dolazak u Njemačku",
  pageSubtitle: "Realne informacije za one koji ozbiljno razmišljaju o preseljenju",
  trustBadge: "Stanje 2026 — informacije provjerene iz službenih izvora",
  breadcrumbHome: "Početna",
  sec1Title: "Kako stvarno izgleda život u Njemačkoj?",
  card1Title: "Visoki troškovi života",
  card1Text: "Stanovanje, hrana i prijevoz znatno su skuplji nego u većini balkanskih država, posebno u Münchenu, Frankfurtu i Hamburgu.",
  card2Title: "Stroga administracija",
  card2Text: "Njemačka je birokratska zemlja. Svaki korak zahtijeva dokumente, rokove i strpljenje. Nema 'improvizacije'.",
  card3Title: "Jezik je ključ",
  card3Text: "Bez njemačkog jezika napredak je gotovo nemoguć. B2 razina je praktični minimum za većinu radnih mjesta.",
  card4Title: "Radna kultura",
  card4Text: "Točnost, odgovornost i disciplina nisu opcija — to je standard. Kašnjenje ili neozbiljnost se ne toleriraju.",
  realityTitle: "Realno stanje",
  realityText: "Prvih 3–6 mjeseci su najteži. Bez jezika i jasnog plana dolazak može biti iznimno stresan — financijski i psihički. Priprema je sve.",
  sec2Title: "Kako možeš doći u Njemačku?",
  way1Tag: "§18 AufenthG", way1Title: "Radna viza",
  way1Desc: "Za kvalificirane radnike s priznatom diplomom ili strukovnom kvalifikacijom. Potreban je ugovor o radu i dokaz o kvalifikaciji.",
  way1For: "Za: Stručnjaci, IT, zdravstvo, obrt",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (strukovno obrazovanje)",
  way2Desc: "Njemački sustav obuke koji kombinira rad i školovanje. Traje 2–3 godine. Tvrtka plaća malu plaću tijekom obuke.",
  way2For: "Za: Mlade do ~35 godina, osnovno znanje njemačkog",
  way3Tag: "§16b AufenthG", way3Title: "Studij",
  way3Desc: "Upis na njemačko sveučilište ili Fachhochschule. Potrebna je nostrifikacija diplome ili matura. Studij je besplatan na državnim sveučilištima.",
  way3For: "Za: Maturanti i studenti, B2/C1 njemački ili engleski",
  way4Tag: "Obiteljsko pravo", way4Title: "Spajanje obitelji",
  way4Desc: "Ako već imaš člana obitelji s dozvolom boravka ili državljanstvom u Njemačkoj, možeš aplicirati na temelju obiteljskog spajanja.",
  way4For: "Za: Bračni partneri, djeca, roditelji (u nekim slučajevima)",
  wayCta: "Pogledaj u Viza Navigatoru →",
  sec3Title: "Što ti je potrebno?",
  req1Title: "Njemački jezik", req1Text: "Minimum B1, realno B2 za većinu poslova. Za Ausbildung je prihvatljiv B1.",
  req2Title: "Ugovor ili prihvatnica", req2Text: "Ugovor o radu, Ausbildungsvertrag ili pismo o prijemu na fakultet — bez toga nema vize.",
  req3Title: "Važeća putovnica", req3Text: "Putovnica mora biti važeća još najmanje 6 mjeseci od datuma podnošenja zahtjeva.",
  req4Title: "Pripremljeni dokumenti", req4Text: "Životopis na njemačkom, diplome, certifikati, izvadak iz matične knjige, motivacijsko pismo.",
  req5Title: "Strpljenje i rezervni plan", req5Text: "Procesi traju tjednima ili mjesecima. Veleposlanstva imaju dugo čekanje na termine. Planiraj unaprijed.",
  sec4Title: "Koliko novca trebaš za početak?",
  minLabel: "Apsolutni minimum", minAmount: "1.500€ – 2.500€", minNote: "Rizično — bez rezerve za neočekivane troškove",
  recLabel: "Preporučeni iznos", recAmount: "3.000€ – 6.000€", recNote: "Daje sigurnost za prva 2–3 mjeseca",
  exp1: "🏠 Najam (WG soba): 400€ – 900€/mj ovisno o gradu",
  exp2: "🔑 Kaution (polog): 1–3 mjesečne najamnine (jednokratno)",
  exp3: "🛒 Hrana i osnovni troškovi: 300€ – 500€/mj",
  exp4: "🚌 Prijevoz: 80€ – 120€/mj (javni prijevoz)",
  expNote: "Iznosi se značajno razlikuju po gradu. München i Frankfurt su znatno skuplji od Dresdena, Erfurta ili manjih gradova.",
  sec5Title: "Kako početi? — Korak po korak",
  step1Title: "Odluči što želiš", step1Text: "Rad, Ausbildung ili studij? Svaki put zahtijeva drugačiji pristup i drugačiju pripremu.",
  step2Title: "Pronađi konkretnu ponudu", step2Text: "Posao, Ausbildungsplatz ili upis na fakultet. Bez konkretne ponude viza se ne može dobiti.",
  step3Title: "Pripremi dokumentaciju", step3Text: "Životopis na njemačkom, prevedene i apostilirane diplome, jezični certifikati, motivacijsko pismo.",
  step4Title: "Zakaži termin u veleposlanstvu", step4Text: "Termini su često popunjeni tjednima unaprijed. Pripremi sve dokumente PRIJE zakazivanja.",
  step5Title: "Podnesi zahtjev za vizu", step5Text: "Osobno u veleposlanstvu. Donesi original i preslike svih dokumenata. Očekuj odluku za 4–12 tjedana.",
  step6Title: "Nakon dolaska: Anmeldung i dozvola boravka", step6Text: "Prijava adrese (Anmeldung) obvezna je u roku od 14 dana. Zatim termin u Ausländerbehörde.",
  sec6Title: "Dolazak iz tvoje države",
  sec6Cta: "Za detaljne vizne procese po državi koristi Viza Navigator →",
  sec7Title: "Pogreške koje ljudi čine",
  err1Title: "Dolazak bez plana", err1Text: "Dolazak u Njemačku s ciljem 'naći ću nešto' gotovo uvijek završava loše. Bez ugovora nema legalnog statusa.",
  err2Title: "Nedovoljno znanje jezika", err2Text: "Mnogi dolaze s A2/B1 i očekuju da će naći posao. Stvarnost je drugačija — bez B2 napredak je spor i frustrirajući.",
  err3Title: "Povjerenje neprovjerenim agentima", err3Text: "Agencije koje obećavaju 'siguran posao u Njemačkoj' često naplaćuju usluge koje bi trebale biti besplatne ili su izravna prijevara.",
  err4Title: "Nedovoljno financijskih rezervi", err4Text: "Dolazak s manje od 2.000€ bez osiguranog smještaja je visokorizičan. Prva plaća dolazi tek nakon 4–6 tjedana rada.",
  err5Title: "Pogrešna vrsta vize", err5Text: "Dolazak na turističku vizu s ciljem traženja posla je ilegalno i može rezultirati zabranom ulaska u Schengen.",
  sec8Title: "Službeni izvori informacija",
  sec8Intro: "Sve informacije na ovoj stranici temelje se na sljedećim službenim izvorima. Izravno provjeri aktualne uvjete.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Službena agencija za zapošljavanje. Podaci o tržištu rada, Ausbildung i priznavanju kvalifikacija.",
  src2Name: "Make it in Germany", src2Desc: "Službeni portal njemačke vlade za kvalificirane radnike iz inozemstva.",
  src3Name: "BAMF", src3Desc: "Savezni ured za migracije. Informacije o vizama, integraciji i jezičnim tečajevima.",
  src4Name: "Auswärtiges Amt", src4Desc: "Njemačko Ministarstvo vanjskih poslova. Vizne informacije i popis potrebnih dokumenata.",
  visit: "Posjeti →",
  ctaTitle: "Spreman/na za sljedeći korak?",
  ctaVisa: "Viza Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulari →",
};

const sr: Record<string, string> = {
  pageTitle: "Život i Dolazak u Nemačku",
  pageSubtitle: "Realne informacije za one koji ozbiljno razmišljaju o preseljenju",
  trustBadge: "Stanje 2026 — informacije proverene iz zvaničnih izvora",
  breadcrumbHome: "Početna",
  sec1Title: "Kako stvarno izgleda život u Nemačkoj?",
  card1Title: "Visoki troškovi života",
  card1Text: "Stanovanje, hrana i prevoz su znatno skuplji nego u većini balkanskih država, posebno u Minhenu, Frankfurtu i Hamburgu.",
  card2Title: "Stroga administracija",
  card2Text: "Nemačka je birokratska zemlja. Svaki korak zahteva dokumente, rokove i strpljenje. Nema 'improvizacije'.",
  card3Title: "Jezik je ključ",
  card3Text: "Bez nemačkog jezika, napredak je gotovo nemoguć. B2 nivo je praktični minimum za većinu radnih mesta.",
  card4Title: "Radna kultura",
  card4Text: "Tačnost, odgovornost i disciplina nisu opcija — to je standard. Kašnjenje ili neozbiljnost se ne tolerišu.",
  realityTitle: "Realno stanje",
  realityText: "Prvih 3–6 meseci su najteži. Bez jezika i jasnog plana, dolazak može biti izuzetno stresan — finansijski i psihički. Priprema je sve.",
  sec2Title: "Kako možeš doći u Nemačku?",
  way1Tag: "§18 AufenthG", way1Title: "Radna viza",
  way1Desc: "Za kvalifikovane radnike sa priznatom diplomom ili stručnom kvalifikacijom. Potreban je ugovor o radu i dokaz o kvalifikaciji.",
  way1For: "Za: Stručnjaci, IT, zdravstvo, zanatstvo",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (stručno obrazovanje)",
  way2Desc: "Nemački sistem obuke koji kombinuje rad i školovanje. Traje 2–3 godine. Firma plaća malu platu tokom obuke.",
  way2For: "Za: Mlade do ~35 godina, osnovno nemačko znanje",
  way3Tag: "§16b AufenthG", way3Title: "Studij",
  way3Desc: "Upis na nemački univerzitet ili Fachhochschule. Potrebna je nostrifikacija diplome ili matura. Studij je besplatan na državnim univerzitetima.",
  way3For: "Za: Maturanti i studenti, B2/C1 nemački ili engleski",
  way4Tag: "Porodično pravo", way4Title: "Spajanje porodice",
  way4Desc: "Ako već imaš člana porodice sa dozvolom boravka ili državljanstvom u Nemačkoj, možeš aplicirati na osnovu porodičnog spajanja.",
  way4For: "Za: Bračni partneri, deca, roditelji (u nekim slučajevima)",
  wayCta: "Pogledaj u Viza Navigatoru →",
  sec3Title: "Šta ti je potrebno?",
  req1Title: "Nemački jezik", req1Text: "Minimum B1, realno B2 za većinu poslova. Za Ausbildung je prihvatljiv B1.",
  req2Title: "Ugovor ili prijem", req2Text: "Ugovor o radu, Ausbildungsvertrag ili pismo o prijemu na fakultet — bez toga nema vize.",
  req3Title: "Važeći pasoš", req3Text: "Pasoš mora biti važeći još najmanje 6 meseci od datuma podnošenja zahteva.",
  req4Title: "Pripremljeni dokumenti", req4Text: "CV na nemačkom, diplome, sertifikati, izvod iz matične knjige, motivaciono pismo.",
  req5Title: "Strpljenje i rezervni plan", req5Text: "Procesi traju nedeljama ili mesecima. Ambasade imaju dugo čekanje na termine. Planiraj unapred.",
  sec4Title: "Koliko novca treba za početak?",
  minLabel: "Apsolutni minimum", minAmount: "1.500€ – 2.500€", minNote: "Rizično — bez rezerve za neočekivane troškove",
  recLabel: "Preporučeni iznos", recAmount: "3.000€ – 6.000€", recNote: "Daje sigurnost za prva 2–3 meseca",
  exp1: "🏠 Kirija (WG soba): 400€ – 900€/mes zavisno od grada",
  exp2: "🔑 Kaution (depozit): 1–3 mesečne kirije (jednokratno)",
  exp3: "🛒 Hrana i osnovni troškovi: 300€ – 500€/mes",
  exp4: "🚌 Prevoz: 80€ – 120€/mes (javni prevoz)",
  expNote: "Iznosi se značajno razlikuju po gradu. Minhen i Frankfurt su znatno skuplji od Drezdena, Erfurta ili manjih gradova.",
  sec5Title: "Kako početi? — Korak po korak",
  step1Title: "Odluči šta želiš", step1Text: "Rad, Ausbildung ili studij? Svaki put zahteva drugačiji pristup i drugačiju pripremu.",
  step2Title: "Pronađi konkretnu ponudu", step2Text: "Posao, Ausbildungsplatz ili upis na fakultet. Bez konkretne ponude, viza se ne može dobiti.",
  step3Title: "Pripremi dokumentaciju", step3Text: "CV na nemačkom, prevedene i apostilirane diplome, sertifikati o jeziku, motivaciono pismo.",
  step4Title: "Zakaži termin u ambasadi", step4Text: "Termini su često popunjeni nedeljama unapred. Pripremi sve dokumente PRE zakazivanja.",
  step5Title: "Podnesi zahtev za vizu", step5Text: "Lično u ambasadi. Donesi original i kopije svih dokumenata. Očekuj odluku za 4–12 nedelja.",
  step6Title: "Nakon dolaska: Anmeldung i dozvola boravka", step6Text: "Prijava adrese (Anmeldung) je obavezna u roku od 14 dana. Zatim zakazivanje u Ausländerbehörde.",
  sec6Title: "Dolazak iz tvoje države",
  sec6Cta: "Za detaljne vizne tokove po državi, koristi Viza Navigator →",
  sec7Title: "Greške koje ljudi prave",
  err1Title: "Dolazak bez plana", err1Text: "Dolazak u Nemačku sa ciljem 'naći ću nešto' gotovo uvek završava loše. Bez ugovora nema legalnog statusa.",
  err2Title: "Nedovoljno znanje jezika", err2Text: "Mnogi dolaze sa A2/B1 i očekuju da će naći posao. Realnost je drugačija — bez B2 napredak je spor i frustrirajući.",
  err3Title: "Verovanje neproverenim agentima", err3Text: "Agencije koje obećavaju 'siguran posao u Nemačkoj' često naplaćuju usluge za koje ne treba plaćati ili su direktno prevara.",
  err4Title: "Nedovoljno finansijskih rezervi", err4Text: "Dolazak sa manje od 2.000€ bez osiguranog smeštaja je visokorizičan. Prva plata dolazi tek nakon 4–6 nedelja rada.",
  err5Title: "Pogrešna vrsta vize", err5Text: "Dolazak na turističku vizu sa ciljem traženja posla je ilegalno i može rezultovati zabranom ulaska u Šengen.",
  sec8Title: "Zvanični izvori informacija",
  sec8Intro: "Sve informacije na ovoj stranici zasnovane su na sledećim zvaničnim izvorima. Direktno proveri aktuelne uslove.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Zvanična agencija za zapošljavanje. Podaci o tržištu rada, Ausbildung i priznavanju kvalifikacija.",
  src2Name: "Make it in Germany", src2Desc: "Zvanični portal nemačke vlade za kvalifikovane radnike iz inostranstva.",
  src3Name: "BAMF", src3Desc: "Savezni ured za migracije. Informacije o vizama, integraciji i jezičkim kursevima.",
  src4Name: "Auswärtiges Amt", src4Desc: "Nemačko Ministarstvo spoljnih poslova. Vizne informacije i lista potrebnih dokumenata.",
  visit: "Poseti →",
  ctaTitle: "Spreman/na za sledeći korak?",
  ctaVisa: "Viza Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulari →",
};

const me: Record<string, string> = {
  pageTitle: "Život i Dolazak u Njemačku",
  pageSubtitle: "Realne informacije za one koji ozbiljno razmišljaju o preseljenju",
  trustBadge: "Stanje 2026 — informacije provjerene iz zvaničnih izvora",
  breadcrumbHome: "Početna",
  sec1Title: "Kako stvarno izgleda život u Njemačkoj?",
  card1Title: "Visoki troškovi života",
  card1Text: "Stanovanje, hrana i prevoz su znatno skuplji nego u većini balkanskih država, posebno u Münchenu, Frankfurtu i Hamburgu.",
  card2Title: "Stroga administracija",
  card2Text: "Njemačka je birokratska zemlja. Svaki korak zahtijeva dokumente, rokove i strpljenje. Nema 'improvizacije'.",
  card3Title: "Jezik je ključ",
  card3Text: "Bez njemačkog jezika, napredak je gotovo nemoguć. B2 nivo je praktični minimum za većinu radnih mjesta.",
  card4Title: "Radna kultura",
  card4Text: "Tačnost, odgovornost i disciplina nijesu opcija — to je standard. Kašnjenje ili neozbiljnost se ne tolerišu.",
  realityTitle: "Realno stanje",
  realityText: "Prvih 3–6 mjeseci su najteži. Bez jezika i jasnog plana, dolazak može biti izuzetno stresan — finansijski i psihički. Priprema je sve.",
  sec2Title: "Kako možeš doći u Njemačku?",
  way1Tag: "§18 AufenthG", way1Title: "Radna viza",
  way1Desc: "Za kvalifikovane radnike sa priznatom diplomom ili stručnom kvalifikacijom. Potreban je ugovor o radu i dokaz o kvalifikaciji.",
  way1For: "Za: Stručnjaci, IT, zdravstvo, zanatstvo",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (stručno obrazovanje)",
  way2Desc: "Njemački sistem obuke koji kombinuje rad i školovanje. Traje 2–3 godine. Firma plaća malu platu tokom obuke.",
  way2For: "Za: Mlade do ~35 godina, osnovno njemačko znanje",
  way3Tag: "§16b AufenthG", way3Title: "Studij",
  way3Desc: "Upis na njemački univerzitet ili Fachhochschule. Potrebna je nostrifikacija diplome ili matura. Studij je besplatan na državnim univerzitetima.",
  way3For: "Za: Maturanti i studenti, B2/C1 njemački ili engleski",
  way4Tag: "Porodično pravo", way4Title: "Spajanje porodice",
  way4Desc: "Ako već imaš člana porodice sa boravišnom dozvolom ili državljanstvom u Njemačkoj, možeš aplicirati na osnovu porodičnog spajanja.",
  way4For: "Za: Bračni partneri, djeca, roditelji (u nekim slučajevima)",
  wayCta: "Pogledaj u Viza Navigatoru →",
  sec3Title: "Šta ti je potrebno?",
  req1Title: "Njemački jezik", req1Text: "Minimum B1, realno B2 za većinu poslova. Za Ausbildung je prihvatljiv B1.",
  req2Title: "Ugovor ili prihvatnica", req2Text: "Ugovor o radu, Ausbildungsvertrag ili pismo o prijemu na fakultet — bez toga nema vize.",
  req3Title: "Važeći pasoš", req3Text: "Pasoš mora biti važeći još najmanje 6 mjeseci od datuma podnošenja zahtjeva.",
  req4Title: "Pripremljeni dokumenti", req4Text: "CV na njemačkom, diplome, certifikati, izvod iz matične knjige, motivaciono pismo.",
  req5Title: "Strpljenje i rezervni plan", req5Text: "Procesi traju sedmicama ili mjesecima. Ambasade imaju dugo čekanje na termine. Planiraj unaprijed.",
  sec4Title: "Koliko novca treba za početak?",
  minLabel: "Apsolutni minimum", minAmount: "1.500€ – 2.500€", minNote: "Rizično — bez rezerve za neočekivane troškove",
  recLabel: "Preporučeni iznos", recAmount: "3.000€ – 6.000€", recNote: "Daje sigurnost za prve 2–3 mjeseca",
  exp1: "🏠 Kirija (WG soba): 400€ – 900€/mj zavisno od grada",
  exp2: "🔑 Kaution (depozit): 1–3 mjesečne kirije (jednokratno)",
  exp3: "🛒 Hrana i osnovni troškovi: 300€ – 500€/mj",
  exp4: "🚌 Prevoz: 80€ – 120€/mj (javni prevoz)",
  expNote: "Iznosi se značajno razlikuju po gradu. München i Frankfurt su znatno skuplji od Drezdena, Erfurta ili manjih gradova.",
  sec5Title: "Kako početi? — Korak po korak",
  step1Title: "Odluči šta želiš", step1Text: "Rad, Ausbildung ili studij? Svaki put zahtijeva drugačiji pristup i drugačiju pripremu.",
  step2Title: "Pronađi konkretnu ponudu", step2Text: "Posao, Ausbildungsplatz ili upis na fakultet. Bez konkretne ponude, viza se ne može dobiti.",
  step3Title: "Pripremi dokumentaciju", step3Text: "CV na njemačkom, prevedene i apostilirane diplome, certifikati o jeziku, motivaciono pismo.",
  step4Title: "Zakaži termin u ambasadi", step4Text: "Termini su često popunjeni sedmicama unaprijed. Pripremi sve dokumente PRIJE zakazivanja.",
  step5Title: "Podnesi zahtjev za vizu", step5Text: "Lično u ambasadi. Donesi original i kopije svih dokumenata. Očekuj odluku za 4–12 sedmica.",
  step6Title: "Nakon dolaska: Anmeldung i boravišna dozvola", step6Text: "Prijava adrese (Anmeldung) je obavezna u roku od 14 dana. Zatim zakazivanje u Ausländerbehörde.",
  sec6Title: "Dolazak iz tvoje države",
  sec6Cta: "Za detaljne vizne tokove po državi, koristi Viza Navigator →",
  sec7Title: "Greške koje ljudi prave",
  err1Title: "Dolazak bez plana", err1Text: "Dolazak u Njemačku sa ciljem 'naći ću nešto' gotovo uvijek završava loše. Bez ugovora nema legalnog statusa.",
  err2Title: "Nedovoljno znanje jezika", err2Text: "Mnogi dolaze s A2/B1 i očekuju da će naći posao. Realnost je drugačija — bez B2 napredak je spor i frustrirajući.",
  err3Title: "Vjerovanje neprovjerenim agentima", err3Text: "Agencije koje obećavaju 'siguran posao u Njemačkoj' često naplaćuju usluge za koje ne treba plaćati ili su direktno prevara.",
  err4Title: "Nedovoljno finansijskih rezervi", err4Text: "Dolazak s manje od 2.000€ bez osiguranog smještaja je visokorizičan. Prva plata dolazi tek nakon 4–6 sedmica rada.",
  err5Title: "Pogrešna vrsta vize", err5Text: "Dolazak na turističku vizu sa ciljem traženja posla je ilegalno i može rezultovati zabranom ulaska u Šengen.",
  sec8Title: "Zvanični izvori informacija",
  sec8Intro: "Sve informacije na ovoj stranici zasnovane su na sljedećim zvaničnim izvorima. Direktno provjeri aktualne uslove.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Zvanična agencija za zapošljavanje. Podaci o tržištu rada, Ausbildung i priznavanju kvalifikacija.",
  src2Name: "Make it in Germany", src2Desc: "Zvanični portal njemačke vlade za kvalifikovane radnike iz inostranstva.",
  src3Name: "BAMF", src3Desc: "Savezni ured za migracije. Informacije o vizama, integraciji i jezičnim kursevima.",
  src4Name: "Auswärtiges Amt", src4Desc: "Njemačko Ministarstvo vanjskih poslova. Vizne informacije i lista potrebnih dokumenata.",
  visit: "Posjeti →",
  ctaTitle: "Spreman/na za sljedeći korak?",
  ctaVisa: "Viza Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulari →",
};

const mk: Record<string, string> = {
  pageTitle: "Живот и Доаѓање во Германија",
  pageSubtitle: "Реални информации за оние кои сериозно размислуваат за преселба",
  trustBadge: "Состојба 2026 — информации проверени од официјални извори",
  breadcrumbHome: "Почетна",
  sec1Title: "Како навистина изгледа животот во Германија?",
  card1Title: "Високи трошоци за живот",
  card1Text: "Становањето, храната и превозот се значително поскапи отколку во повеќето балкански држави, особено во Минхен, Франкфурт и Хамбург.",
  card2Title: "Строга администрација",
  card2Text: "Германија е бирократска земја. Секој чекор бара документи, рокови и трпение. Нема 'импровизација'.",
  card3Title: "Јазикот е клуч",
  card3Text: "Без германски јазик, напредокот е речиси невозможен. Б2 ниво е практичен минимум за повеќето работни места.",
  card4Title: "Работна култура",
  card4Text: "Точноста, одговорноста и дисциплината не се опција — тоа е стандард. Задоцнување или неозбилност не се толерираат.",
  realityTitle: "Реална состојба",
  realityText: "Првите 3–6 месеци се најтешки. Без јазик и јасен план, доаѓањето може да биде исклучително стресно — финансиски и психички. Подготовката е сè.",
  sec2Title: "Како можеш да дојдеш во Германија?",
  way1Tag: "§18 AufenthG", way1Title: "Работна виза",
  way1Desc: "За квалификувани работници со призната диплома или стручна квалификација. Потребен е договор за работа и доказ за квалификација.",
  way1For: "За: Стручњаци, ИТ, здравство, занаетчиство",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (стручно образование)",
  way2Desc: "Германски систем на обука кој комбинира работа и школување. Трае 2–3 години. Фирмата плаќа мала плата за време на обуката.",
  way2For: "За: Млади до ~35 години, основно германско знаење",
  way3Tag: "§16b AufenthG", way3Title: "Студии",
  way3Desc: "Запишување на германски универзитет или Fachhochschule. Потребна е нострификација на диплома или матура. Студиите се бесплатни на државни универзитети.",
  way3For: "За: Матуранти и студенти, Б2/Ц1 германски или англиски",
  way4Tag: "Семејно право", way4Title: "Спојување на семејство",
  way4Desc: "Ако веќе имаш член на семејството со дозвола за престој или државјанство во Германија, можеш да аплицираш врз основа на семејно спојување.",
  way4For: "За: Брачни партнери, деца, родители (во некои случаи)",
  wayCta: "Погледни во Виза Навигаторот →",
  sec3Title: "Што ти е потребно?",
  req1Title: "Германски јазик", req1Text: "Минимум Б1, реално Б2 за повеќето работни места. За Ausbildung е прифатлив Б1.",
  req2Title: "Договор или прием", req2Text: "Договор за работа, Ausbildungsvertrag или писмо за прием на факултет — без тоа нема виза.",
  req3Title: "Важечки пасош", req3Text: "Пасошот мора да биде важечки уште најмалку 6 месеци од датумот на поднесување на барањето.",
  req4Title: "Подготвени документи", req4Text: "CV на германски, дипломи, сертификати, извод од матична книга, мотивационо писмо.",
  req5Title: "Трпение и резервен план", req5Text: "Процесите траат недели или месеци. Амбасадите имаат долго чекање за термини. Планирај однапред.",
  sec4Title: "Колку пари треба за почеток?",
  minLabel: "Апсолутен минимум", minAmount: "1.500€ – 2.500€", minNote: "Ризично — без резерва за неочекувани трошоци",
  recLabel: "Препорачан износ", recAmount: "3.000€ – 6.000€", recNote: "Дава сигурност за првите 2–3 месеци",
  exp1: "🏠 Кирија (WG соба): 400€ – 900€/мес зависно од градот",
  exp2: "🔑 Каутион (депозит): 1–3 месечни кирии (еднократно)",
  exp3: "🛒 Храна и основни трошоци: 300€ – 500€/мес",
  exp4: "🚌 Превоз: 80€ – 120€/мес (јавен превоз)",
  expNote: "Износите значително се разликуваат по градови. Минхен и Франкфурт се значително поскапи од Дрезден, Ерфурт или помали градови.",
  sec5Title: "Како да почнеш? — Чекор по чекор",
  step1Title: "Одлучи што сакаш", step1Text: "Работа, Ausbildung или студии? Секој пат бара поинаков пристап и поинаква подготовка.",
  step2Title: "Најди конкретна понуда", step2Text: "Работа, Ausbildungsplatz или упис на факултет. Без конкретна понуда, виза не може да се добие.",
  step3Title: "Подготви документација", step3Text: "CV на германски, преведени и апостилирани дипломи, сертификати за јазик, мотивационо писмо.",
  step4Title: "Закажи термин во амбасада", step4Text: "Термините се често пополнети недели однапред. Подготви ги сите документи ПРЕД закажување.",
  step5Title: "Поднеси барање за виза", step5Text: "Лично во амбасада. Донеси оригинал и копии од сите документи. Очекувај одлука за 4–12 недели.",
  step6Title: "По доаѓањето: Anmeldung и дозвола за престој", step6Text: "Пријавувањето на адреса (Anmeldung) е задолжително во рок од 14 дена. Потоа закажување во Ausländerbehörde.",
  sec6Title: "Доаѓање од твојата држава",
  sec6Cta: "За детални визни процеси по држава, користи го Виза Навигаторот →",
  sec7Title: "Грешки кои луѓето ги прават",
  err1Title: "Доаѓање без план", err1Text: "Доаѓање во Германија со цел 'ќе најдам нешто' речиси секогаш завршува лошо. Без договор нема легален статус.",
  err2Title: "Недоволно знаење на јазик", err2Text: "Многумина доаѓаат со А2/Б1 и очекуваат да најдат работа. Реалноста е поинаква — без Б2 напредокот е бавен и фрустрирачки.",
  err3Title: "Верување на непроверени агенти", err3Text: "Агенции кои ветуваат 'сигурна работа во Германија' често наплатуваат услуги за кои не треба да се плаќа или се директна измама.",
  err4Title: "Недоволно финансиски резерви", err4Text: "Доаѓање со помалку од 2.000€ без осигурен сместувај е високоризично. Првата плата доаѓа дури по 4–6 недели работа.",
  err5Title: "Погрешен тип на виза", err5Text: "Доаѓање на туристичка виза со цел барање работа е илегално и може да резултира со забрана за влез во Шенген.",
  sec8Title: "Официјални извори на информации",
  sec8Intro: "Сите информации на оваа страница се засновани на следниве официјални извори. Директно провери ги актуелните услови.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Официјална агенција за вработување. Податоци за пазарот на труд, Ausbildung и признавање на квалификации.",
  src2Name: "Make it in Germany", src2Desc: "Официјален портал на германската влада за квалификувани работници од странство.",
  src3Name: "BAMF", src3Desc: "Сојузна канцеларија за миграции. Информации за визи, интеграција и јазични курсеви.",
  src4Name: "Auswärtiges Amt", src4Desc: "Германско Министерство за надворешни работи. Визни информации и листа на потребни документи.",
  visit: "Посети →",
  ctaTitle: "Спремен/на за следниот чекор?",
  ctaVisa: "Виза Навигатор →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Формулари →",
};

const sq: Record<string, string> = {
  pageTitle: "Jeta dhe Ardhja në Gjermani",
  pageSubtitle: "Informacione reale për ata që mendojnë seriozisht për zhvendosjen",
  trustBadge: "Gjendja 2026 — informacione të verifikuara nga burime zyrtare",
  breadcrumbHome: "Kryefaqja",
  sec1Title: "Si duket në të vërtetë jeta në Gjermani?",
  card1Title: "Kosto e lartë e jetesës",
  card1Text: "Banimi, ushqimi dhe transporti janë shumë më të shtrenjta se në shumicën e vendeve ballkanike, veçanërisht në Mynih, Frankfurt dhe Hamburg.",
  card2Title: "Administrim i rreptë",
  card2Text: "Gjermania është vend burokratik. Çdo hap kërkon dokumente, afate dhe durim. Nuk ka 'improvizim'.",
  card3Title: "Gjuha është çelësi",
  card3Text: "Pa gjuhën gjermane, progresi është pothuajse i pamundur. Niveli B2 është minimumi praktik për shumicën e vendeve të punës.",
  card4Title: "Kultura e punës",
  card4Text: "Përpikmëria, përgjegjësia dhe disiplina nuk janë opsion — janë standard. Vonesat ose mosseriozteti nuk tolerohen.",
  realityTitle: "Gjendja reale",
  realityText: "3–6 muajt e parë janë më të vështirët. Pa gjuhë dhe plan të qartë, ardhja mund të jetë jashtëzakonisht stresuese — financiarisht dhe psikologjikisht. Përgatitja është gjithçka.",
  sec2Title: "Si mund të vish në Gjermani?",
  way1Tag: "§18 AufenthG", way1Title: "Viza e punës",
  way1Desc: "Për punëtorë të kualifikuar me diplomë të njohur ose kualifikim profesional. Nevojitet kontratë pune dhe dëshmi kualifikimi.",
  way1For: "Për: Specialistë, IT, shëndetësi, zejtari",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (arsim profesional)",
  way2Desc: "Sistemi gjerman i trajnimit që kombinon punën dhe shkollimin. Zgjat 2–3 vjet. Kompania paguan pagë të vogël gjatë trajnimit.",
  way2For: "Për: Të rinj deri ~35 vjeç, njohuri bazike gjermane",
  way3Tag: "§16b AufenthG", way3Title: "Studime",
  way3Desc: "Regjistrimi në universitet gjerman ose Fachhochschule. Nevojitet nostrifikimi i diplomës ose matura. Studimi është falas në universitetet shtetërore.",
  way3For: "Për: Maturantë dhe studentë, B2/C1 gjermanisht ose anglisht",
  way4Tag: "E drejta familjare", way4Title: "Bashkimi familjar",
  way4Desc: "Nëse ke tashmë një anëtar familjeje me leje qëndrimi ose shtetësi në Gjermani, mund të aplikosh në bazë të bashkimit familjar.",
  way4For: "Për: Bashkëshortë, fëmijë, prindër (në disa raste)",
  wayCta: "Shiko në Viza Navigator →",
  sec3Title: "Çfarë të nevojitet?",
  req1Title: "Gjuha gjermane", req1Text: "Minimumi B1, realisht B2 për shumicën e punëve. Për Ausbildung pranohet B1.",
  req2Title: "Kontratë ose pranim", req2Text: "Kontratë pune, Ausbildungsvertrag ose letër pranimi në fakultet — pa këtë nuk ka vizë.",
  req3Title: "Pasaportë e vlefshme", req3Text: "Pasaporta duhet të jetë e vlefshme edhe të paktën 6 muaj nga data e aplikimit.",
  req4Title: "Dokumente të përgatitura", req4Text: "CV në gjermanisht, diploma, certifikata, çertifikatë lindjeje, letër motivimi.",
  req5Title: "Durim dhe plan rezervë", req5Text: "Proceset zgjasin javë ose muaj. Ambasadat kanë pritje të gjatë. Planifiko paraprakisht.",
  sec4Title: "Sa para nevojiten për fillimin?",
  minLabel: "Minimumi absolut", minAmount: "1.500€ – 2.500€", minNote: "Me rrezik — pa rezervë për kosto të papritura",
  recLabel: "Shuma e rekomanduar", recAmount: "3.000€ – 6.000€", recNote: "Jep siguri për 2–3 muajt e parë",
  exp1: "🏠 Qira (dhomë WG): 400€ – 900€/muaj sipas qytetit",
  exp2: "🔑 Kaution (depozitë): 1–3 qira mujore (njëherësh)",
  exp3: "🛒 Ushqim dhe kosto bazike: 300€ – 500€/muaj",
  exp4: "🚌 Transport: 80€ – 120€/muaj (transport publik)",
  expNote: "Shumat ndryshojnë shumë sipas qytetit. Mynihu dhe Frankfurti janë shumë më të shtrenjta se Drezdeni, Erfurti ose qytete më të vogla.",
  sec5Title: "Si të fillosh? — Hap pas hapi",
  step1Title: "Vendos çfarë dëshiron", step1Text: "Punë, Ausbildung ose studime? Çdo rrugë kërkon qasje dhe përgatitje tjetër.",
  step2Title: "Gjej një ofertë konkrete", step2Text: "Punë, Ausbildungsplatz ose pranim në fakultet. Pa ofertë konkrete, viza nuk mund të merret.",
  step3Title: "Përgatit dokumentacionin", step3Text: "CV në gjermanisht, diploma të përkthyera dhe apostiluara, certifikata gjuhësore, letër motivimi.",
  step4Title: "Cakto termin në ambasadë", step4Text: "Terminet janë shpesh të plotësuara javë më parë. Përgatit të gjitha dokumentet PARA caktimit.",
  step5Title: "Dorëzo kërkesën për vizë", step5Text: "Personalisht në ambasadë. Merr origjinalin dhe kopje të të gjitha dokumenteve. Prit vendim për 4–12 javë.",
  step6Title: "Pas ardhjes: Anmeldung dhe leja e qëndrimit", step6Text: "Regjistrimi i adresës (Anmeldung) është i detyrueshëm brenda 14 ditëve. Pastaj cakto termin në Ausländerbehörde.",
  sec6Title: "Ardhja nga shteti yt",
  sec6Cta: "Për procese të detajuara vizash sipas shtetit, përdor Viza Navigator →",
  sec7Title: "Gabime që njerëzit bëjnë",
  err1Title: "Ardhje pa plan", err1Text: "Ardhja në Gjermani me qëllim 'do gjej diçka' pothuajse gjithmonë përfundon keq. Pa kontratë nuk ka status ligjor.",
  err2Title: "Njohuri të pamjaftueshme gjuhësore", err2Text: "Shumë vijnë me A2/B1 dhe presin të gjejnë punë. Realiteti është ndryshe — pa B2 progresi është i ngadaltë.",
  err3Title: "Besim tek agjentë të paverifikuar", err3Text: "Agjenci që premtojnë 'punë të sigurt në Gjermani' shpesh naplatojnë shërbime që duhet të jenë falas ose janë mashtrim i drejtpërdrejtë.",
  err4Title: "Rezerva financiare të pamjaftueshme", err4Text: "Ardhja me më pak se 2.000€ pa strehim të siguruar është me rrezik të lartë. Paga e parë vjen vetëm pas 4–6 javëve punë.",
  err5Title: "Lloj i gabuar i vizës", err5Text: "Ardhja me vizë turistike me qëllim kërkimi pune është jolegale dhe mund të rezultojë me ndalim hyrjeje në Shengen.",
  sec8Title: "Burime zyrtare informacionesh",
  sec8Intro: "Të gjitha informacionet në këtë faqe bazohen në burimet zyrtare të mëposhtme. Kontrollo drejtpërdrejt kushtet aktuale.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Agjencia zyrtare e punësimit. Të dhëna për tregun e punës, Ausbildung dhe njohjen e kualifikimeve.",
  src2Name: "Make it in Germany", src2Desc: "Portali zyrtar i qeverisë gjermane për punëtorë të kualifikuar nga jashtë.",
  src3Name: "BAMF", src3Desc: "Zyra federale për migrim. Informacione për vizat, integrimin dhe kurset gjuhësore.",
  src4Name: "Auswärtiges Amt", src4Desc: "Ministria e Jashtme gjermane. Informacione vizash dhe lista e dokumenteve të nevojshme.",
  visit: "Vizito →",
  ctaTitle: "Gati për hapin e ardhshëm?",
  ctaVisa: "Viza Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulari →",
};

const sl: Record<string, string> = {
  pageTitle: "Življenje in Prihod v Nemčijo",
  pageSubtitle: "Realne informacije za tiste, ki resno razmišljajo o selitvi",
  trustBadge: "Stanje 2026 — informacije preverjene iz uradnih virov",
  breadcrumbHome: "Domov",
  sec1Title: "Kako v resnici izgleda življenje v Nemčiji?",
  card1Title: "Visoki življenjski stroški",
  card1Text: "Stanovanje, hrana in prevoz so bistveno dražji kot v večini balkanskih držav, še posebej v Münchnu, Frankfurtu in Hamburgu.",
  card2Title: "Stroga administracija",
  card2Text: "Nemčija je birokratska država. Vsak korak zahteva dokumente, roke in potrpljenje. Ni 'improvizacije'.",
  card3Title: "Jezik je ključ",
  card3Text: "Brez nemškega jezika je napredek skoraj nemogoč. Raven B2 je praktični minimum za večino delovnih mest.",
  card4Title: "Delovna kultura",
  card4Text: "Točnost, odgovornost in disciplina niso opcija — to je standard. Zamujanje ali neresnost se ne tolerirata.",
  realityTitle: "Realno stanje",
  realityText: "Prvih 3–6 mesecev je najtežjih. Brez jezika in jasnega načrta je prihod lahko izjemno stresen — finančno in psihično. Priprava je vse.",
  sec2Title: "Kako lahko prideš v Nemčijo?",
  way1Tag: "§18 AufenthG", way1Title: "Delovni vizum",
  way1Desc: "Za kvalificirane delavce s priznano diplomo ali poklicno kvalifikacijo. Potrebna je pogodba o zaposlitvi in dokazilo o kvalifikaciji.",
  way1For: "Za: Strokovnjaki, IT, zdravstvo, obrt",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (poklicno usposabljanje)",
  way2Desc: "Nemški sistem usposabljanja, ki združuje delo in šolanje. Traja 2–3 leta. Podjetje plačuje majhno plačo med usposabljanjem.",
  way2For: "Za: Mlade do ~35 let, osnovno znanje nemščine",
  way3Tag: "§16b AufenthG", way3Title: "Študij",
  way3Desc: "Vpis na nemško univerzo ali Fachhochschule. Potrebna je nostrifikacija diplome ali matura. Študij je brezplačen na državnih univerzah.",
  way3For: "Za: Maturante in študente, B2/C1 nemščina ali angleščina",
  way4Tag: "Družinsko pravo", way4Title: "Združitev družine",
  way4Desc: "Če že imaš družinskega člana z dovoljenjem za bivanje ali državljanstvom v Nemčiji, lahko zaprosiš na podlagi družinskega združevanja.",
  way4For: "Za: Zakonske partnerje, otroke, starše (v nekaterih primerih)",
  wayCta: "Poglej v Viza Navigatorju →",
  sec3Title: "Kaj potrebuješ?",
  req1Title: "Nemški jezik", req1Text: "Minimum B1, realno B2 za večino služb. Za Ausbildung je sprejemljiv B1.",
  req2Title: "Pogodba ali sprejem", req2Text: "Pogodba o zaposlitvi, Ausbildungsvertrag ali pismo o sprejemu na fakulteto — brez tega ni vizuma.",
  req3Title: "Veljaven potni list", req3Text: "Potni list mora biti veljaven še vsaj 6 mesecev od datuma oddaje vloge.",
  req4Title: "Pripravljeni dokumenti", req4Text: "Življenjepis v nemščini, diplome, certifikati, izpisek iz matičnega registra, motivacijsko pismo.",
  req5Title: "Potrpljenje in rezervni načrt", req5Text: "Procesi trajajo tedne ali mesece. Veleposlaništva imajo dolge čakalne dobe. Načrtuj vnaprej.",
  sec4Title: "Koliko denarja potrebuješ za začetek?",
  minLabel: "Absolutni minimum", minAmount: "1.500€ – 2.500€", minNote: "Tvegano — brez rezerve za nepričakovane stroške",
  recLabel: "Priporočen znesek", recAmount: "3.000€ – 6.000€", recNote: "Daje varnost za prva 2–3 mesece",
  exp1: "🏠 Najemnina (WG soba): 400€ – 900€/mes odvisno od mesta",
  exp2: "🔑 Kaution (varščina): 1–3 mesečne najemnine (enkratno)",
  exp3: "🛒 Hrana in osnovni stroški: 300€ – 500€/mes",
  exp4: "🚌 Prevoz: 80€ – 120€/mes (javni prevoz)",
  expNote: "Zneski se bistveno razlikujejo po mestih. München in Frankfurt sta bistveno dražja od Dresdena, Erfurta ali manjših mest.",
  sec5Title: "Kako začeti? — Korak za korakom",
  step1Title: "Odloči se, kaj želiš", step1Text: "Delo, Ausbildung ali študij? Vsaka pot zahteva drugačen pristop in drugačno pripravo.",
  step2Title: "Najdi konkretno ponudbo", step2Text: "Službo, Ausbildungsplatz ali vpis na fakulteto. Brez konkretne ponudbe vizuma ni mogoče dobiti.",
  step3Title: "Pripravi dokumentacijo", step3Text: "Življenjepis v nemščini, prevedene in apostilirane diplome, jezikovna potrdila, motivacijsko pismo.",
  step4Title: "Naroči termin na veleposlaništvu", step4Text: "Termini so pogosto polni tedne vnaprej. Pripravi vse dokumente PRED naročanjem.",
  step5Title: "Oddaj vlogo za vizum", step5Text: "Osebno na veleposlaništvu. Prinesi original in kopije vseh dokumentov. Pričakuj odločitev v 4–12 tednih.",
  step6Title: "Po prihodu: Anmeldung in dovoljenje za bivanje", step6Text: "Prijava naslova (Anmeldung) je obvezna v 14 dneh. Nato naroči termin pri Ausländerbehörde.",
  sec6Title: "Prihod iz tvoje države",
  sec6Cta: "Za podrobne vizumske procese po državah uporabi Viza Navigator →",
  sec7Title: "Napake, ki jih ljudje delajo",
  err1Title: "Prihod brez načrta", err1Text: "Prihod v Nemčijo s ciljem 'že bom nekaj našel' skoraj vedno slabo konča. Brez pogodbe ni legalnega statusa.",
  err2Title: "Nezadostno znanje jezika", err2Text: "Mnogi pridejo z A2/B1 in pričakujejo, da bodo našli službo. Realnost je drugačna — brez B2 je napredek počasen in frustrirajoč.",
  err3Title: "Zaupanje nepreverjenim agentom", err3Text: "Agencije, ki obljubljajo 'zanesljivo službo v Nemčiji', pogosto zaračunavajo storitve, ki bi morale biti brezplačne, ali gre za neposredno goljufijo.",
  err4Title: "Nezadostne finančne rezerve", err4Text: "Prihod z manj kot 2.000€ brez zagotovljenega bivališča je visoko tvegano. Prva plača pride šele po 4–6 tednih dela.",
  err5Title: "Napačna vrsta vizuma", err5Text: "Prihod s turističnim vizumom z namenom iskanja zaposlitve je ilegalen in lahko povzroči prepoved vstopa v Schengen.",
  sec8Title: "Uradni viri informacij",
  sec8Intro: "Vse informacije na tej strani temeljijo na naslednjih uradnih virih. Neposredno preveri aktualne pogoje.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Uradna agencija za zaposlovanje. Podatki o trgu dela, Ausbildung in priznavanju kvalifikacij.",
  src2Name: "Make it in Germany", src2Desc: "Uradni portal nemške vlade za kvalificirane delavce iz tujine.",
  src3Name: "BAMF", src3Desc: "Zvezni urad za migracije. Informacije o vizumih, integraciji in jezikovnih tečajih.",
  src4Name: "Auswärtiges Amt", src4Desc: "Nemško Ministrstvo za zunanje zadeve. Vizumske informacije in seznam potrebnih dokumentov.",
  visit: "Obišči →",
  ctaTitle: "Pripravljen/a na naslednji korak?",
  ctaVisa: "Viza Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulari →",
};

const de: Record<string, string> = {
  pageTitle: "Leben & Einreise nach Deutschland",
  pageSubtitle: "Realistische Informationen für alle, die ernsthaft über einen Umzug nachdenken",
  trustBadge: "Stand 2026 — Informationen aus offiziellen Quellen geprüft",
  breadcrumbHome: "Startseite",
  sec1Title: "Wie sieht das Leben in Deutschland wirklich aus?",
  card1Title: "Hohe Lebenshaltungskosten",
  card1Text: "Wohnen, Essen und Transport sind deutlich teurer als in den meisten Balkanländern, besonders in München, Frankfurt und Hamburg.",
  card2Title: "Strenge Bürokratie",
  card2Text: "Deutschland ist ein bürokratisches Land. Jeder Schritt erfordert Dokumente, Fristen und Geduld. Es gibt kein 'Improvisieren'.",
  card3Title: "Sprache ist der Schlüssel",
  card3Text: "Ohne Deutsch ist Fortschritt nahezu unmöglich. B2 ist das praktische Minimum für die meisten Arbeitsplätze.",
  card4Title: "Arbeitskultur",
  card4Text: "Pünktlichkeit, Verantwortung und Disziplin sind keine Option — sie sind Standard. Verspätungen oder Unzuverlässigkeit werden nicht toleriert.",
  realityTitle: "Die Realität",
  realityText: "Die ersten 3–6 Monate sind die schwierigsten. Ohne Sprache und klaren Plan kann die Ankunft extrem stressig sein — finanziell und psychisch. Vorbereitung ist alles.",
  sec2Title: "Wie kannst du nach Deutschland kommen?",
  way1Tag: "§18 AufenthG", way1Title: "Arbeitsvisum",
  way1Desc: "Für qualifizierte Arbeitnehmer mit anerkanntem Abschluss oder Berufsqualifikation. Ein Arbeitsvertrag und Qualifikationsnachweis sind erforderlich.",
  way1For: "Für: Fachkräfte, IT, Gesundheit, Handwerk",
  way2Tag: "§16a AufenthG", way2Title: "Ausbildung (Berufsausbildung)",
  way2Desc: "Das deutsche Ausbildungssystem kombiniert Arbeit und Schule. Dauer: 2–3 Jahre. Das Unternehmen zahlt ein kleines Gehalt während der Ausbildung.",
  way2For: "Für: Junge Menschen bis ~35 Jahre, Grundkenntnisse Deutsch",
  way3Tag: "§16b AufenthG", way3Title: "Studium",
  way3Desc: "Einschreibung an einer deutschen Universität oder Fachhochschule. Anerkennung des Abschlusses oder Abitur erforderlich. Studium ist an staatlichen Unis kostenlos.",
  way3For: "Für: Abiturienten und Studenten, B2/C1 Deutsch oder Englisch",
  way4Tag: "Familienrecht", way4Title: "Familiennachzug",
  way4Desc: "Wenn du bereits ein Familienmitglied mit Aufenthaltserlaubnis oder Staatsangehörigkeit in Deutschland hast, kannst du auf Basis des Familiennachzugs beantragen.",
  way4For: "Für: Ehepartner, Kinder, Eltern (in bestimmten Fällen)",
  wayCta: "Im Visa Navigator ansehen →",
  sec3Title: "Was brauchst du?",
  req1Title: "Deutsche Sprache", req1Text: "Minimum B1, realistisch B2 für die meisten Jobs. Für Ausbildung ist B1 akzeptabel.",
  req2Title: "Vertrag oder Zulassung", req2Text: "Arbeitsvertrag, Ausbildungsvertrag oder Zulassungsbescheid — ohne das gibt es kein Visum.",
  req3Title: "Gültiger Reisepass", req3Text: "Der Pass muss noch mindestens 6 Monate ab Antragsdatum gültig sein.",
  req4Title: "Vorbereitete Dokumente", req4Text: "Lebenslauf auf Deutsch, Diplome, Zertifikate, Geburtsurkunde, Motivationsschreiben.",
  req5Title: "Geduld und Plan B", req5Text: "Prozesse dauern Wochen oder Monate. Botschaften haben lange Wartezeiten. Plane voraus.",
  sec4Title: "Wie viel Geld brauchst du am Anfang?",
  minLabel: "Absolutes Minimum", minAmount: "1.500€ – 2.500€", minNote: "Riskant — keine Reserve für unerwartete Kosten",
  recLabel: "Empfohlener Betrag", recAmount: "3.000€ – 6.000€", recNote: "Gibt Sicherheit für die ersten 2–3 Monate",
  exp1: "🏠 Miete (WG-Zimmer): 400€ – 900€/Monat je nach Stadt",
  exp2: "🔑 Kaution: 1–3 Monatsmieten (einmalig)",
  exp3: "🛒 Lebensmittel und Grundkosten: 300€ – 500€/Monat",
  exp4: "🚌 Transport: 80€ – 120€/Monat (ÖPNV)",
  expNote: "Die Beträge unterscheiden sich erheblich je nach Stadt. München und Frankfurt sind deutlich teurer als Dresden, Erfurt oder kleinere Städte.",
  sec5Title: "Wie anfangen? — Schritt für Schritt",
  step1Title: "Entscheide was du willst", step1Text: "Arbeit, Ausbildung oder Studium? Jeder Weg erfordert einen anderen Ansatz und andere Vorbereitung.",
  step2Title: "Finde ein konkretes Angebot", step2Text: "Job, Ausbildungsplatz oder Uni-Zulassung. Ohne konkretes Angebot kann kein Visum beantragt werden.",
  step3Title: "Bereite die Dokumente vor", step3Text: "Lebenslauf auf Deutsch, übersetzte und apostillierte Diplome, Sprachzertifikate, Motivationsschreiben.",
  step4Title: "Termin bei der Botschaft", step4Text: "Termine sind oft wochenlang ausgebucht. Bereite alle Dokumente VOR der Terminbuchung vor.",
  step5Title: "Visumantrag einreichen", step5Text: "Persönlich bei der Botschaft. Originale und Kopien aller Dokumente mitbringen. Bearbeitungszeit: 4–12 Wochen.",
  step6Title: "Nach der Ankunft: Anmeldung und Aufenthaltstitel", step6Text: "Anmeldung innerhalb von 14 Tagen Pflicht. Danach Termin bei der Ausländerbehörde.",
  sec6Title: "Einreise aus deinem Land",
  sec6Cta: "Für detaillierte Visa-Flows pro Land nutze den Visa Navigator →",
  sec7Title: "Häufige Fehler",
  err1Title: "Ankunft ohne Plan", err1Text: "Nach Deutschland kommen mit dem Ziel 'ich werde schon etwas finden' endet fast immer schlecht. Ohne Vertrag kein legaler Status.",
  err2Title: "Unzureichende Sprachkenntnisse", err2Text: "Viele kommen mit A2/B1 und erwarten einen Job zu finden. Die Realität ist anders — ohne B2 ist Fortschritt langsam.",
  err3Title: "Vertrauen in unseriöse Agenten", err3Text: "Agenturen, die 'sichere Jobs in Deutschland' versprechen, verlangen oft Gebühren für Leistungen, die kostenlos sein sollten.",
  err4Title: "Unzureichende Finanzreserven", err4Text: "Ankunft mit weniger als 2.000€ ohne gesicherte Unterkunft ist hochriskant. Das erste Gehalt kommt erst nach 4–6 Wochen.",
  err5Title: "Falsche Visumkategorie", err5Text: "Einreise mit Touristenvisum zum Zweck der Jobsuche ist illegal und kann zu einem Schengen-Einreiseverbot führen.",
  sec8Title: "Offizielle Informationsquellen",
  sec8Intro: "Alle Informationen auf dieser Seite basieren auf den folgenden offiziellen Quellen. Prüfe direkt die aktuellen Bedingungen.",
  src1Name: "Bundesagentur für Arbeit", src1Desc: "Offizielle Arbeitsagentur. Daten zum Arbeitsmarkt, Ausbildung und Anerkennung von Qualifikationen.",
  src2Name: "Make it in Germany", src2Desc: "Offizielles Portal der Bundesregierung für Fachkräfte aus dem Ausland.",
  src3Name: "BAMF", src3Desc: "Bundesamt für Migration und Flüchtlinge. Informationen zu Visa, Integration und Sprachkursen.",
  src4Name: "Auswärtiges Amt", src4Desc: "Auswärtiges Amt. Visa-Informationen und erforderliche Dokumente.",
  visit: "Besuchen →",
  ctaTitle: "Bereit für den nächsten Schritt?",
  ctaVisa: "Visa Navigator →",
  ctaDeutsch: "BalkanLink Deutsch →",
  ctaForms: "Formulare →",
};

const T: Record<string, Record<string, string>> = { bs, hr, sr, me, mk, sq, sl, de };

const COUNTRIES_I18N: Record<string, { flag: string; name: string; embassy: string; note: string }[]> = {
  bs: [
    { flag: "🇧🇦", name: "Bosna i Hercegovina", embassy: "Njemačka ambasada Sarajevo", note: "Termini su često popunjeni 6–10 sedmica unaprijed. Planiraj na vrijeme." },
    { flag: "🇷🇸", name: "Srbija", embassy: "Njemačka ambasada Beograd", note: "Zahtjev se podnosi lično. Visoka tražnja — termini se pune brzo." },
    { flag: "🇭🇷", name: "Hrvatska", embassy: "Njemačka ambasada Zagreb", note: "Kao članica EU, Hrvati imaju slobodu kretanja i rada — viza za EU državljane nije potrebna." },
    { flag: "🇲🇪", name: "Crna Gora", embassy: "Njemačka ambasada Podgorica", note: "Proces sličan BiH i Srbiji. Dodatni terminski pritisak u ljetnim mjesecima." },
    { flag: "🇲🇰", name: "Sjeverna Makedonija", embassy: "Njemačka ambasada Skoplje", note: "Schengen viza i radna viza se podnose odvojeno. Provjeriti aktuelne uslove." },
    { flag: "🇦🇱", name: "Albanija", embassy: "Njemačka ambasada Tirana", note: "Visoka tražnja za Ausbildung vizom. Preporučuje se rano apliciranje." },
  ],
  hr: [
    { flag: "🇧🇦", name: "Bosna i Hercegovina", embassy: "Njemačko veleposlanstvo Sarajevo", note: "Termini su često popunjeni 6–10 tjedana unaprijed. Planiraj na vrijeme." },
    { flag: "🇷🇸", name: "Srbija", embassy: "Njemačko veleposlanstvo Beograd", note: "Zahtjev se podnosi osobno. Velika potražnja — termini se pune brzo." },
    { flag: "🇭🇷", name: "Hrvatska", embassy: "Njemačko veleposlanstvo Zagreb", note: "Kao članica EU, Hrvati imaju slobodu kretanja i rada — viza za EU državljane nije potrebna." },
    { flag: "🇲🇪", name: "Crna Gora", embassy: "Njemačko veleposlanstvo Podgorica", note: "Postupak sličan BiH i Srbiji. Dodatni terminski pritisak u ljetnim mjesecima." },
    { flag: "🇲🇰", name: "Sjeverna Makedonija", embassy: "Njemačko veleposlanstvo Skopje", note: "Schengenska viza i radna viza podnose se odvojeno. Provjeri aktualne uvjete." },
    { flag: "🇦🇱", name: "Albanija", embassy: "Njemačko veleposlanstvo Tirana", note: "Velika potražnja za Ausbildung vizom. Preporučuje se rano apliciranje." },
  ],
  sr: [
    { flag: "🇧🇦", name: "Bosna i Hercegovina", embassy: "Nemačka ambasada Sarajevo", note: "Termini su često popunjeni 6–10 nedelja unapred. Planiraj na vreme." },
    { flag: "🇷🇸", name: "Srbija", embassy: "Nemačka ambasada Beograd", note: "Zahtev se podnosi lično. Visoka tražnja — termini se pune brzo." },
    { flag: "🇭🇷", name: "Hrvatska", embassy: "Nemačka ambasada Zagreb", note: "Kao članica EU, Hrvati imaju slobodu kretanja i rada — viza za EU državljane nije potrebna." },
    { flag: "🇲🇪", name: "Crna Gora", embassy: "Nemačka ambasada Podgorica", note: "Proces sličan BiH i Srbiji. Dodatni terminski pritisak u letnjim mesecima." },
    { flag: "🇲🇰", name: "Severna Makedonija", embassy: "Nemačka ambasada Skoplje", note: "Šengen viza i radna viza se podnose odvojeno. Proveriti aktuelne uslove." },
    { flag: "🇦🇱", name: "Albanija", embassy: "Nemačka ambasada Tirana", note: "Visoka tražnja za Ausbildung vizom. Preporučuje se rano apliciranje." },
  ],
  me: [
    { flag: "🇧🇦", name: "Bosna i Hercegovina", embassy: "Njemačka ambasada Sarajevo", note: "Termini su često popunjeni 6–10 sedmica unaprijed. Planiraj na vrijeme." },
    { flag: "🇷🇸", name: "Srbija", embassy: "Njemačka ambasada Beograd", note: "Zahtjev se podnosi lično. Visoka tražnja — termini se pune brzo." },
    { flag: "🇭🇷", name: "Hrvatska", embassy: "Njemačka ambasada Zagreb", note: "Kao članica EU, Hrvati imaju slobodu kretanja i rada — viza za EU državljane nije potrebna." },
    { flag: "🇲🇪", name: "Crna Gora", embassy: "Njemačka ambasada Podgorica", note: "Proces sličan BiH i Srbiji. Dodatni terminski pritisak u ljetnjim mjesecima." },
    { flag: "🇲🇰", name: "Sjeverna Makedonija", embassy: "Njemačka ambasada Skoplje", note: "Šengen viza i radna viza se podnose odvojeno. Provjeriti aktualne uslove." },
    { flag: "🇦🇱", name: "Albanija", embassy: "Njemačka ambasada Tirana", note: "Visoka tražnja za Ausbildung vizom. Preporučuje se rano apliciranje." },
  ],
  mk: [
    { flag: "🇧🇦", name: "Босна и Херцеговина", embassy: "Германска амбасада Сараево", note: "Термините се често пополнети 6–10 недели однапред. Планирај навреме." },
    { flag: "🇷🇸", name: "Србија", embassy: "Германска амбасада Белград", note: "Барањето се поднесува лично. Висока побарувачка — термините се полнат брзо." },
    { flag: "🇭🇷", name: "Хрватска", embassy: "Германска амбасада Загреб", note: "Како членка на ЕУ, Хрватите имаат слобода на движење и работа — виза за ЕУ граѓани не е потребна." },
    { flag: "🇲🇪", name: "Црна Гора", embassy: "Германска амбасада Подгорица", note: "Процесот е сличен на БиХ и Србија. Дополнителен притисок за термини во летните месеци." },
    { flag: "🇲🇰", name: "Северна Македонија", embassy: "Германска амбасада Скопје", note: "Шенген виза и работна виза се поднесуваат одвоено. Провери ги актуелните услови." },
    { flag: "🇦🇱", name: "Албанија", embassy: "Германска амбасада Тирана", note: "Висока побарувачка за Ausbildung виза. Се препорачува рано аплицирање." },
  ],
  sq: [
    { flag: "🇧🇦", name: "Bosnja dhe Hercegovina", embassy: "Ambasada gjermane Sarajevë", note: "Terminet janë shpesh të plotësuara 6–10 javë më parë. Planifiko me kohë." },
    { flag: "🇷🇸", name: "Serbia", embassy: "Ambasada gjermane Beograd", note: "Kërkesa dorëzohet personalisht. Kërkesë e lartë — terminet plotësohen shpejt." },
    { flag: "🇭🇷", name: "Kroacia", embassy: "Ambasada gjermane Zagreb", note: "Si anëtare e BE-së, kroatët kanë liri lëvizjeje dhe pune — nuk nevojitet vizë." },
    { flag: "🇲🇪", name: "Mali i Zi", embassy: "Ambasada gjermane Podgoricë", note: "Procesi i ngjashëm me BiH dhe Serbi. Presion shtesë për termin në muajt e verës." },
    { flag: "🇲🇰", name: "Maqedonia e Veriut", embassy: "Ambasada gjermane Shkup", note: "Viza Shengen dhe viza e punës dorëzohen veçmas. Kontrollo kushtet aktuale." },
    { flag: "🇦🇱", name: "Shqipëria", embassy: "Ambasada gjermane Tiranë", note: "Kërkesë e lartë për vizën Ausbildung. Rekomandohet aplikimi i hershëm." },
  ],
  sl: [
    { flag: "🇧🇦", name: "Bosna in Hercegovina", embassy: "Nemško veleposlaništvo Sarajevo", note: "Termini so pogosto polni 6–10 tednov vnaprej. Načrtuj pravočasno." },
    { flag: "🇷🇸", name: "Srbija", embassy: "Nemško veleposlaništvo Beograd", note: "Vloga se odda osebno. Veliko povpraševanje — termini se polnijo hitro." },
    { flag: "🇭🇷", name: "Hrvaška", embassy: "Nemško veleposlaništvo Zagreb", note: "Kot članica EU imajo Hrvati prosto gibanje in delo — vizum za EU državljane ni potreben." },
    { flag: "🇲🇪", name: "Črna gora", embassy: "Nemško veleposlaništvo Podgorica", note: "Postopek podoben BiH in Srbiji. Dodaten pritisk na termine v poletnih mesecih." },
    { flag: "🇲🇰", name: "Severna Makedonija", embassy: "Nemško veleposlaništvo Skopje", note: "Schengenski vizum in delovni vizum se oddajata ločeno. Preveri aktualne pogoje." },
    { flag: "🇦🇱", name: "Albanija", embassy: "Nemško veleposlaništvo Tirana", note: "Veliko povpraševanje po Ausbildung vizumu. Priporočljivo je zgodnje apliciranje." },
  ],
  de: [
    { flag: "🇧🇦", name: "Bosnien und Herzegowina", embassy: "Deutsche Botschaft Sarajevo", note: "Termine sind oft 6–10 Wochen im Voraus ausgebucht. Plane rechtzeitig." },
    { flag: "🇷🇸", name: "Serbien", embassy: "Deutsche Botschaft Belgrad", note: "Antrag persönlich einreichen. Hohe Nachfrage — Termine füllen sich schnell." },
    { flag: "🇭🇷", name: "Kroatien", embassy: "Deutsche Botschaft Zagreb", note: "Als EU-Mitglied haben Kroaten Freizügigkeit — kein Visum erforderlich." },
    { flag: "🇲🇪", name: "Montenegro", embassy: "Deutsche Botschaft Podgorica", note: "Ähnlicher Prozess wie BiH und Serbien. Zusätzlicher Termindruck im Sommer." },
    { flag: "🇲🇰", name: "Nordmazedonien", embassy: "Deutsche Botschaft Skopje", note: "Schengen-Visum und Arbeitsvisum werden getrennt beantragt." },
    { flag: "🇦🇱", name: "Albanien", embassy: "Deutsche Botschaft Tirana", note: "Hohe Nachfrage nach Ausbildungsvisum. Frühzeitige Bewerbung empfohlen." },
  ],
};

const SOURCES = [
  { url: "https://www.arbeitsagentur.de", key: "src1" },
  { url: "https://www.make-it-in-germany.com", key: "src2" },
  { url: "https://www.bamf.de", key: "src3" },
  { url: "https://www.auswaertiges-amt.de", key: "src4" },
];

export default function ZivotUNjemackoj() {
  const navigate = useNavigate();
  const lang = T[language] ? language : "bs";
  const t = (key: string) => T[lang]?.[key] ?? T.bs[key] ?? key;
  const countries = COUNTRIES_I18N[lang] ?? COUNTRIES_I18N.bs;

  const ways = [
    { tagKey: "way1Tag", titleKey: "way1Title", descKey: "way1Desc", forKey: "way1For" },
    { tagKey: "way2Tag", titleKey: "way2Title", descKey: "way2Desc", forKey: "way2For" },
    { tagKey: "way3Tag", titleKey: "way3Title", descKey: "way3Desc", forKey: "way3For" },
    { tagKey: "way4Tag", titleKey: "way4Title", descKey: "way4Desc", forKey: "way4For" },
  ];

  const reqs = [
    { titleKey: "req1Title", textKey: "req1Text" },
    { titleKey: "req2Title", textKey: "req2Text" },
    { titleKey: "req3Title", textKey: "req3Text" },
    { titleKey: "req4Title", textKey: "req4Text" },
    { titleKey: "req5Title", textKey: "req5Text" },
  ];

  const steps = [
    { titleKey: "step1Title", textKey: "step1Text" },
    { titleKey: "step2Title", textKey: "step2Text" },
    { titleKey: "step3Title", textKey: "step3Text" },
    { titleKey: "step4Title", textKey: "step4Text" },
    { titleKey: "step5Title", textKey: "step5Text" },
    { titleKey: "step6Title", textKey: "step6Text" },
  ];

  const errors = [
    { titleKey: "err1Title", textKey: "err1Text" },
    { titleKey: "err2Title", textKey: "err2Text" },
    { titleKey: "err3Title", textKey: "err3Text" },
    { titleKey: "err4Title", textKey: "err4Text" },
    { titleKey: "err5Title", textKey: "err5Text" },
  ];

  const SectionTitle = ({ icon: Icon, title, color = "#2D2D2D" }: { icon: any; title: string; color?: string }) => (
    <div className="flex items-center gap-2.5 mb-5">
      <Icon className="h-5 w-5 shrink-0" style={{ color }} />
      <h2 className="text-xl font-bold" style={{ color }}>{title}</h2>
    </div>
  );

  const cardIcons = [TrendingUp, FileText, MessageSquare, Clock];

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <PageNavBar />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-6 text-[13px]">
          <button onClick={() => navigate("/")} className="text-[#9CA3AF] hover:underline">
            {"breadcrumbHome"}
          </button>
          <span className="text-[#9CA3AF]">›</span>
          <span className="text-[#2D2D2D] font-medium">{"pageTitle"}</span>
        </nav>

        {/* Header */}
        <div className="rounded-2xl p-6 sm:p-10 mb-8" style={{ background: "linear-gradient(135deg, #1a3a5c, #2d6a9f)" }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{"pageTitle"}</h1>
          <p className="text-white/80 text-sm sm:text-base mb-4">{"pageSubtitle"}</p>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-white/15 px-3 py-1 rounded-full">
            <Info className="h-3 w-3" /> {"trustBadge"}
          </span>
        </div>

        {/* SECTION 1 — Reality Check */}
        <section className="mb-8">
          <SectionTitle icon={Eye} title={"sec1Title"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {["card1", "card2", "card3", "card4"].map((k, i) => {
              const Icon = cardIcons[i];
              return (
                <div key={k} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <Icon className="h-5 w-5 text-[#2d6a9f] mb-2" />
                  <h3 className="font-bold text-[#2D2D2D] mb-1">{t(`${k}Title`)}</h3>
                  <p className="text-sm text-[#6B6B6B]">{t(`${k}Text`)}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-lg p-4 border-l-4 border-amber-400" style={{ background: "#fffbeb" }}>
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2D2D2D] mb-1">{"realityTitle"}</p>
                <p className="text-sm text-[#6B6B6B]">{"realityText"}</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 2 — Ways */}
        <section className="mb-8">
          <SectionTitle icon={Plane} title={"sec2Title"} />
          <div className="flex flex-col gap-4">
            {ways.map((w) => (
              <div key={w.tagKey} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <span className="inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#e8f4fd] text-[#2d6a9f] mb-2">
                  {t(w.tagKey)}
                </span>
                <h3 className="font-bold text-[#2D2D2D] mb-1">{t(w.titleKey)}</h3>
                <p className="text-sm text-[#6B6B6B] mb-2">{t(w.descKey)}</p>
                <p className="text-xs text-[#9CA3AF] mb-3">{t(w.forKey)}</p>
                <button onClick={() => navigate("/viza")} className="text-sm font-semibold text-[#2d6a9f] hover:underline">
                  {"wayCta"}
                </button>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 3 — Requirements */}
        <section className="mb-8">
          <SectionTitle icon={CheckCircle} title={"sec3Title"} />
          <div className="flex flex-col gap-3">
            {reqs.map((r) => (
              <div key={r.titleKey} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2D2D2D]">{t(r.titleKey)}</p>
                  <p className="text-sm text-[#6B6B6B]">{t(r.textKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 4 — Finances */}
        <section className="mb-8">
          <SectionTitle icon={Euro} title={"sec4Title"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border border-red-200 p-5" style={{ background: "#fff1f2" }}>
              <p className="text-2xl font-bold text-[#2D2D2D] mb-1">{"minAmount"}</p>
              <p className="text-sm font-semibold text-[#2D2D2D] mb-1">{"minLabel"}</p>
              <p className="text-xs text-[#6B6B6B]">{"minNote"}</p>
            </div>
            <div className="rounded-xl border border-green-200 p-5" style={{ background: "#f0fdf4" }}>
              <p className="text-2xl font-bold text-[#2D2D2D] mb-1">{"recAmount"}</p>
              <p className="text-sm font-semibold text-[#2D2D2D] mb-1">{"recLabel"}</p>
              <p className="text-xs text-[#6B6B6B]">{"recNote"}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {["exp1", "exp2", "exp3", "exp4"].map((k) => (
              <p key={k} className="text-sm text-[#2D2D2D]">{t(k)}</p>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] bg-gray-50 rounded-lg p-3">{"expNote"}</p>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 5 — Steps */}
        <section className="mb-8">
          <SectionTitle icon={ListChecks} title={"sec5Title"} />
          <div className="relative pl-8">
            <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-[#2d6a9f]/20" />
            <div className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <div key={s.titleKey} className="relative">
                  <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-[#2d6a9f] text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="font-bold text-[#2D2D2D]">{t(s.titleKey)}</p>
                  <p className="text-sm text-[#6B6B6B]">{t(s.textKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 6 — Countries */}
        <section className="mb-8">
          <SectionTitle icon={Globe} title={"sec6Title"} />
          <div className="flex flex-col gap-3 mb-4">
            {countries.map((c) => (
              <div key={c.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">{c.flag}</span>
                <div className="min-w-0">
                  <p className="font-bold text-[#2D2D2D]">{c.name}</p>
                  <p className="text-sm text-[#6B6B6B]">{c.embassy}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/viza")} className="text-sm font-semibold text-[#2d6a9f] hover:underline flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" /> {"sec6Cta"}
          </button>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 7 — Mistakes */}
        <section className="mb-8">
          <SectionTitle icon={XCircle} title={"sec7Title"} color="#DC2626" />
          <div className="flex flex-col gap-3">
            {errors.map((e) => (
              <div key={e.titleKey} className="rounded-lg p-4 border-l-4 border-red-400 bg-red-50/50">
                <p className="font-bold text-[#2D2D2D] mb-1">❌ {t(e.titleKey)}</p>
                <p className="text-sm text-[#6B6B6B]">{t(e.textKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 8 — Sources */}
        <section className="mb-8">
          <SectionTitle icon={BookOpen} title={"sec8Title"} />
          <p className="text-sm text-[#6B6B6B] mb-5">{"sec8Intro"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOURCES.map((s) => (
              <div key={s.key} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-[#2d6a9f]" />
                </div>
                <p className="font-bold text-[#2D2D2D] mb-1">{t(`${s.key}Name`)}</p>
                <p className="text-sm text-[#6B6B6B] mb-3">{t(`${s.key}Desc`)}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2d6a9f] hover:underline">
                  {"visit"}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Strip */}
        <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: "linear-gradient(135deg, #1a3a5c, #2d6a9f)" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">{"ctaTitle"}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate("/viza")} className="px-5 py-2.5 rounded-lg bg-white text-[#1a3a5c] font-semibold text-sm hover:bg-white/90 transition-colors">
              {"ctaVisa"}
            </button>
            <button onClick={() => navigate("/deutsch-trainer")} className="px-5 py-2.5 rounded-lg border border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              {"ctaDeutsch"}
            </button>
            <button onClick={() => navigate("/formulari")} className="px-5 py-2.5 rounded-lg border border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              {"ctaForms"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
