import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, PlusCircle, Heart, LogOut, Package, Settings, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { user, searchQuery, setSearchQuery, logout, favorites } = useStore();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (window.location.hash !== '#/') {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm/50 backdrop-blur-xl bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                PK
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="ml-3 font-extrabold text-xl tracking-tight text-gray-900 hidden sm:block">
              Store
            </span>
          </div>

          {/* Search Bar - Advanced Feature */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 sm:text-sm"
                placeholder="Search for fast delivery items..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/add-product" 
              className="hidden sm:flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Sell Item
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="relative p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-6 h-6" />
                  {favorites.length > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </Link>
                
                <div className="relative ml-3">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100 origin-top-right z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      </div>
                      
                      <div className="py-1">
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User size={16} className="mr-2" /> Your Profile
                        </Link>
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <ShoppingBag size={16} className="mr-2" /> Orders
                        </Link>
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings size={16} className="mr-2" /> Settings
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                            navigate('/');
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} className="mr-2" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600">
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};