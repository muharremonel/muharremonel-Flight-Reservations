import React from 'react';
import { Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// Özelleştirilmiş Spin bileşeni
const CustomSpin = () => {
  const spinIcon = (
    <FontAwesomeIcon
      icon={faCircleNotch}
      spin
      style={{ fontSize: '48px', color: '#581C87' }}
    />
  );

  return <Spin indicator={spinIcon} />;
};

export default CustomSpin;
