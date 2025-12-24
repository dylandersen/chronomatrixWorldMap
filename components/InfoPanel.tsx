import React, { useEffect, useState } from 'react';
import { Clock, Globe } from 'lucide-react';
import { getOffsetLabel } from '../utils/geo';

interface InfoPanelProps {
  hoveredOffset: number | null;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ hoveredOffset }) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const offset = hoveredOffset ?? 0; // Default to UTC if nothing hovered (or local, but UTC is cleaner for map base)
  
  // Calculate time in that zone
  // Get UTC time in ms
  const utcTime = time.getTime() + (time.getTimezoneOffset() * 60000);
  // Add offset
  const zoneTime = new Date(utcTime + (3600000 * offset));

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    });
  };

  const formatDate = (date: Date) => {
     return date.toLocaleDateString('en-US', {
         weekday: 'long',
         month: 'short',
         day: 'numeric'
     });
  };

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
       <div className={`transition-all duration-500 ease-out transform ${hoveredOffset !== null ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-50'}`}>
          <div className="flex items-center gap-2 mb-2 justify-center">
             <Globe className="w-4 h-4 text-cyan-500" />
             <span className="text-cyan-400 font-mono tracking-widest text-sm uppercase">
                {hoveredOffset !== null ? `UTC ${getOffsetLabel(offset)}` : 'UTC WORLD VIEW'}
             </span>
          </div>
          
          <div className="flex items-baseline gap-4 bg-slate-900/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             <Clock className="w-8 h-8 text-slate-400" />
             <div className="flex flex-col">
                <span className="text-5xl font-bold text-white tracking-tight font-mono tabular-nums text-shadow-glow">
                   {formatTime(zoneTime)}
                </span>
                <span className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-wide text-right">
                   {formatDate(zoneTime)}
                </span>
             </div>
          </div>
       </div>
    </div>
  );
};
