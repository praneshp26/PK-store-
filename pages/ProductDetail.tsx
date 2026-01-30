import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/Button';
import { Truck, ShieldCheck, Star, ArrowLeft, RefreshCw, Box } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useStore();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const handleBuyNow = () => {
    navigate(`/checkout/${product.id}`);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-1" /> Back to Products
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="bg-gray-100 h-96 lg:h-full relative flex items-center justify-center p-8">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain max-h-[500px] hover:scale-105 transition-transform duration-500"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-lg">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-gray-900 text-sm ml-1.5 font-bold">{product.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">(128 reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{product.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl md:text-5xl font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
                    {product.originalPrice && (
                      <div className="text-xl text-gray-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                  {product.originalPrice && (
                    <p className="text-green-600 text-sm font-medium mt-1">
                      You save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* CRITICAL: Delivery Assurance Box */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                  
                  <h3 className="font-bold text-emerald-900 flex items-center mb-2 relative z-10">
                    <Truck className="w-5 h-5 mr-2 text-emerald-600" />
                    PK Guarantee
                  </h3>
                  <div className="flex items-baseline space-x-2 relative z-10">
                    <span className="text-3xl font-extrabold text-emerald-700">
                      {product.deliveryDays === 1 ? 'Tomorrow' : '2 Days'}
                    </span>
                    <span className="text-emerald-800 font-medium text-sm bg-emerald-100 px-2 py-0.5 rounded">
                      Order within 4 hrs
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700 mt-3 font-medium flex items-center">
                    <Box size={14} className="mr-1.5" />
                    Sold by {product.sellerName}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Button 
                  onClick={handleBuyNow} 
                  fullWidth 
                  size="lg"
                  className="text-lg py-4 shadow-blue-500/30 shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Buy Now
                </Button>
                
                <div className="grid grid-cols-2 gap-4 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center justify-center bg-gray-50 py-3 rounded-lg">
                    <ShieldCheck size={16} className="mr-2 text-gray-400" />
                    Secure Payment
                  </div>
                  <div className="flex items-center justify-center bg-gray-50 py-3 rounded-lg">
                    <RefreshCw size={16} className="mr-2 text-gray-400" />
                    7 Day Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};