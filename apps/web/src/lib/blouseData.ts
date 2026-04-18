// src/lib/blouseData.ts

import { MeasurementField } from '../types/blouse';

export const blouseModels: string[] = [
  'Yoke Blouse',
  'Yoke Blouse Back Button',
  'Close Neck',
  'Katori Blouse',
  'Halter Neck',
  'Princess Cut With Belt',
  'Princess Cut Without Belt',
  '3 Dart Boat Neck',
  'Boat Neck Princess Cut With Belt',
  'Boat Neck Princess Cut Without Belt',
  'Boat And Deep 3 Dart',
];

export const openTypes: string[] = ['Back Hook', 'Front Open', 'Side Open'];

export const blouseStyles: string[] = [
  'YOKE BLOUSE',
  'YOKE BLOUSE BACK BUTTON',
  'CLOSE NECK',
  'KATORI BLOUSE',
  'HALTER NECK',
  'PRINCESS CUT WITH BELT',
  'PRINCESS CUT WITHOUT BELT',
  '3 DART BOAT NECK',
  'BOAT NECK PRINCESS CUT WITH BELT',
  'BOAT NECK PRINCESS CUT WITHOUT BELT',
  'BOAT AND DEEP 3 DART',
  'DEEP NECK',
];

export const measurementFields: MeasurementField[] = [
  { key: 'length', label: 'Length', avg: "13'–15.5'" },
  { key: 'upperChest', label: 'Upper Chest', avg: 'AVG OKAY' },
  { key: 'centerChest', label: 'Center Chest', avg: 'AVG OKAY' },
  { key: 'shoulderFinishing', label: 'Shoulder Finishing', avg: "2'–2.75" },
  { key: 'sleeveLength', label: 'Sleeve Length', avg: '' },
  { key: 'sleeveRound', label: 'Sleeve Round', avg: "13.5'–14.5'" },
  { key: 'middleHandRound', label: 'Middle Hand Round', avg: "12.3'–14.8'" },
  { key: 'frontNeckHeight', label: 'Front Neck Height', avg: "6.25'–6.75'" },
  { key: 'backNeckHeight', label: 'Back Neck Height', avg: "6.75'–9.25'" },
  { key: 'waistLoose', label: 'Waist Loose', avg: "31'–36'" },
  { key: 'frontDartPoint', label: 'Front Dart Point', avg: "9.2'–10.8'" },
  { key: 'fullShoulder', label: 'Full Shoulder', avg: "15'–16'", highlight: true },
  { key: 'armRound', label: 'Arm Round', avg: '', highlight: true },
];
