import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import Balance from '../components/Balance';
import OverviewPayment from '../components/OverviewPayment';
import Remain from '../components/Remain';
import History from '../components/History';
import RoamingDashboard from '../components/RoamingDashboard';
import Note from '../components/Note';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';
import { getData, formatCost, convertDays } from '../utils';

class Overview extends Component {
  state = {
    sum: getData('balance') < getData('tariff').payment ? getData('tariff').payment - getData('balance') : getData('tariff').payment,
  };

  onPay = () => {
    const { history } = this.props;
    const { sum } = this.state;

    history.push({
      pathname: Pages.PAY,
      state: { sum },
    });
  };

  onBuy = () => {
    const { history } = this.props;

    history.push(Pages.ADD_PACKAGE);
  };

  sumChange = (n, v) => {
    if (v.toString().length > 5) {
      return;
    }

    this.setState({
      sum: v,
    });
  };

  render() {
    const { onPay, sumChange, onBuy } = this;
    const { sum } = this.state;
    const data = getData('payment');
    let status = '';

    if (data.days > 5 && data.days <= 10 && getData('balance') < getData('tariff').payment) {
      status = 'warn';
    }

    if (data.days <= 5 && getData('balance') < getData('tariff').payment) {
      status = 'error';
    }

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <Note
            className="note_dashboard"
            message="Добавлено 3ГБ бесплатного интернета до 5 марта"
            color="green"
            hideCont
            show={getData('noteGreen')}
          />
          <Note
            className="note_dashboard"
            message="Информационное сообщение"
            color="blue"
            hideCont
            show={getData('noteBlue')}
          />
          <Note
            className="note_dashboard"
            message="Ваши номер заблокирован"
            color="red"
            hideCont
            show={getData('noteRed')}
          />
          <Balance
            sum={getData('balance')}
            message={`Следующий платеж: ${formatCost(getData('tariff').payment)} через ${getData('payment').days} ${convertDays(getData('payment').days)}`}
            status={status}
          />
          <OverviewPayment onChange={sumChange} onPay={onPay} sum={sum} />
          <Remain data={getData('remain')} tariff={getData('tariff')} buy={onBuy} />
          <History data={getData('history')} />
          <RoamingDashboard data={getData('roaming')} />
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
