import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleInput from './MultipleInput';
import Button from '../../../common/js/components/Button';

class PromoCode extends Component {
  state = {
    promoCode: '',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onKeyDown = ({ keyCode }) => {
    const { onCodeEnter } = this.props;
    const { promoCode } = this.state;

    if (keyCode === 10 || keyCode === 13) {
      onCodeEnter(promoCode);
    }
  };

  render() {
    const { className, onCodeEnter, onCodeReject } = this.props;
    const { promoCode } = this.state;
    const { onChange, onKeyDown } = this;

    return (
      <div className={`promo-code ${className}`}>
        <MultipleInput onChange={onChange} name="promoCode" count={5} className="multiple-input_promo-code" onKeyDown={onKeyDown} />
        <Button className="button_promo-code-continue" onClick={() => onCodeEnter(promoCode)} disabled={promoCode.length < 5}>Продолжить</Button>
        <Button className="button_no-promo-code" onClick={onCodeReject} borderless>У меня нет промо-кода</Button>
      </div>
    );
  }
}

PromoCode.propTypes = {
  className: PropTypes.string,
  onCodeEnter: PropTypes.func.isRequired,
  onCodeReject: PropTypes.func.isRequired,
};

PromoCode.defaultProps = {
  className: '',
};

export default PromoCode;
