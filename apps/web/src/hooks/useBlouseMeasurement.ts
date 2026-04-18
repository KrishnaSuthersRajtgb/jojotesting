// src/hooks/useBlouseMeasurement.ts

import { useState } from 'react';
import { BlouseMeasurements } from '../types/blouse';

export interface UseBlouseMeasurementReturn {
  measurements: BlouseMeasurements;
  selectedModel: string;
  openType: string;
  requiredCloth: string;
  clothWidth: string;
  selectedStyle: string;
  measurementRef: string;
  handleMeasurementChange: (field: string, val: string) => void;
  setSelectedModel: (val: string) => void;
  setOpenType: (val: string) => void;
  setRequiredCloth: (val: string) => void;
  setClothWidth: (val: string) => void;
  setSelectedStyle: (val: string) => void;
  setMeasurementRef: (val: string) => void;
}

export function useBlouseMeasurement(): UseBlouseMeasurementReturn {
  const [measurements, setMeasurements] = useState<BlouseMeasurements>({});
  const [selectedModel, setSelectedModel] = useState('Yoke Blouse');
  const [openType, setOpenType] = useState('Back Hook');
  const [requiredCloth, setRequiredCloth] = useState('');
  const [clothWidth, setClothWidth] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('YOKE BLOUSE');
  const [measurementRef, setMeasurementRef] = useState('');

  const handleMeasurementChange = (field: string, val: string) =>
    { setMeasurements((prev) => ({ ...prev, [field]: val })); };

  return {
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
  };
}
