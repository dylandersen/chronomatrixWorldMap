import React from 'react';
import { getOffsetLabel } from '../utils/geo';
import clsx from 'clsx';

interface UtcLegendProps {
  hoveredOffset: number | null;
  onHoverOffset: (offset: number) => void;
}

export const UtcLegend: React.FC<UtcLegendProps> = ({ hoveredOffset, onHoverOffset }) => {
  // Generate offsets from -12 to +12, excluding +13/14 for standard width
  const offsets = Array.from({ length: 25 }, (_, i) => i - 12);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-4">
      <div className="flex justify-between items-center relative border-t border-slate-800 pt-2">
        {offsets.map((offset) => {
            const isActive = hoveredOffset === offset;
            
            return (
                <div
                    key={offset}
                    className="flex-1 flex flex-col items-center group cursor-pointer"
                    onMouseEnter={() => onHoverOffset(offset)}
                >
                    {/* Tick Mark */}
                    <div className={clsx(
                        "w-px mb-2 transition-all duration-300",
                        isActive ? "h-4 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "h-2 bg-slate-700 group-hover:bg-slate-500"
                    )} />
                    
                    {/* Label */}
                    <span className={clsx(
                        "text-[10px] font-mono transition-all duration-300 select-none",
                        isActive ? "text-cyan-400 font-bold scale-125" : "text-slate-600 group-hover:text-slate-400"
                    )}>
                        {getOffsetLabel(offset)}
                    </span>
                </div>
            );
        })}
      </div>
    </div>
  );
};
