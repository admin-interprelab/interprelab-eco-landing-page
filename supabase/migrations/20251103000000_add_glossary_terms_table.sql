-- Create glossary_terms table for InterpreStudy feature
CREATE TABLE IF NOT EXISTS public.glossary_terms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    term VARCHAR(255) NOT NULL,
    definition TEXT NOT NULL,
    language_pair VARCHAR(10) NOT NULL, -- e.g., 'en-es', 'en-fr'
    category VARCHAR(100), -- e.g., 'medical', 'legal', 'general'
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

    -- Ensure unique terms per user and language pair
    UNIQUE(user_id, term, language_pair)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_glossary_terms_user_id ON public.glossary_terms(user_id);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_language_pair ON public.glossary_terms(language_pair);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_category ON public.glossary_terms(category);

-- Enable Row Level Security
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own glossary terms" ON public.glossary_terms
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own glossary terms" ON public.glossary_terms
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own glossary terms" ON public.glossary_terms
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own glossary terms" ON public.glossary_terms
    FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_glossary_terms_updated_at
    BEFORE UPDATE ON public.glossary_terms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
