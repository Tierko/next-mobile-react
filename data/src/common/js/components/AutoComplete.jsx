import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Select from './Select';
import Input from './Input';

class AutoComplete extends Select {
  state = {
    open: false,
  };

  onChange = (name, value) => {
    const { onChange } = this.props;

    onChange(name, value);

    this.setState({
      open: true,
    });
  };

  onSelect = (item) => {
    const { onSelect, name } = this.props;

    onSelect(name, item);

    this.setState({
      open: false,
    });
  };

  isItemValid = (item, value) => {
    const { fromStart } = this.props;

    if (fromStart) {
      return (item.title && item.title.toUpperCase().indexOf(value.toUpperCase()) === 0) ||
        (item.name && item.name.ru.toUpperCase().indexOf(value.toUpperCase()) === 0);
    }

    return item.title.toUpperCase().indexOf(value.toUpperCase()) !== -1;
  };

  render() {
    const { open } = this.state;
    const { onSelect, onChange, isItemValid } = this;
    const {
      className,
      value,
      placeholder,
      items,
      name,
      simplePlaceholder,
      emptyText,
      light,
      flag,
    } = this.props;
    const itemsFiltered = items.filter(i => isItemValid(i, value));

    return (
      <div className={`select ${className}`} ref={(e) => { this.select = e; }}>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          simplePlaceholder={simplePlaceholder}
          light={light}
        />
        <div className={cs('select__list select__list_auto-complete', { select__list_open: open && value.length })}>
          {
            itemsFiltered.map(i => (
              <div
                className={cs('select__item', { select__item_flag: flag })}
                onClick={() => onSelect(i)}
                role="button"
                key={i.id || i.title}
              >
                {
                  flag && i.code &&
                    <span className="select__flag">
                      <img src={`/media/flags/${i.code}.svg`} alt="" />
                    </span>
                }
                {
                  (typeof i === 'string' || typeof i === 'number') ? i : (i.name ? i.name.ru : i.title)
                }
              </div>
            ))
          }
          {
            value && itemsFiltered.length === 0 &&
            <div className="select__item select__item_disabled">
              {emptyText}
            </div>
          }
        </div>
      </div>
    );
  }
}

AutoComplete.propTypes = {
  emptyText: PropTypes.string,
  light: PropTypes.bool,
  flag: PropTypes.bool,
};

AutoComplete.defaultProps = {
  emptyText: 'Ничего не найдено',
  light: false,
  flag: false,
};

export default AutoComplete;
