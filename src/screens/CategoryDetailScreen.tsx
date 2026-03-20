import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { MOCK_BRANCHES } from '../services/api';
import { Branch } from '../types';

export const CategoryDetailScreen: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    if (category) {
      const filtered = MOCK_BRANCHES.filter(b => 
        b.categories.some(c => c.toLowerCase() === category.toLowerCase())
      );
      setBranches(filtered);
    }
  }, [category]);

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 capitalize">{category} Services</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        {branches.length > 0 ? (
          branches.map((branch) => (
            <Link 
              to={`/branch/${branch.id}`} 
              key={branch.id}
              className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
            >
              <div className="relative h-40">
                <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold">4.8</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{branch.name}</h4>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{branch.distance}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mb-3">
                  <MapPin size={12} />
                  <span className="text-xs truncate">{branch.address}</span>
                </div>
                <div className="flex gap-2">
                  {branch.categories.map(cat => (
                    <span key={cat} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">{cat}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <MapPin size={32} />
            </div>
            <p className="text-gray-500 font-medium">No salons found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
