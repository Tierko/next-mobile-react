import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import MultipleInput from '../components/MultipleInput';

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
    const { onCodeSend } = this.props;
    onCodeSend();
    this.initTimer();
  };

  render() {
    const { sendCode, onChange } = this;
    const { phone, onEnter, className } = this.props;
    const { status, seconds, code } = this.state;

    return (
      <div className={`mobile-code ${className}`}>
        {
          (status === 'sent' || status === 'timed out') &&
          <MultipleInput className="multiple-input_mobile-code" onChange={onChange} name="code" />
        }
        {
          status === 'init' &&
          <Button className="button_mobile-code" onClick={sendCode} disabled={!phone}>Прислать код</Button>
        }
        {
          (status === 'sent' || status === 'timed out') &&
          <Button className="button_mobile-code" onClick={() => onEnter(code)} disabled={code.length < 4}>
            Войти
          </Button>
        }
        {
          status === 'sent' &&
          <div className="mobile-code__timer">Еще {seconds} c</div>
        }
        {
          status === 'timed out' &&
          <Button className="button_mobile-code-again" onClick={sendCode} borderless>
            Прислать код еще раз
          </Button>
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
};

MobileCode.defaultProps = {
  className: '',
};

export default MobileCode;
