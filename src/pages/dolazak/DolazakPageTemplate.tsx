import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText, Info } from "lucide-react";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface OfficialLink {
  type: "portal" | "pdf" | "info";
  label: string;
  url: string;
}

interface DolazakPageProps {
  title: string;
  subtitle: string;
  sections: {
    icon: ReactNode;
    title: string;
    content: ReactNode;
  }[];
  links: OfficialLink[];
}

const fade = (i: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } });

export default function DolazakPageTemplate({ title, subtitle, sections, links }: DolazakPageProps) {
  return (
    <>
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <Link to="/dolazak" className="mb-4 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> Nazad
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{subtitle}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-6">
          {sections.map((s, i) => (
            <motion.div key={i} {...fade(i)} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                {s.icon}
                {s.title}
              </div>
              <div className="text-sm leading-relaxed text-muted-foreground">{s.content}</div>
            </motion.div>
          ))}

          {links.length > 0 && (
            <motion.div {...fade(sections.length)} className="sticky bottom-4 rounded-xl border bg-card p-5 shadow-lg">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Direktni linkovi</h3>
              <div className="flex flex-wrap gap-2">
                {links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                      l.type === "pdf"
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : l.type === "portal"
                        ? "bg-gold/10 text-gold hover:bg-gold/20"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {l.type === "pdf" ? <FileText className="h-4 w-4" /> : l.type === "portal" ? <ExternalLink className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
