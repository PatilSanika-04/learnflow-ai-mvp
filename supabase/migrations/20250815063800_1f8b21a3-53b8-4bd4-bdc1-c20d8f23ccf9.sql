-- Create sample enrollments for the current user to see dashboard content
INSERT INTO public.enrollments (user_id, course_id, progress_percentage, enrolled_at) VALUES
(
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM public.courses WHERE title = 'Spanish for Beginners' LIMIT 1),
  25,
  now() - interval '5 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM public.courses WHERE title = 'French Conversation Mastery' LIMIT 1),
  75,
  now() - interval '10 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM public.courses WHERE title = 'German Grammar Fundamentals' LIMIT 1),
  100,
  now() - interval '15 days'
);