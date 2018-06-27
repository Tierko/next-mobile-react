import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Package from '../components/Package';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

class AddPackage extends Component {
  data = [{
    id: 1,
    title: 'Интернет',
    title_: 'интернета',
    max: 20,
    current: 2.01,
    unit: 'ГБ',
    items: [{
      id: 11,
      count: 1000,
      price: 2500,
      period: 30,
    }, {
      id: 12,
      count: 500,
      price: 1000,
      period: 30,
    }, {
      id: 13,
      count: 300,
      price: 700,
      period: 30,
    }],
  }, {
    id: 2,
    title: 'Звонки',
    title_: 'звонков',
    max: 1000,
    current: 900,
    unit: 'мин',
    items: [{
      id: 21,
      count: 1000,
      price: 2500,
      period: 30,
    }, {
      id: 22,
      count: 500,
      price: 1000,
      period: 30,
    }, {
      id: 23,
      count: 300,
      price: 700,
      period: 30,
    }],
  }, {
    id: 3,
    title: 'Сообщения',
    title_: 'сообщений',
    max: 1000,
    current: 900,
    unit: 'СМС',
    items: [{
      id: 21,
      count: 1000,
      price: 2500,
      period: 30,
    }, {
      id: 22,
      count: 500,
      price: 1000,
      period: 30,
    }, {
      id: 23,
      count: 300,
      price: 700,
      period: 30,
    }],
  }];

  render() {
    const { data } = this;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <LinkBack href={Pages.Overview} className="link-back_add-package" />
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

export default AddPackage;
