import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Calendar, Clock, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-kbz-primary' : 'text-gray-400'}`}>
        <Search size={22} />
        <span className="text-[10px] font-bold">{t('explore')}</span>
      </Link>
      <Link to="/bookings" className={`flex flex-col items-center gap-1 ${isActive('/bookings') ? 'text-kbz-primary' : 'text-gray-400'}`}>
        <Calendar size={22} />
        <span className="text-[10px] font-medium">{t('bookings')}</span>
      </Link>
      <Link to="/queue" className={`flex flex-col items-center gap-1 ${isActive('/queue') ? 'text-kbz-primary' : 'text-gray-400'}`}>
        <Clock size={22} />
        <span className="text-[10px] font-medium">{t('queue')}</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-kbz-primary' : 'text-gray-400'}`}>
        <User size={22} />
        <span className="text-[10px] font-medium">{t('profile')}</span>
      </Link>
    </nav>
  );
};
