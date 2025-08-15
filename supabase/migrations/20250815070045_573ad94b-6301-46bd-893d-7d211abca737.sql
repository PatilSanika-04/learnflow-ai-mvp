-- Create comprehensive LMS database schema

-- Add role-based access to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'student' CHECK (role IN ('admin', 'instructor', 'student'));

-- Assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  instructions text,
  due_date timestamp with time zone,
  max_points integer DEFAULT 100,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Assignment submissions
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  submission_text text,
  file_url text,
  submitted_at timestamp with time zone DEFAULT now(),
  grade integer,
  feedback text,
  graded_at timestamp with time zone,
  graded_by uuid
);

-- Discussion forums
CREATE TABLE IF NOT EXISTS public.discussions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  is_pinned boolean DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Discussion posts
CREATE TABLE IF NOT EXISTS public.discussion_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id uuid NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  parent_post_id uuid REFERENCES public.discussion_posts(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Announcements
CREATE TABLE IF NOT EXISTS public.announcements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  is_global boolean DEFAULT false,
  is_pinned boolean DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Progress tracking for lessons
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed boolean DEFAULT false,
  time_spent_minutes integer DEFAULT 0,
  last_accessed timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone
);

-- Quiz attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id uuid NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  score integer DEFAULT 0,
  total_points integer DEFAULT 0,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  answers jsonb
);

-- Course modules for better organization
CREATE TABLE IF NOT EXISTS public.modules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Link lessons to modules
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS module_id uuid REFERENCES public.modules(id) ON DELETE SET NULL;

-- Enable RLS on all new tables
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assignments
CREATE POLICY "Assignments viewable by enrolled users" ON public.assignments
  FOR SELECT USING (is_published = true);

CREATE POLICY "Instructors can manage course assignments" ON public.assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = assignments.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- RLS Policies for assignment submissions
CREATE POLICY "Users can view their own submissions" ON public.assignment_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions" ON public.assignment_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Instructors can view and grade submissions" ON public.assignment_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON a.course_id = c.id
      WHERE a.id = assignment_submissions.assignment_id
      AND c.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can update grades" ON public.assignment_submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON a.course_id = c.id
      WHERE a.id = assignment_submissions.assignment_id
      AND c.instructor_id = auth.uid()
    )
  );

-- RLS Policies for discussions
CREATE POLICY "Discussions viewable by enrolled users" ON public.discussions
  FOR SELECT USING (true);

CREATE POLICY "Enrolled users can create discussions" ON public.discussions
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for discussion posts
CREATE POLICY "Discussion posts viewable by everyone" ON public.discussion_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create discussion posts" ON public.discussion_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.discussion_posts
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for announcements
CREATE POLICY "Announcements viewable by everyone" ON public.announcements
  FOR SELECT USING (true);

CREATE POLICY "Instructors and admins can create announcements" ON public.announcements
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    (
      is_global = false AND EXISTS (
        SELECT 1 FROM public.courses 
        WHERE courses.id = announcements.course_id 
        AND courses.instructor_id = auth.uid()
      )
      OR 
      is_global = true AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.user_id = auth.uid() 
        AND profiles.role IN ('admin', 'instructor')
      )
    )
  );

-- RLS Policies for lesson progress
CREATE POLICY "Users can view their own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for quiz attempts
CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts" ON public.quiz_attempts
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for modules
CREATE POLICY "Published modules viewable by enrolled users" ON public.modules
  FOR SELECT USING (is_published = true);

CREATE POLICY "Instructors can manage course modules" ON public.modules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = modules.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to new tables
CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON public.discussions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussion_posts_updated_at
  BEFORE UPDATE ON public.discussion_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();