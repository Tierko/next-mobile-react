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
import { getData, formatCost, convertDays } from '../utils';

class Overview extends Component {
  state = {
    sum: 2000,
  };

  onPay = () => {
    const { history } = this.props;

    history.push({
      pathname: Pages.Pay,
    });
  };

  onBuy = () => {
    const { history } = this.props;

    history.push(Pages.AddPackage);
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
    const status = (getData('payment').days === 10 && 'warn') || (getData('payment').days === 5 && 'error') || '';
    console.log(status)

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <Balance
            sum={getData('balance')}
            message={`Следующий платеж: ${formatCost(getData('payment').sum)} через ${getData('payment').days} дней`}
            status={status}
          />
          <OverviewPayment onChange={sumChange} onPay={onPay} sum={sum} />
          <Remain data={getData('remain')} tariff={getData('tariff')} buy={onBuy} />
          <History data={getData('history')} />
          <Roaming data={getData('roaming')} />
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
