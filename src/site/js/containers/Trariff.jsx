import React from 'react';
import Header from '../../../common/js/components/Header';
import TariffServices from '../components/TariffServices';

const Tariff = () => (
  <div className="tariff">
    <Header />
    <div className="tariff__inner">
      <div>Тарифы</div>
      <TariffServices />
    </div>
  </div>
);

export default Tariff;
