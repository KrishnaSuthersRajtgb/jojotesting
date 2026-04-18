import React from 'react';

interface BlouseSVGProps {
  type: string;
  selected: boolean;
}

const BlouseSVG: React.FC<BlouseSVGProps> = ({ type, selected }) => {
  const bg = selected ? '#c0446a' : '#e8749a';
  const c = '#f5e6ea';
  const cd = '#e8d0d8';

  const shapes: Record<string, React.ReactElement> = {
    'YOKE BLOUSE': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="30" width="70" height="45" rx="3" fill={c} />
        <path d="M15 30 L10 55 L22 57 L25 32 Z" fill={cd} />
        <path d="M85 30 L90 55 L78 57 L75 32 Z" fill={cd} />
        <path d="M25 18 Q50 16 75 18 L75 30 Q60 36 50 36 Q40 36 25 30 Z" fill={c} />
        <path d="M35 18 Q50 24 65 18 Q50 14 35 18 Z" fill={bg} />
        <line x1="25" y1="30" x2="75" y2="30" stroke="#d4a0b0" strokeWidth="1.5" />
      </svg>
    ),
    'YOKE BLOUSE BACK BUTTON': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="30" width="70" height="45" rx="3" fill={c} />
        <path d="M15 30 L10 55 L22 57 L25 32 Z" fill={cd} />
        <path d="M85 30 L90 55 L78 57 L75 32 Z" fill={cd} />
        <path d="M25 18 Q50 16 75 18 L75 30 Q60 36 50 36 Q40 36 25 30 Z" fill={c} />
        <path d="M38 18 Q50 26 62 18 Q50 13 38 18 Z" fill={bg} />
        <line x1="25" y1="30" x2="75" y2="30" stroke="#d4a0b0" strokeWidth="1.5" />
        <circle cx="50" cy="23" r="2" fill="#b07888" />
        <circle cx="50" cy="29" r="2" fill="#b07888" />
      </svg>
    ),
    'CLOSE NECK': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="28" width="70" height="47" rx="3" fill={c} />
        <path d="M15 28 L8 55 L22 57 L25 30 Z" fill={cd} />
        <path d="M85 28 L92 55 L78 57 L75 30 Z" fill={cd} />
        <path d="M30 12 Q50 10 70 12 L75 28 Q60 22 50 22 Q40 22 25 28 Z" fill={c} />
        <ellipse cx="50" cy="18" rx="10" ry="7" fill={bg} />
      </svg>
    ),
    'KATORI BLOUSE': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="30" width="70" height="45" rx="3" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M28 14 Q50 12 72 14 L75 30 L50 38 L25 30 Z" fill={c} />
        <path d="M37 16 Q50 30 63 16 Q50 11 37 16 Z" fill={bg} />
        <line x1="25" y1="30" x2="50" y2="38" stroke="#d4a0b0" strokeWidth="1" />
        <line x1="75" y1="30" x2="50" y2="38" stroke="#d4a0b0" strokeWidth="1" />
      </svg>
    ),
    'HALTER NECK': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="20" y="35" width="60" height="40" rx="3" fill={c} />
        <path d="M20 35 L14 56 L26 58 L28 37 Z" fill={cd} />
        <path d="M80 35 L86 56 L74 58 L72 37 Z" fill={cd} />
        <path d="M35 14 L50 10 L65 14 L65 35 Q55 42 50 42 Q45 42 35 35 Z" fill={c} />
        <path d="M42 14 L50 10 L58 14 L50 22 Z" fill={bg} />
        <line x1="35" y1="14" x2="50" y2="10" stroke="#c08898" strokeWidth="1.5" />
        <line x1="65" y1="14" x2="50" y2="10" stroke="#c08898" strokeWidth="1.5" />
      </svg>
    ),
    'PRINCESS CUT WITH BELT': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <path d="M15 30 L12 75 L88 75 L85 30 L75 25 Q50 34 25 25 Z" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M35 18 Q50 28 65 18 Q50 14 35 18 Z" fill={bg} />
        <rect x="12" y="56" width="76" height="6" rx="2" fill="#d4a8b8" />
        <line x1="25" y1="30" x2="75" y2="30" stroke="#d4a0b0" strokeWidth="1" />
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="56"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'PRINCESS CUT WITHOUT BELT': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <path d="M15 30 L12 75 L88 75 L85 30 L75 25 Q50 34 25 25 Z" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M35 18 Q50 28 65 18 Q50 14 35 18 Z" fill={bg} />
        <line x1="25" y1="30" x2="75" y2="30" stroke="#d4a0b0" strokeWidth="1" />
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="75"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    '3 DART BOAT NECK': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="30" width="70" height="45" rx="3" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M22 22 Q50 16 78 22 L75 30 L25 30 Z" fill={c} />
        <path d="M26 22 Q50 18 74 22" fill="none" stroke={bg} strokeWidth="3" />
        <line
          x1="35"
          y1="30"
          x2="35"
          y2="60"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <line
          x1="50"
          y1="30"
          x2="50"
          y2="60"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <line
          x1="65"
          y1="30"
          x2="65"
          y2="60"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'BOAT NECK PRINCESS CUT WITH BELT': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <path d="M15 30 L12 75 L88 75 L85 30 L75 25 Q50 20 25 25 Z" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M22 22 Q50 16 78 22 L75 25 Q50 20 25 25 Z" fill={c} />
        <path d="M26 22 Q50 18 74 22" fill="none" stroke={bg} strokeWidth="3" />
        <rect x="12" y="56" width="76" height="6" rx="2" fill="#d4a8b8" />
        <line
          x1="50"
          y1="30"
          x2="50"
          y2="56"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'BOAT NECK PRINCESS CUT WITHOUT BELT': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <path d="M15 30 L12 75 L88 75 L85 30 L75 25 Q50 20 25 25 Z" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M22 22 Q50 16 78 22 L75 25 Q50 20 25 25 Z" fill={c} />
        <path d="M26 22 Q50 18 74 22" fill="none" stroke={bg} strokeWidth="3" />
        <line
          x1="50"
          y1="30"
          x2="50"
          y2="75"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'BOAT AND DEEP 3 DART': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="30" width="70" height="45" rx="3" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M22 22 Q50 16 78 22 L75 30 L25 30 Z" fill={c} />
        <path d="M26 22 Q50 18 74 22" fill="none" stroke={bg} strokeWidth="3" />
        <path d="M42 30 Q50 44 58 30" fill={bg} opacity="0.4" />
        <line
          x1="35"
          y1="30"
          x2="35"
          y2="60"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <line
          x1="65"
          y1="30"
          x2="65"
          y2="60"
          stroke="#d4a0b0"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
      </svg>
    ),
    'DEEP NECK': (
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        <rect x="15" y="30" width="70" height="45" rx="3" fill={c} />
        <path d="M15 30 L8 54 L22 56 L25 32 Z" fill={cd} />
        <path d="M85 30 L92 54 L78 56 L75 32 Z" fill={cd} />
        <path d="M28 14 Q50 12 72 14 L75 30 L25 30 Z" fill={c} />
        <path d="M35 16 Q50 38 65 16 Q50 12 35 16 Z" fill={bg} />
      </svg>
    ),
  };

  return (shapes[type] ?? shapes['YOKE BLOUSE']) as React.ReactElement;
};

export default BlouseSVG;
