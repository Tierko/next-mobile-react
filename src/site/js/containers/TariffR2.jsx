import React, { Component } from 'react';
import MobileNav from './../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import TariffTariff from '../components/TariffTariff';
import TariffRoaming from '../components/TariffRoaming';
import TariffServices from '../components/TariffServices';
import LogoMobile from '../components/LogoMobile';

class Tariff extends Component {
  to = (page) => {
    location.href = `${SERVICE_URL}/#/${page || ''}`;
  };

  toTariff = (id) => {
    location.href = `${SERVICE_URL}/#/signup/after/tariff/${id}`;
  };

  render() {
    const { to, toTariff } = this;

    return (
      <div className="tariff">
        <LogoMobile r={2} />
        <MobileNav type="home" />
        <Header mode="site" r={2} />
        <div className="tariff__inner">
          <TariffTariff to={() => to('signup/after')} toTariff={toTariff} />
          <TariffRoaming size="small" type="light" />
          <TariffServices />
        </div>
      </div>
    );
  }
}

export default Tariff;
