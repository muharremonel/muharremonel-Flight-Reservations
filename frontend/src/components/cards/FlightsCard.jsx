import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightDetailsCard from './DetailsCard';
import { getCityNameFromIATA } from '../../utils/getCityName'; // Şehir ismini IATA koduna göre almak için yardımcı fonksiyon
import { getAirlineNameFromIATA } from '../../utils/getAirlineName'; // Havayolu ismini IATA koduna göre almak için yardımcı fonksiyon
import { formatTime } from '../../utils/formatTime'; // Zaman formatlama fonksiyonu
import calculateFlight from '../../utils/calculateFlight'; // Uçuş süresi hesaplama fonksiyonu
import { Card, message } from 'antd'; // Ant Design'dan Card ve message bileşenleri
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome ikonu bileşenleri
import { faPlane, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import CustomSpin from '../filter/CustomSpin'; // Özelleştirilmiş spin (yükleniyor) bileşeni

const FlightsCard = ({ selectedAirline, selectedStop, selectedTimeRange }) => {
  const [flightData, setFlightData] = useState([]); // Tüm uçuş verilerini saklamak için state
  const [filteredFlights, setFilteredFlights] = useState([]); // Filtrelenmiş uçuş verilerini saklamak için state
  const [selectedFlight, setSelectedFlight] = useState(null); // Seçilen uçuşun detaylarını göstermek için state
  const navigate = useNavigate(); // Sayfa yönlendirme için useNavigate hook'u

  // Uçuş verilerini almak için bir fonksiyon (sessionStorage'dan)
  const fetchFlightData = useCallback(() => {
    const storedData = sessionStorage.getItem('filteredFlights'); // SessionStorage'dan filtrelenmiş uçuş verilerini al
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFlightData(parsedData); // Tüm uçuş verilerini state'e yükle
      setFilteredFlights(parsedData); // Başlangıçta tüm verileri filtrelenmiş veri olarak ayarla
    } else {
      setFlightData([]); // Veriler bulunmazsa boş dizi
    }
  }, []);

  // Component yüklendiğinde ve her 5 saniyede bir verileri çekmek için effect kullanıyoruz
  useEffect(() => {
    fetchFlightData();
    const intervalId = setInterval(fetchFlightData, 5000); // 5 saniyede bir verileri güncelle
    return () => clearInterval(intervalId); // Component unmount olduğunda interval'ı temizle
  }, [fetchFlightData]);

  // Filtreleme işlemi (seçilen havayolu, durak sayısı ve saat aralığına göre)
  useEffect(() => {
    let filteredData = flightData;

    if (selectedAirline) {
      filteredData = filteredData.filter(
        (flight) => flight.prefixIATA === selectedAirline // Havayolu filtresi
      );
    }

    if (selectedStop) {
      filteredData = filteredData.filter(
        (flight) => flight.stops === selectedStop // Durak sayısı filtresi
      );
    }

    if (selectedTimeRange) {
      const [start, end] = selectedTimeRange.split('-'); // Seçilen zaman aralığı
      filteredData = filteredData.filter((flight) => {
        const flightTime = new Date(flight.scheduleDateTime).getHours();
        return flightTime >= parseInt(start) && flightTime <= parseInt(end); // Zaman aralığına göre filtreleme
      });
    }

    setFilteredFlights(filteredData); // Filtrelenmiş veriyi state'e yükle
  }, [flightData, selectedAirline, selectedStop, selectedTimeRange]);

  // Uçuşu rezerve etmek için asenkron bir fonksiyon
  const bookFlight = async (flight) => {
    try {
      const formattedFlight = {
        ...flight,
        codeshares: Array.isArray(flight.codeshares)
          ? flight.codeshares.map((cs) => String(cs))
          : [], // Codeshare bilgilerini düzenle
      };

      const response = await axios.post(
        'http://localhost:5001/back/flights/add-flight',
        formattedFlight // Uçuş verilerini API'ye gönder
      );
      console.log(response.data);
      message.success('Flight booked successfully!'); // Başarılı rezervasyon mesajı
      navigate('/my-flights'); // Uçuşlar sayfasına yönlendirme
    } catch (error) {
      console.error(
        'Error booking flight:',
        error.response ? error.response.data : error.message
      );
      alert('Error booking flight. Please try again.'); // Hata durumunda kullanıcıya uyarı
    }
  };

  // Uçuş detaylarını açma ve kapama işlevi
  const handleToggleDetails = (flight) => {
    if (selectedFlight && selectedFlight.id === flight.id) {
      setSelectedFlight(null); // Seçilen uçuşu kapat
    } else {
      setSelectedFlight(flight); // Seçilen uçuşu aç
    }
  };

  // Uçuş verisi yoksa yükleniyor göstergesi
  if (filteredFlights.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <CustomSpin /> {/* Özelleştirilmiş Spin bileşenini göster */}
      </div>
    );
  }

  // Filtrelenmiş uçuşların gösterimi
  return (
    <div className="mt-5 w-full">
      {filteredFlights.map((flight) => {
        const {
          id,
          flightDirection,
          route,
          scheduleDateTime,
          estimatedLandingTime,
          prefixIATA,
        } = flight;

        const destinations = route?.destinations || []; // Uçuş rotası
        const departureAirport =
          flightDirection === 'D' ? 'AMS' : destinations[0]; // Kalkış havalimanı
        const arrivalAirport =
          flightDirection === 'A' ? 'AMS' : destinations[destinations.length - 1]; // Varış havalimanı
        const flightDuration = calculateFlight(
          scheduleDateTime,
          estimatedLandingTime // Uçuş süresi hesaplama
        );
        const airlineName = getAirlineNameFromIATA(prefixIATA); // Havayolu ismini alma

        return (
          <div key={id} className="relative mb-5">
            <Card className="relative max-w-full bg-white">
            <h2 className="text-md mb-5 font-bold text-nowrap	">
                    {getCityNameFromIATA(departureAirport)} -{' '}
                    {getCityNameFromIATA(arrivalAirport)}
                  </h2>
              <div className="grid grid-cols-1 mb-10 md:grid-cols-5 gap-4 items-center">
                {/* Kalkış bilgileri */}
                <div className="flex flex-col">
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        className="text-xs text-gray-600"
                      />
                      <span className="text-md text-gray-500">Departure</span>
                    </div>
                    <span className="text-xl text-gray-900 font-bold">
                      {formatTime(scheduleDateTime)} {/* Uçuş saati */}
                    </span>
                    <span className="text-md text-gray-700">
                      Airport: {departureAirport} {/* Kalkış havalimanı */}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="border-t-4 border-gray-300 w-24"></div> {/* Görsel ayrıştırıcı */}
                </div>

                {/* Havayolu ve uçuş süresi */}
                <div className="flex flex-col items-start">
                  <span className="text-md mb-3 font-bold text-gray-900">
                    {airlineName} {/* Havayolu ismi */}
                  </span>
                  <FontAwesomeIcon
                    icon={faPlane}
                    className="text-lg mb-3 text-purple-700"
                  />
                  <span className="text-md text-gray-900">
                    {flightDuration} (nonstop) {/* Uçuş süresi */}
                  </span>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="border-t-4 border-gray-300 w-24"></div> {/* Görsel ayrıştırıcı */}
                </div>

                {/* Varış bilgileri */}
                <div className="flex flex-col items-start">
                  <div className="flex space-x-2">
                    <FontAwesomeIcon
                      icon={faPlaneArrival}
                      className="text-lg text-gray-600"
                    />
                    <span className="text-md text-gray-500">Arrival</span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-xl text-gray-900 font-bold">
                      {formatTime(estimatedLandingTime)} {/* Varış saati */}
                    </span>
                    <span className="text-md text-gray-900">
                      Airport: {arrivalAirport} {/* Varış havalimanı */}
                    </span>
                  </div>
                </div>
              </div>

              {/* Uçuşu rezerve etme butonu */}
              <button
                onClick={() => bookFlight(flight)}
                className="absolute bottom-0 right-0 bg-purple-800 font-bold rounded-br-md rounded-tl-md text-white hover:bg-purple-600 py-5 px-8"
              >
                Book Flight
              </button>
            </Card>

            {/* Uçuş detaylarını görüntüleme butonu */}
            <div className="flex justify-start">
              <button
                onClick={() => handleToggleDetails(flight)}
                className="bg-gray-400 bg-opacity-40 text-purple-800 underline hover:bg-slate-100 py-2 px-4 rounded-b-md"
              >
                Check the details
              </button>
            </div>

            {/* Uçuş detayları bileşeni */}
            {selectedFlight && selectedFlight.id === flight.id && (
              <FlightDetailsCard
                flight={selectedFlight}
                onClose={() => setSelectedFlight(null)} // Detayları kapat
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlightsCard;
