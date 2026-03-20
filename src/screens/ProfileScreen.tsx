import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Shield, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Store, Globe } from 'lucide-react';
import { MOCK_USER } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

import { BottomNav } from '../components/BottomNav';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const menuItems = [
    { icon: <User size={20} />, label: t('personalInfo'), type: 'personal' },
    { icon: <Shield size={20} />, label: t('security'), type: 'security' },
    { icon: <Bell size={20} />, label: t('notifications'), type: 'notifications' },
    { icon: <CreditCard size={20} />, label: t('payment'), type: 'payment' },
    { icon: <HelpCircle size={20} />, label: t('help'), type: 'help' },
  ];

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('profile')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="bg-white p-8 text-center border-b border-gray-100">
          <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-kbz-primary border-4 border-white shadow-sm">
            <User size={48} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{MOCK_USER.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{MOCK_USER.phone}</p>
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            <span className="text-xs font-bold text-kbz-secondary">{MOCK_USER.tier} MEMBER</span>
          </div>
        </div>

        <div className="p-5 space-y-2">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => navigate(`/settings/${item.type}`)}
              className="w-full flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 text-gray-600">
                {item.icon}
                <span className="text-sm font-bold">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
          
          <button 
            onClick={() => navigate('/welcome')}
            className="w-full flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4 text-gray-600">
              <Globe size={20} />
              <span className="text-sm font-bold">{t('language')}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>

          <div className="h-4"></div>
          
          <button 
            onClick={() => navigate('/merchant')}
            className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100 text-kbz-secondary cursor-pointer active:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Store size={20} />
              <span className="text-sm font-bold">{t('switchMerchant')}</span>
            </div>
            <ChevronRight size={18} />
          </button>

          <button 
            onClick={() => {
              alert('Logged out successfully!');
              navigate('/');
            }}
            className="w-full flex items-center gap-4 p-4 text-red-500 mt-4 cursor-pointer active:opacity-70 transition-opacity"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold">{t('logout')}</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};
