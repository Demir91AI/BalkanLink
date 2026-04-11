import type { User } from "@supabase/supabase-js";

interface ProfileData {
  first_name?: string | null;
  name?: string | null;
}

export function getDisplayName(
  user: User | null,
  profile?: ProfileData | null
): string {
  // 1. Profile first_name
  if (profile?.first_name?.trim()) {
    return profile.first_name.trim();
  }
  // 2. Profile name
  if (profile?.name?.trim()) {
    return profile.name.trim();
  }
  // 3. Auth metadata first_name
  const meta = user?.user_metadata;
  if (meta?.first_name?.trim()) {
    return String(meta.first_name).trim();
  }
  // 4. Auth metadata name
  if (meta?.name?.trim()) {
    return String(meta.name).trim();
  }
  // 5. Derive from email
  if (user?.email) {
    const part = user.email.split("@")[0];
    const first = part.split(/[._-]/)[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  }
  // 6. Final fallback
  return "Korisniče";
}
