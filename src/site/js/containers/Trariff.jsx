import React from 'react';
import Header from '../../../common/js/components/Header';
import TariffTariff from '../components/TariffTariff';
import TariffRoaming from '../components/TariffRoaming';
import TariffServices from '../components/TariffServices';

const Tariff = () => (
  <div className="tariff">
    <Header />
    <div className="tariff__inner">
      <TariffTariff />
      <TariffRoaming  />
      <TariffServices />
    </div>
  </div>
);

export default Tariff;
