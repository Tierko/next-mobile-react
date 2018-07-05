import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Package from '../components/Package';
import LinkBack from '../components/LinkBack';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';
import { getData } from '../utils';

class AddPackage extends Component {
  render() {
    const data = getData('packages');

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <LinkBack href={Pages.Overview} className="link-back_offset-bottom" />
          <div className="dashboard__header">Дополнительный пакет</div>
          <div className="dashboard__text">Через 10&nbsp;дней будут начислены 200 мин и&nbsp;2&nbsp;ГБ по&nbsp;тарифу Супервип</div>
          {
            data.map(d => <Package key={d.id} data={d} />)
          }
        </div>
      </div>,
    ]);
  }
}

export default PageFade(AddPackage);
