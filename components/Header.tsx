
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import AuthModal from './AuthModal';
import CartSidebar from './CartSidebar';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.22 8.35C15.52 7.65 14.56 7 13.5 7H12V5H14C14.55 5 15 4.55 15 4C15 3.45 14.55 3 14 3H10C9.45 3 9 3.45 9 4C9 4.55 9.45 5 10 5H11V7H8.5C6.57 7 5 8.57 5 10.5C5 12.43 6.57 14 8.5 14H11V16H9C8.45 16 8 16.45 8 17C8 17.55 8.45 18 9 18H13C13.55 18 14 17.55 14 17C14 16.45 13.55 16 13 16H12V14H15.5C17.43 14 19 12.43 19 10.5C19 9.55 18.64 8.69 18.04 8.04L16.22 8.35Z" fill="currentColor"/>
    <path d="M8.5 9H15.5C16.33 9 17 9.67 17 10.5C17 11.33 16.33 12 15.5 12H8.5C7.67 12 7 11.33 7 10.5C7 9.67 7.67 9 8.5 9Z" fill="currentColor" />
  </svg>
);


const Header = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-green-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <h1 className="text-2xl font-bold tracking-tight">wassan-kadiri</h1>
          </Link>
          <nav className="flex items-center gap-6">
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-lg font-medium hover:text-green-200 transition-colors">Admin</Link>
            )}
            <button onClick={() => setCartOpen(true)} className="relative text-lg font-medium hover:text-green-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
              )}
            </button>
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <span className="text-lg font-medium">{user.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                   <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">My Account</Link>
                   <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="bg-white text-green-600 font-bold py-2 px-4 rounded-full hover:bg-green-100 transition-transform transform hover:scale-105">
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} onCheckout={() => setAuthModalOpen(true)} />
    </>
  );
};

export default Header;
