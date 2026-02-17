export default function Disclaimer() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-6 text-3xl font-bold">Disclaimer</h1>
      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Informativni karakter</h2>
          <p>
            Sadržaj na ovoj platformi služi isključivo u informativne svrhe i ne predstavlja pravni, porezni ili medicinski savjet. Sve informacije su prikupljene pažljivo, ali ne preuzimamo odgovornost za njihovu tačnost, potpunost ili aktuelnost.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Bez odgovornosti</h2>
          <p>
            Korištenje informacija na ovoj stranici je na vlastitu odgovornost. Za specifične pravne ili službene postupke, savjetujemo kontaktiranje odgovarajućih institucija ili stručnjaka.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Vanjski linkovi</h2>
          <p>
            Naša stranica može sadržavati linkove na vanjske web stranice. Ne preuzimamo odgovornost za sadržaj ili praksu privatnosti tih stranica.
          </p>
        </section>
      </div>
    </div>
  );
}
