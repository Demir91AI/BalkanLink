export function unsubscribeState(ok: boolean, data: { valid?: boolean; success?: boolean; reason?: string; alreadyUnsubscribed?: boolean; already_unsubscribed?: boolean }, method: 'GET' | 'POST') {
  if (!ok) return method === 'GET' ? 'invalid' : 'error';
  if (method === 'POST') return data.success === true ? 'success' : 'error';
  if (data.valid === true) return 'valid';
  if (data.reason === 'already_unsubscribed' || data.alreadyUnsubscribed || data.already_unsubscribed) return 'already';
  return 'invalid';
}