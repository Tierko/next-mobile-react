import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MultipleInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.initValue.split(''),
    };
  }

  onChange = (e) => {
    const { count, onChange, name } = this.props;
    const values = this.state.values.slice();
    const number = e.target.dataset.number * 1;
    const { value } = e.target;

    if (value.length === 1 && number !== count - 1) {
      this[`input${number + 1}`].focus();
    }

    if (value.length > 1) {
      return;
    }

    values[number] = value;
    onChange(name, values.join(''));

    this.setState({
      values,
    });
  };

  onKeyDown = (e) => {
    const { count, onKeyDown } = this.props;
    const number = e.target.dataset.number * 1;
    const { keyCode } = e;
    const values = this.state.values.slice();

    if (onKeyDown) {
      onKeyDown(e);
    }

    if (keyCode === 8 && number !== count - 1 && number !== 0) {
      this[`input${number - 1}`].focus();
      values[number - 1] = '';
      return;
    }

    if (keyCode === 8 && number === count - 1 && this[`input${number}`].value.length === 0) {
      values[number - 1] = '';
      this[`input${number - 1}`].focus();
    }

    this.setState({
      values,
    });
  };

  onFocus = (e) => {
    const number = e.target.dataset.number * 1;
    const { value } = e.target;

    if (number > 0 && value.length === 0) {
      if (this[`input${number - 1}`].value.length === 0) {
        this[`input${number - 1}`].focus();
      }
    }

    if (value.length === 1) {
      this[`input${number}`].focus();
    }
  };

  render() {
    const {
      count,
      name,
      className,
      focus,
    } = this.props;
    const { onChange, onFocus, onKeyDown } = this;
    const { values } = this.state;
    const inputs = Array(count).fill(null);

    return (
      <div className={`multiple-input ${className}`}>
        {
          inputs.map((_, i) => (
            <input
              key={i}
              className="multiple-input__value"
              value={values[i] || ''}
              onChange={onChange}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              data-number={i}
              name={name}
              autoFocus={i === 0 && focus}
              ref={(e) => { this[`input${i}`] = e; }}
            />
          ))
        }
      </div>
    );
  }
}

MultipleInput.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  focus: PropTypes.bool,
  initValue: PropTypes.string,
  onKeyDown: PropTypes.func,
};

MultipleInput.defaultProps = {
  count: 4,
  className: '',
  focus: false,
  initValue: '',
  onKeyDown: null,
};

export default MultipleInput;
