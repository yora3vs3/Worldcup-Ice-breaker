import React from 'react';
import { JerseyPattern } from '../types';

interface JerseyRendererProps {
  primaryColor: string;
  secondaryColor: string;
  pattern: JerseyPattern;
  number?: string;
  countryName?: string;
  className?: string;
  showBadge?: boolean;
}

export default function JerseyRenderer({
  primaryColor,
  secondaryColor,
  pattern,
  number = "10",
  className = "w-48 h-48",
  showBadge = true,
}: JerseyRendererProps) {
  // Generate a unique ID prefix to prevent SVG element collisions
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vertical Stripes Pattern */}
          <pattern
            id={`${idPrefix}-stripes`}
            width="20"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="10" height="100" fill={primaryColor} />
            <rect x="10" width="10" height="100" fill={secondaryColor} />
          </pattern>

          {/* Horizontal Hoops Pattern */}
          <pattern
            id={`${idPrefix}-hoops`}
            width="100"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="10" fill={primaryColor} />
            <rect y="10" width="100" height="10" fill={secondaryColor} />
          </pattern>

          {/* Checkered Pattern */}
          <pattern
            id={`${idPrefix}-checkered`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill={primaryColor} />
            <rect x="12" width="12" height="12" fill={primaryColor} />
            <rect y="12" width="12" height="12" fill={secondaryColor} />
            <rect x="12" y="12" width="12" height="12" fill={secondaryColor} />
            <rect x="12" width="12" height="12" fill={secondaryColor} />
            <rect y="12" width="12" height="12" fill={primaryColor} />
          </pattern>

          {/* Diagonal Sash Pattern (Simulated via overlay) */}
          <linearGradient id={`${idPrefix}-sash-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="40%" stopColor={primaryColor} />
            <stop offset="40%" stopColor={secondaryColor} />
            <stop offset="60%" stopColor={secondaryColor} />
            <stop offset="60%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={primaryColor} />
          </linearGradient>

          {/* Halves Split */}
          <linearGradient id={`${idPrefix}-halves-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="50%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>

          {/* 3D Jersey Fabric Crease Gradient Overlay */}
          <linearGradient id={`${idPrefix}-fabric-shading`} x1="0" y1="0" x2="100" y2="0">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="15%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
          </linearGradient>

          {/* Sleeves Shading */}
          <radialGradient id={`${idPrefix}-sleeve-shading-left`} cx="20%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </radialGradient>
          
          <radialGradient id={`${idPrefix}-sleeve-shading-right`} cx="80%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </radialGradient>
        </defs>

        {/* Outer Shadow Group */}
        <g>
          {/* Main Kit Silhouette */}
          <path
            id="jersey-body-base"
            d="M 38,12 L 20,16 L 8,30 L 18,38 L 28,32 L 28,84 C 28,86 30,88 32,88 L 68,88 C 70,88 72,86 72,84 L 72,32 L 82,38 L 92,30 L 80,16 L 62,12 C 58,18 42,18 38,12 Z"
            fill={
              pattern === 'stripes'
                ? `url(#${idPrefix}-stripes)`
                : pattern === 'hoops'
                ? `url(#${idPrefix}-hoops)`
                : pattern === 'checkered'
                ? `url(#${idPrefix}-checkered)`
                : pattern === 'sash'
                ? `url(#${idPrefix}-sash-grad)`
                : pattern === 'halves'
                ? `url(#${idPrefix}-halves-grad)`
                : primaryColor
            }
          />

          {/* Trim / Highlights on sleeves */}
          {/* Left sleeve cuff */}
          <path
            d="M 8,30 L 10,26 L 19,34 L 18,38 Z"
            fill={secondaryColor}
            opacity="0.9"
          />
          {/* Right sleeve cuff */}
          <path
            d="M 92,30 L 90,26 L 81,34 L 82,38 Z"
            fill={secondaryColor}
            opacity="0.9"
          />

          {/* V-Neck / Collar trim */}
          <path
            d="M 38,12 C 42,18 58,18 62,12 L 60,15 C 56,20 44,20 40,15 Z"
            fill={secondaryColor}
          />
          <path
            d="M 38,12 L 40,15 L 50,26 L 60,15 L 62,12 L 50,22 Z"
            fill={secondaryColor}
          />

          {/* Fabric depth shading layered on top */}
          <path
            d="M 38,12 L 20,16 L 8,30 L 18,38 L 28,32 L 28,84 C 28,86 30,88 32,88 L 68,88 C 70,88 72,86 72,84 L 72,32 L 82,38 L 92,30 L 80,16 L 62,12 C 58,18 42,18 38,12 Z"
            fill={`url(#${idPrefix}-fabric-shading)`}
            mixBlendMode="multiply"
            pointerEvents="none"
          />

          {/* Specific Sleeves 3D Shading */}
          <path
            d="M 38,12 L 20,16 L 8,30 L 18,38 L 28,32 Z"
            fill={`url(#${idPrefix}-sleeve-shading-left)`}
            opacity="0.35"
            mixBlendMode="multiply"
            pointerEvents="none"
          />
          <path
            d="M 72,32 L 82,38 L 92,30 L 80,16 L 62,12 Z"
            fill={`url(#${idPrefix}-sleeve-shading-right)`}
            opacity="0.35"
            mixBlendMode="multiply"
            pointerEvents="none"
          />

          {/* Stylized Badge (Crest) on the left chest */}
          {showBadge && (
            <g transform="translate(36, 30) scale(0.6)">
              {/* Shield outline */}
              <path
                d="M -6,-8 L 6,-8 L 6,0 C 6,5 0,9 0,9 C 0,9 -6,5 -6,0 Z"
                fill={secondaryColor}
                stroke={primaryColor}
                strokeWidth="1"
              />
              {/* Mini gold star above crest */}
              <polygon
                points="0,-13 -2,-10 -6,-10 -3,-8 -4,-4 0,-6 4,-4 3,-8 6,-10 2,-10"
                fill="#FFD700"
                transform="scale(0.5) translate(0, -5)"
              />
            </g>
          )}

          {/* Player Number in center of jersey */}
          <text
            x="50"
            y="60"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="bold"
            fontSize="18"
            fill={pattern === 'stripes' || pattern === 'checkered' ? primaryColor : secondaryColor}
            stroke={pattern === 'stripes' || pattern === 'checkered' ? secondaryColor : primaryColor}
            strokeWidth="1"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ letterSpacing: '-0.5px' }}
          >
            {number}
          </text>
        </g>
      </svg>
    </div>
  );
}
