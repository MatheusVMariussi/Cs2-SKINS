import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await register(email, password, name);
      navigate('/'); 
    } catch (err) {
      setError('Erro ao cadastrar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Criar Conta</h2>
      
      {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 font-medium">Nome Completo</label>
          <input 
            type="text" 
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ex: Nome Sobrenome"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 font-medium">Email</label>
          <input 
            type="email" 
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="seu@email.com"
            required 
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 mb-2 font-medium">Senha</label>
          <input 
            type="password" 
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="******"
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded font-bold transition-colors disabled:opacity-50"
        >
          {loading ? 'Cadastrando...' : 'Criar Conta'}
        </button>
      </form>
      
      <p className="mt-6 text-center text-gray-400">
        Já tem conta? <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">Faça Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;