import React, { useState, useEffect } from 'react';
import { getAnuncios } from '../services/api';
import SkinCard from '../components/SkinCard';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';

function HomePage() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    arma: '',
    raridade: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        setLoading(true);
        const data = await getAnuncios(currentPage, filters);
        setAnuncios(data.anuncios);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar anúncios. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchAnuncios();
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Marketplace de Skins CS</h1>
      
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      
      {anuncios.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {anuncios.map((anuncio) => (
              <SkinCard key={anuncio.id} anuncio={anuncio} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : (
        <div className="text-center my-16">
          <p className="text-gray-500 text-lg">Nenhum anúncio encontrado com os filtros atuais.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;