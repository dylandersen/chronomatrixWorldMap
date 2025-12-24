import React, { useEffect, useState } from 'react';
import { MapCanvas } from './components/MapCanvas';
import { UtcLegend } from './components/UtcLegend';
import { InfoPanel } from './components/InfoPanel';
import { generateMapPoints } from './utils/geo';
import { Point } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredOffset, setHoveredOffset] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await generateMapPoints();
      setPoints(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center relative overflow-hidden">
      
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,0.5),_rgba(2,6,23,1))]" />
      
      {/* Scanline texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: '100% 2px, 3px 100%' }} />

      <InfoPanel hoveredOffset={hoveredOffset} />

      <main className="flex-1 w-full flex flex-col justify-center items-center z-0 mt-16 px-6">
        {loading ? (
          <div className="flex flex-col items-center gap-4 text-cyan-500 animate-pulse">
            <Loader2 className="w-12 h-12 animate-spin" />
            <span className="font-mono text-sm tracking-widest">INITIALIZING TERRAIN DATA...</span>
          </div>
        ) : (
          <div className="w-full flex flex-col animate-in fade-in duration-1000 slide-in-from-bottom-8">
            <MapCanvas 
                points={points} 
                hoveredOffset={hoveredOffset}
                onHoverOffset={setHoveredOffset}
            />
            <UtcLegend 
                hoveredOffset={hoveredOffset} 
                onHoverOffset={setHoveredOffset}
            />
          </div>
        )}
      </main>
      
      <footer className="w-full py-6 text-center text-slate-600 text-xs font-mono uppercase tracking-widest opacity-50">
         System Status: Online &bull; Projection: Equirectangular &bull; Data: World-Atlas 110m
      </footer>
    </div>
  );
};

export default App;
