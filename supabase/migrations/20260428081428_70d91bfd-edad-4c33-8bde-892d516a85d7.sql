
REVOKE EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.deactivate_expired_trials() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.deactivate_expired_trials() TO service_role;
