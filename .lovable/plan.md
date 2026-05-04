Razumijem sad tačno šta tražiš: ne običan HTML formular i ne samo “sličnu” strukturu, nego da se u Musterformularu otvara preview koji vizuelno prati PDF koji si uploadovao — iste pozicije teksta/polja kao generisani dokument, ali interaktivno za popunjavanje, bez državnih obilježja. Originalni Kindergeld PDF link ostaje na vrhu gdje je i bio.

Plan implementacije:

1. Koristiti uploadovani `musterformular_antrag-2.pdf` kao vizuelni model
   - Preuzet ću njegov layout kao referencu za Kindergeld Musterformular.
   - Napravit ću web preview u A4 omjeru sa 2 stranice, da izgleda kao dokument/PDF, ne kao standardni responsive form.
   - Zadržati neutralni naziv i uklonjena državna obilježja iz prikaza.

2. Zamijeniti trenutni `/musterformular/kindergeld` preview
   - Umjesto sadašnjeg običnog/kompaktnog HTML rasporeda, `AntragGenericMuster.tsx` će prikazivati PDF-like dokument.
   - Polja će biti apsolutno ili precizno grid-pozicionirana po stranicama, da tekst i inputi stoje na istim mjestima kao u uploadovanom PDF-u.
   - Na desktopu će se vidjeti kao A4 dokument; na mobitelu će se skalirati/scrollati bez lomljenja pozicija.

3. Zadržati staru logiku popunjavanja
   - Zadržati isti `LS_KEY = "kg1-muster-data"`.
   - Zadržati state, `localStorage` autosave preko `MusterFormBase`, reset i print logiku.
   - Zadržati postojeća polja: podnosilac, druga osoba, IBAN/BIC, primatelj rješenja, djeca, dodatna djeca, mjesto/datum/potpis.
   - Inputi, checkbox/radio i tabele ostaju funkcionalni, ali se prikazuju na PDF-like pozicijama.

4. Vratiti i zadržati originalni Kindergeld link na vrhu
   - U `MusterFormBase` props ostaje `pdfUrl` prema originalnom Kindergeld PDF-u.
   - `pdfLabel` ostaje vidljiv na vrhu: “Preuzmi originalni Kindergeld PDF →” ili prethodni tekst gdje je bio.

5. Ne dirati ostale Musterformulare
   - Promjena ide ciljano samo na Kindergeld/generic Antrag preview.
   - Neću mijenjati globalni `MusterFormBase` osim ako bude baš potrebno za skaliranje A4 preview-a; ako bude potrebno, dodat ću opcionalni prop tako da ostali formulari ostanu isti.

6. Provjera poslije implementacije
   - Provjerit ću da ruta `/musterformular/kindergeld` renderuje novi PDF-like preview.
   - Provjerit ću da `/musterformular/antrag-generic` i dalje radi ako ostaje alias.
   - Provjerit ću da link za originalni PDF stoji na vrhu.
   - Provjerit ću da unos u polja i spremanje u `localStorage` rade.

Tehnički pristup:

- U `src/pages/muster/AntragGenericMuster.tsx` ću napraviti novu internu strukturu:

```text
MusterFormBase
  A4Document
    Page 1
      header / info line / section 1 / section 2 / section 3
    Page 2
      section 4 / section 5 / section 6 / signature
```

- Za pozicije ću koristiti stilove tipa:

```text
position: relative;
width: 210mm;
min-height: 297mm;

field blocks:
position: absolute;
left/top/width/height prema PDF-like layoutu
```

ili fiksni A4 grid gdje je stabilnije za responsive.

- Postojeće input komponente u tom fajlu ću prilagoditi da izgledaju kao PDF polja: tanke linije, male etikete, bez velikih razmaka, bez “kartica”.
- Neću koristiti državni logo/obilježja. Dokument ostaje neutralan BalkanLink Musterformular.
- Ako uploaded PDF ne može direktno biti parsiran kao struktura, ručno ću replicirati layout prema njegovoj A4 strukturi i postojećem generisanom sadržaju.