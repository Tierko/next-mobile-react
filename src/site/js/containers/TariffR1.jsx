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

  render() {
    const { to } = this;

    return (
      <div className="tariff">
        <LogoMobile />
        <MobileNav type="home" />
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
