import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, User, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface StoreContextType {
  user: User | null;
  products: Product[];
  favorites: string[];
  orders: Order[];
  searchQuery: string;
  login: (name: string, email: string) => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  toggleFavorite: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  placeOrder: (product: Product, customerName: string) => void;
  lastOrder: Order | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const login = (name: string, email: string) => {
    setUser({ id: 'user-123', name, email });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const placeOrder = (product: Product, customerName: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [product],
      total: product.price,
      date: new Date().toISOString(),
      status: 'confirmed',
      deliveryPromise: `${product.deliveryDays === 1 ? 'Tomorrow' : 'In 2 days'}`
    };
    
    // If not logged in, we temporarily simulate a user for the session
    if (!user) {
      setUser({ id: 'guest-' + Date.now(), name: customerName, email: '' });
    }

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
  };

  return (
    <StoreContext.Provider value={{
      user,
      products,
      favorites,
      orders,
      searchQuery,
      login,
      logout,
      addProduct,
      toggleFavorite,
      setSearchQuery,
      placeOrder,
      lastOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};