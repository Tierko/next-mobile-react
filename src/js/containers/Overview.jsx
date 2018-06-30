import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import Balance from '../components/Balance';
import OverviewPayment from '../components/OverviewPayment';
import Remain from '../components/Remain';
import History from '../components/History';
import Roaming from '../components/Roaming';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';

class Overview extends Component {
  state = {
    sum: '2000 ₽',
  };

  onPay = () => {};

  remainData = [{
    id: 1,
    max: 10,
    current: 2.01,
    unit: 'ГБ',
    name: 'Интернет',
    link: false,
  }, {
    id: 2,
    max: 320,
    current: 200,
    unit: 'мин',
    name: 'Звонки',
    link: true,
  }, {
    id: 3,
    max: 140,
    current: 129,
    unit: 'СМС',
    name: 'Сообщения',
    link: false,
  }];

  historyData = [{
    id: 1,
    expense: 5200,
    month: 'октябрь',
  }, {
    id: 2,
    expense: 2600,
    month: 'ноябрь',
  }, {
    id: 3,
    expense: 1000,
    month: 'декабрь',
  }, {
    id: 4,
    expense: 8100,
    month: 'январь',
  }, {
    id: 5,
    expense: 6000,
    month: 'февраль',
  }, {
    id: 6,
    expense: 4000,
    month: 'март',
  }, {
    id: 7,
    expense: 4500,
    month: 'апрель',
  }, {
    id: 8,
    expense: 2000,
    month: 'май',
  }, {
    id: 9,
    expense: 5000,
    month: 'июнь',
  }];

  roamingData = [{
    id: 1,
    zoneName: 'Зона 1',
    services: [{
      id: 11,
      desc: 'Пакет быстрого интернета',
      conditions: '2,01 ГБ еще 12 дней',
      type: 'fast',
    }, {
      id: 12,
      desc: 'Помегабайтный интернет',
      conditions: '58 ₽ / Мб',
      type: 'regular',
    }],
  }, {
    id: 2,
    zoneName: 'Остальной мир',
    services: [{
      id: 21,
      desc: 'Помегабайтный интернет',
      conditions: '320 ₽ / Мб',
      type: 'regular',
    }],
  }];

  sumChange = (n, v) => {
    this.setState({
      sum: v,
    });
  };

  onBuy = () => {
    const { history } = this.props;

    history.push(Pages.AddPackage);
  };

  render() {
    const { onPay, sumChange, onBuy } = this;
    const { sum } = this.state;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <Balance sum={500} message="Следующий платеж: 2 000 ₽ через 10 дней " />
          <OverviewPayment onChange={sumChange} onPay={onPay} sum={sum} />
          <Remain data={this.remainData} buy={onBuy} />
          <History data={this.historyData} />
          <Roaming data={this.roamingData} />
          <Footer />
        </div>
      </div>,
    ];
  }
}

Overview.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(Overview);
