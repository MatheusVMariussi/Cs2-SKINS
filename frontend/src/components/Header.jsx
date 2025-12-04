import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
          MinhasSkins
        </Link>
        
        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-orange-400 transition-colors font-medium">
            Home
          </Link>
          
          <Link to="/anunciar" className="hover:text-orange-400 transition-colors font-medium">
            Anunciar Skin
          </Link>

          {/* Divisor */}
          <div className="h-6 w-px bg-gray-700"></div>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Olá, <span className="text-white font-semibold">{user.email?.split('@')[0]}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white font-medium">
                Entrar
              </Link>
              <Link 
                to="/register" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
              >
                Criar Conta
              </Link>
            </div>
          )}
        </nav>

        {/* Menu Mobile (Hamburguer) */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-3 border-t border-gray-700">
          <Link to="/" className="block text-gray-300 hover:text-white py-2">Home</Link>
          <Link to="/anunciar" className="block text-gray-300 hover:text-white py-2">Anunciar Skin</Link>
          
          {user ? (
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Logado como {user.email}</p>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-red-400 hover:text-red-300 py-2"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-700 flex flex-col space-y-3">
              <Link to="/login" className="block text-center bg-gray-700 py-2 rounded text-white">Entrar</Link>
              <Link to="/register" className="block text-center bg-orange-500 py-2 rounded text-white">Criar Conta</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;