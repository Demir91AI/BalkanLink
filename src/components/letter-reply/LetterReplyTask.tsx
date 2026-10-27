import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowLeft, FilePenLine, Copy, Download, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLocalizedNavigate } from '@/hooks/useLocalizedHref';
import { PURPOSES, emptyReply, validateReply, renderReply, attachmentLines, FAMILY_SERVICE, FAMILY_PORTAL, type ReplyData } from '@/lib/letter-reply/model';
import { createReplyPdf } from '@/lib/letter-reply/pdf';

/** Development-only entry. Existing host access contract is supplied, never changed here. */
export default function LetterReplyTask({ canAccess }: { canAccess: boolean }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('reply');
  const navigate = useLocalizedNavigate();
  if (import.meta.env.PROD) return null;
  return <>
    <Button variant="outline" className="w-full h-auto justify-start whitespace-normal rounded-lg border-gold/40 bg-card py-4 text-card-foreground" onClick={() => canAccess ? setOpen(true) : navigate('/paketi')}>
      <FilePenLine className="text-gold" /><span className="flex-1 text-left"><span className="block font-semibold">{t('title')}</span><span className="block text-xs text-muted-foreground mt-1">{t('entryHint')}</span></span><ArrowRight />
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      {open && <DialogContent className="dark w-[calc(100%-1rem)] max-w-3xl max-h-[94dvh] overflow-y-auto rounded-lg bg-background text-foreground p-4 sm:p-6 [&>button]:hidden">
        <DialogTitle className="text-foreground pr-4">{t('title')}</DialogTitle>
        <DialogDescription className="text-foreground/80">{t('tagline')}</DialogDescription>
        <ReplyWizard close={() => setOpen(false)} />
      </DialogContent>}
    </Dialog>
  </>;
}
function ReplyWizard({ close }: { close: () => void }) {
  const { t } = useTranslation('reply');
  const [data, setData] = useState<ReplyData>(emptyReply);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [reviewed, setReviewed] = useState(false);
  const [finalReviewed, setFinalReviewed] = useState(false);
  const [document, setDocument] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const update = <K extends keyof ReplyData>(key: K, value: ReplyData[K]) => { setData(prev => ({ ...prev, [key]: value })); setReviewed(false); setFinalReviewed(false); setErrors([]); setStatus(''); };
  const fields = ['sender', 'senderAddress', 'recipient', 'recipientAddress', 'reference', 'date', 'letterDate', ...(data.purpose === 'extension' ? ['requestedDate'] : []), 'facts', 'attachments'] as const;
  const next = () => {
    if (step === 0) { if (!data.purpose) { setErrors(['purpose']); return; } setStep(1); return; }
    const failures = validateReply(data); setErrors(failures);
    if (failures.length) return;
    if (step === 1) setStep(2);
    else if (reviewed) { setDocument(renderReply(data, (key, values) => t(`document.${key}`, values))); setFinalReviewed(false); setStep(3); }
  };
  const exportDocument = async (mode: 'pdf' | 'copy') => {
    if (!finalReviewed || !document.trim() || busy) return;
    setBusy(true); setStatus('');
    try {
      if (mode === 'copy') { await navigator.clipboard.writeText(document); setStatus('copied'); }
      else {
        const bytes = await createReplyPdf(document);
        const url = URL.createObjectURL(new Blob([Uint8Array.from(bytes)], { type: 'application/pdf' }));
        const link = window.document.createElement('a'); link.href = url; link.download = 'BalkanLink-Antwort.pdf'; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch { setStatus('error'); } finally { setBusy(false); }
  };
  const confirm = (id: string, key: string, value: boolean, change: (v: boolean) => void) => <div className="flex items-start gap-3"><Checkbox id={id} checked={value} onCheckedChange={v => change(v === true)} className="mt-1 shrink-0" /><Label htmlFor={id} className="text-sm leading-relaxed">{t(key)}</Label></div>;
  return <div className="space-y-5">
    <ol className="grid grid-cols-4 gap-2" aria-label={t('title')}>{(t('steps', { returnObjects: true }) as string[]).map((name, i) => <li key={i} aria-current={step === i ? 'step' : undefined} className={`border-b-2 pb-2 text-xs break-words ${step === i ? 'border-gold text-gold font-bold' : 'border-border text-foreground/70'}`}>{i + 1}. {name}</li>)}</ol>
    <p className="flex gap-2 text-xs text-foreground/80 leading-relaxed"><ShieldCheck className="h-4 w-4 shrink-0 text-gold" />{t('privacy')}</p>
    <p className="text-xs text-foreground/80">{t('notOfficial')}</p>
    {step === 0 && <div className="grid gap-2">{PURPOSES.map(p => <Button key={p} variant="outline" className={`h-auto min-h-14 whitespace-normal justify-start text-left ${data.purpose === p ? 'border-gold bg-accent' : ''}`} aria-pressed={data.purpose === p} onClick={() => update('purpose', p)}><FilePenLine />{t(`purposes.${p}`)}</Button>)}</div>}
    {data.purpose === 'appeal' && <p className="border-l-2 border-gold pl-3 text-sm leading-relaxed"><AlertTriangle className="inline h-4 w-4 mr-2 text-gold" />{t('appealWarning')}</p>}
    {data.purpose === 'extension' && <p className="border-l-2 border-gold pl-3 text-sm leading-relaxed">{t('extensionWarning')}</p>}
    {step === 1 && <div className="space-y-4">
      <Label className="block">{t('fields.institution')}</Label>
      <div className="flex flex-wrap gap-2">{(['other','familienkasse'] as const).map(i => <Button key={i} variant="outline" className="h-auto whitespace-normal" aria-pressed={data.institution === i} onClick={() => update('institution', i)}>{data.institution === i && <ShieldCheck />}{t(i === 'other' ? 'institutionUnknown' : 'institutionFamily')}</Button>)}</div>
      <p className="text-xs text-foreground/80">{t('optionalHint')}</p>
      <div className="grid gap-4 sm:grid-cols-2">{fields.map(field => {
        const multiline = ['senderAddress','recipientAddress','facts','attachments'].includes(field);
        const isDate = ['date','letterDate','requestedDate'].includes(field);
        return <div key={field} className={multiline ? 'sm:col-span-2' : ''}><Label htmlFor={`reply-${field}`} className="block mb-2">{t(`fields.${field}`)}</Label>{multiline ? <Textarea id={`reply-${field}`} rows={field === 'facts' ? 4 : 2} value={String(data[field as keyof ReplyData])} maxLength={4000} onChange={e => update(field as keyof ReplyData, e.target.value)} /> : <Input id={`reply-${field}`} type={isDate ? 'date' : 'text'} value={String(data[field as keyof ReplyData])} maxLength={4000} onChange={e => update(field as keyof ReplyData, e.target.value)} />}{field === 'facts' && <p className="text-xs text-foreground/80 mt-2">{t('factsHint')}</p>}</div>;
      })}</div>
      {data.purpose === 'appeal' && <div className="space-y-3"><Label>{t('fields.remedy')}</Label><div className="flex gap-2">{(['Widerspruch','Einspruch'] as const).map(r => <Button variant="outline" key={r} aria-pressed={data.remedy === r} onClick={() => { update('remedy', r); update('legalConfirmed', false); }}>{r}</Button>)}</div>{confirm('reply-legal','legalConfirm',data.legalConfirmed,v => update('legalConfirmed',v))}</div>}
    </div>}
    {step === 2 && <div className="space-y-4"><h3 className="text-foreground font-semibold">{t('reviewTitle')}</h3><dl className="grid gap-3">{fields.filter(f => String(data[f as keyof ReplyData]).trim()).map(f => <div key={f} className="border-b border-border pb-2"><dt className="text-xs text-foreground/70">{t(`fields.${f}`)}</dt><dd className="text-sm whitespace-pre-wrap break-words mt-1">{String(data[f as keyof ReplyData])}</dd></div>)}</dl>{confirm('reply-review','reviewConfirm',reviewed,setReviewed)}</div>}
    {step === 3 && <div className="space-y-4"><Label htmlFor="reply-document" className="font-semibold block">{t('documentTitle')}</Label><Textarea id="reply-document" lang="de" spellCheck rows={18} maxLength={20000} className="font-mono text-sm leading-relaxed" value={document} onChange={e => { setDocument(e.target.value); setFinalReviewed(false); setStatus(''); }} />{confirm('reply-final','editConfirm',finalReviewed,setFinalReviewed)}<div className="flex flex-wrap gap-2"><Button className="bg-gold text-secondary hover:bg-gold-light" disabled={!finalReviewed || busy || !document.trim()} onClick={() => exportDocument('pdf')}><Download />{t('pdf')}</Button><Button variant="outline" disabled={!finalReviewed || busy || !document.trim()} onClick={() => exportDocument('copy')}><Copy />{t('copy')}</Button></div><h3 className="text-foreground font-semibold">{t('attachmentTitle')}</h3><p className="text-xs text-foreground/80">{t('editConfirm')}</p><ul className="space-y-1 text-sm">{attachmentLines(data.attachments).map((a,i) => <li key={i} className="break-words">□ {a}</li>)}</ul>{!attachmentLines(data.attachments).length && <p className="text-sm">{t('noAttachments')}</p>}<h3 className="text-foreground font-semibold">{t('nextTitle')}</h3><p className="text-sm leading-relaxed text-foreground/90">{t('nextBody')}</p>
      {data.institution === 'familienkasse' && <div className="space-y-2 border-t border-border pt-3"><p className="text-sm leading-relaxed">{t('familyHint')}</p>{[FAMILY_SERVICE,FAMILY_PORTAL].map((url,i) => <Button key={url} variant="link" asChild className="h-auto text-gold whitespace-normal justify-start p-0"><a href={url} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer"><ExternalLink />{t(i === 0 ? 'officialService' : 'officialPortal')}</a></Button>)}</div>}
    </div>}
    {errors.length > 0 && <ul role="alert" className="text-sm border-l-2 border-gold pl-3">{errors.map(e => <li key={e}>{t(`errors.${e}`)}</li>)}</ul>}
    {status && <p role="status" className="text-sm">{t(status)}</p>}
    <div className="flex flex-wrap gap-2 border-t border-border pt-4">{step > 0 && <Button variant="outline" onClick={() => { setStep(step - 1); setReviewed(false); setFinalReviewed(false); setStatus(''); }}><ArrowLeft />{t('back')}</Button>}{step < 3 && <Button className="bg-gold text-secondary hover:bg-gold-light" disabled={step === 2 && !reviewed} onClick={next}>{t(step === 2 ? 'generate' : 'next')}<ArrowRight /></Button>}<Button variant="ghost" className="h-auto whitespace-normal ml-auto text-xs" onClick={close}>{t('close')}</Button></div>
  </div>;
}
