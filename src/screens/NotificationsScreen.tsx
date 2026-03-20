import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, MessageSquare, Tag, Info } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const notifications = [
    { icon: <Bell className="text-blue-500" />, title: 'Your turn is coming up!', desc: 'You are next in queue at Glow Up Studio. Please head to the branch.', time: '2 mins ago' },
    { icon: <Tag className="text-emerald-500" />, title: 'Special Offer!', desc: 'Get 20% off on all spa services this weekend.', time: '1 hour ago' },
    { icon: <MessageSquare className="text-purple-500" />, title: 'Booking Confirmed', desc: 'Your booking for Hair Cut & Styling is confirmed.', time: 'Yesterday' },
  ];

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gray-50">
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-600 cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar">
        {notifications.map((n, idx) => (
          <button 
            key={idx} 
            onClick={() => alert(`Opening notification: ${n.title}`)}
            className="w-full text-left bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 cursor-pointer active:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
              {n.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">{n.title}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.desc}</p>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">{n.time}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
