import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import LinkBack from '../components/LinkBack';
import Transitions from '../components/Transitions';
import { Pages } from '../constants';

class PayPackage extends Component {
  onPay = () => {
    const { history } = this.props;

    history.push(`${Pages.RESULT}/success`);
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
        <Transitions>
          <div className="dashboard__content pay-package">
            <LinkBack href={Pages.ADD_PACKAGE} className="link-back_offset-bottom" />
            <div className="pay-package__header">
              {
                (!pack || !sum) ? 'Вы не выбрали услугу' : `Оплата ${pack}`
              }
            </div>
            <Payment isEditable={false} sum={sum} onPay={onPay} />
          </div>
        </Transitions>
      </div>,
    ];
  }
}

PayPackage.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default PayPackage;
