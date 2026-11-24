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

function constantTimeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Accepts: exact match with this project's service key (any format), or a
// service_role JWT / sb_secret_ key that the auth server confirms. Fails closed.
export async function isServiceRoleToken(
  token: string,
  supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "",
  fetchImpl: typeof fetch = fetch,
  serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
): Promise<boolean> {
  if (!token) return false;
  if (constantTimeEqual(token, serviceKey)) return true;
  if (!supabaseUrl) return false;
  const isSecretKey = token.startsWith("sb_secret_");
  if (!isSecretKey && decodeClaims(token)?.role !== "service_role") return false;
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
