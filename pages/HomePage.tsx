
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Vegetable', 'Millet Snack', 'Fruit'];

  const filteredProducts = products
    .filter(p => filter === 'All' || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="bg-green-100 rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-800 mb-2">Welcome to wassan-kadiri</h1>
        <p className="text-lg text-green-700">Your one-stop shop for fresh, organic produce and healthy snacks.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-1/2 lg:w-1/3">
           <input
             type="text"
             placeholder="Search for products..."
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
           />
        </div>
        <div className="flex gap-2 bg-green-200 p-1 rounded-full">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === cat ? 'bg-green-600 text-white' : 'text-green-800 hover:bg-green-300'}`}
              >
                {cat}
              </button>
            ))}
        </div>
      </div>
      
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
