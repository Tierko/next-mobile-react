import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class MobileCode extends Component {
  state = {
    seconds: 10,
    status: 'init',
  };

  sendCode = () => {
    const { onCodeSend } = this.props;
    onCodeSend();
    this.initTimer();
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

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { sendCode } = this;
    const { phone } = this.props;
    const { status, seconds } = this.state;

    return (
      <div className="mobile-code">
        {
          status === 'init' &&
          <Button className="button_mobile-code" onClick={sendCode} disabled={!phone}>Прислать код</Button>
        }
        {
          status === 'sent' &&
          <Button className="button_mobile-code" onClick={() => {}}>Войти</Button>
        }
        {
          status === 'sent' &&
          <div className="mobile-code__timer">Еще {seconds} c</div>
        }
        {
          status === 'timed out' &&
          <Button onClick={sendCode}>Прислать код еще раз</Button>
        }
      </div>
    );
  }
}

MobileCode.propTypes = {
  phone: PropTypes.string.isRequired,
  onCodeSend: PropTypes.func.isRequired,
};

export default MobileCode;
