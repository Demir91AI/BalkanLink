import { Home, Banknote, Wrench, AlertTriangle, TrendingUp, Receipt, Paintbrush, FileX, UserCheck, ClipboardList, Users, AlertCircle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PageNavBar from "@/components/navigation/PageNavBar";
import { SEO } from "@/components/SEO";

const pills = [
  { id: "kaution", label: "Kaution" },
  { id: "popravke", label: "Popravke" },
  { id: "kvarovi", label: "Kvarovi i sniženje" },
  { id: "povecanje", label: "Povećanje najamnine" },
  { id: "dodatni-troskovi", label: "Dodatni troškovi" },
  { id: "kozmeticke-popravke", label: "Kozmetičke popravke" },
  { id: "otkaz", label: "Otkaz najma" },
  { id: "vlastite-potrebe", label: "Vlastite potrebe" },
  { id: "kucni-red", label: "Kućni red" },
  { id: "podzakup", label: "Podzakup" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function InfoCard({ type, children }: { type: "warning" | "tip" | "danger"; children: React.ReactNode }) {
  const styles = {
    warning: "bg-yellow-50 border-yellow-300 text-yellow-900",
    tip: "bg-blue-50 border-blue-300 text-blue-900",
    danger: "bg-red-50 border-red-300 text-red-900",
  };
  return <div className={`rounded-lg border p-4 text-sm ${styles[type]}`}>{children}</div>;
}

const sections = [
  { id: "kaution", borderColor: "border-l-blue-500", icon: <Banknote className="h-5 w-5 text-blue-500" />, titleDe: "Kaution", titleBs: "Depozit" },
  { id: "popravke", borderColor: "border-l-orange-500", icon: <Wrench className="h-5 w-5 text-orange-500" />, titleDe: "Reparaturen", titleBs: "Ko plaća popravke?" },
  { id: "kvarovi", borderColor: "border-l-red-500", icon: <AlertTriangle className="h-5 w-5 text-red-500" />, titleDe: "Mietminderung", titleBs: "Sniženje najamnine zbog kvara" },
  { id: "povecanje", borderColor: "border-l-yellow-500", icon: <TrendingUp className="h-5 w-5 text-yellow-500" />, titleDe: "Mieterhöhung", titleBs: "Povećanje najamnine" },
  { id: "dodatni-troskovi", borderColor: "border-l-teal-500", icon: <Receipt className="h-5 w-5 text-teal-500" />, titleDe: "Nebenkosten", titleBs: "Dodatni troškovi stanovanja" },
  { id: "kozmeticke-popravke", borderColor: "border-l-purple-500", icon: <Paintbrush className="h-5 w-5 text-purple-500" />, titleDe: "Schönheitsreparaturen", titleBs: "Ko renovira stan pri iseljenju?" },
  { id: "otkaz", borderColor: "border-l-red-600", icon: <FileX className="h-5 w-5 text-red-600" />, titleDe: "Kündigung", titleBs: "Otkaz ugovora o najmu" },
  { id: "vlastite-potrebe", borderColor: "border-l-amber-600", icon: <UserCheck className="h-5 w-5 text-amber-600" />, titleDe: "Eigenbedarfskündigung", titleBs: "Otkaz jer iznajmljivač treba stan" },
  { id: "kucni-red", borderColor: "border-l-gray-500", icon: <ClipboardList className="h-5 w-5 text-gray-500" />, titleDe: "Hausordnung", titleBs: "Kućni red" },
  { id: "podzakup", borderColor: "border-l-indigo-500", icon: <Users className="h-5 w-5 text-indigo-500" />, titleDe: "Untervermietung", titleBs: "Podzakup stana" },
];

export default function Mietrecht() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <SEO title="Mietrecht — Prava Podstanara u Njemačkoj" description="Sva vaša prava kao podstanar u Njemačkoj — kaucija, otkaz, povećanje kirije, Nebenkosten i sudski sporovi. Jasno i na vašem jeziku." path="/mietrecht" />
      <PageNavBar  showShare />

      {/* Hero */}
      <div className="rounded-2xl bg-[#F5F0E8] p-6 sm:p-8 mb-6 text-center">
        <Home className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mietrecht – Prava podstanara</h1>
        <p className="text-muted-foreground max-w-lg mx-auto mb-3">
          Sva vaša prava kao podstanar u Njemačkoj — jasno, provjereno i na vašem jeziku.
        </p>
        <Badge variant="outline" className="text-xs">
          📌 Izvor: BGB §§ 535–580a · Deutscher Mieterbund · mieterbund.de
        </Badge>
      </div>

      {/* Pills */}
      <div className="sticky top-14 z-20 -mx-4 px-4 py-2 bg-background/95 backdrop-blur mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {pills.map((p) => (
            <button key={p.id} onClick={() => scrollTo(p.id)} className="whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {/* 1 — Kaution */}
        <AccordionItem value="kaution" id="kaution" className={`scroll-mt-28 border-l-4 ${sections[0].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[0].icon}
              <div>
                <p className="font-bold text-base">{sections[0].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[0].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Koliko iznosi kaution?</strong><br />Prema §551 BGB, iznajmljivač smije tražiti maksimalno 3 neto hladne najamnine (Kaltmieten).<br />Primjer: Ako je najamnina 700€ → maksimalni depozit = 2.100€. Sve iznad toga je nezakonito.</p>
              <p><strong>Na koji račun?</strong><br />Iznajmljivač je obavezan čuvati depozit na posebnom računu odvojenom od svog novca (Mietkautionskonto), i taj račun mora nositi kamatu. Novac i dalje pripada podstanaru — iznajmljivač ga samo čuva.</p>
              <p><strong>Kada se vraća?</strong><br />Nakon iseljenja, iznajmljivač ima razumno vrijeme za provjeru stanja (obično 3 do 6 mjeseci). Ne smije zadržati depozit bez pisanog obrazloženja i konkretnih zahtjeva.</p>
              <p><strong>Kada smije zadržati?</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Neplaćene najamnine ili Nebenkosten</li>
                <li>Stvarna oštećenja stana koja je uzrokovao podstanar</li>
                <li>Normalno habanje (normaler Verschleiß) NIJE razlog za zadržavanje</li>
              </ul>
              <p><strong>Zaštita u slučaju stečaja:</strong><br />Ako iznajmljivač ode u stečaj (Insolvenz), depozit na odvojenom računu je zaštićen i ne ulazi u stečajnu masu.</p>

              <p><strong>Šta ako iznajmljivač odbija vratiti kaution?</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pošalji pisani zahtjev (Mahnung) s rokom od 14 dana</li>
                <li>Ako ne reagira → tužba pred Amtsgericht (bez advokata do 5.000€)</li>
                <li>Zastarni rok potraživanja depozita: 3 godine (§195 BGB)</li>
                <li>Zadržati zadnju najamninu kao "kompenzaciju"? NE — to je nezakonito i razlog za otkaz!</li>
              </ul>

              <p><strong>Alternativne forme kautiona:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bankbürgschaft: banka garantira umjesto gotovine</li>
                <li>Kautionsversicherung: osiguranje kao zamjena za depozit (korisno ako nemaš 2.100€ odjednom)</li>
              </ul>

              <p className="text-xs text-muted-foreground">Izvor: §551 BGB | Deutscher Mieterbund</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2 — Reparaturen */}
        <AccordionItem value="popravke" id="popravke" className={`scroll-mt-28 border-l-4 ${sections[1].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[1].icon}
              <div>
                <p className="font-bold text-base">{sections[1].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[1].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <Accordion type="single" defaultValue="velike" collapsible className="w-full">
                <AccordionItem value="velike">
                  <AccordionTrigger className="text-sm font-semibold">🔴 Velike popravke — uvijek plaća iznajmljivač</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm">
                    <p>Prema §535 BGB, iznajmljivač je obavezan predati i održavati stan u upotrebljivom stanju. Uvijek je odgovoran za:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Grijanje (Heizung), bojler (Boiler) i električne instalacije</li>
                      <li>Krov, nosive zidove, prozore i fasadu (konstrukcija zgrade)</li>
                      <li>Vodovodne i kanalizacijske cijevi unutar zidova</li>
                      <li>Pljesniavost (Schimmel) — osim ako iznajmljivač dokaže da je uzrokovana nedovoljnim provjetravanjem</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="male">
                  <AccordionTrigger className="text-sm font-semibold">🟡 Kleinreparaturen — male popravke (može platiti podstanar)</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm">
                    <p>Važi SAMO ako je u ugovoru navedena valjana Kleinreparaturklausel i SAMO ako su ispunjeni SVI uvjeti:</p>
                    <ul className="list-none pl-0 space-y-1">
                      <li>✔ Predmet popravke je onaj kojeg podstanar svakodnevno direktno dodiruje (slavine, brave, kvake, utičnice, WC ispiranje, tuševi)</li>
                      <li>✔ Iznos po jednoj popravci: max. 100–150€ — klauza koja traži više je NIŠTAVNA</li>
                      <li>✔ Godišnji limit: max. 200–300€ ili 6–8% godišnje najamnine — klauza bez gornje granice je NIŠTAVNA</li>
                      <li>✗ NE uključuje: prozore, grijaća tijela, bojlere, kadu — to su velike popravke!</li>
                    </ul>
                    <p className="mt-3"><strong>Primjeri šta JEST i šta NIJE Kleinreparatur (iz sudske prakse):</strong></p>
                    <ul className="list-none pl-0 space-y-1">
                      <li>✔ Jest: slavina curi, popravka brave, WC ispiranje ne radi</li>
                      <li>✗ Nije: zamjena cijele slavine (samo popravka, ne zamjena!)</li>
                      <li>✗ Nije: termostat na radijatoru (nije direktan dodir rukama)</li>
                      <li>✗ Nije: prozorska brava (prozori = velika popravka)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steta">
                  <AccordionTrigger className="text-sm font-semibold">🟢 Šteta od podstanara — plaća podstanar</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm">
                    <p>Ako je podstanar sam uzrokovao oštećenje (ne normalno habanje), plaća sam:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Probušeni zid koji nije uredno popravljen pri iseljenju</li>
                      <li>Slomljeno staklo ili prozorska okna</li>
                      <li>Oštećen pod od namještaja bez zaštitnih jastučića</li>
                      <li>Trajno zaprljanje tepiha ili podova</li>
                    </ul>
                    <p>Normalno habanje (normaler Verschleiß) ≠ šteta: blijeđenje boja, sitni ogrebotini, habanje parketa od hodanja — to NE plaća podstanar!</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="modernisierung">
                  <AccordionTrigger className="text-sm font-semibold">🔵 Modernisierung — renovacija (plaća iznajmljivač)</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <p>Iznajmljivač može povećati godišnju najamninu za max. 6% troškova modernizacije (smanjeno s 8% od 2025. godine) i mora pisanim putem obavijestiti podstanara najmanje 3 mjeseca unaprijed (§559 BGB).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="text-xs text-muted-foreground">Izvor: §§535, 538, 559 BGB | BGH Urteil V ZR 102/23</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3 — Mietminderung */}
        <AccordionItem value="kvarovi" id="kvarovi" className={`scroll-mt-28 border-l-4 ${sections[2].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[2].icon}
              <div>
                <p className="font-bold text-base">{sections[2].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[2].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Kako postupiti korak po korak:</strong></p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Dokumentiraj kvar:</strong> Fotografije, video, zabilježi datum pojave.</li>
                <li><strong>Pisana prijava (Mängelanzeige):</strong> Obavijesti iznajmljivača pisanim putem — preporučeno Einschreiben mit Rückschein.</li>
                <li><strong>Postavi rok:</strong> Daj razumni rok za otklanjanje (Frist), npr. 14 dana za kvar grijanja tokom zime.</li>
                <li><strong>Sniženje:</strong> Ako rok istekne bez reakcije, možeš primijeniti Mietminderung bez sudske dozvole.</li>
              </ol>
              <div className="overflow-x-auto mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vrsta kvara</TableHead>
                      <TableHead className="text-right">Orijentacijsko sniženje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Potpuni kvar grijanja zimi", "50–100%"],
                      ["Vlaga i plijesan u prostorijama", "20–30%"],
                      ["Buka od gradnje ispred zgrade", "10–30%"],
                      ["Nefunkcionalni lift (višekatnica)", "5–10%"],
                      ["Nefunkcionalni WC", "20%"],
                      ["Štetočine (Schädlingsbefall)", "50–80%"],
                      ["Zatvoren balkon zbog sanacije", "10–15%"],
                    ].map(([kvar, sni], i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-muted/40" : ""}>
                        <TableCell>{kvar}</TableCell>
                        <TableCell className="text-right font-medium">{sni}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <InfoCard type="warning">
                ⚠️ Sniženje se primjenjuje automatski, ali mora biti razmjerno kvaru. Pogrešno ili pretjerano sniženje može biti razlog za otkaz ugovora. U sumnji, kontaktiraj Mieterbund prije primjene.
              </InfoCard>

              <p><strong>Česte greške podstanara:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Plaćati punu najamninu godinama bez prijave = odricanje od prava</li>
                <li>Snižavati bez prethodne pisane prijave kvara = može biti razlog za otkaz</li>
                <li>Snižavati za kvarove koje si sam uzrokovao</li>
              </ul>

              <p><strong>Šta je Mängelprotokoll?</strong><br />Vodi pisani dnevnik kvara: datum prijave, datum odgovora iznajmljivača, datum popravke. Ovo je ključni dokaz pred sudom.</p>

              <p className="text-xs text-muted-foreground">Izvor: §536 BGB | mieterbund.de</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4 — Mieterhöhung */}
        <AccordionItem value="povecanje" id="povecanje" className={`scroll-mt-28 border-l-4 ${sections[3].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[3].icon}
              <div>
                <p className="font-bold text-base">{sections[3].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[3].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Kada iznajmljivač smije povećati najamninu?</strong></p>
              <p><strong>1. Ortsübliche Vergleichsmiete</strong> (uobičajena tržišna najamnina):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Samo pisanim putem s obrazloženjem (Mietspiegel, 3 usporedne nekretnine ili vještačenje)</li>
                <li>Maksimalan porast: 15% u 3 godine (u područjima s Mietpreisbremse)</li>
                <li>Između dva povećanja mora proći min. 12 mjeseci</li>
                <li>Podstanar ima 2 mjeseca za prihvatanje ili odbijanje — šutnja ≠ pristanak</li>
              </ul>
              <p><strong>2. Modernisierungsumlage</strong> (porast zbog renovacije):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Max. 6% godišnjih troškova modernizacije (od 2025. smanjeno sa 8%)</li>
                <li>Obavezna pisana najava 3 mjeseca unaprijed</li>
              </ul>
              <p><strong>3. Indexmiete / Staffelmiete:</strong><br />Automatski porast vezan za inflacijski indeks (Verbraucherpreisindex) ili unaprijed dogovorene korake — važi SAMO ako je ugovoreno od početka najma.</p>
              <p><strong>Mietpreisbremse — Kočnica najamnine (2025):</strong><br />Vrijedi u gradovima s "napetim tržištem stanovanja" (angespannter Wohnungsmarkt). Kod novog iznajmljivanja: max. 10% iznad ortsübliche Vergleichsmiete. Kazne za kršenje: do 50.000€. Produžena do 31. 12. 2025, produženje do 2029. u zakonodavnoj proceduri.</p>
              <p className="text-xs text-muted-foreground">Izvor: §§558–559, §556d BGB | bmj.de</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5 — Nebenkosten */}
        <AccordionItem value="dodatni-troskovi" id="dodatni-troskovi" className={`scroll-mt-28 border-l-4 ${sections[4].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[4].icon}
              <div>
                <p className="font-bold text-base">{sections[4].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[4].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Šta su Nebenkosten?</strong><br />Troškovi pored hladne najamnine (Kaltmiete): grijanje, voda, odvoz smeća, čišćenje zgrade, osiguranje zgrade, lift, portirske usluge, antena/kabel itd. Sve mora biti navedeno u ugovoru da bi iznajmljivač mogao naplaćivati.</p>
              <p><strong>Što NIJE dozvoljeno u Nebenkostenu:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Troškovi upravljanja nekretninom (Verwaltungskosten)</li>
                <li>Popravke i reparature</li>
                <li>Bankarski troškovi iznajmljivača</li>
                <li>Amortizacija (Abschreibungen)</li>
              </ul>
              <p><strong>Godišnji obračun (Betriebskostenabrechnung):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Iznajmljivač mora dostaviti obračun u roku 12 mjeseci nakon završetka perioda</li>
                <li>Podstanar ima pravo uvida u originalne račune (od 2025. i digitalno)</li>
                <li>Rok za prigovor podstanara: 12 mjeseci od prijema obračuna</li>
                <li>Ako obračun zakasni više od 12 mjeseci → iznajmljivač gubi pravo na doplatu</li>
              </ul>
              <InfoCard type="tip">
                💡 Prosječna greška u Nebenkosten obračunu u Njemačkoj iznosi 317€. Uvijek provjeri obračun i zatraži uvid u originalne račune.
              </InfoCard>

              <p><strong>Najčešće greške u obračunu (prema DMB):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Troškovi koji nisu navedeni u ugovoru</li>
                <li>Pogrešna raspodjela troškova između stanara</li>
                <li>Uključeni Verwaltungskosten — nezakonito</li>
                <li>Dvostruko obračunate stavke</li>
              </ul>

              <p><strong>Kako provjeriti obračun:</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Zatraži uvid u originalne račune (Belegeinsicht)</li>
                <li>Provjeri da li su sve stavke navedene u ugovoru</li>
                <li>Provjeri Verteilerschlüssel (ključ raspodjele troškova)</li>
                <li>Rok: imaš 12 mjeseci za prigovor od dana prijema obračuna</li>
              </ol>

              <p className="text-xs text-muted-foreground">Izvor: §§556–556c BGB | BetrKV (Betriebskostenverordnung)</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 6 — Schönheitsreparaturen */}
        <AccordionItem value="kozmeticke-popravke" id="kozmeticke-popravke" className={`scroll-mt-28 border-l-4 ${sections[5].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[5].icon}
              <div>
                <p className="font-bold text-base">{sections[5].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[5].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p>Po zakonu (§535 BGB) obaveza renovacije je NA IZNAJMLJIVAČU. Ugovorom se može prenijeti na podstanara — ali BGH je proglasio MNOGE takve klauze ništavnim (nichtig).</p>
              <p><strong>Ništavne klauze — podstanar NE mora poštovati:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fiksni vremenski intervali bez uvjeta stanja ("svake 3 godine krečiti..." bez "po potrebi") — BGH VIII ZR 185/14</li>
                <li>Obaveza renovacije pri iseljenju bez obzira na stvarno stanje stana</li>
                <li>Obaveza renovacije ako je stan preuzet nerenovan ili bez bijele boje</li>
                <li>Zahtjev za profesionalnim majstorima umjesto vlastitog rada</li>
                <li>Klauze koje propisuju određene boje zidova (npr. "bijeli zidovi pri iseljenju")</li>
              </ul>
              <p><strong>Ako je klauza valjana:</strong><br />Obaveza postoji samo ako je stan stvarno istrošen od normalne upotrebe. Odnosi se na: unutrašnje zidove i stropove, vrata i prozore iznutra, kuhinjske elemente (iznutra), ugrađene elemente.</p>

              <p><strong>Šta ako je klauza ništavna a iznajmljivač svejedno traži renovaciju?</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pisano odbij zahtjev s pozivom na BGH VIII ZR 185/14</li>
                <li>Ne renoviraj pod pritiskom — iznajmljivač mora dokazati valjanost</li>
                <li>Može zadržati kaution → tuži pred Amtsgericht</li>
              </ul>

              <p><strong>Orijentacijski rokovi renovacije (samo ako je klauza valjana):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Kupatilo/kuhinja: po potrebi (cca 3–5 god)</li>
                <li>Dnevna soba/spavaća: po potrebi (cca 5–8 god)</li>
                <li>Hodnik: po potrebi (cca 5 god)</li>
              </ul>

              <p className="text-xs text-muted-foreground">Izvor: BGH Urteil VIII ZR 185/14, VIII ZR 168/12 | §535 BGB</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 7 — Kündigung */}
        <AccordionItem value="otkaz" id="otkaz" className={`scroll-mt-28 border-l-4 ${sections[6].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[6].icon}
              <div>
                <p className="font-bold text-base">{sections[6].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[6].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Otkazni rokovi za podstanara (§573c BGB):</strong></p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trajanje stanovanja</TableHead>
                      <TableHead className="text-right">Otkazni rok</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Do 5 godina", "3 mjeseca"],
                      ["5 do 8 godina", "6 mjeseci"],
                      ["Više od 8 godina", "9 mjeseci"],
                    ].map(([t, r], i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-muted/40" : ""}>
                        <TableCell>{t}</TableCell>
                        <TableCell className="text-right font-medium">{r}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p>Podstanar uvijek može otkazati uz 3 mjeseca otkaznog roka, bez obzira na dužinu stanovanja.</p>
              <p><strong>Kada iznajmljivač smije otkazati:</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>Zahlungsverzug:</strong> 2+ uzastopne neplaćene rente ili zaostale rente koje zajedno prelaze iznos jedne rate — §543 BGB</li>
                <li><strong>Teška kršenja ugovora:</strong> neovlašteni podzakup, teška oštećenja, remećenje susjedstva</li>
                <li><strong>Eigenbedarf:</strong> mora biti stvaran — od 2025. strožija pravila i obaveza dokazivanja</li>
                <li><strong>Wirtschaftliche Verwertung:</strong> samo ako iznajmljivač bez toga trpi nesrazmjerne gubitke</li>
              </ol>
              <p><strong>Widerspruch — Prigovor na otkaz:</strong><br />Podstanar može podnijeti pisani prigovor (Widerspruch) unutar 2 mjeseca od prijema otkaza. Razlozi: socijalna teškoća, teška bolest, djeca u školskoj dobi, visoka životna dob, nemoguće naći alternativni stan.</p>
              <p><strong>Bezuvjetna zaštita:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Promjena vlasnika ne daje pravo na otkaz: §566 BGB — "Kauf bricht nicht Miete"</li>
                <li>Zaštita tokom trudnoće i 4 mjeseca nakon poroda</li>
                <li>Socijalni slučajevi zaštićeni sudskom odlukom</li>
              </ul>

              <p><strong>Forma otkaza — šta mora sadržavati:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pisana forma OBAVEZNA (email nije dovoljan!)</li>
                <li>Vlastoručni potpis</li>
                <li>Konkretni datum iseljenja i adresa stana</li>
                <li>Slanje: Einschreiben mit Rückschein</li>
              </ul>

              <p><strong>Zeitmietvertrag (ugovor na određeno):</strong><br />Otkaz nije moguć prije isteka roka osim uz razlog iz §543 BGB. Po isteku roka stan se mora isprazniti — nema automatskog produženja.</p>

              <p className="text-xs text-muted-foreground">Izvor: §§542–574c BGB | Deutscher Mieterbund</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 8 — Eigenbedarfskündigung */}
        <AccordionItem value="vlastite-potrebe" id="vlastite-potrebe" className={`scroll-mt-28 border-l-4 ${sections[7].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[7].icon}
              <div>
                <p className="font-bold text-base">{sections[7].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[7].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Ko se računa kao "vlastita potreba"?</strong><br />Iznajmljivač može otkazati ako mu je stan potreban za sebe ili blisku rodbinu: roditelji, djeca, braća/sestre, bake/djedovi. NE važi za: ujakove, kumove, prijatelje, poslovne partnere.</p>
              <p><strong>Pravila od 2025. (strožija):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Iznajmljivač mora detaljno i uvjerljivo obrazložiti zašto mu je baš taj stan potreban</li>
                <li>Sud provjerava da li iznajmljivač ima alternativne slobodne stanove u svom vlasništvu</li>
                <li>Dugotrajna stanara (10+ godina), stariji i teško bolesni stanari imaju pojačanu zaštitu</li>
                <li>Otkaz mora biti poslan Einschreiben i sadržavati sve obrazložene razloge</li>
              </ul>
              <p><strong>Podstanar može:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Podnijeti Widerspruch unutar 2 mjeseca</li>
                <li>Tražiti odgodu iseljenja (Räumungsfrist) od suda</li>
                <li>Tražiti naknadu štete ako se pokaže da Eigenbedarf nije bio pravi razlog — iznajmljivač odgovara i krivičnopravno</li>
              </ul>
              <p className="text-xs text-muted-foreground">Izvor: §573 BGB | BGH 2025</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 9 — Hausordnung */}
        <AccordionItem value="kucni-red" id="kucni-red" className={`scroll-mt-28 border-l-4 ${sections[8].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[8].icon}
              <div>
                <p className="font-bold text-base">{sections[8].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[8].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Šta je Hausordnung?</strong><br />Pravilnik zgrade koji uređuje zajednički boravak stanara. Može biti prilog ugovoru ili zalijepljen na oglasnoj ploči u zgradi.</p>
              <p><strong>Uobičajene odredbe:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Radno vrijeme praonice rublja (Waschküche)</li>
                <li>Ruhezeiten (Tihi sati): obično 22:00–06:00 i 13:00–15:00</li>
                <li>Korištenje podruma, parkirnog mjesta i zajedničkih prostora</li>
                <li>Pravila odlaganja smeća i recikliranja (Mülltrennung)</li>
              </ul>
              <p><strong>Ništavne odredbe Hausordnung — ne moraš poštovati:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Zabrana posjeta ili noćnih gostiju</li>
                <li>Zabrana djece u dvorištu (izvan Ruhezeit)</li>
                <li>Totalna zabrana kućnih ljubimaca bez sudske osnove</li>
                <li>Obaveza čišćenja stepenica svaki dan (nerazumno opterećenje)</li>
                <li>Zabrana vješanja rublja na balkonu (ako nije vizualno relevantno)</li>
              </ul>
              <p><strong>Kućni ljubimci:</strong><br />Iznajmljivač ne smije paušalno zabraniti sve kućne ljubimce. Potreban je konkretan razlog ili sudska odluka. Mali ljubimci (ptice, ribe, hrčci, kornjače) su uvijek dozvoljeni bez saglasnosti iznajmljivača.</p>

              <p><strong>Buka i susjedski sporovi:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Muzika, TV, tuširanje dozvoljeni 06:00–22:00</li>
                <li>Dijete koje plače ili igra se NE može biti razlog za otkaz</li>
                <li>Električni alati: radnim danima 08:00–18:00</li>
                <li>Roštilj na balkonu: dozvoljeno uz prethodnu najavu sustanarima ako nema eksplicitne zabrane u ugovoru</li>
              </ul>

              <p className="text-xs text-muted-foreground">Izvor: BGH Urteil VIII ZR 168/12 | §535 BGB</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 10 — Untervermietung */}
        <AccordionItem value="podzakup" id="podzakup" className={`scroll-mt-28 border-l-4 ${sections[9].borderColor} rounded-xl border bg-card`}>
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {sections[9].icon}
              <div>
                <p className="font-bold text-base">{sections[9].titleDe}</p>
                <p className="text-sm text-muted-foreground">{sections[9].titleBs}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
              <p><strong>Smiješ li iznajmiti dio stana drugoj osobi?</strong><br />Potrebna je pisana saglasnost iznajmljivača (§553 BGB). ALI: ako imaš opravdan lični ili ekonomski razlog, iznajmljivač MORA dati saglasnost — osim ako ima konkretni opravdani razlog za odbijanje.</p>
              <p><strong>Iznajmljivač MORA dati saglasnost ako:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Imaš opravdani razlog (odlazak na rad u drugi grad, partner se useli, ekonomska nužnost)</li>
                <li>Podzakupnik je pouzdana i normalna osoba</li>
                <li>Stan ne postaje prenatrpan</li>
              </ul>
              <p><strong>Iznajmljivač SMIJE odbiti ako:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Podzakupnik je osobno neprihvatljiv (mora imati konkretan razlog!)</li>
                <li>Stan bi bio preopterećen brojem osoba</li>
                <li>Podzakup bi trajno i bitno oštetio supstancu stana</li>
              </ul>
              <InfoCard type="danger">
                ⚠️ Neovlašteni podzakup bez saglasnosti iznajmljivača je razlog za otkaz — u težim slučajevima i za trenutni otkaz (fristlose Kündigung). Uvijek traži pisanu saglasnost!
              </InfoCard>
              <p className="text-xs text-muted-foreground">Izvor: §§553–554 BGB</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer — Korisni linkovi */}
      <Card className="bg-blue-50 border-blue-200 mt-6">
        <CardContent className="p-5 sm:p-6">
          <h3 className="font-bold mb-4">Službeni izvori i pomoć</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Deutscher Mieterbund", url: "https://www.mieterbund.de", desc: "Najveća organizacija za zaštitu podstanara u Njemačkoj" },
              { label: "Bundesministerium der Justiz", url: "https://www.bmj.de", desc: "Službene informacije o Mietrecht na saveznom nivou" },
              { label: "BGB §535", url: "https://www.gesetze-im-internet.de/bgb/__535.html", desc: "Originalni tekst zakona o najmu" },
              { label: "Verbraucherzentrale", url: "https://www.verbraucherzentrale.de", desc: "Besplatni savjeti o pravima potrošača i podstanara" },
            ].map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-lg border bg-background p-3 hover:bg-accent transition-colors">
                <ExternalLink className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" />
                <div>
                  <span className="font-medium text-sm">{l.label}</span>
                  <p className="text-xs text-muted-foreground">{l.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 border-yellow-300 mt-3">
        <CardContent className="p-5 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm mb-1">Napomena</p>
            <p className="text-sm text-yellow-900">
              Informacije na ovoj stranici su opće prirode i ne zamjenjuju pravni savjet. Za konkretne situacije obratite se Mieterbundu ili pravnom savjetniku specijaliziranom za Mietrecht.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
