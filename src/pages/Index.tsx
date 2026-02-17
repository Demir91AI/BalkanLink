import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Home, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";

const heroCards = [
  {
    title: "Došao sam u Njemačku",
    description: "Upravo si stigao? Ovdje su svi prvi koraci.",
    icon: Plane,
    to: "/qa?filter=dolazak",
    color: "bg-primary text-primary-foreground",
  },
  {
    title: "Već sam ovdje",
    description: "Živiš u Njemačkoj i trebaš praktične savjete.",
    icon: Home,
    to: "/qa",
    color: "bg-balkan-green text-primary-foreground",
  },
  {
    title: "Imam problem",
    description: "Nešto nije u redu? Nađi rješenje brzo.",
    icon: AlertTriangle,
    to: "/qa?filter=problemi",
    color: "bg-balkan-red text-primary-foreground",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background pb-16 pt-20 md:pt-28">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-5xl"
          >
            Život u Njemačkoj,{" "}
            <span className="text-primary">bez komplikacija.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-4 max-w-lg text-muted-foreground md:text-lg"
          >
            Sve što trebaš znati — od prvog dana do svakodnevnice. Provjerene informacije, na našem jeziku.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container mt-12 grid gap-4 sm:grid-cols-3"
        >
          {heroCards.map((card) => (
            <motion.div key={card.title} variants={item}>
              <Link
                to={card.to}
                className={`group flex flex-col items-center gap-3 rounded-2xl p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${card.color}`}
              >
                <card.icon className="h-10 w-10" />
                <h2 className="text-lg font-bold">{card.title}</h2>
                <p className="text-sm opacity-90">{card.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Kategorije</h2>
          <p className="mb-10 text-center text-muted-foreground">
            Izaberi temu i pronađi odgovor za par sekundi.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9"
          >
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.label} variants={item}>
                <Link
                  to={`/qa?filter=${cat.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  <cat.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-xs font-medium">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick links */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Imaš biznis?</h2>
          <p className="max-w-md text-muted-foreground">
            Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/directory">
                <Search className="mr-2 h-4 w-4" />
                Pretraži imenik
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/directory/submit">Dodaj svoj biznis</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
