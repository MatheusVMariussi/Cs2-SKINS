import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("ERRO CRÍTICO: VITE_SUPABASE_URL ou KEY faltando!");
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');