'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToMenu = () => {
    window.location.href = '/menu';
    setIsMenuOpen(false);
  };

  const navigateToAbout = () => {
    window.location.href = '/about';
    setIsMenuOpen(false);
  };

  const navigateToReservations = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#reservations';
      return;
    }
    
    const element = document.getElementById('reservations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateHome = () => {
    window.location.href = '/';
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-amber-100' 
        : 'bg-white/90 backdrop-blur-sm shadow-lg'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Clickable Home Button */}
          <button 
            onClick={navigateHome}
            className="group flex-shrink-0 flex items-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-xl p-2"
          >
            <div className="relative">
              <Image
                src="/hamburgerphoto.png"
                alt="Bella Vista Burger Co."
                width={60}
                height={60}
                className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg"
              />
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 bg-amber-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-orange-500 transition-all duration-300">
                Bella Vista
              </span>
              <p className="text-sm text-gray-600 font-medium">Burger Co.</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {/* Menu Button */}
              <button
                onClick={navigateToMenu}
                className="group relative px-6 py-3 text-gray-700 hover:text-amber-700 font-medium transition-all duration-300 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <span className="relative flex items-center">
                  <span className="mr-2 text-lg group-hover:animate-bounce">🍔</span>
                  Menu
                </span>
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </button>

              {/* About Button */}
              <button
                onClick={navigateToAbout}
                className="group relative px-6 py-3 text-gray-700 hover:text-amber-700 font-medium transition-all duration-300 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <span className="relative flex items-center">
                  <span className="mr-2 text-lg group-hover:animate-bounce">✨</span>
                  About
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </button>

              {/* Reservations Button */}
              <button
                onClick={navigateToReservations}
                className="group relative px-6 py-3 text-gray-700 hover:text-amber-700 font-medium transition-all duration-300 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <span className="relative flex items-center">
                  <span className="mr-2 text-lg group-hover:animate-bounce">📅</span>
                  Reservations
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </button>

              {/* CTA Button - Uiverse Style */}
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 border-2 border-transparent hover:border-white/20"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 group-hover:animate-pulse">📞</span>
                  Contact Us
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative p-3 text-gray-700 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-xl transition-all duration-300 hover:bg-amber-50"
            >
              <div className="w-6 h-6 relative">
                {/* Hamburger Menu Animation */}
                <span className={`absolute top-0 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}></span>
                <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute top-5 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="px-2 pt-4 pb-3 space-y-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl mt-4 border border-amber-100">
            {/* Mobile Menu Items */}
            <button
              onClick={navigateToMenu}
              className="group w-full text-left px-4 py-3 text-gray-700 hover:text-amber-700 font-medium rounded-xl hover:bg-white transition-all duration-200 flex items-center"
            >
              <span className="mr-3 text-xl group-hover:animate-bounce">🍔</span>
              Menu
              <span className="ml-auto group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            
            <button
              onClick={navigateToAbout}
              className="group w-full text-left px-4 py-3 text-gray-700 hover:text-amber-700 font-medium rounded-xl hover:bg-white transition-all duration-200 flex items-center"
            >
              <span className="mr-3 text-xl group-hover:animate-bounce">✨</span>
              About
              <span className="ml-auto group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            
            <button
              onClick={navigateToReservations}
              className="group w-full text-left px-4 py-3 text-gray-700 hover:text-amber-700 font-medium rounded-xl hover:bg-white transition-all duration-200 flex items-center"
            >
              <span className="mr-3 text-xl group-hover:animate-bounce">📅</span>
              Reservations
              <span className="ml-auto group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            
            {/* Mobile CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mt-4"
            >
              <span className="mr-2 group-hover:animate-pulse">📞</span>
              Contact Us Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}