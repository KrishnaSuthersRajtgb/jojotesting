import React from 'react';

interface PantSVGProps {
  type: string;
  selected: boolean;
}

const PantSVG: React.FC<PantSVGProps> = ({ type, selected }) => {
  const fill = selected ? '#fff' : '#f5e6ea';
  const dark = selected ? 'rgba(255,255,255,0.6)' : '#e8d0d8';
  const line = selected ? 'rgba(255,255,255,0.8)' : '#d4a0b0';

  const s: Record<string, React.ReactElement> = {
    'PUNJABI PANT': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path d="M15 10 L65 10 L65 20 L15 20Z" fill={dark} />
        <path d="M15 20 Q10 50 18 90 L38 90 L40 50 L42 90 L62 90 Q70 50 65 20Z" fill={fill} />
        <path d="M15 20 Q12 35 14 50" fill="none" stroke={line} strokeWidth="1.5" />
        <path d="M65 20 Q68 35 66 50" fill="none" stroke={line} strokeWidth="1.5" />
        <line x1="15" y1="10" x2="65" y2="10" stroke={line} strokeWidth="1.5" />
        <line x1="15" y1="20" x2="65" y2="20" stroke={line} strokeWidth="1" />
        <path
          d="M25 20 Q22 40 24 60"
          fill="none"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M55 20 Q58 40 56 60"
          fill="none"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'DOUBLE SIDE PATTIYALA': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path d="M15 10 L65 10 L65 20 L15 20Z" fill={dark} />
        <path d="M15 20 Q5 55 14 90 L38 90 L40 55 L42 90 L66 90 Q75 55 65 20Z" fill={fill} />
        <line x1="15" y1="10" x2="65" y2="10" stroke={line} strokeWidth="1.5" />
        <line x1="15" y1="20" x2="65" y2="20" stroke={line} strokeWidth="1" />
        <path d="M20 20 Q14 45 16 70" fill="none" stroke={line} strokeWidth="1.2" />
        <path d="M60 20 Q66 45 64 70" fill="none" stroke={line} strokeWidth="1.2" />
        <path
          d="M28 20 Q24 45 26 70"
          fill="none"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M52 20 Q56 45 54 70"
          fill="none"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'GATHERING PANT': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path d="M15 10 L65 10 L65 20 L15 20Z" fill={dark} />
        <path d="M15 20 Q8 50 20 90 L38 90 L40 60 L42 90 L60 90 Q72 50 65 20Z" fill={fill} />
        <line x1="15" y1="10" x2="65" y2="10" stroke={line} strokeWidth="1.5" />
        <line x1="15" y1="20" x2="65" y2="20" stroke={line} strokeWidth="1" />
        {[22, 28, 34, 40, 46, 52, 58].map((x, i) => (
          <path
            key={i}
            d={`M${String(x)} 20 Q${String(x - 2)} 35 ${String(x)} 50`}
            fill="none"
            stroke={line}
            strokeWidth="0.8"
          />
        ))}
      </svg>
    ),
    'STRAIGHT PANT': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path d="M18 10 L62 10 L62 20 L18 20Z" fill={dark} />
        <path d="M18 20 L16 90 L37 90 L40 55 L43 90 L64 90 L62 20Z" fill={fill} />
        <line x1="18" y1="10" x2="62" y2="10" stroke={line} strokeWidth="1.5" />
        <line x1="18" y1="20" x2="62" y2="20" stroke={line} strokeWidth="1" />
        <line x1="16" y1="90" x2="37" y2="90" stroke={line} strokeWidth="1.2" />
        <line x1="43" y1="90" x2="64" y2="90" stroke={line} strokeWidth="1.2" />
      </svg>
    ),
    'HAREEM PANT': (
      <svg viewBox="0 0 80 100" width="100%" height="100%">
        <path d="M18 10 L62 10 L62 20 L18 20Z" fill={dark} />
        <path
          d="M18 20 Q10 60 22 78 L30 82 L38 90 L42 90 L50 82 L58 78 Q70 60 62 20Z"
          fill={fill}
        />
        <line x1="18" y1="10" x2="62" y2="10" stroke={line} strokeWidth="1.5" />
        <line x1="18" y1="20" x2="62" y2="20" stroke={line} strokeWidth="1" />
        <path
          d="M25 20 Q18 50 22 72"
          fill="none"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M55 20 Q62 50 58 72"
          fill="none"
          stroke={line}
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <line x1="38" y1="90" x2="42" y2="90" stroke={line} strokeWidth="2" />
      </svg>
    ),
  };

  return (s[type] ?? s['STRAIGHT PANT']) as React.ReactElement;
};

export default PantSVG;
