import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQaItem } from "@/hooks/useQaItems";

import { getCategoryBySlug } from "@/lib/categories";
import { navigateBackOrHome } from "@/lib/navigation";

function FormattedContent({ text }: { text: string }) {
  const lines = text.split(/\\n|\n/).filter((l) => l.trim() !== "");
  const elements: React.ReactNode[] = [];
  let listItems: { num: string; text: string }[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ol key={`ol-${elements.length}`} className="mb-3 list-decimal space-y-1 pl-5">
        {listItems.map((li, i) => (
          <li key={i}>{li.text}</li>
        ))}
      </ol>
    );
    listItems = [];
  };

  for (const line of lines) {
    const numMatch = line.match(/^(\d+)\.\s+(.*)/);
    const bulletMatch = line.match(/^[-•]\s+(.*)/);
    if (numMatch) {
      listItems.push({ num: numMatch[1], text: numMatch[2] });
    } else if (bulletMatch) {
      flushList();
      elements.push(
        <ul key={`ul-${elements.length}`} className="mb-3 list-disc space-y-1 pl-5">
          <li>{bulletMatch[1]}</li>
        </ul>
      );
    } else {
      flushList();
      elements.push(
        <p key={`p-${elements.length}`} className="mb-2 last:mb-0">
          {line}
        </p>
      );
    }
  }
  flushList();
  return <>{elements}</>;
}

export default function QADetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item, isLoading, error } = useQaItem(id || "");

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-10">
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="mb-6 h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container max-w-3xl py-16 text-center">
        <p className="text-muted-foreground">Pitanje nije pronađeno.</p>
        <button className="back-button mt-4 text-sm text-muted-foreground" onClick={() => navigateBackOrHome(navigate)}>
          <ArrowLeft className="h-4 w-4" />
          Nazad
        </button>
      </div>
    );
  }

  const cat = getCategoryBySlug(item.category);

  return (
    <div className="container max-w-3xl py-10">
      {/* Back */}
      <button
        onClick={() => navigateBackOrHome(navigate)}
        className="back-button mb-6 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Nazad
      </button>

      {/* Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {cat && (
          <Badge variant="secondary" className="gap-1">
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </Badge>
        )}
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {new Date(item.last_updated).toLocaleDateString("de-DE")}
        </span>
      </div>

      {/* Question */}
      <h1 className="mb-6 text-2xl font-bold leading-tight md:text-3xl">
        {item.question}
      </h1>

      {/* Short answer */}
      <div className="mb-8 rounded-xl border bg-secondary/50 p-5">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Kratak odgovor
        </h2>
        <p className="text-foreground leading-relaxed">{item.short_answer}</p>
      </div>

      {/* Step by step — fully visible */}
      {item.step_by_step && (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">Detaljno objašnjenje</h2>
          <div className="prose prose-sm max-w-none rounded-xl border bg-card p-5">
            <FormattedContent text={item.step_by_step} />
          </div>
        </div>
      )}

      {/* Sources */}
      {item.sources && item.sources.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">Zvanični izvori</h2>
          <ul className="space-y-2">
            {item.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <LegalDisclaimer />
    </div>
  );
}
