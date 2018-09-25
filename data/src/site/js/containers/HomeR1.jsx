import React, { Component } from 'react';
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
    location.href = `${SERVICE_URL}/#/${page || ''}`;
  };

  render() {
    const { to } = this;

    return (
      <div className="home">
        <LogoMobile toHome={false} dark />
        <MobileNav type="home" dark />
        <Header mode="site" light r={1} hideHomeLink />
        <div className="home__inner">
          <Intro to={() => to('signup')} />
          <Best />
          <Club to={() => to('signup')} />
          <HomeTariff r={1} />
          <EarthTariff home type="dark" size="big" />
          <Cabinet to={() => to('signin')} />
          <Footer als light />
        </div>
      </div>
    );
  }
}

export default Home;