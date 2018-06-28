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
    } = this.props;

    return (
      <div className={`select ${className}`} ref={(e) => { this.select = e; }}>
        <div className="select__placeholder">{placeholder}</div>
        <div
          className={cs('select__value', { select__value_open: open })}
          onClick={toggle}
          role="button"
        >
          {
            typeof value === 'string' ? value : value.title
          }
        </div>
        <div className={cs('select__list', { select__list_open: open })}>
          {
            items.map(i => (
              <div
                className="select__item"
                onClick={() => selectItem(i)}
                role="button"
                key={typeof value === 'string' ? i : i.id}
              >
                {
                  typeof value === 'string' ? i : i.title
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
  placeholder: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
};

Select.defaultProps = {
  className: '',
};

export default Select;
