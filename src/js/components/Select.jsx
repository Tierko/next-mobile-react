import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Select extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.outsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outsideClick);
  }

  outsideClick = (e) => {
    if (!this.select.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  toggle = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  };

  selectItem = (value) => {
    const { onSelect } = this.props;

    this.toggle();
    onSelect(value);
  };

  render() {
    const { open } = this.state;
    const { toggle, selectItem } = this;
    const {
      className,
      value,
      placeholder,
      items,
      hideIcon,
    } = this.props;

    return (
      <div className={`select ${className}`} ref={(e) => { this.select = e; }}>
        {
          !!placeholder &&
          <div className="select__placeholder">{placeholder}</div>
        }
        <div
          className={cs('select__value', { select__value_open: open, 'select__value_hide-icon': hideIcon })}
          onClick={toggle}
          role="button"
        >
          {
            (typeof value === 'string' || typeof value === 'number') ? value : value.title
          }
        </div>
        <div className={cs('select__list', { select__list_open: open })}>
          {
            items.map(i => (
              <div
                className={cs('select__item', {
                  select__item_active: (typeof value === 'string' || typeof value === 'number') ? i === value : i.id === value.id,
                })}
                onClick={() => selectItem(i)}
                role="button"
                key={(typeof value === 'string' || typeof value === 'number') ? i : i.id}
              >
                {
                  (typeof i === 'string' || typeof i === 'number') ? i : i.title
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape(),
      PropTypes.number,
    ])
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
    PropTypes.number,
  ]).isRequired,
  hideIcon: PropTypes.bool,
};

Select.defaultProps = {
  className: '',
  placeholder: '',
  hideIcon: false,
};

export default Select;
