/**
 * ZBFS Bayern — Außenstellen za slanje Elterngeld antraga.
 *
 * VAŽNO: Nadležnost zavisi od:
 *   1) Wohnort roditelja (Regierungsbezirk), I
 *   2) Datuma rođenja djeteta (ZBFS povremeno mijenja raspodjelu
 *      slučajeva između Außenstellen za određene mjesece rođenja).
 *
 * Korisnik MORA sam provjeriti tačnu nadležnost na:
 *   https://www.zbfs.bayern.de/familie/elterngeld/zustaendigkeit/
 *
 * Adrese provjerene 05/2025. Ako ZBFS promijeni adresu, ažurirati ovdje.
 */

export interface ZbfsAussenstelle {
  id: string;
  region: string;          // Regierungsbezirk
  name: string;            // Puni naziv
  strasse: string;
  plzOrt: string;
  telefon?: string;
  hint?: string;           // Specifična pravila (npr. "djeca rođena nakon …")
}

export const ZBFS_AUSSENSTELLEN: ZbfsAussenstelle[] = [
  {
    id: "bayreuth",
    region: "Oberfranken",
    name: "ZBFS — Region Oberfranken",
    strasse: "Hegelstraße 2",
    plzOrt: "95447 Bayreuth",
    telefon: "0921 605-1",
  },
  {
    id: "muenchen",
    region: "Oberbayern",
    name: "ZBFS — Region Oberbayern",
    strasse: "Richelstraße 17",
    plzOrt: "80634 München",
    telefon: "089 1261-04",
  },
  {
    id: "landshut",
    region: "Niederbayern",
    name: "ZBFS — Region Niederbayern",
    strasse: "Friedhofstraße 7",
    plzOrt: "84028 Landshut",
    telefon: "0871 829-0",
  },
  {
    id: "regensburg",
    region: "Oberpfalz",
    name: "ZBFS — Region Oberpfalz",
    strasse: "Landshuter Straße 55",
    plzOrt: "93053 Regensburg",
    telefon: "0941 7809-00",
  },
  {
    id: "nuernberg",
    region: "Mittelfranken",
    name: "ZBFS — Region Mittelfranken",
    strasse: "Bärenschanzstraße 8a",
    plzOrt: "90429 Nürnberg",
    telefon: "0911 928-0",
  },
  {
    id: "wuerzburg",
    region: "Unterfranken",
    name: "ZBFS — Region Unterfranken",
    strasse: "Georg-Eydel-Straße 13",
    plzOrt: "97082 Würzburg",
    telefon: "0931 4107-01",
  },
  {
    id: "augsburg",
    region: "Schwaben",
    name: "ZBFS — Region Schwaben",
    strasse: "Morellstraße 30",
    plzOrt: "86159 Augsburg",
    telefon: "0821 5709-01",
  },
];

export const ZBFS_ZUSTAENDIGKEIT_URL =
  "https://www.zbfs.bayern.de/familie/elterngeld/zustaendigkeit/";

export function getAussenstelle(id: string): ZbfsAussenstelle | undefined {
  return ZBFS_AUSSENSTELLEN.find(a => a.id === id);
}
