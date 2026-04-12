import { ExternalLink, AlertTriangle, MapPin, Clock, FileText, CheckCircle2, Users } from "lucide-react";
import { label } from "@/lib/de-labels";

export default function FuehrerscheinGuideContent() {
  const statusItems = [
    { key: "fs_1_eu", emoji: "🇪🇺" },
    { key: "fs_1_balkan", emoji: "🇧🇦" },
    { key: "fs_1_kosovo", emoji: "🇽🇰" },
  ];

  const steps = ["fs_step1", "fs_step4", "fs_step5", "fs_step6"];
  const docs = ["fs_doc1", "fs_doc2", "fs_doc3", "fs_doc4", "fs_doc5"];
  const costs = ["fs_cost1", "fs_cost2", "fs_cost3", "fs_cost4"];
  const errors = ["fs_err1", "fs_err2", "fs_err3", "fs_err4", "fs_err5"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">🚗 {label("fuehrerschein_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{label("fuehrerschein_subtitle")}</p>
      </div>

      {/* Section 1 — Ko može prepisati */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Users className="h-4 w-4 text-[hsl(var(--gold))]" /> {label("fs_s1")}
        </h2>
        <ul className="space-y-2.5">
          {statusItems.map(({ key, emoji }) => (
            <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="shrink-0 text-base">{emoji}</span>
              <span className="text-muted-foreground">{label(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2 — Koraci */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--gold))]" /> {label("fs_s2")}
        </h2>
        <ol className="space-y-2.5">
          {steps.map((key, i) => {
            const text = label(key);
            const dashIdx = text.indexOf(" — ");
            const bold = dashIdx > 0 ? text.substring(0, dashIdx) : text;
            const rest = dashIdx > 0 ? text.substring(dashIdx) : "";
            return (
              <li key={key} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 text-[10px] font-bold text-[hsl(var(--gold))]">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{bold}</strong>{rest}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="text-xs text-muted-foreground italic mt-2">{label("fs_step_note")}</p>
      </section>

      {/* Section 3 — Potrebna dokumenta */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileText className="h-4 w-4 text-[hsl(var(--gold))]" /> {label("fs_s3")}
        </h2>
        <ul className="space-y-1.5">
          {docs.map((key) => {
            const text = label(key);
            const parenIdx = text.indexOf("(");
            const bold = parenIdx > 0 ? text.substring(0, parenIdx).trim() : text;
            const rest = parenIdx > 0 ? " " + text.substring(parenIdx) : "";
            return (
              <li key={key} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--gold))]" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{bold}</strong>{rest}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-muted-foreground italic mt-2">{label("fs_doc_note")}</p>
      </section>

      {/* Section 4 — Gdje se podnosi zahtjev */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" /> {label("fs_s4")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{label("fs_where")}</p>
      </section>

      {/* Section 5 — Troškovi */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-[hsl(var(--gold))]" /> {label("fs_s5")}
        </h2>
        <ul className="space-y-1.5">
          {costs.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]" />
              {label(key)}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 6 — Česte greške */}
      <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-destructive">
          <AlertTriangle className="h-4 w-4" /> {label("fs_s6")}
        </h2>
        <ul className="space-y-1.5">
          {errors.map((key) => {
            const text = label(key);
            const dashIdx = text.indexOf(" — ");
            const bold = dashIdx > 0 ? text.substring(0, dashIdx) : text;
            const rest = dashIdx > 0 ? text.substring(dashIdx) : "";
            return (
              <li key={key} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-destructive" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{bold}</strong>{rest}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Section 7 — Korisni linkovi */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <ExternalLink className="h-4 w-4 text-[hsl(var(--gold))]" /> {label("fs_s7")}
        </h2>
        <div className="flex flex-wrap gap-2">
          <a
            href={label("fs_link1_url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {label("fs_link1_label")}
          </a>
          <a
            href={label("fs_link2_url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {label("fs_link2_label")}
          </a>
        </div>
      </section>
    </div>
  );
}
