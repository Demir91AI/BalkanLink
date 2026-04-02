import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePremiumBanner() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-2xl bg-[#F59E0B] p-6 text-center"
        >
          <p className="text-[#0f1f3d] font-bold text-lg">
            Trebaš sigurnost bez greške?
            <br />
            Pređi na Premium i prati tačne korake.
          </p>
          <Link
            to="/premium"
            className="mt-4 inline-block rounded-full bg-[#0f1f3d] px-6 py-2 font-bold text-white transition-all hover:opacity-90"
          >
            Postani Premium →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
