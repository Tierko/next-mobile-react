import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Checkbox extends Component {
  onChange = (value) => {
    const { name, onChange } = this.props;

    onChange(name, value);
  };

  render() {
    const {
      value,
      className,
      title,
      children,
    } = this.props;
    const { onChange } = this;

    return (
      <div className={cs(`checkbox ${className}`, { checkbox_checked: value })}>
        <input
          className="checkbox__value"
          type="checkbox"
          onChange={() => onChange(!value)}
          checked={value}
        />
        {
          title &&
          <div className="checkbox__title">{title}</div>
        }
        {
          !!children.length &&
          <div className="checkbox__content">{children}</div>
        }
      </div>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

Checkbox.defaultProps = {
  className: '',
  title: '',
  children: null,
};

export default Checkbox;
