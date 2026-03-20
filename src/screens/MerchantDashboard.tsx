import React, { useState } from 'react';
import { LayoutDashboard, Users, Clock, Settings, Plus, ChevronRight, CheckCircle2, XCircle, MoreVertical, Search, Zap, User as UserIcon, Store } from 'lucide-react';
import { MOCK_BRANCHES, MOCK_STAFF, MOCK_SERVICES } from '../services/api';
import { TokenStatus } from '../types';
import { motion } from 'motion/react';

import { useNavigate } from 'react-router-dom';

export const MerchantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'queue' | 'staff' | 'analytics'>('queue');
  
  // Mock active queue
  const [queue, setQueue] = useState([
    { id: '1', number: 'A12', name: 'Kyaw Zayar', service: 'Hair Cut', staff: 'Su Su', status: TokenStatus.WAITING, time: '14:30' },
    { id: '2', number: 'A13', name: 'Mya Mya', service: 'Manicure', staff: 'Aung Aung', status: TokenStatus.WAITING, time: '14:45' },
    { id: '3', number: 'A14', name: 'Walk-in Customer', service: 'Hair Cut', staff: 'Su Su', status: TokenStatus.WAITING, time: '15:00' },
  ]);

  const callNext = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: TokenStatus.CALLED } : q));
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Header */}
        <header className="bg-white px-5 pt-8 pb-6 sticky top-0 z-30 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Glow Up Studio</h1>
              <p className="text-xs text-gray-500 font-medium">Junction City Branch</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/')}
                className="p-2 bg-gray-50 text-gray-500 rounded-xl cursor-pointer active:scale-90 transition-transform"
                title="Switch to Customer Mode"
              >
                <UserIcon size={20} />
              </button>
              <button 
                onClick={() => alert('Add new service/staff coming soon!')}
                className="p-2 bg-blue-50 text-kbz-primary rounded-xl cursor-pointer active:scale-90 transition-transform"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
            {(['queue', 'staff', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-bold capitalize rounded-xl transition-all ${
                  activeTab === tab ? 'bg-white text-kbz-primary shadow-sm' : 'text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="p-5">
          {activeTab === 'queue' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Waiting</p>
                  <p className="text-2xl font-black text-gray-900">8</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Avg Wait</p>
                  <p className="text-2xl font-black text-kbz-primary">12m</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">Active Queue</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => alert('Search queue coming soon!')}
                    className="p-1.5 bg-white rounded-lg border border-gray-100 text-gray-400 cursor-pointer active:bg-gray-50"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {queue.map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex flex-col items-center justify-center border border-blue-100">
                        <span className="text-lg font-black text-kbz-primary leading-none">{item.number}</span>
                        <span className="text-[8px] font-bold text-blue-400 uppercase mt-1">{item.time}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                        <p className="text-[10px] text-gray-500 font-medium">{item.service} • {item.staff}</p>
                        <div className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                          item.status === TokenStatus.CALLED ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {item.status === TokenStatus.WAITING ? (
                        <button 
                          onClick={() => callNext(item.id)}
                          className="bg-kbz-primary text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-100 active:scale-95"
                        >
                          CALL
                        </button>
                      ) : (
                        <button className="bg-blue-600 text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-100 active:scale-95">
                          DONE
                        </button>
                      )}
                    <button 
                      onClick={() => alert('More options for this token')}
                      className="p-2 text-gray-300 cursor-pointer active:text-gray-500"
                    >
                      <MoreVertical size={18} />
                    </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  const newNum = `W${Math.floor(Math.random() * 100)}`;
                  setQueue(prev => [...prev, { 
                    id: Date.now().toString(), 
                    number: newNum, 
                    name: 'Walk-in Customer', 
                    service: 'Quick Service', 
                    staff: 'Any', 
                    status: TokenStatus.WAITING, 
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                  }]);
                  alert(`Walk-in token ${newNum} created!`);
                }}
                className="w-full bg-white border-2 border-dashed border-gray-200 text-gray-400 font-bold py-4 rounded-3xl text-sm flex items-center justify-center gap-2 mt-6 cursor-pointer active:bg-gray-50 transition-colors"
              >
                <Plus size={18} />
                Create Walk-in Token
              </button>
            </motion.div>
          )}

          {activeTab === 'staff' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">Staff Availability</h3>
                <button 
                  onClick={() => alert('Staff management coming soon!')}
                  className="text-xs text-kbz-primary font-bold"
                >
                  Manage
                </button>
              </div>
              {MOCK_STAFF.map(st => (
                <div key={st.id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img src={st.avatar} alt={st.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{st.name}</h4>
                      <p className="text-[10px] text-gray-500">{st.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`${st.name}'s status toggled`)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-kbz-primary rounded-full"></div>
                    <span className="text-[10px] font-bold text-kbz-primary uppercase">Available</span>
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Revenue Today</h4>
                <p className="text-3xl font-black text-gray-900">450,000 <span className="text-sm font-medium text-gray-400">Ks</span></p>
                <button 
                  onClick={() => alert('Opening revenue report...')}
                  className="mt-4 flex items-center gap-2 text-kbz-primary cursor-pointer"
                >
                  <Zap size={14} className="fill-kbz-primary" />
                  <span className="text-xs font-bold">+12% from yesterday</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Queue Efficiency</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-gray-500">COMPLETED BOOKINGS</span>
                      <span className="text-gray-900">24/30</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-kbz-primary w-[80%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-gray-500">NO-SHOW RATE</span>
                      <span className="text-red-500">5%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[5%] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Opening efficiency report...')}
                  className="w-full mt-6 text-xs font-bold text-kbz-primary uppercase tracking-widest text-center"
                >
                  View Detailed Report
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Nav Mock */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-10 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => setActiveTab('queue')}
          className={`cursor-pointer transition-colors ${activeTab === 'queue' ? 'text-kbz-primary' : 'text-gray-300'}`}
        >
          <LayoutDashboard size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('staff')}
          className={`cursor-pointer transition-colors ${activeTab === 'staff' ? 'text-kbz-primary' : 'text-gray-300'}`}
        >
          <Users size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`cursor-pointer transition-colors ${activeTab === 'analytics' ? 'text-kbz-primary' : 'text-gray-300'}`}
        >
          <Clock size={24} />
        </button>
        <button 
          onClick={() => alert('Merchant settings coming soon!')}
          className="text-gray-300 cursor-pointer"
        >
          <Settings size={24} />
        </button>
      </nav>
    </div>
  );
};
