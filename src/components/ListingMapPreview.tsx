import { useStaticMapUrl } from "@/hooks/useGoogleMaps";

interface Props {
  address: string | null;
  name?: string;
  googleMapsUrl?: string | null;
}

export default function ListingMapPreview({ address, name, googleMapsUrl }: Props) {
  const staticUrl = useStaticMapUrl(address, name);

  if (!staticUrl) return null;

  const content = (
    <img
      src={staticUrl}
      alt={`Map: ${name || address}`}
      loading="lazy"
      className="mt-2 h-24 w-full rounded-md object-cover opacity-80 transition-opacity hover:opacity-100"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    />
  );

  if (googleMapsUrl) {
    return (
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name ? `${name}, ${address}` : address || "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  );
}
