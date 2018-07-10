import React from 'react';
import cs from 'classnames';
import Select from '../components/Select';

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

    return items.filter(i => i.title.toUpperCase().indexOf(value.toUpperCase()) !== -1);
  };

  onSelect = (item) => {
    const { selectItem } = this;

    this.setState({
      valueSearch: item.title,
    });

    selectItem(item);
  };

  clear = () => {
    const { onSelect } = this;

    onSelect({ title: '' });
  };

  render() {
    const { open, valueSearch } = this.state;
    const { onSelect, onChange, filter, clear } = this;
    const {
      className,
      value,
      placeholder,
    } = this.props;

    return (
      <div className={`combo-box ${className}`} ref={(e) => { this.select = e; }}>
        {
          !value.title &&
          <input
            className="combo-box__value"
            type="text"
            onChange={onChange}
            value={valueSearch}
            placeholder={placeholder}
          />
        }
        {
          value.title &&
          <div
            className="combo-box__clear"
            onClick={clear}
            role="button"
          />
        }
        {
          value.title &&
          <div className="combo-box__title">
            <img className="select__img" src={`/media/flags/${value.flag}`} alt={value.title} />
            {value.title}
          </div>
        }
        <div className={cs('select__list', { select__list_open: !!valueSearch.length && open })}>
          {
            filter(valueSearch).map(i => (
              <div
                key={i.id}
                className="select__item select__item_lang"
                onClick={() => onSelect(i)}
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

export default ComboBox;
