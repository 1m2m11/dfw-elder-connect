
-- Allow reading all providers (needed for admin dashboard which uses client-side password gate)
CREATE POLICY "Allow reading all providers for admin"
  ON public.providers FOR SELECT
  USING (true);

-- Allow updating providers (for approve/feature toggles)
CREATE POLICY "Allow updating providers"
  ON public.providers FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow deleting providers
CREATE POLICY "Allow deleting providers"
  ON public.providers FOR DELETE
  USING (true);

-- Allow reading all inquiries (admin view)
CREATE POLICY "Allow reading all inquiries"
  ON public.inquiries FOR SELECT
  USING (true);

-- Create storage bucket for provider photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('provider-photos', 'provider-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can upload provider photos
CREATE POLICY "Anyone can upload provider photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'provider-photos');

-- Storage policy: photos are public
CREATE POLICY "Provider photos are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'provider-photos');
