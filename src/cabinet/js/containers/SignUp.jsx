import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import ProgressBar from '../components/ProgressBar';
import SignUpInit from '../components/SignUpInit';
import SignUpInitAfter from '../components/SignUpInitAfter';
import SingUpStep1 from '../components/SignUpPhone';
import SignUpPersonal from '../components/SignUpPersonal';
import SignUpDeliveryAddress from '../components/SignUpDeliveryAddress';
import SignUpDeliveryDate from '../components/SignUpDeliveryDate';
import SignUpNumberSelect from '../components/SignUpNumberSelect';
import SingUpTariffSelect from '../components/SignUpTariffSelect';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

class SignUp extends Component {
  nextStep = (step) => {
    const { history } = this.props;
    const { match: { params: { number } } } = this.props;
    let stepStr = `${Pages.SIGN_UP}/step/${step}`;

    if (number) {
      stepStr = `${stepStr}/number/${number}`;
    }

    history.push(stepStr);
  };

  toPage = (page) => {
    const { history } = this.props;

    history.push(page);
  };

  render() {
    const { match: { params: { step, mode, number } } } = this.props;
    const { nextStep, toPage } = this;
    const meta = {
      title: TITLES.SIGN_UP,
    };

    return (
      <DocumentMeta {...meta}>
        <div className="welcome">
          <MobileNav type="enter" />
          <Header />
          <Transitions classNames="slide">
            {
              step &&
              <div className="sign-up__transition">
                Переход на Next
              </div>
            }
            {
              step &&
              <Transitions>
                <ProgressBar step={step} number={number} />
              </Transitions>
            }
            {
              !step && mode === 'after' &&
              <SignUpInitAfter nextStep={nextStep} />
            }
            {
              !step && mode !== 'after' &&
              <SignUpInit nextStep={nextStep} toPage={toPage} mode={mode === 'promo-after' ? '' : mode} />
            }
            {
              step === 'choose-number' &&
              <SignUpNumberSelect nextStep={nextStep} />
            }
            {
              step === 'choose-tariff' &&
              <SingUpTariffSelect nextStep={nextStep} number={number} />
            }
            {
              step === 'phone' &&
              <SingUpStep1 nextStep={nextStep} number={number} />
            }
            {
              step === 'personal' &&
              <SignUpPersonal nextStep={nextStep} />
            }
            {
              step === 'delivery-date' &&
              <SignUpDeliveryDate nextStep={nextStep} />
            }
            {
              step === 'delivery-address' &&
              <SignUpDeliveryAddress toPage={toPage} />
            }
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default SignUp;
