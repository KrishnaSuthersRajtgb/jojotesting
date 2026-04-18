// src/pages/BlouseMeasurementPage.tsx

import React from 'react';
import { AppHeader } from '../components/blouse/blouseShared';
import { useBlouseMeasurement } from '../hooks/useBlouseMeasurement';
import SizeDataCard from '../features/blouse/SizeDataCard';
import StyleSelectionCard from '../features/blouse/StyleSelectionCard';
import FooterInfo from '../features/blouse/FooterInfo';

export default function BlouseMeasurementPage() {
  const {
    measurements,
    selectedModel,
    openType,
    requiredCloth,
    clothWidth,
    selectedStyle,
    measurementRef,
    handleMeasurementChange,
    setSelectedModel,
    setOpenType,
    setRequiredCloth,
    setClothWidth,
    setSelectedStyle,
    setMeasurementRef,
  } = useBlouseMeasurement();

  return (
    <div
      className="min-h-screen text-sm"
      style={{
        fontFamily: "'Nunito','Segoe UI',sans-serif",
        background: 'linear-gradient(160deg,#fff0f5 0%,#fce4ec 55%,#fdf6f8 100%)',
        color: '#4a1530',
        marginTop: '70px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        .mcard-input:focus { outline:none; border-color:#e8749a !important; box-shadow:0 0 0 3px rgba(232,116,154,.22) !important; }
        .style-card { cursor:pointer; border-radius:14px; overflow:hidden; border:2px solid #f8d0de; background:#fff; transition:all .18s ease; }
        .style-card:hover { border-color:#e8749a; transform:translateY(-3px); box-shadow:0 8px 22px rgba(232,116,154,.28); }
        .style-card.sel { border-color:#c0446a; box-shadow:0 8px 24px rgba(192,68,106,.35); transform:translateY(-3px); }
        .pink-btn:hover { opacity:.92; transform:translateY(-1px); }
        .pink-btn:active { opacity:.85; transform:scale(.98); }
      `}</style>

      <AppHeader />

      <div className="p-3.5 pb-6 space-y-4">
        <SizeDataCard
          measurements={measurements}
          onMeasurementChange={handleMeasurementChange}
          requiredCloth={requiredCloth}
          onRequiredClothChange={setRequiredCloth}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          clothWidth={clothWidth}
          onClothWidthChange={setClothWidth}
          measurementRef={measurementRef}
          onMeasurementRefChange={setMeasurementRef}
        />

        <StyleSelectionCard
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          openType={openType}
          onOpenTypeChange={setOpenType}
        />

        <FooterInfo
          selectedStyle={selectedStyle}
          selectedModel={selectedModel}
          openType={openType}
          clothWidth={clothWidth}
          requiredCloth={requiredCloth}
        />
      </div>
    </div>
  );
}
