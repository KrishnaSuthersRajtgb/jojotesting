// src/pages/SalwarKameezPage.tsx

import React from 'react';
import { AppHeader, GlobalStyles } from '../components/salwar/salwarShared';
import { useSalwarKameez } from '../hooks/useSalwarKameez';
import TopSizeDataCard from '../features/salwar/TopSizeDataCard';
import TopStyleSelectionCard from '../features/salwar/TopStyleSelectionCard';
import PantSizeDataCard from '../features/salwar/PantSizeDataCard';
import PantStyleSelectionCard from '../features/salwar/PantStyleSelectionCard';
import FooterSummary from '../features/salwar/FooterSummary';

export default function SalwarKameezPage() {
  const {
    top,
    pant,
    selTop,
    selPant,
    noPant,
    desFront,
    chudiStyle,
    topModel,
    btmRound,
    pantModel,
    pleatType,
    flairLoose,
    chooseModel,
    setT,
    setP,
    setSelTop,
    setSelPant,
    setNoPant,
    setDesFront,
    setChudiStyle,
    setTopModel,
    setBtmRound,
    setPantModel,
    setPleatType,
    setFlairLoose,
    setChooseModel,
    filledTop,
    filledPant,
  } = useSalwarKameez();

  return (
    <div
      style={{
        fontFamily: "'Nunito','Segoe UI',sans-serif",
        background: 'linear-gradient(160deg,#fff0f5 0%,#fce4ec 55%,#fdf6f8 100%)',
        minHeight: '10vh',
        fontSize: '13px',
        color: '#4a1530',
        marginTop: '70px',
      }}
    >
      <GlobalStyles />
      <AppHeader />

      <div style={{ padding: '14px 14px 30px' }}>
        <TopSizeDataCard
          top={top}
          onTopChange={setT}
          chudiStyle={chudiStyle}
          onChudiStyleChange={setChudiStyle}
          flairLoose={flairLoose}
          onFlairLooseChange={setFlairLoose}
          btmRound={btmRound}
          onBtmRoundChange={setBtmRound}
          chooseModel={chooseModel}
          onChooseModelChange={setChooseModel}
          topModel={topModel}
          onTopModelChange={setTopModel}
          filledTop={filledTop}
        />

        <TopStyleSelectionCard selTop={selTop} onSelTopChange={setSelTop} />

        <PantSizeDataCard
          pant={pant}
          onPantChange={setP}
          pantModel={pantModel}
          onPantModelChange={setPantModel}
          pleatType={pleatType}
          onPleatTypeChange={setPleatType}
          filledPant={filledPant}
        />

        <PantStyleSelectionCard
          selPant={selPant}
          onSelPantChange={setSelPant}
          noPant={noPant}
          onNoPantToggle={() => { setNoPant((p) => !p); }}
          desFront={desFront}
          onDesFrontToggle={() => { setDesFront((p) => !p); }}
        />

        <FooterSummary
          selTop={selTop}
          selPant={selPant}
          noPant={noPant}
          chudiStyle={chudiStyle}
          pantModel={pantModel}
          desFront={desFront}
        />
      </div>
    </div>
  );
}
