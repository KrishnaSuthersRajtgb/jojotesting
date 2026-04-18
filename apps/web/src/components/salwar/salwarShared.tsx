// src/components/salwar/salwarShared.tsx

import React from 'react';
import { P, PD } from './salwarShared.constants';

// eslint-disable-next-line react-refresh/only-export-components
export { P, PD, PL, PM, btnStyle, inputStyle, selectStyle } from './salwarShared.constants';

// ─── SectionBadge ─────────────────────────────────────────────────────────────

interface SectionBadgeProps {
  icon: string;
  label: string;
  filled: number;
  total: number;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ icon, label, filled, total }) => (
  <div
    style={{
      background: `linear-gradient(90deg,${PD},${P})`,
      padding: '11px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <span style={{ fontSize: '15px' }}>{icon}</span>
    <span style={{ color: '#fff', fontWeight: '900', fontSize: '12px', letterSpacing: '1px' }}>
      {label}
    </span>
    <div style={{ flex: 1 }} />
    <div
      style={{
        background: 'rgba(255,255,255,.2)',
        color: '#fff',
        fontSize: '9px',
        padding: '3px 9px',
        borderRadius: '10px',
        fontWeight: '800',
      }}
    >
      {filled}/{total} filled
    </div>
  </div>
);

// ─── AppHeader ────────────────────────────────────────────────────────────────

export const AppHeader: React.FC = () => (
  <div
    style={{
      background: `linear-gradient(120deg,${PD} 0%,${P} 65%,#f48fb1 100%)`,
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 5px 20px rgba(192,68,106,.28)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          background: 'rgba(255,255,255,.22)',
          borderRadius: '12px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
        }}
      >
        🧵
      </div>
      <div>
        <div
          style={{
            color: '#fff',
            fontWeight: '900',
            fontSize: '17px',
            letterSpacing: '1.5px',
            lineHeight: 1.1,
          }}
        >
          SALWAR KAMEEZ
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,.7)',
            fontSize: '9px',
            letterSpacing: '3px',
            marginTop: '3px',
          }}
        >
          MEASUREMENT & STYLE DESIGNER
        </div>
      </div>
    </div>
    <div
      style={{
        background: 'rgba(255,255,255,.2)',
        borderRadius: '10px',
        padding: '6px 13px',
        color: '#fff',
        fontSize: '11px',
        fontWeight: '800',
      }}
    >
      🌸 Est. 2026
    </div>
  </div>
);

// ─── GlobalStyles ─────────────────────────────────────────────────────────────

export const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
    * { box-sizing:border-box; }
    button:hover { opacity:.92; transform:translateY(-1px); }
    button:active { opacity:.85; transform:scale(.98) !important; }
    input::placeholder { color:#e0b8c8; }
    input:focus, select:focus {
      outline:none; border-color:${P} !important;
      box-shadow:0 0 0 3px rgba(232,116,154,0.22) !important;
    }
    .mcard { display:flex; flex-direction:column; align-items:center; gap:5px;
             padding:8px 6px; border-radius:12px; min-width:78px; }
    .mcard label { font-size:9px; font-weight:800; color:#a04060;
                   text-align:center; line-height:1.3; letter-spacing:.2px; }
    .mcard.hl input { border-color:${P}; background:#fff0f5; }
    .avg-badge { font-size:8px; background:linear-gradient(135deg,#ffe082,#ffca28);
                 color:#6b4400; padding:2px 5px; border-radius:5px; font-weight:800; }
    .style-card { cursor:pointer; border-radius:13px; overflow:hidden;
                  border:2px solid #f8d0de; background:#fff; transition:all .18s ease; }
    .style-card:hover { border-color:${P}; transform:translateY(-3px);
                        box-shadow:0 8px 20px rgba(232,116,154,.28); }
    .style-card.sel { border-color:${PD};
                      box-shadow:0 8px 22px rgba(192,68,106,.35);
                      transform:translateY(-3px); }
    .toggle-btn { cursor:pointer; border-radius:9px; padding:9px 16px;
                  font-weight:800; font-size:11px; letter-spacing:.5px;
                  border:2px solid; transition:all .18s; font-family:inherit; }
    @media(max-width:600px){
      .act-row { flex-direction:column !important; }
      .act-row > * { width:100% !important; }
    }
  `}</style>
);
