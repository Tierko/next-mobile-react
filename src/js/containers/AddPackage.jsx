import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Package from '../components/Package';

class AddPackage extends Component {
  data = [{
    id: 1,
    title: 'Интернет',
    max: 20,
    current: 2.01,
    unit: 'ГБ',
    items: [{
      id: 11,
      count: 1000,
      price: 2500,
    }, {
      id: 12,
      count: 500,
      price: 1000,
    }, {
      id: 13,
      count: 300,
      price: 700,
    }],
  }, {
    id: 2,
    title: 'Звонки',
    max: 1000,
    current: 900,
    unit: 'мин',
    items: [{
      id: 21,
      count: 1000,
      price: 2500,
    }, {
      id: 22,
      count: 500,
      price: 1000,
    }, {
      id: 23,
      count: 300,
      price: 700,
    }],
  }, {
    id: 2,
    title: 'Сообщения',
    max: 1000,
    current: 900,
    unit: 'СМС',
    items: [{
      id: 21,
      count: 1000,
      price: 2500,
    }, {
      id: 22,
      count: 500,
      price: 1000,
    }, {
      id: 23,
      count: 300,
      price: 700,
    }],
  }];

  render() {
    const { data } = this;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div className="add-package">
            <h1>Дополнительный пакет</h1>
            <div className="add-package__text">Через 10 дней будут начислены 200 мин и 2 ГБ по тарифу Супервип</div>
            {
              data.map(d => <Package data={d} />)
            }
          </div>
        </div>
      </div>,
    ]);
  }
}

export default AddPackage;
