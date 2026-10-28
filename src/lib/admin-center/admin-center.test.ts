import { describe,it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { emptySource,settleSource,sourceStale,periodMetric,profilePlan,safeCsv } from './model';
import { canReview,confirmedRows,mergeNotifications } from './notifications';
import { checkedObservation,observedLength,versionChanged,trustedSource } from '../../../supabase/functions/check-pdf-versions/observation';
const now = Date.parse('2026-10-28T20:00:00Z');
describe('admin metric contracts',() => {
  it('keeps last successful data/time after section failure',() => {
    const old = { ...emptySource(),data:{ totalUsers:3 },fetchedAt:'2026-10-28T19:00:00Z' };
    const failed=settleSource(old,{ status:'fulfilled',value:{ data:null,error:'offline' } },'2026-10-28T20:00:00Z');
    expect(failed.data).toEqual({ totalUsers:3 });expect(failed.fetchedAt).toBe(old.fetchedAt);expect(failed.error).toBe(true);
  });
  it('treats empty success as data, rejected promises as stale',() => {
    const success=settleSource(emptySource(),{ status:'fulfilled',value:{ data:[],error:null } },'2026-10-28T20:00:00Z');
    expect(success.data).toEqual([]);expect(sourceStale(success,now+119999)).toBe(false);expect(sourceStale(success,now+120000)).toBe(true);
    expect(settleSource(success,{ status:'rejected',reason:'offline' },'later').fetchedAt).toBe(success.fetchedAt);
  });
  it('does not fabricate 90-day aggregates or missing values as zero',() => {
    expect(periodMetric({ new7d:2,new30d:3 },'new',7)).toBe(2);
    expect(periodMetric({ new7d:2,new30d:3 },'new',90)).toBeNull();
    expect(periodMetric(null,'views',30)).toBeNull();
    expect(periodMetric({ views30d:0 },'views',30)).toBe(0);
  });
  const row={ id:'x',email:'x@example.invalid',subscription_tier:'free',is_premium:false,subscription_expires_at:null,created_at:'2026-10-01' };
  it('lifetime is lifetime, never an inferred internal account',() => expect(profilePlan({ ...row,subscription_tier:'lifetime' },now)).toBe('lifetime'));
  it('includes new active annual and all trial variants',() => {
    expect(profilePlan({ ...row,subscription_tier:'annual',subscription_expires_at:'2026-11-01' },now)).toBe('annual');
    for(const tier of ['trial','launch_trial','influencer_trial']) expect(profilePlan({ ...row,subscription_tier:tier,subscription_expires_at:'2026-11-01' },now)).toBe('trial');
  });
  it('preserves indefinite legacy state but marks expired annual',() => {
    expect(profilePlan({ ...row,subscription_tier:'premium',is_premium:true },now)).toBe('legacy');
    expect(profilePlan({ ...row,subscription_tier:'annual',subscription_expires_at:'2026-10-01' },now)).toBe('expired');
  });
  it('neutralizes formula injection in CSV',() => {
    expect(safeCsv([['=HYPERLINK("bad")',' +SUM(1)','@evil','normal']])).toContain('"\'=HYPERLINK(""bad"")"');
    expect(safeCsv([['-1']])).toContain("'-1");
  });
});
describe('internal notifications',() => {
  const row={ id:'1',type:'pdf_version_changed',severity:'warning',title:'x',body:null,metadata:null,read_at:null,created_at:'2026-10-28',status:'pending' };
  it('requires returned affected rows, not HTTP-only mutation success',() => {
    expect(confirmedRows([],null,1)).toBe(false);expect(confirmedRows([{ id:'1' }],'error',1)).toBe(false);expect(confirmedRows([{ id:'1' }],null,1)).toBe(true);
  });
  it('dedupes repeated event identities',() => expect(mergeNotifications([row,row])).toHaveLength(1));
  it('review requires capability, pending state and allowlisted type',() => {
    expect(canReview(row,false)).toBe(false);expect(canReview(row,true)).toBe(true);
    expect(canReview({ ...row,type:'user_payment' },true)).toBe(false);expect(canReview({ ...row,status:'approved' },true)).toBe(false);
  });
});
describe('PDF observations',() => {
  const old={ etag:'a',last_modified:'yesterday',content_length:100 };
  it('uses full content range total rather than a one-byte response length',() => expect(observedLength(new Headers({ 'content-range':'bytes 0-0/999','content-length':'1' }))).toBe(999));
  it('preserves missing headers and first observation as baseline',() => {
    expect(versionChanged(old,{ etag:null,last_modified:null,content_length:null })).toBe(false);
    expect(versionChanged({ etag:null,last_modified:null,content_length:null },old)).toBe(false);
    expect(versionChanged(old,{ ...old,etag:'b' })).toBe(true);
  });
  it('does not confirm an event on RPC error or false success',async () => {
    await expect(checkedObservation(async () => ({ data:{ success:true },error:'offline' }))).rejects.toThrow();
    await expect(checkedObservation(async () => ({ data:{ success:false },error:null }))).rejects.toThrow();
    expect(await checkedObservation(async () => ({ data:{ success:true,changed:true },error:null }))).toBe(true);
  });
  it('allowlists existing official source, rejects private/non-https/credential URLs',() => {
    expect(trustedSource('https://www.zbfs.bayern.de/example.pdf')).toBe(true);
    for(const url of ['http://www.zbfs.bayern.de/x','https://127.0.0.1/x','https://user@www.zbfs.bayern.de/x','https://www.zbfs.bayern.de.evil.invalid/x']) expect(trustedSource(url)).toBe(false);
  });
});
describe('staged security/release contract',() => {
  const sql=readFileSync('docs/staged/admin-notifications.sql','utf8');
  it('stages audited admin review and service-only atomic observation without schedules',() => {
    expect(sql).toContain("IF NOT public.has_role(auth.uid(),'admin')");
    expect(sql).toContain('GRANT SELECT ON public.admin_notification_audit TO authenticated');
    expect(sql).toContain('ALTER TABLE public.admin_notification_audit ENABLE ROW LEVEL SECURITY');
    expect(sql).toContain('REVOKE ALL ON FUNCTION public.observe_pdf_version(uuid,text,text,bigint) FROM PUBLIC,anon,authenticated');
    expect(sql).toContain('FOR UPDATE');expect(sql).not.toMatch(/cron\.schedule|net\.http_post|UPDATE public\.profiles/);
  });
  it('checker no longer uses internal email, metadata writes delegated to atomic RPC',() => {
    const source=readFileSync('supabase/functions/check-pdf-versions/index.ts','utf8');
    expect(source).not.toContain('send-transactional-email');expect(source).toContain("client.rpc('observe_pdf_version'");
    expect(source).not.toContain('.update(');
  });
  it('four-locale admin key parity',() => {
    const objects=['bs','hr','sr','de'].map(lang => JSON.parse(readFileSync(`src/i18n/locales/${lang}/common.json`,'utf8')).adminCenter);
    for(const obj of objects) expect(Object.keys(obj).sort()).toEqual(Object.keys(objects[0]).sort());
  });
});