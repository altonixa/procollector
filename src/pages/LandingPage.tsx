import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
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
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoNnYzMGgtNlYzMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Streamline Field Collections, Ensure Accountability
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              The complete field collection management platform designed for banks and financial institutions.
              Simplify operations, prevent fraud, and maintain transparency.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg hover:shadow-xl"
              >
                Request Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the landing page content remains the same */}
      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Powerful Features for Every Need
            </h2>
            <p className="text-gray-600 text-lg">Discover tools designed to streamline your collection process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
                title: "Real-time Analytics",
                description: "Track collections, monitor performance, and generate detailed reports instantly."
              },
              {
                icon: <Smartphone className="w-10 h-10 text-blue-600" />,
                title: "Offline Capability",
                description: "Continue working without internet. Data syncs automatically when connection returns."
              },
              {
                icon: <Globe className="w-10 h-10 text-blue-600" />,
                title: "GPS Verification",
                description: "Verify collector locations and track field operations in real-time."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-100"
              >
                <div className="p-3 bg-blue-50 rounded-xl w-fit group-hover:bg-blue-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-24 bg-gray-50" id="roles">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Tailored for Every User
            </h2>
            <p className="text-gray-600 text-lg">Specialized features for different roles in your organization</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="w-14 h-14 text-blue-600" />,
                title: "Admin Dashboard",
                features: ["User Management", "Financial Configuration", "Analytics & Reports"]
              },
              {
                icon: <Users className="w-14 h-14 text-blue-600" />,
                title: "Collector Portal",
                features: ["Client Management", "Offline Mode", "GPS Tracking"]
              },
              {
                icon: <CheckCircle2 className="w-14 h-14 text-blue-600" />,
                title: "Client Access",
                features: ["Savings History", "Real-time Notifications", "Statement Downloads"]
              }
            ].map((role, index) => (
              <div 
                key={index} 
                className="group text-center p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300 mb-6">
                  {role.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">{role.title}</h3>
                <ul className="space-y-3">
                  {role.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-gray-600 flex items-center justify-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden" id="demo">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoNnYzMGgtNlYzMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Experience Procollector Today</h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Try our demo system and see how Procollector can transform your field collection operations.
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="group inline-flex items-center space-x-3 bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Clock className="w-6 h-6 group-hover:animate-pulse" />
              <span>Start Free Trial</span>
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LandingPage;