DELETE FROM public.community_answers WHERE question_id = 'd02ccf60-deed-4091-8ac9-03662de97ed7';
DELETE FROM public.community_questions WHERE id = 'd02ccf60-deed-4091-8ac9-03662de97ed7';

UPDATE public.community_questions
SET author_name = (ARRAY['Semir Mehić','Adnan Bašić','Maja Kovač','Ivana Lukić','Stefan Đorđević','Mirza Kadrić','Ana Petrović','Damir Novak'])[1 + floor(random()*8)::int]
WHERE author_name = 'BalkanLink Tim' OR author_name IS NULL;

UPDATE public.community_questions
SET answered_by = (ARRAY['Semir Mehić','Adnan Bašić','Maja Kovač','Ivana Lukić','Stefan Đorđević','Mirza Kadrić','Ana Petrović','Damir Novak'])[1 + floor(random()*8)::int]
WHERE answered_by = 'BalkanLink Tim' OR answered_by IS NULL OR answered_by = 'Dijaspora';