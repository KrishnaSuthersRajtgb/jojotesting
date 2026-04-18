// src/hooks/useSalwarKameez.ts

import { useState } from 'react';
import { TopMeasurements, PantMeasurements } from '../types/salwar';

export interface UseSalwarKameezReturn {
  top: TopMeasurements;
  pant: PantMeasurements;
  selTop: string;
  selPant: string;
  noPant: boolean;
  desFront: boolean;
  chudiStyle: string;
  topModel: string;
  btmRound: string;
  pantModel: string;
  pleatType: string;
  flairLoose: string;
  chooseModel: string;
  setT: (k: string, v: string) => void;
  setP: (k: string, v: string) => void;
  setSelTop: (v: string) => void;
  setSelPant: (v: string) => void;
  setNoPant: React.Dispatch<React.SetStateAction<boolean>>;
  setDesFront: React.Dispatch<React.SetStateAction<boolean>>;
  setChudiStyle: (v: string) => void;
  setTopModel: (v: string) => void;
  setBtmRound: (v: string) => void;
  setPantModel: (v: string) => void;
  setPleatType: (v: string) => void;
  setFlairLoose: (v: string) => void;
  setChooseModel: (v: string) => void;
  filledTop: number;
  filledPant: number;
}

import React from 'react';

export function useSalwarKameez(): UseSalwarKameezReturn {
  const [top, setTop] = useState<TopMeasurements>({});
  const [pant, setPant] = useState<PantMeasurements>({});
  const [selTop, setSelTop] = useState('SIMPLE KURTHA');
  const [selPant, setSelPant] = useState('STRAIGHT PANT');
  const [noPant, setNoPant] = useState(false);
  const [desFront, setDesFront] = useState(false);
  const [chudiStyle, setChudiStyle] = useState('');
  const [topModel, setTopModel] = useState('');
  const [btmRound, setBtmRound] = useState('');
  const [pantModel, setPantModel] = useState('');
  const [pleatType, setPleatType] = useState('');
  const [flairLoose, setFlairLoose] = useState('');
  const [chooseModel, setChooseModel] = useState('');

  const setT = (k: string, v: string) => { setTop((p) => ({ ...p, [k]: v })); };
  const setP = (k: string, v: string) => { setPant((p) => ({ ...p, [k]: v })); };

  const filledTop = Object.keys(top).filter((k) => top[k]).length;
  const filledPant = Object.keys(pant).filter((k) => pant[k]).length;

  return {
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
  };
}
