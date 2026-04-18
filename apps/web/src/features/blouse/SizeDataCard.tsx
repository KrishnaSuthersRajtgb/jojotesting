// src/features/blouse/SizeDataCard.tsx

import React from 'react';
import { PD } from '../../components/blouse/blouseShared';
import { measurementFields } from '../../lib/blouseData';
import { BlouseMeasurements } from '../../types/blouse';

interface SizeDataCardProps {
  measurements: BlouseMeasurements;
  onMeasurementChange: (field: string, val: string) => void;
  requiredCloth: string;
  onRequiredClothChange: (val: string) => void;
  clothWidth: string;
  onClothWidthChange: (val: string) => void;
  measurementRef: string;
  onMeasurementRefChange: (val: string) => void;
}

const SizeDataCard: React.FC<SizeDataCardProps> = ({
  measurements,
  onMeasurementChange,
  requiredCloth,
  onRequiredClothChange,
  clothWidth,
  onClothWidthChange,
  measurementRef,
  onMeasurementRefChange,
}) => {
  const filled = Object.keys(measurements).filter((k) => measurements[k]).length;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ border: '1.5px solid #f8bbd0', boxShadow: '0 8px 32px rgba(232,116,154,.12)' }}
    >
      {/* card header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: 'linear-gradient(90deg,#c0446a,#e8749a)' }}
      >
        <span className="text-base">📐</span>
        <span className="text-white font-black text-sm tracking-wider">BLOUSE SIZE DATA</span>
        <div className="flex-1" />
        <div
          className="text-white text-xs font-extrabold px-3 py-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,.2)' }}
        >
          {filled}/{measurementFields.length} filled
        </div>
      </div>

      <div className="p-3.5">
        {/* measurement chips */}
        <div className="overflow-x-auto pb-1.5">
          <div className="flex gap-1.5 flex-wrap" style={{ minWidth: 'max-content' }}>
            {measurementFields.map((f) => (
              <div
                key={f.key}
                className="flex flex-col items-center gap-1 p-2 rounded-xl min-w-[78px]"
                style={{ background: f.highlight ? '#fff0f5' : '#fdf8fa' }}
              >
                <label
                  className="text-center font-extrabold leading-tight"
                  style={{ fontSize: '9.5px', color: '#a04060' }}
                >
                  {f.label}
                </label>
                <input
                  type="text"
                  value={measurements[f.key] || ''}
                  onChange={(e) => { onMeasurementChange(f.key, e.target.value); }}
                  placeholder="—"
                  className="mcard-input w-[68px] text-center rounded-lg text-sm transition-all"
                  style={{
                    padding: '7px 6px',
                    border: f.highlight ? '1.5px solid #e8749a' : '1.5px solid #f0b8cc',
                    background: f.highlight ? '#fff0f5' : '#fff',
                    color: '#4a1530',
                    fontFamily: 'inherit',
                  }}
                />
                {f.avg && (
                  <span
                    className="font-extrabold px-1.5 py-0.5 rounded"
                    style={{
                      fontSize: '8px',
                      background: 'linear-gradient(135deg,#ffe082,#ffca28)',
                      color: '#6b4400',
                    }}
                  >
                    {f.avg}
                  </span>
                )}
              </div>
            ))}

            {/* Measurement Reference */}
            <div
              className="flex flex-col items-center gap-1 p-2 rounded-xl min-w-[78px]"
              style={{ background: '#fdf8fa' }}
            >
              <label
                className="text-center font-extrabold leading-tight"
                style={{ fontSize: '9.5px', color: '#a04060' }}
              >
                MEASUREMENT REF
              </label>
              <select
                value={measurementRef}
                onChange={(e) => { onMeasurementRefChange(e.target.value); }}
                className="w-[68px] rounded-lg text-xs font-extrabold transition-all"
                style={{
                  padding: '7px 6px',
                  border: '1.5px solid #f0b8cc',
                  background: '#fff',
                  color: '#4a1530',
                  fontFamily: 'inherit',
                }}
              >
                <option value="">—</option>
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <span
                className="font-extrabold px-1.5 py-0.5 rounded"
                style={{ fontSize: '8px', background: '#fce4ec', color: '#c0446a' }}
              >
                SIZE
              </span>
            </div>
          </div>
        </div>

        {/* warning note */}
        <div
          className="flex items-start gap-2 mt-2.5 p-2.5 rounded-xl font-bold"
          style={{
            background: 'linear-gradient(90deg,#fffde7,#fff9c4)',
            border: '1.5px solid #ffe082',
            fontSize: '10px',
            color: '#7a5000',
          }}
        >
          <span className="text-sm shrink-0">⚠️</span>
          <span>
            Please avoid changing Shoulder / Arm Round measurement here — make Arm Round changes in
            the Drawing Page only.
          </span>
        </div>

        {/* action row */}
        <div
          className="flex flex-wrap items-center gap-2.5 mt-3.5 pt-3.5"
          style={{ borderTop: '2px dashed #f8bbd0' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs" style={{ color: PD }}>
              Required Cloth
            </span>
            <input
              type="text"
              value={requiredCloth}
              onChange={(e) => { onRequiredClothChange(e.target.value); }}
              placeholder="—"
              className="mcard-input w-16 text-center rounded-lg text-sm"
              style={{
                padding: '7px 8px',
                border: '1.5px solid #f0b8cc',
                background: '#fff',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs" style={{ color: PD }}>
              Cloth Width
            </span>
            <input
              type="text"
              value={clothWidth}
              onChange={(e) => { onClothWidthChange(e.target.value); }}
              placeholder="—"
              className="mcard-input w-14 text-center rounded-lg text-sm font-extrabold"
              style={{
                padding: '7px 8px',
                border: '2px solid #ff8c42',
                background: '#fff7f0',
                color: '#c05000',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div className="flex-1" />

          <button
            className="pink-btn flex items-center gap-1.5 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl border-0 cursor-pointer tracking-wider"
            style={{
              background: 'linear-gradient(135deg,#c0446a,#e8749a)',
              boxShadow: '0 4px 16px rgba(192,68,106,.3)',
            }}
          >
            💾 SAVE
          </button>
          <button
            className="pink-btn flex items-center gap-1.5 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl border-0 cursor-pointer tracking-wider"
            style={{
              background: 'linear-gradient(135deg,#f48fb1,#e8749a)',
              boxShadow: '0 4px 16px rgba(192,68,106,.3)',
            }}
          >
            ⚙️ UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeDataCard;