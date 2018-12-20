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

    return items.filter(i =>
      i.properties.name.ru.toUpperCase().indexOf(value.toUpperCase()) === 0 && !i.properties.exclude
    );
  };

  onSelect = (item) => {
    const { selectItem } = this;

    this.setState({
      valueSearch: '',
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
          'combo-box_hide-icon': value && value.properties && value.properties.name.ru,
          'combo-box_drawer': valueSearch && open,
        })}
        ref={(e) => { this.select = e; }}
      >
        {
          !(value && value.properties && value.properties.name.ru) &&
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
            value && value.properties && value.properties.name.ru &&
            <div className="combo-box__title">
              <img className="select__img" src={`/media/flags/${value.properties.flag}.svg`} alt={value.properties.name.ru} />
              {value.properties.name.ru}
              <span className="combo-box__zone"> находится в&nbsp;{zoneName.toLowerCase()}</span>
            </div>
          }
          {
            value && value.properties && value.properties.name.ru &&
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
                key={i.properties.code}
                className="select__item"
                onClick={() => onSelect(i)}
                role="button"
              >
                <img className="select__img" src={`/media/flags/${i.properties.flag}.svg`} alt={i.properties.name.ru} />
                {i.properties.name.ru}
              </div>
            ))
          }
          {
            valueSearch && !filtered.length &&
            <div className="select__item select__item_disabled">Такой страны нет в&nbsp;списке</div>
          }
        </div>
      </div>
    );
  }
}

export default ComboBox;
