import React from "react";
import PropTypes from "prop-types";

const FilterSelect = ({ options = [] }) => (
  <div className="mb-4 relative">
    {/* Etiket - Sıralama seçeneği başlığı */}
    <label className="block text-sm font-bold text-gray-800">Sort by:</label>
    
    {/* Seçim kutusu */}
    <div className="relative mt-1">
      <select className="block w-full p-2 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-purple-800 focus:border-purple-800 sm:text-sm appearance-none">
        {/* Seçeneklerin render edilmesi */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Aşağı ok simgesi (görsel öğe) */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);

FilterSelect.propTypes = {
  /* Seçim kutusu seçeneklerinin yapılandırılması */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // Seçeneğin değeri
      label: PropTypes.string.isRequired, // Seçeneğin etiketi
    })
  ).isRequired,
};

export default FilterSelect;
