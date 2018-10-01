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

  filter = (value) => {
    const { items } = this.props;

    return items.filter(i => i.properties.name.toUpperCase().indexOf(value.toUpperCase()) === 0);
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
    const {
      onSelect,
      onChange,
      filter,
      clear,
    } = this;
    const {
      className,
      value,
      placeholder,
      zoneName,
    } = this.props;
    const filtered = filter(valueSearch);

    return (
      <div
        className={cs(`combo-box ${className}`, {
          'combo-box_hide-icon': value && value.properties && value.properties.name,
          'combo-box_drawer': valueSearch && open,
        })}
        ref={(e) => { this.select = e; }}
      >
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
        <div className="combo-box__title-wrapper">
          {
            value && value.properties && value.properties.name &&
            <div className="combo-box__title">
              <img className="select__img" src={`/media/flags/${value.properties.iso_a2}.svg`} alt={value.properties.name} />
              {value.properties.name}
              <span className="combo-box__zone"> находится в {zoneName.toLowerCase()}</span>
            </div>
          }
          {
            value && value.properties && value.properties.name &&
            <div
              className="combo-box__clear"
              onClick={clear}
              role="button"
            />
          }
        </div>
        <div className={cs('select__list', { select__list_open: !!valueSearch.length && open })}>
          {
            filtered.map(i => (
              <div
                key={i.properties.iso_a2}
                className="select__item"
                onClick={() => onSelect(i)}
                role="button"
              >
                <img className="select__img" src={`/media/flags/${i.properties.iso_a2}.svg`} alt={i.properties.name} />
                {i.properties.name}
              </div>
            ))
          }
          {
            valueSearch && !filtered.length &&
            <div className="select__item select__item_disabled">Такой страны нет в списке</div>
          }
        </div>
      </div>
    );
  }
}

export default ComboBox;
