import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        if (!supabase) {
          console.error("Supabase client não inicializado. Verifique suas variáveis de ambiente.");
          setLoading(false);
          return;
        }

        const response = await supabase.auth.getSession();
        
        // Verifica se data existe antes de tentar acessar session
        const session = response?.data?.session;
        
        if (mounted) {
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error("Erro fatal na inicialização do Auth:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    const authListener = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    // Função de limpeza segura
    return () => {
      mounted = false;
      // Verifica se a subscription existe antes de tentar cancelar
      if (authListener && authListener.data && authListener.data.subscription) {
        authListener.data.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);