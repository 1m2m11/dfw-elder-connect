
-- Create providers table
CREATE TABLE public.providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  category text NOT NULL CHECK (category IN ('aide', 'companion', 'housekeeping', 'errands', 'meals')),
  served_zips text[] NOT NULL DEFAULT '{}',
  bio text NOT NULL,
  photo_url text,
  approved boolean DEFAULT false,
  featured boolean DEFAULT false
);

-- Create inquiries table
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  provider_id uuid REFERENCES public.providers(id) ON DELETE CASCADE NOT NULL,
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  sender_phone text,
  message text NOT NULL
);

-- Enable RLS
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Providers: anyone can read approved providers
CREATE POLICY "Public can view approved providers"
  ON public.providers FOR SELECT
  USING (approved = true);

-- Providers: anyone can insert (for registration form)
CREATE POLICY "Anyone can register as provider"
  ON public.providers FOR INSERT
  WITH CHECK (true);

-- Inquiries: anyone can insert
CREATE POLICY "Anyone can submit inquiry"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Seed approved providers
INSERT INTO public.providers (full_name, email, phone, category, served_zips, bio, approved, featured) VALUES
  ('Margaret Liu', 'margaret.liu@example.com', '214-555-0101', 'companion', ARRAY['75001', '75034'], 'Retired teacher offering warm, friendly companion visits. I enjoy conversation, puzzles, and gentle walks. Flexible schedule.', true, false),
  ('DeShawn Harris', 'deshawn.harris@example.com', '817-555-0202', 'errands', ARRAY['76001', '75063'], 'Reliable and organized. I handle grocery runs, prescription pickups, and errands with care. Serving Arlington and Irving.', true, false),
  ('Linda Castañeda', 'linda.castaneda@example.com', '214-555-0303', 'housekeeping', ARRAY['75201', '75204'], 'Detail-oriented housekeeping support for seniors. Light cleaning, laundry, and tidying. References available.', true, false);
