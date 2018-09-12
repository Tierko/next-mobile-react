import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
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

    history.push(`${Pages.SIGN_UP}/step/${step}`);
  };

  toPage = (page) => {
    const { history } = this.props;

    history.push(page);
  };

  render() {
    const { match: { params: { step, mode } } } = this.props;
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
                <ProgressBar count={4} current={step} />
              </Transitions>
            }
            {/*<SignUpInitAfter nextStep={nextStep} />*/}
            {
              !step &&
              <SignUpInit nextStep={nextStep} toPage={toPage} mode={mode || ''} />
            }
            {
              step === 'choose-number' &&
              <SignUpNumberSelect nextStep={nextStep} />
            }
            {
              step === 'choose-tariff' &&
              <SingUpTariffSelect nextStep={nextStep} />
            }
            {
              step === 'phone' &&
              <SingUpStep1 nextStep={nextStep} />
            }
            {
              step === 'personal' &&
              <SignUpPersonal nextStep={nextStep} />
            }
            {
              step === 'delivery-address' &&
              <SignUpDeliveryAddress nextStep={nextStep} />
            }
            {
              step === 'delivery-date' &&
              <SignUpDeliveryDate toPage={toPage} />
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
