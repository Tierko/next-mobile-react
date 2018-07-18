import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import Button from '../components/Button';
import PageFade from '../components/PageFade';
import Popup from '../components/Popup';
import { Pages } from '../constants';
import { formatCost, getData } from '../utils';

class Pay extends Component {
  constructor(props) {
    super(props);
    const state = props.location.state || {};
    const sum = state.sum || 2000;

    this.state = {
      showPopup: false,
      sum: 2000,
    };
  }

  onPay = () => {
    const { history } = this.props;
    const { sum } = this.state;
    const links = [{
      url: Pages.AUTO_PAY,
      title: 'Сделать платеж регулярным',
    }, {
      url: Pages.OVERVIEW,
      title: 'Вернуться на главную',
    }];

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Оплата прошла успешно',
        text: `На ваш счет зачислено ${formatCost(sum)}`,
        links,
      },
    });
  };

  makeCardDefault = () => {};

  removeCard = () => {};

  onSumChange = (sum) => {
    this.setState({
      sum,
    });
  };

  onPopupClose = () => {
    this.setState({
      showPopup: false,
    });
  };

  changeAutoPay = () => {
    const { history } = this.props;

    history.push(Pages.AUTO_PAY);
  };

  render() {
    const { sum, showPopup } = this.state;
    const autoPayEnabled = !!getData('autopay');
    const {
      onPay,
      changeAutoPay,
      onSumChange,
      onPopupClose,
      makeCardDefault,
      removeCard,
    } = this;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_pay pay">
          <div className="dashboard__header">Пополнение</div>
          <Payment isEditable onPay={onPay} sum={sum} onSumChange={onSumChange} />
          {
            autoPayEnabled &&
            <Fragment>
              <div className="dashboard__header">Подключен автоплатеж</div>
              <div className="pay__auto-pay-from">
                2 000 ₽ с карты Сбербанка *4493
              </div>
              <div>
                Оплата каждый месяц 10 числа до сентября 2020
              </div>
              <Button className="button_pay" onClick={changeAutoPay}>Изменить</Button>
            </Fragment>
          }
          {
            !autoPayEnabled &&
            <Link className="link" to={Pages.AUTO_PAY} >
              Подключить автоплатеж
            </Link>
          }
        </div>
      </div>,
      <Popup show={showPopup} onClose={onPopupClose}>
        <div className="card card_visa card_big">
          <div className="card__number">*6266</div>
        </div>
        <div className="pay-edit">
          <div className="pay-edit__button">
            <span className="pay-edit__icon">
              <InlineSvg src={require('../../../media/icons/card.svg')} raw />
            </span>
            <span className="pay-edit__title">Карта по умолчанию</span>
          </div>
          <div className="pay-edit__button">
            <span className="pay-edit__icon">
              <InlineSvg src={require('../../../media/icons/bucket.svg')} raw />
            </span>
            <span className="pay-edit__title">Удалить</span>
          </div>
        </div>
      </Popup>,
    ]);
  }
}

Pay.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(Pay);
