import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import TariffServices from '../components/TariffServices';
import TariffTable from '../components/TariffTable';
import PageFade from '../components/PageFade';
import tariff from '../../data/tariff';

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
    currentTariff: tariff[(localStorage.getItem('tariff') || 0) * 1].id,
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

  changeTariff = (id) => {
    this.setState({
      currentTariff: id,
    });
    localStorage.setItem('tariff', id - 1);
  };

  render() {
    const { services, currentTariff } = this.state;
    const { toggleService, changeTariff } = this;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div className="dashboard__header">Тарифы</div>
          <div className="dashboard__text">При подключении нового тарифа вы оплачиваете первый месяц абонентской платы</div>
          <TariffTable data={tariff} current={currentTariff} onChange={changeTariff} />
          <TariffServices services={services} onChange={toggleService} />
        </div>
      </div>,
    ];
  }
}

export default PageFade(Services);
