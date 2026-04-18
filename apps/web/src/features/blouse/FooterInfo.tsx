// src/features/blouse/FooterInfo.tsx

import React from 'react';
import { PD, PM } from '../../components/blouse/blouseShared';

interface FooterInfoProps {
  selectedStyle: string;
  selectedModel: string;
  openType: string;
  clothWidth: string;
  requiredCloth: string;
}

const FooterInfo: React.FC<FooterInfoProps> = ({
  selectedStyle,
  selectedModel,
  openType,
  clothWidth,
  requiredCloth,
}) => {
  return (
    <div
      className="flex items-center flex-wrap gap-2.5 px-4 py-3 rounded-2xl text-xs font-extrabold"
      style={{
        background: 'linear-gradient(90deg,#fce4ec,#fff)',
        border: `1.5px solid ${PM}`,
        color: PD,
      }}
    >
      <span className="text-lg">🌸</span>
      <span>
        Style: <strong>{selectedStyle}</strong>
      </span>
      <span style={{ color: PM }}>•</span>
      <span>
        Model: <strong>{selectedModel}</strong>
      </span>
      <span style={{ color: PM }}>•</span>
      <span>
        Open: <strong>{openType}</strong>
      </span>
      {clothWidth && (
        <>
          <span style={{ color: PM }}>•</span>
          <span>
            Width: <strong>{clothWidth}</strong>
          </span>
        </>
      )}
      {requiredCloth && (
        <>
          <span style={{ color: PM }}>•</span>
          <span>
            Cloth: <strong>{requiredCloth}</strong>
          </span>
        </>
      )}
    </div>
  );
};

export default FooterInfo;
