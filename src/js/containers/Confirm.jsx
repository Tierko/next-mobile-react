import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Button from '../components/Button';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';
import { formatCost } from '../utils';

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
        <div className="dashboard__content">
          <LinkBack href={Pages.ADD_PACKAGE} />
          <div className="confirm">
            <div className="dashboard__header dashboard__header_confirm">Оплатить {pack}</div>
            <div className="confirm__sum">{formatCost(sum)}</div>
            <Button className="button_confirm" onClick={onPay} >Оплатить</Button>
          </div>
        </div>
      </div>,
    ];
  }
}

PayPackage.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default PageFade(PayPackage);