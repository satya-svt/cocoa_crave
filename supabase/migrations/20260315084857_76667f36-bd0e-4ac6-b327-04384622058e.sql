
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feedback" ON public.feedback
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No one can read feedback from client" ON public.feedback
  FOR SELECT TO anon, authenticated
  USING (false);
