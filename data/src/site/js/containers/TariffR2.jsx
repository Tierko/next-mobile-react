import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll } from 'react-scroll';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import TariffTariff from '../components/TariffTariff';
import TariffRoaming from '../components/TariffRoaming';
import TariffServices from '../components/TariffServices';
import LogoMobile from '../components/LogoMobile';

class Tariff extends Component {
  componentDidMount() {
    animateScroll.scrollToTop();
  }

  to = (page) => {
    location.href = `${SERVICE_URL}/#/${page || ''}`;
  };

  toTariff = (id) => {
    location.href = `${SERVICE_URL}/#/signup/after/tariff/${id}`;
  };

  render() {
    const { to, toTariff } = this;
    const { translations } = this.props.data;
    const { title } = translations.data;

    return (
      <DocumentMeta title={title ? title.tariff : ''}>
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
      </DocumentMeta>
    );
  }
}

Tariff.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Tariff;
