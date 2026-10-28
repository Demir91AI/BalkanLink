import { act,renderHook,waitFor } from '@testing-library/react';
import { beforeEach,describe,it,expect,vi } from 'vitest';
import { useAdminCenter } from '@/hooks/useAdminCenter';
const mock=vi.hoisted(()=>({ rpc:vi.fn() }));
vi.mock('@/integrations/supabase/client',()=>({supabase:mock}));
beforeEach(()=>mock.rpc.mockReset());
describe('isolated admin refresh',()=>{
  it('does not overlap manual batches and retains only failed-source timestamps',async()=>{
    let release:(value:{data:unknown;error:null})=>void=()=>{};
    mock.rpc.mockImplementation((name:string)=>name==='get_admin_stats'?new Promise(resolve=>{release=resolve;}):Promise.resolve({data:[],error:null}));
    const {result}=renderHook(()=>useAdminCenter(true,30));
    await waitFor(()=>expect(mock.rpc).toHaveBeenCalledTimes(4));
    await act(async()=>{await result.current.refresh();});expect(mock.rpc).toHaveBeenCalledTimes(4);
    await act(async()=>{release({data:{totalUsers:3},error:null});});
    await waitFor(()=>expect(result.current.refreshing).toBe(false));
    const timestamp=result.current.sources.stats.fetchedAt;
    mock.rpc.mockImplementation((name:string)=>Promise.resolve(name==='get_admin_stats'?{data:null,error:'offline'}:{data:[],error:null}));
    await act(async()=>{await result.current.refresh();});
    expect(result.current.sources.stats.data).toEqual({totalUsers:3});expect(result.current.sources.stats.fetchedAt).toBe(timestamp);expect(result.current.sources.stats.error).toBe(true);
    expect(result.current.sources.extra.error).toBe(false);
  });
  it('blocks every request without admin authorization',async()=>{
    const {result}=renderHook(()=>useAdminCenter(false,30));
    await act(async()=>{await result.current.refresh();});expect(mock.rpc).not.toHaveBeenCalled();
  });
  it('requests 90-day ledger only, never refetches fixed-window RPCs on period change',async()=>{
    mock.rpc.mockResolvedValue({data:[],error:null});
    const {result,rerender}=renderHook(({period})=>useAdminCenter(true,period),{initialProps:{period:30 as 7|30|90}});
    await waitFor(()=>expect(result.current.refreshing).toBe(false));
    mock.rpc.mockClear();rerender({period:90});
    await waitFor(()=>expect(mock.rpc).toHaveBeenCalledWith('get_usage_aggregates',{_days:90}));
    expect(mock.rpc).toHaveBeenCalledTimes(1);
  });
  it('does not repeatedly retry a failed ledger request',async()=>{
    mock.rpc.mockImplementation((name:string)=>Promise.resolve(name==='get_usage_aggregates'?{data:null,error:'missing'}:{data:[],error:null}));
    const {result}=renderHook(()=>useAdminCenter(true,30));
    await waitFor(()=>expect(result.current.refreshing).toBe(false));
    expect(mock.rpc).toHaveBeenCalledTimes(4);expect(result.current.sources.usage.error).toBe(true);
  });
});