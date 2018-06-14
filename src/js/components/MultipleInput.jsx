import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MultipleInput extends Component {
  state = {
    values: [],
  };

  onChange = (e) => {
    const { count } = this.props;
    const values = this.state.values.slice();
    const number = e.target.dataset.number * 1;
    const { value } = e.target;

    if (value.length === 0 && number > 0) {
      this[`input${number - 1}`].focus();
    }

    if (value.length === 1 && number < count - 1) {
      this[`input${number + 1}`].focus();
    }

    console.log(values)
    if (value.length === 1 && values[number] && values[number].length === 1) {
      this[`input${number + 1}`].focus();

    }

    if (value.length > 1) {
      return;
    }

    values[number] = value;
    this.setState({
      values,
    });
  };

  onKeyDown = (e) => {
    const { count } = this.props;
    const number = e.target.dataset.number * 1;
    const { value } = e.target;
    const { keyCode } = e;

    if (keyCode === 8 && number < count) {
      this[`input${number}`].focus();
    }
  };

  onFocus = (e) => {
    const { count } = this.props;
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

    // if (number < count && value.length === 1) {
    //   this[`input${number + 1}`].focus();
    // }
  };

  render() {
    const { count } = this.props;
    const { onChange, onFocus, onKeyDown } = this;
    const { values } = this.state;
    const inputs = Array(count).fill(null);

    return (
      <div className="multiple-input">
        {
          inputs.map((_, i) => (
            <input
              className="multiple-input__value"
              value={values[i] || ''}
              onChange={onChange}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              data-number={i}
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
};

MultipleInput.defaultProps = {
  count: 4,
};

export default MultipleInput;
