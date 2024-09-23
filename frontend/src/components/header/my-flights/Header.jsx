import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import StarRating from "./StarRating";

const Header = () => {
  const containerRef = useRef(null); // Konteyner referansı

  return (
    <header className="bg-white p-4">
      {/* Header içeriği, mobil ve masaüstü için esnek düzen */}
      <div
        ref={containerRef}
        className="flex flex-col sm:flex-row sm:justify-between"
      >
        {/* Filtreleme butonları ve arama düzenleme bölümü */}
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4 items-center">
          
          {/* Zaman Filtresi */}
          <div className="relative flex-1 min-w-[110px]">
            <button
              className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
            >
              Times
            </button>
          </div>

          {/* Durak Filtresi */}
          <div className="relative flex-1 min-w-[110px]">
            <button
              className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
            >
              Stop
            </button>
          </div>

          {/* Havayolu Filtresi */}
          <div className="relative flex-1 min-w-[110px]">
            <button
              className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
            >
              Airlines
            </button>
          </div>

          {/* Havalimanı Filtresi */}
          <div className="relative flex-1 min-w-[110px]">
            <button
              className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
            >
              Airports
            </button>
          </div>

          {/* Olanaklar Filtresi */}
          <div className="relative flex-1 min-w-[110px]">
            <button
              className="bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center"
            >
              Amenities
            </button>
          </div>
          
          {/* Arama düzenleme butonu */}
          <h1
            className="min-w-[110px] text-blue-600 font-bold mr-2 cursor-pointer flex items-center select-none"
            style={{ userSelect: "none" }} // Seçimi engelle
          >
            Edit Search
            {/* Aşağı ok ikonu */}
            <span className="ml-2 inline-block" style={{ fontSize: "0.75rem" }}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </h1>
        </div>

        {/* Yıldız derecelendirme bileşeni */}
        <div className="mt-2">
          <div className="mr-2">
            <StarRating /> {/* Değerlendirme yıldızları */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
