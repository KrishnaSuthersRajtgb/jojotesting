// src/lib/salwarData.ts

import { MeasurementField } from '../types/salwar';

export const topStyles: string[] = [
  'SIMPLE KURTHA',
  'COLLAR KURTHA',
  'BOAT NECK KURTHA',
  'HALTER NECK KURTHA',
  'SHORT TOP',
  'FULL PANEL KURTHA',
  'LEHENGA',
];

export const pantStyles: string[] = [
  'PUNJABI PANT',
  'DOUBLE SIDE PATTIYALA',
  'GATHERING PANT',
  'STRAIGHT PANT',
  'HAREEM PANT',
];

export const topFields: MeasurementField[] = [
  { key: 'topLength', label: 'Length' },
  { key: 'topChest', label: 'Chest' },
  { key: 'topWaistHipH', label: 'Waist (HIP) Height' },
  { key: 'topWaistHipL', label: 'Waist (HIP) Loose' },
  { key: 'topSlitOpen', label: 'Slit Open From Top' },
  { key: 'topSeatLoose', label: 'Seat Loose' },
  { key: 'topFrontNeck', label: 'Front Neck Height' },
  { key: 'topBackNeck', label: 'Back Neck Height' },
  { key: 'topSleeveLength', label: 'Sleeve Length' },
  { key: 'topSleeveRound', label: 'Sleeve Round' },
  { key: 'topMiddleHand', label: 'Middle Hand Round' },
  { key: 'topShoulder', label: 'Shoulder Finishing', highlight: true },
  { key: 'topFullShoulder', label: 'Full Shoulder', highlight: true },
];

export const topAvg: Record<string, string> = {
  topFrontNeck: "6.25'–6.75'",
  topBackNeck: "6.75'–9.25'",
  topSleeveRound: "13.5'–14.5'",
  topMiddleHand: "12.3'–14.8'",
  topShoulder: "2'–2.75'",
  topFullShoulder: "15'–16'",
};

export const pantFields: MeasurementField[] = [
  // { key: "pantHeight",  label: "Pant Height" },
  // { key: "seatLooseA",  label: "Seat Loose (A)" },
  // { key: "bottomLoose", label: "Bottom Loose" },
  // { key: "bottomKneeH", label: "Bottom to Knee Height" },
  // { key: "kneeLoose",   label: "Knee Loose" },
  // { key: "measRef",     label: "Measurement Reference", isSelect: true },
];

export const pantBottomFields: MeasurementField[] = [
  { key: 'pbHeight', label: 'Height' },
  { key: 'pbWaist', label: 'Waist' },
  { key: 'pbSeatA', label: 'Seat (A)' },
  { key: 'pbThighF', label: 'Thigh (F)' },
  { key: 'pbKneeF', label: 'Knee (F)' },
  { key: 'pbBottomF', label: 'Bottom (F)' },
  { key: 'pbZipLength', label: 'Zip Length' },
  { key: 'pbTotalRound', label: 'Total Round' },
];

export const chudiStyles: string[] = [
  'Straight',
  'A-Line',
  'Anarkali',
  'Churidar',
  'Palazzo',
  'Sharara',
  'Gharara',
  'Patiala',
];

export const topModels: string[] = ['Model 1', 'Model 2', 'Model 3', 'Model 4'];
export const bottomRound: string[] = ['Round 1', 'Round 2', 'Round 3'];
export const pantModels: string[] = ['Pant Model 1', 'Pant Model 2', 'Pant Model 3'];
export const pleatTypes: string[] = ['Box Pleat', 'Knife Pleat', 'No Pleat', 'Inverted Pleat'];
