import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Navigate } from 'react-router-dom';
import { Package, Heart, Clock, LogOut, Settings, User, Bell, Shield } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

export const Profile: React.FC = () => {
  const { user, orders, products, favorites, logout } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');

  if (!user) return <Navigate to="/login" />;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-md border-4 border-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Clock className="w-5 h-5 mr-3" /> Orders History
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'wishlist' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5 mr-3" /> My Wishlist
                {favorites.length > 0 && <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{favorites.length}</span>}
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" /> Account Settings
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <button 
                onClick={logout} 
                className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Recent Orders Tab */}
          {activeTab === 'orders' && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                Your Orders
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {orders.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="bg-emerald-100 p-3 rounded-xl flex-shrink-0">
                            <Package className="text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{order.items[0].title}</p>
                            <p className="text-sm text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                            {order.deliveryPromise}
                          </span>
                          <p className="text-lg font-bold text-gray-900 mt-2">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="text-gray-500 mt-1">When you place an order, it will appear here.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                Your Wishlist
              </h3>
              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                  <p className="text-gray-500 mt-1">Tap the heart icon on any product to save it here.</p>
                </div>
              )}
            </section>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Account Settings
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 space-y-8">
                  
                  {/* Personal Info */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" /> Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" defaultValue={user.name} className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" defaultValue={user.email} className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-blue-600" /> Notifications
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Order Updates</p>
                          <p className="text-sm text-gray-500">Get notified about your delivery status.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Promotions and Discounts</p>
                          <p className="text-sm text-gray-500">Receive emails about new sales.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-8">
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};