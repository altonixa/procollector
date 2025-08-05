import React from 'react';

interface StepCardProps {
  number: string;
  title: string;
}

export const StepCard: React.FC<StepCardProps> = ({ number, title }) => (
  <div className="relative z-10">
    <div className="font-bold text-7xl text-emerald-600 mb-4">{number}</div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
  </div>
);
