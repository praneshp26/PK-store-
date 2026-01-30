import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, Zap, Package } from 'lucide-react';

export const Home: React.FC = () => {
  const { products, searchQuery } = useStore();

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section - Trust & Reassurance focused */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Buy with <span className="text-blue-600">Confidence</span>.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            The first marketplace designed for peace of mind. Every item is guaranteed to arrive in 1-2 days, or your money back instantly.
          </p>
          
          <div className="flex justify-center gap-6 md:gap-12 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                <Zap size={20} />
              </div>
              <span className="font-medium text-sm md:text-base">Fast 1-2 Day Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 rounded-full text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <span className="font-medium text-sm md:text-base">Guaranteed Arrival</span>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <div className="p-2 bg-purple-50 rounded-full text-purple-600">
                <Package size={20} />
              </div>
              <span className="font-medium text-sm md:text-base">Tracked Every Step</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
          <span className="text-sm text-gray-500">{filteredProducts.length} items found</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </main>
    </div>
  );
};