import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import TariffServices from '../components/TariffServices';

class Services extends Component {
  state = {
    services: [{
      id: 1,
      name: 'Кто звонил',
      checked: true,
      desc: 'Мы будем присылать СМС о том, кто вам звонил, пока вы были недоступны.',
      price: 'Бесплатно',
    }, {
      id: 2,
      name: 'Антиопределитель номера',
      checked: false,
      desc: 'Ваш номер нельзя будет определить при звонке.',
      price: 'Бесплатно',
    }],
  };

  toggleService = (id, value) => {
    const { services } = this.state;
    const index = services.slice().findIndex(s => s.id === id);

    if (index !== -1) {
      services[index].checked = value;

      this.setState({
        services,
      });
    }
  };

  render() {
    const { services } = this.state;
    const { toggleService } = this;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <h1>Тарифы</h1>
          <div>При подключении нового тарифа вы оплачиваете первый месяц абонентской платы</div>
          <TariffServices services={services} onChange={toggleService} />
        </div>
      </div>,
    ];
  }
}

export default Services;
