// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import logo from '../assets/logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src={logo} alt="Your Company" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-6 h-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">Product</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">Features</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">Marketplace</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">Company</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => navigate('/login')}
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}
