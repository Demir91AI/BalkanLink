import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Check, RefreshCw, Trash2, Undo2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import SourceStatus from './SourceStatus';
import { emptySource, settleSource } from '@/lib/admin-center/model';
import { canReview, confirmedRows, mergeNotifications, type AdminNotification } from '@/lib/admin-center/notifications';

export default function AdminNotificationsSection() {
  const { t,i18n } = useTranslation('common'); const a = (key:string) => t(`adminCenter.${key}`);
  const { isAdmin,profileLoading } = useAuth();
  const [items,setItems] = useState<AdminNotification[]>([]);
  const [state,setState] = useState(emptySource);
  const [filter,setFilter] = useState('all');
  const [busy,setBusy] = useState(false);
  const [actionError,setActionError] = useState(false);
  const [capabilities,setCapabilities] = useState(false);
  const [page,setPage] = useState(0);
  const [audit,setAudit] = useState<Record<string,unknown>[]>([]);
  const pending = useRef(false); const alive = useRef(true);
  const load = useCallback(async () => {
    if (!isAdmin || profileLoading || pending.current) return;
    pending.current=true;setState(prev => ({ ...prev,loading:true }));
    try {
      const result = await supabase.from('admin_notifications').select('*').order('created_at',{ ascending:false }).order('id',{ ascending:false }).range(page*100,page*100+99);
      if (!alive.current) return;
      setState(prev => settleSource(prev,{ status:'fulfilled',value:result },new Date().toISOString()));
      if (!result.error && result.data) setItems(mergeNotifications(result.data as AdminNotification[]));
    } catch { if (alive.current) setState(prev => ({ ...prev,error:true,loading:false })); }
    finally { pending.current=false; }
  },[isAdmin,profileLoading,page]);
  useEffect(() => { alive.current=true;void load();const timer=setInterval(() => { if(document.visibilityState==='visible') void load(); },120000);return () => { alive.current=false;clearInterval(timer); }; },[load]);
  useEffect(() => {
    if (!isAdmin || profileLoading) return;
    // One capability probe; no failed-RPC polling or privileged fallback.
    void supabase.rpc('admin_notification_capabilities' as never).then(({ data,error }) => setCapabilities(!error && (data as unknown as { version?:number })?.version===1));
  },[isAdmin,profileLoading]);
  const shown = items.filter(row => filter==='all' || (filter==='unread' ? !row.read_at : !!row.read_at));
  const mark = async (ids:string[],read:boolean) => {
    if (!ids.length || busy) return;setBusy(true);setActionError(false);
    try {
      const stamp=read?new Date().toISOString():null;
      const result=await supabase.from('admin_notifications').update({ read_at:stamp }).in('id',ids).select('id,read_at');
      if (!confirmedRows(result.data,result.error,ids.length)) throw new Error('unconfirmed');
      setItems(prev => prev.map(row => ids.includes(row.id)?{ ...row,read_at:stamp }:row));
    } catch { setActionError(true); } finally { setBusy(false); }
  };
  const remove = async (row:AdminNotification) => {
    if (busy || !window.confirm(a('deleteConfirm'))) return;setBusy(true);setActionError(false);
    try {
      const result=await supabase.from('admin_notifications').delete().eq('id',row.id).select('id');
      if (!confirmedRows(result.data,result.error,1)) throw new Error('unconfirmed');
      setItems(prev => prev.filter(item => item.id!==row.id));
    } catch { setActionError(true); } finally { setBusy(false); }
  };
  const review = async (row:AdminNotification,action:string) => {
    if (!capabilities || busy || !window.confirm(a('reviewConfirm'))) return;setBusy(true);setActionError(false);
    try {
      const result=await supabase.rpc('admin_review_notification' as never,{ p_id:row.id,p_action:action } as never);
      if (result.error || (result.data as unknown as { success?:boolean })?.success!==true) throw new Error('unconfirmed');
      await load();
    } catch { setActionError(true); } finally { setBusy(false); }
  };
  const loadAudit = async () => {
    if (!capabilities || busy) return;setBusy(true);setActionError(false);
    try {
      const result=await supabase.from('admin_notification_audit' as never).select('notification_id,action,created_at').order('created_at',{ ascending:false }).limit(100);
      if (result.error) throw result.error;
      setAudit((result.data ?? []) as unknown as Record<string,unknown>[]);
    } catch { setActionError(true); } finally { setBusy(false); }
  };
  if (!isAdmin || profileLoading) return <p>{a('loading')}</p>;
  return <section className="space-y-4">
    <div className="flex flex-wrap justify-between items-center gap-3"><h2 className="text-xl font-semibold flex items-center gap-2"><Bell className="h-5 w-5 text-primary" />{a('notifications')}</h2><div className="flex flex-wrap gap-2">{['all','unread','read'].map(key => <Button key={key} variant={filter===key?'default':'outline'} aria-pressed={filter===key} onClick={() => setFilter(key)}>{a(key)}</Button>)}<Button variant="outline" disabled={busy || !items.some(row => !row.read_at)} onClick={() => void mark(items.filter(row => !row.read_at).map(row => row.id),true)}>{a('markAll')}</Button></div></div>
    <SourceStatus state={state} source="admin_notifications" clock={Date.now()} retry={() => void load()} />
    <p className="text-sm text-muted-foreground">{a('notificationDefinition')} · {a('unread')}: {items.filter(row => !row.read_at).length}</p>
    {!capabilities && <p className="text-sm border-l-2 border-primary pl-4 text-muted-foreground">{a('staged')}</p>}
    {actionError && <p role="alert" className="text-destructive">{a('actionFailed')}</p>}
    {state.error && <p role="alert" className="text-destructive">{a('error')}</p>}
    {!state.loading && !shown.length && <p className="border border-border rounded-lg py-12 text-center text-muted-foreground">{a('empty')}</p>}
    {shown.map(row => <article key={row.id} className={`border rounded-lg p-4 ${row.read_at?'border-border bg-card':'border-primary bg-muted'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="text-xs text-primary mb-2">{a(row.severity==='error'?'severityError':['info','warning','success'].includes(row.severity)?row.severity:'info')} · {a('source')}: {row.source??row.type}</p><h3 className="font-semibold break-words">{row.title}</h3>{row.body && <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap break-words">{row.body}</p>}<p className="text-xs text-muted-foreground mt-3">{a('occurred')}: {new Date(row.occurred_at??row.created_at).toLocaleString(i18n.language)} · {a('status')}: {row.status?a(row.status):a('snapshot')}</p></div><div className="flex gap-1"><Button size="icon" variant="ghost" title={a(row.read_at?'markUnread':'markRead')} aria-label={a(row.read_at?'markUnread':'markRead')} disabled={busy} onClick={() => void mark([row.id],!row.read_at)}>{row.read_at?<Undo2 className="h-4 w-4" />:<Check className="h-4 w-4" />}</Button>{!row.dedupe_key && <Button size="icon" variant="ghost" title={a('delete')} aria-label={a('delete')} disabled={busy} onClick={() => void remove(row)}><Trash2 className="h-4 w-4" /></Button>}</div></div>
      {canReview(row,capabilities) && <div className="mt-4 space-y-2"><p className="text-xs text-muted-foreground">{a('reviewNote')}</p><div className="flex gap-2"><Button disabled={busy} onClick={() => void review(row,'approve')}>{a('approve')}</Button><Button variant="outline" disabled={busy} onClick={() => void review(row,'reject')}>{a('reject')}</Button></div></div>}
      {capabilities && row.status==='failed' && <Button className="mt-3" variant="outline" disabled={busy} onClick={() => void review(row,'retry')}><RefreshCw className="h-4 w-4 mr-2" />{a('retry')}</Button>}
    </article>)}
    <div className="flex gap-2"><Button variant="outline" disabled={page===0 || state.loading} onClick={() => { setItems([]);setState(emptySource());setPage(p => p-1); }}>{a('backPage')}</Button><Button variant="outline" disabled={items.length<100 || state.loading} onClick={() => { setItems([]);setState(emptySource());setPage(p => p+1); }}>{a('nextPage')}</Button></div>
    <section className="border-t border-border pt-5"><Button variant="outline" disabled={!capabilities || busy} onClick={() => void loadAudit()}>{a('audit')}</Button>{!capabilities && <p className="text-xs text-muted-foreground mt-3">{a('auditUnavailable')}</p>}<ul className="mt-3 space-y-2">{audit.map((row,index) => <li key={index} className="text-sm">{String(row.created_at)} · {String(row.action)} · {String(row.notification_id)}</li>)}</ul></section>
  </section>;
}
