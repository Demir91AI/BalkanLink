import { useParams, Navigate } from "react-router-dom";

/**
 * Redirects legacy /guide/:slug and /smart-guide/:slug routes
 * to the canonical /formulari/:slug route.
 */
export default function LegacyGuideRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/formulari/${slug || ""}`} replace />;
}
