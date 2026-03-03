import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileText, ClipboardList, UserCheck, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getFormBySlug, CATEGORY_META } from "@/lib/forms-registry";

const STEPS = [
  { key: "osnovno", label: "Osnovni podaci", icon: UserCheck },
  { key: "specificno", label: "Specifični podaci", icon: ClipboardList },
  { key: "pregled", label: "Pregled", icon: FileText },
  { key: "preuzmi", label: "Preuzmi / Štampaj", icon: Printer },
];

export default function SmartGuide() {
  const { slug } = useParams<{ slug: string }>();
  const form = getFormBySlug(slug ?? "");
  const [step, setStep] = useState(0);
  const [basicData, setBasicData] = useState({ name: "", address: "", email: "", phone: "" });
  const [specificData, setSpecificData] = useState<Record<string, string>>({});

  if (!form) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">Formular nije pronađen.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/formulari">Nazad na formulare</Link>
        </Button>
      </div>
    );
  }

  const catMeta = CATEGORY_META[form.category];
  const progress = ((step + 1) / STEPS.length) * 100;

  const handlePrint = () => window.print();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Back link */}
      <Link to="/formulari" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Nazad na formulare
      </Link>

      {/* Header */}
      <div className="mb-6 rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-primary/10 text-primary text-[10px] border-primary/20">
            <catMeta.icon className="mr-1 h-3 w-3" /> {catMeta.label}
          </Badge>
        </div>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{form.title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{form.institution}</p>
        <p className="mt-2 text-sm text-muted-foreground">{form.description}</p>
      </div>

      {/* Info cards: eligibility + documents */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold">
            <CheckCircle2 className="h-4 w-4 text-green-600" /> Ko može dobiti?
          </h3>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
            {form.eligibility.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold">
            <ClipboardList className="h-4 w-4 text-primary" /> Šta ti treba?
          </h3>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
            {form.documents.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Korak {step + 1} od {STEPS.length}: {STEPS[step].label}
        </span>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="mb-4 h-2" />

      {/* Step indicators */}
      <div className="mb-6 flex gap-1">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              onClick={() => setStep(i)}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-medium transition-colors ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step content */}
      <div className="rounded-2xl border bg-card p-5 min-h-[260px]">
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Osnovni podaci</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "name", label: "Ime i prezime", placeholder: "Max Mustermann" },
                { key: "address", label: "Adresa", placeholder: "Musterstraße 1, 10115 Berlin" },
                { key: "email", label: "Email", placeholder: "max@email.com" },
                { key: "phone", label: "Telefon", placeholder: "+49 170 1234567" },
              ].map((f) => (
                <div key={f.key}>
                  <Label className="text-xs">{f.label}</Label>
                  <Input
                    className="mt-1"
                    placeholder={f.placeholder}
                    value={(basicData as any)[f.key]}
                    onChange={(e) => setBasicData((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Specifični podaci — {form.title}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {form.specificFields.map((f) => (
                <div key={f.label}>
                  <Label className="text-xs">{f.label}</Label>
                  <Input
                    className="mt-1"
                    placeholder={f.placeholder}
                    value={specificData[f.label] ?? ""}
                    onChange={(e) => setSpecificData((d) => ({ ...d, [f.label]: e.target.value }))}
                  />
                  {f.helpText && <p className="mt-0.5 text-[10px] text-muted-foreground">{f.helpText}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Pregled unesenih podataka</h3>
            <div className="rounded-xl border p-4 text-xs space-y-2">
              <p className="font-medium text-muted-foreground">Osnovni podaci:</p>
              {Object.entries(basicData).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="capitalize text-muted-foreground">{k}</span>
                  <span className="font-medium">{v || "—"}</span>
                </div>
              ))}
              <hr className="my-2 border-border" />
              <p className="font-medium text-muted-foreground">Specifični podaci:</p>
              {form.specificFields.map((f) => (
                <div key={f.label} className="flex justify-between">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-medium">{specificData[f.label] || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center py-6">
            <Printer className="mx-auto h-10 w-10 text-primary" />
            <h3 className="text-sm font-bold">Formular spreman za štampu</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Pregledajte podatke iznad i kliknite "Štampaj" da otvorite dijalog za štampu ili čuvanje kao PDF.
              Uskoro: automatski popunjen PDF za preuzimanje.
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={handlePrint} className="rounded-xl">
                <Printer className="mr-2 h-4 w-4" /> Štampaj
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <Link to="/formulari">Nazad na formulare</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl text-xs"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          ← Prethodni
        </Button>
        {step < STEPS.length - 1 && (
          <Button
            size="sm"
            className="rounded-xl text-xs"
            onClick={() => setStep((s) => s + 1)}
          >
            Sljedeći →
          </Button>
        )}
      </div>
    </div>
  );
}
