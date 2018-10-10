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
    const { info } = this.props.data.translations.data;
    const url = info ? info.lk_url : '';

    if (url) {
      location.href = `${url}/#/${page || ''}`;
    }
  };

  toTariff = (id) => {
    const { info } = this.props.data.translations.data;
    const url = info ? info.lk_url : '';

    if (url) {
      location.href = `${url}/#/signup/after/tariff/${id}`;
    }
  };

  render() {
    const { to, toTariff } = this;
    const { translations, tariffs: tariffData } = this.props.data;
    const {
      title,
      services,
      info,
      roamingTariff,
      nav,
      tariffTariff,
    } = translations.data;

    return (
      <DocumentMeta title={title ? title.tariff : ''}>
        <div className="tariff">
          <LogoMobile r={2} />
          <MobileNav type="home" translate={nav} />
          <Header mode="site" info={info} translate={nav} />
          <div className="tariff__inner">
            <TariffTariff to={() => to('signup/after')} toTariff={toTariff} data={tariffData.data} translate={tariffTariff} />
            <TariffRoaming size="small" type="light" translate={roamingTariff} />
            <TariffServices translate={services} />
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
