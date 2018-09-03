import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import Header from '../../../common/js/components/Header';
import ProgressBar from '../components/ProgressBar';
import SignUpInit from '../components/SignUpInit';
import SingUpStep1 from '../components/SignUpStep1';
import SignUpStep2 from '../components/SignUpStep2';
import SignUpStep3 from '../components/SignUpStep3';
import SignUpStep4 from '../components/SignUpStep4';
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
              <Transitions>
                <ProgressBar count={4} current={step} />
              </Transitions>
            }
            {
              !step &&
              <SignUpInit nextStep={nextStep} toPage={toPage} mode={mode || ''} />
            }
            {
              step === '1' &&
              <SingUpStep1 nextStep={nextStep} />
            }
            {
              step === '2' &&
              <SignUpStep2 nextStep={nextStep} />
            }
            {
              step === '3' &&
              <SignUpStep3 nextStep={nextStep} />
            }
            {
              step === '4' &&
              <SignUpStep4 toPage={toPage} />
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
