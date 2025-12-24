import React, { useMemo } from 'react';
import { Point } from '../types';

interface MapCanvasProps {
  points: Point[];
  hoveredOffset: number | null;
  onHoverOffset: (offset: number | null) => void;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({ points, hoveredOffset, onHoverOffset }) => {
  // Constants for rendering
  const DOT_RADIUS = 1.5;
  const GAP = 8; // Spacing multiplier
  
  // Calculate viewbox based on max x/y in points
  const maxX = useMemo(() => Math.max(...points.map(p => p.x)), [points]);
  const maxY = useMemo(() => Math.max(...points.map(p => p.y)), [points]);
  
  const width = (maxX + 1) * GAP;
  const height = (maxY + 1) * GAP;

  return (
    <div className="relative w-full overflow-hidden flex justify-center items-center py-10">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-6xl select-none"
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => onHoverOffset(null)}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render Background Grid (Water) - Low opacity dots */}
        <g className="opacity-10 transition-opacity duration-500">
           {points.filter(p => !p.isLand).map((p, i) => (
             <circle
               key={`water-${i}`}
               cx={p.x * GAP + GAP/2}
               cy={p.y * GAP + GAP/2}
               r={DOT_RADIUS * 0.8}
               fill="#475569"
               className="transition-colors duration-300"
             />
           ))}
        </g>

        {/* Render Active Time Zone Highlight Background */}
        {hoveredOffset !== null && (
          <rect
             x={((hoveredOffset + 12) * 15 / 360) * width - (width/24)/2} 
             y={0}
             width={width / 24} // Approximate width of 1 hour (15 degrees)
             height={height}
             fill="rgba(6, 182, 212, 0.05)"
             className="transition-all duration-300 ease-out"
          />
        )}

        {/* Render Land Dots */}
        {points.filter(p => p.isLand).map((p, i) => {
           const isActive = hoveredOffset === p.utcOffset;
           const isAdjacent = hoveredOffset !== null && Math.abs(hoveredOffset - p.utcOffset) === 1;

           let fill = "#334155"; // Default Land Slate
           let radius = DOT_RADIUS;
           let opacity = 0.6;
           let filter = "";

           if (isActive) {
             fill = "#22d3ee"; // Cyan-400
             radius = DOT_RADIUS * 1.4;
             opacity = 1;
             filter = "url(#glow)";
           } else if (isAdjacent) {
             fill = "#94a3b8"; // Slate-400
             opacity = 0.8;
           }

           return (
             <circle
               key={`land-${i}`}
               cx={p.x * GAP + GAP/2}
               cy={p.y * GAP + GAP/2}
               r={radius}
               fill={fill}
               opacity={opacity}
               filter={filter}
               className="transition-all duration-200 ease-out"
               onMouseEnter={() => onHoverOffset(p.utcOffset)}
             />
           );
        })}
        
        {/* Invisible Overlay for easier hover detection on empty columns */}
        {Array.from({ length: 25 }).map((_, i) => {
           const offset = i - 12; // -12 to +12
           // Normalize x position
           const colWidth = width / 24; 
           // Need to shift coordinates to align with the map projection logic
           // Map starts at -180 (UTC-12) and goes to +180 (UTC+12)
           // offset -12 corresponds to x=0
           const xPos = ((offset + 12) * colWidth);
           
           return (
             <rect 
                key={`zone-trigger-${offset}`}
                x={xPos}
                y={0}
                width={colWidth}
                height={height}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => onHoverOffset(offset)}
             />
           )
        })}

      </svg>
    </div>
  );
};
