// src/features/salwar/TopStyleSelectionCard.tsx

import React from 'react';
import { PD, P, PM } from '../../components/salwar/salwarShared';
import TopSVG from '../../components/salwar/TopSVG';
import { topStyles } from '../../lib/salwarData';

interface TopStyleSelectionCardProps {
  selTop: string;
  onSelTopChange: (v: string) => void;
}

const TopStyleSelectionCard: React.FC<TopStyleSelectionCardProps> = ({
  selTop,
  onSelTopChange,
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '18px',
        border: `2px solid ${PM}`,
        boxShadow: '0 8px 28px rgba(232,116,154,.12)',
        marginBottom: '16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg,${PD},${P})`,
          padding: '11px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '15px' }}>👗</span>
        <span style={{ color: '#fff', fontWeight: '900', fontSize: '12px', letterSpacing: '1px' }}>
          TOP STYLE SELECTION
        </span>
        <div style={{ flex: 1 }} />
        <div
          style={{
            background: 'rgba(255,255,255,.18)',
            color: '#fff',
            fontSize: '9px',
            padding: '3px 10px',
            borderRadius: '10px',
            fontWeight: '800',
          }}
        >
          Selected: {selTop}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
          <span style={{ color: 'rgba(255,255,255,.82)', fontSize: '10px', fontWeight: '700' }}>
            Top Type
          </span>
          <select
            style={{
              padding: '4px 8px',
              border: '2px solid rgba(255,255,255,.4)',
              borderRadius: '7px',
              fontSize: '10px',
              background: 'rgba(255,255,255,.18)',
              color: '#fff',
              fontFamily: 'inherit',
              minWidth: '90px',
            }}
          >
            <option style={{ color: '#333' }}>— Select —</option>
            <option style={{ color: '#333' }}>Regular</option>
            <option style={{ color: '#333' }}>Fitted</option>
            <option style={{ color: '#333' }}>Flared</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '14px 12px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
            gap: '10px',
          }}
        >
          {topStyles.map((label) => {
            const sel = selTop === label;
            return (
              <div
                key={label}
                className={`style-card${sel ? ' sel' : ''}`}
                onClick={() => { onSelTopChange(label); }}
              >
                <div
                  style={{
                    background: sel
                      ? `linear-gradient(135deg,${PD},${P})`
                      : 'linear-gradient(135deg,#fce4ec,#f8bbd0)',
                    width: '100%',
                    paddingBottom: '88%',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <TopSVG type={label} selected={sel} />
                  </div>
                  {sel && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: '#fff',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: PD,
                        fontWeight: '900',
                        boxShadow: '0 2px 6px rgba(0,0,0,.15)',
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: '6px 4px',
                    fontSize: '8.5px',
                    fontWeight: sel ? '900' : '700',
                    color: sel ? PD : '#b06080',
                    textAlign: 'center',
                    lineHeight: '1.3',
                    minHeight: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopStyleSelectionCard;
