import React from 'react';
import { formatTime } from '../../utils/formatTime';

const FlightDetailsCard = ({ flight, onClose }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
    
    {/* Kapatma butonu, kullanıcı tıklamasıyla bileşeni kapatır */}
    <button
      className="text-red-500 font-semibold text-sm mb-4 hover:text-red-700"
      onClick={onClose} // onClose fonksiyonu tetiklenerek bileşen kapatılır
    >
      Close
    </button>
    
    {/* Uçuş ile ilgili detayları gösteren ana alan */}
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        
        {/* Uçuşun planlanan tarihi ve saati */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Schedule Date:</span>
          <span className="text-gray-700">{formatTime(flight.scheduleDateTime)}</span>
        </div>
        
        {/* Uçuş numarası bilgisi */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Flight Number:</span>
          <span className="text-gray-700">{flight.flightNumber}</span>
        </div>
        
        {/* Havayolu şirketinin kodu */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Airline Code:</span>
          <span className="text-gray-700">{flight.airlineCode}</span>
        </div>
        
        {/* Hizmet tipi bilgisi (örneğin, iç hat veya dış hat) */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Service Type:</span>
          <span className="text-gray-700">{flight.serviceType}</span>
        </div>
        
        {/* Uçuşun adı veya kodu */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Flight Name:</span>
          <span className="text-gray-700">{flight.flightName}</span>
        </div>
        
      </div>
    </div>
  </div>
);

export default FlightDetailsCard;
