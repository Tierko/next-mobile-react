import React, { Component } from 'react';
import Header from '../../../common/js/components/Header';
import TariffTariff from '../components/TariffTariff';
import TariffRoaming from '../components/TariffRoaming';
import TariffServices from '../components/TariffServices';

class Tariff extends Component {
  to = (page) => {
    location.href = `${SERVICE_URL}/#/${page || ''}`;
  };

  render() {
    const { to } = this;

    return (
      <div className="tariff">
        <Header mode="site" />
        <div className="tariff__inner">
          <TariffTariff to={() => to('signup')} />
          <TariffRoaming size="small" type="light" />
          <TariffServices />
        </div>
      </div>
    );
  }
}

export default Tariff;
