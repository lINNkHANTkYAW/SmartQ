import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, Star, Gift, Zap, ChevronRight } from 'lucide-react';
import { MOCK_USER } from '../services/api';

export const LoyaltyScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Loyalty & Rewards</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[40px] p-8 text-white shadow-xl shadow-emerald-100 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Current Points</p>
              <h2 className="text-5xl font-black">{MOCK_USER.loyaltyPoints}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Trophy size={24} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-100 uppercase tracking-wider">Silver Tier</span>
              <span>750 / 2000 to GOLD</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[37.5%] rounded-full"></div>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Available Rewards</h3>
        <div className="space-y-4">
          {[
            { title: 'Free Hair Treatment', points: 500, icon: <Zap size={20} className="text-yellow-500" /> },
            { title: '5,000 Ks Discount', points: 300, icon: <Gift size={20} className="text-pink-500" /> },
            { title: 'Priority Queue Pass', points: 1000, icon: <Star size={20} className="text-blue-500" /> },
          ].map((r, idx) => (
            <div key={idx} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                  {r.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{r.title}</h4>
                  <p className="text-xs text-gray-500">{r.points} points</p>
                </div>
              </div>
              <button 
                onClick={() => alert(`Redeemed: ${r.title}`)}
                className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-4 py-2 rounded-xl cursor-pointer active:scale-95 transition-transform"
              >
                REDEEM
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
