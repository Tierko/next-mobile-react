import React from 'react';
import Header from '../../../common/js/components/Header';
import Intro from '../components/Intro';
import Best from '../components/Best';
import Club from '../components/Club';
import Footer from '../../../common/js/components/Footer';

const Home = () => (
  <div className="home">
    <Header light />
    <div className="home__inner">
      <Intro />
      <Best />
      <Club />
      <Footer als light />
    </div>
  </div>
);

export default Home;
