import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sourceStale, type SourceState } from '@/lib/admin-center/model';
export default function SourceStatus({ state, source, clock, retry }: { state: SourceState; source: string; clock: number; retry: () => void }) {
  const { t, i18n } = useTranslation('common');
  const key = state.loading ? 'loading' : state.error ? 'stale' : !state.fetchedAt ? 'never' : sourceStale(state, clock) ? 'stale' : 'fresh';
  return <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4" aria-live="polite">
    <span className={state.error ? 'text-destructive' : ''}>{t(`adminCenter.${key}`)}</span>
    <span>{t('adminCenter.source')}: {source}</span>
    {state.fetchedAt && <time dateTime={state.fetchedAt}>{t('adminCenter.asOf')}: {new Date(state.fetchedAt).toLocaleString(i18n.language)}</time>}
    <Button size="icon" variant="ghost" disabled={state.loading} onClick={retry} aria-label={t('adminCenter.refresh')} title={t('adminCenter.refresh')}><RefreshCw className="h-4 w-4" /></Button>
  </div>;
}