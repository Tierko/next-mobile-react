import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Select from '../../../common/js/components/Select';

class SelectCalls extends Select {
  render() {
    const { open } = this.state;
    const { toggle, selectItem } = this;
    const {
      className,
      value,
      data: {
        items,
        groups,
      },
    } = this.props;
    const cost = value.group ? `${groups[value.group].price} ₽/мин.` : ' ';

    return (
      <div className={`select select_calls ${className}`} ref={(e) => { this.select = e; }}>
        <div
          className={cs('select__value', { select__value_open: open })}
          onClick={toggle}
          role="button"
        >
          {
            !value.name && <span className="select__empty">Выберите страну</span>
          }
          <span>{value.name ? value.name.ru : value.title}</span> <span>{cost}</span>
        </div>
        <div className={cs('select__list', { select__list_open: open })}>
          {
            items.map(i => (
              <div
                className={cs('select__item', {
                  select__item_active: i.code === value.code,
                })}
                onClick={() => selectItem(i)}
                role="button"
                key={i.code}
              >
                {i.name ? i.name.ru : i.title}
                {
                  !i.name && !i.title && console.log(i)
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

SelectCalls.propTypes = {
  className: PropTypes.string,
  value: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
};

SelectCalls.defaultProps = {
  className: '',
};

export default SelectCalls;
