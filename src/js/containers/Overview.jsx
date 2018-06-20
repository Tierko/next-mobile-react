import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import Balance from '../components/Balance';
import Payment from '../components/Payment';
import Remain from '../components/Remain';
import History from '../components/History';
import Roaming from '../components/Roaming';

class Overview extends Component {
  state = {
    sum: 2000,
  };

  onPay = () => {};

  remainData = [{
    id: 1,
    max: 10,
    current: 2.01,
    unit: 'ГБ',
    name: 'Интернет',
  }, {
    id: 2,
    max: 320,
    current: 200,
    unit: 'мин',
    name: 'Звонки',
  }, {
    id: 3,
    max: 140,
    current: 129,
    unit: 'СМС',
    name: 'Сообщения',
  }];

  historyData = [{
    id: 1,
    expense: 5200,
    month: 'Октябрь',
  }, {
    id: 2,
    expense: 2600,
    month: 'Ноябрь',
  }, {
    id: 3,
    expense: 1000,
    month: 'Декабрь',
  }, {
    id: 4,
    expense: 8100,
    month: 'Январь',
  }, {
    id: 5,
    expense: 6000,
    month: 'Февраль',
  }, {
    id: 6,
    expense: 4000,
    month: 'Март',
  }, {
    id: 7,
    expense: 4500,
    month: 'Апрель',
  }, {
    id: 8,
    expense: 2000,
    month: 'Май',
  }, {
    id: 9,
    expense: 5000,
    month: 'Июнь',
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

  onBuy = () => {};

  render() {
    const { onPay, sumChange, onBuy } = this;
    const { sum } = this.state;

    return (
      <div className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <Balance sum={500} message="Следующий платеж: 2 000 ₽ через 10 дней " />
          <Payment onChange={sumChange} onPay={onPay} sum={sum} />
          <Remain data={this.remainData} buy={onBuy} />
          <History data={this.historyData} />
          <Roaming data={this.roamingData} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Overview;
