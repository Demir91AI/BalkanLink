// Verifies that a bearer token is a GENUINE service-role key.
// Decoding the JWT payload alone is not enough (anyone can forge an unsigned
// payload with role=service_role). We first do a cheap claim check, then let the
// auth server verify the signature via an admin-only endpoint.

function decodeClaims(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const p = parts[1].replaceAll("-", "+").replaceAll("_", "/");
    return JSON.parse(atob(p.padEnd(Math.ceil(p.length / 4) * 4, "="))) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function bearerToken(req: Request): string {
  const h = req.headers.get("Authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7).trim() : "";
}

export async function isServiceRoleToken(
  token: string,
  supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "",
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  if (!token || !supabaseUrl) return false;
  if (decodeClaims(token)?.role !== "service_role") return false;
  try {
    const res = await fetchImpl(`${supabaseUrl}/auth/v1/admin/users?page=1&per_page=1`, {
      headers: { apikey: token, Authorization: `Bearer ${token}` },
    });
    await res.body?.cancel();
    return res.ok;
  } catch {
    return false; // fail closed
  }
}
