import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ name, description, price, period, features, popular }) => (
  <div className={`relative rounded-3xl p-8 bg-white shadow-xl transform transition-all duration-300 hover:-translate-y-2 ${popular ? 'ring-4 ring-emerald-500' : ''}`}>
    {popular && (
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <div className="bg-emerald-500 text-white px-8 py-2 rounded-full text-sm font-bold">
          Most Popular
        </div>
      </div>
    )}
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="text-center mb-8">
      <span className="text-4xl font-bold text-gray-900">{price}</span>
      {period && <span className="text-gray-600">{period}</span>}
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-600">
          <ChevronRight className="w-5 h-5 text-emerald-500 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full rounded-xl py-4 font-bold transition-all duration-300 transform hover:-translate-y-1 ${popular ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
      Get Started
    </button>
  </div>
);
