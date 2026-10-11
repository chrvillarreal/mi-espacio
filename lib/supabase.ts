import { createClient } from '@supabase/supabase-js';

// Canonical URL of the Supabase project configured for Mi Espacio.
const projectUrl = 'https://myhpwssvnfqrctdrnale.supabase.co';
const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
function resolveUrl(value: string | undefined): string {
  if (!value) return projectUrl;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === 'https:' && parsed.hostname === new URL(projectUrl).hostname && !parsed.username && !parsed.password) {
      return parsed.origin;
    }
  } catch {
    // A malformed deployment variable must not break prerendering.
  }
  return projectUrl;
}
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
export const supabase = key ? createClient(resolveUrl(configuredUrl), key, {
  auth: { flowType: 'pkce', detectSessionInUrl: false, autoRefreshToken: true, persistSession: true }
}) : null;
