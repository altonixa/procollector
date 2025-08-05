import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ProCollector</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">
              Features
            </Link>
            <Link to="/solutions" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">
              Solutions
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">
              About Us
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">
              Sign In
            </Link>
            <Link
              to="/request-demo"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/features"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Features
              </Link>
              <Link
                to="/solutions"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Solutions
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                About Us
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/request-demo"
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Request Demo
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
