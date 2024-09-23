import axios from "axios";
import { useState, useEffect } from "react";
import { getAirlineNameFromIATA } from "../../utils/getAirlineName";
import calculateFlight from '../../utils/calculateFlight';
import { formatTime } from "../../utils/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import DeltaLogo from '../../assets/delta.png';
import { Spin } from "antd";
import Swal from 'sweetalert2';
import CustomSpin from "../filter/CustomSpin";

// ClassOptions bileşeni, uçuş kartındaki farklı sınıf seçeneklerini gösterir
const ClassOptions = ({ title, value }) => (
  <div className="border border-gray-200 rounded-lg p-4 text-center shadow-sm max-w-[100px] sm:max-w-[120px] flex-1">
    <span className="block text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
      {value}
    </span>
    <span className="block text-xs sm:text-sm font-medium text-gray-700">
      {title}
    </span>
  </div>
);

// FlightDetailsCard bileşeni, seçilen uçuşun ayrıntılı bilgilerini gösterir
const FlightDetailsCard = ({ flight, onClose }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
    <button
      className="text-red-500 font-semibold text-sm mb-4 hover:text-red-700"
      onClick={onClose}
    >
      Kapat
    </button>
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        {/* Uçuşun tarih ve saat bilgisi */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Uçuş Tarihi:</span>
          <span className="text-gray-700">{flight.scheduleDate}</span>
        </div>
        {/* Uçuş numarası */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Uçuş No:</span>
          <span className="text-gray-700">{flight.flightNumber}</span>
        </div>
        {/* Havayolu kodu */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Havayolu Kodu:</span>
          <span className="text-gray-700">{flight.prefixIATA}</span>
        </div>
        {/* Servis türü */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Servis Türü:</span>
          <span className="text-gray-700">{flight.serviceType}</span>
        </div>
        {/* Uçuş ID bilgisi */}
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-32">Uçuş ID:</span>
          <span className="text-gray-700">{flight.id}</span>
        </div>
      </div>
    </div>
  </div>
);

// FlightCard bileşeni, uçuş özetini ve detayları içerir
const FlightCard = ({ flight, toggleDetails, isDetailsVisible, onDelete }) => {
  const {
    flightDirection,
    route,
    scheduleDateTime,
    estimatedLandingTime,
    airline,
    flightDuration,
    flightName,
    id
  } = flight;

  // Kalkış ve varış havaalanlarını belirlemek için rota verilerini kullanır
  const destinations = route?.destinations || [];
  const departureAirport = flightDirection === "D" ? "AMS" : destinations[0];
  const arrivalAirport = flightDirection === "A" ? "AMS" : destinations[destinations.length - 1];

  // Uçuş silme işlemi için kullanıcıdan onay alır ve API üzerinden siler
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Uçuşu sil?",
        text: "Bu işlem geri alınamaz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, sil!"
      });

      if (result.isConfirmed) {
        const response = await axios.delete('http://localhost:5001/back/flights/delete-flight', {
          data: { id }
        });

        if (response.data.message === 'Uçuş başarıyla silindi.') {
          Swal.fire({
            title: "Silindi!",
            text: "Uçuş başarıyla silindi.",
            icon: "success"
          });
          onDelete(id); // Uçuşu listeden çıkar
        } else {
          Swal.fire({
            title: "Hata!",
            text: "Uçuş silinirken bir sorun oluştu.",
            icon: "error"
          });
        }
      }
    } catch (error) {
      console.error('Uçuş silinirken hata:', error.response ? error.response.data : error.message);
      Swal.fire({
        title: "Hata!",
        text: "Uçuş silinirken bir sorun yaşandı.",
        icon: "error"
      });
    }
  };

  return (
    <div className="relative">
      <div className="bg-white w-full shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 transition-transform duration-500 ease-in-out">
        {/* Silme butonu */}
        <button
          className="absolute top-1 right-2 text-red-600 hover:text-red-700"
          aria-label="Uçuşu Sil"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTimes} className="text-lg" />
        </button>
        
        {/* Uçuş bilgileri */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            {/* Havayolu logosu */}
            <div className="flex-none">
              <img src={DeltaLogo} alt="Delta Logo" className="mb-4" />
            </div>
            {/* Uçuş detayları */}
            <div className="flex-1 ml-4 sm:ml-6 mt-3">
              <div className="flex items-center justify-between text-gray-500 font-medium text-lg sm:text-2xl">
                <span>
                  {estimatedLandingTime} - {scheduleDateTime}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row text-gray-900 text-xs sm:text-sm mt-2 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Havayolu ismi */}
                <div className="flex flex-col flex-1">
                  <span className="font-sans font-semibold">{airline}</span>
                </div>
                {/* Direkt uçuş bilgisi */}
                <div className="flex flex-col flex-1">
                  <span className="font-sans font-bold">Direkt Uçuş</span>
                </div>
                {/* Kalkış ve varış havaalanları */}
                <div className="flex flex-col flex-1">
                  <span className="font-sans font-bold">{departureAirport} to {arrivalAirport}</span>
                </div>
              </div>
              
              {/* Uçuş detayları ve süre bilgisi */}
              <div className="flex flex-col sm:flex-row text-gray-900 text-xs sm:text-sm mt-2 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col flex-1">
                  <button
                    className="flex items-center cursor-pointer text-blue-500 font-sans text-sm whitespace-nowrap"
                    onClick={toggleDetails}
                  >
                    Uçuş Detayları
                    <FontAwesomeIcon icon={faChevronDown} className="text-blue-500 ml-1" />
                  </button>
                </div>
                {/* Uçuş süresi */}
                <div className="flex flex-col flex-1">
                  <span className="font-sans whitespace-nowrap">{flightDuration}</span>
                </div>
                {/* Uçuş adı */}
                <div className="flex flex-col flex-1">
                  <span className="font-sans whitespace-nowrap">{flightName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Uçuş sınıf seçenekleri */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
          <ClassOptions title="Ekonomi" value="$156" />
          <ClassOptions title="Esnek Ekonomi" value="$256" />
          <ClassOptions title="" value="" />
          <ClassOptions title="Birinci Sınıf" value="$356" />
        </div>
      </div>

      {/* Uçuş detayları bölümü (açık/kapalı) */}
      <div
        className={`transition-all duration-800 ${
          isDetailsVisible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden mt-2 mb-2`}
      >
        {isDetailsVisible && <FlightDetailsCard flight={flight} onClose={toggleDetails} />}
      </div>
    </div>
  );
};

// MyFlightsCard bileşeni, uçuşları listeler ve FlightCard bileşenlerini render eder
const MyFlightsCard = () => {
  const [flightData, setFlightData] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  // Uçuş verilerini API'den alır ve state'e güncellenmiş haliyle ekler
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/back/flights/get-flight/");
        const flights = response.data;

        // Uçuş verilerini günceller (havayolu adı, uçuş süresi vb.)
        const updatedFlights = flights.map((flight) => ({
          ...flight,
          airline: getAirlineNameFromIATA(flight.prefixIATA),
          scheduleDateTime: formatTime(flight.scheduleDateTime),
          estimatedLandingTime: formatTime(flight.estimatedLandingTime),
          flightDuration: calculateFlight(flight.scheduleDateTime, flight.estimatedLandingTime),
        }));

        setFlightData(updatedFlights);
      } catch (error) {
        console.error("Uçuş verisi alınırken hata oluştu:", error);
      }
    };

    fetchFlightData();
  }, []);

  // Uçuş detaylarını açıp kapatır
  const toggleDetails = (flightId) => {
    setSelectedFlightId(selectedFlightId === flightId ? null : flightId);
  };

  // Uçuşu silme işlemi sonrası listeden çıkarır
  const handleDelete = (flightId) => {
    setFlightData(flightData.filter((flight) => flight.id !== flightId));
  };

  return (
    <div>
      {flightData.length === 0 ? (
        <div>
          <CustomSpin /> {/* Veriler yüklenirken spinner gösterir */}
        </div>
      ) : (
        flightData.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            toggleDetails={() => toggleDetails(flight.id)}
            isDetailsVisible={selectedFlightId === flight.id}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default MyFlightsCard;
