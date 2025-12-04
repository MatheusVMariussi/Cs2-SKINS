import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await register(email, password);
      setMsg('Cadastro realizado! Verifique seu email para confirmar.');
    } catch (err) {
      setError('Erro ao cadastrar: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Criar Conta</h2>
      {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
      {msg && <div className="bg-green-500 text-white p-3 mb-4 rounded">{msg}</div>}
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input type="email" className="w-full p-2 rounded bg-gray-700 text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Senha</label>
          <input type="password" className="w-full p-2 rounded bg-gray-700 text-white" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded font-bold">Cadastrar</button>
      </form>
      <p className="mt-4 text-gray-400">
        Já tem conta? <Link to="/login" className="text-blue-400">Faça Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;