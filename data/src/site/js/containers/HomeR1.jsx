import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import LogoMobile from '../components/LogoMobile';
import Header from '../../../common/js/components/Header';
import Intro from '../components/Intro';
import Best from '../components/Best';
import Club from '../components/Club';
import HomeTariff from '../components/HomeTariff';
import EarthTariff from '../components/EarthTariff';
import Cabinet from '../components/Cabinet';
import Footer from '../../../common/js/components/Footer';

class Home extends Component {
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
      roaming,
    } = this.props.data;
    const {
      intro,
      best,
      club,
      title,
      cabinet,
      tariff,
      info,
      earthTariff,
      nav,
      copyright,
    } = translations.data;

    return (
      <DocumentMeta title={title ? title.home : ''}>
        <div className="home">
          <LogoMobile toHome={false} dark />
          <MobileNav type="home" dark translate={nav} />
          <Header mode="site" light hideHomeLink info={info} translate={nav} />
          <div className="home__inner">
            <Intro to={() => to('signup')} translate={intro} />
            <Best translate={best} />
            <Club to={() => to('signup')} translate={club} />
            <HomeTariff translate={tariff} data={tariffData.data} />
            <EarthTariff
              home
              type="dark"
              size="big"
              translate={earthTariff}
              countries={countries.data}
              roaming={roaming.data}
            />
            <Cabinet to={() => to('signin')} translate={cabinet} />
            <Footer als light data={copyright} />
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

Home.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Home;
