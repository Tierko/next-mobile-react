import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import Intro from '../components/Intro';
import Best from '../components/Best';
import Club from '../components/Club';
import HomeTariff from '../components/HomeTariff';
import EarthTariff from '../components/EarthTariff';
import Cabinet from '../components/Cabinet';
import Footer from '../../../common/js/components/Footer';
import LogoMobile from '../components/LogoMobile';

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
    const { translations, tariffs: tariffData } = this.props.data;
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
          <LogoMobile toHome={false} r={2} dark />
          <MobileNav type="home" r={2} dark translate={nav} />
          <Header mode="site" info={info} light hideHomeLink translate={nav} />
          <div className="home__inner">
            <Intro to={() => to('signup/after')} translate={intro} />
            <Best className="best_r2" translate={best} />
            <HomeTariff to={to} r={2} translate={tariff} data={tariffData} />
            <EarthTariff className="earth-tariff_home-r2" type="dark" size="big" translate={earthTariff} home />
            <Cabinet to={() => to('signin')} translate={cabinet} />
            <Club className="club_home-r2" to={() => to('signup/after')} translate={club} />
            <Footer als light translate={copyright} />
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
