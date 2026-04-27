REVOKE EXECUTE ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.consume_doc_check_credit(uuid) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.consume_doc_check_credit(uuid) TO service_role;