## Cilj

Trenutni dizajn `Login.tsx` već odgovara screenshotu (cream pozadina, narandžasti naglasci, ista kartica). Jedina izmjena: **BL BalkanLink logo iznad kartice obmotati u vidljiv okvir** (kao mali "badge" oko cijelog logotipa).

## Šta mijenjam

**Fajl: `src/pages/Login.tsx`**

Trenutno je logo `<Link>` sa gradient blur efektom u pozadini, ali bez vidljivog okvira. Zamijeniti ga sa kontejnerom koji ima:

- `rounded-2xl` border okvir (1px, `border-[hsl(var(--brand-orange)/0.25)]`)
- Suptilan cream/white background (`bg-card/60` sa `backdrop-blur-sm`)
- Mali padding (`px-5 py-3`)
- Soft shadow (`shadow-sm`)
- Centriran (zadržati `flex justify-center mb-8`)
- Logo unutra ostaje isti: "BL" gradient + "BalkanLink" tekst

Rezultat: logo izgleda kao zaseban "chip"/okvir iznad login kartice, vizuelno odvojen od pozadine — ostatak stranice ostaje **netaknut** (forma, dugmad, checkbox, footer linkovi, hero gradijenti).

## Šta NE diram

- Ostatak `Login.tsx` (forma, polja, checkbox, gradient pozadina)
- Bilo koji drugi fajl (Footer, AdminDashboard, Header, itd.)
- i18n stringove (logo je čisti brand tekst, ne treba prevod)
