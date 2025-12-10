-- Create assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  type TEXT NOT NULL, -- e.g., 'linguistic', 'grammatical', 'contextual'
  score NUMERIC(5, 2),
  feedback JSONB, -- AI-generated feedback
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own assessments." ON assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own assessments." ON assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create learning_paths table
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  progress JSONB, -- e.g., { "module1_id": "completed", "module2_id": "in_progress" }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own learning paths." ON learning_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own learning paths." ON learning_paths FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own learning paths." ON learning_paths FOR UPDATE USING (auth.uid() = user_id);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration_hours INT,
  price NUMERIC(10, 2),
  accreditation TEXT[], -- e.g., ['NBCMI', 'CCHI']
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses are public
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are viewable by everyone." ON courses FOR SELECT USING (TRUE);


-- Create enrollments table (junction table for users and courses)
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  completion_date TIMESTAMPTZ,
  progress NUMERIC(5, 2) DEFAULT 0,
  UNIQUE (user_id, course_id) -- A user can only enroll in a course once
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own enrollments." ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own enrollments." ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own enrollments." ON enrollments FOR UPDATE USING (auth.uid() = user_id);


-- Create certificates table
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
  issue_date DATE DEFAULT NOW(),
  certificate_url TEXT,
  -- Add a unique constraint to ensure a user only gets one certificate per course
  UNIQUE (user_id, course_id)
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own certificates." ON certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own certificates." ON certificates FOR INSERT WITH CHECK (auth.uid() = user_id);


-- Create terminology table
CREATE TABLE terminology (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  language TEXT NOT NULL,
  translation TEXT NOT NULL,
  context TEXT,
  image_url TEXT,
  generic_name TEXT, -- For medication
  brand_name TEXT,    -- For medication
  aliases TEXT[],     -- For medication
  created_by UUID REFERENCES auth.users(id), -- Who added this term (optional)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (term, language) -- Ensure unique terms per language
);

ALTER TABLE terminology ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Terminology is viewable by everyone." ON terminology FOR SELECT USING (TRUE);
-- Potentially add policies for authenticated users to suggest new terms
CREATE POLICY "Authenticated users can insert terms." ON terminology FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- Create resources table (for InterpreLinks)
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- e.g., 'video', 'article', 'document', 'tool'
  url TEXT,
  category TEXT,
  thumbnail_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Resources are viewable by everyone." ON resources FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can insert resources." ON resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create forum_posts table (for InterpreLinks)
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Forum posts are viewable by everyone." ON forum_posts FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert their own forum posts." ON forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own forum posts." ON forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own forum posts." ON forum_posts FOR DELETE USING (auth.uid() = user_id);