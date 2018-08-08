import React from 'react';
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

  render() {
    const { open } = this.state;
    const { onSelect, onChange } = this;
    const {
      className,
      value,
      placeholder,
      items,
      name,
    } = this.props;

    return (
      <div className={`select ${className}`} ref={(e) => { this.select = e; }}>
        <Input name={name} value={value} onChange={onChange} placeholder={placeholder} />
        <div className={cs('select__list select__list_auto-complete', { select__list_open: open && value.length })}>
          {
            items.filter(i => i.title.toUpperCase().indexOf(value.toUpperCase()) !== -1).map(i => (
              <div
                className="select__item"
                onClick={() => onSelect(i)}
                role="button"
                key={i.id || i.title}
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

export default AutoComplete;
