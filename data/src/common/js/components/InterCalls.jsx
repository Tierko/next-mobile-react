import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import AutoComplete from './AutoComplete';
import { formatCost } from '../../../cabinet/js/utils';

class InterCalls extends Component {
  state = {
    value: '',
    item: null,
    data: {
      items: [],
    },
  };

  componentDidMount() {
    fetch('/media/info/internation-calls.json', {
      credentials: 'same-origin',
      headers: new Headers({
        method: 'GET',
        'Content-Types': 'text/json',
      }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        data,
      }))
      .catch();
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSelect = (_, value) => {
    const { onChange } = this.props;

    this.setState({
      item: value,
    });

    if (onChange) {
      onChange(value);
    }
  };

  getCost = () => {
    const { data, item } = this.state;

    if (!item) {
      return 0;
    }

    return data.groups[item.group].price;
  };

  clear = () => {
    const { onChange } = this.props;

    this.setState({
      item: null,
      value: '',
    });

    if (onChange) {
      onChange(null);
    }
  };

  render() {
    const { value, item, data } = this.state;
    const {
      more,
      className,
      home,
      tariff,
      hidePrice,
    } = this.props;
    const {
      onChange,
      onSelect,
      clear,
      getCost,
    } = this;

    return (
      <div className={`inter-calls ${className}`}>
        {
          !home && !tariff &&
          <div className={cs('inter-calls__header', { 'inter-calls__header_light': more })}>
            Звонки за границу
          </div>
        }
        {
          !item &&
          <div className="inter-calls__row">
            <div
              className={cs('inter-calls__img', {
                'inter-calls__img_light': home,
              })}
            />
            <AutoComplete
              name="value"
              value={value}
              onChange={onChange}
              onSelect={onSelect}
              placeholder="Например, Армения"
              items={data.items}
              simplePlaceholder
              fromStart
              emptyText="Такой страны нет в списке"
              light={home}
              flag
            />
          </div>
        }
        {
          item &&
          <div className="inter-calls__row inter-calls__row_selected">
            <div
              onClick={clear}
              className={cs('inter-calls__clear', {
                'inter-calls__clear_light': home,
              })}
            />
            <div className={cs('inter-calls__selected', {
              'inter-calls__selected_light': home,
            })}
            >
              <div className="inter-calls__country" onClick={clear}>
                {
                  item.flag &&
                  <div>
                    <img src={`/media/flags/${item.flag}.svg`} alt="" />
                  </div>
                }
                {item.title}
              </div>
              {
                !hidePrice &&
                <span>{formatCost(getCost())} / мин</span>
              }
            </div>
          </div>
        }
        {
          !more && !home && !tariff && <div className="inter-calls__note">Одинаковая цена для всех тарифов</div>
        }
      </div>
    );
  }
}

InterCalls.propTypes = {
  className: PropTypes.string,
  more: PropTypes.bool,
  home: PropTypes.bool,
  tariff: PropTypes.bool,
  onChange: PropTypes.func,
  hidePrice: PropTypes.bool,
};

InterCalls.defaultProps = {
  className: '',
  more: false,
  home: false,
  tariff: false,
  onChange: null,
  hidePrice: false,
};

export default InterCalls;
