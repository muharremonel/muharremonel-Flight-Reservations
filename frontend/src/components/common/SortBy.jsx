import React from 'react';

/**
 * SortBy component: Farklı sıralama seçeneklerini kullanıcıya sunar.
 * 
 * Props:
 * - options (array): Sıralama seçeneklerini içeren bir dizi.
 * - onChange (function): Sıralama kriteri değiştiğinde tetiklenen fonksiyon.
 */
const SortBy = ({ options = ['Recommended', 'Price', 'Duration'], onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Sıralama Etiketi */}
      <label className="text-gray-900 font-sans" htmlFor="sort-select">
        Sort by:
      </label>
      
      {/* Sıralama Seçim Kutusu */}
      <select
        id="sort-select"
        className="bg-transparent border-none text-gray-900 font-bold cursor-pointer focus:outline-none"
        onChange={onChange}
        aria-label="Sort by options"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
