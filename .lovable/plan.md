# Lokalizirane greške registracije i prijave

- Zamijeniti sirove poruke servisa razumljivim porukama na odabranom BS/HR/SR/DE jeziku.
- Za slabu ili često korištenu lozinku prikazati tačno odobreni bosanski tekst i odgovarajuće prevode.
- Obraditi poznate greške (pogrešni podaci, nepotvrđen email, zauzet email, ograničenje zahtjeva, mreža) i koristiti sigurnu opću poruku za nepoznate greške.
- Zadržati postojeći izgled, provjere lozinke i tok registracije/prijave; bez promjena Cloud postavki ili objavljivanja.
- Provjeriti mapiranje testovima i prikaz slabe lozinke izolovanim testom registracije.

## Tehnički pristup
Mali zajednički mapper vraća samo prevodne ključeve; postojeće stranice koriste react-i18next. Bez novih paketa i bez poziva stvarnoj registraciji tokom testiranja.