import React, { Component } from 'react';
import Header from '../../../common/js/components/Header';
import TariffTariff from '../components/TariffTariff';
import TariffRoaming from '../components/TariffRoaming';
import TariffServices from '../components/TariffServices';

class Tariff extends Component {
  to = (page) => {
    location.href = `${SERVICE_URL}/#/${page || ''}`;
  };

  toTariff = (id) => {
    location.href = `${SERVICE_URL}/#/signup/tariff/${id}`;
  };

  render() {
    const { to, toTariff } = this;

    return (
      <div className="tariff">
        <Header mode="site" />
        <div className="tariff__inner">
          <TariffTariff to={() => to('signup')} toTariff={toTariff} />
          <TariffRoaming />
          <TariffServices />
        </div>
      </div>
    );
  }
}

export default Tariff;