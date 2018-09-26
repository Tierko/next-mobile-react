import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { translations } = this.props.data;
    const { intro, best, club } = translations.data;

    console.log(club)

    // if (!data.page_home || !data.page_tariff) {
    //   return false;
    // }

    return (
      <div className="home">
        <LogoMobile toHome={false} dark />
        <MobileNav type="home" dark />
        <Header mode="site" light r={1} hideHomeLink />
        <div className="home__inner">
          <Intro to={() => to('signup')} data={intro} />
          <Best data={best} />
          <Club to={() => to('signup')} data={club} />
          {/*<HomeTariff r={1} data={data.page_home} />*/}
          {/*<EarthTariff home type="dark" size="big" />*/}
          {/*<Cabinet to={() => to('signin')} data={data} />*/}
          <Footer als light />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Home;
