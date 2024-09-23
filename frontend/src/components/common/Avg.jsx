import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

/**
 * AvgFare component: Ortalama bilet fiyatını göstermek için kullanılan basit bir bileşen.
 * 
 * Props:
 * - fare (number): Gösterilecek ortalama fiyat değeri.
 */
const Avg = ({ fare = 225 }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Bilgilendirme ikonu ve "Avg Fare" başlığı */}
      <div className="flex items-center space-x-2">
        <InfoCircleOutlined style={{ color: "#74C0FC", fontSize: '24px' }} />
        <Text style={{ color: '#4A5568' }}>Avg Fare:</Text>
      </div>
      {/* Güçlü (bold) stil ile fiyatı göster */}
      <Text strong>${fare}</Text>
    </div>
  );
};

export default Avg;
