import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const Success: React.FC = () => {
  const { lastOrder } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastOrder) {
      navigate('/');
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  return (
    <div className="min-h-screen bg-emerald-50/50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center relative">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />

        <div className="p-10 md:p-16">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-8 animate-bounce">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Relax.
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-8">
            Your order is confirmed and on its way.
          </h2>

          <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 border border-emerald-100 max-w-lg mx-auto mb-10 transform transition-all hover:scale-105 duration-300">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Truck className="h-6 w-6 text-emerald-600" />
              <span className="text-lg font-bold text-emerald-800 uppercase tracking-wider">Estimated Delivery</span>
            </div>
            <p className="text-4xl font-extrabold text-emerald-900 mt-2">
              {lastOrder.deliveryPromise}
            </p>
            <p className="text-emerald-600/80 mt-2 text-sm">
              We've emailed you the tracking details.
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={() => navigate('/')} variant="primary" size="lg" className="min-w-[200px]">
              Back to Home
            </Button>
            <div>
              <button onClick={() => navigate('/profile')} className="text-sm text-gray-500 hover:text-blue-600 transition-colors inline-flex items-center mt-4">
                View Order Details <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};