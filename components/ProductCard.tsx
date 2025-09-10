
import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { CURRENCY_SYMBOL } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 group">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">{product.category}</div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-black text-green-600">{CURRENCY_SYMBOL}{product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
