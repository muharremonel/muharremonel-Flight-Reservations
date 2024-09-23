import React from 'react';
import Header from '../components/header/my-flights/Header';
import SortBy from '../components/common/SortBy';
import Avg from '../components/common/Avg';
import MyFlightsCard from '../components/cards/MyFlightsCard';

const MyFlightsPage = () => {

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex justify-between p-4 mt-5 ">
        <SortBy />
        <Avg />
      </div>
      <div className="p-4 mx-auto mt-5">
          <MyFlightsCard />
      </div>
    </div>
    
  );
};

export default MyFlightsPage;