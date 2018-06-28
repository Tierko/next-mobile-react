import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

class PayPackage extends Component {
  onPay = () => {
    const { history } = this.props;

    history.push(`${Pages.PayResult}/success`);
  };

  render() {
    const { location } = this.props;
    const state = location.state || {};
    const { pack, sum } = state;
    const { onPay } = this;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content pay-package">
          <LinkBack href={Pages.AddPackage} className="link-back_pay-package" />
          <div className="pay-package__header">
            {
              (!pack || !sum) ? 'Вы не выбрали услугу' : `Оплата ${pack}`
            }
          </div>
          <Payment isEditable={false} sum={sum} onPay={onPay} />
        </div>
      </div>,
    ];
  }
}

PayPackage.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default PayPackage;
