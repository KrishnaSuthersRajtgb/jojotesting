// src/components/salwar/FieldCard.tsx

import React from 'react';
import { MeasurementField } from '../../types/salwar';
import { inputStyle, selectStyle } from './salwarShared';
import { topAvg } from '../../lib/salwarData';

interface FieldCardProps {
  f: MeasurementField;
  val: string | undefined;
  onChange: (key: string, val: string) => void;
}

const FieldCard: React.FC<FieldCardProps> = ({ f, val, onChange }) => (
  <div className="mcard" style={{ background: f.highlight ? '#fff0f5' : '#fdf8fa' }}>
    <label>{f.label}</label>
    {f.isSelect ? (
      <select
        value={val || ''}
        onChange={(e) => { onChange(f.key, e.target.value); }}
        style={{ ...selectStyle(), width: '68px', minWidth: '68px', fontSize: '11px' }}
      >
        <option value="">—</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    ) : (
      <input
        type="text"
        value={val || ''}
        onChange={(e) => { onChange(f.key, e.target.value); }}
        placeholder="—"
        style={inputStyle(f.highlight)}
      />
    )}
    {topAvg[f.key] && <span className="avg-badge">{topAvg[f.key]}</span>}
  </div>
);

export default FieldCard;
