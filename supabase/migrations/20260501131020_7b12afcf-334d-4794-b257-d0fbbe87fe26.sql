UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'hariz.cakor@gmail.com'
  AND email_confirmed_at IS NULL;