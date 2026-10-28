# Asistent → postojeći SmartGuide: prvi ograničeni korak

- Uskladiti asistentove interne linkove i sluge s postojećim katalogom; ne mijenjati rute, vodiče, pristup ili kvote.
- Za Kindergeld, Anmeldung i Wohngeld koristiti postojeće sadržaje vodiča i službene izvore. Prikazati zabilježeni datum provjere, bez tvrdnje da je izvor danas provjeren.
- Za nepoznatu temu ne izmišljati vodič niti automatski slati na Kindergeld; jasno ograničiti raspoloživo znanje.
- Sačuvati sigurnosne provjere, kontekst razgovora, postojeće jezike i serversko mjerenje korištenja.
- Izvršiti ciljane testove i regresije, provjeriti linkove i dostupni automatski signal provjere koda; dokumentovati stvarno testirano i ograničenja.

## Tehnički opseg
Minimalne izmjene postojećeg ChatAssistant i chat-assistant poziva uz mali zajednički adapter za katalog i odabrane vodiče. Bez nove arhitekture, paketa, baze, konfiguracije, objave ili deploya. Izmijenjeni serverski odgovor neće biti aktivan ni u hosted Previewu ni u produkciji dok funkcija nije posebno odobrena i deployana.