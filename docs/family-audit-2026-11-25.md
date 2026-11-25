# FormularPilot – Audit "Porodica i djeca" (2026-11-25, read-only)

Strojni registar: `docs/family-audit-2026-11-25.json` (228 zapisa: SHA-256, stranice, broj/tip polja, enkripcija, XFA, URL, status).
PDF-ovi su preuzeti samo privremeno u `/tmp`; ništa nije hostano, bundlano niti proxyjano. Nijedna zaštita nije zaobiđena. Prava: svugdje **unknown** osim ako izdavač izričito ne kaže drugačije (BA zadržava pravo umnožavanja).

## Batch A – Kindergeld / KiZ (savezno, Familienkasse) — ZAVRŠEN
Izvor: https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder (+6 podstranica formulare-*).
- 210 jedinstvenih PDF-ova preuzeto i skenirano; 0 duplikata hash-a.
- **210/210 enkriptovano, 206/210 XFA.** → Sve BLOCKED za službeno popunjavanje (KG1, Anlage Kind, KG51 Ausland uklj. `kg51-ju` (bivša Jugoslavija: BiH/SRB/MNE/KOS), `kg51-hr`, KG51R, Anlage EU, KG1a, KG71/71R/71EU, KiZ1 ANA/ANK/K, KiZ5/5a/5c/6/7).
- Ključni: KG1 `53651bbe…` 5 str./132 polja; Anlage Kind `baf78a8d…` 227; KG51-ju `7a9e29b7…` 188; KG51-hr `6611c436…` 323; KiZ1 `79b45232…` 111.
- Siguran put: online Familienkasse + SmartGuide (postojeći), ili jasno nezvanični list odgovora.

## Batch B – Elterngeld 16 Länder — DJELIMIČNO (13/16 byte-provjereno)
| Land | Status | SHA-256 (prefiks) | Str./Polja | Napomena |
|---|---|---|---|---|
| BB, HH, RP, SH, TH | verified bytes | e3735fd8 (IDENTIČAN) | 23/531 | jedan zajednički "Einheitlicher Elterngeldantrag" |
| NI | verified | 0eff2fa2 | 23/531 | ista imena polja kao e3735f, drugi bajtovi |
| BE (Pankow) | verified | 644ae296 | 23/533 | +2 polja (`2c 2E Ort_1`, `2c AS Ort_1`); nije enkriptovan |
| ST | verified | 814949cb | 23/530 | nedostaje `9 Datenabruf Mutterschaftsgeld` |
| BY 05/2025 | verified | 3ca0389c | 32/1024 | rođenja od 01.05.2025 |
| BY 04/2025 | verified | 38d97717 | 32/737 | rođenja u 04/2025 (varijanta po datumu rođenja) |
| NW | verified | 091f1ebd | 12/834 | vlastiti obrazac |
| MV | BLOCKED | 1604d240 | 10/640 | enkriptovan |
| BW (L-Bank) | BLOCKED | e19f9f22 | 27/0 | nema nativnih polja |
| HE (RP Gießen) | BLOCKED | 52941f7d | 24/0 | nema nativnih polja |
| HB, SL | UNVERIFIED | – | – | HTTP 403 za automatsko preuzimanje |
| SN | UNVERIFIED | – | – | nadležne županijske Elterngeldstellen, nema državnog PDF-a |
Starije verzije (prije 04/2025) i Anlagen pojedinih zemalja nisu obuhvaćene. Online: ElterngeldDigital (ne svi Länder).

## Batch C – djelimično
- **Mutterschaftsgeld BAS 2026** (savezno, za osobe bez GKV-a): verified `6f7d1e47fcd04bdfdfa95663d869100fea739c38a95b7095463990c033d9ecf3`, 9 str., 129 polja (79 Tx/50 Btn), bez enkripcije/XFA. GKV-članice: vlastita Krankenkasse (insurer-dependent, nije uniformno).
- **Kinderzuschlag**: vidi Batch A (blocked).
- **Unterhaltsvorschuss**: NIJE ZAPOČETO (formulari po zemlji/Jugendamtu).

## Batch D – lokalno (Kita, BuT, regionalno) — NIJE ZAPOČETO
Bez tvrdnje o iscrpnosti. Siguran put: zvanični lookup nadležnosti (verwaltung.bund.de / Landesportal / Jugendamt-Finder grada) + SmartGuide + službeni link; nikad punjenje bez potvrđenog hash-a. Krippengeld Bayern (ZBFS) i Wirtschaftliche Jugendhilfe također otvoreni.

## Preporučeni rollout (shared engine `strict-acroform.ts`, fail-closed)
1. **Elterngeld "Einheitlich" e3735fd8** (pokriva 5 zemalja jednim mapiranjem) + NI/BE/ST kao zasebni hash-ovi s istim imenima polja; korisnik **eksplicitno bira Land**, a fill radi samo ako hash odgovara izdanju tog Landa.
2. **Mutterschaftsgeld BAS 2026** (mali, savezni, verified).
3. BY 05/2025, BY 04/2025 i NW zasebno (veliki, posebna mapiranja; datum rođenja određuje izdanje).
4. Sve BA Kindergeld/KiZ, MV, BW, HE: samo SmartGuide + službeni link / nezvanični list.
Preduslov za produkciju svugdje: potvrda prava izdavača.

## Otvoreno
HB/SL (403), SN (županije), UVG, Kita/BuT, starija izdanja Elterngelda, prava svih izdavača.
