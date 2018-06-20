import React from 'react';
import Aside from '../components/Aside';
import Footer from '../components/Footer';

const Overview = () => (
  <div className="dashboard">
    <Aside />
    <div className="dashboard__content">
      <Footer />
    </div>
  </div>
);

export default Overview;
