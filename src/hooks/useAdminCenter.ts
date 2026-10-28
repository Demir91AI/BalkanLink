import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { emptySource, settleSource, type Period, type SourceKey, type SourceState } from '@/lib/admin-center/model';

const initial = (): Record<SourceKey, SourceState> => ({ stats: emptySource(), extra: emptySource(), users: emptySource(), usage: emptySource() });
export function useAdminCenter(enabled: boolean, period: Period) {
  const [sources, setSources] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);
  const [clock, setClock] = useState(Date.now());
  const pending = useRef(false);
  const periodRef = useRef(period); periodRef.current = period;
  const loadedPeriod = useRef<Period | null>(null);
  const alive = useRef(true);
  const refresh = useCallback(async (only?: SourceKey) => {
    if (!enabled || pending.current) return;
    pending.current = true; setRefreshing(true);
    const requestedPeriod = periodRef.current;
    const keys: SourceKey[] = only ? [only] : ['stats','extra','users','usage'];
    setSources(prev => Object.fromEntries(Object.entries(prev).map(([k,v]) => [k, keys.includes(k as SourceKey) ? { ...v, loading: true } : v])) as Record<SourceKey, SourceState>);
    const calls = {
      stats: () => supabase.rpc('get_admin_stats'),
      extra: () => supabase.rpc('get_admin_dashboard_extra'),
      users: () => supabase.rpc('get_admin_users_list', { _limit: 1000 }),
      usage: () => supabase.rpc('get_usage_aggregates', { _days: requestedPeriod }),
    };
    try {
      const results = await Promise.allSettled(keys.map(key => calls[key]()));
      if (!alive.current) return;
      const now = new Date().toISOString();
      setSources(prev => {
        const next = { ...prev };
        keys.forEach((key,index) => {
          const result = results[index];
          if (result) next[key] = settleSource(prev[key], result, now);
          if (key === 'usage' && result?.status === 'fulfilled' && !result.value.error && result.value.data != null) loadedPeriod.current = requestedPeriod;
        });
        return next;
      });
    } finally {
      pending.current = false;
      if (alive.current) { setRefreshing(false); setClock(Date.now()); }
    }
  }, [enabled]);
  useEffect(() => {
    alive.current = true;
    void refresh();
    const interval = setInterval(() => { setClock(Date.now()); if (document.visibilityState === 'visible') void refresh(); }, 120000);
    return () => { alive.current = false; clearInterval(interval); };
  }, [refresh]);
  useEffect(() => {
    // Wait for an in-flight batch rather than silently dropping a period selection.
    if (!enabled || loadedPeriod.current === period) return;
    if (!pending.current) void refresh('usage');
  }, [enabled, period, refreshing, refresh]);
  return { sources, refreshing, refresh, clock, usagePeriod: loadedPeriod.current };
}