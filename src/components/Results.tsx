import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ResultsProps {
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ onRestart }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">
        Quiz Complete! 🎉
      </h2>
      
      <button
        onClick={onRestart}
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Start New Quiz
      </button>
    </div>
  );
};