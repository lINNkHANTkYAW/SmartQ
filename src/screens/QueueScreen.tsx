import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Clock, MapPin, AlertCircle, ShoppingBag, Zap, Trophy, ChevronRight } from 'lucide-react';
import { api, MOCK_OFFERS, MOCK_PRODUCTS, MOCK_USER } from '../services/api';
import { QueueToken } from '../types';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import { BottomNav } from '../components/BottomNav';

export const QueueScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [token, setToken] = useState<QueueToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLate, setIsLate] = useState(false);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const fetchStatus = async () => {
        let status = await api.getQueueStatus(id);
        if (!status && id === 'tk-demo') {
          // Create a demo token if it doesn't exist
          status = await api.createToken('b1', MOCK_USER.id);
        }
        setToken(status);
        setLoading(false);
      };

      fetchStatus();
      const interval = setInterval(fetchStatus, 5000);
      return () => clearInterval(interval);
    } else {
      // If no ID, try to find the latest token
      api.getMyTokens(MOCK_USER.id).then(tokens => {
        if (tokens.length > 0) {
          setToken(tokens[tokens.length - 1]);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-full">Loading queue...</div>;
  
  if (!token) return (
    <div className="flex flex-col h-full bg-white items-center justify-center p-10 text-center relative">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
        <Clock size={40} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('noActiveToken')}</h2>
      <p className="text-sm text-gray-500 mb-8">You don't have any active queue tokens at the moment.</p>
      <button 
        onClick={() => navigate('/')}
        className="bg-kbz-primary text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-blue-100 active:scale-95 transition-transform cursor-pointer"
      >
        {t('bookNow')}
      </button>
      <BottomNav />
    </div>
  );

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Header */}
        <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 bg-gray-50 rounded-full text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{t('liveQueue')}</h1>
        </header>

        {/* Token Card */}
        <div className="p-5">
          <motion.div 
            layoutId="token-card"
            className="bg-white rounded-[40px] p-8 shadow-xl shadow-gray-200 border border-gray-100 text-center relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
            
            <div className="relative z-10">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">{t('yourToken')}</p>
              <h2 className="text-6xl font-black text-kbz-primary mb-6 tracking-tighter">{token.tokenNumber}</h2>
              
              <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-50 py-6 mb-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{t('position')}</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-gray-900">{token.position}</span>
                    <span className="text-xs text-gray-500 font-medium">{t('ahead')}</span>
                  </div>
                </div>
                <div className="border-l border-gray-50">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{t('waitTime')}</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-gray-900">{token.estimatedWait}</span>
                    <span className="text-xs text-gray-500 font-medium">{t('mins')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 bg-blue-50 text-kbz-secondary py-3 rounded-2xl px-4">
                <Zap size={16} className="fill-kbz-primary" />
                <span className="text-xs font-bold">
                  {isCheckedIn ? 'Status: Checked In' : isLate ? 'Status: Running Late' : 'Smart Arrival: Check-in window open'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wait-time Commerce */}
        <section className="px-5 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag size={18} className="text-kbz-primary" />
              Wait-time Offers
            </h3>
            <span className="text-[10px] bg-blue-100 text-kbz-secondary font-bold px-2 py-0.5 rounded-full uppercase">Exclusive</span>
          </div>
          
          {MOCK_OFFERS.map(offer => (
            <div key={offer.id} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 text-white mb-6 shadow-lg shadow-blue-100">
              <div className="flex justify-between items-start mb-3">
                <div className="max-w-[60%]">
                  <h4 className="font-bold text-lg leading-tight mb-1">{offer.title}</h4>
                  <p className="text-xs text-blue-100">{offer.description}</p>
                </div>
                <div className="bg-white text-blue-600 font-black text-xl p-3 rounded-2xl shadow-inner">
                  {offer.discount}
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsClaimed(true);
                  alert('Offer claimed! 10% discount applied to your next purchase.');
                }}
                disabled={isClaimed}
                className={`w-full backdrop-blur-md border border-white/30 font-bold py-2.5 rounded-xl text-sm active:scale-95 transition-transform cursor-pointer ${isClaimed ? 'bg-emerald-500/50 text-white/50' : 'bg-white/20 text-white'}`}
              >
                {isClaimed ? 'Offer Claimed' : 'Claim Offer'}
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Recommended for You</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {MOCK_PRODUCTS.map(product => (
              <div key={product.id} className="min-w-[160px] bg-white rounded-3xl p-3 border border-gray-100 shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-28 object-cover rounded-2xl mb-3" referrerPolicy="no-referrer" />
                <h5 className="font-bold text-xs text-gray-900 mb-1 truncate">{product.name}</h5>
                <div className="flex justify-between items-center">
                  <span className="text-kbz-primary font-bold text-sm">{product.price.toLocaleString()} Ks</span>
                  <button 
                    onClick={() => {
                      setCart(prev => [...prev, product.id]);
                      alert(`${product.name} added to cart!`);
                    }}
                    className={`p-1.5 rounded-lg cursor-pointer active:scale-90 transition-transform ${cart.includes(product.id) ? 'bg-blue-100 text-kbz-primary' : 'bg-gray-50 text-gray-400'}`}
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Loyalty Progress */}
        <section className="px-5 mt-4 mb-10">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" />
                <h3 className="font-bold text-gray-900">Loyalty Progress</h3>
              </div>
              <span className="text-xs font-bold text-gray-400">SILVER TIER</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-kbz-primary w-[65%] rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] text-gray-500 font-medium">Complete this session to earn <span className="text-kbz-primary font-bold">50 pts</span></p>
              <Link to="/loyalty" className="text-[10px] font-bold text-kbz-primary flex items-center gap-1 cursor-pointer">
                DETAILS <ChevronRight size={10} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 z-40">
        <button 
          onClick={() => {
            setIsLate(true);
            setIsCheckedIn(false);
            alert('Merchant notified that you are running late.');
          }}
          disabled={isLate}
          className={`flex-1 font-bold py-3 rounded-2xl text-sm cursor-pointer active:scale-95 transition-transform ${isLate ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
        >
          {isLate ? 'Late Notified' : t('runningLate')}
        </button>
        <button 
          onClick={() => {
            setIsCheckedIn(true);
            setIsLate(false);
            alert('Checked in! Please wait for your turn.');
          }}
          disabled={isCheckedIn}
          className={`flex-1 font-bold py-3 rounded-2xl text-sm shadow-lg cursor-pointer active:scale-95 transition-transform ${isCheckedIn ? 'bg-blue-100 text-kbz-primary shadow-none' : 'bg-kbz-primary text-white shadow-blue-100'}`}
        >
          {isCheckedIn ? 'Checked In' : t('imHere')}
        </button>
      </div>
      <BottomNav />
    </div>
  );
};
