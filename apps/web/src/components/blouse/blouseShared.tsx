// src/components/blouse/blouseShared.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const P = '#e8749a';
export const PD = '#c0446a';
export const PL = '#fce4ec';
export const PM = '#f8bbd0';

export const AppHeaderSimple: React.FC = () => (
  <div
    className="flex items-center justify-between px-4 py-3"
    style={{
      background: 'linear-gradient(90deg,#c0446a,#e8749a)',
      boxShadow: '0 4px 16px rgba(192,68,106,.3)',
    }}
  >
    <div className="flex items-center gap-2">
      <span className="text-xl">🪡</span>
      <div>
        <div className="text-white font-black text-base tracking-widest">TAILOR </div>
        <div className="text-xs font-bold" style={{ color: 'rgba(255,255,255,.75)' }}>
          Blouse Measurement Studio
        </div>
      </div>
    </div>
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs"
      style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}
    >
      <span>✂️</span> STITCH SMART
    </div>
  </div>
);

export function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabs = [
    { label: 'BLOUSE MEASUREMENT', path: '/blouseMeasurementPage' },
    { label: 'SALWAR KAMEEZ MEASUREMENT', path: '/salwarKameezPage' },
  ];

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: 'linear-gradient(120deg,#c0446a 0%,#e8749a 65%,#f48fb1 100%)',
          boxShadow: '0 5px 20px rgba(192,68,106,.28)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl text-2xl"
            style={{ background: 'rgba(255,255,255,.22)' }}
          >
            ✂️
          </div>
          <div>
            <div className="text-white font-black text-lg tracking-widest leading-tight">
              BOUTIQUE TAILOR
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: 'rgba(255,255,255,.7)', letterSpacing: '3px' }}
            >
              CUSTOM BLOUSE DESIGNER
            </div>
          </div>
        </div>
        <div
          className="text-white text-xs font-extrabold px-3 py-1.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,.2)' }}
        >
          🌸 Est. 2026
        </div>
      </div>

      <div
        className="bg-white overflow-x-auto"
        style={{
          borderBottom: '3px solid #f8bbd0',
          boxShadow: '0 2px 12px rgba(232,116,154,.1)',
        }}
      >
        <div className="flex min-w-max">
          {tabs.map((t) => {
            const on = pathname === t.path;
            return (
              <button
                key={t.path}
                onClick={() => {
                  void navigate(t.path);
                }}
                className="font-extrabold text-xs tracking-wider px-5 py-3.5 bg-transparent cursor-pointer whitespace-nowrap transition-colors border-0"
                style={{
                  borderBottom: on ? '3px solid #c0446a' : '3px solid transparent',
                  marginBottom: '-3px',
                  color: on ? '#c0446a' : '#c090a8',
                  fontFamily: 'inherit',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AppHeader;
