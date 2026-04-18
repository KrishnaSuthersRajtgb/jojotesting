import React from 'react';

interface TopSVGProps {
  type: string;
  selected: boolean;
}

const TopSVG: React.FC<TopSVGProps> = ({ type, selected }) => {
  const fill = selected ? '#fff' : '#f5e6ea';
  const dark = selected ? 'rgba(255,255,255,0.6)' : '#e8d0d8';
  const line = selected ? 'rgba(255,255,255,0.8)' : '#d4a0b0';

  const s: Record<string, React.ReactElement> = {
    'SIMPLE KURTHA': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M20 18 L10 35 L20 38 L18 90 L62 90 L60 38 L70 35 L60 18 Q50 24 40 24 Q30 24 20 18Z"
          fill={fill}
        />
        <path d="M20 18 L10 35 L20 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M60 18 L70 35 L60 38" fill="none" stroke={line} strokeWidth="1.2" />
        <ellipse cx="40" cy="20" rx="10" ry="6" fill={dark} />
        <line x1="18" y1="90" x2="62" y2="90" stroke={line} strokeWidth="1" />
      </svg>
    ),
    'COLLAR KURTHA': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M20 18 L10 35 L20 38 L18 90 L62 90 L60 38 L70 35 L60 18 Q50 24 40 24 Q30 24 20 18Z"
          fill={fill}
        />
        <path d="M20 18 L10 35 L20 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M60 18 L70 35 L60 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M32 14 L40 26 L48 14 Q40 10 32 14Z" fill={dark} />
        <path d="M32 14 L36 22 L40 16" fill="none" stroke={line} strokeWidth="1" />
        <path d="M48 14 L44 22 L40 16" fill="none" stroke={line} strokeWidth="1" />
        <line
          x1="40"
          y1="26"
          x2="40"
          y2="55"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'BOAT NECK KURTHA': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M20 18 L10 35 L20 38 L18 90 L62 90 L60 38 L70 35 L60 18 Q50 24 40 24 Q30 24 20 18Z"
          fill={fill}
        />
        <path d="M20 18 L10 35 L20 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M60 18 L70 35 L60 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M24 16 Q40 12 56 16" fill="none" stroke={dark} strokeWidth="3" />
      </svg>
    ),
    'HALTER NECK KURTHA': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M22 28 L12 44 L22 46 L20 90 L60 90 L58 46 L68 44 L58 28 Q50 36 40 36 Q30 36 22 28Z"
          fill={fill}
        />
        <path d="M22 28 L12 44 L22 46" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M58 28 L68 44 L58 46" fill="none" stroke={line} strokeWidth="1.2" />
        <path
          d="M30 12 L40 8 L50 12 L50 28 Q45 34 40 34 Q35 34 30 28Z"
          fill={fill}
          stroke={line}
          strokeWidth="1"
        />
        <path d="M34 12 L40 8 L46 12 L40 18Z" fill={dark} />
        <line x1="30" y1="12" x2="40" y2="8" stroke={line} strokeWidth="1.5" />
        <line x1="50" y1="12" x2="40" y2="8" stroke={line} strokeWidth="1.5" />
      </svg>
    ),
    'SHORT TOP': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M20 18 L10 35 L20 38 L19 62 L61 62 L60 38 L70 35 L60 18 Q50 24 40 24 Q30 24 20 18Z"
          fill={fill}
        />
        <path d="M20 18 L10 35 L20 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M60 18 L70 35 L60 38" fill="none" stroke={line} strokeWidth="1.2" />
        <ellipse cx="40" cy="20" rx="10" ry="6" fill={dark} />
        <line x1="19" y1="62" x2="61" y2="62" stroke={line} strokeWidth="1.5" />
      </svg>
    ),
    'FULL PANEL KURTHA': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M22 18 L10 35 L20 38 L10 90 L70 90 L60 38 L70 35 L58 18 Q50 24 40 24 Q30 24 22 18Z"
          fill={fill}
        />
        <path d="M22 18 L10 35 L20 38" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M58 18 L70 35 L60 38" fill="none" stroke={line} strokeWidth="1.2" />
        <ellipse cx="40" cy="20" rx="10" ry="6" fill={dark} />
        <line
          x1="34"
          y1="38"
          x2="20"
          y2="90"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        <line
          x1="46"
          y1="38"
          x2="60"
          y2="90"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        <line
          x1="40"
          y1="38"
          x2="40"
          y2="90"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
      </svg>
    ),
    LEHENGA: (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path
          d="M26 18 L18 30 L24 32 L22 50 L58 50 L56 32 L62 30 L54 18 Q47 22 40 22 Q33 22 26 18Z"
          fill={fill}
        />
        <ellipse cx="40" cy="20" rx="9" ry="5" fill={dark} />
        <path d="M22 50 L8 92 L72 92 L58 50Z" fill={fill} stroke={line} strokeWidth="1" />
        <line
          x1="30"
          y1="50"
          x2="18"
          y2="92"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        <line
          x1="40"
          y1="50"
          x2="40"
          y2="92"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        <line
          x1="50"
          y1="50"
          x2="62"
          y2="92"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        <line x1="22" y1="50" x2="58" y2="50" stroke={line} strokeWidth="1.5" />
      </svg>
    ),
  };

  return (s[type] ?? s['SIMPLE KURTHA']) as React.ReactElement;
};

export default TopSVG;
