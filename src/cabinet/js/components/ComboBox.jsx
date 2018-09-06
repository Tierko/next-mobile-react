import React from 'react';
import cs from 'classnames';
import Select from '../../../common/js/components/Select';

class ComboBox extends Select {
  state = {
    valueSearch: '',
    open: false,
  };

  onChange = ({ target }) => {
    this.setState({
      valueSearch: target.value,
      open: true,
    });
  };

  filter = (value) =>  {
    const { items } = this.props;

    return items.filter(i => i.properties.name.toUpperCase().indexOf(value.toUpperCase()) !== -1);
  };

  onSelect = (item) => {
    const { selectItem } = this;
    const valueSearch = (item.properties && item.properties.name) || '';

    this.setState({
      valueSearch,
    });

    selectItem(item);
  };

  clear = () => {
    const { onSelect } = this;

    onSelect({});
  };

  render() {
    const { open, valueSearch } = this.state;
    const { onSelect, onChange, filter, clear } = this;
    const {
      className,
      value,
      placeholder,
      zoneName,
    } = this.props;

    return (
      <div className={`combo-box ${className}`} ref={(e) => { this.select = e; }}>
        {
          !(value && value.properties && value.properties.name) &&
          <input
            className="combo-box__value"
            type="text"
            onChange={onChange}
            value={valueSearch}
            placeholder={placeholder}
          />
        }
        {
          value && value.properties && value.properties.name &&
          <div
            className="combo-box__clear"
            onClick={clear}
            role="button"
          />
        }
        {
          value && value.properties && value.properties.name &&
          <div className="combo-box__title">
            <img className="select__img" src={`/media/flags/${value.properties.iso_a2}.svg`} alt={value.properties.name} />
            {value.properties.name}
            <span className="combo-box__zone"> находится в зоне {zoneName.toLowerCase()}</span>
          </div>
        }
        <div className={cs('select__list', { select__list_open: !!valueSearch.length && open })}>
          {
            filter(valueSearch).map(i => (
              <div
                key={i.properties.iso_a2}
                className="select__item select__item_lang"
                onClick={() => onSelect(i)}
                role="button"
              >
                <img className="select__img" src={`/media/flags/${i.properties.iso_a2}.svg`} alt={i.properties.name} />
                {i.properties.name}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ComboBox;
