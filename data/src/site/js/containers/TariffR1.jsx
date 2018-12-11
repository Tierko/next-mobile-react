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

  render() {
    const { to } = this;
    const {
      translations,
      tariffs: tariffData,
      countries,
      interCalls,
      roaming,
    } = this.props.data;
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
          <LogoMobile />
          <MobileNav type="home" translate={nav} />
          <Header mode="site" info={info} translate={nav} />
          <div className="tariff__inner">
            <TariffTariff
              to={() => to('signup')}
              r={1}
              tariffs={tariffData.data}
              translate={tariffTariff}
              countries={countries.data}
              interCalls={interCalls.data}
            />
            {/*<TariffRoaming*/}
              {/*size="small"*/}
              {/*type="light"*/}
              {/*translate={roamingTariff}*/}
              {/*countries={countries.data}*/}
              {/*roaming={roaming.data}*/}
            {/*/>*/}
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
