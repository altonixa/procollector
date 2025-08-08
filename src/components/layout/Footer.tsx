import React from 'react';
import { Shield, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">ProCollector</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering financial institutions with cutting-edge collection management solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <LinkedIn className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Demo</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ProCollector. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
