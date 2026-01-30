import React from 'react';
import { Product } from '../types';
import { Truck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { toggleFavorite, favorites } = useStore();
  const navigate = useNavigate();
  const isFav = favorites.includes(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative"
    >
      {/* Delivery Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <div className={`
          flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm
          ${product.deliveryDays === 1 
            ? 'bg-emerald-100/95 text-emerald-800 border border-emerald-200' 
            : 'bg-blue-100/95 text-blue-800 border border-blue-200'}
        `}>
          <Truck size={12} strokeWidth={2.5} />
          {product.deliveryDays === 1 ? 'Next Day' : '2-Day'}
        </div>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="self-start bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      <button 
        onClick={handleFavClick}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm"
      >
        <Heart size={18} fill={isFav ? "currentColor" : "none"} className={isFav ? "text-red-500" : ""} />
      </button>

      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-900 font-medium text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{product.sellerName}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between items-end">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through decoration-gray-400">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
              Buy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};