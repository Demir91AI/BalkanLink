import { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const SCRIPT_ID = "google-maps-script";

let loadPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if ((window as any).google?.maps) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (document.getElementById(SCRIPT_ID)) {
      const check = setInterval(() => {
        if ((window as any).google?.maps) { clearInterval(check); resolve(); }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export function useGoogleMapsReady() {
  const [ready, setReady] = useState(!!(window as any).google?.maps);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;
    loadGoogleMapsScript().then(() => setReady(true)).catch(console.error);
  }, []);

  return ready;
}

export function useStaticMapUrl(address: string | null, name?: string) {
  if (!address || !GOOGLE_MAPS_API_KEY) return null;
  const q = encodeURIComponent(name ? `${name}, ${address}` : address);
  return `https://maps.googleapis.com/maps/api/staticmap?center=${q}&zoom=15&size=400x200&scale=2&markers=color:red%7C${q}&key=${GOOGLE_MAPS_API_KEY}`;
}
