// src/components/salwar/salwarShared.constants.ts
import React from 'react';

export const P = '#e8749a';
export const PD = '#c0446a';
export const PL = '#fce4ec';
export const PM = '#f8bbd0';

export const btnStyle = (bg = PD, outline = false): React.CSSProperties => ({
  background: outline ? 'transparent' : `linear-gradient(135deg,${bg},${bg === PD ? P : bg})`,
  color: outline ? PD : '#fff',
  border: outline ? `2px solid ${PD}` : 'none',
  borderRadius: '10px',
  padding: '10px 18px',
  cursor: 'pointer',
  fontWeight: '800',
  fontSize: '11px',
  letterSpacing: '0.7px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  boxShadow: outline ? 'none' : '0 4px 14px rgba(192,68,106,0.28)',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  transition: 'all 0.18s',
});

export const inputStyle = (highlight = false): React.CSSProperties => ({
  width: '68px',
  padding: '7px 5px',
  borderRadius: '8px',
  border: `1.5px solid ${highlight ? P : '#f0b8cc'}`,
  background: highlight ? '#fff0f5' : '#fff',
  textAlign: 'center',
  fontSize: '12px',
  fontFamily: 'inherit',
  color: '#4a1530',
  transition: 'border-color .15s,box-shadow .15s',
});

export const selectStyle = (): React.CSSProperties => ({
  padding: '7px 8px',
  borderRadius: '8px',
  border: `1.5px solid #f0b8cc`,
  background: '#fff',
  fontSize: '11px',
  fontFamily: 'inherit',
  color: '#4a1530',
  minWidth: '110px',
});