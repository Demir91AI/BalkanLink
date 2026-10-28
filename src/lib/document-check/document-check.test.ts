import { describe, it, expect, vi } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'node:fs';
import { ANALYSIS_SCHEMA, CheckError, LIMITS, analysisPrompt, parseAnalysis, validateUploads, reservationFailure, type Language } from '../../../supabase/functions/document-check/contract';
import { consumeCompletion, runAnalysis } from '../../../supabase/functions/document-check/pipeline';
import { mayRequestAnalysis, guideFor } from './model';
import { FREE_ENTITLEMENT, QUOTAS } from '../entitlement';
import type { Reservation } from '../../../supabase/functions/_shared/usage';
const fixture = (language: Language = 'bs') => ({ language, readable: true, documentType: 'Mahnung', sender: 'Example company', summary: 'Payment requested.', requestedActions: [], deadlines: [{ text: '15.11.2026', quote: 'bis 15.11.2026', sourceId: 's1', confirmed: true }], amounts: [], risks: [], nextSteps: ['Check original.'], detailedExplanation: 'Explanation.', uncertainty: [], sourceRefs: [{ id: 's1', fileIndex: 1, page: 1, quote: 'Zahlen Sie bis 15.11.2026.' }] });
const deps = (value: unknown) => ({ reserve: vi.fn(async (): Promise<Reservation> => ({ ok: true, reservation_id: 'r' })), commit: vi.fn(async () => {}), release: vi.fn(async () => {}), generate: vi.fn(async () => value), language: 'bs' as Language, pageCounts: [1] });
describe('structured document boundary', () => {
  for (const language of ['bs','hr','sr','de'] as const) it(`requires ${language} result and valid structured IDs`, () => {
    expect(parseAnalysis(JSON.stringify(fixture(language)),language,[1]).language).toBe(language);
    expect(() => parseAnalysis(fixture(language),'de' === language ? 'bs' : 'de')).toThrow(CheckError);
  });
  for (const type of ['invoice','contract','Kindergeld Bescheid','unknown']) it(`preserves document type ${type} without invented guide mapping`, () => {
    const f = { ...fixture(), documentType: type }; expect(parseAnalysis(f,'bs').documentType).toBe(type); expect(guideFor(f)).toBe('/formulari');
  });
  it('never calculates dates from quoted relative wording', () => {
    const f=fixture(); f.deadlines[0].text='innerhalb von 14 Tagen';f.deadlines[0].quote='innerhalb von 14 Tagen';f.sourceRefs[0].quote='innerhalb von 14 Tagen';
    expect(parseAnalysis(f,'bs').deadlines[0].text).toBe('innerhalb von 14 Tagen');
  });
  it('downgrades unsupported deadline evidence and out-of-range page references', () => {
    const f=fixture();f.sourceRefs[0].page=10;
    const r=parseAnalysis(f,'bs',[2]);expect(r.sourceRefs).toEqual([]);expect(r.deadlines[0].confirmed).toBe(false);
  });
  it('does not use malformed JSON or missing fields as analysis', () => {
    for (const f of ['## heading', '{broken', {}, {...fixture(), deadlines:'tomorrow'}]) expect(() => parseAnalysis(f,'bs')).toThrow(CheckError);
  });
  it('has required properties on every wire schema object', () => {
    const check=(v: unknown): void => { if (!v || typeof v!=='object')return; const o=v as Record<string,unknown>;if(o.type==='object'){expect(o.additionalProperties).toBe(false);expect(o.required).toEqual(Object.keys(o.properties as object));}Object.values(o).forEach(check); };
    check(ANALYSIS_SCHEMA);
  });
});
describe('upload limits and content checks', () => {
  const png=btoa(String.fromCharCode(137,80,78,71,13,10,26,10,1));
  it('accepts multiple recognized images without truncating', () => { expect(validateUploads([{base64:png,mimeType:'image/png'},{base64:png,mimeType:'image/png'}]).files).toHaveLength(2); });
  it('rejects 11 files rather than silently slicing to 10', () => { expect(() => validateUploads(Array.from({length:11},()=>({base64:png,mimeType:'image/png'})))).toThrow('TOO_MANY_FILES'); });
  it('rejects MIME spoofing, empty, invalid base64 and HEIC', () => {
    for(const f of [{base64:png,mimeType:'application/pdf'},{base64:'',mimeType:'image/png'},{base64:'!!!!',mimeType:'image/png'},{base64:png,mimeType:'image/heic'}])expect(()=>validateUploads([f])).toThrow();
  });
  it('rejects decoded files exceeding 25 MB', () => { expect(()=>validateUploads([{base64:'A'.repeat(Math.ceil((LIMITS.bytes+3)/3)*4),mimeType:'image/png'}])).toThrow('TOO_LARGE'); });
  it('pins explicit transport and multipage bounds', async () => { expect(LIMITS.payloadBytes).toBe(36*1024*1024);expect(LIMITS.pdfPages).toBe(30);const pdf=await PDFDocument.create();pdf.addPage();pdf.addPage();const bytes=await pdf.save();expect((await PDFDocument.load(bytes)).getPageCount()).toBe(2); });
});
describe('server usage settlement and access', () => {
  for (const reason of ['quota_exhausted','access_required','daily_cap'] as const) it(`stops ${reason} before a provider call`, async () => {
    const d=deps(fixture());d.reserve=vi.fn(async()=>({ok:false,reason})); await expect(runAnalysis(d)).rejects.toThrow();expect(d.generate).not.toHaveBeenCalled();expect(d.commit).not.toHaveBeenCalled();
  });
  it('commits a validated readable result exactly once', async()=> {const d=deps(fixture());await runAnalysis(d);expect(d.commit).toHaveBeenCalledTimes(1);expect(d.release).not.toHaveBeenCalled();});
  for(const value of [{...fixture(),readable:false},'invalid JSON'])it(`releases unreadable/malformed result ${typeof value}`,async()=>{const d=deps(value);await expect(runAnalysis(d)).rejects.toThrow();expect(d.release).toHaveBeenCalledTimes(1);expect(d.commit).not.toHaveBeenCalled();});
  it('releases a failed provider request without retry',async()=>{const d=deps(fixture());d.generate=vi.fn(async()=>{throw new CheckError('PROVIDER_DENIED',403);});await expect(runAnalysis(d)).rejects.toThrow('PROVIDER_DENIED');expect(d.generate).toHaveBeenCalledTimes(1);expect(d.release).toHaveBeenCalledTimes(1);});
  it('returns server reset timing for quota and separate rate/access codes',()=>{expect(reservationFailure({ok:false,reason:'quota_exhausted',resets_at:'2026-11-01'})).toMatchObject({errorCode:'QUOTA_EXHAUSTED',resets_at:'2026-11-01'});expect(reservationFailure({ok:false,reason:'daily_cap'})?.errorCode).toBe('RATE_LIMITED');});
  for(const source of ['admin','legacy_lifetime','legacy_sub','new_yearly','trial'] as const)it(`retains ${source} client access with no client quota decision`,()=>{expect(mayRequestAnalysis({...FREE_ENTITLEMENT,source,full_access:true,quota:QUOTAS[source]},false)).toBe(true);});
  it('preserves old credits and preview; blocks free/expired entitlement',()=>{expect(mayRequestAnalysis({...FREE_ENTITLEMENT,unused_doc_credits:1},false)).toBe(true);expect(mayRequestAnalysis(FREE_ENTITLEMENT,true)).toBe(true);expect(mayRequestAnalysis(FREE_ENTITLEMENT,false)).toBe(false);});
});
describe('stream completion',()=>{
  const response=(data:string)=>new Response(new TextEncoder().encode(data));
  it('assembles streamed JSON, rejecting truncation',async()=>{expect(await consumeCompletion(response('data: {"choices":[{"delta":{"content":"{}"}}]}\n\ndata: [DONE]\n\n'))).toBe('{}');await expect(consumeCompletion(response('data: {"choices":[{"finish_reason":"length"}]}\n\n'))).rejects.toThrow('PARSING_FAILED');});
});
describe('locale contract',()=>{
  const data=['bs','hr','sr','de'].map(l=>JSON.parse(readFileSync(`src/i18n/locales/${l}/pages.json`,'utf8')).documentCheck);
  it('all new result and error keys exist in four locales',()=>{for(const d of data){expect(Object.keys(d.professional).sort()).toEqual(Object.keys(data[0].professional).sort());for(const k of ['rateLimited','creditsExhausted','unreadable','invalidResult','pdfTooManyPages'])expect(typeof d.errors[k]).toBe('string');}});
  it('prompt language contract uses only the active supported languages',()=>{expect(analysisPrompt('sr')).toContain('Serbian (ekavian)');expect(analysisPrompt('hr')).toContain('Croatian (ijekavian)');});
});
