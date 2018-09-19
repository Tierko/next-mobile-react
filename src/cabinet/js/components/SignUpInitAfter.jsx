import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoAnimated from '../components/LogoAnimated';
import Radio from '../../../common/js/components/Radio';
import Button from '../../../common/js/components/Button';
import Transitions from './Transitions';
import { Pages } from '../constants';

class SignUpInitAfter extends Component {
  state = {
    whichNumber: 'current',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { whichNumber } = this.state;
    const { nextStep } = this.props;
    const { onChange } = this;
    const step = whichNumber === 'current' ? 'phone/number/current' : 'phone/number/new';

    return (
      <Transitions>
        <div className="welcome__content sign-up">
          <LogoAnimated expand />
          <div className="sign-up__message">
            Выберите, с каким номером хотите перейти на Next
            или зарегистрируйтесь по <Link className="link" to={`${Pages.SIGN_UP}/promo-after`}>промокоду</Link>
          </div>
          <div className="sign-up__scenario">
            <Radio name="whichNumber" value="current" selected={whichNumber} onChange={onChange}>
              Текущий номер
            </Radio>
            <Radio name="whichNumber" value="new" selected={whichNumber} onChange={onChange}>
              Новый номер
            </Radio>
          </div>
          <Button onClick={() => nextStep(step)} className="button_sign-up-continue">Продолжить</Button>
          <div className="sign-up__agreement">
            Я ознакомлен с <Link to={Pages.CONDITIONS} className="link">условиями перехода</Link>
          </div>
        </div>
      </Transitions>
    );
  }
}

SignUpInitAfter.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpInitAfter;

