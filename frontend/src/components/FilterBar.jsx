import React, { useState } from 'react';

const ARMAS = [
  'Todas', 'AK-47', 'M4A4', 'M4A1-S', 'AWP', 'Desert Eagle', 'USP-S', 
  'Glock-18', 'P250', 'Knife', 'Luvas'
];

const RARIDADES = [
  'Todas', 'Consumer Grade', 'Industrial Grade', 'Mil-Spec', 'Restricted', 
  'Classified', 'Covert', 'Contraband'
];

function FilterBar({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      arma: '',
      raridade: '',
      minPrice: '',
      maxPrice: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arma
            </label>
            <select
              name="arma"
              value={localFilters.arma}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todas as armas</option>
              {ARMAS.filter(a => a !== 'Todas').map((arma) => (
                <option key={arma} value={arma}>{arma}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Raridade
            </label>
            <select
              name="raridade"
              value={localFilters.raridade}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todas as raridades</option>
              {RARIDADES.filter(r => r !== 'Todas').map((raridade) => (
                <option key={raridade} value={raridade}>{raridade}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço mínimo (R$)
            </label>
            <input
              type="number"
              name="minPrice"
              value={localFilters.minPrice}
              onChange={handleChange}
              placeholder="Min"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço máximo (R$)
            </label>
            <input
              type="number"
              name="maxPrice"
              value={localFilters.maxPrice}
              onChange={handleChange}
              placeholder="Max"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              min="0"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md mr-2 hover:bg-gray-50"
          >
            Limpar Filtros
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Aplicar Filtros
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterBar;