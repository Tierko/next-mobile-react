import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import Button from '../components/Button';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';
import { formatCost } from '../utils';

class Pay extends Component {
  state = {
    sum: 2000,
  };

  onPay = () => {
    const { history } = this.props;
    const { sum } = this.state;
    const links = [{
      url: Pages.AutoPay,
      title: 'Сделать платеж регулярным',
    }, {
      url: Pages.Overview,
      title: 'Вернуться на главную',
    }];

    history.push({
      pathname: `${Pages.Result}/success`,
      state: {
        title: 'Оплата прошла успешно',
        text: `На ваш счет зачислено ${formatCost(sum)}`,
        links,
      },
    });
  };

  onSumChange = (sum) => {
    this.setState({
      sum,
    });
  };

  changeAutoPay = () => {
    const { history } = this.props;

    history.push(Pages.AutoPay);
  };

  render() {
    const { onPay, changeAutoPay, onSumChange } = this;
    const { sum } = this.state;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_pay pay">
          <div className="dashboard__header">Пополнение</div>
          <Payment isEditable onPay={onPay} sum={sum} onSumChange={onSumChange} />
          <div className="conditions__header">Подключен автоплатеж</div>
          <div>
            2 000 ₽ с карты Сбербанка *4493
          </div>
          <div>
            Оплата каждый месяц 10 числа до сентября 2020
          </div>
          <Button className="button_pay" onClick={changeAutoPay}>Изменить</Button>
          <Link className="link" to={Pages.AutoPay} >
            Удалить
          </Link>
        </div>
      </div>,
    ]);
  }
}

Pay.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(Pay);
