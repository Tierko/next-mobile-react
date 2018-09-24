import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router-dom';
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
import SignUpTariff from '../components/SignUpTariff';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

const tariffs = [{
  id: 1,
  title: 'СуперВИП',
  payment: 3000,
  internet: 32,
  nextCalls: 'Безлимит',
  calls: 700,
  sms: 'Безлимит',
  transition: 0,
}, {
  id: 2,
  current: false,
  title: 'Премиум',
  payment: 2000,
  internet: 16,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
}, {
  id: 3,
  current: false,
  title: 'Лайт',
  payment: 1500,
  internet: 8,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
}];

class SignUp extends Component {
  nextStep = (step) => {
    const { history } = this.props;
    const { match: { params: { number, tariff } } } = this.props;
    let stepStr = `${Pages.SIGN_UP}/step/${step}`;

    if (number) {
      stepStr = `${stepStr}/number/${number}`;
    }

    if (tariff) {
      stepStr = `${stepStr}/tariff/${tariff}`;
    }

    history.push(stepStr);
  };

  toPage = (page) => {
    const { history } = this.props;

    history.push(page);
  };

  render() {
    const {
      match: {
        params: {
          step,
          mode,
          number,
          tariff,
          id,
        },
      },
    } = this.props;
    const { nextStep, toPage } = this;
    const meta = {
      title: TITLES.SIGN_UP,
    };
    const currentTariff = (tariff || id) &&
      tariffs.find(t => t.id === tariff * 1 || t.id === id * 1);

    return (
      <DocumentMeta {...meta}>
        <div className="welcome">
          <MobileNav type="enter" />
          <Header />
          <Transitions classNames="slide">
            {
              (step || tariff) &&
              <div className="sign-up__transition">
                Переход на Next
                {
                  currentTariff &&
                  <span> с тарифом <Link className="sign-up__transition-link" to={`${Pages.SIGN_UP}/tariff/${currentTariff.id}`}>
                    {currentTariff.title}
                    </Link>
                  </span>
                }
              </div>
            }
            {
              step &&
              <Transitions>
                <ProgressBar step={step} number={number} tariff={tariff} />
              </Transitions>
            }
            {
              !step && mode === 'after' &&
              <SignUpInitAfter nextStep={nextStep} tariff={tariff} />
            }
            {
              !step && mode !== 'after' && !id &&
              <SignUpInit nextStep={nextStep} toPage={toPage} mode={mode === 'promo-after' ? '' : mode} />
            }
            {
              id &&
              <SignUpTariff tariff={currentTariff} />
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
              <SingUpStep1 nextStep={nextStep} number={number} tariff={tariff} />
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
