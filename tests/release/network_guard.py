"""Fail-closed network guard for Python Playwright release checks (mirrors network-policy.ts)."""
import re
from urllib.parse import urlparse

LOCAL = {'localhost', '127.0.0.1', '::1', '[::1]'}
TOLERATED = [re.compile(r'^flagcdn\.com$', re.I), re.compile(r'(^|\.)fonts\.(googleapis|gstatic)\.com$', re.I)]

def classify(url: str) -> str:
    if re.match(r'^(data|blob|about):', url, re.I): return 'local'
    h = (urlparse(re.sub(r'^ws(s?):', r'http\1:', url)).hostname or '').lower()
    if not h: return 'abort-unexpected'
    if h in LOCAL: return 'local'
    if re.search(r'\.supabase\.(co|in)$', h): return 'backend-mock'
    if any(r.search(h) for r in TOLERATED): return 'abort-tolerated'
    return 'abort-unexpected'

async def install(ctx, unexpected: list):
    """Register BEFORE specific mocks: Playwright runs the latest-registered route first,
    so specific backend mocks win; anything unmocked falls back here and is never sent."""
    async def guard(route):
        u = route.request.url; d = classify(u)
        if d == 'local': return await route.fallback()
        if d == 'backend-mock':
            return await route.fulfill(status=503, json={'error': 'synthetic_unmocked_backend'})
        if d == 'abort-unexpected': unexpected.append(u)
        return await route.abort('blockedbyclient')
    await ctx.route('**/*', guard)
    async def ws(w):
        if classify(w.url) != 'local': await w.close()
        else: w.connect_to_server()
    await ctx.route_web_socket(re.compile('.*'), ws)
