import React from 'react';
import cs from 'classnames';
import Select from './Select';

class SelectLang extends Select {
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
          <img className="select__img" src={`/media/flags/${value.flag}`} alt={value.title} />
          {value.title}
        </div>
        <div className={cs('select__list', { select__list_open: open })}>
          {
            items.map(i => (
              <div
                className="select__item"
                onClick={() => selectItem(i)}
                role="button"
              >
                <img className="select__img" src={`/media/flags/${i.flag}`} alt={i.title} />
                {i.title}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default SelectLang;
