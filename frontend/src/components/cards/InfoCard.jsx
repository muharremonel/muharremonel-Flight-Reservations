import Carr from '../../assets/Car.png'; 
import Hotel from '../../assets/Hotel.png'; 
import Travel from '../../assets/Travel.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarRear, faHotel, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'; 

// CustomCard bileşeni - Her bir kart için kullanılan genel bileşen
const CustomCard = ({ src, alt, icon, iconText }) => {
  return (
    <div className="relative overflow-hidden rounded-lg max-w-[90px] max-h-[200px] md:max-w-[250px] md:max-h-[200px]">
      {/* Kart içindeki görsel */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {/* İkon ve metin içeren alt bilgi kısmı */}
      {icon && (
        <div className="absolute bottom-0 left-0 p-2 text-white flex flex-col items-start bg-opacity-0">
          <FontAwesomeIcon icon={icon} className="text-xl" /> {/* İkon */}
          <span className="w-auto">{iconText}</span> {/* İkon açıklama metni */}
        </div>
      )}
    </div>
  );
};

// InfoCards bileşeni - Tüm kartları içeren bileşen
const InfoCards = () => {
  return (
    <div className="flex flex-row md:flex-col gap-8 bg-gray-100">
      {/* Araç kiralama kartı */}
      <CustomCard 
        src={Carr} 
        alt="Amazing Destination" 
        icon={faCarRear}
        iconText="CAR RENTALS"
      />
      
      {/* Otel kartı */}
      <CustomCard 
        src={Hotel} 
        alt="Adventure Awaits" 
        icon={faHotel}
        iconText="HOTELS"
      />
      
      {/* Seyahat paketi kartı */}
      <CustomCard 
        src={Travel} 
        alt="Relax and Unwind" 
        icon={faUmbrellaBeach}
        iconText="TRAVEL PACKAGES"
      />
    </div>
  );
};

export default InfoCards;
