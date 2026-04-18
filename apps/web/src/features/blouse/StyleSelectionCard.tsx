// src/features/blouse/StyleSelectionCard.tsx

import React from 'react';
import { PD, PL, PM } from '../../components/blouse/blouseShared';
import BlouseSVG from '../../components/blouse/BlouseSVG';
import { blouseStyles, openTypes } from '../../lib/blouseData';

interface StyleSelectionCardProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  openType: string;
  onOpenTypeChange: (val: string) => void;
}

const StyleSelectionCard: React.FC<StyleSelectionCardProps> = ({
  selectedStyle,
  onStyleChange,
  openType,
  onOpenTypeChange,
}) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ border: '1.5px solid #f8bbd0', boxShadow: '0 8px 32px rgba(232,116,154,.12)' }}
    >
      <div
        className="flex items-center justify-between flex-wrap gap-2.5 px-4 py-3"
        style={{ background: 'linear-gradient(90deg,#c0446a,#e8749a)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">👗</span>
          <span className="text-white font-black text-sm tracking-wider">
            BLOUSE STYLE SELECTION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs" style={{ color: 'rgba(255,255,255,.82)' }}>
            Open Type (PrincessCut):
          </span>
          <select
            value={openType}
            onChange={(e) => { onOpenTypeChange(e.target.value); }}
            className="rounded-lg text-xs"
            style={{
              padding: '5px 10px',
              border: '2px solid rgba(255,255,255,.45)',
              background: 'rgba(255,255,255,.18)',
              color: '#fff',
              fontFamily: 'inherit',
              minWidth: '108px',
            }}
          >
            {openTypes.map((o) => (
              <option key={o} style={{ color: '#333' }}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-3.5">
        <div
          className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1 rounded-full mb-3"
          style={{ background: PL, border: `1.5px solid ${PM}`, color: PD }}
        >
          <span>✨</span>
          {selectedStyle}
        </div>

        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(118px,1fr))' }}
        >
          {blouseStyles.map((label) => {
            const sel = selectedStyle === label;
            return (
              <div
                key={label}
                className={`style-card${sel ? ' sel' : ''}`}
                onClick={() => { onStyleChange(label); }}
              >
                <div
                  className="w-full relative"
                  style={{
                    paddingBottom: '82%',
                    background: sel
                      ? 'linear-gradient(135deg,#c0446a 0%,#e8749a 100%)'
                      : 'linear-gradient(135deg,#fce4ec 0%,#f8bbd0 100%)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <BlouseSVG type={label} selected={sel} />
                  </div>
                  {sel && (
                    <div
                      className="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-white text-xs font-black"
                      style={{ color: PD, boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <div
                  className="px-1 py-1.5 text-center leading-tight flex items-center justify-center"
                  style={{
                    fontSize: '9px',
                    fontWeight: sel ? 900 : 700,
                    color: sel ? PD : '#b06080',
                    minHeight: '28px',
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

export default StyleSelectionCard;
