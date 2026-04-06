DROP POLICY "Service role only" ON public.email_jobs;

CREATE POLICY "service_role can manage email_jobs"
ON public.email_jobs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);