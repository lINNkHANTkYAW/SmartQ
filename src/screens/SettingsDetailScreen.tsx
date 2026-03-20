import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SettingsDetailScreen: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getTitle = () => {
    switch (type) {
      case 'personal': return t('personalInfo');
      case 'security': return t('security');
      case 'notifications': return t('notifications');
      case 'payment': return t('payment');
      case 'help': return t('help');
      default: return 'Settings';
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
        </div>
        <button 
          onClick={() => {
            alert('Settings saved successfully!');
            navigate(-1);
          }}
          className="text-emerald-600 font-bold text-sm cursor-pointer"
        >
          Save
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        {type === 'personal' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <input type="text" defaultValue="Kyaw Zayar" className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
              <input type="tel" defaultValue="09123456789" className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <input type="email" defaultValue="kyaw.zayar@example.com" className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        )}

        {type === 'security' && (
          <div className="space-y-4">
            <button className="w-full flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer">
              <span className="text-sm font-bold text-gray-700">Change Password</span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer">
              <span className="text-sm font-bold text-gray-700">Two-Factor Authentication</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </button>
          </div>
        )}

        {type === 'notifications' && (
          <div className="space-y-4">
            {['Push Notifications', 'Email Notifications', 'SMS Alerts', 'Queue Updates'].map((item) => (
              <div key={item} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100">
                <span className="text-sm font-bold text-gray-700">{item}</span>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {type === 'payment' && (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                <span className="text-sm font-bold text-gray-700">**** 4242</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Primary</span>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm cursor-pointer">
              + Add New Card
            </button>
          </div>
        )}

        {type === 'help' && (
          <div className="space-y-4">
            {['FAQ', 'Contact Support', 'Terms of Service', 'Privacy Policy'].map((item) => (
              <button key={item} className="w-full flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer">
                <span className="text-sm font-bold text-gray-700">{item}</span>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
