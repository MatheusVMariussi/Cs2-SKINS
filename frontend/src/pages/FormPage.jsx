import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnuncioById, createAnuncio, updateAnuncio } from '../services/api';

const ARMAS = [
  'AK-47', 'M4A4', 'M4A1-S', 'AWP', 'Desert Eagle', 'USP-S', 
  'Glock-18', 'P250', 'P90', 'MP7', 'MP9', 'UMP-45',
  'MAC-10', 'Famas', 'Galil AR', 'SSG 08', 'SG 553', 'AUG',
  'Nova', 'XM1014', 'MAG-7', 'Sawed-Off', 'Knife', 'Luvas'
];

const RARIDADES = [
  'Consumer Grade', 'Industrial Grade', 'Mil-Spec', 'Restricted', 
  'Classified', 'Covert', 'Contraband'
];

function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    nome_skin: '',
    arma: '',
    raridade: '',
    valor: '',
    floatSkin: '',
    descricao: '',
    imagem_url: '',
    vendedor: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Se estiver no modo de edição, buscar os dados do anúncio
    if (isEditMode) {
      const fetchAnuncio = async () => {
        try {
          const data = await getAnuncioById(id);
          setFormData({
            nome_skin: data.nome_skin,
            arma: data.arma,
            raridade: data.raridade,
            valor: data.valor,
            floatSkin: data.floatSkin,
            descricao: data.descricao || '',
            imagem_url: data.imagem_url,
            vendedor: data.vendedor
          });
          setLoading(false);
        } catch (err) {
          alert('Erro ao carregar dados do anúncio. Redirecionando...');
          navigate('/');
        }
      };

      fetchAnuncio();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando ele for alterado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome_skin.trim()) {
      newErrors.nome_skin = 'Nome da skin é obrigatório';
    }
    
    if (!formData.arma) {
      newErrors.arma = 'Selecione uma arma';
    }
    
    if (!formData.raridade) {
      newErrors.raridade = 'Selecione a raridade';
    }
    
    if (!formData.valor || formData.valor <= 0) {
      newErrors.valor = 'Informe um valor válido';
    }
    
    if (!formData.floatSkin || formData.floatSkin < 0 || formData.floatSkin > 1) {
      newErrors.floatSkin = 'Float deve estar entre 0 e 1';
    }
    
    if (!formData.imagem_url.trim()) {
      newErrors.imagem_url = 'URL da imagem é obrigatória';
    }
    
    if (!formData.vendedor.trim()) {
      newErrors.vendedor = 'Nome do vendedor é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Converter valores para o formato correto
      const dataToSubmit = {
        ...formData,
        valor: parseFloat(formData.valor),
        floatSkin: parseFloat(formData.floatSkin)
      };
      
      if (isEditMode) {
        await updateAnuncio(id, dataToSubmit);
        alert('Anúncio atualizado com sucesso!');
      } else {
        await createAnuncio(dataToSubmit);
        alert('Anúncio criado com sucesso!');
      }
      
      navigate('/');
    } catch (err) {
      alert(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} anúncio. Por favor, tente novamente.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-orange-500 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para a lista de anúncios
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Editar Anúncio' : 'Criar Novo Anúncio'}
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome da Skin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Skin *
              </label>
              <input
                type="text"
                name="nome_skin"
                value={formData.nome_skin}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.nome_skin ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="Ex: Dragon Lore"
              />
              {errors.nome_skin && (
                <p className="mt-1 text-sm text-red-600">{errors.nome_skin}</p>
              )}
            </div>
            
            {/* Arma */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arma *
              </label>
              <select
                name="arma"
                value={formData.arma}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.arma ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
              >
                <option value="">Selecione uma arma</option>
                {ARMAS.map((arma) => (
                  <option key={arma} value={arma}>{arma}</option>
                ))}
              </select>
              {errors.arma && (
                <p className="mt-1 text-sm text-red-600">{errors.arma}</p>
              )}
            </div>
            
            {/* Raridade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Raridade *
              </label>
              <select
                name="raridade"
                value={formData.raridade}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.raridade ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
              >
                <option value="">Selecione a raridade</option>
                {RARIDADES.map((raridade) => (
                  <option key={raridade} value={raridade}>{raridade}</option>
                ))}
              </select>
              {errors.raridade && (
                <p className="mt-1 text-sm text-red-600">{errors.raridade}</p>
              )}
            </div>
            
            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor (R$) *
              </label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full p-2 border rounded-md ${
                  errors.valor ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="Ex: 249.90"
              />
              {errors.valor && (
                <p className="mt-1 text-sm text-red-600">{errors.valor}</p>
              )}
            </div>
            
            {/* Float */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Float (0-1) *
              </label>
              <input
                type="number"
                name="float"
                value={formData.floatSkin}
                onChange={handleChange}
                step="0.0001"
                min="0"
                max="1"
                className={`w-full p-2 border rounded-md ${
                  errors.floatSkin ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="Ex: 0.0123"
              />
              {errors.floatSkin && (
                <p className="mt-1 text-sm text-red-600">{errors.floatSkin}</p>
              )}
            </div>
            
            {/* URL da Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem *
              </label>
              <input
                type="text"
                name="imagem_url"
                value={formData.imagem_url}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.imagem_url ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="Ex: https://exemplo.com/imagem.jpg"
              />
              {errors.imagem_url && (
                <p className="mt-1 text-sm text-red-600">{errors.imagem_url}</p>
              )}
            </div>
            
            {/* Nome do Vendedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Vendedor *
              </label>
              <input
                type="text"
                name="vendedor"
                value={formData.vendedor}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.vendedor ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder="Ex: João Silva"
              />
              {errors.vendedor && (
                <p className="mt-1 text-sm text-red-600">{errors.vendedor}</p>
              )}
            </div>
          </div>
          
          {/* Descrição */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Descreva detalhes adicionais sobre a skin..."
            ></textarea>
          </div>
          
          {/* Botões */}
          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Criar Anúncio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;