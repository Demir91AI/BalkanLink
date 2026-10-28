// STAGED source only. Requires docs/staged/admin-notifications.sql before deployment.
// Internal form monitoring never invokes user/transactional email infrastructure.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { rejectUnlessServiceRole } from './auth.ts';
import { checkedObservation, observedLength, trustedSource } from './observation.ts';
const corsHeaders = { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type' };
const json = (body:unknown,status=200) => new Response(JSON.stringify(body),{ status,headers:{ ...corsHeaders,'Content-Type':'application/json' } });
async function requestSource(url:string,method:string):Promise<Response> {
  let current=url;
  for(let redirects=0;redirects<=3;redirects++) {
    if(!trustedSource(current)) throw new Error('SOURCE_NOT_ALLOWLISTED');
    const response=await fetch(current,{ method,redirect:'manual',signal:AbortSignal.timeout(15000),headers:method==='GET'?{ Range:'bytes=0-0' }:{} });
    if([301,302,303,307,308].includes(response.status)) {
      const location=response.headers.get('location'); await response.body?.cancel();
      if(!location) throw new Error('REDIRECT_INVALID'); current=new URL(location,current).href;continue;
    }
    return response;
  }
  throw new Error('REDIRECT_LIMIT');
}
Deno.serve(async req => {
  if(req.method==='OPTIONS') return new Response(null,{ headers:corsHeaders });
  const denied=await rejectUnlessServiceRole(req,corsHeaders); if(denied) return denied;
  const url=Deno.env.get('SUPABASE_URL'); const key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!url || !key) return json({ error:'CONFIGURATION_UNAVAILABLE' },503);
  const client=createClient(url,key);
  const { data:rows,error }=await client.from('external_pdf_versions').select('id,source_url');
  if(error) return json({ error:'MONITOR_SOURCE_UNAVAILABLE' },503);
  let changed=0,checked=0,failed=0;
  for(const row of rows ?? []) {
    try {
      let response=await requestSource(row.source_url,'HEAD');
      if(!response.ok) { await response.body?.cancel();response=await requestSource(row.source_url,'GET'); }
      if(!response.ok) { await response.body?.cancel();throw new Error('SOURCE_HTTP_FAILED'); }
      const headers=response.headers; const length=observedLength(headers); await response.body?.cancel();
      const wasChanged=await checkedObservation(() => client.rpc('observe_pdf_version',{ p_id:row.id,p_etag:headers.get('etag'),p_modified:headers.get('last-modified'),p_length:length }));
      checked++; if(wasChanged) changed++;
    } catch { failed++; }
  }
  // Failed observations leave previous metadata untouched for the next monthly/manual run.
  return json({ checked,changes:changed,failed,notification_persisted:changed,notification_queued:false,notification_delivered:null,retry_required:failed>0 },failed?503:200);
});
