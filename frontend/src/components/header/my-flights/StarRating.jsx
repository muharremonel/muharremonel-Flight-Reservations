import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Yıldızların görünümünü temsil eden her bir sıralama kriteri */}
      <div className="items-center text-xs border-r-2 px-3">
        <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
        </div>
        <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
        </div>
      </div>
      
      <div className="items-center text-xs border-r-2 px-3">
        <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
        </div>
        <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
        </div>
      </div>
      <div className="items-center text-xs border-r-2 px-3">
        <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
        </div>
        <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
        </div>
      </div>

      <div className="items-center text-xs border-r-2 px-3">
        <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
        </div>
        <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-dark-500" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400" />
        </div>
      </div>

    </div>
  );
};

export default StarRating;
