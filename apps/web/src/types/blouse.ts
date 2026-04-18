// src/types/blouse.ts

export interface MeasurementField {
  key: string;
  label: string;
  avg: string;
  highlight?: boolean;
}

export interface BlouseMeasurements {
  [key: string]: string;
}

export interface BlouseFormState {
  measurements: BlouseMeasurements;
  selectedModel: string;
  openType: string;
  requiredCloth: string;
  clothWidth: string;
  selectedStyle: string;
  measurementRef: string;
}
