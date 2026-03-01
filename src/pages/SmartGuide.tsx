import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, XCircle, RotateCcw, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormBySlug, useFormFields } from "@/hooks/useFormData";
import { useFormAccess } from "@/hooks/useFormAccess";
import { useAuth } from "@/contexts/AuthContext";
import FormPaywallModal from "@/components/FormPaywallModal";
import SmartGuideWizard from "@/components/SmartGuideWizard";
import SmartGuidePdfView from "@/components/SmartGuidePdfView";

export default function SmartGuide() {
  const { slug } = useParams<{ slug: string }>();
  const formSlug = slug ?? "kindergeld-kg1";
  const { data: form, isLoading: formLoading } = useFormBySlug(formSlug);
  const { data: fields } = useFormFields(formSlug);
  const { hasAccess, loading: accessLoading, simulatePurchase, resetAccess } = useFormAccess(formSlug);
  const { user } = useAuth();
  const [paying, setPaying] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const isDev = import.meta.env.DEV;

  const handlePay = async () => {
    setPaying(true);
    await simulatePurchase();
    setPaying(false);
  };

  if (formLoading || accessLoading) {
    return <div className="flex items-center justify-center py-24 text-sm text-muted-foreground">Učitavam…</div>;
  }

  if (!form) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">Formular nije pronađen.</p>
        <Button variant="outline" className="mt-4" asChild><Link to="/formulari">← Nazad</Link></Button>
      </div>
    );
  }

  const showPaywall = !hasAccess;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/formulari" className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Formulari
        </Link>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{form.name} — Smart Guide</h1>
        <p className="mt-1 text-xs text-muted-foreground">Izvor: {form.authority_name}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {form.status === "OK" && <Badge variant="outline" className="border-green-500/30 text-green-600 text-[10px]"><CheckCircle2 className="mr-1 h-3 w-3" />PDF OK</Badge>}
          {form.status === "Suspect" && <Badge variant="outline" className="border-yellow-500/30 text-yellow-600 text-[10px]"><AlertTriangle className="mr-1 h-3 w-3" />PDF promijenjen</Badge>}
          {form.status === "Blocked" && <Badge variant="outline" className="border-red-500/30 text-red-600 text-[10px]"><XCircle className="mr-1 h-3 w-3" />PDF nedostupan</Badge>}
          {form.last_checked_at && (
            <span className="text-[10px] text-muted-foreground">
              Provjereno: {new Date(form.last_checked_at).toLocaleDateString("de-DE")}
            </span>
          )}
        </div>

        {form.status === "Blocked" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm dark:border-red-900 dark:bg-red-950">
            <p className="font-medium text-red-700 dark:text-red-400">PDF trenutno nije dostupan.</p>
            <a href={form.official_pdf_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-red-600 underline">
              Otvori službeni link <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>

      {/* Dev reset */}
      {isDev && hasAccess && (
        <Button variant="outline" size="sm" className="mb-4 text-[10px]" onClick={resetAccess}>
          <RotateCcw className="mr-1 h-3 w-3" /> DEV: Reset pristup
        </Button>
      )}

      {/* Common tips (always visible) */}
      <div className="mb-6 space-y-4">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-sm font-bold">📋 Najčešće greške koje dovode do odbijanja</h3>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
            <li>Pogrešan ili nedostajući Steuer-ID (porezni identifikacijski broj)</li>
            <li>Nepotpisan formular ili nedostaje datum</li>
            <li>IBAN pogrešno upisan (provjeriti razmake)</li>
            <li>Nedostaje prilog za dijete (KG1-AnlKi)</li>
            <li>Adresa se ne poklapa s prijavom prebivališta</li>
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-sm font-bold">📎 Dokumenti koje trebaš pripremiti</h3>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
            <li>Rodni list djeteta (sa prevodom ako je iz inostranstva)</li>
            <li>Steuer-ID roditelja i djeteta</li>
            <li>Potvrda o prijavi prebivališta (Meldebescheinigung)</li>
            <li>IBAN bankovnog računa</li>
            <li>Boravišna dozvola (za ne-EU državljane)</li>
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-sm font-bold">✍️ Ko treba potpisati?</h3>
          <p className="text-xs text-muted-foreground">
            Potpisuje podnosilac zahtjeva (Antragsteller/in). Ako oba roditelja žive u domaćinstvu, dovoljno je potpis jednog roditelja.
          </p>
        </div>
      </div>

      {/* Paywall or content */}
      <FormPaywallModal open={showPaywall} onSimulatePay={handlePay} paying={paying} />

      {hasAccess && form.status !== "Blocked" && (
        <Tabs defaultValue="wizard" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="wizard" className="flex-1 text-xs">Step-by-Step Wizard</TabsTrigger>
            <TabsTrigger value="pdf" className="flex-1 text-xs">PDF Smart Click</TabsTrigger>
          </TabsList>

          <TabsContent value="wizard">
            <SmartGuideWizard fields={fields ?? []} pdfUrl={form.official_pdf_url} />
          </TabsContent>

          <TabsContent value="pdf">
            <SmartGuidePdfView
              fields={fields ?? []}
              pdfUrl={form.official_pdf_url}
              activeField={activeField}
              onFieldSelect={setActiveField}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
