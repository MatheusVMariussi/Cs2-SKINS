import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnuncioById, createAnuncio, updateAnuncio } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    nome_skin: '',
    arma: '',
    raridade: '',
    valor: '',
    floatSkin: '',
    descricao: '',
    imagem_url: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchAnuncio = async () => {
        try {
          const data = await getAnuncioById(id);
          // Verifica se o usuário é o dono antes de deixar editar
          if (user && data.user_id !== user.id) {
            alert('Você não tem permissão para editar este anúncio.');
            navigate('/');
            return;
          }

          setFormData({
            nome_skin: data.nome_skin,
            arma: data.arma,
            raridade: data.raridade,
            valor: data.valor,
            floatSkin: data.floatSkin,
            descricao: data.descricao || '',
            imagem_url: data.imagem_url
          });
          setLoading(false);
        } catch (err) {
          alert('Erro ao carregar dados do anúncio.');
          navigate('/');
        }
      };

      fetchAnuncio();
    }
  }, [id, isEditMode, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome_skin.trim()) newErrors.nome_skin = 'Nome da skin é obrigatório';
    if (!formData.arma) newErrors.arma = 'Selecione uma arma';
    if (!formData.raridade) newErrors.raridade = 'Selecione a raridade';
    if (!formData.valor || formData.valor <= 0) newErrors.valor = 'Informe um valor válido';
    
    // Validação do Float
    if (!formData.floatSkin || formData.floatSkin < 0 || formData.floatSkin > 1) {
      newErrors.floatSkin = 'Float deve estar entre 0 e 1';
    }
    
    if (!formData.imagem_url.trim()) newErrors.imagem_url = 'URL da imagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      
      const sellerName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anônimo';

      const dataToSubmit = {
        ...formData,
        valor: parseFloat(formData.valor),
        floatSkin: parseFloat(formData.floatSkin),
        vendedor: sellerName
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
      console.error(err);
      alert(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} anúncio.`);
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

  const inputClassName = `w-full p-2 border rounded-md text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500 ${
    errors.nome_skin ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-orange-500 hover:underline flex items-center">
          ← Voltar para a lista
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-white">
          {isEditMode ? 'Editar Anúncio' : 'Anunciar Nova Skin'}
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nome da Skin */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome da Skin *</label>
              <input
                type="text"
                name="nome_skin"
                value={formData.nome_skin}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Ex: Dragon Lore"
              />
              {errors.nome_skin && <p className="mt-1 text-sm text-red-500">{errors.nome_skin}</p>}
            </div>
            
            {/* Arma */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Arma *</label>
              <select
                name="arma"
                value={formData.arma}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Selecione uma arma</option>
                {ARMAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {errors.arma && <p className="mt-1 text-sm text-red-500">{errors.arma}</p>}
            </div>
            
            {/* Raridade */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Raridade *</label>
              <select
                name="raridade"
                value={formData.raridade}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Selecione a raridade</option>
                {RARIDADES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.raridade && <p className="mt-1 text-sm text-red-500">{errors.raridade}</p>}
            </div>
            
            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Valor (R$) *</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={inputClassName}
                placeholder="Ex: 249.90"
              />
              {errors.valor && <p className="mt-1 text-sm text-red-500">{errors.valor}</p>}
            </div>
            
            {/* Float */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Float (0-1) *</label>
              <input
                type="number"
                name="floatSkin" 
                value={formData.floatSkin}
                onChange={handleChange}
                step="0.0001"
                min="0"
                max="1"
                className={inputClassName}
                placeholder="Ex: 0.0123"
              />
              {errors.floatSkin && <p className="mt-1 text-sm text-red-500">{errors.floatSkin}</p>}
            </div>
            
            {/* URL Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">URL da Imagem *</label>
              <input
                type="text"
                name="imagem_url"
                value={formData.imagem_url}
                onChange={handleChange}
                className={inputClassName}
                placeholder="https://..."
              />
              {errors.imagem_url && <p className="mt-1 text-sm text-red-500">{errors.imagem_url}</p>}
            </div>
          </div>
          
          {/* Descrição */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              className={inputClassName}
              placeholder="Detalhes sobre a skin..."
            ></textarea>
          </div>
          
          {/* Botões */}
          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
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