import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/Button';
import { Truck, CheckCircle2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, placeOrder, user } = useStore();
  
  const product = products.find(p => p.id === productId);
  
  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      placeOrder(product, name);
      setLoading(false);
      navigate('/success');
    }, 1500);
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + product.deliveryDays);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">One Last Step</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tell us where to send your package.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          {/* Order Summary */}
          <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <img src={product.image} alt="" className="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
              <p className="text-blue-600 font-semibold">₹{product.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
            <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-blue-900">Arrives {formattedDate}</h4>
              <p className="text-xs text-blue-700 mt-1">Guaranteed delivery window.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
              <textarea
                id="address"
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="123 Delivery Lane, Apt 4B"
              />
            </div>

            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              disabled={loading}
              className="mt-4"
            >
              {loading ? 'Processing...' : `Pay ₹${product.price.toFixed(2)}`}
            </Button>
          </form>
        </div>

        <div className="mt-6 flex justify-center space-x-6 text-xs text-gray-400">
          <div className="flex items-center">
            <CheckCircle2 size={12} className="mr-1" /> No account needed
          </div>
          <div className="flex items-center">
            <CheckCircle2 size={12} className="mr-1" /> Secure Payment
          </div>
        </div>
      </div>
    </div>
  );
};