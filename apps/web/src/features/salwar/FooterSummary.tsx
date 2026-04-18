// src/features/salwar/FooterSummary.tsx

import React from 'react';
import { PD, PL, PM } from '../../components/salwar/salwarShared';

interface FooterSummaryProps {
  selTop: string;
  selPant: string;
  noPant: boolean;
  chudiStyle: string;
  pantModel: string;
  desFront: boolean;
}

const FooterSummary: React.FC<FooterSummaryProps> = ({
  selTop,
  selPant,
  noPant,
  chudiStyle,
  pantModel,
  desFront,
}) => {
  return (
    <div
      style={{
        padding: '11px 16px',
        background: `linear-gradient(90deg,${PL},#fff)`,
        border: `1.5px solid ${PM}`,
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '11px',
        color: PD,
        fontWeight: '800',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontSize: '18px' }}>🌸</span>
      <span>
        Top: <strong>{selTop}</strong>
      </span>
      {!noPant && (
        <>
          <span style={{ color: PM }}>•</span>
          <span>
            Pant: <strong>{selPant}</strong>
          </span>
        </>
      )}
      {noPant && (
        <>
          <span style={{ color: PM }}>•</span>
          <span style={{ color: '#e57373' }}>No Pant</span>
        </>
      )}
      {chudiStyle && (
        <>
          <span style={{ color: PM }}>•</span>
          <span>
            Style: <strong>{chudiStyle}</strong>
          </span>
        </>
      )}
      {pantModel && (
        <>
          <span style={{ color: PM }}>•</span>
          <span>
            Pant Model: <strong>{pantModel}</strong>
          </span>
        </>
      )}
      {desFront && (
        <>
          <span style={{ color: PM }}>•</span>
          <span style={{ color: '#7b3f8c' }}>✨ Designer Front</span>
        </>
      )}
    </div>
  );
};

export default FooterSummary;
