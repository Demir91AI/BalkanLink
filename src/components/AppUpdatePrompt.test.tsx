import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import AppUpdatePrompt from './AppUpdatePrompt';

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
const response = (version: string) => ({ ok: true, json: async () => ({ version }) });

it('recovers version detection after a failed initial request without a forced reload', async () => {
  vi.useFakeTimers();
  const fetch = vi.fn().mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce(response('first-success')).mockResolvedValueOnce(response('next-build'));
  vi.stubGlobal('fetch', fetch);
  render(<AppUpdatePrompt />);
  await act(async () => {});
  await act(async () => { await vi.advanceTimersByTimeAsync(5 * 60 * 1000); });
  expect(screen.queryByRole('button', { name: 'Osvježi' })).not.toBeInTheDocument();
  await act(async () => { await vi.advanceTimersByTimeAsync(5 * 60 * 1000); });
  expect(screen.getByRole('button', { name: 'Osvježi' })).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledTimes(3);
});

it('does not announce unchanged versions and stops polling after unmount', async () => {
  vi.useFakeTimers();
  const fetch = vi.fn().mockResolvedValue(response('unchanged'));
  vi.stubGlobal('fetch', fetch);
  const view = render(<AppUpdatePrompt />);
  await act(async () => {});
  await act(async () => { await vi.advanceTimersByTimeAsync(5 * 60 * 1000); });
  expect(screen.queryByRole('button', { name: 'Osvježi' })).not.toBeInTheDocument();
  view.unmount();
  await act(async () => { await vi.advanceTimersByTimeAsync(10 * 60 * 1000); });
  expect(fetch).toHaveBeenCalledTimes(2);
});