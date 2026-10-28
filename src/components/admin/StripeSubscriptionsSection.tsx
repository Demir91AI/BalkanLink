import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { emptySource,record,records,settleSource } from '@/lib/admin-center/model';
import SourceStatus from './SourceStatus';

export default function StripeSubscriptionsSection() {
  const { t,i18n }=useTranslation('common');const a=(key:string)=>t(`adminCenter.${key}`);
  const { isAdmin,profileLoading }=useAuth();
  const [state,setState]=useState(emptySource);const [filter,setFilter]=useState('all');const [busy,setBusy]=useState(false);const [actionError,setActionError]=useState(false);const pending=useRef(false);
  const data=record(state.data);const summary=record(data?.summary);const rows=records(data?.rows);const payments=records(data?.payments);
  const load=async (email?:string) => {
    if (!isAdmin || profileLoading || pending.current) return;
    if(email && !window.confirm(a('confirmSync'))) return;
    pending.current=true;setBusy(true);setActionError(false);setState(prev=>({...prev,loading:true}));
    try {
      const result=await supabase.functions.invoke('stripe-sync-audit',{body:email?{apply:true,email}:{}});
      if(result.error || result.data?.error || !record(result.data?.summary)) throw new Error('unconfirmed');
      setState(prev=>settleSource(prev,{status:'fulfilled',value:result},new Date().toISOString()));
    } catch {setState(prev=>({...prev,error:true,loading:false}));setActionError(true);}finally{pending.current=false;setBusy(false);}
  };
  const normalize=(status:unknown)=>['paid','succeeded'].includes(String(status))?'paid':['failed','canceled','cancelled'].includes(String(status))?'failed':'pendingStatus';
  const filtered=payments.filter(row=>filter==='all'||normalize(row.status)===filter);
  const fmt=(value:unknown)=>typeof value==='string'?new Date(value).toLocaleDateString(i18n.language):'—';
  if(!isAdmin || profileLoading) return <p>{a('loading')}</p>;
  return <section className="space-y-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">{a('stripe')}</h2><Button variant="outline" disabled={busy} onClick={()=>void load()}><RefreshCw className="h-4 w-4 mr-2" />{a('stripeLoad')}</Button></div><p className="text-sm text-muted-foreground">{a('stripeDefinition')}</p><SourceStatus state={state} source="stripe-sync-audit" clock={Date.now()} retry={()=>void load()} />{!state.data && !busy && <p>{a('notRun')}</p>}{actionError && <p role="alert" className="text-destructive">{a('actionFailed')}</p>}
    {summary && <><div className="grid sm:grid-cols-3 gap-3">{[['stripeSubscriptions','stripe'],['stripeActive','active'],['mismatches','mismatches']].map(([key,label])=><article key={key} className="border border-border rounded-lg bg-card p-4"><h3 className="text-sm text-muted-foreground">{a(label)}</h3><p className="text-2xl mt-2 tabular-nums">{typeof summary[key]==='number'?String(summary[key]):'—'}</p></article>)}</div>
    <div className="overflow-x-auto rounded-lg border border-border"><table className="w-full text-sm text-left"><thead className="bg-muted"><tr>{['email','status','periodEnd','dbEnd','difference','actions'].map(key=><th className="p-3 font-medium text-muted-foreground" key={key}>{a(key)}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr className="border-t border-border" key={index}><td className="p-3 break-words">{String(row.email??'—')}{row.issue!=null && <p className="text-xs text-muted-foreground">{String(row.issue)}</p>}</td><td className="p-3">{String(row.stripe_status??'—')}{row.cancel_at_period_end===true && <p className="text-xs">{a('canceling')}</p>}</td><td className="p-3 whitespace-nowrap">{fmt(row.stripe_period_end)}</td><td className="p-3 whitespace-nowrap">{fmt(row.db_expires_at)}</td><td className="p-3">{String(row.diff_days??'—')}</td><td className="p-3"><Button variant="outline" size="sm" disabled={busy||!row.user_id||typeof row.email!=='string'} onClick={()=>typeof row.email==='string' && void load(row.email)}>{a('resync')}</Button></td></tr>)}</tbody></table>{!rows.length && <p className="p-6 text-muted-foreground">{a('empty')}</p>}</div>
    <h3 className="text-lg font-medium">{a('auditRecord')} · payments</h3><p className="text-sm text-muted-foreground">{a('revenueUnknown')}</p><div className="flex flex-wrap gap-2">{['all','paid','failed','pendingStatus'].map(key=><Button key={key} variant={filter===key?'default':'outline'} onClick={()=>setFilter(key)}>{a(key)}</Button>)}</div><div className="overflow-x-auto border border-border rounded-lg"><table className="w-full text-sm text-left"><thead className="bg-muted"><tr>{['email','value','status','date','created'].map(key=><th className="p-3 font-medium" key={key}>{a(key)}</th>)}</tr></thead><tbody>{filtered.map((row,index)=><tr className="border-t border-border" key={index}><td className="p-3">{String(row.email??'—')}</td><td className="p-3">{typeof row.amount==='number'?(row.amount/100).toFixed(2):'—'} {String(row.currency??'')}</td><td className="p-3">{a(normalize(row.status))}</td><td className="p-3">{fmt(row.paid_at)}</td><td className="p-3">{fmt(row.created_at)}</td></tr>)}</tbody></table>{!filtered.length && <p className="p-6 text-muted-foreground">{a('empty')}</p>}</div></>}
  </section>;
}
