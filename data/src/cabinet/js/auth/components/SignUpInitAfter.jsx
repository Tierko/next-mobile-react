import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import Radio from '../../../../common/js/components/Radio';
import Button from '../../../../common/js/components/Button';
import Transitions from '../../components/Transitions';
import { Pages } from '../../constants';

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
    const { nextStep, tariff } = this.props;
    const { onChange } = this;
    const step = whichNumber === 'current' ? 'phone/number/current' : 'phone/number/new';

    return (
      <Transitions>
        <div className="welcome__content sign-up sign-up_after">
          <div className={cs('sign-up__message', { 'sign-up__message_no-logo': !!tariff })}>
            Выберите, с&nbsp;каким номером хотите перейти на&nbsp;Next
            или зарегистрируйтесь по&nbsp;<Link className="link" to={`${Pages.SIGN_UP}/promo-after`}>промо-коду</Link>
          </div>
          <div className="sign-up__scenario">
            <Radio className="radio_sign-up" name="whichNumber" value="current" selected={whichNumber} onChange={onChange}>
              Текущий номер
            </Radio>
            <Radio className="radio_sign-up" name="whichNumber" value="new" selected={whichNumber} onChange={onChange}>
              Новый номер
            </Radio>
          </div>
          <Button
            onClick={() => nextStep(step)}
            className="button_sign-up-continue"
            primary
          >
            Продолжить
          </Button>
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
  tariff: PropTypes.shape(),
};

SignUpInitAfter.defaultProps = {
  tariff: {},
};

export default SignUpInitAfter;

