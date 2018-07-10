import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

class Calls extends Component {
  render() {
    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <LinkBack className="link-back_offset-bottom" href={Pages.OVERVIEW} />
          <div className="dashboard__header">Звонки по тарифу Супервип</div>
          <div className="calls__name">На номера Next всей России дома и в поездках по стране</div>
          <div className="calls__remain">0 ₽ / мин</div>
          <div className="calls__name">На номера всех операторов Москвы и на Next по всей России </div>
          <div className="calls__remain">550 мин / месяц </div>
        </div>
      </div>,
    ]);
  }
}

export default Calls;
