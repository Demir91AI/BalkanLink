import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Activity, Bell, ChartNoAxesCombined, Download, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminCenter } from '@/hooks/useAdminCenter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageNavBar from '@/components/navigation/PageNavBar';
import StripeSubscriptionsSection from '@/components/admin/StripeSubscriptionsSection';
import StripeSyncLogSection from '@/components/admin/StripeSyncLogSection';
import AdminNotificationsSection from '@/components/admin/AdminNotificationsSection';
import SourceStatus from '@/components/admin/SourceStatus';
import { downloadCsv, periodMetric, profilePlan, record, records, sourceHeading, type Period, type ProfileRow, type SourceKey } from '@/lib/admin-center/model';

const tabs = ['overview','revenue','users','traffic','features','stripe','sync','notifications','trainer','assistant','geo','costs','goals'] as const;
type Tab = typeof tabs[number];
const sourcesFor: Partial<Record<Tab, SourceKey>> = { overview:'stats', users:'users', traffic:'extra', features:'extra', trainer:'extra', assistant:'extra', geo:'extra', costs:'usage', goals:'stats', revenue:'stats' };

function Metric({ label, value, definition }: { label: string; value: unknown; definition: string }) {
  return <article className="rounded-lg border border-border bg-card p-4 min-w-0">
    <h2 className="text-sm font-medium text-muted-foreground">{label}</h2>
    <p className="my-3 text-3xl font-semibold tabular-nums text-foreground">{typeof value === 'number' ? value.toLocaleString() : typeof value === 'string' ? value : '—'}</p>
    <p className="text-xs leading-relaxed text-muted-foreground">{definition}</p>
  </article>;
}
function DataTable({ rows, columns }: { rows: Record<string, unknown>[]; columns: { key: string; label: string }[] }) {
  const { t } = useTranslation('common');
  if (!rows.length) return <p className="text-sm text-muted-foreground py-6">{t('adminCenter.empty')}</p>;
  return <div className="overflow-x-auto border border-border rounded-lg"><table className="w-full text-sm text-left"><thead className="bg-muted text-muted-foreground"><tr>{columns.map(c => <th key={c.key} className="px-4 py-3 font-medium whitespace-nowrap">{c.label}</th>)}</tr></thead><tbody>{rows.map((row,index) => <tr key={String(row.id ?? index)} className="border-t border-border">{columns.map(c => <td key={c.key} className="px-4 py-3 max-w-sm break-words tabular-nums">{row[c.key] == null ? '—' : String(row[c.key])}</td>)}</tr>)}</tbody></table></div>;
}
function Series({ rows, value, label }: { rows: Record<string, unknown>[]; value: string; label: string }) {
  const { t } = useTranslation('common');
  if (!rows.length) return <p className="py-8 text-muted-foreground">{t('adminCenter.empty')}</p>;
  return <div className="h-64 w-full min-w-0" role="img" aria-label={label}><ResponsiveContainer width="100%" height="100%"><BarChart data={rows} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}><CartesianGrid stroke="hsl(var(--border))" vertical={false} /><XAxis dataKey="day" tick={{ fill:'hsl(var(--muted-foreground))', fontSize:12 }} /><YAxis allowDecimals={false} tick={{ fill:'hsl(var(--muted-foreground))', fontSize:12 }} /><Tooltip contentStyle={{ background:'hsl(var(--popover))', color:'hsl(var(--foreground))', borderColor:'hsl(var(--border))' }} /><Bar dataKey={value} name={label} fill="hsl(var(--primary))" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></div>;
}

export default function AdminDashboard() {
  const { t, i18n } = useTranslation('common');
  const a = (key: string) => t(`adminCenter.${key}`);
  const { isAdmin, profileLoading } = useAuth();
  const [tab,setTab] = useState<Tab>('overview');
  const [period,setPeriod] = useState<Period>(30);
  const [search,setSearch] = useState('');
  const [planFilter,setPlanFilter] = useState('all');
  const [userPage,setUserPage] = useState(0);
  const [target,setTarget] = useState(50);
  const { sources, refreshing, refresh, clock, usagePeriod } = useAdminCenter(isAdmin && !profileLoading, period);
  const stats = record(sources.stats.data);
  const extra = record(sources.extra.data);
  const users = records(sources.users.data) as unknown as ProfileRow[];
  const usage = records(sources.usage.data);
  const plans = useMemo(() => Object.fromEntries(['trial','annual','lifetime','legacy','free','expired'].map(plan => [plan,users.filter(row => profilePlan(row,clock) === plan).length])), [users,clock]);
  const filtered = users.filter(row => (planFilter === 'all' || profilePlan(row,clock) === planFilter) && `${row.email} ${row.first_name ?? ''}`.toLowerCase().includes(search.toLowerCase()));
  const userRows = filtered.slice(userPage*50,(userPage+1)*50).map(row => ({ ...row, plan:a(profilePlan(row,clock)) }));
  const active = record(extra?.asistentStats);
  const source = sourcesFor[tab];
  const labels: Record<SourceKey,string> = { stats:'get_admin_stats',extra:'get_admin_dashboard_extra',users:'get_admin_users_list',usage:`get_usage_aggregates (${usagePeriod ?? period}d)` };
  const header = (key:string) => <h2 className="text-lg font-semibold mb-3">{a(key)}</h2>;
  const col = (key:string,label=key) => ({ key,label:a(label) });
  const countRows = (obj: unknown) => Object.entries(record(obj) ?? {}).filter(([,value]) => typeof value === 'number').map(([key,value]) => ({ source:key,value }));
  const chartRows = records(stats?.viewsByDay).filter(row => typeof row.day === 'string' && Date.parse(row.day) >= clock - period*86400000);
  const links = [{ path:'/admin/forms',key:'forms' },{ path:'/admin/trialovi',key:'trials' },{ path:'/admin/pitanja',key:'questions' },{ path:'/admin/stripe-sync',key:'billing' }];
  const prefix = ['de','hr','sr'].includes(i18n.language) ? `/${i18n.language}` : '';
  if (!isAdmin || profileLoading) return <p className="p-8 text-muted-foreground">{a('loading')}</p>;
  return <div className="admin-control-surface guide-dark-surface min-h-screen bg-background text-foreground">
    <Helmet><title>{a('title')} · BalkanLink</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <div className="mx-auto max-w-[1440px] px-4 md:px-8">
      <PageNavBar showShare={false} />
      <header className="py-6 border-b border-border flex flex-wrap items-start justify-between gap-5">
        <div><div className="flex items-center gap-2 text-primary text-sm mb-2"><ShieldCheck className="h-4 w-4" />BalkanLink</div><h1 className="text-2xl md:text-3xl font-semibold">{a('title')}</h1><p className="text-sm mt-2 text-muted-foreground">{new Date(clock).toLocaleDateString(i18n.language)} · {a('snapshot')}</p></div>
        <div className="flex flex-wrap gap-2 items-center"><label className="sr-only" htmlFor="admin-period">{a('period')}</label><select id="admin-period" className="bg-card border border-border rounded-md px-3 h-10 text-sm" value={period} onChange={e => setPeriod(Number(e.target.value) as Period)}>{[7,30,90].map(days => <option key={days} value={days}>{t('adminCenter.days',{ count:days })}</option>)}</select><Button variant="outline" disabled={refreshing} onClick={() => void refresh()}><RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />{a('refresh')}</Button></div>
      </header>
      <nav className="py-4 flex gap-1 overflow-x-auto border-b border-border" aria-label={a('title')}>{tabs.map(key => <Button key={key} variant={tab===key?'default':'ghost'} className="shrink-0" aria-pressed={tab===key} onClick={() => setTab(key)}>{key==='overview' && <ChartNoAxesCombined className="h-4 w-4 mr-2" />}{key==='notifications' && <Bell className="h-4 w-4 mr-2" />}{a(key)}</Button>)}</nav>
      <main className="py-6 space-y-6 min-w-0">
        {source && <SourceStatus state={sources[source]} source={labels[source]} clock={clock} retry={() => void refresh(source)} />}
        {source && sources[source].error && !sources[source].data && <p role="alert" className="text-destructive">{a('error')}</p>}
        {tab === 'overview' && <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"><Metric label={a('totalUsers')} value={stats?.totalUsers} definition={a('profileDefinition')} /><Metric label={a('registrations')} value={periodMetric(stats,'new',period)} definition={period===90?a('unsupported'):a('profileDefinition')} /><Metric label={a('views')} value={periodMetric(stats,'views',period)} definition={period===90?a('unsupported'):a('viewDefinition')} /><Metric label={a('chat')} value={periodMetric(stats,'chat',period)} definition={period===90?a('unsupported'):a('legacyDefinition')} /></div>
          <SourceStatus state={sources.users} source={labels.users} clock={clock} retry={() => void refresh('users')} />
          {header('plan')}<p className="text-sm text-muted-foreground">{a('directoryDefinition')}{users.length>=1000 && ` ${a('limited')}`}</p>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">{Object.entries(plans).map(([key,value]) => <Metric key={key} label={a(key)} value={sources.users.data ? value : null} definition={a('snapshot')} />)}</div>
          <section className="border-t border-border pt-5">{header('traffic')}<p className="text-sm text-muted-foreground mb-4">{a('fixed')} get_admin_stats · 14d</p><Series rows={chartRows} value="views" label={a('views')} /><DataTable rows={chartRows} columns={[col('day','date'),col('views')]} /></section>
          <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">{a('conversionUnknown')}</p>
          <section>{header('actions')}<div className="flex flex-wrap gap-2">{links.map(link => <Button key={link.key} variant="outline" asChild><Link to={`${prefix}${link.path}`}>{a(link.key)}</Link></Button>)}</div></section>
        </>}
        {tab === 'revenue' && <><h2 className="text-xl font-semibold">{a('verifiedRevenue')}</h2><p className="text-muted-foreground">{a('revenueUnknown')}</p><p className="text-sm text-muted-foreground">{a('conversionUnknown')}</p><Button variant="outline" onClick={() => setTab('stripe')}>{a('stripe')}</Button></>}
        {tab === 'users' && <>{header('users')}<p className="text-muted-foreground text-sm">{a('directoryDefinition')}{users.length>=1000 && ` ${a('limited')}`}</p><div className="flex flex-wrap gap-3"><Input aria-label={a('search')} placeholder={a('search')} value={search} className="max-w-sm" onChange={e => { setSearch(e.target.value);setUserPage(0); }} /><select aria-label={a('plan')} className="bg-card border border-border rounded-md px-3" value={planFilter} onChange={e => { setPlanFilter(e.target.value);setUserPage(0); }}><option value="all">{a('all')}</option>{Object.keys(plans).map(key => <option key={key} value={key}>{a(key)}</option>)}</select></div><DataTable rows={userRows} columns={[col('email'),col('first_name','name'),col('plan'),col('created_at','created'),col('last_login_at','lastLogin')]} /><div className="flex gap-2"><Button variant="outline" disabled={userPage===0} onClick={() => setUserPage(p => p-1)}>{a('backPage')}</Button><Button variant="outline" disabled={(userPage+1)*50>=filtered.length} onClick={() => setUserPage(p => p+1)}>{a('nextPage')}</Button></div></>}
        {tab === 'traffic' && <>{header('traffic')}<p className="text-muted-foreground text-sm">{a('fixed')} · 30d. {a('viewDefinition')}</p>{['deviceSplit','browserSplit','sourceSplit','viewsByHour','dailyAuthVsAnon','topPaths30d'].map(key => <section key={key}><h3 className="font-medium mb-3">{a(sourceHeading(key))}</h3><DataTable rows={Array.isArray(extra?.[key]) ? records(extra?.[key]) : countRows(extra?.[key])} columns={Array.isArray(extra?.[key]) ? Object.keys(records(extra?.[key])[0] ?? {}).map(k => ({ key:k,label:a(k) })) : [col('source'),col('value')]} /></section>)}</>}
        {tab === 'features' && <>{header('features')}<p className="text-muted-foreground text-sm">{a('fixed')} · 30d. {a('viewDefinition')} {a('legacyDefinition')}</p><DataTable rows={countRows(extra?.featureUsage)} columns={[col('source'),col('value')]} /><DataTable rows={records(extra?.formsBreakdown)} columns={[col('form','forms'),col('opens','count')]} /><DataTable rows={records(extra?.visaByCountry)} columns={[col('country','geo'),col('views')]} /></>}
        {tab === 'trainer' && <>{header('trainer')}<p className="text-muted-foreground text-sm">{a('snapshot')} · trainer_progress</p><DataTable rows={countRows(extra?.trainerStats)} columns={[col('source'),col('value')]} /><DataTable rows={records(extra?.trainerLevels)} columns={['level','users','avg_done','total_xp'].map(key => ({ key,label:a(k)ey }))} /></>}
        {tab === 'assistant' && <>{header('assistant')}<p className="text-muted-foreground text-sm">{a('fixed')} · 30d. {a('legacyDefinition')}</p><div className="grid sm:grid-cols-2 gap-3"><Metric label={a('activeUsers')} value={active?.uniqueUsers30d} definition={a('activityDefinition')} /><Metric label={a('chat')} value={active?.q30d} definition={a('legacyDefinition')} /></div><Series rows={records(extra?.asistentByDay)} value="q" label={a('chat')} /><DataTable rows={records(extra?.asistentByDay)} columns={[col('day','date'),col('q','count')]} /><p className="text-muted-foreground">{a('costUnknown')}</p></>}
        {tab === 'geo' && <>{header('geo')}<p className="text-muted-foreground text-sm">{a('fixed')} · 30d; page_views</p>{['topCountries30d','topCities30d','languageSplit'].map(key => <section key={key}><h3 className="mb-3">{a(sourceHeading(key))}</h3><DataTable rows={records(extra?.[key])} columns={Object.keys(records(extra?.[key])[0] ?? {}).map(k => ({ key:k,label:a(k) }))} /></section>)}</>}
        {tab === 'costs' && <>{header('ledger')}<p className="text-muted-foreground">{a('ledgerDefinition')}</p><p className="text-muted-foreground">{a('costUnknown')}</p><Button variant="outline" disabled={!usage.length || usagePeriod!==period || sources.usage.error} onClick={() => downloadCsv([['feature','source','mode','status','shadow','n','days','fetched_at'],...usage.map(row => [row.feature,row.source,row.mode,row.status,row.shadow,row.n,usagePeriod,sources.usage.fetchedAt])],`balkanlink-usage-${period}d.csv`)}><Download className="h-4 w-4 mr-2" />{a('export')}</Button><DataTable rows={usagePeriod===period?usage:[]} columns={['feature','source','mode','status','shadow','n'].map(key => ({ key,label:a(k)ey }))} /></>}
        {tab === 'goals' && <>{header('goals')}<p className="text-muted-foreground">{a('targetDefinition')}</p><label className="flex flex-wrap gap-4 items-center">{a('target')}<Input className="w-28" type="number" min={1} value={target} onChange={e => setTarget(Math.max(1,Number(e.target.value)||1))} /></label><Metric label={a('totalUsers')} value={stats?.totalUsers} definition={`${a('target')}: ${target}`} /><p className="text-muted-foreground">{a('revenueUnknown')}</p></>}
        {tab === 'stripe' && <StripeSubscriptionsSection />}
        {tab === 'sync' && <StripeSyncLogSection />}
        {tab === 'notifications' && <AdminNotificationsSection />}
      </main>
    </div>
  </div>;
}
