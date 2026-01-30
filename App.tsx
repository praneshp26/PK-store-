import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { AddProduct } from './pages/AddProduct';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';

const ScrollToTopRoute = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ScrollToTopRoute />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/checkout/:productId" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/success" element={<Success />} />
            <Route path="/add-product" element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <ScrollToTop />
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center text-white font-black text-sm">
                    PK
                  </div>
                  <span className="font-bold text-xl tracking-tight text-gray-900">
                    Store
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Reinventing the first-time buyer experience with trust and speed.
                </p>
              </div>
              <div className="col-span-1">
                <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>New Arrivals</li>
                  <li>Best Sellers</li>
                  <li>Delivery Guarantee</li>
                </ul>
              </div>
              <div className="col-span-1">
                <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Help Center</li>
                  <li>Track Order</li>
                  <li>Returns (Demo)</li>
                </ul>
              </div>
              <div className="col-span-1">
                <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} PK Store Demo. Concept Validation.
            </div>
          </div>
        </footer>
      </div>
    </StoreProvider >
  );
};

export default App;