import React from 'react';
import { Link } from 'react-router-dom';
import TariffTable from '../../../common/js/components/TariffTable';

const HomeTariff = () => (
  <div className="home-tariff">
    <div className="home-tariff__header">
      <Link className="home__link" to="#">Тарифы</Link>, с&nbsp;которыми не&nbsp;нужно заботиться об&nbsp;остатках
    </div>
    <TariffTable home />
  </div>
);

export default HomeTariff;