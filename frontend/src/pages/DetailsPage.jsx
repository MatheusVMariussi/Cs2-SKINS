import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnuncioById, deleteAnuncio } from '../services/api';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        setLoading(true);
        const data = await getAnuncioById(id);
        setAnuncio(data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar detalhes do anúncio.');
        setLoading(false);
      }
    };

    fetchAnuncio();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAnuncio(id);
      setShowDeleteModal(false);
      // Mostrar mensagem de sucesso
      alert('Anúncio excluído com sucesso!');
      // Redirecionar para a página inicial
      navigate('/');
    } catch (err) {
      alert('Erro ao excluir anúncio. Por favor, tente novamente.');
      setShowDeleteModal(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getRarityColorClass = (raridade) => {
    const colors = {
      'Consumer Grade': 'bg-gray-200 text-gray-800',
      'Industrial Grade': 'bg-blue-200 text-blue-800',
      'Mil-Spec': 'bg-blue-300 text-blue-900',
      'Restricted': 'bg-purple-300 text-purple-900',
      'Classified': 'bg-purple-500 text-white',
      'Covert': 'bg-red-500 text-white',
      'Contraband': 'bg-yellow-400 text-yellow-900'
    };
    return colors[raridade] || 'bg-gray-200 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !anuncio) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center my-4">
          {error || 'Anúncio não encontrado.'}
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-orange-500 hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/" className="text-orange-500 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para a lista de anúncios
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={anuncio.imagem_url || 'https://via.placeholder.com/600x400?text=Sem+Imagem'}
              alt={`${anuncio.arma} | ${anuncio.nome_skin}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Erro+ao+carregar';
              }}
            />
          </div>
          
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {anuncio.arma} | {anuncio.nome_skin}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm ${getRarityColorClass(anuncio.raridade)}`}>
                {anuncio.raridade}
              </span>
            </div>
            
            <div className="mt-6">
              <div className="text-3xl font-bold text-orange-500 mb-4">
                {formatCurrency(anuncio.valor)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <span className="text-gray-500">Float:</span>
                  <span className="ml-2 font-medium">{anuncio.floatSkin}</span>
                </div>
                <div>
                  <span className="text-gray-500">Data do anúncio:</span>
                  <span className="ml-2 font-medium">
                    {new Date(anuncio.data_anuncio).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Vendedor:</span>
                  <span className="ml-2 font-medium">{anuncio.vendedor}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700">{anuncio.descricao || 'Sem descrição disponível.'}</p>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  to={`/editar-anuncio/${anuncio.id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center transition-colors"
                >
                  Editar Anúncio
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Excluir Anúncio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Confirmar exclusão</h3>
            <p className="mb-6">
              Tem certeza que deseja excluir o anúncio "{anuncio.arma} | {anuncio.nome_skin}"? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;