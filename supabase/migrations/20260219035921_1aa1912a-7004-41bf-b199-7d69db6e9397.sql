
-- Add categories array column to providers
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}';

-- Update existing seed records to populate categories from category
UPDATE public.providers 
SET categories = ARRAY[category] 
WHERE (categories IS NULL OR categories = '{}') AND category IS NOT NULL AND category != '';
