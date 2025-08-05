import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Shield,
  Smartphone,
  Users,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Building2
} from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8" />
            <span className="text-xl font-bold">Procollector</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-200 transition">Features</a>
            <a href="#roles" className="hover:text-blue-200 transition">User Roles</a>
            <a href="#demo" className="hover:text-blue-200 transition">Demo</a>
          </div>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Get Started
          </button>
        </nav>

        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Streamline Field Collections, Ensure Accountability
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              The complete field collection management platform designed for banks and financial institutions.
              Simplify operations, prevent fraud, and maintain transparency.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/signup')}
                className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition flex items-center"
              >
                Request Demo <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the landing page content remains the same */}
      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Every Need</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                title: "Real-time Analytics",
                description: "Track collections, monitor performance, and generate detailed reports instantly."
              },
              {
                icon: <Smartphone className="w-8 h-8 text-blue-600" />,
                title: "Offline Capability",
                description: "Continue working without internet. Data syncs automatically when connection returns."
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-600" />,
                title: "GPS Verification",
                description: "Verify collector locations and track field operations in real-time."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20" id="roles">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Tailored for Every User</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="w-12 h-12 text-blue-600" />,
                title: "Admin Dashboard",
                features: ["User Management", "Financial Configuration", "Analytics & Reports"]
              },
              {
                icon: <Users className="w-12 h-12 text-blue-600" />,
                title: "Collector Portal",
                features: ["Client Management", "Offline Mode", "GPS Tracking"]
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-blue-600" />,
                title: "Client Access",
                features: ["Savings History", "Real-time Notifications", "Statement Downloads"]
              }
            ].map((role, index) => (
              <div key={index} className="text-center p-8 rounded-xl border border-gray-200 hover:border-blue-500 transition">
                {role.icon}
                <h3 className="text-xl font-semibold my-4">{role.title}</h3>
                <ul className="space-y-2">
                  {role.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-blue-900 text-white" id="demo">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Experience Procollector Today</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Try our demo system and see how Procollector can transform your field collection operations.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="inline-flex items-center space-x-2 bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            <Clock className="w-5 h-5" />
            <span>Start Free Trial</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-8 md:mb-0">
              <Shield className="w-8 h-8" />
              <span className="text-xl font-bold">Procollector</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">Powered by Altonixa</p>
              <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;