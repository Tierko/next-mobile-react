import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Button from '../../../common/js/components/Button';
import Transition from '../components/Transitions';
import { Pages } from '../constants';
import { formatCost } from '../utils';

class Confirm extends Component {
  onPay = () => {
    const { history } = this.props;

    history.push(`${Pages.RESULT}/success`);
  };

  redirect = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    const { location } = this.props;
    const state = location.state || {};
    const { pack, sum } = state;
    const { onPay, redirect } = this;
    const title = `Оплатить ${pack}?`;
    const meta = {
      title,
    };

    if (!pack || !sum) {
      redirect();
    }

    return (
      <DocumentMeta {...meta}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transition>
            <div className="dashboard__content">
              <LinkBack href={Pages.ADD_PACKAGE} />
              <div className="confirm">
                <div className="dashboard__header dashboard__header_confirm">{title}</div>
                <div className="confirm__sum">{formatCost(sum || 0)}</div>
                <Button className="button_confirm" onClick={onPay} >Оплатить</Button>
              </div>
            </div>
          </Transition>
        </div>
      </DocumentMeta>
    );
  }
}

Confirm.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default Confirm;
