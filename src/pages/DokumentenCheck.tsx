import { useCallback, useRef, useState } from 'react';
import { FileText, Upload, Camera, X, Loader2, Shield, ChevronDown, MessageSquare, BookOpen } from 'lucide-react';
import AuthGate from '@/components/AuthGate';
import PageNavBar from '@/components/navigation/PageNavBar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SEO } from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocalizedNavigate } from '@/hooks/useLocalizedHref';
import { navigateBackOrHome } from '@/lib/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEntitlement } from '@/hooks/useEntitlement';
import { DEV_MODE } from '@/lib/dev-mode';
import { supabase } from '@/integrations/supabase/client';
import { ERROR_KEYS, guideFor, languageOf, LIMITS, mayRequestAnalysis, MIME_TYPES, parseAnalysis, prepareFiles, type DocumentAnalysis, type EvidenceItem } from '@/lib/document-check/model';

export default function DokumentenCheck() {
  const { t, i18n } = useTranslation('pages');
  const navigate = useNavigate(); const localizedNavigate = useLocalizedNavigate();
  const { user } = useAuth();
  const { entitlement, loading: accessLoading, error: accessError, refresh } = useEntitlement();
  const [files, setFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [legacyResult, setLegacyResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [resetAt, setResetAt] = useState<string | null>(null);
  const [providerMessage, setProviderMessage] = useState<string | null>(null);
  const picker = useRef<HTMLInputElement>(null); const camera = useRef<HTMLInputElement>(null);
  const submitting = useRef(false); const results = useRef<HTMLDivElement>(null);
  const hasAccess = mayRequestAnalysis(entitlement, DEV_MODE);
  const tx = (key: string) => t(`documentCheck.${key}`);
  const addFiles = (list: FileList | null) => {
    if (!list || loading) return;
    const incoming = Array.from(list);
    const next = [...files, ...incoming.filter(f => !files.some(x => x.name === f.name && x.size === f.size))];
    // Reject the complete selection, never silently keep only its first attachments.
    let code: string | null = null;
    if (next.length > LIMITS.files) code = 'TOO_MANY_FILES';
    else if (incoming.some(f => !MIME_TYPES.some(m => m === f.type) && !(f.type === '' && /\.(pdf|jpe?g|png|webp)$/i.test(f.name)))) code = 'UNSUPPORTED_FORMAT';
    else if (next.some(f => !f.size)) code = 'INVALID_FILE';
    else if (next.reduce((n,f) => n + f.size, 0) > LIMITS.bytes) code = 'TOO_LARGE';
    setErrorCode(code);
    if (!code) { setFiles(next); setAnalysis(null); setLegacyResult(null); }
    if (picker.current) picker.current.value = '';
    if (camera.current) camera.current.value = '';
  };
  const analyze = useCallback(async () => {
    if (submitting.current) return;
    if (!confirmed || !files.length) { setErrorCode(!confirmed ? 'CONFIRM_REQUIRED' : 'EMPTY_INPUT'); return; }
    // On a failed entitlement read, let the authenticated server resolve it, not a false paywall.
    if (!hasAccess && !accessError) { setErrorCode('ACCESS_REQUIRED'); return; }
    submitting.current = true; setLoading(true); setErrorCode(null); setProviderMessage(null); setResetAt(null);
    setAnalysis(null); setLegacyResult(null);
    const language = languageOf(i18n.resolvedLanguage ?? i18n.language);
    try {
      const payload = { files: await prepareFiles(files), language };
      if (new TextEncoder().encode(JSON.stringify(payload)).length > LIMITS.payloadBytes) throw new Error('PAYLOAD_TOO_LARGE');
      const { data, error } = await supabase.functions.invoke('document-check', { body: payload });
      let body: unknown = data; let status = 200;
      if (error) {
        const context = (error as { context?: Response }).context;
        status = context?.status ?? 500;
        try { body = await context?.json(); } catch { body = null; }
      }
      const response = body as { success?: boolean; analysis?: unknown; errorCode?: string; resets_at?: string; providerMessage?: string } | null;
      if (error || response?.success === false) {
        setResetAt(response?.resets_at ?? null); setProviderMessage(response?.providerMessage ?? null);
        throw new Error(response?.errorCode ?? (status === 413 ? 'PAYLOAD_TOO_LARGE' : status === 429 ? 'RATE_LIMITED' : 'SERVER_ERROR'));
      }
      if (typeof response?.analysis === 'string') {
        // Compatibility while the deployed endpoint remains unchanged. Do not infer facts from markdown.
        try { setAnalysis(parseAnalysis(response.analysis, language)); }
        catch { setLegacyResult(response.analysis); }
      } else {
        const parsed = parseAnalysis(response?.analysis, language);
        if (!parsed.readable) throw new Error('UNREADABLE');
        setAnalysis(parsed);
      }
      void refresh();
      requestAnimationFrame(() => { results.current?.focus(); results.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }); });
    } catch (e) { setErrorCode(e instanceof Error ? e.message : 'SERVER_ERROR'); }
    finally { setLoading(false); submitting.current = false; }
  }, [confirmed, files, hasAccess, accessError, i18n, refresh]);
  const evidence = (items: EvidenceItem[], emptyKey: string) => items.length ? <ul className="space-y-4">{items.map((item, i) => {
    const source = analysis?.sourceRefs.find(s => s.id === item.sourceId);
    return <li key={i} className="space-y-1">
      <p>{item.text}</p>
      {item.quote && <blockquote className="border-l-2 border-border pl-3 break-words"><span className="font-semibold">{tx('professional.quoted')}: </span>“{item.quote}”</blockquote>}
      <p className="text-sm text-muted-foreground">{tx(item.confirmed ? 'professional.visible' : 'professional.unconfirmed')}
        {source && <> · {t('documentCheck.professional.attachment', { number: source.fileIndex })}{source.page !== null && <> · {t('documentCheck.professional.page', { number: source.page })}</>}</p>
    </li>;
  })}</ul> : <p className="text-muted-foreground">{tx(emptyKey)}</p>;
  const detail = (key: string, children: React.ReactNode) => <Collapsible className="border-b border-border py-2">
    <CollapsibleTrigger asChild><Button variant="ghost" className="h-auto min-h-12 w-full justify-between gap-3 whitespace-normal text-left"><span>{tx(key)}</span><ChevronDown className="h-4 w-4 shrink-0" /></Button></CollapsibleTrigger>
    <CollapsibleContent className="px-4 py-4 whitespace-pre-wrap break-words leading-relaxed">{children}</CollapsibleContent>
  </Collapsible>;
  return <>
    <SEO title={tx('seo.title')} description={tx('seo.description')} path="/dokumenten-check" />
    <section className="border-b border-border py-8"><div className="container max-w-3xl px-4">
      <PageNavBar onBack={() => navigateBackOrHome(navigate)} showShare />
      <h1 className="mt-4 text-3xl font-bold text-foreground">{tx('title')}</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{tx('subtitle')}</p>
    </div></section>
    <AuthGate><main className="container max-w-3xl space-y-6 px-4 py-8">
      <div className="flex items-start gap-3 text-foreground"><Shield className="mt-1 h-5 w-5 shrink-0" /><div><h2 className="font-semibold">{tx('privacy.title')}</h2><p className="mt-2 text-sm leading-relaxed">{tx('privacy.body')}</p></div></div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{tx('upload.label')}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{tx('professional.limits')}</p>
        <input ref={picker} type="file" multiple accept="application/pdf,image/jpeg,image/png,image/webp,.pdf,.jpg,.jpeg,.png,.webp" className="sr-only" tabIndex={-1} aria-label={tx('upload.chooseFile')} onChange={e => addFiles(e.target.files)} />
        <input ref={camera} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" className="sr-only" tabIndex={-1} aria-label={tx('upload.takePhoto')} onChange={e => addFiles(e.target.files)} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="outline" className="min-h-14 gap-2 whitespace-normal" disabled={loading} onClick={() => picker.current?.click()}><Upload className="h-5 w-5 shrink-0" />{tx('upload.chooseFile')}</Button>
          <Button variant="outline" className="min-h-14 gap-2" disabled={loading} onClick={() => camera.current?.click()}><Camera className="h-5 w-5" />{tx('upload.takePhoto')}</Button>
        </div>
        {!files.length && <p className="text-sm text-muted-foreground">{tx('professional.empty')}</p>}
        {!!files.length && <><p className="text-sm">{t('documentCheck.upload.filesCount', { count: files.length, max: LIMITS.files })} · {(files.reduce((n,f) => n + f.size, 0) / 1048576).toFixed(1)} MB</p><ul className="divide-y divide-border">{files.map((f,i) => <li key={`${f.name}-${i}`} className="flex min-h-14 items-center gap-3 py-2"><FileText className="h-5 w-5 shrink-0" /><span className="min-w-0 flex-1 break-all text-sm">{f.name}</span><Button variant="ghost" size="icon" className="h-11 w-11 shrink-0" aria-label={t('documentCheck.professional.removeFile', { name: f.name })} disabled={loading} onClick={() => { setFiles(prev => prev.filter((_,idx) => idx !== i)); setAnalysis(null); setLegacyResult(null); }}><X className="h-4 w-4" /></Button></li>)}</ul></>}
        <div className="flex items-start gap-3 py-2"><Checkbox id="document-check-consent" checked={confirmed} disabled={loading} onCheckedChange={v => setConfirmed(v === true)} className="mt-1" /><label htmlFor="document-check-consent" className="text-sm leading-relaxed">{tx('confirm')}</label></div>
        <div className="flex flex-wrap gap-3"><Button className="min-h-12 gap-2" disabled={loading || accessLoading || !confirmed || !files.length} onClick={analyze}>{loading && <Loader2 className="h-4 w-4 animate-spin" />}{tx(loading ? 'buttons.checking' : 'buttons.checkDocument')}</Button>
        {!!files.length && <Button variant="outline" className="min-h-12" disabled={loading} onClick={() => { setFiles([]); setAnalysis(null); setLegacyResult(null); setErrorCode(null); setConfirmed(false); }}>{tx('buttons.reset')}</Button>}</div>
        {(loading || accessLoading) && <p role="status" aria-live="polite" className="text-sm">{tx(loading ? 'professional.loading' : 'professional.accessLoading')}</p>}
        {errorCode && <div role="alert" className="border-l-4 border-destructive bg-muted p-4 text-foreground"><p>{t(`documentCheck.errors.${errorCode === 'CONFIRM_REQUIRED' ? 'confirmRequired' : ERROR_KEYS[errorCode] ?? 'serverError'}`, { max: LIMITS.files })}</p>
          {resetAt && Number.isFinite(Date.parse(resetAt)) && <p className="mt-2 text-sm">{t('documentCheck.professional.resetAt', { date: new Date(resetAt).toLocaleString(languageOf(i18n.language)) })}</p>}
          {providerMessage && <p className="mt-2 text-sm">{providerMessage}</p>}
          {errorCode === 'ACCESS_REQUIRED' && <Button variant="outline" className="mt-3 min-h-12" onClick={() => localizedNavigate(user ? '/paketi' : '/register')}>{tx('paywall.premiumCta')}</Button>}</div>}
      </div>
      {(analysis || legacyResult) && <div ref={results} tabIndex={-1} className="scroll-mt-24 space-y-6 outline-none" aria-label={tx('professional.overview')}>
        <h2 className="text-2xl font-bold">{tx('professional.overview')}</h2>
        {analysis && <>
          <section className="space-y-2 border-b border-border pb-5"><h3 className="font-bold">{tx('professional.what')}</h3><p className="font-medium">{analysis.documentType}{analysis.sender && <> · {analysis.sender}</>}</p><p className="leading-relaxed">{analysis.summary}</p><p className="text-sm text-muted-foreground">{tx('professional.explanation')}</p></section>
          <section className="space-y-3 border-b border-border pb-5"><h3 className="font-bold">{tx('professional.actions')}</h3>{evidence(analysis.requestedActions,'professional.noActions')}</section>
          <section className="space-y-3 border-b border-border pb-5"><h3 className="font-bold">{tx('professional.deadlines')}</h3>{evidence(analysis.deadlines,'professional.noDeadlines')}<p className="text-sm text-muted-foreground">{tx('professional.deadlineCaution')}</p></section>
          {!!analysis.amounts.length && <section className="space-y-3 border-b border-border pb-5"><h3 className="font-bold">{tx('professional.money')}</h3>{evidence(analysis.amounts,'professional.noActions')}</section>}
          <section className="space-y-3"><h3 className="font-bold">{tx('professional.next')}</h3><p className="text-sm text-muted-foreground">{tx('professional.recommendation')}</p><ol className="list-decimal space-y-2 pl-6">{analysis.nextSteps.map((step,i) => <li key={i}>{step}</li>)}</ol></section>
          {detail('professional.details', <p>{analysis.detailedExplanation}</p>)}
          {!!analysis.risks.length && detail('professional.risks', evidence(analysis.risks,'professional.noActions'))}
          {!!analysis.uncertainty.length && detail('professional.uncertainty', <ul className="list-disc space-y-2 pl-5">{analysis.uncertainty.map((x,i) => <li key={i}>{x}</li>)}</ul>)}
          {!!analysis.sourceRefs.length && detail('professional.sources', <ul className="space-y-4">{analysis.sourceRefs.map(s => <li key={s.id}><p>{t('documentCheck.professional.attachment', { number: s.fileIndex })}{s.page !== null && <> · {t('documentCheck.professional.page', { number: s.page })}</>}</p><blockquote>“{s.quote}”</blockquote></li>)}</ul>)}
        </>}
        {legacyResult && <><p role="status" className="text-sm">{tx('professional.legacyNotice')}</p>{detail('professional.details', <p>{legacyResult}</p>)}</>}
        <div className="flex flex-wrap gap-3"><Button variant="outline" className="min-h-12 gap-2" onClick={() => localizedNavigate(analysis ? guideFor(analysis) : '/formulari')}><BookOpen className="h-4 w-4" />{tx('professional.guides')}</Button><Button variant="outline" className="min-h-12 gap-2" onClick={() => window.dispatchEvent(new CustomEvent('open-assistant'))}><MessageSquare className="h-4 w-4" />{tx('professional.askAssistant')}</Button></div>
        <p className="text-sm text-muted-foreground">{tx('professional.noTransfer')}</p>
      </div>}
      <p className="border-t border-border pt-5 text-sm leading-relaxed">{tx('disclaimer.body')}</p>
    </main></AuthGate>
  </>;
}
