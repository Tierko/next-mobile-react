import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import TariffServices from '../components/TariffServices';
import TariffTable from '../components/TariffTable';
import PageFade from '../components/PageFade';

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
    tariff: [{
      id: 1,
      current: true,
      title: 'Супервип',
      payment: '3000',
      internet: '32',
      nextCalls: 'Безлимит',
      calls: '700',
      sms: 'Безлимит',
    }, {
      id: 2,
      current: false,
      title: 'Премиум',
      payment: '2000',
      internet: '16',
      calls: '700',
      nextCalls: '700',
      sms: 'Безлимит',
    }, {
      id: 3,
      current: false,
      title: 'Лайт',
      payment: '1500',
      internet: '8',
      calls: '700',
      nextCalls: '700',
      sms: 'Безлимит',
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
    const { services, tariff } = this.state;
    const { toggleService } = this;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div className="dashboard__header">Тарифы</div>
          <div className="dashboard__text">При подключении нового тарифа вы оплачиваете первый месяц абонентской платы</div>
          <TariffTable data={tariff} />
          <TariffServices services={services} onChange={toggleService} />
        </div>
      </div>,
    ];
  }
}

export default PageFade(Services);
