import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Store } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMerchant = location.pathname.startsWith('/merchant');

  return (
    <div className="relative flex items-center justify-center w-full h-full p-4">
      {/* Outer Device Shell */}
      <div className="relative w-[390px] h-[844px] max-w-full max-h-[95vh] bg-black rounded-[60px] shadow-2xl border-[8px] border-zinc-800 overflow-hidden flex flex-col">
        
        {/* Notch / Dynamic Island Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
        </div>

        {/* Status Bar Mock */}
        <div className="h-12 w-full bg-white flex items-end justify-between px-8 pb-1 z-40">
          <span className="text-xs font-semibold">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 rounded-full border border-black/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold">5G</span>
            <div className="w-5 h-2.5 border border-black/30 rounded-sm relative">
              <div className="absolute left-0 top-0 h-full bg-black w-4/5"></div>
            </div>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 w-full bg-gray-50 overflow-hidden relative flex flex-col">
          {/* Screens will handle their own scrolling and fixed elements */}
          {children}
        </div>

        {/* Home Indicator */}
        <div className="h-8 w-full bg-white flex items-center justify-center z-40">
          <div className="w-32 h-1.5 bg-zinc-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
