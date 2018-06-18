import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLobby from '../components/NavLobby';
import ProgressBar from '../components/ProgressBar';
import SignUpInit from '../components/SignUpInit';
import SingUpStep1 from '../components/SignUpStep1';
import SignUpStep2 from '../components/SignUpStep2';
import SignUpStep3 from '../components/SignUpStep3';
import SignUpStep4 from '../components/SignUpStep4';
import { Pages } from '../constants';

class SignUp extends Component {
  nextStep = (step) => {
    const { history } = this.props;

    history.push(`${Pages.SignUp}/step/${step}`);
  };

  toPage = (page) => {
    const { history } = this.props;

    history.push(page);
  };

  render() {
    const { match: { params: { step } } } = this.props;
    const { nextStep, toPage } = this;

    return (
      <div className="sign-up">
        <NavLobby />
        {
          step &&
          <ProgressBar count={4} current={step} />
        }
        {
          !step &&
          <SignUpInit nextStep={nextStep} toPage={toPage} />
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
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default SignUp;
