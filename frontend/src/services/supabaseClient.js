import { createClient } from '@supabase/supabase-js';

// Adicione essas variáveis no .env do frontend ou nas configurações da Vercel
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);