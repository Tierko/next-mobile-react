import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
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
    const title = (!pack || !sum) ? 'Вы не выбрали услугу' : `Оплата ${pack}`;
    const meta = {
      title,
    };

    return (
      <DocumentMeta {...meta}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content pay-package">
              <LinkBack href={Pages.ADD_PACKAGE} className="link-back_offset-bottom" />
              <div className="pay-package__header">
                {title}
              </div>
              <Payment isEditable={false} sum={sum} onPay={onPay} />
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

PayPackage.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default PayPackage;
