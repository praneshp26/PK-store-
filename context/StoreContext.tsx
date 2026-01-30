import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, User, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { useAuth } from './AuthContext';
import { subscribeToProducts, addProductToFirestore } from '../services/productService';

interface StoreContextType {
  user: User | null;
  products: Product[];
  favorites: string[];
  orders: Order[];
  searchQuery: string;
  productsLoading: boolean;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  toggleFavorite: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  placeOrder: (product: Product, customerName: string) => void;
  lastOrder: Order | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { user: authUser, userData, logout: authLogout } = useAuth();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Map Firebase user to App User
  const user: User | null = authUser ? {
    id: authUser.uid,
    name: userData?.name || authUser.displayName || 'User',
    email: authUser.email || '',
  } : null;

  // Subscribe to Firestore products with real-time updates
  useEffect(() => {
    setProductsLoading(true);

    const unsubscribe = subscribeToProducts(
      (firestoreProducts) => {
        // Merge Firestore products with mock products (mock products as fallback)
        // Firestore products come first, then mock products that aren't duplicates
        const mockIds = new Set(MOCK_PRODUCTS.map(p => p.id));
        const firestoreIds = new Set(firestoreProducts.map(p => p.id));

        // Only include mock products that don't exist in Firestore
        const uniqueMockProducts = MOCK_PRODUCTS.filter(p => !firestoreIds.has(p.id));

        setProducts([...firestoreProducts, ...uniqueMockProducts]);
        setProductsLoading(false);
      },
      (error) => {
        console.error('Failed to load products from Firestore:', error);
        // Fall back to mock products on error
        setProducts(MOCK_PRODUCTS);
        setProductsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const logout = () => {
    authLogout();
    setFavorites([]);
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      // Add to Firestore - real-time subscription will update the list
      await addProductToFirestore(productData);
    } catch (error) {
      console.error('Failed to add product:', error);
      // Fallback: add locally if Firestore fails
      const localProduct: Product = {
        ...productData,
        id: Date.now().toString(),
      };
      setProducts((prev) => [localProduct, ...prev]);
    }
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
      productsLoading,
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