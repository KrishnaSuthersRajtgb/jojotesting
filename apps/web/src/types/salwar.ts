// src/types/salwar.ts

export interface TopMeasurements {
  [key: string]: string;
}

export interface PantMeasurements {
  [key: string]: string;
}

export interface MeasurementField {
  key: string;
  label: string;
  highlight?: boolean;
  isSelect?: boolean;
}

export interface SalwarFormState {
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
}
