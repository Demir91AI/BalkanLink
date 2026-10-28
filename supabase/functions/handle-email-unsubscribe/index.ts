import { createClient } from 'npm:@supabase/supabase-js@2'
import { completeUnsubscribe, tokenValidation } from './recovery.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseServiceKey) {
    return jsonResponse({ error: 'Server configuration error' }, 500)
  }

  // Extract token from query params (GET) or body (POST)
  const url = new URL(req.url)
  let token: string | null = url.searchParams.get('token')

  if (req.method === 'POST') {
    // Detect RFC 8058 one-click unsubscribe: POST with form-encoded body
    // containing "List-Unsubscribe=One-Click". Email clients (Gmail, Apple Mail,
    // etc.) send this when the user clicks "Unsubscribe" in the mail UI.
    const contentType = req.headers.get('content-type') ?? ''
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formText = await req.text()
      const params = new URLSearchParams(formText)
      // For one-click, token comes from query param (already set above).
      // Otherwise, token may be in the form body.
      if (!params.get('List-Unsubscribe')) {
        const formToken = params.get('token')
        if (formToken) {
          token = formToken
        }
      }
    } else {
      // JSON body (from the app's unsubscribe page)
      try {
        const body = await req.json()
        if (body.token) {
          token = body.token
        }
      } catch {
        // Fall through — token stays from query param
      }
    }
  }

  if (!token) {
    return jsonResponse({ error: 'Token is required' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Look up the token
  const { data: tokenRecord, error: lookupError } = await supabase
    .from('email_unsubscribe_tokens')
    .select('*')
    .eq('token', token)
    .maybeSingle()

  if (lookupError) return jsonResponse({ error: 'Failed to process unsubscribe' }, 500)
  if (!tokenRecord) {
    return jsonResponse({ error: 'Invalid or expired token' }, 404)
  }

  // GET: Validate token (the app's unsubscribe page calls this on load)
  if (req.method === 'GET') {
    if (!tokenRecord.used_at) return jsonResponse({ valid: true })
    const { data: suppressed, error } = await supabase.from('suppressed_emails')
      .select('email').eq('email', tokenRecord.email.toLowerCase()).maybeSingle()
    if (error) return jsonResponse({ error: 'Failed to process unsubscribe' }, 500)
    // Old partial failures must offer a recoverable POST, not claim an unverified opt-out.
    return jsonResponse(tokenValidation(true, !!suppressed))
  }

  try {
    return jsonResponse(await completeUnsubscribe({
      suppress: async () => {
        const { error } = await supabase.from('suppressed_emails').upsert(
          { email: tokenRecord.email.toLowerCase(), reason: 'unsubscribe' }, { onConflict: 'email' },
        )
        if (error) throw error
      },
      markUsed: async () => {
        if (tokenRecord.used_at) return
        const { error } = await supabase.from('email_unsubscribe_tokens')
          .update({ used_at: new Date().toISOString() }).eq('token', token).is('used_at', null)
        if (error) throw error
        // A concurrent POST can have marked it already; suppression was confirmed first.
      },
    }))
  } catch {
    console.error('Unsubscribe persistence failed')
    return jsonResponse({ error: 'Failed to process unsubscribe' }, 500)
  }
})
