import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';
import { formatCost } from '../utils';

class InterCalls extends Component {
  state = {
    value: '',
    item: null,
    data: {
      items: [],
    },
  };

  componentDidMount() {
    fetch('/data/internation-calls.json', {
      headers: new Headers({
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
    this.setState({
      item: value,
    });
  };

  getCost = () => {
    const { data, item } = this.state;

    if (!item) {
      return 0;
    }

    return data.groups[item.group].price;
  };

  clear = () => {
    this.setState({
      item: null,
      value: '',
    });
  };

  render() {
    const { onChange, onSelect, clear, getCost } = this;
    const { value, item, data } = this.state;
    const { className } = this.props;

    return (
      <div className={`inter-calls ${className}`}>
        <div className="inter-calls__header">Звонки за границу</div>
        {
          !item &&
          <div className="inter-calls__row inter-calls__row_complete">
            <AutoComplete
              name="value"
              value={value}
              onChange={onChange}
              onSelect={onSelect}
              placeholder="Например, Армения"
              items={data.items}
            />
          </div>
        }
        {
          item &&
          <div className="inter-calls__row inter-calls__row_selected">
            <div onClick={clear} className="inter-calls__clear" />
            <div className="inter-calls__selected">
              <span>{item.title}</span>
              <span>{formatCost(getCost())} / мин</span>
            </div>
          </div>
        }
        <div className="inter-calls__note">Одинаковая цена для всех тарифов</div>
      </div>
    );
  }
}

InterCalls.propTypes = {
  className: PropTypes.string,
};

InterCalls.defaultProps = {
  className: '',
};

export default InterCalls;
