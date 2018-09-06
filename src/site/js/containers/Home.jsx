import React from 'react';
import Header from '../../../common/js/components/Header';
import Intro from '../components/Intro';
import Best from '../components/Best';
import Club from '../components/Club';
import HomeTariff from '../components/HomeTariff';
import EarthTariff from '../components/EarthTariff';
import Cabinet from '../components/Cabinet';
import Footer from '../../../common/js/components/Footer';

const Home = () => (
  <div className="home">
    <Header light />
    <div className="home__inner">
      <Intro />
      <Best />
      <Club />
      <HomeTariff />
      <EarthTariff home />
      <Cabinet />
      <Footer als light />
    </div>
  </div>
);

export default Home;
