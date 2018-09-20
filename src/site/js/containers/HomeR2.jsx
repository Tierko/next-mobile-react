import React, { Component } from 'react';
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
    location.href = `${SERVICE_URL}/#/${page || ''}`;
  };

  render() {
    const { to } = this;

    return (
      <div className="home">
        <Header mode="site" light />
        <div className="home__inner">
          <Intro to={() => to('signup/after')} />
          <Best className="best_r2" />
          <HomeTariff to={to} r={2} />
          <EarthTariff className="earth-tariff_home-r2" home type="dark" size="big" />
          <Cabinet to={() => to('signin')} />
          <Club className="club_home-r2" to={() => to('signup/after')} />
          <Footer als light />
        </div>
      </div>
    );
  }
}

export default Home;
