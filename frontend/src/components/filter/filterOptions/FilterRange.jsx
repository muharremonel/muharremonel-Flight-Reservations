import React from "react";

const FilterRange = ({ min, max, step }) => (
  <div className="mb-4">
    {/* Fiyat aralığı etiketi */}
    <label className="block text-sm font-bold text-gray-800 mb-2">
      Price Range
    </label>
    
    {/* Slider (range) input */}
    <input type="range" min={min} max={max} step={step} className="w-full" />

    {/* Minimum ve maksimum değerleri gösteren alan */}
    <div className="flex justify-between text-sm text-gray-700 mt-1">
      <span>${min}</span> {/* Minimum değer */}
      <span>${max}</span> {/* Maksimum değer */}
    </div>
  </div>
);

export default FilterRange;
