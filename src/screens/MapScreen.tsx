import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Search, Navigation } from 'lucide-react';
import { MOCK_BRANCHES } from '../services/api';

export const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-100">
      <div className="absolute top-6 left-5 right-5 z-20 flex gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white shadow-lg rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search on map..." 
            className="w-full bg-white shadow-lg border-none rounded-full py-3 pl-10 pr-4 text-sm focus:ring-0"
          />
        </div>
      </div>

      {/* Mock Map Background */}
      <div className="flex-1 bg-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {MOCK_BRANCHES.map((b, idx) => (
          <div 
            key={b.id}
            className="absolute"
            style={{ top: `${30 + idx * 20}%`, left: `${20 + idx * 25}%` }}
          >
            <div className="relative group cursor-pointer" onClick={() => navigate(`/branch/${b.id}`)}>
              <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg active:scale-90 transition-transform">
                <MapPin size={24} />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap border border-gray-100">
                <span className="text-[10px] font-bold text-gray-900">{b.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 right-5 z-20">
        <button 
          onClick={() => alert('Recalculating your position...')}
          className="p-4 bg-white shadow-xl rounded-full text-emerald-600 cursor-pointer active:scale-90 transition-transform"
        >
          <Navigation size={24} />
        </button>
      </div>
    </div>
  );
};
