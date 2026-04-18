// src/features/salwar/TopSizeDataCard.tsx

import React from 'react';
import {
  SectionBadge,
  btnStyle,
  PD,
  P,
  PM,
} from '../../components/salwar/salwarShared';
import FieldCard from '../../components/salwar/FieldCard';
import { topFields } from '../../lib/salwarData';
import { TopMeasurements } from '../../types/salwar';

interface TopSizeDataCardProps {
  top: TopMeasurements;
  onTopChange: (k: string, v: string) => void;
  filledTop: number;
}

const TopSizeDataCard: React.FC<TopSizeDataCardProps> = ({
  top,
  onTopChange,
  filledTop,
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
      <SectionBadge icon="📐" label="TOP SIZE DATA" filled={filledTop} total={topFields.length} />

      <div style={{ padding: '14px 12px 12px' }}>
        {/* Top measurement chips */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {topFields.map((f) => (
            <FieldCard key={f.key} f={f} val={top[f.key]} onChange={onTopChange} />
          ))}
        </div>

        {/* Controls row */}
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
          <div style={{ flex: 1 }} />
          <button style={btnStyle(PD)}>
            <span>✅</span> CHECK TOP MEASUREMENT
          </button>
          <button style={btnStyle(P)}>
            <span style={{ fontSize: '16px' }}>👆</span> APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSizeDataCard;