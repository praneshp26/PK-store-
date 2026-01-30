import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Upload } from 'lucide-react';
import { Product } from '../types';

export const AddProduct: React.FC = () => {
  const { addProduct, user } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'Electronics',
    deliveryDays: '1'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      image: `https://picsum.photos/400/400?random=${Date.now()}`,
      deliveryDays: parseInt(formData.deliveryDays) as 1 | 2,
      category: formData.category,
      rating: 5.0, // New products start with 5 stars
      sellerName: user?.name || 'Anonymous Seller'
    };

    addProduct(newProduct);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">List an Item for Sale</h1>
        <p className="text-gray-500 mb-8 text-sm">
          As part of the PK Store network, you commit to shipping items within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Title</label>
            <input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Vintage Camera"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                name="price"
                type="number"
                required
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Kitchen</option>
                <option>Books</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Speed Commitment</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryDays: '1' })}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  formData.deliveryDays === '1' 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold">Next Day</div>
                <div className="text-xs opacity-75">Top priority</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryDays: '2' })}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  formData.deliveryDays === '2' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold">2 Days</div>
                <div className="text-xs opacity-75">Standard Fast</div>
              </button>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Image upload is simulated for this demo.</p>
          </div>

          <Button type="submit" fullWidth size="lg">List Product</Button>
        </form>
      </div>
    </div>
  );
};