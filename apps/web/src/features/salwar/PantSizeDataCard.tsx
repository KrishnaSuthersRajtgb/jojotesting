// src/features/salwar/PantSizeDataCard.tsx

import React from 'react';
import {
  SectionBadge,
  selectStyle,
  btnStyle,
  PD,
  P,
  PM,
} from '../../components/salwar/salwarShared';
import FieldCard from '../../components/salwar/FieldCard';
import { pantFields, pantBottomFields, pantModels, pleatTypes } from '../../lib/salwarData';
import { PantMeasurements } from '../../types/salwar';

interface PantSizeDataCardProps {
  pant: PantMeasurements;
  onPantChange: (k: string, v: string) => void;
  pantModel: string;
  onPantModelChange: (v: string) => void;
  pleatType: string;
  onPleatTypeChange: (v: string) => void;
  filledPant: number;
}

const PantSizeDataCard: React.FC<PantSizeDataCardProps> = ({
  pant,
  onPantChange,
  pantModel,
  onPantModelChange,
  pleatType,
  onPleatTypeChange,
  filledPant,
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '18px',
        border: `1.5px solid ${PM}`,
        boxShadow: '0 8px 28px rgba(232,116,154,.12)',
        marginBottom: '16px',
        overflow: 'hidden',
      }}
    >
      <SectionBadge
        icon="📏"
        label="PANT SIZE DATA"
        filled={filledPant}
        total={pantFields.length + pantBottomFields.length}
      />

      <div style={{ padding: '14px 12px 12px' }}>
        {/* Pant model measurements sub-section */}
        <div
          style={{
            background: '#fdf8fa',
            borderRadius: '12px',
            border: `1.5px solid ${PM}`,
            padding: '10px 10px 6px',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              fontWeight: '900',
              color: PD,
              letterSpacing: '1px',
              marginBottom: '8px',
            }}
          >
            PANT MODEL MEASUREMENTS
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {pantBottomFields.map((f) => (
              <FieldCard key={f.key} f={f} val={pant[f.key]} onChange={onPantChange} />
            ))}
          </div>
        </div>

        {/* Pant controls */}
        <div
          className="act-row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: `2px dashed ${PM}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ fontWeight: '800', color: PD, fontSize: '10px' }}>PANT MODEL</span>
            <select
              value={pantModel}
              onChange={(e) => { onPantModelChange(e.target.value); }}
              style={{ ...selectStyle(), border: `2px solid ${P}`, color: PD, fontWeight: '800' }}
            >
              <option value="">— Select —</option>
              {pantModels.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ fontWeight: '800', color: PD, fontSize: '10px' }}>PLEAT TYPE</span>
            <select
              value={pleatType}
              onChange={(e) => { onPleatTypeChange(e.target.value); }}
              style={{ ...selectStyle(), border: `2px solid ${P}`, color: PD, fontWeight: '800' }}
            >
              <option value="">— Select —</option>
              {pleatTypes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }} />
          <button style={btnStyle(PD)}>💾 CHUDI MEASUREMENT SAVE</button>
          <button style={btnStyle('#f48fb1')}>⚙️ UPDATE</button>
          <button style={btnStyle('#d4a0b0')}>🧹 CLEAR</button>
        </div>
      </div>
    </div>
  );
};

export default PantSizeDataCard;
