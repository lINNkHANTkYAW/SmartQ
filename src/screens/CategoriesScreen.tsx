import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Scissors, Sparkles, Wind, Heart, Smile } from 'lucide-react';

export const CategoriesScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'Hair', icon: <Scissors size={24} />, color: 'bg-blue-50 text-blue-600' },
    { name: 'Nails', icon: <Sparkles size={24} />, color: 'bg-pink-50 text-pink-600' },
    { name: 'Massage', icon: <Wind size={24} />, color: 'bg-blue-50 text-kbz-primary' },
    { name: 'Facial', icon: <Smile size={24} />, color: 'bg-orange-50 text-orange-600' },
    { name: 'Spa', icon: <Heart size={24} />, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">All Categories</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center gap-4 cursor-pointer active:scale-95 transition-transform"
            >
              <div className={`w-16 h-16 ${cat.color} rounded-3xl flex items-center justify-center`}>
                {cat.icon}
              </div>
              <span className="font-bold text-gray-900">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
