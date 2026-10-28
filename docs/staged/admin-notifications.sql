-- STAGED ONLY: not applied. No cron, email, publication, user-data or entitlement mutation.
BEGIN;
ALTER TABLE public.admin_notifications
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS occurred_at timestamptz,
  ADD COLUMN IF NOT EXISTS dedupe_key text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS next_retry_at timestamptz;
CREATE UNIQUE INDEX IF NOT EXISTS admin_notification_dedupe ON public.admin_notifications(dedupe_key) WHERE dedupe_key IS NOT NULL;

CREATE TABLE public.admin_notification_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid NOT NULL REFERENCES public.admin_notifications(id) ON DELETE RESTRICT,
  actor_id uuid,
  action text NOT NULL,
  old_status text,
  new_status text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_notification_audit TO authenticated;
GRANT ALL ON public.admin_notification_audit TO service_role;
ALTER TABLE public.admin_notification_audit ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_audit_read ON public.admin_notification_audit FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Central audited status transition. Direct authenticated status/metadata writes are forbidden.
REVOKE UPDATE ON public.admin_notifications FROM authenticated;
GRANT UPDATE(read_at) ON public.admin_notifications TO authenticated;
CREATE OR REPLACE FUNCTION public.admin_notification_capabilities() RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  RETURN jsonb_build_object('version',1);
END $$;
REVOKE ALL ON FUNCTION public.admin_notification_capabilities() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.admin_notification_capabilities() TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_review_notification(p_id uuid,p_action text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n public.admin_notifications%ROWTYPE; next_status text;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  SELECT * INTO n FROM public.admin_notifications WHERE id=p_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not found'; END IF;
  IF p_action='approve' THEN next_status:='approved';
  ELSIF p_action='reject' THEN next_status:='rejected';
  ELSIF p_action='retry' THEN next_status:='retry_pending';
  ELSE RAISE EXCEPTION 'Invalid action'; END IF;
  IF n.status=next_status THEN RETURN jsonb_build_object('success',true,'idempotent',true); END IF;
  IF p_action IN ('approve','reject') AND (n.status<>'pending' OR n.type NOT IN ('pdf_version_changed','legal_change')) THEN RAISE EXCEPTION 'Invalid transition'; END IF;
  IF p_action='retry' AND n.status<>'failed' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
  UPDATE public.admin_notifications SET status=next_status,next_retry_at=CASE WHEN p_action='retry' THEN now() ELSE NULL END,attempts=attempts+CASE WHEN p_action='retry' THEN 1 ELSE 0 END WHERE id=p_id;
  INSERT INTO public.admin_notification_audit(notification_id,actor_id,action,old_status,new_status) VALUES(p_id,auth.uid(),p_action,n.status,next_status);
  -- No editorial/form update, outbound email, publish or billing operation.
  RETURN jsonb_build_object('success',true);
END $$;
REVOKE ALL ON FUNCTION public.admin_review_notification(uuid,text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.admin_review_notification(uuid,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.observe_pdf_version(p_id uuid,p_etag text,p_modified text,p_length bigint) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE old public.external_pdf_versions%ROWTYPE; changed boolean; fingerprint text; event_id uuid;
BEGIN
  SELECT * INTO old FROM public.external_pdf_versions WHERE id=p_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not found'; END IF;
  IF p_length IS NOT NULL AND p_length<0 THEN RAISE EXCEPTION 'Invalid length'; END IF;
  changed := (old.etag IS NOT NULL AND p_etag IS NOT NULL AND old.etag<>p_etag)
    OR (old.last_modified IS NOT NULL AND p_modified IS NOT NULL AND old.last_modified<>p_modified)
    OR (old.content_length IS NOT NULL AND p_length IS NOT NULL AND old.content_length<>p_length);
  IF changed THEN
    -- Include the previous observation time: A→B→A→B remains a new event, while retries on B dedupe.
    fingerprint := 'pdf:'||p_id::text||':'||md5(jsonb_build_array(old.last_checked_at,old.etag,old.last_modified,old.content_length,p_etag,p_modified,p_length)::text);
    INSERT INTO public.admin_notifications(type,severity,title,body,metadata,source,occurred_at,dedupe_key,status)
    VALUES('pdf_version_changed','warning',old.form_key,NULL,
      jsonb_build_object('form_key',old.form_key,'source_url',old.source_url,'old',jsonb_build_object('etag',old.etag,'last_modified',old.last_modified,'content_length',old.content_length),
      'new',jsonb_build_object('etag',p_etag,'last_modified',p_modified,'content_length',p_length)),
      'check-pdf-versions',now(),fingerprint,'pending')
    ON CONFLICT(dedupe_key) WHERE dedupe_key IS NOT NULL DO UPDATE SET dedupe_key=EXCLUDED.dedupe_key RETURNING id INTO event_id;
    INSERT INTO public.admin_notification_audit(notification_id,action,new_status) VALUES(event_id,'observed','pending');
  END IF;
  -- This transaction rolls back BOTH the event and metadata on any failure.
  -- Missing headers retain the last known value; first observation establishes a baseline, not a change.
  UPDATE public.external_pdf_versions SET etag=COALESCE(p_etag,etag),last_modified=COALESCE(p_modified,last_modified),content_length=COALESCE(p_length,content_length),
    last_checked_at=now(),last_changed_at=CASE WHEN changed THEN now() ELSE last_changed_at END WHERE id=p_id;
  -- notified_at remains an untouched legacy email enqueue marker.
  RETURN jsonb_build_object('success',true,'changed',changed,'notification_id',event_id);
END $$;
REVOKE ALL ON FUNCTION public.observe_pdf_version(uuid,text,text,bigint) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.observe_pdf_version(uuid,text,text,bigint) TO service_role;
COMMIT;