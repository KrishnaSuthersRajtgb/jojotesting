// src/features/salwar/PantStyleSelectionCard.tsx

import React from 'react';
import { PD, P, PM } from '../../components/salwar/salwarShared';
import PantSVG from '../../components/salwar/PantSVG';
import { pantStyles } from '../../lib/salwarData';

interface PantStyleSelectionCardProps {
  selPant: string;
  onSelPantChange: (v: string) => void;
  noPant: boolean;
  onNoPantToggle: () => void;
  desFront: boolean;
  onDesFrontToggle: () => void;
}

const PantStyleSelectionCard: React.FC<PantStyleSelectionCardProps> = ({
  selPant,
  onSelPantChange,
  noPant,
  onNoPantToggle,
  desFront,
  onDesFrontToggle,
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
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '15px' }}>👖</span>
        <span style={{ color: '#fff', fontWeight: '900', fontSize: '12px', letterSpacing: '1px' }}>
          PANT STYLE SELECTION
        </span>
        <div style={{ flex: 1 }} />

        {/* DESIGNER FRONT toggle */}
        <button
          className="toggle-btn"
          onClick={onDesFrontToggle}
          style={{
            background: desFront ? '#fff' : 'rgba(255,255,255,.15)',
            color: desFront ? PD : '#fff',
            borderColor: desFront ? '#fff' : 'rgba(255,255,255,.4)',
          }}
        >
          🎨 DESIGNER FRONT
        </button>

        {/* NO PANT toggle */}
        <button
          className="toggle-btn"
          onClick={onNoPantToggle}
          style={{
            background: noPant ? '#fff' : 'rgba(255,255,255,.15)',
            color: noPant ? PD : '#fff',
            borderColor: noPant ? '#fff' : 'rgba(255,255,255,.4)',
          }}
        >
          🚫 NO PANT
        </button>
      </div>

      <div style={{ padding: '14px 12px' }}>
        {noPant ? (
          <div
            style={{
              textAlign: 'center',
              padding: '30px 20px',
              color: '#c090a8',
              fontWeight: '800',
              fontSize: '13px',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚫</div>
            No Pant Selected
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))',
              gap: '10px',
            }}
          >
            {pantStyles.map((label) => {
              const sel = selPant === label;
              return (
                <div
                  key={label}
                  className={`style-card${sel ? ' sel' : ''}`}
                  onClick={() => { onSelPantChange(label); }}
                >
                  <div
                    style={{
                      background: sel
                        ? `linear-gradient(135deg,${PD},${P})`
                        : 'linear-gradient(135deg,#fce4ec,#f8bbd0)',
                      width: '100%',
                      paddingBottom: '96%',
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
                      <PantSVG type={label} selected={sel} />
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
        )}

        {/* Notes */}
        <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div
            style={{
              flex: 1,
              minWidth: '220px',
              background: 'linear-gradient(90deg,#fffde7,#fff9c4)',
              border: '1.5px solid #ffe082',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '9.5px',
              color: '#7a5000',
              fontWeight: '700',
              display: 'flex',
              gap: '6px',
            }}
          >
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <span>
              Note: For Punjabi Pant & Double Side Pattiyala — 3rd Bottom Loose, Half Measurement Is
              Required, 3 Measurements Only Required
            </span>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: '220px',
              background: 'linear-gradient(90deg,#fffde7,#fff9c4)',
              border: '1.5px solid #ffe082',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '9.5px',
              color: '#7a5000',
              fontWeight: '700',
              display: 'flex',
              gap: '6px',
            }}
          >
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <span>
              NOTE: For Gathering Pant & Hareem Pant — Bottom Loose, Knee Loose, Round Measurement
              Is Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantStyleSelectionCard;
