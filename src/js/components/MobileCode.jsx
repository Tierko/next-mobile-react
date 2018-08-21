import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import MultipleInput from './MultipleInput';
import Transitions from './Transitions';
import { checkPhone } from '../utils';

class MobileCode extends Component {
  state = {
    seconds: 0,
    status: 'init',
    code: '',
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onKeyDown = ({ keyCode }) => {
    const { onEnter } = this.props;
    const { code } = this.state;

    if ((keyCode === 10 || keyCode === 13) && code.length === 4) {
      onEnter(code);
    }
  };

  initTimer = () => {
    this.setState({ status: 'sent', seconds: 10 });

    this.timer = setInterval(() => {
      const { seconds } = this.state;

      if (seconds === 0) {
        clearInterval(this.timer);
        this.setState({ status: 'timed out' });
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }, 1000);
  };

  sendCode = () => {
    const { onCodeSend, phone } = this.props;

    if (checkPhone(phone)) {
      onCodeSend();
      this.initTimer();
    }
  };

  render() {
    const { sendCode, onChange, onKeyDown } = this;
    const {
      phone,
      onEnter,
      className,
      buttonTitle,
    } = this.props;
    const { status, seconds, code } = this.state;

    return (
      <div className={`mobile-code ${className}`}>
        {
          (status === 'sent' || status === 'timed out') &&
          <Transitions classNames="slide">
            <MultipleInput className="multiple-input_mobile-code" onChange={onChange} name="code" onKeyDown={onKeyDown} />
          </Transitions>
        }
        {
          status === 'init' &&
          <Transitions classNames="slide">
            <Button className="button_mobile-code" onClick={sendCode} disabled={!checkPhone(phone)}>Получить код</Button>
          </Transitions>
        }
        {
          (status === 'sent' || status === 'timed out') &&
          <Transitions classNames="slide">
            <Button className="button_mobile-code" onClick={() => onEnter(code)} disabled={code.length < 4}>
              {buttonTitle}
            </Button>
          </Transitions>
        }
        {
          status === 'sent' &&
          <Transitions classNames="slide">
            <div className="mobile-code__timer">Код действителен еще {seconds} сек.</div>
          </Transitions>
        }
        {
          status === 'timed out' &&
          <Transitions classNames="slide">
            <Button className="button_mobile-code-again" onClick={sendCode} borderless>
              Получить код повторно
            </Button>
          </Transitions>
        }
      </div>
    );
  }
}

MobileCode.propTypes = {
  phone: PropTypes.string.isRequired,
  onCodeSend: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonTitle: PropTypes.string,
};

MobileCode.defaultProps = {
  className: '',
  buttonTitle: 'Войти',
};

export default MobileCode;
