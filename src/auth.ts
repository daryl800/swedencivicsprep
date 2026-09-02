import { createClient, type Session } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseConfig = supabaseUrl && supabaseKey ? { key: supabaseKey, url: supabaseUrl } : null;

export const isAuthConfigured = Boolean(supabaseConfig);

export const supabase = supabaseConfig
  ? createClient(supabaseConfig.url, supabaseConfig.key, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true
      }
    })
  : null;

export type AuthSession = Session;
