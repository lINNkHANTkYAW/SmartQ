import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_USER } from '../services/api';

import { BottomNav } from '../components/BottomNav';

export const BookingsScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">My Bookings</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-4 no-scrollbar">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-kbz-primary">
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Hair Cut & Styling</h4>
                <p className="text-[10px] text-gray-500">Glow Up - Junction City</p>
              </div>
            </div>
            <span className="text-[10px] bg-blue-100 text-kbz-secondary font-bold px-2 py-0.5 rounded-full uppercase">Confirmed</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={14} />
              <span className="text-xs font-medium">Today, 14:30</span>
            </div>
            <button 
              onClick={() => navigate('/queue/tk-demo')}
              className="text-xs font-bold text-kbz-primary cursor-pointer active:scale-95"
            >
              View Token
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm opacity-60">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Manicure</h4>
                <p className="text-[10px] text-gray-500">Glow Up - Hledan</p>
              </div>
            </div>
            <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full uppercase">Completed</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={14} />
              <span className="text-xs font-medium">15 Feb 2026</span>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="text-xs font-bold text-gray-400 cursor-pointer active:text-kbz-primary"
            >
              Rebook
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};
