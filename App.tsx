
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { ProductProvider } from './hooks/useProducts';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen bg-green-50/50 font-sans">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/account" element={<ProtectedRoute element={<AccountPage />} />} />
                  <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} role="admin" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
