import React from 'react';
import { Link } from 'react-router-dom';
import Flightlogo from '../../../assets/flightlogo.png'; // Uçuş logosu resmi
import AvatarPhoto from '../../../assets/Avatar.png'; // Kullanıcı avatarı
import Stack from '@mui/material/Stack'; // MUI Stack bileşeni
import Avatar from '@mui/material/Avatar'; // MUI Avatar bileşeni
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Fırsatlar ikonu
import PublicIcon from '@mui/icons-material/Public'; // Keşfet ikonu

const Header = () => {
  return (
    <div className="bg-gray-100">
      <header className="py-4 px-6 flex items-center justify-between">
        {/* Sol Taraf - Logo ve başlık */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={Flightlogo} alt="Flight Logo" className="w-12 md:w-15" /> {/* Uçuş logosu */}
            <span className="text-xl md:text-xl font-bold ml-3">PLANE SCAPE</span> {/* Başlık */}
          </Link>
        </div>

        {/* Sağ Taraf - Menü ve kullanıcı avatarı */}
        <div className="flex items-center gap-4">
          {/* Fırsatlar linki */}
          <Link to="/" className="flex items-center">
            <LocalOfferIcon sx={{ color: '#6B21A8', fontSize: 18 }} /> {/* Fırsatlar ikonu, renk ve boyut */}
            <span className="text-xs md:text-sm font-medium ml-2">Deals</span>
          </Link>

          {/* Keşfet linki */}
          <Link to="/" className="flex items-center">
            <PublicIcon sx={{ color: '#6B21A8', fontSize: 18 }} /> {/* Keşfet ikonu, renk ve boyut */}
            <span className="text-xs md:text-sm font-medium ml-2">Discover</span>
          </Link>

          {/* Kullanıcı Avatarı */}
          <Stack direction="row" spacing={2}>
            <Link to="/" className="flex items-center">
              <Avatar src={AvatarPhoto} alt="Joane Smith" className="w-4 md:w-4" /> {/* Avatar resmi */}
              <span className="text-xs md:text-sm font-medium ml-2">Joane Smith</span> {/* Kullanıcı adı */}
            </Link>
          </Stack>
        </div>
      </header>
    </div>
  );
};

export default Header;
