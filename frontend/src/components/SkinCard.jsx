import React from 'react';
import { Link } from 'react-router-dom';

function SkinCard({ anuncio }) {
  // Função para determinar a cor de fundo baseada na raridade
  const getRarityColor = (raridade) => {
    const colors = {
      'Consumer Grade': 'bg-gray-200',
      'Industrial Grade': 'bg-blue-200',
      'Mil-Spec': 'bg-blue-300',
      'Restricted': 'bg-purple-300',
      'Classified': 'bg-purple-500',
      'Covert': 'bg-red-500',
      'Contraband': 'bg-yellow-400'
    };
    return colors[raridade] || 'bg-gray-200';
  };

  // Função para formatar o valor como moeda brasileira
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Link to={`/anuncio/${anuncio.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <img
            src={anuncio.imagem_url || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
            alt={`${anuncio.arma} | ${anuncio.nome_skin}`}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Erro+ao+carregar';
            }}
          />
          <div className={`absolute top-0 right-0 px-2 py-1 text-xs text-white ${getRarityColor(anuncio.raridade)}`}>
            {anuncio.raridade}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-500 transition-colors">
              {anuncio.arma} | {anuncio.nome_skin}
            </h3>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Float: {anuncio.floatSkin}</span>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="font-bold text-lg text-orange-500">
              {formatCurrency(anuncio.valor)}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(anuncio.data_anuncio).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SkinCard;