const CACHE_NAME = "bl-cache-v9";
const STATIC_ASSETS = ["/", "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png"];
const HASHED_ASSET_RE = /\/assets\/[^/]+-[A-Za-z0-9_-]{6,}\.(js|css|jpg|jpeg|png|svg|woff2?|ttf)$/;

const PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=(), payment=(self), usb=(), magnetometer=(), gyroscope=(), accelerometer=()";

async function addSecurityHeaders(response) {
  // Cannot read or modify opaque / cross-origin / errored responses
  if (!response || response.type === "opaque" || response.type === "opaqueredirect" || response.status === 0) {
    return response;
  }
  try {
    const headers = new Headers(response.headers);
    headers.set("Permissions-Policy", PERMISSIONS_POLICY);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch {
    return response;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET, chrome-extension, etc.
  if (event.request.method !== "GET") return;
  if (!url.protocol.startsWith("http")) return;

  // Cross-origin: do not intercept — let the browser handle it natively.
  // This prevents opaque-response crashes (Stripe, Cloudflare, Supabase, etc.)
  if (url.origin !== self.location.origin) return;

  // Network-first for API/supabase calls (same-origin only at this point)
  if (url.pathname.startsWith("/rest/")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for hashed assets (immutable, safe to cache forever)
  if (HASHED_ASSET_RE.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          try {
            const clone = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
          } catch {}
          return resp;
        });
      }).catch(() => fetch(event.request))
    );
    return;
  }

  // Cache-first for other static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|woff2?|ttf|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          try {
            const clone = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
          } catch {}
          return resp;
        });
      }).catch(() => fetch(event.request))
    );
    return;
  }

  // Network-first for HTML/navigation — add security headers (same-origin only)
  event.respondWith(
    fetch(event.request)
      .then(async (resp) => {
        try {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
        } catch {}
        return addSecurityHeaders(resp);
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return addSecurityHeaders(cached);
        const fallback = await caches.match("/");
        return fallback || Response.error();
      })
  );
});
