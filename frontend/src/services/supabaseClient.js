import { createClient } from '@supabase/supabase-js';

// Adicione essas variáveis no .env do frontend ou nas configurações da Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);