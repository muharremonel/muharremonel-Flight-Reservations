import React, { useState } from 'react';
import { Card, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faPlaneArrival, faPlane } from '@fortawesome/free-solid-svg-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';
import dayjs from 'dayjs';

// Search bileşeni, uçuş arama formunu sunar ve kullanıcıdan arama kriterlerini alır
const Search = ({ onSearchClick }) => {
  const [tripType, setTripType] = useState('round'); // 'round' veya 'one' olarak seçilen trip tipi
  const [direction, setDirection] = useState(''); // Kalkış havaalanı kodu
  const [arrival, setArrival] = useState(''); // Varış havaalanı kodu
  const [flightDate, setFlightDate] = useState(null); // Uçuş tarihi
  const [returnDate, setReturnDate] = useState(null); // Dönüş tarihi (sadece round trip için)

  // Bugünün tarihini al
  const today = dayjs();

  // Arama işlemi için handleSearch fonksiyonu
  const handleSearch = async () => {
    // Form doğrulama
    if (!direction || !arrival || !flightDate) {
      message.warning('Please fill out all required fields.'); // Eksik alanlar için uyarı mesajı
      return;
    }

    onSearchClick(); // Yüklenme durumu değişikliği için callback

    // Havaalanı kodlarını büyük harfe dönüştür
    const fromAirportCode = direction.toUpperCase();
    const toAirportCode = arrival.toUpperCase();

    console.log('Direction:', fromAirportCode);
    console.log('Arrival:', toAirportCode);
    console.log('Flight Date:', flightDate ? flightDate.format('YYYY-MM-DD') : 'Not selected');
    console.log('Return Date:', returnDate ? returnDate.format('YYYY-MM-DD') : 'Not selected');

    try {
      let directionFilter;
      // Uçuş yönünü belirle
      if (fromAirportCode !== 'AMS' && toAirportCode === 'AMS') {
        directionFilter = 'A'; // Varış yönü
      } else if (fromAirportCode === 'AMS' && toAirportCode !== 'AMS') {
        directionFilter = 'D'; // Dönüş yönü
      }

      if (directionFilter) {
        // API isteği yap
        const response = await axios.get("http://localhost:5001/back/flights", {
          params: {
            flightdate: flightDate ? flightDate.format('YYYY-MM-DD') : null,
            direction: directionFilter
          },
        });

        // API yanıtını kontrol ediyoruz
        console.log('API Response:', response.data);

        // Yanıtın 'flights' özelliği alınır
        const flights = response.data.flights;

        if (Array.isArray(flights)) {
          // Filtreleme işlemi
          const filteredFlights = flights.filter(flight => {
            const fromForDestinations = flight.route.destinations || [];
            const toForDestinations = flight.route.destinations || [];

            if (directionFilter === 'A') {
              // Varış yönü için filtreleme
              return fromForDestinations.includes(fromAirportCode);
            } else if (directionFilter === 'D') {
              // Dönüş yönü için filtreleme
              return toForDestinations.includes(toAirportCode);
            }

            return false;
          });

          if (filteredFlights.length === 0) {
            // Uçuş bulunamadıysa hata mesajı göster
            message.error('No flights found for the given criteria.');
          } else {
            console.log('Filtered Flights:', filteredFlights);
            // Filtrelenmiş uçuşları sessionStorage'a kaydet
            sessionStorage.setItem('filteredFlights', JSON.stringify(filteredFlights));
            message.success("Flight found successfully"); // Başarı mesajı
          }
        } else {
          console.error('Flights data is not an array:', flights); // Hata durumu
        }
      } else {
        console.log('No specific filtering applied based on the current conditions.'); // Filtre uygulanmadı
      }
    } catch (error) {
      console.error('Error fetching flight data:', error.message); // API isteği hatası
    }
  };

  return (
    <Card className="relative p-2 rounded-xl bg-white overflow-hidden">
      {/* Başlık ve ikon */}
      <div className="flex items-center justify-between">
        {/* Sol kısım: İkon ve başlık */}
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPlane} className="mr-2 text-lg" />
          <h2 className="text-lg font-bold">BOOK YOUR FLIGHT</h2>
        </div>

        {/* Sağ kısım: Seyahat seçenekleri */}
        <div className="flex trip-options">
          {/* Gidiş-Dönüş seçeneği */}
          <div
            className={`cursor-pointer px-5 py-3 text-md font-semibold rounded-l-full ${tripType === 'round' ? 'bg-purple-900 text-white' : 'bg-gray-200 text-purple-800'} hover:text-white border border-r-0 border-gray-300`}
            onClick={() => setTripType('round')}
          >
            Round trip
          </div>

          {/* Tek Yön seçeneği */}
          <div
            className={`cursor-pointer px-5 py-3 text-md font-semibold rounded-r-full ${tripType === 'one' ? 'bg-purple-800 text-white' : 'bg-gray-200 text-purple-800'} hover:text-white border border-gray-300`}
            onClick={() => setTripType('one')}
          >
            One way
          </div>
        </div>
      </div>

      {/* Kart içeriği */}
      <div className="pt-8 pb-4">
        {/* Flex Container */}
        <div className="flex flex-col lg:flex-row lg:gap-4">
          {/* Üst Satır: Input'lar */}
          <div className="flex flex-col lg:flex-row lg:gap-4 mb-8 w-full">
            {/* Kalkış havaalanı kodu için input */}
           
            <div className="relative flex items-center min-w-[250px] mb-4 lg:mb-0">
              <FontAwesomeIcon
                icon={faPlaneDeparture}
                style={{ color: "#5831a0" }}
                className="absolute left-3"
              />
              <input
                type="text"
                className="border border-gray-300 rounded-l-xl py-4 px-16 w-full box-border focus:outline-none hover:border-purple-700"
                placeholder="Airport Code : TFS.."
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              />
            </div>

           {/* Varış havaalanı kodu için input */}
            <div className="relative flex items-center min-w-[250px] mb-4 lg:mb-0">
              <FontAwesomeIcon
                icon={faPlaneArrival}
                style={{ color: "#5831a0" }}
                className="absolute left-3"
              />
              <input
                type="text"
                className="border border-gray-300 rounded-r-xl py-4 px-16 w-full box-border focus:outline-none hover:border-purple-700"
                placeholder="Airport Code : AMS.."
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>

          </div>

          {/* Alt Satır: DatePicker'lar */}
          <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
            {/* Uçuş Tarihi */}
            <div className="flex-1 min-w-[250px] mb-4 lg:mb-0">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Flight Date"
                  minDate={today} // Geçmiş tarihler için engelleme
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root': {
                      borderRadius: '0.75rem 0 0 0.75rem', // Sol üst köşe yuvarlama
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d1d5db', // Varsayılan border rengi
                      },
                      '&:hover fieldset': {
                        borderColor: '#6d28d9', // Hover border rengi
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#6d28d9', // Odaklanma border rengi
                        borderWidth: 1, // Odaklanma border kalınlığı
                        outline: 'none', // Odaklanma outline kaldırılır
                      },
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#6d28d9', // İkon rengi
                    },
                  }}
                  value={flightDate}
                  onChange={(date) => setFlightDate(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            {/* Dönüş Tarihi (sadece Round Trip için) */}
            {tripType === 'round' && (
              <div className="flex-1 min-w-[250px] mb-4 lg:mb-0">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Return Date"
                    minDate={flightDate ? flightDate.add(1, 'day') : today} // Uçuş tarihinden sonra minimum tarih
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {
                        borderRadius: '0 0.75rem 0.75rem 0', // Sağ köşe yuvarlama
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d1d5db', // Varsayılan border rengi
                        },
                        '&:hover fieldset': {
                          borderColor: '#6d28d9', // Hover border rengi
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6d28d9', // Odaklanma border rengi
                          borderWidth: 1, // Odaklanma border kalınlığı
                          outline: 'none', // Odaklanma outline kaldırılır
                        },
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#6d28d9', // İkon rengi
                      },
                    }}
                    value={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Show Flights butonu */}
      <div className="flex justify-center lg:justify-start">
        <button
          className="px-6 py-3 font-medium bg-purple-800 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out"
          onClick={handleSearch}
        >
          Show Flights
        </button>
      </div>
    </Card>

  );
};

export default Search;