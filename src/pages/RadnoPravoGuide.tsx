import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, BookOpen, ExternalLink, Calendar, Info, Scale } from "lucide-react";
import { getGuideBySlug } from "@/lib/radno-pravo-data";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";

const GOLD = "hsl(var(--gold))";

export default function RadnoPravoGuide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  if (!guide) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />
        <p className="text-muted-foreground text-center mt-8">Vodič nije pronađen.</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${guide.title} (${guide.germanTerm}) | Radno pravo | BalkanLink`}
        description={guide.explanation.slice(0, 155)}
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-4 w-4" style={{ color: GOLD }} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Radno pravo</span>
          </div>
          <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">{guide.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{guide.germanTerm}</p>
        </div>

        {/* Explanation */}
        <Section icon={<BookOpen className="h-4 w-4" style={{ color: GOLD }} />} title="Šta je to / Objašnjenje">
          <p className="text-sm text-muted-foreground leading-relaxed">{guide.explanation}</p>
        </Section>

        {/* Rules */}
        <Section icon={<CheckCircle className="h-4 w-4" style={{ color: GOLD }} />} title="Najvažnija pravila">
          <ul className="space-y-2">
            {guide.rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: GOLD }} />
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Examples */}
        <Section icon={<Lightbulb className="h-4 w-4 text-amber-500" />} title="Praktični primjeri" variant="amber">
          <ul className="space-y-2">
            {guide.examples.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="font-bold text-amber-500 shrink-0 mt-0.5">→</span>
                <span className="leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Warnings */}
        <Section icon={<AlertTriangle className="h-4 w-4 text-red-500" />} title="Na šta posebno paziti" variant="red">
          <ul className="space-y-2">
            {guide.warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-red-400" />
                <span className="leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Myths */}
        <Section icon={<Info className="h-4 w-4 text-purple-500" />} title="Česte greške / Mitovi" variant="purple">
          <ul className="space-y-3">
            {guide.myths.map((m, i) => (
              <li key={i} className="text-sm text-purple-800 leading-relaxed border-l-2 border-purple-300 pl-3">
                {m}
              </li>
            ))}
          </ul>
        </Section>

        {/* Sources */}
        <div className="mt-6 rounded-xl border border-border bg-card p-4">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
            <ExternalLink className="h-3.5 w-3.5" style={{ color: GOLD }} /> Izvori
          </h3>
          <ul className="space-y-1">
            {guide.sources.map((s, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {s}</li>
            ))}
          </ul>
        </div>

        {/* Disclaimer + Date */}
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Ovaj sadržaj je informativnog karaktera i <strong>ne predstavlja pravni savjet</strong>. Za konkretne slučajeve konsultiraj advokata za radno pravo.
            </p>
            <p className="mt-2 flex items-center gap-1 text-[10px] text-blue-500">
              <Calendar className="h-3 w-3" /> Zadnje ažuriranje: {guide.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  icon,
  title,
  children,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: "amber" | "red" | "purple";
}) {
  const borderMap = {
    amber: "border-amber-200",
    red: "border-red-200",
    purple: "border-purple-200",
  };
  const bgMap = {
    amber: "bg-amber-50",
    red: "bg-red-50",
    purple: "bg-purple-50",
  };

  return (
    <div
      className={`mt-5 rounded-xl border p-4 ${
        variant ? `${borderMap[variant]} ${bgMap[variant]}` : "border-border bg-card"
      }`}
    >
      <h3 className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-3">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}
