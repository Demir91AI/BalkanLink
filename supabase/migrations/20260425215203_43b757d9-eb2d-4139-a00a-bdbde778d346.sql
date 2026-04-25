UPDATE public.profiles
SET is_premium = true,
    subscription_tier = 'premium',
    subscription_expires_at = (now() + interval '31 days')
WHERE id = '1d756d92-6de1-45cd-83de-e79593fad9c1';