import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import Button from '../components/Button';
import { Pages } from '../constants';

class Pay extends Component {
  onPay = () => {

  };

  changeAutoPay = () => {
    const { history } = this.props;

    history.push(Pages.AutoPay);
  };

  render() {
    const { onPay, changeAutoPay } = this;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_pay pay">
          <div className="dashboard__header">Пополнение</div>
          <Payment isEditable onPay={onPay} sum={2500} />
          <div className="conditions__header">Подключен автоплатеж</div>
          <div>
            2 000 ₽ с карты Сбербанка *4493
          </div>
          <div>
            Оплата каждый месяц 10 числа до сентября 2020
          </div>
          <Button className="button_pay" onClick={changeAutoPay}>Изменить</Button>
          <Link className="link" to="#">Удалить</Link>
        </div>
      </div>,
    ]);
  }
}

Pay.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Pay;
