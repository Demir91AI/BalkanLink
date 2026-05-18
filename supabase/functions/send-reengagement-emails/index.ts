// Scheduled dispatcher: finds inactive users and enqueues re-engagement emails.
// Triggered by pg_cron daily. Idempotent via reengagement_*_sent_at columns.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const payload = parts[1].replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
    return JSON.parse(atob(payload)) as Record<string, unknown>
  } catch { return null }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  // Require service-role JWT — cron-only endpoint.
  const authHeader = req.headers.get('Authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''
  if (!token || parseJwtClaims(token)?.role !== 'service_role') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey)

  const now = new Date()
  const d7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const d8 = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
  const d30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const d31 = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString()

  const results = { sent_7d: 0, sent_30d: 0, errors: [] as string[] }

  const sendBatch = async (
    template: 'reengagement-7d' | 'reengagement-30d',
    field: 'reengagement_7d_sent_at' | 'reengagement_30d_sent_at',
    fromIso: string,
    toIso: string,
  ) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, first_name, preferred_lang')
      .gte('last_login_at', fromIso)
      .lte('last_login_at', toIso)
      .is(field, null)
      .eq('email_opt_out', false)
      .not('email', 'is', null)
      .limit(100)

    if (error) {
      results.errors.push(`${template} query: ${error.message}`)
      return 0
    }

    let count = 0
    for (const u of data || []) {
      try {
        const { error: invErr } = await supabase.functions.invoke('send-transactional-email', {
          body: {
            templateName: template,
            recipientEmail: u.email,
            idempotencyKey: `${template}-${u.id}`,
            templateData: { name: u.first_name || undefined, lang: u.preferred_lang || 'bs' },
          },
        })
        if (invErr) throw invErr
        await supabase.from('profiles').update({ [field]: now.toISOString() }).eq('id', u.id)
        count++
      } catch (err: any) {
        results.errors.push(`${template} ${u.email}: ${err.message}`)
      }
    }
    return count
  }

  results.sent_7d = await sendBatch('reengagement-7d', 'reengagement_7d_sent_at', d8, d7)
  results.sent_30d = await sendBatch('reengagement-30d', 'reengagement_30d_sent_at', d31, d30)

  return new Response(JSON.stringify(results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})
