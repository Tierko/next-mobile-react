import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

class PayPackage extends Component {
  render() {
    const { location: { sum } } = this.props;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content pay-package">
          <LinkBack href={Pages.AddPackage} className="link-back_pay-package" />
          <div className="pay-package__header">Оплата 3 ГБ интернета</div>
          <Payment isEditable={false} />
        </div>
      </div>,
    ];
  }
}

export default PayPackage;
