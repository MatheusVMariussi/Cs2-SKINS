import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnuncioById, deleteAnuncio } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
      alert('Anúncio excluído com sucesso!');
      navigate('/');
    } catch (err) {
      alert('Erro ao excluir anúncio. Verifique se você tem permissão.');
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
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg my-4 inline-block">
          {error || 'Anúncio não encontrado.'}
        </div>
        <div className="mt-4">
          <Link to="/" className="text-orange-500 hover:underline">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  const isOwner = user && anuncio.user_id && user.id === anuncio.user_id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/" className="text-orange-500 hover:underline flex items-center">
          ← Voltar para a lista
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="md:flex">
          {/* Imagem */}
          <div className="md:w-1/2 bg-gray-900 flex items-center justify-center p-4">
            <img
              src={anuncio.imagem_url}
              alt={`${anuncio.arma} | ${anuncio.nome_skin}`}
              className="max-h-[400px] object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Imagem+Indisponível';
              }}
            />
          </div>
          
          {/* Detalhes */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {anuncio.nome_skin}
                  </h1>
                  <p className="text-xl text-gray-400">{anuncio.arma}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getRarityColorClass(anuncio.raridade)}`}>
                  {anuncio.raridade}
                </span>
              </div>
              
              <div className="text-4xl font-bold text-orange-500 mb-6">
                {formatCurrency(anuncio.valor)}
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm mb-8 bg-gray-900/50 p-4 rounded-lg">
                <div>
                  <span className="block text-gray-500 text-xs uppercase">Float</span>
                  <span className="font-mono text-white">{anuncio.floatSkin}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase">Anunciado em</span>
                  <span className="text-white">
                    {new Date(anuncio.data_anuncio).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-gray-500 text-xs uppercase">Vendedor</span>
                  <span className="text-white font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {anuncio.vendedor}
                  </span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-300 uppercase mb-2">Descrição</h3>
                <p className="text-gray-400 leading-relaxed">
                  {anuncio.descricao || 'O vendedor não adicionou uma descrição.'}
                </p>
              </div>
            </div>

            {/* Renderização Condicional */}
            {isOwner ? (
              <div className="flex space-x-3 pt-6 border-t border-gray-700">
                <Link
                  to={`/editar-anuncio/${anuncio.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-center font-bold transition-colors"
                >
                  Editar
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-bold transition-colors"
                >
                  Excluir
                </button>
              </div>
            ) : (
               <div className="pt-6 border-t border-gray-700">
                 <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-bold transition-colors shadow-lg shadow-green-900/20">
                   Comprar Agora
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmação (mantido igual, apenas ajustado estilos) */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar exclusão</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja apagar o anúncio <strong>{anuncio.nome_skin}</strong>? 
              <br/><br/>
              <span className="text-red-400 text-sm">Essa ação é irreversível.</span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;